# Spec

This file is a compatibility summary for repository spine checks. The executable contract lives in `BUILDPRINT.md`, `02-project-setup.md`, and `03-phases/`.

## Goal

Build a portable retrieval augmented generation system that retrieves relevant, permission-safe evidence and generates citation-grounded answers with measurable quality gates.

## Required Behavior

- Ingest document sources with stable source ids, checksums, updated timestamps, metadata, and access scopes.
- Split sources into chunks with stable ids, source spans, token estimates, and metadata.
- Optionally add contextualized chunk text when chunks lose meaning outside the parent document.
- Build lexical/sparse and dense retrieval surfaces.
- Accept queries with filters and tenant/user identity.
- Fuse and dedupe retrieval candidates.
- Enforce tenant and permission filters before context packing.
- Rerank top candidates.
- Generate cited answers only from selected context.
- Refuse unsupported questions.
- Produce traces and eval reports with retrieval, answer, permission, latency, cost, and token-budget fields.

## Non-Goals

- Do not claim vector-only search is complete RAG.
- Do not claim production readiness from deterministic proof mode alone.
- Do not require live provider credentials for tests.
- Do not claim live provider behavior until integrated and tested.
