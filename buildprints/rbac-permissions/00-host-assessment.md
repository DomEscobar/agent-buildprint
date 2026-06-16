# 00 Host Assessment

## Objective

Inspect the host repository and write `.buildprint/host-assessment.md` before any source edits.

## Required assessment

Record:

- framework and router
- package manager
- auth/session model
- stable user id shape
- existing role, permission, admin, team, or membership model
- persistence and migration path
- current protected route/action pattern
- candidate protected surface for proof
- available test/lint/typecheck/build commands
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
# RBAC Host Assessment

## Host Summary

## Detected Framework And Router

## Auth/User Identity

## Existing Authorization Signals

## Role Storage Or Derivation Path

## Candidate Protected Surfaces

## Persistence And Migrations

## Commands Available

## Baseline Health

## Finding Classifications

## Blockers

## Assumptions

## Decision
```

## Proof before moving on

The assessment must identify a stable user identity path, at least one protected surface for allow/deny proof, and a trustworthy baseline proof path.

Use `block` when any unresolved finding would change user identity, role source, default role, admin bootstrap, tenant/team boundaries, protected surface selection, migration strategy, or existing authorization migration.

## DO NOT

- Do not edit source files in this phase.
- Do not assume every app needs a database role table.
- Do not treat UI hiding as authorization.
- Do not convert hard-stop questions into assumptions.
