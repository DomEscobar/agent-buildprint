# 02 UI/UX Decision

UX is a must. It matters as much as the implementation because the user only experiences the artifact through its surfaces, states, copy, controls, motion, and feedback. A powerful backend hidden behind a confusing, generic, or ugly interface is not a finished product. The experience must be understandable, intentional, and coherent before later phases claim progress.

Small checklist before writing the style constitution:

- Can a first-time user understand what this artifact is, what to do first, and what state it is in?
- Does the visual direction feel intentionally designed for this artifact rather than copied from a generic dashboard?
- Are colors, typography, spacing, components, and motion defined concretely enough for another agent to implement consistently?
- Are empty, loading, error, and blocked states understandable without reading logs or source code?
- Are all visible controls expected to work, validate, navigate, or explain a blocker?
- Would a demanding human call this product surface polished, or just “technically present”?

This file is the style constitution for every human-facing surface. It must force a clear visual world before implementation starts. Do not write short phrases like “clean UI” or “modern dashboard.” Write a detailed design schema that later phases can obey without guessing.

For non-UI libraries/services, write `not-ui-bearing` and describe the developer/operator experience with the same level of specificity: command shape, output formatting, error tone, docs style, and interaction rhythm.

## 0. Autonomous design decision protocol

If no upstream visual direction exists, do not leave the UI undecided and do not ask the implementation phase to improvise silently. The builder must reason from product purpose, user workflow, artifact type, audience, density, risk, and expected review proof, then write the resulting decisions into the implementation project's local design notes before implementation. A missing brand guide, missing color palette, missing typography choice, or missing layout reference is a prompt to decide precisely, not permission to ship a generic interface.

Before building UI, the generated packet must force the implementing agent to record at least these decisions in local project notes or the phase handoff:

- product mood in one concrete sentence, tied to the task the user is trying to finish;
- chosen style direction, including what adjacent styles are rejected and why;
- color tokens with exact values for background, surfaces, borders, main text, secondary text, primary action, secondary accent, success, warning, danger, blocked, and focus;
- typography tokens with exact sizes, line heights, weights, and where each token is used;
- layout model for desktop and mobile, including navigation, primary work surface, secondary panels, scroll ownership, fixed-format regions, and overflow behavior;
- component language for controls, cards, tables/lists, graphs/charts, inspector panels, modals/drawers, empty states, loading states, blocked states, and errors;
- proof obligations: screenshots, viewport assertions, no-overlap checks, long-text fixtures, and content-specificity checks.

These decisions must be written before implementation because the first UI pass should already be aiming at a coherent product, not discovering the design accidentally through patches.

Use the proof obligations selectively. A CLI may need operator output, error, and recovery style instead of screenshots. A single-viewport kiosk may need fixed-size framing instead of mobile proof. A generative editor may need long-content and content-specificity stress. The rule is precise fit: choose the proof that would reveal the artifact's most likely quality failure, and record why omitted UI proofs are not applicable.

## How to implement this decision

Before UI code, read:

- `BUILDPRINT.md`
- `01-project-setup.md`
- current project `AGENTS.md`

Then write a full visual and interaction contract for this artifact. The result must be detailed enough that another coding agent can implement the same aesthetic in later phases. If the file could apply unchanged to ten unrelated products, it is too generic and must be rewritten.

## Required style constitution

Write the following sections in complete, specific paragraphs. Do not leave placeholders. Do not use only bullet labels.

### 1. Design thesis

Describe what the artifact should feel like and what it must not feel like. Name the emotional and professional impression: calm intelligence, cinematic command center, editorial precision, playful creative canvas, industrial reliability, luxury operating system, soft human workspace, etc. Explain why this style fits the product and user.

### 2. Chosen style direction

Pick one strong direction and commit to it. Examples: glassmorphism intelligence lab, Swiss precision dashboard, dark cinematic control room, soft clay workspace, brutalist developer console, warm editorial notebook, playful creative studio, luxury AI operating system. The chosen direction must be specific to the artifact, not a default preference.

### 3. Color system

Define concrete color tokens, not vague adjectives. Include background, surface, elevated surface, border, primary, accent, success, warning, danger, text-main, text-muted, and focus ring. Explain when each color is used and what color relationships are forbidden. If gradients/glow/noise are part of the look, define them.

### 4. Typography system

Define heading, body, metadata/code, and label treatment. Describe font personality, scale, weight, line-height, tracking, and when text should feel spacious or compact. If exact fonts are unknown, describe the character of the fonts and acceptable fallbacks. Avoid default-looking typography unless the chosen style intentionally requires it.

### 5. Layout and spatial rhythm

Define the main layout model: split pane, canvas workbench, command palette, document flow, cards, sidebar, timeline, inspector, etc. Specify spacing rhythm, density, grid behavior, hierarchy, and responsive behavior. Say what should be visually dominant on the first screen.

### 6. Component language

Describe how buttons, inputs, panels, cards, navigation, tables/lists, charts/graphs, inspectors, modals, toasts, and status chips look and behave. Include border radius, shadows, blur, outlines, hover/active/disabled states, and how selected/blocked/error states appear.

### 7. Motion and interaction feel

Define motion principles: calm fade, elastic spring, cinematic slide, instant utilitarian response, hover lift, graph pulse, timeline progress, loading shimmer, etc. Motion must clarify state and control, not decorate randomly. Include reduced-motion expectations.

### 8. Empty, loading, error, and blocked states

Define exact state language and visual treatment. Empty states should teach the next action. Loading states should communicate what is being processed. Error states should explain cause and recovery. Blocked states should be honest about missing credentials, runtime, permissions, provider, data, or deployment.

### 9. Anti-generic rules

List what is forbidden for this artifact: generic white SaaS dashboard, default Tailwind starter look, unstyled browser controls, random gradients, inconsistent radii, low contrast, decorative charts, fake activity feeds, placeholder icons, raw JSON dumps as main UI, dead tabs, functionless buttons, optimistic success with no runtime proof, and any style that contradicts the design thesis.

### 10. Phase obligation

State that every later phase touching UI must preserve this style schema. If a phase adds a component, it must use the tokens, typography, spacing, component language, motion, and state rules here. If implementation drifts into generic UI, the agent must repair the UI before advancing.

## Minimum proof before moving on

- The style constitution is detailed enough to guide implementation without guessing.
- Concrete color tokens and typography rules are recorded.
- Main layout, component language, motion, and state behavior are specified.
- Applicable typed UI proofs from `blueprint.yaml` are selected: viewport, no-overlap/no-clipping, long-content stress, semantic output specificity, or operator/developer experience.
- Anti-generic rules are explicit.
- Later phases are instructed to obey this style schema before claiming progress.

## DO NOT

- Do not write only short phrases, moodboard words, or generic labels.
- Do not say “modern, clean, intuitive” without concrete visual rules.
- Do not use placeholder cards, lorem ipsum, fake activity feeds, inert tabs, decorative charts, or static graph bubbles.
- Do not treat raw JSON as the main experience unless the artifact is explicitly a developer JSON tool.
- Do not hide provider/runtime/deployment blockers behind optimistic success UI.
- Do not claim polished from colors alone; interaction, hierarchy, motion, copy, and state behavior matter.
