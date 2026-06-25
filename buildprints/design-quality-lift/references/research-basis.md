# Research Basis

This buildprint is grounded in prior art and current techniques. The list below is not exhaustive; it is the basis for the buildprint's direction profile, banned defaults list, and motion language.

## Primary sources

### Leonxlnx/taste-skill v2 SKILL.md
- URL: https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md
- URL: https://www.tasteskill.dev/
- Was: Anti-slop frontend skill for AI agents. v2 SKILL.md with §0 Brief Inference, §1 Three Dials (DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY), §2 Brief→Design System Map, §3 Default Architecture (React/Next + Tailwind v4 + Motion), §4 Design Engineering Directives.
- Adoption in this buildprint:
  - §0 Brief Inference → 00-assessment-questions.md direction discovery
  - §1 Three Dials → direction profile three_dials field
  - §2 Brief → Design System Map → capability.yaml composes_with
  - §3 Default Architecture → direction profile architecture hints
  - §4 Banned Defaults → capability.yaml banned_defaults
  - §4 Sans-first typography → direction profile typography_pairing
  - §4 Phosphor/Hugeicons/Radix → direction profile icon_system

### animations.dev (Emil Kowalski)
- URL: https://animations.dev/
- Was: Animation theory course (Linear Design Engineer, ex-Vercel) with SKILL.md for coding agents. Quick Start rules: ease-out for enter/exit, ease-in-out for on-screen, ease for hover, "don't animate 100+ times daily things".
- Adoption in this buildprint:
  - Quick Start rules → capability.yaml motion_tokens.easing
  - "Don't animate 100+ times daily things" → capability.yaml motion_tokens.when_not_to_animate
  - Per-direction duration tokens → capability.yaml motion_tokens.duration_by_direction

### Spline
- URL: https://spline.design/
- Was: Browser-based collaborative 3D design platform. Real-time 3D for web, Variables+Data, States+Events, multi-platform export.
- Adoption in this buildprint:
  - 3D signature moment for warm-human (optional), premium-luxury (recommended), wild-creative (required).
  - 3rd-party adapter `spline-3d-adapter` in capability.yaml proposed_integration_paths.

### Phosphor Icons
- URL: https://phosphoricons.com/
- Was: Flexible icon family with multiple weights (thin, light, regular, bold, fill, duotone).
- Adoption in this buildprint:
  - Primary icon library for clean-minimal, warm-human, premium-luxury.
  - Direction profile icon_system = phosphor (with weight variant per direction).

### designmd.ai (Google DESIGN.md format)
- URL: https://designmd.ai
- Was: Library of DESIGN.md files (Google's open format) for AI coding tools.
- Adoption in this buildprint:
  - Optional 3rd-party adapter `designmd-format-adapter` in capability.yaml proposed_integration_paths.

## Secondary sources

### Lucide Icons
- URL: https://lucide.dev/
- Status: taste-skill says "Discouraged as default. Acceptable only when the user explicitly asks for it or the project already depends on it."
- Adoption in this buildprint: not recommended. Listed as fallback only.

### Hugeicons
- Was: Icon family with multiple weights and styles.
- Adoption in this buildprint:
  - Bold for wild-creative, fill for warm-human, line for premium-luxury.

### Tabler Icons
- Was: Stroke 1.5 line art icons.
- Adoption in this buildprint:
  - Primary for brutalist (matches the raw, structural aesthetic).

### GSAP
- URL: https://gsap.com/
- Was: JavaScript animation library for professionals.
- Adoption in this buildprint:
  - Optional 3rd-party adapter `gsap-adapter` for kinetic typography and scroll hijacks only (per taste-skill scope).

### React Three Fiber
- URL: https://r3f.docs.pmnd.rs/
- Was: React renderer for Three.js.
- Adoption in this buildprint:
  - Optional 3rd-party adapter `react-three-fiber-adapter` for custom 3D in code (wild-creative, premium-luxury).

### Typewolf
- URL: https://www.typewolf.com/
- Was: Typography trending reference.
- Adoption in this buildprint: research basis for typography pairings.

## Reference apps per direction

| Direction | Reference apps | Why |
|---|---|---|
| clean-minimal | Linear, Vercel, Stripe, Notion (calm) | restrained typography, single accent, dense, calm |
| warm-human | Notion (warm), Cron, Headspace | friendly type, warm grays, soft motion |
| brutalist | Vercel docs (brutalist), Bauhaus, Swiss typography | raw structure, sharp contrast, mono presence |
| premium-luxury | Apple, Stripe (premium), Arc | generous space, fine typography, custom details |
| wild-creative | Nothing, Teenage Engineering, awwwards.com | bold type, expressive motion, 3D |

## Banned defaults basis

The banned defaults list in `capability.yaml` is grounded in taste-skill v2 §0.D (anti-default discipline) and §4 (design engineering directives):

- AI-purple gradients, centered hero + dark mesh, three equal feature cards → AI defaults.
- Fraunces / Instrument_Serif as display default → AI tell.
- Inter + slate-900 as universal → AI default sans + color.
- Hand-rolled SVG → amateur / lazy.
- Generic friendly microcopy ("Oops!", "Whoopsie!") → no voice.
- Infinite-loop animations on common UI → distracting.
- Random cubic-bezier → not named tokens.

## Motion language basis

The motion tokens are grounded in:

- animations.dev: ease-out for enter/exit, ease-in-out for on-screen, ease for hover.
- taste-skill §4 motion directives.
- Per-direction duration: 120ms (clean-minimal), 320ms (warm-human), 100ms (brutalist), 400ms (premium-luxury), 700ms (wild-creative).

## Acknowledgments

- Emil Kowalski (animations.dev, Linear, Vercel) for animation theory and SKILL.md.
- Leon (Leonxlnx, taste-skill) for the anti-slop framework and direction-specific skills.
- The Phosphor, Hugeicons, Tabler Icons, and Lucide teams for icon systems.
- Spline team for browser-based 3D design.
- The community behind taste-skill and animations.dev for ongoing improvements.

## How to extend this research

When new prior art emerges:

1. Add a new entry to this file with URL, summary, and adoption in this buildprint.
2. Update `capability.yaml` if the new prior art changes a profile, banned default, or motion token.
3. Update direction profile YAML if the new prior art changes a direction's signature moment, typography, or icon system.
4. Update `verify.md` if the new prior art introduces a new gate.
5. Re-run all checks: `npm run check:capabilities`, `npm run check:capability:regressions`.

## DO NOT

- Do not claim a research basis without a verified URL.
- Do not list a tool as adopted without a concrete adoption in this buildprint.
- Do not let research basis outrun implementation. If a source is listed here, it must be reflected in the buildprint's profiles, gates, or recipes.
