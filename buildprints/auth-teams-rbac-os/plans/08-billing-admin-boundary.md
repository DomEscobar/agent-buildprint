# Phase 08 — Billing/Admin Boundary

Billing authority is security-sensitive and often legally/financially sensitive. Do not treat “admin” as automatically allowed to manage billing unless the product explicitly chooses that policy.

## Goal

Define and enforce the boundary between team administration, owner authority, billing authority, and product settings.

## Required decisions

Document the product policy:

- Who can view billing status?
- Who can manage subscription/payment method/invoices?
- Is billing tied to team owner, separate billing manager, or generic admin?
- Can admins invite/remove users but not manage billing?
- Are API keys, webhooks, integrations, or SSO settings owner-only?
- What happens when the billing owner leaves or is removed?

No default “admin gets all billing” assumption.

## Permission separation

Keep explicit permissions for sensitive domains:

- `billing.manage` for subscription/payment/invoice actions;
- `settings.update` for product/team settings;
- `members.role.update` for role mutation;
- `audit.read` for audit visibility;
- API key/integration permissions if in scope.

If the product maps `billing.manage` to owner by default, encode that in the role matrix and tests.

## Server requirements

Billing/admin routes must:

1. resolve actor from existing auth;
2. resolve active team membership;
3. check billing/admin-specific permission;
4. load billing customer/subscription by server-owned `teamId`, not client-provided customer id;
5. emit audit events for privileged changes;
6. avoid exposing payment secrets or provider credentials.

Stripe/customer/provider IDs must be treated as sensitive implementation details and mapped through tenant-owned records.

## Abuse and edge cases

Test or explicitly block:

- admin without billing permission changes subscription;
- user sends another team’s billing customer id;
- removed owner still has provider portal session;
- billing portal/session created for wrong team;
- role downgrade does not revoke billing access;
- generic settings endpoint mutates billing settings;
- invoices/payment metadata leaks across teams;
- webhook updates team billing state without tenant verification.

## Required tests

- `billing.manage` allow/deny matrix;
- admin-without-billing denial if policy separates them;
- owner billing success if owner has billing permission;
- server-side customer/team lookup ignores client-provided customer id;
- cross-team billing access denial;
- audit event for billing change/session creation where applicable;
- webhook tenant mapping test if billing provider webhooks are in scope.

## UI requirements

- Billing UI must explain who can manage billing.
- Generic admins should not see actionable billing controls unless authorized.
- Billing errors should not reveal another team’s subscription/customer details.
- If external billing portal is used, portal creation must be server-gated.

## Acceptance gate

This phase is done only when:

- billing/admin policy is explicit;
- role matrix includes billing/settings/audit boundaries;
- billing routes use tenant-owned provider mappings;
- direct server/API tests cover cross-team and insufficient-permission attempts;
- audit events exist for privileged billing/admin changes;
- no UI-only billing protection is counted as completion evidence.
