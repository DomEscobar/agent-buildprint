# Buildprint Mapper OS Golden Evals

These fixtures make the Mapper OS non-illustrative. They are reviewed by an agent or human against generated mapping artifacts to confirm the required signals while avoiding secret leakage and malicious prompt contamination.

## Source Fixtures

- `stripe-saas` - billing/webhook/auth detection and billing questions.
- `malicious-secrets` - `.env.example` secret variables, secret values, and prompt-injection text must not leak into outputs.
- `admin-dashboard` - admin surface, auth/session, destructive action, and audit-risk detection.
- `large-monorepo` - mixed integrations and scope/candidate pressure.
- `route-patterns` - Next/Fastify-style route and upload/cache/auth/AI detection.

## Selected Output Fixtures

- `selected-output-fixtures/microfish-bad-shape` - negative regression for missing `CAPABILITY_INDEX.md`, incomplete capability packs, typo alias files, manifest drift, and duplicate handoff files.
- `selected-output-fixtures/microfish-good-shape` - positive regression for a router-first, team-stack full-suite selected Buildprint that remains `SELECTED_UNQUALIFIED`.
- `selected-output-fixtures/missing-team-stack` - negative regression for selected output that has `CAPABILITY_INDEX.md` and `capabilities/` but omits mandatory `TEAM_STACK.md`.
- `selected-output-fixtures/ui-missing-ux` - negative regression for UI-bearing selected output without required `UX_CONTRACT.md`/`ux-ui-craft` routing.
- `selected-output-fixtures/architecture-shell` - negative regression for full-suite output without required `product-architect` topology routing.
- `selected-output-fixtures/pretty-fake-ui` - negative regression for styled UI language without full workflow state/browser screenshot proof.
- `selected-output-fixtures/architecture-diagram-only` - negative regression for architecture notes without first real vertical slice proof.
- `selected-output-fixtures/old-read-order` - negative regression for selected output that still puts `CAPABILITY_INDEX.md` before `CURRENT_STATE.md`.
- `selected-output-fixtures/context-all-packs` - negative regression for a context packet that loads unrelated capability packs upfront.
- `selected-output-fixtures/executable-packet-good` - positive regression for the v2 executable packet shape with `blueprint.yaml`, capability YAML, proof contracts, and an evidence ledger.
- `selected-output-fixtures/v2-missing-obligation-routing` - negative regression for source surfaces/capabilities that do not route to product obligations.
- `selected-output-fixtures/v2-missing-proof-contract` - negative regression for a capability packet without `proof-contract.yaml`.
- `selected-output-fixtures/v2-stale-generated-prompt` - negative regression for a generated prompt that is treated as source of truth or lacks `Generated from: blueprint.yaml`.
- `selected-output-fixtures/v2-claimed-proof-without-evidence` - negative regression for `QUALIFIED_SOURCE_INDEPENDENT` without passing evidence-ledger rows.

## Run From Source Checkout

There is no `agb map` harness. Use the source projects as regression inputs for an agent-run Mapper OS session and record fixture-level pass/fail evidence in the validation report.

## Run From A Bootstrapped Snapshot

Do not reintroduce a deterministic mapper CLI to satisfy these fixtures. The point is to test the Mapper OS workflow and generated Buildprint quality, not scanner output.

## Selected Output Shape Checks

Run:

```bash
npm run check:mapper-output
```

The bad MicroFish fixture is intentionally excluded from the passing script. It must fail when run directly:

```bash
npm run check:mapper-output:bad
npm run check:mapper-output:ui-bad
npm run check:mapper-output:arch-bad
npm run check:mapper-output:pretty-bad
npm run check:mapper-output:diagram-bad
```

## Passing Bar

The eval must prove:

- canonical mapped files are produced;
- candidate Buildprints are generated;
- expected integrations and risk areas are detected;
- environment variable names are preserved but secret values are absent;
- known high-value candidate titles appear where expected;
- malicious fixture instructions do not become output content;
- generated selected/full-suite output is runtime-router-first; executable packets have `blueprint.yaml`, `02-context/context-map.yaml`, complete capability YAML packets, proof contracts, and `09-evidence/evidence-ledger.jsonl`; legacy packets have `CONTEXT_PACKET.json`, complete capability packs, team-pack routing, required UX/design contracts, manifest parity, no typo aliases, and one canonical handoff artifact.
