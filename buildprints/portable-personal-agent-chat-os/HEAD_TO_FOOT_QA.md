# HEAD_TO_FOOT_QA

Before claiming a generated implementation is done, run these gates:

1. **Static gate**: typecheck/lint/build.
2. **Unit/contract gate**: provider, memory, tools, skills, MCP, telemetry, team tests.
3. **Deterministic runtime gate**: full test-provider chat turn with tool result and streamed events.
4. **Persistence gate**: checkpoint survives failed/aborted turn and can be inspected. The deterministic proof covers failed turns; aborted/cancelled turn persistence remains required for implementations with cancellation.
5. **WebUI/API gate**: real browser click/type path or local HTTP API path from bootstrap to final answer, screenshot or captured response, and rendered/returned telemetry plus memory evidence.
6. **Security gate**: dangerous tool denial and no secrets in repo/output.
7. **Claim-boundary gate**: safe claims/non-claims checked against `BUILDPRINT.md` and `PARITY_CLAIMS.md`.

Record commands, pass/fail, screenshots, and known gaps in the implementation validation report.
