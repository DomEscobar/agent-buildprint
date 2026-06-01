# Project Setup

## Role

You are a Senior Product Engineer building a trusted-local simulation workbench. Your job is to make the first user loop feel real and inspectable, then report limits honestly.

## Product Loop

First usable loop:

1. Start the local frontend and backend.
2. Upload or load seed material and enter a prediction requirement.
3. Create or accept an ontology.
4. Build a graph using the OSS graph-memory adapter.
5. Inspect the graph in the canvas: zoom, refresh, labels, node/edge details, self-loops, multi-edges.
6. Persist and reload the project/graph state.
7. Navigate to simulation setup and show provider-ready or provider-blocked status.

After that loop works, extend into simulation run, report generation, and post-report interaction.

## Central Artifact

The central artifact is the interactive swarm prediction workbench, with the graph/canvas as the shared object between ingestion, simulation, reporting, and interaction.

The graph is not decorative. It is the user's way to verify that seed material became entities, facts, relationships, and context.

## Stable Boundaries

Preserve these externally visible behaviors:

- project lifecycle with uploaded files, extracted text, simulation requirement, graph status, and errors;
- graph build progress and graph readback;
- canvas with meaningful nodes/edges, labels, details, legends, refresh, maximize, zoom, self-loop grouping, and multi-edge curves;
- simulation setup from graph entities;
- report/chat graph search and statistics tools;
- provider config through LLM key/base URL/model settings;
- visible blocked states for missing credentials or unavailable live providers.

Free implementation choices:

- UI framework, backend framework, queue/storage, and graph backend may change if behavior is preserved.
- Graphiti is the default OSS graph-memory family, but the adapter contract is more important than the specific library.
- Deterministic local fixtures may support smoke tests, but they must not be presented as live model or graph-provider output.

## Graph Memory Contract

Implement a neutral `GraphMemoryPort` with at least:

- `create_graph(project_id, name) -> graph_id`
- `apply_ontology(graph_id, ontology)`
- `add_episodes(graph_id, chunks, provenance) -> episode_ids`
- `wait_until_indexed(graph_id, episode_ids) -> status`
- `get_graph_data(graph_id) -> {nodes, edges, node_count, edge_count}`
- `search(graph_id, query, limit, scope)`
- `get_entity_detail(graph_id, entity_id)`
- `get_entity_edges(graph_id, entity_id)`
- `get_statistics(graph_id)`
- `append_activity(graph_id, activity_batch)`
- `delete_graph(graph_id)` behind explicit confirmation

Canvas node shape must include stable id/uuid, name, labels, summary, attributes, created timestamp. Edge shape must include stable id/uuid, source id, target id, name/type, fact text, timestamps, attributes, and episode/provenance ids where available.

## Provider Boundaries

LLM:

- Use OpenAI-compatible provider settings by default.
- Do not hard-code one hosted vendor in product logic.
- Show missing/invalid credentials as a blocked state.
- Keep optional acceleration provider separate from the base provider.

Graph memory:

- Remove Zep Cloud as a required runtime dependency.
- Replace `ZEP_API_KEY` with local graph-memory config such as backend type, URL/path, and optional embedding/model settings.
- Keep an adapter seam so Graphiti/FalkorDB/Kuzu/Neo4j choices do not leak into frontend product code.

## Local Commands

Source-observed commands:

```powershell
npm run setup:all
npm run dev
npm run build
```

Implementation may choose different commands, but must document:

- install;
- backend start;
- frontend start;
- unit/contract tests;
- browser smoke;
- graph-memory service start;
- cleanup/reset for local fixture data.

## Quality Rules

- Build a useful graph workbench before broad panels.
- Make empty/loading/error/provider-blocked states explicit.
- Use durable local persistence for projects, graph ids, graph data mapping, simulation state, and reports.
- Make destructive delete/reset actions explicit and reversible or clearly confirmed.
- Run browser review for canvas layout and interaction.
- Keep source-independent language. Do not tell the implementer to clone MiroFish source.

## Not Production-Grade By Default

Trusted-local is not public production. Public or private authenticated posture requires auth/session/tenant boundaries, upload scanning/rate limits, secret management, durable queues, observability, backup/recovery, CI/release gates, deployment proof, and security review.
