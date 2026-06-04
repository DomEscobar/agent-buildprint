# Phase 04 — Report and continued interaction

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and only this active phase before coding. Keep `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-uiux-decision.md` open as constraints. Treat `02-uiux-decision.md` as the standing design/style responsibility for this phase, even when the work is backend, runtime, report, verification, or state plumbing, because those decisions surface through UI states, copy, controls, and handover. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Build the report generation and continuation loop. A report must be generated from the current graph and simulation state, not from a canned markdown fixture. It should include sections, findings, graph/simulation references, citations or source links where available, blockers, and next suggested actions. The user should be able to inspect report sections, jump back to related graph nodes or simulation traces, and continue the interaction by refining seed material, graph focus, simulation settings, or report prompts. If provider-backed summarization is unavailable, deterministic/local report generation may exist but must be labeled honestly and must not claim live LLM reasoning. Persist report history locally so a refresh does not erase the user’s path. The UI should avoid raw JSON dumps; use polished panels, status, and actionable controls. This phase closes the core product promise: graph-backed swarm simulation becomes an inspectable report users can continue from.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not add required Zep Cloud. Do not leak provider keys into commits, logs, snapshots, reports, or handover.

## Minimum proof before moving on

Run a report generation smoke path from real current graph/simulation state. Verify report links or references connect back to graph/simulation artifacts. Browser-inspect empty/error/blocked/provider-missing states and ensure continuation controls work or block honestly.

## Handoff note

Record what was built, what was verified, what is blocked, what is not proven, and the next active phase. Keep claims scoped to observed evidence and visible product behavior.
