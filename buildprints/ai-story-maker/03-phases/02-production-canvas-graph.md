# 02 Production Canvas Graph

## How to implement this phase

Read `02-ui-identity.md` and generated `docs/ui-identity.md` before touching canvas UI. Then read `blueprint.yaml`, `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, current project `AGENTS.md` if present, and the phase handoff from phase 01. Build the production graph as the core product object, not as decorative workflow art.

## Building objective

Implement the editable episode production canvas. The canvas must render connected nodes for `script`, `scriptPlan`, `assets`, `storyboardTable`, `storyboard`, and `workbench`. It must support pan, zoom, fit, refresh, auto-layout, episode switching, drag handles, node positions that do not jump during data updates, and clear empty states when an episode lacks content.

The graph should preserve the source-observed mental model: the script flows into director plan, storyboard table, storyboard frames, and video workbench, while assets branch below the script and feed the storyboard/media loop. Layout should default left-to-right for the main chain and put assets below the script, with enough spacing that large cards do not overlap. Users must be able to keep the assistant open while inspecting the canvas.

Each node must be more than a label. Script, director plan, and storyboard table nodes should render readable markdown previews and open editable dialogs. Assets should show original and derived media, names, descriptions, types, generation states, and failed reasons. Storyboard should show frame cards with frame numbers, image placeholders/previews, selected state, scale control, batch selection, insert-between affordances, preview, delete, and edit actions. Workbench should show a video preview entry point and open a detailed generation/editing surface in a later phase.

State changes must use the real flow-data store. If a user edits script/plan/table content, drags nodes, selects frames, or refreshes the canvas, the UI must either persist it or clearly distinguish temporary local view state from saved episode data. Do not treat graph rendering as complete until a save/readback path exists for the node content this phase edits.

## DO NOT

- Do not build a static diagram with inert nodes.
- Do not ship placeholders, functionless buttons, or mocked/sample data counted as proof.
- Do not put all artifacts in a grid or table and call it a canvas.
- Do not let the right assistant obscure the canvas controls.
- Do not use hidden hard-coded node data that cannot be refetched.
- Do not allow node overlap, clipped action buttons, or unreadable dense text to pass.
- Do not skip `02-ui-identity.md` because the phase sounds like graph plumbing.

## Minimum proof before moving on

- Browser proof shows the production route with all required node types for a selected episode.
- Pan, zoom, fit, refresh, and auto-layout are exercised.
- At least one text node is edited, saved, reloaded, and read back.
- Dragging a node does not permanently break layout or snap all nodes back on data refresh unless the reset action is explicit.
- Screenshot inspection with assistant open confirms no overlap, clipped controls, unreadable core text, or page-level horizontal overflow.
- Empty episode state points to the next useful action.

## Handoff note

Record graph library, node data contracts, persisted fields, layout rules, tested interactions, screenshot paths, and any node/action still blocked or intentionally deferred.
