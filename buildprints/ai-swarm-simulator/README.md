# MiroFish Social Simulation Studio

A Mapper OS v3 phase-driven executable packet for building a MiroFish-inspired social simulation studio. The artifact starts trusted-local, then hardens toward real provider, runtime, persistence, publishing/export, and production boundaries.

The product thesis is not a generic AI operations dashboard. It is a simulation/content engine: seed material goes in, a source-grounded ontology/graph is created, graph entities become configured agents, agents act inside Twitter/Reddit-style environments, and the user gets a readable feed, grounded story/report, and postable simulation artifact.

The output quality bar is now explicit: the generated map, feed, report, and story must be scenario-specific enough to teach the user something. A future implementation should show source-derived ontology, graph facts, entity-to-agent mapping, actor motives, risks, influence paths, differentiated social posts, Reddit-style disagreement, action logs, timeline shifts, run insights, report provenance, and a concrete publishing brief. A polished shell with repetitive template posts is not enough.

Mapper OS remap comparison note: the current novice-first Start/Map/Run/Feed/Story/Projects wrapper is useful as a regression oracle, but the original Microfish source carries a stricter pipeline: upload and prediction requirement -> ontology generation -> Zep-style GraphRAG -> OASIS-compatible profile/config generation -> dual-platform action logs -> ReportAgent-style grounded prediction report -> deep interaction. Implementations should preserve that source-fidelity contract while keeping the friendlier product wrapper.

Start with `BUILDPRINT.md`, answer only the true hard stops in `00-questions.md`, complete `01-project-setup.md`, make the UI/UX decisions in `02-uiux-decision.md`, then follow the active phase loop in `03-phases/phase-flow.md`.

The packet intentionally does not ship `slices/`, `gates/`, `generated/`, team capsules, or runner files. The work is organized as comprehensive product phases.

The first five phases build and verify the trusted-local product loop. Later phases are mandatory if the artifact is expected to be production quality:

- plain-language novice UX and actionable blocked states
- social simulation feed with agent posts, reactions, reposts, comments, and timeline events
- postable story/thread export built from the simulation, clearly separated from real X/Twitter posting
- source-fidelity checks for upload/ontology/graph/entity-agent/action-log/report provenance
- backend provider probe and server-side secret boundary
- durable project persistence
- real deterministic simulation runtime
- provider-backed runtime and report generation
- external graph memory adapter
- UX stress, accessibility, and large graph handling
- deployment, auth, privacy, observability, and operations
