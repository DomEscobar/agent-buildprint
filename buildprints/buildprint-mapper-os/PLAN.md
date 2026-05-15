# Buildprint Mapper OS Plan

## Phase index

1. `plans/00-safety-boundaries.md` — secrets, source safety, write boundaries.
2. `plans/01-repo-census.md` — deterministic repo facts and file map.
3. `plans/02-system-map.md` — architecture zones and subsystem boundaries.
4. `plans/03-candidate-buildprints.md` — possible reusable Buildprints.
5. `plans/04-scope-decision.md` — human selection gate.
6. `plans/05-single-extraction.md` — one bounded Buildprint package.
7. `plans/06-system-extraction.md` — hierarchical project/system package.
8. `plans/07-validation-submission.md` — honesty, safety, quality, submission checklist.

## Recommended command path

```bash
agb map ./my-project --out .project.buildprint
```

Then give the mapper output to a coding agent with `prompts/discover.md` or `prompts/extract-selected.md`.

## Decision gate

If the project is large and no scope is provided, stop after candidate discovery and ask for scope selection.
