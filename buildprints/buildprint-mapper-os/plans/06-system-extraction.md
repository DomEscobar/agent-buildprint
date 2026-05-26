# Phase 06 - Full-Suite Extraction

## Goal

Create a hierarchical full-suite selected Buildprint only when explicitly requested.

## Steps

- Include every reviewed product behavior in `03-phases/phase-index.yaml` or document its blocker/merge/exclusion.
- Mark unready slices `INCLUDED_BLOCKED` or `INCLUDED_NEEDS_PROOF` instead of faking them.
- Keep phase packets focused and navigable.
- Treat `03-phases/phase-index.yaml` as the active-phase router and post-proof continuation index; full-suite output must not require a downstream agent to read every phase before the first action.
- Preserve cross-slice contracts inside relevant phase sections and `04-evaluation.md`.
- Add conditional security, data lifecycle, observability, provider, migration, QA, or reversal gates only when needed.
- Validate package shape before handoff: no missing phase proof gates, no legacy router/spine files, no packet AGENTS.md, no fragmented per-capability mini-files, no typo aliases, and no duplicate canonical handoff files.

## Exit Criteria

- Full-suite output is hierarchical.
- Full-suite output without `03-phases/phase-index.yaml` is invalid.
- Each included phase packet contains interfaces/state/UX/safety sections, implementation loop, proof gate, repair routing, stop rules, and unlocks.
- Qualification blockers remain visible.
- No broad whole-repo completeness claim is made.
