# Phase 05 - Selected Extraction

## Goal

Create a source-independent selected Buildprint under `selected-buildprint/` as executable Buildprint.

## Steps

- Distill source facts into product obligations and usable phase slices.
- Create required executable Buildprint spine files.
- Identify product promise, central artifact, first usable loop, persistence/readback needs, and honest boundaries.
- Include stable-vs-free boundaries inside relevant slices.
- Include quality bars, do-not-ship failures, local checks, final review, and handover.
- Make the output BUILDPRINT-first: `BUILDPRINT.md` owns read order, `blueprint.yaml` is the machine contract, and `03-phases/phase-index.yaml` routes the active phase and continuation.
- Reject obsolete selected-output spine files, proof/evidence bureaucracy, fragmented per-capability mini-files, and typo aliases such as `VERFICATION.md`.
- Keep qualification/status conservative until actual implementation output is built and reviewed.

## Exit Criteria

- Selected package is under `selected-buildprint/`.
- Every included behavior is represented by an obligation, phase packet, blocker, explicit merge, or user-approved exclusion.
- Medium/large selected output without `03-phases/phase-index.yaml` and `03-phases/phase-flow.md` is invalid.
- Every included phase packet includes product intention, build scope, quality bar, and do-not-ship failures.
- `04-review.md` and `05-handover.md` are present.
- No selected behavior is placeholder-backed.
