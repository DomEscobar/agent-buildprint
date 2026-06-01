# Phase Flow

For product-app packets, the phase order follows Buildprint v4 Consumer-First Product System: product-system alignment, shell/navigation, core loop first, feature slices, state/data, domain/intelligence, design/copy, architecture garden, verification, then final review/handover.

Conditional hardening phases may follow verification when posture or source signals require them: auth/tenancy, observability/health, deployment/operability, CI/release gates, backup/recovery, and security/abuse controls.

For each phase:

1. Read the phase and restate the product intention in one paragraph.
2. Confirm `requires_roles` and apply each routed role's `Required output` and `Blocks` sections.
3. Build the smallest real usable slice for the declared artifact type.
4. Improve the obvious next consumer action if it is local, safe, and central: user action, developer adoption step, operator recovery, task approval, dataflow inspection, or infrastructure operation.
5. Run the strongest relevant local check.
6. Remove visible slop before moving on.
7. Record only useful handover facts: works, partial, blocked, next repair.

Posture rule:

- `trusted_local`: local credibility first, production gaps stay explicit as blockers.
- `private_authenticated` and `public_webapp`: posture-critical controls must be built or blocked with explicit external reason; they are not optional polish.

Do not create long self-assessments. Do not treat a passed command as artifact quality. Do not move on while the main visible control, documented command, public method, adapter seam, operator action, or recovery path in the phase is fake, dead, or disconnected from real state.
