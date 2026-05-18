# Parity Claims

## Selected fidelity target

- Selected target:
- Optional deeper targets:
- Explicitly excluded targets:

Targets: `workflow-proof`, `contract-parity`, `runtime-parity`, `ui-workbench-parity`, `provider-parity`, `export-media-parity`, `full-clone-parity`.

Parity is not the same as implementation completeness. A Buildprint may exclude exact source parity, but every included capability must still be implemented seriously. Do not use “not full parity” as permission to ship fake MVP surfaces.

## Safe claims

Use only claims supported by the selected target and validation evidence.

- 

## Unsafe claims

List claims that must not be made unless a later pass upgrades scope and validates them.

- Exact UI parity:
- Full route/API parity:
- Live provider parity:
- Final export/media parity:
- Drop-in replacement / full clone:

## Required wording

Use:

> "This is a clean-room implementation guided by observed workflow evidence. It proves the selected scope and fidelity target only. It does not claim excluded parity layers. Within the selected scope, included capabilities must be real, wired, persistent where relevant, and QA-tested; excluded capabilities are not replaced by fake mocks/placeholders."

Do not use unless explicitly validated:

- "clone"
- "full reproduction"
- "drop-in replacement"
- "same as original"
- "final export parity"
- "live provider parity"

## Evidence required to upgrade depth

| Upgrade target | Required evidence | Current status |
|---|---|---|
| runtime-parity | build/test/runtime QA, runnable URL, screenshots/report | pending |
| ui-workbench-parity | screenshots/browser exploration/component/route map | pending |
| provider-parity | env-gated live adapter smoke, failure/cost/latency notes, no secret persistence | pending |
| export-media-parity | final artifact/compositor/export evidence and artifact checks | pending |
| full-clone-parity | all relevant layers above | pending |
