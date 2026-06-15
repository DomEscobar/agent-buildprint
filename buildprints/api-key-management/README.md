# API Key Management Capability Buildprint

This Capability Buildprint packages a guarded workflow for adding secure API key management to an existing SaaS or B2B app.

It is designed for coding agents. It is not a copy-paste auth tutorial.

## What it adds

- API key generation with one-time secret display
- hash-only key storage with searchable key prefixes
- key scopes or permissions
- revocation and rotation/replacement flow
- request authentication middleware or helper
- audit events for key lifecycle and usage
- verification and receipt requirements

## What the host app must already have

- authenticated user identity
- persistence layer or approved persistence decision
- server-side API route/action capability
- account, team, organization, or owner model for keys
- environment/config pattern when hashing parameters or secrets are configured

## Execution profile

`guarded`

API keys grant programmatic access to host data and actions. The applying agent must assess the host, plan the graft, implement through phases, verify, and write a receipt.

## Agent flow

```mermaid
flowchart TD
  A[Read BUILDPRINT.md] --> B[Read capability.yaml]
  B --> C[Check compatibility.md]
  C --> D[Write .buildprint/host-assessment.md]
  D --> E[Write .buildprint/capability-plan.md]
  E --> F[Contract and config]
  F --> G[Core integration]
  G --> H[Host wiring]
  H --> I[User/operator surface]
  I --> J[Verify]
  J --> K[Write .buildprint/capability-receipt.md]
```

## Proof levels

```mermaid
flowchart LR
  A[structure] --> B[fixture]
  B --> C[runtime]
```

Use the highest honest level. Do not claim runtime proof without testing the host API surface.

## Dogfood proof

This packet has been applied to copied real host apps:

- `examples/agb-website-server-runtime-receipt.md`
- `examples/hono-open-api-starter-runtime-receipt.md`

The Bun proof added user-owned API keys, hash-only SQLite storage, signed-in key management routes, a Bearer-key protected export route, and runtime tests for valid, missing, malformed, wrong-scope, and revoked keys.

The Hono proof adapted to a service-account owner model because the host has no user/session auth. It added Drizzle-backed API keys, admin-token operator routes, a protected `GET /tasks/export` route, and caught real implementation bugs in key format parsing, route param schema, and typed OpenAPI responses.

Verification result:

```text
bun test
12 pass
0 fail
59 expect() calls

pnpm test -- --run
13 pass
pnpm typecheck
pnpm lint
pnpm build
all passed
```

## Non-negotiables

- No source edits before host assessment and capability plan.
- No plaintext key storage.
- No recoverable secret after initial creation.
- No client-side-only API key validation.
- No access without owner/tenant boundary checks.
- No install success claim without valid, revoked, and wrong-scope proof.
