# 99-critical-review-pushback

## How to implement this phase

Before writing code or declaring done, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md` if it exists, current project `AGENTS.md` if it exists, `BUILDPRINT.md`, `01-project-setup.md`, `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact, `blueprint.yaml`, and `HANDOVER.md`.

## Building objective

Run a strict final review against the built product and the central output contract. Score the implementation across product fidelity, UI comprehension, visual quality, persistence/readback, provider honesty, export/runtime proof, security boundaries, operator experience, test coverage, and handover truthfulness. The pass threshold is 42/50, no category below 4, and no unresolved high-severity finding.

If the review fails, do not polish the handover. Fix the named flaws in the responsible phase, rerun the relevant proof, and rescore. Continue for up to five flaw -> fix -> proof -> rescore iterations unless blocked by missing credentials, unavailable runtime, or an explicit external decision. This is the place to push back on optimistic completion claims: if the deck is generic, export is fake, provider calls are mocked as live, UI is confusing, or persistence does not survive reload, the product is not complete.

## DO NOT

- Do not pass the review from file presence, screenshots you did not inspect, or happy-path confidence.
- Do not accept placeholders, lorem ipsum, empty wrappers, functionless buttons, inert navigation, swallowed errors, fake progress, or mocked/sample data counted as real proof.
- Do not claim production readiness, live provider support, export fidelity, or deployment safety without matching proof.
- Do not hide unresolved high-severity findings in "future work".

## Minimum proof before moving on

- Review score is recorded with category results.
- Every high-severity issue is fixed or blocked with exact external dependency.
- Relevant tests, browser checks, export checks, and persistence/readback checks are rerun after fixes.
- `HANDOVER.md` states the final qualification label and does not claim beyond evidence.

## Handoff note

Record score, findings, repairs, rerun proof, remaining blockers, and the final qualification label.
