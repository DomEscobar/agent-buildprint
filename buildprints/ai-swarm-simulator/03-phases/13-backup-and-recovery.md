# Phase 13 - Backup And Recovery

requires_roles: [data-persistence, security-boundary]

## Product intention

Block production data claims until local and deployed graph/project/report data can be backed up and restored.

## Mapped obligations

- Back up project metadata, uploads, extracted text, graph backend data, simulation state, reports, and logs.
- Restore into a fresh environment.
- Document destructive reset vs recoverable delete behavior.

## Stable vs free

Stable: backup/restore must cover graph memory, not only app files.

Free: backup tool and storage target.

## Implementation scope

Included but blocked under trusted-local posture.

## Interfaces touched

Storage layer, graph backend, runbook, admin/ops commands.

## State / runtime touched

All durable product state.

## UX / DX / operator requirements

Operator can tell what data is protected and what is not.

## Required output (data-persistence)

Backup/restore smoke.

## Blocks (data-persistence)

Backup omits graph backend or uploaded files.

## Quality bar

Restored environment can open a prior project graph and report.

## Do not ship

Do not call data durable if it cannot be restored.

## Repair routing

Recovery gaps go to this phase.

## Unlock condition

Backup and restore are proven on a fixture project.
