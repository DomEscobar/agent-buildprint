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
