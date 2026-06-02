# Phase 05 — Prediction Report And Interaction

## Product intention

Convert simulation traces and graph memory into a readable prediction report, then let the user interrogate the report and simulated agents. The report is the product outcome, and interaction is the next natural action.

## Build

- Implement report records tied to simulation id, with status, outline, section markdown, progress, completed timestamps, errors, logs, and download path.
- Build report generation with planning, section generation, tool calls/search, progress updates, and incremental section readback.
- Store and display report-agent logs in a user-meaningful timeline without leaking raw internal noise as the main surface.
- Implement report detail, by-simulation lookup, list, download, sections, and progress APIs.
- Build post-report interaction: chat with report agent, choose an individual agent where available, interview/survey agents, and preserve chat/interview history as appropriate.
- Provider failures must surface the failed tool/provider and preserve partial report/log context.

## Quality bar

- A completed simulation can start report generation or produce a clear blocked state.
- Report sections appear incrementally or final markdown is readable after reload.
- Download returns the report content.
- Follow-up chat responses depend on the message and workspace data, or are honestly blocked by missing providers.
- Tool calls and sources are inspectable enough for the user/operator to diagnose report quality.

## Do not ship

- A generic markdown report unrelated to simulation data.
- Chat replies that ignore the user's question or target.
- Raw JSON logs as the report UI.
- Report completion without persisted sections/content.
