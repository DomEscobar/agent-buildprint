# Phase 4: Prediction Report And Interaction Console

## Phase mode contract

- `phase_id`: `04-report-interaction-console`
- `blueprint_mode`: `product`
- `phase_style`: `outcome_flow`
- Outcome: the user receives a durable prediction report grounded in the simulation and can interrogate the report agent or simulated agents after the run.
- Owned surfaces: `surface-prediction-report-workspace`, `surface-interaction-console`

## Preconditions and inputs

- A prepared and run or deterministically replayed simulation from Phase 3.
- Inputs: `simulation_id`, graph id, project requirement, simulation artifacts, optional selected report id, chat target, prompt/survey text.
- Provider mode: live report agent and agent interviews when configured; deterministic sandbox report/chat when credentials are absent.

## Implementation scope

Build the prediction report workspace:

- start report generation as a background job;
- plan a sectioned report from project requirement, graph context, simulation actions, and tool results;
- stream or poll status with planning, section generation, tool-call, section-complete, and completion states;
- persist report id, outline, markdown content, sections, timestamps, status, and tool trace;
- reload existing completed reports instead of regenerating by default.

Build the interaction console:

- show report content beside the interaction panel;
- support report-agent chat with tool context;
- support selecting simulated agents from generated profiles and asking direct questions;
- support survey-style prompts across the simulated population when implemented locally;
- persist chat history and display failures honestly.

Finish with a final critical reviewer and anti-slop pass over the entire product.

## Interfaces touched

- Report generate/status/read APIs.
- Report manager and report-agent provider adapter.
- Agent/profile interaction APIs or local controllers.
- Chat/session persistence.
- Browser report and interaction surfaces.
- Whole-product verification scripts.

## State and artifact effects

- Persist report artifacts, tool traces, section state, chat history, selected agent, survey requests/results, final reviewer notes, anti-slop findings, and handover.
- A reload must restore report content and interaction history for the simulation.

## UX/UI requirements

- The report must read like an analyst artifact: title, summary, sections, generated content, and tool provenance.
- Tool traces should be readable and collapsible, not debug dumps.
- The interaction console must make target selection obvious: report agent vs specific simulated agent vs survey mode.
- Empty chat state should suggest the next useful question without fake prewritten answers.
- Do not ship placeholder report ids, canned "insights", or generic lorem analysis.

## Safety/security constraints

- Report and chat content may derive from uploaded documents; avoid leaking hidden raw source text in traces unless the user asked for it.
- Missing live LLM credentials block live report/chat proof but not deterministic local report/chat flow.
- Final reviewer must check for placeholders, dead controls, swallowed errors, mock-only branches, and generic dashboards before handover.

## Quality gates

- `proof-report-generation-artifact`: test generates or deterministically produces a report, persists it, reloads by id, and verifies sections/tool trace are input-sensitive.
- `proof-interaction-stateful-chat`: browser/API test selects report agent and at least one simulated agent, sends prompts, sees different context-aware replies, reloads, and verifies history persists.
- `proof-final-critical-review`: run all runnable setup verification commands, exercise browser paths, and save final reviewer notes under `.buildprint/phase-runs/04-report-interaction-console/`.
- `proof-anti-slop-pass`: run `npx aislop scan --changes` or documented equivalent deterministic scan after tests/lint/build and fix high-signal local residue.

## Proof gate

This phase reaches `phase_core_passed` only when report generation and at least one interaction path work locally with durable artifacts. The whole packet cannot reach handover until final reviewer and anti-slop artifacts exist.

## Failure/recovery

If report generation fails, preserve prior simulation artifacts and show retry/regenerate controls. If an agent interview cannot run live, use the sandbox adapter only with explicit provider-mode labeling.

## Non-goals

- No new graph or simulation features except fixes needed for report/interaction correctness.
- No live-provider claim without provider proof.

## Source evidence

- `source/MiroFish/backend/app/api/report.py:25` starts report generation.
- `source/MiroFish/backend/app/api/report.py:72` reuses existing reports.
- `source/MiroFish/backend/app/api/report.py:138` creates ReportAgent.
- `source/MiroFish/backend/app/api/report.py:153` generates report content.
- `source/MiroFish/backend/app/api/report.py:159` saves report.
- `source/MiroFish/frontend/src/components/Step4Report.vue:20` renders sectioned report items.
- `source/MiroFish/frontend/src/components/Step4Report.vue:88` shows workflow metrics and steps.
- `source/MiroFish/frontend/src/components/Step4Report.vue:218` renders tool-call trace.
- `source/MiroFish/frontend/src/components/Step5Interaction.vue:92` provides interaction tabs.
- `source/MiroFish/frontend/src/components/Step5Interaction.vue:118` provides agent selection.

## Repair routing

- Report/chat/provider/UI failures -> this phase.
- Missing simulation artifacts -> Phase 3.
- Final reviewer critical finding -> owning phase, then rerun final reviewer.
