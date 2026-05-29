# Specification

## Scope

Build a browser-first Novel Storyboard production workbench for turning prose/script beats into ordered storyboard shots and media-ready workbench state.

## Required Product Behavior

- Episode workbench opens to a storyboard-first first viewport with shot frames, selected-frame inspector and canvas flow controls.
- Canvas supports real nodes, edges, zoom, pan, drag and layout.
- Storyboard frames carry shot number, scene/beat label, prompt, notes, status, continuity tags, linked assets/characters and media state.
- Agent chat can stream structured updates into visible board/frame state and stop safely.
- Media generation uses provider boundaries with blocked/failure/pending/success states and no fake success promotion.
- Board data, storyboard order, frame metadata and media state survive reload and backend restart.
- API/socket/media access is authenticated and scoped by project/episode.

## Non-Goals

- Desktop-only implementation.
- Static canvas mock, card-only board or generic dashboard.
- Full suite expansion beyond the selected workbench unless needed for proof.
- Live provider qualification without credentials and evidence.
