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

Completion is blocked if any team-scoped route lacks direct server/API authorization coverage.
