# Phase 05 - Selected Extraction

## Goal

Create a source-independent selected Buildprint under `selected-buildprint/` as capability-packet v4.

## Steps

- Distill source facts into product obligations and capability packets.
- Create required capability-packet v4 spine files.
- Create capability Markdown files for medium or larger scopes.
- Include stable-vs-free boundaries inside the relevant slice.
- Include proof gates, no-fake checks, stop conditions, and unlock rules.
- Make the output router-first: `START_HERE.md`, `blueprint.yaml`, and `02-context/context-map.yaml` route the active capability, while `03-capabilities/capability-index.yaml` is reserved for post-proof continuation.
- Reject legacy v1/v2 spine files, fragmented per-capability mini-files, and typo aliases such as `VERFICATION.md`.
- Keep qualification label `SELECTED_UNQUALIFIED` until runtime proof exists.

## Exit Criteria

- Selected package is under `selected-buildprint/`.
- Every included behavior is represented by an obligation, capability packet, blocker, explicit merge, or user-approved exclusion.
- Medium/large selected output without `03-capabilities/capability-index.yaml` is invalid.
- Every included capability packet includes required teams/gates, implementation path, proof gate, stop rules, and unlocks.
- No selected behavior is placeholder-backed.
