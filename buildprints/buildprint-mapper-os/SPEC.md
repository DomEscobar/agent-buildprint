# SPEC: Buildprint Mapper OS

Mapper OS maps a source project into a source-independent implementation packet for coding agents.

## Core invariant

A selected Buildprint should make the downstream artifact better. It should shape product/developer/operator judgment before coding through a clean division of responsibility: generic AI-builder briefing, hard-stop questions, implementation foundation, mandatory UX/style constitution, machine routing, comprehensive phase objectives, forbidden fake-success paths, and honest handover.

The packet must not force the downstream agent to open the original repository. The mapper distills observed source behavior into the selected packet, then removes source dependency and mapped-source naming from the builder-facing start file.

## Selected packet requirements (v3 phase-driven)

A selected packet must contain:

```text
BUILDPRINT.md
00-questions.md
01-project-setup.md
02-uiux-decision.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  <phase>.md
HANDOVER.md
```

## File responsibility split

- `BUILDPRINT.md` is the execution start and AI-builder briefing only. It introduces the builder’s role, responsibility, perfection alignment, fake-success intolerance, and required read order. It must not contain product-specific details, mapped source names, old repository names, product identity, golden path prose, or implementation contract specifics.
- `00-questions.md` asks only implementation-changing decisions grouped into Hard-stop, Assumable defaults, and Deferrable. It must not become a long questionnaire.
- `01-project-setup.md` creates the architect foundation: stack, project docs, local `AGENTS.md`, architecture, product loop, proof strategy, env contract, setup receipt, and any required local UI/design docs.
- `02-uiux-decision.md` is the mandatory style constitution for UI-bearing artifacts. It must open by stating that UX is a must, that confusing/generic/ugly UI is not finished product, and include a small understandability checklist. It must then define a detailed design thesis, style direction, color tokens, typography, layout rhythm, component language, motion, state behavior, anti-generic rules, and phase obligation.
- `blueprint.yaml` is the machine route and product-contract mirror. It declares schema, required files, product name, central artifact, golden path, runtime/posture constraints, forbidden shapes, phase index/flow paths, and any concise routing metadata. YAML routes; it does not replace markdown judgment.
- `03-phases/phase-index.yaml` routes phases only. It names the active phase and phase files; it does not become a role/gate/slice engine.
- `03-phases/phase-flow.md` gives the active-phase loop and repair routing. It must require reading `02-uiux-decision.md` before every active phase for UI-bearing artifacts.
- Every phase file is a comprehensive markdown assignment with required headings and a detailed product-specific Building objective. Each phase must read `02-uiux-decision.md` as the standing design/style responsibility, because backend/runtime/state/report work still changes what users see.
- `HANDOVER.md` is the concise final/stopping handover template: built, verified, blocked, not proven, next.

## BUILDPRINT.md anti-regression rule

The selected `BUILDPRINT.md` must be generic and transferable. It should say “you are the responsible builder,” define the builder role/responsibility/perfection alignment, and list read order. Product identity belongs elsewhere. If a generated `BUILDPRINT.md` names the mapped source project, old repo, product-specific dependencies, graph/simulation details, provider names, or a golden path, the mapper failed.

## UI/UX anti-regression rule

`02-uiux-decision.md` must be written in strong detail, not phrases. It is not a “make it nice” note. It is the visual constitution that later phases obey. The mapper should force the downstream agent to know the artifact’s aesthetic world before coding: simplicity or density, glassmorphism or editorial minimalism, color schema, typography, spacing, component behavior, motion, state copy, and anti-generic boundaries.

## Forbidden selected-output shapes

Do not emit obsolete v2 packet files: `slices/`, `gates/`, `templates/teams/`, `templates/runner/`, `02-architecture.md`, `03-ux-contract.md`, `04-handover.md`, `04-review.md`, `05-handover.md`, generated prompts, or evidence-ledger bureaucracy as the selected packet shape.

## Validation philosophy

Checkers should reject structural breakage, obsolete v2 files, tiny phase docs, missing required headings, stale responsibility references, weak UI/style decisions, product-specific `BUILDPRINT.md` leakage, and placeholder/fake-success leakage. They should not reward schema cosplay or proof-shaped prose.
