# Phase 13 - Backup and recovery

requires_roles: [data-persistence]

## Product intention

This phase is included but blocked under trusted_local posture.

## Mapped obligations

Define backup, restore, retention, and recovery for uploaded files, graph memory, simulations, reports, logs, and provider configuration references.

## Stable vs free

Stable: user data can be restored.

Free: backup mechanism.

## Implementation scope

Blocked until posture is promoted.

## Interfaces touched

Storage, graph database, report/simulation stores.

## State / runtime touched

All durable state.

## UX / DX / operator requirements

Operators need documented restore steps and tested recovery.

## Required output (data-persistence)

Implement backup/restore and verify a restore walkthrough.

## Blocks (data-persistence)

No production data claims without tested recovery.

## Quality bar

Restore returns a project, graph, simulation, and report to a usable state.

## Do not ship

No-backup public/private deployment.

## Repair routing

Implement before production-shaped state retention.

## Unlock condition

Backup and restore are tested.

