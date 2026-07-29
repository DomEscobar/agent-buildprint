# World sprite alignment contract

This playable slice records the runtime-proven usage contract for the committed CC0 world assets. Run it with `npm install && npm run dev`; append `?inspect=1` for the development-only atlas inspector. Production builds do not expose the inspector.

## Player source sheet

Source: `public/assets/player-npc.png`, 152x101 PNG.

The source is not a uniform Phaser spritesheet. Every pose is 16x16, but frames have 1px or 2px gaps. Register named texture frames explicitly:

| Direction | Y | Frame X coordinates | Runtime loop |
|---|---:|---|---|
| down | 0 | 0, 17, 34 | 0, 1, 2, 1 |
| right | 0 | 52, 68, 85 | 0, 1, 2, 1 |
| left | 0 | 52, 68, 85 | right frames with `flipX: true` |
| up | 0 | 102, 119, 136 | 0, 1, 2, 1 |

Use texture key `player-source`, a centered origin, and a visual foot point at the bottom-center of the 16x16 frame. Do not call `load.spritesheet(..., { frameWidth: 16 })` for this file; that ignores source gaps and produces incorrect frames.

## World atlas

Source: `public/assets/kanto-world.png`, 432x288 PNG.

- Grid: 27 columns x 18 rows (486 cells)
- Tile size: 16x16
- Frame formula: `frame = row * 27 + column`
- Every cell is explicitly classified in `src/game/atlas-classification.ts`

The pixel-audited classification totals are:

| Code | Count | Authoring rule |
|---|---:|---|
| `C` | 258 | compound/stamp-only |
| `CH` | 72 | character showcase; never world terrain |
| `RT` | 4 | audited repeatable world fill |
| `SQ` | 10 | ordered sequence member |
| `WP` | 21 | audited single world prop |
| `UF` | 121 | unknown/forbidden |

The counts sum to 486. `validateAtlasClassification` rejects invalid cells,
out-of-bounds coordinates, duplicates, and missing coordinates. A cell being
classified does not make it freely placeable.

### Authoring rules

Agents must place world art through semantic catalog entries, not raw frame ids
or guessed source rectangles:

- Only `TILE_CATALOG` entries typed as repeatable or single may be placed alone.
- `STAMP_CATALOG` entries are explicit cell matrices. Each non-null cell records
  its atlas source, semantic role, and collision. Do not infer a compound from a
  bounding rectangle. Every `C`/stamp-only compound fragment is forbidden as a
  solo tile, including the green and autumn tall-tree halves.
- A separately audited `RT` source remains repeatable even when a compound
  reuses it; for example, `grassBase` at `(1,1)` is also the fill cell inside
  `grassTransition`.
- `SEQUENCE_CATALOG.cableBoundary` is exactly the contiguous ordered run
  `(0,8)`, `(1,8)`, `(2,8)`, `(3,8)`. The adjacent `(4,8)` terminal is not part
  of that boundary.
- The 4x5 `civicBuilding` is composed from an explicit base matrix plus an
  overlay matrix. Its dedicated sources `(7,15)`, `(8,15)`, `(11,15)`,
  `(11,16)`, and `(11,17)` are among the compound sources forbidden as solo
  decorations.
- Pond, grass transition, green/autumn tree families, storefront shutter, and
  the civic building may only be rendered through their audited matrices.
- `UF`, `CH`, compound fragments, and sequence fragments must never be selected
  as convenient standalone decoration.
- `dirtBase` is deliberately stamp-only: it is an orange-road compound
  fragment, not a proven repeatable dirt fill.
- `waterBase` at `(9,7)` is compound/stamp-only, not a repeatable fill.

This rule exists because apparently coherent atlas rectangles can mix corners,
edges, terrain, characters, and unrelated props. Broad rectangular stamps are
not proof of a valid prefab.

The development inspector at `?inspect=1` renders the numbered 27x18 atlas,
classification totals, repeatables, the cable sequence, and audited compound
previews. It is a verification surface, not an authoring exemption.

### Applying-project authoring pipeline

The slice proves the TypeScript classification and semantic placement model; it
does not implement the full game's editable map compiler. Applying projects
must preserve the Phase 04 authoring contract:

- `data/maps/tile-catalog.yaml` is the canonical semantic catalog.
- Coding agents edit `data/maps/source/pallet_town.layout.yaml` using semantic
  keys only.
- `npm run maps:compile -- --map pallet_town` deterministically emits
  `data/maps/generated/pallet_town.tmx` for Tiled preview and the production
  loader.
