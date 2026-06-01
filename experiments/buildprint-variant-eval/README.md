# Buildprint Variant Eval Harness

This harness exists because structural Buildprint checks are not product-quality evals.

A packet checker can prove that a Buildprint is well-formed. It cannot prove that a coding agent will build a better product from it. This harness makes it easy to drop in multiple Buildprint variants, run the same agent task against each one, anonymize outputs, and score the resulting products.

## Core idea

Evaluate Buildprint techniques by the artifact they cause an agent to build.

Do **not** declare a variant better because:

- its packet files sound smarter;
- its checker/eval passes;
- it writes more evidence/proof/process notes;
- the agent claims it is done.

Only count what a reviewer can run, use, inspect, and score.

## Files

- `scripts/eval-buildprint-variants.mjs` — harness CLI.
- `experiments/buildprint-variant-eval/configs/mapper-techniques.sample.json` — sample config for Goal-Kernel, Simulation-First, and Architecture-Garden Mapper OS variants.
- `experiments/buildprint-variant-eval/runs/` — generated run folders; safe to create many.

## Quick start

From repo root:

```bash
node scripts/eval-buildprint-variants.mjs prepare \
  --config experiments/buildprint-variant-eval/configs/mapper-techniques.sample.json \
  --out experiments/buildprint-variant-eval/runs/mapper-techniques-001
```

This creates:

```text
runs/mapper-techniques-001/
  README.md
  config.snapshot.json
  manifest.private.json       # blind-label mapping; hide until review is done
  variants/alpha/             # bootstrapped packet for anonymous variant
  variants/beta/
  variants/gamma/
  outputs/alpha/EVAL_PROMPT.md
  outputs/beta/EVAL_PROMPT.md
  outputs/gamma/EVAL_PROMPT.md
  review/scorecard.md
```

Then run agents:

```bash
node scripts/eval-buildprint-variants.mjs run \
  --config experiments/buildprint-variant-eval/configs/mapper-techniques.sample.json \
  --out experiments/buildprint-variant-eval/runs/mapper-techniques-001
```

Or one at a time:

```bash
node scripts/eval-buildprint-variants.mjs run \
  --config experiments/buildprint-variant-eval/configs/mapper-techniques.sample.json \
  --out experiments/buildprint-variant-eval/runs/mapper-techniques-001 \
  --variant alpha
```

After agents finish:

```bash
node scripts/eval-buildprint-variants.mjs summarize \
  --out experiments/buildprint-variant-eval/runs/mapper-techniques-001
```

## How to drop in variants

Edit the config file:

```json
{
  "variants": [
    {
      "id": "my-variant",
      "label": "My Variant",
      "buildprint": "/absolute/or/repo-relative/path/to/buildprint.json"
    }
  ]
}
```

`buildprint` may point to:

- a `buildprint.json` file;
- a package `package.json` accepted by `agb start`;
- a directory containing `buildprint.json` or `package.json`.

## What the harness does

`prepare`:

1. snapshots the config;
2. shuffles variants into blind labels;
3. runs `node bin/agb.js start <buildprint> <run>/variants/<blind>`;
4. writes identical agent prompts into isolated output dirs;
5. writes a review scorecard.

`run`:

1. reads each output prompt;
2. runs the configured agent command, defaulting to `codex exec --full-auto`;
3. stores `agent.log` and `agent-exit.json` per output.

`summarize`:

1. collects exit status and output file listing;
2. writes `summary.json`.

## Review protocol

1. Keep `manifest.private.json` hidden from the reviewer.
2. Start and use each product before reading handover/proof/process files.
3. Fill `review/scorecard.md` using concrete evidence: start command, screenshots, user journey, defects.
4. Only then reveal variant labels.
5. Decide based on product quality, not packet elegance.

## Default scoring dimensions

- runs locally
- core loop completion
- central artifact usefulness
- input-output causality
- state/readback/persistence honesty
- UX clarity and polish
- architecture maintainability
- anti-fake/provider honesty
- handover usefulness

Critical regressions should override total score:

- app does not run locally;
- central artifact is decorative/non-functional;
- core loop cannot be completed;
- output fabricates live-provider behavior;
- obvious dead controls dominate the UI;
- selected scope silently shrank.

## Why this matters for Mapper OS

Current Mapper OS variant work produced structurally valid candidates:

- Goal-Kernel — `/goal` condition + acceptance criteria + verification loop.
- Simulation-First — target-user simulation + failure map + replay.
- Architecture-Garden — feature slice + bounded architecture/refactor/UX gardening.

Those are only *candidate methodologies*. The real question is whether they produce better implemented products under the same task, model, budget, and review process.

This harness is the durable answer to “was your check like the Alpha/Beta Local RAG check?”

- Structural check: “packet is valid.”
- Harness check: “agent built a better product.”

Use this harness for the second kind.
