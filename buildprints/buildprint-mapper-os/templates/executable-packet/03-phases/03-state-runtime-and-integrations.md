# Phase 03 — State, Runtime, And Integrations

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `01-project-setup.md`
- `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact

Then implement this phase as one coherent product path. Do not split the work into tiny abstract checklist fragments. Understand the objective, build the smallest complete product path that satisfies it, verify it, and only then move on.

## Building objective

Every phase must keep `02-ui-identity.md` and the generated local UI identity open as the product comprehension, visual identity, and user-language contract. Even backend, runtime, or verification work changes what the user sees through states, copy, blockers, reports, detail views, or controls; preserve the generated identity unless the artifact is explicitly marked `not-ui-bearing`.

Make the product loop durable and honest across runtime boundaries. Implement the persistence, adapter seams, provider configuration, integration boundaries, retry/error states, and readback behavior required by the artifact.

A user/operator should be able to reload, re-run, or inspect the relevant state without discovering that the product was only in-memory or hardcoded. Provider and integration seams should have deterministic test paths and explicit live blockers. If external systems are involved, calls must be bounded, safe, logged enough for operator understanding, and never pretend to run when credentials/runtime are missing.

Use `proven_implementation_requirements` in `blueprint.yaml` for runtime-heavy domains. Provider clients should sit behind local interfaces and use official SDKs or well-supported clients. Long-running work should have a real task/status model. Persistence should use a database layer with migrations or explicit schema evolution. File/object storage should own uploads, generated assets, and exports with path safety. Custom implementations are acceptable only when the hard-domain proof is named and run.

This phase should turn the core loop from a local demo into a trustworthy local product path.

Product-proof contract for this phase:

- Named product loop: name the durable/reloadable loop that crosses persistence, provider, task, or integration boundaries.
- User/operator action: name the reload, retry, provider selection, import/export, or integration action being exercised.
- Named output/state: name the durable record, task status, adapter result, audit entry, or recovered UI/API state.
- Failure mode: name the missing credential, provider failure, persistence failure, retry exhaustion, or unsafe action block.
- Concrete proof artifact: name the restart/readback transcript, adapter trace, migration proof, retry log, screenshot, or API evidence.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not leave state in memory if the product claims persistence or reload/readback.
- Do not hard-code a single provider when the Buildprint requires dynamic provider configuration.
- Do not replace queues, task status, provider SDKs, migrations, or file/object safety with ad hoc code unless the alternative is explicitly proof-bound.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback when this phase creates durable state.
- Prove selected libraries/runtimes or record exact blockers for hard domains named in `proven_implementation_requirements`.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
