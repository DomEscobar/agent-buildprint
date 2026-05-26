# Mapper OS Verification

## Required Checks

| Gate | Applies when | Pass condition |
|---|---|---|
| Source safety | every mapping run | source checkout remains read-only and secret values are not copied |
| Claim promotion | every mapping run | every `OBSERVED` claim cites source path and line or section |
| Scanner non-authority | every mapping run | census hints do not assert product behavior, absence, parity, provider completeness, or candidate readiness |
| Scope boundary | selected extraction | selected output is under `selected-buildprint/` and root remains discovery/evidence/quality |
| Behavior completeness | selected extraction | every selected behavior is represented by a phase packet, blocker, explicit merge, or user-approved exclusion |
| Execution-packet spine | selected extraction | `BUILDPRINT.md`, `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, at least one phase packet, `04-evaluation.md`, and `05-evidence/evidence-ledger.jsonl` exist |
| Phase packets | medium/large/full-suite | each phase Markdown file includes build target, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, implementation loop, proof gate, and repair routing |
| UX contract | UI-bearing selected extraction | relevant phase packets define screens, workflows, responsive behavior, accessibility proof, interaction polish, and browser proof plan |
| Design quality bar | UI-bearing selected extraction | relevant phase packets define visual quality bar, forbidden generic patterns, accessibility gates, responsive gates, and required screenshot set |
| Runtime router | medium/large/full-suite | fresh agent starts from `BUILDPRINT.md`, `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, and one active phase without loading every Markdown file; `03-phases/phase-index.yaml` is post-proof continuation only |
| Evidence ledger | selected extraction | packaged `05-evidence/evidence-ledger.jsonl` is an immutable seed and runtime proof writes only to `.buildprint/evidence/evidence-ledger.jsonl` with `phase_id` |
| Obsolete packet cutoff | selected extraction | `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, packet `AGENTS.md`, `03-capabilities/`, `04-interfaces/`, `05-state-runtime/`, `06-safety/`, `08-evaluation/`, `09-evidence/`, root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `02-context/active-slice.yaml`, `07-execution/phases/`, `capabilities/`, `generated/current-buildprint-compat/`, and fragmented mini-files are absent |
| Filename typo guard | selected extraction | typo aliases such as `VERFICATION.md`, `IMPLEMENATION.md`, and `CAPABILTY_INDEX.md` are absent |
| Handoff singularity | selected extraction | selected package spine does not contain both `HANDOFF.md` and `HANDOVER.md` |
| Execution planning | selected extraction | each included phase has a proof gate, repair loop, stop condition, and next-phase unlock policy |
| No-fake | selected extraction | no included behavior is placeholder-backed, mock-backed, no-op, skeleton, or in-memory-only where persistence is claimed |
| Hardening | sensitive surfaces | threat/data/observability/secret/abuse controls exist and are verified or the capability is blocked |
| Qualification language | every output | public copy matches `DISCOVERY_ONLY`, `PROOF_REQUIRED`, or `QUALIFIED_SOURCE_INDEPENDENT` |

## Fixture Review

Run the deterministic source-signal oracle first:

```bash
npm run eval:mapper-golden
```

It writes `quality/mapper-eval-report.json` and verifies that golden fixture expectations are source-backed, secret-safe, prompt-injection-safe, and read-only. This is a prerequisite for slower manual or agent-run replay checks, not a replacement for them.

Use `evals/golden-projects/` as regression input for manual or agent-run review. Each fixture review must record:

- source input;
- selected output mode;
- promoted claims;
- rejected scanner claims;
- executable-blueprint readiness map, including user-excluded and blocked behavior;
- no-fake findings;
- qualification label;
- evidence gaps.

Use `evals/selected-output-fixtures/` with `scripts/check-mapper-selected-output.mjs` for shape regression. The execution-packet-good fixture must pass while remaining proof-required. The negative fixtures for obsolete router files, missing setup, missing proof gates, missing repair routing, missing interfaces/state sections, skipped read order, and packet AGENTS.md must fail.

## Fresh-Agent Replay Eval

Run the deterministic mechanics check:

```bash
npm run eval:mapper-replay -- --dry-run
```

Run the real Codex replay when LLM/model access is available:

```bash
npm run eval:mapper-replay
```

The replay harness copies the selected executable blueprint into `/tmp/mapper-replay-*`, initializes git in that temp workspace, invokes Codex CLI as the isolated downstream implementation agent via `codex exec --full-auto <prompt>`, captures stdout/stderr/transcript, and writes `quality/mapper-replay-report.json`.

Automated scoring currently checks read-order/setup adherence signals, question/setup gate handling, active phase/proof-gate references, runtime evidence-ledger behavior, and absence of obsolete routing tokens (`START_HERE`, `PRE_IMPLEMENTATION_QUESTIONS`, `03-capabilities`). Manual review still owns no-fake implementation quality, product completeness, proof sufficiency, UX/design proof quality, and blocker honesty.

The dry-run mode does not invoke Codex and is safe for normal CI. The real replay is intentionally not part of `npm test` because it depends on an LLM agent and may require network/model access.

## Repository Checks

Run after changing Mapper OS package files:

```bash
node --check bin/agb.js
node --check scripts/eval-mapper-golden.mjs
node --check scripts/eval-mapper-replay.mjs
npm run check:spine
npm run check:mapper-output
npm run check:mapper-output:negative
npm run eval:mapper-golden
npm run eval:mapper-replay -- --dry-run
npm test
npm run pack:smoke
git diff --check
```

## Commands Run

Record exact commands run, commands skipped, results, evidence, and blockers in the mapping handoff or selected package verification files.
