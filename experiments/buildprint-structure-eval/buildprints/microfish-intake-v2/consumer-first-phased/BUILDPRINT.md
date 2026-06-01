# Consumer-First Phased Buildprint — Microfish Intake

## Purpose

Build the Microfish intake slice as a normal-user product, not an expert workbench. The product must be understandable in the first 10 seconds and useful in the first 60 seconds.

## Required read order

1. `BUILDPRINT.md`
2. `00-alignment/product-brief.md`
3. `00-alignment/stack-and-quality.md`
4. `00-alignment/acceptance-scope.md`
5. `01-first-run-ux/goal.md`
6. `02-domain-core/goal.md`
7. `03-state-export/goal.md`
8. `04-polish-verify/verification.md`
9. `HANDOVER.md`

## Execution phases

- Phase 00: align product, user, stack, architecture, and quality bar.
- Phase 01: build the first-run UX before deep features.
- Phase 02: implement the domain core behind plain-language UI.
- Phase 03: persist, read back, and export.
- Phase 04: polish, screenshot-review, verify, and hand over.

## Non-negotiables

- Use TypeScript and a modern frontend build setup unless impossible in the environment.
- Prefer Vite + React or Vite + Svelte.
- No giant single-file app: domain, storage, provider status, and UI components must be separated.
- No technical jargon above the fold. Hide provider/runtime details behind “How this works”.
- Product is done only when a normal first-time user can complete the slice without explanation.
