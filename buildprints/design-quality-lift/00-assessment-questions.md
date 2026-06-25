# 00 Assessment Questions

Hard-stop discovery questions. The applying agent must ask these questions after `00-host-assessment.md` and before `01-integration-plan.md`. Direction is a hard gate — the agent may not produce code without a locked direction.

## Hard-stop questions (must resolve before source edits)

Hard-stop answers must be `confirmed_by: user`, `confirmed_by: explicit_user_delegation`, or recorded as blockers. `agent_assumption` is invalid for hard-stop decisions.

### Q1. Design direction

The host's design quality lift must be direction-locked before any code is written. The v1 direction catalog is:

1. `clean-minimal` — Linear, Vercel, Stripe. Restrained, high info-density, single accent.
2. `warm-human` — Notion, Cron, Headspace. Friendly type, warm grays, soft motion.
3. `brutalist` — Swiss typography, raw structure, sharp contrast.
4. `premium-luxury` — Apple, Stripe (premium), Arc. Generous space, fine typography.
5. `wild-creative` — Nothing, Teenage Engineering, awwwards.com. Bold type, expressive motion, 3D.

The user must pick one of these, or describe a custom direction. Default is rejected. Asking the user is mandatory; inferring a default is forbidden.

### Q2. Three Dials

For the chosen direction, the user must set three dials (1-10 each):

- `DESIGN_VARIANCE` — 1 = perfect symmetry, 10 = artsy chaos.
- `MOTION_INTENSITY` — 1 = static, 10 = cinematic / physics.
- `VISUAL_DENSITY` — 1 = art gallery, 10 = cockpit / packed data.

The applying agent may suggest baseline values per direction (see `BUILDPRINT.md` and the direction profiles in `examples/`), but the user must confirm.

### Q3. Replace or augment existing components

Does the host want to replace its existing component library (e.g., replace Mantine with shadcn/ui), or augment and improve the existing one? The choice affects phase plan and risk surface.

- `replace` — destructive, requires user approval.
- `augment` — additive, lower risk.

### Q4. Visual risk budget

The chosen direction has a 1-3 visual risk budget (allowed rule breaks). The user must confirm or modify the budget. The risk budget is recorded in the receipt and audited in `verify.md`.

### Q5. Brand and voice

Does the host have a brand/voice guide? If not, the applying agent will define one as part of phase 4. If yes, the applying agent will use the existing one and only define direction-specific microcopy extensions.

### Q6. Icon library

Confirm the icon library per direction:

- `clean-minimal` → Phosphor
- `warm-human` → Phosphor (duotone or fill)
- `brutalist` → Tabler (1.5 stroke)
- `premium-luxury` → Phosphor (thin) or Hugeicons (line, 1.0)
- `wild-creative` → Hugeicons (bold) or custom

Confirm or override. The library is added as a dependency in phase 3.

### Q7. Accessibility target

The minimum is WCAG 2.2 AA. Does the host want AAA where possible? Note that AAA is not always achievable for color contrast in all directions (e.g., brutalist pure black/white passes AAA; warm-human soft contrast may not).

### Q8. Receipt proof level

What is the target proof level for the lift? See `capability.yaml` → `receipt.proof_levels`:

- `sandbox` — lift applied to a copy of the host in a sandbox.
- `host-applied` — lift applied to the real host on a branch.
- `production` — lift deployed to production.

Each level has different gate requirements. `production` requires real-host runtime evidence.

### Q9. 3rd-party integration paths

The following adapters are optional. Each is gated by the existing deterministic gates in `bin/agb.js` and `verify.md`. Confirm or defer:

- `taste-skill-adapter` — use taste-skill v2 SKILL as the brief inference + design system map engine.
- `animations-dev-adapter` — use animations.dev SKILL.md for motion theory.
- `spline-3d-adapter` — use Spline for 3D signature moment.
- `gsap-adapter` — use GSAP for kinetic typography and scroll hijacks only.
- `react-three-fiber-adapter` — use React Three Fiber for custom 3D in code.
- `phosphor-icons-adapter` — use Phosphor Icons as primary icon family.
- `hugeicons-adapter` — use Hugeicons (bold for wild-creative, fill for warm-human).
- `tabler-icons-adapter` — use Tabler Icons for brutalist.
- `designmd-format-adapter` — use designmd.ai DESIGN.md format for design contract delivery.

Default: `self-contained`, no adapter installed. Adopted paths must run behind the existing gates.

## Assumable defaults

The following are assumed unless the user objects:

- WCAG 2.2 AA minimum
- prefers-reduced-motion and prefers-reduced-transparency fallbacks
- Keyboard navigation for all interactive elements
- Focus-visible styles on all focusable elements
- Icon library from the direction profile (not hand-rolled SVG)
- Sans display font first (serif only when direction demands it)

## Deferrable questions

Do not block on:

- specific icon-by-icon decisions
- specific component-by-component decisions
- exact motion durations per element
- exact microcopy wording
- specific 3D model choice

Move deferrable items to `.buildprint/design-quality-lift-receipt.md`.

## 3rd-Party Integration Discovery (post-assessment)

After host assessment and before integration plan, ask the integration path discovery questions:

- is the host willing to install taste-skill v2 as a CLI skill? (`npx skills add ...`)
- is the host willing to install Phosphor / Hugeicons / Tabler as a dependency?
- for 3D directions: is the host willing to install Spline, GSAP, or React Three Fiber?
- is the host willing to commission or use premium stock illustrations?
- is the host willing to commit to WCAG AA or AAA accessibility audits?

If no adapter answers are confirmed, keep `proposed_integration_paths.decision = deferred` and stay on `self-contained`. If a path is adopted, set `decision` to the path id, document the adapter boundary, and update the receipt to record adapter presence/absence/version.

## Output

Write unresolved hard-stop questions and answers to `.buildprint/capability-plan.md` or `.buildprint/blockers.md`. If any hard-stop answer is missing, stop before `01-integration-plan.md`.
