# Starter Town Verification Contract

This contract certifies a production-quality `pallet_town` after battle proof and before Route 1 integration. File counts, TMX validity, or a hand-picked screenshot do not prove that compound atlas tiles form a coherent town.

## Canonical authoring path

Coding agents author `data/maps/source/pallet_town.layout.yaml` through semantic keys. The applying project keeps one canonical catalog at `data/maps/tile-catalog.yaml` containing, for each tile or structure:

- semantic key and player-facing label
- placement mode: `repeatable`, `stamp-only`, or `sequence-only`
- atlas source rectangle and generated GID mapping
- stamp width, height, ordered pieces, anchor, and allowed layers
- collision semantics, foot/door interaction points, and allowed adjacency

Roofs, water edges, trees, fences, buildings, and props with corner/edge pieces are named stamps or sequences. Agents may not place their top-left, top-right, bottom, or middle cells independently unless the catalog explicitly promotes that cell to `repeatable` after visual proof.

`npm run maps:compile -- --map pallet_town` deterministically generates the production Tiled output under `data/maps/generated/pallet_town.tmx`. Generated GIDs are allowed only as compiler output. The TMX records the semantic-source, catalog, tileset, and compiler hashes. Direct generated-TMX edits, raw frame/GID authoring, stamp-only solo placement, invalid sequence order, out-of-bounds stamps, disallowed adjacency, or source/output drift fail `npm run maps:validate -- --map pallet_town`.

Map CLI safety is part of correctness. Map ids must match `^[a-z0-9_]+$` and be members of `map-manifest.yaml`. Pass process arguments as arrays, never interpolated shell strings. Resolve every source, output, catalog, tileset, and imported path and enforce containment in its declared project root. Reject absolute paths, URLs, `..` segments, and symlinks. Parse YAML in safe mode with custom tags disabled; parse XML/TMX with DTDs and external entities disabled.

Tiled remains the preview and runtime interchange format. Any useful editor change must be expressed back in the semantic source and recompiled before it can count as proof.

## Required town content

The production map must provide a coherent starter-town composition using the committed world bundle, without copying Nintendo map files or ROM assets:

- player home, rival home, and Oak lab as visually distinct named structures
- connective walking paths with intentional open breathing space
- signs or mailboxes that align to their paths and interaction points
- landscape boundary with no visible void or accidental exits
- canonical north exit toward `route_1`
- valid player spawn and reachable exterior side of every required door/warp
- `Ground`, `Collision`, `Overhead`, and `Events` layers with deliberate z-order

Collision must agree with visible geometry: roofs/walls/water/trees block, paths remain walkable, door thresholds and signs interact from valid facing tiles, and the player's bottom-center foot point stays aligned to the logical tile.

## Scoped structural proof

`npm run pallet:proof -- --collect` must use the production compiler, Phaser/Tiled loader, camera, collision, and player controller. It generates scoped artifacts but cannot emit a passing final proof. After independent review, `npm run pallet:proof -- --finalize` consumes the review and attestation read-only and generates the final proof:

- `.buildprint/pallet-map-audit.json`
- `.buildprint/pallet-render-index.json`
- `.buildprint/pallet-traversal.json`
- `.buildprint/traces/pallet-town.zip`
- `.buildprint/pallet-screenshot-index.json`
- `.buildprint/pallet-world-proof.json` generated last

These artifacts never substitute for `.buildprint/world-proof.json`, which remains reserved for the complete Kanto/Sevii world contract.

The independent reviewer separately writes `.buildprint/pallet-visual-review.md` and `.buildprint/reviewer-attestations/pallet.json`; `pallet:proof` consumes them read-only when generating the final proof.

The structural audit records source/catalog/compiler/TMX/tileset hashes, dimensions, layers, non-empty cells, semantic key counts, stamp and sequence instances, collision cells, spawn, exit, doors, warps, signs, reachable tiles, and validator findings. It fails on missing landmarks/layers, unreachable required objects, collision mismatch, empty/single-fill output, duplicate large regions, raw authoring GIDs, or generated-file drift.

## Render and traversal proof

Render the complete map through the production Phaser/Tiled loader, not an editor export or separate proof renderer. Save `.buildprint/map-renders/pallet_town.png` and bind its hash to the current semantic source, compiled TMX, tileset, and runtime loader.

Playwright drives the production build with debug controls disabled. The trace must:

- start at the canonical player spawn
- walk legal paths around all three landmarks
- collide against representative wall, tree/edge, water/landscape, sign, and building boundaries
- approach every required door/warp from a legal facing tile
- reach the north exit without teleporting
- confirm camera clamp, overhead layering, player foot alignment, and no sticky collision

Debug teleport may diagnose a defect but cannot satisfy the traversal proof.

## Required visual captures

Capture into `.buildprint/screenshots/`:

