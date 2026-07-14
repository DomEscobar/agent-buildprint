# Data Sources And Techniques Basis

Evidence note for Pokémon FireRed product Buildprint. Inspected 2026-07-09.

## Selected technique

**TypeScript + Vite + Phaser 3** game client with **offline JSON cache** built from PokeAPI v2 at build/dev time, plus **Tiled (.tmx)** map authoring and a **custom script VM** for story events.

Confidence: **medium-high** for web delivery and agent implementability; **medium** for full FRLG fidelity without manual curation.

## Candidate techniques considered

| Technique | Verdict | Reason |
|---|---|---|
| TypeScript + Phaser 3 + Tiled | **Selected** | Active ecosystem, tilemap/collision/camera built-in, strong agent docs, browser playable |
| TypeScript + Excalibur.js | Rejected | Smaller map/battle RPG reference corpus for Pokémon-scale projects |
| pokered.ts / pret disassembly port | Rejected for this packet | ROM/submodule dependency; user requested PokeAPI; legal/host friction |
| gididaf/pokemon-yellow-typescript ROM extract | Rejected | Requires user ROM upload; not PokeAPI-first |
| Pure Canvas custom engine | Rejected | Reinvents tilemap, scene, input, audio primitives |
| Unity/Godot native | Rejected | User context is coding-agent web repo; breaks browser golden path |

## PokeAPI v2 usage

Official docs: https://pokeapi.co/docs/v2 (static hosting since 2018; GET-only; cache locally per fair use).

Key endpoints for FRLG:

- `GET /api/v2/version-group/firered-leafgreen/` — version scope
- `GET /api/v2/pokemon/{id}` — stats, types (check `past_types` for Gen I accuracy)
- `GET /api/v2/pokemon-species/{id}` — dex entries, evolution chain URL
- `GET /api/v2/evolution-chain/{id}` — evolution methods
- `GET /api/v2/move/{id}` — move data; filter learnsets by version group
- `GET /api/v2/type/{id}` — damage relations for Gen III
- `GET /api/v2/item/{id}` — item metadata (partial for in-game items)
- `GET /api/v2/location-area/{id}` — encounter tables (sparse; manual tables required)
- Sprites: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/`

Wrapper option: **pokenode-ts** (TypeScript, auto-cache) — inspect before adopting; custom fetch+cache is acceptable.

## Known PokeAPI gaps (must manual-curate)

Sources: PokeAPI docs; [Pokemon-Team-Planner/pokemon-team-planner-tools](https://github.com/Pokemon-Team-Planner/pokemon-team-planner-tools) known issues.

1. **Types**: Some species show modern types (e.g. Clefairy Fairy); use `past_types` or override table for FRLG.
2. **Encounters**: Location-area encounter rates for FRLG routes are incomplete; author `data/manual/encounters/` per route.
3. **Trainer parties**: Not in PokeAPI; author `data/manual/trainers/` from Bulbapedia/FRLG walkthrough references.
4. **Story scripts**: Not in PokeAPI; author `data/scripts/` keyed by map and flag.
5. **In-game items**: PokeAPI item catalog ≠ bag item IDs/effects; map `data/manual/items/` with effect handlers.
6. **Maps/layouts**: Not in PokeAPI; recreate in Tiled from public walkthrough/map references (not ROM dumps).

## Rejected data approaches

- **Runtime-only PokeAPI calls during gameplay** — violates fair use caching guidance; causes offline failure.
- **LLM-generated stats** — unverified; forbidden for battle math authority.
- **National dex 151-only simplification** — conflicts with FRLG post-game unless claim lowered.

## Benchmark evidence

**No benchmark evidence found** for "best Pokémon fan game engine 2026." Selection based on official Phaser docs, maintained TypeScript stacks, and inspected reference repos (pokered.ts, pokemon-react-phaser).

## Stale-risk areas

- PokeAPI sprite URL paths if repository reorganizes
- Phaser 3 API minor version drift — pin version in package.json
- Move learnset API shape for version groups — verify against sample species each phase

## Unresolved questions for user (hard-stop in 00-questions)

- Deployment posture (local-only vs public hosting — trademark exposure)
- Asset strategy (PokeAPI mandatory for Pokémon; committed `safe_cc0_default` + `external_sprite_sheets` world bundle confirmed; replacement requires a new explicit user decision)
- Scope ceiling if iteration budget exhausted (main story only vs Sevii)
