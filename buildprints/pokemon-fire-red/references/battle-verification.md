# Battle Verification Contract

This contract certifies `battle_core` before overworld implementation begins. Unit tests, screenshots, or a convincing battle mock are insufficient by themselves. Functional, rendered, input-driven, deterministic, provenance, and independent-review evidence must agree.

## Production-path identity

The proof fixture may select a deterministic starting state, seed, player party, opponent party, and command script. After launch it must use the same production `BattleScene`, battle state machine, reducers, data loaders, input mapper, renderer, and transition code used by later wild and trainer encounters.

The applying project must expose `npm run battle:proof` and `npm run battle:proof:verify -- --recompute`. A test-only fixture entry may be compiled into test builds, but it must be absent from release navigation and player-facing UI. A permanent `/battle-demo`, parallel proof reducer, proof-only renderer, direct HP mutation, or injected post-launch outcome is an automatic failure.

## Required deterministic fixtures

At minimum, the generated fixture manifest records complete normalized inputs and SHA-256 hashes for:

- a wild battle using a level 5 Bulbasaur, Charmander, or Squirtle against a legal Route 1 species
- a trainer battle with at least two usable party members so switching and forced replacement are exercised
- one type-super-effective move and one immune or resisted matchup
- one category-discriminator fixture whose modern PokeAPI move `damage_class` differs from the Gen III type-derived category
- one status fixture that visibly reaches a disabled or turn-skipping state
- one long-content fixture with the longest supported trainer/species names and a 12-character-or-longer move label

Each fixture records its seed, species ids, levels, stats, moves, PP, status, held items if present, AI policy, and expected command sequence. Running the same fixture and command sequence twice in fresh browser processes must produce byte-identical normalized event-log and final-state hashes. Timestamps, trace ids, and render timing are excluded before hashing; no gameplay field may be excluded.

## Functional proof

Vitest or an equivalent deterministic test runner must prove:

- command -> priority/speed order -> accuracy -> damage/effect -> end-turn -> win/loss sequencing
- Gen III damage formula spot checks, STAB, type effectiveness, immunity, random range, burn, and stat stages
- legal switch, forced switch after faint, fainted Pokemon rejection, EXP award, level-up state, and battle termination
- wild Run behavior and trainer Run rejection
- player and AI cannot submit illegal moves, zero-PP moves, or commands for a fainted active Pokemon

FireRed/LeafGreen uses the Gen III type-based physical/special split. Physical types are Normal, Fighting, Flying, Poison, Ground, Rock, Bug, Ghost, and Steel. Special types are Fire, Water, Grass, Electric, Psychic, Ice, Dragon, and Dark. Derive the damage stat pair from move type; using PokeAPI's modern per-move `damage_class` for FRLG calculation is an automatic failure. The discriminator fixture must fail if that modern field is used.

Playwright must drive the production browser build through the real keyboard/touch input mapper. It must open Fight, choose a move, observe HP/state change, switch, reach faint and replacement, win, lose, Run from a wild battle, and observe Run rejection in a trainer battle. DOM or debug-state inspection may support assertions but cannot replace visible player input and canvas output.

## Pokemon sprite and data provenance

Every Pokemon shown must resolve to the cached PokeAPI FireRed/LeafGreen asset manifest. The player Pokemon uses its back sprite and the opponent uses its front sprite. The proof records species id, sprite path, sprite SHA-256, cache-manifest SHA-256, and the screenshot in which it appears. SVG substitutes, external Pokemon packs, ROM extracts, colored shapes, wrong-generation sprites, and runtime PokeAPI fetches are automatic failures.

## Required browser states

Capture through the production renderer into `.buildprint/screenshots/`:

- `battle-command-desktop-1280.png`
- `battle-move-menu-desktop-1280.png`
- `battle-hp-status-desktop-1280.png`
- `battle-faint-desktop-1280.png`
- `battle-victory-desktop-1280.png`
- `battle-command-mobile-375.png`
- `battle-move-menu-mobile-375.png`
- `battle-faint-mobile-375.png`
- `battle-victory-mobile-375.png`

Desktop proof uses a 1280px browser viewport and a crisp 480x320 canvas (2x of the 240x160 logical viewport). Narrow proof uses a 375px browser viewport and a discrete integer game scale. Record viewport, canvas dimensions, fixture id, seed, state/event hash, screenshot hash, and capture command. Screenshots fail on fractional blur, clipping, overlap, unreadable labels, hidden focus, wrong sprite facing, broken HP fill, proof/debug leakage, or page-level overflow.

## Independent visual review

The implementing agent cannot issue the final visual verdict. A fresh-context or external reviewer receives only the built game, current claim, design artifacts, fixture manifest, generated proof, screenshots, and browser trace.

