# Test Matrix

| Risk | Required tests |
|---|---|
| Cross-tenant read/write | API and service tests for Team A vs Team B resources |
| Frontend-only authorization | Direct API tests for hidden/disabled actions |
| Unknown permission allowed | Permission engine denies unknown action |
| Missing membership allowed | Permission engine and API guard deny no-membership actor |
| Removed/suspended member access | Membership status tests deny access |
| Self-escalation | Role mutation tests reject self-promotion |
| Last-owner loss | Remove/demote/leave tests preserve at least one owner |
| Invite replay | Single-use token test |
| Invite expiry/revoke | Expired and revoked invite tests |
| Invite wrong email | Exact-email policy test unless domain policy approved |
| Role grant ceiling | Admin/member cannot grant owner or above-ceiling roles |
| Stale JWT/session | Privileged action rechecks server membership after demotion |
| Audit gaps | Every privileged mutation emits redacted audit event |
| Migration corruption | Backfill, orphan, rollback, unique constraint tests |
| Billing/admin confusion | Billing/API-key routes require separate permissions |
| Adapter theatre | Conformance adapter calls the real target app DB/API/service authorization path, not hard-coded responses |
| Target-app drift | `conformance/` black-box tests pass against the target app for tenant isolation, invite lifecycle, role safety, billing boundary, and audit redaction |
| Missing conformance wiring | `AUTH_RBAC_CONFORMANCE_ADAPTER` is documented and runnable in the target repo/CI |

Completion is blocked if any team-scoped route lacks direct server/API authorization coverage. Completion is also blocked if the target-app conformance suite is not wired to the real authorization path or if its failures are not recorded as explicit blockers.
