# Phase 99 — Final review and handover

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

The implementation does not end when the last feature compiles. It ends after a skeptical artifact review repairs local high-signal defects and writes a concise handover.

## Mapped obligations

- Run `04-review.md` fully, including posture-gated operability walkthrough.
- Repair local high-signal defects before handover.
- Preserve scope honesty: blocked is blocked, not silently removed.

## Stable vs free

- Stable: review completeness, blocker honesty, and handover shape.
- Free: wording style of summaries and ordering of non-critical notes.

## Implementation scope

- Re-run the core loop from a fresh state.
- Re-run restart/readback and blocked-provider paths.
- Re-check dead controls and domain output variation.
- Prepare concise factual handover in `05-handover.md`.

## Interfaces touched

- End-user/operator walkthrough paths.
- Verification command surfaces.
- Handover output file.

## State / runtime touched

- Latest verification outputs and blocker notes.
- Runtime state continuity checks.

## UX / DX / operator requirements

- Handover should be executable by the next engineer without rereading all phases.
- Non-local postures should not hide missing auth/security/operability work.

## Required output (product-architect)

- Handover preserves selected scope, current status, and next atomic actions.

## Blocks (product-architect)

- Summary-only handover with no actionable next steps.

## Required output (security-boundary)

- Sensitive boundary blockers and unresolved risks are explicit.

## Blocks (security-boundary)

- Security-sensitive gaps omitted from final handover.

## Quality bar

Handover clearly separates built behavior, verified behavior, real blockers, and next steps.

## Do not ship

- "Works" claims without command/path evidence.
- Hidden blockers or downgraded scope language.
- Missing `Not production-grade` section for trusted local posture.

## Repair routing

- review failure -> `04-review.md`
- handover shape failure -> `05-handover.md`
- contradiction with packet mission -> `BUILDPRINT.md`

## Handover

Write the handover described in `05-handover.md`. A chat summary is not enough.

## Unlock condition

`05-handover.md` is complete, blocker-honest, and actionable for the next engineer.
