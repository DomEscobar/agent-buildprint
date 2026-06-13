# 01 Capability Boundary

## Objective

Make the capability precise enough that another agent can apply it without guessing.

## Define

- capability slug
- one-sentence promise
- host project assumptions
- execution profile: `light`, `guarded`, or `strict`
- required existing capabilities
- provided capabilities
- conflicts
- risk level and reason
- failure modes

## Boundary test

The capability must fit this sentence:

```text
Add <specific capability> to a host project that already has <host assumptions>.
```

Bad:

```text
Add payments.
```

Good:

```text
Add Stripe Checkout subscriptions, signed webhook handling, and persisted entitlement checks to a Next.js app that already has user authentication.
```

## DO NOT

- Do not include multiple unrelated capabilities.
- Do not bury prerequisites in prose.
- Do not claim "works with any stack" unless the packet defines adaptation rules and proof expectations.

