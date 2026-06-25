# BUILDPRINT: design-quality-lift

> **A trace-aware, direction-locked, signature-required Capability Buildprint for grafting a holistic design quality lift onto an existing app — with banned defaults, per-direction creative moments, and before/after receipts at a named quality bar.**

This buildprint does not produce a product. It produces a design quality lift grafted onto an existing host. The host is your codebase; this buildprint is the contract that ensures the lift is real, evidence-backed, and direction-locked.

## What this is

A Capability Buildprint for `design-quality-lift`. It is composed of:

- **Five locked direction profiles** in v1: `clean-minimal`, `warm-human`, `brutalist`, `premium-luxury`, `wild-creative`.
- **Banned defaults list** that prevents the agent from producing LLM-default slop.
- **Three Dials** (DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY) per direction.
- **Required signature moment** per direction with a 1-3 rule-break visual risk budget.
- **Phase plan** (brief → tokens → components/states/motion → microcopy/a11y/IA → signature moment + receipts).
- **Receipt contract** that demands before/after screenshots, lighthouse, axe, microcopy and motion inventories.
- **Optional 3rd-party adapters** behind existing gates: taste-skill, animations.dev, Spline, GSAP, React Three Fiber, Phosphor, Hugeicons, Tabler, designmd.ai.

## What this is not

- It is not awwwards.com hand-crafted art direction. That requires a designer with a vision and weeks of work. This buildprint is a 95%-use-case tool for product UI design excellence.
- It is not a UI component library. The host already has components; this buildprint upgrades them.
- It is not an LLM default-override wrapper. Banned defaults are enforced, not hidden.

## Read order

1. `BUILDPRINT.md` (this file) — canonical start.
2. `capability.yaml` — machine-readable contract.
3. `compatibility.md` — host compatibility and composition rules.
4. `00-host-assessment.md` — audit-first protocol on existing projects.
5. `00-assessment-questions.md` — hard-stop discovery questions.
6. `01-integration-plan.md` — plan the lift.
7. `apply.md` — apply the buildprint to the host.
8. `02-implementation-phases/01..05` — the five phases.
9. `verify.md` — verify the lift.
10. `README.md` — human overview.
11. `examples/` — concrete artifacts.
12. `references/research-basis.md` — prior art and research.

## Architecture (this is not a whole-product phase plan)

This is a phased capability grafting protocol. The phases are:

1. **Brief & Direction Discovery** — read industry, audience, vibe, references; lock a direction profile; record three dials; produce the design read in one line.
2. **Token System & Visual Foundation** — color, type, space, radius, elevation, motion tokens; typography pairing; icon system.
3. **Components, States, Motion** — direction-specific component patterns; every interactive surface has empty/loading/error/success/offline/blocked states; motion uses named tokens with reduced-motion fallback.
4. **Microcopy, Accessibility, IA** — voice guide and error/empty/onboarding copy; WCAG 2.2 AA minimum, keyboard nav, focus visible, screen reader labels; nav, hierarchy, density decisions.
5. **Signature Moment & Receipts** — produce the direction's required signature moment; visual risk budget audit; before/after screenshots, lighthouse, axe, microcopy and motion inventories.

The applying agent must follow these phases in order. No source edits before host assessment and capability plan. Skipping or merging phases is a hard gate violation.

## Hard gates (PASS blockers)

- Direction profile is locked in `.buildprint/design-direction.yaml` and cited in the receipt.
- Banned defaults are absent (regex audit passes).
- Three Dials are recorded in the receipt.
- Direction's required patterns are present.
- Direction's signature moment is implemented and provable (screenshot or interaction evidence).
- prefers-reduced-motion + prefers-reduced-transparency fallbacks are in place.
- Lighthouse accessibility score ≥ 95.
- axe audit passes.
- No hand-rolled SVG icons (icon library is used).
- No Inter + slate-900 as universal default.
- Sans display font first (serif only when direction explicitly demands it).
- Receipt exists with all required outputs.

## Forbidden patterns (auto-FAIL)

- Direction-less default output (no direction profile locked).
- LLM-default typography (Fraunces / Instrument_Serif / Inter + slate-900 as universal).
- AI-purple gradients, centered hero + dark mesh, three equal feature cards, generic glassmorphism on everything.
- Hand-rolled SVG icons.
- Random cubic-bezier or random ms durations instead of named motion tokens.
- Generic friendly microcopy without a voice guide.
- Infinite-loop animations on common UI.
- Skipping prefers-reduced-motion / prefers-reduced-transparency.
- Skipping the receipt.
- "Sieht jetzt schöner aus" without inventory.

## Five v1 directions

| Direction | Signature Moment | 3D Role | Icon System | Map |
|---|---|---|---|---|
| clean-minimal | typografischer Hero-Moment | forbidden | Phosphor | taste-skill/minimalist-skill |
| warm-human | menschen-gemachter Moment | optional | Phosphor duotone | taste-skill/soft-skill |
| brutalist | raw strukturelle Aussage | forbidden | Tabler | taste-skill/brutalist-skill |
| premium-luxury | feine Detail Aussage | recommended | Phosphor thin | taste-skill/high-end-visual-design |
| wild-creative | unerwartete Interaktion | required | Hugeicons bold | taste-skill/image-to-code-skill + gpt-tasteskill |

Full profile specification lives in `examples/direction-profiles-v1.yaml` and the source research artifact under `references/research-basis.md`.

## Local checkpoints

Run these locally before claiming the lift is installed:

- `node bin/agb.js packet check buildprints/design-quality-lift` — packet structure.
- `npm run check:capabilities` — all capabilities check.
- `npm run check:capability:regressions` — regression tests for the new buildprint.
- A `npm run check:design-quality-lift` (when added) — direction-specific gates against an applied host.

## Composition and conflicts

**Composes with:** `ui.proof-harness`, `agentic-chat-eval-harness`, `ai-presentation-generation`, `design-system-installer`, `capability-buildprint-standard`.

**Conflicts with:** "ship fast, looks matter nicht" culture, hosts without browser-proof-path, hosts without test runner, LLM-default-driven UI generation without direction lock, serious-b2b-only with no creative latitude.

## DO NOT

- Do not lock a direction without giving the user the choice.
- Do not produce output without a `design read` line in the receipt.
- Do not grade the lift on the final result alone — receipts must include trace (before/after screenshots, lighthouse, axe, motion inventory).
- Do not claim "premium" without a custom illustration or signature transition.
- Do not claim "creative" without a signature moment and a visual risk budget.
- Do not produce LLM defaults because they're easy.

## Safety

Direction is a hard-stop discovery question. The agent must ask the user to pick a direction (or describe a custom direction) before producing any code. The agent may not assume a default direction.

Custom directions must derive their forbidden patterns, required patterns, signature moment, and visual risk budget from the user's brief — they may not be a renamed existing direction.
