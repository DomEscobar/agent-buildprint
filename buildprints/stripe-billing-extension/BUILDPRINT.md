---
title: Stripe Billing Extension
slug: stripe-billing-extension
category: Extension
stack: [TypeScript, Stripe, Webhooks, SaaS]
difficulty: Medium
---

# Stripe Billing Extension Buildprint

## Agent Operating Contract

Build a SaaS billing module that adds Stripe Checkout, customer portal access, verified webhook handling, server-side subscription state, entitlement guards, billing UI, and lifecycle tests to an existing product application.

The contract is stack-adaptable. Preserve the same billing boundaries in the host app's framework instead of forcing the bundled TypeScript proof structure into another stack.

## Binding Implementation Slice

The included local proof demonstrates the service-level billing contract with:

- checkout session creation through an injectable billing provider;
- customer portal session creation from the authenticated user's stored customer relation;
- webhook handling that requires a signature header before state mutation;
- server-side subscription state for `trialing`, `active`, `past_due`, `canceled`, `unpaid`, and `none`;
- entitlement checks that grant premium access only from server-side state;
- a minimal billing UI proof component;
- lifecycle tests with deterministic provider and webhook fixtures.

The proof intentionally uses in-memory storage and local provider fixtures. Production adaptation requires durable storage, real Stripe SDK calls, raw-body webhook verification, authenticated concrete routes/actions, configured webhook endpoint secrets, and entitlement checks wired into protected server paths.

## Non-Goals / Unsafe Claims

- Do not claim production billing is complete from the local proof alone.
- Do not call mock providers production Stripe behavior.
- Do not fake payment state in production.
- Do not grant access from checkout success URLs, query params, cookies without server verification, or frontend flags.
- Do not expose a portal session for another user's customer id.
- Do not skip raw-body webhook signature verification.
- Do not commit Stripe secret values.
- Do not count service functions as concrete HTTP routes/actions until adapted to the target framework.

## Required Read Order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `TARGET_STACK_ADAPTERS.md`
5. `TEST_MATRIX.md`
6. `README.md`
7. `proof/` only as a behavioral reference

## Phase Gates

1. Target stack alignment: identify backend language, framework, routing style, auth/current-user pattern, database or ORM, user/account/team model, environment conventions, and test runner.
2. Data model: persist billing customer and subscription state connected to the app user/account.
3. Checkout: implement an authenticated server endpoint/action that uses a server-selected price id.
4. Portal: implement an authenticated endpoint/action that uses the stored customer id for the current user only.
5. Webhooks: verify the Stripe signature from the raw request body before parsing or mutating state.
6. Entitlements: protect paid server paths with checks against server-side subscription state.
7. Billing UI: show server-derived status and provide checkout/portal actions.
8. Tests: cover checkout, portal auth, signature failure, lifecycle transitions, entitlement denial, and secret hygiene.

## Acceptance Gates

Local proof acceptance requires:

- service-level checkout, portal, webhook, entitlement, and UI proof tests pass with deterministic provider fixtures;
- webhook handler rejects missing/invalid signatures before subscription state changes;
- entitlement decisions use server-side stored state in the proof;
- no secret values are committed.

Production adaptation acceptance requires:

- Webhook signatures are verified before subscription state changes.
- Premium access never trusts frontend state.
- Customer portal access requires an authenticated user and their stored customer id.
- `trialing`, `active`, `past_due`, `canceled`, and `unpaid` states are handled.
- Expired active or trialing periods deny premium entitlement.
- Tests cover checkout creation, portal creation, webhook updates, invalid signatures, and entitlement guard behavior.
- Required environment variables are documented by name only.
- No secret values are committed.

## Purpose

Use this Buildprint when adding paid plans, subscription lifecycle handling, and server-enforced entitlements to a SaaS or product application.

## Architecture

```txt
Authenticated User
  -> Checkout Endpoint/Action
  -> Stripe Checkout Session
  -> Verified Webhook Endpoint
  -> Subscription State Store
  -> Server Entitlement Guard
  -> Protected Product Paths

Authenticated User
  -> Billing Settings UI
  -> Customer Portal Endpoint/Action
  -> Stripe Billing Portal Session
```

Required environment variable names:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PRO`
- `APP_BILLING_SUCCESS_URL`
- `APP_BILLING_CANCEL_URL`
- `APP_BILLING_PORTAL_RETURN_URL`

## Evidence Boundary

The bundled TypeScript proof is accepted evidence for the local service contract and test behavior only. It is not evidence of production Stripe configuration, durable persistence, deployed routes, endpoint registration, or protected-path integration.

Production evidence must include target-stack route/action implementation, real Stripe SDK integration, durable database state, raw-body webhook verification, protected server path checks, and passing lifecycle tests.

## Required Validation

For the proof:

```sh
cd proof
npm test
npm run build
```

For a production adaptation, run the host app's equivalent unit/integration tests and record how each `TEST_MATRIX.md` risk is covered.

## Copyable Agent Prompt

Build the Stripe Billing Extension from this Buildprint. First inspect the target app's backend stack, routing, auth, database, user/account model, environment conventions, and test runner. Then implement checkout creation, customer portal creation, raw-body verified webhook handling, durable subscription state, server-side entitlement guards, a billing settings UI, and lifecycle tests. Use environment variable names only and never include secret values. Treat the bundled TypeScript proof as service-level reference evidence only; production work must add real Stripe SDK integration, durable storage, authenticated concrete routes/actions, endpoint configuration, and entitlement wiring into protected server paths.
