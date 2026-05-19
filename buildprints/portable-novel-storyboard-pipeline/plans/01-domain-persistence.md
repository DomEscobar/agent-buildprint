# Phase 01 - Domain And Persistence

## Goal

Create the durable local domain model and manifest assembly base for the binding slice.

## Keep In Context

- `CONTRACTS.md`
- `PREVIEW_COMPOSITION_SPEC.md`
- `VISUAL_FIXTURE_PACK.md`

## Steps

1. Define models for project, chapter, event, script plan, script, asset, storyboard row, media record, video track, task record, and PortablePreviewManifest.
2. Implement deterministic ID and clock services.
3. Implement repository abstraction using the confirmed persistence choice.
4. Import exactly 3 ordered chapter fixtures with pending event state.
5. Add asset de-dupe and track grouping helpers.
6. Assemble deterministic manifest with limitations and preview-facing fixture refs.

## Do Not

- claim production durability if storage is browser-local or temporary;
- persist provider secrets;
- expose raw provider refs as primary UI fields;
- change PortablePreviewManifest scope into final video export.

## Exit Criteria

- chapter order, event states, deterministic IDs/clock, asset de-dupe, track grouping, and manifest assembly have tests;
- manifest includes preview-facing local refs where available.

## Validation Evidence

- unit/contract test summary;
- manifest snapshot or sample with required counts.

