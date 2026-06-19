# 02 UI Identity

UX is a must. It matters as much as implementation because the user only experiences the artifact through surfaces, states, copy, controls, motion, feedback, and proof. A powerful backend hidden behind a confusing, generic, or ugly interface is not a finished product.

This file runs after `01-project-setup.md` and before `03-phases/*`. Its job is not to hand the builder a pre-baked style sheet. Its job is to force high-reasoning UI identity work after the local harness and architecture baseline exist, but before scaffolding and phase code turn a weak product shape into permanent implementation.

## Why this comes after setup

Project setup must create the architecture baseline and local skill harness without doing identity work. The identity step then uses that harness, the selected architecture, and the product contract to make UI/UX decisions deliberately instead of mixing design reasoning into setup paperwork.

For UI-bearing artifacts, the builder must generate both local identity artifacts before starting any phase:

- `docs/ui-identity.md` or `UI-IDENTITY.md` — the product and interaction contract: product genre, dominant user job, first action, user-language map, screen states, action model, forbidden silhouettes, and screenshot-level product-fit acceptance.
- `docs/DESIGN.md` — the screen construction contract: visual thesis, exact semantic tokens, type scale, layout dimensions, component specs, state matrix, implementation mappings, screenshot acceptance, and exact visual bans.

For non-UI libraries/services, write `not-ui-bearing` and generate an equivalent developer/operator identity covering command shape, output formatting, error tone, docs style, and recovery flow. Do not collapse `docs/ui-identity.md` and `docs/DESIGN.md` into one file for UI-bearing products: a surface can be visually tasteful while violating the product genre, so both contracts must exist and remain distinct.

## Skill loading protocol

Before identity generation, load the local frontend skill created by setup:

- Prefer the active provider-specific copy only when an explicit provider created one. For the default provider, load `.agents/skills/frontend-ui-product-design/SKILL.md`.
- Also accept the portable `.agents/skills/frontend-ui-product-design/SKILL.md`.
- Read the skill's `SKILL.md`, then load only the references needed for this artifact. At minimum for UI-bearing artifacts, use `references/product-taste.md`, `references/preflight.md`, `references/screen-states.md`, `references/structural-variety.md`, `references/aesthetic-direction.md`, `references/design-tokens.md`, `references/component-states.md`, `references/mobile-hard-floor.md`, `references/screenshot-capture.md`, and `references/slop-review.md` when present.
- If the local frontend skill is missing, return to `01-project-setup.md` and initialize the project-local harness. Do not continue by improvising from memory.

## Product identity seed

- Product: Agentic Chat.
- Product genre: chat-native agent interface. The first screen must be mostly conversation plus a high-quality composer/input, not a mission brief, task dashboard, wizard, form-first workbench, or run-control console.
- Product-specific identity must reject generic dashboards, admin shells, proof consoles, renamed workbenches, card grids, right-inspector chat shells, and mission-control/guided-run shells that push chat below the primary viewport.
- Agentic action must live inside the chat loop. At the streaming-core maturity level the inline affordances are provider/route state, usage/trace disclosure, and retry/recovery buttons attached to the message or composer moment where they matter. At full `agentic_chat` maturity the same inline pattern expands to tool approval cards, memory decisions, restore points, action results, and delegation records. Design the pattern early, but do not ship empty or faked versions.

## Identity generation protocol

Before writing identity output, read:

- `BUILDPRINT.md`
- `00-questions.md`
- `01-project-setup.md`
- `blueprint.yaml`
- `docs/architecture.md`
- current workspace or target project `AGENTS.md` if present
- the local `frontend-ui-product-design` skill and relevant references

