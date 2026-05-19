# Workbench UX Spec

## Attention Anchor

The app is a creative production workbench. It is not a landing page, generic SaaS dashboard, or debug console.

## Desktop Layout

Use a stable four-zone workbench:

| Zone | Contents | Required Behavior |
|---|---|---|
| Left rail | project navigation, pipeline progress, chapter/script list | shows current stage and completed gates |
| Center workspace | active stage content, storyboard board, timeline lanes | primary creative surface; no raw JSON-first views |
| Right inspector | selected chapter/script/asset/shot/track details | updates when user selects a row, frame, asset, or track |
| Bottom drawer | task log, validation issues, raw manifest/debug artifacts | collapsible; not the primary page content |

## Required Screens

Project dashboard:

- compact project config;
- ordered chapter list;
- event states with retry reasons;
- pipeline progress toward ScriptAgent and ProductionAgent.

ScriptAgent workspace:

- assistant/chat panel for stage actions and stop;
- stage tabs for Skeleton, Adaptation, Scripts;
- generated script list with source chapter links.

ProductionAgent workspace:

- asset board with deterministic local thumbnails or initials;
- storyboard board with fixed-size shot cards;
- storyboard mode control;
- validation errors near the board;
- track workbench with cumulative duration and media state.

Preview:

- timeline lanes first;
- selected-shot preview canvas/card;
- compact media records as tiles;
- export action and limitations visible but secondary;
- raw manifest JSON behind drawer/details or after explicit export.

## Mobile Layout

Use a focused single-column flow:

- top navigation or compact rail;
- one active workspace section at a time;
- selected-shot inspector collapses below the active card;
- task/debug drawer remains collapsed by default;
- completed preview screenshot must show frames/timeline/inspector, not only initial controls.

## Interaction Rules

- Every enabled control must mutate visible state or trigger a real service path.
- Disabled controls need a short accessible reason.
- Selecting a storyboard card updates the inspector and preview.
- Export must parse from rendered UI during QA, but JSON must not dominate the initial preview.

