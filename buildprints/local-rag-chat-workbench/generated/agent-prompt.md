# Generated Agent Prompt

Generated from: blueprint.yaml

This file is compiled orientation only. It is not source of truth. Start from `BUILDPRINT.md`, follow the required read order, and treat `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, the required `06-contracts/<role>.md` files, the active phase file, `04-evaluation.md`, `05-evidence/evidence-ledger.jsonl`, and `05-evidence/evidence-ledger.schema.json` as authoritative.

Selected packet: Local RAG Chat Workbench (`local-rag-chat-workbench`)

Blueprint mode: `product`

Phase style: `outcome_flow`

Primary implementation outcome: build a clean-room local-first RAG chat workbench with deterministic local proof first, durable conversation/message/document/chunk/citation/memory/config persistence, Ollama-compatible provider adapter seams, streaming chat, multimodal routing, image input, system prompts, safe tool traces, knowledge-base ingestion/retrieval/citations, memory review/injection, settings/data lifecycle operations, and optional voice sidecar proof gates.

Qualification status: `PROOF_REQUIRED`. The packet contains seed evidence only; implementation proof must be written to `.buildprint/evidence/evidence-ledger.jsonl`.

Before Phase 01, create the real base project structure plus root `AGENTS.md`, `.buildprint/setup.md`, `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md`. Root `AGENTS.md` must list those files as mandatory reads before code edits. `architecture.md` must define the base project structure and Boundary map. `engineering-standards.md` must include clean code rules, validation and schemas, persistence standards, provider standards, worker/runtime standards, UI standards, and test standards with deterministic exits for blocked proof.

Use subagents or delegated workers when available; when unavailable, self-simulate every required role and write the same handoff/return artifacts. Evidence rows must be narrow: do not copy every required proof label into every evidence row, and do not let static text, broad smoke commands, screenshots, deterministic providers, or review prose overclaim live, browser, persistence, security, voice, worker, deployment, or production readiness behavior.

Qualification blockers such as missing live Ollama, unavailable embedding provider, unavailable browser tooling, browser media permission, voice sidecar, Docker, file watcher, deployment, or external web access do not automatically block downstream implementation when the phase core path is locally proven and the blocker row is non-upgrading. Distinguish qualification blockers from continuation blockers: failed core implementation, unsafe input handling, failed persistence owned by the phase, missing foundation scaffold, or unresolved destructive/security ambiguity blocks continuation.

UI-bearing work must satisfy `visual_quality_gate`; default browser controls, generic dashboards, raw text-list substitutes, dead buttons, screenshots-only shells, and local MVP screens cannot upgrade UX claims.
