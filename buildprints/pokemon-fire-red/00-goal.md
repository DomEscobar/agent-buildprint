# 00 Goal

Lock the observable goal before setup. If a hard-stop question is unanswered, stop before `01-setup.md`.

## Goal

Deliver the product's golden path as a real runnable loop with honest blockers and proof against the acceptance criteria below.

## Acceptance criteria

- User/operator can complete the primary golden-path action
- Central output meets the quality bar in `blueprint.yaml`
- Failures and missing providers block honestly
- Independent contract review can pass or record external blockers


These questions are scoped to **Pokémon FireRed: Kanto Story Edition**.

Ask only questions that change implementation. If a hard-stop question is unanswered, stop before `01-setup.md`.

Read `references/asset-policy.md` and `references/world-art-sources.md` before recording visual decisions.

## Non-negotiable (not a question)

**Pokémon sprites and species visual elements — always PokeAPI.**

Battle sprites, party icons, Pokédex art, evolution scenes, and any on-screen Pokémon graphic must come from cached [PokeAPI/sprites](https://github.com/PokeAPI/sprites) Gen III FireRed/LeafGreen paths. Do not ask the user. Do not use SVG, Canvas, media4agents, external packs, or ROM rips for Pokémon.

## Hard-stop questions

These require `confirmed_by: user` or `confirmed_by: explicit_user_delegation` before setup, UI identity, or implementation. If the user explicitly says "you choose", "use your judgment", or equivalent, the agent may pick the answer only after recording the exact delegation phrase in `.buildprint/decisions.md`. `confirmed_by: agent_assumption` is invalid for every hard-stop row.

Hard-stop standard categories:

- **Deployment posture** — `trusted_local`, `private_demo`, or `public_web`; public web must record legal/trademark disclaimer and hosting boundary.
- **Secrets and provider policy** — PokeAPI is public, but any analytics, hosting token, save sync, or external asset provider credential needs explicit permission before use.
- **Destructive/data-loss behavior** — save deletion, save migration, cache regeneration, import overwrite, or map/data rewrite must be confirmed before destructive changes.
- **Privacy/compliance exposure** — if public hosting, telemetry, crash logs, uploaded saves, user accounts, or minors-facing sharing are introduced, stop and record privacy/compliance posture.
- **Product/artifact identity** — confirm Pokemon FireRed: Kanto Story Edition, FireRed/LeafGreen mechanics, scope ceiling, and asset boundary.

For all rows above: `confirmed_by: user` or `confirmed_by: explicit_user_delegation` is required. `agent_assumption: invalid` for hard-stop questions.

### Product-shaping questions (ask first)

1. **Scope ceiling** — What is the minimum shippable claim?
   - `kanto_complete` (main story through Champion only)
   - `postgame_sevii` (main story + Sevii Islands)
   - `kanto_complete` with Sevii explicitly deferred as blocked
2. **Platform and stack** — Browser-only web game (default: TypeScript + Vite + Phaser 3), or another target? Record engine choice.
3. **World/player/NPC/tiles source strategy and art mode** — already resolved as `procedural_or_generated_world_art` using **SVG**, **Canvas**, and/or **media4agents.com** (token `m4a_pub_5601e4aa0cfaad9d`). Prefer RetroDiffusion (Games) for pixel game assets. Packet `assets/` is unused. Historical pack strategies below are superseded and must not be implemented unless the user explicitly reopens them:
   - `procedural_or_generated_world_art` — **Confirmed**. Mix `custom_svg`, `canvas_procedural`, and `media4agents` per category. Required for Phase 04 `starter_town_core` certification.
   - ~~`safe_cc0_default` + committed `assets/world/`~~ — superseded 2026-08-06
   - ~~`pokemon_community_exception`~~ — superseded; high-risk if ever reopened
   - ~~Downloaded Kenney/OpenGameArt pack pipeline~~ — superseded
   
   Pokémon remain PokeAPI regardless. Applying agents copy the confirmed choice and must not ask this question again.
4. **Fidelity mode** — `frlg_mechanics` (Gen III stats/abilities/natures, FRLG story) vs `gen1_nostalgia` (Gen I battle quirks). Default: `frlg_mechanics`.

### Safety and scope gates

5. **Deployment posture** — `trusted_local` (dev/play locally), `private_demo`, or `public_web`? Public hosting increases trademark/policy risk; record disclaimer requirements.
6. **Legal/trademark posture** — Fan/educational non-commercial only? Must README include "not affiliated with Nintendo" disclaimer?
7. **Save data** — Browser localStorage/IndexedDB only, or export/import save files?
8. **Product/artifact identity** — Confirm target is **FireRed** (not LeafGreen-exclusive events unless both version exclusives are documented as blocked).

## Pre-filled from user request (2026-07-09)

| Question | answer | confirmed_by | delegation_quote | reversible | blocks_setup |
|---|---|---|---|---:|---:|
| Pokémon sprites | **always PokeAPI** (mandatory) | user | "we may use the https://pokeapi.co/docs/v2" | no | yes |
| Scope ceiling | postgame_sevii | explicit_user_delegation | "perfect finished pokemon Gen 1 fire red" | no | yes |
| Platform and stack | Browser: TS + Vite + Phaser 3 + Tiled | explicit_user_delegation | "coding agent needs to create" | no | yes |
| World/player/NPC/tiles source strategy | **procedural_or_generated_world_art** (SVG / Canvas / media4agents; no packet `assets/`) | user | media4agents handover + ban on `assets/` usage | yes | no |
| World/overworld art modes | custom_svg + canvas_procedural + media4agents (mix allowed) | user | same | yes | no |
| media4agents token | m4a_pub_5601e4aa0cfaad9d | user | account overview / agent handover | no | yes |
| Fidelity mode | frlg_mechanics | explicit_user_delegation | FireRed remake scope | no | yes |
| Legal/trademark posture | fan/educational + disclaimer | explicit_user_delegation | fan recreation | no | yes |
| Product/artifact identity | Pokémon FireRed (Kanto + Sevii) | user | stated in request | no | yes |

**Action for applying agent:** Copy all rows to `.buildprint/decisions.md` before setup. World art is already decided; do not ask again and do not recreate a removed `assets/world/` pack pipeline.

## Assumable defaults

After hard-stop rows are confirmed or delegated:

- World art is not an assumable default: it is confirmed as `procedural_or_generated_world_art` (SVG / Canvas / media4agents)
- English language dialogue first
- Keyboard + gamepad; touch virtual D-pad for mobile
- 2× integer pixel scale on desktop
- No online battles/trading in v1

## Deferrable questions

- Exact color palette after `02-identity.md`
- Per-category SVG vs Canvas vs media4agents mix details (as long as coverage and visual bar are met)
- Optional speed-up / fast text toggle

## Decision ledger template

```md
| Question | answer | confirmed_by | delegation_quote | reversible | blocks_setup | architectural_impact |
|---|---|---|---|---:|---:|---|
| Pokémon sprites | always PokeAPI | user | mandatory policy | no | yes | data pipeline + battle/party/pokedex |
| Scope ceiling |  |  |  | no | yes | phase graph |
| Platform and stack |  |  |  | no | yes | engine |
| World/player/NPC/tiles source strategy | procedural_or_generated_world_art | user | confirmed packet decision; do not reopen | yes | no | asset source, legal posture, map art pipeline |
| World/overworld art modes | custom_svg, canvas_procedural, media4agents | user | confirmed packet decision; do not reopen | yes | no | asset loader, semantic-map to TMX pipeline |
| media4agents token | m4a_pub_5601e4aa0cfaad9d | user | keep in every media URL | no | yes | world PNG/MP4/GLB URLs |
| Packet assets/ usage | unused / forbidden | user | do not copy assets/world | no | yes | provenance + validators |
| Runtime asset coverage | player OW, NPC, tileset/atlas, grass, building/door via SVG/Canvas/media4agents | user | confirmed | no | yes | starter_town_core and phase 04 |
| Fidelity mode |  |  |  | no | yes | battle formula |
| Legal/trademark posture |  |  |  | no | yes | README, provenance |
| Product/artifact identity |  |  |  | no | yes | story scope |
```

The copied ledger must not leave world-art rows blank. If they are blank, repair them from the confirmed table above instead of asking the user. Do not substitute Pokémon with SVG, Canvas, or media4agents.
