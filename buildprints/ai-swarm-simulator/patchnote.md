# Patchnote — Production Hardening and Novice UX Buildprint Update

Date: 2026-06-05

This patch updates the source Buildprint at `buildprints/ai-swarm-simulator` so the packet no longer stops at a trusted-local prototype. It now includes explicit enhancement gaps, novice-first UX requirements, and production-hardening phases.

Latest product realignment: after inspecting the original `666ghj/MiroFish` repository, the packet is no longer framed as a generic AI swarm or business-workflow simulator. It is now aligned to the MiroFish/Microfish 666 thesis: seed material -> graph-backed social world -> Twitter/Reddit-style agent simulation -> simulated feed -> story/report -> exportable post/thread artifact.

Latest update: after proof showed the app still defaulting to an overwhelming all-panels-at-once cockpit, the Buildprint now requires example-first onboarding and focused task views.

## Summary

The original Buildprint had five phases:

1. Foundation and first loop
2. Graph memory canvas
3. Simulation runtime
4. Report and continued interaction
5. Verification and handover

That was enough for a local prototype, but not enough for production quality. This patch adds the missing tracks:

- novice/plain-language UX
- example-first onboarding and multi-view navigation
- MiroFish-style social simulation identity
- Twitter/Reddit-style simulated feed and timeline
- story/thread export as a first-class product surface
- server-side provider and secret boundary
- durable persistence
- real deterministic runtime
- provider-backed runtime and reports
- external graph memory adapter
- accessibility, stress, and large-graph UX
- deployment, auth, privacy, observability, and operations

## Files Patched

## MiroFish/Microfish 666 Realignment

The original MiroFish repository shows a sharper product than the generic Buildprint had captured:

- seed documents or scenarios are uploaded as source material
- graph/entity memory is built from the seed
- personas/agents are generated from that world
- OASIS-style Twitter and Reddit simulations run as social environments
- agent actions include posts, replies/comments, reactions, reposts, follows/mentions, and no-action steps
- reports and interviews are generated after the run

The Buildprint now treats that as the core product loop. The target artifact is a social simulation studio, not merely a graph-backed swarm dashboard.

New default golden path:

```txt
choose seed scenario
-> map the social world
-> run local/provider social simulation
-> inspect simulated posts/feed
-> generate story/report
-> export postable thread/artifact
-> save/continue project
```

New required views:

- `Start`
- `Map`
- `Run`
- `Feed`
- `Story`
- `Projects`

New built-in examples:

- Simulate a breaking-news public reaction
- Simulate a startup launch going viral
- Simulate a fictional-world controversy

New required social surfaces:

- Twitter-style agent feed
- Reddit-style discussion thread
- timeline of agent actions
- postable thread/story export

Important boundary: the packet now explicitly separates simulated feed/export from real public X/Twitter/Reddit posting. Real posting is a hard stop unless explicit user-controlled config, confirmation UX, rate limits, audit logs, abuse controls, and proof are added.

### `README.md`

Changed the Buildprint description from a trusted-local workbench only into a packet that starts trusted-local and then hardens toward production quality.

Added a plain list of the later mandatory production tracks so a future agent does not mistake Phase 05 for final product completion.

### `BUILDPRINT.md`

Added a direct rule that confusing novice UX is a product failure.

The Buildprint now says a phase is incomplete if a first-time user cannot tell:

- what to do first
- what the app understood
- whether a real social simulation can run
- why it cannot run
- what simulated agents posted
- what to export/share next
- what to do next

Also added `enhancement-gaps.md` to the required read order.

Latest MiroFish realignment:

- added an explicit product anchor for MiroFish/Microfish 666
- forbids shrinking the packet back into a graph-only workbench or business-process planner
- changes the novice-success test so the user must understand the social simulation, agent posts, and export/postable output

### `00-questions.md`

Added a new hard-stop question for audience and language level.

Default assumption is now: build for a non-technical first-time user, then reveal technical details progressively.

