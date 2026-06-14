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
- what current official docs, source examples, competing techniques, or benchmark evidence have already been inspected
- whether secrets, billing, auth, database, migrations, or destructive side effects are involved
- whether the output is one capability or a whole product

## Before asking

If the user has not supplied enough context, first complete `00-internet-deepsearch.md`.

Then ask only narrow hard-stop questions that internet deepsearch cannot answer:

- target host framework or version if it cannot be inferred
- provider/account choices
- acceptable risk, cost, migration, or security tradeoffs
- permission to inspect private repositories or systems
- product decisions that official docs and source evidence cannot decide

Do not ask broad "what should this include?" or "which approach should I use?" questions while official docs, source files, known examples, and competing techniques are still unchecked.

## Hard stop

If the request requires building a whole app, route to Product Buildprint / Mapper OS instead.

If the capability cannot be bounded to one central promise, ask for scope before authoring files.
