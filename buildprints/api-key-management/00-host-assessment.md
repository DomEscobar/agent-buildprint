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
