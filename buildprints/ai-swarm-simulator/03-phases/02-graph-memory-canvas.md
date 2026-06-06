# Phase 02 — Graph memory canvas

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and only this active phase before coding. Keep `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-uiux-decision.md` open as constraints. Treat `02-uiux-decision.md` as the standing design/style responsibility for this phase, even when the work is backend, runtime, report, verification, or state plumbing, because those decisions surface through UI states, copy, controls, and handover. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Build the graph-memory and canvas interaction loop without losing the original Microfish source pipeline. Seed material and a prediction requirement must become structured graph data through an open-source adapter seam or a clearly separated local fallback, then the UI must read back ontology entity types, relation types, nodes, edges, facts, and relationship chains from that seam and render them in a real interactive canvas. The graph must support pan, zoom, select, inspect, and stateful empty/loading/error/blocked views. A decorative SVG with static sample nodes does not satisfy the phase. The adapter should make future Graphiti, Zep-style GraphRAG, or alternative OSS graph memory integration straightforward while preserving local trusted execution. Store enough metadata to connect graph nodes/edges back to source snippets, prediction requirement, future entity-to-agent mapping, future simulation action logs, and report provenance. Selection should drive an inspector panel that shows source evidence, node/entity type, relationship labels, facts, and what later simulation agent/profile this entity can become. Failures should say whether upload, extraction, ontology generation, graph build, persistence, adapter availability, or provider configuration is responsible. Keep the design polished enough that users can understand graph structure without reading raw JSON.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not add required Zep Cloud. Do not leak provider keys into commits, logs, snapshots, reports, or handover.

## Minimum proof before moving on

Run graph extraction/readback tests or a local smoke path that creates ontology types, nodes, edges, facts, and relationship chains from seed material and renders them. Browser-check pan/zoom/select/inspect if possible. Confirm missing adapter/provider cases produce blocked/error states, not fake graph success. Record which source facts became graph facts.

## Handoff note

Record what was built, what was verified, what is blocked, what is not proven, and the next active phase. Keep claims scoped to observed evidence and visible product behavior.
