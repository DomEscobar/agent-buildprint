# BUILDPRINT: MiroFish Canvas Webapp Workbench

This Buildprint maps MiroFish into a source-independent implementation packet for the selected canvas/webapp workbench flow: uploaded seed material, graph memory construction, simulation environment preparation, dual-platform simulation, report-agent generation, and deep interaction with simulated agents.

This package is `PROOF_REQUIRED`. The glance describes the target product, not a claim that it is built.

## Product brief

- Product: MiroFish canvas simulation workbench
- Primary outcome: Users turn uploaded seed material and a prediction prompt into a graph-backed simulation, generated report, and interactive post-report agent console.
- Primary users: analysts and builders exploring prediction/simulation workflows from source documents.
- Main surfaces: browser workbench, graph canvas, simulation runtime, report timeline, agent interaction console, provider adapters, persistence, export/download surfaces.
- What this packet must not become: a generic dashboard, static graph demo, raw JSON list, local-only MVP shell, dead-control prototype, or source-code clone.

## Read Order

1. BUILDPRINT.md
2. blueprint.yaml
3. 01-questions.md
4. 02-project-setup.md
5. 03-phases/phase-index.yaml
6. 03-phases/phase-flow.md
7. generated/agent-prompt.md as implementation alignment speech
8. The active phase named in 03-phases/phase-index.yaml
9. 04-evaluation.md
10. 05-evidence/evidence-ledger.jsonl as seed evidence only

Do not start by reading every Markdown file. Use phase-flow and the active phase to continue.

## Final product at a glance

**Golden path:** A user uploads source material and a prediction requirement, enters a graph canvas workbench, prepares a simulation environment, runs a dual-platform simulation, generates a report timeline, and then interrogates the report/simulated agents through a deep interaction console.

**Surfaces**

- upload_prompt_intake — user uploads seed documents and writes the prediction requirement — Phase 1
- graph_canvas_workbench — user inspects graph build progress and graph canvas state — Phase 1
- env_setup_profiles_config — user prepares simulation profiles and configuration — Phase 2
- dual_platform_simulation_runtime — user runs and observes the simulation runtime — Phase 3
- report_agent_timeline — user generates, reviews, and downloads report artifacts — Phase 4
- deep_interaction_console — user chats with report/simulated agents and inspects answers — Phase 5
- history_restore — user reopens prior simulations/reports and workflow trail — Phase 5
- provider_persistence_operability — user-visible provider/storage posture distinguishes local artifacts, live provider credentials, runtime processes, destructive actions, and deployment readiness — Setup/All phases
- final_critical_review_handover — implementation is adversarially reviewed, anti-slop checked, locally repaired where possible, and summarized in `.buildprint/handover.md` — Phase 6

**Done looks like:**

- Seed upload, graph build, simulation, report, and interaction surfaces are real browser/API/runtime paths, not static cards.
- Saved projects, graph/report artifacts, and interaction history reload after restart.
- Missing live provider credentials show honest blocked-provider states after adapters/config/tests exist.
- Final review can click visible controls, reload surfaces, inspect artifacts, and find no unresolved placeholders, dead controls, canned outputs, generic dashboard leakage, or unrecorded blockers.

## Product Engineering Lead contract

You are the Product Engineering Lead for this implementation run. This is an accountability contract, not a persona. Your job is to preserve the product intent, coordinate phase work, challenge shallow implementation, require evidence before claims, and escalate blockers. Do not use role language as proof. If phases need revision, split, merge, or blocking, record that explicitly in the phase preflight before coding.

## Implementation loop

Every phase must repeat this loop until the proof gate passes or a real blocker is recorded:

1. Observe: inspect existing project files, nearest `AGENTS.md`, current behavior, and constraints.
2. Plan: create `.buildprint/phase-runs/PHASE_ID/phase-preflight.yaml` and `.buildprint/phase-runs/PHASE_ID/plan.md`.
3. Execute: make scoped changes without silently shrinking the mapped product.
4. Verify: run planned test/build/browser/runtime gates and inspect output.
5. Reflect: compare results against the phase proof gate and claim ceilings.
6. Record: write `.buildprint/phase-runs/PHASE_ID/proof.md`, `.buildprint/phase-runs/PHASE_ID/evidence.json`, and append evidence/blocker rows.

Before step 2 for each phase, create `.buildprint/phase-runs/PHASE_ID/phase-preflight.yaml`. It must record the lead decision (`accept`, `revise`, `split`, `merge`, or `block`), user-visible outcomes, affected boundaries, surface ids, criterion ids, proof ids, fake-done risks, verifier commands, claim ceiling, and blockers. A missing preflight blocks `phase_core_passed`.

## Repair routing

