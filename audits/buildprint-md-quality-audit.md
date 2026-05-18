# Buildprint Markdown Quality Audit

Audited at: `2026-05-18T14:22:44Z`

Schema: `audits/buildprint-md-quality-schema.json`

Notes:
- Audit input is tracked Markdown files under `/root/blueprint/buildprints/*` only. Ignored dependency folders such as `proof/node_modules` are excluded.
- This is schema-backed and machine-checkable, but it is still a first pass: `PASS_WITH_WARNINGS` means aligned enough to ship but with tightening candidates; `FIX_REQUIRED` means manual review/fix before claiming final edge audit complete.

## ai-influencer-os — PASS_WITH_WARNINGS

### Edge checks

- scopeBoundary: PASS
- stopConditions: PASS
- statePersistence: PASS
- routeControlReality: PASS
- providerBoundary: PASS
- qaEvidence: PASS
- securitySafety: PASS
- excludedCapabilities: PASS
- noContextRot: WARN

### Actions

- [medium] `checks/acceptance.md` → TIGHTEN: merged notes may need tightening
- [low] `plans/00-alignment.md` → KEEP: missing/weak stopConditions
- [low] `plans/02-persona-runtime.md` → KEEP: missing/weak stopConditions
- [low] `plans/03-memory-life-state.md` → KEEP: missing/weak stopConditions
- [low] `plans/05-social-planner.md` → KEEP: missing/weak stopConditions

## automated-ai-blog-os — PASS_WITH_WARNINGS

### Edge checks

- scopeBoundary: WARN
- stopConditions: PASS
- statePersistence: PASS
- routeControlReality: PASS
- providerBoundary: PASS
- qaEvidence: PASS
- securitySafety: WARN
- excludedCapabilities: WARN
- noContextRot: WARN

### Actions

- [medium] `checks/acceptance.md` → TIGHTEN: merged notes may need tightening

## buildprint-mapper-os — FIX_REQUIRED

### Edge checks

- scopeBoundary: PASS
- stopConditions: PASS
- statePersistence: PASS
- routeControlReality: PASS
- providerBoundary: PASS
- qaEvidence: PASS
- securitySafety: PASS
- excludedCapabilities: PASS
- noContextRot: FAIL

### Actions

- [low] `plans/00-safety-boundaries.md` → KEEP: missing/weak stopConditions
- [low] `plans/01-repo-census.md` → KEEP: missing/weak stopConditions
- [low] `plans/03-candidate-buildprints.md` → KEEP: missing/weak stopConditions
- [medium] `plans/04-scope-decision.md` → TIGHTEN: MVP/proof-only risk
- [low] `plans/05-single-extraction.md` → KEEP: missing/weak stopConditions
- [medium] `plans/06-system-extraction.md` → TIGHTEN: mock-as-product risk; MVP/proof-only risk
- [medium] `plans/07-validation-submission.md` → TIGHTEN: mock-as-product risk
- [medium] `policies/quality.md` → TIGHTEN: stale status uncertainty; mock-as-product risk; MVP/proof-only risk
- [medium] `policies/questions.md` → TIGHTEN: MVP/proof-only risk
- [medium] `prompts/discover.md` → TIGHTEN: MVP/proof-only risk
- [medium] `prompts/extract-selected.md` → TIGHTEN: mock-as-product risk
- [medium] `templates/AGENT_EXECUTION_BRIEF.md` → TIGHTEN: mock-as-product risk
- [medium] `templates/CURRENT_STATE.md` → TIGHTEN: stale status uncertainty; mock-as-product risk
- [medium] `templates/HEAD_TO_FOOT_QA.md` → TIGHTEN: stale status uncertainty; mock-as-product risk
- [medium] `templates/IMPLEMENTATION_COMPLETENESS.md` → TIGHTEN: stale status uncertainty; mock-as-product risk; MVP/proof-only risk
- [medium] `templates/PARITY_CLAIMS.md` → TIGHTEN: MVP/proof-only risk
- [low] `templates/QA_PLAN.md` → KEEP: missing/weak providerBoundary
- [medium] `templates/QUALITY_SCORECARD.md` → TIGHTEN: mock-as-product risk
- [low] `templates/RUNTIME_LIVE_TEST_PLAN.md` → KEEP: missing/weak securitySafety; missing/weak excludedCapabilities

## complete-agent-skills-evaluation-os — PASS_WITH_WARNINGS

### Edge checks

- scopeBoundary: WARN
- stopConditions: WARN
- statePersistence: N/A
- routeControlReality: N/A
- providerBoundary: N/A
- qaEvidence: WARN
- securitySafety: WARN
- excludedCapabilities: WARN
- noContextRot: PASS

### Actions

- None

## perfect-rag-retrieval-os — PASS_WITH_WARNINGS

### Edge checks

- scopeBoundary: WARN
- stopConditions: WARN
- statePersistence: N/A
- routeControlReality: N/A
- providerBoundary: N/A
- qaEvidence: WARN
- securitySafety: WARN
- excludedCapabilities: WARN
- noContextRot: PASS

### Actions

- None

## portable-ai-shorts-production-studio — PASS_WITH_WARNINGS

### Edge checks

- scopeBoundary: WARN
- stopConditions: WARN
- statePersistence: N/A
- routeControlReality: N/A
- providerBoundary: N/A
- qaEvidence: WARN
- securitySafety: WARN
- excludedCapabilities: WARN
- noContextRot: PASS

### Actions

- None

## portable-durable-agent-graph-runtime — PASS_WITH_WARNINGS

### Edge checks

- scopeBoundary: WARN
- stopConditions: WARN
- statePersistence: N/A
- routeControlReality: N/A
- providerBoundary: N/A
- qaEvidence: WARN
- securitySafety: WARN
- excludedCapabilities: WARN
- noContextRot: PASS

### Actions

- None

## portable-novel-storyboard-pipeline — PASS_WITH_WARNINGS

### Edge checks

- scopeBoundary: WARN
- stopConditions: WARN
- statePersistence: N/A
- routeControlReality: N/A
- providerBoundary: N/A
- qaEvidence: WARN
- securitySafety: WARN
- excludedCapabilities: WARN
- noContextRot: PASS

### Actions

- None

## portable-personal-agent-chat-os — PASS_WITH_WARNINGS

### Edge checks

- scopeBoundary: WARN
- stopConditions: WARN
- statePersistence: N/A
- routeControlReality: N/A
- providerBoundary: N/A
- qaEvidence: WARN
- securitySafety: WARN
- excludedCapabilities: WARN
- noContextRot: PASS

### Actions

- None

## stripe-billing-extension — PASS_WITH_WARNINGS

### Edge checks

- scopeBoundary: WARN
- stopConditions: WARN
- statePersistence: N/A
- routeControlReality: N/A
- providerBoundary: N/A
- qaEvidence: WARN
- securitySafety: WARN
- excludedCapabilities: WARN
- noContextRot: PASS

### Actions

- None

## superpowers-skill-methodology-harness — PASS_WITH_WARNINGS

### Edge checks

- scopeBoundary: WARN
- stopConditions: WARN
- statePersistence: N/A
- routeControlReality: N/A
- providerBoundary: N/A
- qaEvidence: WARN
- securitySafety: WARN
- excludedCapabilities: WARN
- noContextRot: PASS

### Actions

- None
