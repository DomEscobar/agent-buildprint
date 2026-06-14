# 00 Request Classifier

## Objective

Classify the user's request before deepsearch, intake, or authoring. Buildprint Creator can create a reusable Capability Buildprint, but a greenfield product needs a product Buildprint flow instead.

## Classification

Choose exactly one route:

### Route A: Capability Buildprint

Use this route when the request is for one reusable graft into an existing host project.

Signals:

- adds one bounded capability such as billing, RBAC, auth, analytics, webhooks, deployment, or admin surface
- assumes a host app already exists
- can define compatibility, host assessment, integration phases, verification, and receipt
- can be reused across multiple host projects

Continue with `00-internet-deepsearch.md` and `00-intake.md`.

### Route B: Greenfield Product Buildprint

Use this route when the request is for a whole new product, app, SaaS, website, dashboard, marketplace, internal tool, game, or agent system.

Signals:

- asks to build a complete product from scratch
- needs product scope, UX identity, data model, app architecture, and end-to-end phases
- has multiple capabilities that must be composed into one product
- does not assume an existing host app
- success means a runnable product, not a reusable capability packet

Do not author a Capability Buildprint. Route to Product Buildprint / Buildprint Mapper OS and write a short handoff:

- product idea
- target users
- known constraints
- source/repo/docs provided
- open questions
- reason this is greenfield product work

### Route C: Ambiguous

Use this route when the request could be either a reusable capability or a greenfield product.

Ask one narrow classifier question:

`Is this meant to become a reusable capability packet for existing apps, or a full product Buildprint for a new app?`

Do not ask broad product questions until this is answered.

## DO NOT

- Do not squeeze a whole product into capability.yaml.
- Do not create a Capability Buildprint for a greenfield app just because the user used the word "capability".
- Do not deepsearch implementation technique until the output class is clear.
- Do not ask for detailed scope before deciding whether this is capability work or product work.