If verification fails, route back before editing again: test/build/runtime/UI/proof failure -> current phase file; architecture contradiction -> `02-project-setup.md`; missing human preference -> `01-questions.md`; missing dependency -> required prior phase; external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`.

## Stable Behavior

The source maps a five-step product flow, not a static dashboard. The downstream implementation must preserve the webapp and canvas interaction depth. It may choose its own stack, but it must deliver equivalent browser behavior, provider boundaries, persistence semantics, and runtime proof gates.

## Implementation Freedom

- Stack is not fixed. Use a production-capable webapp stack with a real API, durable storage, worker/runtime process control, and browser-rendered graph canvas.
- Provider choices are free only if they preserve the OpenAI-compatible LLM boundary, graph memory boundary, simulation runtime boundary, and report/interaction semantics.
- Replace in-memory task state with durable job state unless the deployment is explicitly trusted-local and the limitation is visible to users.
- Do not copy MiroFish internals, names of private objects, or source file structure unless they are part of the externally observable product contract.

## Downstream Agent Contract

- Root AGENTS.md in the downstream implementation repo is a scope governor, not the product brain.
- .buildprint/next-agent.md is continuity for fresh sessions.
- This BUILDPRINT.md embeds the product dream; 02-project-setup.md turns it into architecture, state, provider, and UI/DX requirements.
- Phase-flow authority is explicit and must be followed before writing runtime evidence.
- The active phase is the only implementation entry point after setup.

## Completion semantics

- `PROOF_REQUIRED`, `checkpoint_recorded`, `phase_core_passed`, and `bounded-proof` describe bounded packet proof, not production-product completion.
- Review prose, summaries, screenshots, or status notes are permission to record evidence, never evidence themselves.
- Every `pass` or `pass-with-scoped-debt` verdict must point to rerunnable command output or an existing artifact path under `.buildprint/phase-runs/PHASE_ID/`.
- `phase_core_passed` does not qualify live provider, deployment, worker, security, visual, or lifecycle claims unless matching claim-upgrade evidence exists.


## Final critical reviewer

Phase 06 is the explicit final critical review and handover phase. After the final feature phase passes its continuation gate — or when the run stops with honest blockers on remaining phases — switch modes before handover: become a harsh reviewer instead of the optimistic implementer.

Assume the product is trying to fool you. Inspect source, run the runnable verification commands from `02-project-setup.md`, and use browser/e2e or screenshots to exercise the real surface. Click every visible control. Try empty, loading, error, blocked, and reload states. Look for placeholder copy, TODO/FIXME-visible behavior, raw ids, debug/proof vocabulary, generic dashboard/form/list leakage, canned output, mock-only paths, dead buttons, fake controls, missing persistence, and the absence of the obvious next user action.

Run an anti-slop pass after tests/lint/build, following the spirit of `https://huecki.com/en/blog/ai-slop-gate-after-tests-and-lint/`: search for AI-generated residue that normal tests miss — swallowed errors, TODO stubs, dead code, hallucinated imports, fake/narrative comments, pointless casts, duplicated helpers, oversized functions, mock-only branches promoted to product paths, and cleanup prompts accidentally left in source. Use `npx aislop scan --changes` or an equivalent deterministic source scan when it fits the stack; otherwise do the same review manually and record what was checked.

Fix local issues before handover. Only leave work unfixed when it is genuinely blocked, credentialed, destructive, expensive, or too large for this run, and name the reason plainly.

## Handover

After the final critical reviewer pass is complete — or when the run stops with honest blockers on remaining phases — write `.buildprint/handover.md`. This is a runtime artifact for the human developer, not a packet file. Do not restate packet prose. Compare the actual built state against `## Final product at a glance`, the final reviewer findings, and `## Completion semantics`.

In `.buildprint/handover.md`, use these six `##` section headings:

## 1. Current status
One short paragraph: current run status from `.buildprint/state.json`, phase states from `03-phases/phase-index.yaml`, what the evidence ledger shows, and whether the final reviewer found unresolved required repairs. State clearly whether the run reached `complete-bounded-proof`, stopped on blockers, or is incomplete. Bounded proof is not production completion.

## 2. Built surfaces
A table or bullets for every surface in `## Final product at a glance`: built / partial / blocked / not started, with exact command/artifact evidence or blocker reason.

## 3. Verification run
Commands run, pass/fail status, artifact paths, screenshots/browser reports, and anti-slop review output.

## 4. Known blockers and risks
Credential, provider, security, persistence, runtime, UX, deployment, or scope blockers. Include exact owner phase and next repair route.

## 5. Changed files / important artifacts
Implementation files, `.buildprint/phase-runs/*`, evidence ledger, final review artifact, handover artifact, and user-visible outputs.

## 6. Next atomic actions
Numbered list of concrete next steps a human can take without rereading the packet. Include live credential setup, deployment approval, security review, or fixing named blockers when applicable.
