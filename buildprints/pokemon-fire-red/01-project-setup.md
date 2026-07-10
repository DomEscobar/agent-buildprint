# 01 Project Setup

Foundation pour before identity or phase code. Create architecture, data pipeline skeleton, Phaser project, and verification commands. Do not start `02-ui-identity.md` or `03-phases/*` until this foundation pour is complete.

## How to implement setup

Before writing game code, read:

- `BUILDPRINT.md`
- `references/asset-policy.md`
- `references/world-art-sources.md`
- `references/data-sources-and-techniques-basis.md`
- `00-questions.md` — confirm `world_overworld_art_mode` and world source strategy answered
- confirmed `.buildprint/decisions.md`

If `.buildprint/decisions.md` does not exist or says `No implementation decisions recorded yet`, stop. Return to `00-questions.md`; do not hide hard-stop questions behind defaults.

Initialize the Buildprint skill harness:

```bash
agb harness init
agb harness checkup
```

The local skill harness must install or document `.agents/skills` with at least:

- `setup-runbook`
- `frontend-ui-product-design`
- `subagent-driven-implementation`
- `verify-and-review`

Record each skill's triggers, skips, and completion_signal in `AGENTS.md` so future agents know when to use it.

## Setup objective

Create a Vite + TypeScript + Phaser 3 project with:

- `npm run dev` — playable shell (title scene)
- `npm run build` — production bundle
- `npm run test` — vitest unit tests
- `npm run data:fetch` — PokeAPI cache builder (may stub first run)
- `npm run data:validate` — schema validation on generated JSON
- `npm run maps:validate` — compare `data/maps/` to `data/story/map-manifest.yaml`
- `npm run story:validate` — compare `.buildprint/story-progress.json` to story graph
- `npm run assets:validate` — Pokémon sprites from PokeAPI cache only; world art matches `world_art_mode`; starter + Route 1 species sprite files exist
- `npm run assets:world:prepare` — download/copy selected world source packs into `third_party_assets/` and normalize runtime files
- `npm run assets:world:validate` — player/NPC/tiles/grass/building coverage and provenance checks
- `npm run typecheck` — tsc --noEmit

## Architecture files (required)

Copy story contract files from Buildprint packet:

- `data/story/story-graph.yaml`
- `data/story/map-manifest.yaml`
- `data/story/rival-progression.yaml`
- `data/story/sevii-quest-chain.yaml`

Implement validators in `scripts/validate-maps.ts` and `scripts/validate-story.ts`.
Implement world asset scripts in `scripts/prepare-world-assets.ts` and `scripts/validate-world-assets.ts`.

Create before phase 01:

- `architecture/system-architecture.md` — scenes, data flow, save, audio
- `architecture/overworld-loop.md` — map load, player update, encounter check
- `architecture/battle-state-machine.md` — turn phases, command resolution
- `architecture/script-vm.md` — NPC interaction, story flags
- `architecture/data-pipeline.md` — PokeAPI fetch, manual overrides, cache layout
- `architecture/save-and-persistence.md` — IndexedDB, schema versioning
- `PROJECT_STRUCTURE.md`
- `ARCHITECTURE_STRUCTURE_TRACE.md`
- `docs/architecture.md` — summary + framework decisions
- `docs/assets-provenance.md` — legal/asset sources
- `public/assets/world-source-manifest.json` — selected source strategy, source URLs, local originals, runtime outputs, coverage status
- `.env.example` — non-secret runtime configuration and PokeAPI/cache knobs
- `.buildprint/setup-receipt.md` — setup proof and blockers

Each architecture file: Mermaid diagram, component legend, Implementation Mapping section.

### Component names (use these or sharper equivalents)

- `Title Scene`, `Overworld Scene`, `Battle Scene`, `Menu Scene`
- `Map Loader`, `Collision Grid`, `Encounter Zone Controller`
- `Player Controller`, `NPC Controller`, `Script Runner`
- `Battle Engine`, `Damage Calculator`, `AI Selector`
- `Game State Store`, `Save Manager`, `Flag Registry`
- `Data Cache Loader`, `PokeAPI Build Script`, `Manual Override Merger`
- `Audio Manager`, `Input Mapper`

## Project structure (minimum)

```text
src/
  main.ts                 # Phaser game config
  scenes/                 # Title, Overworld, Battle, Menu
  overworld/              # movement, collision, warps
  battle/                 # engine, damage, ai, ui
  data/                   # runtime loaders (read generated JSON)
  scripts/                # script VM interpreter
  ui/                     # dialogue box, menus
  save/                   # persistence
  audio/
  types/                  # shared TypeScript types
scripts/
  fetch-pokeapi.ts        # build-time data ingestion
  validate-data.ts
  prepare-world-assets.ts # selected CC0/source pack normalization
  validate-world-assets.ts
data/
  manual/                 # encounters, trainers, items, type overrides
  maps/                   # Tiled sources (.tmx)
  scripts/                # story YAML/JSON
public/
  data/generated/         # built JSON cache
  data/generated/sprites/pokemon/  # PokeAPI FRLG sprites (mandatory)
  assets/
    ow/                     # external_sprite_sheets mode: PNG sheets
    svg/                    # custom_svg mode: trainers, NPCs, player
    tilesets/               # Tiled PNG tilesets
  assets/world-source-manifest.json
third_party_assets/
  world/                    # original downloaded/unpacked source packs; do not edit in place
tests/
  battle/damage.test.ts
  data/schema.test.ts
```

