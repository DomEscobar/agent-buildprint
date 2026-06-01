# Phase 04 — State and data

## Product intention

Make product continuity trustworthy: state machines, persistence, sync/cache, import/export, and failure recovery should support the user's work.

## Build

- State machines for central entities/results/workflows.
- Persistence/readback for user-created or generated work.
- Sync/cache behavior where source or provider data can become stale.
- Import/export/download behavior where the product promises portability or reports.
- Recovery paths for failed saves, interrupted generation, retries, and partial results.

## Quality bar

A user should be able to leave, reload, change inputs, recover from errors, and export or inspect important output without losing trust.

## Do not ship

In-memory-only continuity where persistence is promised, silent data loss, stale output with no indication, broken export, or impossible recovery from a failed provider/task.
