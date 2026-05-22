# Graph Build And Visualization

## Product Obligation

Build a provider-backed graph from extracted text and ontology, expose async task progress, retrieve graph nodes/edges, and visualize graph structure with inspectable node/edge details.

## Inputs

- `project_id`
- `graph_name`
- `chunk_size`
- `chunk_overlap`
- `force`

## Observable Outputs

- `task_id`
- `graph_id`
- `node_count`
- `edge_count`
- `graph nodes/edges`

## Required States

- Not started or empty.
- Loading or async progress with current stage.
- Ready/completed with persisted identifiers.
- Failed with actionable error.
- Retry or force-regenerate where supported.
- Refresh/restart readback where state is durable.

## Boundaries

Provider-backed behavior must disclose whether it is deterministic-test-double, sandbox live, or production live. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.
