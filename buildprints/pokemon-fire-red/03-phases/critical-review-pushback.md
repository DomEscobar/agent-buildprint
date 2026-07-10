# Phase 99 - Critical Review Pushback

## How to implement this phase

Adversarial product review before calling the buildprint execution complete. Score honestly; repair loop up to five iterations. This phase must be reviewed by an external reviewer or a fresh-context reviewer.

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, `.buildprint/ui-evidence.md`, story progress, screenshots, commands, and HANDOVER before scoring.



Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

## Building objective

Find material flaws a player would hit in the first 2 hours, mid-story, endgame, and postgame. The objective is to block overclaiming and force the smallest real repairs before completion.

Score each category 0 to 5 for a total score out of 60. Passing requires at least 50/60, no category below 4, and no unresolved high-severity finding.

1. **New game UX** - title to starter <= 3 min, text readable
2. **Overworld feel** - movement responsive, no sticky collision
3. **Battle fairness** - damage feels correct, no instant wipes from bugs
4. **Story coherence** - flags match dialogue, no duplicate rivals
5. **Progression gates** - HMs/badges/logic consistent
6. **Menu usability** - save, bag, party without dead ends
7. **Data accuracy** - species types/moves match FRLG spot checks
8. **Performance** - 60fps on mid laptop, no memory leak on map change
9. **Save integrity** - no lost badges/items on reload
10. **Legal/asset hygiene** - provenance doc complete, no ROM dumps
11. **Mobile/narrow** - virtual pad usable at 375px width
12. **Claim honesty** - HANDOVER matches proof, no overclaim

## Experience Originality And Screenshot Delta

Perform screenshot delta review and progressive-disclosure screenshot review:

- dominant surface: title, overworld, battle, party, bag, dialogue, shop, faint, victory
- interaction model: movement, A/B/Start commands, move selection, party switch, bag item, save/load
- creative object: the 240x160 game viewport and direct JRPG manipulation, not a dashboard or proof console
- information hierarchy: game world first, status panels subordinate, debug/proof hidden
- palette, copy, labels, spacing, iconography: exact tokens applied and consistent with docs/DESIGN.md

Disclosure check: README/HANDOVER must disclose fan/non-affiliation, PokeAPI sprite source, world-art provenance, and which claim is not proven.

## Reviewer independence

External reviewer independence protocol:

- The implementing agent must not score its own work as final pass.
- Use an external reviewer or fresh-context reviewer with no access to the implementation plan except the built artifact, Buildprint claim, screenshots, and proof commands.
- If the same agent wrote the implementation and the final review without fresh context, write `REVIEW_INVALID`.
- Reviewer must name five worst flaws before assigning scores.
- Do not score until this section exists in `.buildprint/critical-review.md`.
- Every score must cite a concrete artifact: screenshot path, command output, source file:line, save file, story-progress entry, or playtest note. Prose-only justification is invalid.

## Objective auto-fail triggers

Any trigger below forces failure until repaired:

- Echo or canned core output instead of a playable game loop.
- Forbidden silhouette match: dashboard, central card grid, renamed workbench, proof workbench, proof console, raw JSON explorer, or devtools-first UI.
- Dead or decorative controls: buttons, menus, party slots, bag rows, or NPC interactions that do nothing.
- Thin or default architecture: generic components/services/utils tree without game-system ownership.
- Self-review without independence.
- Missing local UI identity or missing `ui-identity-present` evidence.
- **Placeholder or flat-color sprites** for Pokémon, player, or map tiles when CP-VS or sprite-audit is claimed pass.
- **Missing `.buildprint/sprite-audit.json`** or CP-VS screenshots when advancing past phase 05 battle engine.
- **Battle_core claimed** without playable proof pass (damage tests alone insufficient).
- Proof/debug console leakage into the primary player surface; record `proof-console-leakage` if any proof/debug UI dominates the player surface.
- Missing UI evidence binder.
- Weak action surface with no next powerful user action.
- Prose-only identity compliance with no screenshots or file:line evidence.

## Screenshot capture protocol

Capture into `.buildprint/screenshots/`:

- 375 px mobile/narrow title, overworld, battle, menu
- 1280 px desktop title, overworld, battle, party, bag, dialogue, shop, victory
- A screenshot comparing the forbidden silhouette and adjacent at-risk silhouette against the current dominant surface

Use Playwright or equivalent browser screenshot tool chain. Each screenshot must list viewport, route/state, save fixture, and command.

## Artifact verification

Run or document:

```bash
agb verify ui .
```

Write `artifact-check.md` or link the equivalent evidence with command output, screenshot paths, story validator output, and save/load proof.

## Three-track pass requirement

- Track A: implementation/build/test phase core.
- Track B: product/UI identity, design, screenshots, action surface, first-run comprehension, nearest bad silhouette comparison.
- Track C: decisions/legal/asset/proof honesty, claim ceiling, provenance, and reviewer independence.

Track B (product/UI) and Track C must both be fully clear. The review may not reach PASS or PENDING_RECHECK by resolving only Track A while Track B or Track C still fails.

## Phase core vs claim qualification

- `phase_core_passed`: phase implementation and direct checks passed.
- `claim_qualified`: proof supports the claimed maturity.

It is valid for `phase_core_passed: true` and `claim_qualified: false` when the game works locally but lacks full playthrough, public-hosting, Sevii, or screenshot evidence.

## Repair loop

For each failed score:

1. name the flaw and severity
2. patch the smallest real fix
3. rerun the relevant proof
4. rescore
5. stop after five iterations with honest blocker if still failing

## DO NOT

- Do not pass with known softlock
- Do not skip mobile check if browser game claim
- Do not inflate scores
- Do not accept placeholders, functionless buttons, mocked/sample data, raw JSON, or decorative proof screens

## Minimum proof before moving on

- `.buildprint/critical-review.md` names the five worst flaws
- score is at least 50/60
- no category below 4
- no unresolved high-severity finding
- `phase_core_passed` and `claim_qualified` are both stated
- Track B and Track C are clear or claim is downgraded

## Handoff note

Review score, top 3 remaining risks, screenshot paths, whether `phase_core_passed` is true, whether `claim_qualified` is true, and whether buildprint execution is complete for applying agent.
