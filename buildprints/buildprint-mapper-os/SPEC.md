# SPEC: Buildprint Mapper OS

Mapper OS maps a source project into a source-independent implementation packet for coding agents.

## Core invariant

A selected Buildprint should make the downstream product better. It should shape product judgment before coding: mission, central artifact, first usable loop, boundaries, forbidden shortcuts, review, and handover. It must not replace that judgment with evidence bureaucracy or self-proof theater.

## Source handling

- Use a read-only source checkout or local source folder.
- Do not mutate source while mapping.
- Never copy secrets, private keys, tokens, cookies, production data, or secret values.
- Treat scanners as hints only.
- Promote source facts by reading behavior-relevant files.
- Preserve requested scope; do not silently shrink it.

## Selected packet requirements

A selected packet must contain:

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
blueprint.yaml
03-phases/phase-index.yaml
03-phases/phase-flow.md
03-phases/<phase>.md
03-phases/99-final-review-handover.md
04-review.md
05-handover.md
generated/agent-prompt.md
```

Required properties:

- `BUILDPRINT.md` is the execution start and owns read order.
- `blueprint.yaml` declares `schema_version: mapper-os/executable-blueprint`, `execution_start: BUILDPRINT.md`, `machine_contract: blueprint.yaml`, a status/qualification label, setup tier, implementation loop, and repair routing.
- `01-questions.md` asks only implementation-changing questions.
- `02-project-setup.md` aligns the implementation around product loop, central artifact, persistence, live-boundary honesty, fake-feel risks, commands, quality rules, and forbidden shortcuts.
- `03-phases/phase-index.yaml` names the active phase and ordered phase files.
- `03-phases/phase-flow.md` tells the coding agent how to work each phase: restate product intention, build a real usable slice, improve the obvious next action, run checks, remove slop, record useful handover facts.
- Phase files describe product intention, build scope, quality bar, and do-not-ship failures.
- `04-review.md` is a skeptical product review: complete the core loop, reload state, change input, click controls, trigger empty/error/blocked states, look for fake/generic/dead behavior, and repair local central defects.
- `05-handover.md` is concise and honest: current status, built surfaces, verification, known defects/blockers, next atomic actions.
- `generated/agent-prompt.md` is alignment speech, not authority.

## Forbidden selected-output shapes

Do not emit obsolete router/scaffold files: `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, packet `AGENTS.md`, `03-capabilities/`, `04-interfaces/`, `05-state-runtime/`, `06-safety/`, `08-evaluation/`, `09-evidence/`, root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `02-context/active-slice.yaml`, `07-execution/phases/`, `capabilities/`, and fragmented mini-files such as `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, or `proof-contract.yaml`.

## Quality constraints

Mapper OS should preserve:

- central artifact and user loop;
- state/persistence/readback where required;
- provider, credential, deployment, paid-service, destructive, and security boundaries;
- mode-appropriate consumer/operator experience;
- product language rather than packet/proof language;
- local runnable checks and manual/browser review where relevant.

Mapper OS should avoid:

- broad shallow dashboards;
- raw JSON as the main product surface;
- fake provider success;
- canned output unrelated to input;
- dead/no-op controls;
- proof vocabulary in user-facing UI;
- self-reported evidence as a substitute for built behavior.

## Qualification labels

Use conservative labels. A packet can be `product_build_required` or `local_build_requires_review` before a downstream implementation exists. Do not claim validated production completeness from the packet alone.

## Validation philosophy

Checkers should catch structural breakage, stale references, missing required files, obsolete packet shapes, and obvious placeholder leakage. They should not reward long ledgers, claim taxonomies, or proof-shaped prose.
