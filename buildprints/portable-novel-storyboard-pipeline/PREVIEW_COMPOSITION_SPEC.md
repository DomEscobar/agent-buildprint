# Preview Composition Spec

## Goal

Render a browser preview from portable state. This is a substitute for final stitched video export, not parity with Toonflow's video compositor.

## Manifest

```ts
type PreviewManifest = {
  version: "portable-preview-1";
  generatedAt: string;
  project: ProjectSummary;
  chapters: Chapter[];
  events: EventSummary[];
  planData: {
    storySkeleton?: string;
    adaptationStrategy?: string;
  };
  scripts: Script[];
  assets: Asset[];
  storyboardTable: string;
  storyboardRows: StoryboardPanelRow[];
  tracks: PreviewTrack[];
  media: MediaRecord[];
  taskLog: JobRecord[];
  limitations: string[];
};
```

Preview-facing records may include deterministic local refs:

```ts
type MediaRecord = { uri: string; previewUri?: string };
type Asset = { previewUri?: string };
type StoryboardPanelRow = { thumbnailUri?: string };
```

## Track Composition

```ts
type PreviewTrack = {
  id: string;
  label: string;
  duration: number;
  rowIds: string[];
  selectedVideoId?: string;
  videos: string[];
};
```

Rules:

- Group storyboard rows by `track`.
- Track duration is sum of row durations.
- Preserve row order from storyboard table.
- For multi-ref modes, cumulative track duration should be <= 15s.
- For first-frame mode, each row is its own track.
- Video records attach to track IDs, not directly to the final movie.

Evidence: track grouping and duration update in `src/routes/production/storyboard/batchAddStoryboardInfo.ts:52-91`; video records attach to `videoTrackId` in `src/routes/production/workbench/generateVideo.ts:78-85`.

## Browser Preview

Preview UI:

- Timeline lanes from `tracks`.
- Clip cells from storyboard rows with sequence, duration, media state, and local thumbnail/fixture.
- Selected-shot inspector with frame, videoDesc, prompt, linked assets, duration, track, and media/task state.
- Compact media tiles for image/video records; raw `mock://...` or provider refs hidden behind details/debug.
- Debug drawer for task log, validation issues, and raw manifest JSON.
- Selected preview panel shows best available media:
  - selected video if success,
  - storyboard image if success,
  - deterministic local fixture/placeholder if no media.
- Details panel shows videoDesc, prompt, assets, duration, state.

The preview must not lead with a manifest textarea, raw media URI table, or task log.

## Export Boundary

Safe export:

- JSON manifest.
- Optional zip containing manifest and local mock/media files.
- Deterministic snapshot for tests.

Unsafe export claim:

- Final stitched MP4.
- Audio/video synchronization.
- Transition/render parity.
- Original workbench export behavior.

Evidence: source docs mention returning to workbench for stitching/export in `docs/README.en.md:145-146`, but no buildprint evidence proves compositor internals. Keep the selected package to manifest/preview output.
