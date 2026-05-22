# Mapper OS Verification

## Required Checks

| Gate | Applies when | Pass condition |
|---|---|---|
| Source safety | every mapping run | source checkout remains read-only and secret values are not copied |
| Claim promotion | every mapping run | every `OBSERVED` claim cites source path and line or section |
| Scanner non-authority | every mapping run | census hints do not assert product behavior, absence, parity, provider completeness, or candidate readiness |
| Scope boundary | selected extraction | selected output is under `selected-buildprint/` and root remains discovery/evidence/quality |
| Capability completeness | selected extraction | every capability has readiness state: `INCLUDED_READY`, `INCLUDED_NEEDS_PROOF`, `INCLUDED_BLOCKED`, `INCLUDED_RISKY_REQUIRES_HARDENING`, `OUT_OF_SCOPE_BY_USER_ONLY`, or `TEST_ONLY_MOCK` |
| Executable packet spine | selected extraction | `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, `blueprint.yaml`, `02-context/context-map.yaml`, `03-capabilities/capability-index.yaml`, and `09-evidence/evidence-ledger.jsonl` exist |
| Capability packets | medium/large/full-suite | every capability folder under `03-capabilities/` includes `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, and `proof-contract.yaml` |
| Team-pack router | selected extraction | `02-context/team-stack.yaml` exists, required teams are inferred from product signals, and lazy/simple/quick quality tiers are forbidden |
| UX contract | UI-bearing selected extraction | `02-context/ux-contract.md` defines screens, workflows, state inventory, component inventory, responsive behavior, accessibility proof, interaction polish, and browser proof plan |
| Design quality bar | UI-bearing selected extraction | `02-context/design-quality-bar.md` defines taste variables, visual hierarchy, forbidden generic patterns, accessibility gates, responsive gates, and required screenshot set |
| Runtime router | medium/large/full-suite | fresh agent starts from `START_HERE.md`, `blueprint.yaml`, `02-context/context-map.yaml`, `PRE_IMPLEMENTATION_QUESTIONS.md`, `02-context/team-stack.yaml`, and one active capability packet without loading every Markdown file; `03-capabilities/capability-index.yaml` is post-proof continuation only |
| Evidence ledger | selected extraction | packaged `09-evidence/evidence-ledger.jsonl` is an immutable seed and runtime proof writes only to `.buildprint/evidence/evidence-ledger.jsonl` |
| Legacy v1 cutoff | selected extraction | root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `capabilities/`, and `generated/current-buildprint-compat/` are absent |
| Filename typo guard | selected extraction | typo aliases such as `VERFICATION.md`, `IMPLEMENATION.md`, and `CAPABILTY_INDEX.md` are absent |
| Handoff singularity | selected extraction | selected package spine does not contain both `HANDOFF.md` and `HANDOVER.md` |
| Execution planning | selected extraction | each included capability has first slice, first gate, repair loop, and stop condition |
| No-fake | selected extraction | no included capability is placeholder-backed, mock-backed, no-op, skeleton, or in-memory-only where persistence is claimed |
| Hardening | sensitive surfaces | threat/data/observability/secret/abuse controls exist and are verified or the capability is blocked |
| Qualification language | every output | public copy matches `DISCOVERY_ONLY`, `SELECTED_UNQUALIFIED`, or `QUALIFIED_SOURCE_INDEPENDENT` |

## Fixture Review

Use `evals/golden-projects/` as regression input for manual or agent-run review. Each fixture review must record:

- source input;
- selected output mode;
- promoted claims;
- rejected scanner claims;
- capability readiness map, including user-excluded and blocked capabilities;
- no-fake findings;
- qualification label;
- evidence gaps.

Use `evals/selected-output-fixtures/` with `scripts/check-mapper-selected-output.mjs` for shape regression. The executable-packet-good fixture must pass while remaining `SELECTED_UNQUALIFIED`. The v2 negative fixtures for missing obligations, missing proof contracts, stale generated prompts, missing pre-questions, missing UI/team gates, and claimed proof without evidence must fail.

## Repository Checks

Run after changing Mapper OS package files:

```bash
node --check bin/agb.js
npm run check:spine
npm run eval:analyze
git diff --check
```

## Commands Run

Record exact commands run, commands skipped, results, evidence, and blockers in the mapping handoff or selected package verification files.
