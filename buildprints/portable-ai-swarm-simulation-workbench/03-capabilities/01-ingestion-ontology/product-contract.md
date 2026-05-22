# Source Ingestion And Ontology

## Product Obligation

Upload PDF/Markdown/text seed material with a natural-language prediction requirement, extract text, persist a project, and generate an ontology suitable for downstream graph and agent simulation.

## Inputs

- `files: pdf|md|markdown|txt`
- `simulation_requirement`
- `project_name`
- `additional_context`

## Observable Outputs

- `project_id`
- `ontology.entity_types`
- `ontology.edge_types`
- `analysis_summary`
- `files`
- `total_text_length`

## Required States

- Not started or empty.
- Loading or async progress with current stage.
- Ready/completed with persisted identifiers.
- Failed with actionable error.
- Retry or force-regenerate where supported.
- Refresh/restart readback where state is durable.

## Boundaries

Provider-backed behavior must disclose whether it is deterministic-test-double, sandbox live, or production live. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.
