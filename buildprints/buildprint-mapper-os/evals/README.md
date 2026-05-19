# Buildprint Mapper OS Golden Evals

These evals make the Mapper OS non-illustrative. They run the real `agb map` command against fixture repositories and assert that the generated artifacts contain the required signals while avoiding secret leakage and malicious prompt contamination.

## Fixtures

- `stripe-saas` — billing/webhook/auth detection and billing questions.
- `malicious-secrets` — `.env` secret values and prompt-injection text must not leak into outputs.
- `admin-dashboard` — admin surface, auth/session, destructive action, and audit-risk detection.
- `large-monorepo` — mixed integrations and scope/candidate pressure.
- `route-patterns` — Next/Fastify-style route and upload/cache/auth/AI detection.

## Run from source checkout

```bash
node buildprints/buildprint-mapper-os/evals/check-map.mjs --agb ./bin/agb.js
```

## Run from a bootstrapped snapshot

Pass a checked-out or installed `agb` CLI path explicitly:

```bash
AGB_CLI=/absolute/path/to/agent-buildprint/bin/agb.js node .buildprint/snapshots/evals/check-map.mjs
```

## Passing bar

The eval must prove:

- canonical mapped files are produced;
- candidate Buildprints are generated;
- expected integrations and risk areas are detected;
- environment variable names are preserved but secret values are absent;
- known high-value candidate titles appear where expected;
- malicious fixture instructions do not become output content.
