# Simulation Runtime Monitoring

## Product Obligation

Start, stop, monitor, and recover a Twitter/Reddit/parallel multi-agent simulation runtime, including action logs, round progress, process safety, and optional graph-memory updates.

## Inputs

- `simulation_id`
- `platform: twitter|reddit|parallel`
- `max_rounds`
- `enable_graph_memory_update`
- `force`

## Observable Outputs

- `runner_status`
- `current_round`
- `total_rounds`
- `actions counts`
- `recent actions`
- `process pid`

## Required States

- Not started or empty.
- Loading or async progress with current stage.
- Ready/completed with persisted identifiers.
- Failed with actionable error.
- Retry or force-regenerate where supported.
- Refresh/restart readback where state is durable.

## Boundaries

Provider-backed behavior must disclose whether it is deterministic-test-double, sandbox live, or production live. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.
