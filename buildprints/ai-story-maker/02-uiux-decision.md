# 02 UI/UX Decision

UX is a must. It matters as much as the implementation because the user only experiences the artifact through its surfaces, states, copy, controls, motion, and feedback. A powerful generation pipeline hidden behind a confusing, generic, or ugly interface is not a finished product. The experience must be understandable, intentional, and coherent before later phases claim progress.

Small checklist before writing the style constitution:

- Can a first-time user understand what this artifact is, what to do first, and what state it is in?
- Does the visual direction feel intentionally designed for a writer shaping a story package rather than copied from a generic product shell?
- Are colors, typography, spacing, components, and motion defined concretely enough for another agent to implement consistently?
- Are empty, loading, error, and blocked states understandable without reading logs or source code?
- Are all visible controls expected to work, validate, navigate, regenerate, export, or explain a blocker?
- Would a demanding human call this product surface polished, or just technically present?

This file is the style constitution for every human-facing surface. It must force a clear visual world before implementation starts. Do not write short phrases like "clean UI" or "modern app." Write a detailed design schema that later phases can obey without guessing.

## 0. Autonomous design decision protocol

If no upstream visual direction exists, do not leave the UI undecided and do not ask the implementation phase to improvise silently. The builder must reason from product purpose, user workflow, artifact type, audience, density, risk, and expected review proof, then write the resulting decisions into the implementation project's local design notes before implementation. A missing brand guide, missing color palette, missing typography choice, or missing layout reference is a prompt to decide precisely, not permission to ship a generic interface.

Before building UI, record at least these decisions in local project notes or the phase handoff: product mood in one concrete sentence; chosen style direction and rejected adjacent styles; color tokens; typography tokens; desktop/mobile layout model; component language; proof obligations for screenshots, no-overlap checks, long-text fixtures, edit/readback, and output-specificity checks.

Use the proof obligations selectively. AI Story Maker is UI-bearing, editor-like, generative, and provider-backed, so viewport, editor stress, semantic output, provider blocked-state, and critical review proofs are applicable. Omitted UI proofs are not applicable only when the implementation removes the corresponding surface with explicit human approval.

## How to implement this decision

Before UI code, read:

- `BUILDPRINT.md`
- `01-project-setup.md`
- current project `AGENTS.md`

Then write a full visual and interaction contract for this artifact. The result must be detailed enough that another coding agent can implement the same aesthetic in later phases. If the file could apply unchanged to ten unrelated products, it is too generic and must be rewritten.

## 1. Design thesis

AI Story Maker should feel like a focused story-making product where the writer is in command of a living manuscript system. The impression is warm editorial precision: calmer than a game UI, richer than a plain document form, and more craft-focused than a generic SaaS shell. The interface should make story structure visible without turning creativity into spreadsheet work. The writer should always know where the premise, cast, outline, scene board, continuity warnings, and export status live.

The product must not feel like a chat box with cards stapled around it. Generation is part of the workflow, but the story package is the product. Every screen should reinforce authorship: editable beats, visible revision handles, explanations for blocked provider states, and clear next actions for improving the story. The style should support long sessions, dense story material, and careful reading without becoming beige, whimsical, or default-admin.

## 2. Chosen style direction

Use **warm editorial story-making** style direction: a dark ink surface with paper-like regions, quiet brass accents, structured story lanes, and manuscript-grade typography. It should feel like story material, continuity notes, and draft excerpts are arranged with intent. This is specific to the artifact because the user is not monitoring generic metrics; they are shaping a story system that needs relationships, rhythm, and revision affordances.

Reject a generic white SaaS shell because it makes scenes and character arcs feel like database rows. Reject fantasy parchment because it becomes decorative and harms readability. Reject neon cyberpunk because it fights long-form editing and emotional nuance. Reject chat-first AI assistant UI because it hides the storyboard and turns every operation into a prompt. The artifact should keep the story board and drafting surface dominant, with AI actions presented as craft tools rather than spectacle.

## 3. Color system

Use concrete tokens and preserve their semantic roles. Background `#101214` is the app shell. Surface `#181A1E` is the main region color. Elevated surface `#22252A` is for active cards, drawers, and selected scene details. Paper surface `#F4EBDD` is allowed only inside manuscript preview/export regions, never for the whole app. Border `#343842` separates regions without heavy outlines. Primary `#D7A84F` is the main generate/save/export action. Accent `#7DB7B2` marks relationships, graph links, and character focus. Secondary accent `#B987D6` marks revision suggestions and alternate beats. Success `#61B37B`, warning `#D99A3D`, danger `#D85C5C`, blocked `#8A6D3B`, text-main `#F2EFE8`, text-muted `#A7A39A`, text-soft `#C9C2B7`, and focus ring `#F0C66A` complete the system.

Never rely on color alone: blocked provider states need icon/text labels, errors need recovery copy, and selected cards need both border and background change. Do not use broad purple-blue gradients, beige full-page themes, or random glow orbs. Brass primary should be used sparingly for committed actions; draft/regenerate actions can use outline or accent treatment so the user can distinguish irreversible export/save from exploratory generation.

## 4. Typography system

Use a manuscript-friendly serif for story content and a quiet sans for controls. If exact fonts are unavailable, use Georgia or Charter-like serif for draft excerpts and Inter or system sans for UI. The title/heading token is 30px, line-height 1.15, weight 700, used only for the current story package title or major route title. Section-title is 20px, line-height 1.25, weight 650, used for Outline, Cast, Storyboard, Continuity, and Export sections. Panel-title is 15px, line-height 1.3, weight 650, used inside cards and detail regions.

