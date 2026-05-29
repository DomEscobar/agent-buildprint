# SPEC

This legacy spine file is retained for package compatibility. The authoritative implementation contract is `BUILDPRINT.md`; executable phase detail lives in `03-phases/phase-index.yaml` and `03-phases/phase-flow.md`.

## Product specification

Build a local personal agent with:

- streaming chat runtime and WebUI/API boundary;
- provider router with deterministic test provider and optional live adapters;
- schema-described tool registry with risk policy;
- skill registry with selective instruction injection;
- MCP adapter that maps enabled tools into the same tool policy path;
- memory store for raw history, daily episodes, curated long-term memory, checkpoints, attachments, and compaction;
- bounded subagent/team task bus;
- normalized token telemetry;
- diagnostics that keep live provider, real MCP, shell/browser/network, billing, publishing, and hosted auth claims honest.
