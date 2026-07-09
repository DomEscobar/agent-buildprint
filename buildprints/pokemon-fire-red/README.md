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
# 3. Scaffold from 01-project-setup.md
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
2. `references/data-sources-and-techniques-basis.md`
3. `00-questions.md`
4. `01-project-setup.md`
5. `02-ui-identity.md`
6. `blueprint.yaml`
7. `03-phases/phase-index.yaml` → active phase

## Story contract (mandatory)

Before phase 06, read and implement against:

- `data/story/story-graph.yaml` — 25+ main story quests with flags, items, trainers
- `data/story/map-manifest.yaml` — 82 Kanto + 18 Sevii maps (100% required)
- `data/story/rival-progression.yaml` — 8 rival battles
- `data/story/sevii-quest-chain.yaml` — full postgame arc

**No 50% map shortcut.** Claims require `npm run maps:validate` and `npm run story:validate`.

## Phase summary

| Phase | Focus |
|---|---|
| 01 | PokeAPI cache + manual data |
| 02 | Phaser scenes + game state |
| 03 | Overworld maps + movement |
| 04 | Wild encounters + battle UI |
| 05 | Gen III battle engine |
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
- Manual JSON — encounters, trainers, items, story scripts, maps (Tiled)

## Claim ladder

`data_pipeline` → `overworld_core` → `battle_core` → `progression_core` → `kanto_complete` → `postgame_sevii` → `release_polish`

## Legal

Fan/educational use. Include disclaimer in game title screen and README. Cache PokeAPI data locally per their fair use policy.

**Asset rules:**

- **Pokémon:** always PokeAPI (mandatory)
- **Trainers / NPCs / tiles:** user chooses `external_sprite_sheets` or `custom_svg` via `00-questions.md`

## Authoring metadata

- Created by: Buildprint Creator workflow (capability-buildprint-author classifier → Product route)
- Classifier: **Route B — Greenfield Product**
- Evidence basis: PokeAPI docs, Phaser docs, reference repos (see `references/`)
- Benchmark: No benchmark evidence found
