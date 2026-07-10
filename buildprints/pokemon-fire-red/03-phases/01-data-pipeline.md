# Phase 01 — Data Pipeline (PokeAPI + Manual Curation)

## How to implement this phase

Read `references/asset-policy.md`, `references/data-sources-and-techniques-basis.md`, `blueprint.yaml` (`proven_implementation_requirements.pokeapi_ingestion`), and architecture/data-pipeline.md. Implement build-time ingestion before any battle or map logic consumes species data.



Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

## Building objective

Deliver offline game data that a coding agent can import without calling PokeAPI at runtime.

### Required generated artifacts

```text
public/data/generated/
  manifest.json
  pokemon/{1..386}.json      # normalized species records
  sprites/pokemon/{id}/      # PokeAPI FRLG front.png, back.png (mandatory)
  moves/index.json
  types/effectiveness.json
  learnsets/firered-leafgreen.json
data/manual/
  type-overrides.json        # past_types fixes (Clefairy etc.)
  items.json                 # bag item definitions + effect ids
  encounters/route_1.json    # example; pattern for all routes
  trainers/gym_brock.json    # example trainer schema
schemas/
  pokemon.schema.json
  trainer.schema.json
```

### Normalized pokemon record (minimum fields)

- `id`, `name`, `types[]` (FRLG-accurate)
- `baseStats`: hp, attack, defense, spAttack, spDefense, speed
- `abilities[]` (Gen III)
- `growthRate`, `catchRate`, `baseExp`
- `learnset`: level-up moves for version group `firered-leafgreen`
- `evolutionChain`: triggers and targets
- `sprites`: front/back default + shiny optional — **paths must point to PokeAPI cached files only**
- `pokedexText` (English)

### Fetch script behavior

- Sequential requests with 100-200ms delay
- Download FRLG sprites to `public/data/generated/sprites/pokemon/{id}/front.png` and `back.png`
- Resume from manifest if partial fetch interrupted
- Log failures; do not silently skip species
- Merge manual overrides last (override wins)

### Validation tests

- `tests/data/schema.test.ts` — AJV or zod validates every generated file
- Spot check: Bulbasaur learnset includes Tackle + Growl at L1
- Spot check: Clefairy types = Normal (not Fairy) after override
- Spot check: Move Thunder has correct type and power

## DO NOT

- Do not fetch PokeAPI in Phaser game loop
- Do not use SVG or external PNG for Pokémon species sprites
- Do not invent base stats without marking `source: manual`
- Do not skip validation tests
- Do not assume 151 species only if postgame_sevii claim is active

## Minimum proof before moving on

- `npm run data:fetch` completes for species 1-151 minimum (386 for postgame track)
- `npm run data:validate` passes
- `npm run assets:validate` passes — Pokémon sprites only from PokeAPI cache
- Manifest lists counts and version group
- Document override rationale in `data/manual/README.md`
- Evidence: `.buildprint/evidence-phase-01.md` with sample JSON paths and test output

## Handoff note

Species count fetched, override count, known API gaps remaining, commands for refresh.