- `pallet-town-full-map.png`
- `pallet-town-spawn-desktop-1280.png`
- `pallet-town-homes-desktop-1280.png`
- `pallet-town-oak-lab-desktop-1280.png`
- `pallet-town-north-exit-desktop-1280.png`
- `pallet-town-spawn-mobile-375.png`
- `pallet-town-walk-mobile-375.png`

The four desktop camera positions must collectively show every landmark, map edge, path junction, and north exit. Each index entry records viewport/canvas dimensions, player tile/facing, camera bounds, source/TMX/tileset hashes, and screenshot hash. Player-facing evidence contains no collision overlay, atlas inspector, semantic labels, proof text, or debug control.

## Independent visual review

The implementing agent cannot issue the final verdict. A fresh-context or external reviewer receives only the built game, current scoped claim, design artifacts, asset manifest, semantic catalog/source, map audit, full-map render, screenshots, and traversal trace.

Before pass/fail, the reviewer writes the five worst visible flaws in `.buildprint/pallet-visual-review.md` and writes `.buildprint/reviewer-attestations/pallet.json`; the proof generator may never create or modify either file. The attestation records reviewer run/session identity, all implementer run/session identities, the reviewed clean commit and source-manifest hash, exact input-artifact hashes, the five findings, verdict, and timestamp. Reviewer identity must not overlap any implementer identity. The review checks:

1. coherent town composition, landmark hierarchy, path flow, open-space balance, and starter-town identity
2. no atlas collage, accidental single-tile fill, visual noise, or meaningless repetition
3. correct top-left/top-right/bottom/middle assembly, water/roof/tree/fence seams, and corner continuity
4. layer and z-order correctness around roofs, trees, props, doors, and the player
5. coherent palette and material transitions using only approved committed world art
6. collision-to-visual agreement, player foot alignment, camera framing, pixel crispness, and 375px touch comfort

Findings use `critical`, `high`, `medium`, or `low`. Any unresolved critical or high finding fails the phase. Automated checks can prove structure, hashes, reachability, blank output, or exact duplication; they cannot certify that the town looks good.

## Evidence binding and recomputation

`.buildprint/pallet-world-proof.json` binds at least:

```json
{
  "commit": "clean git commit sha",
  "source_manifest_sha256": "...",
  "semantic_source_sha256": "...",
  "tile_catalog_sha256": "...",
  "compiler_sha256": "...",
  "tmx_sha256": "...",
  "tileset_sha256": "...",
  "map_audit_sha256": "...",
  "render_index_sha256": "...",
  "traversal_sha256": "...",
  "browser_trace_sha256": "...",
  "screenshot_index_sha256": "...",
  "visual_review_sha256": "...",
  "reviewer_attestation_sha256": "...",
  "status": "pass | fail | blocked"
}
```

Certification requires a clean Git commit. A dirty worktree may emit diagnostics but never `status: pass`. Generate a deterministic, sorted source manifest of normalized `path + SHA-256` entries covering production source, proof/verifier scripts, fixtures, configs, manifests, dependency lockfile, and assets. Reject relevant untracked files, omissions, absolute/out-of-root paths, and symlinks.

`npm run pallet:proof:verify -- --recompute` ignores the submitted final proof, recompiles from semantic source in a fresh process, reruns validation/render/traversal gates, and compares normalized map audits, traversal events, screenshot semantics, and asserted browser states. The submitted raw trace ZIP remains a hash-bound diagnostic artifact; verify its recorded hash and existence, but do not require a newly generated ZIP to be byte-identical because archive metadata and browser timing are nondeterministic. Fresh reruns compare normalized semantic traversal events with timestamps, trace ids, ZIP metadata, and render timing excluded. The verifier validates attestation binding and identity independence; it does not recompute aesthetic judgment. Any source, catalog, compiler, TMX, tileset, collision, runtime loader, screenshot, design-contract, review, or attestation change invalidates the proof.

## Automatic failure conditions

- hand-authored pass JSON, stale proof, or recompute mismatch
- dirty-worktree pass, incomplete source manifest, relevant untracked file, symlinked input, or manifest/commit mismatch
- invalid/non-manifest map id, unsafe path, shell-string interpolation, unsafe YAML tag, DTD, or external entity
- raw frame/GID values in authoring source or direct generated-TMX drift
- stamp-only cell placed solo, invalid sequence order, broken corner/edge seam, or disallowed adjacency
- missing/empty layer, landmark, spawn, north exit, required interaction point, or reachable path
- editor-only/screenshot-only render, debug-teleport-only traversal, or player evidence with debug overlays
- atlas collage, flat single-tile fill, exposed void, broken z-order, collision mismatch, fractional blur, clipping, or overflow
- implementing-agent self-approval, missing/mismatched reviewer attestation, identity overlap, generator-written review files, missing five-worst-flaws section, or unresolved critical/high visual finding

## Claim ceiling

Without a current recomputed pass, maximum maturity remains `battle_core`. Passing this contract certifies `starter_town_core`; it does not prove Route 1, Viridian City, encounters, CP-A, the full 88-map Kanto world, or `.buildprint/world-proof.json`.
