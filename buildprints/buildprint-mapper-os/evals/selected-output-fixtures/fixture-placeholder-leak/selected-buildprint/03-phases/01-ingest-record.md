# Phase 01 — Upload and persist submitted records

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence. Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - test-and-verification

## Product outcome

Implement one real vertical ingest path: accept a submitted record, validate required fields, store it durably, and allow readback through a separate operation.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Lens: this phase is a product-mode ingest/readback operation, so it is written as an outcome flow rather than a framework primitive map or provider boundary transaction.
- Shared proof spine:
  - Preconditions/inputs: user-submitted record fields are available.
  - Entrypoint/use site: API/controller receives a record submission and readback request.
  - Execution behavior: validate required fields, store durably, expose readback.
  - State/artifact effects: persisted record and validation/readback result.
  - Observable proof: tests and runtime evidence prove validation, persistence, and readback.
  - Failure/recovery: missing fields fail clearly; failed proof routes back to current phase.
  - Non-goals: provider live proof and worker lifecycle claims do not upgrade without matching adapter/runtime evidence.

## Mapped product obligations

- Product obligation: OBL-INGEST
- Mapped surface: SRC-INGEST-API
- Mapped product obligations: OBSERVED(api/records.ts:1-20) accepts record input and writes a stored result.

## Behavior compatibility contract

- Surface id: SRC-INGEST-API
  - Disposition: preserve capability, target route/handler may differ.
  - Equivalent target behavior: accept record input, validate required fields, store durably, and expose readback.
  - Compatibility impact: mapped route name is evidence, not a mandatory clone target.

## Implementation scope

1. Implement the smallest real ingest path.
2. Add validation failure handling.
3. Add persistence readback.
4. Run proof gates.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

Inputs:
- User-submitted record fields.
- Existing persisted records for readback.

Outputs/downstream handoff:
- Stored record.
- Validation result.
- Readback result consumed by later workflow slices.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: identify and implement only those required by this phase.
- Provider/tool contracts: implement provider adapter/config/test seams before live proof; disclose deterministic, sandbox, or live mode where provider behavior is claimed.
- None — reason: only if this phase truly touches no interface boundary.

## State/runtime touched

Production runtime: define worker queue ownership, retry/cancel/failure recovery, progress persistence, restart behavior, and health/observability hooks when this phase touches async or runtime behavior.

Data lifecycle: define migrations, retention/delete/export, backup/readback, upload limits, object/file storage, and sensitive data handling when this phase touches durable state or uploads.

- Use a real API/service/storage seam; do not fake success in UI state only.
- Validation must reject missing required fields.
- Persistence must be durable or explicitly blocked with a ledger row.
- Runtime artifacts/generated outputs: optional export runtime artifact `records.json`; do not use naked ambiguous file refs for future product files.

## UX/UI requirements

This phase is UI-bearing. Keep the UX contract inline: proof must include repeatable browser/e2e coverage plus screenshot or DOM evidence for empty, loading, error, blocked, and success/ready states. Screenshots alone do not satisfy UI completion.

- Build a real visual user action path through the UI/controller/runtime boundary and back to visible readback.
- Screenshot critique: browser proof must include visual critique against the workbench UX quality contract in `02-project-setup.md`.

## Safety/security constraints

- Define and preserve auth/session/tenant/privacy boundaries appropriate to the product; do not omit them because the source boundary is implicit or credentials are missing.
- Never expose secrets in logs, UI, screenshots, reports, or evidence rows.
- Ask before destructive actions, external writes, paid providers, deployments, or irreversible migrations.
- Stop instead of claiming persistence if restart/readback cannot run.
- Stop instead of claiming browser proof if screenshots/browser trace cannot be produced.
- Stop if source-independent implementation evidence is unavailable.

## Quality gates

- Run the smallest meaningful typecheck/lint/test/build gate for changed files.
- Add or update tests for changed behavior and failure states.
- For UI-facing behavior, provide repeatable browser/e2e proof plus screenshot or DOM evidence, or an honest blocker for unavailable browser tooling.
- For persistence/provider behavior, prove readback and provider adapter/config/test behavior; record blockers only for unavailable live credentials, external services, or deployment authorization.

## Proof gate

- Proof id: proof-01-ingest-record
- Required proofs: browser_runtime_trace, ux_design_gate, visual_quality_gate, screenshot_state_set, persistence_roundtrip, clean_room_implementation_trace, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits, repeatable_browser_e2e
Live credentials, paid services, or external deployment approval may block live proof only after adapter/config/test/runtime wiring exists. Do not satisfy this phase with deterministic-only providers, screenshots-only UI proof, in-memory-only state, route-shaped handlers, or local MVP shortcuts.

- Negative tests: rejects missing required fields.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`

Required runtime evidence row must use `phase_id: 01-ingest-record` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
