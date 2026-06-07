# Phase Flow

Use this loop for the active phase only. Do not read every phase upfront. Do not turn phase execution into paperwork.

## How to run a phase

1. Read `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-uiux-decision.md` before every active phase. For UI-bearing artifacts, `02-uiux-decision.md` is the standing design/style responsibility, not an optional polish file.
2. Read `.buildprint/next-agent.md` and current project `AGENTS.md` if they exist.
3. Read the active phase file named in `03-phases/phase-index.yaml`.
4. Restate the smallest real vertical path you will build.
5. Build that path.
6. Verify with the most meaningful available command, API/runtime check, browser/screenshot inspection, persistence/readback proof, export proof, or output-specificity review.
7. Repair visible slop and fake-success shortcuts before continuing.
8. Record what works, what is blocked, what was verified, and what the next phase may trust.
9. Before final completion, run `03-phases/critical-review-pushback.md`; if the rubric does not pass, fix the named ad hoc flaws and rerun the relevant proof before claiming done.

## Completion rule

A phase passes only when the building objective is satisfied by a real product path or a blocker is honestly recorded. Edits alone, placeholder screens, mocked data, functionless buttons, sample-only proof, and unchecked screenshots do not complete a phase.

## Repair routing

- If the phase objective is wrong or too thin, repair the phase file before coding more.
- If setup is missing architecture, commands, env, proof strategy, or UI identity, return to `01-project-setup.md`.
- If a product-defining/security/destructive/secret decision is missing, return to `00-questions.md` and stop.
- If UI quality is generic, interactionless, visually incoherent, or drifting away from the style constitution, return to `02-uiux-decision.md` before advancing.
- If runtime/provider/deployment is unavailable, build the seam and record a blocker; do not fake live success.

## Handoff discipline

Before stopping, update `.buildprint/progress.md`, `.buildprint/blockers.md`, and handoff notes. If those files do not exist yet, create them. Keep the handoff concise and evidence-based.
