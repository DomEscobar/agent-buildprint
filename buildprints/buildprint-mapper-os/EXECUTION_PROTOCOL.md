# Mapper OS Execution Protocol

Use this protocol when an agent runs Mapper OS against a source project.

For the full current methodology, read [`METHODOLOGY.md`](METHODOLOGY.md). This file is the short operating protocol; `METHODOLOGY.md` is the canonical explanation of the phase-flow replay and evidence-honesty model.

## Global Loop

1. Intake: identify source input, output target, requested scope, risk posture, and success criteria.
2. Source acquisition: open local source or clone/check out Git URL into a temporary read-only location.
3. Safe census: collect hints and secret-safe metadata only.
4. Capability discovery: read source surfaces and promote claims with evidence.
5. Scope selection: choose candidate, explicit scope, or full-suite; otherwise remain discovery-only.
6. Distillation: convert source facts into source-independent capability contracts.
7. Executable packet generation: emit the selected Buildprint spine, including `03-phases/phase-flow.md` and `05-evidence/evidence-ledger.schema.json`.
8. Phase-flow planning: every implementation phase starts with `## How to implement this phase` and names its read order, outputs, proof gate, repair route, review contract, and handoff rule.
9. Runtime verification: run applicable gates, append schema-valid runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`, or record scoped blockers.
10. Review and handoff: produce architecture, UX, and QA reviews with concrete evidence; update progress, state, and next-agent continuity.

## Context Rules

- Read only files relevant to the active discovery or capability decision.
- Summarize evidence before planning.
- Do not let census output author product facts.
- Do not require downstream implementers to inspect source after qualification.
- During replay, do not enumerate parent directories or recover source context outside the temp workspace.

## Runtime Evidence Rules

- Packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.
- Runtime evidence belongs in `.buildprint/evidence/evidence-ledger.jsonl`.
- Read `selected-buildprint/05-evidence/evidence-ledger.schema.json` before writing runtime evidence.
- Runtime rows must include `artifact_id`, `type`, `phase_id`, `status`, `source`, `proves`, `proof_type`, `provider_mode`, and `upgrades_claim`.
- Do not set `upgrades_claim: true` for blocker-qualified, missing, synthetic, partial, sandbox-limited, network-limited, credential-limited, or dry-run-only evidence.
- Do not claim `no_fake_scan_pass` unless a real no-fake scan command or artifact exists and ran.

## Repair Loop

For every failed gate:

```text
failed check
-> observed failure
-> likely capability or contract gap
-> focused next action
-> rerun check
-> pass or blocker
```

## Fresh Review Triggers

Use a fresh-context review for auth, billing, admin, uploads, user data, external providers, webhooks, persistence, async processing, queues, destructive actions, broad refactors, or weak verification evidence.

Reviews must name what passed, what is not proven, which blockers limit production claims, and what repair is required before stronger evidence.
