# Data Persistence Contract

This role owns durable state, schemas, files, reports, imports, exports, migrations, restart/readback, retention, backup, and delete/reset behavior. It prevents in-memory demos and ambiguous generated files from being counted as product durability.

## When Active

Activate for phases touching databases, local files, object storage, uploads, generated artifacts, graph/model/project data, conversations, reports, imports, exports, retention, reset/delete, backup/restore, restart/readback, or any state that must survive a process restart.

If the phase intentionally owns no durable state, the return must state why and list any downstream persistence obligations it creates.

## Handoff Scope

The handoff must include:

- active phase state/runtime requirements;
- `02-project-setup.md` durable persistence contract and product obligation/surface matrix;
- relevant schemas, repositories, stores, storage adapters, runtime artifacts, generated outputs, migrations, fixture/test data, and data tests;
- security-sensitive data boundaries from the security role when present.

Do not ask this role to choose an entirely different database without a product reason. It verifies the selected persistence path and lifecycle behavior.

## Persistence Workflow

The return must identify:

- state/schema owner and storage boundary;
- create/read/update/delete behavior owned by this phase;
- migration/versioning plan when schema or artifact shape can change;
- restart/readback proof path;
- consistency and concurrency posture where simultaneous jobs/users can touch state;
- retention, export, delete/reset, backup/restore, quota, upload limits, object/file storage, and sensitive data handling where applicable;
- runtime artifacts/generated outputs versus packet files.

## Data Lifecycle Quality Bar

- Every durable entity must have an owner and readback path.
- State written by a provider/worker must be observable after restart or an explicit blocker must say why not.
- Generated files must be stored under product runtime paths, not packet source paths.
- Migrations/versioning are required when schema or artifact format can evolve.
- Import/export/delete/reset must define what happens to linked files, derived indexes, cached provider output, and evidence-safe logs.
- Uploads must define size/type limits, parse failure behavior, cleanup, and exposure boundaries.

## Reject If

- Product state is in memory while durability is claimed.
- Restart/readback, migrations, ownership, cleanup, retention, backup/export, or delete/reset behavior is unspecified.
- Generated outputs and runtime artifacts are confused with packet files.
- Upload limits, quotas, sensitive data handling, object/file storage semantics, or cleanup rules are missing where applicable.
- A generic API smoke test upgrades `migration_retention_backup_upload_limits` without matching lifecycle proof.
- A file write is accepted as durable proof without readback, error behavior, schema/version ownership, and cleanup semantics.
- Vector/search/cache/report indexes can drift from source records with no rebuild or invalidation path.

## Required Return Headings

The return file `.buildprint/phase-runs/<phase-id>/returns/data-persistence.md` must use:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## State/schema ownership`
- `## Lifecycle semantics`
- `## Migration/restart/readback proof`
- `## Retention/export/delete/backup`
- `## Runtime artifacts and generated outputs`
- `## Sensitive data and upload limits`
- `## Consistency and recovery risks`
- `## Required repair before evidence`

## Proof/Evidence Expectations

Durability claims require write/readback and restart/readback where applicable.

`migration_retention_backup_upload_limits` needs matching executable lifecycle proof or a non-upgrading blocker. Generic API smoke tests are not enough.

For indexed/search/vector/graph/cache state, proof must also show rebuild, invalidation, or traceability to the source record where the phase owns that behavior.
