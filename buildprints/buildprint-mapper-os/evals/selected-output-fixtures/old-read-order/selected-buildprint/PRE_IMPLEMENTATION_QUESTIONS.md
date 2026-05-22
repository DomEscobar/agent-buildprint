# PRE_IMPLEMENTATION_QUESTIONS

## Quality Mandate

Max-quality for selected scope. Do not offer quality tiers or ask which team should do this. Required teams are inferred in `TEAM_STACK.md`.

## Blocking Questions

- Are LLM/runtime credentials available for extraction proof?
- Which durable store should be used if the source-observed persistence layer is unavailable?

## Safe Defaults

- Keep the package `SELECTED_UNQUALIFIED`.
- Implement provider contracts and test fakes only for tests.
- Preserve UI, runtime, and persistence blockers honestly.
