# SPEC: Buildprint Mapper OS

Mapper OS maps a source project into a source-independent implementation packet for coding agents.

## Core invariant

A selected Buildprint should make the downstream artifact better. It should shape product/developer/operator judgment before coding through concrete artifact identity, golden path, project setup, UI/operator decision, comprehensive phase objectives, forbidden fake-success paths, and handover.

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

Required properties:

- `BUILDPRINT.md` is the execution start and owns product identity, artifact shape, golden path, required constants, binding implementation contract, forbidden fake-success paths, read order, and done criteria.
- `00-questions.md` asks only implementation-changing questions grouped into Hard-stop, Assumable defaults, and Deferrable.
- `01-project-setup.md` creates the architect foundation: stack, project docs, local `AGENTS.md`, architecture, product loop, proof strategy, UI identity if relevant, env contract, and setup receipt.
- `02-uiux-decision.md` defines visual/operator experience and anti-generic UI rules for UI-bearing products.
- `03-phases/phase-index.yaml` routes phases only.
- `03-phases/phase-flow.md` gives the simple phase loop and repair routing.
- Every phase file is a comprehensive markdown assignment with the required headings and a detailed product-specific Building objective.
- `HANDOVER.md` is the concise final/stopping handover template.

## Forbidden selected-output shapes

Do not emit v2 slice/gate packet files: `slices/`, `gates/`, `templates/teams/`, `templates/runner/`, `02-architecture.md`, `03-ux-contract.md`, `04-handover.md`, `04-review.md`, `05-handover.md`, generated prompts, or evidence-ledger bureaucracy as the selected packet shape.

## Validation philosophy

Checkers should reject structural breakage, obsolete slice/gate files, tiny phase docs, missing required headings, stale references, and placeholder leakage. They should not reward schema cosplay or proof-shaped prose.
