# Phase 99 - Final review and handover

requires_roles: [product-architect]

## Product intention

Finish with a skeptical product review and a concise handover that tells the truth about what works, what is blocked, and what should happen next.

## Mapped obligations

- Complete the core loop from a fresh start.
- Reload/read back persisted state.
- Change input and confirm outputs change or provider blocker appears.
- Review graph controls directly.
- Review simulation/report/interaction behavior or blockers.
- Record not-production-grade status for trusted_local posture.

## Stable vs free

Stable: concise, honest handover with continue options.

Free: exact wording.

## Implementation scope

Final walkthrough, defect repair, handover update.

## Interfaces touched

All selected product surfaces.

## State / runtime touched

All persisted artifacts and runtime blockers.

## UX / DX / operator requirements

Handover should be short enough to be useful and specific enough to resume work.

## Required output (product-architect)

Write a handover that separates built behavior, verification, known blockers, and next atomic actions.

## Blocks (product-architect)

No "done" claim if live providers, runtime proof, or public hardening remain blocked.

## Quality bar

A fresh coding agent can continue without reading the original source repo.

## Do not ship

Vague next steps, missing blocker list, or production-ready language.

## Repair routing

Repair `05-handover.md` or prior phase files if the final review exposes contradictions.

## Unlock condition

Final handover ends with the required continue-from-here menu.

