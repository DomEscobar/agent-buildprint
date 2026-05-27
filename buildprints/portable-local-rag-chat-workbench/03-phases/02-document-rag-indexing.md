# Phase 02 - Document RAG Indexing

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence. Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

Fast replay constraint: first implement the smallest local ingestion/chunk/vector/retrieval path plus an interactive document/RAG UI action surface, run parser/vector/retrieval/UI-state proof commands, write architecture/UX/QA review artifacts, and append the first valid `.buildprint/evidence/evidence-ledger.jsonl` checkpoint. Optional browser automation, live Ollama embedding proof, HTTP serving, and polish happen only after that checkpoint exists.

The first checkpoint is not phase completion. After `checkpoint_recorded`, finish the phase core path: upload/add document action -> validation/chunking -> embedding seam/vector store -> retrieval query -> citation/readback state transition. Static document cards, dead upload controls, or a browser blocker without local interaction proof do not satisfy `phase_core_passed`.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

User can upload supported documents or add a URL, index content into chunks, store embeddings through a SQLite/libSQL-compatible vector path, run retrieval, and see grounded citations attached to chat answers.

## Mapped product obligations

Source surface IDs: SRC-RAG-003, SRC-RAG-004.

Product obligations: document ingestion, chunking, vector search, citations, grounding confidence, and retrieval test/eval path.

Mapped product obligation refs:
- https://github.com/Maxkrvo/OllamaChat README describes upload of markdown, text, PDF, code, and URL indexing.
- https://github.com/Maxkrvo/OllamaChat README describes SQLite/libSQL vector search, citations, grounding confidence, and grounding evals.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Behavior compatibility contract

- Surface id: SRC-RAG-003 document ingestion.
  - Disposition: preserve capability, target route/function names may differ.
  - Equivalent target behavior: documents and URLs are validated, parsed, chunked, indexed, and assigned status.
  - Compatibility impact: parser internals may differ; this is not route/function parity.
- Surface id: SRC-RAG-004 retrieval and citations.
  - Disposition: preserve capability.
  - Equivalent target behavior: retrieved chunks and citation metadata influence assistant context and persisted response records.
  - Compatibility impact: vector implementation may vary if proof passes.

## Implementation scope

1. Implement file/URL intake with supported-type and size validation.
2. Implement chunking and embedding seam with deterministic test double plus Ollama-compatible embedding provider.
3. Implement SQLite/libSQL-compatible vector storage or a documented equivalent local durable vector path.
4. Wire retrieval into chat context with citation and grounding metadata.
5. Prove at least one local UI action path: document input/upload action -> indexing runtime call -> persisted chunk/vector result -> retrieval/citation readback state transition.
6. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `phase_id: 02-document-rag-indexing`.

Inputs: file or URL, supported extension list, chunk size, overlap, embedding model, top-k, similarity threshold.

Outputs/downstream handoff: document id, chunk records, embedding/vector records, retrieval results, citations, grounding level, indexing status.

## Interfaces touched

- Document upload/index API or server action.
- Parser/chunker/embedding/vector-store modules.
- Chat context builder and citation response contract.
- Document management UI states.

## State/runtime touched

Production runtime: define worker queue ownership, retry/cancel/failure recovery, progress persistence, restart behavior, and health/observability hooks when this phase touches async or runtime behavior.

Data lifecycle: define migrations, retention/delete/export, backup/readback, upload limits, object/file storage, and sensitive data handling when this phase touches durable state or uploads.

Stable obligations:
- Indexed documents must survive readback.
- Retrieval must cite persisted chunks.
- Failed indexing must not create successful document records.
- `phase_core_passed` requires a local interaction/state-transition trace, not only static DOM hooks.

Free choices:
- Vector representation, parser library, and queue implementation may vary if contracts and proofs pass.

Boundary requirements:
Provider-backed embeddings must disclose deterministic-test-double, sandbox live, or production live mode. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


Document UI must include empty, upload/loading, indexing, indexed, failed, blocked-provider, search, citation, and delete/reindex states. It must expose at least one real action/control path for indexing and retrieval readback. UI-bearing proof must include repeatable browser/e2e coverage plus screenshot or DOM evidence for claim qualification. Screenshots alone do not satisfy UI completion.

If browser tooling is unavailable, run a local UI interaction/state-transition proof against the UI/controller/runtime path and record a separate non-upgrading browser/UX blocker with `blocks_continuation: false`.

## Safety/security constraints

- Enforce file type and size limits.
- Treat URLs and files as untrusted input.
- Do not leak document contents into logs or evidence rows beyond minimal non-secret proof summaries.
- Stop rather than claim live provider/runtime behavior from deterministic adapters; live credentials block live proof only after adapter/config/test/runtime wiring exists.
- Stop on secret exposure, unsafe upload handling, failed owned persistence, failed local retrieval proof, or missing parser/indexer error paths. Missing live-provider, browser/e2e, screenshot, deployment, or external-service proof limits claim qualification; record a non-upgrading blocker with blocks_continuation: false and continue if the core phase path is implemented and locally proven.

## Quality gates

- Run parser/chunker/vector/retrieval tests.
- Run negative tests for unsupported type, oversized file, failed URL fetch, provider failure, and corrupted vector record.
- Run a local UI interaction/state-transition proof for document indexing, retrieval, citation, and blocked-provider states.
- Run browser/e2e proof for upload, indexing, retrieval, and citation states or record an honest non-upgrading browser blocker.
- Run no-fake scan for static citations and hardcoded retrieval rows.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


- Proof id: proof-02-document-rag-indexing
- Required proof tracks:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip
  - evidence_ledger_entry
  - ui_action_path
  - state_transition_proof
  - phase_core_passed
  - browser_runtime_trace
  - ux_design_gate
  - screenshot_state_set
  - provider_adapter_config_test_required
  - live_provider_proof_blocker_only
  - worker_retry_cancel_recovery
  - repeatable_browser_e2e
  - security_boundary_review
  - clean_room_implementation_trace
  - no_fake_scan_pass
Do not copy all proof tracks into one evidence row. Each runtime row must list only the proof labels backed by its commands and artifacts. Browser/e2e/screenshot, worker, security, and live-provider claims require separate matching proof rows or non-upgrading blocker rows.

`security_boundary_review` may upgrade only from an executable row whose command explicitly exercises unsafe URL/file handling, upload limits, secret redaction, permission/session ownership, or destructive-action boundaries. Do not use a `type`, `proof_type`, or `source` value containing "review" for an upgrading security row; put review context in a separate non-upgrading row.

Live credentials, local Ollama runtime, paid services, or external deployment approval may block live proof only after adapter/config/test/runtime wiring exists. Do not satisfy this phase with deterministic-only providers, screenshots-only UI proof, in-memory-only state, route-shaped handlers, static citations, or local MVP shortcuts.

- Negative tests: unsupported file, oversized file, failed fetch, provider failure, retrieval miss, persistence failure, and phase safety/security constraints.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`

Required runtime evidence row must use `phase_id: 02-document-rag-indexing` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

Evidence timing requirement: write the ledger directly after local parser/vector/retrieval/UI-state proof commands pass, before optional server polish, browser automation retries, live Ollama checks, docs, or final response. A replay with only `checkpoint_recorded` but no `ui_action_path`, `state_transition_proof`, and `phase_core_passed` row is still incomplete for this phase.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
