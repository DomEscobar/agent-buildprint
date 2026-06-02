# Phase 02 - Core loop first

requires_roles: [integration-runtime, data-persistence, ux-ui-craft]

## Product intention

Make the first real loop work: upload seed text, generate ontology, build graph memory through the open-source adapter, read graph data back, and render it on the canvas.

## Mapped obligations

- Accept PDF/MD/TXT or at least TXT/MD in the first local proof.
- Persist project metadata and extracted text.
- Generate ontology through the user-selected LLM provider or show blocked state.
- Build graph memory through Graphiti/open-source adapter, not Zep Cloud.
- Return nodes and edges in a graph-canvas-friendly shape.
- Render the graph with inspectable node/edge details.

## Stable vs free

Stable: input-dependent graph data and canvas readback.

Free: exact ontology prompt, graph store backend, and chunking strategy.

## Implementation scope

Backend upload/extraction, ontology request, graph adapter ingestion/readback, frontend graph render and progress polling.

## Interfaces touched

Upload API, ontology API, graph build API, graph status/readback API, graph canvas component.

## State / runtime touched

Project store, uploaded files, extracted text, graph store, task/progress state.

## UX / DX / operator requirements

The canvas must display real graph data from the uploaded input. Missing provider config must show a blocked state with the exact missing config keys.

## Required output (integration-runtime)

Implement the LLM and graph-memory boundaries with real calls where configured and deterministic blocked-mode behavior where not.

## Blocks (integration-runtime)

No fake graph, no hidden Zep, no swallowed provider errors.

## Required output (data-persistence)

Persist project, extracted text, graph reference, and graph data/readback metadata.

## Blocks (data-persistence)

Do not rely only on browser memory or process memory for the graph loop.

## Required output (ux-ui-craft)

Render a usable graph: labels, zoom/drag or equivalent navigation, details panel, refresh, and empty/error states.

## Blocks (ux-ui-craft)

No static image, no decorative node cloud, no unlabeled internal IDs as the whole experience.

## Quality bar

Changing the uploaded seed changes the ontology/graph outcome, and reloading reads the project/graph state back.

## Do not ship

Canned graph, fake progress, provider success without credentials/config, or a graph UI that cannot inspect nodes and edges.

## Repair routing

If graph build fails, repair adapter/config first; if canvas is unreadable, repair UI before moving on.

## Unlock condition

A local user can complete upload -> ontology -> graph -> canvas detail inspection or see an honest provider blocker.

