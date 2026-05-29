# Generated Agent Prompt

Generated from: blueprint.yaml

This file is compiled orientation only. It is not source of truth. Start from `BUILDPRINT.md`, follow the required read order, and treat `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, the required `06-contracts/<role>.md` files, the active phase file, `04-evaluation.md`, `05-evidence/evidence-ledger.jsonl`, and `05-evidence/evidence-ledger.schema.json` as authoritative.

Selected packet: Personal Agent Chat (`personal-agent-chat`)

Blueprint mode: `product`

Phase style: `outcome_flow`

Primary implementation outcome: build a clean-room self-hosted personal agent chat workbench with deterministic local proof first, durable persistence, streaming chat, provider adapter seams, tool/skill/MCP policy, memory/context/telemetry, bounded team tasks, safety diagnostics, and browser/API workbench proof.

Qualification status: `PROOF_REQUIRED`. The packet contains seed evidence only; implementation proof must be written to `.buildprint/evidence/evidence-ledger.jsonl`.

Before Phase 01, create the real base project structure plus root `AGENTS.md`, `.buildprint/setup.md`, `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md`. Root `AGENTS.md` must list those files as mandatory reads before code edits. `architecture.md` must define the boundary map. `engineering-standards.md` must include clean code rules, validation and schemas, persistence standards, provider standards, worker/runtime standards, UI standards, and test standards with deterministic exits for blocked proof.

Use subagents or delegated workers when available; when unavailable, self-simulate every required role and write the same handoff/return artifacts. Evidence rows must be narrow: do not let static text, broad smoke commands, screenshots, or deterministic providers overclaim live, browser, persistence, security, or production readiness behavior.

Qualification blockers such as missing live credentials, unavailable deployment, or unavailable browser tooling do not automatically block downstream implementation when the phase core path is locally proven and the blocker row is non-upgrading. UI-bearing work must satisfy `visual_quality_gate`; default browser controls, generic dashboards, raw text-list substitutes, and local MVP screens cannot upgrade UX claims.
