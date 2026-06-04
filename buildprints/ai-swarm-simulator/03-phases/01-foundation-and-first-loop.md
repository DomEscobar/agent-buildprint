# Phase 01 — Foundation and first loop

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, and only this active phase before coding. Keep `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-uiux-decision.md` open as constraints. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Establish the working project foundation and first honest vertical loop. The implementation must have a runnable frontend/backend or equivalent local architecture, durable config shape, `.env.example`, graph-memory/provider/simulation/report interfaces, and a first visible path that lets a user choose or upload seed material and see the app respond through real state. The first loop can use a tiny local sample to exercise parsing, but it must be labeled as sample-only and must not pretend to prove live provider or full simulation behavior. The UI should already show the core workbench regions: seed input, provider status, graph/canvas area, simulation controls, and report/inspector area. The point is to pour a foundation future phases can extend without rewiring everything. Create the local `AGENTS.md` and docs from `01-project-setup.md`, define ownership boundaries, set verification commands, and make blocked states visible from the start. If provider keys, graph runtime, or simulation dependencies are missing, the app should show exact blocked states rather than fake success.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not add required Zep Cloud. Do not leak provider keys into commits, logs, snapshots, reports, or handover.

## Minimum proof before moving on

Run the project install/build or typecheck path, start the local app or service if available, and smoke the first seed-material path. Verify `.env.example`, setup receipt, architecture/product-loop/proof docs, and a visible blocked/provider status path exist. If browser proof is possible, inspect the UI for dead controls and blocked states.

## Handoff note

Record what was built, what was verified, what is blocked, what is not proven, and the next active phase. Keep claims scoped to observed evidence and visible product behavior.
