# Toonflow Canvas Webapp Buildprint

This executable Buildprint maps the selected Toonflow scope into a source-independent implementation contract. `BUILDPRINT.md` is the only start point for downstream coding agents.

## Selected Scope

Build a webapp that preserves Toonflow's strong creative flow and Canvas UI:

- authenticated project workspace;
- model/vendor setup for text, image, video, and optional TTS providers;
- ScriptAgent planning flow for story skeleton, adaptation strategy, and script episodes;
- ProductionAgent infinite canvas workbench for scripts, assets, derived assets, storyboard panels, and video nodes;
- generation queues for images and videos with durable pending/success/failure states;
- video-track assembly, clip selection, and export-ready final-output boundary.

Do not implement this as a generic form app. The product center is a polished, inspectable infinite Canvas workbench with node arrangement, visual asset cards, storyboard sequencing, generation state, and video-track flow.

## Read Order

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `02-project-setup.md`
4. `blueprint.yaml`
5. `03-phases/phase-index.yaml`
6. Active phase file only
7. `03-phases/phase-flow.md`
8. Required `06-contracts/<role>.md` files named by the active phase
9. `04-evaluation.md`

Do not load every phase before starting. `03-phases/phase-index.yaml` identifies the active phase and continuation order.

## Blueprint Classification

- blueprint_mode.primary: product
- phase_style: outcome_flow
- qualification_status: PROOF_REQUIRED
- production posture: public webapp target with auth/provider/persistence hardening required
- evidence policy: packaged `05-evidence/evidence-ledger.jsonl` is seed-only; runtime proof writes go to `.buildprint/evidence/evidence-ledger.jsonl`.

## Stable Product Behaviors

- Toonflow's core flow is planning -> scriptwriting -> storyboarding -> final output.
- The production workbench must feel like an infinite canvas: scripts, characters, storyboards, assets, and video nodes can be organized spatially with backtracking and parallel production.
- Agent collaboration uses decision, execution, and supervision responsibilities, even when implemented through one orchestrator process.
- Model providers are user-configured and may include text, image, video, and TTS models.
- Generation requests produce durable task state and visible failure reasons.
- Media and canvas state survive refresh and server restart.

## Free Implementation Choices

The downstream agent may choose the web stack, persistence engine, queue implementation, and provider SDKs if the choices satisfy `02-project-setup.md`, all active phase contracts, and the proof gates. Defaults should favor a production-grade webapp stack, durable database migrations, object/file media storage, browser e2e tests, and typed provider boundaries.

## Stop Conditions

Stop and repair the current phase before continuing when:

- the Canvas UI degrades into forms, plain tables, raw JSON, or a local-MVP screenshot substitute;
- provider calls are mocked while claimed as live production behavior;
- auth relies on default credentials in public posture;
- persistence is in-memory while durability is claimed;
- runtime evidence is written before phase-flow plan/team-gate/handoff/return/review/proof artifacts exist;
- a phase proof gate fails.

## Next Action

Start with `01-questions.md`, apply AI-best-judgment defaults where permitted, complete the Foundation scaffold gate in `02-project-setup.md`, then implement `03-phases/01-foundation-webapp-shell.md`.
