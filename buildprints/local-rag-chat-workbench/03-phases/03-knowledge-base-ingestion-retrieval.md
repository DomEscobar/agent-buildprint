# Phase 03 - Knowledge Base Ingestion And Retrieval

## How to implement this phase

Before writing code, read:

- `01-questions.md`
- `03-phases/phase-flow.md`
- `05-evidence/evidence-ledger.jsonl`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`, resolving every role in `requires_roles` to `06-contracts/<role>.md` and recording proof only after handoffs, returns, reviews, and proof artifacts exist.

You may not append evidence or mark the current phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - data-persistence
  - security-boundary
  - ux-ui-craft

## Product outcome

Deliver the knowledge-base path: file/URL/content ingestion, document table, parser/chunker/embedding/vector storage, retrieval, chat grounding, citations, confidence/source trace, search/reindex/delete, and worker status/error recovery.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
- Mode lens: prove the operator outcome of adding knowledge and receiving grounded, cited chat context, not a generic RAG bucket.
- Shared proof spine: preconditions are chat runtime and provider seams; entrypoint is knowledge-base UI/API; execution validates upload/URL/content, creates document/job records, parses/chunks/embeds, stores vectors, retrieves top-k chunks, injects context after memory, persists citations, and displays source trace; state/artifact effects include document/chunk/vector/citation rows and job status; observable proof is parser/chunker/vector integration, retrieval quality review, citation UI/readback, worker status/failure recovery, and destructive confirmation; failure/recovery covers bad file, denied URL, parser failure, embedding provider unavailable, reindex failure, and delete cleanup.

## Mapped product obligations

- Source path `src/app/api/rag/documents/route.ts` implies document create/list, file/URL/content ingest, and processing queue.
- Source paths `src/lib/rag/index.ts`, `src/lib/rag/chunker.ts`, and `src/lib/rag/vector-db.ts` imply parser/chunker/embedding/vector durability.
- Source path `src/app/api/rag/search/route.ts` and `src/lib/chat/context.ts` imply retrieval and prompt grounding.
- Source path `src/components/knowledge-base.tsx` implies upload/drop, URL add, document table, reindex/delete, status/error/chunk/size/last-cited, and test search.
- Source schema models Document, Chunk, and MessageCitation imply durable readback.

## Behavior compatibility contract

Preserve product obligations without forcing route/function parity. Preserve file, URL, and direct content ingestion through equivalent target behavior with explicit validation. Compatibility impact: document status, error, chunk count, size, last-cited metadata, reindex/delete, retrieval, citations, grounding confidence, and evidence-safe eval/export must remain. The target may replace vector engine/storage if it preserves durable search and proof.

## Implementation scope

Implement ingestion job ownership, parser/chunker interfaces, deterministic embedding provider, vector search store or equivalent, retrieval service, citation persistence, knowledge-base UI/API, and tests. Live embedding provider, URL fetch, and watched folder automation may remain non-upgrading blockers if unavailable after local seams are proven.

## Interfaces touched

- UI/controller: knowledge-base upload/drop, URL/content add, table filters/search, reindex/delete confirmation, retrieval/citation display.
- API/application service: documents, chunks, ingestion jobs, retrieval search, citation readback.
- Worker/provider contracts: parse, chunk, embed, vector write/search/delete, job retry/cancel/error.

## State/runtime touched

- Persistence: documents, chunks/vectors, citations, ingestion jobs, errors, last-cited timestamps.
- Runtime: worker/job loop, URL fetch boundary, embedding provider seam, retrieval quality review export.

## UX/UI requirements

Apply the product-grade visual contract from `02-project-setup.md`. Screenshot critique is required before visual claims upgrade. Required states: no documents, uploading/processing, indexed, failed parse, provider blocked, search results, citation display, reindex pending/success/error, delete confirmation, partial index warning, responsive table/card alternative without raw JSON.

## Safety/security constraints

Validate uploads, file types, sizes, URL schemes, private addresses, redirects, and path handling. Do not include uploaded content in evidence unless synthetic. Destructive delete/reset requires confirmation and cleanup proof.

## Quality gates

- Upload/URL/content validation tests, including denied private URL or unsafe path.
- Parser/chunker/vector integration test with synthetic fixtures.
- Retrieval quality test and citation persistence/readback.
- Worker status/progress/error/retry or blocker proof.
- Browser/e2e or blocker proof for upload/search/reindex/delete and visible citations.

## Proof gate

Proof id: proof-03-knowledge-base-ingestion-retrieval
Required proof types:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- repeatable_browser_e2e
- unit_or_integration_test
- worker_retry_cancel_recovery
- runtime_or_browser_trace_or_blocker
- persistence_roundtrip_or_blocker
- security_boundary_review_or_blocker
- visual_quality_gate
- no_fake_scan_pass
- evidence_ledger_entry

Required runtime evidence row must use `phase_id: 03-knowledge-base-ingestion-retrieval`.

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, streaming, tool, retrieval, voice, and settings boundaries.

## Repair routing

If verification fails, repair in this phase unless the blocker is missing prior chat runtime/provider seam, setup contradiction, or explicit human approval for external URL fetching.
