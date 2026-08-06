# World alignment contract (geometry only)

**Read this for:** 16px grid movement, player foot-point, integer camera scale, semantic tile/stamp/sequence catalogs.

**Do not read this for art sources.** Applying projects must create player/world art with **SVG**, **Canvas**, and/or **media4agents** (`references/asset-policy.md`). Never copy packet `assets/` (removed), never treat slice demo PNGs as production art, never revive Kenney/OpenGameArt pack paths.

Run the historical demo slice with `npm install && npm run dev` (append `?inspect=1` for the development-only atlas inspector). That demo still loads obsolete local PNGs so movement proofs remain runnable; those bytes are not the Buildprint art contract.

## Durable requirements (copy these)

- Logical tile size: **16px**
- Player visual foot point: **bottom-center** of the 16×16 frame; centered origin
- Camera: **integer** zoom (2× desktop / 1× narrow); clamp to map bounds
- Phaser: `pixelArt: true`, `roundPixels: true`, `antialias: false`
- Collision on **logical tile** coordinates
- Player-facing canvas scales only: **480×320** (2×) desktop and **240×160** (1×) below 520px — no fractional `Scale.FIT`
- Place world art through **semantic names** (`TILE_CATALOG` / `STAMP_CATALOG` / `SEQUENCE_CATALOG`), never raw `frame: 123` collage
- Serialize the same semantics in applying-project `data/maps/tile-catalog.yaml`
- Agents edit `data/maps/source/{map_id}.layout.yaml`; `npm run maps:compile` emits generated TMX; validators reject raw GIDs, stamp-only solo use, bad sequences, adjacency/layer errors, and generated drift

### Applying-project art sources

Rebuild coverage with:

- Canvas/SVG atlases under `public/assets/generated/` or `public/assets/svg/`
- and/or media4agents URLs in a `world-media` module (token `m4a_pub_5601e4aa0cfaad9d`)

## Historical demo only (obsolete PNG geometry)

> **Forbidden for production.** The tables below describe the old slice demo sheets so the local Vite app still runs. Do **not** copy `public/assets/player-npc.png` or `public/assets/kanto-world.png` into an applying game. Do **not** require matching frame coordinates after you replace the art.

### Demo player sheet (obsolete)

Historical demo path: `alignment-slice/public/assets/player-npc.png` (152×101). Frames were 16×16 with 1–2px gaps — not a uniform `frameWidth: 16` spritesheet.

| Direction | Y | Frame X coordinates | Runtime loop |
|---|---:|---|---|
| down | 0 | 0, 17, 34 | 0, 1, 2, 1 |
| right | 0 | 52, 68, 85 | 0, 1, 2, 1 |
| left | 0 | 52, 68, 85 | right frames with `flipX: true` |
| up | 0 | 102, 119, 136 | 0, 1, 2, 1 |

When you ship new media4agents/SVG/Canvas player art, register **your** frame rectangles; do not preserve these coordinates unless your new sheet happens to match.

### Demo world atlas (obsolete)

Historical demo path: `alignment-slice/public/assets/kanto-world.png` (432×288, 27×18 of 16×16).

- Historical grass/dirt examples: frames 28 / 180 — **demo-only**
- Multi-tile stamps must still be named structures after art replacement

## Visual evidence (slice only)

- `evidence/world-desktop-1280.png`, `evidence/world-mobile-375.png`, `evidence/atlas-inspector-1280.png`

These prove this slice’s movement/camera behavior only. They do not prove applying-project world art or the full Kanto map set.

## Verification receipt (slice)

- `npm run check`: Biome, strict TypeScript, Vitest, Playwright, Vite production build
- Desktop/mobile: zero console errors, no horizontal overflow
- Applying projects must prove their own SVG/Canvas/media4agents world art separately
