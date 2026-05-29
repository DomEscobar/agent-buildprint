# Phase 03 — Retrieval And Answering

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
  - ux-ui-craft
  - security-boundary

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Outcome flow: a user/API query becomes permission-safe retrieved context, reranked evidence, token-budgeted context, and either a cited answer or insufficient-evidence refusal with trace output.
- Shared proof spine: inputs are query text, filters, tenant/user identity, indexes, and provider mode; execution behavior validates, retrieves, fuses, filters, reranks, packs, generates/refuses, and traces; state effects are trace/answer/eval event writes where owned; observable proof is retrieval, permission, rerank, grounded answer, refusal, token-budget, UI/API trace, provider-mode, and no-fake tests; failure/recovery routes missing live providers, trace persistence, browser tooling, or privacy approval to scoped blockers.

## Product outcome

Users or API consumers can submit a query and receive either a citation-grounded answer from selected permission-safe context or a clear insufficient-evidence refusal. The retrieval path uses hybrid lexical/sparse and dense channels, score normalization/fusion, dedupe, permission filtering before context packing, reranking or late interaction, token-budgeted context packing, and trace output.

## Mapped product obligations

- Legacy acceptance required contexts with source/citation metadata, permission and tenant filters before context packing, hybrid retrieval, reranking, citation-grounded answers, unsupported refusals, and private/tenant mismatch exclusion.
- Legacy contracts defined query plans, candidates, reranked contexts, citations, answers with confidence/refusal reason, and eval cases.
- Legacy proof compared lexical, dense-like, hybrid, and reranked paths and generated cited answers/refusals without live providers.
- Legacy non-goals disallowed uncited generated answers, vector-only completion, and live provider claims from untested adapters.

## Behavior compatibility contract

- Query planning and filters: preserve. Equivalent target behavior accepts query, filters, tenant/user identity, and strategy or provider mode. Compatibility impact: query strategy names may adapt but semantics must be testable.
- Hybrid retrieval: preserve. Equivalent target behavior combines lexical/sparse and dense candidates. Compatibility impact: provider scoring can differ, but targeted exact and semantic cases must pass.
- Fusion/dedupe/permission filtering: preserve. Equivalent target behavior normalizes/fuses scores, dedupes by chunk id, and drops unauthorized chunks before context packing. Compatibility impact: permission drops must be traceable.
- Reranking/late interaction: preserve. Equivalent target behavior reranks top candidates with deterministic proof scorer or live provider. Compatibility impact: live reranker requires separate evidence; proof scorer does not upgrade live claims.
- Grounded answer/refusal: preserve. Equivalent target behavior answers only from selected contexts, cites selected chunks, and refuses unsupported queries. Compatibility impact: answer style can change, but unsupported behavior and citation integrity cannot.

## Implementation scope

Implement the full query vertical slice:

- query validation and strategy/provider mode selection;
- lexical/sparse and dense retrieval calls;
- score normalization, fusion, dedupe;
- permission/tenant/user filtering before context packing;
- reranking or deterministic proof reranker;
- token-budgeted context packing;
- generator adapter that returns cited answers or insufficient-evidence refusal;
- compact trace with channels, scores, selected contexts, permission drops, token budget, latency/cost labels, and provider mode.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: query/answer endpoint or service, trace response, cited answer response, refusal response, validation errors.
- Provider/tool contracts: lexical/sparse index search, dense index search, reranker, generator, tokenizer, latency/cost collector.
- None — reason: if this is a CLI/library implementation, expose the same query service and trace contract without HTTP.

## State/runtime touched

- Database/persistence: read chunks and index state; optionally persist query traces and answer/eval events.
- Env/config: provider mode, live embedding/search/reranker/generator config, token budget, top-k, rerank-k, context budget, timeout/cost limits.
- Jobs/workers/runtime: none for synchronous proof mode; optional async trace or answer job if host app requires it.
- Runtime artifacts/generated outputs: runtime artifact: query trace; runtime artifact: provider latency/cost labels; generated output: cited answer response.
- None — reason: if trace persistence is deferred, record it as an operational blocker or later-phase obligation.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


If UI exists, implement query input, loading state, cited answer state, insufficient-evidence/refusal state, provider blocked state, error state, trace/evidence details for admins/developers, and no-overlap responsive rendering. Citations must be visibly tied to selected chunks or sources. Private/blocked content must not be hinted through titles or traces visible to unauthorized users.

## Safety/security constraints

Permission filtering must happen server-side before context packing, generation, citation display, trace display, and eval answer checks. Prompt injection or malicious corpus text must not override system/developer instructions or reveal secrets. Live provider calls require approval, env config, timeouts, and cost labels. Do not send private corpus text to external providers unless approved by the product/privacy boundary.

## Quality gates

- Typecheck/build.
- Retrieval test for exact identifier query and semantic paraphrase query.
- Rerank test showing improved or preserved target ordering on a hard distractor case.
- Permission test proving private/tenant-mismatched chunks cannot reach context packing or answer citations.
- Answer test proving citations reference selected chunks and unsupported query refuses.
- Token budget and trace field test, or explicit blocker for missing trace/persistence.
- Browser/API trace if UI or route exists.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-03-retrieval-answering
Required proof types:
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- permission_filter_test
- grounded_answer_and_refusal_test
- provider_live_or_deterministic_blocker
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, retrieval, worker/runtime, and proof-mode paths.

Required runtime evidence row must use `phase_id: 03-retrieval-answering` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this current phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
