# Project Setup

## Before Coding

Before coding, align the artifact type, central artifact, product loop, first loop, provider boundaries, persistence model, and forbidden shortcuts. Do not start implementation until the graph-backed workbench promise and blocked-provider semantics are explicit.

## Role And Mission

Act as a Senior Product Engineer building a trusted-local MiroFish-style workbench. Your job is to make the product loop usable and honest: seed upload, graph memory build, graph canvas inspection, simulation, report, and interaction.

## Artifact Type

Product webapp with a Python service backend and a graph-memory/simulation runtime. The visible product is not just forms and tables. The graph canvas and report/interaction workbench are the product.

## First Usable Loop

1. Start the local app.
2. Upload a small PDF/MD/TXT seed and enter a prediction requirement.
3. Generate an ontology.
4. Build graph memory through the open-source graph adapter.
5. Render nodes and edges on the canvas.
6. Inspect node and edge detail panels.
7. Prepare a small simulation from graph entities.
8. Generate and read back a report or show an honest blocked state when provider/runtime access is missing.

## Central Boundary

Replace direct Zep Cloud calls with a `GraphMemoryAdapter` style boundary. The adapter must cover:

- create or open graph;
- set ontology/entity schema;
- add text episodes or facts;
- wait/check ingestion status where applicable;
- read nodes and edges;
- search/query graph;
- get graph statistics;
- append simulation activity as temporal memory;
- delete/reset graph only through explicit local controls.

Default implementation choice: Graphiti-backed local memory because Graphiti is open source, temporal, graph-shaped, and close to the current Zep graph semantics. A vector-only replacement will not work because the UI and report tools need graph nodes, edges, labels, facts, and temporal readback.

## Provider Independence

Keep an OpenAI-compatible `LLMProvider` boundary. All LLM usage must accept base URL, model name, and key from configuration. The product may suggest presets, but user configuration owns provider choice.

## Persistence

Persist at least:

- uploaded files and extracted text;
- project metadata and graph id/reference;
- local graph memory data;
- simulation state, generated profiles, config, and run traces;
- report metadata, progress, generated sections, markdown, and logs;
- chat/interview history when displayed as reloadable.

Do not claim restart-safe task progress if progress is only in memory.

## Local Commands

Expected command shape:

```powershell
npm run setup:all
npm run dev
npm run build
cd backend; uv run pytest
```

Adapt commands to the actual implementation, but keep one clear local setup path, one dev path, and one verification path.

## Craft Floor

Use a real frontend build system and component/styling structure. A single hand-written HTML file or thin mock shell is not acceptable. The graph canvas must be visually usable, inspectable, and responsive enough for browser review.

## Forbidden Shortcuts

- No fake graph generated independently of uploaded input.
- No Zep Cloud calls hidden behind a "free" label.
- No provider success when credentials are absent.
- No canned reports unrelated to graph/simulation state.
- No dead refresh/maximize/toggle controls.
- No raw JSON as the primary user surface.
- No public-webapp claims without auth, upload security, observability, deployment, backup, and abuse controls.

