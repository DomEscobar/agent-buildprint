# 03 Host Wiring

## Objective

Connect the API key core to actual host routes, actions, middleware, or controllers.

## Required inputs

- core integration from phase 02
- host route/controller pattern
- selected API surface
- owner and tenant boundary rules
- selected scope model

## Instructions

Wire:

- API key extraction from the chosen header or auth scheme
- server-side verification helper into one selected API route/action/controller
- scope check for that route/action/controller
- owner/team/tenant boundary checks where the host has a tenant model
- missing, malformed, revoked, expired, and wrong-scope response states
- last-used or audit event write for successful use

Prefer a conventional header such as:

```text
Authorization: Bearer <api-key>
```

Use another host-approved convention only when the plan records why.

## Proof before moving on

- selected API route/action rejects missing API key
- selected API route/action accepts valid active key
- selected API route/action rejects revoked key
- selected API route/action rejects wrong scope
- host tenant/owner boundary is preserved

## DO NOT

- Do not validate API keys in client code.
- Do not bypass existing auth/RBAC helpers when they own tenant boundaries.
- Do not leave the core library unused by the app.
- Do not return full key secrets in errors, logs, or responses after creation.
