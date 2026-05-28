# Data Persistence Contract

## When Active

Use this role for durable state, databases, files, uploads, reports, imports, exports, graph/model data, migrations, retention, reset/delete, backup, restore, and restart/readback behavior.

## Handoff Scope

- Active phase state/runtime requirements.
- `02-project-setup.md` durable persistence contract and product obligation/surface matrix.
- Relevant schema, repositories, storage adapters, runtime artifacts, and data tests.

## Reject If

- Product state is in memory while durability is claimed.
- Restart/readback, migrations, ownership, cleanup, retention, backup/export, or delete/reset behavior is unspecified.
- Generated outputs and runtime artifacts are confused with packet files.
- Upload limits, quotas, sensitive data handling, or object/file storage semantics are missing where applicable.

## Required Return Headings

- `## Verdict`
- `## State/schema ownership`
- `## Lifecycle semantics`
- `## Migration/restart/readback proof`
- `## Retention/export/delete/backup`
- `## Sensitive data and upload limits`
- `## Required repair before evidence`

## Proof/Evidence Expectations

Durability claims require create/read/update/delete or restart/readback proof. `migration_retention_backup_upload_limits` needs a matching executable test or a non-upgrading blocker; generic API smoke tests are not enough.
