# Phase 09 — Real deterministic simulation runtime

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `enhancement-gaps.md`, and only this active phase before coding. Preserve provider and persistence boundaries. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Implement a real local deterministic simulation runtime before relying on any external AI provider. The runtime must create run ids, derive agent roles from the current graph, execute a visible state machine, emit trace events, support cancellation where possible, and produce deterministic results that reports can consume. The user should be able to run a real local simulation when graph and storage prerequisites exist, even if provider-backed reasoning is unavailable. Label it plainly as local deterministic simulation, not live AI reasoning.

The runtime should make the swarm model inspectable: which agents were created, what graph context each received, what each step did, what conflicts or blockers were found, and how the final result was assembled. It should be deterministic enough for tests and regression snapshots. It should also give the UI enough state to show progress, failure, retry, cancellation, and report readiness without guessing.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not return canned success text. Do not make start/stop buttons UI-only. Do not generate traces from static fixtures unrelated to the current graph. Do not claim provider-backed behavior.

## Minimum proof before moving on

Run build/test/smoke checks. Verify start, progress/trace, completion, cancellation or explicit non-support, retry, and failure states. Prove traces and local report inputs are derived from the current graph and run config. Browser-check that graph references and trace inspection work.

## Handoff note

Record runtime architecture, run state model, deterministic behavior, trace proof, cancellation behavior, blockers, and the next active phase.
