# Phase 12 — UX stress, accessibility, and large graph

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `enhancement-gaps.md`, and only this active phase before coding. Stress the product as a user, not only as a codebase. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Prove the product is understandable, accessible, and usable under stress. Test novice flow comprehension through the UI copy and layout, mobile/tablet/desktop responsiveness, keyboard navigation, focus states, labels, contrast, reduced motion, empty/loading/error/blocked states, and graph scaling at 25, 100, and 500 nodes. Repair layout overlap, text clipping, hidden critical controls, low contrast, broken focus order, and graph interaction failures.

This phase should treat the interface as the product’s main reliability surface. A working backend does not matter if the user cannot find the next action, read the status, recover from errors, or inspect a large graph without losing context. Validate the complete flow under normal, blocked, failure, long-copy, small-screen, and large-graph conditions, then fix the highest-impact defects directly.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not treat screenshots alone as accessibility proof. Do not hide large graph failure by capping input without explanation. Do not let technical panels crowd out the beginner workflow. Do not ship overlapping text, clipped buttons, or unreadable status chips.

## Minimum proof before moving on

Run build/test/smoke checks plus browser checks across desktop and mobile. Run automated accessibility checks if available and manual keyboard/focus inspection. Capture screenshots for normal, empty, blocked, error, and large-graph states. Verify text does not overlap or clip.

## Handoff note

Record viewport checks, accessibility checks, large-graph results, repaired UX defects, remaining risks, screenshots, and the next active phase.
