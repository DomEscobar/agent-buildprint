# Phase 05 — Trusted-local verification and handover

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and only this active phase before coding. Keep `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, and `02-uiux-decision.md` open as constraints. Treat `02-uiux-decision.md` as the standing design/style responsibility for this phase, even when the work is backend, runtime, report, verification, or state plumbing, because those decisions surface through UI states, copy, controls, and handover. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Perform a hostile trusted-local product verification pass and produce an honest handover. Re-run the real local build/test/smoke path, then inspect the workbench as a user: seed input, provider status, graph canvas, selection/inspection, simulation controls/status, report generation, persistence/refresh behavior, and blocked/error states. Look specifically for fake-success shortcuts: dead buttons, decorative graphs, canned reports, provider success without credentials, raw JSON UI, confusing beginner flow, and claims that outpace evidence. Fix small visible defects directly when safe; route larger failures to the responsible earlier phase.

This phase is no longer the final production handover. It closes the trusted-local prototype loop and must route the next agent into Phase 06 unless a hard blocker prevents continuing. The handover must separate built, verified, blocked, not proven, and next. It should not claim production readiness unless later public/private gates were actually built and tested.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not add required Zep Cloud. Do not leak provider keys into commits, logs, snapshots, reports, or handover.

## Minimum proof before moving on

Run build/test/lint/typecheck as available, plus a browser or API smoke path through the full trusted-local product loop. Record exact commands, pass/fail, screenshots or paths if available, known blockers, and proof gaps. Confirm `HANDOVER.md` is filled honestly and names Phase 06 as the next active hardening phase.

## Handoff note

Record what was built, what was verified, what is blocked, what is not proven, and the next active phase. Keep claims scoped to observed evidence and visible product behavior.
