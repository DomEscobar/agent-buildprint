# Patchnote — Production Hardening and Novice UX Buildprint Update

Date: 2026-06-05

This patch updates the source Buildprint at `buildprints/ai-swarm-simulator` so the packet no longer stops at a trusted-local prototype. It now includes explicit enhancement gaps, novice-first UX requirements, and production-hardening phases.

Latest product realignment: after inspecting the original `666ghj/MiroFish` repository, the packet is no longer framed as a generic AI swarm or business-workflow simulator. It is now aligned to the MiroFish/Microfish 666 thesis: seed material -> graph-backed social world -> Twitter/Reddit-style agent simulation -> simulated feed -> story/report -> exportable post/thread artifact.

Latest update: after proof showed the app still defaulting to an overwhelming all-panels-at-once cockpit, the Buildprint now requires example-first onboarding and focused task views.

2026-06-06 output-quality update: after reviewing the fresh MiroFish rerun screenshots, the Buildprint now rejects a subtler failure mode: a polished multi-view shell whose simulated feed still reads like a repeated template. The packet now requires diagnostic social-world maps, differentiated social posts, run insights, and a publishing brief that make the simulation useful rather than merely present.

2026-06-06 Mapper OS remap comparison update: after patching Mapper OS with a central output contract and remapping the original Microfish source, the Buildprint now also rejects source-fidelity loss. The friendly Start/Map/Run/Feed/Story/Projects wrapper remains useful, but future builds must preserve the original pipeline: seed upload and prediction requirement -> ontology/GraphRAG -> entity-to-agent setup -> OASIS-style dual-platform action logs -> ReportAgent-style grounded report -> deep interaction.

## 2026-06-06 Comprehensive Blueprint Patch

### Trigger

A verified rerun at `/tmp/agb-mirofish-social-simulation-rerun` proved the current Buildprint could generate the right views and honest local/provider boundaries, but the first version still had a weak core artifact:

- the feed posts repeated the same sentence shape with different agent names
- the map proved a graph existed but did not explain actor motives, risks, or influence paths
- the story output summarized the run but did not feel like a strong publishing artifact
- the UI repeatedly emphasized blocked provider/posting states, sometimes more than the value of local mode
- mobile feed layout worked technically but became a long wall of similar text

The rerun was patched locally to validate the fix direction before updating this source Buildprint. The durable Buildprint now captures those lessons so future generated apps inherit the stronger product standard.

### Product Standard Added

The Buildprint now requires generated output to answer four questions after one example run:

1. What is the simulated public really arguing about?
2. Which actor has the most leverage, and why?
3. Which posts or comments changed other agents' emphasis or stance?
4. What should the user publish next, with what proof and limitations?

If a future app can only show that seed text flowed into a graph, feed, and report, it is not complete. The output must be specific enough that a critical reviewer can tell the difference between a breaking-news reaction, startup launch, and fictional-world controversy without reading the scenario title.

### Files Patched In This Update

#### `blueprint.yaml`

Added machine-readable `required_simulation_quality`, then extended it with a `source_fidelity_contract` after the Mapper OS remap comparison.

The contract now requires:

- uploaded or selected seed material plus explicit prediction requirement
- source-derived ontology, graph facts, entity-to-agent mapping, simulation config, action logs, report provenance, and interaction context
- social-world maps with named actors, roles, motives, risks, stances, channels, influence, memory/context, relationship labels, edge weights, active tensions, a public fault line, and a publishing angle
- feed output with differentiated post types, author/handle/role/minute/stance/evidence/ask/reaction/reply/repost fields, Reddit-style nested discussion, timeline events, and run insights
- story output with a postable thread, publishing brief, provenance, limitations, do-not-claim boundaries, and explicit separation from real posting

Added production gates:

- `social_output_quality`
- `source_graph_quality`
- `entity_agent_mapping_quality`
- `action_log_quality`
- `report_provenance_quality`

These gates are required before claiming the app simulates an internet reaction usefully or preserves the original Microfish source mechanics.

#### `README.md`

Added the explicit output-quality bar:

- future implementations must show actor motives, risks, influence paths, differentiated posts, Reddit-style disagreement, timeline shifts, run insights, and a concrete publishing brief
- a polished shell with repetitive template posts is not enough

#### `02-uiux-decision.md`

Added `5d. Simulation output quality rules`.

This section defines the human-readable quality standard for:

- Map: diagnostic social world, not decorative graph
- Feed: differentiated platform-native behavior, not repeated post templates
- Story: usable publishing artifact, not report-shaped afterthought

Acceptance test added:

```txt
After one example run, a critical reviewer should be able to say what changed in the social world, which actor mattered most, why the feed escalated or cooled, and what should be published next. If the output merely sounds polished but could fit any scenario, the phase is incomplete.
```

