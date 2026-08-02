# 01 Host

Merge of host assessment and integration plan. Complete before loop work. No source edits before `00-goal.md` hard stops and this host plan.

## Host assessment

# 00 Host Assessment

## Objective

Inspect the host repository and write `.buildprint/host-assessment.md` before any source edits.

## Required assessment

Record:

- framework, router, and API handler pattern
- package manager or runtime tooling
- auth/session model
- owner model for keys: user, team, organization, or service account
- persistence layer and migration path
- env/config pattern
- existing RBAC, permission, token, or API key code
- existing audit/event logging code
- API route/action/controller to protect first
- test/lint/typecheck/build commands
- baseline health from available install/lint/test/typecheck/build/schema commands, or why they could not run
- finding classifications: `infer safely`, `patch locally`, `must ask user`, or `out of scope`
- unresolved implementation-changing questions
- hard-stop blockers

## Required output

Create:

```text
.buildprint/host-assessment.md
```

Use this shape:

```md
# API Key Management Host Assessment

## Host Summary

## Detected Framework And Router

## Auth/User Identity

## Key Owner Model

## Persistence And Migrations

## Env/Config Pattern

## Existing Tokens Or API Keys

## Existing RBAC Or Scope Model

## Existing Audit/Event Path

## Candidate API Surface

## Commands Available

## Baseline Health

## Finding Classifications

## Blockers

## Assumptions

## Decision
```

## Proof before moving on

The assessment must identify a user/owner model, persistence path, candidate server-side API surface, and trustworthy baseline proof path. If any are missing, block before planning.

Use `block` when any unresolved finding would change owner identity, tenant/team boundaries, API surface selection, scope/RBAC behavior, existing token migration, persistence/migration strategy, hash/secret handling, audit behavior, or destructive operations.

## DO NOT

- Do not edit source files in this phase.
- Do not invent an owner or tenant model.
- Do not infer a database migration path without evidence.
- Do not assume existing session tokens are safe API keys.
- Do not convert hard-stop questions into assumptions.


## Integration plan

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


## Apply order

Follow:

1. `00-goal.md`
2. `01-host.md` (this file)
3. `loops/` in order
4. `review.md`
5. `verify.md`

### Legacy apply notes

# Apply Protocol

## Objective

Install the API Key Management capability through a guarded, phased grafting workflow.

## Required order

1. Read `capability.yaml`.
2. Run `00-host-assessment.md`.
3. Run `00-assessment-questions.md`.
4. Run `01-integration-plan.md`.
5. Implement each file in `02-implementation-phases/` in order.
6. Run `verify.md`.
7. Write `.buildprint/capability-receipt.md`.

## Local outputs

The applying agent must create:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/capability-receipt.md
```

## Implementation rule

Keep the capability bounded. Do not redesign auth, rebuild account settings, replace RBAC, add a public developer portal, or migrate an existing token system unless the user explicitly approved that extra scope.

Host assessment is a hard gate. Classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If any `must ask user` finding changes owner identity, tenant/team boundaries, API surface selection, scope/RBAC behavior, existing token migration, persistence/migration strategy, hash/secret handling, audit behavior, or destructive operations, stop and ask before source edits.

## Secret-handling rule

The full API key secret may be shown only once at creation time. Store only a keyed/versioned derived hash plus non-secret metadata such as prefix, owner, scopes, status, timestamps, and display name.

## DO NOT

- Do not skip local assessment and plan files.
- Do not implement when the host assessment decision is `block`.
- Do not store plaintext API keys.
- Do not expose key verification to client bundles.
- Do not grant broad scopes by default.
- Do not claim install success without valid, revoked, wrong-scope, and valid-prefix/wrong-secret proof.


Reconcile assessment assumptions with proof. Downgrade claim ceiling when proof is partial or blocked. Record not-proven honestly.
