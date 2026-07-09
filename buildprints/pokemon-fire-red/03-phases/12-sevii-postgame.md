# Phase 12 — Sevii Islands Post-Game

## How to implement this phase

**Read first:** `data/story/sevii-quest-chain.yaml`, `data/story/map-manifest.yaml` (postgame maps).

Post-Champion content: **full islands 1-7 arc** — not a 3-island minimum.

## Building objective

After Hall of Fame, complete every quest in `sevii-quest-chain.yaml`.

### Mandatory postgame quests

1. **sevii_celio_intro** — Bill/Celio on One Island, Network Machine intro
2. **sevii_ruby_ember** — Mt Ember, Team Rocket, Ruby
3. **sevii_network_part1** — Install Ruby
4. **sevii_islands_1_3_exploration** — Islands 1-3, Cape Brink, Bond Bridge, Berry Forest
5. **sevii_sapphire_icefall** — Four Island, Icefall Cave, Sapphire
6. **sevii_rocket_warehouse** — Five Island Rocket Warehouse
7. **sevii_network_complete** — Ruby + Sapphire → National Dex + Rainbow Pass
8. **sevii_islands_4_7** — Islands 4-7, Dotted Hole, Tanoby Chambers
9. **sevii_cerulean_cave_unlock** — Cerulean Cave opens (Mewtwo optional battle)

### Required maps (18 — 100% gate)

All maps tagged `postgame_sevii` in `map-manifest.yaml` must load:

- one_island, kindle_road, mt_ember_1f, mt_ember_summit
- two_island, cape_brink
- three_island, bond_bridge, berry_forest
- four_island, icefall_cave
- five_island, rocket_warehouse
- six_island, dotted_hole
- seven_island, tanoby_chambers
- sevii_pokemon_center_network

```bash
npm run maps:validate -- --claim postgame_sevii   # 18/18 required
npm run story:validate -- --claim postgame_sevii # all sevii quests complete
```

### National Dex

- Trigger: `network_complete` flag
- Effect: Pokedex switches to National mode (152+)
- Proof: species #152 (Chikorita) visible in dex after upgrade

### Map connection

- Boat from Vermilion/Oak's lab helper after Champion
- Rainbow Pass gates islands 4-7
- Warp + caption for inter-island travel

### Postgame rival rematches

Optional for `release_polish`; document in `rival-progression.yaml` postgame section if implemented.

## DO NOT

- Do not claim postgame_sevii with only One Island
- Do not defer islands 4-7 to "extended scope"
- Do not require trade evolutions without blocker doc
- Do not break main game saves when entering postgame

## Minimum proof before moving on

- **CP-F**: Reach One Island, meet Celio
- **CP-SeviiComplete**: Network Machine complete, National Dex, Rainbow Pass, island 7 reachable
- `npm run story:validate -- --claim postgame_sevii` passes
- `.buildprint/evidence-phase-12.md`

## Handoff note

Sevii quest completion table, 18/18 maps, National Dex proof, Deoxys event status (optional).
