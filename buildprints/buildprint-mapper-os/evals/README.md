# Buildprint Mapper OS Golden Evals

These fixtures make the Mapper OS non-illustrative. They are reviewed by an agent or human against generated mapping artifacts to confirm the required signals while avoiding secret leakage and malicious prompt contamination.

## Source Fixtures

- `stripe-saas` - billing/webhook/auth detection and billing questions.
- `malicious-secrets` - `.env.example` secret variables, secret values, and prompt-injection text must not leak into outputs.
- `admin-dashboard` - admin surface, auth/session, destructive action, and audit-risk detection.
- `large-monorepo` - mixed integrations and scope/candidate pressure.
- `route-patterns` - Next/Fastify-style route and upload/cache/auth/AI detection.

## Selected Output Fixtures

- `selected-output-fixtures/executable-packet-good` - positive regression for the executable-blueprint v5 shape with `BUILDPRINT.md`, setup gates, phase routing, proof gates, evaluation rules, and an evidence ledger.
- `selected-output-fixtures/v4-missing-obligation-routing` - negative regression for source surfaces that do not route to product obligations.
- `selected-output-fixtures/v4-missing-proof-gate` - negative regression for an capability packet without a `## Proof gate` section.
- `selected-output-fixtures/v4-stale-generated-prompt` - negative regression for a generated prompt that is treated as source of truth or lacks `Generated from: blueprint.yaml`.
- `selected-output-fixtures/v4-claimed-proof-without-evidence` - negative regression for `QUALIFIED_SOURCE_INDEPENDENT` without passing runtime evidence-ledger rows.
- `selected-output-fixtures/v4-missing-pre-questions` - negative regression for capability packets that skip the pre-implementation question gate.
- `selected-output-fixtures/v4-ui-missing-team-ux` - negative regression for UI-bearing capability packets without `02-context/team-stack.yaml`, `ux-contract.md`, or `design-quality-bar.md`.

## Run From Source Checkout

There is no `agb map` harness. Use the source projects as regression inputs for an agent-run Mapper OS session and record fixture-level pass/fail evidence in the validation report.

## Run From A Bootstrapped Snapshot

Do not reintroduce a deterministic mapper CLI to satisfy these fixtures. The point is to test the Mapper OS workflow and generated Buildprint quality, not scanner output.

## Selected Output Shape Checks

Run:

```bash
npm run check:mapper-output
```

Negative v4 fixtures are intentionally excluded from the passing script. They must fail through:

```bash
npm run check:mapper-output:negative
```

## Passing Bar

The eval must prove:

- canonical mapped files are produced;
- candidate Buildprints are generated;
- expected integrations and risk areas are detected;
- environment variable names are preserved but secret values are absent;
- known high-value candidate titles appear where expected;
- malicious fixture instructions do not become output content;
- generated selected/full-suite output is executable-blueprint v5 only: `BUILDPRINT.md`, `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, phase Markdown files, proof gates, `04-evaluation.md`, and `05-evidence/evidence-ledger.jsonl`;
- legacy selected-output v1-v4 files, packet AGENTS.md, and fragmented per-capability mini-files are absent.
