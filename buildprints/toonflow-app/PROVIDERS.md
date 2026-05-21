# PROVIDERS

Provider/runtime surfaces require `integration-runtime` proof or explicit blockers.

| Surface | Contract | Required proof | Current status |
|---|---|---|---|
| Text/chat providers | Script and production agents stream text/tool results through configured model adapters | sandbox text model socket/API trace with malformed-output and abort tests | blocked |
| Image providers | Asset/storyboard generation records task state and writes media artifacts | sandbox/live image generation trace or explicit credentials blocker | blocked |
| Video providers | Timeline/track video generation polls provider state and persists output/error | sandbox/live video provider polling trace | blocked |
| TTS/providers if enabled | Provider adapter contract and model selection safety | adapter test and unavailable-model negative test | blocked |
| Programmable vendor VM | User-defined vendor code executes inside hardened boundary with schema validation | VM sandbox/security tests | blocked |
| Electron/Docker runtime | Local service, static web, data root, and desktop window lifecycle | backend smoke, Electron launch, Docker build/run smoke | blocked |
