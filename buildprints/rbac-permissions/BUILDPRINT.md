# BUILDPRINT: RBAC Permissions Capability

You are applying one guarded Capability Buildprint to an existing host project. Your job is to add role-based access control with explicit roles, centralized permission checks, protected routes/actions, and verifiable allow/deny behavior.

This is not a whole-product Buildprint. It is a bounded capability packet for grafting RBAC into a compatible host app that already has user identity.

## Required read order

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-host-assessment.md`
5. `01-integration-plan.md`
6. `apply.md`
7. `02-implementation-phases/01-contract-and-config.md`
8. `02-implementation-phases/02-core-integration.md`
9. `02-implementation-phases/03-host-wiring.md`
10. `02-implementation-phases/04-user-operator-surface.md`
11. `02-implementation-phases/05-verification-and-receipt.md`
12. `verify.md`

## Capability promise

Add RBAC to a host app by defining a role/permission contract, storing or deriving user roles, routing protected actions through a central permission helper, and proving both allowed and denied access paths.

## Security posture

RBAC must be deny-by-default. Unknown users, unknown roles, unknown permissions, and missing role state must not silently pass.

## Local checkpoints

The applying agent must create these files in the host repo:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/capability-receipt.md
```

No source edits before host assessment and capability plan exist.

## Discovery decision gate

Host assessment must classify important findings as:

- `infer safely`
- `patch locally`
- `must ask user`
- `out of scope`

Stop before implementation when a `must ask user` finding changes user identity, role source, default role, admin bootstrap, tenant/team boundaries, protected surface selection, migration strategy, or existing authorization migration. Do not continue by turning those decisions into assumptions. Verification must reconcile against the assessment and plan; if a baseline command, schema validation, runtime route, or denied-path check fails, downgrade the claim instead of reporting installed success.

## Hard-stop conditions

Stop and ask instead of guessing when:

- the host has no identifiable user/session model
- roles or permissions conflict with an existing authorization system
- the default role for new users is unclear
- the admin bootstrap path is unclear
- persistence is required but the host has no approved persistence path
- the baseline repo cannot validate/build/test in a way that makes RBAC proof trustworthy

## Success standard

Do not claim RBAC is installed unless verification proves:

- an admin or privileged role can access a protected route/action
- a non-privileged role is denied
- unknown/missing role state is denied or blocked clearly
- protected surfaces use the central permission helper
- the role/permission policy is visible and maintainable
