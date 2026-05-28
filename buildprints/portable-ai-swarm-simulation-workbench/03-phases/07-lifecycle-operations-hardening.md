# Phase 07: Lifecycle Operations And Hardening

## How to implement this phase

phase_id: 07-lifecycle-operations-hardening

Before writing code, read:

- Packet file `03-phases/phase-flow.md`
- Runtime artifact `.buildprint/next-agent.md` if it exists
- `AGENTS.md` in the implementation project
- Packet file `02-project-setup.md`
- Packet file `01-questions.md`
- Resolve requires_roles through `06-contracts/<role>.md`
- Packet file `06-contracts/product-architect.md`
- Packet file `06-contracts/ux-ui-craft.md`
- Packet file `06-contracts/integration-runtime.md`
- Packet file `06-contracts/security-boundary.md`
- Packet file `06-contracts/data-persistence.md`
- Packet file `06-contracts/test-and-verification.md`

requires_roles: [product-architect, ux-ui-craft, integration-runtime, security-boundary, data-persistence, test-and-verification]

Follow phase-flow required artifacts before code and before evidence. Packet seed evidence remains in packet file `05-evidence/evidence-ledger.jsonl`; runtime evidence belongs only in `.buildprint/evidence/evidence-ledger.jsonl`.

A handoff and return artifact is required for every role in requires_roles before phase_core_passed.

## Phase mode contract

blueprint_mode: infrastructure
phase_style: operations_contract

This phase is an operations contract. It must define deploy/apply entrypoints, rollback, health/readiness, drift checks, observability, lifecycle cleanup, download/export controls, destructive confirmation, and public-deployment blockers.

## Operation outcome

Harden the MiroFish implementation so project, graph, simulation, report, runtime, download, cleanup, delete, reset, stop, shutdown, and provider configuration surfaces are operationally honest and safe. The phase does not add a new product story; it qualifies lifecycle and production readiness.

## Mapped operation obligations

- Preserve project lifecycle: get, list, reset, delete, file cleanup, and readback with destructive safeguards.
- Preserve graph read/delete lifecycle and provider error redaction.
- Preserve script/config downloads with correct-file behavior, missing-file errors, and no path traversal.
- Preserve runtime stop, cleanup, process tree handling, cleanup-all on shutdown, and safe rollback/readiness behavior.
- Preserve provider config/env validation for LLM, Zep, and OASIS names without copying secrets.
- Preserve deployment/operations posture: health/readiness, observability, drift, rollback, log redaction, and public deployment blockers.

## Behavior compatibility contract

Target disposition: preserve/harden/replace. Equivalent target behavior is required, not route/function parity. Operations may replace source lifecycle implementation details, but must preserve lifecycle semantics, destructive confirmation, artifact ownership, provider config names, safe cleanup, health/readiness, rollback, drift, and observability.

Compatibility impact:

- Local-only operation is allowed for first implementation, but public deployment remains blocked until auth/session/tenant and denied-path tests exist.
- Downloads and cleanup cannot trust UI-only disabled states; server-side checks and tests are required.
- In-memory-only state, static shell controls, deterministic-only provider, or local MVP operations are invalid production behavior unless explicitly prototype-only.

## Implementation scope

Implement lifecycle APIs, destructive confirmation, cleanup jobs, shutdown cleanup, download/export guards, config validation, health/readiness checks, deployment/apply instructions, rollback path, drift checks, observability/log redaction, public-deployment blockers, and admin/lifecycle UI states where present.

## Interfaces touched

- API/controller endpoints for project list/get/reset/delete, graph read/delete, downloads, runtime stop/cleanup/shutdown, config/env status, health/readiness, and admin operations.
- Operations/runtime services for process tree stop, cleanup, rollback, drift checks, deploy/apply commands, and observability hooks.
- Persistence lifecycle for uploads, project text, graph metadata, simulation artifacts, SQLite stores, report artifacts, logs, and backups/retention.
- Browser/admin/workbench controls for destructive actions, downloads, env status, cleanup, and blocked public deployment states.

## State/runtime touched

Own lifecycle state transitions, audit records, cleanup markers, deletion/reset readback, download/export manifests, health/readiness status, deployment state, rollback markers, drift status, observability logs, and provider config diagnostics. Operations proof must distinguish deploy/apply commands from implementation tests.

## UX/UI requirements

This phase is UI-bearing where lifecycle controls appear. UI must show env/config status, destructive confirmations, disabled reasons, cleanup progress, download results, safe error messages, and public-deployment blockers. UI proof needs repeatable_browser_e2e, visual_quality_gate, Screenshot critique, and no generic admin card grid with dead controls.

## Safety/security constraints

Auth/session/tenant boundary must be explicit for public deployment; otherwise record a blocker. Validate paths for downloads/deletes, require destructive confirmation, audit destructive operations, redact secrets/logs/evidence, enforce upload retention/delete semantics, and ensure process cleanup cannot kill unrelated processes.

## Quality gates

- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- operations_health_rollback_proof
- deploy_apply_entrypoint_documented_and_tested
- rollback_health_readiness_drift_observability
- migration_retention_backup_upload_limits
- destructive_denied_path_and_confirmation_tests

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists.

## Proof gate

Gate: lifecycle_deploy_health_rollback_security_proof.

Required proof includes lifecycle list/get/reset/delete, graph delete, downloads with traversal denial, runtime stop/cleanup/shutdown, process safety, config validation, health/readiness, rollback, drift, observability, upload retention, secret redaction, public deployment blocker where needed, browser lifecycle proof, and evidence row with phase_id: 07-lifecycle-operations-hardening.

## Repair routing

Repair the current phase for lifecycle, destructive action, download, cleanup, deploy/apply, rollback, health/readiness, drift, observability, UI, security, or persistence failures. Route missing implementation prerequisites to their dependency phases. Route architecture contradictions to packet file `02-project-setup.md`. Route public-deployment or credential product decisions to packet file `01-questions.md`. Record blockers only in `.buildprint/evidence/evidence-ledger.jsonl`.
