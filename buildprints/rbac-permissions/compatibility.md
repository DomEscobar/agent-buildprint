# Compatibility

## Objective

Decide whether the host app can safely receive RBAC before any source edits.

## Supported host families

This packet targets:

- Next.js apps with server routes/actions, middleware, or server components
- Express-style APIs with authenticated request context
- Hono-style APIs with middleware and typed handlers

Other hosts are allowed only when the applying agent can map identity, policy, protected surfaces, and tests to equivalent host primitives.

## Required host features

The host must have:

- a stable authenticated user identity
- at least one route/action/API surface worth protecting
- a place to store, derive, or configure user roles
- a test, fixture, or local harness path for allow/deny behavior

## Optional host features

These improve the integration:

- existing admin or settings page
- team/workspace membership model
- audit log
- seed data system
- typed schema or validation library

## Host detection signals

Inspect:

- `package.json` framework, router, auth, ORM, and test signals
- auth helpers, middleware, session functions, or user lookup utilities
- route protection or admin guard code
- role, permission, membership, team, workspace, or subscription fields
- persistence tooling such as Prisma, Drizzle, Supabase, migrations, or SQL schema files
- test files and fixture patterns

## Role model choices

Supported models:

- global user role, such as `admin`, `member`, `viewer`
- workspace/team membership role, such as `owner`, `admin`, `member`
- hybrid model, where global admin bypasses workspace-level checks only when explicitly declared

Block when the host needs a team/workspace model but none exists and the user has not approved adding one.

## Composition rules

This capability expects:

- `auth.user_identity`

It provides:

- `auth.role_state`
- `auth.permission_check`
- `auth.protected_surface`

It composes well with:

- Stripe subscriptions, where paid state can unlock permission groups
- admin dashboards, where RBAC protects operator surfaces
- audit logs, where denied and privileged actions are recorded
- team/workspace models, where roles are scoped to an organization

## Conflicts

Block instead of adapting silently when:

- a custom permission system already exists
- route-level protection and UI-level protection disagree
- the host has multiple user identity sources
- the default role or admin bootstrap path is not known
- RBAC would change access to production-sensitive data without approval

## Version support

Prefer plain host-native code over introducing a new authorization library. Add a library only when the host already uses it or the plan justifies it clearly.

