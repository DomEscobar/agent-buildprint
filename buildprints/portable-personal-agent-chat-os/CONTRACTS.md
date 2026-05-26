# CONTRACTS

This compatibility file summarizes the packet contracts. `BUILDPRINT.md`, `02-project-setup.md`, and the active files under `03-phases/` are authoritative.

## Core contracts

- `AgentSession`: conversation/run with messages, checkpoints, active provider/model, events, and usage.
- `ProviderConfig`: provider kind, model id, context window, generation defaults, capabilities, and env var names only.
- `RuntimeEvent`: turn, model delta, tool, skill, MCP, team, memory, telemetry, completion, and failure events.
- `ToolSpec`: name, description, input schema, risk label, and handler reference.
- `SkillSpec`: name, triggers, instructions, optional resources/scripts, and enabled flag.
- `McpServerSpec`: server id, transport, allowed tools, timeout, auth handle, and enabled flag.
- `MemoryState`: raw history, daily episode, long-term memory, checkpoint, and attachment/source summaries.
- `TeamTask`: bounded delegation with role, input, status, events, result, and usage.
