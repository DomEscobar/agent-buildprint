# Phase 04 - Microcopy, Accessibility, Information Architecture

## Objective

Apply the direction's voice to every piece of microcopy in the host. Make the host accessible at WCAG 2.2 AA minimum. Record information architecture decisions. This phase is where the direction becomes audible and the host becomes usable for everyone.

## Why this phase exists

LLM-default microcopy is generic friendly. "Oops!", "Whoopsie!", "Whoops, something went wrong!" — these are not voice. Accessibility is often treated as a checklist. IA is often assumed, not decided. This phase forces opinionated voice, real accessibility, and explicit IA decisions.

## Inputs

- Updated components and states (from phase 3)
- Token files (from phase 2)
- `.buildprint/design-direction.yaml` (from phase 1)
- `.buildprint/host-assessment.md` (current microcopy, accessibility, IA)

## Steps

### 1. Voice guide

Write a 1-page voice guide for the direction. The guide must include:

- **Tone** — formal vs casual, warm vs cool, friendly vs reserved.
- **Vocabulary** — preferred words, banned words, domain-specific terms.
- **Sentence structure** — short vs long, imperative vs declarative, first-person vs third-person.
- **Specific phrases** — how to phrase errors, successes, blocked states, empty states, onboarding.
- **Examples** — 5 example error messages, 5 example empty states, 5 example onboarding lines.

Per direction:

- `clean-minimal` — direct, factual, restrained. "Failed to load. Retry" not "Oops! Something went wrong!"
- `warm-human` — first-person, conversational, encouraging. "We couldn't load this. Try again?" not "Failed to load."
- `brutalist` — raw, structural, no soft language. "ERROR: 500. RETRY" not "Something went wrong."
- `premium-luxury` — refined, helpful, never panic. "We hit a snag. Try again in a moment." not "Oops!"
- `wild-creative` — distinctive, intentional, never generic. The voice must have a POV.

### 2. Microcopy inventory

Audit the host for every piece of user-facing text:

- Error messages (per state)
- Empty state copy
- Loading state copy
- Success state copy
- Blocked / offline state copy
- Onboarding copy
- Tooltip copy
- Button labels
- Form labels and placeholders
- Modal titles and bodies
- Toast messages
- Notification copy
- Empty page titles

For each, replace with direction-appropriate copy that follows the voice guide.

Banned:
- "Oops!", "Whoopsie!", "Whoops"
- "Something went wrong."
- "Failed to load."
- "Error" (as a single word, unless brutalist)
- "We encountered an error." (corporate-speak)
- Generic friendly phrases that don't reflect the direction's voice

### 3. Accessibility

Run a Lighthouse audit and an axe audit. Address every issue. The minimum target is WCAG 2.2 AA, with AAA where achievable.

Required:

- `prefers-reduced-motion: reduce` — disable non-essential motion (already in phase 2/3, audit in phase 4).
- `prefers-reduced-transparency: reduce` — disable transparency-dependent effects.
- `prefers-color-scheme: dark` — if the host supports dark mode, ensure parity.
- Keyboard navigation for every interactive element.
- Focus visible on every interactive element.
- Color contrast WCAG AA (4.5:1 for body, 3:1 for large text and UI components).
- ARIA labels for icon-only buttons and non-text elements.
- Screen reader labels for every interactive element.
- Form labels associated with inputs.
- Error announcements for screen readers.
- `lang` attribute on `<html>`.
- Heading hierarchy (h1 → h6 in order).
- Skip link to main content.
- `aria-live` for dynamic content updates.

Per direction, accessibility targets may differ:

- `clean-minimal` — full AA, AAA where possible.
- `warm-human` — full AA, AAA for body text and primary actions.
- `brutalist` — full AA, high contrast (often AAA naturally).
- `premium-luxury` — full AA, AAA for body text.
- `wild-creative` — full AA, AAA where achievable without compromising the direction.

### 4. Information architecture

Document the IA decisions:

- **Nav structure** — flat, nested, or hybrid? Where do settings live? Where does profile live?
- **Hierarchy** — primary actions vs secondary actions. Where is the user directed first?
- **Density** — high (dashboard), medium (app), or low (marketing)?
- **Primary actions** — what is the user trying to do? Where is that action?
- **Discoverability** — how does the user find advanced features?

For each decision, record the choice and the rationale in `.buildprint/ia-decisions.md`.

### 5. Empty page audits

For every page in the host, audit the empty state:

- Does the page have meaningful empty state copy?
- Does the empty state have a clear next action?
- Does the empty state have a visual treatment that matches the direction?

## Proof gate

This phase is complete when:

- Voice guide written and applied to all microcopy.
- Microcopy inventory complete with no banned phrases.
- Lighthouse accessibility score ≥ 95.
- axe audit passes (no critical or serious issues).
- prefers-reduced-motion + prefers-reduced-transparency media queries audited.
- IA decisions recorded in `.buildprint/ia-decisions.md`.
- Every page has a meaningful empty state.

## Output

- `.buildprint/voice-guide.md`
- `.buildprint/microcopy-inventory.md`
- Updated microcopy across the host
- `.buildprint/ia-decisions.md`
- Lighthouse audit report
- axe audit report
- `.buildprint/phase-04-receipt.md`

## What this phase prevents

- Generic friendly microcopy.
- Banned phrases.
- Accessibility regressions.
- Hidden IA decisions.
- Inconsistent voice.
- Empty pages with no next action.
- Inaccessible state changes.

## DO NOT

- Do not use banned phrases.
- Do not skip accessibility audits.
- Do not produce microcopy without a voice guide.
- Do not leave IA decisions implicit.
- Do not skip the empty page audit.
- Do not use AAA-blocking patterns in directions that don't need them.
- Do not treat accessibility as a checklist — it is a design constraint.
