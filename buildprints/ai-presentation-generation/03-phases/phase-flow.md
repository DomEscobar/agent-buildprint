# Phase Flow

Use active phase only. Do not read every phase upfront. Start from `.buildprint/next-agent.md`, local `AGENTS.md`, `00-questions.md`, `01-project-setup.md`, `02-uiux-decision.md`, and this file before every active phase, then load only the active phase named in `03-phases/phase-index.yaml`. `02-uiux-decision.md` is the standing design/style responsibility for all UI-bearing work, not an optional polish pass.

## Active phase loop

1. Restate the smallest real vertical path for the active phase in product terms.
2. Build that path against the real project, preserving provider, document, outline, layout, deck, template, export, automation, and UI boundaries.
3. Verify the path with the most direct local command/browser/API check available.
4. Inspect the product result, not just the code diff.
5. Repair visible slop, beginner confusion, dead controls, fake provider success, fake export success, static slide demos, and any mismatch between UI claims and runtime evidence.
6. Update handover facts before stopping.

## Proof theater rejection

Edits alone, placeholder screens, mocked data, functionless buttons, fake provider success, fake PPTX/PDF download, canned decks, decorative thumbnails, or jargon-heavy screens that only developers can decode are not proof. Mocked data counted as real generation is especially dangerous. If a live provider, parser, export runtime, API, webhook, MCP, or desktop bridge is unavailable, do not fake live success; show a precise blocked state and record the blocker.

## Repair routing

- If the setup base is missing, return to `01-project-setup.md`.
- If a safety, secret, deployment, privacy, destructive, or product identity decision is unresolved, return to `00-questions.md`.
- If the visible workbench is generic, dead, or visually incoherent, return to `02-uiux-decision.md`.
- If an implementation failure is inside the active phase, repair the current phase before advancing.
- If a prior phase contract is broken, route back to that phase and explain why.

Do not create an evidence-ledger bureaucracy. Use concise commands, screenshots, smoke tests, API checks, export attempts, and handover notes that catch real defects.
