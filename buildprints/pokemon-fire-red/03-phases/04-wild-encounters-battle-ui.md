# Phase 04 — Wild Encounters + Battle UI Shell

## How to implement this phase

Connect grass encounters to BattleScene. UI first; full damage in phase 05.

## Building objective

Stepping grass on Route 1 triggers wild battle vs Rattata/Pidgey per encounter table. Battle UI shows sprites, HP bars, level, message box — move menu wired but may use simplified damage until phase 05.

### Encounter flow

1. Overworld sets `pendingEncounter` from `data/manual/encounters/{table}.json`
2. Roll level range, species, method (walk/grass/surf/fish)
3. Generate wild `PokemonInstance` at rolled level from data cache
4. Transition to BattleScene with `battleType: wild`

### Encounter table schema

```json
{
  "map": "route_1",
  "grass": [
    { "speciesId": 16, "minLevel": 2, "maxLevel": 5, "rate": 50 },
    { "speciesId": 19, "minLevel": 2, "maxLevel": 4, "rate": 50 }
  ],
  "slots": 12,
  "rate": 25
}
```

### Battle UI layout (240×160)

- Foe sprite top-right, player back sprite bottom-left — **both from PokeAPI FRLG cache**
- HP bars with color thresholds (green/yellow/red)
- Bottom message box (9px font, 2 lines scrolling)
- Phase 04: Fight/Bag/Pokémon/Run menu visible; Run works in wild

### Battle exit

- Win: exp placeholder OK; return overworld
- Run: escape check (speed-based simplified OK)
- Faint player party: black out → heal at last Pokémon Center (Viridian)

## DO NOT

- Do not use random species ignoring encounter table
- Do not skip Run option in wild battles
- Do not leave battle without clearing overworld encounter lock

## Minimum proof before moving on

- CP-B partial: enter wild battle from Route 1 grass
- Run succeeds sometimes; fight menu opens
- Screenshot: battle UI wild Rattata
- `.buildprint/evidence-phase-04.md`

## Handoff note

Encounter roll code path, battle scene props, UI component files, known simplifications for phase 05.
