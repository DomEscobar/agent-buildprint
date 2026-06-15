# Compatibility

## Objective

Decide whether the host app can safely receive the API Key Management capability before any source edits.

## Supported host families

This packet targets server-rendered or API-capable JavaScript/TypeScript apps with authenticated owners or an explicitly approved service-account owner model and persistence, including:

- Next.js app router or pages router apps with API routes/server actions
- Express or Hono-style Node APIs

Other hosts are allowed only if the applying agent can map every required surface to equivalent host primitives and records the adaptation in `.buildprint/capability-plan.md`.

Rails and Django are plausible future adaptation targets, but they are not currently proven by this packet's dogfood receipts.

## Required host features

The host must have:

- a way to identify the current authenticated user, or an explicit service-account owner decision recorded in the capability plan
- an owner model for keys: user, team, organization, or service account
- a persistence layer for API key metadata and hashes
- a server-side API route, action, controller, or middleware path to protect
- a place to expose one-time key creation and revocation, or an approved API-only operator path

## Optional host features

These improve the integration but are not mandatory:

- existing RBAC or permission helpers
- audit/event logging path
- account/team settings page
- existing rate limiting for API endpoints
- background job or webhook delivery system
- test runner with route or request fixtures

## Host detection signals

Inspect:

- framework and dependency signals in package or project files
- route directories such as `app/api`, `pages/api`, `server/routes`, `src/routes`, controllers, or view modules
- auth helpers, middleware, session functions, user lookup utilities, and organization/team helpers
- persistence tooling such as Prisma, Drizzle, Supabase, SQL migrations, Rails migrations, or Django models
- env examples and config loaders
- existing API key, token, webhook, integration, audit, or RBAC files

## Composition rules

This capability expects:

- `auth.user_identity` for user/team/organization-owned keys
- an approved `service_account` owner model for server-to-server API hosts without user sessions

It provides:

- `auth.api_key_state`
- `auth.api_key_authentication`
- `auth.scoped_api_access`
- `audit.api_key_events`

It composes well with:

- RBAC permissions, where API key scopes map to central permissions
- audit logs, where key lifecycle and usage events are recorded
- rate limiting, where key identity becomes the rate-limit subject
- outgoing webhooks, where API keys protect management endpoints

## Conflicts

Block instead of adapting silently when:

- another token or API key system already owns this surface
- the host has no user/team/organization model and no approved service-account owner decision
- the host has no persistence layer and the user has not approved one
- the selected API surface has unclear tenant boundaries
- requested scopes conflict with existing RBAC or permission policy
- the host cannot keep secret verification server-side

## Version support

Prefer the host app's existing crypto/runtime facilities:

- Node: use maintained runtime crypto APIs or approved framework helpers.
- Rails or Django: block or mark unproven until an adapter proof exists.

Do not hand-roll cryptographic algorithms. Do not pin a library unless the host repository or current official docs justify it during implementation.
