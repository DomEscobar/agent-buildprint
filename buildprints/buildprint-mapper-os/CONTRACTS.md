# Buildprint Mapper OS Contracts

## Claim labels

```txt
OBSERVED: directly supported by files, commands, or mapper facts.
INFERRED: plausible synthesis from observed facts.
QUESTION: needs human confirmation.
OUT_OF_SCOPE: intentionally excluded from selected Buildprint.
```

## Candidate Buildprint record

```json
{
  "title": "Stripe Billing Extension",
  "scope": "billing routes, webhook handler, entitlement checks",
  "includedPaths": ["src/api/billing", "src/lib/stripe.ts"],
  "excludedPaths": ["src/admin", "src/marketing"],
  "productionGradeScope": "smallest selected scope that should be implemented fully",
  "capabilitiesToExcludeRatherThanFake": ["capabilities that are out of scope unless implemented for real"],
  "mockFixtureBoundary": "mocks only in test/demo paths; production path avoids them",
  "recommendedFidelityTarget": "workflow-proof|contract-parity|runtime-parity|ui-workbench-parity|provider-parity|feed-source-parity|export-media-parity|full-clone-parity",
  "optionalDeeperTargets": ["runtime-parity"],
  "explicitlyExcludedTargets": ["provider-parity", "feed-source-parity", "export-media-parity"],
  "safeClaims": ["..."],
  "whyReusable": "Common SaaS billing pattern",
  "estimatedTier": "strong",
  "observedSignals": ["Stripe dependency", "webhook route"],
  "risks": ["webhook signature", "subscription state drift"],
  "questions": ["Which plans/prices are supported?"]
}
```

## Submission checklist contract

`SUBMISSION_CHECKLIST.md` must include:

- files created,
- scope selected,
- included/excluded paths,
- commands run,
- commands not run and why,
- validation results,
- secrets check result,
- known gaps,
- human review questions,
- estimated package tier,
- production-grade selected scope,
- implementation completeness/no-fake status,
- selected fidelity target,
- safe/unsafe parity claims,
- runtime/browser QA status when applicable.

## System map contract

`SYSTEM_MAP.md` must include:

- stack summary,
- architecture zones,
- key flows,
- integrations,
- data stores/models,
- side effects,
- tests/checks present,
- state machines/lifecycles for major workflows,
- edge cases and failure modes,
- unknowns and confidence.

## Precision map contract

For every selected candidate or system module, record:

```json
{
  "module": "canvas-scene",
  "responsibilities": ["..."],
  "inputs": ["..."],
  "outputs": ["..."],
  "state": ["..."],
  "invariants": ["..."],
  "edgeCases": ["..."],
  "failureModes": ["..."],
  "sideEffects": ["..."],
  "testsOrQa": ["..."],
  "confidence": "high|medium|low|unknown",
  "evidence": ["OBSERVED(path:line): ..."]
}
```

If a field has no evidence, write `QUESTION` or `unknown`; never silently omit risky edges.

## Precision artifact contracts

### Agent-first execution artifacts

Every extracted Buildprint must include:

- `AGENT_EXECUTION_BRIEF.md` — first-read operational brief for coding agents.
- `agent-contract.xml` — strict XML instruction envelope with mission, read order, MUST/MUST NOT, STOP, phase gates, and done criteria.
- `CURRENT_STATE.md` — rolling anti-context-rot handoff updated after every phase.
- `manifest.json` — machine-checkable required files, gates, and done criteria.

These artifacts must agree with the selected scope and no-fake implementation contract. If they conflict with other Buildprint files, implementation must stop and report the conflict.


### `PARITY_CLAIMS.md`

Required for product-inspired, clone-like, compatibility, agentic, webapp, or user-facing rebuild scopes. Must include:

- selected fidelity target,
- optional deeper targets,
- explicitly excluded targets,
- safe claims,
- unsafe claims,
- exact allowed wording,
- evidence required to upgrade depth.

### `HEAD_TO_FOOT_QA.md`

Required for runnable product/app/feature scopes. Must include layered gates:

- static safety,
- unit/contract tests,
- build/typecheck,
- real runtime happy path,
- runtime negative paths,
- responsive/UX smoke where UI exists,
- optional live provider/export gates only if selected.

### `QA_PLAN.md`

Must derive QA from the selected scope, not from a generic checklist. For every critical flow, include:

- mapped flow/job,
- risk or edge case,
- expected behavior,
- check type (`unit`, `API`, `browser`, `manual`, `security`, `performance`, `accessibility`),
- command/assertion when known,
- evidence/result and status.

### `TRACEABILITY_MATRIX.md`

Must link each critical Buildprint requirement to:

- source evidence,
- confidence,
- edge cases covered,
- reversal check,
- QA check,
- status.

Unverified requirements must be listed separately and excluded from publish claims.

### Conditional artifacts

Create these when relevant to the selected scope:

- `CAPABILITY_BASELINE.md` — required for famous-product or product-inspired System Buildprints.
- `THREAT_MODEL.md` — required for auth, payments, admin, public APIs, uploads, secrets, AI tools, or sensitive data.
- `DATA_LIFECYCLE.md` — required for persistent data, sync, imports/exports, deletion, migrations, or privacy concerns.
- `ARCHITECTURE_VIEWS.md` — required for System Buildprints.
- `DECISIONS.md` — required when defaults, assumptions, scope tradeoffs, or non-parity decisions are made.
- `OBSERVABILITY.md` — required for deployable products/services.
- `QUALITY_SCORECARD.md` — required before claiming product-proofed or publish-ready status.
- `PARITY_CLAIMS.md` — required for product-inspired/rebuild/parity scopes.
- `HEAD_TO_FOOT_QA.md` — required for runnable product/app/feature scopes.
- `RUNTIME_LIVE_TEST_PLAN.md` — optional separate plan when runtime/browser harness details are substantial.
