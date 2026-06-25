# 01 Integration Plan

After host assessment and direction discovery, the applying agent produces an integration plan that maps the design quality lift onto the host's specific codebase.

This plan reconciles findings from `00-host-assessment.md` with the intended lift. If the host assessment reveals blockers or incompatible gaps, the plan must downgrade the claim ceiling to partial or blocked, not hide the gap.

## Required artifacts

- `.buildprint/capability-plan.md` — the integration plan.
- `.buildprint/design-direction.yaml` — locked direction, three dials, risk budget, typography pairing, icon library.
- `.buildprint/phase-rail.md` — phase-by-phase task list with owner, scope, and proof.

## Plan structure

The integration plan must contain:

### Direction lock

- Direction profile: `clean-minimal` | `warm-human` | `brutalist` | `premium-luxury` | `wild-creative` | `custom:<name>`
- Three dials: `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY` (1-10 each)
- Visual risk budget: list of allowed rule breaks (1-3 per direction)
- Typography pairing: from the approved list in `capability.yaml`
- Icon library: from the approved list per direction
- 3D role: forbidden / optional / recommended / required

### 3rd-party path decision

- Default: `self-contained`
- Adopted paths (if any): list of `proposed_integration_paths` ids
- Adapter boundary: where the adapter lives (same repo, separate package, sidecar)

### Phase mapping

For each of the 5 phases, the plan must specify:

- Phase name
- Owner (which agent, which human)
- Scope (what is in / out)
- Proof artifact (what proves the phase is done)
- Risk class (additive, replacement, destructive)
- Estimated effort (rough: hours, days, weeks)

The five phases are:

1. **Brief & Direction Discovery** — design read in one line, direction profile locked.
2. **Token System & Visual Foundation** — color, type, space, radius, elevation, motion tokens.
3. **Components, States, Motion** — direction-specific components, every interactive surface has states, motion uses named tokens.
4. **Microcopy, Accessibility, IA** — voice guide, microcopy inventory, WCAG AA+, IA decisions.
5. **Signature Moment & Receipts** — direction's signature moment with proof, before/after, lighthouse, axe, inventories.

### Compatibility gaps

For each host compatibility gap identified in `00-host-assessment.md`:

- Classification: `infer safely` | `patch locally` | `must ask user` | `out of scope`
- Resolution: how the gap is closed (or why it is out of scope)
- Owner: who is responsible

### Hard-stop risks

The plan must explicitly list the destructive or high-risk changes:

- Component library replacement (if any)
- Color or motion token migration (which tokens change, which stay)
- File renames (which files are renamed, which are deleted)
- Migration paths (what happens to existing usage of deprecated tokens)
- Rollback plan (how to revert if a phase fails)

### Proof plan

For each phase, the proof artifact:

- Phase 1: design read in one line, direction profile locked, three dials set.
- Phase 2: token files exist, used in components, no hardcoded values in primary components.
- Phase 3: components rendered with direction-specific patterns, every interactive surface has all required states, motion uses named tokens.
- Phase 4: voice guide written, microcopy inventory complete, lighthouse score ≥ 95, axe audit passes, IA decisions recorded.
- Phase 5: signature moment implemented and provable, before/after screenshots taken, all receipts written.

### Communication cadence

- Sync points (when the applying agent checks in with the user).
- Decision points (when a user decision is required).
- Risk points (when a destructive operation is about to happen).

## Safety rules

- The plan must not contain destructive operations without explicit user approval.
- The plan must not skip a phase (the 5 phases are ordered and required).
- The plan must not claim a phase complete before its proof artifact is produced.
- The plan must not change direction silently — direction is locked at assessment and may only change with explicit user re-confirmation.

## DO NOT

- Do not produce a generic "best practices" plan that doesn't reference the direction.
- Do not skip the proof plan — receipts are the whole point of this buildprint.
- Do not assume a default direction in the plan.
- Do not propose multiple direction changes during the plan — lock one and stay with it.
