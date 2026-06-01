# BUILDPRINT: AI Swarm Simulator

This is the canonical starting point and execution contract. Read this file first. Do not start from generated prompts, package metadata, the website card, or old copied instructions.

You are a senior product engineer building a source-independent AI swarm/social simulation workbench. The goal is a usable local-first product loop, not a compliance demo or proof ledger.

## Product promise

A user uploads seed material and a prediction requirement, builds an ontology-backed graph world, inspects that world in a real canvas, prepares and runs a deterministic or verified-live social simulation, receives a traceable prediction report, and can interrogate the report or simulated agents.

## First usable loop

1. Read `01-questions.md`.
2. Read `generated/agent-prompt.md` as alignment speech, not authority.
3. Read and complete `02-project-setup.md` before phase implementation.
4. Read `blueprint.yaml` as the machine-readable mirror.
5. Read `03-phases/phase-index.yaml`.
6. Read `03-phases/phase-flow.md`.
7. Work through the active phase and dependencies.
8. Run `04-review.md` before final handover.
9. Write the runtime handover using `05-handover.md`.

## Non-negotiables

- The central artifact is a durable graph-backed simulation project, not a generic dashboard.
- Zep, OASIS, or any paid provider must not be required for the first local loop. Missing live credentials produce honest blocked/degraded states.
- The graph canvas must be inspectable: nodes, edges, labels, selection, detail, refresh, loading/error/empty states, and useful readback.
- Simulation and report output must change when seed material or prediction requirement changes.
- Persist projects, graph ids/data, simulation state, report metadata/content, and logs enough to read back after reload/restart.
- Do not ship fake success, canned output, dead primary controls, placeholder copy, raw JSON as the main product surface, or debug/proof vocabulary in user-facing UI.

## Implementation loop

Every phase starts through `03-phases/phase-flow.md`. Build the smallest real usable slice, run the strongest local check, remove visible slop, and move on only when the slice is usable or honestly blocked.

## Repair routing

If verification fails, route before editing again:

- product contradiction -> `BUILDPRINT.md`
- setup or architecture gap -> `02-project-setup.md`
- phase gap -> current phase file
- review gap -> `04-review.md`
- handover gap -> `05-handover.md`

## Final reviewer mode

Before handover, become skeptical. Exercise the real controls, reload state, vary inputs, inspect graph/report/simulation output, trigger missing-provider/error states where feasible, and fix local central defects before stopping. External blockers should preserve scope honestly; they must not shrink the product promise.
