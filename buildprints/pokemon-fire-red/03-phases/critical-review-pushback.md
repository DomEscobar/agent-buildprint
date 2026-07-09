# Phase 99 — Critical Review Pushback

## How to implement this phase

Adversarial product review before calling the buildprint execution complete. Score honestly; repair loop up to 5 iterations.

## Building objective

Find material flaws a player would hit in first 2 hours and in endgame.

### Review categories (score 0-5 each, max 60)

1. **New game UX** — title → starter ≤ 3 min, text readable
2. **Overworld feel** — movement responsive, no sticky collision
3. **Battle fairness** — damage feels correct, no instant wipes from bugs
4. **Story coherence** — flags match dialogue, no duplicate rivals
5. **Progression gates** — HMs/badges/logic consistent
6. **Menu usability** — save, bag, party without dead ends
7. **Data accuracy** — species types/moves match FRLG spot checks
8. **Performance** — 60fps on mid laptop, no memory leak on map change
9. **Save integrity** — no lost badges/items on reload
10. **Legal/asset hygiene** — provenance doc complete, no ROM dumps
11. **Mobile/narrow** — virtual pad usable at 375px width
12. **Claim honesty** — HANDOVER matches proof, no overclaim

Pass threshold: **45/60**, no category below 3, no unresolved high-severity finding.

### High-severity examples

- Softlock in story
- Save deletes party
- All battles deal 0 damage
- Cannot enter any gym

### Output

`.buildprint/critical-review.md`:

- Scores per category
- Fixed / Proven / Blocked / Not proven
- Overall score and claim recommendation

## DO NOT

- Do not pass with known softlock
- Do not skip mobile check if browser game claim
- Do not inflate scores

## Minimum proof before moving on

- critical-review.md with score ≥ 45 or documented downgrade
- High-severity items fixed or explicitly block claim

## Handoff note

Review score, top 3 remaining risks, whether buildprint execution is complete for applying agent.
