# Phase 06 - Full-Suite Extraction

## Goal

Create a hierarchical full-suite selected Buildprint only when explicitly requested.

## Steps

- Include every reviewed product behavior in `03-capabilities/capability-index.yaml` or document its blocker/merge/exclusion.
- Mark unready slices `INCLUDED_BLOCKED` or `INCLUDED_NEEDS_PROOF` instead of faking them.
- Keep capability packets focused and navigable.
- Treat `02-context/context-map.yaml` as the active-context router and `03-capabilities/capability-index.yaml` as the post-proof continuation index; full-suite output must not require a downstream agent to read every capability before the first action.
- Preserve cross-slice contracts in `04-interfaces/`, `05-state-runtime/`, `06-safety/`, and `08-evaluation/`.
- Add conditional security, data lifecycle, observability, provider, migration, QA, or reversal gates only when needed.
- Validate package shape before handoff: no missing capability proof gates, no legacy v1/v2 spine files, no fragmented per-capability mini-files, no typo aliases, and no duplicate canonical handoff files.

## Exit Criteria

- Full-suite output is hierarchical.
- Full-suite output without `03-capabilities/capability-index.yaml` is invalid.
- Each included capability packet contains required teams/gates, implementation path, proof gate, stop rules, and unlocks.
- Qualification blockers remain visible.
- No broad whole-repo completeness claim is made.
