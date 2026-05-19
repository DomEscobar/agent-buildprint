# Security Policy

## Authorization principles

- deny by default;
- check permissions server-side on every privileged route;
- resolve membership from trusted server state;
- never trust frontend visibility or client-provided tenant identifiers;
- treat stale JWT/session role claims as hints only for privileged actions;
- prefer fresh membership lookup or short-lived cache with invalidation.

## Sensitive data

Do not store or log:

- raw invite tokens;
- session tokens;
- OAuth refresh/access tokens;
- API key secret values after display;
- passwords;
- raw billing provider secrets.

## Audit redaction

Audit metadata may include ids, role names, and safe display labels. Redact raw tokens, secrets, credentials, and excessive PII.

## Cross-tenant safety

A resource is accessible only if:

1. actor is authenticated;
2. actor has active membership in the resource team;
3. actor has the required permission;
4. resource ownership matches the resolved team context.
