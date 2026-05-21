# CONTRACTS

## System Contract

The workbench turns uploaded source material and a natural-language prediction requirement into a graph-backed multi-agent simulation, then into reports and interactive exploration.

## API Contract

- `POST /api/graph/ontology/generate`: accepts multipart files plus `simulation_requirement`; returns `project_id`, ontology, summary, extracted text metadata.
- `POST /api/graph/build`: accepts `project_id`; returns task id for graph construction.
- `GET /api/graph/task/:taskId`: returns task status, progress, message, result, error.
- `GET /api/graph/data/:graphId`: returns graph nodes/edges suitable for UI visualization.
- `POST /api/simulation/create`: creates simulation for project/graph and enabled platforms.
- `POST /api/simulation/prepare`: starts profile/config generation.
- `POST /api/simulation/start`: starts runtime with selected max rounds/platforms.
- `POST /api/simulation/stop`: stops active runtime and records final state.
- `GET /api/simulation/:simulationId/run-status`: returns round/action/platform status.
- `POST /api/report/generate`: starts report generation for a simulation.
- `GET /api/report/:reportId`: returns report metadata, sections, simulation/project links.
- `POST /api/report/chat`: sends a user message to ReportAgent with graph/simulation context.

## Provider Contracts

- LLM adapter must support OpenAI-compatible chat JSON and chat text calls with model/base URL/key config.
- Zep adapter must create graph, set ontology, add text episodes, page nodes/edges, search graph, and delete/cleanup where supported.
- Simulation runtime adapter must run a long-lived social simulation worker, stream status/action artifacts, and stop safely.

## Persistence Contracts

- Project state stores metadata, uploaded files, extracted text, ontology, graph id, simulation requirement, status, and errors.
- Simulation state stores config, profiles, run status, actions, posts/comments/timeline, stdout/stderr logs, and provider/runtime identifiers.
- Report state stores outline, sections, report markdown/download artifact, agent log, console log, and chat history where retained.

## Security Contracts

- Env var names may be documented; secret values must never be copied into output, logs, screenshots, fixtures, or errors.
- Destructive graph/project/report actions require explicit user confirmation in UI and server-side ownership/authorization hook points.
- Uploaded files are constrained by extension, size, path sanitization, and storage location.
- Provider errors must redact API keys and raw credentials.
