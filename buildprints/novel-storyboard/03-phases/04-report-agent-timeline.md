# Phase 04 - Report Agent Timeline

## Capability outcome

Deliver report_agent_timeline. A completed or sufficiently advanced simulation can generate a prediction report through a report agent, stream agent/tool/console logs, expose report sections, and support report retrieval/download.

## Phase mode contract

blueprint_mode: integration
phase_style: boundary_transaction_contract
Glance surfaces delivered: report_agent_timeline

This phase uses an integration lens because it coordinates webapp, report worker, LLM provider, graph memory provider, logs, and report storage. It must define webhook/callback or polling semantics, idempotency, sandbox/live split, retry/error mapping, and fake-provider proof limits.

## Mapped source notes

- Report generation creates report_id and starts daemon thread: backend/app/api/report.py:109-186.
- Report API surfaces: backend/app/api/report.py:25-1016.
- Step 4 polls report agent log and console log: frontend/src/components/Step4Report.vue:402-412 and 2025-2182.
- Zep report tools provide graph search/statistics/interview context: backend/app/services/zep_tools.py:401-491 and 855-1481.

## Implementation scope

- Generate report request with simulation_id, force_regenerate policy, idempotency key, and existing-report reuse behavior.
- Report worker with durable status, retry/error mapping, section-level progress, and provider mode.
- Polling or callback channel for report logs and console logs; streaming is optional but log ordering and from_line resume are required.
- Report storage with metadata, Markdown or structured sections, downloadable artifact, and report-by-simulation lookup.
- UI report page with report header, section progress, timeline logs, tool-call detail expansion, empty/loading/failed states, and next action to deep interaction.

## Interfaces touched

- API: report generate/status/get/by-simulation/list/download/delete/chat/progress/sections/agent-log/console-log/tools/search/tools/statistics.
- State: report metadata, progress, sections, logs, console logs, provider trace, report artifacts.

## Proof gate

- report_generation_contract_test: report request creates durable report_id and status record before worker completion.
- provider_adapter_config_test_required: LLM and graph memory adapters prove config validation, retry, timeout, and typed error mapping.
- repeatable_browser_e2e: report page shows progress/logs/sections and handles failed/blocked states.
- persistence_roundtrip: report metadata, sections, logs, and download artifact reload after restart.
- live_provider_proof_blocker_only: live report content generation requires provider credentials and cannot be faked.

## Repair routing

If live LLM/Zep are unavailable, keep report worker, storage, log streaming, and UI behavior real, then block live content proof explicitly.

## Unlock condition

Unlock Phase 05 only after report retrieval and logs are durable and the report page can navigate into deep interaction.
