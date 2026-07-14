# Asset Policy — Pokémon vs World Art

Non-negotiable rules for applying agents. Record confirmed choices in `.buildprint/decisions.md`.

## Rule 1: Pokémon sprites — always PokeAPI (mandatory)

**No question. No SVG. No external sprite packs. No ROM extracts.**

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
- If a species sprite is missing, record blocker — do **not** substitute SVG or placeholder art for Pokémon

**Forbidden for Pokémon:**

- Custom SVG Pokémon drawings
- Third-party Pokémon sprite sheets
- Ripped GBA Pokémon graphics
- LLM-generated Pokémon images

## Rule 2: World art — committed CC0 sheets (confirmed)

The user confirmed that Pokémon stay PokeAPI-backed while player, landscape, and world sprites live in this repository. The selected strategy is `safe_cc0_default` + `external_sprite_sheets`; canonical files and provenance are under `assets/world/`.

**World/overworld art mode** — for player, NPCs, gym leaders, trainers (overworld), map tiles, buildings, items on ground:

| Mode | Description | Visual claim impact |
|---|---|---|
| `external_sprite_sheets` | PNG tilesets + character OW sheets (PokeCommunity, OpenGameArt, itch.io, user-supplied pack) | **Required for CP-VS / visual `battle_core` certification** |
| `custom_svg` | Custom/programmatic SVG for trainers, NPCs, player, UI chrome; rasterize at load in Phaser | **Blocks CP-VS and `release_polish`** unless user explicitly opts in |

Default if user delegates: `external_sprite_sheets` (better fit for GBA pixel fidelity). **Agents must not choose `custom_svg` without explicit user opt-in.**

### Approved world source strategies

Use one of:

- `safe_cc0_default` — recommended. Use CC0/open sources listed in `references/world-art-sources.md`: Ninja Adventure, Kenney RPG Urban Pack, OpenGameArt Top Down Pokemon-esque Sprites, OpenGameArt Character 4 directional walking, OpenGameArt Zelda-like tilesets and sprites, and Open RPG Fantasy Tilesets.
- `pokemon_community_exception` — visually closest but risky. Requires explicit user approval and full credit/license capture before any use. Default public web posture is blocked until license review.
- `custom_authored` — authored in-repo world/player/NPC/tiles. Still must provide real player/NPC/tiles before phase 03; not a placeholder escape hatch.

Do not start phase 03 unless `docs/assets-provenance.md` records selected strategy, source URLs, licenses, local original paths, normalized runtime paths, coverage categories, attribution text, and redistribution status.

### World art is a MUST blocker

Phases 03–05 and playable proof (phase 05) cannot pass with:

- flat color rectangles as tiles or player
- missing tileset PNG files
- missing player walk-cycle sheet with front/back/side directions and a usable standing/step loop
- unlicensed or undocumented asset packs

Record pack URL/path and license in `docs/assets-provenance.md` before phase 03.

### What `custom_svg` covers

- Player overworld avatar
- NPC / trainer overworld sprites
- Optional: map tile prototypes, building shapes, UI panels
- Animation: SVG rasterized to texture; use **frame strips or multi-SVG swap** — not SMIL inside Phaser

### What `custom_svg` does NOT cover

- **Pokémon** — always PokeAPI (Rule 1)
- Battle Pokémon sprites — always PokeAPI

### What `external_sprite_sheets` covers

- Tiled tilesets (`.png`)
- 16×16 / 16×32 OW character sheets with walk cycles
- Trainer battle backdrops optional

Record pack URL/path and license in `docs/assets-provenance.md`.

Minimum required external files for CP-VS:

- player overworld sheet: front/back/side directions with standing and step frames
- NPC sheet
- 16x16 exterior tileset PNG for Pallet/Route 1/Viridian-style map
- tall grass/encounter tile
- building/door/warp visual

## Rule 3: Phaser loading by mode

```typescript
// Pokémon — always
load.image(`pokemon-${id}`, cachePath(`pokemon/${id}/front.png`));

// World — branch on world_art_mode
if (worldArtMode === 'external_sprite_sheets') {
  load.image('player-npc-source', 'assets/ow/player-npc.png');
  load.image('kanto-world', 'assets/tilesets/kanto-world.png');
} else if (worldArtMode === 'custom_svg') {
  load.svg('trainer-youngster', 'assets/svg/trainers/youngster.svg', { scale: 2 });
}
```

The committed player/NPC source has gaps between its 16x16 frames. Do not treat it as a uniform Phaser spritesheet. Register the named frame rectangles from `alignment-slice/ALIGNMENT.md`; the playable slice is the canonical alignment proof.

Phaser SVG loads rasterize to bitmap — set scale at load for integer pixel output. Use `pixelArt: true`, `roundPixels: true`.

## Rule 4: Provenance doc

`docs/assets-provenance.md` must list:

- Pokémon: PokeAPI/sprites, cache date, fair-use note
- World: either pack name + license OR "custom SVG authored in-repo" per category

## Validation

```bash
npm run assets:validate
```

Checks:

- Every species used in game has cached PokeAPI sprite
- No Pokémon PNG/SVG outside `public/data/generated/sprites/pokemon/`
- World art files match selected `world_art_mode`
- `docs/assets-provenance.md` exists and matches mode
- `references/world-art-sources.md` chosen strategy is recorded in `.buildprint/decisions.md`
- selected source has local originals under `third_party_assets/`
- runtime assets exist under `public/assets/ow/` and `public/assets/tilesets/`
- **Starter + Route 1 species (1, 4, 7, 16, 19) have front.png and back.png**
- **If `external_sprite_sheets`: player OW sheet and at least one tileset PNG exist on disk**
- **If `custom_svg`: decisions ledger records explicit user opt-in**

## Visual proof (required in addition to validate)

File-path validation alone does not prove sprites look correct. CP-VS (phase `05-playable-proof`) requires screenshots at 2× integer scale. A passing `assets:validate` with ugly or wrong on-screen sprites is still **fail**.
