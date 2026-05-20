# EXECUTION_PROTOCOL

1. Intake: read `PRE_IMPLEMENTATION_QUESTIONS.md`, confirm selected capability, scope, risks, quality bar, and success criteria.
2. Question gate: ask only unresolved blocking questions before coding. If the user is unavailable, record safest production-grade selected-scope defaults in `CURRENT_STATE.md`; do not silently downgrade to prototype quality.
3. Context load: read only the spine and relevant capability pack.
4. Baseline: run declared preflight checks or record why they cannot run.
5. Implement slice: build the highest-quality behaviorally complete vertical slice allowed by the selected scope and resolved/defaulted decisions.
6. Verify slice: run targeted checks and fix failures.
7. Expand checks: add integration, runtime, browser, persistence, security, and no-fake gates where applicable.
8. Fresh review: required for high-risk or broad changes.
9. Repair loop: convert failures into focused next actions until pass or blocker.
10. Handoff: update state, evidence, blockers, safe defaults, and next capability.
