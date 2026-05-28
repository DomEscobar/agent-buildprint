# Phase 01 — Record ingest product outcome

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - ux-ui-craft
  - test-and-verification

## Product outcome

A user can submit a record, validate required fields, persist it durably, and read it back through the browser workbench.

## Phase mode contract

- blueprint_mode: mixed
- phase_style: mixed_contract
- Lens: this phase is a product-mode outcome flow — user submits and reads back a record through the UI.
- Shared proof spine:
  - Preconditions/inputs: user-submitted record fields.
  - Entrypoint/use site: UI/controller receives record submission.
  - Execution behavior: validate, persist, readback.
  - State/artifact effects: persisted record, validation result.
  - Observable proof: API readback and UI success state.
  - Failure/recovery: missing fields fail clearly; provider blocked state shown.
  - Non-goals: payment integration (owned by phase 02).

## Mapped product obligations

- Own SRC-PRODUCT-INGEST: accept record, validate, persist durably, expose readback.
- Preserve owner/session checks and destructive-action confirmation.

## Behavior compatibility contract

- Disposition: preserve product ingest capability.
- Equivalent target behavior: accept record, validate, persist, readback.
- Compatibility impact: route names may change; behavior preserved.

## Implementation scope

1. Implement the record ingest path.
2. Add validation and persistence.
3. Run proof gates including repeatable_browser_e2e and visual_quality_gate.
4. Append proof rows to `.buildprint/evidence/evidence-ledger.jsonl`.

## Interfaces touched

- API/routes: record create/get/list.
- UI controller: ingest form and readback state.
- None — reason: only if this phase truly touches no interface boundary.

## State/runtime touched

- Persisted record, validation result.
- Runtime artifacts: optional export runtime artifact `records.json`.

## UX/UI requirements

This phase is UI-bearing. Keep the UX contract inline: proof must include repeatable_browser_e2e coverage plus screenshot evidence for empty, loading, error, and success states.

- Build a real visual user action path through UI/controller/runtime boundary and back to visible readback.
- Screenshot critique: browser proof must include visual critique against the workbench UX quality contract in `02-project-setup.md`.

## Safety/security constraints

- Never expose secrets.
- Enforce owner/session checks.

## Quality gates

- Unit tests for validation.
- API/integration test for ingest and readback.
- Browser e2e for form, error, success states.
- No-fake scan.

## Proof gate

- Proof id: proof-01-product-ingest
- Required proofs: browser_runtime_trace, ux_design_gate, visual_quality_gate, screenshot_state_set, persistence_roundtrip, clean_room_implementation_trace, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits, repeatable_browser_e2e

Live credentials may block live proof only after adapter/config/test/runtime wiring exists.

- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl`
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`

Required runtime evidence row must use `phase_id: 01-product-ingest` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