- `npm run maps:validate -- --map pallet_town` rejects raw frame/GID authoring,
  direct generated-TMX edits, solo stamp fragments, unordered sequences,
  out-of-bounds placement, disallowed adjacency/layers, collision drift, and
  source/output hash drift.

Useful Tiled edits must be expressed back in semantic source and recompiled;
generated GIDs are valid only in compiler output.

## Asset ownership boundary

This slice intentionally flattens the runtime files to `public/assets/kanto-world.png` and `public/assets/player-npc.png` so the standalone Vite app can run without an applying-project folder layout.

Do not copy those flat paths into the full game. Applying projects must keep the packet-normalized paths from `assets/world/README.md`:

- `public/assets/tilesets/kanto-world.png`
- `public/assets/ow/player-npc.png`

World terrain, buildings, props, and player/NPC movement art are local assets.
Pokémon species sprites are not sourced from this atlas or bundled as local
species art: the full game must obtain them from PokeAPI. The `CH` atlas cells
remain non-world showcase material and do not weaken that boundary.

The alignment contract is the atlas geometry, player frame naming,
classification, and semantic tile/stamp/sequence catalog, not the slice-local
URL shape.

## Runtime rendering

- Logical tile size: 16px
- Camera zoom: 2x integer
- Phaser: `pixelArt: true`, `roundPixels: true`, `antialias: false`
- Player speed in the reference slice: 54px/s
- Collision uses logical tile coordinates; the player sprite remains visually centered on its current tile
- The Phaser canvas remains 480x320 at a 2x camera zoom on every viewport. At
  viewports up to 520px, the responsive frame clips a centered section of that
  unscaled canvas instead of shrinking it. At a 375px viewport the bordered
  frame is exactly 343px wide while the canvas remains exactly 480x320.
  Consequently world and player pixels remain 1:1, and collision/camera
  calculations stay in the unchanged logical coordinate system.

## Playable asset gallery

`/?map=gallery` opens the separate 48x32 `Atlas Park` map. It uses semantic
catalog keys only and places all 12 currently approved compound stamps, all four
solo-authorable terrain fills, all 21 single-authorable world props, and the
complete cable sequence. The default Route Grove remains unchanged.
Together these are 38 approved semantic authoring units; they are not the same
thing as the atlas's 486 raw cells.

Atlas Park is a placement-review surface rather than permission to use arbitrary
atlas cells. `UF`, `CH`, stamp fragments, and sequence fragments remain
forbidden. The gallery camera uses a 1x integer zoom. Its northwest exhibit
shows the 21 individual props as a collision-backed 7x3 field, while the
remaining districts show complete compound families without fractional pixel
scaling. The map remains walkable for close inspection.

Each individual prop is selected through a stable key in
`src/game/world-prop-catalog.ts`; world data never authors one by raw atlas
coordinate.

## Visual evidence

- `evidence/world-desktop-1280.png`: desktop semantic world and player
- `evidence/atlas-inspector-1280.png`: numbered atlas, classification, and
  compound previews
- `evidence/world-mobile-375.png`: mobile semantic world
- `evidence/atlas-park-desktop-1280.png`: desktop gallery with the 38-unit
  runtime receipt
- `evidence/atlas-park-mobile-375.png`: mobile gallery without page overflow

Run-local captures and command receipts are stored separately in
`.omo/ulw-loop/evidence/` for the ULW criterion ledger.

These images prove this slice only. Screenshots alone do not prove collision,
classification completeness, console cleanliness, or the full Kanto map set.
Those claims depend on automated tests, including the targeted unit and browser
checks below.

## Verification

Run from `buildprints/pokemon-fire-red/alignment-slice`:

```sh
npm run typecheck
npm test -- --run tests/world-data.test.ts
npx biome check src tests playwright.config.ts
npm run test:e2e
npm run build
```

The broader unit suite checks all 486 unique coordinates, exact classification
totals, explicit per-cell compound collision, the 4x5 civic composition, cable
ordering, forbidden solo fragments, world bounds, walkable spawn space, player
frames, and swept collision. Browser tests check desktop and mobile world
markers, blocked movement, absence of console errors and horizontal overflow,
and inspector coverage `486/486`.

Supporting receipts are stored in `.omo/evidence/`, including the atlas census,
red-test transcript, runtime verification, and inspector verification. Treat
only commands that pass in the current checkout as current proof; this document
does not freeze historical test counts or evidence hashes.
