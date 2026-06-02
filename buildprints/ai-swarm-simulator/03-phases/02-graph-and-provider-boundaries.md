# Phase 02 — Graph Build And Provider Boundary

## Product intention

Turn the ontology and extracted text into an inspectable knowledge graph while keeping the graph-memory boundary honest. The user should understand whether a real graph exists, is building, failed, or is blocked by missing credentials.

## Build

- Implement the graph build transaction: validate project readiness, split text, create graph, set ontology, ingest text, wait for processing, fetch graph data, and persist graph id/status.
- Provide task progress with messages and recoverable failure state.
- Build graph read APIs and a UI graph surface with node/edge counts, refresh, layout mode, and detail inspection.
- Show provider setup guidance when graph-memory credentials or local graph database configuration or sandbox access are missing.
- Preserve graph reset/delete only if it has confirmation and cannot silently destroy user work.

## Quality bar

- Graph build cannot start before ontology/text exists.
- Progress updates are visible while build is running and final graph data can be read after reload.
- The graph surface is nonblank when graph data exists and has a useful empty state when it does not.
- Node and edge detail inspection changes based on selection and avoids raw JSON as the default view.

## Do not ship

- Fake nodes/edges labeled as provider results.
- A graph refresh button that does nothing.
- A provider exception shown only in logs.
- A delete/reset path without explicit confirmation.


### Open-source graph memory replacement

Do not implement against Zep Cloud as the required provider. Build an open-source graph-memory adapter seam instead. Prefer a Graphiti-compatible temporal graph path with local/open graph database backing; if unavailable, expose the missing local graph runtime as a blocker and keep deterministic local inspection only clearly labeled.

The graph workbench must be clickable and inspectable: selectable entities/relations, canvas navigation/layout, side inspector, graph build progress, and visible connection to generated agents and reports.
