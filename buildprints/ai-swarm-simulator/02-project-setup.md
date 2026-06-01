# Project Setup

## Before coding

Write a short implementation note in the real project root with:

- artifact type: product app / local-first AI swarm simulation workbench;
- consumer: end user creating and inspecting a prediction simulation project;
- central artifact: durable graph-backed simulation project;
- first loop: upload seed material -> generate ontology/graph -> inspect canvas -> run deterministic simulation -> generate report -> read back state;
- stack, persistence, provider/runtime boundaries, and how missing live credentials are shown honestly.

## Product quality rules

- Preserve graph memory and canvas inspection as first-class product behavior.
- Use a local/free graph-memory backend by default; do not make Zep Cloud required for the core loop.
- Keep LLM, graph memory, and OASIS/live simulation behind provider/runtime ports.
- Persist project, files/text, ontology, graph identity/data, simulation state/logs, reports, and interactions.
- Treat missing credentials as blocked/degraded states, not fake success.
- Make changed inputs change ontology, graph, simulation, and report outputs.

## Forbidden shortcuts

- Generic dashboard instead of workflow workbench.
- Token bubbles, static SVG, cards, or raw lists as a substitute for graph canvas inspection.
- Canned ontology/report/simulation output.
- In-memory-only project state.
- Dead buttons, placeholder copy, swallowed errors, or raw JSON as the main user surface.
- Direct vendor SDK calls scattered through UI/domain code instead of adapters.

## Local checks to prefer

- Build/typecheck/lint for the chosen stack.
- API/unit tests for project persistence, graph-memory adapter, task status, provider error paths, and report persistence.
- Browser smoke for project creation, graph canvas, simulation monitor, report, and interaction screens.
- Restart/readback check for persisted project/report/simulation state.
