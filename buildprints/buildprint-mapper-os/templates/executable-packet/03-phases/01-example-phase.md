# Phase 01 — <phase-name>

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`:

1. declare phase objective
2. assemble required roles
3. dispatch bounded subagent tasks or simulate them explicitly if subagents are unavailable
4. collect reviews
5. integrate
6. verify
7. record evidence

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - test-and-verification

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
- Production runtime: define worker queue ownership, retry/cancel/failure recovery, progress persistence, restart behavior, and health/observability hooks when this phase touches async or runtime behavior.
- Data lifecycle: define migrations, retention/delete/export, backup/readback, upload limits, object/file storage, and sensitive data handling when this phase touches durable state or uploads.
- Runtime artifacts/generated outputs: label future product files explicitly as runtime artifacts or generated outputs; do not use naked ambiguous file refs.
- None — reason:

## UX/UI requirements

Describe user-facing states: empty, loading, error, blocked, success/ready, responsive, accessible. If not user-facing, write `None — reason:`.

## Safety/security constraints

Secrets, auth, tenant/privacy, destructive actions, uploads, external writes, provider modes.

Production safety gates: define auth/session/tenant behavior, request-size/rate limits, secret handling, audit-relevant events, and destructive-action confirmation where applicable.

## Quality gates

Commands/checks required for this phase.

## Proof gate

Proof id: proof-<phase-id>
Required proof types:
- unit_or_integration_test
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- migration_retention_backup_upload_limits
- repeatable_browser_e2e
- runtime_or_browser_trace
- persistence_roundtrip
- security_boundary_review
- no_fake_scan_pass
- evidence_ledger_entry

Live credentials, paid services, or external deployment approval may block live proof only after adapter/config/test/runtime wiring exists. Do not satisfy this phase with deterministic-only providers, screenshots-only UI proof, in-memory-only state, route-shaped handlers, or local MVP shortcuts.

Required runtime evidence row must use `phase_id: <phase-id>` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
