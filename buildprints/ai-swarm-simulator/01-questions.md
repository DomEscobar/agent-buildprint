# Questions

Resolve these before implementation. If a hard-stop is unanswered, stop and ask.

## Hard-stop questions

1. **Deployment posture** — Is this still trusted-local, or should it target private-authenticated/public-web? Current default: trusted-local.
2. **Provider policy** — Which OpenAI-compatible providers should be supported first? If unknown, implement generic provider config (`label/baseUrl/model/apiKey`) plus validation endpoint.
3. **Graph memory adapter** — Use Graphiti as default open-source graph memory unless a reviewed OSS alternative is selected. Zep Cloud is forbidden as a required dependency.
4. **Simulation runtime** — Is OASIS available locally? If not, build the runtime seam and blocked state; do not fake simulation success.
5. **Data/privacy** — Can uploaded seed files be persisted locally? If not, implement session-only storage and say so in the UI.
6. **Secrets** — Provider API keys stay local-only/trusted-local unless posture is upgraded with secure storage.

## Assumable defaults

- Use Vue/Vite frontend and Python/FastAPI backend unless repo evidence makes another stack clearly better.
- Use sample seed data so a novice reaches an inspectable graph/report in under 60 seconds without credentials.
- Persist project, graph, simulation, and report state locally.
- Use Graphiti-backed graph memory adapter by default.
- Treat all production deployment/security/backup gates as inactive under trusted-local but explicit.

## Deferrable questions

- Exact visual theme tokens after first UI identity pass.
- Public multi-user auth/tenancy.
- Cloud deployment target.
- Advanced graph layout engine choice if a simple force layout can prove the product loop first.
