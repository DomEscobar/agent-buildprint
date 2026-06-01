# Phase 12 — CI and release gates

requires_roles: [product-architect, security-boundary, ux-ui-craft]

## Product intention

Ensure releases are gated by repeatable checks that catch regressions in behavior, security boundaries, and user-visible quality.

## Mapped obligations

- Define required gates per artifact mode and posture.
- Define pass/fail policy for core loop, persistence, and blocked-state behavior.
- Define release blocker semantics and escalation rules.

## Stable vs free

- Stable: required gate categories and blocker policy.
- Free: CI platform and job orchestration details.

## Implementation scope

- Create CI job matrix for build/type/lint/unit/integration and mode-relevant smoke.
- Add restart/readback checks where persistence is claimed.
- Add blocked-provider and failure-path checks.
- Add UI screenshot/browser checks for UI-bearing artifacts.
- Define release criteria and manual approval requirements.

## Interfaces touched

- CI pipeline config and scripts.
- Test harness and fixture contracts.
- Release scripts and approval workflow surfaces.

## State / runtime touched

- Build artifacts and test reports.
- Screenshot/artifact storage for review.
- Release metadata and gate history.

## UX / DX / operator requirements

- Failures should point to the affected phase/surface and next fix path.
- Gate output should be readable by both developers and operators.

## Required output (product-architect)

- Test and dependency boundaries are explicit and maintainable.

## Blocks (product-architect)

- No clear mapping between critical behavior and gates.
- Broad checks that pass while core loop is broken.

## Required output (security-boundary)

- Sensitive-surface checks exist for auth, uploads, destructive paths, and secret handling.

## Blocks (security-boundary)

- Security-sensitive paths shipped without denied-path tests.

## Required output (ux-ui-craft)

- UI-bearing flows include browser/screenshot verification for core states.

## Blocks (ux-ui-craft)

- No proof for empty/loading/error/blocked/success states.

## Quality bar

A clean checkout can run required gates and produce actionable failures before release.

## Do not ship

- Release based on lint/build only.
- Passing tests that do not exercise real selectors/commands/flows.
- Ignored browser or restart/readback failures.

## Repair routing

- gate failure -> current phase or owning phase
- release-policy contradiction -> `02-project-setup.md`
- unresolved critical blocker -> `05-handover.md`

## Unlock condition

Required CI gates are executable, documented, and tied to release decisions.
