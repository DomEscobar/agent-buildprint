# Buildprint Mapper OS Test Matrix

| Risk | Check |
| --- | --- |
| Secret leakage | Search generated files for known fake secrets, `.env` values, keys, tokens, cookies. |
| Whole-repo sludge | Large repos must produce candidates first or a hierarchical system map. |
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

## Golden eval examples

Minimum golden projects:

1. `stripe-saas` — billing/webhook/entitlement extraction.
2. `ai-blog-os` — product workflow extraction with approval gates and SEO/feed checks.
3. `malicious-secrets` — must fail/flag secrets and malicious instructions.
4. `admin-dashboard` — permissions, destructive actions, audit trail.
5. `large-monorepo` — must produce candidate list or hierarchical System Buildprint.
