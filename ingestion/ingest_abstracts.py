#!/usr/bin/env python3
"""
Feature 1: Abstract ingestion, parsing, and enrichment CLI

- Streams large congress PDF (1,000–3,000+ pages) page-by-page
- Detects abstract boundaries
- Parses structured fields into a unified schema
- Optional biomedical enrichment (disease/drug NER) using scispaCy if available

Usage:
  python ingestion/ingest_abstracts.py --pdf path/to/abstract_book.pdf --out abstracts.jsonl

Optional:
  python ingestion/ingest_abstracts.py --pdf book.pdf --out out.jsonl --config ingestion/config.yml --pages 100-250,320-333
  # Or pass a plain-text export instead of PDF (will split on form-feed \f into pseudo-pages):
  python ingestion/ingest_abstracts.py --pdf sample_export.txt --out out.jsonl

Notes:
- scispaCy models are optional. See README for installation tips.
- OCR is not performed here; pre-run OCRmyPDF on scanned pages if needed.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import os
import re
import sys
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

try:
    import pdfplumber  # type: ignore
except Exception as e:  # pragma: no cover
    print("ERROR: pdfplumber is required. pip install pdfplumber", file=sys.stderr)
    raise

# Optional deps
try:  # pragma: no cover
    import spacy  # type: ignore
    _HAS_SPACY = True
except Exception:
    _HAS_SPACY = False

try:  # pragma: no cover
    from rich import print as rprint
    from rich.progress import track
except Exception:  # pragma: no cover
    def rprint(*args, **kwargs):
        print(*args, **kwargs)
    def track(iterable, description=""):
        return iterable

import yaml  # PyYAML


# -------------------- Config and constants --------------------
DEFAULT_CONFIG = {
    "session_prefix": {"P": "Poster", "O": "Oral", "LB": "Late-breaking", "S": "Symposium"},
    "degree_tokens": [
        "MD", "PhD", "MSc", "MS", "MPH", "FRCP", "FRCS", "DO", "DDS", "DMD", "RN", "NP", "PA", "PharmD"
    ],
    "section_headers": ["Background", "Methods", "Results", "Conclusion", "Conclusions"],
    "code_patterns": [r"^(?P<prefix>P|O|LB|S)-?(?P<num>\d{2,6})\s*$"],
}

# Heuristic lexicons for enrichment when scispaCy is missing
DISEASE_TERMS = [
    "ulcerative colitis", "crohn", "crohn's", "inflammatory bowel disease", "ibd", "rheumatoid arthritis",
    "venous thromboembolism", "vte", "depression", "sarcopenia"
]
DRUG_TERMS = [
    "vedolizumab", "infliximab", "ustekinumab", "adalimumab", "golimumab", "tofacitinib", "upadacitinib",
    "risankizumab", "budesonide", "5-asa", "mesalazine", "azathioprine", "mercaptopurine", "methotrexate",
    "anti-tnf", "il-12/23", "jak inhibitor", "jak inhibitors", "steroid", "corticosteroid"
]
STUDY_TYPES = [
    "systematic review", "meta-analysis", "cross-sectional", "case-control", "nested case-control",
    "target trial emulation", "retrospective cohort", "prospective cohort", "randomized", "randomised",
    "trial", "registry", "survey"
]

CITATION_RE = re.compile(r"^\s*Abstract\s+citation\s+ID:\s*([A-Za-z0-9\.-]+)\s*$", re.I)
SECTION_RE = re.compile(r"^(Background|Methods|Results|Conclusions?|Conflict of interest|References)\s*:\s*(.*)$", re.I)
AFFIL_START_RE = re.compile(r"^\s*(\d{1,2})\s?(.*)$")
SUPERSCRIPT_RE = re.compile(r"(?P<idx>(?:\^?\d+(?:,\d+)*))\s*$")
DEHYPHEN_RE = re.compile(r"(\w)[-\u00ad]\n(\w)")  # soft-hyphen or hyphen at line wrap


@dataclass
class ParsedAbstract:
    data: Dict

    def to_json(self) -> str:
        return json.dumps(self.data, ensure_ascii=False)


# -------------------- Text utils --------------------
def normalize_text(text: str) -> str:
    # Remove soft hyphens and de-hyphenate words broken across line breaks
    text = text.replace("\u00ad", "")
    text = DEHYPHEN_RE.sub(r"\1\2", text)
    # Normalize whitespace: keep newlines, collapse multiple spaces
    text = re.sub(r"[\t\x0b\x0c\r]", " ", text)
    text = re.sub(r"\u00a0", " ", text)  # non-breaking spaces
    text = re.sub(r" +", " ", text)
    # Keep original newlines for structure
    return text


def hash_file(path: str) -> str:
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


# -------------------- Boundary detection --------------------
def extract_page_texts(pdf_path: str, page_ranges: Optional[List[Tuple[int,int]]] = None) -> List[Tuple[int,str]]:
    texts: List[Tuple[int,str]] = []
    if pdf_path.lower().endswith('.txt'):
        with open(pdf_path, 'r', encoding='utf-8') as f:
            raw = f.read()
        # Split pseudo-pages by form feed if present; else treat entire file as one page
        parts = re.split(r"\f", raw)
        for i, part in enumerate(parts, start=1):
            texts.append((i, normalize_text(part)))
        return texts

    with pdfplumber.open(pdf_path) as pdf:
        total = len(pdf.pages)
        def _iter_pages():
            if page_ranges:
                for (start, end) in page_ranges:
                    s = max(1, start);
                    e = min(total, end)
                    for i in range(s-1, e):
                        yield i
            else:
                for i in range(total):
                    yield i
        for i in track(_iter_pages(), description="Extracting pages"):
            page = pdf.pages[i]
            txt = page.extract_text(x_tolerance=1.5, y_tolerance=2.0) or ""
            texts.append((i+1, normalize_text(txt)))
    return texts


def split_abstract_blocks(pages: List[Tuple[int,str]]) -> List[Dict]:
    blocks: List[Dict] = []
    cur_lines: List[str] = []
    cur_start_page: Optional[int] = None
    for page_no, text in pages:
        lines = text.splitlines()
        for li, line in enumerate(lines):
            m = CITATION_RE.match(line)
            if m:
                # Start new block
                if cur_lines:
                    blocks.append({
                        'start_page': cur_start_page,
                        'end_page': page_no if li == 0 else page_no,
                        'lines': cur_lines,
                    })
                cur_lines = [line]
                cur_start_page = page_no
            else:
                # Continue current or ignore until first citation appears
                if cur_lines is not None:
                    cur_lines.append(line)
        # End of page; update end_page if in a block
        if cur_lines and blocks:
            blocks[-1]['end_page'] = page_no
    # Tail block
    if cur_lines:
        blocks.append({'start_page': cur_start_page, 'end_page': pages[-1][0] if pages else None, 'lines': cur_lines})

    # Remove any non-abstract noise before first citation (if first block doesn't actually begin with citation)
    filtered: List[Dict] = []
    for b in blocks:
        if b['lines'] and CITATION_RE.match(b['lines'][0]):
            filtered.append(b)
    return filtered


# -------------------- Parsing helpers --------------------
def parse_code(line: str, code_patterns: List[str]) -> Optional[Tuple[str,str]]:
    for pat in code_patterns:
        m = re.match(pat, line.strip(), flags=re.I)
        if m:
            prefix = m.group('prefix').upper()
            num = m.group('num')
            return prefix, f"{prefix}{num}"
    return None


def parse_header_id_and_code(lines: List[str], code_patterns: List[str]) -> Tuple[Optional[str], Optional[str], Optional[int]]:
    citation_id = None
    abstract_id = None
    code_idx = None
    for i, line in enumerate(lines[:10]):  # header should be early; allow a few lines
        cm = CITATION_RE.match(line)
        if cm:
            citation_id = cm.group(1)
            # Expect code on next non-empty line(s)
            for j in range(i+1, min(i+8, len(lines))):
                if lines[j].strip():
                    cc = parse_code(lines[j], code_patterns)
                    if cc:
                        _, abstract_id = cc
                        code_idx = j
                    break
            break
    return citation_id, abstract_id, code_idx


def take_until_blank(lines: List[str], start_idx: int) -> Tuple[str, int]:
    bufs: List[str] = []
    i = start_idx
    while i < len(lines) and lines[i].strip():
        bufs.append(lines[i].strip())
        i += 1
    return " ".join(bufs).strip(), i


def parse_authors_and_affils(lines: List[str], start_idx: int) -> Tuple[List[Dict], List[Dict], Optional[str], int]:
    # Authors lines until first affiliation line that starts with a number
    author_bufs: List[str] = []
    i = start_idx
    while i < len(lines):
        L = lines[i].strip()
        if not L:
            i += 1
            continue
        if AFFIL_START_RE.match(L):
            break
        # stop when hitting a section header like Background:
        if SECTION_RE.match(L):
            break
        author_bufs.append(L)
        i += 1
    authors_line = " ".join(author_bufs)

    # Affiliation lines starting with index until section header or blank between affiliation groups ends
    affils: List[Dict] = []
    current_idx = None
    current_text_parts: List[str] = []
    while i < len(lines):
        L = lines[i].strip()
        if not L:
            # If we had been collecting, flush current and continue
            if current_idx is not None and current_text_parts:
                affils.append({"index": current_idx, "name": " ".join(current_text_parts).strip()})
                current_idx = None
                current_text_parts = []
            i += 1
            # But affiliations may be continuous despite blank lines; continue scanning
            # Stop if next is a section header
            if i < len(lines) and SECTION_RE.match(lines[i].strip()):
                break
            continue
        if SECTION_RE.match(L):
            break
        m = AFFIL_START_RE.match(L)
        if m and m.group(2).strip():
            # flush previous
            if current_idx is not None and current_text_parts:
                affils.append({"index": current_idx, "name": " ".join(current_text_parts).strip()})
            current_idx = int(m.group(1))
            current_text_parts = [m.group(2).strip()]
        else:
            # continuation line for current affiliation
            if current_idx is not None:
                current_text_parts.append(L)
            else:
                # We've reached non-affiliation content
                break
        i += 1
    # flush remaining
    if current_idx is not None and current_text_parts:
        affils.append({"index": current_idx, "name": " ".join(current_text_parts).strip()})

    # Parse authors from authors_line
    authors: List[Dict] = []
    if authors_line:
        # Authors separated by commas; some may include degrees glued to names
        raw_parts = [p.strip() for p in re.split(r"\s*,\s*", authors_line) if p.strip()]
        for part in raw_parts:
            # Extract superscripts (affiliation indices) at end (e.g., ^1,2 or 12)
            aff_idx: List[int] = []
            m = SUPERSCRIPT_RE.search(part)
            if m:
                idx_str = m.group('idx').lstrip('^')
                try:
                    aff_idx = [int(x) for x in re.split(r"[\^,]", idx_str) if x]
                except Exception:
                    aff_idx = []
                part = part[:m.start()].strip()
            # Split degrees tokens
            degrees: List[str] = []
            tokens = part.split()
            if tokens:
                # Find trailing degree tokens
                while tokens and tokens[-1].replace('.', '').upper() in set(t.upper() for t in DEFAULT_CONFIG['degree_tokens']):
                    deg = tokens.pop()
                    degrees.insert(0, deg)
            name = " ".join(tokens).strip().strip(',;')
            if not name:
                continue
            authors.append({"full_name": name, "degrees": degrees, "affiliations": aff_idx})

    primary_institution = None
    if authors and authors[0].get('affiliations'):
        first_idx = authors[0]['affiliations'][0]
        for a in affils:
            if a['index'] == first_idx:
                primary_institution = a['name']
                break

    return authors, affils, primary_institution, i


def parse_sections(lines: List[str], start_idx: int) -> Tuple[Dict[str,str], Dict[str,str], int]:
    sections: Dict[str, str] = {}
    extras: Dict[str, str] = {}
    cur_key = None
    buf: List[str] = []
    i = start_idx
    while i < len(lines):
        L = lines[i]
        m = SECTION_RE.match(L)
        if m:
            # flush previous
            if cur_key and buf:
                text = " ".join(s.strip() for s in buf).strip()
                if cur_key.lower() in ("background", "methods", "results", "conclusion", "conclusions"):
                    # normalize key to plural 'conclusions'
                    key = 'conclusions' if cur_key.lower().startswith('conclusion') else cur_key.lower()
                    sections[key] = text
                else:
                    extras[cur_key] = text
            cur_key = m.group(1)
            first_content = m.group(2).strip()
            buf = [first_content] if first_content else []
        else:
            if cur_key:
                # Stop sections when a new abstract header likely starts (rare within same block)
                if CITATION_RE.match(L):
                    break
                buf.append(L.strip())
        i += 1
    if cur_key and buf:
        text = " ".join(s.strip() for s in buf).strip()
        if cur_key.lower() in ("background", "methods", "results", "conclusion", "conclusions"):
            key = 'conclusions' if cur_key.lower().startswith('conclusion') else cur_key.lower()
            sections[key] = text
        else:
            extras[cur_key] = text
    return sections, extras, i


def detect_session_type(abstract_id: Optional[str], session_prefix: Dict[str,str]) -> Optional[str]:
    if not abstract_id:
        return None
    m = re.match(r"^(P|O|LB|S)", abstract_id)
    if not m:
        return None
    return session_prefix.get(m.group(1), None)


# -------------------- Enrichment --------------------
class SimpleEnricher:
    def __init__(self) -> None:
        self.has_spacy = _HAS_SPACY
        self.nlp = None
        if self.has_spacy:
            try:
                # Prefer a clinical/scientific pipeline if available on system
                self.nlp = spacy.load("en_core_sci_lg")  # type: ignore
            except Exception:
                try:
                    self.nlp = spacy.load("en_core_web_sm")  # type: ignore
                except Exception:
                    self.has_spacy = False

    def enrich(self, text: str) -> Dict:
        entities = {"diseases": [], "drugs": [], "study_types": []}
        low = text.lower()
        # Heuristic tagging
        for term in DISEASE_TERMS:
            if re.search(rf"\b{re.escape(term)}\b", low):
                entities["diseases"].append({"text": term, "cui": None, "preferred": term})
        for term in DRUG_TERMS:
            if re.search(rf"\b{re.escape(term)}\b", low):
                entities["drugs"].append({"text": term, "rxnorm_id": None, "preferred": term})
        for st in STUDY_TYPES:
            if st in low:
                entities["study_types"].append(st)
        # Optional NER pass to expand coverage
        if self.has_spacy and self.nlp is not None:
            try:
                doc = self.nlp(text)
                for ent in doc.ents:
                    if ent.label_.lower() in {"disease", "medical_condition"}:
                        entities["diseases"].append({"text": ent.text, "cui": None, "preferred": ent.text})
                    if ent.label_.lower() in {"chemical", "drug", "compound"}:
                        entities["drugs"].append({"text": ent.text, "rxnorm_id": None, "preferred": ent.text})
            except Exception:
                pass
        # Deduplicate while preserving order
        for k in ("diseases", "drugs"):
            seen = set()
            dedup = []
            for e in entities[k]:
                key = e['text'].lower()
                if key not in seen:
                    seen.add(key)
                    dedup.append(e)
            entities[k] = dedup
        entities["study_types"] = list(dict.fromkeys(entities["study_types"]))
        return entities


# -------------------- Record builder --------------------
def compute_confidence(rec: Dict) -> float:
    score = 0.0
    if rec.get('abstract_id'): score += 0.35
    if rec.get('title'): score += 0.25
    if rec.get('authors'): score += 0.2
    if rec.get('affiliations'): score += 0.1
    if rec.get('sections'): score += 0.1
    return max(0.0, min(1.0, score))


def parse_block(block: Dict, config: Dict) -> ParsedAbstract:
    lines = block['lines']
    citation_id, abstract_id, code_idx = parse_header_id_and_code(lines, config['code_patterns'])

    # Title: lines after code_idx until blank line
    title = None
    idx_after_title = (code_idx + 1) if code_idx is not None else 0
    if code_idx is not None:
        title, idx_after_title = take_until_blank(lines, code_idx + 1)

    # Authors + Affiliations
    authors, affils, primary_inst, idx_after_affil = parse_authors_and_affils(lines, idx_after_title)

    # Sections
    sections, extras, _ = parse_sections(lines, idx_after_affil)

    # Session type
    session_type = detect_session_type(abstract_id, config['session_prefix'])

    # Full text reassembly for enrichment and fallback search
    full_text = "\n".join(lines)

    # Enrichment
    enricher = SimpleEnricher()
    entities = enricher.enrich("\n".join([
        title or "",
        " ".join(a.get('full_name','') for a in authors),
        " ".join(aff.get('name','') for aff in affils),
        " ".join(sections.values())
    ]))

    rec = {
        "identifiers": {"abstract_id": abstract_id, "citation_id": citation_id},
        "title": title,
        "authors": authors,
        "affiliations": affils,
        "primary_author_institution": primary_inst,
        "session": {"type": session_type, "date": None, "time": None, "room": None},
        "sections": sections,
        "full_text": full_text,
        "conflicts": {"present": any('Conflict of interest' in l for l in lines), "raw": None},
        "references": {"present": any(l.strip().lower().startswith('references') for l in lines), "raw": None},
        "tags_congress": [],
        "tags_auto": [],
        "entities": entities,
        "pages": {"start": block.get('start_page'), "end": block.get('end_page')},
        "source": {"file_name": None, "file_hash": None},
        "parse_confidence": 0.0,
        "parse_warnings": [],
    }

    # Confidence
    rec['parse_confidence'] = compute_confidence(rec)

    return ParsedAbstract(rec)


# -------------------- CLI --------------------
def parse_page_ranges(spec: Optional[str]) -> Optional[List[Tuple[int,int]]]:
    if not spec:
        return None
    out: List[Tuple[int,int]] = []
    for chunk in spec.split(','):
        chunk = chunk.strip()
        if not chunk:
            continue
        if '-' in chunk:
            a,b = chunk.split('-',1)
            out.append((int(a), int(b)))
        else:
            n = int(chunk)
            out.append((n,n))
    return out


def load_config(path: Optional[str]) -> Dict:
    cfg = DEFAULT_CONFIG.copy()
    if path and os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            user = yaml.safe_load(f) or {}
        # Deep-merge shallowly by keys
        for k,v in user.items():
            cfg[k] = v
    return cfg


def main():
    ap = argparse.ArgumentParser(description="Ingest and parse congress abstracts from large PDF or text export")
    ap.add_argument('--pdf', required=True, help='Path to PDF (or .txt export)')
    ap.add_argument('--out', required=True, help='Output JSONL path')
    ap.add_argument('--config', default='ingestion/config.yml', help='YAML config with patterns and mappings')
    ap.add_argument('--pages', default=None, help='Optional page ranges for PDFs, e.g., 1-50,120-135')
    args = ap.parse_args()

    cfg = load_config(args.config if args.config else None)
    rprint(f"[bold]Loading:[/bold] {args.pdf}")

    ranges = parse_page_ranges(args.pages)
    pages = extract_page_texts(args.pdf, page_ranges=ranges)

    rprint(f"[bold]Detecting abstracts...[/bold]")
    blocks = split_abstract_blocks(pages)
    rprint(f"Found [bold]{len(blocks)}[/bold] abstract blocks")

    # Hash file only if it's a real file on disk
    sha = hash_file(args.pdf) if os.path.exists(args.pdf) else None
    out_path = args.out
    os.makedirs(os.path.dirname(out_path) or '.', exist_ok=True)
    with open(out_path, 'w', encoding='utf-8') as f:
        for b in track(blocks, description="Parsing abstracts"):
            pa = parse_block(b, cfg)
            # add source details
            pa.data['source']['file_name'] = os.path.basename(args.pdf)
            pa.data['source']['file_hash'] = sha
            f.write(pa.to_json() + "\n")

    rprint(f"[green]Done[/green]. Wrote {len(blocks)} records to {out_path}")


if __name__ == '__main__':
    main()
