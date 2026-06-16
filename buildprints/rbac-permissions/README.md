# RBAC Permissions Capability Buildprint

This Capability Buildprint packages a guarded workflow for adding role-based access control to an existing host app.

It is designed for coding agents. It is not a vague authorization checklist.

## What it adds

- explicit roles
- explicit permissions
- deny-by-default permission matrix
- central authorization helper
- protected route/action wiring
- denied and missing-role states
- fixture/runtime verification requirements

## What the host app must already have

- authenticated user identity
- at least one route/action/API surface worth protecting
- a role storage, derivation, or configuration path
- a local test or fixture path for allow/deny proof

## Execution profile

`guarded`

RBAC touches security boundaries. The applying agent must assess the host, plan the graft, implement through phases, verify allowed and denied access, and write a receipt.

## Agent flow

```mermaid
flowchart TD
  A[Read BUILDPRINT.md] --> B[Read capability.yaml]
  B --> C[Check compatibility.md]
  C --> D[Write .buildprint/host-assessment.md]
  D --> E[Write .buildprint/capability-plan.md]
  E --> F[Contract and policy]
  F --> G[Core permission helper]
  G --> H[Host protected wiring]
  H --> I[Denied/setup states]
  I --> J[Verify allow and deny]
  J --> K[Write .buildprint/capability-receipt.md]
```

## Discovery decision gate

Before edits, the applying agent must classify important host findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. Questions that change user identity, role source, default role, admin bootstrap, tenant/team boundaries, protected surface selection, migration strategy, or existing authorization migration are hard stops, not assumptions.

The final receipt must reconcile every blocker, assumption, baseline failure, and hard-stop question with the claimed proof level.

## Proof levels

```mermaid
flowchart LR
  A[structure] --> B[fixture]
  B --> C[runtime]
  C --> D[production]
```

Unlike provider integrations, RBAC can usually reach `fixture` or `runtime` proof without external keys.

## Non-negotiables

- No source edits before host assessment and capability plan.
- No privileged default role.
- No client-only protection.
- No scattered permission literals.
- No success claim without denied-path proof.
- No proof claim when baseline build/test validation remains broken without an explicit blocked or partial receipt.
