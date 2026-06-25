# Design Quality Lift

A Capability Buildprint for grafting a holistic design quality lift onto an existing app — with per-direction signature moments, banned defaults, and before/after receipts at a named quality bar.

## What this buildprint is

This buildprint does not produce a product. It produces a design quality lift grafted onto an existing app. The lift is:

- **Direction-locked** — one of 5 v1 directions (clean-minimal, warm-human, brutalist, premium-luxury, wild-creative) or a custom direction.
- **Banned-default-free** — no LLM-default typography, no AI-purple gradients, no hand-rolled SVGs, no generic friendly microcopy.
- **Signature-moment-required** — every direction has a required creative moment that escapes the generic.
- **Receipt-anchored** — before/after screenshots, lighthouse, axe, microcopy and motion inventories are the proof.
- **3rd-party-aware** — taste-skill, animations.dev, Spline, GSAP, React Three Fiber, Phosphor, Hugeicons, Tabler, designmd.ai are optional adapters behind the existing gates.

## What this buildprint is not

- It is not awwwards.com hand-crafted art direction. That requires a designer with a vision and weeks of work. This buildprint is a 95%-use-case tool for product UI design excellence.
- It is not a UI component library. The host already has components; this buildprint upgrades them.
- It is not a redesign in the strict sense. The host's product is preserved; only the visual + interaction quality is lifted.

## The five v1 directions

| Direction | Signature Moment | 3D Role | Icon | Map |
|---|---|---|---|---|
| clean-minimal | typografischer Hero-Moment | forbidden | Phosphor | taste-skill/minimalist-skill |
| warm-human | menschen-gemachter Moment | optional | Phosphor duotone | taste-skill/soft-skill |
| brutalist | raw strukturelle Aussage | forbidden | Tabler | taste-skill/brutalist-skill |
| premium-luxury | feine Detail Aussage | recommended | Phosphor thin | taste-skill/high-end-visual-design |
| wild-creative | unerwartete Interaktion | required | Hugeicons bold | taste-skill/image-to-code-skill + gpt-tasteskill |

Full profile specification lives in `examples/direction-profiles-v1.yaml`.

## Phases

1. **Brief & Direction Discovery** — design read in one line, direction locked, three dials set, risk budget chosen.
2. **Token System & Visual Foundation** — color, type, space, radius, elevation, motion tokens.
3. **Components, States, Motion** — direction-specific patterns, every interactive surface has all six states, motion uses named tokens.
4. **Microcopy, Accessibility, IA** — voice guide, microcopy inventory, WCAG AA minimum, IA decisions recorded.
5. **Signature Moment & Receipts** — direction's required signature moment with proof, before/after, lighthouse, axe, inventories.

## Hard gates (PASS blockers)

- Direction profile is locked.
- Banned defaults are absent.
- Direction's required patterns are present.
- Signature moment is implemented and provable.
- prefers-reduced-motion + prefers-reduced-transparency fallbacks are in place.
- Lighthouse accessibility score ≥ 95.
- axe audit passes.
- No hand-rolled SVG icons.
- Sans display font first (serif only when direction demands it).
- Receipt exists with all required outputs.

## 3rd-party adapters (optional, behind gates)

- `taste-skill-adapter` — taste-skill v2 SKILL as the brief inference + design system map engine.
- `animations-dev-adapter` — animations.dev SKILL.md for motion theory.
- `spline-3d-adapter` — Spline for 3D signature moment.
- `gsap-adapter` — GSAP for kinetic typography and scroll hijacks.
- `react-three-fiber-adapter` — React Three Fiber for custom 3D in code.
- `phosphor-icons-adapter` — Phosphor as primary icon family.
- `hugeicons-adapter` — Hugeicons (bold for wild-creative, fill for warm-human).
- `tabler-icons-adapter` — Tabler for brutalist.
- `designmd-format-adapter` — designmd.ai DESIGN.md format for design contract delivery.

## Read order

1. `BUILDPRINT.md` — canonical start.
2. `capability.yaml` — machine-readable contract.
3. `compatibility.md` — host compatibility.
4. `00-host-assessment.md` — audit-first protocol.
5. `00-assessment-questions.md` — hard-stop discovery questions.
6. `01-integration-plan.md` — plan the lift.
7. `apply.md` — apply the buildprint.
8. `02-implementation-phases/01..05` — the five phases.
9. `verify.md` — verify the lift.
10. `examples/` — concrete artifacts.
11. `references/research-basis.md` — prior art.

## Composition

- Composes with: `ui.proof-harness`, `agentic-chat-eval-harness`, `ai-presentation-generation`, `design-system-installer`.
- Conflicts with: "ship fast, looks matter nicht" culture, hosts without browser-proof-path, hosts without test runner, LLM-default-driven UI generation without direction lock, serious-b2b-only with no creative latitude.
