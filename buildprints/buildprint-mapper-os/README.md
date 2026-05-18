# Buildprint Mapper OS

Turn an existing repo into a scoped, reviewable Buildprint using a coding agent and this Buildprint package only.

No CLI is required for the mapping logic. `agb start` is only a snapshot bootstrap helper; agents may also read the package files directly from the manifest. Start with `BUILDPRINT.md`; the canonical contract defines the required read order. The mapper process:

1. create a safe repo census,
2. map the system with evidence,
3. propose scoped Buildprint candidates,
4. ask for one selected scope, production-grade posture, and fidelity/depth decision,
5. extract the selected Buildprint with a no-fake implementation contract,
6. cut scope honestly instead of replacing hard parts with mocks/placeholders,
7. derive QA from mapped product behavior,
8. link evidence to requirements and checks,
9. run clean-room reversal validation,
10. set up product/feature proof when applicable,
11. run runtime/browser QA and no-fake scans when applicable,
12. report gaps honestly.

Use it when:

- you have a project and want to publish its reusable architecture as a Buildprint,
- the repo is too large for a single prompt summary,
- you need candidate Buildprints before choosing scope,
- you want a full hierarchical System Buildprint.

## Coding-agent starter prompt

Paste this into Codex, Cursor, Claude Code, or another coding agent inside the repo you want mapped:

```txt
Use Buildprint Mapper OS.

Read BUILDPRINT.md first and follow its Required Read Order.

Then map this repo without modifying source code.

Start with discovery only:
1. create SYSTEM_MAP.md
2. create BUILDPRINT_CANDIDATES.md
3. create questions.md with at most 3-5 required decisions, including selected candidate, production-grade selected scope, and fidelity/depth target

After scope/depth selection, final packages must include scope-derived QA, parity boundaries, and traceability:
- QA_PLAN.md
- AGENT_EXECUTION_BRIEF.md and agent-contract.xml for coding-agent execution
- CURRENT_STATE.md for anti-context-rot handoff
- manifest.json for package/gate validation
- IMPLEMENTATION_COMPLETENESS.md for every product/app/feature scope
- HEAD_TO_FOOT_QA.md for runnable product/app/feature scopes
- PARITY_CLAIMS.md for product-inspired/rebuild/parity scopes
- TRACEABILITY_MATRIX.md
- CAPABILITY_BASELINE.md for famous/product-inspired systems
- THREAT_MODEL.md / DATA_LIFECYCLE.md / OBSERVABILITY.md when relevant

Rules:
- production-grade selected scope is the default; do not generate broad proof-only product apps
- scope cuts must remove capabilities, not fake them with mocks/placeholders
- mocks are allowed only as explicitly named test/demo fixtures, never counted as product implementation
- every included route, service, provider, persistence path, job, setting, export, and UI control must be real, wired, error-handled, and QA-testable
- ask almost nothing before soft discovery; use safe defaults
- cite repo file paths for important claims
- label every claim OBSERVED, INFERRED, or QUESTION
- do not copy secrets or .env values
- do not create the final Buildprint until I choose a candidate and depth target
- ask at most one blocking question at a time
- for CI/dogfood runs, accept an explicit simulated candidate/depth choice and record it in selection.md
```

After a candidate is chosen, use `prompts/extract-selected.md`.

Safety posture: no secrets, no app-code modification, no invented validation results.
