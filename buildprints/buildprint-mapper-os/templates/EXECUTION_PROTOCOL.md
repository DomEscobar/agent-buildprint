# EXECUTION_PROTOCOL

1. Intake: read `PRE_IMPLEMENTATION_QUESTIONS.md`, confirm requested scope, selected target/first slice, capability readiness map, risks, max-quality mandate, and success criteria.
2. Question gate: ask only unresolved blocking questions before coding. If the user is unavailable, record safest max-quality selected-scope defaults in `CURRENT_STATE.md`; do not silently shrink scope or downgrade quality.
3. Implementation-team selection: inspect Buildprint implementation signals and choose the required builder roles/passes before coding. User-facing UI requires product/design/frontend review. Uploads, providers, user data, auth, admin, destructive actions, or deployment surfaces require security/runtime review. Broad or multi-capability surfaces require architecture and coverage review. A lone generalist pass is acceptable only for tiny non-UI reference implementations.
4. Context load: read only the spine and relevant capability pack, plus capability index/readiness map when present.
5. Baseline: run declared preflight checks or record why they cannot run.
6. Architecture topology gate: for medium, large, UI-bearing, provider-backed, or full-suite scopes, define and verify frontend, backend, domain/service, provider, storage, task/runtime, and test topology before coding. A mostly single-file backend or static shell fails unless the selected scope is tiny and explicitly justified.
7. Evidence-producing role chain: before coding, ensure the role artifacts exist and are consumable: source evidence, product obligations, required topology, proof ledger plan, and reviewer promotion criteria. If the proof ledger skeleton does not exist, create it before implementation.
8. Capability depth gate: update the depth matrix in `CAPABILITY_INDEX.md`. Do not call a capability implemented from a route, label, no-op control, deterministic adapter, or skeleton seam alone; mark it `CONTRACT_SEAM_ONLY` or `BLOCKED_WITH_REASON`.
9. Implement slice: build the next behaviorally complete vertical slice without erasing later capability work from the plan.
10. Verify slice: run targeted checks and fix failures.
11. Expand checks: add integration, runtime, browser, persistence, security, architecture, capability-depth, and no-fake gates where applicable.
12. Capability proof ledger closure: every included capability must have a `VERIFICATION.md` ledger row with proof command/API/browser path, proof artifact, negative test when applicable, runtime/browser evidence when applicable, status, and blocker. Do not claim final completion until each row is closed as proven or honestly blocked/downgraded.
13. Fresh review: required for high-risk, UI/product, architecture, data, provider, upload, auth, destructive, deployment, or broad changes. The review must reject fake/placeholder completion, not merely note gaps.
14. Repair loop: convert failures into focused next actions until pass or blocker.
15. Handoff: update state, evidence, blockers, safe defaults, capability readiness, capability depth status, implementation-team notes, proof ledger closure state, and next capability.

Completion is blocked if any included capability lacks source evidence, product obligation, required topology, proof command or explicit blocker, proof artifact or explicit blocker, required negative test, required runtime/browser evidence, depth status, or promotion blocker for non-`REAL_IMPLEMENTED` states.
