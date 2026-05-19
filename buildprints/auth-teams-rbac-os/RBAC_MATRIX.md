# RBAC Matrix

| Permission | Owner | Admin | Member | Viewer | Notes |
|---|---:|---:|---:|---:|---|
| team.read | yes | yes | yes | yes | Basic team visibility. |
| team.update | yes | yes | no | no | Team profile/settings; split more if needed. |
| members.read | yes | yes | yes | no | View team member list. |
| members.invite | yes | yes | no | no | Cannot invite above actor grant ceiling. |
| members.remove | yes | yes | no | no | Last owner protected; admin cannot remove owner by default. |
| members.role.update | yes | yes* | no | no | Admin cannot grant owner unless approved. |
| billing.manage | yes | configurable | no | no | Keep separate from generic admin. |
| settings.update | yes | yes | no | no | Server-checked. |
| api_keys.manage | yes | configurable | no | no | Team-scoped by default. |
| audit.read | yes | configurable | no | no | Avoid exposing sensitive metadata. |

`yes*` means allowed only inside role ceiling policy.

## Deny Rules

Deny if:

- actor has no active membership in team;
- resource team does not match actor context;
- permission is unknown;
- membership status is removed/suspended/pending;
- mutation would leave zero active owners;
- actor is mutating own role upward;
- actor grants a role outside grant ceiling;
- privileged action relies only on frontend state.