#### `enhancement-gaps.md`

Expanded `Gap 02a — Social feed and postable simulation output`.

New missing gaps recorded:

- technically derived feed output can still read like one repeated sentence template
- graph nodes can exist without explaining motives, risks, influence paths, or the public fault line
- story/export can summarize without giving a useful publishing brief

New enhancement requirements:

- Map view with relationship labels, influence weights, active tensions, dominant fault line, and publishing angle
- differentiated post types
- run insights for dominant fault line, highest-leverage actor, and publishing move
- Story publishing brief with lead, proof to include, provenance, limitations, and do-not-claim boundaries
- proof that a critical user can explain what changed, which actor mattered, why the feed moved, and what to publish next

Added `Gap 02b — Source-fidelity loss during Mapper OS remapping`.

This records the precise gap found by comparing the patched buildprint with a fresh Mapper OS remap:

- the novice wrapper can flatten Microfish into a local social-post generator
- uploaded seed documents and explicit prediction requirements can disappear into example scenarios
- ontology and GraphRAG can become decorative graph output
- entity-to-agent profile/config generation can become actor cards
- OASIS action-log semantics can become a generic feed
- ReportAgent provenance and deep interaction can become a story/export surface only

New proof requirements require source-fact-to-graph, graph-entity-to-agent, action-log, report-provenance, and blocked-capability evidence.

#### `remap-comparison.md`

Added a comparison note explaining what the current buildprint already does well, what the fresh Mapper OS remap recovered from source, which gap was proven, what patch was applied, and which acceptance questions future reruns must answer.

#### `03-phases/06-novice-product-ux.md`

Strengthened the focused-view phase.

Map now must show:

- named actors
- motives
- risks
- stances
- channels
- influence paths
- dominant public fault line
- likely publishing angle

Feed now must show:

- differentiated post types
- run insights
- timeline events from the active run
- platform-native behavior rather than one repeated generated sentence shape

Story now must show:

- publishing brief
- sources/provenance
- limitations
- do-not-claim boundaries

Proof now includes:

- actor labels do not clip
- Feed content is not template-repetitive
- Story includes a publishing brief
- local simulated output is clearly separated from real public posting

#### `03-phases/09-real-deterministic-simulation-runtime.md`

Strengthened the deterministic runtime phase so runtime quality drives UI quality.

Local runs must model agents with:

- role
- motive
- risk
- stance
- preferred channel/surface
- influence
- memory/context

Runtime edges must include:

- labels
- weights
- tensions

Feed output must include differentiated post types and fields for author, handle, role, minute/timestamp, stance, evidence/source, ask/next move, reactions, replies, and reposts.

Story/report input must include:

- dominant fault line
- highest-leverage actor and why
- proof/source gap most likely to calm or escalate the feed
- best publishing move
- explicit limitations and do-not-claim boundaries

Tests must prove different scenarios produce meaningfully different actors, tensions, post types, asks, run insights, and story outputs.

#### `03-phases/10-provider-backed-runtime-and-reports.md`

Strengthened provider-backed behavior so provider generation cannot erase run provenance.

Provider output must enrich or critique the inspected social world:

- actors
- motives
- risks
- channels
- influence paths
- feed events
- Reddit-style disagreement
- timeline shifts
- dominant fault line
- publishing angle

If provider output changes a recommendation, the UI must show what changed and why. Unsupported provider claims must be labeled uncertain or omitted.

#### `03-phases/12-ux-stress-accessibility-and-large-graph.md`

Expanded UX stress beyond layout and graph scale.

The stress pass must inspect:

- graph node labels and relationship labels at desktop/tablet/mobile widths
- long actor names, tensions, seeds, and publishing angles
- feed readability with at least five top-level posts, nested discussion, insights, and timeline events
- mobile feed fatigue
- story usefulness as a publishing artifact
- whether blocked-state warnings crowd out local-mode value

Added required reviewer-style proof note:

- what the app now makes clear
- what still feels generic
- what a user can publish next
- which claims remain unproven

### Local Proof That Informed This Patch

The rerun app was patched before the Buildprint source update to validate the critique:

- agent model gained motives, risks, channels, stances, influence edges, and memory/context
- Map gained highlighted influence paths, fault line, and publishing angle
- Feed gained run insights and differentiated post types
- Story gained a publishing brief and do-not-claim provenance
- mobile/feed layout was checked after screenshots
- graph label clipping was spotted and repaired

Verification on the rerun passed:

```bash
npm run build
npm run lint
npm run screenshots
npm test
```

This source Buildprint patch does not claim provider-backed AI, real X/Twitter or Reddit posting, external Graphiti/Zep memory, production auth/privacy/observability, or full manual accessibility proof. Those remain later-phase claims requiring explicit configuration and evidence.

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
