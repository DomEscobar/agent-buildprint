# World sprite alignment contract

This playable slice records the first runtime-proven usage contract for the committed CC0 world assets. Run it with `npm install && npm run dev`; append `?inspect=1` for the development-only atlas inspector. Production builds do not expose the inspector.

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

- Grid: 27 columns x 18 rows
- Tile size: 16x16
- Frame formula: `frame = row * 27 + column`
- Proven base grass: frame 28
- Proven plain dirt: frame 180
- Preserve multi-tile source-relative rectangles for water edges, buildings, trees, and market props; repeating arbitrary atlas cells produces visible seams.

Agents must place world art through semantic names, not raw frame ids:

- repeatable base tiles may be used for broad fills, for example `grassBase` and `dirtBase`
- ordered transition pieces such as `fenceLeftEnd`, `fenceMiddle`, and `fenceRightEnd` are `sequence-only`
- building, water, tree, and prop rectangles are `stamp-only` unless promoted to a named repeatable tile after visual proof
- map/world code must use `TILE_CATALOG`, `STAMP_CATALOG`, and `SEQUENCE_CATALOG`; arbitrary `frame: 123` placement is not an acceptable execution pattern
- the development inspector lists catalog names, labels, frames, and placement modes next to the numbered atlas

### Applying-project authoring pipeline

The slice TypeScript catalogs prove the atlas semantics; they are not the full game's editable map format. Applying projects must serialize the same contract in `data/maps/tile-catalog.yaml` with semantic key, placement mode, source rectangle, stamp dimensions/anchor, ordered sequence pieces, allowed layers, collision semantics, interaction points, and allowed adjacency.

Coding agents edit `data/maps/source/{map_id}.layout.yaml` with semantic keys. `npm run maps:compile -- --map {map_id}` deterministically emits `data/maps/generated/{map_id}.tmx` for Tiled preview and the production Phaser loader. Generated GIDs are valid compiler output, but direct edits to generated TMX are invalid and must be rejected by source/catalog/compiler/output hash checks.

`npm run maps:validate -- --map {map_id}` must reject raw authoring frame/GID values, stamp-only pieces used solo, sequence pieces out of order, out-of-bounds stamps, disallowed adjacency or layer, collision that disagrees with catalog semantics, and generated output drift. Tiled may be used to inspect the compiled map; useful editor changes must be expressed back in semantic source and recompiled.

## Slice-local asset paths

This slice intentionally flattens the runtime files to `public/assets/kanto-world.png` and `public/assets/player-npc.png` so the standalone Vite app can run without an applying-project folder layout.

Do not copy those flat paths into the full game. Applying projects must keep the packet-normalized paths from `assets/world/README.md`:

- `public/assets/tilesets/kanto-world.png`
- `public/assets/ow/player-npc.png`

The alignment contract is the atlas geometry, frame naming, and semantic tile/stamp/sequence catalog, not the slice-local URL shape.

## Runtime rendering

- Logical tile size: 16px
- Camera zoom: 2x integer
- Phaser: `pixelArt: true`, `roundPixels: true`, `antialias: false`
- Player speed in the reference slice: 54px/s
- Collision uses logical tile coordinates; the player sprite remains visually centered on its current tile
- Player-facing canvas uses discrete logical scales only: 480x320 (2x) on desktop and 240x160 (1x) below 520px. Do not use arbitrary `Scale.FIT` fractional scaling for the game viewport

## Visual evidence

- `evidence/world-desktop-1280.png`: desktop world and player alignment
- `evidence/world-mobile-375.png`: touch movement at 375px without horizontal overflow
- `evidence/atlas-inspector-1280.png`: numbered world atlas and enlarged player source frames

These images prove this slice only. They do not prove the full Kanto map set.

## Verification receipt

- `npm run check`: Biome pass, strict TypeScript pass, 9 Vitest tests pass, 2 Playwright tests pass, Vite production build pass
- Desktop and mobile browser runs: zero console errors, no horizontal overflow
- Runtime asset hashes: world `305e71fa...ad389`, player `dcbcf29f...9d59`; both match `assets/world/manifest.json`
- Evidence hashes: desktop `da5c8d2c...af839`, mobile `1fe12504...6ad9`, inspector `d60f7d29...914b`
- Independent review found and forced repairs for missing texture keys, raw atlas collage composition, swept collision, stale inspector coordinates, debug-link leakage, favicon failure, integer scaling, and stale map-count claims
