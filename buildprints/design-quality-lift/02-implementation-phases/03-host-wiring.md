# Phase 03 - Components, States, Motion

## Objective

Upgrade the host's component library to match the locked direction. Ensure every interactive surface has all required states. Wire motion to named tokens. This phase is where the direction becomes visible.

## Why this phase exists

The component library is where the direction is most visible. LLM-default components use generic Tailwind classes, hardcoded values, and no state coverage. This phase forces direction-specific patterns and complete state coverage.

## Inputs

- Token files (from phase 2)
- `.buildprint/design-direction.yaml` (from phase 1)
- `.buildprint/host-assessment.md` (current components and states)
- Icon library (from phase 1)

## Steps

### 1. Inventory components

List every component in the host:

- Buttons (primary, secondary, ghost, destructive)
- Inputs (text, select, checkbox, radio, switch, file)
- Display (card, modal, drawer, toast, tooltip, popover)
- Navigation (nav, sidebar, breadcrumb, tabs)
- Data (table, list, empty state, pagination)
- Feedback (alert, banner, badge, chip)
- Surfaces (container, section, panel)

For each, note its current state coverage and its direction-specific pattern.

### 2. Apply direction-specific component patterns

Per direction:

**clean-minimal:**

- Buttons: sharp edges (radius 6px), mono font for ghost variant, single accent.
- Inputs: bottom-border only (no boxed), minimal padding.
- Cards: subtle border, no shadow, dense.
- Tables: tight rows, mono for IDs, no zebra stripes.

**warm-human:**

- Buttons: rounded (radius 8-12px), warm accent, soft shadow.
- Inputs: rounded with subtle border, generous padding.
- Cards: rounded with soft shadow, generous padding.
- Modals: rounded with backdrop blur.

**brutalist:**

- Buttons: no border-radius, hard 90° angles, thick border (2px), hard color flip on hover.
- Inputs: no border-radius, thick border, monospace placeholder.
- Cards: no shadow, thick border, exposed grid.
- Tables: monospace, no row borders, hard grid lines.

**premium-luxury:**

- Buttons: rounded (radius 8-12px), refined typography, soft shadow, micro-interactions.
- Inputs: refined typography, generous padding, soft border.
- Cards: rounded with soft shadow, fine typography, generous padding.
- Modals: rounded with refined backdrop, soft animation.

**wild-creative:**

- Buttons: variable — can be sharp, rounded, oversized, or signature-shaped.
- Inputs: variable — can be underlined, boxed, or signature-shaped.
- Cards: variable — can be asymmetric, oversized, or with custom shape.
- Tables: variable — can be card-based, grid-based, or scroll-driven.

### 3. State coverage

For every interactive surface, ensure all six states are present:

- **empty** — surface has no data yet; encourage the user with copy and action.
- **loading** — surface is fetching; use skeleton or spinner; never show stale data as fresh.
- **error** — surface failed; show inline error with recovery action; never silent fail.
- **success** — surface succeeded; confirm with subtle feedback; never over-celebrate.
- **offline** — surface is offline; show clear offline state; never show "data is missing" without explanation.
- **blocked** — surface is blocked (no permission, no plan, no key); show blocked state with path to unblock; never show "data is missing" without explanation.

Per direction, the state's visual treatment varies:

- `clean-minimal` — minimal, restrained, single-line copy.
- `warm-human` — friendly, encouraging, conversational.
- `brutalist` — raw, structural, no soft language.
- `premium-luxury` — refined, helpful, never panic.
- `wild-creative` — distinctive, intentional, never generic.

### 4. Motion

For every state change, use named motion tokens:

- `enter` — element appears (e.g., modal opens, toast slides in)
- `exit` — element disappears (e.g., modal closes, toast slides out)
- `hover` — interactive element hover state
- `on-screen` — element moves on-screen (e.g., dropdown opens, list reorders)
- `choreography` — coordinated multi-element motion (e.g., empty state appears, list staggers in)

Per direction, the duration and easing are constrained (see `capability.yaml → motion_tokens.duration_by_direction`).

Required:
- `prefers-reduced-motion: reduce` — disable non-essential motion, allow only essential state changes.
- `prefers-reduced-transparency: reduce` — disable glassmorphism, backdrop blur, and any transparency-dependent effect.

Forbidden:
- `animation: ... infinite` on common UI (only allowed for progress indicators that are clearly non-content).
- Random cubic-bezier easings.
- Random ms durations.

### 5. Replace hand-rolled SVG icons

Audit the host for inline `<svg>` paths. Replace with imports from the chosen icon library. The icon library is direction-defined in phase 1.

- `clean-minimal` → Phosphor
- `warm-human` → Phosphor (duotone or fill)
- `brutalist` → Tabler (1.5 stroke)
- `premium-luxury` → Phosphor (thin) or Hugeicons (line, 1.0)
- `wild-creative` → Hugeicons (bold) or custom

Bundle size audit: ensure only used icons are imported. Disable tree-shaking issues by importing from a known set.

## Proof gate

This phase is complete when:

- Every primary component is updated to the direction-specific pattern.
- Every interactive surface has all six states.
- Motion uses named tokens; no random cubic-bezier or random ms.
- prefers-reduced-motion + prefers-reduced-transparency media queries are implemented.
- No hand-rolled SVG paths remain in primary components.
- Bundle size audit shows no unused icon imports.
- Banned defaults audit no longer flags the host for any component, state, or motion violations introduced by this phase.

## Output

- Updated component files.
- Updated state files.
- `.buildprint/phase-03-receipt.md` listing components upgraded, states covered, motion tokens used, and icon library used.
- `.buildprint/screenshots/states/` with screenshots of all six states for at least 3 key surfaces.

## What this phase prevents

- LLM-default component patterns.
- Missing state coverage.
- Random motion.
- Hand-rolled SVG icons.
- Per-component hardcoded values (token regression).
- Inconsistent elevation and spacing.

## DO NOT

- Do not produce components without state coverage.
- Do not use random cubic-bezier easings.
- Do not use hand-rolled SVG icons.
- Do not introduce a new icon library mid-phase.
- Do not skip reduced-motion / reduced-transparency fallbacks.
- Do not over-celebrate success states.
- Do not silent-fail error states.
- Do not show generic "no data" for blocked or offline states.
