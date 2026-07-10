# Phase 13 — Menus, Pokedex, Audio, Polish

## How to implement this phase

Ship-quality menus, save system, audio hooks, options, Fly/Dig/Escape Rope where applicable.



Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

## Building objective

Full Start menu and persistence for release_polish claim.

### Start menu

- Pokédex (seen/caught, species detail from cache)
- Pokémon (party — phase 07)
- Bag (phase 08)
- `{PLAYER}` name card (play time, badges, money)
- Save
- Option
- Exit

### Save system (polish — core required in phase 08)

Phase 08 implements IndexedDB save/load. This phase adds:

- Save slot selection UI (3 slots)
- Export save: download `{player}_{timestamp}.sav.json`
- Import save: file picker + schema validation
- Confirm overwrite dialog
- Autosave option (deferrable)

### Fly / Dig / Teleport

- HM02 Fly: map list unlocked by visit flags
- Escape Rope / Dig: dungeon exit (if dungeons implemented)

### Options

- Text speed (slow/mid/fast)
- Battle animations on/off
- Frame skip off (keep 60fps target)

### Audio

- BGM per map id (placeholder chiptune loops OK if original composition)
- SFX: select, bump, battle start, faint, evolution
- Volume sliders in Options
- Mute respect

### Polish pass

- Screen transitions consistent
- No placeholder "Lorem" text in shipping maps
- NPC collision solid
- Battle message timing respects text speed

## Do not claim release_polish without working Save export/import (core save must already pass from phase 08)
- Do not use copyrighted GBA music rips
- Do not leave Options non-functional

## Minimum proof before moving on

- Save mid-game, reload browser, CONTINUE works
- Export/import roundtrip preserves badge count
- Pokedex shows caught starter
- `.buildprint/evidence-phase-13.md` + ui-evidence screenshots

## Handoff note

Save schema version, audio asset list, options defaults, polish issues remaining.
