# Phase 04 — Editable deck workbench

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and the deck output quality rules in `blueprint.yaml`. Focus on the Deck view: thumbnails, canvas, slide editing, notes, autosave, and readback.

## Building objective

Build the generated deck as structured, persisted, editable state. The Deck view must include a slide thumbnail rail, main slide canvas with stable aspect ratio, selected slide editing controls, content fields that match the chosen layout, speaker notes when supported, theme state, asset placeholders or selected assets, save/readback status, undo/redo or change tracking where practical, and clear navigation back to Outline/Create. Chat may remain a blocked or future seam in this phase, but the deck must not be a static preview.

The implementation should preserve a real deck identity across all editor surfaces. Selecting a slide, editing text, changing notes, switching a theme, and navigating away/back should all operate on the same persisted deck object or clearly state why persistence is not yet available. This phase should leave the product feeling like an editor where generated content can be shaped, not a slideshow screenshot viewer.

Desktop must be treated as its own acceptance target. At 1440px width or wider, the Deck view should use a wide editor layout with thumbnail rail, central 16:9 canvas, inspector/edit controls, and chat or iteration context visible without turning into a vertical mobile stack. The main canvas must reserve stable regions for title, body, metadata, chart/table placeholders, image captions, and provenance. Long generated strings should wrap, summarize, or move to the inspector; they must not collide with bars, chips, icons, or neighboring text.

Mobile must also be treated as its own acceptance target. At phone width, the Deck view may stack, but the user must still be able to read and reach view tabs, thumbnail selection, deck toolbar actions, the slide canvas, inspector fields, chat/export controls, and primary actions. Do not let the page create accidental horizontal clipping where active tab labels, thumbnail cards, or buttons are cut off. Use contained horizontal scrollers only when they are intentional, sized, and visually readable.

Add long-text stress handling before claiming the editor is robust. Seed or generate at least one deck state with a long title, long bullets, long provenance/source label, and long speaker notes. The canvas and inspector must use stable regions, wrapping, intentional line clamps, scrollable textareas, or inspector-only full values so both desktop and mobile remain readable. Passing short happy-path screenshots is not enough. The full editable long values must remain reachable in the inspector even when the canvas intentionally clamps or summarizes them.

## DO NOT

Do not show generated markdown as a deck. Do not use static screenshots or fake thumbnails as proof. Do not make controls visually clickable but nonfunctional. Do not claim persisted state unless reload/readback or equivalent proof exists. Do not use placeholders, functionless buttons, or mocked/sample data as real deck-editor proof. Do not call a narrow stacked layout a desktop workbench. Do not accept mobile screenshots where tabs, thumbnails, toolbar buttons, or inspector actions are visibly clipped. Do not accept slide previews where generated text overlaps, clips, compresses into unreadable blocks, or collides with decorative bars/chips.

## Minimum proof before moving on

Run build/typecheck and browser smoke for opening a generated/sample deck, selecting slides, editing content, seeing save/readback state, and checking no major layout overlap on desktop/mobile. Capture at least one wide desktop Deck screenshot at 1440px or wider and one mobile Deck screenshot. Verify the desktop proof shows thumbnail rail, central 16:9 canvas, inspector/edit controls, same deck id context, and no visible canvas text/control overlap. Verify the mobile proof shows readable tabs, thumbnails, toolbar, canvas, inspector, and actions without accidental horizontal clipping. Capture or inspect one long-text stress deck on desktop and mobile. Verify the slide canvas and thumbnails have stable dimensions. Prefer automated Playwright or equivalent geometry assertions for viewport width, page-level horizontal overflow, stable 16:9 canvas bounds, selected slide behavior, and long-text stress states so future reruns fail loudly.

## Handoff note

Record deck id behavior, persisted fields, edit behavior, readback proof, desktop visual acceptance result, mobile visual acceptance result, long-text stress result, screenshot paths, and remaining editor gaps.
