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

## Blockers

## Assumptions
```

## Proof before moving on

The assessment must identify a user/owner model, persistence path, and candidate server-side API surface. If any are missing, block before planning.

## DO NOT

- Do not edit source files in this phase.
- Do not invent an owner or tenant model.
- Do not infer a database migration path without evidence.
- Do not assume existing session tokens are safe API keys.
