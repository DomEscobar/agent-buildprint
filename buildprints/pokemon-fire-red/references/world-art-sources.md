# World Art Sources

Use this file before implementing any player, NPC, trainer overworld, tileset, building, prop, cave, shop, or UI-world art. The source decision is confirmed; setup must copy it into `.buildprint/decisions.md` and `docs/assets-provenance.md` before map work.

## Confirmed decision

Selected by the user: `safe_cc0_default` + `external_sprite_sheets`. The assets are committed under `assets/world/`; applying agents copy from there and must not introduce a setup-time download dependency.

The runtime-proven frame coordinates, tile formula, pixel settings, and playable reference are in `alignment-slice/ALIGNMENT.md`. Applying agents must preserve that contract or replace it with stronger browser evidence.

## Available strategies

The selected strategy is item 1. Items 2 and 3 remain documented alternatives only and require a new explicit user decision before use:

1. `safe_cc0_default` — recommended for GitHub/web publication.
2. `pokemon_community_exception` — closest visual fit, but risky; requires explicit user approval.
3. `custom_authored` — custom in-repo world/player/NPC/tiles; safest legally, slowest.

`external_sprite_sheets` remains the required implementation mode for `starter_town_core` and `release_polish` unless the user explicitly accepts a lower/non-GBA visual claim. Battle Pokemon sprites remain PokeAPI-only and are certified separately in Phase 03.

## Confirmed safe CC0 bundle

The table below is provenance and disaster-recovery information for the already committed bundle. Normal setup copies `assets/world/originals/` and `assets/world/runtime/` and performs no network download. Download from these source URLs only if the committed bundle must be recovered or the user explicitly approves replacing it; then keep originals in `third_party_assets/`, copy only normalized runtime assets into `public/assets/`, and record all licenses.

| Role | Source | URL | License posture | Use |
|---|---|---|---|---|
| Broad top-down world pack | Ninja Adventure Asset Pack | https://pixel-boy.itch.io/ninja-adventure-asset-pack | CC0 per source page | Base tiles, characters, props, UI/items; adapt palette/roles to Kanto-like maps |
| Town/building/road supplement | Kenney RPG Urban Pack | https://kenney.nl/assets/rpg-urban-pack | CC0 per source page | Town roads, buildings, urban props, supplemental NPC/object art |
| Pokemon-like small seed | OpenGameArt Top Down Pokemon-esque Sprites | https://opengameart.org/content/top-down-pokemon-esque-sprites | CC0 per source page | Player/NPC seed or style reference; not enough for full Kanto alone |
| Four-direction character fallback | OpenGameArt Character 4 directional walking | https://opengameart.org/content/character-4-directional-walking | CC0 per source page | Player/NPC animation template if pack sprites are incomplete |
| Route/cave/object supplement | OpenGameArt Zelda-like tilesets and sprites | https://opengameart.org/content/zelda-like-tilesets-and-sprites | CC0 per source page | Supplemental top-down terrain/objects |
| Fantasy tiles supplement | Open RPG Fantasy Tilesets | https://finalbossblues.itch.io/openrtp-tiles | CC0/public domain per source page | Supplemental tiles; may need transparency/format cleanup |

Minimum practical source mix for Phase 04 starter-town proof:

- one player overworld sheet with front/back/side directions and standing/step frames, or a documented derived sheet built from CC0 source
- one NPC sheet
- one 16x16 exterior tileset for Pallet/Route 1/Viridian-style maps
- one tall-grass/encounter tile
- one building/door/warp visual
- one UI/menu pixel font or bitmap font strategy

## Pokemon-community exception

Ekat's Public Gen 3 Tilesets are visually closest to FRLG-style maps:

- URL: https://eeveeexpo.com/resources/621/
- Strength: many Gen 3-style tilesets and complete credits list.
- Risk: fangame ecosystem source, long credit chain, possible non-commercial/RPG-Maker/Pokemon-community assumptions, possible derived/rip ambiguity.

Do not use this by default. It is allowed only when `.buildprint/decisions.md` records explicit user approval with the phrase `pokemon_community_exception accepted`, and `docs/assets-provenance.md` records every credit/license line included with the downloaded pack. If any source line is ambiguous, public_web deployment is blocked.

## Hard bans

- No Nintendo/GBA ROM rips.
- No RPG Maker RTP/company assets in this Phaser/browser build unless a specific license review confirms use outside RPG Maker for this exact asset.
- No random Pokemon-looking sprite sheet without source URL, license, and redistribution permission.
- No AI-generated Pokemon/world sprites as a substitute for licensed world art.
- No colored rectangles, CSS shapes, or flat debug tiles for `starter_town_core` or higher world claims.

RPG Maker license reference: https://www.rpgmakerweb.com/eula

## Provenance requirements

`docs/assets-provenance.md` must include:

- selected source strategy
- source name and URL
- license as stated on source page
- download date
- local original path under `third_party_assets/`
- normalized runtime path under `public/assets/`
- categories covered: player, NPC, tiles, buildings, grass, caves/interiors, UI/font if applicable
- attribution text, even for CC0 when useful
- redistribution status: `repo_ok`, `private_only`, `blocked`, or `unknown`
- risk notes and required approval if not `safe_cc0_default`

## Required validator behavior

`npm run assets:validate` must fail unless:

- `docs/assets-provenance.md` exists
- `.buildprint/decisions.md` records the selected world art strategy
- external source files exist for player, NPC, and tiles when `external_sprite_sheets` is selected
- no runtime world asset is sourced from a hard-banned class
- starter-town proof required player, NPC, sprite, and tileset paths exist

`custom_authored` must still include authored player/NPC/tiles files before phase 04; it is not permission to use placeholders.
