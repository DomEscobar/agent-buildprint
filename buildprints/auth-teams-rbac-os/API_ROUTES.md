# API Routes

Route names are examples. Adapt to the host framework while preserving checks.

| Route | Permission | Required server checks |
|---|---|---|
| `GET /api/teams` | authenticated | only teams where user has active membership |
| `POST /api/teams` | product decision | auth, creation policy, initial owner seed |
| `GET /api/teams/:teamId` | `team.read` | membership resolved server-side |
| `PATCH /api/teams/:teamId` | `team.update` or `settings.update` | membership, permission, audit |
| `GET /api/teams/:teamId/members` | `members.read` | membership, permission |
| `POST /api/teams/:teamId/invites` | `members.invite` | role ceiling, email policy, audit |
| `DELETE /api/teams/:teamId/invites/:inviteId` | `members.invite` | same-team invite, audit |
| `POST /api/invites/accept` | authenticated | token hash, expiry, email/domain policy, single-use |
| `PATCH /api/teams/:teamId/members/:userId` | `members.role.update` | role ceiling, self-escalation, last-owner, audit |
| `DELETE /api/teams/:teamId/members/:userId` | `members.remove` | last-owner, self-leave rules, audit |
| `GET /api/teams/:teamId/audit` | `audit.read` | membership, permission, redaction |
| `POST /api/teams/:teamId/billing/portal` | `billing.manage` | billing boundary, membership, permission |
| `POST /api/teams/:teamId/api-keys` | `api_keys.manage` | key redaction, audit |

Every route above needs direct API tests for unauthenticated, no-membership, missing-permission, and success cases where applicable.
