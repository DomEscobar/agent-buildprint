# Phase 04 — State and data

requires_roles: [data-persistence, product-architect, integration-runtime]

## Product intention

Make product continuity trustworthy: state machines, persistence, sync/cache, import/export, and failure recovery should support the user's work.

## Mapped obligations

- State machines for central entities/results/workflows.
- Persistence/readback for user-created or generated work.
- Sync/cache behavior for stale provider/source data.
- Import/export and failure recovery behavior.

## Stable vs free

- Stable: data semantics, persistence guarantees, export/import shape, and recovery outcomes.
- Free: storage engine internals and cache strategy implementation.

## Implementation scope

- Implement state transitions for central workflows.
- Implement durable persistence and restart/readback checks.
- Implement import/export where promised.
- Implement failure, retry, and recovery paths.

## Interfaces touched

- State machine/controller boundaries.
- Persistence/storage and repository boundaries.
- Import/export APIs and file surfaces.

## State / runtime touched

- Durable entities and lifecycle metadata.
- Cache invalidation and sync status markers.
- Retry and failure recovery state.

## UX / DX / operator requirements

- Users should know whether data is saved, pending, stale, or failed.
- Recovery actions should be explicit and reversible where possible.

## Required output (data-persistence)

- State/schema lifecycle and restart/readback expectations are explicit.
- Migration, cleanup, retention, and recovery expectations are recorded when relevant.

## Blocks (data-persistence)

- In-memory-only behavior where durable continuity is promised.
- Persistence claims with no restart/readback proof path.

## Required output (integration-runtime)

- Provider-backed state transitions include timeout/retry/failure semantics.

## Blocks (integration-runtime)

- External state changes claimed with no runtime ownership.

## Required output (product-architect)

- Data flow ownership across UI/API/domain/provider/persistence is clear.

## Blocks (product-architect)

- State coupling that prevents safe extension or recovery.

## Quality bar

A user should be able to leave, reload, change inputs, recover from errors, and export or inspect important output without losing trust.

## Do not ship

In-memory-only continuity where persistence is promised, silent data loss, stale output with no indication, broken export, or impossible recovery from a failed provider/task.

## Repair routing

- persistence failure -> current phase
- state model contradiction -> `02-project-setup.md`
- unresolved continuity blocker -> `05-handover.md`

## Unlock condition

Core state survives restart/readback where promised and recovery paths are demonstrably available.
