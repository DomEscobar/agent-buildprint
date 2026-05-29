# Stripe Billing Extension

Start with `BUILDPRINT.md`. It is the canonical authority spine for this package and owns the binding scope, read order, phase gates, and acceptance gates.

Portable Buildprint for adding SaaS billing with Stripe Checkout, customer portal, verified webhooks, server-side subscription state, entitlement checks, and billing settings.

The bundled TypeScript proof is a verified reference implementation, not the only target stack. Use `TARGET_STACK_ADAPTERS.md` to adapt the same billing contract to Python, Rails, Go, PHP/Laravel, or another backend.

No real Stripe SDK, Stripe keys, or network APIs are used in the proof.

Evidence boundary: the bundled TypeScript proof uses in-memory service-level storage. It includes an injectable test signature verifier and a minimal billing UI proof component, but no durable storage, real Stripe webhook verification, concrete framework routes/actions, endpoint configuration, or entitlement wiring into protected product paths. Production adaptations must add those pieces before shipping.

## Environment Variable Names

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PRO`
- `APP_BILLING_SUCCESS_URL`
- `APP_BILLING_CANCEL_URL`
- `APP_BILLING_PORTAL_RETURN_URL`

## Proof commands

```sh
cd proof
target verification command
npm run build
```

## Portability rule

Keep the architecture stable across stacks:

Checkout → Webhook → Subscription State → Entitlements → Portal/Billing UI

Translate framework details, but do not weaken the security boundaries: raw-body webhook verification, server-side entitlement checks, authenticated portal access, and mocked lifecycle tests.
