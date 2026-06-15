# Real Host Application Receipt: Hono Open API Starter

## Host

- Source: `https://github.com/w3cj/hono-open-api-starter`
- Local proof copy: `/tmp/hono-api-key-proof`
- Framework: Hono with `@hono/zod-openapi`
- Persistence: Drizzle ORM with libSQL SQLite
- Test runner: Vitest

## Host Assessment Result

The host has API routes, Drizzle persistence, environment validation, and route tests, but no user/session identity.

The capability was applied with an explicit service-account owner model:

- owner type: `service_account`
- owner id: `default-service-account`
- operator guard: `API_KEY_ADMIN_TOKEN`

This is not proof of user-owned keys. It is proof that the packet can adapt honestly to a service-account API host when the plan records the assumption.

## Applied Capability Surfaces

- Added `api_keys` table with prefix, HMAC-SHA256 hash, hash version, owner type/id, scopes JSON, active/revoked status, created/revoked timestamps, and last-used timestamp.
- Added API-key core helper for generate, hash, verify, list, revoke, and last-used updates.
- Added admin-token operator routes:
  - `POST /api-keys`
  - `GET /api-keys`
  - `POST /api-keys/{id}/revoke`
- Added protected route:
  - `GET /tasks/export`

## Verification Commands

```sh
pnpm test -- --run
pnpm typecheck
pnpm lint
pnpm build
```

Result:

```text
tests: 13 passed
typecheck: passed
lint: passed
build: passed
```

## Runtime Checks Proven

- Missing API key is denied.
- Malformed API key is denied.
- Valid prefix with wrong secret body is denied.
- Wrong-scope API key is denied.
- Valid active API key authenticates `GET /tasks/export`.
- Revoked API key is denied.
- Full secret is returned only in the create response.
- List response contains prefix/metadata but not the full secret.
- Storage contains HMAC-SHA256 hash, hash version, and prefix, not plaintext secret.
- Successful key use writes `last_used_at`.

## Bugs Caught During Proof

- `_` separator was unsafe with base64url key material because `_` can appear in generated secrets. Fixed in the proof implementation with a hex prefix and `.` separator.
- The initial proof used a 40-bit lookup prefix without collision retry. Fixed with a 64-bit prefix plus retry before insert.
- The initial proof used an unversioned plain SHA-256 digest. Fixed with HMAC-SHA256, `hmac-sha256-v1`, and an `API_KEY_HASH_SECRET` production requirement.
- The initial proof missed the valid-prefix/wrong-secret negative case. Fixed with a route test that proves full hash verification after prefix lookup.
- Numeric route param schema was wrong for hex API key ids. Fixed with a string id param schema.
- OpenAPI route responses initially omitted admin-token 401/503 states. Fixed so typed route contracts match handler behavior.

## Blocked / Not Proven

- User-owned keys are not proven.
- Team or organization owner boundaries are not proven.
- Production admin auth is not proven.
- Production migration rollout is not proven; tests use `drizzle-kit push`.
- Rate limiting is not proven.

## Proof Level

Runtime fixture against a real public Hono/Drizzle project clone.
