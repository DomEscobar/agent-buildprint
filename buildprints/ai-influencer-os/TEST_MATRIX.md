# TEST_MATRIX

| Risk | Required test / check |
|---|---|
| Generic chatbot substitution | Required OpenClaw config, extension, skills, and Docker files exist |
| Private context leakage | Runtime context is marked private and not returned in visible response fixture |
| Memory/self-state merge | User memory and self-state read/write to separate files |
| Keyword-only analyzer | Tests/static checks prove production `classifyIntent` uses `analyzeIntentWithLLM`/adapter when no mock is injected |
| OpenClaw runtime handwave | Docker entrypoint/config references `OPENCLAW_RUNTIME_CMD` or reports `openclaw_runtime_missing` blocker |
| Wavespeed ignored | Image skill references `WAVESPEED_API_KEY`, has mock fallback, and includes a concrete Wavespeed client request/response adapter |
| External API in tests | Test runner forces mock mode and passes without keys; `.env.example` does not enable test/mock mode by default |
| Env var mismatch | Static check verifies exact required env var names from `BUILDPRINT.md`, including browser host/port/password auth variables |
| Static check mismatch | `npm run test:static` includes required `node --check` chain plus alignment checks |
| Package identity mismatch | Static check verifies `package.json.name` is `openclaw-ai-influencer-os`, not `agb`/`xy`/`agent-buildprint` |
| Public/private media confusion | Low-trust private/sensitive media is blocked; public media requires safety/grounding |
| Ungrounded social claims | Draft without `groundedIn` is blocked by QA |
| Auto-publishing | Mock publisher refuses unapproved drafts and default env disables real publish |
| noVNC handoff security | Compose/Docker includes Chromium/noVNC service shape, binds local-only by default, requires non-empty secret-backed VNC/noVNC auth, has no default/empty/hard-coded password, exposes port 7900 via env only on operator interface, and mounts `storage/browser/profile` |
| Media-flow injection bug | Real media flow imports/uses Wavespeed client by default; tests may inject mocks |
| Manager missing | Manager audit reports stale/unsafe/blocked items |
| Validation handwave | `VALIDATION.md` includes commands, test result, missing keys, deviations, blockers |

## Minimum command gate

```bash
npm test
npm run test:static
```
