# Design System Spec

## Attention Anchor

Professional creative workbench: restrained, dense, visual, and readable.

## Visual Direction

- Use a neutral production-tool base with 2-3 purposeful accents.
- Avoid one-note palettes dominated by a single hue family.
- Do not use decorative blobs, gradient orbs, oversized heroes, or marketing composition.
- Keep cards at 8px radius or less unless representing media frames.
- Use icons for navigation/actions where familiar, with labels or tooltips for clarity.

## Components

Required component treatment:

- Shot cards: fixed aspect ratio, thumbnail/frame area, sequence, duration, track, media badge.
- Timeline lanes: stable height, ordered clips, cumulative duration, selected state.
- Inspector: compact sections for frame, description, prompt, assets, media, validation.
- Media tiles: thumbnail/placeholder, kind, state badge, short ID, details toggle for raw ref.
- Task drawer: dense rows, filter/group by kind/state, hidden by default.
- Manifest export: button and hash summary first, raw JSON after explicit reveal/export.

## Text And Layout

- No label splitting or narrow-cell wrapping for short terms like `image`, `video`, `success`, `track-1`.
- Use `minmax(0, 1fr)`, fixed thumbnail sizes, and responsive constraints to prevent overlap.
- Raw provider refs may wrap only in debug/details regions.
- Empty states must explain the next enabled action without becoming the final QA screenshot.

## State Colors

- Success: green badge.
- Running/queued: blue or neutral badge.
- Failure/cancelled: red badge with visible reason.
- Warning/limitation: amber or neutral callout, not the dominant page block.

