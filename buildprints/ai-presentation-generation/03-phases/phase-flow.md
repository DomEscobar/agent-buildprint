# Phase Flow

Use this loop for the active phase only. Do not read every phase upfront. Do not turn phase execution into paperwork.

Before every active phase, read `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-ui-identity.md`. For UI-bearing artifacts, `02-ui-identity.md` and the generated local UI identity are the standing comprehension, user-language, and visual identity contract, not optional polish files. This is a UI-bearing product, so backend/runtime work still carries user-facing obligations through progress state, error messages, persisted readback, and export trust.

## Active-Phase Loop

1. Restate the smallest real product path for the phase.
2. Identify the persistent state that must survive reload.
3. Build only dependency-ready behavior.
4. Prove the path directly with tests and, for UI paths, browser inspection.
5. Repair fake success, no-op controls, generic output, broken persistence, and visual overlap before moving on.
6. Update `HANDOVER.md` with built, verified, blocked, not proven, and next.
7. Load `verify-and-review` before claiming phase completion and compare the result against predicted failure modes.
8. Before editing code, state a short thinking checkpoint in the working response or task plan: active phase, smallest real vertical user/operator path, 3-7 likely failure modes, proof plan, and claim ceiling. This is not a deliverable file.
99. Final mandatory phase: run `03-phases/critical-review-pushback.md` as `99-critical-review-pushback`; if the rubric does not pass, fix the named flaws and rerun relevant proof before claiming done.

## Repair Routing

- If a phase fails because setup, env, persistence, or skill harness is missing, route back to `01-project-setup.md`.
- If a phase fails because the UI is confusing, clipped, generic, or visually inconsistent, route through `02-ui-identity.md` and the current phase.
- If a provider credential or export binary is missing, record a blocker and keep deterministic/local proof separate from live-provider/export claims.
- If the output is technically generated but generic, repair the current phase's product logic before adding new features.

## Move-On Rule

Move to the next phase only when the current phase has a real user path, durable readback where relevant, and proof that would catch a fake implementation. Packet prose or passing structure checks are not enough.

Do not create phase-run markdown, evidence ledgers, or planning artifacts by default. The thinking checkpoint is behavioral: it should shape the work, not become paperwork. Persist only concise progress, blockers, and handoff facts needed for continuation.

Do not create phase-run paperwork by default. Compare the result against the predicted failure modes, do one concrete weakness repair unless none is found, and record what the proof does not prove.

Edits alone, placeholder screens, mocked data, functionless buttons, sample-only proof, unchecked screenshots, or a skipped thinking checkpoint do not complete a phase. If runtime/provider/deployment is unavailable, build the seam and record a blocker; do not fake live success.

## Repair routing

- If setup is missing architecture, local skill harness, commands, env, proof surfaces, or setup receipt, return to `01-project-setup.md`.
- If a product-defining/security/destructive/secret decision is missing, return to `00-questions.md` and stop.
- If UI quality is generic, interactionless, visually incoherent, or drifting away from the generated identity contract, return to `02-ui-identity.md` or `docs/ui-identity.md` before advancing.
- If runtime/provider/deployment is unavailable, build the seam and record a blocker; do not fake live success.

Skill completion signals are part of the handoff contract: `SETUP_RUNBOOK_DONE`, `UI_IDENTITY_DONE`, `SUBAGENT_PHASE_DONE` when subagents governed the work, and `VERIFY_REVIEW_DONE` before phase completion.
