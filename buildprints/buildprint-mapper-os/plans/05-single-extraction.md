# Phase 05 - Selected Extraction

## Goal

Create a source-independent selected Buildprint under `selected-buildprint/`.

## Steps

- Distill source facts into behavior contracts capability by capability.
- Create required selected spine files.
- Create capability packs for medium or larger scopes.
- Include stable-vs-free boundaries.
- Include first implementation slice, first verification gate, no-fake checks, and stop conditions.
- Make the output router-first: `CAPABILITY_INDEX.md` routes the package, `CURRENT_STATE.md` names the active capability pack, and implementation agents are told not to read unrelated packs upfront.
- Validate `manifest.json` against actual selected package files and reject typo aliases such as `VERFICATION.md`.
- Keep qualification label `SELECTED_UNQUALIFIED` until proof exists.

## Exit Criteria

- Selected package is under `selected-buildprint/`.
- Every included capability has contract, verification, and implementation plan.
- Medium/large selected output without `CAPABILITY_INDEX.md` is invalid.
- Every included capability pack has sibling `CAPABILITY.md`, `IMPLEMENTATION.md`, and `VERIFICATION.md`.
- No selected behavior is placeholder-backed.
