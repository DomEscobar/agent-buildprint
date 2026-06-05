# Phase 10 — Provider-backed runtime and reports

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `enhancement-gaps.md`, and only this active phase before coding. This phase depends on the backend provider boundary and deterministic runtime. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Add optional provider-backed simulation, social-feed enrichment, and story/report generation through the backend/service boundary. Provider-backed runs must use the same run id, state, trace, cancellation/error, graph snapshot, feed/story artifacts, and persistence model as local deterministic runs. Stories/reports must distinguish provider-backed analysis from deterministic/local drafts and include provenance, limitations, unknowns, and cost/token metadata where available. The UI must make the mode obvious in plain language.

The provider-backed path must improve the real product loop rather than bypass it. Provider output should be grounded in the graph snapshot, run configuration, simulated feed, and source material; stored with redacted metadata; and recoverable after reload. The story/report should show where provider reasoning was used, where deterministic evidence was used, and where the system is uncertain. Exportable thread/story output must remain editable and clearly labeled as draft/generated content.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not call a provider from the browser. Do not hide costs, rate limits, failures, retries, or partial output. Do not overwrite deterministic runtime behavior. Do not claim provider-backed quality without a real successful provider call or clearly recorded blocker. Do not post to real X/Twitter or any public social platform without explicit user-controlled configuration, confirmation, and proof.

## Minimum proof before moving on

Run build/test/smoke checks. If credentials are available, execute a redacted provider-backed run, feed enrichment, and story/report generation path. If credentials are unavailable, prove the UI blocks with actionable setup guidance and deterministic mode still works. Verify cost/token or unavailable-cost state, provenance, limitations, export/share draft labeling, and error handling.

## Handoff note

Record provider-backed paths built, exact redacted proof or blockers, report provenance behavior, cost/token behavior, failure states, and the next active phase.
