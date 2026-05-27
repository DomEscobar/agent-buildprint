# Phase 01 — Corpus Contracts

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
  - test-and-verification

## Product outcome

The implementation project has a concrete RAG scope decision, threat model, typed domain contracts, fixture corpus, and deterministic proof path for public/private retrieval cases. It is clear which backend, auth identity, storage, search, and provider modes are baseline, live, blocked, or deferred.

## Mapped product obligations

- Legacy source required corpus and threat-model alignment before implementation: document types, tenants, permissions, freshness, answer-risk level, citations, refusal policy, latency/cost budget, target stack, and search infrastructure.
- Legacy contracts defined access scope, document source, chunk, query plan, candidate, reranked context, RAG answer, and eval case records.
- Legacy proof used public and private fixture chunks, deterministic lexical/dense-like scoring, citations, unsupported refusal, and unauthorized private filtering.
- Legacy non-goals disallowed production claims from local proof, vector-only completion, uncited answers, provider credential requirements for tests, and live-provider claims from adapter interfaces.

## Behavior compatibility contract

- Corpus and threat model: preserve. Equivalent target behavior is a setup/config document or implementation artifact that records corpus, tenant, permission, freshness, risk, citation, refusal, latency, cost, stack, and provider decisions. Compatibility impact: none unless the human selects a live paid provider or destructive index path.
- Type/domain contracts: preserve. Equivalent target behavior may use local language/framework types but must keep stable ids, source metadata, access scopes, spans, citations, traces, eval cases, and refusal fields. Compatibility impact: field names may adapt; semantics cannot disappear.
- Fixture proof corpus: preserve. Equivalent target behavior is a deterministic fixture corpus with public/private, exact, semantic, contextualized, unsupported, and rerank/distractor cases. Compatibility impact: fixture contents may change to match the target product.
- Live provider selection: defer. Equivalent target behavior is provider adapter interfaces plus explicit blocker rows until credentials/config and live proof exist. Compatibility impact: deterministic proof mode must remain available.

## Implementation scope

Create or update the implementation project's RAG module boundaries and contracts:

- source/corpus config and threat model record;
- domain contracts for access scopes, document sources, chunks, query plans, candidates, ranked contexts, answers, traces, and eval cases;
- small deterministic fixture corpus with public/private tenant data and expected labels;
- proof-mode adapters or test fixtures that do not call live providers;
- initial validation that unauthorized users cannot see private fixture chunks.

Do not implement full indexing, retrieval ranking, or answer generation beyond contract/fixture scaffolding unless the host project already has those paths and this phase needs thin integration to prove contracts compile.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: source ingestion/query/eval contract types or schemas; optional route validators if the project already exposes these surfaces.
- Provider/tool contracts: embedding, lexical search, dense search, reranker, generator, evaluator, and trace sink interfaces with deterministic proof-mode implementations or test doubles.
- None — reason: if the target project is library-only, expose contracts through module exports instead of API routes.

## State/runtime touched

- Database/persistence: define source, chunk, access, trace, and eval state shape; migrations may be deferred to the ingestion phase if this phase only proves contracts.
- Env/config: define provider mode, tenant identity source, proof-mode flag, and live-provider env requirements without requiring secrets.
- Jobs/workers/runtime: identify ingestion and eval jobs but defer job execution to later phases.
- Runtime artifacts/generated outputs: runtime artifact: corpus threat model record; runtime artifact: fixture eval labels.
- None — reason: no durable writes are claimed if this phase only adds contracts and fixtures.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


If the project has UI, add or plan visible states for no corpus, setup blocked, private/unauthorized content unavailable, and insufficient-evidence/refusal copy. If not user-facing, write `None — reason:` in the UX review and record downstream UI obligations for the query/eval phases.

## Safety/security constraints

No live provider calls, paid services, corpus export, public deployment, or destructive indexing in this phase. Do not commit private corpus data, credentials, raw logs, or traces. Access scopes must default to deny when tenant/user identity is missing.

## Quality gates

- Typecheck/build for changed contracts.
- Unit tests or schema tests proving contracts parse/validate fixture records.
- Permission test proving unauthorized private fixture records are excluded from any contract-level accessible set.
- Static check or review that no live provider is required for tests.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-01-corpus-contracts
Required proof types:
- unit_or_schema_test
- security_boundary_review_or_blocker
- deterministic_provider_mode_check
- runtime_or_browser_trace_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, retrieval, worker/runtime, and proof-mode paths.

Required runtime evidence row must use `phase_id: 01-corpus-contracts` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this current phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
