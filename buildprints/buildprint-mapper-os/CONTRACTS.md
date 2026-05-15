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
- unknowns and confidence.
