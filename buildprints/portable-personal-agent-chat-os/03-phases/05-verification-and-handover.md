# Phase 05 — Verification And Handover

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

Verify the artifact from a fresh-start mindset and write the final handover. Run the real commands a next agent or human would use. Exercise the golden path, negative cases, blocked dependency paths, persistence/readback, central output quality, and visible/operator experience.

The goal is not to create a long proof ledger. The goal is to find lies before handoff: fake provider success, dead UI, missing state, placeholder modules, stale docs, commands that do not run, tests that pass while the product path fails, and claims that are broader than evidence.

Also find blandness before handoff. A product can pass structural checks while its central output is still generic, interchangeable, or not useful. Compare the observed output against the `central_output_contract` in `blueprint.yaml` and the claim ceilings in `docs/architecture.md`. If the artifact's main output only proves that input flowed through the system, record the quality gap instead of calling it complete.

Verify the selected typed gates from `blueprint.yaml` and the proof surfaces in `docs/architecture.md`; do not invent irrelevant gates at the end. For each applicable gate, record the command, browser path, screenshot inspection, API/CLI check, fixture, or blocker. For each non-applicable gate, leave a short reason. The handover should make it obvious why desktop/mobile visual proof, long-content stress, semantic output specificity, or integration/operator proof did or did not apply.

Verify the selected `proven_implementation_requirements` from `blueprint.yaml` and the package/runtime decisions in `docs/architecture.md`. For every applicable hard domain, record the library/runtime/service used, the proof that it is wired into the product path, or the blocker/from-scratch justification. A product can pass structural checks while still being too fragile because export, parsing, editing, drag behavior, provider clients, tasks, or migrations were improvised.

Update `README.md` as the product-facing README for the artifact that now exists. It must not be a Buildprint explanation. Include version/status badges, a concise product promise, feature sections, requirements, exact environment/provider key names from `.env.example` with blank secret examples only, quick start commands, verification commands/manual checks actually run, and limitations/blockers that match the evidence. If a live provider key, sandbox, browser, database, storage service, webhook secret, or deployment credential is required for a claim, name it honestly as required, optional, or blocked instead of implying it was available.

Update `HANDOVER.md` with exactly what was built, commands run, observed results, blockers, unproven claims, and recommended next actions. Keep `README.md` and `HANDOVER.md` consistent: the README is for users/operators, and the handover is for the next builder.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not hide skipped gates. If a command cannot run, say why and what proof is missing.
- Do not leave the final README as a packet/template explanation or omit provider-key requirements when `.env.example` or runtime behavior needs them.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback when this phase creates durable state.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Capture reviewer-style evidence for central output quality: what the artifact makes clear, what still feels generic, what the user/operator can do next, and which central-output claims remain unproven.
- Capture hard-domain evidence: proven package/runtime choices, custom implementation justifications, and blockers for any unproven export/parser/editor/provider/task/persistence requirement.
- Record selected typed quality gate results: applicable/not applicable, proof command or inspection path, result, and blocker.
- Record any blocker with exact missing dependency, command, credential, or decision.
- Confirm `README.md` exists, describes the product features, includes version/status badges, includes requirements and provider-key/environment sections, and matches the observed verification evidence.

## Handoff note

Write what was built, what works, commands run, proof observed, README updates, blockers, unproven claims, and which next phase can trust this work.