Forbidden: flat `utils/` dumping ground without mapped ownership.

## Framework decisions section in docs/architecture.md

Record:

- **Pokémon sprites:** PokeAPI FRLG cache only (`references/asset-policy.md` Rule 1)
- **World art mode:** `external_sprite_sheets` | `custom_svg` from decisions ledger
- **World art source strategy:** `safe_cc0_default` | `pokemon_community_exception` | `custom_authored` from `references/world-art-sources.md`
- **World asset sources:** selected source URLs, licenses, local `third_party_assets/` paths, normalized `public/assets/` outputs, redistribution status
- **Phaser 3** — tilemaps, scenes, input, WebAudio
- **Vite** — dev server and bundle
- **Vitest** — unit tests for battle math and data schema
- **Tiled** — map authoring (external tool)
- **idb** or **localforage** — IndexedDB wrapper
- Rejected: Unity WebGL (heavier), raw Canvas (reinvent tilemap)

Also include a section named **Framework And Styling Decisions**:

- `React + Vite + TypeScript` is allowed only for non-game tooling screens; Phaser 3 owns the game runtime.
- `Tailwind CSS v4 + tokenized CSS variables` is allowed only for wrapper/tooling UI if such UI is built.
- `ui_stack_exception`: document any reason to use static DOM, plain CSS, or a static/vanilla screen instead of the declared runtime.
- `proven_implementation_requirements`: list the chosen libraries, runtimes, SDKs, and platform services; explain every hand-roll/from-scratch decision.
- Map every library to `docs/architecture.md`, implementation path, test command, and proof path.

## Data pipeline skeleton

Implement `scripts/fetch-pokeapi.ts` that:

1. Reads config for species range (1-151 core, extend to 386 for postgame)
2. Fetches with delay between requests (fair use)
3. Writes `public/data/generated/pokemon/{id}.json`
4. Merges `data/manual/overrides/` on top
5. Outputs manifest `public/data/generated/manifest.json`

## World asset pipeline skeleton

Implement `scripts/prepare-world-assets.ts` that:

1. Reads `.buildprint/decisions.md` for world source strategy and mode.
2. For `safe_cc0_default`, accepts source archives/paths for approved sources from `references/world-art-sources.md` and copies originals under `third_party_assets/world/`.
3. Extracts or copies runtime files into:
   - `public/assets/ow/player.png`
   - `public/assets/ow/npc-basic.png`
   - `public/assets/tilesets/kanto-exterior.png`
   - optional `public/assets/tilesets/kanto-interior.png`
4. Writes `public/assets/world-source-manifest.json` with source URL, license, original path, runtime path, dimensions, and coverage.
5. Fails if required coverage is missing.

Implement `scripts/validate-world-assets.ts` that fails unless:

- `docs/assets-provenance.md` exists and names the selected strategy
- `public/assets/world-source-manifest.json` exists
- player OW sheet has 4 directions and at least 4 frames per direction, or a documented equivalent
- NPC sheet exists
- exterior 16x16 tileset exists
- tall grass and building/door/warp coverage is declared
- no hard-banned source is used

## Setup receipt

Write `.buildprint/setup-receipt.md` with:

- architecture score (0-5 rubric from Agentic Chat pattern)
- commands verified
- blockers (Tiled install, asset pack missing, etc.)

Minimum score **4** to continue.

Engineering quality bar:

- Scalable system ownership: data pipeline, overworld, battle, script VM, save, UI, and assets have separate module boundaries.
- Maintainable code with SOLID where it helps, KISS where complexity is not earned, and clear separation of concerns.
- Coding standards and best practices are enforced by lint, format, type-check, and tests.
- No broad `utils/`, `helpers/`, or `services/` dumping ground without mapped responsibility.

## DO NOT

- Do not start map content before data schema exists
- Do not embed fetch calls to pokeapi.co in runtime game code
- Do not copy Nintendo ROM assets into repo
- Do not skip ARCHITECTURE_STRUCTURE_TRACE.md
- Do not use placeholder commands, real secrets, or hide hard-stop blockers in setup notes
- Do not start `03-phases/*` until the foundation, architecture, harness, and setup receipt pass
- Do not start phase 03 until `world_overworld_art_mode`, world source strategy, source URLs/paths, provenance, player OW sheet, NPC sheet, and exterior tileset are recorded or an honest blocker is recorded

## Minimum proof before moving on

- `npm run dev` shows title screen
- `npm run typecheck` passes
- `npm run test` passes (even if minimal)
- architecture score >= 4 in setup receipt
- `.buildprint/decisions.md` populated from 00-questions
- `npm run assets:world:validate` passes or setup records an honest blocker before phase 03
- `docs/assets-provenance.md` links every selected world source and local path

## Handoff note

Record stack versions, architecture score, data fetch status (full/partial/stub), and which phase 01 can trust.