Then think deeply about the product, user, artifact type, golden path, central output, risk, density, review proof, and what a confused first-time user would misunderstand. Use the user's **design direction / visual wishes** answer from `00-questions.md` (aesthetic, brand/tone, reference products to emulate or avoid, density, light/dark intent) as the binding seed for this work; do not override it with a generic default. Generate a full local UI identity plan in the implementation project. Do not re-ask for visual direction that the design-direction hard-stop already captured; only ask when that answer is missing or a hard-stop says the product identity itself is unknown.

The generated identity and design system must be specific enough that a later agent can build the same product surface without guessing. If either file could apply unchanged to ten unrelated products, it fails.

The generated identity also fails if it can be satisfied by a generic dashboard, renamed workbench, card grid, admin shell, or proof console with better labels. First-run comprehension is necessary but not sufficient. The identity must name an artifact-specific product metaphor, dominant object, primary gesture/manipulation, forbidden default silhouette, and screenshot-level acceptance criteria.

## Required sections in the generated UI identity

Write the following sections in `docs/ui-identity.md` or `UI-IDENTITY.md` in complete, product-specific language:

1. Product identity thesis: what this product is in plain language, who it serves, what job the first screen must make obvious, and what it must not feel like.
2. Creative product concept: the artifact-specific metaphor, dominant object, primary gesture, moment-to-moment manipulation, and what emotional/operator affordance should make the surface feel like this product rather than a generic shell.
3. Silhouette rejection: the expected desktop/mobile layout silhouette and the forbidden default silhouette. Explicitly reject generic dashboard, renamed workbench, card grid, admin shell, proof console, and any old layout shape that could pass with labels/colors changed. Name the adjacent at-risk silhouette your own chosen layout is structurally closest to, and state the concrete structural and visual treatment that distinguishes your layout from it. Token, palette, copy, spacing, label, or icon changes do not count as a distinguishing treatment.
4. First-run comprehension contract: the exact first screen mental model, first action, visible state, and next action a non-technical user should understand within 10 seconds.
5. User-language map: translate internal/build/proof terms into user-facing terms, and list forbidden main-UI words. Internal terms may live only in docs, logs, dev panels, or clearly labeled diagnostics.
6. Chosen style direction: one named aesthetic direction (functional-minimal, editorial, warm-approachable, technical/terminal, or expressive) committed to concrete type, color, shape, and motion choices, plus the adjacent style rejected with reasoning tied to the artifact. A direction that reduces to "modern, clean, minimal" with no committed choices fails.
7. Layout model before stack: desktop and mobile region roles, primary task surface, supporting context, navigation, scroll ownership, fixed-format regions, and what must be visually dominant.
8. Screen-state contract: current task, dominant surface, visible-now surfaces, reachable-but-hidden surfaces, route/tab/drawer/modal placement, and what must not be visible together.
9. Interaction model: how users create, inspect, edit, recover, confirm, navigate, and understand blocked actions. Identify the primary gesture before secondary status/export actions.
10. Component language: controls, repeated items, detail regions, overlays, empty/loading/error/blocked states, selected states, density, radii, icon use, and feedback. Components support the product concept; they are not the concept.
11. Color and typography tokens: exact semantic color roles, readable typography scale, state colors, focus treatment, and forbidden palette pitfalls.
12. Content stress fixtures: long names, long titles, dense data, empty data, failed provider/runtime, failed persistence/export, and mobile/narrow cases the UI must survive.
13. Proof obligations: screenshots, screenshot delta review against prior/default builds when available, viewport checks, no-overlap/no-clipping, keyboard/focus checks where relevant, content-specificity checks, edit/readback proof, and blocked-state proof. Include an anti-silhouette distinctiveness screenshot check: compare the shipped first-screen screenshot against the forbidden silhouette and the named adjacent silhouette, and fail if the screenshot is indistinguishable from them once the copy is ignored. Mechanical checks alone (overlap, clipping, viewport, focus) do not satisfy this obligation.
14. Anti-generic rules: what must not appear in the main product surface, including generic shells, raw JSON dumps, proof-theater labels, dead controls, fake success, decorative-only views, unclear empty states, and internal status jargon.
15. Evidence binder requirements: every major UI identity claim must become a screenshot-checkable or source-checkable acceptance claim in `.buildprint/ui-evidence.md`. The binder must use machine-checkable rows or sections with these exact field labels: `claim:`, `evidence_type:`, `screenshot_path_or_file_line:`, `viewport_state:`, `nearest_bad_silhouette:`, `pass_fail:`, and `structural_difference:`. Each screenshot reference must point to a real `.buildprint/screenshots/` file, or each source reference must include a real `file:line`. Identity prose is not evidence.
16. Action surface gate: the first viewport must prove a user action loop stronger than "type and send." The evidence binder must name the next powerful user action, what the agent will do next, what visible state/result changes, what recovery/approval/memory action appears at the moment of need, and why status panels are subordinate to user progress.
17. Chat-native action gate: for Agentic Chat specifically, the dominant first viewport must remain a conversation thread and composer/input. The action loop must be embedded in chat-native affordances such as composer action chips, inline approval cards, inline memory save prompts, message-attached tool confirmations, and recovery suggestions. It fails if the primary surface becomes a mission sheet, guided-run form, task dashboard, status lane, or workflow console with the transcript pushed below the fold.
18. Design read and taste dials: include a one-line design read and 4-7 product-specific taste dials. For Agentic Chat, the dials must include chat dominance, composer polish, inline action naturalness, system-label suppression, empty-state restraint, mobile comfort, and consumer polish. Each dial needs a target value and a screenshot-checkable implication.
19. Consumer chat craft gate: the default first viewport must look like a polished chat product, not a harness demo. It fails if it shows seeded feature-demo action cards before user intent, a giant blank dead zone, internal status labels as primary UI, boxy uniform card treatment for every surface, cramped mobile chips/composer controls, or visible route/memory/provider state before the user needs it.

