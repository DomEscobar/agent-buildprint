# Phase 05 — Role Management & Owner Safety

This phase implements safe role changes. Role mutation is one of the easiest places for agents to accidentally create privilege escalation.

## Goal

Allow authorized users to update roles and remove members without self-escalation, grant-ceiling violations, or loss of the last owner.

## Required policies

Define these policies before coding:

- Who can promote a member to admin?
- Who can promote a member to owner?
- Can admins demote admins?
- Can a user change their own role?
- Can a user remove themselves?
- Is billing authority tied to owner or separately assigned?
- Are custom roles allowed? If yes, who can create/edit them?

Do not infer these from UI labels. Encode them in server-side policy.

## Safety invariants

Mandatory:

- A user cannot escalate their own role.
- A user cannot grant permissions they do not have authority to grant.
- The last owner cannot be removed, demoted, suspended, or made inactive.
- Owner transfer must be explicit and auditable.
- Role changes must invalidate/recheck stale authorization state.
- Billing/admin boundary must remain explicit.

## Mutation contract

Each role/member mutation should resolve:

1. actor identity from existing auth;
2. actor membership and permissions;
3. target membership;
4. current owner count inside the same transaction/consistency boundary;
5. grant ceiling and self-change policy;
6. resulting audit event.

Avoid split read/write flows where owner count can change between check and mutation.

## Abuse and edge cases

Test or explicitly block:

- member promotes themselves to admin/owner;
- admin promotes themselves to owner;
- admin grants owner when only owner can grant owner;
- owner demotes/removes the only remaining owner;
- two concurrent demotions remove all owners;
- suspended admin changes roles;
- custom role grants owner-only permissions;
- stale UI submits a role change after actor was downgraded;
- billing role is changed through generic member role endpoint.

## Required tests

- self-escalation denial;
- grant ceiling denial;
- last-owner demotion/removal denial;
- concurrent or transactional owner-safety test where possible;
- successful allowed role change;
- audit event emitted for every privileged role mutation;
- stale-role recheck on mutation endpoint;
- custom role mutation tests if custom roles are enabled.

## UI requirements

- Disable/hide impossible role actions for UX, but server remains source of truth.
- Show why last-owner actions are blocked.
- Require clear confirmation for owner transfer/removal.
- Avoid ambiguous labels like “admin can do everything” if billing/owner permissions differ.

## Acceptance gate

This phase is done only when:

- role mutation policy is documented;
- server mutation path enforces self-escalation, grant ceiling, and last-owner protection;
- tests cover negative and positive role changes;
- privileged role mutations emit audit events;
- UI cannot be counted as the only protection.
