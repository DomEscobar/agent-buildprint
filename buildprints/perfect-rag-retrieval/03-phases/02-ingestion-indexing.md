# Phase 02 — Ingestion And Indexing

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md`,

1. declare phase objective
2. write compact runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md` with required roles
3. create handoff/return files only for real delegation
4. collect reviews
5. integrate
6. verify
7. record evidence

Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - data-persistence
  - security-boundary

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Outcome flow: document source inputs become normalized, chunked, access-scoped, indexed, and readback-proven retrieval evidence.
- Shared proof spine: inputs are source records and fixture documents; execution behavior transforms sources into chunks and index entries; state effects include source/chunk/index metadata and job status where owned; observable proof is ingestion/update, chunk span/access, lexical readback, dense readback, persistence, and safety tests; failure/recovery routes missing persistence, live embeddings, destructive reset, or worker recovery proof to blocker rows without shrinking scope.

## Product outcome

The implementation project can ingest or update document sources, normalize text, produce stable citeable chunks with access scopes and token estimates, and write/read the retrieval index surfaces required for lexical/sparse and dense retrieval. Production durability is either proven by readback or blocked honestly; deterministic proof mode remains available.

## Mapped product obligations

- Legacy requirements included stable source ids, checksums, updated timestamps, metadata, access scopes, chunk ids, source spans, token estimates, and contextualized chunk text.
- Legacy architecture required normalize -> chunk -> optional contextualized text -> lexical/sparse index plus dense index.
- Legacy acceptance required fixture ingestion/update path can add or update documents before retrieval.
- Legacy evidence boundary said offline proof is not evidence of durable ingestion, live vector search, or production index updates.

## Behavior compatibility contract

- Source ingestion/update path: preserve. Equivalent target behavior is a service, job, command, or API route that adds/updates sources by stable id and checksum. Compatibility impact: route shape may vary, but update semantics and validation must exist.
- Chunking with spans and token estimates: preserve. Equivalent target behavior can use project-local tokenizer estimates but must keep citeable source spans and stable chunk ids. Compatibility impact: token counts may be estimates if labeled.
- Contextualized chunk text: preserve as optional baseline support. Equivalent target behavior stores extra context where ambiguous chunks need parent-document meaning. Compatibility impact: no contextual generation claim unless generated/stored and eval-tested.
- Lexical/sparse and dense index surfaces: preserve. Equivalent target behavior may use in-memory proof indexes, Postgres full-text plus pgvector, OpenSearch, Qdrant, Weaviate, Pinecone, Meilisearch, Typesense, or similar adapters. Compatibility impact: provider-specific ranking is acceptable only if eval gates pass.
- Production persistence: preserve or block. Equivalent target behavior needs durable readback when production durability is claimed. Compatibility impact: in-memory-only state is proof mode, not production.

## Implementation scope

Implement the ingestion vertical slice:

- source normalization and checksum/update handling;
- chunk generation with metadata, spans, access scopes, token estimates, and optional contextual text;
- lexical/sparse and dense index write/read surfaces;
- deterministic proof adapters that run without network or credentials;
- durable persistence path if the product claims production ingestion;
- delete/reset/re-index safeguards when supported.

Do not implement final answer generation in this phase except as a smoke path for retrieved chunks.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: ingestion/update/delete/re-index command or endpoint; index status response; validation errors for missing source id, invalid access scope, and unsupported document format.
- Provider/tool contracts: tokenizer, contextualizer, embedding adapter, lexical/sparse index adapter, dense index adapter, source repository, chunk repository.
- None — reason: if only a library/worker is in scope, expose command/service interfaces instead of HTTP.

## State/runtime touched

- Database/persistence: document source store, chunk store, access scope fields, index metadata, checksum/update timestamps, optional migration.
- Env/config: provider mode, embedding provider configuration, chunk size/overlap, token budget, search/index backend, queue settings.
- Jobs/workers/runtime: ingestion/update/re-index job, retry/error handling, index status, destructive reset confirmation.
- Runtime artifacts/generated outputs: runtime artifact: ingestion report; runtime artifact: index status report; generated output: chunk fixtures or snapshots if used by tests.
- None — reason: if persistence is unavailable, record a blocker and keep proof-mode evidence scoped.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


If UI exists, show corpus empty state, upload/import or source connection state, indexing progress, failed source validation, blocked provider credentials, successful update, and destructive re-index/delete confirmation. If no UI exists, record downstream UI obligations in the UX review.

## Safety/security constraints

Validate tenant and permission metadata at ingestion. Do not ingest raw private data into public fixtures or logs. Destructive delete/reset/re-index requires explicit confirmation. Live embedding/vector providers require configured credentials and cost approval. Provider errors must not leak secrets or private text.

## Quality gates

- Typecheck/build.
- Ingestion unit/integration test proving add/update creates stable chunks with source spans and access scopes.
- Index write/read test for lexical/sparse and dense/proof surfaces.
- Persistence readback test for durable claims or blocker row for unavailable persistence.
- Security test or review proving private access metadata survives chunking and indexing.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-02-ingestion-indexing
Required proof types:
- unit_or_integration_test
- persistence_roundtrip_or_blocker
- index_readback_or_blocker
- security_boundary_review_or_blocker
- provider_live_or_deterministic_blocker
- no_fake_scan_pass
- evidence_ledger_entry


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, retrieval, worker/runtime, and proof-mode paths.

Required runtime evidence row must use `phase_id: 02-ingestion-indexing` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this current phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
