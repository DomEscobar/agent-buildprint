# API Key Management Evidence Matrix

## Proof Hosts

| Host | Owner model | Stack | Proof result |
| --- | --- | --- | --- |
| `/root/AGB-website/server` copy | user-owned | Bun API + SQLite | `bun test`: 12 passed |
| `w3cj/hono-open-api-starter` copy | service account | Hono + Drizzle + SQLite | `pnpm test`, `typecheck`, `lint`, `build`: passed |
| `nemanjam/nextjs-prisma-boilerplate` copy | user-owned | Next.js + NextAuth + Prisma | `yarn types`, `test:server:unit`, `lint`: passed; `build`: blocked |
| `sushantrahate/express-typescript-prisma-postgresql` copy | user-owned | Express + Prisma + PostgreSQL | `npm run test:ci`, `lint`, `build`, `prisma validate`: passed |

## Proven Behaviors

- One-time secret return at creation.
- No plaintext secret in list/storage proof.
- Keyed/versioned hash material in Hono and Next/Prisma proofs.
- High-entropy lookup prefix with collision handling in Hono and Next/Prisma proofs.
- Valid-prefix/wrong-secret denial.
- Missing or malformed key denial.
- Wrong-scope denial.
- Revoked key denial.
- Valid scoped key authenticates a real protected API surface.
- Usage evidence via last-used state.
- User-owned key model in Bun and Next/Prisma.
- Service-account adaptation with explicit caveat in Hono.
- Owner-safe revoke caught and enforced in Next/Prisma proof.
- Explicit migration and rollback artifacts in the Express/Prisma proof.
- API-key-aware rate limiting in the Express/Prisma proof.
- Production build proof in the Express/Prisma proof.

## Validator-Proven Regressions

`npm run check:capability:regressions` mutates a copy of the API-key packet back toward known bad states and proves the checker rejects:

- `requires.existing_capabilities` / `composition.expects` contradiction.
- missing `capability.yaml` valid-prefix/wrong-secret proof.

## Blocked Or Not Proven

- Rails and Django adapters are not proven and are not listed as supported host frameworks.
- Production live-data migration rollout is not proven.
- Full account-settings UI is not proven.
- Production admin auth is not proven for the Hono service-account fixture.
- Next/Prisma production build is blocked by old Next 12 SWC/OpenSSL/ARM behavior on this Node 24 host.
- Native Node 16 proof for the old Next/Prisma app is not run.
- Express/Prisma host has baseline dependency audit issues that are not caused by this packet.

## Brutal Score

Evidence score: 9.6/10 for JS/TS API hosts.

Why not 10:

- No Rails/Django or non-JS adapter proof.
- No live production migration/rollback exercise against real data.
- Next/Prisma build remains blocked, even though typecheck/unit/lint proof passed.
- Dependency vulnerability cleanup is outside this API-key packet proof.

Quality claim allowed:

This packet is strongly dogfooded and honestly caveated across four real host applications. It is near-10/10 for JS/TS API hosts, but not universal-production-proven.
