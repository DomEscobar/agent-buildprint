# 00 Intake

## Objective

Gather enough input to decide whether the requested output should be a Capability Buildprint, Product Buildprint, or something else.

## Acceptable inputs

- "Make a Stripe subscriptions capability"
- "Turn this RBAC code path into a reusable Buildprint"
- "Use these vendor docs to create an agent-installable capability"
- "Map this repo's auth integration into a capability packet"

## Intake checks

Determine:

- capability name and category
- desired host frameworks
- whether source code exists
- whether vendor/provider docs are needed
- whether secrets, billing, auth, database, migrations, or destructive side effects are involved
- whether the output is one capability or a whole product

## Hard stop

If the request requires building a whole app, route to Product Buildprint / Mapper OS instead.

If the capability cannot be bounded to one central promise, ask for scope before authoring files.

