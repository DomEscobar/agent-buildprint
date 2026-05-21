# Phase 06 - Full-Suite Extraction

## Goal

Create a hierarchical full-suite selected Buildprint only when explicitly requested.

## Steps

- Include every reviewed product capability in `CAPABILITY_INDEX.md`.
- Mark unready capabilities `BLOCKED` instead of faking them.
- Keep capability packs focused and navigable.
- Treat `CAPABILITY_INDEX.md` as the traffic controller and `CURRENT_STATE.md` as the active pointer; full-suite output must not require a downstream agent to read every pack before the first slice.
- Preserve cross-capability contracts in root `CONTRACTS.md`.
- Add conditional security, data lifecycle, observability, provider, migration, QA, or reversal files only when needed.
- Validate package shape before handoff: no missing pack siblings, no manifest drift, no typo aliases, and no duplicate canonical handoff files.

## Exit Criteria

- Full-suite output is hierarchical.
- Full-suite output without `CAPABILITY_INDEX.md` is invalid.
- Each included capability pack contains `CAPABILITY.md`, `IMPLEMENTATION.md`, and `VERIFICATION.md`.
- Qualification blockers remain visible.
- No broad whole-repo completeness claim is made.
