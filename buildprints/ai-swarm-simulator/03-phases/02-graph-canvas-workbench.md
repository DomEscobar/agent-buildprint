# Phase 2: Graph Canvas Workbench

## Phase mode contract

- `phase_id`: `02-graph-canvas-workbench`
- `blueprint_mode`: `product`
- `phase_style`: `outcome_flow`
- Outcome: the user can build or reload a graph-backed scenario world and inspect it through a real interactive canvas.
- Owned surface: `surface-graph-canvas-workbench`

## Preconditions and inputs

- A scenario from Phase 1 with extracted text and ontology.
- Provider mode: live Zep graph adapter when configured; deterministic sandbox graph adapter when credentials are absent.
- Inputs: `project_id`, graph name, chunk size, chunk overlap, force rebuild flag.

## Implementation scope

Build the central artifact as a graph workbench:

- start graph build as a background job with progress and error state;
- chunk scenario text, create or simulate graph storage, set ontology, add text batches, wait for processing, and fetch graph data;
- render nodes and edges on a canvas with force layout, pan/zoom, drag, refresh, full-screen or graph/split/workbench layout modes, legend, edge-label toggle, loading, empty, processing, failed, and completed states;
- support node selection with type, name, id, created date, labels, summary, attributes, and connected-edge highlighting;
- support edge selection with source, relationship, target, fact/type, created/valid dates, episodes, and self-loop grouping with expandable loop details;
- visually cue graph-memory updates during simulation without faking real updates before runtime evidence exists.

This phase is the specific guard against the prior failure mode. A collection of tokens, bubbles, cards, or static labels is a `FAKE_OR_PLACEHOLDER_FAIL`. The canvas must use graph data structures, layout positions, relationships, selection state, and inspection details.

## Interfaces touched

- Browser graph canvas and inspectors.
- Graph build API, graph data API, task API.
- Graph provider adapter and deterministic sandbox adapter.
- Project persistence for graph id, graph task id, chunking settings, and status.

## State and artifact effects

- Persist `graph_id`, graph build task id, graph build status, chunking parameters, and latest graph data snapshot or deterministic fixture metadata.
- Graph refresh must re-read provider/sandbox state.
- Canvas selection state may be ephemeral, but graph data and project status must survive reload.

## UX/UI requirements

- The graph occupies the primary visual field, not a small card.
- Controls are compact and workbench-like: refresh, maximize/layout, label toggle, zoom/pan, selection close, and legend.
- Detail panels must not obscure essential graph controls at common desktop and mobile widths.
- The graph should use readable colors for entity types and keep labels legible without relying on default SVG/browser styling.
- Empty state names the next action; blocked-provider state tells the user exactly which provider proof is unavailable.

## Safety/security constraints

- Missing Zep credentials must block live-provider proof and show an honest provider configuration state.
- Do not delete live provider graphs without explicit user action and confirmation.
- No secret values in logs, graph ids are allowed.

## Quality gates

- `proof-graph-canvas-runtime`: API/runtime test starts graph build, polls status, persists graph id/data, reloads project, and fetches graph data.
- `proof-graph-interaction-browser`: browser test opens a built graph, verifies canvas nodes/edges exist, pans or zooms, drags/selects a node, selects an edge, toggles labels, refreshes, and captures screenshots.
- `proof-provider-blocker-honesty`: test or evidence row proves missing live Zep credentials produce a blocked-provider state without fake completion.

## Proof gate

This phase reaches `phase_core_passed` only when a user action path moves from project state through graph build/data into visible canvas state and inspector state. Screenshots of static markup do not pass.

## Failure/recovery

Graph build failure must record task error, preserve project state, and offer retry/force rebuild. Partial graph data must not be presented as complete unless labeled.

## Non-goals

- No persona generation, simulation run, report generation, or chat.
- No live-provider claim without provider evidence.

## Source evidence

- `source/MiroFish/backend/app/api/graph.py:260` starts graph build.
- `source/MiroFish/backend/app/api/graph.py:364` creates an async task.
- `source/MiroFish/backend/app/api/graph.py:390` creates the graph builder.
- `source/MiroFish/backend/app/api/graph.py:398` chunks text.
- `source/MiroFish/backend/app/api/graph.py:423` sets ontology.
- `source/MiroFish/backend/app/api/graph.py:470` fetches graph data.
- `source/MiroFish/frontend/src/components/GraphPanel.vue:17` owns graph container and SVG.
- `source/MiroFish/frontend/src/components/GraphPanel.vue:51` defines node/edge detail panel.
- `source/MiroFish/frontend/src/components/GraphPanel.vue:491` wires zoom.
- `source/MiroFish/frontend/src/components/GraphPanel.vue:662` wires drag.
- `source/MiroFish/frontend/src/components/GraphPanel.vue:698` wires node selection.

## Repair routing

- Canvas, graph adapter, task status, or browser interaction failure -> this phase.
- Provider credential absence -> blocker evidence row.
- If chosen UI stack cannot support real canvas interactions, revise architecture in `02-project-setup.md` before continuing.
