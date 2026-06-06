# 02 UI/UX Decision

UX is a must. It matters as much as the implementation because the user only experiences the artifact through its surfaces, states, copy, controls, motion, and feedback. The experience must be understandable for a first-time user before later phases claim progress. A powerful generation backend hidden behind a confusing or generic UI is not a finished product.

Small checklist before applying this style constitution:

- Can a first-time user understand what to do first: configure, prompt/upload, choose template, generate outline, build deck, edit, export?
- Can the user see whether the app is ready to use a provider, local model, parser, image source, and export runtime?
- Can the user inspect and edit the generated outline before slides are built?
- Can the user edit slide content, assets, theme, notes, and layout instead of looking at a static preview?
- Can provider/export/API/MCP/desktop blockers be understood without reading logs?
- Does the UI feel like a serious deck workbench rather than a generic AI prompt page?
- Are all visible controls functional, validating, navigational, or tied to precise blocked states?
- Would a reviewer trust the deck as a product artifact, or only as a demo of generated text?

This file is the style constitution for the artifact. Every later phase that touches human-facing UI must obey it before claiming progress.

## 1. Design thesis

The product should feel like a focused self-hosted presentation studio: calm, visual, precise, and editable. The deck canvas is the hero surface. The surrounding UI should support making a deck, not showing off a backend. The experience should feel closer to a local Gamma/Canva-style workbench with operator-grade readiness states than to a SaaS dashboard or one-screen prompt toy.

The first impression must be: "I can configure my model, add a prompt or document, preview the outline, generate slides, edit them, and export the deck." It must not feel like a landing page, static markdown-to-slides demo, raw API console, or generic purple AI app.

## 2. Chosen style direction

Use a **light editorial workbench** style: spacious white/off-white canvas, restrained charcoal text, precise blue/violet action accents, compact toolbars, clear slide thumbnails, and calm status panels. The deck should use real slide dimensions and stable aspect ratios. The UI may include subtle gradients or shadows, but the workbench must remain clean enough for long editing sessions.

Avoid one-note purple, heavy dark glass, oversized marketing hero sections, floating cards inside cards, and decorative art that competes with the deck.

## 3. Color system

Use concrete tokens and keep them consistent:

```txt
background: #F6F7FB
surface: #FFFFFF
surface-muted: #F0F2F7
surface-strong: #E7EAF2
border-subtle: #D9DEE9
border-strong: #B9C1D3
text-main: #111827
text-secondary: #374151
text-muted: #6B7280
text-faint: #9CA3AF
primary: #4F46E5
primary-hover: #4338CA
accent-blue: #2563EB
accent-cyan: #0891B2
success: #059669
warning: #D97706
danger: #DC2626
blocked: #EA580C
focus-ring: rgba(79, 70, 229, 0.34)
canvas-shadow: rgba(17, 24, 39, 0.16)
```

Status must never rely on color alone. Pair every readiness color with text and icon/shape.

## 4. Typography system

Use a readable sans-serif for product UI. Headings should be compact and editorial, not hero-scale except on empty states. Slide content may use theme-specific fonts, but the editor chrome should stay consistent.

```txt
workspace-title: 22-28px / 1.15 / 700
section-title: 16-20px / 1.2 / 650
panel-title: 13-15px / 1.25 / 650
body: 14-16px / 1.5 / 400-500
metadata: 11-13px / 1.35 / 500
toolbar-label: 12-13px / 1.2 / 600
button-label: 13-14px / 1.2 / 650
```

Do not use viewport-width font scaling. Do not let labels overflow buttons, thumbnails, or slide cards.

## 5. Layout and spatial rhythm

The app is a focused multi-view workbench, not a single endless page. Use a stable shell with a compact navigation rail or top segmented navigation, a primary work area, and one contextual panel when needed. The deck canvas should sit in the visual center with predictable 16:9 dimensions; thumbnail rails, inspector panels, and chat/export drawers must not resize the canvas unpredictably.

Desktop proof is not satisfied by a narrow stacked responsive layout. At desktop width, the Deck view must read as an editor: slide thumbnails on one side, a large stable 16:9 canvas in the center, and inspector/chat/export context in adjacent panels or drawers. It is acceptable for mobile to stack, but desktop screenshots must show the wide workbench composition.

