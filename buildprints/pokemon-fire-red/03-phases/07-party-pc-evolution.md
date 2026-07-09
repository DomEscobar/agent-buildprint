# Phase 07 — Party, PC, Evolution

## How to implement this phase

Full Pokémon instance model, party menu, PC storage, evolution sequences.

## Building objective

Manage up to 6 party members; deposit/withdraw PC; evolve when conditions met.

### PokemonInstance fields

- speciesId, nickname, level, exp, currentHp, maxHp, stats, ivs, evs, nature, ability
- moves[4] with pp/currentPp
- status, volatile flags

### Party menu (Start → Pokémon)

- Summary: sprite, name, level, HP, status
- Switch order (battle and overworld)
- Release with confirmation (optional block for story)

### PC boxes

- 14 boxes × 30 slots (FRLG standard)
- Bill's PC interface simplified: box grid + party strip
- Deposit/withdraw flow

### Evolution

Triggers: level, stone, trade (trade → blocked message + doc blocker for v1)
Evolution scene: white flash, stat recompute, learnset check
Cancel evolution press B during animation (FRLG behavior)

### Move learn on level-up

- Compare learnset at new level
- Prompt replace move or skip
- Defer if 4 moves full — standard UX

## DO NOT

- Do not cap party at 1
- Do not skip PP tracking
- Do not evolve without learnset update

## Minimum proof before moving on

- Catch or receive 2nd Pokémon; switch in battle
- Level Charmander to 16 → Charmeleon evolution plays
- PC deposit and withdraw works
- `.buildprint/evidence-phase-07.md`

## Handoff note

Instance schema, menu scene wiring, evolution handler, trade evolution blockers documented.
