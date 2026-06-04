# CONTRACTS: Buildprint Mapper OS

## Root contract

Mapper OS maps source projects into source-independent Buildprints. It must preserve product scope, observable behavior, artifact type, runtime boundaries, state/readback expectations, provider constraints, and proof obligations without requiring the downstream builder to open the original source.

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

## Phase contract

Each phase file must include:

- `How to implement this phase`
- `Building objective`
- `DO NOT`
- `Minimum proof before moving on`
- `Handoff note`

The `Building objective` must be comprehensive and product-specific. It should read like a senior product-engineering assignment, not a decomposed schema or checklist fragment.

## Machine contract

`blueprint.yaml` routes files and declares policy. It must not become implementation guidance. Implementation guidance belongs in Markdown.

## Validation contract

`agb packet check` must reject:

- retired v2 slice/gate structures;
- obsolete selected packet filenames;
- generated prompt/handoff files as packet authority;
- tiny or missing phase objectives;
- missing required phase headings;
- phase index references to missing files;
- placeholder/fake-success leakage outside Mapper templates.

## Completion contract

A downstream implementation can only claim done when the real product path is checked. Packet structure alone never proves product completion.
