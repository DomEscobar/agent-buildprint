# 03-editor-template-chat-loop

## How to implement this phase

Before writing code, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md` if it exists, current project `AGENTS.md` if it exists, `BUILDPRINT.md`, `01-project-setup.md`, and `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact. Build the full editable presentation workbench: slide thumbnails, canvas rendering, template/theme application, inline editing, add/reorder behavior, autosave/readback, presentation mode, and chat-driven slide refinement.

## Building objective

Users must be able to generate slides from the reviewed outline and selected template, inspect each slide in an aspect-locked canvas, navigate with thumbnails, reorder slides, add a slide from an available layout, edit text/image/icon fields, apply or preserve theme data, and see changes saved to durable state. The chat sidecar must support a real slide mutation path: a user request identifies target slide(s), the app shows focused/working state, the mutation changes persisted slide content, and readback proves the deck changed.

Presentation mode must show the deck without editor chrome, support next/previous navigation and exit, and preserve theme/template rendering. Error boundaries must show useful messages when a slide layout fails rather than crashing the whole workbench.

Editor, template, chart, and drag/reorder work must follow `blueprint.yaml` `proven_implementation_requirements`: use a structured slide template/rendering system, a proven rich text editor or bounded structured inputs, proven drag/drop interaction library for reorder, and chart/diagram libraries for generated visual primitives. If custom implementations are used, they must prove keyboard, pointer, focus, long-content, visual framing, and persistence behavior.

## DO NOT

- Do not render slides as static images if editing is claimed.
- Do not hand-roll rich editing, drag/reorder, or chart rendering without accessibility, stress, and readback proof.
- Do not implement chat as text-only advice with no slide mutation.
- Do not let reorder modify only Redux/client state without persistence.
- Do not allow a broken slide layout to blank the whole editor.
- Do not make the template system a color-only switch.
- Do not let long content overflow without a visible repair or reviewer blocker.
- Do not ship placeholders, lorem ipsum, empty wrappers, functionless buttons, inert navigation, swallowed errors, fake progress, or mocked/sample data counted as real proof.

## Minimum proof before moving on

- Browser proof shows generated slides, thumbnail selection, reorder, add slide, inline edit, autosave/readback, and presentation mode.
- Chat proof shows a prompt that changes a target slide and persists after reload.
- Visual proof checks no clipped core controls, stable slide aspect ratio, readable selected states, and no page-level horizontal overflow.
- Long-content stress fixture either fits or records a precise layout blocker.
- Tests cover backend slide update/reorder/readback and frontend state transitions where practical.

## Handoff note

Record editor workflows proven, chat mutation fixture, template/theme proof, visual QA notes, and any slide layout/content overflow blockers.
