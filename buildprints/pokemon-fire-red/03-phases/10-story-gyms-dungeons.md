# Phase 10 — Story Maps, Gyms, Major Dungeons

## How to implement this phase

**Read first:** `data/story/story-graph.yaml`, `data/story/map-manifest.yaml`, `data/story/rival-progression.yaml`.

Expand map content and implement **every quest** in the story graph. This phase is not complete until validation passes at **100%** for the target claim.

## Building objective

Player can complete the **full FRLG main story** from parcel quest through Giovanni, with all side quests in `story-graph.yaml` — no simplified shortcuts.

### Mandatory quests (do not skip)

Implement every quest tagged `required_for: kanto_complete` in `story-graph.yaml`:

- Oak's Parcel → Pokédex → Route 22 rival
- Mt Moon fossil + later Cinnabar revival
- Bill's PC → SS Anne → Cut → Surge
- Flash + Rock Tunnel darkness
- Rocket Hideout → Silph Scope → Pokémon Tower → Poké Flute
- Celadon Tea → Saffron entry
- Silph Co (President, Lapras, Master Ball)
- **Full Safari Zone** (Surf + Gold Teeth + Strength) — no silent HM gift
- Snorlax Route 12 and Route 16 (Poké Flute)
- Seafoam → Blaine
- Cycling Road + Giovanni
- Route 22 final rival → Victory Road → Elite Four (phase 11)

### Map manifest — 100% gate

Every map in `map-manifest.yaml` tagged `kanto_complete` must:

1. Exist as `data/maps/{map_id}.tmx`
2. Load without error in `MapLoader`
3. Have warps connecting to the story graph's `maps` list for that quest

```bash
npm run maps:validate   # must report 82/82 for kanto_complete
```

**Revoked:** the previous "50% of checklist maps" gate. Partial completion is a **blocker**, not pass.

### Story progress artifact

Maintain `.buildprint/story-progress.json` — every quest `complete` or honest `blocked` with reason.

```bash
npm run story:validate   # must pass before advancing to phase 11
```

### Gym leaders (trainers + maps)

| Badge | Leader | Map | Trainer id |
|---|---|---|---|
| Boulder | Brock | pewter_gym | gym_brock |
| Cascade | Misty | cerulean_gym | gym_misty |
| Thunder | Surge | vermilion_gym | gym_surge |
| Rainbow | Erika | celadon_gym | gym_erika |
| Marsh | Sabrina | saffron_gym | gym_sabrina |
| Volcano | Blaine | cinnabar_gym | gym_blaine |
| Earth | Giovanni | viridian_gym | gym_giovanni |

Koga is **not** a gym in FRLG (Sabrina is 5th/6th depending on count — FRLG order: Brock, Misty, Surge, Erika, Sabrina, Blaine, Giovanni = 8 badges; Koga was Gen1 Sabrina slot change). Use FRLG order: Sabrina before Blaine.

### Field gates (must implement)

- `blocks` from story-graph (Route 2 old man, Saffron guards, Snorlax, cut trees, surf water, strength boulders)
- Dark maps require Flash HM active
- Bike required on Cycling Road (Route 17)

### Dungeons

- Puzzle elements: switches, locked doors, warp tiles, elevator (Silph Co, Rocket Hideout)
- Item balls on maps as interactable objects

## DO NOT

- Do not auto-grant badges without gym leader defeat
- Do not skip Silph Co, Rocket Hideout, Tea, Tower, or Safari
- Do not use "gift Surf" instead of Safari Zone without recording blocker and lowering claim
- Do not advance with `maps_loaded < maps_required`
- Do not leave softlocks (record Fly unlock in phase 08 save + phase 13 menu)

## Minimum proof before moving on

- **CP-D** (Brock): Defeat Brock at intended levels 8-12
- **CP-M1** (post-Misty): SS Anne ticket + Cut obtained
- **CP-M2** (post-Silph): Silph Co cleared, Sabrina reachable
- **CP-M3** (post-Giovanni): 8 badges, Route 22 rival 2 defeated
- `npm run maps:validate` → 82/82
- `npm run story:validate` → all kanto_complete quests complete
- `.buildprint/evidence-phase-10.md` with quest checklist + map count

## Handoff note

Quest completion table, maps 82/82, known blockers, HM Fly status, Safari implementation choice.
