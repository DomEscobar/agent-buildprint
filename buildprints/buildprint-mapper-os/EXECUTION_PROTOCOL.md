# Mapper OS Execution Protocol

Use this protocol when an agent runs Mapper OS against a source project.

## Global Loop

1. Intake: identify source input, output target, requested scope, risk posture, and success criteria.
2. Source acquisition: open local source or clone/check out Git URL into a temporary read-only location.
3. Safe census: collect hints and secret-safe metadata only.
4. Capability discovery: read source surfaces and promote claims with evidence.
5. Scope selection: choose candidate, explicit scope, or full-suite; otherwise remain discovery-only.
6. Distillation: convert source facts into source-independent capability contracts.
7. Execution planning: define first slice, verification gate, repair loop, review trigger, and handoff rule per included capability.
8. Verification: run applicable gates or record blockers.
9. Handoff: state label, next capability, evidence, skipped checks, blockers, and residual risk.

## Context Rules

- Read only files relevant to the active discovery or capability decision.
- Summarize evidence before planning.
- Do not let census output author product facts.
- Do not require downstream implementers to inspect source after qualification.

## Repair Loop

For every failed gate:

```text
failed check
-> observed failure
-> likely capability or contract gap
-> focused next action
-> rerun check
-> pass or blocker
```

## Fresh Review Triggers

Use a fresh-context review for auth, billing, admin, uploads, user data, external providers, webhooks, persistence, async processing, queues, destructive actions, broad refactors, or weak verification evidence.
