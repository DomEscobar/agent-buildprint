# Buildprint Type Eval Synthesis

Status: tournament churn is paused. Both active tracks have documented 47/50 champions, so more random rounds are unlikely to teach the right thing.

## Root invariant

A strong Buildprint is not one universal phase list. It is a product-quality execution kernel that must adapt to the artifact type while preserving the same non-negotiables:

1. observable goal / first successful loop;
2. explicit acceptance criteria;
3. artifact-type execution spine;
4. state / boundary / failure honesty;
5. verification evidence before handover;
6. no fake-done shortcuts.

## Evidence so far

| Track | Target | Champion | Score | What it proves |
|---|---|---:|---:|---|
| A | Microfish normal-user product app | Consumer-First Product System / Consumer-First Phased | 47/50 | Product-app Buildprints need normal-user UX first: one obvious action, plain-language result, state/export, then architecture/verification discipline. |
| B | CheckoutBridge local Stripe-like plugin | Developer-First Framework | 47/50 | Integration/plugin Buildprints need adoption and seams first: configure loop, fake adapter contract, idempotency, recovery, audit trail, docs/tests. |

Champion records:

- `experiments/buildprint-type-eval/champions/microfish-product-app.md`
- `experiments/buildprint-type-eval/champions/checkoutbridge-plugin.md`

## Main conclusion

Buildprint should become a **typed Buildprint family** with a shared kernel, not a single Consumer-First product-app structure forced onto every artifact.

The shared kernel should look like:

```text
00-goal-and-boundaries
01-artifact-type-alignment
02-first-successful-loop
03-state-boundaries-failures
04-architecture-seams
05-quality-and-verification
06-handover
```

Then each artifact type specializes the middle of the spine.

## Type specializations

### Product app

Use when the consumer is an end user inside an app UI.

```text
00-product-promise-and-user
01-first-run-ux
02-result-composition
03-domain-state-export
04-architecture-garden
05-screenshot-critique-and-verify
06-handover
```

Primary quality risks:

- expert-dashboard feel;
- too many competing actions before value;
- jargon before result;
- result ignores user input;
- state/export feels bolted on;
- tests pass while actual UX is awkward.

### Plugin / integration / framework

Use when the consumer is a developer/operator adopting a boundary with another system.

```text
00-adoption-contract
01-install-configure-loop
02-api-adapter-seams
03-first-host-action
04-events-retries-idempotency
05-failure-recovery-and-observability
06-docs-tests-handover
```

Primary quality risks:

- fake live-mode success;
- secret leakage or real credential requests;
- integration only described, not operable;
- idempotency/retries claimed but not observable;
- recovery paths are static copy;
- docs do not match the runnable product.

### Reliability / backend service

Use when the core artifact is stateful service behavior rather than consumer UI.

```text
00-service-goal-and-slo
01-state-machine-and-data-contracts
02-happy-path-transaction
03-retry-failure-recovery
04-observability-and-admin-controls
05-load/error/regression-checks
06-runbook-handover
```

Primary quality risks:

- in-memory demo counted as durable system;
- edge cases handled only in prose;
- no restart/readback story;
- observability missing from operator path;
- tests ignore failure transitions.

## Anti-fixes

Do not respond to the eval by:

- declaring Consumer-First universal because it won product-app slices;
- declaring Developer-First universal because it won CheckoutBridge;
- adding a giant checklist to every Buildprint type;
- optimizing validators to recognize champion phrasing;
- running more random rounds just to search for 48/50;
- lowering the rubric so a synthesis looks better than it is.

## Recommended next build step

Replace the current framing with:

1. a shared Buildprint kernel;
2. explicit artifact-type selection;
3. Product App and Plugin/Integration specializations as first-class modes;
4. quality gates that are type-aware;
5. a short decision rule for when to use each type.

The next proof should not be another tournament. It should be a **single synthesis specimen**: update the public/internal draft to explain the typed family, then run existing syntax/package gates and inspect the rendered artifact.

## Paused work

Cron job `060d10d5-ac5f-4db5-9569-9dc078a22035` (`Buildprint type eval tournament`) has been disabled. Re-enable only if there is a concrete synthesis test question, not for random churn.
