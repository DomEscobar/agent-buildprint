# Implementation Workflow

## First Slice

Implement the smallest vertical slice that exercises real inputs, state transitions, error handling, persistence/readback, and visible UI or runtime behavior for `05-report-interaction`.

## Suggested Steps

1. Define the domain model and API boundary.
2. Implement deterministic adapters before live providers unless credentials are explicitly provided.
3. Wire UI or runtime state to real API/state, not static fixtures.
4. Add negative tests for validation/provider/task failures.
5. Produce proof artifacts and append a ledger entry.

## First Gate

Run focused unit/integration tests plus a browser/runtime proof appropriate to this capability.

## Repair Loop

failed check -> observed failure -> contract gap -> focused fix -> rerun check -> pass or documented blocker.

## Stop Condition

Stop if this capability cannot be proven without mislabeling mocks, static data, no-op controls, or unreviewed sensitive behavior as production-ready.
