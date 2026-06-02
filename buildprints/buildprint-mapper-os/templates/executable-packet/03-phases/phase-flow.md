# Phase Flow

For product-app packets, the phase order follows Buildprint Consumer-First Product System: product-system alignment, shell/navigation, core loop first, feature slices, state/data, domain/intelligence, design/copy, architecture garden, verification, then final review/handover.

Conditional hardening phases may follow verification when posture or source signals require them: auth/tenancy, observability/health, deployment/operability, CI/release gates, backup/recovery, and security/abuse controls.

## What `requires_roles` means

Each phase declares `requires_roles: [...]`. These are the quality lenses for that phase. They are not external files. Every listed role is defined inline in the same phase under `## Required output (<role>)` and `## Blocks (<role>)`. To apply a role, read those two sections in the active phase; there is nothing to look up elsewhere. If a listed role has no embedded sections, treat it as a packet defect and route to `02-project-setup.md`.

For each phase:

1. Read the phase and restate the product intention in one paragraph.
2. For each role in `requires_roles`, apply that role's inline `## Required output (<role>)` and `## Blocks (<role>)` sections.
3. Build the smallest real usable slice for the declared artifact type.
4. Improve the obvious next consumer action if it is local, safe, and central: user action, developer adoption step, operator recovery, task approval, dataflow inspection, or infrastructure operation.
5. Run the strongest relevant local check.
6. Remove visible slop before moving on.
7. Record only useful handover facts: works, partial, blocked, next repair.

Posture rule:

- `trusted_local`: local credibility first, production gaps stay explicit as blockers.
- `private_authenticated` and `public_webapp`: posture-critical controls must be built or blocked with explicit external reason; they are not optional polish.

Continuation cadence (from `execution_cadence` in `blueprint.yaml`):

- `one_phase`: complete the active phase, write the handover with the `Continue from here` menu, then stop and wait for a choice.
- `to_checkpoint`: keep running phases without stopping until verification then final review, pausing only on a real blocker; still write the handover menu at the checkpoint.
- `all_remaining`: keep running every dependency-ready phase to completion, stopping only on a real blocker; write the final handover menu at the end.

Whatever the cadence, every stop must end with the `Continue from here` options menu from `05-handover.md` so the developer always has a concrete choice, never a vague "continue".

Do not create long self-assessments. Do not treat a passed command as artifact quality. Do not move on while the main visible control, documented command, public method, adapter seam, operator action, or recovery path in the phase is fake, dead, or disconnected from real state.
