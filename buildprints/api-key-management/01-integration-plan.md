# 01 Integration Plan

## Objective

Map the generic API Key Management capability to this host repository and write `.buildprint/capability-plan.md` before implementation.

## Required plan

The plan must include:

- selected owner model
- selected API surface to protect first
- exact files likely to be touched or created
- dependency changes, if any
- env/config changes, if any
- persistence changes and migration strategy
- API key schema: high-entropy prefix, keyed hash, hash version, scopes, status, timestamps, last used, owner
- secret generation and one-time display behavior
- scope/permission model and deny-by-default behavior
- revocation and rotation/replacement behavior
- request authentication middleware/helper design
- audit event design
- verification commands and runtime checks
- blockers and hard-stop questions
- rollback notes
- reconciliation with `.buildprint/host-assessment.md`: every `must ask user`, blocker, baseline failure, and assumption is resolved, accepted as a claim ceiling, or left blocking

## Required output

Create:

```text
.buildprint/capability-plan.md
```

Use this shape:

```md
# API Key Management Capability Plan

## Selected Host Path

## Files To Touch

## Dependency And Config Changes

## Persistence Changes

## Key Contract

## Scope And Permission Model

## Request Authentication Flow

## User/Operator Surface

## Audit Events

## Verification Plan

## Assessment Reconciliation

## Rollback Notes

## Hard-Stop Questions
```

## Proof before moving on

The plan must map every required capability surface to concrete host files or explicitly block.

## DO NOT

- Do not start implementation until the plan exists.
- Do not start implementation if `.buildprint/host-assessment.md` decision is `block`.
- Do not choose owner, scope, or tenant behavior silently when multiple plausible models exist.
- Do not add an API key table disconnected from a real auth/API surface.
