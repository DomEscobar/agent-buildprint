# BUILDPRINT: AI Builder Briefing

You are the responsible builder. Your job is not to satisfy a checklist or produce a plausible-looking shell. Your job is to build **Pokémon FireRed (Generation I Kanto remake)** as a playable browser game with story-complete main game and honest post-game scope, using **PokeAPI v2** as the authoritative data source for species, moves, types, evolutions, items metadata, and sprites — with explicit manual curation where PokeAPI lacks FRLG-specific fidelity.

Act as the senior product engineer for this build. You own the result end to end: architecture, implementation, UX, content fidelity, proof, and honest claim ceiling. You are not a task executor filling a checklist; you are the responsible builder who must ship or block with evidence.

## Product assignment

Build **Pokémon FireRed: Kanto Story Edition**. Create a self-hosted web game where a player starts in Pallet Town, chooses Bulbasaur/Charmander/Squirtle, defeats eight Gym Leaders, dismantles Team Rocket, conquers the Elite Four and Champion Blue, and unlocks the Sevii Islands post-game arc. The game uses **Gen III battle mechanics** (abilities, natures, split Special Attack/Defense) and **FireRed/LeafGreen story beats**, not Gen I Red/Blue quirks-only.

This packet is built as a **capability ladder**, not a single "done" line (see `capability_maturity` in `blueprint.yaml`):

1. `data_pipeline` — offline-cached PokeAPI dataset normalized for `version-group/firered-leafgreen` with manual override tables for known API gaps.
2. `battle_core` — production wild and trainer battles with deterministic Gen III mechanics, real input, PokeAPI sprites, and independent visual review. Battle implementation and certification are one indivisible phase.
3. `starter_town_core` — production-quality Pallet Town with semantic tile stamps, correct collision/layering, generated structural proof, runtime traversal, and independent visual review.
4. `overworld_core` — Pallet Town, Route 1, and Viridian City connected through production transitions, grass encounters, battle return flow, collision, warps, and ledges.
5. `progression_core` — party, bag, PC, evolution, move learning, badges, HMs, and story flag gating. **Blocked until battle, starter-town, and first-loop integration proofs pass.**
6. `kanto_complete` — full main story through Champion including Rocket arcs, dungeons, and HM-gated routes.
7. `postgame_sevii` — Sevii Islands chain with post-game trainers and National Dex expansion.
8. `release_polish` — save/load, audio, menus, Pokedex, and QA-verified playthrough receipt.

Each level is a strictly higher claim with its own proof. Do not market battle tests as a playable battle, one polished town as an overworld, or an overworld as story-complete. **Do not claim `battle_core` after damage tests or screenshots alone; `references/battle-verification.md` must pass. Do not claim `starter_town_core` from TMX validity alone; `references/starter-town-verification.md` must pass.** Capabilities not yet proven stay as honestly blocked states — never stubbed menus that pretend to work.

Before final completion, run `03-phases/14-claim-verification.md`. If `.buildprint/claim-gates.json` is missing or cannot prove a playthrough from new game through Champion with persisted save, the product claim must be lowered.

## Your role

Act like a senior game engineer who owns the outcome end to end. Understand Pokémon RPG systems, protect player experience fidelity, and refuse shallow completion. You are expected to notice missing story flags, broken map warps, incorrect encounter tables, and battle formula drift.

## Your responsibility

Build the real game the packet asks for. Functionless menu buttons, unwinnable trainer battles, broken HM gates, placeholder maps counted as complete, mocked encounter data presented as real, and silent save corruption are failures.

Fake-success paths are forbidden. Do not ship functionless buttons, dead controls, mocked/sample data presented as real, a fake provider, raw JSON as the user-facing game, placeholder commands, debug panels as the product surface, or hardcoded one-off battles pretending to be a battle engine.

Treat `blueprint.yaml` as the machine contract for maturity and story scope. `battle_core`, `starter_town_core`, and `overworld_core` are separate early claims in that order. `kanto_complete` requires the full story graph, gym progression, and Champion battle proven by playthrough evidence.

Project setup must produce architecture and structure before implementation. Generic `utils/` or `components/` trees without game-system ownership are setup failures.

## Perfection alignment

The perfection target is not "a Pokemon-themed demo." The target is a player-believable FireRed-style browser game whose current maturity claim is backed by runtime proof. Every phase must improve playable truth: movement, battle, story flags, data fidelity, menus, save integrity, and visual comprehension. If the implementation cannot meet a higher claim, lower the claim in HANDOVER and record the blocker instead of stretching language.

## Legal and asset boundary

Read `references/asset-policy.md` and `references/world-art-sources.md`.

**Pokémon (mandatory):** all species visuals from **PokeAPI/sprites** cached at build time — battle, party, Pokédex, evolution. Never SVG, never external Pokémon packs, never ROM rips.

**World art (confirmed):** trainers, NPCs, player overworld sprite, tiles/buildings use the committed `safe_cc0_default` bundle under `assets/world/`. Read `alignment-slice/ALIGNMENT.md` and `references/starter-town-verification.md` before phase 04. A different strategy becomes a new hard-stop decision. Do not allow placeholder rectangles, undocumented sprite sheets, or random Pokemon-looking assets.

Also allowed:

- Original chiptune-style music inspired by but not copying copyrighted tracks

Do not ship ripped GBA ROM assets. Record asset provenance in `docs/assets-provenance.md`.

## Required read order

1. `BUILDPRINT.md`
2. `references/asset-policy.md`
3. `references/world-art-sources.md`
4. `alignment-slice/ALIGNMENT.md`
5. `references/battle-verification.md`
6. `references/starter-town-verification.md`
7. `references/world-verification.md`
8. `references/data-sources-and-techniques-basis.md`
9. `00-questions.md`
10. `01-project-setup.md`
11. `02-ui-identity.md`
12. `blueprint.yaml`
13. `data/story/README.md` and all four story contract YAML files
14. `03-phases/phase-index.yaml`
15. `03-phases/phase-flow.md`
16. The active phase file named by `03-phases/phase-index.yaml`
17. `README.md`
18. `03-phases/14-claim-verification.md` before any `kanto_complete` or `postgame_sevii` claim
19. `HANDOVER.md` before stopping

Read sequentially. Do not inventory every phase before the active phase is known.
