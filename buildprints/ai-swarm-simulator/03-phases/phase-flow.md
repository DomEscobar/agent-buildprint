# Phase Flow

Use active phase only. Do not read every phase upfront. Start from `.buildprint/next-agent.md`, local `AGENTS.md`, `00-questions.md`, `01-project-setup.md`, `02-uiux-decision.md`, and this file, then load only the active phase named in `03-phases/phase-index.yaml`.

## Active phase loop

1. Restate the smallest real vertical path for the active phase in product terms.
2. Build that path against the real project, preserving provider, graph memory, simulation, report, and UI boundaries.
3. Verify the path with the most direct local command/browser/API check available.
4. Inspect the product result, not just the code diff.
5. Repair visible slop, dead controls, fake provider success, decorative graph output, and any mismatch between UI claims and runtime evidence.
6. Update handover facts before stopping.

## Proof theater rejection

Edits alone, placeholder screens, mocked data, functionless buttons, fake provider success, canned reports, or decorative graph nodes are not proof. If a live provider, graph adapter, or simulation runtime is unavailable, do not fake live success; show a precise blocked state and record the blocker.

## Repair routing

- If the setup base is missing, return to `01-project-setup.md`.
- If a safety, secret, deployment, privacy, destructive, or product identity decision is unresolved, return to `00-questions.md`.
- If the visible workbench is generic, dead, or visually incoherent, return to `02-uiux-decision.md`.
- If an implementation failure is inside the active phase, repair the current phase before advancing.
- If a prior phase contract is broken, route back to that phase and explain why.

Do not create an evidence-ledger bureaucracy. Use concise commands, screenshots, smoke tests, and handover notes that catch real defects.
