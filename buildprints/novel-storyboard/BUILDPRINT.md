# MiroFish Canvas Webapp Workbench Buildprint

This Buildprint maps MiroFish into a source-independent implementation packet for the complete canvas/webapp workbench flow: uploaded seed material, graph memory construction, simulation environment preparation, dual-platform simulation, report-agent generation, and deep interaction with simulated agents.

Qualification label: PROOF_REQUIRED

## Read Order

1. BUILDPRINT.md
2. blueprint.yaml
3. 01-questions.md
4. 02-project-setup.md
5. 03-phases/phase-index.yaml
6. 03-phases/phase-flow.md
7. The active phase named in 03-phases/phase-index.yaml
8. 04-evaluation.md

Do not start by reading every Markdown file. Use phase-flow and the active phase to continue.

## Final Product At A Glance

- upload_prompt_intake: A public or trusted-local webapp home screen where users upload seed documents and write a prediction requirement before entering the workbench.
- graph_canvas_workbench: A browser workbench with graph/split/workbench layout modes, a D3-style interactive graph canvas, live graph polling, node/edge detail inspection, legends, empty/loading/error states, and visible step progress.
- env_setup_profiles_config: A simulation setup experience that converts graph entities into agent profiles, generates simulation configuration, exposes preparation progress, and lets users set bounded run options such as max rounds.
- dual_platform_simulation_runtime: A controlled runtime that starts/stops a dual-platform social simulation, records platform action streams, updates graph memory when enabled, and exposes status, timeline, posts, comments, and recovery/close controls.
- report_agent_timeline: A report agent experience that turns simulation output and graph memory into a prediction report, streams agent/tool/console logs, shows section progress, and supports report retrieval/download.
- deep_interaction_console: A post-report interaction surface where users can chat with the report agent, select simulated agents, run surveys/interviews, and inspect answers tied to the running or preserved simulation environment.
- history_restore: A history/database surface that lets users reopen prior simulations and reports without losing the workflow trail.
- provider_persistence_operability: A provider and storage posture that distinguishes local durable artifacts from live provider credentials, runtime processes, task queues, destructive actions, and deployment readiness.

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
