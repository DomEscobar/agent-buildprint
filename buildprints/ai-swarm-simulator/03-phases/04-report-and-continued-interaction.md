# Phase 04 — Story/report and continued interaction

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and only this active phase before coding. Keep `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-uiux-decision.md` open as constraints. Treat `02-uiux-decision.md` as the standing design/style responsibility for this phase, even when the work is backend, runtime, report, verification, or state plumbing, because those decisions surface through UI states, copy, controls, and handover. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Build the story/report generation and continuation loop as a grounded prediction artifact, not only a postable thread. A story/report must be generated from the current graph, source-derived agents, social feed, action logs, and simulation state, not from a canned markdown fixture. It should include a report outline, sections, findings, graph/feed/simulation references, action-log evidence, citations or source links where available, blockers, uncertainty, do-not-claim boundaries, and next suggested actions. The user should be able to inspect story/report sections, jump back to related graph nodes, source facts, agent profiles, feed entries, action-log events, or simulation traces, and continue the interaction by refining seed material, graph focus, simulation settings, feed focus, report questions, or selected-agent questions. If provider-backed ReportAgent/ReACT behavior is unavailable, deterministic/local story/report generation may exist but must be labeled honestly and must not claim live LLM reasoning or tool-backed analysis. Persist story/report history locally so a refresh does not erase the user’s path. The UI should avoid raw JSON dumps; use polished panels, status, provenance chips, and actionable controls. This phase closes the core product promise: graph-backed social simulation becomes an inspectable feed plus grounded report/story users can export, critique, and continue from.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not add required Zep Cloud. Do not leak provider keys into commits, logs, snapshots, reports, or handover.

## Minimum proof before moving on

Run a story/report generation smoke path from real current graph/feed/simulation state and action logs. Verify story/report links or references connect back to graph, agents, feed, action logs, and simulation artifacts. Verify at least one follow-up interaction can use report, graph, simulation, or named-agent context. Browser-inspect empty/error/blocked/provider-missing states and ensure continuation and export controls work or block honestly.

## Handoff note

Record what was built, what was verified, what is blocked, what is not proven, and the next active phase. Keep claims scoped to observed evidence and visible product behavior.
