# Critical Review Pushback

## How to implement this phase

Read `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, `02-ui-identity.md`, `blueprint.yaml`, `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, current project `AGENTS.md` if present, all phase handoffs, and `HANDOVER.md`. Review the built artifact as a skeptical senior engineer and product reviewer. This phase is mandatory and final.

## Building objective

Perform a hard review of the selected production canvas product. Score each category 0 to 5 and calculate a total score out of 60. Require at least 50/60, no category below 4, and no unresolved high-severity finding before any completion claim. The categories are:

1. source behavior preservation;
2. canvas-editor UX identity;
3. first-run comprehension;
4. real interaction and no dead controls;
5. durable persistence/readback;
6. assistant and realtime behavior;
7. provider/media blocker honesty;
8. central output specificity;
9. visual stress and responsive proof;
10. security/deployment claim discipline.
11. Experience originality: screenshot delta review must prove the result did not merely change palette, copy, labels, spacing, iconography, or section titles while keeping the same dominant surface, interaction model, creative/operator object, and information hierarchy.
12. Progressive-disclosure screenshot review: desktop and narrow screenshots must show that the canvas, assistant, media details, settings, modals, and blocked states reveal detail in the right place instead of stuffing every capability into one permanent view.

For each category, name the strongest evidence and the weakest remaining risk. If a category scores below 4, run a repair loop: describe the flaw, fix it, rerun the relevant proof, and rescore. Repeat up to five flaw -> fix -> proof -> rescore iterations unless an external blocker stops progress.

Repair loop detail: name the flaw and severity, patch the smallest real fix that can remove it, rerun the relevant proof, rescore, and stop only after pass or five iterations with an external blocker.

The review must push back on plausible but weak success. A polished canvas that cannot persist is a failure. A working backend with a generic dashboard is a failure. A chat assistant that does not mutate visible artifacts is a failure. Media placeholders counted as generated output are a failure. Provider-missing states hidden behind success copy are a failure.

## DO NOT

- Do not rubber-stamp the implementation.
- Do not ship placeholders, functionless buttons, or mocked/sample data counted as proof.
- Do not score from prose or intent.
- Do not ignore UI identity because functionality works.
- Do not ignore backend/provider gaps because screenshots look good.
- Do not accept default admin credentials, exposed secrets, or public deployment claims without hardening.
- Do not mark review passed with unresolved high-severity findings.

## Minimum proof before moving on

- The 10-category score is recorded.
- Every category cites actual command, browser, screenshot, API, persistence, or provider-blocker evidence.
- Any score below 4 has a repair attempt or an external blocker.
- No high-severity finding remains unresolved unless the final claim is explicitly blocked.
- `HANDOVER.md` is updated after review.

## Handoff note

Record score, failed categories, repairs made, rerun proof, remaining blockers, final qualification label, and exact claims the next agent may trust.
