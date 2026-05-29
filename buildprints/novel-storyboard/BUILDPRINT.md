# BUILDPRINT: Novel Storyboard production workbench

This is the canonical starting point and execution contract for the blueprint. Do not start from generated prompts or secondary files. Your first action must be reading this file; do not inventory, glob, or enumerate packet files before this read order is established.

Claim status: `PROOF_REQUIRED`

## Product brief

- Product: Novel-to-storyboard production workbench for visually planning short-drama or cinematic story episodes.
- Primary outcome: A creator can turn a prose episode into a saved, reviewable, visually compelling storyboard board with script beats, shot frames, character/asset continuity, media generation state and video workbench state that survives reloads.
- Primary users: creators, directors, producers, storyboard artists and operators configuring AI media providers.
- Main surfaces: browser storyboard workbench, cinematic canvas, shot strip/timeline, frame inspector, agent chat, API service, provider adapter, persistence, media artifact storage, deployment/runtime shell.
- What this packet must not become: a desktop-only clone, generic dashboard, local MVP shell, static demo, bare graph, raw text-list, static card board, route inventory, provider fake counted as live media generation, or a source-framework prescription.

## Product experience spine

The implementation must feel like a real storyboard product, not a technically adequate graph demo.

- **First impression:** opening an episode presents an intentional production workspace: cinematic board area, ordered shot strip, readable scene/beat hierarchy, visual frame previews and a restrained tool chrome.
- **Core workflow:** import or edit prose/script beats, convert them into ordered storyboard shots, review each shot as a frame with prompt, image, character/asset references, status and notes, then move selected shots toward video workbench output.
- **Visual grammar:** storyboard frames are first-class objects with aspect-ratio-safe previews, shot number, scene/beat label, status, continuity tags and media state. The graph may show dependency flow, but it must not replace the storyboard strip/grid as the user's visual planning surface.
- **Art direction:** the UI should look like a production-grade creative tool: dense, calm, sharp, tactile and media-forward. Avoid generic SaaS dashboards, oversized marketing hero sections, pastel template cards, empty gradient decoration or a bare technical node graph.
- **Review loop:** creators can see what is ready, blocked, failed, needs revision and selected for video without reading logs. Every blocked provider or failed media state must be visually obvious and recoverable.
- **Production readiness:** success means the product is useful for repeated work: save/reload, restart durability, responsive canvas behavior, authenticated runtime, no fake provider promotion, screenshot-proofed desktop and narrow layouts, and a plausible path from storyboard frame to generated media.

## Final product at a glance

**Golden path** - The user logs in, opens a project episode, sees a real interactive cinematic storyboard workspace, uses the agent chat to shape prose/script beats into ordered shots, reviews frame previews and continuity details, generates or reviews assets and storyboard media, moves selected shots toward video output, saves the board, and later returns to the same state with honest blocked-provider messages when credentials are absent.

**Surfaces**

- Cinematic storyboard workbench - create, inspect and manipulate visual shot flow - Phase 1
- Episode flow state - load, save and restore board data by project and episode - Phase 2
- Agent chat controller - drive board updates through chat, stop and XML events - Phase 3
- Media generation paneling - request, poll, select and fail asset/storyboard/video work - Phase 4
- Webapp runtime shell - run the authenticated browser app with API, socket, static frontend and durable data - Phase 5

**Done looks like**

- The board is an interactive storyboard workbench with shot frames, canvas flow, nodes, edges, zoom, pan, drag, layout, inspector/review states and responsive behavior, not static cards.
- A saved episode reloads with the same prose/script, plan, assets, storyboard order, frame media/status/notes and workbench data after backend restart.
- Agent chat can update board data through streamed/parsed events and can stop or report errors without corrupting state.
- Provider credentials absence produces blocked states and fake-provider tests, not fake success.
- Desktop and narrow screenshots show a visually coherent, production-grade storyboard product with no overlapping controls, not merely a passing technical canvas.

## Required read order

1. Read this `BUILDPRINT.md` first, before listing or opening other packet files.
2. Read `01-questions.md`.
3. Read and complete `02-project-setup.md`.
4. Read `blueprint.yaml` as the machine-readable mirror.
5. Read `03-phases/phase-index.yaml`.
6. Read `03-phases/phase-flow.md`.
7. Read only the current active phase file. For a fresh run, use `active_phase` from `03-phases/phase-index.yaml`; for a targeted or resumed run, use the assignment or `.buildprint` state override after confirming the phase exists in `03-phases/phase-index.yaml`.
8. Read `04-evaluation.md`.
9. Treat `05-evidence/evidence-ledger.jsonl` as the immutable packet seed; append implementation proof or blocker rows only to `.buildprint/evidence/evidence-ledger.jsonl`.

Read these files sequentially. Do not batch, parallelize, or reorder the initial context reads, even when using multi-command tooling.

## Project setup gate

Before coding, answer or default `01-questions.md`, then use `02-project-setup.md` to create the downstream project root/local `AGENTS.md`. The downstream `AGENTS.md` is a scope governor, not a product brain. Missing ordinary preferences should be defaulted with AI best judgment. Missing credentials block only live provider proof.

## Implementation loop

For each phase:

1. Read `03-phases/phase-flow.md`.
2. Read the active phase named in `03-phases/phase-index.yaml`.
3. Implement the smallest complete vertical outcome for that phase.
4. Run the phase proof gate.
5. Record command output or artifact paths in `.buildprint/evidence/evidence-ledger.jsonl`.
6. If proof fails, repair the current phase before advancing.

## Phase discipline

Every phase starts through `03-phases/phase-flow.md`. Do not collapse phase entry into immediate implementation: create `.buildprint/phase-runs/<phase-id>/plan.md`, implement the smallest real vertical path, verify with the phase proof gate, write `.buildprint/phase-runs/<phase-id>/proof.md`, and only then append runtime evidence.

A phase is a proof-gated product slice, not a waterfall task bucket. Each phase must define product outcome, mapped product obligations, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, quality gates, proof gate, and repair routing.

## Completion semantics

Bounded proof is not product completion. A passing phase verdict proves only the named phase gate under the recorded environment, input data and artifacts. Reviews, screenshots, summaries and status notes are not evidence by themselves. Every pass verdict requires rerunnable command output or an existing artifact path. Do not claim `validated`, `complete`, `production-ready` or `end-to-end` unless `04-evaluation.md` promotion gates pass and evidence rows exist for the required proofs.

## Repair routing

- Test, build, runtime, UI or proof failure: return to the current phase.
- Architecture contradiction: return to `02-project-setup.md`.
- Missing human preference: return to `01-questions.md` only if the choice is irreversible, expensive, credentialed, destructive or product-defining.
- Missing dependency phase: run the required prior phase.
- External provider or credential blocker: record the blocker in `.buildprint/evidence/evidence-ledger.jsonl` and continue with fake-provider contract proof where safe.
