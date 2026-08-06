# Asset Policy — Pokémon vs World Art

Non-negotiable rules for applying agents. Record confirmed choices in `.buildprint/decisions.md`.

## Rule 1: Pokémon sprites — always PokeAPI (mandatory)

**No question. No SVG. No media4agents. No external sprite packs. No ROM extracts.**

All Pokémon visual elements must load from **PokeAPI v2 / PokeAPI/sprites** cached at build time:

| Surface | Source | Path pattern |
|---|---|---|
| Battle front | PokeAPI FRLG | `.../generation-iii/firered-leafgreen/{id}.png` |
| Battle back | PokeAPI FRLG | `.../generation-iii/firered-leafgreen/back/{id}.png` |
| Party summary | Same cache | front default |
| Pokédex entry | Same cache | front + optional shiny |
| Evolution cutscene | Same cache | front |
| Menu icons | PokeAPI (if used) | species id from cache manifest |

Implementation:

- Build script copies/caches into `public/data/generated/sprites/pokemon/`
- Runtime reads **only** from local cache — never live `fetch('https://pokeapi.co/...')` during gameplay
- If a species sprite is missing, record blocker — do **not** substitute SVG, Canvas, or media4agents art for Pokémon

**Forbidden for Pokémon:**

- Custom SVG Pokémon drawings
- Canvas-drawn Pokémon substitutes presented as finished art
- media4agents / LLM-generated Pokémon images
- Third-party Pokémon sprite sheets
- Ripped GBA Pokémon graphics

## Rule 2: World art — SVG, Canvas, or media4agents (confirmed)

The user confirmed that Pokémon stay PokeAPI-backed while **player, landscape, NPC, trainer overworld, tiles, and buildings must not come from any committed packet `assets/` folder**.

**Confirmed strategy:** `procedural_or_generated_world_art`  
**Confirmed modes (mix allowed per category):** `custom_svg` | `canvas_procedural` | `media4agents`

| Mode | Description | Use for |
|---|---|---|
| `custom_svg` | Authored or generated SVG rasterized at load (Phaser `load.svg` or texture-from-SVG) | UI chrome, simple OW figures, icons, signs, door markers |
| `canvas_procedural` | Deterministic Canvas2D / OffscreenCanvas drawing into Phaser textures or tile atlases | Base grass/dirt/path fills, fences, water edges, collision-stable repeatable tiles |
| `media4agents` | Full `https://media4agents.com/m/...` PNG URLs written into code; first load generates the asset | Player OW sheets, NPC/trainer sprites, buildings, props, decorative textures |

Agents may combine modes in one build (for example Canvas tiles + media4agents player + SVG UI). Record the mix in `.buildprint/decisions.md` and `docs/assets-provenance.md`.

### Hard ban: packet `assets/` and third-party pack copies

**Do not recreate** a packet `assets/` / `assets/world/` Kenney/OpenGameArt pipeline. That tree was removed from this Buildprint. Do not ask the user whether to restore it.

Also banned for world art unless the user issues a new explicit decision:

- Downloaded CC0/community sprite packs as the primary pipeline (`safe_cc0_default`, Kenney, OpenGameArt packs, Ekat Gen 3 tilesets)
- ROM rips and undocumented “Pokemon-looking” sheets
- Flat color rectangles / debug tiles as the certified look for `starter_town_core` or higher

### media4agents contract

Public media token (keep in every URL):

```text
m4a_pub_5601e4aa0cfaad9d
```

Image URL pattern — write the finished URL into code; generation happens on first request:

```text
https://media4agents.com/m/m4a_pub_5601e4aa0cfaad9d/{name}.png?prompt={description}
```

Rules:

- `{name}`: short kebab-case, one stable name per asset (reusing the exact URL is free)
- `prompt`: clear description; encode spaces as `+`
- Prefer **RetroDiffusion (Games)** for pixel sprites, tiles, textures, characters, and game assets by selecting that workflow in the media4agents dashboard (account default). **Do not invent** `&model=retro-diffusion` or other undocumented RetroDiffusion slugs — the Games workflow is dashboard-selected, not a free-form model invent.
- Only when intentionally **overriding** away from the dashboard default, add one documented slug: `&model=flux-2-flash|krea-v2-turbo|wan-2.7|gpt-image-2`
- Optional: `&style=illustration|background_image|icon|free_definition`
- Optional: `&size=16x16|32x32|64x64|128x128|256x256|512x512|1024x1024` (generation resolution, not CSS display size)
- Transparent PNGs: `&removeBackground=true`
- Keep the token in every media4agents URL

### Phaser + CORS (required when using media4agents textures)

Phaser/WebGL often cannot sample cross-origin PNGs as textures without CORS headers. Treat full media4agents URLs as the **source of truth** in code, and load through a same-origin proxy in the applying project:

```ts
// src/assets/world-media.ts — source of truth
export const WORLD_MEDIA = {
  playerOw: "https://media4agents.com/m/m4a_pub_5601e4aa0cfaad9d/frlg-player-ow.png?prompt=...",
} as const;

export const MEDIA_PATHS = {
  playerOw: "/media/player-ow.png",
} as const;
```

