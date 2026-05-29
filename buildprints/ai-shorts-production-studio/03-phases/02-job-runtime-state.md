# Phase 02 - Job Runtime And State

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this current phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md`, then

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

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: product outcome flow with shared proof spine.
- Shared proof spine: preconditions/inputs, entrypoint or use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.
- Product implementation rule: preserve source-backed outcome flows through UI/API/domain/provider/persistence boundaries without copying source implementation code.

## Product outcome

Generation starts as a pollable job, exposes ordered logs and provider request records, supports pending/running/success/failure/blocked/canceled/retry semantics, persists or honestly scopes runtime state, and never reports fake completion before output artifacts exist.

## Mapped product obligations

- Source path `app.py` used in-memory job/status maps, background tasks, status endpoints, output directories, retry behavior, and generation result/error fields.
- Source path `dashboard/src/components/SaaShortsTab.jsx` polled status, showed logs/progress, and recovered existing job state.
- Source path `saasshorts.py` orchestration produced staged provider work and output manifests.

## Behavior compatibility contract

- async-jobs-and-runtime: preserve. Equivalent target behavior: pending/running/success/failure/blocked/canceled/retry lifecycle with logs, provider records, result/error, output manifest, and visible status polling. Compatibility impact: target may replace in-memory maps with local durable storage.
- local-output-state: preserve. Equivalent target behavior: app-controlled output area and generated manifest refs. Compatibility impact: path/URL conversion may be cleaner than source.
- restart-safe-production-durability: defer unless proven. Equivalent target behavior: either state survives restart in a test or the limitation is recorded. Compatibility impact: no production durability claim without proof.
- provider-runtime-records: preserve. Equivalent target behavior: ordered provider request records attached to job and output manifest.

## Implementation scope

Implement job creation, status transitions, cancel, retry, logs, provider request record capture, output manifest placeholder/state ownership, idempotent retry attempt behavior, and local persistence/readback strategy. Add tests for lifecycle transitions, cancel preventing late success, retry after failure, blocked live-key or consent states, ordered logs, provider records, and restart/readback or a recorded blocker.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: start generation, get status, cancel generation, retry generation, inspect manifest/provider records.
- Provider/tool contracts: adapters called through job runtime, never directly from UI.
- None - reason: browser UI can consume these interfaces in a later phase.

## State/runtime touched

- Database/persistence: job store, logs, provider request records, output manifest metadata, retry lineage, consent state references.
- Env/config: provider mode and storage location.
- Jobs/workers/runtime: scheduler/queue/background task model, transition guards, cancellation token or equivalent.
- Runtime artifacts/generated outputs: runtime artifact: job records; runtime artifact: job logs; runtime artifact: output manifest draft; runtime artifact: provider request record set.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


None - reason: this phase is runtime-facing. Downstream UI obligations: expose empty, queued, running, success, failure, blocked, canceled, retrying, and completed states from real job status, not local-only fake state.

## Safety/security constraints

Do not run live providers by default. Do not leak provider tokens in logs or records. Cancel must prevent later success for that attempt. Retry must not duplicate owner media unexpectedly. Blocked states must carry human-readable reasons without exposing secret values.

## Quality gates

- Lifecycle unit/integration tests.
- Persistence readback or restart test, or blocker row for production durability.
- No-network default gate.
- Structured error and blocked-state tests.
- Evidence that a completed job is not possible without real generated output or an explicit downstream dependency.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-02-job-runtime-state
Required proof types:
- unit_or_integration_test
- persistence_roundtrip_or_blocker
- runtime_or_browser_trace_or_blocker
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, media, worker/runtime, browser, gallery, and publish handoff paths.

Required runtime evidence row must use `phase_id: 02-job-runtime-state` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
