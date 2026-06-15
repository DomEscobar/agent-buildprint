# Real Host Application Receipt: AGB Website Server

## Host

- Source copied from `/root/AGB-website/server` to `/tmp/agb-api-key-proof`.
- Runtime: Bun API server.
- Persistence: Bun SQLite.
- Existing auth: GitHub OAuth users and session cookies.
- Selected protected API surface: `GET /api/buildprints/export`.

## Applied Capability Surfaces

- Added API key persistence with owner user id, key prefix, SHA-256 hash, scopes JSON, active/revoked status, created/revoked timestamps, and last-used timestamp.
- Added signed-in key management routes:
  - `GET /api/me/api-keys`
  - `POST /api/me/api-keys`
  - `POST /api/me/api-keys/:id/revoke`
- Added server-side Bearer API key verification for `GET /api/buildprints/export`.

## Verification Command

```sh
bun test
```

Result:

```text
12 pass
0 fail
59 expect() calls
```

## Runtime Checks Proven

- Missing key is denied.
- Malformed key is denied.
- Generated key secret is returned only on creation.
- Later list route returns prefix and metadata, not the full secret.
- SQLite storage contains key hash and prefix, not plaintext secret.
- Valid active key authenticates the selected API route.
- Wrong-scope key is denied.
- Revoked key is denied.
- Successful key use writes `last_used_at`.

## Proof Level

Runtime fixture against a copied real host app.

## Not Proven

- Production deployment.
- Production migration runner.
- Organization/team ownership.
- Rate limiting.
- Secret pepper configuration.
