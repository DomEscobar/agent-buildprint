# Phase Flow

Use this loop for the active phase only. Do not read every phase upfront. Do not turn phase execution into paperwork.

## How to run a phase

1. Read `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-ui-identity.md` before every active phase. `02-ui-identity.md` and the generated local UI identity are the standing comprehension, user-language, and visual identity contract, including backend, persistence, media, and verification phases.
2. Read `.buildprint/next-agent.md` and current project `AGENTS.md` if they exist.
3. Read the active phase file named in `03-phases/phase-index.yaml`.
4. Before editing code, state a short thinking checkpoint in the working response or task plan: active phase, smallest real vertical user/operator path, 3-7 likely failure modes, proof plan, and claim ceiling. This is not a deliverable file. Do not create phase-run paperwork by default.
5. Build the path only after that checkpoint is clear.
6. Verify with the most meaningful available command, API/runtime check, browser/screenshot inspection, persistence/readback proof, or provider-blocker proof.
7. Compare the result against the predicted failure modes. Mark each avoided, found and fixed, still blocked, or not applicable.
8. Repair visible slop and fake-success shortcuts before continuing. Do one concrete weakness repair unless none is found.
9. Compare the result against the predicted failure modes. Record what works, what is blocked, what was verified, what the proof does not prove, and what the next phase may trust.
10. Continue through dependency-ready phases in `03-phases/phase-index.yaml`.
99. Final mandatory phase: run `03-phases/critical-review-pushback.md`; if the rubric does not pass, fix the named ad hoc flaws and rerun proof before claiming done.

## Completion rule

A phase passes only when the building objective is satisfied by a real product path or a blocker is honestly recorded. Edits alone, placeholder screens, mocked data, functionless buttons, sample-only proof, unchecked screenshots, or skipped thinking checkpoints do not complete a phase. If provider runtime is unavailable, do not fake live success.

## Repair routing

- If setup is missing architecture, local skill harness, commands, env, proof surfaces, or setup receipt, return to `01-project-setup.md`.
- If a product-defining, security, destructive, secret, provider, or deployment decision is missing, return to `00-questions.md` and stop if the default is unsafe.
- If UI quality becomes generic, interactionless, visually incoherent, or drifts away from the canvas-editor identity, return to `02-ui-identity.md` or generated `docs/ui-identity.md`.
- If runtime/provider/deployment is unavailable, build the seam and record a blocker; do not fake live success.
- If a phase objective is too thin to preserve the product contract, repair the phase file before coding more.

## Handoff discipline

Before stopping, update `.buildprint/progress.md`, `.buildprint/blockers.md`, and `HANDOVER.md` fields. Keep the handoff concise and evidence-based.
