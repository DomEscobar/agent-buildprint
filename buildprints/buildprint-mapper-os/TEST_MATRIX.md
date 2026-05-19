# Buildprint Mapper OS Test Matrix

| Risk | Check |
| --- | --- |
| Secret leakage | Search generated files for known fake secrets, `.env` values, keys, tokens, cookies. |
| Whole-repo sludge | Large repos must produce candidates first or a hierarchical system map. |
| Missing size classification | Output must state small/medium/large/monorepo-system and justify selected mode from evidence. |
| Missing decomposition | Medium/large/system repos must include `DECOMPOSITION_STRATEGY.md` or equivalent manifest/review-packet section. |
| Giant implementation plan | Large repo output must not claim one broad implementation plan is safe without selected scope/candidate. |
| Untestable candidate | Each candidate must include implementation phases and a concrete feature-slice validation strategy. |
| Hallucinated validation | `SUBMISSION_CHECKLIST.md` must distinguish commands run from commands not run. |
| Ungrounded claims | Important claims must be tagged OBSERVED/INFERRED/QUESTION. |
| Missing scope | Generated package must define included/excluded paths or explicitly state full-system mode. |
| Unusable Buildprint | `PLAN.md` and `TEST_MATRIX.md` must include actionable phases/checks. |
| Marketplace confusion | `README.md` must explain build outcome, audience, stack, and license. |
| Agent context rot | Generated Buildprint must include AGENT_EXECUTION_BRIEF.md, agent-contract.xml, CURRENT_STATE.md, and manifest.json with read order and phase gates. |
| Invalid agent contract | agent-contract.xml must parse and contain mission/read-order/must/must-not/stop-if/done-criteria. |
| Invalid manifest | manifest.json must parse and list required files/gates. |
| Proof-only product claims | Product/app/feature Buildprints must default to production-grade selected scope: smaller scope is OK, fake included features are not. |
| Mock-as-product | Mocks/fixtures may exist only in test/demo paths and must not be counted as product implementation. |
| Placeholder routes/controls | Crawl/click primary routes and controls; included surfaces must be real pages/actions or explicit blockers. |
| In-memory product persistence | If persistence is claimed, run write → restart/reload → read proof through real app/API. |
| Skeleton adapters counted as implementation | Provider/export/queue/auth/billing/upload adapters must be real or excluded, not skeleton success paths. |
| Overbuilt reversal | Reversal should stay compact by cutting scope, not by faking included implementation. |
| Harness bug mistaken for Buildprint gap | `REVERSAL_REPORT.md` must separate Buildprint gaps from scratch harness/tooling issues. |
| TypeScript scratch drift | TS/NodeNext reversal tests must use compatible import specifiers/config and validate with both typecheck and test commands when applicable. |
| Product proof missing | Product/feature Buildprints must include a final setup step that runs the generated app/thing on the user machine when feasible. |
| Browser UI unverified | Browser-based proofs must run Playwright CLI QA against realistic user journeys and save command/evidence in `QA_REPORT.md`. |
| No-fake scan missing | `IMPLEMENTATION_COMPLETENESS.md` must record placeholder/no-op/mock/skeleton/in-memory checks and verdict. |
| One-shot-looking demo | Public proof should show Buildprint/module evidence + QA/gap report, not only a rough generated UI or proof-only shell. |
| Missing edge cases | Selected Buildprint must include edge-case/failure-mode inventory mapped to tests or questions. |
| Missing state model | Non-trivial product flows must include lifecycle/state-machine behavior and invariants. |
| Weak evidence density | Critical modules require enough `OBSERVED(path:line)` citations to ground responsibilities, contracts, and edge behavior. |
| Vague QA | Acceptance criteria must be executable or manually verifiable; avoid “works correctly” style checks. |
| Missing traceability | Critical requirements must appear in `TRACEABILITY_MATRIX.md` with source evidence and reversal/QA checks. |
| Generic QA plan | `QA_PLAN.md` must be generated from the mapped scope and product flows, not copied from a generic checklist. |
| Missing capability baseline | Famous-product/system proofs must include `CAPABILITY_BASELINE.md` to avoid false clone/parity claims. |
| Missing conditional precision artifact | Threat model, data lifecycle, architecture views, decisions, observability, and scorecard must be present when their scope triggers apply. |
| Golden eval drift | `evals/check-map.mjs` must pass against all included fixture repos when mapper behavior or templates change. |
| Secret/prompt-injection regression | Golden eval outputs must preserve env var names while excluding fixture secret values and malicious fixture instructions. |

## Golden eval examples

Included golden projects:

1. `stripe-saas` — billing/webhook/entitlement extraction.
2. `malicious-secrets` — must flag env var names while excluding secret values and malicious instructions.
3. `admin-dashboard` — permissions, destructive actions, auth/session risk, and audit trail expectations.
4. `large-monorepo` — must produce candidates for mixed integrations and scope pressure.
5. `route-patterns` — must detect Next/Fastify route/API shapes, upload/cache/auth/AI signals.

Large/mixed fixtures must also prove the mapper reports scope pressure and safe candidate-selection as the latest starting point before implementation.

Required command from the source checkout:

```bash
node buildprints/buildprint-mapper-os/evals/check-map.mjs --agb ./bin/agb.js
```


## Feature-scope overhaul

Mapper OS is capability-first. See `FEATURE_SCOPE_CONTRACT.md`: features are the rebuild contract; files are evidence; implementation decomposition must produce `FEATURE_INVENTORY.md`, `PRODUCT_CAPABILITY_MAP.md`, `IMPLEMENTATION_DECOMPOSITION.md`, `PHASE_PLAN.md`, `LOOP_GATES.md`, and `PARITY_ACCEPTANCE.md`.
