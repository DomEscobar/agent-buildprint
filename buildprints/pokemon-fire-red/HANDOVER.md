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
6. **Sprite gate added 2026-07-10** — CP-VS + `sprite-audit.json` hard-stops phase 06+; placeholder art is no longer acceptable past phase 02

## Story contract (added 2026-07-09)

Machine-readable story enforcement — see `data/story/`.

## Asset policy (added 2026-07-09)

- **Pokémon sprites:** always PokeAPI (mandatory, not a question)
- **Trainers / NPCs / tiles:** user chooses via `00-questions.md` — `external_sprite_sheets` or `custom_svg`
- See `references/asset-policy.md`

## Recommended next direction

1. Applying agent runs `01-project-setup.md` in a new `pokemon-fire-red-game/` implementation repo
2. Execute phases 01→05 for vertical slice (data, engine, overworld, battle UI, battle engine)
3. **Mandatory: phase `05-playable-proof` — CP-VS + sprite-audit.json + ui-evidence before any story work**
4. Playtest checkpoint CP-VS before expanding map content or phase 06+
5. Parallel content authoring: maps + trainers while engine phases continue (only after CP-VS)
6. Run phase 14 + 99 before any `kanto_complete` public claim

## Claim status for this packet

- **Buildprint authoring:** complete
- **Game implementation:** `product_build_required` — not started
- **10/10 quality:** not claimed (no real-host playthrough proof)

## Built

- Product Buildprint packet for `pokemon-fire-red`
- Story/data scope files under `data/story/`
- Asset policy, PokeAPI source notes, phase flow, maturity ladder, and critical review phase
- Current v3 setup/UI/review standards for applying agents

## Verified

- Packet structure is expected to pass `node bin/agb.js packet check buildprints/pokemon-fire-red`
- Story scope and asset source are documented
- UI identity and screenshot gate is present: Local identity artifact must include `docs/ui-identity.md`, `UI-IDENTITY.md`, `docs/DESIGN.md`, `agb verify ui .`, and a Screenshot set for title, overworld, battle, party, bag, dialogue, shop, faint, victory, desktop, and mobile/narrow.

## Blocked

- Actual game implementation is not started in this packet.
- World art mode remains a hard-stop applying-agent decision unless user delegation is recorded.
- No public hosting, trademark/legal review, or full playthrough proof exists.

## Not proven

- `kanto_complete`
- `postgame_sevii`
- release-polish quality
- real player playthrough
- public deployment safety
- No UI evidence binder exists yet for an implementation.

## Next

- Applying agent answers/records hard-stop decisions, then runs `01-project-setup.md`
- Build data pipeline and vertical slice Pallet -> Route 1 -> Viridian
- Capture UI evidence and playthrough receipts as phases advance
- Run phase 14 and `99-critical-review-pushback` before any completion claim

## UI evidence and action gate

- UI evidence binder: `.buildprint/ui-evidence.md`
- Consumer/action UI proven: not proven until screenshots and runtime actions show movement, talk, starter choice, battle move selection, party switch, bag item, shop, save, and resume.
- Nearest bad silhouette comparison: compare against generic dashboard, central card grid, proof console, raw JSON explorer, and decorative retro demo.
- The next powerful user action must be visible in every major state.

Do not claim completion beyond the evidence. Lower the claim ceiling whenever proof, screenshots, story validation, save/load, or review independence is missing.

## Files to read first (applying agent)

`BUILDPRINT.md` → `00-questions.md` → `01-project-setup.md` → `03-phases/01-data-pipeline.md`
