# Committed world sprite sheets

These are the local, redistribution-safe world assets for this Buildprint. Pokemon graphics are intentionally excluded and still come from the PokeAPI cache pipeline.

| Category | Local file | Coverage |
|---|---|---|
| World and landscape | `runtime/tilesets/kanto-world.png` | 16x16 water, roads, pavement, buildings, doors, trees, props, interiors, vehicles, and NPC tiles |
| Player and NPCs | `runtime/ow/player-npc.png` | multi-character, multi-direction walk-cycle source sheet |

The applying project copies these files to `public/assets/tilesets/kanto-world.png` and `public/assets/ow/player-npc.png`. It must not replace them with rectangles or require an asset download during setup.

Sources:

- Kenney RPG Urban Pack 1.0: CC0. The original ZIP, extracted files, and upstream `License.txt` are committed under `third_party/`.
- Corey Archer, Top Down Pokemon-esque Sprites: CC0. The source sheet is committed as `third_party/oga-player-npc-spritesheet.png`; attribution is appreciated but not required by the source page.

See `manifest.json` for URLs, dimensions, hashes, normalized paths, and coverage.
