# Phase Flow

Use this loop for the active phase only. Do not read every phase upfront. Do not turn phase execution into paperwork.

## How to run a phase

1. Read `BUILDPRINT.md`, `00-questions.md`, `01-ui-identity.md`, and `02-project-setup.md` before every active phase. For UI-bearing artifacts, `01-ui-identity.md` and the generated local UI identity are the standing comprehension, user-language, and visual identity contract, not optional polish files.
2. Read `.buildprint/next-agent.md` and current project `AGENTS.md` if they exist.
3. Read the active phase file named in `03-phases/phase-index.yaml`.
4. Before editing code, state a short thinking checkpoint in the working response or task plan: active phase, smallest real vertical user/operator path, 3-7 likely failure modes, proof plan, and claim ceiling. This is not a deliverable file. Do not create phase-run paperwork by default.
5. Build the path only after that checkpoint is clear.
6. Verify with the most meaningful available command, API/runtime check, browser/screenshot inspection, persistence/readback proof, export proof, or output-specificity review.
7. Compare the result against the predicted failure modes. Mark each avoided, found and fixed, still blocked, or not applicable.
8. Repair visible slop and fake-success shortcuts before continuing. Do one concrete weakness repair unless none is found.
9. Record what works, what is blocked, what was verified, what the proof does not prove, and what the next phase may trust.
10. Continue through the dependency-ready implementation phases in `03-phases/phase-index.yaml`.
99. Final mandatory phase: run `03-phases/critical-review-pushback.md` as `99-critical-review-pushback`; if the rubric does not pass, fix the named ad hoc flaws and rerun the relevant proof before claiming done.

## Completion rule

A phase passes only when the building objective is satisfied by a real product path or a blocker is honestly recorded. Edits alone, placeholder screens, mocked data, functionless buttons, sample-only proof, unchecked screenshots, or a skipped thinking checkpoint do not complete a phase.

Do not create phase-run markdown, evidence ledgers, or planning artifacts by default. The thinking checkpoint is behavioral: it should shape the work, not become paperwork. Persist only concise progress, blockers, and handoff facts needed for continuation.

Final completion is impossible until phase `99-critical-review-pushback` has run and either passed or recorded an external blocker. Treat it as the last phase in the phase graph, not as optional review prose.

## Repair routing

- If the phase objective is wrong or too thin, repair the phase file before coding more.
- If setup is missing architecture, commands, env, proof strategy, or UI identity, return to `02-project-setup.md`.
- If a product-defining/security/destructive/secret decision is missing, return to `00-questions.md` and stop.
- If UI quality is generic, interactionless, visually incoherent, or drifting away from the generated identity contract, return to `01-ui-identity.md` before advancing.
- If runtime/provider/deployment is unavailable, build the seam and record a blocker; do not fake live success.

## Handoff discipline

Before stopping, update `.buildprint/progress.md`, `.buildprint/blockers.md`, and handoff notes. If those files do not exist yet, create them. Keep the handoff concise and evidence-based.
