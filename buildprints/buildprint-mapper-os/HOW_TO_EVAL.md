# HOW TO EVAL Mapper OS

Use this when changing Mapper OS, generated selected packets, validators, publication prompts, or anything that affects downstream agent behavior.

## Eval Principle

A green static check is not enough. Mapper OS is evaluated in layers:

1. **Source-signal sanity** — did the mapper extract evidence-backed behavior without copying secrets or obeying prompt injection?
2. **Packet shape** — does the selected Buildprint have the executable spine and reject obsolete packet layouts?
3. **Replay mechanics** — can a fresh agent follow the packet read order, setup gate, phase-flow, proof gate, and evidence rules?
4. **Product confidence** — does a real mapped packet survive map judging, implementation replay, and outcome judging without fake completeness?

Dry-run replay proves harness mechanics only. Real replay and outcome judging are required before claiming product-level confidence.

## Fast Local Gate

Run this before committing most Mapper OS edits:

```bash
npm test
```

`npm test` includes:

- `npm run check:spine`
- `npm run check:publication`
- `npm run check:mapper-output`
- `npm run check:mapper-output:negative`
- `npm run eval:mapper-golden`
- `npm run eval:mapper-replay:dry-run`
- CLI smoke checks for `agb check` and `agb start`

If `npm test` fails, fix the invariant behind the failure. Do not patch only the current fixture unless the fixture is wrong.

## Mapper-Specific Gates

Run these individually while debugging:

```bash
npm run check:mapper-output
npm run check:mapper-output:negative
npm run eval:mapper-golden
npm run eval:mapper-replay:dry-run
```

What they mean:

- `check:mapper-output` verifies the known-good executable selected packet shape.
- `check:mapper-output:negative` verifies bad packet shapes fail for the right reasons.
- `eval:mapper-golden` checks source-signal extraction fixtures and writes `quality/mapper-eval-report.json`.
- `eval:mapper-replay:dry-run` checks replay harness mechanics without invoking a real coding agent.

## Real Fresh-Agent Replay

Run this when LLM/Codex access is available and the change affects agent behavior, phase-flow, evidence, prompts, or validators:

```bash
npm run eval:mapper-replay
```

The harness creates `/tmp/mapper-replay-*`, initializes an isolated workspace, invokes Codex as the downstream implementation agent, captures transcript/output, and writes `quality/mapper-replay-report.json`.

The scorer checks that the fresh agent:

- follows `BUILDPRINT.md` read order;
- handles `01-questions.md` and `02-project-setup.md` before implementation;
- uses phase-flow artifacts before runtime evidence;
- references active phase proof gates;
- writes runtime proof only to `.buildprint/evidence/evidence-ledger.jsonl`;
- avoids legacy routing files such as `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, and `03-capabilities/`;
- records blockers honestly instead of upgrading them to proof.

## Full Flow Evals

Use these for mapped-project confidence, not for every small doc edit:

```bash
npm run eval:mirofish-flow
npm run eval:personal-agent-flow
npm run eval:taxhacker-flow
```

Cost-capped default mode maps and judges the packet. Use full replay only when product-level confidence is required:

```bash
npm run eval:mirofish-flow -- --full-replay
npm run eval:personal-agent-flow -- --full-replay
npm run eval:taxhacker-flow -- --full-replay
```

These flows produce artifacts under `quality/`, including packet checks, deterministic map checks, judge JSON, transcripts, replay reports, and outcome judge results.

## Website / Publication Prompt Gate

After changing `publication.json`, prompts, package files, or public copy, verify both source and website paths:

```bash
npm run check:publication
cd /root/AGB-website
BUILDPRINTS_SOURCE=/root/blueprint/buildprints npm run check:buildprints
BUILDPRINTS_SOURCE=/root/blueprint/buildprints npm run build
npm run check:codex-drift
```

For executable packets, `copyPrompt` must bootstrap exact snapshots before naming packet files:

```text
First bootstrap exact snapshots: agb start https://agent-buildprint.com/buildprints/<slug>/package.json .
Then read .buildprint/next-agent.md and continue.
Do not write Buildprint snapshots manually.
```

## Completion Evidence

When reporting done, include:

- commit hash if pushed;
- exact gates run;
- pass/fail status;
- important artifacts, e.g. `quality/mapper-eval-report.json`, `quality/mapper-replay-report.json`, flow judge JSON;
- skipped gates and why;
- known blockers or proof gaps.

Do not claim Mapper OS behavior is fixed from a single static check if replay, publication, or live package behavior could still contradict it.
