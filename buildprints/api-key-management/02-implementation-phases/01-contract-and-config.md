# 01 Contract And Config

## Objective

Add the API key contract, persistence plan, config, and security boundaries without wiring request authentication yet.

## Required inputs

- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`
- host package manager or runtime
- host env/config pattern
- host persistence/migration pattern
- selected owner and scope model

## Instructions

Add or adapt:

- API key data model or migration
- non-secret metadata: name, prefix, owner, scopes, status, created, expires, last used
- derived hash storage field
- optional hashing parameters or secret pepper only if the host already has a safe env/config pattern
- typed/configured API key constants or helpers
- missing-config or missing-persistence blocked state when required

Minimum persisted state should cover:

- key id
- key owner id and owner type when needed
- key prefix
- key hash
- display name
- scopes or permissions
- status: active/revoked
- created timestamp
- revoked timestamp when revoked
- last used timestamp or last use audit event

## Proof before moving on

- data model/migration is represented in the host's real persistence path or blocked explicitly
- no plaintext key storage field exists
- scopes/status/owner fields are represented
- config changes are documented without secret values

## DO NOT

- Do not add real secret values.
- Do not create an orphan schema that the host will not run.
- Do not wire route authentication before the contract and persistence are defined.
