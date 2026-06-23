# Phase 01 - Contract and Config

## Objective

Define the capability boundary before implementing retrieval.

## Required inputs

- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`
- `.buildprint/rag-security-plan.md`
- `.buildprint/rag-evaluation-plan.md`

## Required outputs

- typed `RetrievalSubject`
- typed `RetrievalScope`
- typed document metadata
- typed chunk metadata
- typed ACL model
- typed retrieval request/response
- typed citation/evidence model
- typed generation output model
- feature flags for parser, embeddings, reranker, and generation
- provider configuration with secret names only, never secret values

## MCP tool contract

At minimum expose or internally implement:

- `rag.ingest_file`
- `rag.ingest_project`
- `rag.get_ingestion_status`
- `rag.search`
- `rag.retrieve_evidence`
- `rag.generate_answer`
- `rag.generate_structured_output`
- `rag.evaluate_query`
- `rag.explain_sources`
- `rag.reindex_document`
- `rag.delete_document`

Every retrieval/generation tool must accept:

- `subject`
- `scope`
- `purpose`
- query or task payload

Reject calls with missing subject, tenant, scope, or purpose.

## Security invariant

Write the invariant into code comments or tests near the retrieval service:

```text
The authorized corpus is computed before dense search, keyword search, fusion, reranking, citation, and generation. Post-retrieval filtering is not the security boundary.
```

## Proof before moving on

- request, subject, scope, ACL, evidence, citation, and receipt contracts are visible
- provider config and feature flags are named without secret values
- retrieval security invariant is documented near the retrieval service or tests
- no ingestion or retrieval implementation exists without these contracts
