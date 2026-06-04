# Phase 02 — Graph memory canvas

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, and only this active phase before coding. Keep `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-uiux-decision.md` open as constraints. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Build the graph-memory and canvas interaction loop. Seed material must become structured graph data through an open-source adapter seam or a clearly separated local fallback, then the UI must read back nodes and edges from that seam and render them in a real interactive canvas. The graph must support pan, zoom, select, inspect, and stateful empty/loading/error/blocked views. A decorative SVG with static sample nodes does not satisfy the phase. The adapter should make future Graphiti or alternative OSS graph memory integration straightforward while preserving local trusted execution. Store enough metadata to connect graph nodes/edges back to seed material and future simulation/report phases. Selection should drive an inspector panel, and failures should say whether extraction, persistence, adapter availability, or provider configuration is responsible. Keep the design polished enough that users can understand graph structure without reading raw JSON.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not add required Zep Cloud. Do not leak provider keys into commits, logs, snapshots, reports, or handover.

## Minimum proof before moving on

Run graph extraction/readback tests or a local smoke path that creates nodes/edges and renders them. Browser-check pan/zoom/select/inspect if possible. Confirm missing adapter/provider cases produce blocked/error states, not fake graph success.

## Handoff note

Record what was built, what was verified, what is blocked, what is not proven, and the next active phase. Keep claims scoped to observed evidence and visible product behavior.
