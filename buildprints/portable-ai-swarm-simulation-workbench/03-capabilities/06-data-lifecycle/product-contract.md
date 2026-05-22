# History And Data Lifecycle

## Product Obligation

Persist projects, files, extracted text, simulations, run states, reports, and history views with safe reset/delete/export/readback behavior.

## Inputs

- `project_id`
- `simulation_id`
- `report_id`
- `limit`
- `delete/reset confirmation`

## Observable Outputs

- `history records`
- `persisted metadata`
- `downloadable config/report`
- `deleted/reset state`
- `restart readback proof`

## Required States

- Not started or empty.
- Loading or async progress with current stage.
- Ready/completed with persisted identifiers.
- Failed with actionable error.
- Retry or force-regenerate where supported.
- Refresh/restart readback where state is durable.

## Boundaries

Provider-backed behavior must disclose whether it is deterministic-test-double, sandbox live, or production live. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.
