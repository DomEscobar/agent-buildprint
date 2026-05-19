# Phase 04 — Invite & Membership Lifecycle

This phase implements how people enter, leave, and move through teams. Treat invites as security-sensitive grants, not just emails.

## Goal

Create a safe lifecycle for invitations and memberships that preserves tenant boundaries and prevents replay, privilege escalation, and stale access.

## Required lifecycle states

Model or map equivalent states:

- invite: `pending`, `accepted`, `revoked`, `expired`;
- membership: `active`, `pending`, `suspended`, `removed`.

Inactive or pending memberships must not authorize normal team permissions.

## Invite requirements

Every invite must include:

- `teamId`;
- target email or identity claim;
- intended role;
- inviter user id;
- expiry timestamp;
- single-use token or nonce;
- accepted/revoked timestamps where applicable;
- audit event for create, revoke, accept, expire when practical.

Rules:

- Invite acceptance must verify exact email/identity unless product explicitly supports domain invites.
- Expired, revoked, or already-used invites deny.
- Invite tokens must not be logged or exposed in audit metadata.
- The inviter must have `members.invite` at creation time.
- The accepted role must be within the inviter’s grant ceiling.
- Invites to owner/admin roles require explicit policy and tests.

## Membership creation and removal

- Create membership inside a transaction when accepting an invite.
- Prevent duplicate active memberships for the same user/team.
- Re-check invite validity at acceptance time.
- Removal must enforce last-owner protection.
- Suspension/removal must immediately deny future permission checks.
- Leaving a team must be blocked if it would remove the last owner.

## Abuse and edge cases

Test or explicitly block:

- accepting an invite after expiry;
- accepting a revoked invite;
- accepting an invite twice;
- accepting with a different email/user than invited;
- admin invites owner when only owners can grant owner;
- removed member uses old invite/session to regain access;
- invite token appears in logs, audit events, or client-visible metadata;
- domain invite creates unexpected owner/admin membership;
- team deletion leaves valid invites behind.

## Required tests

- invite create allow/deny by role permission;
- exact-email acceptance;
- expiry denial;
- revoke denial;
- single-use denial;
- grant-ceiling denial;
- duplicate membership prevention;
- removed/suspended membership denies authorization;
- audit events for invite create/revoke/accept without token leakage.

## UX requirements

- Pending invite list visible only to users with appropriate permission.
- Revoke affordance for authorized admins/owners.
- Clear expired/revoked status in admin UI.
- Acceptance errors should be safe and actionable without revealing team membership details to unauthorized users.

## Acceptance gate

This phase is done only when:

- invite and membership states are explicit;
- invite token handling avoids logs/audit leaks;
- all lifecycle transitions are tested server-side;
- accepted memberships immediately affect permission checks;
- last-owner and grant-ceiling rules are enforced during lifecycle changes.
