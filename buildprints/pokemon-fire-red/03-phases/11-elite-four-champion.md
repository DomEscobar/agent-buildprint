# Phase 11 — Elite Four + Champion

## How to implement this phase

Victory Road, Indigo Plateau, Elite Four gauntlet, Champion Blue, Hall of Fame.

## Building objective

After 8 badges, player traverses Victory Road to Plateau and defeats Elite Four + Champion in sequence without save scumming requirement.

### Maps

- Route 23 (Victory Road gate check — all 8 badges)
- Victory Road (boulders, trainers, Moltres optional)
- Indigo Plateau (Pokémon Center heal between E4 — FRLG allows PC heal)
- Elite Four rooms: Lorelei, Bruno, Agatha, Lance
- Champion room: Rival with starter final evolution party (~L59-63)

### Gauntlet rules

- Sequential E4; cannot skip
- Black out → send to last Center (Plateau or Viridian)
- Win E4 member → mark defeated; rematch only on re-entry rules (FRLG: full gauntlet reset on loss mid-run)

### Champion party scaling

Rival party based on player starter:

| Player starter | Rival final |
|---|---|
| Bulbasaur | Charizard |
| Charmander | Blastoise |
| Squirtle | Venusaur |

Plus 5 additional Pokémon appropriate to level band (Alakazam, Rhydon, etc. per FRLG roster research — document in trainer JSON)

### Hall of Fame

- Credits scroll or simplified Hall of Fame screen
- Set flag `hall_of_fame`; enable postgame boat (phase 12)

## DO NOT

- Do not allow Plateau entry with < 8 badges
- Do not skip Champion for kanto_complete claim
- Do not forget heal opportunity between E4 members

## Minimum proof before moving on

- CP-E: Hall of Fame after Champion (debug rare candies forbidden in proof run)
- `.buildprint/evidence-playthrough-kanto.md` started — screenshots at each E4 + Champion
- Save/load works mid-Plateau

## Handoff note

E4 trainer ids, Champion party levels, Hall of Fame implementation, kanto_complete claim eligibility.
