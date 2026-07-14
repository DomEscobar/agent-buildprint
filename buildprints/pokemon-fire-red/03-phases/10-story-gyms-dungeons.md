# Phase 10 — Story Maps, Gyms, Major Dungeons

## How to implement this phase

**Read first:** `data/story/story-graph.yaml`, `data/story/map-manifest.yaml`, `data/story/rival-progression.yaml`.

Expand map content and implement **every quest** in the story graph. This phase is not complete until validation passes at **100%** for the target claim.



Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

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
4. Pass the structural, render-every-map, similarity-review, and runtime traversal gates in `references/world-verification.md`

```bash
npm run maps:validate   # must report 88/88 for kanto_complete
npm run maps:render-proof -- --claim kanto_complete
npm run world:traverse-proof -- --claim kanto_complete
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
- `npm run maps:validate` → 88/88
- `npm run story:validate` → all kanto_complete quests complete
- `.buildprint/evidence-phase-10.md` with quest checklist + map count
- `.buildprint/map-audit.json` covers 88/88 Kanto maps with no unresolved duplicate, empty, or unreachable findings
- `.buildprint/map-renders/contact-sheet-kanto.png` plus 88 full-resolution renders bound to current TMX hashes
- `.buildprint/world-traversal.json` and browser trace prove every Kanto map loads, accepts legal movement, and has reachable warps; CP-M1/M2/M3 remain continuous save-backed runs, not debug-teleport proof
- fresh-context reviewer completes the Kanto portion of `.buildprint/world-visual-review.md`, including randomly selected mid/late traversal samples and the five worst flaws

## Handoff note

Quest completion table, maps 88/88, known blockers, HM Fly status, Safari implementation choice.
