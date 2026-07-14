# Phase 04 — Pallet Town World Proof

## How to implement this phase

Build and certify one production-quality starter town after `03-battle-core` passes. Read `references/starter-town-verification.md`, `alignment-slice/ALIGNMENT.md`, `references/asset-policy.md`, `references/world-art-sources.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current battle proof. Do not expand Route 1 or Viridian City until Pallet Town passes this phase.

Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

## Building objective

Deliver `pallet_town` through the production Phaser/Tiled loader as a coherent, attractive starter town using the committed CC0 world assets. The proof target is visual and structural craft, not reproduction of Nintendo map geometry.

The map must read immediately as a small starting settlement with intentional landmark hierarchy, connective paths, breathing space, boundaries, and a clear northward direction. The player can walk naturally around it without sticky collision, clipping, wrong layering, fractional blur, or exposed void.

### Required composition

Include and visually distinguish:

- player home
- rival home
- Oak lab
- main connective paths and smaller approach paths
- signs or mailboxes aligned to interaction tiles
- landscape boundary that contains the camera and player
- canonical north exit toward `route_1`
- valid player spawn
- exterior door/warp points for the three landmark buildings

The three structures cannot be palette-swapped copies placed on an empty grass field. Use scale, roof/entry composition, props, path approach, and surrounding landscape to create hierarchy with the available approved atlas.

## Semantic map authoring

Use `data/maps/source/pallet_town.layout.yaml` as the coding-agent source of truth. It references semantic keys from `data/maps/tile-catalog.yaml` only. The canonical catalog records each base tile, stamp, and sequence with:

- semantic key and placement mode (`repeatable`, `stamp-only`, `sequence-only`)
- atlas source rectangle and generated GID mapping
- stamp width/height, anchor, ordered pieces, and allowed layers
- collision semantics, interaction/door point, and allowed adjacency

Roofs, water edges, trees, fences, buildings, and props with top-left/top-right/bottom/middle pieces must be placed as named structures. An agent must not guess or repeat arbitrary atlas cells.

Run:

```bash
npm run maps:compile -- --map pallet_town
npm run maps:validate -- --map pallet_town
```

The deterministic compiler writes `data/maps/generated/pallet_town.tmx` for Tiled preview and the production loader. Generated GIDs are allowed only in compiler output. Direct TMX drift, raw GIDs in semantic source, stamp-only solo use, invalid sequence order, out-of-bounds placement, disallowed adjacency, layer mismatch, or source/output hash mismatch fails validation.

## Map and rendering rules

- orthogonal 16x16 logical tile grid
- production `Ground`, `Collision`, `Overhead`, and `Events` layers
- player bottom-center foot point aligned to the current logical tile
- `pixelArt: true`, `roundPixels: true`, antialias disabled, and discrete integer scale
- camera follows and clamps with no view outside map bounds
- walls, roofs, water, trees, and hard boundaries block as shown
- paths and door thresholds remain walkable; interactions work from valid facing tiles
- overhead pieces occlude the player only where spatially correct

Do not use debug overlays, semantic labels, proof badges, or atlas inspectors in player-facing evidence.

## Test-first requirements

Before changing the map compiler/loader, characterize the Phase 02 map-loader boundary and the alignment-slice catalog behavior. Add failing validator fixtures for:

- raw authoring GID
- stamp-only corner placed alone
- sequence pieces out of order
- out-of-bounds structure
- invalid adjacency or layer
- collision disagreeing with catalog semantics
- direct generated-TMX drift

Then add structural tests for all required landmarks, layers, spawn, north exit, doors/warps, reachable interaction points, camera bounds, and collision agreement.

## Runtime traversal proof

Playwright must use the production build, player controller, input mapper, camera, and collision with debug controls disabled. Starting at the canonical spawn, it must:

1. walk around both homes and Oak lab
2. approach every required door/warp and sign from a legal facing tile
3. collide against representative building, tree/boundary, water/landscape, and sign geometry
4. cross every main path junction without sticky collision
5. reach the north exit without teleporting
6. demonstrate correct overhead layering and player foot alignment

Save the trace and positions required by `references/starter-town-verification.md`.

## Visual certification

Render the complete map through the production Phaser/Tiled loader and capture the spawn, homes, Oak lab, and north-exit camera positions at 1280px, plus spawn/walking states at 375px. These captures must collectively show every landmark, edge, path junction, and exit.

A fresh-context or external reviewer receives only the built game, scoped claim, design files, asset manifest, semantic catalog/source, map audit, full-map render, screenshots, and traversal trace. Before verdict, the reviewer names the five worst visible flaws.

The review must critically inspect:

- composition, landmark hierarchy, path flow, breathing space, and starter-town identity
- top-left/top-right/bottom/middle assembly and roof/water/tree/fence seams
- accidental atlas collage, meaningless repetition, single-tile fill, and visual noise
- Ground/Overhead z-order around player, roofs, trees, doors, and props
- palette/material transitions and use of only approved world assets
- collision-to-visual agreement, player foot alignment, pixel crispness, camera framing, and 375px touch comfort

Any unresolved critical or high visual finding keeps this phase active. A valid TMX and green automated checks cannot certify aesthetic quality.

## Required proof

Run:

```bash
npm run assets:world:validate
npm run maps:compile -- --map pallet_town
npm run maps:validate -- --map pallet_town
npm run pallet:proof -- --collect
# independent reviewer writes review + attestation here
npm run pallet:proof -- --finalize
npm run pallet:proof:verify -- --recompute
npm run typecheck
npm run build
```

Required current artifacts:

- `.buildprint/pallet-map-audit.json`
- `.buildprint/pallet-render-index.json`
- `.buildprint/map-renders/pallet_town.png`
- `.buildprint/pallet-traversal.json`
- `.buildprint/traces/pallet-town.zip`
- `.buildprint/pallet-screenshot-index.json`
- `.buildprint/pallet-visual-review.md`
- `.buildprint/reviewer-attestations/pallet.json` written by the independent reviewer, never by the proof generator
- `.buildprint/source-manifest.json` binding normalized paths and SHA-256 hashes to a clean commit
- `.buildprint/pallet-world-proof.json`
- `.buildprint/ui-evidence.md` entries for all required Pallet states
- `.buildprint/evidence-phase-04-pallet.md`

These are scoped Pallet artifacts. They must not create or claim the complete `.buildprint/world-proof.json`.

## Automatic failures

- raw frame/GID authoring or direct generated-TMX edits
- stamp-only cells used alone, invalid sequences, visible seams, broken corners, or disallowed adjacency
- missing/empty layer, landmark, spawn, north exit, required interaction point, or reachable path
- flat single-tile fill, atlas collage, copied/repeated building shells, exposed void, or incoherent palette
- z-order/collision mismatch, sticky movement, fractional blur, clipping, or page overflow
- editor-only or separate proof render instead of the production loader
- debug-teleport-only traversal or player screenshots containing debug/proof UI
- hand-authored pass JSON, stale hash, or recompute mismatch
- dirty-worktree pass, incomplete source manifest, relevant untracked file, symlinked input, unsafe map id/path, unsafe YAML/XML parsing, or shell-string interpolation
- self-approved visual pass, reviewer/implementer identity overlap, missing/mismatched reviewer attestation, generator-written review, missing five-worst-flaws section, or unresolved critical/high finding

## DO NOT

- Do not copy Nintendo map files, ROM tiles, or exact proprietary layouts
- Do not expand Route 1 or Viridian before Pallet Town passes
- Do not let TypeScript types substitute for validating compiled map data
- Do not approve the map because it is merely walkable
- Do not defer compound-tile seams or collision mismatch as later polish

## Minimum proof before moving on

- current Phase 03 battle proof remains pass
- semantic source compiles deterministically and all negative validator fixtures fail correctly
- all required Pallet landmarks/layers/interactions/reachability checks pass
- production full-map render and continuous input-driven traversal exist
- required 1280px and 375px screenshots bind to current source/TMX/tileset hashes
- independent review has no unresolved critical/high visual finding
- `npm run pallet:proof:verify -- --recompute` passes
- `.buildprint/pallet-world-proof.json` status is `pass`
- claim ceiling is stated as exactly `starter_town_core`

If any item fails, keep Phase 04 active and cap maturity at `battle_core`. Only after every item passes may `active_phase` advance to `05-first-loop-integration`.

## Handoff note

Record semantic source/catalog/compiler paths and hashes, landmark and collision coverage, render/traversal/review/screenshot paths, negative validator results, unresolved medium/low findings, verifier output, and the current claim ceiling.
