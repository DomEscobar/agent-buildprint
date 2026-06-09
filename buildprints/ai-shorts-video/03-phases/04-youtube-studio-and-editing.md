# Phase 04 - YouTube Studio And Editing

## How to implement this phase

Build editing and YouTube asset generation as review tools attached to actual clips.

## Building objective

Implement and prove clip editing, subtitles, hook overlays, translations/dubbing where configured, thumbnail/title/description generation, and Remotion render previews. The user should be able to select a generated clip, edit or regenerate visible assets, preview the result, and read back saved edits before export or publishing.

## DO NOT

- Do not use textareas as a substitute for rich caption/timing behavior when timing is claimed.
- Do not generate YouTube titles/thumbnails detached from the selected clip.
- Do not claim Remotion render success without render-service status and output file proof.
- Do not let edit controls mutate state invisibly without readback.

## Minimum proof before moving on

- Edit/readback proof for hook, caption, title, or thumbnail metadata.
- Render-service health check and render job status proof, or exact blocker.
- Preview playback or image readback for rendered output.
- Long-title/long-caption stress check in desktop and mobile UI.

## Handoff note

Record edited fields, render id/output path, failed render/provider blockers, and UI stress results.
