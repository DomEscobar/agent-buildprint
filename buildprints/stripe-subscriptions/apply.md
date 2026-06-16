# Apply Protocol

## Objective

Install the Stripe Subscriptions capability through a guarded, phased grafting workflow.

## Required order

1. Read `capability.yaml`.
2. Run `00-host-assessment.md`.
3. Run `01-integration-plan.md`.
4. Implement each file in `02-implementation-phases/` in order.
5. Run `verify.md`.
6. Write `.buildprint/capability-receipt.md`.

## Local outputs

The applying agent must create:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/capability-receipt.md
```

## Implementation rule

Keep the capability bounded. Do not redesign auth, rebuild the dashboard, replace the database layer, or migrate an existing billing provider unless the user explicitly approved that extra scope.

Host assessment is a hard gate. Classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If any `must ask user` finding changes user identity, entitlement model, billing provider migration, subscription state ownership, persistence/migration strategy, Stripe product/price mapping, webhook delivery, or access-control behavior, stop and ask before source edits.

## Blocked-state rule

If Stripe secrets, product IDs, webhook secrets, or sandbox access are unavailable, still implement safe configuration checks and record blocked runtime proof. Do not fake live billing verification.

## DO NOT

- Do not skip local assessment and plan files.
- Do not implement when the host assessment decision is `block`.
- Do not implement webhook handling without signature verification.
- Do not persist paid access from checkout redirect alone.
- Do not claim sandbox or live proof without running the relevant checks.
