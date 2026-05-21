# BUILDPRINT: Toonflow Full-Suite Source-Independent Mapping

Qualification label: `SELECTED_UNQUALIFIED`

This Buildprint preserves the full relevant Toonflow product surface discovered from source. It is a source-independent implementation contract, not proof that a downstream implementation already works.

## Read Order

1. `BUILDPRINT.md`
2. `CAPABILITY_INDEX.md`
3. `CURRENT_STATE.md`
4. `TEAM_STACK.md`
5. `EXECUTION_PROTOCOL.md`
6. `PRE_IMPLEMENTATION_QUESTIONS.md`
7. active capability pack named by `CURRENT_STATE.md`
8. `UX_CONTRACT.md` and `DESIGN_QUALITY_BAR.md` when `TEAM_STACK.md` selects `ux-ui-craft`
9. supporting artifacts only when the active pack or team gate points to them

## Scope

- Source input: https://github.com/HBAI-Ltd/Toonflow-app
- Source checkout: ./source-real
- Source commit: 122d2aa431d3240fea3eab491e6fbc690bb088cb
- Generated at: 2026-05-21T15:42:51.131Z
- Output mode: full-suite selected extraction
- Included capabilities: auth-api-access, project-setup-model-selection, novel-ingestion-event-extraction, script-agent-workspace, script-assets-extraction, asset-library-media-upload, image-generation-assets-storyboards, production-agent-workbench, storyboard-flow-persistence, video-generation-workbench, vendor-provider-system, skills-prompt-management, agent-memory-rag, database-backup-admin, electron-docker-deployment
- Excluded capabilities: none by user decision
- Blocked proof areas: browser/app runtime, provider runtime, persistence restart, destructive admin hardening, clean-room reversal

## Product Summary

Toonflow is a local/desktop AI short-drama and comic production workbench. A rebuild must support project setup, novel import and event extraction, script generation and asset extraction, production agent planning, flow/canvas persistence, role/scene/prop/storyboard image generation, video generation, programmable AI providers, markdown skills, local memory/RAG, backup/import/reset administration, and Electron/Docker runtime packaging.

## Implementation Freedom

- Stable: externally observable workflows, API/socket contracts, persistence semantics, state transitions, failure states, provider contract boundaries, and UI proof obligations.
- Free: internal framework, component structure, exact database library, queue implementation, test harness, styling details, and provider abstraction shape, provided behavior and proof obligations are met.

## Qualification Boundary

Do not use validated, production-ready, complete, or end-to-end language unless the label becomes `QUALIFIED_SOURCE_INDEPENDENT` and evidence is linked in `VERIFICATION.md`.

