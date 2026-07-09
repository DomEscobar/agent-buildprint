# Phase 13 — Menus, Pokedex, Audio, Polish

## How to implement this phase

Ship-quality menus, save system, audio hooks, options, Fly/Dig/Escape Rope where applicable.

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
