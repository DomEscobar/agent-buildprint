# 02 Core Integration

## Objective

Implement the reusable Stripe billing core that routes and UI can call.

## Required inputs

- Stripe config from phase 01
- user identity contract
- persistence contract
- selected entitlement model

## Instructions

Implement or adapt:

- Stripe client creation
- checkout session creation helper
- customer lookup/creation helper
- subscription state persistence helper
- entitlement read helper
- idempotency strategy for webhook events when the host supports it

The core must keep provider logic separate from route and UI wiring where the host architecture allows it.

## Proof before moving on

- checkout helper requires an authenticated user id
- entitlement helper reads persisted state
- webhook state update helper can be called from a signed webhook route
- missing config path returns a setup/blocker state, not a crash hidden in logs

## DO NOT

- Do not treat a successful redirect as proof of paid status.
- Do not mix route parsing, provider logic, and UI state in one untestable block unless the host is extremely small and the plan says so.
- Do not invent user IDs.

