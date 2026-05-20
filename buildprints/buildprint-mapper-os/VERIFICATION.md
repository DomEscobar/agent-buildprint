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
