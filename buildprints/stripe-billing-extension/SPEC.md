# Stripe Billing Extension Spec

## Goal

Add a paid SaaS billing feature with Stripe Checkout, customer portal, verified webhooks, server-side subscription state, entitlement checks, and a billing settings UI. The Buildprint is backend-stack agnostic: implement the same contracts in the user's existing stack instead of forcing the TypeScript proof structure.

## Core behaviors

1. Checkout creation requires an authenticated user and a server-selected price id.
2. Customer portal creation requires the authenticated user's stored Stripe customer id.
3. Webhooks must verify the Stripe signature before changing subscription state.
4. Subscription state is stored server-side and includes customer id, subscription id, price id, status, period end, and update time.
5. Premium access is granted only from server-side subscription state, never from frontend flags/query params.
6. The billing UI reflects server state and offers checkout / portal actions.
7. Local tests use mocked Stripe/provider events and no network calls.
8. Target-stack adapters preserve the same security boundaries in Node/TypeScript, Python, Rails, Go, PHP/Laravel, or another backend.

## Subscription statuses

Handle at minimum:

- `trialing`
- `active`
- `past_due`
- `canceled`
- `unpaid`
- `none`

## Required environment variable names

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PRO`
- `APP_BILLING_SUCCESS_URL`
- `APP_BILLING_CANCEL_URL`
- `APP_BILLING_PORTAL_RETURN_URL`

Use names only in generated examples unless the human provides real values separately.

## Target stack adaptation

Before implementation, inspect the host app's:

- backend language and framework
- routing style
- auth/current-user access pattern
- database/ORM/storage layer
- existing user/account/team model
- test runner and mocking style

Then adapt the universal billing contract from `TARGET_STACK_ADAPTERS.md`. The TypeScript proof is a behavioral reference only.

## Implementation phases

### Phase 0 — Target stack alignment

Identify the host app's backend stack, routing style, auth/current-user pattern, database/ORM, existing user/account/team model, and test runner. Read `TARGET_STACK_ADAPTERS.md` and choose the closest adapter before writing code.

Do not force TypeScript proof structure into non-TypeScript apps. Preserve the universal billing contract and security boundaries.

### Phase 1 — Data model

Define a billing customer/subscription state model connected to the app user/account.

### Phase 2 — Checkout endpoint

Create a server endpoint/service that creates a checkout session using a server-selected price id and authenticated user id.

### Phase 3 — Portal endpoint

Create a portal endpoint/service that looks up the authenticated user's stored Stripe customer id. Never accept arbitrary customer ids from the client.

### Phase 4 — Webhooks

Implement raw-body webhook handling with Stripe signature verification before state mutation.

Handle:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

### Phase 5 — Entitlements

Implement server-side entitlement guards. Premium access should be true only for valid `active` or `trialing` subscriptions with an unexpired period.

### Phase 6 — Billing UI

Add a simple settings page/component showing current billing status plus checkout and portal actions.

### Phase 7 — Tests

Use mocked provider sessions and mocked verified webhook events. Test checkout, portal auth, signature failure, status transitions, and entitlement denial.
