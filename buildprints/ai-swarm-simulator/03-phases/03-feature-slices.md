# Phase 03 - Simulation And Report Feature Slices

requires_roles: [integration-runtime, data-persistence, ux-ui-craft]

## Product intention

Extend the core graph loop into simulation setup/run, report generation, and interaction without faking provider-backed behavior.

## Mapped obligations

- Create a simulation from graph entities.
- Prepare profiles/config from graph data.
- Start, inspect, stop, and close simulation runtime.
- Generate report from simulation and graph context.
- Chat with report agent or simulated agents when runtime/provider is available.

## Stable vs free

Stable: simulation/report paths depend on graph memory data and show blocked states when providers are missing.

Free: exact runtime engine and job queue implementation.

## Implementation scope

Build one working simulation setup path first, then a minimal run/status path, then report/interact path.

## Interfaces touched

Simulation API, report API, graph-memory search/stats API, runtime status UI.

## State / runtime touched

Simulation state, generated profiles, config files, runtime logs, report files, chat history.

## UX / DX / operator requirements

Every long-running action needs progress, cancellation/stop where safe, and a readable failure state.

## Required output (integration-runtime)

- Provider/runtime seam for OASIS or equivalent simulation runner.
- Explicit provider-blocked mode.

## Blocks (integration-runtime)

- Fake report text when LLM is unavailable.
- Simulation "success" without actions, status, or output.

## Required output (data-persistence)

- Durable simulation and report records.
- Readback endpoints for status/logs/output.

## Blocks (data-persistence)

- Runtime outputs vanish after refresh while UI says complete.

## Quality bar

At least one local run path or deterministic blocked path is reviewable from the UI.

## Do not ship

Do not let report/chat tools silently fall back to irrelevant canned answers.

## Repair routing

Runtime/provider gaps go to this phase or phase 05 if intelligence-specific.

## Unlock condition

The workbench reaches simulation/report surfaces with truthful live or blocked behavior.
