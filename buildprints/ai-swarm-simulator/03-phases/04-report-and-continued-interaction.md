# Phase 04 — Story/report and continued interaction

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and only this active phase before coding. Keep `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-uiux-decision.md` open as constraints. Treat `02-uiux-decision.md` as the standing design/style responsibility for this phase, even when the work is backend, runtime, report, verification, or state plumbing, because those decisions surface through UI states, copy, controls, and handover. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Build the story/report generation and continuation loop. A story/report must be generated from the current graph, social feed, and simulation state, not from a canned markdown fixture. It should include a postable thread/story draft, sections, findings, graph/feed/simulation references, citations or source links where available, blockers, and next suggested actions. The user should be able to inspect story/report sections, jump back to related graph nodes, feed entries, or simulation traces, and continue the interaction by refining seed material, graph focus, simulation settings, feed focus, or story/report prompts. If provider-backed summarization is unavailable, deterministic/local story/report generation may exist but must be labeled honestly and must not claim live LLM reasoning. Persist story/report history locally so a refresh does not erase the user’s path. The UI should avoid raw JSON dumps; use polished panels, status, and actionable controls. This phase closes the core product promise: graph-backed social simulation becomes an inspectable feed plus story/report users can export and continue from.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not add required Zep Cloud. Do not leak provider keys into commits, logs, snapshots, reports, or handover.

## Minimum proof before moving on

Run a story/report generation smoke path from real current graph/feed/simulation state. Verify story/report links or references connect back to graph, feed, and simulation artifacts. Browser-inspect empty/error/blocked/provider-missing states and ensure continuation and export controls work or block honestly.

## Handoff note

Record what was built, what was verified, what is blocked, what is not proven, and the next active phase. Keep claims scoped to observed evidence and visible product behavior.
