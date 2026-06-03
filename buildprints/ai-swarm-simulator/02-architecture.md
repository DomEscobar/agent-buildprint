# Architecture

## Product architecture

Build a local-first graph-backed AI swarm simulation workbench with these modules:

- **Frontend workbench**: Vue/Vite or equivalent component framework, route shell, graph canvas, provider panel, simulation controls, report panel, interaction history.
- **Backend API**: Python/FastAPI or equivalent typed service with ingestion, extraction, graph memory, simulation, report, and provider endpoints.
- **Provider adapter**: OpenAI-compatible client selected at runtime from user config (`label/baseUrl/model/apiKey`). Must expose validate/status and return legible missing-provider errors.
- **Graph memory adapter**: interface-first adapter with default Graphiti implementation. Store/read nodes, edges, entity metadata, source references, and graph summaries. Zep Cloud is forbidden as required dependency.
- **Simulation runtime seam**: OASIS-style runner interface with status, start, trace, cancel, and blocked-runtime response.
- **Report generator**: creates markdown/report sections from graph memory + simulation traces + input references.

## Persistence

Persist locally:

- project metadata and extracted text;
- provider profile metadata without secret leakage;
- graph nodes/edges/readback metadata;
- simulation config/status/traces;
- report sections and interaction history;
- canvas view state.

Provider API keys and local runtime secrets remain local-only and must not be committed, logged, or exported in handoff.

## State model

- `empty.no-input` — no project/input yet; sample path available.
- `blocked.missing-provider` — live LLM path needs provider config; sample still works.
- `loading.extracting` — uploaded seed material being extracted.
- `loading.graph-build` — graph memory being written/read back.
- `ready.graph-canvas` — real nodes/edges visible and inspectable.
- `blocked.missing-simulation-runtime` — simulation runtime unavailable; graph/report still available.
- `running.simulation` — profiles/traces updating.
- `ready.report` — report generated from graph/simulation/input references.
- `error.processing-failure` — recoverable error with retry/details.

## Verification commands

Define and run the real project commands during implementation:

- frontend install/build/test command;
- backend unit/API tests;
- provider adapter validation with missing-provider case;
- graph adapter write/readback test;
- sample path smoke from empty state to graph/report;
- screenshot or browser test proving canvas click/inspect controls.

## Forbidden shortcuts

- No static SVG/card list pretending to be an interactive graph.
- No hidden Zep dependency.
- No hard-coded provider/vendor/model.
- No canned report that ignores uploaded/sample input.
- No dead buttons or swallowed runtime errors.
