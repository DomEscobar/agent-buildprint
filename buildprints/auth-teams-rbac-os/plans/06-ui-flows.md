# Phase 06 — UI Flows

UI is implemented only after data model, permission engine, server guards, invites, and role safety exist. UI permission checks are UX affordances, not security.

## Goal

Add team/account management screens that expose the secure server behavior clearly without becoming the authorization source of truth.

## Required screens/flows

Adapt names to the product, but cover:

- team switcher / active team selector;
- team settings overview;
- member list with role/status;
- invite member form;
- pending invite list and revoke action;
- role change flow;
- member remove/suspend flow;
- audit log view for authorized users;
- billing/admin boundary view if billing is in scope.

## UI authorization rules

- UI may hide or disable controls based on permissions for usability.
- Server must still reject every forbidden action.
- UI must not embed sensitive permission facts for teams the user cannot access.
- Avoid trusting client-side team context; route params and selected team state are hints only.
- Error states must not reveal cross-tenant resource existence.

## Product behavior requirements

- Empty states explain how to invite the first/next member.
- Last-owner protection is visible and understandable.
- Pending/expired/revoked invites have distinct states.
- Role descriptions match actual permission matrix.
- Billing controls are visually and conceptually separate from generic team admin if permissions differ.
- Suspended/removed users cannot look active.
- Audit log access is not shown to users without `audit.read`.

## Abuse and edge cases

Test or explicitly block:

- hidden button action invoked directly through API;
- stale UI role options after actor is downgraded;
- switching teams leaves stale members/invites from previous team visible;
- optimistic UI shows success before server denies;
- invite token exposed in DOM/client logs;
- unauthorized user discovers another team/member through autocomplete or error text;
- browser back/forward cache shows protected team data after logout or team switch.

## Required tests

UI/browser tests are helpful, but not sufficient. Required coverage:

- direct API tests already exist for every UI mutation;
- UI renders allowed controls for allowed roles;
- UI hides/disables disallowed controls for UX;
- forbidden direct mutation still fails even if UI is manipulated;
- team switch clears stale scoped data;
- error states are safe and non-leaky;
- accessibility labels exist for member/invite/role controls.

## Copy/content requirements

Role descriptions must be concrete. Avoid vague copy such as “admin can manage everything” if billing, owner transfer, audit, or settings permissions are separate.

Recommended pattern:

- Owner: full control, including owner transfer and protected team settings.
- Admin: manage members and operational settings, except owner-only/billing actions unless configured.
- Member: normal product access.
- Viewer: read-only access.

## Acceptance gate

This phase is done only when:

- UI flows map to existing server routes/guards;
- every UI action has a direct server/API authorization test;
- team switching cannot leak stale data;
- role/invite states are clear and match server truth;
- the validation report explicitly says UI checks are UX only, not security.
