# Phase 01 — Upload and persist submitted records

## Product outcome

Implement one real vertical ingest path: accept a submitted record, validate required fields, store it durably, and allow readback through a separate operation.

## Source evidence

- Product obligation: OBL-INGEST
- Source surface: SRC-INGEST-API
- Source evidence: OBSERVED(api/records.ts:1-20) accepts record input and writes a stored result.

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
- Provider/tool contracts: disclose deterministic, sandbox, or live mode where provider behavior is claimed.
- None — reason: only if this phase truly touches no interface boundary.

## State/runtime touched

- Use a real API/service/storage seam; do not fake success in UI state only.
- Validation must reject missing required fields.
- Persistence must be durable or explicitly blocked with a ledger row.

## UX/UI requirements

This capability is UI-bearing. Follow `02-context/ux-contract.md` and `02-context/design-quality-bar.md`; proof must include empty, loading, error, blocked, and success/ready screenshots or blocker rows.

## Safety/security constraints

- Preserve auth/privacy/tenant boundaries if present.
- Never expose secrets in logs, UI, screenshots, reports, or evidence rows.
- Ask before destructive actions, external writes, paid providers, deployments, or irreversible migrations.
- Stop instead of claiming persistence if restart/readback cannot run.
- Stop instead of claiming browser proof if screenshots/browser trace cannot be produced.
- Stop if source-independent implementation evidence is unavailable.

## Quality gates

- Run the smallest meaningful typecheck/lint/test/build gate for changed files.
- Add or update tests for changed behavior and failure states.
- For UI-facing behavior, provide browser/screenshot proof or an honest blocker.
- For persistence/provider behavior, prove readback/live mode or record a blocker.


## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `05-evidence/evidence-ledger.jsonl`
