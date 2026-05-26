# Acceptance Checklist

- [ ] `BUILDPRINT.md` is the canonical entry point.
- [ ] `02-project-setup.md` defines architecture, team model, execution authority, handoffs, `AGENTS.md` plan, quality gates, safety, assumptions, and phase start gate.
- [ ] Every implementation phase starts through `03-phases/phase-flow.md`.
- [ ] Every phase creates phase-run artifacts before runtime evidence.
- [ ] Runtime evidence is appended only to `.buildprint/evidence/evidence-ledger.jsonl`.
- [ ] `05-evidence/evidence-ledger.schema.json` validates honest evidence rows.
- [ ] Deterministic provider, tool, skill, MCP, memory, team, telemetry, and WebUI/API proof gates pass or record blockers.
- [ ] Live provider, real MCP, shell/browser/network, production auth, billing, publishing, hosted SaaS, and exact clone claims are not upgraded without separate proof.
