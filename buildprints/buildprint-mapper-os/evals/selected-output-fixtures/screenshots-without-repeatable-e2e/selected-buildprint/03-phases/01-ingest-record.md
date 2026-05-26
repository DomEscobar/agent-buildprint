# Phase 01 — Upload and persist submitted records

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare phase objective, assemble required roles, dispatch bounded subagent tasks or simulate them explicitly, collect reviews, integrate, verify, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - test-and-verification

## Product outcome

Implement one real vertical ingest path: accept a submitted record, validate required fields, store it durably, and allow readback through a separate operation.

## Source evidence

- Product obligation: OBL-INGEST
- Source surface: SRC-INGEST-API
- Source evidence: OBSERVED(api/records.ts:1-20) accepts record input and writes a stored result.

## Source surface dispositions

- Surface id: SRC-INGEST-API
  - Disposition: preserve capability, target route/handler may differ.
  - Equivalent target behavior: accept record input, validate required fields, store durably, and expose readback.
  - Compatibility impact: source route name is evidence, not a mandatory clone target.

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

This phase is UI-bearing. Keep the UX contract inline: proof must include empty, loading, error, blocked, and success/ready screenshots or blocker rows.

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
- For UI-facing behavior, provide screenshot evidence, or an honest blocker for unavailable browser tooling.
- For persistence/provider behavior, prove readback and provider adapter/config/test behavior; record blockers only for unavailable live credentials, external services, or deployment authorization.

## Proof gate

- Proof id: proof-01-ingest-record
- Required proofs: browser_runtime_trace, ux_design_gate, screenshot_state_set, persistence_roundtrip, clean_room_implementation_trace, no_fake_scan_pass.
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
