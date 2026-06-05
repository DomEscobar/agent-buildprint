# Phase 03 — Simulation runtime

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and only this active phase before coding. Keep `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-uiux-decision.md` open as constraints. Treat `02-uiux-decision.md` as the standing design/style responsibility for this phase, even when the work is backend, runtime, report, verification, or state plumbing, because those decisions surface through UI states, copy, controls, and handover. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Connect the social simulation runtime seam to the graph workbench. The user should be able to configure or review agents/roles derived from graph context, start a simulation run when prerequisites exist, watch status/trace updates, inspect simulated posts/replies/reactions, and receive an honest blocker when provider credentials, graph context, or local runtime support are missing. Preserve the MiroFish/OASIS-style Twitter/Reddit source signal without pretending the full original runtime is available if it is not. The simulation state model should include run id, config, participant/agent profiles, platform mode, provider status, graph snapshot reference, feed events, logs/traces, result status, and blockers. UI controls must not be dead: start, stop/cancel where supported, inspect trace, inspect feed item, and retry should either work or explain exactly why they cannot. Provider test/status should be reusable by this phase and should never log secrets. The workbench should make clear whether a run is simulated locally, provider-backed, deterministic, blocked, failed, or complete.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not add required Zep Cloud. Do not leak provider keys into commits, logs, snapshots, reports, or handover.

## Minimum proof before moving on

Run unit/API/browser smoke checks for simulation status transitions. Verify missing provider or runtime produces a blocked state. Inspect that trace/feed/result UI uses runtime state and graph references rather than canned success text.

## Handoff note

Record what was built, what was verified, what is blocked, what is not proven, and the next active phase. Keep claims scoped to observed evidence and visible product behavior.
