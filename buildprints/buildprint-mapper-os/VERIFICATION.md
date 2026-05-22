# Mapper OS Verification

## Required Checks

| Gate | Applies when | Pass condition |
|---|---|---|
| Source safety | every mapping run | source checkout remains read-only and secret values are not copied |
| Claim promotion | every mapping run | every `OBSERVED` claim cites source path and line or section |
| Scanner non-authority | every mapping run | census hints do not assert product behavior, absence, parity, provider completeness, or candidate readiness |
| Scope boundary | selected extraction | selected output is under `selected-buildprint/` and root remains discovery/evidence/quality |
| Capability completeness | selected extraction | every capability has readiness state: `INCLUDED_READY`, `INCLUDED_NEEDS_PROOF`, `INCLUDED_BLOCKED`, `INCLUDED_RISKY_REQUIRES_HARDENING`, `OUT_OF_SCOPE_BY_USER_ONLY`, or `TEST_ONLY_MOCK` |
| Capability packs | medium/large/full-suite | `CAPABILITY_INDEX.md` and per-capability `CAPABILITY.md`, `VERIFICATION.md`, and `IMPLEMENTATION.md` exist |
| Team-pack router | selected extraction | `TEAM_STACK.md` exists, required teams are inferred from product signals, and lazy/simple/quick quality tiers are forbidden |
| UX contract | UI-bearing selected extraction | `UX_CONTRACT.md` defines screens, workflows, state inventory, component inventory, responsive behavior, accessibility proof, interaction polish, and browser proof plan |
| Design quality bar | UI-bearing selected extraction | `DESIGN_QUALITY_BAR.md` defines taste variables, visual hierarchy, forbidden generic patterns, accessibility gates, responsive gates, and required screenshot set |
| Runtime-router packet | medium/large/full-suite | fresh agent can start from `BUILDPRINT.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, `TEAM_STACK.md`, `CONTEXT_PACKET.json`, and one active capability pack without loading every Markdown file; `CAPABILITY_INDEX.md` is post-proof continuation only |
| Context packet | medium/large/full-suite | `CONTEXT_PACKET.json` has narrow `mustRead`, gated `readIfNeeded`, explicit `doNotReadYet`, proof gate, advance target, and stop conditions |
| Manifest parity | selected extraction | `manifest.json` parses and file entries match actual selected package files |
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

Use `evals/selected-output-fixtures/` with `scripts/check-mapper-selected-output.mjs` for shape regression. The MicroFish bad-shape fixture must fail; the corrected MicroFish/team-stack fixture must pass while remaining `SELECTED_UNQUALIFIED`. The UI-missing-UX, architecture-shell, pretty-fake-UI, and architecture-diagram-only fixtures must fail.

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
