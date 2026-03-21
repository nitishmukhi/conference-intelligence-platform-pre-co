#!/usr/bin/env python3
"""
QA report for parsed abstracts JSONL

Usage:
  python ingestion/qa_report.py --in outputs/abstracts.jsonl --out outputs/qa_report.csv
"""
from __future__ import annotations
import argparse
import csv
import json
from collections import Counter


def main():
    ap = argparse.ArgumentParser(description='Generate QA coverage report for parsed abstracts JSONL')
    ap.add_argument('--in', dest='inp', required=True, help='Input JSONL path')
    ap.add_argument('--out', dest='out', required=True, help='Output CSV path')
    args = ap.parse_args()

    total = 0
    cov = Counter()
    sess = Counter()
    with open(args.inp, 'r', encoding='utf-8') as f, open(args.out, 'w', encoding='utf-8', newline='') as w:
        writer = csv.writer(w)
        writer.writerow(['abstract_id','has_title','has_authors','has_affils','has_sections','has_conflict','has_refs','session_type','parse_confidence'])
        for line in f:
            if not line.strip():
                continue
            rec = json.loads(line)
            total += 1
            ident = rec.get('identifiers', {})
            abs_id = ident.get('abstract_id') or ''
            has_title = bool(rec.get('title'))
            has_auth = bool(rec.get('authors'))
            has_aff = bool(rec.get('affiliations'))
            has_sect = bool(rec.get('sections'))
            has_conf = bool(rec.get('conflicts',{}).get('present'))
            has_refs = bool(rec.get('references',{}).get('present'))
            sess_type = (rec.get('session') or {}).get('type') or ''
            conf = float(rec.get('parse_confidence') or 0.0)

            cov.update({'title': has_title, 'authors': has_auth, 'affils': has_aff, 'sections': has_sect, 'conflict': has_conf, 'refs': has_refs})
            if sess_type:
                sess.update([sess_type])

            writer.writerow([abs_id, int(has_title), int(has_auth), int(has_aff), int(has_sect), int(has_conf), int(has_refs), sess_type, f"{conf:.2f}"])

    print(f"Total records: {total}")
    if total:
        print("Coverage:")
        for k in ['title','authors','affils','sections','conflict','refs']:
            pct = 100.0 * cov[k] / total
            print(f"  {k:9s}: {pct:5.1f}%")
        if sess:
            print("Session type distribution:")
            for s, c in sess.most_common():
                pct = 100.0 * c / total
                print(f"  {s:12s}: {c:5d} ({pct:4.1f}%)")

if __name__ == '__main__':
    main()
