# SPEC

## Product Goal

Build a portable browser workbench that turns ordered novel chapters into events, scripts, extracted assets, storyboard rows, media task records, and an exportable preview manifest.

## Must Preserve

- Ordered chapter import with stable chapter IDs.
- Event extraction state: pending, running, success, failure, and error reason.
- Script-agent stages: outline, adaptation strategy, and episode script.
- Asset extraction into role, scene, prop, clip, and audio categories.
- Production-agent stages: director plan, storyboard table, storyboard panel rows, and flow data.
- Provider adapters for text, image, and video with deterministic no-network defaults.
- Durable local persistence with restart/readback proof.
- Browser workbench states for empty, loading, blocked, error, and success.

## Must Not Claim

- Toonflow clone or drop-in replacement.
- Exact Toonflow UI, canvas, route, API, Electron, provider, or final video stitching parity.
- Placeholder routes, no-op controls, in-memory state, or raw manifest textareas as completed product behavior.

