# Buildprint Mapper

Buildprint Mapper is an agent-session workflow for mapping an existing source repo into a source-independent executable Buildprint.

The selected packet is **kernel v1** (`buildprint/kernel/v1`, style `kernel_loop`). Obsolete runner-shaped abstractions and phase-driven comprehensive spines are gone. Mapper emits short loop manuals: YAML routes; Markdown teaches and builds.

## Use it

1. Open the source repo or provide a repo URL/path to the agent.
2. Bootstrap this package if needed:

```bash
agb start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json ./mapper-os
```

3. Follow `.buildprint/next-agent.md` and the Buildprint Mapper docs.
4. Discover behavior before selecting scope.
5. Emit a kernel selected packet.

## Selected packet shape

```text
BUILDPRINT.md
00-goal.md
01-setup.md
02-identity.md
blueprint.yaml
loops/
  loop-index.yaml
  loop-flow.md
  01-<loop>.md
  02-<loop>.md
review.md
README.md
HANDOVER.md
```

## Packet principles

- Kernel: goal → bare agentic loop → optional independent fan-out → contract review.
- `BUILDPRINT.md` is the generic AI-builder briefing. No product specifics or mapped-source names.
- `00-goal.md` locks observable goal, acceptance criteria, and hard stops.
- `01-setup.md` creates minimal foundation and local skill harness before identity or loop work.
- `02-identity.md` is UI/operator identity (or explicit `not-ui-bearing`).
- `blueprint.yaml` routes and mirrors concise product contract facts, including optional maturity upgrades.
- Loops are named runnable product paths — not phase paperwork.
- `review.md` requires an independent reviewer against the goal and loop contracts.
- `README.md` is the product-facing README for the selected artifact.
- `HANDOVER.md` captures built, verified, blocked, not-proven, and next actions.

## Forbidden selected-output shapes

Do not emit obsolete v2 shapes, v3 `03-phases/` / `phase_driven_comprehensive*` spines, team capsules, runner specs, generated prompt handoffs, evidence-ledger bureaucracy, claim-gates JSON products, tiny YAML implementation briefs, or product-specific `BUILDPRINT.md` briefings.

## Validate

```bash
node bin/agb.js packet check buildprints/buildprint-mapper-os
npm run eval:mapper-overhaul
```
