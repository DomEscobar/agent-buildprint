# TEST_MATRIX

| Risk | Required test / check |
|---|---|
| Generic chatbot drift | Required OpenClaw config, extension, skills, and Docker files exist |
| Private context leakage | Runtime context is marked private and not returned in visible response fixture |
| Memory/self-state merge | User memory and self-state read/write to separate files |
| Keyword-only analyzer drift | Tests/static checks prove production `classifyIntent` uses `analyzeIntentWithLLM`/adapter when no mock is injected |
| OpenClaw runtime handwave | Docker entrypoint/config references `OPENCLAW_RUNTIME_CMD` or reports `openclaw_runtime_missing` blocker |
| Wavespeed ignored | Image skill references `WAVESPEED_API_KEY`, has mock fallback, and includes a concrete Wavespeed client request/response adapter |
| External API in tests | Test runner forces mock mode and passes without keys |
| Public/private media confusion | Low-trust private/sensitive media is blocked; public media requires safety/grounding |
| Ungrounded social claims | Draft without `groundedIn` is blocked by QA |
| Auto-publishing | Mock publisher refuses unapproved drafts and default env disables real publish |
| noVNC handoff handwave | Compose/Docker includes Chromium/noVNC service shape, exposes port 7900 via env, and mounts `storage/browser/profile` |
| Manager missing | Manager audit reports stale/unsafe/blocked items |
| Validation handwave | `VALIDATION.md` includes commands, test result, missing keys, deviations, blockers |

## Minimum command gate

```bash
npm test
npm run test:static
```
