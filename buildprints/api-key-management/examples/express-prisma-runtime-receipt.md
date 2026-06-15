# Express Prisma Runtime Receipt

## Host

- Source: `sushantrahate/express-typescript-prisma-postgresql`
- Local proof copy: `/root/agb-proofs/express-prisma-api-key-proof`
- Baseline hygiene commit: `3e968ca Fix baseline lint for Express proof`
- API-key proof commit: `71e45f0 Add Express Prisma API key proof`

## Why This Host Matters

This is a maintained TypeScript API host with Express, Prisma 6, PostgreSQL schema/migrations, JWT user authentication, Vitest/Supertest, ESLint, and a production build script. It covers a different JS/TS shape than the Bun, Hono, and Next proofs.

## Applied Capability

The proof added user-owned API keys with:

- Prisma `ApiKey` model related to `User`
- explicit Prisma migration SQL
- explicit rollback SQL
- create/list/revoke routes under `/v1/api-keys`
- scoped Bearer API-key middleware
- API-key-aware rate limiter
- protected `GET /v1/users/profile/export`
- HMAC-SHA256 secret hashing with `API_KEY_HASH_SECRET`
- `hmac-sha256-v1` hash version
- 64-bit random lookup prefix
- collision retry on unique prefix conflict
- one-time plaintext return only during create
- no `secretHash` in list/create response metadata
- last-used update after successful authentication

## Evidence Commands

Run from `/root/agb-proofs/express-prisma-api-key-proof` with test-safe environment values:

```sh
NODE_ENV=test DATABASE_URL=https://example.com SHADOW_DATABASE_URL=https://example.com JWT_SECRET=abcdefghijklmnopqrstuvwxyz123456 API_KEY_HASH_SECRET=abcdefghijklmnopqrstuvwxyz1234567890 WHITE_LIST_URLS=https://example.com npm run lint
NODE_ENV=test DATABASE_URL=https://example.com SHADOW_DATABASE_URL=https://example.com JWT_SECRET=abcdefghijklmnopqrstuvwxyz123456 API_KEY_HASH_SECRET=abcdefghijklmnopqrstuvwxyz1234567890 WHITE_LIST_URLS=https://example.com npm run test:ci
NODE_ENV=test DATABASE_URL=https://example.com SHADOW_DATABASE_URL=https://example.com JWT_SECRET=abcdefghijklmnopqrstuvwxyz123456 API_KEY_HASH_SECRET=abcdefghijklmnopqrstuvwxyz1234567890 WHITE_LIST_URLS=https://example.com npm run build --ignore-scripts
DATABASE_URL=postgresql://user:pass@localhost:5432/db SHADOW_DATABASE_URL=postgresql://user:pass@localhost:5432/db_shadow npx prisma validate
```

Results:

- `npm run lint`: passed with pre-existing warning posture
- `npm run test:ci`: 6 files passed, 23 tests passed
- `npm run build --ignore-scripts`: passed
- `npx prisma validate`: passed

## Security Cases Proven

The added tests prove:

- one-time plaintext secret has the expected API-key format
- stored response metadata does not include `secretHash`
- full secret verification happens after prefix lookup
- valid prefix with wrong secret body is denied
- revoked key is denied
- wrong-scope key is denied
- successful use records last-used state
- generated prefix collision is retried
- API-key rate limit returns `429` after the configured per-key budget

## Migration And Rollback Evidence

- Migration: `prisma/migrations/20260615194000_add_api_keys/migration.sql`
- Rollback: `prisma/rollbacks/20260615194000_add_api_keys.sql`
- Schema validation: `npx prisma validate` passed with dummy PostgreSQL URLs.

This proves migration artifacts and schema validity. It does not prove a live production deploy/rollback against a real PostgreSQL instance.

## Honest Caveats

- The proof uses unit/Supertest coverage, not a deployed service.
- The app has baseline dependency audit issues: `npm ci` reports 25 vulnerabilities before API-key changes.
- Lint passes but the repo still has pre-existing `any` warnings in tests/server code.
- Migration/rollback artifacts are validated structurally, but not executed against production data.
