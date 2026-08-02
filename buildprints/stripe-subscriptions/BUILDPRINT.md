# BUILDPRINT: Stripe Subscriptions Capability

You are applying one guarded Capability Buildprint to an existing host project. Your job is to add Stripe Checkout subscriptions, signed webhook handling, and persisted entitlement checks without guessing around the host app's auth, database, routing, or environment patterns.

This is not a whole-product Buildprint. It is a bounded capability packet for adding subscription billing to a compatible host app.

## Required read order

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-goal.md`
5. `01-host.md`
6. `loops/` (see `loops/loop-flow.md`)
7. `review.md`
8. `verify.md`

No source edits before `00-goal.md` hard stops and `01-host.md` assessment/plan. Kernel: goal → bare agentic loop → optional independent fan-out → contract review.


## Capability promise

Add Stripe subscription billing to a host app that already has user identity. The installed capability must create checkout sessions, verify Stripe webhook signatures, persist subscription state, and expose an entitlement check the host app can use.

## Local checkpoints

The applying agent must create these files in the host repo:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/capability-receipt.md
```

No source edits before host assessment and capability plan exist.

## Discovery decision gate

Host assessment must classify important findings as:

- `infer safely`
- `patch locally`
- `must ask user`
- `out of scope`

Stop before implementation when a `must ask user` finding changes user identity, entitlement model, billing provider migration, subscription state ownership, persistence/migration strategy, Stripe product/price mapping, webhook delivery, or access-control behavior. Do not continue by turning those decisions into assumptions. Verification must reconcile against the assessment and plan; if a baseline command, schema validation, migration, webhook proof, or entitlement readback fails, downgrade the claim instead of reporting installed success.

## Hard-stop conditions

Stop and ask instead of guessing when:

- the host has no identifiable user/session model
- the host has no persistence layer and the user has not approved one
- an existing billing provider is present and no migration decision exists
- the entitlement model is ambiguous
- production Stripe keys or webhook secrets are required but unavailable
- the baseline repo cannot validate/build/test in a way that makes billing proof trustworthy

## Success standard

Do not claim subscription billing is installed unless verification proves:

- checkout session creation is wired to an authenticated user
- webhook signature verification is enforced
- subscription state is persisted
- entitlement checks read persisted state
- missing configuration produces an actionable blocked/setup state
