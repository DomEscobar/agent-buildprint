# Phase 05 - Settings Data Lifecycle And Operations

## How to implement this phase

Before writing code, read:

- `01-questions.md`
- `03-phases/phase-flow.md`
- `05-evidence/evidence-ledger.jsonl`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md`, with role handoffs/returns and scoped proof before evidence.

You may not append evidence or mark the current phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - data-persistence
  - security-boundary
  - ux-ui-craft
  - test-and-verification

## Product outcome

Complete the operational backbone: model/app settings, RAG settings, memory budget, watched folders, supported file types, migrations/setup, health/readiness, export/delete/reset, eval/CI gates, evidence-safe logs, and durable data lifecycle behavior.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
- Mode lens: prove the operator outcome of configuring and safely operating the local workbench over time.
- Shared proof spine: preconditions are provider, RAG, and memory surfaces; entrypoint is settings/operations UI/API and setup commands; execution validates config, persists readback, applies settings to routing/retrieval/memory, runs migrations, reports health, exports/deletes/resets data with confirmation, and labels blocked watchers/live providers; state/artifact effects include AppConfig/RagConfig, migration state, health output, export artifact, and reset/delete proof; observable proof is validation tests, downstream behavior proof, migration/readback, data lifecycle tests, path safety, and browser settings proof; failure/recovery covers invalid config, denied watched folder path, failed migration, failed export/delete, and unavailable watcher.

## Mapped product obligations

- Source path `src/components/settings-form.tsx` implies default/code/embedding models, memory budget, voice settings, save/readback states.
- Source path `src/components/rag-settings.tsx` implies global RAG toggle, chunk size/overlap, top-k, threshold, embedding model, watched folders, supported file types.
- Source path `prisma/schema.prisma` implies durable AppConfig, RagConfig, and data models.
- Source path `package.json` and source path `README.md` setup/eval notes imply setup scripts, migrations, eval commands, and local operations.

## Behavior compatibility contract

Preserve product obligations without forcing route/function parity. Preserve settings breadth and data lifecycle scope through equivalent target behavior. Compatibility impact: the target may replace exact source scripts or schema names, but it must prove config validation, save/readback, downstream effects, migration/setup, health/readiness, export/delete/reset semantics, and blocked watcher/live/deployment claims honestly.

## Implementation scope

Implement settings services/UI/API, operations commands, migration/setup path, health/readiness endpoint or command, export/delete/reset flows with confirmation, watched folder path safety and optional watcher runtime, and tests.

## Interfaces touched

- UI/controller: settings tabs/forms, save/error states, data lifecycle actions, health/eval status, watcher status.
- API/application service: config read/write, operations, health/readiness, export/delete/reset, watcher registration.
- Runtime contracts: file watcher, migrations, eval/export jobs, logging/observability.

## State/runtime touched

- Persistence: AppConfig, RagConfig, provider settings, watched folders, supported types, data lifecycle metadata.
- Runtime: setup/migrations, health/readiness, eval jobs, export/delete/reset, watcher status, logs.

## UX/UI requirements

Apply the product-grade visual contract from `02-project-setup.md`. Screenshot critique is required before visual claims upgrade. Required states: settings loaded, invalid config, saved/readback, provider blocked, RAG disabled/enabled, watched folder denied/accepted, export running/success/failure, reset/delete confirmation, health ready/degraded, responsive forms that are not default browser-control dumps.

## Safety/security constraints

Secrets must be env handles only. Watched folders require path allow/deny policy and no broad filesystem crawl by default. Export/delete/reset are destructive and require confirmation, audit/readback, and evidence-safe synthetic data.

## Quality gates

- Config validation and persistence readback tests.
- Downstream behavior tests for model routing, retrieval params, and memory budget.
- Migration/setup/readback proof.
- Export/delete/reset tests with confirmation and cleanup proof.
- Path safety and watcher runtime proof or non-upgrading blocker.
- Browser/e2e or blocker proof for settings and data lifecycle actions.

## Proof gate

Proof id: proof-05-settings-data-lifecycle-operations
Required proof types:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- repeatable_browser_e2e
- unit_or_integration_test
- migration_retention_backup_upload_limits_or_blocker
- worker_retry_cancel_recovery
- runtime_or_browser_trace_or_blocker
- persistence_roundtrip_or_blocker
- security_boundary_review_or_blocker
- visual_quality_gate
- no_fake_scan_pass
- evidence_ledger_entry

Required runtime evidence row must use `phase_id: 05-settings-data-lifecycle-operations`.

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, streaming, tool, retrieval, voice, and settings boundaries.

## Repair routing

If verification fails, repair in this phase unless a prior phase contract does not expose necessary routing/RAG/memory settings or the human must approve destructive production data behavior.
