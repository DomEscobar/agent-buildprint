# Project Setup

## Artifact Type

Build a full-stack product workbench for prediction simulation. The real consumer is an analyst, researcher, strategist, writer, or operator who wants to rehearse "what if" scenarios from seed material and inspect why the resulting prediction emerged.

## Architecture Shape

Use a frontend, backend API, graph-memory service, simulation runtime, and durable storage. The source used Vue/Vite, Flask, D3, file-backed project/report folders, OASIS, OpenAI-compatible LLM config, and Zep Cloud. You may keep or replace the framework stack, but the product contract is fixed.

## Required Services

- Web UI: project creation, upload, workflow steps, graph canvas, simulation setup/run, report view, interaction chat, language-ready copy.
- Backend API: project, ontology, graph, simulation, report, and chat routes.
- Graph memory: a local OSS service behind an adapter. Recommended default is Graphiti plus FalkorDB.
- LLM client: provider-neutral OpenAI-compatible client with `base_url`, `model`, and `api_key`.
- Persistence: SQLite or stronger for metadata/tasks; local files or object storage for uploaded documents, extracted text, generated profiles, report markdown, JSONL logs, and console logs.

## Graph Memory Port

Replace direct Zep usage with an internal port. The rest of the app should never import a vendor SDK directly.

Required methods:

- `create_graph(name, description) -> graph_id`
- `set_ontology(graph_id, entity_types, edge_types)`
- `add_text_batch(graph_id, chunks, source_metadata) -> episode_ids`
- `wait_for_processing(graph_id, episode_ids, timeout)`
- `add_activity(graph_id, activity_text, metadata)`
- `get_graph_data(graph_id) -> { graph_id, nodes, edges, node_count, edge_count }`
- `search(graph_id, query, mode, limit)`
- `get_node_detail(graph_id, node_id)`
- `get_node_edges(graph_id, node_id)`
- `delete_graph(graph_id)`

The returned node/edge shape must support the canvas: node uuid, name, labels, summary, attributes, created_at; edge uuid, name/fact_type, fact, source node id/name, target node id/name, attributes, episodes, created_at, valid_at, invalid_at, expired_at.

## Canvas Quality Bar

The graph view must be a serious inspection surface:

- force-directed graph or equivalent canvas/SVG renderer;
- pan/zoom or fit controls;
- refresh and maximize controls;
- node and edge selection details;
- entity-type legend;
- edge-label toggle;
- self-loop grouping;
- multiple-edge handling so relationships do not visually collapse;
- loading, empty, build-in-progress, simulation-update, and error states;
- no raw JSON as the main user experience.

## First Local Commands

Document and keep these current in the implementation:

```bash
npm install
npm run setup:all
npm run dev
npm run build
cd backend && uv sync
cd backend && uv run python run.py
cd frontend && npm run dev
docker compose up -d
```

If the chosen implementation changes stack, replace commands with the actual equivalent. Do not leave broken inherited commands.

## Forbidden Shortcuts

- Do not rename Zep variables while still calling Zep Cloud.
- Do not make a vector-only memory replacement if the graph canvas cannot inspect entities and relationships.
- Do not use in-memory task state for claimed durable graph/report/simulation status.
- Do not ship canned reports unrelated to graph/search/simulation inputs.
- Do not hide provider errors behind success toasts.
- Do not reduce the app to a broad dashboard with dead controls.
