# 00 Questions

These questions are scoped to **Pokémon FireRed: Kanto Story Edition**.

Ask only questions that change implementation. If a hard-stop question is unanswered, stop before `01-project-setup.md`.

Read `references/asset-policy.md` before recording visual decisions.

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
3. **World/overworld art mode** — For **trainers, NPCs, player avatar, map tiles, buildings** (NOT Pokémon):
   - `external_sprite_sheets` — PNG tilesets + OW character sheets (PokeCommunity, OpenGameArt, itch.io, or user-supplied pack path)
   - `custom_svg` — custom/programmatic SVG rasterized in Phaser for trainers, NPCs, player, optional tiles/UI
   
   If user supplies a pack path, record it. Pokémon remain PokeAPI regardless of this answer.
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
| World/overworld art mode | **unanswered — agent must ask user** | — | user said Pokémon=PokeAPI; trainers/world=optional sprites vs SVG | yes | yes |
| Fidelity mode | frlg_mechanics | explicit_user_delegation | FireRed remake scope | no | yes |
| Legal/trademark posture | fan/educational + disclaimer | explicit_user_delegation | fan recreation | no | yes |
| Product/artifact identity | Pokémon FireRed (Kanto + Sevii) | user | stated in request | no | yes |

**Action for applying agent:** Ask question 3 (world art mode) if not answered. Copy all rows to `.buildprint/decisions.md` before setup.

## Assumable defaults

After hard-stop rows are confirmed or delegated:

- If user delegates world art mode: default `external_sprite_sheets` (better GBA pixel fidelity)
- English language dialogue first
- Keyboard + gamepad; touch virtual D-pad for mobile
- 2× integer pixel scale on desktop
- No online battles/trading in v1

## Deferrable questions

- Exact color palette after `02-ui-identity.md`
- External sprite pack URL (if mode is `external_sprite_sheets` but pack not chosen yet — blocker only for phase 03+)
- Optional speed-up / fast text toggle

## Decision ledger template

```md
| Question | answer | confirmed_by | delegation_quote | reversible | blocks_setup | architectural_impact |
|---|---|---|---|---:|---:|---|
| Pokémon sprites | always PokeAPI | user | mandatory policy | no | yes | data pipeline + battle/party/pokedex |
| Scope ceiling |  |  |  | no | yes | phase graph |
| Platform and stack |  |  |  | no | yes | engine |
| World/overworld art mode | external_sprite_sheets OR custom_svg |  |  | yes | yes | asset loader, Tiled vs SVG pipeline |
| External pack path (if external) |  |  |  | yes | no | provenance + load paths |
| Fidelity mode |  |  |  | no | yes | battle formula |
| Legal/trademark posture |  |  |  | no | yes | README, provenance |
| Product/artifact identity |  |  |  | no | yes | story scope |
```

If world art mode is blank, ask before `01-project-setup.md`. Do not substitute Pokémon with SVG.
