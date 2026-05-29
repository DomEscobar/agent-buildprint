# UX/UI Craft Contract

## Role

Ensure the webapp feels like a production tool and the Canvas board is usable under real work conditions.

## Requirements

- Nodes, edges and controls must be readable and manipulable.
- Zoom, pan, drag and layout controls must work without layout shifts.
- Right chat panel must coexist with the canvas and be resizable or otherwise space-conscious.
- Empty, loading, blocked, streaming, pending, success and failure states must be visible.
- Desktop and narrow viewport screenshots are required for UI-bearing phases.

## Must Reject

- Marketing-page layout as the main screen.
- Text overlapping controls.
- Static graph image or fake canvas.
- Hidden controls required for core workflow.

## Review Gate

Run browser screenshot and interaction checks for every UI phase and record artifact paths in `.buildprint/evidence/evidence-ledger.jsonl`.
