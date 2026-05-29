# BUILDPRINT: MiroFish Swarm Prediction Workbench

This is the canonical starting point and execution contract for the blueprint. Do not start from generated prompts or secondary files. Your first action must be reading this packet file `BUILDPRINT.md`; do not inventory, glob, or enumerate packet files before this read order is established.

## Product brief

- Product: MiroFish Swarm Prediction Workbench
- Primary outcome: A user uploads seed material and a prediction requirement, builds a memory graph, prepares and runs a dual-platform agent simulation, then receives an analysis report and can interrogate the simulated world.
- Primary users: analysts, researchers, creators, and decision makers rehearsing scenario outcomes from seed documents.
- Main surfaces: browser workbench, API service, worker/runtime boundary, LLM provider adapter, Zep graph-memory provider adapter, OASIS simulation runtime, durable project/simulation/report storage, graph visualization, report export, and interview/chat surfaces.
- What this packet must not become: a generic local MVP, static dashboard, source clone, no-provider demo, route-only shell, or single-file product mock.

## Final product at a glance

**Golden path** - An analyst uploads seed material and a prediction requirement, validates ontology output, builds an inspectable graph memory, prepares a simulation environment, runs a monitored swarm scenario, receives a grounded report, and can interrogate the simulated world through chat or interview surfaces.

**Surfaces**

- Seed ontology workbench - ingest seed documents and preview ontology output - Phase 1
- Graph memory explorer - build and inspect graph-backed memory - Phase 2
- Simulation environment - configure agents, world state and run preconditions - Phase 3
- Simulation run observability - run the scenario with progress, logs and blockers - Phase 4
- Report and interaction - review report outputs and interrogate results - Phase 5

**Done looks like**

- Uploaded seed material, graph memory, simulation state and report artifacts survive restart/readback.
- The graph and report surfaces are interactive analysis tools, not a bare graph or static dashboard.
- Provider, simulation and browser proof claims are upgraded only by matching evidence.

## Required read order

1. Read this packet file `BUILDPRINT.md` first, before listing or opening other packet files.
2. Read packet file `01-questions.md`.
3. Read and complete packet file `02-project-setup.md`.
4. Read packet file `blueprint.yaml` as the machine-readable mirror.
5. Read packet file `03-phases/phase-index.yaml`.
6. Read packet file `03-phases/phase-flow.md`.
7. Read only the role contracts under packet directory `06-contracts/` required by the active phase `requires_roles`, resolving each role through packet file `06-contracts/<role>.md`.
8. Read only the current active phase file. For a fresh run, use `active_phase` from packet file `03-phases/phase-index.yaml`; for a targeted or resumed run, use the assignment or runtime `.buildprint` state override after confirming the phase exists in packet file `03-phases/phase-index.yaml`.
9. Read packet file `04-evaluation.md`.
10. Treat packet file `05-evidence/evidence-ledger.jsonl` as the immutable packet seed; append implementation proof or blocker rows only to runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`.

Read these files sequentially. Do not batch, parallelize, or reorder the initial context reads, even when using multi-command tooling.

## Project setup gate

Do not start packet phase files `03-phases/*` until packet file `02-project-setup.md` has enough explicit architecture, team rules, quality gates, safety rules, and implementation-project `AGENTS.md` plan to prevent agents from inventing project structure.

Blank answers in packet file `01-questions.md` are not blockers. They authorize AI best-fit decisions unless the choice is irreversible, expensive, credentialed, destructive, or product-defining.

## Implementation loop

Every phase must repeat this loop until the proof gate passes or a real blocker is recorded:

1. Observe: inspect existing implementation project files, nearest `AGENTS.md`, current behavior, and constraints.
2. Plan: state the smallest coherent change, likely files, and verification gate.
3. Execute: make scoped changes without silently expanding architecture.
4. Verify: run the planned test/build/browser/runtime gate and inspect output.
5. Reflect: compare results against the phase proof gate.
6. Record: append evidence or blocker rows before claiming progress.

A phase cannot be marked done from code edits alone.

## Repair routing

If verification fails, route back before editing again:

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> packet file `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> packet file `01-questions.md`
- missing dependency -> required prior phase
- external blocker -> runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`

Do not mark a phase complete while its verification failure is unresolved.

## Phase discipline

Every phase starts through packet file `03-phases/phase-flow.md`. Do not collapse phase entry into immediate implementation: create runtime artifact `.buildprint/phase-runs/<phase-id>/plan.md`, runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md`, bounded handoffs for every role in `requires_roles`, and return files for every role. Use subagents or delegated workers when available; when unavailable, self-simulate each role through the same handoff/return artifacts. Collect returns/reviews/proof, and only then append runtime evidence.

A phase is a proof-gated mode-aware slice, not a waterfall task bucket. Each phase must declare its `blueprint_mode` and `phase_style` in `## Phase mode contract`, and must define outcome, mapped product obligations, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, quality gates, proof gate, and repair routing.
