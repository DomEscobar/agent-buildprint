# CONTRACTS: Buildprint Mapper OS

## Root contract

Mapper OS maps source projects into source-independent Buildprints. It must preserve product scope, observable behavior, artifact type, runtime boundaries, state/readback expectations, provider constraints, design responsibilities, and proof obligations without requiring the downstream builder to open the original source.

## Selected packet contract

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

## Builder briefing contract

`BUILDPRINT.md` is only the AI-builder briefing and read-order entrypoint. It must:

- introduce the builder’s role and responsibility;
- demand perfection alignment, honest proof, and fake-success rejection;
- list the required read order;
- avoid product-specific details, mapped source names, old repo names, old product names, dependency names, golden path prose, and implementation contract specifics.

If product identity appears in `BUILDPRINT.md`, the packet has mixed responsibilities.

## Product contract location

Product identity, artifact shape, central interface, golden path, runtime posture, provider/runtime constraints, state/readback expectations, and source-distilled product specifics belong in `blueprint.yaml`, `01-project-setup.md`, `02-uiux-decision.md`, and the phase objectives — not in `BUILDPRINT.md`.

`blueprint.yaml` is the machine-readable mirror. It routes and declares concise product contract facts. It must not become a full implementation manual.

## Central output contract

Every selected packet must identify the artifact's central output and the minimum quality bar for that output. This belongs in `blueprint.yaml` as concise machine-readable routing and in Markdown as buildable guidance.

The mapper must extract, from source evidence and product behavior:

- the central output the user/operator actually values;
- the output primitives or units that compose it;
- the quality signals that make it useful, credible, publishable, actionable, correct, or otherwise domain-appropriate;
- the generic-output failure modes that would look plausible but fail the product;
- reviewer acceptance questions that a skeptical human can use after one real example path;
- claim gates that must remain blocked until the output quality is proven.

Output existence is not enough. Input-derived output is not enough. A selected packet must reject technically generated but domain-generic results.

## UX/style contract

`02-uiux-decision.md` is mandatory for every UI-bearing artifact and must be detailed enough to guide later implementation without guessing. It must:

- open by saying UX is a must and that confusing/generic/ugly UI is not finished product;
- include a small understandability checklist;
- define design thesis, style direction, color system, typography, layout rhythm, component language, motion, states, anti-generic rules, and phase obligation;
- tell every later phase to preserve the style schema.

For non-UI artifacts, it must explicitly say `not-ui-bearing` and define the developer/operator experience with equivalent specificity.

## Phase contract

Each phase file must include:

- `How to implement this phase`
- `Building objective`
- `DO NOT`
- `Minimum proof before moving on`
- `Handoff note`

The `Building objective` must be comprehensive and product-specific. It should read like a senior product-engineering assignment, not a decomposed schema or checklist fragment. Every phase must read `02-uiux-decision.md` as standing design/style responsibility for UI-bearing artifacts, even when the phase is runtime, data, report, verification, or backend work.

## Machine contract

`blueprint.yaml` routes files and declares policy. It must not become implementation guidance. Implementation guidance belongs in Markdown.

## Validation contract

`agb packet check` must reject:

- obsolete v2 structures;
- obsolete selected packet filenames;
- generated prompt/handoff files as packet authority;
- product-specific or mapped-source leakage in `BUILDPRINT.md`;
- missing UX-must-matter preface/checklist in `02-uiux-decision.md`;
- weak/generic UI style constitutions;
- phase files that do not read `02-uiux-decision.md`;
- tiny or missing phase objectives;
- missing required phase headings;
- phase index references to missing files;
- placeholder/fake-success leakage outside Mapper templates.
- missing central output quality contracts in selected packets.

## Completion contract

A downstream implementation can only claim done when the real product path is checked. Packet structure alone never proves product completion.
