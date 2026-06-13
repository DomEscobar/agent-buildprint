# Verify

## Objective

Prove the Stripe Subscriptions capability works at the highest honest proof level available.

## Required command checks

Run available host checks:

- tests
- lint
- typecheck
- build

If a command does not exist, record that in `.buildprint/capability-receipt.md`.

## Required structural checks

Confirm:

- env example includes required Stripe keys without values
- checkout route/action exists
- webhook route/action exists
- webhook signature verification is enforced
- entitlement persistence exists
- entitlement helper is used by at least one host surface
- missing config produces an actionable blocked/setup state

## Runtime checks

At `fixture` proof or higher:

- checkout helper rejects unauthenticated users
- webhook handler rejects invalid signatures
- signed subscription event updates persisted subscription state
- entitlement helper reads persisted subscription state

At `sandbox` proof or higher:

- sandbox checkout session can be created
- Stripe webhook event is received through Stripe CLI, tunnel, or test harness
- subscription status updates after webhook delivery

## Blocked checks

Record blockers for:

- missing `STRIPE_SECRET_KEY`
- missing `STRIPE_WEBHOOK_SECRET`
- missing `STRIPE_PRICE_ID`
- unavailable Stripe CLI/tunnel
- host test runner unavailable
- ambiguous entitlement model

## Pass condition

The capability can be called installed only if:

- command checks pass or are honestly unavailable
- structural checks pass
- runtime checks pass at the claimed proof level
- blocked checks are documented
- `.buildprint/capability-receipt.md` exists

