# Visual Fixture Pack

## Attention Anchor

Mock/no-network does not mean text-only. Use deterministic local visuals so the preview looks like a storyboard product.

## Required Local Fixtures

Bundle deterministic local visual fixtures for:

- `asset-mara` - Mara role thumbnail.
- `asset-theo` - Theo role thumbnail.
- `asset-steward` - Masked Steward role thumbnail.
- `asset-clocktower` - Clock Tower Archive scene thumbnail.
- `asset-mirror-stair` - Mirror Stair scene thumbnail.
- `storyboard-row-1` - first storyboard frame thumbnail.
- `storyboard-row-2` - second storyboard frame thumbnail.
- `media-image-pending`, `media-image-failure`, `media-video-success` placeholder states.

Fixtures may be simple SVG, PNG, or CSS-backed local assets. They must be checked into the generated implementation or generated deterministically by code with no network calls.

## Provider Mapping

Mock image/video providers must return deterministic media records with a preview-facing local ref:

```ts
type MediaRecord = {
  uri: string;        // raw mock/provider ref, debug only
  previewUri?: string; // local fixture ref for primary UI
};
```

Asset and storyboard records may expose:

```ts
type Asset = { previewUri?: string };
type StoryboardPanelRow = { thumbnailUri?: string };
```

## UI Rules

- Primary media UI displays `previewUri` or `thumbnailUri`.
- Raw `mock://...` refs appear only in debug/details.
- Missing fixture refs must show a designed local placeholder tile, not broken images or raw text.
- Browser QA must assert that local thumbnails render in the completed preview.

