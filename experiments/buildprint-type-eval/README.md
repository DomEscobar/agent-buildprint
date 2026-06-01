# Buildprint Type Eval

Purpose: compare **typed Buildprint structures** by the downstream product they cause an agent to build.

Status: **paused after documented champions in both active tracks.** Do not run more random tournament rounds unless there is a concrete synthesis test question. Current synthesis: `SYNTHESIS.md`.

This folder tracks two tournament tracks:

- **Track A — Product App Buildprints:** Microfish normal-user product app/system slice. Current documented champion: Consumer-First Product System / Consumer-First Phased, 47/50. Champion record: `champions/microfish-product-app.md`. Do not spend random rounds here unless there is a concrete synthesis test planned.
- **Track B — Plugin / Integration Buildprints:** CheckoutBridge, a local Stripe-like integration/plugin slice. Current documented champion: Developer-First Framework, 47/50. Champion record: `champions/checkoutbridge-plugin.md`.

The unit under test is:

```text
typed Buildprint structure -> agent behavior -> final product/integration quality
```

## Rules

- Work local-only in `/root/blueprint`.
- No pushes, publishes, deploys, real credentials, or external network calls.
- Run at most one bounded round per incomplete track per wake.
- Prefer Track B until it has a >=47/50 champion.
- Keep scoring harsh; no champion without product evidence.

## Layout

- `targets/` — stable slice briefs and scoring principles.
- `buildprints/<track>/<variant>/` — typed Buildprint structures under test.
- `configs/` — harness configs for blind runs.
- `runs/` — prepared/ran/scored outputs.
- `champions/` — clear champion records once a track reaches target.

## Harness

This eval currently reuses `scripts/eval-buildprint-structure-slices.mjs` because it already provides blind packet copying, equal prompts, isolated output dirs, run logs, summaries, and scorecard templates.

Example:

```bash
node scripts/eval-buildprint-structure-slices.mjs prepare \
  --config experiments/buildprint-type-eval/configs/checkoutbridge-plugin-round-001.json \
  --out experiments/buildprint-type-eval/runs/checkoutbridge-round-001 \
  --seed checkoutbridge-round-001

node scripts/eval-buildprint-structure-slices.mjs run \
  --config experiments/buildprint-type-eval/configs/checkoutbridge-plugin-round-001.json \
  --out experiments/buildprint-type-eval/runs/checkoutbridge-round-001

node scripts/eval-buildprint-structure-slices.mjs summarize \
  --out experiments/buildprint-type-eval/runs/checkoutbridge-round-001
```

Review products before reading handovers/logs. Reveal `manifest.private.json` only after score table is filled.