Body text is 15px, line-height 1.55, weight 400 for readable scene summaries and instructions. Manuscript-body is 17px, line-height 1.65, weight 400 for generated prose previews. Metadata/code is 12px, line-height 1.35, weight 500, used for provider status, timestamps, ids, and export details. Button-label is 13px, line-height 1.1, weight 700, with normal letter spacing. Do not scale font size with viewport width; adjust layout and wrapping instead.

## 5. Layout and spatial rhythm

The dominant first screen is a usable story-making surface, not a landing page. Desktop layout uses three role-based regions: story package navigation and status, outline/storyboard plus drafting, and selected character, scene, continuity, or provider detail. Use 8px as the base spacing unit, 12/16px for compact control gaps, 24px for section separation, and 32px only around route-level transitions. Cards should use 6px or 8px radius, never oversized pill shapes.

Mobile layout becomes a single-column responsive story flow with a compact top mode switcher: Intake, Cast, Board, Scene, Review, Export. The drafting area owns scroll. Detail regions become drawers, and board lanes stack vertically with stable card dimensions so long scene titles do not resize surrounding controls. Desktop and mobile must avoid page-level horizontal overflow. The story board, not a hero headline, must be visually dominant on the first screen after setup.

## 6. Component language

Buttons use icon+label when the command might be ambiguous: Generate, Regenerate, Save Draft, Export, Compare, Ask Character, Resolve Continuity. Primary buttons are brass-filled with dark text; secondary buttons are transparent with border `#3D424C`; destructive buttons use danger text plus confirmation. Inputs and textareas have dark surfaces, clear labels, visible focus, validation text, and no browser-default styling. Story cards show beat purpose, conflict, turn, consequence, and status; selected cards use accent border plus elevated surface.

Panels are flat work surfaces, not nested cards inside cards. The cast list uses compact rows with relationship chips. The graph/cast relationship view uses restrained link colors and readable labels. Modals should be rare; use drawers for scene details and provider blockers. Toasts can confirm saves/exports, but errors must also appear near the failed surface. Empty states teach the next action and include one working command or a clear blocker. Loading states should name the operation: building cast graph, drafting scene, checking continuity, exporting package.

## 7. Motion and interaction feel

Motion is editorial and purposeful. Use short 120-180ms fades for panel changes, 160-220ms slides for drawers, and subtle card lift only on draggable or selectable story cards. Generation progress can show a calm stepper rather than fake streaming fireworks. Regeneration should visibly mark what changed, using compare highlights or a revision badge. Reduced-motion mode should keep instant state changes and skip slides/lifts.

Drag, selection, and editing must feel stable. A card hover cannot change dimensions. Long menus should scroll internally. Keyboard focus should move predictably from prompt to outline to scene editor to export controls. Provider-blocked controls should be disabled with explanation, not hidden, so the writer understands why live generation or export cannot run.

## 8. Empty, loading, error, and blocked states

Empty state copy should be specific: "Start with a premise or import notes to build your story world." Loading states should show the step being processed and which surface will update. Error states should name the cause, recovery, and whether draft state was preserved. Blocked states must be honest about missing credentials, unavailable provider runtime, denied file import, failed export, persistence failure, or unsupported format. Success states should show what changed and provide the next useful action, such as review continuity, regenerate a scene, ask a character, or export the package.

Never replace a blocked live provider with canned story text and call it success. Deterministic fixtures may demonstrate UI flow only when labeled as fixture mode. If storage fails, the UI must not imply the draft was saved. If export fails, show the failed format, log reference, and retry path.

## 9. Anti-generic rules

Forbidden for this artifact: generic white SaaS shell, default Tailwind starter look, unstyled browser controls, random gradients, decorative charts, fake activity feeds, placeholder icons, raw JSON dumps as main UI, dead tabs, functionless buttons, optimistic success with no runtime proof, static outline cards that cannot be edited, chat-only story generation, repeated generic scene copy, hidden provider failures, inconsistent radii, low contrast, clipped long titles, unreadable mobile text, and any style that contradicts the warm editorial story-making thesis.

## 10. Phase obligation

Every later phase touching UI must preserve this style schema. If a phase adds a component, it must use the tokens, typography, spacing, component language, motion, and state rules here. If implementation drifts into generic UI, the agent must repair the UI before advancing. Backend/runtime/export phases still affect visible provider, save, export, loading, blocked, and error states, so they must read this file before claiming progress.

## Minimum proof before moving on

- The style constitution is detailed enough to guide implementation without guessing.
- Concrete color tokens and typography rules are recorded.
- Main layout, component language, motion, and state behavior are specified.
- Applicable typed UI proofs from `blueprint.yaml` are selected: viewport, no-overlap/no-clipping, long-content stress, semantic output specificity, and operator/provider experience.
- Anti-generic rules are explicit.
- Later phases are instructed to obey this style schema before claiming progress.

## DO NOT

- Do not write only short phrases, moodboard words, or generic labels.
- Do not say "modern, clean, intuitive" without concrete visual rules.
- Do not use placeholder cards, lorem ipsum, fake activity feeds, inert tabs, decorative charts, or static graph bubbles.
- Do not treat raw JSON as the main experience unless the artifact is explicitly a developer JSON tool.
- Do not hide provider/runtime/deployment blockers behind optimistic success UI.
- Do not claim polished from colors alone; interaction, hierarchy, motion, copy, and state behavior matter.
