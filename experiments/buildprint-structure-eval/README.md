# Buildprint Structure Product-Slice Eval

Purpose: compare **Buildprint structures** by the product an agent builds from them.

This is intentionally not a Mapper OS eval, not a generated-packet eval, and not a prose/checker beauty contest.

## Object under test

```text
Buildprint structure -> agent behavior -> final product slice quality
```

Example first battle:

```text
Same Microfish intake slice brief
  -> Goal-Kernel Buildprint
  -> Simulation-First Buildprint
  -> Architecture-Garden Buildprint
  -> same coding agent/budget builds three products
  -> blind product review scores the final apps
```

## Directory layout

- `buildprints/<slice>/<variant>/` — concrete Buildprint structures to test.
- `configs/*.json` — eval config: product slice, variants, agent command, rubric.
- `runs/<run-id>/` — prepared packets, outputs, logs, scorecards, screenshots.
- `runs/<run-id>/manifest.private.json` — blind-label mapping; do not read before scoring.

## Quick start

Prepare a run:

```bash
node scripts/eval-buildprint-structure-slices.mjs prepare \
  --config experiments/buildprint-structure-eval/configs/microfish-intake.sample.json \
  --out experiments/buildprint-structure-eval/runs/microfish-intake-001 \
  --seed microfish-intake-001
```

Run all variants:

```bash
node scripts/eval-buildprint-structure-slices.mjs run \
  --config experiments/buildprint-structure-eval/configs/microfish-intake.sample.json \
  --out experiments/buildprint-structure-eval/runs/microfish-intake-001
```

Run one variant:

```bash
node scripts/eval-buildprint-structure-slices.mjs run \
  --config experiments/buildprint-structure-eval/configs/microfish-intake.sample.json \
  --out experiments/buildprint-structure-eval/runs/microfish-intake-001 \
  --variant alpha
```

Summarize execution status:

```bash
node scripts/eval-buildprint-structure-slices.mjs summarize \
  --out experiments/buildprint-structure-eval/runs/microfish-intake-001
```

## Review protocol

1. Start/use each product before reading handovers, logs, or proof docs.
2. Perform the same user-smoke path for every output.
3. Score visible product behavior in `review/scorecard.md`.
4. Fill `review/leaderboard.md`.
5. Reveal `manifest.private.json` only after scoring.

## Adding another Buildprint structure

1. Add a directory under `buildprints/<slice>/<new-variant>/`.
2. Include at least `BUILDPRINT.md` and whatever files that structure requires.
3. Add it to the config `variants` array:

```json
{
  "id": "critic-first",
  "label": "Critic-First Buildprint",
  "buildprintDir": "experiments/buildprint-structure-eval/buildprints/microfish-intake/critic-first"
}
```

4. Prepare a new run with a new seed/out dir.

## Critical distinction

A structurally pretty Buildprint can lose. A messy-looking Buildprint can win if it makes the agent build the better product.

The scorecard judges final product qualities: local runnability, first-user loop, slice fidelity, input-output causality, persistence/readback honesty, UX, architecture, verification, anti-fake behavior, and handover usefulness.
