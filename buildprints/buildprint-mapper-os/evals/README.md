# Buildprint Mapper OS Golden Evals

These fixtures make the Mapper OS non-illustrative. They are reviewed by an agent or human against generated mapping artifacts to confirm the required signals while avoiding secret leakage and malicious prompt contamination.

## Source Fixtures

- `stripe-saas` - billing/webhook/auth detection and billing questions.
- `malicious-secrets` - `.env.example` secret variables, secret values, and prompt-injection text must not leak into outputs.
- `admin-dashboard` - admin surface, auth/session, destructive action, and audit-risk detection.
- `large-monorepo` - mixed integrations and scope/candidate pressure.
- `route-patterns` - Next/Fastify-style route and upload/cache/auth/AI detection.

## Selected Output Fixtures

These fixtures define the current executable packet baseline. They are not a version-migration archive.

- `selected-output-fixtures/executable-packet-good` - positive baseline fixture with `BUILDPRINT.md`, setup gates, phase routing, proof gates, evaluation rules, and seed evidence.
- `selected-output-fixtures/forbidden-start-here` - negative regression for obsolete `START_HERE.md` routing.
- `selected-output-fixtures/forbidden-pre-implementation-questions` - negative regression for obsolete `PRE_IMPLEMENTATION_QUESTIONS.md` routing.
- `selected-output-fixtures/forbidden-capabilities-dir` - negative regression for obsolete `03-capabilities/` packets.
- `selected-output-fixtures/missing-project-setup` - negative regression for skipping `02-project-setup.md`.
- `selected-output-fixtures/phase-missing-repair-routing` - negative regression for phases without repair routing.
- `selected-output-fixtures/phase-missing-proof-gate` - negative regression for phases without proof gates.
- `selected-output-fixtures/phase-missing-interfaces-state` - negative regression for phases without interface/state obligations.
- `selected-output-fixtures/buildprint-skips-questions-setup` - negative regression for read orders that jump directly to phases.
- `selected-output-fixtures/forbidden-packet-agents` - negative regression for packets that generate packet-root `AGENTS.md`.

## Deterministic Golden Harness

Run:

```bash
npm run eval:mapper-golden
```

This is a source-signal oracle, not a replacement for a fresh-agent mapping run. It reads each `golden-projects/*/expected-signals.json`, scans the fixture source, and writes `quality/mapper-eval-report.json` with:

- detected integrations, risk surfaces, env var names, API surfaces, candidate titles, and blocking questions;
- secret-value and prompt-injection non-leak checks;
- source read-only hash checks before and after fixture review;
- fixture-level pass/fail evidence.

Use it to keep the golden expectations honest before running slower agent replay evals.

## Fresh-Agent Replay Harness

The replay eval tests downstream packet consumption quality. It copies one selected executable-blueprint packet into a new `/tmp/mapper-replay-*` workspace, initializes git there so Codex treats it as a normal project, and asks a fresh Codex CLI agent to perform a phase-1 implementation/replay using only the copied packet. Real replay invokes `codex exec --full-auto <prompt>` so the downstream agent can create setup, implementation, verification, and runtime evidence files inside the temp workspace.

Deterministic dry-run for CI and harness mechanics:

```bash
npm run eval:mapper-replay -- --dry-run
```

Equivalent shortcut:

```bash
npm run eval:mapper-replay:dry-run
```

Real Codex replay, intentionally not wired into `npm test` because it invokes an LLM agent and may require network/model access:

```bash
npm run eval:mapper-replay
```

The default packet is:

```text
buildprints/buildprint-mapper-os/evals/selected-output-fixtures/executable-packet-good/selected-buildprint
```

Override it when needed:

```bash
npm run eval:mapper-replay -- --packet path/to/selected-buildprint
```

Reports:

- `quality/mapper-replay-report.json` - machine-readable result, command metadata, workspace path, scored signals, and manual-review reminders.
- `quality/mapper-replay-transcript.txt` - prompt plus Codex stdout/stderr, or deterministic dry-run transcript.

Current automated scoring is signal-based:

- canonical read-order and setup-gate references;
- question/default handling and root implementation `AGENTS.md` setup behavior;
- active phase/proof-gate and `phase_id` references;
- runtime evidence ledger behavior under `.buildprint/evidence/evidence-ledger.jsonl`;
- absence of obsolete routing tokens such as `START_HERE`, `PRE_IMPLEMENTATION_QUESTIONS`, and `03-capabilities`.

Manual review still owns product completeness, no-fake implementation quality, proof sufficiency, UX/design evidence quality, and whether any blocker rows are honest. The replay harness must not become a deterministic mapper and must not reintroduce `agb map`.

## Run From Source Checkout

There is no `agb map` harness. Use the source projects as regression inputs for an agent-run Mapper OS session and record fixture-level pass/fail evidence in the validation report. Compare the agent-produced mapping artifacts against `quality/mapper-eval-report.json` and the fixture `expected-signals.json` files.

## Run From A Bootstrapped Snapshot

Do not reintroduce a deterministic mapper CLI to satisfy these fixtures. The point is to test the Mapper OS workflow and generated Buildprint quality, not scanner output. The deterministic golden harness may verify fixture signals, but it must not become the mapping product.

## Selected Output Shape Checks

Run:

```bash
npm run check:mapper-output
```

Negative baseline fixtures are intentionally excluded from the passing script. They must fail through:

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
- generated selected/full-suite output follows the current executable packet baseline: `BUILDPRINT.md`, `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, phase Markdown files, proof gates, `04-evaluation.md`, and `05-evidence/evidence-ledger.jsonl`;
- obsolete selected-output entrypoints/directories, packet AGENTS.md, and fragmented per-capability mini-files are absent.
