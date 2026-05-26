# Phase 05 - Selected Extraction

## Goal

Create a source-independent selected Buildprint under `selected-buildprint/` as executable Buildprint.

## Steps

- Distill source facts into product obligations and proof-gated phase packets.
- Create required executable Buildprint spine files.
- Create phase Markdown files for medium or larger scopes.
- Include stable-vs-free boundaries inside the relevant slice.
- Include proof gates, no-fake checks, stop conditions, and unlock rules.
- Make the output BUILDPRINT-first: `BUILDPRINT.md` owns read order, `blueprint.yaml` is the machine contract, and `03-phases/phase-index.yaml` routes the active phase and post-proof continuation.
- Reject legacy v1/v2 spine files, fragmented per-capability mini-files, and typo aliases such as `VERFICATION.md`.
- Keep qualification label `SELECTED_UNQUALIFIED` until runtime proof exists.

## Exit Criteria

- Selected package is under `selected-buildprint/`.
- Every included behavior is represented by an obligation, phase packet, blocker, explicit merge, or user-approved exclusion.
- Medium/large selected output without `03-phases/phase-index.yaml` is invalid.
- Every included phase packet includes interfaces/state/UX/safety sections, implementation loop, proof gate, repair routing, stop rules, and unlocks.
- No selected behavior is placeholder-backed.
