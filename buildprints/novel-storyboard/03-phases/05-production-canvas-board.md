# Phase 05 — Production Canvas Board

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md` before code edits. Execute through phase-flow and block evidence until `.buildprint/phase-runs/05-production-canvas-board/plan.md` and proof exist.

## Product outcome

A creator can open an episode board, pan and zoom the canvas, drag/edit scripts, assets, storyboard panels, and video-track references, save the board, reload it after restart, and continue from the same layout. The image-refinement board saves upload/generated/reference nodes and edges with clear empty, loading, missing-file, blocked-provider, and error states.

## Phase mode contract

blueprint_mode: product

phase_style: outcome_flow

Glance surfaces delivered: Production canvas board

This phase directly owns the requested Canva-board equivalent. It must prove real canvas interaction, not a static graph: pointer drag, wheel/pinch zoom or equivalent controls, selection, inspector editing, node/edge persistence, and restart readback.

## Mapped product obligations

- Production workbench flow save/load, storyboard ordering, script/assets/storyboard/video hydration, asset-storyboard associations, image-flow nodes/edges, URL/path conversion, and board persistence.

## Behavior compatibility contract

Preserve the infinite-canvas-like organization of scripts, characters/assets, storyboards, materials, and videos. Target may improve the board model, but saved flows must roundtrip through durable state and reload without source code access.

## Implementation scope

- Canvas viewport with pan/zoom, drag/drop placement, node selection, multi-type nodes, inspector edit, save/load, dirty/saved indicators.
- Production board data model for script text, plan, assets, storyboards, workbench video tracks, associations, node positions, edges, and flow ids.
- Image-flow board with upload nodes, generated image nodes, references, edges, local path normalization, and missing-image recovery.
- Browser proof for create/edit/save/reload across restart.

## Interfaces touched

Canvas UI, board state service, production-flow API, image-flow API, storyboard/asset/video read models, repository migrations, media URL resolver.

## State/runtime touched

Owns production flow JSON/schema, board node/edge state, canvas transforms, storyboard display order, image-flow rows, and flow ids. Reads project, script, asset, image, storyboard, and video data owned by prior/later phases; does not own provider jobs.

## UX/UI requirements

The board must feel like a creative workspace: stable canvas dimensions, smooth transform controls, visible mini-map or reset view, snap/align affordances if useful, inspector panels, thumbnails, keyboard focus, responsive fallback, and screenshot critique. Text must not overlap nodes or controls.

## Safety/security constraints

Validate board JSON/schema, size limits, ownership checks, safe URL/path replacement, missing-file handling, and no executable content from node data.

## Quality gates

- Board schema/unit tests for node/edge/position/association roundtrip.
- API tests for save/load and image-flow URL/path conversion.
- repeatable_browser_e2e for pan, zoom, drag, edit, save, reload, restart readback, screenshot diff.
- `verify:no-fake` and `PHASE_ID=05-production-canvas-board verify:phase-artifacts`.

## Proof gate

Required labels: `repeatable_browser_e2e`, `durable_persistence`, `visual_quality_gate`, `no_fake`.

Proof must name pointer or keyboard interactions used for pan/zoom/drag/edit, include screenshot/browser artifacts before and after reload, and show saved board data survives restart. A static node list or route-shaped save endpoint fails.

## Repair routing

Canvas interaction, flow persistence, image-flow, UI quality, or browser proof failure routes to this phase. Missing upstream assets/scripts routes to Phase 02/04.

