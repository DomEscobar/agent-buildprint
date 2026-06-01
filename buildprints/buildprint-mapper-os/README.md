# Buildprint Mapper OS

Use this Buildprint to map a source project into a source-independent Buildprint package.

Mapper OS is run by an agent. It reads source, classifies the artifact type, distills mode-appropriate obligations, and produces either discovery output or a selected `selected-buildprint/` execution packet. The current direction is typed product-quality: the packet should improve downstream artifact quality for the real consumer, not maximize proof/evidence paperwork.

## Start Here

Read:

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `PLAN.md`

For generated selected packages, downstream implementers should not read all Markdown files upfront. They should read: `BUILDPRINT.md`, `01-questions.md`, `generated/agent-prompt.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, then only the active phase named by the phase index.

## Default Behavior

- Discover first.
- Ask only blocking or implementation-changing questions.
- Treat scanner output as hints only.
- Keep output discovery-only until scope is selected.
- Preserve requested scope; do not hide broad, blocked, or unbuilt behavior.
- Produce executable Buildprint packets for selected outputs.
- Shape the downstream agent as a senior product/developer/operator engineer: artifact type, real consumer, central artifact/interface/boundary, first usable loop, v4 product-system spine where relevant, honest boundaries, forbidden shortcuts, skeptical review, concise handover.

## Selected Output

Selected output belongs under `selected-buildprint/`. Mapper OS output must be an executable Buildprint:

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  01-<phase-id>.md
  ...
  99-final-review-handover.md
04-review.md
05-handover.md
generated/
  agent-prompt.md
```

`BUILDPRINT.md` is the execution start and read-order authority. `blueprint.yaml` is the machine contract. `01-questions.md` captures only implementation-changing questions. `02-project-setup.md` aligns artifact type, real consumer, first loop, central artifact/interface/boundary, persistence/traces/readback, live-boundary honesty, fake-feel risks, commands, quality rules, and forbidden shortcuts. `03-phases/` owns active usable implementation slices. `04-review.md` defines skeptical artifact review. `05-handover.md` defines concise handoff.

Obsolete selected-output shapes are not accepted: root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `02-context/active-slice.yaml`, `07-execution/phases/`, `capabilities/`, `05-evidence/`, `09-evidence/`, and per-capability mini-files.

## Qualification

Qualification is source-independent readiness for a downstream build. It is not proof that a future implementation already works. Built product quality must be judged from actual implementation output, not self-reported evidence prose.
