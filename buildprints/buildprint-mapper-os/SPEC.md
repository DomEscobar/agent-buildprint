# SPEC: Buildprint Mapper OS

Mapper OS maps a source project into a source-independent implementation packet for coding agents.

## Core invariant

A selected Buildprint should make the downstream artifact better. It should shape product/developer/operator judgment before coding through a clean division of responsibility: generic AI-builder briefing, hard-stop questions, implementation foundation, mandatory UI identity generation, machine routing, comprehensive phase objectives, forbidden fake-success paths, and honest handover.

The packet must not force the downstream agent to open the original repository. The mapper distills observed source behavior into the selected packet, then removes source dependency and mapped-source naming from the builder-facing start file.

## Selected packet requirements (v3 phase-driven)

A selected packet must contain:

```text
BUILDPRINT.md
00-questions.md
02-project-setup.md
01-ui-identity.md
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
- `02-project-setup.md` creates the architect foundation: stack, project docs, local `AGENTS.md`, architecture, product loop, proof strategy, env contract, setup receipt, and any required local UI/design docs.
- `01-ui-identity.md` is the mandatory UI identity for UI-bearing artifacts. It must open by stating that UX is a must, that confusing/generic/ugly UI is not finished product, and include a small understandability checklist. It must then define a detailed design thesis, style direction, color tokens, typography, layout rhythm, component language, motion, state behavior, anti-generic rules, and phase obligation.
- `blueprint.yaml` is the machine route and product-contract mirror. It declares schema, required files, product name, central artifact, golden path, central output contract, runtime/posture constraints, forbidden shapes, phase index/flow paths, and any concise routing metadata. YAML routes; it does not replace markdown judgment.
- `03-phases/phase-index.yaml` routes phases only. It names the active phase and phase files; it does not become a role/gate/slice engine.
- `03-phases/phase-flow.md` gives the active-phase loop and repair routing. It must require reading `01-ui-identity.md` before every active phase for UI-bearing artifacts.
- Every phase file is a comprehensive markdown assignment with required headings and a detailed product-specific Building objective. Each phase must read `01-ui-identity.md` as the standing comprehension, user-language, and visual identity responsibility, because backend/runtime/state/report work still changes what users see.
- `HANDOVER.md` is the concise final/stopping handover template: built, verified, blocked, not proven, next.

## BUILDPRINT.md anti-regression rule

The selected `BUILDPRINT.md` must be generic and transferable. It should say “you are the responsible builder,” define the builder role/responsibility/perfection alignment, and list read order. Product identity belongs elsewhere. If a generated `BUILDPRINT.md` names the mapped source project, old repo, product-specific dependencies, graph/simulation details, provider names, or a golden path, the mapper failed.

## UI/UX anti-regression rule

`01-ui-identity.md` must be written in strong detail, not phrases. It is not a “make it nice” note. It is the visual constitution that later phases obey. The mapper should force the downstream agent to know the artifact’s aesthetic world before coding: simplicity or density, glassmorphism or editorial minimalism, color schema, typography, spacing, component behavior, motion, state copy, and anti-generic boundaries.

The mapper should not solve vague UI direction by adding endless style prose. It should route uncertainty into explicit decisions before implementation. If the source has no brand, palette, typography, or layout system, the selected packet must require the builder to reason from artifact type, audience, density, workflow, risk, and review proof, then write a concrete local UI identity before UI code.

For visual, editable, or fixed-format artifacts, the selected packet must also declare viewport and stress proof obligations. A screenshot path is weaker than screenshot inspection: the packet should say what must be inspected, such as primary surface framing, no overlap, no clipped controls, no page-level horizontal overflow, readable text, and reachable actions on desktop and mobile when responsive use is in scope.

## Central output anti-regression rule

Every selected packet must state what makes the mapped artifact's central output valuable. It is not enough to preserve a golden path where output technically depends on input. The mapper must extract the source-specific output primitives, quality signals, failure modes, and reviewer acceptance questions that distinguish useful output from generic or interchangeable output.

Examples:

- a social simulation must define what makes its map/feed/story insightful, not only that a graph and posts exist;
- a code generator must define what makes generated code correct, maintainable, and integrated, not only that files are emitted;
- an analytics tool must define what makes the analysis actionable and trustworthy, not only that charts render;
- a document/report tool must define what makes the draft publishable or decision-grade, not only that text is generated.

If a selected packet can produce a polished shell whose main output could fit any unrelated input with superficial text swaps, the mapper failed. Put the machine-readable summary in `blueprint.yaml`, the implementation guidance in setup and phase objectives, and the human-facing review criteria in verification/handover.

## Typed proof routing rule

Mapper OS should choose proof obligations by artifact type instead of hammering every packet with the same text.

- UI-bearing apps need design-decision precision, desktop/mobile visual inspection when responsive use is expected, interaction-state proof, and accessibility/overflow checks.
- Editable or fixed-format tools need fixed-surface proof, long-content stress fixtures, selection/edit/readback proof, and no-overlap inspection.
- AI/generative products need semantic output-specificity proof, repeated-output rejection, provider/blocker honesty, and reviewer acceptance questions.
- Integrations/plugins/CLIs/services may be `not-ui-bearing`, but they still need operator/developer experience decisions: command shape, logs, errors, idempotency, retries, audit trail, and recovery proof.

The selected packet should expose these obligations in concise machine-readable routing plus focused Markdown proof requirements. Do not copy every possible gate into every packet. Select the gates that match the artifact type and mark irrelevant gates as not applicable or omitted.

## Forbidden selected-output shapes

Do not emit obsolete v2 packet files: `slices/`, `gates/`, `templates/teams/`, `templates/runner/`, `02-architecture.md`, `03-ux-contract.md`, `04-handover.md`, `04-review.md`, `05-handover.md`, generated prompts, or evidence-ledger bureaucracy as the selected packet shape.

## Validation philosophy

Checkers should reject structural breakage, obsolete v2 files, tiny phase docs, missing required headings, stale responsibility references, weak UI/style decisions, product-specific `BUILDPRINT.md` leakage, and placeholder/fake-success leakage. They should not reward schema cosplay or proof-shaped prose.
