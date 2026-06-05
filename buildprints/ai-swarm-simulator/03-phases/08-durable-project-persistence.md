# Phase 08 — Durable project persistence

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `enhancement-gaps.md`, and only this active phase before coding. Preserve existing graph, simulation, report, and provider contracts. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Move beyond browser-profile-only persistence. Add a durable project/session store for seed material, graph snapshots, simulation runs, report history, source references, timestamps, and user-visible project metadata. A refresh, app restart, or separate browser profile should not erase the saved product path when the configured local store is available. Add export and delete behavior with confirmations and clear copy. Surface storage status in the readiness/setup area using plain language, with advanced details for path, adapter, schema version, and migration status.

The project model should preserve the user’s actual workflow: original scenario, what the system understood, readiness state, local or provider-backed runs, reports, continuation prompts, and blockers. It should support a fresh app load that can resume the last project without inventing state. If storage is unavailable, the product must explain that work is temporary and what capability is affected.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not silently migrate or delete user data. Do not claim durable persistence while relying only on `localStorage`. Do not store secrets inside project records. Do not hide storage failures in logs only.

## Minimum proof before moving on

Run build/test/smoke checks. Verify a project can be saved, reloaded after app restart or browser refresh, exported, and deleted with confirmation. Verify storage unavailable/failure states are visible and actionable. Record paths without leaking private content.

## Handoff note

Record persistence adapter, schema/version behavior, saved project proof, export/delete proof, storage blockers, and the next active phase.
