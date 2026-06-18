# Phase Flow

Use this loop for the active phase only. Do not read every phase upfront. Do not turn phase execution into paperwork.

## How to run a phase

1. Read `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-ui-identity.md` before every active phase. For UI-bearing artifacts, `02-ui-identity.md`, the generated local UI identity, and `docs/DESIGN.md` are standing contracts, not optional polish files: `docs/ui-identity.md` governs product/interaction fit, and `docs/DESIGN.md` governs visual taste and craft.
2. Read `.buildprint/next-agent.md` and current project `AGENTS.md` if they exist.
3. Read the active phase file named in `03-phases/phase-index.yaml`.
4. Before editing code, state a short thinking checkpoint in the working response or task plan: active phase, smallest real vertical user/operator path, 3-7 likely failure modes, proof plan, and claim ceiling. This is not a deliverable file. Do not create phase-run paperwork by default.
5. Build the path only after that checkpoint is clear. Use `subagent-driven-implementation` only when the phase splits into cleanly owned workstreams; otherwise keep implementation local.
6. Verify with the most meaningful available command, API/runtime check, browser/screenshot inspection, or persistence/readback proof. Load `verify-and-review` before claiming phase completion.
7. Compare the result against the predicted failure modes. Mark each avoided, found and fixed, still blocked, or not applicable.
8. Repair visible slop and fake-success shortcuts before continuing. Do one concrete weakness repair unless none is found.
9. Record what works, what is blocked, what was verified, what the proof does not prove, and what the next phase may trust.
10. Continue through the dependency-ready implementation phases in `03-phases/phase-index.yaml`.
99. Final mandatory phase: run `03-phases/critical-review-pushback.md` as `99-critical-review-pushback`; if the rubric does not pass, fix the named ad hoc flaws and rerun the relevant proof before claiming done.

## Completion rule

A phase passes only when the building objective is satisfied by a real product path or a blocker is honestly recorded. For UI-bearing artifacts, phase completion also requires generated local `docs/ui-identity.md` or `UI-IDENTITY.md`, generated local `docs/DESIGN.md`, `.buildprint/ui-evidence.md` grounding identity/design/action claims in screenshot or source evidence, `agb verify ui .` without unresolved FAIL checks, and screenshot evidence for the relevant desktop/mobile states before final handoff. Edits alone, placeholder screens, mocked data, functionless buttons, sample-only proof, unchecked screenshots, missing local UI identity, missing local design system, missing UI evidence binder, or a skipped thinking checkpoint do not complete a phase.

Do not create phase-run markdown, evidence ledgers, or planning artifacts by default. The thinking checkpoint is behavioral: it should shape the work, not become paperwork. Persist only concise progress, blockers, and handoff facts needed for continuation.

Final completion is impossible until phase `99-critical-review-pushback` has run and either passed or recorded an external blocker. Treat it as the last phase in the phase graph, not as optional review prose.

Skill completion signals are part of the handoff contract: `SETUP_RUNBOOK_DONE`, `UI_IDENTITY_DONE`, `SUBAGENT_PHASE_DONE` when subagents governed the work, and `VERIFY_REVIEW_DONE` before phase completion.

## Repair routing

- If the phase objective is wrong or too thin, repair the phase file before coding more.
- If setup is missing architecture, local skill harness, commands, env, proof surfaces, or setup receipt, return to `01-project-setup.md`.
- If a product-defining/security/destructive/secret decision is missing, return to `00-questions.md` and stop.
- If UI quality is generic, interactionless, visually incoherent, stuffing multiple capabilities into one permanent view, or drifting away from the generated identity contract, return to `02-ui-identity.md` or `docs/ui-identity.md` before advancing.
- If visual craft, palette, typography, density, motion, component styling, or responsive collapse drift away from the generated design system, return to `docs/DESIGN.md` and repair the UI before advancing.
- If UI claims cannot be grounded in `.buildprint/ui-evidence.md`, or the first viewport cannot prove an action surface stronger than "type and send", return to `02-ui-identity.md`, `docs/ui-identity.md`, or `docs/DESIGN.md` according to the failed claim and repair the UI before advancing.
- For Agentic Chat, if the UI drifts away from a chat-native interface — for example a mission sheet, guided-run launcher, task dashboard, status lane, or form-first workflow displaces the conversation thread and composer/input — return to `02-ui-identity.md` and repair the UI before advancing.
- For Agentic Chat, if the default first viewport feels like a harness demo rather than a polished consumer chat — seeded feature cards before user intent, giant blank dead zone, internal status labels, uniform bordered card stack, or cramped mobile composer/chips — return to `02-ui-identity.md` and repair the Consumer Chat Craft Gate before advancing.
- If runtime/provider/deployment is unavailable, build the seam and record a blocker; do not fake live success.

## Handoff discipline

Before stopping, update `.buildprint/progress.md`, `.buildprint/blockers.md`, and handoff notes. If those files do not exist yet, create them. Keep the handoff concise and evidence-based.
