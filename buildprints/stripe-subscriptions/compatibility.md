# Compatibility

## Objective

Decide whether the host app can safely receive the Stripe Subscriptions capability before any source edits.

## Supported host families

This packet targets:

- Next.js app router or pages router apps with API routes/server actions
- Express-style Node APIs with an authenticated user context

Other hosts are allowed only if the applying agent can map every required surface to equivalent host primitives and records the adaptation in `.buildprint/capability-plan.md`.

## Required host features

The host must have:

- a way to identify the current authenticated user
- a persistence layer for customer, subscription, and entitlement state
- a server-side route or handler for checkout session creation
- a server-side route or handler that can receive Stripe webhooks with raw body access
- an environment/config pattern where missing secrets can be reported clearly

## Optional host features

These improve the integration but are not mandatory:

- existing billing settings page
- existing account page
- existing admin dashboard
- existing background job/audit logging path
- existing test runner or route test fixture

## Host detection signals

Inspect:

- `package.json` framework and dependency signals
- route directories such as `app/api`, `pages/api`, `server/routes`, or `src/routes`
- auth helpers, middleware, session functions, or user lookup utilities
- persistence tooling such as Prisma, Drizzle, Supabase, migrations, or SQL schema files
- env examples and config loaders
- any existing billing, subscription, customer, product, or entitlement files

## Composition rules

This capability expects:

- `auth.user_identity`

It provides:

- `billing.subscription_state`
- `billing.entitlement_check`

It composes well with:

- RBAC permissions, where subscription state controls role or permission access
- admin dashboard, where operators inspect billing status
- email notifications, where subscription events trigger transactional emails

## Conflicts

Block instead of adapting silently when:

- another billing provider already owns subscription state
- the host has no user identity model
- the host has no persistence layer and the user has not approved one
- webhook raw body access is impossible in the current routing/runtime setup
- the requested entitlement model conflicts with an existing access-control system

## Version support

Prefer the host app's existing package manager and dependency policy. Add the official Stripe SDK unless the host already uses an approved wrapper.

Do not pin provider APIs or SDK versions in this packet unless the host repository or current provider docs justify the pin during implementation.

