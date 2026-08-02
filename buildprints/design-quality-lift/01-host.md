# 01 Host

Merge of host assessment and integration plan. Complete before loop work. No source edits before `00-goal.md` hard stops and this host plan.

## Host assessment

# 00 Host Assessment

Audit-first protocol for the design-quality-lift buildprint. The applying agent must produce a host assessment before any code edits. This is a hard gate.

## Objective

Produce an honest audit of the host's current design quality state so the direction discovery, integration plan, and signature moment can be tailored to the host — not to a generic ideal.

## Required artifacts

The host assessment produces these files in `.buildprint/`:

- `host-assessment.md` — this assessment.
- `design-direction.yaml` — direction discovery output (after assessment questions).
- `screenshots/before/` — at least 5 before-screenshots of the host's current UI surfaces.
- `screenshots/audit/` — at least 3 audit screenshots of empty, loading, error, success, and blocked states.
- `audit-inventory.md` — microcopy, motion, icon, and color inventory.
- `banned-defaults-audit.md` — list of banned defaults currently present in the host.

## Audit checklist

The applying agent must record findings for each item below. Use `infer safely`, `patch locally`, `must ask user`, or `out of scope` to classify each finding.

### Visual System

- Current color palette: tokens, hardcoded values, accent color.
- Current typography: families, weights, scale, line-height.
- Current spacing: 4pt/8pt baseline or arbitrary.
- Current radius: scale, hardcoded values, edge cases.
- Current elevation: shadow tokens, hardcoded shadows.
- Current motion: durations, easings, infinite loops.

### Components

- Component library: name, version, custom or stock.
- Button variants: primary, secondary, ghost, destructive.
- Input variants: text, select, checkbox, radio, switch, file.
- Display patterns: card, modal, drawer, toast, tooltip, popover.
- Navigation: nav, sidebar, breadcrumb, tabs.
- Data patterns: table, list, empty state.

### States

- Empty state: how many interactive surfaces have an empty state?
- Loading state: skeleton, spinner, progress?
- Error state: inline, page-level, with recovery?
- Success state: confirm, celebrate, or silent?
- Offline state: shown, hidden, or undefined?
- Blocked state: how does the host surface "you can't do this yet"?

### Motion

- Hover transitions: duration, easing, what changes.
- State transitions: enter, exit, on-screen.
- Page transitions: hard cut, fade, slide?
- Choreography: stagger, sequence, group?
- Reduced-motion fallback: implemented, partial, missing?
- Reduced-transparency fallback: implemented, partial, missing?

### Microcopy

- Voice: documented, implicit, missing?
- Error messages: helpful, recovery-oriented, or generic?
- Empty state copy: encouraging, action-oriented, or absent?
- Onboarding: welcoming, brief, or absent?
- First-person voice: yes, no, mixed?
- Generic friendly phrases ("Oops!", "Whoopsie!"): count and locations.

### Accessibility

- Lighthouse accessibility score: run and record.
- axe audit: run and record.
- Keyboard navigation: works, partial, broken?
- Focus visible: everywhere, partial, missing?
- Color contrast: WCAG AA pass, partial, fail?
- Screen reader labels: documented, partial, missing?
- ARIA usage: correct, partial, missing?

### Information Architecture

- Nav structure: flat, nested, or unclear?
- Hierarchy: clear, partial, missing?
- Density: high, medium, low?
- Primary actions: obvious, partial, hidden?
- IA decisions recorded anywhere: yes, no?

### Banned defaults audit

- AI-purple gradient: present, absent?
- Fraunces or Instrument_Serif: present, absent?
- Inter + slate-900 as universal: present, absent?
- Centered hero over dark mesh: present, absent?
- Three equal feature cards: present, absent?
- Hand-rolled SVG icons: present, absent?
- Generic friendly microcopy: present, absent?
- Infinite-loop animations on common UI: present, absent?
- Random cubic-bezier (not named tokens): present, absent?

### Existing capabilities

- Persistence: file system, database, none?
- Build system: Vite, Next, webpack, other?
- Test runner: Vitest, Jest, Playwright, none?
- Browser proof: Playwright, Storybook, Chromatic, manual?
- Brand/voice guide: documented, partial, none?
- Accessibility auditing: lighthouse, axe, none?
- Bundle analyzer: present, absent?

## Output format

The host assessment file `.buildprint/host-assessment.md` must follow this structure:

```md
# Host Assessment

## Visual System
- color: [tokens/hardcoded/mixed]
- typography: [families used]
- spacing: [baseline used]
- ...
## Components
- library: [name + version or 'custom']
- ...
## States
- empty: [count + state]
- ...
## Motion
- hover: [duration + easing]
- ...
## Microcopy
- voice: [documented/implicit/missing]
- ...
## Accessibility
- lighthouse: [score + date]
- axe: [issues + date]
- ...
## Information Architecture
- nav: [flat/nested/unclear]
- ...
## Banned Defaults
- ai-purple-gradient: [present in N locations]
- ...
## Existing Capabilities
- build: [Vite/Next/webpack]
- test: [Vitest/Jest/Playwright/none]
- ...
## Compatibility gaps
- [list gaps + classification: infer safely / patch locally / must ask user / out of scope]
```

