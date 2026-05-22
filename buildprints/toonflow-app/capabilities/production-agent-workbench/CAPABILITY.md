# Production Agent Workbench

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Owned source surfaces

- sockets.productionAgent.*
- agents.productionAgent.*
- skills.production.*
- routes.production.getFlowData
- routes.production.saveFlowData
- tables.o_agentWorkData
- tables.o_assets
- tables.o_storyboard

## Product obligations

- Preserve production-agent orchestration, skill-conditioned planning, storyboard/asset generation tools, socket streaming, stop/error branches, and workbench state updates.

## Agent Brief

Goal: Authenticated users use a production agent to derive assets, generate asset images, plan direction, build storyboard tables/panels, generate storyboard images, and run supervision using art/story/production skills.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Production socket namespace, agent sub-agent orchestration, skill loader, flow workspace event bridge, asset/storyboard APIs, memory.
Stable behavior: Skill-conditioned production planning and storyboard creation.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Socket + flow integration test with sandbox text provider
Required evidence: artifacts/production-agent.trace; BLOCKED_WITH_REASON: no socket/browser/provider proof.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs browser canvas proof, socket stream proof, and skill activation evidence.

## Behavior Contract

- User/system action: Authenticated users use a production agent to derive assets, generate asset images, plan direction, build storyboard tables/panels, generate storyboard images, and run supervision using art/story/production skills.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: o_agentWorkData, o_assets, o_storyboard, memories.
- Failure/empty/loading/blocked states: Missing project, missing model, missing skill files, provider errors, abort.
- Provider/persistence/runtime/operational boundary: productionAgent model family plus image/video providers as downstream actions.

## Stable vs Free

| Stable | Free |
|---|---|
| Authenticated users use a production agent to derive assets, generate asset images, plan direction, build storyboard tables/panels, generate storyboard images, and run supervision using art/story/production skills. | Implementation framework/component/database abstraction. |
| Missing project, missing model, missing skill files, provider errors, abort. | Exact internal error class names. |
| Socket + flow integration test with sandbox text provider | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/socket/routes/productionAgent.ts:49-99; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/agents/productionAgent/index.ts:43-95,196-374,377-488; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/agents/productionAgent/tools.ts:70-210

