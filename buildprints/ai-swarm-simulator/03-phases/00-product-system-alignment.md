# Phase 00: Product-System Alignment

## Intention

Establish the product spine before coding. The workbench is not a generic AI dashboard; it is a stepwise prediction simulation tool where the graph memory is the durable world model and the canvas is the user's primary inspection surface.

## Build Scope

- Define project, graph, simulation, report, log, and provider data models.
- Choose implementation stack and persistence.
- Define the graph-memory port and confirm the default OSS backend.
- Define provider config for LLM and simulation runtime without hard-coding one paid provider.
- Define the first local success path and the browser review path.

## Quality Bar

- A new engineer can explain the core loop and where data persists.
- No direct vendor SDK leaks outside adapter modules.
- Missing credentials and live runtime gaps have explicit blocked states.
- Canvas graph requirements are treated as acceptance criteria.

## Do Not Ship

- A plan that preserves Zep as a required cloud dependency.
- A vector-only memory store with no graph readback.
- An app that cannot survive backend restart for projects/reports.
