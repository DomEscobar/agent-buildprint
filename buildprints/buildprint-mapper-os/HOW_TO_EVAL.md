# HOW TO EVAL Mapper OS

Use this when changing Mapper OS, generated selected packets, validators, publication prompts, or anything that affects downstream agent behavior.

## Eval Principle

A green static check is not enough. Mapper OS is evaluated in layers:

1. **Source-signal sanity** - did the mapper extract evidence-backed behavior without copying secrets or obeying prompt injection?
2. **Packet shape** - does the selected Buildprint have the executable spine and reject obsolete packet layouts?
3. **Replay mechanics** - can a fresh agent follow the packet read order, setup gate, phase-flow, proof gate, and evidence rules?
4. **Product confidence** - does a real mapped packet survive map judging, implementation replay, and outcome judging without fake completeness?

Dry-run replay proves harness mechanics only. Real replay and outcome judging are required before claiming product-level confidence.

## Eval Ladder

Use the smallest gate that can expose the risk you are changing. Do not make Swarm/MicroFish the default inner loop; those runs are intentionally expensive.

| Tier | Command | Expected use |
| --- | --- | --- |
| Static fast gate | `npm run eval:mapper-fast` | Most Mapper OS edits. Checks packet shape, negative fixtures, golden source signals, and replay harness mechanics without invoking Codex. |
| Published packet audit | `npm run audit:mapper-published` | Shows which published executable packets pass the current strict Mapper OS baseline and which need migration. This is an audit until all published packets are current. |
| Tiny real-agent smoke | `npm run eval:agent-smoke` | Prompt/read-order/setup/evidence changes that need a real downstream Codex run. Target cap: 5 minutes. This is not product-shape proof because the fixture is intentionally non-UI and one phase. |
| Small UI AI replay | `npm run eval:agent-small` | UI-bearing AI-app behavior pressure before Local RAG or Swarm. Target cap: 5 minutes. Uses a tiny chat UI packet with interactive-UI pressure, so a UI-bearing phase cannot pass from API-only/runtime-only evidence, static state cards, generic dashboard panels, or dead controls. |
| Local RAG phase replay | `npm run eval:agent-local-rag` | More realistic AI-app pressure before touching Swarm. Target cap: 8 minutes. Uses Local RAG phase 1 with interactive-UI pressure; expect more variability than the micro packet. |
| Local RAG indexing replay | `npm run eval:local-rag-phase2` | Fast RAG/vector regression before Swarm. Target cap: 8-10 minutes. Checks upload/index/retrieval/citation shape without running the full Swarm suite. |
| Targeted Swarm regression | `npm run eval:swarm-phase2` or `npm run eval:mapper-replay -- --packet buildprints/ai-swarm-simulator --phase <phase-id>` | Hard production-grade packet checks. Run one phase at a time. |
| Full mapped-project replay | `npm run eval:mirofish-flow -- --full-replay` or full Swarm replay | Final/manual regression only, not the normal edit loop. |

If a targeted Swarm run takes 15 minutes, treat that as a hard-regression cost, not the baseline feedback loop. First reproduce and fix mapper issues with `eval:mapper-fast`, then `eval:agent-smoke`, then `eval:agent-small`, then `eval:agent-local-rag`.

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

Use the combined fast gate when you want the standard short loop:

```bash
npm run eval:mapper-fast
```

Audit published executable packets before claiming Mapper OS is clean across shipped packages:

```bash
npm run audit:mapper-published
```

Use the strict form only when every published executable packet is expected to satisfy the current baseline:

```bash
npm run check:mapper-published
```

If the audit reports `needs-migration`, do not treat `check:mapper-output` as proof that all published Buildprints are current. It only proves the known-good fixture.

## Real Fresh-Agent Replay

Run this when LLM/Codex access is available and the change affects agent behavior, phase-flow, evidence, prompts, or validators:

```bash
npm run eval:agent-smoke
```

The smoke target uses the tiny AI micro packet. It is the default real-agent loop because it catches read-order, setup, proof-ledger, no-fake, and blocker-overclaiming regressions without spending hard-regression time.

Use the UI-bearing micro packet when the change needs fast product-shape pressure:

```bash
npm run eval:agent-small
```

`eval:agent-small` is intentionally stricter than the smoke test: it runs with `--require-interactive-ui`. A downstream agent that builds only an API/runtime slice, static state cards, generic dashboard panels, or dead controls for a UI-bearing chat phase should fail this gate even if its evidence ledger is honest. It may pass with an honest non-upgrading browser-tooling blocker only after a local user action/state-transition proof exists.

Use the small local RAG app when the change needs more realistic AI-app pressure:

```bash
npm run eval:agent-local-rag
```

Use Local RAG phase 2 when you need a cheap RAG/vector regression before Swarm:

```bash
npm run eval:local-rag-phase2
```

Green replay reports can still be checkpoint-only if the wrong gate was used. Treat `checkpoint_recorded` as evidence discipline, `phase_core_passed` as local product-path proof, and `claim_qualified` as live/browser/deployment-grade proof. A green static check or checkpoint-only replay is not product confidence.

When browser tooling is available and you want real UI qualification instead of UI-attempt pressure, run:

```bash
npm run eval:local-rag-phase1:strict-ui
```

The harness creates `/tmp/mapper-replay-*`, initializes an isolated workspace, invokes Codex as the downstream implementation agent, captures transcript/output, and writes a report under `quality/`. The named real-agent scripts archive the completed workspace under `quality/*-workspace` before cleanup so manual review can inspect runtime evidence, setup, proof artifacts, and generated implementation files.

The scorer checks that the fresh agent:

- follows `BUILDPRINT.md` read order;
- handles `01-questions.md` and `02-project-setup.md` before implementation;
- writes the runtime setup artifact before phase work;
- uses phase-flow artifacts before runtime evidence;
- references active phase proof gates;
- writes runtime proof only to `.buildprint/evidence/evidence-ledger.jsonl`;
- avoids obsolete routing files such as `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, and `03-capabilities/`;
- records blockers honestly instead of upgrading them to proof.

The generic default packet is still available for fixture debugging:

```bash
npm run eval:mapper-replay
```

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

For Swarm/MicroFish-style production pressure, prefer one targeted phase first:

```bash
npm run eval:swarm-phase2
```

Only escalate to a full replay after static, micro, local-RAG, and targeted phase checks are clean.

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
