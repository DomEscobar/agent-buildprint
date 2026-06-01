# Phase 01: Graph Memory Replacement

## Product intention

Replace Zep Cloud with a local, free/open-source graph-memory layer while preserving the product behaviors that depended on Zep: ontology-aware graph construction, episode ingestion, temporal facts, search, node/edge readback, simulation memory updates, and report-agent retrieval.

## Build

- Implement the graph-memory port from `02-project-setup.md`.
- Provide a Graphiti plus FalkorDB adapter by default, with config for host, database, graph name, embedding/LLM extraction provider, and timeouts.
- Add contract tests using a tiny seed text, an ontology, and a simulated activity update.
- Return canvas-ready node and edge payloads with stable ids, labels, facts, attributes, temporal fields, and episode references.
- Replace every direct graph SDK import in graph build, entity reading, memory update, report tools, and chat tools.

## Quality Bar

- The app can create a graph, ingest text, read all nodes/edges, search facts, and add simulation activities without Zep credentials.
- The canvas can render returned graph data without shape-specific hacks.
- Adapter errors surface actionable messages and do not corrupt project state.

## Do not ship

- `ZEP_API_KEY` as a required core env var.
- A mock adapter as the default implementation.
- A graph build task that completes before graph data is readable.
