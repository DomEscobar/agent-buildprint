# Phase 06 - Full-Suite Extraction

## Goal

Create a hierarchical full-suite selected Buildprint only when explicitly requested.

## Steps

- Include every reviewed product capability in `03-capabilities/capability-index.yaml`.
- Mark unready capabilities `BLOCKED` instead of faking them.
- Keep capability packets focused and navigable.
- Treat `02-context/context-map.yaml` as the active-context router and `03-capabilities/capability-index.yaml` as the post-proof continuation index; full-suite output must not require a downstream agent to read every packet before the first slice.
- Preserve cross-capability contracts in `04-interfaces/`, `05-state-runtime/`, `06-safety/`, and `08-evaluation/`.
- Add conditional security, data lifecycle, observability, provider, migration, QA, or reversal gates only when needed.
- Validate package shape before handoff: no missing packet siblings, no legacy v1 spine files, no typo aliases, and no duplicate canonical handoff files.

## Exit Criteria

- Full-suite output is hierarchical.
- Full-suite output without `03-capabilities/capability-index.yaml` is invalid.
- Each included capability packet contains `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, and `proof-contract.yaml`.
- Qualification blockers remain visible.
- No broad whole-repo completeness claim is made.
