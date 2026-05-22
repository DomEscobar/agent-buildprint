# Phase 05 - Selected Extraction

## Goal

Create a source-independent selected Buildprint under `selected-buildprint/`.

## Steps

- Distill source facts into behavior contracts capability by capability.
- Create required executable-packet v2 spine files.
- Create capability packets for medium or larger scopes.
- Include stable-vs-free boundaries.
- Include first implementation slice, first verification gate, no-fake checks, and stop conditions.
- Make the output router-first: `START_HERE.md`, `blueprint.yaml`, and `02-context/context-map.yaml` route the active capability packet, while `03-capabilities/capability-index.yaml` is reserved for post-proof continuation.
- Reject legacy v1 spine files and typo aliases such as `VERFICATION.md`.
- Keep qualification label `SELECTED_UNQUALIFIED` until proof exists.

## Exit Criteria

- Selected package is under `selected-buildprint/`.
- Every included capability has product contract, implementation workflow, and proof contract.
- Medium/large selected output without `03-capabilities/capability-index.yaml` is invalid.
- Every included capability packet has sibling `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, and `proof-contract.yaml`.
- No selected behavior is placeholder-backed.
