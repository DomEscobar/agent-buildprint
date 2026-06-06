# Phase 12 — UX stress, accessibility, and large graph

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `enhancement-gaps.md`, and only this active phase before coding. Stress the product as a user, not only as a codebase. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Prove the product is understandable, accessible, and usable under stress. Test novice flow comprehension through the UI copy, task-view navigation, example path, layout, mobile/tablet/desktop responsiveness, keyboard navigation, focus states, labels, contrast, reduced motion, empty/loading/error/blocked states, and graph scaling at 25, 100, and 500 nodes. Repair layout overlap, text clipping, hidden critical controls, low contrast, broken focus order, and graph interaction failures.

This phase should treat the interface as the product’s main reliability surface. A working backend does not matter if the user cannot find the next action, read the status, recover from errors, or inspect a large graph without losing context. Validate the complete flow under normal, blocked, failure, long-copy, small-screen, and large-graph conditions, then fix the highest-impact defects directly.

The stress test must explicitly reject the all-panels-at-once failure mode. A 500-node graph proof is not acceptable if the user has to scroll past unrelated panels or decode technical logs to know what to do. Large graph views should provide at least one focused navigation path: overview, selected item, list/search/filter or equivalent, and return to report/run context without losing selection.

Stress the quality of the generated surfaces too. The app is not usable if the graph labels clip, the feed becomes a wall of similar paragraphs, the story is only four generic bullets, or blocked warnings dominate the main workflow more than the useful local output. The UX stress pass must inspect:

- graph node labels and relationship labels at desktop, tablet, and mobile widths
- long actor names, long tensions, long scenario seeds, and long publishing angles
- feed readability with at least five top-level posts, nested discussion, run insights, and timeline events
- mobile feed fatigue, including whether summary-first or collapsible sections are needed
- story usefulness as an exportable publishing artifact, not only a report box
- whether repeated blocked-state warnings crowd out the local mode's actual value

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not treat screenshots alone as accessibility proof. Do not hide large graph failure by capping input without explanation. Do not let technical panels crowd out the beginner workflow. Do not ship overlapping text, clipped buttons, unreadable status chips, or a giant dashboard that technically contains everything but explains nothing.

## Minimum proof before moving on

Run build/test/smoke checks plus browser checks across desktop and mobile. Run automated accessibility checks if available and manual keyboard/focus inspection. Capture screenshots for Start, Map, Run, Feed, Story, Projects, normal, empty, blocked, error, and large-graph states. Verify text does not overlap or clip. Verify mobile uses navigable task views rather than one endless stacked cockpit.

Add a reviewer-style proof note: what the app now makes clear, what still feels generic, what a user can publish next, and which claims remain unproven. Treat this as part of the UX evidence, not optional commentary.

## Handoff note

Record viewport checks, accessibility checks, large-graph results, repaired UX defects, remaining risks, screenshots, and the next active phase.