Also added the default visible workflow language:

- add seed
- see the social world
- run the simulation
- read the feed
- export the story
- continue

Latest MiroFish realignment:

- added a publishing-boundary hard stop
- default is export/share only
- real X/Twitter/Reddit posting requires explicit config, confirmation UX, rate limits, audit logs, abuse controls, and proof

### `01-project-setup.md`

Added a required implementation doc:

- `docs/plain-language-ux.md`

That doc must map technical terms to user-facing labels and define beginner-readable empty/loading/error/blocked copy.

Also requires the plain-language UX glossary before naming visible controls, panels, status chips, blockers, or reports.

### `02-uiux-decision.md`

Patched the UI/UX constitution heavily.

The new rule is: clarity outranks atmosphere.

Latest patch adds that the app must not default to one giant cockpit. It now requires focused task views:

- `Start`
- `Map`
- `Run`
- `Feed`
- `Story`
- `Projects`

It also requires example-first onboarding with at least three built-in scenarios:

- Simulate a breaking-news public reaction
- Simulate a startup launch going viral
- Simulate a fictional-world controversy

Added the novice workflow contract:

1. Start
2. See the social world
3. Run the simulation
4. Read the feed
5. Export the story
6. Continue

Added required terminology mapping:

- `Graph memory` -> `What the social world remembers`
- `Provider missing` -> `AI service not connected`
- `Runtime blocked` -> `Real social simulation unavailable`
- `Readback state` -> `Saved locally`
- `Trace` -> `Step log`
- `Local report` -> `Draft story/report`
- `Blocked` -> `Needs setup`
- `Social feed` -> `Simulated posts`
- `Publishing` -> `Export/share`

Changed status examples from technical labels to user-facing labels.

Added browser-proof requirement for beginner copy and actionable blocked-state guidance.

### `blueprint.yaml`

Added machine-readable product defaults:

- `primary_audience_default: non-technical first-time user`
- `novice_workflow: start -> map -> run -> feed -> story -> projects`
- `required_views: Start, Map, Run, Feed, Story, Projects`
- `required_example_scenarios`
- `required_social_platform_surfaces`

Added `enhancement-gaps.md` to `required_files`.

Added production quality gates:

- `server_secret_boundary`
- `provider_probe`
- `real_runtime`
- `social_feed_truthfulness`
- `post_export`
- `durable_persistence`
- `external_graph_memory`
- `accessibility_large_graph_stress`
- `auth_privacy_observability_deployment`

### `enhancement-gaps.md`

Added a new source-level gap map.

It documents the missing Buildprint tracks:

1. Product contract
2. Novice product UX and plain-language flow
3. Server boundary and secrets
4. Real simulation runtime
5. Graph memory adapter
6. Durable persistence
7. UX stress, accessibility, and large graph handling
8. Quality, evals, and trust
9. Observability and operations

It also records the recommended hardening order from Phase 06 through Phase 13.

Latest patch expands Gap 02 and Gap 07 to call out the exact failure shown in the proof screenshot:

- all major panels shown at once
- technical statuses competing with the beginner path
- weak example-led onboarding
- large graph proof that shows node count but not user comprehension

Latest MiroFish realignment:

- adds `Gap 02a — Social feed and postable simulation output`
- requires a Feed view with simulated posts, replies, reactions, reposts, comments, and timeline events
- requires agent cards with stance, memory/context, influence, recent actions, and interview affordance
- requires a Story view that turns simulation output into a postable thread, short report, and image/text export
- requires proof that feed/story output is derived from the active run, not static canned content

### `03-phases/phase-index.yaml`

Extended the Buildprint phase list from five phases to thirteen phases.

Added:

- `06-novice-product-ux`
- `07-backend-provider-probe-and-secret-boundary`
- `08-durable-project-persistence`
- `09-real-deterministic-simulation-runtime`
- `10-provider-backed-runtime-and-reports`
- `11-external-graph-memory-adapter`
- `12-ux-stress-accessibility-and-large-graph`
- `13-production-deployment-auth-privacy-observability`

