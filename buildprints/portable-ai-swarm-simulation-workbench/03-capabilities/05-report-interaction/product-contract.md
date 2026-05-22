# Report And Deep Interaction

## Product Obligation

Generate simulation reports with progress/sections/logs, download completed reports, and support chat with a report agent plus selected simulated-agent interview flows.

## Inputs

- `simulation_id`
- `force_regenerate`
- `message`
- `chat_history`

## Observable Outputs

- `report_id`
- `markdown_content`
- `progress`
- `sections`
- `agent_log`
- `chat response`
- `sources/tool_calls`

## Required States

- Not started or empty.
- Loading or async progress with current stage.
- Ready/completed with persisted identifiers.
- Failed with actionable error.
- Retry or force-regenerate where supported.
- Refresh/restart readback where state is durable.

## Boundaries

Provider-backed behavior must disclose whether it is deterministic-test-double, sandbox live, or production live. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.
