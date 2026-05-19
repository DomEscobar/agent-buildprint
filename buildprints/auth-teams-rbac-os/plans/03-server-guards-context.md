# Phase 03 — Server Guards & Request Context

This phase wires the permission engine into every server-side entry point. UI visibility is not security; every protected action must be guarded on the server.

## Goal

Create a single authorization path for server routes, API handlers, service functions, RPC procedures, background jobs, and server actions.

A request is authorized only after the server has resolved:

- the authenticated actor from the existing auth provider;
- the active team context;
- the actor’s membership in that team;
- the requested permission;
- the server-loaded resource tenant when applicable.

## Required guard patterns

Implement framework-appropriate equivalents:

```ts
requireUser(request): AuthUser
requireTeamContext(request): TeamContext
requirePermission(actor, teamId, permission): AuthzDecision
requireResourcePermission(actor, resourceId, permission): AuthzDecision
```

Use one guard layer consistently. Do not scatter checks like `if (role === 'admin')` across handlers.

## Context resolution rules

- Existing auth/session remains the source of user identity.
- Active team may come from route param, subdomain, selected workspace cookie, or server session — but must be validated against membership.
- Client-provided `teamId` is an input hint, not authority.
- Resource tenant is loaded from the database/server source before authorization.
- Background jobs must carry enough trusted context to re-check authorization or run under a documented system principal.

## Route inventory

Update `API_ROUTES.md` with every protected route/action:

| Route/action | Resource | Permission | Team source | Resource tenant source | Tests |
| --- | --- | --- | --- | --- | --- |
| `GET /api/team/:teamId/members` | members | `team.read` | route param + membership | team id | direct API allow/deny |
| `POST /api/team/:teamId/invites` | invite | `members.invite` | route param + membership | team id | direct API abuse cases |

Every team-scoped route must have a corresponding direct server/API test. Browser/UI tests are optional extras, not substitutes.

## Error handling

- unauthenticated → 401 / redirect to login;
- authenticated but no membership → 403;
- missing permission → 403;
- tenant mismatch → 404 or 403 by product policy, but do not leak sensitive resource details;
- unknown team/resource → 404;
- audit privileged denials if useful, but avoid noisy logs for normal anonymous probes.

## Abuse and edge cases

Test or explicitly block:

- direct API call bypassing hidden UI button;
- user switches `teamId` in URL/body/query;
- user accesses resource by ID from another team;
- stale session after role downgrade;
- background job executes with stale actor permissions;
- route has middleware but nested service function lacks guard;
- server action/RPC endpoint is forgotten because it is not a REST route.

## Required tests

For each team-scoped route/action:

- unauthenticated denial;
- authenticated non-member denial;
- wrong-team member denial;
- insufficient-role denial;
- allowed role success;
- stale-role/session recheck where applicable;
- direct API invocation, not only UI/browser path.

## Acceptance gate

This phase is done only when:

- `API_ROUTES.md` lists every protected entry point;
- no team-scoped route lacks direct authorization tests;
- server guards use the canonical permission engine;
- tenant mismatch is tested for resource reads and writes;
- frontend-only authorization is impossible to count as completion evidence.
