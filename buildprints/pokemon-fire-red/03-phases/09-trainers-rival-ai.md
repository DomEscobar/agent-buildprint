# Phase 09 — Trainers, Rival Progression, AI

## How to implement this phase

Trainer battles from data files; **all rival battles** from `data/story/rival-progression.yaml`; baseline trainer AI.

## Building objective

All trainer battles load party from `data/manual/trainers/{id}.json`. Implement **all 8 rival battles** with dynamic party builder per `rival-progression.yaml`.

### Rival battles (all mandatory)

| Battle id | Map | Quest |
|---|---|---|
| rival_oaks_lab_1 | oaks_lab | quest_first_rival_battle |
| rival_route22_1 | route_22 | quest_route22_early_rival |
| rival_cerulean | cerulean_city | quest_badge_cascade |
| rival_ss_anne | ss_anne_b1f | quest_ss_anne |
| rival_pokemon_tower | pokemon_tower_6f | quest_pokemon_tower |
| rival_silph_co | silph_co_7f | quest_silph_co |
| rival_route22_2 | route_22 | quest_route22_final_rival |
| rival_champion | champion_room | quest_elite_four |

Implement `src/battle/rival-party-builder.ts` — reads player starter, returns counter-species per battle rules.

### Trainer schema

```json
{
  "id": "rival_route22_1",
  "class": "RIVAL",
  "name": "BLUE",
  "party": [
    { "speciesId": 5, "level": 9, "moves": [52, 43, 10, 98] }
  ],
  "introText": "rival_route22_intro",
  "defeatText": "rival_route22_defeat",
  "reward": { "money": 144 }
}
```

For rival trainers, prefer dynamic party from `rival-progression.yaml` over static JSON.

### Trainer object on map

- `trainer` object layer: `trainerId`, `sightRange` (optional line-of-sight)
- Defeated flag: `trainer_defeated_{id}`

### AI (minimum viable)

Priority tiers:

1. If HP < 25% and has super effective move → use it
2. If status move available and foe not statused → status (10% trainers)
3. Else highest power move with PP > 0
4. Switch on faint (trainer sends next)

Document as `ai_tier: simple` — not full competitive AI.

### Gym leaders

Define JSON for Brock, Misty, Surge, Erika, Sabrina, Blaine, Giovanni — maps wired in phase 10.

## DO NOT

- Do not omit rival_cerulean or rival_ss_anne (previously missing)
- Do not duplicate rival parties in code without rival-party-builder
- Do not allow re-battle without rematch flag
- Do not skip money reward on win

## Minimum proof before moving on

- Route 22 rival battle winnable with correct counter-starter
- `tests/battle/rival-party.test.ts` passes for all 8 battle ids
- Trainer sight battle triggers once
- `.buildprint/evidence-phase-09.md`

## Handoff note

Trainer count defined, rival-party-builder path, test output, AI module location.
