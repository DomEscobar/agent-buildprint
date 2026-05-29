# TEST MATRIX

The authoritative gates live in `04-evaluation.md` and each phase file under `03-phases/`.

| Risk | Required test |
|---|---|
| Provider routing silently calls wrong model | deterministic provider registry assertion |
| Streaming only tested as final string | event stream contains deltas before completion |
| Tool execution from raw text | schema/policy gate test |
| Shell/write/network/browser risk | denial test for disallowed high-risk tool |
| Skill bloat | selected skill only is injected |
| MCP drift | deterministic MCP mapped tool test |
| Memory loss | checkpoint and compaction retention test |
| Hidden subagent behavior | team task events test |
| Token telemetry missing | normalized usage and compaction threshold test |
| UI/API smoke missed | local browser or HTTP API path from bootstrap to streamed answer |
| Unsupported compatibility claim | claim-boundary review before publish |
