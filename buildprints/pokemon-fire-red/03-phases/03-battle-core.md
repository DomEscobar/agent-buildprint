# Phase 03 — Battle Core: Implementation And Certification

## How to implement this phase

Build and certify the production battle system before any map implementation. Read `references/battle-verification.md`, `references/asset-policy.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the Phase 01-02 evidence. This phase is indivisible: mechanics without runtime visual proof, or visuals without mechanics, cannot advance.

Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

## Building objective

Deliver production wild and trainer battles using one deterministic Gen III state machine and one production `BattleScene`. A test-only fixture may choose starting state and seed, but after launch the same scene, engine, input, data, renderer, and transition contracts must be reusable unchanged by Phase 05 encounters.

The player-facing surface is the 240x160 logical game viewport. Battle state is dominant; proof data, fixture controls, JSON, evaluator language, and debug panels remain absent from release UI.

### State machine

Implement explicit phases:

1. `command` — player chooses Fight, Bag, Pokemon, or Run; trainer AI chooses a legal command
2. `order` — move priority, switch priority, and Speed resolve deterministically
3. `execute` — accuracy, damage, effects, status prevention, switching, and messages
4. `end_turn` — poison, burn, residual effects, counters, and faint checks
5. `replacement` — forced switch when usable party members remain
6. `complete` — victory, loss/blackout contract, EXP, or successful wild escape

Invalid commands return typed errors and never mutate battle state. Fainted Pokemon cannot act; zero-PP moves cannot be selected unless the documented Struggle rule applies.

### Gen III mechanics

Implement and test at minimum:

- Gen III type-derived physical/special category, level, Attack/Defense or Sp. Atk/Sp. Def, power, and damage order. Physical types: Normal, Fighting, Flying, Poison, Ground, Rock, Bug, Ghost, Steel. Special types: Fire, Water, Grass, Electric, Psychic, Ice, Dragon, Dark. Never use PokeAPI's modern per-move `damage_class` for FRLG calculation.
- STAB, type effectiveness and immunity, random 85-100% roll, critical stage, burn, and stat stages -6 through +6
- Speed/priority ordering including deterministic tie handling from the recorded seed
- sleep, poison, burn, paralysis, freeze, and confusion turn behavior
- legal voluntary switch, forced replacement, faint flow, victory/loss, and EXP gain
- wild Run behavior and trainer Run rejection

Keep battle calculation in owned modules such as `src/battle/engine`, `damage`, `effects`, and `commands`. Do not create a parallel proof implementation.

### Production battle UI

At 240x160 logical resolution:

- opponent front sprite top-right and player Pokemon back sprite bottom-left, both from cached PokeAPI FRLG paths
- opponent and player status panels with name, level, HP, and status; numeric HP may remain player-only
- green/yellow/red HP states that remain legible without relying on color alone
- two-line bitmap message box with deliberate pagination
- Fight/Bag/Pokemon/Run command state and a 2x2 move state with move, PP, and type
- visible keyboard/gamepad/touch focus that does not resemble a web dashboard

Use integer pixel scaling, `pixelArt: true`, `roundPixels: true`, and antialias disabled. Apply exact tokens from `docs/DESIGN.md`; do not copy copyrighted FireRed UI assets.

### Deterministic proof fixtures

Create generated fixture data for:

- wild level 5 starter versus legal Route 1 species
- trainer battle with at least two usable party members
- super-effective and immune/resisted interactions
- visible status prevention or residual effect
- long trainer/species/move content
- a discriminator move whose modern `damage_class` conflicts with its Gen III type-derived category

Fixtures record seed and normalized inputs. They may select starting state only. Direct HP mutation, injected faint/victory, canned event logs, post-launch state injection, or a permanent player-facing `/battle-demo` automatically fails.

## Test-first requirements

Before production changes, pin the Phase 02 BattleScene shell and current typed state boundary with a characterization test. Then add failing tests for the required state transitions and formula cases before implementing them.

Required automated coverage includes:

- identical seed + commands produce identical normalized event/final-state hashes across two fresh runs
- command → order → execute → end-turn → replacement/complete sequencing
- neutral, super-effective, resisted, immune, burn, critical, random-range, and stat-stage damage fixtures
- switch, faint, forced replacement, EXP, victory/loss, wild Run, and trainer Run rejection
- illegal/fainted/zero-PP command rejection without state mutation

## Browser and visual certification

Run Playwright against the production build through the real input mapper. Complete both wild and trainer fixtures, visibly select Fight/moves, switch, reach status/HP thresholds, faint, victory, loss, wild Run, and trainer Run rejection.

Capture every state named in `references/battle-verification.md` at 1280px desktop and 375px narrow. Record zero console errors and no page-level overflow. Then use a fresh-context or external reviewer who receives only the built artifact, current claim, design files, bound evidence, screenshots, and trace.

The reviewer must name the five worst visible flaws before verdict. Any unresolved critical or high visual finding keeps this phase active. Automated screenshot checks do not replace visual judgment.

## Required proof

Run:

```bash
npm run test -- --run tests/battle
npm run typecheck
npm run build
npm run battle:proof -- --collect
# independent reviewer writes review + attestation here
npm run battle:proof -- --finalize
npm run battle:proof:verify -- --recompute
```

Required current artifacts:

- `.buildprint/battle-fixtures.json`
- `.buildprint/battle-event-log.json`
- `.buildprint/traces/battle-slice.zip`
- `.buildprint/battle-visual-review.md`
- `.buildprint/reviewer-attestations/battle.json` written by the independent reviewer, never by the proof generator
- `.buildprint/source-manifest.json` binding normalized paths and SHA-256 hashes to a clean commit
- `.buildprint/battle-slice-proof.json`
- `.buildprint/ui-evidence.md` entries for all required battle states
- `.buildprint/evidence-phase-03-battle.md`

## Automatic failures

- a separate demo/proof reducer, renderer, input route, or hardcoded outcome
- damage tests passing while switch/faint/EXP/trainer/Run/type flows are missing
- unit tests, screenshots, or prose without an input-driven production trace
- missing, wrong-generation, non-PokeAPI, front/back-swapped, or blurry Pokemon sprites
- nondeterministic hashes, hand-authored pass JSON, or recompute mismatch
- dirty-worktree pass, incomplete source manifest, relevant untracked file, or symlinked proof input
- dead Fight/Bag/Pokemon/Run or move controls
- clipping, overlap, stale messages, broken HP bars, invisible focus, or proof/debug leakage
- self-approved visual pass, reviewer/implementer identity overlap, missing/mismatched reviewer attestation, generator-written review, missing five-worst-flaws section, or unresolved critical/high finding

## DO NOT

- Do not implement overworld maps in this phase
- Do not fetch PokeAPI at runtime
- Do not use SVG or external packs for Pokemon
- Do not weaken a failed visual gate into a note for later polish
- Do not advance with a partial or Run-only battle

## Minimum proof before moving on

- all mechanics and illegal-command tests pass
- both deterministic fixtures produce stable hashes in fresh runs
- Playwright drives the real production UI through every required flow
- all required desktop/narrow screenshots exist and bind to current fixture/state hashes
- independent visual review has no unresolved critical/high finding
- `npm run battle:proof:verify -- --recompute` passes
- `.buildprint/battle-slice-proof.json` status is `pass`
- claim ceiling is stated as exactly `battle_core`

If any item fails, keep Phase 03 active and cap maturity at `data_pipeline`. Only after every item passes may `active_phase` advance to `04-pallet-town-world-proof`.

## Handoff note

Record engine/state-machine paths, fixture ids and seeds, formula/status coverage, PokeAPI manifest hash, proof/review/screenshot paths, unresolved medium/low visual findings, exact verifier output, and the current claim ceiling.
