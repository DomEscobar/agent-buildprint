# BUILDPRINT: MiroFish Portable AI Swarm Simulation Workbench

## Product brief

- Product: MiroFish portable AI swarm simulation workbench.
- Primary outcome: turn uploaded source material and a prediction requirement into an ontology-backed graph, OASIS-ready agents, dual-platform social simulation, report analysis, and post-simulation interaction.
- Primary users: analysts, researchers, storytellers, and operators who need to rehearse scenarios through simulated social agents.
- Main surfaces: browser workbench, API service, worker/runtime, provider adapter boundaries for OASIS/Zep/LLM, persistence, artifact export, report/chat/interview tools, lifecycle operations.
- What this packet must not become: a generic dashboard, static report viewer, route/function clone, mock-only simulation, local MVP, or source-framework-preserving port.

## Required read order

Fresh agents must read in this order before inventorying packet files:

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `02-project-setup.md`
4. `blueprint.yaml`
5. `03-phases/phase-index.yaml`
6. `03-phases/phase-flow.md`
7. Required `06-contracts/<role>.md` files for the active phase only
8. The active phase file named by `03-phases/phase-index.yaml` `active_phase`
9. `04-evaluation.md`
10. `05-evidence/evidence-ledger.jsonl` packet file seed only

For a targeted or resumed run, an explicit assignment or `.buildprint/next-agent.md` may override the active phase. The override must name one phase file and required roles; otherwise use `03-phases/phase-index.yaml` `active_phase`.

## Project setup gate

Do not start a phase until `01-questions.md` defaults are accepted or overridden and `02-project-setup.md` is concrete enough to create root/local `AGENTS.md` and `.buildprint/setup.md` in the implementation project.

`AGENTS.md` in the downstream repo is a scope governor, not a product brain. `.buildprint/next-agent.md` is continuity for fresh sessions.

## Implementation loop

Use observe, plan, execute, verify, reflect, record. Before runtime evidence, follow `03-phases/phase-flow.md`: write `.buildprint/phase-runs/<phase-id>/plan.md`, `.buildprint/phase-runs/<phase-id>/team-gates.md`, handoffs, returns, reviews, proof, then append `.buildprint/evidence/evidence-ledger.jsonl`.

Use subagents or delegated workers when available. If unavailable, self-simulate every required role and write the same handoff and return artifacts. Subagents are optional tooling; role-gated artifacts are mandatory.

## Repair routing

- Current phase bug, failed proof gate, missing role return, UI quality failure, runtime error: repair the current phase.
- Architecture contradiction: return to `02-project-setup.md`.
- Missing human preference for irreversible, expensive, credentialed, destructive, or product-defining fork: route to `01-questions.md`.
- Missing prerequisite: return to dependency phase from `03-phases/phase-index.yaml`.
- External provider/live credential blocker: record non-upgrading blocker in `.buildprint/evidence/evidence-ledger.jsonl` after adapter/config/test/runtime wiring exists.
