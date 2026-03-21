Feature 1 — Abstract ingestion, parsing, and enrichment

This module ingests large congress abstract books (1,000–3,000+ pages), detects abstract boundaries, parses structured fields, and enriches with basic biomedical entities.

Quick start
1) Create a virtual environment
   python -m venv .venv && source .venv/bin/activate  # Windows: .venv\\Scripts\\activate

2) Install dependencies
   pip install -r ingestion/requirements.txt
   # Optional: scispaCy model for better NER (large download)
   # pip install https://github.com/allenai/scispacy/releases/download/v0.5.4/en_core_sci_lg-0.5.4-py3-none-any.whl

3) Run the CLI
   python ingestion/ingest_abstracts.py --pdf path/to/abstract_book.pdf --out outputs/abstracts.jsonl

   # Restrict to page ranges (for testing):
   python ingestion/ingest_abstracts.py --pdf book.pdf --out outputs/sample.jsonl --pages 100-115,320-325

Outputs
- JSONL with one record per abstract (schema documented inline in ingest_abstracts.py).
- Each record contains: identifiers, title, authors, affiliations, session type (from code prefix), sections, full_text, conflicts/references (presence flags), basic entities (diseases, drugs, study_types), pages, source, and parse_confidence.

OCR guidance (optional)
- If your PDF has low/no text on some pages (scanned), pre-run OCRmyPDF to add a text layer while preserving layout and page mapping.
  Example:
    ocrmypdf --skip-text --optimize 1 --jobs 8 input.pdf input_ocr.pdf

Configuration
- ingestion/config.yml controls:
  - session_prefix mapping (e.g., P->Poster, O->Oral)
  - code_patterns (regex) to recognize congress codes like P1184, O-123, LB007
  - degree_tokens and section_headers

Assumptions and heuristics
- Boundary: new abstract starts at a line like "Abstract citation ID: <token>", with the code (e.g., P1184) on the next non-empty line.
- Title: the text after the code up to the first blank line.
- Authors: lines after the title and before affiliations; affiliation superscripts may appear as trailing digits (e.g., "Surname X^1,2" or "Name MD PhD1").
- Affiliations: lines beginning with a digit index (e.g., "1University...") and may continue across multiple lines; parsing stops at the first section header.
- Sections: Background/Methods/Results/Conclusion(s) captured until the next section header; other blocks (References, Conflict of interest) are flagged as present.
- Enrichment: if scispaCy is available, a generic model is used; otherwise, a curated lexicon detects common diseases, drugs, and study-type phrases.

Performance
- The CLI streams pages sequentially and writes results incrementally; suitable for 3,000+ pages.
- For very large files, consider running with page shards and concatenating JSONL outputs.

Validation
- Spot-check a handful of records in the JSONL to verify title/authors/affiliations mapping.
- If author degrees/superscripts formats vary, add congress-specific rules to config.yml or extend the parser.

Next steps
- Add unit tests (pytest) around boundary detection and parsing for your congress format.
- Wire outputs to your search index pipeline (see WP2 plan).
