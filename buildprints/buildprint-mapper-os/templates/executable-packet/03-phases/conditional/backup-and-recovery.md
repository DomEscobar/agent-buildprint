# Phase 13 — Backup and recovery

requires_roles: [data-persistence, product-architect, security-boundary]

## Product intention

Protect continuity of durable product data through backup, restore, retention, and failure recovery behavior.

## Mapped obligations

- Define backup scope, schedule, retention, and restore workflow.
- Define migration/recovery expectations for schema and data changes.
- Define corruption/failure detection and operator response.

## Stable vs free

- Stable: backup/restore outcomes, retention policy semantics, and recovery guarantees.
- Free: storage engine and backup tooling details.

## Implementation scope

- Document and script backup/restore commands for owned durable stores.
- Add restore validation check for central entities/artifacts.
- Define migration rollback/fallback behavior.
- Add recovery playbook for partial failures and corrupted state.

## Interfaces touched

- Persistence/storage layer and migration tooling.
- Operator commands for backup/restore.
- Health/status surfaces for data integrity alerts.

## State / runtime touched

- Durable project/domain/report artifacts.
- Backup archives and retention metadata.
- Recovery markers and restore logs.

## UX / DX / operator requirements

- Recovery steps are concise and executable.
- Operator can distinguish data loss from provider/runtime outage quickly.

## Required output (data-persistence)

- State/schema lifecycle is explicit with restart/readback verification.
- Migration, cleanup, retention, and recovery expectations are defined.

## Blocks (data-persistence)

- Persistence claims without restart/readback evidence.
- No ownership or recovery story for durable data.

## Required output (security-boundary)

- Backup and restore flows protect secret and sensitive data boundaries.

## Blocks (security-boundary)

- Sensitive data copied to insecure backup paths.
- Restore path bypassing permission boundaries.

## Required output (product-architect)

- Data flow includes backup/restore lifecycle where durability is promised.

## Blocks (product-architect)

- Durable claims with no recovery boundary ownership.

## Quality bar

Backup and restore are executable on a clean environment and recover central artifacts without silent corruption.

## Do not ship

- Durable claims with no backup policy.
- Restore process that requires manual DB surgery not documented in the packet.
- Retention policy undefined for user-generated artifacts.

## Repair routing

- persistence contradiction -> `02-project-setup.md`
- missing restore verification -> current phase
- unresolved recovery risk -> `05-handover.md`

## Unlock condition

At least one backup-restore cycle for central artifacts is documented and verified, or explicitly blocked with operator-safe fallback.
