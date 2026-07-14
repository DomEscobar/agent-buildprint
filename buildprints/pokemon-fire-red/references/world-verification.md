# World Verification Contract

This contract exists because file counts and a few hand-picked screenshots do not prove a complete game world. A claim may pass only when structural, rendered, traversal, and independent-review evidence agree.

## Required proof layers

### 1. Immutable asset proof

`npm run assets:world:validate` must compare every runtime world file against `assets/world/manifest.json` and fail on a missing file, dimension mismatch, hash mismatch, undeclared replacement, remote runtime URL, or Pokemon graphic inside the world bundle.

Write `.buildprint/world-assets-proof.json` with the manifest hash, verified files, and zero policy violations. The validator generates this file; agents must not hand-author a passing result.

### 2. Structural map proof

Coding agents author `data/maps/source/{map_id}.layout.yaml` against `data/maps/tile-catalog.yaml`. `npm run maps:compile` deterministically emits `data/maps/generated/{map_id}.tmx` for Tiled preview and the production loader. Generated GIDs are compiler output, not the editable source.

`npm run maps:validate` must parse every semantic source and generated TMX file and emit `.buildprint/map-audit.json`. For every map it records:

Map ids must match `^[a-z0-9_]+$` and be members of `map-manifest.yaml`. CLI arguments are process argument arrays, never interpolated shell strings. Resolve source, output, catalog, tileset, and imported paths and enforce containment within declared project roots; reject absolute paths, URLs, `..` segments, and symlinks. Parse YAML in safe mode without custom tags and XML/TMX with DTDs and external entities disabled.

- map id, dimensions, tileset references, layer names, semantic key/stamp/sequence counts, non-empty tile count, distinct generated tile ids, object counts, collision cells, warps, NPCs, encounters, items, and script hooks
- normalized hashes for semantic source, tile catalog, compiler, geometry, tile layers, collision, objects, and the complete generated TMX
- validation against the corresponding `map-manifest.yaml` entry and story graph requirements

The command must fail on raw frame/GID authoring, stamp-only pieces used solo, invalid sequence order, out-of-bounds stamps, disallowed adjacency/layer, collision that disagrees with catalog semantics, direct generated-TMX drift, missing/empty layers, broken tileset paths, out-of-bounds spawns, warps without valid destinations, one-way warps unless explicitly declared, unreachable required objects, missing collision/encounter semantics, or duplicate complete-map hashes unless the manifest explicitly allows the duplicate.

Similarity is a review signal, not an automatic accusation. If two non-variant maps have the same geometry hash or more than 90% identical tile placement, `map-audit.json` marks both `needs_visual_review`; the independent reviewer must resolve that finding.

### 3. Render-every-map proof

`npm run maps:render-proof` must render every required map through the actual Phaser/Tiled loader, not a separate mock renderer. It writes:

- `.buildprint/map-renders/{map_id}.png` for every required map enumerated by `map-manifest.yaml` (currently 88 Kanto and 18 additional Sevii maps); validators derive counts from entries and fail if the declared totals drift
- `.buildprint/map-renders/contact-sheet-kanto.png`
- `.buildprint/map-renders/contact-sheet-sevii.png`
- `.buildprint/map-render-index.json` with map id, semantic-source hash, tile-catalog/compiler hash, generated TMX hash, rendered PNG hash, dimensions, camera/scale, tileset hash, and render timestamp

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

Before accepting the proof, the independent reviewer runs `npm run world:proof:verify -- --recompute` in a fresh process. That command ignores the existing `.buildprint/world-proof.json`, recomputes every referenced hash and gate into a temporary result, and compares normalized audits, traversal events, screenshots, and asserted states. The submitted raw trace ZIP remains hash-bound diagnostic evidence, but a fresh ZIP is not byte-compared because browser timing and archive metadata are nondeterministic. Exclude timestamps, trace ids, ZIP metadata, and render timing only; never exclude gameplay or world-state fields. A semantic mismatch is an automatic failure and the existing proof is treated as hand-authored or stale.

## Evidence binding

`.buildprint/world-proof.json` is generated last and binds the proof set:

```json
{
  "commit": "clean git commit sha",
  "source_manifest_sha256": "...",
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

Certification requires a clean commit and deterministic sorted source manifest covering production source, proof/verifier scripts, fixtures, configs, manifests, dependency lockfile, and assets. Dirty runs are diagnostic only. Relevant untracked files, omissions, absolute/out-of-root paths, and symlinks fail. Any source, map, save fixture, screenshot, render, or bound submitted-trace change invalidates the proof and requires regeneration.

## Claim ceilings

- no valid world-asset proof: world maturity cannot exceed `battle_core`; a current battle proof remains valid
- no current scoped Pallet proof: maximum `battle_core`
- no CP-A traversal plus Pallet/Route 1/Viridian renders: maximum `starter_town_core`
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
