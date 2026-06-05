# Phase 11 — External graph memory adapter

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `enhancement-gaps.md`, and only this active phase before coding. Preserve local adapter behavior as the fallback. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Implement and prove a real graph memory adapter boundary beyond browser-local state. Prefer an open-source local adapter first, with Graphiti or another external graph memory adapter behind explicit config when available. The adapter contract must support writes, readback, metadata/source references, dedupe, migrations/schema versioning, import/export, clear/delete with confirmation, and quality checks. The UI must describe the memory state plainly while exposing adapter details in advanced mode.

This phase should make graph memory an owned subsystem rather than incidental app state. The same graph snapshot should be usable by simulation, reports, continuation, export, and reload. Adapter failures must preserve user trust by saying whether the problem is extraction, write, readback, migration, unavailable service, or config. Local fallback must remain usable and clearly labeled.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not require Zep Cloud. Do not claim Graphiti/external graph memory is active unless the adapter is configured and proven. Do not silently drop graph metadata or source references. Do not make local fallback look like external memory.

## Minimum proof before moving on

Run adapter contract tests and browser/API smoke paths for write, readback, import/export, clear/delete, migration or schema-version handling, and adapter unavailable state. If Graphiti/external memory is unavailable, record the blocker and prove local adapter fallback remains honest.

## Handoff note

Record adapter interface, active adapter, fallback behavior, contract test results, unavailable-state behavior, graph quality checks, and the next active phase.
