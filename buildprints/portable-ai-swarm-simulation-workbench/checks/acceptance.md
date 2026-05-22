# Acceptance Checklist

- [ ] `BUILDPRINT.md`, `START_HERE.md`, `blueprint.yaml`, and context files are read in order.
- [ ] Each capability packet is implemented only when dependency-ready.
- [ ] Upload, ontology, graph, simulation setup, simulation runtime, report/chat, and history lifecycle are proven in browser/runtime traces.
- [ ] Provider-backed behavior is either explicitly deterministic-test-double or proven live with credentials.
- [ ] Persistence restart/readback and delete/reset behavior are proven.
- [ ] Secrets, uploads, subprocess/runtime controls, logs, screenshots, and report data pass security review.
- [ ] `.buildprint/evidence/evidence-ledger.jsonl` contains proof rows for every upgraded claim.
- [ ] No fake/static graph/report/runtime/chat/history behavior is accepted.
