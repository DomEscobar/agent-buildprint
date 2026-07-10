# Phase 11 — Elite Four + Champion

## How to implement this phase

Victory Road, Indigo Plateau, Elite Four gauntlet, Champion Blue, Hall of Fame.



Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

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
