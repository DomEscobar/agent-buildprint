# Contracts

This file preserves the data contract summary for compatibility. Phase work must follow `03-phases/phase-flow.md` and the active phase file.

## Core Records

- Access scope: tenant id, public/private visibility, and optional allowed user ids.
- Document source: stable id, URI, title, checksum, updated timestamp, metadata, and access scope.
- Chunk: stable id, source id, text, optional contextual text, metadata, source span, token estimate, and access scope.
- Query plan: query, rewritten queries, filters, tenant/user identity, and retrieval strategy.
- Candidate: chunk id, retrieval channel, raw score, normalized score, and reason.
- Reranked context: chunk, rank, score, citation, and quoted span.
- RAG answer: answer text, citations, confidence, and optional refusal reason.
- Eval case: query, tenant/user identity, expected chunks, expected answer assertions, and forbidden claims.

## Adapter Boundaries

- Embedding adapter returns vectors or deterministic proof tokens.
- Lexical/sparse index returns exact-term candidates.
- Dense index returns semantic candidates.
- Reranker orders candidate contexts.
- Generator returns a cited answer or refusal.
- Evaluator emits machine-readable metrics.
