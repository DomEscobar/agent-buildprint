# SPEC

## Purpose

Rebuild the observed Toonflow App product surface from source-independent contracts produced by Mapper OS. This Buildprint is a full-suite selected extraction from `https://github.com/HBAI-Ltd/Toonflow-app` at commit `122d2aa431d3240fea3eab491e6fbc690bb088cb`.

## Scope

The selected scope is the capability surface listed in `CAPABILITY_INDEX.md` and the per-capability packs under `capabilities/*/`:

- local login, token gate, and API shell;
- project setup and model selection;
- novel ingestion and event extraction;
- script agent workspace;
- script asset extraction;
- image generation assets and storyboards;
- video generation workbench;
- production agent workbench;
- asset library and media uploads;
- storyboard flow persistence;
- vendor/provider system;
- skills/prompt management;
- agent memory/RAG;
- database backup/admin;
- Electron/Docker deployment.

## Qualification Status

`SELECTED_UNQUALIFIED`. The Buildprint preserves source-backed product obligations and verification requirements, but it does not prove implementation completion.

## Implementation Requirements

- Preserve scope unless Dom explicitly excludes a capability.
- Resolve or safely default `PRE_IMPLEMENTATION_QUESTIONS.md` before coding.
- Use separated UI/API/domain/provider/persistence/runtime/security/test topology for broad surfaces.
- Implement browser/Electron-visible UX states, not just static labels.
- Treat provider/runtime/persistence/security proof gaps as blockers, not omissions.
- Keep secret values out of artifacts; env var names only.
- Close proof-ledger rows before promotion.

## Non-Goals

- Do not copy Toonflow source internals unless they are externally observable or qualification-relevant.
- Do not claim parity, production readiness, validation, or end-to-end completion without proof artifacts.
- Do not count mocks, placeholders, no-op controls, static shells, or route-shaped endpoints as product behavior.
