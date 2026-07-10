# World Art Sources

Use this file before choosing any player, NPC, trainer overworld, tileset, building, prop, cave, shop, or UI-world art. This source decision is a hard blocker: do not start map or overworld implementation until the selected source strategy is recorded in `.buildprint/decisions.md` and `docs/assets-provenance.md`.

## Required decision

Choose exactly one source strategy before `01-project-setup.md` completes:

1. `safe_cc0_default` — recommended for GitHub/web publication.
2. `pokemon_community_exception` — closest visual fit, but risky; requires explicit user approval.
3. `custom_authored` — custom in-repo world/player/NPC/tiles; safest legally, slowest.

`external_sprite_sheets` remains the required implementation mode for visual `battle_core`, CP-VS, and `release_polish` unless the user explicitly accepts a lower/non-GBA visual claim.

## Recommended safe CC0 default

Use these as the approved default source pool. Download only from the source URLs below, keep originals in `third_party_assets/`, copy only normalized runtime assets into `public/assets/`, and record all licenses.

| Role | Source | URL | License posture | Use |
|---|---|---|---|---|
| Broad top-down world pack | Ninja Adventure Asset Pack | https://pixel-boy.itch.io/ninja-adventure-asset-pack | CC0 per source page | Base tiles, characters, props, UI/items; adapt palette/roles to Kanto-like maps |
| Town/building/road supplement | Kenney RPG Urban Pack | https://kenney.nl/assets/rpg-urban-pack | CC0 per source page | Town roads, buildings, urban props, supplemental NPC/object art |
| Pokemon-like small seed | OpenGameArt Top Down Pokemon-esque Sprites | https://opengameart.org/content/top-down-pokemon-esque-sprites | CC0 per source page | Player/NPC seed or style reference; not enough for full Kanto alone |
| Four-direction character fallback | OpenGameArt Character 4 directional walking | https://opengameart.org/content/character-4-directional-walking | CC0 per source page | Player/NPC animation template if pack sprites are incomplete |
| Route/cave/object supplement | OpenGameArt Zelda-like tilesets and sprites | https://opengameart.org/content/zelda-like-tilesets-and-sprites | CC0 per source page | Supplemental top-down terrain/objects |
| Fantasy tiles supplement | Open RPG Fantasy Tilesets | https://finalbossblues.itch.io/openrtp-tiles | CC0/public domain per source page | Supplemental tiles; may need transparency/format cleanup |

Minimum practical source mix for CP-VS:

- one player overworld sheet with 4 directions and at least 4 frames per direction, or a documented derived sheet built from CC0 source
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
- No colored rectangles, CSS shapes, or flat debug tiles for CP-VS, visual `battle_core`, or higher claims.

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
- CP-VS required sprite and tileset paths exist

`custom_authored` must still include authored player/NPC/tiles files before phase 03; it is not permission to use placeholders.
