# World Verification Contract

This contract exists because file counts and a few hand-picked screenshots do not prove a complete game world. A claim may pass only when structural, rendered, traversal, and independent-review evidence agree.

## Required proof layers

### 1. Immutable asset proof

`npm run assets:world:validate` must compare every runtime world file against `assets/world/manifest.json` and fail on a missing file, dimension mismatch, hash mismatch, undeclared replacement, remote runtime URL, or Pokemon graphic inside the world bundle.

Write `.buildprint/world-assets-proof.json` with the manifest hash, verified files, and zero policy violations. The validator generates this file; agents must not hand-author a passing result.

### 2. Structural map proof

`npm run maps:validate` must parse every required TMX file and emit `.buildprint/map-audit.json`. For every map it records:

- map id, dimensions, tileset references, layer names, non-empty tile count, distinct tile ids, object counts, collision cells, warps, NPCs, encounters, items, and script hooks
- normalized hashes for geometry, tile layers, collision, objects, and the complete TMX
- validation against the corresponding `map-manifest.yaml` entry and story graph requirements

The command must fail on missing/empty layers, broken tileset paths, out-of-bounds spawns, warps without valid destinations, one-way warps unless explicitly declared, unreachable required objects, missing collision/encounter semantics, or duplicate complete-map hashes unless the manifest explicitly allows the duplicate.

Similarity is a review signal, not an automatic accusation. If two non-variant maps have the same geometry hash or more than 90% identical tile placement, `map-audit.json` marks both `needs_visual_review`; the independent reviewer must resolve that finding.

### 3. Render-every-map proof

`npm run maps:render-proof` must render every required map through the actual Phaser/Tiled loader, not a separate mock renderer. It writes:

- `.buildprint/map-renders/{map_id}.png` for every required map enumerated by `map-manifest.yaml` (currently 88 Kanto and 18 additional Sevii maps); validators derive counts from entries and fail if the declared totals drift
- `.buildprint/map-renders/contact-sheet-kanto.png`
- `.buildprint/map-renders/contact-sheet-sevii.png`
- `.buildprint/map-render-index.json` with map id, source TMX hash, rendered PNG hash, dimensions, camera/scale, tileset hash, and render timestamp

Every rendered PNG must be non-empty and unique unless an allowed variant is recorded. Missing renders, repeated screenshots, solid-color output, debug overlays, editor-only output, or a render hash not tied to the current TMX hash are hard failures.

The contact sheets are for triage only. Reviewers must be able to open each full-resolution map render.

### 4. Runtime traversal proof

Static renders do not prove that the world is playable. `npm run world:traverse-proof` must drive the production browser build with Playwright (or equivalent) and write:

- `.buildprint/world-traversal.json` containing each visited map, entry/exit warp, position, story/save fixture, elapsed time, and pass/fail result
- `.buildprint/traces/world-traversal.zip` containing the browser trace
- screenshots at CP-A, CP-M1, CP-M2, CP-M3, Champion, and Sevii checkpoints

At minimum the automated run must load every map, spawn on a walkable tile, move at least one legal step, exercise every warp in both directions where applicable, and confirm required story objects are reachable from a valid entrance under an appropriate save fixture.

Debug teleport may prepare a fixture for isolated map checks, but it cannot prove a story checkpoint. Story claims require continuous player-driven checkpoint runs from the previous persisted save with cheats and debug controls disabled.

### 5. Independent visual review

The implementing agent cannot give final visual approval. A fresh-context or external reviewer receives only the built game, claim, asset manifest, map audit, full map renders, contact sheets, traversal trace, and checkpoint saves.

The reviewer writes `.buildprint/world-visual-review.md` and must:

1. inspect both contact sheets for repetition, empty space, broken layers, incoherent palette, and missing biome identity
2. inspect every map marked `needs_visual_review`
3. inspect at least one full-resolution map from every town, route, cave, dungeon, gym, building/interior, and Sevii biome group
4. play CP-A and two randomly selected mid/late traversal segments chosen after implementation
5. name the five worst visual/world flaws before recording pass/fail

Random selection must be recorded with seed and candidate list. Derive the seed from the reviewed commit SHA so the implementing agent cannot preselect only polished maps.

Before accepting the proof, the independent reviewer runs `npm run world:proof:verify -- --recompute` in a fresh process. That command ignores the existing `.buildprint/world-proof.json`, recomputes every referenced hash and gate into a temporary result, and requires a byte-for-byte match after excluding only the generation timestamp. A mismatch is an automatic failure and the existing proof is treated as hand-authored or stale.

## Evidence binding

`.buildprint/world-proof.json` is generated last and binds the proof set:

```json
{
  "commit": "git sha or dirty-worktree marker",
  "asset_manifest_sha256": "...",
  "map_manifest_sha256": "...",
  "map_audit_sha256": "...",
  "map_render_index_sha256": "...",
  "world_traversal_sha256": "...",
  "browser_trace_sha256": "...",
  "review": ".buildprint/world-visual-review.md",
  "status": "pass | fail | blocked"
}
```

Any source, map, save fixture, screenshot, render, or trace change invalidates the bound proof and requires regeneration.

## Claim ceilings

- no valid asset proof: maximum `data_pipeline`
- no CP-A traversal plus Pallet/Route 1/Viridian renders: maximum `data_pipeline`
- no full current-map render/audit set: maximum `progression_core`
- no continuous checkpoint traversal through Champion: cannot claim `kanto_complete`
- no 18/18 Sevii render/audit set and continuous Sevii traversal: cannot claim `postgame_sevii`
- no independent visual review: `phase_core_passed` may be true, but `claim_qualified` is false

## Automatic failure conditions

- hand-authored pass JSON instead of validator output
- failure to reproduce the bound proof in a fresh verifier process
- identical screenshot reused for multiple map ids
- screenshots without current TMX/save/trace binding
- map loads only through debug teleport and is unreachable in normal progression
- required landmark, NPC, item, encounter area, door, or warp represented only by text/debug labels
- map count passes while a required map is a copy, empty shell, single-tile fill, or inaccessible island
- reviewer scores before listing the five worst flaws
