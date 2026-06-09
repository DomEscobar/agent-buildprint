# 05-critical-review-and-handover

## How to implement this phase

Before writing code, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md` if it exists, current project `AGENTS.md` if it exists, `BUILDPRINT.md`, `01-project-setup.md`, and `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact. Read `blueprint.yaml` and all previous handover notes. Perform a critical product review against the central output contract. This phase is not for adding convenient features; it is for proving the work is honest and repair-routing defects before final handover.

## Building objective

Run the full golden path from configured setup to generated deck to edited deck to export/readback. Review the output as a skeptical user: does the deck reflect the input, can it be edited, are templates meaningful, are provider/export failures honest, and does reload preserve state? Then review the system as an operator: can it be configured, deployed, backed up, debugged, and safely exposed under the declared posture?

This phase must include a full visual and semantic critique of the generated deck. Inspect whether the outline, slide order, template use, image choices, chart/table rendering, text density, and exported files feel like a real presentation workflow or a plausible generic shell. Run the product on at least one prompt-only fixture and one document-backed fixture if earlier phases support uploads. Confirm that the UI language remains user-facing, that blocked provider/export states are clear, that destructive actions are reversible or confirmed, and that the final handover does not overclaim. If any central quality signal in `blueprint.yaml` remains unproven, state the missing proof and route the repair to the responsible phase.

Any failure that breaks the central output contract must be repaired in the responsible earlier phase. Any unproven live provider, desktop packaging, webhook, export, mobile editor, or deployment claim must remain blocked with exact evidence.

## DO NOT

- Do not pass the review because files exist.
- Do not soften blocker language.
- Do not claim production-ready unless operational proof exists.
- Do not leave screenshots/logs uninspected.
- Do not ignore visual defects because tests pass.
- Do not ship placeholders, lorem ipsum, empty wrappers, functionless buttons, inert navigation, swallowed errors, fake progress, or mocked/sample data counted as real proof.

## Minimum proof before moving on

- End-to-end golden path proof is recorded.
- Automated tests and browser inspection results are recorded.
- Central output is reviewed against every `quality_signals` and `generic_output_failures` entry in `blueprint.yaml`.
- Security review covers auth, file downloads, provider secrets, uploads, and export path constraints.
- Final `HANDOVER.md` lists built, verified, blocked, not proven, and next actions.

## Handoff note

Record final qualification label: `proof_complete_for_selected_scope`, `blocked_by_external_runtime`, or `incomplete`. Include exact remaining blockers and next repair phase.
