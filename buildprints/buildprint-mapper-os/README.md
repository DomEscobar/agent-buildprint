# Buildprint Mapper OS

Turn an existing repo into a scoped, reviewable Buildprint using a coding agent and this Buildprint package only.

No CLI is required. The mapper is the process described by these files:

1. create a safe repo census,
2. map the system with evidence,
3. propose scoped Buildprint candidates,
4. ask for one small scope decision,
5. extract the selected Buildprint,
6. derive QA from mapped product behavior,
7. link evidence to requirements and checks,
8. run clean-room reversal validation,
9. set up product/feature proof when applicable,
10. report gaps honestly.

Use it when:

- you have a project and want to publish its reusable architecture as a Buildprint,
- the repo is too large for a single prompt summary,
- you need candidate Buildprints before choosing scope,
- you want a full hierarchical System Buildprint.

## Coding-agent starter prompt

Paste this into Codex, Cursor, Claude Code, or another coding agent inside the repo you want mapped:

```txt
Use Buildprint Mapper OS.

Read the mapper package files first:
- README.md
- BUILDPRINT.md
- PLAN.md
- SPEC.md
- CONTRACTS.md
- TEST_MATRIX.md
- prompts/discover.md
- policies/quality.md
- templates/QA_PLAN.md
- templates/TRACEABILITY_MATRIX.md

Then map this repo without modifying source code.

Start with discovery only:
1. create SYSTEM_MAP.md
2. create BUILDPRINT_CANDIDATES.md
3. create questions.md with at most 3-5 required decisions

After scope selection, final packages must include scope-derived QA and traceability:
- QA_PLAN.md
- TRACEABILITY_MATRIX.md
- CAPABILITY_BASELINE.md for famous/product-inspired systems
- THREAT_MODEL.md / DATA_LIFECYCLE.md / OBSERVABILITY.md when relevant

Rules:
- cite repo file paths for important claims
- label every claim OBSERVED, INFERRED, or QUESTION
- do not copy secrets or .env values
- do not create the final Buildprint until I choose a candidate
- ask at most one blocking question at a time
```

After a candidate is chosen, use `prompts/extract-selected.md`.

Safety posture: no secrets, no app-code modification, no invented validation results.
