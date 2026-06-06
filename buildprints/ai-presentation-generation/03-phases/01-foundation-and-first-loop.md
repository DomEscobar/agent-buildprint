# Phase 01 — Foundation and first loop

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and only this active phase before coding. Keep `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, `02-uiux-decision.md`, and `blueprint.yaml` open as constraints. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Establish the working project foundation and first honest vertical loop for a Presenton-inspired presentation product. The implementation must have a runnable frontend/backend or equivalent local architecture, durable config shape, `.env.example`, provider/parser/export readiness model, deck data model, and first visible path that lets a user enter a prompt or choose an example deck request and see the app respond through real state. The first loop may use a local sample, but it must be labeled sample-only and must not pretend to prove live provider, upload parsing, or export behavior. The UI should already show the core workbench regions: Configure, Create, Outline, Deck, Templates, and Exports. Create the local `AGENTS.md` and docs from `01-project-setup.md`, define ownership boundaries, set verification commands, and make blocked provider/export states visible from the start.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, fake export success, hard-coded decks counted as generated, decorative slide thumbnails, raw JSON as the main UI, or vague done claims. Do not leak provider keys into commits, logs, snapshots, decks, or handover.

## Minimum proof before moving on

Run the project install/build or typecheck path, start the local app or service if available, and smoke the first prompt/example path. Verify `.env.example`, setup receipt, architecture/product-loop/output-quality/proof docs, and visible blocked/provider/export states exist. If browser proof is possible, inspect the UI for dead controls and confusing labels.

## Handoff note

Record what was built, what was verified, what is blocked, what is not proven, and the next active phase. Keep claims scoped to observed evidence and visible product behavior.
