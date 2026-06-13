# BUILDPRINT: Stripe Subscriptions Capability

You are applying one guarded Capability Buildprint to an existing host project. Your job is to add Stripe Checkout subscriptions, signed webhook handling, and persisted entitlement checks without guessing around the host app's auth, database, routing, or environment patterns.

This is not a whole-product Buildprint. It is a bounded capability packet for adding subscription billing to a compatible host app.

## Required read order

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-host-assessment.md`
5. `01-integration-plan.md`
6. `apply.md`
7. `02-implementation-phases/01-contract-and-config.md`
8. `02-implementation-phases/02-core-integration.md`
9. `02-implementation-phases/03-host-wiring.md`
10. `02-implementation-phases/04-user-operator-surface.md`
11. `02-implementation-phases/05-verification-and-receipt.md`
12. `verify.md`

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

## Hard-stop conditions

Stop and ask instead of guessing when:

- the host has no identifiable user/session model
- the host has no persistence layer and the user has not approved one
- an existing billing provider is present and no migration decision exists
- the entitlement model is ambiguous
- production Stripe keys or webhook secrets are required but unavailable

## Success standard

Do not claim subscription billing is installed unless verification proves:

- checkout session creation is wired to an authenticated user
- webhook signature verification is enforced
- subscription state is persisted
- entitlement checks read persisted state
- missing configuration produces an actionable blocked/setup state

