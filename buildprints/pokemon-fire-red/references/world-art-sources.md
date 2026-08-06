# World Art Sources

Use this file before implementing any player, NPC, trainer overworld, tileset, building, prop, cave, shop, or UI-world art. The source decision is confirmed; setup must copy it into `.buildprint/decisions.md` and `docs/assets-provenance.md` before map work.

## Confirmed decision

Selected by the user (2026-08-06): **`procedural_or_generated_world_art`**.

World/player/NPC/tiles art is produced only via:

1. **SVG** — authored or generated vector art, rasterized for Phaser
2. **Canvas** — deterministic procedural pixel textures / atlases
3. **media4agents.com** — PNG (and optional MP4/GLB) URLs written into code with the account media token

Pokémon battle/party/Pokédex sprites remain **PokeAPI-only** and are certified separately in Phase 03.

**Do not use** a packet `assets/` folder for world art. That tree was removed from this Buildprint. Applying agents must not recreate Kenney/OpenGameArt pack copies as the primary pipeline.

The runtime-proven movement/camera/semantic-tile lessons in `alignment-slice/ALIGNMENT.md` still matter for grid behavior. Its demo PNG paths are **obsolete** and must be replaced by the new art pipeline.

## Modes (mix allowed)

| Mode | When to prefer | Notes |
|---|---|---|
| `canvas_procedural` | Repeatable ground, paths, water edges, fences, collision-stable fills | Deterministic; no network; ideal for tile atlases |
| `custom_svg` | UI chrome, signs, simple OW silhouettes, icons | Integer raster scale; pixel-friendly shapes |
| `media4agents` | Player walk cycles, NPCs, trainers, buildings, hero props, decorative textures | Write full URLs; first load generates; reuse exact URL is free |

`starter_town_core` and `release_polish` require a coherent GBA-era pixel look. Agents choose the mode mix that hits that bar; they do **not** fall back to third-party pack downloads.

## media4agents handover (authoritative)

Public bearer media token:

```text
m4a_pub_5601e4aa0cfaad9d
```

### Images (primary for game sprites/tiles)

```text
https://media4agents.com/m/m4a_pub_5601e4aa0cfaad9d/{name}.png?prompt={description}
```

- Prefer **RetroDiffusion (Games)** for pixel sprites, tiles, textures, characters, and game assets by selecting that workflow as the media4agents dashboard image default. **Do not invent** `&model=retro-diffusion` or other undocumented RetroDiffusion query slugs.
- Optional overrides **away from** the dashboard default only: `&model=flux-2-flash|krea-v2-turbo|wan-2.7|gpt-image-2`
- Optional: `&style=illustration|background_image|icon|free_definition`
- Optional: `&size=16x16|32x32|64x64|128x128|256x256|512x512|1024x1024`
- Transparent PNG: `&removeBackground=true`
- Keep the token in every URL

### Video (optional polish)

```text
https://media4agents.com/m/m4a_pub_5601e4aa0cfaad9d/{name}.mp4?prompt={scene}&style={style}&duration={seconds}&aspectRatio={ratio}&model=seedance-2-fast
```

### Text-to-3D (optional)

```text
https://media4agents.com/m/m4a_pub_5601e4aa0cfaad9d/{name}.glb?prompt={object-description}
```

### Image-to-3D (optional)

```text
https://media4agents.com/m/m4a_pub_5601e4aa0cfaad9d/{name}.glb?image={public-image-url}
```

## Recommended starter coverage set

Before Phase 04, provenance must declare how each role is produced:

| Role | Suggested default | Acceptable alternatives |
|---|---|---|
| Base grass / dirt / path tiles | `canvas_procedural` atlas | media4agents seamless tiles |
| Water / tree / fence sequences | `canvas_procedural` stamps | media4agents + semantic stamps |
| Player OW walk cycle | media4agents RetroDiffusion sheet | multi-SVG frame swap |
| NPC / Oak / mom / rival OW | media4agents | SVG |
| Homes / Oak lab / doors | media4agents | SVG + Canvas roofs |
| Tall grass encounter tile | Canvas or media4agents | — |
| Signs / mailboxes / UI chrome | SVG | Canvas |

Minimum practical coverage for Phase 04 starter-town proof:

- player overworld with four directions and standing/step frames
- one NPC figure
- exterior 16×16 tile language for Pallet-style maps
- tall-grass / encounter tile
- building / door / warp visual
- UI/menu pixel font or bitmap font strategy

## Historical strategies (not selected)

These remain documented only so agents recognize them as **superseded**. Do not implement unless the user issues a new explicit decision:

1. ~~`safe_cc0_default` + committed `assets/world/`~~ — superseded 2026-08-06
2. ~~`pokemon_community_exception` (Ekat Gen 3 tilesets)~~ — superseded; still high-risk if ever reopened
3. ~~Downloaded OpenGameArt / Kenney packs as setup pipeline~~ — superseded

## Hard bans

- No use of a packet `assets/` or `assets/world/manifest.json` as the world art source
- No Nintendo/GBA ROM rips
- No RPG Maker RTP/company assets unless a specific license review confirms use outside RPG Maker for this exact asset
- No random Pokemon-looking sprite sheet without source URL, license, and redistribution permission
- No media4agents / LLM art for **Pokémon species** (Rule 1 in `asset-policy.md`)
- No colored rectangles, CSS shapes, or flat debug tiles for `starter_town_core` or higher world claims

## Provenance requirements

`docs/assets-provenance.md` must include:

- selected strategy: `procedural_or_generated_world_art`
- mode per category: player, NPC, tiles, buildings, grass, caves/interiors, UI/font
- for media4agents entries: full URL, `{name}`, prompt, size/style/model flags
- for Canvas: script/module path that builds the texture/atlas
- for SVG: repo path under the applying project (for example `public/assets/svg/...`)
- attribution: `media4agents.com` for generated URLs; “procedural/SVG authored in applying project” for local modes
- redistribution status for generated media (token is public/revocable; rotate if leaked)
- explicit line: `packet assets/ removed`

## Required validator behavior

`npm run assets:validate` and `npm run assets:world:validate` must fail unless:

- `docs/assets-provenance.md` exists
- `.buildprint/decisions.md` records `procedural_or_generated_world_art`
- player, NPC, and tile coverage exist via SVG, Canvas, and/or media4agents
- no runtime world asset is loaded from a recreated `assets/world/` pack
- no Pokémon graphic is sourced from media4agents/SVG/Canvas
- starter-town proof required player, NPC, and tileset/atlas paths or URL keys exist

Hand-authored pass JSON is never acceptable.
