# Patchnote — Production Hardening and Novice UX Buildprint Update

Date: 2026-06-05

This patch updates the source Buildprint at `buildprints/ai-swarm-simulator` so the packet no longer stops at a trusted-local prototype. It now includes explicit enhancement gaps, novice-first UX requirements, and production-hardening phases.

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
- server-side provider and secret boundary
- durable persistence
- real deterministic runtime
- provider-backed runtime and reports
- external graph memory adapter
- accessibility, stress, and large-graph UX
- deployment, auth, privacy, observability, and operations

## Files Patched

### `README.md`

Changed the Buildprint description from a trusted-local workbench only into a packet that starts trusted-local and then hardens toward production quality.

Added a plain list of the later mandatory production tracks so a future agent does not mistake Phase 05 for final product completion.

### `BUILDPRINT.md`

Added a direct rule that confusing novice UX is a product failure.

The Buildprint now says a phase is incomplete if a first-time user cannot tell:

- what to do first
- what the app understood
- whether a real swarm can run
- why it cannot run
- what to do next

Also added `enhancement-gaps.md` to the required read order.

### `00-questions.md`

Added a new hard-stop question for audience and language level.

Default assumption is now: build for a non-technical first-time user, then reveal technical details progressively.

Also added the default visible workflow language:

- add scenario
- see what the system understood
- check readiness
- read the report
- continue

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
- `Report`
- `Projects`

It also requires example-first onboarding with at least three built-in scenarios:

- Improve a product launch plan
- Find risks in a hiring process
- Coordinate a support incident

Added the novice workflow contract:

1. Start
2. Map
3. Run
4. Report
5. Projects

Added required terminology mapping:

- `Graph memory` -> `What the swarm remembers`
- `Provider missing` -> `AI service not connected`
- `Runtime blocked` -> `Real simulation unavailable`
- `Readback state` -> `Saved locally`
- `Trace` -> `Step log`
- `Local report` -> `Draft report`
- `Blocked` -> `Needs setup`

Changed status examples from technical labels to user-facing labels.

Added browser-proof requirement for beginner copy and actionable blocked-state guidance.

### `blueprint.yaml`

Added machine-readable product defaults:

- `primary_audience_default: non-technical first-time user`
- `novice_workflow: start -> map -> run -> report -> projects`
- `required_views: Start, Map, Run, Report, Projects`
- `required_example_scenarios`

Added `enhancement-gaps.md` to `required_files`.

Added production quality gates:

- `server_secret_boundary`
- `provider_probe`
- `real_runtime`
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

- the multi-view structure: Start, Map, Run, Report, Projects
- three built-in realistic examples
- an example path that works without typing
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

Requires run ids, agent roles derived from graph context, state machine, trace events, cancellation or explicit non-support, deterministic tests, and report-ready output.

### `03-phases/10-provider-backed-runtime-and-reports.md`

Adds optional provider-backed runs and reports.

Requires backend-only provider calls, provenance, limitations, token/cost metadata where available, provider failure handling, and no fake provider success.

### `03-phases/11-external-graph-memory-adapter.md`

Adds external graph memory adapter phase.

Requires adapter contract tests, local fallback, optional Graphiti/external adapter, import/export, clear/delete, migration/schema behavior, and honest unavailable states.

### `03-phases/12-ux-stress-accessibility-and-large-graph.md`

Adds production UX stress phase.

Requires mobile/tablet/desktop checks, keyboard/focus checks, contrast/reduced-motion checks, empty/loading/error/blocked states, and graph scaling proof for 25, 100, and 500 nodes.

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

## Current State

The Buildprint is patched locally in:

```txt
/root/agent-buildprint/buildprints/ai-swarm-simulator
```

The changes have not been pushed to GitHub yet.
