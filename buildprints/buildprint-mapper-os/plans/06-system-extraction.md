# Phase 06 - Full-Suite Extraction

## Goal

Create a hierarchical full-suite selected Buildprint only when explicitly requested.

## Steps

- Include every reviewed product behavior in `03-phases/phase-index.yaml` or document its blocker/merge/exclusion.
- Mark unready slices as blocked or partial instead of faking them.
- Keep phase packets focused and navigable.
- Treat `03-phases/phase-index.yaml` as the active-phase router and continuation index; full-suite output must not require a downstream agent to read every phase before the first action.
- Preserve cross-slice contracts inside relevant phase sections and `04-review.md`/`05-handover.md`.
- Add conditional security, data lifecycle, observability, provider, migration, QA, or reversal gates only when needed.
- Validate package shape before handoff: no missing phase-flow/review/handover files, no obsolete router/spine files, no packet AGENTS.md, no fragmented per-capability mini-files, no typo aliases, and no duplicate canonical handoff files.

## Exit Criteria

- Full-suite output is hierarchical.
- Full-suite output without `03-phases/phase-index.yaml` and `03-phases/phase-flow.md` is invalid.
- Each included phase packet contains product intention, build scope, quality bar, and do-not-ship failures.
- Qualification blockers remain visible.
- No broad whole-repo completeness claim is made.