## Required sections in generated DESIGN.md

Write `docs/DESIGN.md` as a screen construction contract, not a moodboard, not a philosophical essay, and not a duplicate of `docs/ui-identity.md`. It must include these exact section names:

1. Visual Thesis: one short paragraph naming the product feel, first-viewport hierarchy, and rejected silhouette. This is the only atmospheric prose section.
2. Exact Tokens: a table with semantic token name, CSS variable name, exact value, functional role, and usage notes for canvas, surface, raised surface, border, text, muted text, primary, focus, success, warning, danger, spacing, radius, and elevation. Color rows must include exact hex/rgb/oklch values or cite `file:line` where the token is defined.
3. Type Scale: a table with role, font stack, size, weight, line-height, max width, and mobile adjustment for app title, message body, metadata, buttons, textarea/input, state labels, and code/trace text.
4. Layout Contract: concrete desktop, tablet, mobile, and narrow-mobile dimensions for regions, gutters, composer height, side/supporting rail behavior, fixed-format elements, scroll ownership, and responsive collapse. It must include numeric px/rem values or file:line references.
5. Component Specs: construction rules for every visible component family, including message bubble, composer/input, send button, inline action/approval, restore/recovery action, trace/details disclosure, supporting state rail, empty state, loading/streaming state, error state, blocked state, hover, focus-visible, active, disabled, selected, and saved states.
6. State Matrix: a table for empty, typing, streaming, blocked, error, saved, restored, offline/no-provider, and mobile/narrow states. Each row must define visible UI, forbidden UI, layout behavior, recovery/action affordance, and proof screenshot.
7. Implementation Mapping: cite the selectors, component names, or file:line references where each major token, layout region, and component spec is or will be implemented. Design claims without implementation mapping fail.
8. Screenshot Acceptance: list required screenshot paths or capture names for desktop default, tablet/streaming, mobile blocked, and narrow composer states, plus what each screenshot must prove. Generic "inspect mobile" prose is not enough.
9. Banned Patterns: exact bans for this artifact, including any palette, typography, container, card, icon, decoration, density, seeded-feature, proof-console, dashboard/workbench, raw JSON, provider-banner, or status-leak pattern that would make the surface generic.

