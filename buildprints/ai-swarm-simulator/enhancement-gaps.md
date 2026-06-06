# Buildprint Enhancement Gaps

The Buildprint must not stop at a trusted-local prototype if the requested outcome is a production-quality MiroFish social simulation studio. These gaps define the missing tracks that later phases must close with proof gates.

## Gap 01 — Product contract

Missing:
- target user and primary job-to-be-done are not sharp enough
- success criteria for a good simulation or useful report are not explicit enough
- MVP, beta, and production boundaries are not separated

Enhance with:
- named user roles and top workflows for simulation creators, social analysts, and narrative/content operators
- acceptance criteria for graph quality, simulation quality, and report usefulness
- clear non-goals so agents do not overbuild or fake completion

## Gap 02 — Novice product UX and plain-language flow

Missing:
- the first screen is too easy to read as a technical demo
- technical terms appear before the user has earned them
- panels compete for attention instead of guiding a simple workflow
- the app can collapse into one giant dashboard where graph, run log, report, project history, and technical status all compete
- examples are not strong enough as the default learning path
- examples do not yet teach the MiroFish social-simulation loop: seed -> world -> feed -> story/export
- blocked states can sound like implementation status instead of user-facing next steps

Enhance with:
- multi-view task navigation: Start, Map, Run, Feed, Story, Projects
- example-first onboarding with at least three realistic built-in social simulation scenarios
- beginner workflow labels: start, see the social world, run the simulation, read the feed, export the story, continue
- top-level readiness banner that answers whether a real social simulation can run, why not, and what to do next
- progressive disclosure for graph memory, provider, runtime, readback, trace, local report, social platform adapter, and storage detail
- browser checks proving task navigation, example flow, beginner copy, and actionable blocked guidance are visible on desktop and mobile

## Gap 02a — Social feed and postable simulation output

Missing:
- the product can show graphs and reports without showing the simulated internet that makes MiroFish distinctive
- Twitter/Reddit-style activity can remain hidden in logs instead of becoming the primary product surface
- reports can be useful internally but not shaped into shareable posts, threads, or artifacts
- real X/Twitter posting is not separated cleanly from simulated feed export
- the feed can technically be derived from a seed while still reading like one repeated sentence template
- graph nodes can exist without explaining actor motives, risks, influence paths, or the public fault line
- story/export can summarize the run without giving a useful publishing brief

Enhance with:
- a Feed view that renders simulated posts, replies, reactions, reposts, comments, and timeline events from the active run
- agent cards with stance, motive, risk, channel, memory/context, influence, recent actions, and interview affordance
- a Map view that shows named actors, relationship labels, influence weights, active tensions, dominant fault line, and publishing angle
- differentiated post types instead of one repeated content template
- run insights that identify dominant fault line, highest-leverage actor, and best publishing move
- a Story view that turns simulation output into a postable thread, short report, and image/text export
- a Story publishing brief with lead, proof to include, provenance, limitations, and do-not-claim boundaries
- explicit labels: simulated feed, draft thread, export/share, real posting unavailable unless configured
- proof that feed/story output is derived from the active run, not static canned content
- proof that a critical user can explain what changed in the world, which actor mattered, why the feed moved, and what to publish next

## Gap 02b — Source-fidelity loss during Mapper OS remapping

Missing:
- the friendlier Start/Map/Run/Feed/Story/Projects wrapper can accidentally flatten the original Microfish pipeline into a local social-post generator
- uploaded seed documents and explicit prediction requirements can become example scenarios only, losing file ingestion and requirement grounding
- ontology generation and Zep-style GraphRAG can be reduced to a decorative graph
- entity-to-agent profile/config generation can be reduced to actor cards with no source uuid, entity type, persona, stance, activity, influence, or platform settings
- OASIS action-log semantics can be reduced to a feed with no round, platform, action type, args, result, or success trail
- ReportAgent provenance and deep interaction can be reduced to a postable story with no graph/feed/action evidence

