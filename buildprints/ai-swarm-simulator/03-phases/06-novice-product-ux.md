# Phase 06 — Novice product UX

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `enhancement-gaps.md`, and only this active phase before coding. Keep the existing product loop intact, but replace any all-in-one dashboard presentation with the required focused task views. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Rework the trusted-local prototype into a beginner-readable, example-first, multi-view product flow. A first-time user must understand what to do first, how to try an example, what the system understood from their scenario, whether a real swarm can run, why it cannot run if blocked, and what the next action is. The UI must use the task views: Start -> Map -> Run -> Report -> Projects.

Replace or pair technical labels with plain product language. Keep technical details available behind details toggles or advanced panels, but do not make graph memory, provider, runtime, readback, trace, blocker, local report, run id, adapter, or storage path the primary language. Add a top-level readiness banner that answers: can I run a real swarm yet, why not, and what should I do next?

Build the required view model:

- **Start**: example scenario picker, custom scenario input, current readiness summary, and one obvious next action.
- **Map**: graph/canvas with the plain summary "what the system understood" before technical node/edge details.
- **Run**: readiness, local dry-run controls, real-swarm blocker, agent roles, and step log.
- **Report**: draft report, continue-from-section controls, sources/provenance, and limitations.
- **Projects**: saved local work, resume/export/delete, storage state, and advanced details.

Add at least three built-in example scenarios:

- Improve a product launch plan
- Find risks in a hiring process
- Coordinate a support incident

The example path must be usable without typing anything: choose an example, inspect the Map view, run the labeled local dry run if real AI is unavailable, generate/read a draft report, then see saved project state. Sample/example behavior must be labeled honestly and must not be counted as live provider proof.

Do a density repair pass. The default desktop screen must not show Start input, graph, readiness, run log, agents, report, continuation, and project history all as equal panels at once. Desktop may show one secondary contextual panel. Mobile must use the same task views via segmented or bottom navigation and must not degrade into a confusing wall of stacked technical panels.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not hide honest blocked states. Do not dumb down the product by removing inspection, provenance, graph references, or runtime evidence. Do not ship a prettier version of the same jargon-heavy screen. Do not add marketing hero copy instead of the actual workbench. Do not keep the one-page everything-visible cockpit if it still overwhelms a novice.

## Minimum proof before moving on

Run build/smoke checks and a browser proof on desktop and mobile. Verify the task navigation exists, the Start example path works without user typing, each view has one obvious primary action, the readiness banner gives an actionable next step, disabled run controls explain the setup needed, and technical details are still available without dominating the screen. Save screenshots for Start, Map, Run, Report, Projects, and mobile navigation. Record exact proof.

## Handoff note

Record the multi-view structure, example scenarios, plain-language labels added, jargon hidden or paired, blocked-state copy, screenshots, any remaining UX confusion, and the next active phase.
