# Handover — Buildprint Author Session

## Outcome

Created **Product Buildprint** at `buildprints/pokemon-fire-red/` for a coding agent to implement a browser-based Pokémon FireRed (Kanto + Sevii) game using PokeAPI v2 and Phaser 3.

## Classifier decision

**Route B: Greenfield Product Buildprint** — request is a complete game, not a reusable capability graft into an existing host app. Capability Buildprint packet was **not** authored (per `00-request-classifier.md`).

## Evidence

| Source | Use |
|---|---|
| PokeAPI v2 docs | Species, moves, types, sprites, version groups |
| Phaser 3 | Tilemaps, scenes, input, audio |
| pokered.ts, pokemon-team-planner-tools | Fidelity and PokeAPI export patterns |
| Agentic Chat product Buildprint | Phase structure template |

**No benchmark evidence found** for engine selection. Technique confidence: medium-high.

## Deliverables

- 14 implementation phases + critical review phase
- `blueprint.yaml` with story scope, maturity ladder, claim gates
- `references/data-sources-and-techniques-basis.md`
- Full Kanto story beat list and Sevii post-game scope

## Known gaps (for applying agent)

1. **Map art/content** — 82+18 Tiled maps must be built; manifest lists ids, not geometry
2. **PokeAPI gaps** — encounters, trainer move sets need manual JSON
3. **Trade evolutions** — blocked in v1 unless trade system added
4. **Safari minigame** — full zone required; simplification only with lowered claim
5. **No game code yet** — Buildprint packet only

## Story contract (added 2026-07-09)

Machine-readable story enforcement — see `data/story/`.

## Asset policy (added 2026-07-09)

- **Pokémon sprites:** always PokeAPI (mandatory, not a question)
- **Trainers / NPCs / tiles:** user chooses via `00-questions.md` — `external_sprite_sheets` or `custom_svg`
- See `references/asset-policy.md`

## Recommended next direction

1. Applying agent runs `01-project-setup.md` in a new `pokemon-fire-red-game/` implementation repo
2. Execute phases 01→03 for vertical slice (Pallet → Viridian + wild battle)
3. Playtest checkpoint CP-B before expanding map content
4. Parallel content authoring: maps + trainers while engine phases continue
5. Run phase 14 + 99 before any `kanto_complete` public claim

## Claim status for this packet

- **Buildprint authoring:** complete
- **Game implementation:** `product_build_required` — not started
- **10/10 quality:** not claimed (no real-host playthrough proof)

## Files to read first (applying agent)

`BUILDPRINT.md` → `00-questions.md` → `01-project-setup.md` → `03-phases/01-data-pipeline.md`