```ts
// vite.config.ts — dev proxy
server: {
  proxy: {
    "/media/player-ow.png": {
      target: "https://media4agents.com",
      changeOrigin: true,
      rewrite: () =>
        "/m/m4a_pub_5601e4aa0cfaad9d/frlg-player-ow.png?prompt=...",
    },
  },
},
```

Prefer a small server/middleware that maps `/media/{key}.png` → `WORLD_MEDIA[key]` and returns `content-type: image/png` with long cache headers (works for Vite preview and production). In Phaser:

```ts
this.load.setCORS("anonymous"); // only helps if the upstream sends ACAO
this.load.image("player-ow", MEDIA_PATHS.playerOw); // same-origin proxy path
```

If a direct CDN load works in a given environment, still keep `WORLD_MEDIA` URLs in code for provenance and regeneration.

Example prompt URLs (dashboard default = RetroDiffusion Games; no invented `&model=`):

```ts
const MEDIA = "https://media4agents.com/m/m4a_pub_5601e4aa0cfaad9d";

export const WORLD_MEDIA = {
  playerOw: `${MEDIA}/frlg-player-ow.png?prompt=top-down+16x16+gameboy-advance+style+player+walk+cycle+sheet+four+directions+pixel+sprite+transparent+background&size=128x128&removeBackground=true`,
  grassTile: `${MEDIA}/kanto-grass-tile.png?prompt=seamless+16x16+gba+style+kanto+grass+tile+texture+only+no+objects&style=background_image&size=64x64`,
  oakLab: `${MEDIA}/pallet-oak-lab.png?prompt=top-down+gba+style+oak+research+lab+building+sprite+pixel+art+isolated&size=256x256&removeBackground=true`,
};
```

Video (`.mp4`) and 3D (`.glb`) media4agents URLs are optional polish only; they are not required for `starter_town_core`. If used, follow the account handover patterns and keep the same token.

### What each mode must cover before phase 04

Minimum for `starter_town_core` (any approved mode mix):

- player overworld with front/back/side directions and standing/step frames (or equivalent multi-texture swap)
- at least one NPC overworld figure
- exterior 16×16 tile language for Pallet / Route 1 / Viridian-style maps (procedural atlas or generated sheet)
- tall grass / encounter visual
- building / door / warp visual
- coherent GBA-era pixel look under `pixelArt: true`, integer scale

### Canvas / SVG quality bar

- Procedural tiles must be intentional pixel art, not solid fills pretending to be a town
- SVG rasterization must use integer scale; no blurry fractional scaling
- Semantic tile catalog (`data/maps/tile-catalog.yaml`) remains mandatory — art source changes, authoring contract does not
- Alignment-slice geometry lessons (foot point, camera clamp, semantic stamps) still apply; its committed PNG paths do **not**

## Rule 3: Phaser loading by mode

```typescript
// Pokémon — always local PokeAPI cache
load.image(`pokemon-${id}`, cachePath(`pokemon/${id}/front.png`));

// World — never load from packet assets/world
if (usesMedia4Agents) {
  // Prefer proxied path after registering WORLD_MEDIA URLs
  load.image("player-ow", "/media/player-ow.png");
  load.image("kanto-grass", "/media/kanto-grass-tile.png");
}
if (usesSvg) {
  load.svg("sign-post", "assets/svg/props/sign-post.svg", { scale: 2 });
}
if (usesCanvasProcedural) {
  // Register textures created by your atlas builder (Canvas → Phaser texture)
  // e.g. textures.addCanvas("world-atlas", canvas)
}
```

Phaser SVG loads rasterize to bitmap — set scale at load for integer pixel output. Use `pixelArt: true`, `roundPixels: true`.

## Rule 4: Provenance doc

`docs/assets-provenance.md` must list:

- Pokémon: PokeAPI/sprites, cache date, fair-use note
- World: for each category (player, NPC, tiles, buildings, grass, UI), the mode used (`custom_svg` | `canvas_procedural` | `media4agents`)
- For media4agents: exact URL(s), asset `{name}`, prompt text, size/style flags, and note that generation is on first fetch
- Explicit statement: packet `assets/` removed / unused

## Validation

```bash
npm run assets:validate
```

Checks:

- Every species used in game has cached PokeAPI sprite
- No Pokémon PNG/SVG/media outside `public/data/generated/sprites/pokemon/`
- World art provenance matches selected modes
- `docs/assets-provenance.md` exists and matches decisions
- `.buildprint/decisions.md` records `procedural_or_generated_world_art`
- No runtime dependency on a packet `assets/` tree or third-party pack hashes
- Starter + Route 1 species (1, 4, 7, 16, 19) have `front.png` and `back.png`
- Player OW, NPC, tileset/atlas, grass, and building/door coverage exist via SVG, Canvas textures, and/or media4agents URLs
- `public/assets/world-source-manifest.json` (or equivalent) lists mode per category and media URL keys — not third-party pack hashes

## Visual proof (required in addition to validate)

File-path validation alone does not prove sprites look correct. Phase `04-pallet-town-world-proof` requires production renders, 2× integer-scale screenshots, traversal, and independent visual review. A passing `assets:validate` with ugly or wrong on-screen sprites is still **fail**.
