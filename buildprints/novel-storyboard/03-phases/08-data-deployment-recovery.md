# Phase 08 — Data Deployment And Recovery Console

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md` before code edits. Execute through phase-flow and block evidence until `.buildprint/phase-runs/08-data-deployment-recovery/plan.md` and proof exist.

## Operation outcome

An operator can export data, import a backup, inspect storage/runtime health, run a guarded reset, view logs, and deploy or package the system with health/readiness and rollback proof. Destructive actions require authorization, confirmation, audit records, and recovery instructions.

## Phase mode contract

blueprint_mode: infrastructure

phase_style: operations_contract

Glance surfaces delivered: Data, deployment, and recovery console

This phase owns operations: deploy/apply, rollback, health/readiness, drift detection, observability, backup/restore, and destructive-action hardening.

## Mapped operation obligations

- Database export/import, full reset, table/data clear equivalents, local media/data backup policy, logs, package/build/start scripts, container or desktop packaging, health/readiness.

## Behavior compatibility contract

Preserve backup/restore/reset capabilities and packaged runtime shape, but strengthen authorization, confirmation, audit, validation, rollback, and observability.

## Implementation scope

- Recovery console for export/import/reset with diff/preview, confirmation phrase, role check, audit row, and restore validation.
- Backup format with version, schema, media manifest, checksums, and restore report runtime artifact.
- Deployment scripts, production build/run, container/desktop packaging as selected, health/readiness, rollback plan, log export, drift/config check.
- CI gates tying all phase verification together.

## Interfaces touched

Recovery/admin UI, data export/import/reset APIs, backup service, migration service, media manifest service, deployment scripts, health/readiness, logging/observability, CI config.

## State/runtime touched

Owns backup/export runtime artifacts, import reports, reset audit rows, migration state, deployment metadata, health status, logs, and rollback artifacts. Reads all durable product data but only through backup/recovery contracts.

## UX/UI requirements

Admin operations must be calm and unmistakable: danger zones separated, confirmation text explicit, backup preview readable, restore progress stable, health cards actionable, and failure recovery clear.

## Safety/security constraints

Destructive actions require auth, role/ownership checks, confirmation, audit, backup recommendation, CSRF/replay protection where applicable, import schema validation, file size limits, path containment, and rollback plan.

## Quality gates

- Export/import roundtrip with seeded project/assets/canvas data.
- Reset denial/confirmation/audit tests.
- migration_retention_backup_upload_limits tests.
- deploy/apply or production build proof, health/readiness check, rollback drill, drift detection, observability/log output.
- Browser e2e for recovery console safe paths.
- `verify:no-fake` and `PHASE_ID=08-data-deployment-recovery verify:phase-artifacts`.

## Proof gate

Required labels: `operations_health_rollback_proof`, `migration_retention_backup_upload_limits`, `security_boundary`, `production_readiness`, `durable_persistence`.

Proof must show backup restores project/source/assets/canvas/media references, reset cannot run accidentally, health/readiness passes, rollback path is documented and exercised, and deployment blockers are honest.

## Repair routing

Backup/import/reset, deployment, health, rollback, drift, observability, or admin UI failures route to this phase. Missing earlier product data routes to owning earlier phases.