The slide canvas is the central output surface. Text, chips, icons, divider bars, chart labels, source tags, and speaker-note affordances must fit within their slide regions without overlap, clipping, or unreadable compression. If generated content is too long, the UI should summarize, wrap, clamp with an intentional affordance, or expose the full value in the editor inspector. Accidental overlap inside the main slide preview is a failed deck proof, even if build and Playwright tests pass.

Use generous but efficient spacing: 8px micro spacing, 12/16px component spacing, 24px panel spacing, and 32/40px major workbench breathing room. Avoid nested cards, floating hero panels, and marketing-style sections. On mobile, preserve the same workflow with horizontal view tabs or bottom navigation, then stack secondary panels under the active work surface.

## 6. Required views

The app must use focused workbench views rather than one giant page:

- **Configure** — text provider, image provider, local model, privacy, parser, export runtime, and readiness checks.
- **Create** — prompt input, document upload, slide count/language/tone/verbosity, template/theme choice, and generation settings.
- **Outline** — streamed or loaded outline, editable slide titles/content, title/table-of-contents options, and generate-deck action.
- **Deck** — slide thumbnails, main slide canvas, inline text/asset/layout editing, speaker notes, theme controls, and chat iteration.
- **Templates** — built-in layouts, custom HTML/Tailwind template creation, imported PPTX template path, font handling, and preview.
- **Exports** — PPTX/PDF tasks, download links, runtime blockers, async API task state, webhook delivery state, MCP/desktop seams.

## 7. Output quality rules

The central output is not "some slides." It is an editable, export-ready presentation artifact grounded in the user's prompt/documents/template and represented as structured deck state.

The product is incomplete if it only shows generated markdown, static images, fake thumbnails, or a canned deck. A useful generated deck must include:

- source prompt and uploaded document references;
- outline with slide count, language, tone, verbosity, title/table-of-contents options, and user instructions;
- layout/template selection per slide with reason or visible fit;
- editable slide content fields that match each layout's expected data shape;
- speaker notes when supported;
- generated or selected image/icon/chart assets with provider/source status;
- persisted deck id and autosave/readback state;
- chat iteration tied to the active deck or selected slide;
- export readiness and task state for PPTX/PDF;
- clear limitations when provider, image, parser, template, export, API, webhook, MCP, or desktop behavior is not proven.

Acceptance test: after one example deck, a critical reviewer should be able to identify the input source, outline decisions, selected layouts, edited slide state, asset provenance, export status, and what is not proven. If the artifact could be replaced by generic slide cards with marketing copy, the phase is incomplete.

## 8. Component language

Use stable workbench primitives: slide thumbnails with fixed aspect ratio, canvas with fixed 16:9 or selected deck ratio, toolbar icon buttons with tooltips, segmented controls for view modes, switches for optional settings, steppers for slide count, menus for providers/templates/export formats, and drawers for advanced details. Keep cards only for repeated items, modals, and genuinely framed tools.

Empty, loading, error, and blocked states must be written in user language. Examples:

- "Text provider not ready: add an API key or choose a local model."
- "Document parser unavailable: upload can be saved, but extraction cannot run yet."
- "Export runtime missing: install/sync presentation-export before PPTX/PDF download."
- "Webhook not configured: API task can finish locally, but no delivery will be sent."

Every visible command must either work, validate, navigate, or explain its blocker.

## 9. Motion and interaction feel

Motion should be quiet and useful: outline streaming, generation progress, autosave state, selected thumbnail movement, focused slide glow, export task progress, and chat streaming can animate lightly. Avoid decorative motion, bouncing panels, or transitions that make editing feel unstable. Hover and focus states must clarify what is interactive; disabled controls must reveal why they are unavailable.

Empty, loading, error, and blocked states must appear in the same visual language as the rest of the workbench. Do not write only short phrases when a user needs a concrete next action. Avoid generic white SaaS dashboard copy, inert tabs, decorative charts, sample data presented as real output, optimistic success states, and dead tabs or dead controls.
