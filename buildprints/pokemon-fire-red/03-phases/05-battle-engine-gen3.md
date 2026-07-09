# Phase 05 — Battle Engine (Gen III Mechanics)

## How to implement this phase

Implement deterministic Gen III battle simulation. Reference: Bulbapedia "Damage modification" (Gen III), unit tested.

## Building objective

Full turn-based battle loop for wild and trainer battles.

### Turn phases

1. Command selection (player + AI)
2. Priority/speed order resolution
3. Move execution (accuracy, damage, effects)
4. End-of-turn (poison/burn, leech seed, etc.)
5. Win/loss check

### Damage calculator (Gen III)

Implement and test:

- Physical/Special split by move category
- STAB 1.5×
- Type chart from cached `types/effectiveness.json`
- Critical hit stage (optional simplification: 1/16 rate)
- Random roll 85-100%
- Burn halves physical attack
- Stat stages -6 to +6 multipliers

Required unit tests (`tests/battle/damage.test.ts`):

- Level 50 neutral Tackle vs equal defense
- Super effective Water vs Fire
- Immune Ghost vs Normal
- Burn physical reduction

### Status conditions

Minimum: sleep (1-3 turns), poison, burn, paralysis (25% full para), freeze (thaw chance), confusion
Full paralysis and sleep prevent move selection

### Experience

- Exp formula Gen III on foe faint
- Level up → stat recalc → learnset prompt (defer UI to phase 07 if needed)

### Catch (wild only)

- Poké Ball catch formula simplified or Gen III accurate; document choice
- Shake animation + success/fail messages

## DO NOT

- Do not use Gen I special stat combined formula
- Do not skip type immunities
- Do not allow dead Pokémon to select moves
- Do not mark battle_core proven without damage unit tests passing

## Minimum proof before moving on

- CP-B complete: win Route 1 wild at starter Lv 5
- `npm run test` — all damage tests pass
- Trainer battle stub: fixed party foe executes moves
- `.buildprint/evidence-phase-05.md` with test output

## Handoff note

Formula module path, test coverage list, known simplifications vs canonical Gen III.
