# Phase 01 - Cinematic Storyboard Workbench

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this current phase through `03-phases/phase-flow.md`: declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`, implement the first real vertical storyboard path inside the scaffold, verify, write `.buildprint/phase-runs/<phase-id>/proof.md`, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: product outcome flow with shared proof spine.
- Glance surfaces delivered: Cinematic storyboard workbench.
- Product implementation rule: preserve source-backed outcome flows through UI/API/domain/provider/persistence boundaries without copying source implementation code.

## Product outcome

The user opens an episode and immediately sees a cinematic storyboard workbench: ordered shot frames, selected-frame inspector, real canvas flow, dependency nodes/edges, zoom, pan, drag, layout controls, empty/loading/error states, and a right chat shell that coexists with the board. This phase proves the first visible product experience, not persistence or live media.

## Mapped product obligations

- Source path `Toonflow-web/src/views/production/index.vue` mapped a production canvas board as the primary browser surface.
- Source path `Toonflow-web/src/views/production/utils/flowBuilder.ts` mapped the script, plan, assets, storyboard table, storyboard, and workbench topology.
- `02-project-setup.md` upgrades the target into a storyboard-first workbench with shot frames, inspector state, and visual_quality_gate screenshot critique.

## Behavior compatibility contract

- production-canvas-flow: preserve. Equivalent target behavior: real graph nodes/edges, zoom, pan, drag, layout, and stable positions. Compatibility impact: not route/function parity; implementation may use any proven graph/canvas library.
- storyboard-frame-review: replace. Equivalent target behavior: source storyboard panel becomes ordered shot strip/grid plus selected-frame inspector with shot number, scene/beat, prompt, notes, status, linked assets/characters, media state, and continuity tags.
- chat-shell-placeholder: defer. Equivalent target behavior: connected right panel exists, but agent behavior is owned by Phase 03.
- live-provider-media: defer. Equivalent target behavior: preview containers and blocked/pending states exist, but live provider proof is owned by Phase 04.

## Implementation scope

Define FlowData and topology for prose/script, scriptPlan, assets, storyboardTable, storyboard frames, and workbench. Render the storyboard-first workbench with fixture data only, build stable frame preview containers, add selected-frame inspector, implement graph controls, drag/layout behavior, narrow viewport usability, and visible empty/loading/error states.

## Interfaces touched

- Browser route or view for production workbench.
- Graph/canvas component API.
- FlowData client model with prose/script, scriptPlan, assets, storyboardTable, storyboard frames and workbench.
- Episode selection input may be stubbed with fixture data until Phase 2.

## State/runtime touched

This phase may use fixture FlowData in browser memory only for UI proof. It must not claim persistence. The graph state must support stable node positions during drag and layout.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. The first viewport must immediately read as a storyboard production tool with visible shot frames, ordered sequence, selected-frame detail and canvas flow. Storyboard previews must use stable aspect-ratio containers. Canvas controls must not overlap chat or episode selection.

## Safety/security constraints

No provider calls, destructive actions or secret inputs in this phase. Fixture data must not include real credentials.

## Quality gates

- Topology unit test for required node IDs and edges.
- Browser interaction test for render, zoom, pan, drag, layout and selected-frame inspection.
- Desktop and narrow screenshots with Screenshot critique.
- No static graph image, card-only board, generic dashboard, default-control shell, or local MVP visual fallback.

## Proof gate

Additional production proof tracks:
- visual_quality_gate

Proof id: proof-01-canvas-workbench
Required proof types:
- unit_or_integration_test
- browser_runtime_trace
- repeatable_browser_e2e
- visual_quality_gate
- no_fake_scan_pass
- evidence_ledger_entry

Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, media, worker/runtime, browser, storyboard, and deployment paths.

Required runtime evidence row must use `phase_id: 01-canvas-workbench` for the current phase and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
