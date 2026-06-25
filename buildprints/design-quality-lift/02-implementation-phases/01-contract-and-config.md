# Phase 01 - Brief and Direction Discovery

## Objective

Lock the design direction before any code is written. Produce a one-line `design read` that captures industry, audience, vibe, and reference language. Lock a direction profile (one of the 5 v1 profiles or a custom direction) with three dials, a typography pairing, an icon library, and a visual risk budget. This phase is the foundation for every subsequent phase.

## Why this phase exists

LLM-driven UI generation defaults to LLM-default aesthetics (Inter + slate-900, AI-purple gradient, centered hero, three equal feature cards, generic glassmorphism). To prevent this, the agent must read the room first, then lock a direction. Without a direction lock, the agent will fall back to defaults and the lift will not be installed.

## Inputs

- `.buildprint/host-assessment.md` (from `00-host-assessment.md` protocol)
- `.buildprint/screenshots/before/` (at least 5 before-screenshots)
- `.buildprint/audit-inventory.md` (microcopy, motion, icon, color inventory)
- `.buildprint/banned-defaults-audit.md` (list of banned defaults currently present)

## Steps

### 1. Read the brief

Extract from the user's brief or the host's product context:

- **Page kind** — landing, app, dashboard, settings, content, marketing, agency, event, portfolio, redesign, editorial, blog.
- **Audience** — B2B procurement, design-conscious consumer, recruiter, end-user, technical buyer.
- **Vibe** — minimal, calm, Linear-style, premium, Apple-y, playful, Awwwards, brutalist, editorial, agency-y, dark tech, warm, serious B2B.
- **References** — URLs, screenshots, products the user named, brands they compete with.
- **Brand assets** — logo, color, type, photography, illustration that already exist.
- **Quiet constraints** — accessibility-first, public-sector, regulated, trust-first commerce.

### 2. Produce a one-line design read

Before any code, state in one line: `Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>.`

Examples:
- "Reading this as: B2B SaaS app for technical buyers, with a Linear-style minimalist language, leaning toward Tailwind utilities + Geist + restrained motion."
- "Reading this as: solo designer portfolio for hiring managers, with an editorial / kinetic-type language, leaning toward native CSS + scroll-driven animation + custom typography."
- "Reading this as: redesign of a public-sector service site, with a trust-first language, leaning toward GOV.UK Frontend or USWDS."

### 3. Lock a direction

Choose one of the 5 v1 directions (or describe a custom direction). The choice is binding for the entire lift.

Write the choice to `.buildprint/design-direction.yaml`:

```yaml
direction: clean-minimal
three_dials:
  DESIGN_VARIANCE: 5
  MOTION_INTENSITY: 3
  VISUAL_DENSITY: 3
visual_risk_budget:
  - asymmetric_grid_in_one_section
  - oversized_single_quote_in_one_hero
typography_pairing:
  display: Geist
  body: Geist
  mono: Geist Mono
icon_library: phosphor
three_d_role: forbidden
```

### 4. Set the three dials

Per the chosen direction, set three dials (1-10):

- `DESIGN_VARIANCE` — 1 = perfect symmetry, 10 = artsy chaos
- `MOTION_INTENSITY` — 1 = static, 10 = cinematic / physics
- `VISUAL_DENSITY` — 1 = art gallery / airy, 10 = cockpit / packed data

Baseline values per direction:

| Direction | Variance | Motion | Density |
|---|---|---|---|
| clean-minimal | 5-6 | 3-4 | 2-3 |
| warm-human | 6-7 | 5-6 | 3-4 |
| brutalist | 3-4 | 1-2 | 5-6 |
| premium-luxury | 6-7 | 5-6 | 3-4 |
| wild-creative | 8-10 | 7-10 | 3-5 |

### 5. Define the visual risk budget

Per direction, choose 1-3 allowed rule breaks from the direction's risk budget list. Custom directions must define their own risk budget.

### 6. Lock the typography pairing and icon library

From the approved lists in `capability.yaml`. The pairing and library are recorded in the receipt.

## Proof gate

This phase is complete when:

- `.buildprint/design-direction.yaml` exists with all required fields.
- The one-line design read is recorded in the receipt.
- The user has confirmed the direction, dials, and risk budget.
- No source edits have been made yet.

## Output

- `.buildprint/design-direction.yaml`
- `.buildprint/design-read.txt` (one-line design read)
- Direction lock in the receipt draft.

## What this phase prevents

- LLM-default aesthetics (the direction lock forces opinionated choices).
- Mid-flight direction changes (the lock is recorded and cited in the receipt).
- Generic friendly microcopy (direction forces a voice).
- Random motion (direction forces named tokens).
- Inter + slate-900 as universal default (typography pairing is locked).

## DO NOT

- Do not produce code before the direction is locked.
- Do not assume a default direction.
- Do not change direction silently mid-lift.
- Do not produce a "best practices" output that doesn't reference the direction.
- Do not skip the design read.