### `03-phases/phase-flow.md`

Updated the active phase loop so agents must repair beginner confusion, not only visual or runtime slop.

Expanded proof-theater rejection to include jargon-heavy screens that only developers can decode.

### `03-phases/03-simulation-runtime.md`

Realigned the early runtime seam from a generic swarm run toward MiroFish/OASIS-style social simulation.

The runtime state now needs:

- platform mode
- agent profiles
- simulated feed events
- posts, replies/comments, reactions, reposts, follows/mentions, stance shifts, and no-action steps
- trace/feed/result UI tied to runtime state

### `03-phases/04-report-and-continued-interaction.md`

Renamed the phase intent to story/report and continued interaction.

Reports must now be generated from the current graph, social feed, and simulation state. The phase requires a postable thread/story draft, feed references, graph references, run references, continuation controls, export controls, and honest deterministic/provider-backed labels.

### `03-phases/05-verification-and-handover.md`

Renamed the phase to:

- `Trusted-local verification and handover`

Changed the objective so Phase 05 is no longer treated as final production handover.

It now closes only the trusted-local prototype loop and must route the next agent into Phase 06 unless blocked.

### `HANDOVER.md`

Added UX proof gaps to the `Not proven` section:

- beginner comprehension
- mobile readability
- keyboard access
- screen-reader labels
- large-graph usability

## Files Added

### `03-phases/06-novice-product-ux.md`

Adds the novice UX repair phase.

Requires beginner-readable workflow, top-level readiness banner, progressive technical details, desktop/mobile screenshots, and browser proof that blocked states give actionable next steps.

Latest patch strengthens this phase to require:

- the multi-view structure: Start, Map, Run, Feed, Story, Projects
- three built-in realistic social simulation examples
- an example path that works without typing
- simulated feed inspection after the run
- story/thread export after the feed
- density repair so desktop does not show every major subsystem as equal panels at once
- mobile task navigation instead of one endless stacked technical scroll

### `03-phases/07-backend-provider-probe-and-secret-boundary.md`

Adds backend/service provider boundary.

Requires server-side secret loading, provider probe states, no frontend key leakage, redacted diagnostics, and proof that frontend bundles do not expose secrets.

### `03-phases/08-durable-project-persistence.md`

Adds durable project/session persistence.

Requires saved source material, graph snapshots, runs, reports, continuation prompts, export/delete semantics, and storage failure states.

### `03-phases/09-real-deterministic-simulation-runtime.md`

Adds real local deterministic runtime.

Requires run ids, agent roles derived from graph context, state machine, trace events, cancellation or explicit non-support, deterministic tests, and feed/story/report-ready output.

Latest MiroFish realignment adds a minimum local action vocabulary:

- create_post
- reply/comment
- react/like/dislike
- repost/quote
- follow/mention
- stance_shift
- no_action

### `03-phases/10-provider-backed-runtime-and-reports.md`

Adds optional provider-backed runs, feed enrichment, stories, and reports.

Requires backend-only provider calls, provenance, limitations, token/cost metadata where available, provider failure handling, export/share draft labeling, and no fake provider success.

Also adds an explicit public-posting boundary: do not post to real X/Twitter or any public social platform without explicit user-controlled configuration, confirmation, and proof.

### `03-phases/11-external-graph-memory-adapter.md`

Adds external graph memory adapter phase.

Requires adapter contract tests, local fallback, optional Graphiti/external adapter, import/export, clear/delete, migration/schema behavior, and honest unavailable states.

### `03-phases/12-ux-stress-accessibility-and-large-graph.md`

Adds production UX stress phase.

Requires mobile/tablet/desktop checks, keyboard/focus checks, contrast/reduced-motion checks, empty/loading/error/blocked states, feed/story navigation proof, and graph scaling proof for 25, 100, and 500 nodes.

