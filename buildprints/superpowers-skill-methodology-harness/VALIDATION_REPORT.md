# Validation Report

## Package validation

- Source repo cloned and inspected at `obra/superpowers` commit `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`.
- Source evidence was mapped into `SOURCE_TRACE.md`.
- Buildprint package files are served from the canonical source via `/buildprints/superpowers-skill-methodology-harness/files/*`.
- Website build verifies routing and package manifest generation.

## Clean-room proof

Status: `validated` with scoped compact proof.

A fresh Codex run bootstrapped the live Buildprint package with `agb start` and built a clean-room neutral Node.js proof from `.buildprint/snapshots` only. The proof models the inspired/adaptive methodology harness, not an official Superpowers plugin clone and not a production runtime adapter.

Proof files are included under `proof/`.

## Commands run

From `/tmp/sp-codex-proof`:

```bash
npm test
node src/run-evals.js
```

Results:

- `npm test`: 6/6 subtests passed.
- `node src/run-evals.js`: 5/5 transcript evals passed, 0 failed.

## Eval coverage

- Clean-session acceptance prompt `Let's make a react todo list` loads bootstrap, performs skill lookup, activates brainstorming, and blocks implementation before design approval.
- Bootstrap is idempotent across turns.
- Approved design can transition into an exact implementation plan.
- TDD gate blocks production changes before a failing test event.
- Subagent loop dispatches task-specific context and performs spec review before code-quality review.
- Debugging prompt records root-cause evidence before a fix path.
- Completion blocks without verification evidence and passes after evidence is recorded.

## Claim boundary

Validated claim: the Buildprint can produce a runnable clean-room methodology-harness proof with transcript evals.

Not claimed:

- official `obra/superpowers` compatibility,
- exact plugin clone,
- production Claude/Codex/OpenCode/Gemini/Cursor adapter,
- real git worktree manager,
- real subagent API integration,
- full upstream feature parity.

## Remaining hardening

- Add a real runtime adapter for one agent CLI.
- Add filesystem artifact writing for generated specs/plans.
- Add worktree abstraction with dry-run tests.
- Add transcript fixture snapshots and destructive/external-action approval gates.


---

## Consolidated notes from `CRITICAL_REVIEW.md`

# Critical Review

Date: 2026-05-17

## Verdict

The proof satisfies the Buildprint validation target for a compact clean-room reversal proof: it is runnable, test-covered, transcript-oriented, and demonstrates inspired/adaptive behavior without copying upstream source.

## What Works

- Session bootstrap is idempotent and precedes skill lookup.
- Skill registry is machine-readable and prompt-routed before action.
- The acceptance prompt activates brainstorming and blocks code before design approval.
- Approved design can transition into a plan with exact paths, test files, and TDD steps.
- TDD blocks production changes before a failing test event.
- Systematic debugging records root-cause evidence before a fix path.
- Subagent orchestration uses task-specific packets and enforces spec review before quality review.
- Completion requires verification evidence.
- Transcript eval runner covers the minimum eval matrix from the snapshots.

## Constraints Honored

- No external messages were sent.
- No network dependencies were added.
- No source from `obra/superpowers` was copied.
- Implementation was derived from `.buildprint/snapshots` only.

## Limitations

- The harness simulates agent behavior; it is not a Claude/Codex/Gemini/Cursor adapter.
- It does not actually write generated spec/plan docs during workflow execution; it records the expected contract paths in transcript data.
- It does not create isolated git worktrees. The Buildprint mentions worktrees as runtime behavior, but the requested compact proof focuses on registry, gates, subagent contracts, and evals.
- The TDD proof uses event-gated implementation calls rather than intentionally failing a real product test first. This keeps the package compact while still testing the methodology invariant.

## Recommended Next Hardening

- Add a filesystem artifact writer for approved specs and plans.
- Add a real adapter boundary for one agent runtime.
- Add transcript fixture snapshots to prevent event schema drift.
- Add a worktree abstraction with dry-run tests.
- Expand evals for destructive/external action approval gates.


---

## Consolidated notes from `TRANSCRIPT_EVAL_REPORT.md`

# Transcript Eval Report

Date: 2026-05-17

## Scope

This is a clean-room runnable proof for the Superpowers Skill Methodology Harness Buildprint snapshots under `.buildprint/snapshots`. It does not copy `obra/superpowers` source. The proof models the methodology as a neutral Node.js harness with machine-readable skill metadata, transcript events, hard gates, and an eval runner.

## Commands Run

```bash
npm test
npm run eval
```

Both commands passed locally.

## Eval Results

`npm run eval` reported:

- Passed: 5
- Failed: 0

Covered scenarios:

- `Let's make a react todo list` loads bootstrap, performs skill lookup, activates brainstorming, and blocks implementation before approved design.
- TDD gate blocks production implementation before a failing test is observed.
- Subagent loop dispatches task-specific context only, then performs spec review before code-quality review.
- Debugging prompt records root-cause evidence before any fix path.
- Completion prompt blocks without verification evidence and passes after `npm test` evidence is recorded.

## Acceptance Evidence

For the required acceptance prompt, the transcript order is:

1. `bootstrap_loaded`
2. `skill_lookup` with `using-superpowers`, `brainstorming`, and `test-driven-development`
3. `skill_activated` for `brainstorming`
4. `gate` for `no_code_before_approved_design`
5. `brainstorm_options`

No `production_change` event is present in that transcript.

## Files

- `package.json`
- `src/skills.js`
- `src/transcript.js`
- `src/harness.js`
- `src/subagents.js`
- `src/eval.js`
- `src/run-evals.js`
- `tests/harness.test.js`

## Residual Risk

This is a compact proof harness, not a production runtime adapter. It validates behavior shaping and transcript contracts, but it does not integrate with a real agent tool API, git worktree manager, or filesystem-writing runtime.
