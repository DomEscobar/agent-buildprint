# 01 Setup

Foundation pour before identity or phase code. Create architecture, data pipeline skeleton, Phaser project, and verification commands. Do not start `02-identity.md` or `loops/*` until this foundation pour is complete.

## How to implement setup

Before writing game code, read:

- `BUILDPRINT.md`
- `references/asset-policy.md`
- `references/world-art-sources.md`
- `references/battle-verification.md`
- `references/starter-town-verification.md`
- `references/world-verification.md`
- `references/data-sources-and-techniques-basis.md`
- `00-goal.md` — confirm `procedural_or_generated_world_art` and media4agents token rows are in decisions
- confirmed `.buildprint/decisions.md`

If `.buildprint/decisions.md` does not exist or says `No implementation decisions recorded yet`, stop. Return to `00-goal.md`; do not hide hard-stop questions behind defaults.

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
- `npm run maps:compile` — compile semantic map sources through the canonical tile catalog into generated TMX files
- `npm run maps:validate` — compare `data/maps/` to `data/story/map-manifest.yaml`
- Later owning phases add `maps:render-proof`, `world:traverse-proof`, and the scoped Pallet proof commands when production maps and traversal exist. Setup documents their contracts; it must not create stubs or fabricated outputs.
- `npm run story:validate` — compare `.buildprint/story-progress.json` to story graph
- `npm run assets:validate` — Pokémon sprites from PokeAPI cache only; world art matches SVG/Canvas/media4agents provenance; starter + Route 1 species sprite files exist
- `npm run assets:world:prepare` — build or register world art from SVG sources, Canvas atlas scripts, and/or media4agents URL map; **must not** copy packet `assets/world/`
- `npm run assets:world:validate` — player/NPC/tiles/grass/building coverage and provenance checks; fail if any path resolves to packet `assets/`
- Phase 03 adds `battle:proof` and its recompute verifier against the production battle implementation. Setup defines only the command ownership and evidence schema.
- `npm run typecheck` — tsc --noEmit
- Phase 05 adds `first-loop:proof` and its recompute verifier once the certified battle and world implementations are integrated.

## Architecture files (required)

Copy story contract files from Buildprint packet:

- `data/story/story-graph.yaml`
- `data/story/map-manifest.yaml`
- `data/story/rival-progression.yaml`
- `data/story/sevii-quest-chain.yaml`

Implement `scripts/compile-maps.ts` and the foundational validators in `scripts/validate-maps.ts` and `scripts/validate-story.ts`. Document battle, Pallet, first-loop, and full-world proof schemas and ownership, but implement each generator/verifier only in its owning phase against real production behavior. Never add placeholder commands or prefilled pass artifacts.
Map tooling must allow only manifest-owned ids matching `^[a-z0-9_]+$`, pass child-process arguments as arrays, enforce resolved-path containment, and reject absolute paths, URLs, `..`, symlinks, unsafe YAML tags, XML DTDs, and external entities.
Implement world asset scripts in `scripts/prepare-world-assets.ts` and `scripts/validate-world-assets.ts` for the SVG / Canvas / media4agents pipeline.
Reserve `scripts/render-map-proof.ts` and `scripts/verify-world-proof.ts` for the phases that have production maps to render. Browser traversal belongs in a real Playwright test, not a mock map walker.

Create before loop 01:

- `architecture/system-architecture.md` — scenes, data flow, save, audio
- `architecture/overworld-loop.md` — map load, player update, encounter check
- `architecture/battle-state-machine.md` — turn phases, command resolution
- `architecture/script-vm.md` — NPC interaction, story flags
- `architecture/data-pipeline.md` — PokeAPI fetch, manual overrides, cache layout
- `architecture/save-and-persistence.md` — IndexedDB, schema versioning
- `PROJECT_STRUCTURE.md`
- `ARCHITECTURE_STRUCTURE_TRACE.md`
- `docs/architecture.md` — summary + framework decisions
- `docs/assets-provenance.md` — legal/asset sources (PokeAPI + SVG/Canvas/media4agents)
- `public/assets/world-source-manifest.json` — strategy `procedural_or_generated_world_art`, mode per category, media4agents URL keys, SVG/Canvas module paths, coverage status
- `src/assets/world-media.ts` (or equivalent) — full media4agents PNG URLs with token `m4a_pub_5601e4aa0cfaad9d` when that mode is used
- `.env.example` — non-secret runtime configuration and PokeAPI/cache knobs (media token may be documented as a public constant, not a signing secret)
- `.buildprint/setup-receipt.md` — setup proof and blockers
- `architecture/proof-contracts.md` — command ownership, schemas, clean-commit/source-manifest binding, and reviewer-attestation rules for later phases. Generated proof JSON, screenshots, renders, reviews, attestations, and traces must not exist until the owning phase creates them from real behavior.

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
  prepare-world-assets.ts # SVG/Canvas atlas build + optional media4agents proxy/cache
  validate-world-assets.ts
  build-canvas-atlas.ts   # optional deterministic Canvas tile/player atlas builder
