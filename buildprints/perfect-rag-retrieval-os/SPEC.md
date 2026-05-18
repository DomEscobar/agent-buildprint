# Perfect RAG / Retrieval OS Spec

## Goal

Implement a portable RAG feature/system that retrieves relevant, permission-safe evidence and generates citation-grounded answers with measurable quality gates.

## Functional requirements

1. Ingest document sources with stable source ids, checksums, updated timestamps, metadata, and access scopes.
2. Split sources into chunks with stable ids, source spans, token estimates, and metadata.
3. Optionally add contextualized chunk text that preserves document-local meaning.
4. Build/update two first-stage search surfaces:
   - lexical/sparse fields for exact terms and identifiers
   - dense semantic embeddings or deterministic proof substitute
5. Accept queries with optional filters and user/tenant identity.
6. Retrieve candidates from lexical/sparse and dense channels.
7. Normalize/fuse scores and deduplicate candidates.
8. Enforce permission/tenant filters before context packing.
9. Rerank the top candidates with a stronger scorer or late-interaction adapter.
10. Generate answers with citations to chunk/source ids.
11. Refuse or return insufficient-evidence when the selected context does not support the answer.
12. Produce trace logs containing retrieval channels, scores, selected contexts, latency/cost placeholders, and refusal reason.
13. Run eval cases covering retrieval recall, MRR/nDCG, faithfulness, answer correctness, refusal, and permission filtering.

## Non-goals for default proof

- No live vector database.
- No real embedding API.
- No real reranker API.
- No real LLM provider call.
- No claim of universal benchmark SOTA.

## Acceptance behavior

A generated implementation passes when fixture evals show:

- hybrid retrieval returns expected chunks where lexical-only or dense-only can miss targeted cases
- reranking improves hard-case ordering or preserves correct top contexts
- cited answers quote/support claims from retrieved context
- unsupported questions refuse
- private/tenant-mismatched chunks are not retrieved into the answer path


---

## Consolidated notes from `ADVANCED_TECHNIQUES.md`

# Advanced Techniques

Enable these only when eval cases show they help.

## HyDE / query rewrite / multi-query

Useful when user queries are short, vague, or semantically far from source wording. Costs extra model calls and can introduce false detail, so trace generated queries.

## SPLADE / sparse neural retrieval

Useful when exact-term matching and semantic expansion are both important. Usually needs specialized indexing.

## ColBERT / late interaction

Strong retrieval quality for many search tasks, but with higher index/runtime complexity than single-vector retrieval.

## Cross-encoder or BGE reranker

Recommended second-stage scorer for top candidates. Keep first-stage retrieval broad and fast; rerank top-N.

## RAPTOR

Useful for long documents and multi-level abstraction. Adds summary tree ingestion and update complexity.

## GraphRAG

Useful for global corpus questions, entity/theme exploration, and query-focused summarization over a whole collection. Not a default support-bot requirement.

## Self-RAG / CRAG

Useful for adaptive retrieval, critique, and correction when retrieval quality varies. Adds orchestration and latency; gate with evals.

## Contextual retrieval

Prepend or store chunk-specific context when chunks lose meaning outside the parent document. Validate with recall@k and answer faithfulness.


---

## Consolidated notes from `PLAN.md`

# Perfect RAG / Retrieval OS Plan

## Phase 0 — Align corpus and threat model

Identify document types, tenants, permissions, freshness needs, answer-risk level, and latency/cost budget.

## Phase 1 — Contracts and fixtures

Create source, chunk, index, query, candidate, reranked context, answer, trace, and eval-case contracts. Add a small fixture corpus with public/private documents and expected retrieval labels.

## Phase 2 — Ingestion and chunking

Normalize text, preserve source metadata, create stable chunk ids, retain source spans, estimate token counts, and optionally add contextual chunk summaries.

## Phase 3 — Hybrid retrieval

Implement lexical/sparse and dense retrieval adapters. In proof mode, use deterministic local scorers. In production, adapt to the chosen search engine/vector store.

## Phase 4 — Fusion, filtering, and reranking

Normalize scores, fuse channels, dedupe by chunk id, enforce permissions, then rerank top candidates.

## Phase 5 — Grounded answer generation

Build a token-budgeted context pack. Generate cited answers only from provided context. Refuse when support is missing.

## Phase 6 — Evaluation harness

Measure recall@k, MRR, nDCG-like ranking quality, citation support, refusal behavior, permission filtering, latency, and cost placeholders.

## Phase 7 — Optional advanced modules

Add HyDE/query rewrite, RAPTOR, GraphRAG, Self-RAG/CRAG, ColBERT, SPLADE, or live reranker adapters only when evals justify complexity.


---

## Consolidated notes from `questions.md`

# Perfect RAG Questions

Ask these before adapting the blueprint:

1. What document types and update frequency?
2. Is this single-tenant, multi-tenant, or per-user private retrieval?
3. What queries matter most: exact lookup, semantic Q&A, global summaries, troubleshooting, compliance, code/docs?
4. What latency and cost budget per answer?
5. What source citations must be shown to users?
6. What is the fallback/refusal policy when evidence is insufficient?
7. Which stack/search infrastructure already exists?
8. What eval cases represent success and failure?