## Minimum proof before moving to phases

- A local `docs/ui-identity.md` or `UI-IDENTITY.md` and a local `docs/DESIGN.md` exist for UI-bearing artifacts, or the artifact is explicitly marked `not-ui-bearing`. Missing local identity or missing local design system is a hard failure for `agb verify ui .`, critical review, and final handoff; do not treat either as advisory setup polish.
- The local frontend skill was loaded, or a missing-harness blocker routed back to `01-project-setup.md`.
- The identity includes a first-run comprehension contract.
- The identity names a creative product concept, product metaphor, dominant object, primary gesture, forbidden default silhouette, and screenshot-level acceptance criteria.
- The identity includes a screen-state contract with visible-now, hidden/reachable, placement, and visible-together exclusions.
- Internal/proof terms are translated or banned from the main UI.
- Layout and interaction are defined before phase scaffolding.
- Color, typography, component, and state rules are concrete enough to implement.
- Proof obligations name the checks that would catch the artifact's most likely UI failure, and include an anti-silhouette distinctiveness screenshot check that fails a build matching the forbidden or adjacent silhouette.
- `.buildprint/ui-evidence.md` exists and grounds identity, design, and action claims in structured fields: `claim:`, `evidence_type:`, `screenshot_path_or_file_line:`, `viewport_state:`, `nearest_bad_silhouette:`, `pass_fail:`, and `structural_difference:`. Screenshot references must point to real `.buildprint/screenshots/` files.
- The first viewport proves an action surface stronger than "type and send"; if the next powerful user action cannot be identified from screenshot evidence, return to UI identity and implementation before moving on.
- The first viewport proves a chat-native surface: conversation thread and composer/input are dominant, agentic actions are inline in the conversation/composer, and any mission brief, run lane, status panel, side rail, or workflow controls are subordinate. If screenshots show a form-first guided-run surface or chat below the fold, return to UI identity and implementation before moving on.
- The first viewport passes the Consumer Chat Craft Gate: no seeded approval/memory/restore cards before user intent, no giant blank dead zone, no internal status labels as first-screen primary copy, no boxy uniform card stack, no cramped mobile composer/chips, and no generic harness-demo empty state.
- `.buildprint/ui-evidence.md` records Design Read, Taste Dials, Consumer Chat Craft Gate verdict, screenshot paths/regions, and concrete repairs for any failed craft dial.

## DO NOT

- Do not treat this file as a fixed moodboard.
- Do not copy a style from another packet without reasoning from this product.
- Do not write only "modern, clean, intuitive", "dashboard", "studio", "workbench", or other borrowed UI labels.
- Do not accept an identity that can be implemented as a dashboard/workbench/card grid with palette, spacing, copy, icon, or label changes.
- Do not accept a chosen layout that is the forbidden or adjacent silhouette with only token, palette, copy, spacing, label, or icon changes; the distinguishing structural treatment must be named.
- Do not expose proof/evaluator/build terms in the main product UI unless the product is explicitly a developer tool.
- Do not replace the chat interface with a mission sheet, guided-run launcher, task dashboard, or status lane. For Agentic Chat, action UI enhances chat; it does not displace chat.
- Do not seed approval, memory, restore, tool, or provider cards before the user asks something. Agentic controls appear at the moment of need, not as empty-state feature advertising.
- Do not expose `local route`, `live route needs key`, memory counts, provider/setup status, or similar system labels in the default first viewport unless the user requested or triggered that capability.
- Do not accept a prose-only evidence binder, missing screenshot file references, or a default first viewport whose proof is limited to no-overlap/no-console-error checks.
- Do not let phases start until the identity plan exists, the artifact is explicitly `not-ui-bearing`, or a blocker is recorded.
