# BUILDPRINT: Portable AI Swarm Simulation Workbench

Qualification label: `SELECTED_UNQUALIFIED`

This Buildprint is a source-independent implementation contract for recreating an AI swarm simulation workbench inspired by the selected MiroFish product workflow. It does not claim source-code parity, production readiness, or validated end-to-end behavior.

## Read Order

1. `BUILDPRINT.md`
2. `CURRENT_STATE.md`
3. `EXECUTION_PROTOCOL.md`
4. `PRE_IMPLEMENTATION_QUESTIONS.md`
5. `TEAM_STACK.md`
6. `CONTEXT_PACKET.json`
7. Only the active capability pack named by `CURRENT_STATE.md` / `CONTEXT_PACKET.json`

Do not read every Markdown file before coding. `CURRENT_STATE.md` is the human-readable router, `CONTEXT_PACKET.json` is the machine-readable active-context router, and `TEAM_STACK.md` is the quality gate router. `CAPABILITY_INDEX.md` is the dependency and continuation index; consult it after proof to choose the next dependency-ready pack.

## Scope

- Source input: `https://github.com/666ghj/MiroFish`
- Source checkout: temporary read-only clone
- Source commit: `fa0f6519b10c4a25b78f1bcc1f00dfcd8bf1ab41`
- Generated at: 2026-05-21
- Output mode: full-suite selected extraction
- Included capabilities: document ingestion and ontology, Zep-style graph builder, simulation setup, simulation runtime monitoring, report/interaction workbench, durable history/data lifecycle.
- Excluded capabilities: exact source UI styling parity, Shanda/brand asset rights, live hosted demo parity, exact OASIS internals, exact Zep Cloud API compatibility beyond adapter contracts, social-platform production deployment.
- Blocked capabilities: live LLM/Zep/OASIS proof until sandbox credentials and provider endpoints are supplied.

## Implementation Freedom

- Stable: product workflow, state transitions, API contracts, graph/simulation/report domain boundaries, provider adapter behavior, UI state inventory, proof gates.
- Free: framework choice, component library, database choice, queue/runtime implementation, provider SDK choice, visual language as long as `UX_CONTRACT.md` and `DESIGN_QUALITY_BAR.md` pass.

## Qualification Boundary

Do not use validated, production-ready, complete, or end-to-end language unless the label is promoted to `QUALIFIED_SOURCE_INDEPENDENT` and evidence is linked.

## Package Shape Rule

This is a full-suite selected output. It is invalid without `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, and complete sibling files in every `capabilities/<id>/` pack.