Before recording pass/fail, the reviewer writes `.buildprint/battle-visual-review.md` and `.buildprint/reviewer-attestations/battle.json`; the proof generator may never create or modify either file. The review names the five worst visible flaws. The attestation records reviewer run/session identity, all implementer run/session identities, the reviewed clean commit and source-manifest hash, exact input-artifact hashes, the five findings, verdict, and timestamp. Reviewer identity must not overlap any implementer identity. The review checks:

1. GBA-faithful hierarchy: Pokemon and battle state dominate, browser chrome and proof data do not
2. sprite facing, grounding, scale, crispness, and silhouette separation
3. HP/name/level/status readability across green, yellow, red, faint, and long-content states
4. command and move-menu selection, focus visibility, PP/type presentation, and input comprehension
5. message-box line wrapping, pacing, transition continuity, and no stale text
6. 1280px and 375px composition, safe areas, touch controls, overflow, clipping, and overlap

Findings use `critical`, `high`, `medium`, or `low`. Any unresolved critical or high finding fails the phase. Automated image checks can detect blank, duplicate, stale, or dimensionally invalid captures; they cannot certify visual quality.

## Generated evidence binding

`npm run battle:proof -- --collect` writes the fixtures, event log, trace, screenshots, and indexes but cannot emit a passing final proof. The independent reviewer then writes the review and attestation. `npm run battle:proof -- --finalize` consumes those files read-only and writes the final proof:

- `.buildprint/battle-fixtures.json`
- `.buildprint/battle-event-log.json`
- `.buildprint/traces/battle-slice.zip`
- `.buildprint/battle-slice-proof.json` generated last

The independent reviewer, not `battle:proof`, writes `.buildprint/battle-visual-review.md` and `.buildprint/reviewer-attestations/battle.json`. The generator consumes them read-only when producing the final proof.

The final proof binds at least:

```json
{
  "commit": "clean git commit sha",
  "source_manifest_sha256": "...",
  "fixture_manifest_sha256": "...",
  "pokeapi_manifest_sha256": "...",
  "event_log_sha256": "...",
  "final_state_sha256": "...",
  "browser_trace_sha256": "...",
  "screenshot_index_sha256": "...",
  "visual_review_sha256": "...",
  "reviewer_attestation_sha256": "...",
  "status": "pass | fail | blocked"
}
```

Certification requires a clean Git commit. A dirty worktree may emit diagnostics but never `status: pass`. Generate a deterministic, sorted source manifest of normalized `path + SHA-256` entries covering production source, proof/verifier scripts, fixtures, configs, manifests, dependency lockfile, and assets. Reject relevant untracked files, omissions, absolute/out-of-root paths, and symlinks.

`npm run battle:proof:verify -- --recompute` ignores the existing final proof, reruns both deterministic fixtures in fresh processes, recomputes all referenced hashes and gates, and compares normalized event logs, final states, screenshot semantics, and asserted browser states byte-for-byte. The submitted raw trace ZIP remains a hash-bound diagnostic artifact; the verifier confirms its recorded hash and existence but does not require a newly generated ZIP to be byte-identical because archive metadata and browser timing are nondeterministic. Fresh reruns compare normalized semantic events with timestamps, trace ids, ZIP metadata, and render timing excluded. The verifier validates attestation binding and identity independence; it does not pretend to recompute aesthetic judgment. A source, fixture, data, sprite, screenshot, design-contract, review, or attestation change invalidates the proof.

## Automatic failure conditions

- a demo/proof-only scene, reducer, renderer, input path, or hardcoded outcome
- direct post-launch battle-state or HP mutation by the fixture
- only unit tests, prose, or screenshots with no input-driven production trace
- hand-authored pass JSON or a recompute mismatch
- dirty-worktree pass, incomplete source manifest, relevant untracked file, symlinked input, or manifest/commit mismatch
- nondeterministic event/final-state hashes for identical seed and commands
- missing wild or trainer flow, switch, faint, EXP, type, victory/loss, or Run rules
- missing/wrong PokeAPI front/back sprite or stale asset hash
- implementing-agent self-approval, missing/mismatched reviewer attestation, identity overlap, generator-written review files, missing five-worst-flaws section, or unresolved critical/high visual finding
- proof/debug controls or evaluator language visible in the player surface

## Claim ceiling

Without a current recomputed pass, maximum maturity remains `data_pipeline`. A battle that works mechanically but lacks independent visual approval is not `battle_core`. Passing this scoped contract certifies `battle_core`; it does not prove Pallet Town, Route 1 integration, story progression, or the full game.