Latest patch adds an explicit rejection criterion: 500-node proof is not enough if the user cannot navigate the graph, inspect one thing, and return to Run or Report without losing context.

### `03-phases/13-production-deployment-auth-privacy-observability.md`

Adds production boundary phase.

Requires deployment posture, auth, HTTPS/deployment config, secret management, redacted logs, audit trail, privacy/retention controls, backup/export/delete proof, health checks, and abuse/rate limiting for public deployment.

## Verification

Ran:

```bash
npm run check:packet:swarm
```

Result:

```txt
Packet check: PASS (0 failed)
```

Ran:

```bash
npm run check:blueprint-yaml
```

Result: passed.

## Published Source Patch

The source Buildprint patch was committed and pushed to `origin/main`.

Published commit:

```txt
fdd3a68 Require multi-view example-first swarm UX
```

This commit is the source packet used for the fresh rerun, not a local-only draft.

## Fresh Rerun Final Proof Status

A fresh Codex worker reran the pushed Buildprint packet and generated a new app in:

```txt
/tmp/agb-ai-swarm-simulator-rerun-multiview
```

The dev server was left running at:

```txt
http://localhost:5187
```

The rerun now passes the requested example-first "dummy can use it" test for the local/proven scope:

- separate task views: `Start`, `Map`, `Run`, `Report`, `Projects`
- example-first onboarding with no typing required
- built-in examples for product launch, hiring risk, and support incident scenarios
- complete example path: choose example -> Map -> local dry run -> Report -> Projects
- no default all-panels cockpit
- technical provider/memory/runtime details hidden behind progressive disclosure
- local dry-run path when live AI provider is unavailable
- report generated from the mapped example and deterministic local run
- saved local project state with resume/export/delete actions
- 500-item large graph stress view
- honest blocked state for missing live AI provider

Current proof screenshots captured:

```txt
/tmp/agb-ai-swarm-simulator-rerun-multiview/proof/screenshots/empty-blocked-run.png
/tmp/agb-ai-swarm-simulator-rerun-multiview/proof/screenshots/start.png
/tmp/agb-ai-swarm-simulator-rerun-multiview/proof/screenshots/map.png
/tmp/agb-ai-swarm-simulator-rerun-multiview/proof/screenshots/run-before-local.png
/tmp/agb-ai-swarm-simulator-rerun-multiview/proof/screenshots/run-after-local.png
/tmp/agb-ai-swarm-simulator-rerun-multiview/proof/screenshots/report.png
/tmp/agb-ai-swarm-simulator-rerun-multiview/proof/screenshots/projects.png
/tmp/agb-ai-swarm-simulator-rerun-multiview/proof/screenshots/large-graph.png
/tmp/agb-ai-swarm-simulator-rerun-multiview/proof/screenshots/mobile-navigation.png
```

Additional local verification run against the fresh rerun:

```bash
npm run lint
npm run verify
curl http://localhost:5187/api/health
curl http://localhost:5187/api/provider/status
APP_URL=http://localhost:5187 npm run screenshots
```

Result:

```txt
PASS
```

`npm run verify` includes Vitest, TypeScript/Vite build, and frontend secret scan. The provider status proof honestly reports `missing`, so live provider success is not claimed.

Completed/proven locally:

- phases 01-09
- phase 12
- phase 07 for server-side provider boundary and missing-key proof

Still blocked or not proven:

- live AI provider-backed runs and reports
- external Graphiti/Zep graph memory
- production deployment/auth/privacy/observability readiness
- full manual screen-reader audit
- live provider cost/token metadata

## Current State

The Buildprint is patched and published in:

```txt
/root/agent-buildprint/buildprints/ai-swarm-simulator
```

The latest source Buildprint changes are on GitHub `origin/main`. The fresh rerun completed with local proof, while provider-backed, external-memory, and production-readiness claims remain honestly blocked until configured and proven.
