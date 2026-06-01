# Phase 09 — Auth and tenancy

requires_roles: [security-boundary, product-architect]

## Product intention

Protect user and tenant boundaries so private or public deployments do not leak data across sessions or identities.

## Mapped obligations

- Define authentication flow for interactive and API access.
- Define session lifecycle, expiration, and logout semantics.
- Define authorization rules for project/resource access.
- Define tenant isolation guarantees for private/public posture.

## Stable vs free

- Stable: access control outcomes, denied-path behavior, tenant data isolation, and auditability expectations.
- Free: auth provider choice, token format, internal middleware names, and project folder layout.

## Implementation scope

- Add auth/session checks to all protected routes and APIs.
- Enforce ownership/tenant checks on reads, writes, exports, and destructive actions.
- Add denied-path tests and explicit user-facing blocked states.
- Record tenant model assumptions in setup and handover.

## Interfaces touched

- UI auth states and protected navigation.
- API auth middleware and resource guards.
- Session storage/cookie/token contracts.

## State / runtime touched

- Session state and expiration behavior.
- User identity, ownership metadata, tenant keys.
- Auth/audit logs for denied and destructive actions.

## UX / DX / operator requirements

- Explain blocked access without leaking internals.
- Preserve work context after re-auth where safe.
- Keep operator troubleshooting path for auth failures.

## Required output (security-boundary)

- Auth, permission, secret, destructive-action, abuse, and data exposure boundaries are explicit.
- Negative tests exist for denied access and invalid input paths.
- Secret-name-only contracts are documented; no secret values in output.

## Blocks (security-boundary)

- Plaintext secrets in source or output.
- Admin/destructive actions without permission and confirmation.
- Public deployment posture without threat model and abuse controls.

## Required output (product-architect)

- Context and component boundaries cover user/session/tenant paths.
- Data flow includes auth check before domain side effects.

## Blocks (product-architect)

- Route-only auth without service/domain enforcement.
- Architecture that requires reading all packet files before next action.

## Quality bar

Unauthorized access is denied predictably, authorized access works across reload/restart, and no cross-tenant leakage is observed.

## Do not ship

- Shared global session for all users.
- Hidden auth bypass in API or worker paths.
- Tenant ids trusted from client input without server checks.

## Repair routing

- auth contradiction -> `02-project-setup.md`
- denied-path failure -> current phase
- security gap -> `04-review.md`

## Unlock condition

Protected resource access passes authorized tests and fails unauthorized/cross-tenant tests with clear blocked behavior.
