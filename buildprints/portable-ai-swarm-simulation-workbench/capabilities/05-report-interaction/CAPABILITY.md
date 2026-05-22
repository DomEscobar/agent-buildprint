# Report And Deep Interaction

Status: `INCLUDED`

## Agent Brief

Goal: generate reports from simulation/graph context and support chat with ReportAgent or simulated agents.
Status: `CONTRACT_SEAM_ONLY`
Dependencies: `04-simulation-runtime`
Stable behavior: report generation, section/log retrieval, report download, graph search/stat tools, chat.
Implementation freedom: report agent internals and UI layout.
Forbidden substitutions: static report text, chat echo bot counted as agent, hidden tool failures.
First implementation slice: deterministic report agent generates outline/sections and chat uses graph context adapter.
First verification gate: `npm test -- report-interaction`
Required evidence: report artifact, chat transcript, browser screenshots.
No-fake checks: report references simulation/graph artifacts; chat is not a canned response.
Stop or escalate when: provider/tool access is unavailable.
Required team packs: product-architect, ux-ui-craft, test-and-verification, integration-runtime, security-boundary, data-persistence.

## Owned source surfaces

- `backend/app/api/report.py:25`
- `backend/app/api/report.py:472`
- `backend/app/services/report_agent.py`
- `frontend/src/components/Step4Report.vue`
- `frontend/src/components/Step5Interaction.vue`

## Product obligations

- Generate report sections and logs from simulation and graph artifacts.
- Support chat with report/agent context through provider/tool boundaries.
- Expose progress, errors, downloads, and interaction transcripts without static canned success.

## Behavior Contract

- User/system action: generate report and interact with report/agents.
- Accepted inputs: simulation id, force flag, chat message/history.
- Observable outputs: report id, sections, progress/logs, download, chat response.
- Important state: report metadata, section content, agent logs, console logs, chat context.
- Failure/empty/loading/blocked states: missing simulation, failed section, provider/tool timeout, no report.
- Provider/persistence/runtime/operational boundary: LLM report agent and Zep graph tools.

## Source Evidence

- OBSERVED: `backend/app/api/report.py:25` generates reports.
- OBSERVED: `backend/app/api/report.py:472` supports chat.
- OBSERVED: `backend/app/services/report_agent.py` records agent logs and tool calls.
- OBSERVED: `frontend/src/components/Step4Report.vue` and `Step5Interaction.vue` handle report/chat UI.

## Pack Navigation

- Implementation plan: `IMPLEMENTATION.md`
- Verification ledger: `VERIFICATION.md`
