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

1. **Map art/content** — 88+18 Tiled maps must be built; manifest lists ids, not geometry
2. **PokeAPI gaps** — encounters, trainer move sets need manual JSON
3. **Trade evolutions** — blocked in v1 unless trade system added
4. **Safari minigame** — full zone required; simplification only with lowered claim
5. **No game code yet** — Buildprint packet only
6. **Battle-first visual gates added 2026-07-14** — Phase 03 battle, Phase 04 Pallet Town, and Phase 05 integration each require current recomputable proof; phase 06+ is blocked behind all three

## Story contract (added 2026-07-09)

Machine-readable story enforcement — see `data/story/`.

## Asset policy (added 2026-07-09)

- **Pokémon sprites:** always PokeAPI (mandatory, not a question)
- **Trainers / NPCs / tiles:** confirmed committed bundle under `assets/world/`; applying agents copy the decision and do not ask again
- Confirmed mode: `safe_cc0_default` + `external_sprite_sheets`
- Risky exception: `pokemon_community_exception` only with explicit user approval and full provenance
- See `references/asset-policy.md`
- See `references/world-art-sources.md`

## World art source patch (added 2026-07-10)

The Buildprint now provides approved source guidance instead of leaving agents to search randomly:

- Ninja Adventure Asset Pack
- Kenney RPG Urban Pack
- OpenGameArt Top Down Pokemon-esque Sprites
- OpenGameArt Character 4 directional walking
- OpenGameArt Zelda-like tilesets and sprites
- Open RPG Fantasy Tilesets
- Ekat's Public Gen 3 Tilesets only as explicit high-risk exception

Applying agents must create `docs/assets-provenance.md`, `public/assets/world-source-manifest.json`, local originals under `third_party_assets/world/`, and normalized runtime assets under `public/assets/`.

## Recommended next direction

1. Applying agent runs `01-project-setup.md`, then completes Phase 01 data and Phase 02 engine foundation in a new `pokemon-fire-red-game/` implementation repo
2. Execute Phase 03 `battle-core` as the first gameplay certification and require `.buildprint/battle-slice-proof.json` plus independent visual review
3. Execute Phase 04 `pallet-town-world-proof` second and require semantic tile validation, scoped Pallet proof, traversal, and independent visual review
4. Execute Phase 05 `first-loop-integration` and prove continuous Pallet → Route 1 → Viridian plus both Win and Run restoration
5. Start story/map/trainer expansion only after all three current receipts bind the same source state
6. Run phase 14 + 99 before any `kanto_complete` public claim

## Claim status for this packet

- **Buildprint authoring:** complete
- **Game implementation:** `product_build_required` — not started
- **10/10 quality:** not claimed (no real-host playthrough proof)

## Built

- Product Buildprint packet for `pokemon-fire-red`
- Story/data scope files under `data/story/`
- Asset policy, PokeAPI source notes, battle verification, starter-town verification, semantic tile authoring, phase flow, maturity ladder, and critical review phase
- Current v3 setup/UI/review standards for applying agents

## Verified

- Packet structure passes `agb packet check buildprints/pokemon-fire-red` after the battle-first phase rewrite
- Story scope and asset source are documented
- UI identity and screenshot gate is present: Local identity artifact must include `docs/ui-identity.md`, `UI-IDENTITY.md`, `docs/DESIGN.md`, `agb verify ui .`, and a Screenshot set for title, overworld, battle, party, bag, dialogue, shop, faint, victory, desktop, and mobile/narrow.

## Blocked

- Actual game implementation is not started in this packet.
- World art mode and source strategy are resolved: copy the committed `safe_cc0_default` + `external_sprite_sheets` decision and provenance. Only an explicit new user request may replace it.
- No public hosting, trademark/legal review, or full playthrough proof exists.

## Not proven

- `kanto_complete`
- `postgame_sevii`
- release-polish quality
- real player playthrough
- public deployment safety
- No UI evidence binder exists yet for an implementation.

## Next

- Applying agent copies the resolved decisions, answers only still-open hard stops, and runs `01-project-setup.md`
- Complete Phase 01 data and Phase 02 foundation, certify battle in Phase 03, certify Pallet Town in Phase 04, then integrate Pallet -> Route 1 -> Viridian in Phase 05
- Capture UI evidence and playthrough receipts as phases advance
- Run phase 14 and `99-critical-review-pushback` before any completion claim

## UI evidence and action gate

- UI evidence binder: `.buildprint/ui-evidence.md`
- Consumer/action UI proven: not proven until screenshots and runtime actions show movement, talk, starter choice, battle move selection, party switch, bag item, shop, save, and resume.
- Nearest bad silhouette comparison: compare against generic dashboard, central card grid, proof console, raw JSON explorer, and decorative retro demo.
- The next powerful user action must be visible in every major state.

Do not claim completion beyond the evidence. Lower the claim ceiling whenever proof, screenshots, story validation, save/load, or review independence is missing.

## Files to read first (applying agent)

`BUILDPRINT.md` → verification references in its required order → `00-questions.md` → `01-project-setup.md` → `02-ui-identity.md` → `blueprint.yaml` → `03-phases/phase-index.yaml` → active phase
