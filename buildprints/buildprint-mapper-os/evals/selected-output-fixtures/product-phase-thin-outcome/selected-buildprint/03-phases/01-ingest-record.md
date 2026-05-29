# Phase 01 — Upload and persist submitted records

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - test-and-verification

## Product outcome

Upload and persist submitted records

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Lens: this phase is a product-mode ingest/readback operation.
- Shared proof spine:
  - Preconditions/inputs: user-submitted record fields are available.
  - Entrypoint/use site: API/controller receives a record submission.
  - Execution behavior: validate required fields, store durably, expose readback.
  - State/artifact effects: persisted record and validation/readback result.
  - Observable proof: tests and runtime evidence prove validation, persistence, and readback.
  - Failure/recovery: missing fields fail clearly.
  - Non-goals: provider live proof and worker lifecycle claims do not upgrade without matching evidence.

## Mapped product obligations

- Product obligation: OBL-INGEST
- Mapped surface: SRC-INGEST-API
- Mapped product obligations: OBSERVED(api/records.ts:1-20) accepts record input and writes a stored result.

## Behavior compatibility contract

- Surface id: SRC-INGEST-API
  - Disposition: preserve capability.
  - Equivalent target behavior: accept record input, validate required fields, store durably, and expose readback.
  - Compatibility impact: mapped route name is evidence, not a mandatory clone target.

## Implementation scope

Implement the smallest real vertical path for this capability.

Inputs are defined by the product obligation and interface contracts.

Outputs are defined by the product obligation and interface contracts.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: identify and implement only those required by this phase.
- Provider/tool contracts: implement provider adapter/config/test seams before live proof.
- None — reason: only if this phase truly touches no interface boundary.

## State/runtime touched

- Persisted record and validation/readback result.
- Runtime artifacts: optional export runtime artifact `records.json`.

## UX/UI requirements

This phase is UI-bearing. Keep the UX contract inline: proof must include repeatable browser/e2e coverage.

- Build a real visual user action path through the UI/controller/runtime boundary.
- Screenshot critique: browser proof must include visual critique against `02-project-setup.md`.

## Safety/security constraints

- Define and preserve auth/session/tenant/privacy boundaries.
- Never expose secrets.

## Quality gates

- Run the smallest meaningful typecheck/lint/test/build gate for changed files.
- Add or update tests for changed behavior and failure states.

## Proof gate

- Proof id: proof-01-ingest-record
- Required proofs: browser_runtime_trace, ux_design_gate, visual_quality_gate, screenshot_state_set, persistence_roundtrip, clean_room_implementation_trace, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits, repeatable_browser_e2e

Live credentials may block live proof only after adapter/config/test/runtime wiring exists.

- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`

Required runtime evidence row must use `phase_id: 01-ingest-record` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
