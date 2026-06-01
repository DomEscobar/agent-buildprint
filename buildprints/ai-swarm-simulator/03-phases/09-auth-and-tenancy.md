# Phase 09 - Auth And Tenancy Hardening

requires_roles: [security-boundary, product-architect]

## Product intention

Block promotion beyond trusted-local until users, sessions, tenants, and project isolation are real.

## Mapped obligations

- Add authentication and session management.
- Isolate projects, uploads, graph namespaces, simulations, reports, and chats by user/tenant.
- Prevent cross-user graph/report access.

## Stable vs free

Stable: no public/private authenticated claim without isolation.

Free: auth provider and tenancy model.

## Implementation scope

Included but blocked under trusted-local posture.

## Interfaces touched

Auth middleware, project APIs, graph-memory namespace, report/simulation APIs.

## State / runtime touched

Users, sessions, tenant ids, access policies.

## UX / DX / operator requirements

Users must see session state and permission failures clearly.

## Required output (security-boundary)

Auth/session/tenant implementation and access-control tests.

## Blocks (security-boundary)

Any public/private deployment claim without access-control tests.

## Quality bar

Tenant A cannot read Tenant B project, graph, simulation, report, or upload.

## Do not ship

Do not rely on hidden ids as security.

## Repair routing

Security posture gaps go to this phase.

## Unlock condition

Posture is promoted and access boundaries pass tests.
