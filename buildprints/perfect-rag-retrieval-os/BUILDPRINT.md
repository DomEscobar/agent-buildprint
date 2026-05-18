# Perfect RAG / Retrieval OS Buildprint

## Agent Operating Contract

Build a stack-adaptable retrieval augmented generation system that retrieves permission-safe evidence and generates citation-grounded answers with measurable quality gates.

This Buildprint does not allow "vector DB + prompt" to be called complete. A serious RAG system needs hybrid first-stage retrieval, fusion, permission filtering, reranking or late interaction, context packing, grounded answer generation, refusal behavior, traces, and repeatable evals.

## Binding Implementation Slice

The included TypeScript proof is an offline retrieval-core implementation for the fixture ingestion, retrieval, answer, refusal, and eval contract. It uses:

- static in-repo chunks with source and access metadata;
- deterministic lexical and dense-like scoring;
- hybrid retrieval with fusion, dedupe, permission filtering, and reranking;
- contextualized text on selected fixture chunks;
- citation-grounded answers;
- insufficient-evidence refusal;
- a compact eval report covering recall@5, MRR, top chunk id, answer behavior, permission filtering, reranking, and one contextualized retrieval case.

The proof intentionally omits production persistence, live provider integrations, deployed HTTP/API routes, and corpus-specific production eval gates. It must still expose a deterministic query function boundary, fixture ingestion/update path, trace object, and token-budget accounting for the accepted offline core.

## Non-Goals / Unsafe Claims

- Do not call plain vector search complete RAG.
- Do not claim universal benchmark state of the art.
- Do not claim production readiness from the offline proof alone.
- Do not generate answers without citations to selected evidence.
- Do not let private or tenant-mismatched chunks reach context packing.
- Do not require live model, vector database, reranker, or provider credentials for tests.
- Do not count provider adapter interfaces as live provider behavior until integrated and tested.

## Required Read Order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `EVAL_HARNESS.md`
5. `TARGET_STACK_ADAPTERS.md`
6. `TEST_MATRIX.md`
7. `README.md`
8. `proof/` only as executable reference evidence

## Phase Gates

1. Corpus and threat model: identify document types, tenants, permissions, freshness needs, answer-risk level, citations, refusal policy, latency/cost budget, and target stack/search infrastructure.
2. Contracts and fixtures: define source, chunk, query, candidate, reranked context, answer, trace, and eval case records with a small public/private fixture corpus.
3. Ingestion and chunking: normalize sources, preserve metadata, create stable chunk ids, retain source spans, estimate tokens, and add contextualized chunk text when needed.
4. Hybrid retrieval: implement lexical/sparse and dense channels, using deterministic local scorers in proof mode and selected search/vector providers in production.
5. Fusion, filtering, and reranking: normalize scores, fuse channels, dedupe by chunk id, enforce permissions, and rerank top candidates.
6. Grounded answer generation: pack context within a token budget, cite selected chunks, and refuse unsupported questions.
7. Evaluation harness: measure retrieval, answer, refusal, citation, permission, latency, and cost fields appropriate to the target corpus.
8. Optional advanced modules: add HyDE, query rewriting, SPLADE, ColBERT, RAPTOR, GraphRAG, Self-RAG/CRAG, or live reranker adapters only when evals justify the complexity.

## Acceptance Gates

- Retrieved contexts carry source and citation metadata.
- Permission and tenant filters apply before context packing and answer generation.
- Hybrid retrieval returns expected chunks where lexical-only or dense-only retrieval can miss targeted cases.
- Reranking improves hard-case ordering or preserves correct top contexts.
- Answers cite retrieved evidence or return insufficient evidence.
- Unsupported questions refuse instead of fabricating.
- Private or tenant-mismatched chunks cannot appear in an unauthorized answer path.
- Retrieval variants are measurable against fixture or corpus eval cases.
- Tests pass without live provider credentials.
- Offline proof emits a query result trace with selected contexts, permission-filter decisions, token-budget fields, and labeled latency/cost fields.
- Fixture ingestion/update path can add or update documents before retrieval.

## Purpose

Use this Buildprint when building a RAG feature or retrieval OS that must be portable across backend stacks while preserving evidence quality, permission safety, and repeatable evaluation.

## Architecture

```txt
Documents
  -> Normalize
  -> Chunk with source spans and access scopes
  -> Optional contextualized chunk text
  -> Lexical/Sparse Index + Dense Index
  -> Hybrid Retrieve
  -> Fuse, Dedupe, and Permission Filter
  -> Rerank / Late Interaction
  -> Token-Budgeted Context Pack
  -> Grounded Answer with Citations or Refusal
  -> Eval Report and Trace
```

Optional advanced modules:

- HyDE, query rewriting, and multi-query expansion for recall;
- SPLADE-style sparse neural retrieval;
- ColBERT-style late interaction;
- cross-encoder or BGE reranking;
- RAPTOR tree summaries for long documents;
- GraphRAG for global corpus questions;
- Self-RAG/CRAG adaptive retrieve/critique/correct loops.

## Evidence Boundary

The bundled proof is reproducible evidence for a minimum local contract. It is not evidence of durable ingestion, live vector search, live embeddings, live reranking, LLM provider generation, deployed API routes, complete trace pipelines, or target-corpus quality.

Production evidence must include durable source/index updates, selected provider adapters, full trace fields, latency and cost labels, token-budget accounting, permission-drop reporting, and corpus-specific eval gates.

## Required Validation

For the bundled proof:

```bash
cd proof
npm test
```

For a production adaptation, run the host app's equivalent test/eval command and record retrieval recall, MRR, nDCG-like ranking quality where available, faithfulness, answer correctness, refusal behavior, citation precision, permission filtering, latency fields, cost fields, and token-budget behavior.

## Copyable Agent Prompt

Build the Perfect RAG / Retrieval OS from `BUILDPRINT.md`. Treat `BUILDPRINT.md` as the canonical authority before every other file. First identify the corpus, tenant and permission model, update frequency, answer-risk level, citations, refusal policy, latency/cost budget, target stack, search infrastructure, and eval cases. Then implement source ingestion, chunking, lexical/sparse and dense retrieval, fusion, dedupe, permission filtering, reranking, token-budgeted context packing, grounded answer generation with citations, insufficient-evidence refusal, traces, and eval gates. Use deterministic local fixtures for tests unless live provider integration is explicitly selected and separately validated. Do not call vector-only retrieval complete.
