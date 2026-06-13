# 03 Host Wiring

## Objective

Connect the billing core to actual host routes, actions, or controllers.

## Required inputs

- core integration from phase 02
- host route pattern
- auth/session access pattern
- raw body handling strategy for webhooks

## Instructions

Wire:

- checkout session creation route/action
- webhook route with raw body access
- webhook signature verification using `STRIPE_WEBHOOK_SECRET`
- subscription event handling for active, trialing, past_due, canceled, and deleted states as applicable
- entitlement helper usage in at least one protected route, server helper, or middleware surface

## Proof before moving on

- checkout path cannot run without authenticated user identity
- webhook path rejects unsigned or invalid signatures
- subscription state updates go through persistence helper
- at least one host surface uses the entitlement helper

## DO NOT

- Do not parse webhook payload before signature verification in a way that invalidates raw body checks.
- Do not expose secret-bearing config to client bundles.
- Do not leave the core library unused by the app.

