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

## Rule 2: World art — user chooses (hard-stop question)

Ask in `00-questions.md` before setup:

**World/overworld art mode** — for player, NPCs, gym leaders, trainers (overworld), map tiles, buildings, items on ground:

| Mode | Description |
|---|---|
| `external_sprite_sheets` | PNG tilesets + character OW sheets (PokeCommunity, OpenGameArt, itch.io, user-supplied pack) |
| `custom_svg` | Custom/programmatic SVG for trainers, NPCs, player, UI chrome; rasterize at load in Phaser |

Default if user delegates: `external_sprite_sheets` (better fit for GBA pixel fidelity).

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

## Rule 3: Phaser loading by mode

```typescript
// Pokémon — always
load.image(`pokemon-${id}`, cachePath(`pokemon/${id}/front.png`));

// World — branch on world_art_mode
if (worldArtMode === 'external_sprite_sheets') {
  load.spritesheet('player-ow', 'assets/ow/player.png', { frameWidth: 16, frameHeight: 32 });
} else if (worldArtMode === 'custom_svg') {
  load.svg('trainer-youngster', 'assets/svg/trainers/youngster.svg', { scale: 2 });
}
```

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
