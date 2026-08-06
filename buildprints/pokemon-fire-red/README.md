# Pokémon FireRed: Kanto Story Edition

Agent-executable **Product Buildprint** for a browser-based Pokémon FireRed recreation using PokeAPI v2 data and Phaser 3.

## What this is

- A phased engineering packet for coding agents — **not** a playable game by itself
- Greenfield product route (classifier result: whole game, not capability graft)
- Target: story-complete Kanto + Sevii post-game with Gen III battle mechanics

## What this is not

- Not a Capability Buildprint for grafting into an existing host app
- Not affiliated with Nintendo, Game Freak, or The Pokémon Company
- Not using ripped GBA ROM assets

## Quick start for applying agent

```bash
# 1. Read BUILDPRINT.md and follow read order
# 2. Copy decisions template
mkdir -p .buildprint
# 3. Scaffold from 01-setup.md
npm create vite@latest pokemon-fire-red-game -- --template vanilla-ts
# ... follow setup for Phaser 3 integration

# Data pipeline
npm run data:fetch
npm run data:validate

# Dev
npm run dev
```

## Read order

1. `BUILDPRINT.md`
2. `references/asset-policy.md`
3. `references/world-art-sources.md`
4. `alignment-slice/ALIGNMENT.md` (geometry only — not art sources)
5. `references/battle-verification.md`
6. `references/starter-town-verification.md`
7. `references/world-verification.md`
8. `references/data-sources-and-techniques-basis.md`
9. `00-goal.md`
10. `01-setup.md`
11. `02-identity.md`
12. `blueprint.yaml`
13. `loops/loop-index.yaml` → active loop

## Story contract (mandatory)

Before phase 06, read and implement against:

- `data/story/story-graph.yaml` — 25+ main story quests with flags, items, trainers
- `data/story/map-manifest.yaml` — 88 Kanto + 18 Sevii maps (100% required)
- `data/story/rival-progression.yaml` — 8 rival battles
- `data/story/sevii-quest-chain.yaml` — full postgame arc

**No 50% map shortcut.** Claims require `npm run maps:validate` and `npm run story:validate`.

## Phase summary

| Phase | Focus |
|---|---|
| 01 | PokeAPI cache + manual data |
| 02 | Phaser scenes + game state |
| 03 | **Battle core implementation + deterministic functional/visual certification** |
| 04 | **Pallet Town semantic map + critical visual certification** |
| 05 | Pallet → Route 1 → Viridian encounter integration; blocks phase 06+ |
| 06 | Script VM + Oak/starter story |
| 07 | Party, PC, evolution |
| 08 | Items, bag, shops, HMs |
| 09 | Trainers + rival AI |
| 10 | Kanto maps + 8 gyms |
| 11 | Elite Four + Champion |
| 12 | Sevii Islands post-game |
| 13 | Menus, save, audio, polish |
| 14 | Claim verification |
| 99 | Critical review |

## Data sources

- [PokeAPI v2](https://pokeapi.co/docs/v2) — species, moves, types, sprites (cached at build time)
- Manual JSON/YAML — encounters, trainers, items, and story scripts; maps are semantic YAML compiled deterministically to generated TMX for Tiled preview and runtime
- World art — **SVG**, **Canvas procedural atlases**, and/or **[media4agents.com](https://media4agents.com)** PNG URLs (token `m4a_pub_5601e4aa0cfaad9d`). Packet `assets/` is unused.

## World art (confirmed)

Before overworld/map implementation, the applying agent records and implements:

- strategy: `procedural_or_generated_world_art`
- modes: `custom_svg` | `canvas_procedural` | `media4agents` (mix allowed)
- media4agents image URLs written into code, e.g. `https://media4agents.com/m/m4a_pub_5601e4aa0cfaad9d/{name}.png?prompt=...`
- prefer RetroDiffusion (Games) as the media4agents dashboard image default (do not invent undocumented `&model=` slugs)
- provenance in `docs/assets-provenance.md` and `public/assets/world-source-manifest.json`
- same-origin `/media/{key}.png` proxy when Phaser needs CORS-safe textures

Pokémon remain PokeAPI-only. Do not recreate a packet `assets/` pack pipeline.

Playable alignment reference: `alignment-slice/` demonstrates keyboard/touch walking, camera behavior, and semantic tile usage. Its demo PNG paths are obsolete — rebuild art via SVG/Canvas/media4agents. See `alignment-slice/ALIGNMENT.md` and `references/starter-town-verification.md` before phase 04.

## Claim ladder

`data_pipeline` → `battle_core` → `starter_town_core` → `overworld_core` → `progression_core` → `kanto_complete` → `postgame_sevii` → `release_polish`

## Legal

Fan/educational use. Include disclaimer in game title screen and README. Cache PokeAPI data locally per their fair use policy.

**Asset rules:**

- **Pokémon:** always PokeAPI (mandatory)
- **Trainers / NPCs / tiles:** SVG, Canvas, and/or media4agents (`m4a_pub_5601e4aa0cfaad9d`). Packet `assets/` unused. Changing this requires a new explicit decision.

## Authoring metadata

- Created by: Buildprint Creator workflow (capability-buildprint-author classifier → Product route)
- Classifier: **Route B — Greenfield Product**
- Evidence basis: PokeAPI docs, Phaser docs, reference repos (see `references/`)
- Benchmark: No benchmark evidence found
