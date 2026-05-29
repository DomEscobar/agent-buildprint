# UX/UI Craft Contract

## Role

Ensure the webapp feels like a desirable production storyboard tool and the Canvas board is usable under real creative work conditions.

## Requirements

- Nodes, edges and controls must be readable and manipulable.
- The first viewport must clearly communicate "storyboard production workbench" through ordered shot frames, visual media surfaces and selected-shot detail.
- Storyboard frames must be first-class visual objects with stable preview aspect ratios, shot number, scene/beat label, status, linked assets/characters and revision signal.
- The graph/canvas supports production flow, but it must not be the only meaningful visual artifact on screen.
- Zoom, pan, drag and layout controls must work without layout shifts.
- Right chat panel must coexist with the canvas and be resizable or otherwise space-conscious.
- A selected-frame inspector must support prompt, notes, continuity, status and media review without burying core actions.
- Empty, loading, blocked, streaming, pending, success and failure states must be visible.
- The visual system must be intentional and production-grade: dense but calm, media-forward, polished spacing, readable type scale, no generic dashboard filler and no decorative gradients used as a substitute for product content.
- Desktop and narrow viewport screenshots are required for UI-bearing phases.

## Must Reject

- Marketing-page layout as the main screen.
- Generic SaaS dashboard, kanban board or bare node graph that lacks storyboard-specific frame review.
- Text overlapping controls.
- Static graph image or fake canvas.
- Hidden controls required for core workflow.
- Visual states that require reading logs or raw JSON to understand whether a shot is blocked, failed, queued, ready, revised or approved.

## Review Gate

Run browser screenshot and interaction checks for every UI phase and record artifact paths in `.buildprint/evidence/evidence-ledger.jsonl`. A UI phase fails if screenshots are technically rendered but do not show a coherent storyboard product with legible shot frames, inspector state and unobstructed controls.
