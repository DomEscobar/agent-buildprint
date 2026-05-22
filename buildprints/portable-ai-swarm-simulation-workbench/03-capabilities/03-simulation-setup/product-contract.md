# Simulation Setup

## Product Obligation

Create a simulation from a project graph, read/filter entities, generate OASIS-compatible agent profiles and simulation configuration, and surface preparation progress.

## Inputs

- `project_id`
- `graph_id`
- `enable_twitter`
- `enable_reddit`
- `entity_types`
- `use_llm_for_profiles`
- `parallel_profile_count`

## Observable Outputs

- `simulation_id`
- `profiles`
- `simulation_config`
- `prepare task progress`
- `ready state`

## Required States

- Not started or empty.
- Loading or async progress with current stage.
- Ready/completed with persisted identifiers.
- Failed with actionable error.
- Retry or force-regenerate where supported.
- Refresh/restart readback where state is durable.

## Boundaries

Provider-backed behavior must disclose whether it is deterministic-test-double, sandbox live, or production live. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.