Enhance with:
- a source-fidelity contract in `blueprint.yaml` that preserves upload -> ontology -> graph -> entity-agent config -> simulation action logs -> report -> interaction
- graph proof that shows which source facts became entity types, relation types, nodes, edges, facts, and relationship chains
- environment setup proof that shows which graph entities became agents and why
- action-log proof using platform, round, timestamp, agent identity, action type, action args, result, and success
- report proof that marks which claims come from graph facts, feed/action logs, and provider/tool calls
- blocked-state proof for missing LLM, Zep, OASIS, ReportAgent, public posting, auth, privacy, and deployment

## Gap 03 — Server boundary and secrets

Missing:
- no backend service boundary is guaranteed
- secrets can be accidentally modeled as frontend config
- no live provider probe, rate-limit model, or error lifecycle is required

Enhance with:
- local API service phase
- secret loading outside browser bundles
- provider health probe endpoint
- visible provider states: missing, probing, healthy, failed, rate-limited
- tests proving secrets are not exposed to the frontend build

## Gap 04 — Real simulation runtime

Missing:
- no executable multi-agent run loop is required before early handover
- start/stop/cancel can remain UI-only without later hardening
- trace/result lifecycle is not strongly tied to runtime output
- local runtime does not yet require social actions such as posts, replies, comments, likes, reposts, follows, or stance shifts

Enhance with:
- runtime service phase with run ids, run state, cancellation, retries, and trace streaming
- deterministic local runtime before provider-backed runtime
- proof that traces and reports come from runtime output, not static derivation
- proof that the simulated social feed and story/export come from the same run state

## Gap 05 — Graph memory adapter

Missing:
- browser-local persistence can masquerade as graph memory
- Graphiti or external graph memory integration is not proven
- schema migration, dedupe, import/export, and graph quality checks are not required

Enhance with:
- adapter interface contract tests
- local file or SQLite adapter before external adapter
- optional Graphiti adapter behind config
- graph import/export, clear/delete, and migration behavior

## Gap 06 — Durable persistence

Missing:
- graph/report history can be tied to browser profile state
- no project/session model is required
- backup, export, delete, and retention semantics are absent

Enhance with:
- persistent project store
- saved sessions with graph, runs, reports, source material, and timestamps
- export/delete semantics
- reload and cross-browser proof

## Gap 07 — UX stress, accessibility, and large graph handling

Missing:
- no proof the product survives novice use, mobile constraints, keyboard access, or large graphs
- no required empty/error/loading stress cases beyond prototype states
- no proof the UI avoids the all-panels-at-once cockpit failure mode under 100-500 node stress

Enhance with:
- setup/status panel for provider/runtime/memory adapters
- error states for provider failure, runtime failure, graph extraction failure, and storage failure
- keyboard/focus checks
- graph scaling behavior for 25, 100, and 500 nodes
- focused large-graph navigation with overview, selected item, list/search/filter or equivalent, and a way back to run/report context

## Gap 08 — Quality, evals, and trust

Missing:
- no evaluation suite for graph extraction quality
- no simulation/report correctness corpus
- no provenance/confidence model beyond source fragments

Enhance with:
- seed corpus with expected graph patterns
- report and simulation snapshot tests
- provenance display with confidence/limitations
- hallucination guardrails and unknown handling

## Gap 09 — Observability and operations

Missing:
- no structured logs, metrics, audit log, cost tracking, deployment target, auth, or privacy proof

Enhance with:
- logs for provider calls, runtime events, graph writes, report generation, and failures
- local audit trail with redaction
- token/cost estimates where provider-backed
- deployment phase with auth, HTTPS, privacy, and backup checks

## Recommended hardening order

1. Phase 06 — Novice Product UX and Plain-Language Flow
2. Phase 07 — Backend Provider Probe and Secret Boundary
3. Phase 08 — Durable Project Persistence
4. Phase 09 — Real Deterministic Simulation Runtime
5. Phase 10 — Provider-Backed Runtime, Feed, Stories, and Reports
6. Phase 11 — External Graph Memory Adapter
7. Phase 12 — UX Stress, Accessibility, and Large Graph Handling
8. Phase 13 — Production Deployment, Auth, Privacy, and Observability
