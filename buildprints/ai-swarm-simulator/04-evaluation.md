# Evaluation

This packet is `PROOF_REQUIRED`. Evaluation proves bounded implementation behavior, not production readiness. Promotion requires runtime evidence rows in `.buildprint/evidence/evidence-ledger.jsonl`, not the seed ledger in this packet.

## Required proof concepts

- `provider_live`: live LLM, Zep, and OASIS claims require configured sandbox/live provider evidence. Deterministic adapters do not upgrade provider claims.
- `durable_persistence`: project, ontology, graph id/data, simulation artifacts, run state, report artifacts, and chat history must reload after process restart or equivalent storage reset.
- `security_boundary`: uploads, provider credentials, process control, generated reports, and chat traces require review for file limits, secret handling, path traversal, provider budget, and data leakage.
- `no_fake`: token bubbles, static graph screenshots, canned reports, fake success states, dead buttons, placeholder routes, and mock-only product paths block phase completion.
- `production_readiness`: requires tests/lint/build/browser/runtime proof, final critical reviewer, anti-slop pass, observability/error handling, and documented live-provider blockers.

## Evidence ceiling

Do not overclaim from a single proof:

- API tests prove API behavior, not browser usability.
- Browser screenshots prove visible state, not provider correctness.
- Deterministic provider tests prove sandbox product flow, not `provider_live`.
- Review prose is not evidence unless it cites command output or on-disk artifacts.
- A graph fixture proves canvas behavior only when the browser test exercises pan/zoom/drag/select/inspect/refresh/label state.

## Phase promotion matrix

| Phase | Core proof required | Claim upgrades blocked without |
|---|---|---|
| 01-scenario-ontology-intake | scenario roundtrip, ontology validation, browser intake/inspector | live LLM provider proof, upload hardening review |
| 02-graph-canvas-workbench | graph build/data proof, canvas interaction proof, provider-blocker honesty | live Zep proof, visual quality screenshot review |
| 03-simulation-runtime-monitor | preparation artifacts, dual-platform runtime/replay proof, stop/recovery proof | live OASIS proof, process hardening review, graph-memory live update proof |
| 04-report-interaction-console | report artifact proof, stateful chat proof, final reviewer, anti-slop pass | live report-agent proof, security/privacy review, production readiness |

## Required verifier artifacts

Each phase run must save:

- `.buildprint/phase-runs/<phase-id>/phase-preflight.yaml`
- `.buildprint/phase-runs/<phase-id>/plan.md`
- `.buildprint/phase-runs/<phase-id>/proof.md`
- `.buildprint/phase-runs/<phase-id>/evidence.json`
- command output logs or browser screenshots/traces named in `evidence.json`

## No-fake review checklist

The final reviewer must verify:

- Scenario inputs change ontology, graph, simulation, and report outputs.
- Graph canvas is central, interactive, and relationship-aware.
- Every visible button changes state, opens an inspector, starts a job, records a blocker, or is removed.
- Missing credentials show blocked-provider states and evidence rows, not fake success.
- Reload preserves durable artifacts.
- Error states are reachable and readable.
- No visible placeholder text, TODO stubs, debug/proof vocabulary, generic dashboard leakage, or default form stack remains.

## Completion labels

- `checkpoint_recorded`: a valid proof or blocker row exists for the phase.
- `phase_core_passed`: local executable proof satisfies the owned surface's first real vertical path.
- `claim_qualified`: matching live/browser/security/worker/provider/persistence evidence upgrades a specific claim.
- `complete-bounded-proof`: all phases have passed their core proof gates, final review and anti-slop pass are recorded, and remaining blockers are non-core qualification blockers.

No label above means the product is fully production-ready unless every required `production_readiness` proof is present.
