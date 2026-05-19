# Phase 07 — Audit Log

This phase records security-relevant events without leaking secrets. Audit logs are for accountability and debugging, not for storing raw request bodies.

## Goal

Create an audit trail for privileged team/RBAC mutations and sensitive authorization decisions.

## Required event coverage

At minimum, emit audit events for:

- team created/updated/deleted;
- invite created/revoked/accepted/expired where practical;
- membership created/removed/suspended/reactivated;
- role changed;
- owner transferred;
- permission/custom role changed if custom roles exist;
- billing/admin boundary changes;
- audit log exported/read if product policy requires it.

## Event shape

Use an event shape equivalent to:

```ts
type AuditEvent = {
  id: string;
  teamId: string;
  actorUserId: string | 'system';
  action: string;
  targetType: string;
  targetId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
};
```

Required metadata hygiene:

- include before/after role names for role changes;
- include invite target email only if product policy permits it;
- never include invite tokens, session tokens, password reset tokens, API keys, cookies, raw auth headers, or full request bodies;
- redact or hash sensitive identifiers when possible;
- structure metadata enough for tests to assert redaction.

## Authorization to read audit logs

- Reading audit logs requires `audit.read` or an explicit equivalent.
- Audit log queries must be tenant-scoped.
- Cross-team audit access must deny.
- Audit export/download, if implemented, needs separate permission and tests.

## Reliability requirements

- Privileged mutations should write audit events in the same transaction when practical.
- If audit writing fails, define whether the mutation fails closed or records a compensating error. Security-critical role/owner mutations should usually fail closed.
- Background/system actions must identify a system principal and reason.
- Avoid audit logging inside frontend-only code.

## Abuse and edge cases

Test or explicitly block:

- audit event contains invite token or secret;
- user reads another team’s audit log;
- audit log endpoint lacks tenant predicate;
- failed privileged mutation records misleading success event;
- role change event misses actor or target;
- background job emits unactionable `system` event with no reason;
- audit log can be modified/deleted by normal admins without policy.

## Required tests

- audit event emitted for invite create/revoke/accept;
- audit event emitted for role change/member removal;
- audit metadata redacts tokens/secrets;
- audit read requires `audit.read`;
- cross-team audit read denies;
- failed mutation does not emit false success;
- system actor events include reason/source.

## Acceptance gate

This phase is done only when:

- `AuditEvent` shape and retention policy are documented;
- privileged mutations emit redacted audit events;
- audit reads are tenant-scoped and permission-gated;
- redaction tests exist for token/secret fields;
- validation evidence includes at least one real or fixture audit event per privileged lifecycle.
