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
- validation results,
- secrets check result,
- known gaps,
- human review questions,
- estimated package tier.

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