## Safety rule

If any audit finding changes the host's destructive operations, color tokens, motion defaults, or production UI in a way the user has not approved, stop and ask before any source edits.

If the host has multiple banned defaults across multiple categories, this is a strong signal that the host is LLM-default-driven. The user must be informed before proceeding with a direction lock.


## Integration plan

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


## Apply order

Follow:

1. `00-goal.md`
2. `01-host.md` (this file)
3. `loops/` in order
4. `review.md`
5. `verify.md`

### Legacy apply notes

# Apply: design-quality-lift

How to apply this buildprint to a host. The applying agent must follow the protocol below in order.

## Apply checklist

The applying agent must complete these steps in order. Skipping a step is a hard gate violation.

### Step 1: Confirm host assessment

Read `.buildprint/host-assessment.md` (produced in `00-host-assessment.md` protocol). If it does not exist, run the host assessment protocol first.

Hard gate: if the host assessment is missing or incomplete, stop and ask the user.

### Step 2: Confirm direction lock

Read `.buildprint/design-direction.yaml` (produced in `00-assessment-questions.md` protocol). The file must contain:

- `direction`: one of the 5 v1 direction profiles or a custom direction
- `three_dials`: DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY
- `visual_risk_budget`: list of allowed rule breaks
- `typography_pairing`: from the approved list in `capability.yaml`
- `icon_library`: from the approved list per direction
- `three_d_role`: forbidden / optional / recommended / required

Hard gate: if any field is missing, stop and ask the user.

### Step 3: Confirm integration plan

Read `.buildprint/capability-plan.md` (produced in `01-integration-plan.md` protocol). The plan must map all 5 phases to concrete tasks with owners and proof artifacts.

Hard gate: if any phase is missing or has no proof artifact, stop.

### Step 4: Confirm 3rd-party path decision

Read `proposed_integration_paths.decision` in `capability.yaml`. Default is `deferred` (self-contained). If a path is adopted, the adapter boundary must be documented in `.buildprint/capability-plan.md`.

Hard gate: if a path is adopted but the adapter boundary is not documented, stop.

### Step 5: Run each phase in order

For each of the 5 phases, follow the phase file in `02-implementation-phases/` in order:

1. `00-host-assessment.md`
2. `00-assessment-questions.md`
3. `01-integration-plan.md`
4. `02-implementation-phases/01-contract-and-config.md`
5. `02-implementation-phases/02-core-integration.md`
6. `02-implementation-phases/03-host-wiring.md`
7. `02-implementation-phases/04-user-operator-surface.md`
8. `02-implementation-phases/05-verification-and-receipt.md`
9. `verify.md`
10. `capability-receipt.md`

Each phase has its own objective, instructions, and proof gate. The applying agent may not skip or merge phases. Do not redesign the whole product without direction lock. Changes are bounded to visual quality lift only.

### Step 6: Verify

Run `verify.md` to check all gates pass. The verify file lists the gates and the proof required for each.

### Step 7: Write the receipt

Write `.buildprint/design-quality-lift-receipt.md` with all required outputs from `capability.yaml → receipt.required_outputs`.

Hard gate: if any required output is missing, the lift is not installed.

## Safety rule

The apply protocol is a phased capability grafting protocol. It is not a whole-product phase plan. Do not use it to build a new product. Use it to upgrade an existing app.

If at any step the applying agent encounters a destructive operation, a high-risk change, or a user decision that was not captured in the host assessment, stop and ask.

## Host assessment is a hard gate

Classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If any `must ask user` finding changes production-critical flows, destructive UI replacements, color or motion token migrations, accessibility target, or proof level, stop and ask before source edits.

## Direction lock is a hard gate

If the user wants to change direction mid-apply, stop and re-run the assessment questions. Do not silently change direction — the receipt, visual risk budget, and signature moment all depend on the locked direction.

## Integration path discovery

The list of proposed 3rd-party integration paths is in `capability.yaml` under `proposed_integration_paths`. Discovery questions for each path are in `00-assessment-questions.md` under "3rd-Party Integration Discovery". After host assessment and before integration plan, the applying agent must:

- read the proposed paths and decision questions
- ask the discovery questions relevant to this host
- record the decision in `.buildprint/capability-plan.md` under "Integration Path Decision"
- keep the default `deferred` if no path answers are confirmed
- if a path is adopted, document the adapter boundary and update the receipt schema to record adapter presence/absence/version

Any adopted path must run behind the existing deterministic gates. Model-judge or visual-judge scores may never override visual proof gates.

## DO NOT

- Do not produce code without a locked direction.
- Do not skip phases.
- Do not assume a default direction.
- Do not claim a phase is complete before its proof artifact exists.
- Do not change direction silently.
- Do not bypass the receipt.
- Do not produce banned defaults (LLM-default typography, AI-purple gradients, hand-rolled SVGs, generic friendly microcopy, infinite-loop animations on common UI).


Reconcile assessment assumptions with proof. Downgrade claim ceiling when proof is partial or blocked. Record not-proven honestly.
