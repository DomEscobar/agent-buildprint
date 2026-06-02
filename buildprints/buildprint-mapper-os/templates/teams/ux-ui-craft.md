# ux-ui-craft

Purpose: prevent ugly, generic, static, or nonfunctional UI output.

This is an original Mapper OS skill capsule. It may be informed by public frontend-design skill patterns, but no third-party skill text is vendored into the Buildprint.

## Skill Capsule

Run this pass before frontend implementation and again before UI completion is claimed.

### Taste Variables

Set these values in the relevant phase `## UX/UI requirements` section for the selected product surface:

| Variable | Range | Meaning | Default |
|---|---:|---|---:|
| `AESTHETIC_DIRECTION` | named direction | utilitarian, editorial, industrial, playful, luxury, scientific, creative workbench, etc. | domain-fit |
| `VISUAL_DENSITY` | 1-10 | 1 is airy/editorial, 10 is dense/operator cockpit | 6 for tools, 4 for consumer |
| `MOTION_INTENSITY` | 1-10 | 1 is static, 10 is highly animated | 2 for enterprise, 4 for creative |
| `LAYOUT_VARIANCE` | 1-10 | 1 is strict grid, 10 is expressive/asymmetric | 3 for tools, 6 for editorial |
| `SURFACE_DEPTH` | 1-10 | 1 is flat, 10 is layered/shadowed | 3 unless domain needs depth |

Do not ask the user to choose these unless the product intent is genuinely ambiguous. Infer the safest domain-fit values and record them.

### Domain-Fit Rubric

- Operational tools: dense, quiet, fast to scan, restrained color, predictable navigation, compact controls.
- Creative tools: visual workspace first, canvas/preview/timeline prominence, inspector panels, media states, tactile controls.
- Consumer products: clear primary journey, emotion and brand moments, low cognitive load, polished empty states.
- Developer tools: terminal/log/code affordances, precise status, strong error recovery, low decoration.
- Data products: comparison, filtering, provenance, table/chart readability, export/report affordances.

### Composition Rules

- Start from the primary workflow, not from a decorative hero or generic dashboard shell.
- Put the main working surface in the first viewport.
- Use page sections for structure and cards only for repeated items, modals, or genuinely framed objects.
- Establish stable dimensions for boards, grids, toolbars, counters, canvases, and previews so dynamic text or states do not shift layout.
- Every visible control must have an owned behavior, disabled reason, or explicit blocker.

### Typography, Color, And Spacing

- Use type scale intentionally: compact UI panels need compact headings, not hero-scale text.
- Avoid one-note palettes and default purple/blue gradient looks unless product evidence demands them.
- Use spacing rhythm consistently; dense tools may be compact but cannot feel accidental.
- Text must not overflow, overlap, or hide adjacent content at mobile, desktop, or wide desktop sizes.
- Use accessible contrast and visible focus states.

### Interaction Polish

- Define hover, focus, disabled, loading, error, and success states for primary actions.
- Preserve user progress when operations fail.
- Use inline validation for forms and contextual error copy for failed workflows.
- Use motion only to clarify causality, state changes, or spatial relationships.

### Required Output

- Phase-local UX/UI requirements with screen inventory, workflows, state inventory, component inventory, responsive behavior, accessibility verification, and browser verification plan.
- Phase-local design quality bar with taste variables, product category, density/motion targets, visual hierarchy, forbidden generic patterns, screenshot requirements, accessibility gates, and responsive gates.
- Browser automation or screenshots for each user-facing flow before UI completion is claimed.
- Empty, loading, error, blocked, success, and partial-data states for every relevant workflow.

## Blocks

- Static markup counted as a working product.
- Generic dashboard cards that do not serve the selected domain workflow.
- Decorative hero or marketing layout used as the main screen for an operational app.
- Dead buttons, fake success states, or controls without owned behavior.
- Missing empty/loading/error/blocked/success states.
- Missing responsive behavior for supported viewports.
- Missing screenshot/browser verification for major UI states.
- Text overflow, overlapping UI, unreadable contrast, or invisible focus states.
