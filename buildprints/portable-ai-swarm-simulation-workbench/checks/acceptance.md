# Acceptance

- [ ] `BUILDPRINT.md` is the only start point.
- [ ] `01-questions.md` and `02-project-setup.md` are resolved before phase work.
- [ ] `03-phases/phase-index.yaml` identifies the active phase.
- [ ] `02-project-setup.md` defines production readiness: auth/session/tenant, provider adapters/config/tests, durable persistence, worker/runtime, deployment/ops, observability, CI, and repeatable browser/e2e.
- [ ] Missing credentials or paid services block live proof only after implementation includes adapter/config/test/runtime wiring.
- [ ] `03-phases/phase-flow.md` phase-run artifacts exist before runtime evidence is appended.
- [ ] Phase IDs match phase file basenames and multi-phase dependencies model workflow order.
- [ ] Each phase uses observe/plan/execute/verify/reflect/record.
- [ ] Failed verification routes back to the current phase or responsible setup/question/prior-phase blocker.
- [ ] Runtime proof/blockers are recorded in `.buildprint/evidence/evidence-ledger.jsonl`; packaged `05-evidence/evidence-ledger.jsonl` remains seed-only.
