# Perfect RAG / Retrieval OS Buildprint

A stack-adaptable Buildprint for production-grade RAG: ingestion, chunking, permissions, hybrid retrieval, fusion, reranking, grounded answer generation, refusal behavior, and regression eval gates.

This is not "vector DB + prompt". The blueprint encodes the benchmark-backed pattern: **hybrid first-stage retrieval + reranking/late interaction + citation-grounded generation + repeatable evals**.

## Local proof

The included proof is an offline TypeScript fixture implementation. It makes no network calls and uses deterministic lexical/dense-like scoring so coding agents can test the architecture without API keys.

Proof limits: the fixture uses static in-repo chunks, no ingestion persistence, no live vector database, no embedding/reranker/LLM provider, no HTTP/API layer, and only a minimum eval report. Production adaptations must add durable ingestion/index update jobs, real provider adapters as needed, full traces, and eval gates for the target corpus.

```bash
cd proof
npm test
```

## Research basis

The original research artifact path was local to the authoring environment and is not a portable validation source for this checkout. Treat the checked-in spec, contracts, eval harness, and proof tests as the reproducible baseline.

Evidence-backed sources include BEIR, MTEB, ColBERT, SPLADE, HyDE, RAPTOR, Self-RAG, CRAG, GraphRAG, Anthropic Contextual Retrieval, Ragas, LlamaIndex retrieval eval, SentenceTransformers retrieve-rerank, Vespa retrieval eval, and FlagEmbedding.
