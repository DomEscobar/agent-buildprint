# Real Host Application Receipt: Next.js Prisma Boilerplate

## Host

- Source: `https://github.com/nemanjam/nextjs-prisma-boilerplate`
- Local proof copy: `/root/agb-proofs/next-prisma-api-key-proof`
- Local proof commit: `bfda79f Add Next Prisma API key proof`
- Framework: Next.js 12 pages router with `next-connect`
- Auth: NextAuth with Prisma users/sessions
- Persistence: Prisma/Postgres
- Test runner: Jest

## Host Assessment Result

The host has a real user identity model, Prisma persistence, protected API routes, and server unit tests. The capability was applied as user-owned API keys, unlike the Hono service-account proof.

The host is old. Dependency installation required `yarn install --ignore-engines` because `next-auth@4.9.0` declares Node 12/14/16 support while this proof host runs Node 24. That caveat is recorded and prevents claiming clean modern production compatibility.

## Applied Capability Surfaces

- Added Prisma `ApiKey` model related to existing `User`.
- Added API-key core service with high-entropy prefixes, HMAC-SHA256 hash material, `hmac-sha256-v1`, scope checks, revoke, owner checks, and last-used update.
- Added authenticated user routes:
  - `GET /api/api-keys`
  - `POST /api/api-keys`
  - `POST /api/api-keys/{id}/revoke`
- Added protected route:
  - `GET /api/posts/export`

## Verification Commands

```sh
yarn install --frozen-lockfile
yarn install
yarn install --ignore-engines
yarn prisma generate
yarn types
yarn test:server:unit --runInBand
yarn lint
yarn build
```

Result:

```text
yarn install --frozen-lockfile: failed, stale upstream lockfile
yarn install: failed, Node engine mismatch
yarn install --ignore-engines: passed
yarn prisma generate: passed
yarn types: passed
yarn test:server:unit --runInBand: 4 suites passed, 14 tests passed
yarn lint: passed with 31 pre-existing warnings and 0 errors
yarn build: failed before app compilation due old Next 12 SWC/OpenSSL/ARM fallback behavior
```

## Runtime / Unit Checks Proven

- User-owned key creation returns full secret only on create response.
- Stored key data uses HMAC-SHA256 hash and hash version, not plaintext secret.
- Key listing exposes metadata and prefix, not the full secret.
- Valid prefix with wrong secret body is denied.
- Valid active scoped key authenticates the protected post export route.
- Revoked key is denied.
- Wrong-scope key is denied.
- Key use writes `lastUsedAt`.
- Revoke checks user ownership before mutation.

## Bugs / Risks Caught During Proof

- Frozen install is not viable because the upstream lockfile is stale.
- Default install is not viable on Node 24 because the host declares old Node engines.
- Production build is not proven on this ARM/Node 24 host because old Next 12 SWC cannot load the required native/OpenSSL path and the WASM fallback fetch fails.
- A revoke implementation that checks ownership after mutation would be unsafe; the proof implementation checks ownership before updating.

## Blocked / Not Proven

- Production build.
- Production migration deploy.
- Rate limiting.
- Account-settings UI for key management.
- Native Node 16 proof.

## Proof Level

Fixture/runtime-route unit proof against a real public Next/Prisma/NextAuth project clone, with production build explicitly not proven.
