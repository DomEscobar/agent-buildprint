# Phase 09 - Auth and tenancy

requires_roles: [security-boundary]

## Product intention

This phase is included but blocked under trusted-local posture.

## Mapped obligations

Add authentication, sessions, tenant/project isolation, authorization checks, and user-data boundaries before private or public deployment.

## Stable vs free

Stable: no public/private deployment without real auth and isolation.

Free: auth provider and implementation approach.

## Implementation scope

Blocked until posture is promoted.

## Interfaces touched

Routes, APIs, persistence, uploads, reports, simulations.

## State / runtime touched

User/session/tenant state.

## UX / DX / operator requirements

Private/public users must not see or mutate another user's projects, graph data, reports, or provider config.

## Required output (security-boundary)

Implement and verify auth/session/tenant boundaries before promotion.

## Blocks (security-boundary)

No shared public instance with trusted-local assumptions.

## Quality bar

Tenant isolation is tested through UI/API.

## Do not ship

Public deployment without auth and tenancy.

## Repair routing

Promote posture and implement this before public/private release.

## Unlock condition

Posture is promoted and auth/tenancy proof exists.

