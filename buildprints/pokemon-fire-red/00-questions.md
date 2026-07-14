# 00 Questions

These questions are scoped to **Pokémon FireRed: Kanto Story Edition**.

Ask only questions that change implementation. If a hard-stop question is unanswered, stop before `01-project-setup.md`.

Read `references/asset-policy.md` and `references/world-art-sources.md` before recording visual decisions.

## Non-negotiable (not a question)

**Pokémon sprites and species visual elements — always PokeAPI.**

Battle sprites, party icons, Pokédex art, evolution scenes, and any on-screen Pokémon graphic must come from cached [PokeAPI/sprites](https://github.com/PokeAPI/sprites) Gen III FireRed/LeafGreen paths. Do not ask the user. Do not use SVG, external packs, or ROM rips for Pokémon.

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
3. **World/player/NPC/tiles source strategy and art mode** — already resolved as `safe_cc0_default` + `external_sprite_sheets` from committed `assets/world/`. The alternatives below are historical and may be reopened only when the user explicitly asks to replace the confirmed bundle:
   - `safe_cc0_default` + `external_sprite_sheets` — **Confirmed** committed CC0/open bundle documented in `references/world-art-sources.md`. Required for Phase 04 `starter_town_core` certification.
   - `pokemon_community_exception` + `external_sprite_sheets` — Ekat's Public Gen 3 Tilesets. Visually closest, but risky; only with explicit user approval and full credit/license capture. Public web blocked until license review.
   - `custom_authored` — custom in-repo sprites/tiles created by the agent or user. Must include real player/NPC/tiles before phase 04; not placeholders.
   - `custom_svg` — custom/programmatic SVG rasterized in Phaser. **Only with explicit user opt-in** — blocks `starter_town_core` and `release_polish` visual claims by default because it tends to produce non-GBA results.
   
   Pokémon remain PokeAPI regardless of any future replacement decision. Applying agents copy the confirmed choice and must not ask this question again.
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
| World/player/NPC/tiles source strategy | **safe_cc0_default + external_sprite_sheets; committed under `assets/world/`** | user | "die sprites von den pokemon sollen aus der pokeapi kommen aber player, landscape world sprites nicht" | yes | no |
| Fidelity mode | frlg_mechanics | explicit_user_delegation | FireRed remake scope | no | yes |
| Legal/trademark posture | fan/educational + disclaimer | explicit_user_delegation | fan recreation | no | yes |
| Product/artifact identity | Pokémon FireRed (Kanto + Sevii) | user | stated in request | no | yes |

**Action for applying agent:** Copy all rows to `.buildprint/decisions.md` before setup. World art is already decided; do not ask again and do not replace the committed sheets with downloaded or generated substitutes.

## Assumable defaults

After hard-stop rows are confirmed or delegated:

- World art is not an assumable default: it is confirmed as `safe_cc0_default` + `external_sprite_sheets` under `assets/world/`
- English language dialogue first
- Keyboard + gamepad; touch virtual D-pad for mobile
- 2× integer pixel scale on desktop
- No online battles/trading in v1

## Deferrable questions

- Exact color palette after `02-ui-identity.md`
- Replacement sprite-pack URL — not applicable to the confirmed committed bundle; it becomes a Phase 04 blocker only if the user explicitly changes the strategy
- Optional speed-up / fast text toggle

## Decision ledger template

```md
| Question | answer | confirmed_by | delegation_quote | reversible | blocks_setup | architectural_impact |
|---|---|---|---|---:|---:|---|
| Pokémon sprites | always PokeAPI | user | mandatory policy | no | yes | data pipeline + battle/party/pokedex |
| Scope ceiling |  |  |  | no | yes | phase graph |
| Platform and stack |  |  |  | no | yes | engine |
| World/player/NPC/tiles source strategy | safe_cc0_default; committed under assets/world/ | user | confirmed packet decision; do not reopen | yes | no | asset source, legal posture, map art pipeline |
| World/overworld art mode | external_sprite_sheets | user | confirmed packet decision; do not reopen | yes | no | asset loader, semantic-map to TMX pipeline |
| External pack URL/path | assets/world/manifest.json | user | committed bundle; no setup download | yes | no | provenance + load paths |
| Runtime asset coverage | player OW, NPC, tileset, grass, building/door from assets/world/runtime/ | user | committed bundle | no | yes | starter_town_core and phase 04 |
| Fidelity mode |  |  |  | no | yes | battle formula |
| Legal/trademark posture |  |  |  | no | yes | README, provenance |
| Product/artifact identity |  |  |  | no | yes | story scope |
```

The copied ledger must not leave world-art rows blank. If they are blank, repair them from the confirmed table above instead of asking the user. Do not substitute Pokémon with SVG.
