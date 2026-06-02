# Phase 03 - Simulation, report, and interaction slices

requires_roles: [integration-runtime, data-persistence, ux-ui-craft, product-architect]

## Product intention

Extend the graph loop into MiroFish's user-visible value: prepare simulation entities, run or block a small OASIS simulation, generate/read a report, and interact with report or agent outputs.

## Mapped obligations

- Read entities from the graph adapter.
- Generate simulation profiles/config.
- Start/stop/check a small simulation runtime, or show a blocked OASIS/runtime state.
- Generate report sections from real graph/simulation data.
- Preserve report and interaction workbench surfaces.

## Stable vs free

Stable: simulation/report/interaction must be connected to graph state.

Free: first simulation can be small and local if it preserves lifecycle and readback.

## Implementation scope

Simulation prepare/run/status APIs, report generation/readback, interaction UI with report-agent and agent-interview tabs.

## Interfaces touched

Simulation APIs, report APIs, graph adapter entity/search APIs, frontend simulation/report/interaction components.

## State / runtime touched

Simulation state, generated profiles/config, run traces, report metadata/sections/logs, chat/interview history.

## UX / DX / operator requirements

Simulation and report screens must show real progress/readback or explicit blocked state. Do not pretend to run OASIS when runtime dependencies are missing.

## Required output (integration-runtime)

Wire graph adapter reads into simulation profile generation and report graph-search tools.

## Blocks (integration-runtime)

No disconnected report generator; no fake agent interviews.

## Required output (data-persistence)

Persist simulation config, profiles, run status, report sections, logs, and interaction history.

## Blocks (data-persistence)

No "history" UI backed only by current component state.

## Required output (ux-ui-craft)

Make report and interaction views usable with progressive output, logs, and clear next actions.

## Blocks (ux-ui-craft)

No raw JSON dumps as report UI; no unreadable progress walls.

## Required output (product-architect)

Keep the slice narrow enough to work: small simulation, real lifecycle, real report readback.

## Blocks (product-architect)

Do not inflate this phase into full public deployment or advanced multi-tenant operations.

## Quality bar

The user can see how graph entities became simulation inputs and how simulation/graph data informed the report.

## Do not ship

Canned report, no simulation lifecycle, no relationship between graph and report, or agent chat that ignores selected simulation/report state.

## Repair routing

If the feature feels fake, return to the graph/simulation data connection before adding surface polish.

## Unlock condition

A local small scenario reaches simulation/report/interaction readback or records exact missing runtime blockers.

