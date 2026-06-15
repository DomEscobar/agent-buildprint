# Verify

## Objective

Prove the API Key Management capability works at the highest honest proof level available.

## Required command checks

Run available host checks:

- tests
- lint
- typecheck
- build

If a command does not exist, record that in `.buildprint/capability-receipt.md`.

## Required structural checks

Confirm:

- data model stores key hash and prefix, not plaintext key secret
- stored hash is keyed or host-approved, versioned, and non-reversible
- prefix generation uses enough entropy for the host scale and handles unique collisions
- create-key path returns full secret only once
- list/detail paths show only prefix and metadata
- revoke path exists
- scope/permission field exists or blocker is recorded
- API authentication helper or middleware exists
- at least one selected API surface uses the helper
- audit event or receipt path exists for key lifecycle and use, or blocker is recorded

## Runtime checks

At `fixture` proof or higher:

- generated key can authenticate the selected API route/action
- revoked key is denied
- missing key is denied
- malformed key is denied
- valid prefix with wrong secret body is denied
- wrong-scope key is denied
- stored state contains no plaintext secret
- full secret cannot be fetched after creation
- key use writes last-used state or audit event
- rate limiting is integrated for API-key authenticated surfaces or a blocker is recorded
- migration and rollback artifacts exist for persistent schema changes or a blocker is recorded

At `runtime` proof:

- checks above pass against a running host route/action/controller
- receipt records exact commands, request examples, responses, and changed files

## Blocked checks

Record blockers for:

- missing owner/user model
- missing persistence layer
- missing selected API surface
- missing test runner
- existing token system requiring migration decision
- ambiguous scope or tenant model
- unavailable production-like database for live migration/rollback execution

## Pass condition

The capability can be called installed only if:

- command checks pass or are honestly unavailable
- structural checks pass
- runtime checks pass at the claimed proof level
- blocked checks are documented
- `.buildprint/capability-receipt.md` exists
