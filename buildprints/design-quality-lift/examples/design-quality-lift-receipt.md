# Design Quality Lift Receipt — Example

This is an example receipt for a clean-minimal direction lift. When applying the buildprint, copy this template to `.buildprint/design-quality-lift-receipt.md` and fill in the values.

## Direction lock

- **Direction:** `clean-minimal`
- **Locked at:** 2026-XX-XX
- **Locked by:** user-confirmed after assessment questions
- **Design read:** Reading this as: B2B SaaS app for technical buyers, with a Linear-style minimalist language, leaning toward Tailwind utilities + Geist + restrained motion.

## Three Dials

| Dial | Value | Range | Direction default |
|---|---|---|---|
| DESIGN_VARIANCE | 5 | 1-10 | 5-6 |
| MOTION_INTENSITY | 3 | 1-10 | 3-4 |
| VISUAL_DENSITY | 3 | 1-10 | 2-3 |

## Visual risk budget

- [x] asymmetric_grid_in_one_section — used in `/sections/case-studies`
- [x] oversized_single_quote_in_one_hero — used in `/hero`
- [ ] mono_accent_bleed_in_one_moment — not used

## Typography pairing

- display: Geist
- body: Geist
- mono: Geist Mono

## Icon library

- Library: Phosphor
- Weight: regular
- Stroke: 1.5 equivalent
- Hand-rolled SVG paths: 0 (none in primary components)

## Signature moment

- Type: typografischer Hero-Moment
- Surface: marketing landing hero
- Description: oversized single quote in custom sans-display, paired with quiet body text
- Proof: .buildprint/screenshots/after/hero.png
- Verified by: visual review + interaction check

## Before / after screenshots

| Surface | Before | After |
|---|---|---|
| Hero | before/hero.png | after/hero.png |
| Dashboard | before/dashboard.png | after/dashboard.png |
| Settings | before/settings.png | after/settings.png |
| Empty state | before/empty.png | after/empty.png |
| Login | before/login.png | after/login.png |

## Lighthouse audit

- Date: 2026-XX-XX
- Score: 98
- Categories: accessibility 100, best-practices 100, SEO 95
- Run: `npx lighthouse https://example.com --output=json`

## axe audit

- Date: 2026-XX-XX
- Critical issues: 0
- Serious issues: 0
- Moderate issues: 0
- Minor issues: 2 (recorded, not blocking)
- Run: `npx @axe-core/cli https://example.com`

## Microcopy inventory

| Surface | Copy | Voice attribution |
|---|---|---|
| Error (network) | "Failed to load. Retry." | direct, factual, restrained |
| Empty (inbox) | "No messages yet." | direct, factual, restrained |
| Loading (list) | "Loading…" | direct, factual, restrained |
| Blocked (settings) | "Available on Pro." | direct, factual, restrained |
| Onboarding (welcome) | "Welcome. Set up your account." | direct, factual, restrained |

## Motion inventory

| Surface | Trigger | Type | Duration | Easing | Reduced-motion fallback |
|---|---|---|---|---|---|
| Modal | open | enter | 120ms | ease-out | instant |
| Modal | close | exit | 120ms | ease-out | instant |
| Toast | open | enter | 120ms | ease-out | instant |
| Toast | close | exit | 120ms | ease-out | instant |
| Dropdown | open | enter | 120ms | ease-out | instant |
| Button | hover | hover | 80ms | ease | instant |
| Link | hover | hover | 80ms | ease | instant |

## Banned defaults audit

| Default | Status | Location |
|---|---|---|
| llm-default-serif-display | not present | n/a |
| llm-default-inter-slate | not present | n/a |
| ai-purple-gradient | not present | n/a |
| centered-hero-dark-mesh | not present | n/a |
| three-equal-feature-cards | not present | n/a |
| hand-rolled-svg-icons | not present | n/a |
| generic-friendly-microcopy | not present | n/a |
| infinite-loop-animations | not present | n/a (only progress indicators) |
| random-cubic-bezier | not present | n/a |

## Accessibility

- WCAG 2.2 AA: pass
- WCAG 2.2 AAA where achievable: pass for body text
- prefers-reduced-motion fallback: implemented
- prefers-reduced-transparency fallback: implemented
- Keyboard navigation: 100% of interactive elements
- Focus visible: 100% of interactive elements
- Screen reader labels: 100% of icon-only buttons

## Information architecture

Recorded in `.buildprint/ia-decisions.md`. Nav structure: flat. Hierarchy: dashboard → workspace → project. Density: high (dashboard), medium (workspace), low (marketing).

## 3rd-party path decision

- Decision: deferred (self-contained)
- Adopted paths: none
- Rationale: host does not require external adapters; tokens and components are self-authored.

## Proof level

- sandbox / host-applied / production: pick one
- Evidence: see receipts above

## User approval

- Approved by: <user>
- Date: 2026-XX-XX
- Notes: any conditions or follow-up

## DO NOT

- Do not modify this receipt after user approval.
- Do not add to this receipt without re-running the verify checks.
- Do not claim the lift is installed before the user has approved.
