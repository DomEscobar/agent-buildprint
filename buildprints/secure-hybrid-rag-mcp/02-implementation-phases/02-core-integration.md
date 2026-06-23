# Phase 02 - Core Integration

## Objective

Implement an idempotent ingestion pipeline.

## Required inputs

- phase 01 contracts
- approved parser/provider plan
- approved storage and migration path
- ACL assignment source from host authorization model

## Pipeline

1. Receive file or project import request.
2. Resolve subject and write permission.
3. Store raw file reference and checksum.
4. Assign document metadata and ACL metadata.
5. Parse with the configured parser.
6. Store parsed JSON/Markdown and parser warnings.
7. Chunk with structure-aware rules.
8. Add contextual headers and parent relationships.
9. Store chunks with ACL metadata.
10. Embed chunks and store embedding version.
11. Index chunks for keyword/full-text search.
12. Write ingestion receipt.

## Parser rules

Prefer Docling when no host parser exists. Preserve:

- pages
- headings
- tables
- figure/image references
- OCR confidence when available
- reading order
- bounding boxes when available

Add warnings for:

- failed pages
- low OCR confidence
- split tables
- missing page numbers
- handwritten content
- unsupported file types

## Chunking rules

Do not use blind fixed-size splitting as the only strategy. Preserve semantic units:

- sections
- tables
- rows or line items
- legal clauses
- quantity/unit/price groups
- page references

Use parent-child retrieval metadata so a chunk can be expanded to its section/page/document when appropriate.

## ACL rules

Every chunk must inherit or explicitly define:

- tenant
- project/customer/document scope
- visibility
- sensitivity
- allowed/denied principals
- retention policy

Chunks with missing ACL metadata must be denied or quarantined, not indexed into the default searchable corpus.

## Proof before moving on

- ingestion path is idempotent
- parser output stores parser version and warnings
- every indexed chunk has ACL metadata
- vector and keyword indexes include version metadata
- missing ACL chunks are denied or quarantined
