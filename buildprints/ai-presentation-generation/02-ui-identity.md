# 02 UI Identity

UX is a must. It matters as much as implementation because the user only experiences the artifact through surfaces, states, copy, controls, motion, feedback, and proof. A powerful backend hidden behind a confusing, generic, or ugly interface is not a finished product.

This file runs after `01-project-setup.md` and before `03-phases/*`. Its job is to force high-reasoning UI identity work after the local harness and architecture baseline exist, but before scaffolding and phase code turn a weak product shape into permanent implementation.

For UI-bearing artifacts, the builder must generate a local `docs/ui-identity.md` or `UI-IDENTITY.md` before starting any phase.

## Skill loading protocol

Before identity generation, load the local frontend skill created by setup:

- Prefer `.agents/skills/frontend-ui-product-design/SKILL.md` for the default provider.
- Read the skill's `SKILL.md`, then load only the references needed for this artifact, including `references/screen-states.md` when present.
- If the local frontend skill is missing, return to `01-project-setup.md` and initialize the project-local harness. Do not continue by improvising from memory.

## Identity generation protocol

Before writing identity output, read `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, `blueprint.yaml`, `docs/architecture.md`, current `AGENTS.md` if present, and the local `frontend-ui-product-design` skill. Then think deeply about the product, user, artifact type, golden path, central output, risk, density, review proof, and what a confused first-time user would misunderstand.

The generated identity must name an artifact-specific product metaphor, dominant object, primary gesture/manipulation, forbidden default silhouette, and screenshot-level acceptance criteria.

## Checklist

- The UI must make the generation pipeline understandable: configure, input, outline, template, generate, edit, refine, export.
- The slide canvas must be the dominant artifact, not a small preview hidden behind settings.
- Provider and export failures must be actionable, not vague.
- Controls must be compact, predictable, and reachable during repeated editing.
- Desktop proof is mandatory; mobile/responsive proof is required for setup/upload/dashboard flows and must be bounded for editor surfaces if a full canvas editor cannot be mobile-complete.

## Design Thesis

Build a dense but calm visual-document workbench. The product is not a marketing landing page and not a toy generator. It should feel like a private design operations tool: a left-to-right production flow, precise controls, visible progress, durable drafts, and a central slide surface that can be judged at a glance.

The memorable quality should be "controlled creative production": users see the deck becoming real while retaining professional control over outline, template, slide order, inline content, chat edits, and export readiness.

## Product identity thesis

The product is a private AI deck builder for people who need an inspectable and editable presentation, not a one-shot text generator. It serves users who want model control, privacy, and export ownership. The first screen must make the deck creation path obvious: configure provider if needed, provide prompt/documents, then move toward an outline and editable slides.

## Creative product concept

The product metaphor is a private deck foundry: input and provider readiness feed a production line, the outline is the blueprint, templates are molds, the slide canvas is the dominant object, and export is the inspected finished artifact. The primary gesture/manipulation is direct slide manipulation: select, inspect, edit, reorder, refine, and export. Moment-to-moment manipulation means the user is always adjusting a deck object, not chatting into a void. The emotional/operator affordance is controlled creative production. The interface must not feel like a generic dashboard, renamed workbench, card grid, admin shell, proof console, or chat-only generator.

## First-run comprehension contract

Within 10 seconds, a non-technical user should understand: "I configure my model access, provide prompt or documents, review the outline, choose a template, then edit and export a deck." The first visible action should be either provider setup if unconfigured or prompt/document creation if ready. The next action must be visibly reachable without reading docs.

## User-language map

Use "presentation", "deck", "slides", "outline", "template", "provider", "export", "saved", and "needs setup" in the main UI. Avoid internal terms such as proof, packet, phase, scaffold, deterministic fixture, fake success, typed gate, and evidence ledger in user-facing surfaces.

## Silhouette rejection

Desktop must be a workflow-to-canvas product, not a generic dashboard. The editor silhouette is header plus thumbnail rail plus central slide canvas plus optional chat/sidecar. Upload and outline screens may be guided forms, but they must still connect visually to the deck-building process. Mobile/narrow screens may collapse side rails, but they must preserve first action, provider state, and export/blocker clarity.

## Style Direction

Use a light professional workspace with neutral surfaces and a restrained purple accent inherited from the source product's settings and tab states. Avoid purple-gradient AI decoration. Purple is an interaction/accent color, not the whole brand world.

## Chosen style direction

Choose a precise operational studio direction: light, crisp, document-focused, and private-by-default. Reject playful toy generator, dark cinematic AI lab, beige editorial portfolio, purple gradient SaaS splash, and generic admin dashboard styles because they weaken trust in the editable deck artifact.

Recommended token direction:

Use exact semantic color roles rather than arbitrary palette names. State colors and focus treatment must be visible in disabled, loading, error, blocked, selected, and success states.

- `surface`: #FFFFFF
- `surface-muted`: #F7F8FA
- `surface-raised`: #FFFFFF
- `border`: #E5E7EB
- `text`: #171717
- `text-muted`: #6B7280
- `primary`: #5145CD
- `primary-soft`: #F4F3FF
- `focus`: #7E3AF2
- `danger`: #B42318
- `success`: #067647
- `warning`: #B54708

Use crisp border-separated panels, fixed toolbars, compact forms, and slide previews with stable dimensions. Do not put cards inside cards. Repeated artifacts such as presentation thumbnails, template cards, slide thumbnails, provider cards, and export rows may use cards with 8px radius or less.

## Typography

Use a readable workbench body font and a distinctive but restrained heading font only if loaded locally. The source uses local font wiring and presentation templates may carry their own typography, so the implementation must separate app UI fonts from slide template fonts.

- App body: legible sans-serif, 14-16px for controls and copy.
- Toolbars/sidebars: 12-14px labels.
- Slide canvas text: defined by template/theme, not by app chrome.
- Avoid viewport-scaled font sizes. Text must fit fixed controls.

## Layout Rhythm

## Layout model

The core editor should use a three-zone workbench:

- Header: presentation title, save/export status, theme/template controls, present mode, export actions.
- Left rail: stable slide thumbnails with selected state, reorder affordance, add-slide action.
- Center canvas: current slide with exact aspect framing, loading/error boundary, inline editable regions, and visual theme application.
- Right sidecar: chat/refinement, slide-specific actions, provider/export state when relevant.

The upload and outline flows can be more guided, but they must still feel like product surfaces:

- Upload: prompt/document input, slide/language/tone/verbosity settings, provider summary, and validation messages.
- Outline: tabs for outline/content and template selection, fixed generate action, streaming progress, editable outline rows.
- Dashboard: presentation list with draft status, created/updated dates, first-slide preview, delete/duplicate actions, and empty/loading/error states.

## Component Language

- Use icons in buttons for edit, export, present, add, delete, reorder, refresh, provider check, upload, and download.
- Use segmented controls or tabs for mode choices: outline/template, edit/present, text/image provider.
- Use switches for binary settings: web search, image generation, table of contents, title slide, tracking, auth-disabled only in trusted setup screens.
- Use selects/comboboxes for provider/model/language/template choices.
- Use sliders/steppers or numeric inputs for slide count.
- Use progress overlays for streaming outline and generation, but keep the current work visible when possible.
- Use toasts for transient success/failure, but also keep persistent blocking errors near the control that caused them.

Empty/loading/error/blocked states must be designed as first-class component states, not placeholder text.

## Interaction model

Users create through prompt/document input, inspect through outline and slide canvas, edit through inline fields and slide controls, recover through undo/readback/error states, confirm through saved/export-ready states, navigate through thumbnails/tabs/presentation controls, and understand blocked actions through local messages beside the blocked provider/export/config control.

## Color and typography tokens

The generated UI identity must restate exact semantic color tokens, typography scale, state colors, and focus treatment before implementation. It must also name forbidden palette pitfalls and verify that app chrome typography does not override slide template typography.

## Screen-State Contract

Implement and inspect these states:

- First visit/auth setup.
- Provider unset, provider invalid, provider saved, provider live-check failed.
- Prompt-only upload.
- Document upload with supported and unsupported file types.
- Stock image provider readiness failure.
- Outline streaming, malformed outline/provider failure, completed outline.
- Template selection with built-in and custom templates.
- Slide generation streaming with progressive slide arrival.
- Editor loading, empty, error, autosaving, saved, export in progress, export failed, export ready.
- Chat refinement sending, targeted slide focus, failed tool/action, successful slide change.
- Presentation mode with keyboard/click navigation and exit.
- Dashboard empty/list/delete.

## Motion and Feedback

Use motion to communicate pipeline state, not to decorate:

- Gentle streaming progress and current-slide follow behavior.
- Focus glow only when the agent/chat is targeting a real slide.
- Smooth thumbnail selection and reorder feedback.
- Export progress with clear blocked/failure state.

Do not animate layout size in ways that move the slide canvas or hide controls during editing.

## Anti-generic Rules

- Do not build a single prompt box plus download button and call it complete.
- Do not leave functionless buttons or dead controls in the main product surface.
- Do not show generic AI output cards instead of an editable deck.
- Do not claim a deck is ready until the user can inspect slide sequence, edit content, and export.
- Do not bury provider configuration after generation fails.
- Do not use raw JSON as the user-facing outline or slide output.
- Do not let templates be cosmetic names only; the chosen template must shape slide layouts and theme.
- Do not use proof labels, proof terms, or evaluator language in the main UI.

## Content stress fixtures

Stress with long presentation names, long slide titles, dense body text, many slides, empty prompt, unsupported files, failed provider runtime, failed persistence, failed export, missing auth/session, and mobile/narrow screens where side rails collapse.

## Proof obligations

Run screenshot delta review when a prior/default build exists, desktop and narrow viewport checks, no-overlap/no-clipping inspection, keyboard/focus checks, content-specificity review against central output, edit/readback proof, blocked-state proof, and export artifact inspection. These checks target the most likely UI failure: a polished shell that cannot produce, edit, persist, and export a real deck.

## Phase Obligation

Every phase must reread this file before implementation. Backend, worker, provider, and export phases still affect what users see: progress, errors, saved state, file downloads, and confidence in the generated deck.
