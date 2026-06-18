# Phase 02 — Core Product Loop

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

Build the first complete golden-path loop mirrored in `blueprint.yaml` and elaborated by the phase objectives. This is the main product path: the user/operator/developer should move from initial input/configuration to a useful result and visible/readable state.

The loop must include real validation, meaningful state transition, and output that depends on the input. It must also reach the central output quality bar defined in `blueprint.yaml` and the proof/claim ceilings in `docs/architecture.md`. If live dependencies are unavailable, build the adapter seam and blocked state, but do not substitute canned success. The path should be small enough to finish, but complete enough that a skeptical reviewer can see the product starting to work.

Use `proven_implementation_requirements` in `blueprint.yaml` while building the golden path. If the path depends on hard domains such as rich editing, document extraction, fixed-format rendering/export, drag interactions, charts/diagrams, provider SDKs, task state, or migrations, use proven packages/runtimes/services or prove the custom implementation against the same acceptance bar. Do not replace a source-derived hard technique with a toy version because it is easier to code.

Do not confuse "input-derived" with "good." The central output should include the mapped artifact's source-derived primitives and quality signals. A generic result with the user's words copied into it is not enough. If the product produces analysis, generated code, diagrams, documents, simulations, plans, reports, or structured views, the output must satisfy the mapped artifact's domain-specific standard for usefulness, correctness, credibility, publishability, or actionability.

For UI-bearing products, every visible control in this path must work or block honestly. For API/CLI/service products, every documented command/endpoint in this path must return meaningful success/error output and avoid hidden side effects.

Product-proof contract for this phase:

- Named product loop: instantiate the selected golden path with source-derived nouns, not generic "mapped product loop" language.
- User/operator action: name the exact input/configuration/start action that triggers the loop.
- Named output/state: name the central result and the persisted or visible state that changes.
- Failure mode: name one domain-specific invalid input, unavailable provider, failed dependency, or blocked action.
- Concrete proof artifact: name the command/API/browser evidence and output-quality note that proves the result is useful, not only input-derived.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not create broad shallow feature panels that name capabilities but implement none of them.
- Do not hand-roll hard product techniques when proven libraries/runtimes exist unless equivalent proof is added.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback when this phase creates durable state.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Record reviewer-style output proof: what the output makes clear, what still feels generic, what a user/operator can do next, and which quality claim remains unproven.
- Record any proven library/runtime choice or from-scratch hard-domain justification used by the central path.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
