# Phase 06 — Novice product UX

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `enhancement-gaps.md`, and only this active phase before coding. Keep the existing product loop intact. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Rework the trusted-local prototype into a beginner-readable product flow. A first-time user must understand what to do first, what the system understood from their scenario, whether a real swarm can run, why it cannot run if blocked, and what the next action is. The UI must use the flow: add scenario -> see what the system understood -> check readiness -> read report -> continue.

Replace or pair technical labels with plain product language. Keep technical details available behind details toggles or advanced panels, but do not make graph memory, provider, runtime, readback, trace, blocker, local report, run id, adapter, or storage path the primary language. Add a top-level readiness banner that answers: can I run a real swarm yet, why not, and what should I do next?

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not hide honest blocked states. Do not dumb down the product by removing inspection, provenance, graph references, or runtime evidence. Do not ship a prettier version of the same jargon-heavy screen. Do not add marketing hero copy instead of the actual workbench.

## Minimum proof before moving on

Run build/smoke checks and a browser proof on desktop and mobile. Verify the beginner workflow labels are visible, the readiness banner gives an actionable next step, disabled run controls explain the setup needed, and technical details are still available without dominating the screen. Save screenshots and record exact proof.

## Handoff note

Record the plain-language labels added, the jargon hidden or paired, the blocked-state copy, screenshots, any remaining UX confusion, and the next active phase.
