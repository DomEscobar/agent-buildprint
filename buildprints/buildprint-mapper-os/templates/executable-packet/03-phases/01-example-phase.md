# Phase 01 — <phase-name>

## Product outcome

Describe the working product slice this phase delivers.

## Source evidence

List source surfaces and product obligations this phase preserves.

## Source surface dispositions

For each source-backed surface this phase owns, state disposition as preserve, replace, merge, defer, or drop. If not preserved exactly, name the equivalent target behavior and compatibility impact. Do not require route/function parity unless it is the product boundary.

## Implementation scope

Describe the smallest real vertical implementation path.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts:
- Provider/tool contracts:
- None — reason:

## State/runtime touched

- Database/persistence:
- Env/config:
- Jobs/workers/runtime:
- Runtime artifacts/generated outputs: label future product files explicitly as runtime artifacts or generated outputs; do not use naked ambiguous file refs.
- None — reason:

## UX/UI requirements

Describe user-facing states: empty, loading, error, blocked, success/ready, responsive, accessible. If not user-facing, write `None — reason:`.

## Safety/security constraints

Secrets, auth, tenant/privacy, destructive actions, uploads, external writes, provider modes.

## Quality gates

Commands/checks required for this phase.

## Proof gate

Proof id: proof-<phase-id>
Required proof types:
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- persistence_roundtrip_or_blocker
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry

Required evidence row must use `phase_id: <phase-id>` and write to `05-evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, and external blockers to `05-evidence/evidence-ledger.jsonl`.
