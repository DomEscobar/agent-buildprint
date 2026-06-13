# 02 Core Integration

## Objective

Build the capability's core behavior in a bounded module or service that can be tested before broad host wiring.

## Implement

- core service/helper/provider wrapper
- normalized data and error handling
- idempotency/retry behavior when relevant
- permission or entitlement checks when relevant
- fixture or sandbox path for verification

## Proof before moving on

- core path can be exercised without relying on unrelated UI
- expected success and failure modes are represented
- provider/live claims are blocked unless credentials and runtime evidence exist

## DO NOT

- Do not scatter provider logic across unrelated UI or route files.
- Do not fake external provider success.
- Do not skip negative paths for auth, billing, RBAC, webhooks, migrations, or destructive actions.