data/
  manual/                 # encounters, trainers, items, type overrides
  maps/
    tile-catalog.yaml     # semantic keys, stamps, sequences, collision, adjacency
    source/               # coding-agent-authored semantic map layouts
    generated/            # deterministic TMX output for Tiled preview/runtime; do not edit directly
  scripts/                # story YAML/JSON
src/assets/
  world-media.ts          # media4agents URL map (tokenized); never Pokémon species
public/
  data/generated/         # built JSON cache
  data/generated/sprites/pokemon/  # PokeAPI FRLG sprites (mandatory)
  assets/
    svg/                    # custom_svg world/UI art
    generated/              # Canvas-built atlases / prepared textures
    world-source-manifest.json
tests/
  battle/damage.test.ts
  data/schema.test.ts
```

Forbidden in applying projects: recreating a packet `assets/` / Kenney/OpenGameArt pack pipeline or depending on removed `assets/world/manifest.json`.

Forbidden: flat `utils/` dumping ground without mapped ownership.

## Framework decisions section in docs/architecture.md

Record:

- **Pokémon sprites:** PokeAPI FRLG cache only (`references/asset-policy.md` Rule 1)
- **World art strategy:** `procedural_or_generated_world_art`
- **World art modes:** `custom_svg` | `canvas_procedural` | `media4agents` (mix allowed per category)
- **media4agents:** token `m4a_pub_5601e4aa0cfaad9d`; prefer RetroDiffusion (Games) for pixel sprites/tiles; write full URLs into code
- **World asset sources:** SVG paths, Canvas builder modules, and/or media4agents URLs recorded in provenance — never packet `assets/`
- **Phaser 3** — tilemaps, scenes, input, WebAudio
- **Vite** — dev server and bundle; optional `/media/*` proxy for media4agents CORS
- **Vitest** — unit tests for battle math and data schema
- **Tiled** — map authoring (external tool) against generated TMX from semantic sources
- **idb** or **localforage** — IndexedDB wrapper
- Rejected: Unity WebGL (heavier); inventing a full tilemap engine outside Phaser; reviving the deprecated CC0 pack bundle

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

1. Reads `.buildprint/decisions.md`; confirmed strategy is `procedural_or_generated_world_art` with modes `custom_svg` | `canvas_procedural` | `media4agents`.
2. **Never** recreate a packet `assets/` / `assets/world/` pack pipeline.
3. For `canvas_procedural`: run deterministic atlas builders into `public/assets/generated/` (or register Canvas textures at boot).
4. For `custom_svg`: ensure SVG files exist under `public/assets/svg/` (or equivalent) and are loadable by Phaser at integer scale.
5. For `media4agents`: ensure `src/assets/world-media.ts` (or equivalent) contains full tokenized URLs; optionally configure a same-origin `/media/{key}.png` proxy that fetches the upstream media4agents URL.
6. Writes `public/assets/world-source-manifest.json` with strategy, mode per category, media URL keys/prompts, SVG/Canvas paths, dimensions/coverage.
7. Fails if required coverage is missing.

Implement `scripts/validate-world-assets.ts` that fails unless:

- `docs/assets-provenance.md` exists and names `procedural_or_generated_world_art`
- `public/assets/world-source-manifest.json` exists
- player OW has front/back/side directions with standing and step frames, or a documented multi-texture equivalent
- NPC coverage exists
- exterior 16x16 tile language / atlas exists
- tall grass and building/door/warp coverage is declared
- no path recreates a packet `assets/world/` or third-party pack copy as the primary pipeline
- no Pokémon graphic is sourced from media4agents, SVG, or Canvas

## Setup receipt

Write `.buildprint/setup-receipt.md` with:

- architecture score (0-5 rubric from Agentic Chat pattern)
- commands verified
- blockers (Tiled install, missing world SVG/Canvas/media4agents coverage, etc.)

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
- Do not start `loops/*` until the foundation, architecture, harness, and setup receipt pass
- Do not start phase 04 until world strategy/modes, media4agents URLs or SVG/Canvas builders, provenance, player OW, NPC, exterior tile atlas, and semantic tile catalog are recorded or an honest blocker is recorded
- Do not copy or restore the deprecated packet `assets/` bundle

## Minimum proof before moving on

- `npm run dev` shows title screen
- `npm run typecheck` passes
- `npm run test` passes (even if minimal)
- architecture score >= 4 in setup receipt
- `.buildprint/decisions.md` populated from 00-goal (including media4agents token row)
- `npm run assets:world:validate` passes or setup records an honest blocker before loop 04
- `docs/assets-provenance.md` lists SVG/Canvas/media4agents sources per world category and states packet `assets/` unused

## Handoff note

Record stack versions, architecture score, data fetch status (full/partial/stub), and which phase 01 can trust.
