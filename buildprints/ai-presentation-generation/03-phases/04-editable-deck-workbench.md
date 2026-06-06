# Phase 04 — Editable deck workbench

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and the deck output quality rules in `blueprint.yaml`. Focus on the Deck view: thumbnails, canvas, slide editing, notes, autosave, and readback.

## Building objective

Build the generated deck as structured, persisted, editable state. The Deck view must include a slide thumbnail rail, main slide canvas with stable aspect ratio, selected slide editing controls, content fields that match the chosen layout, speaker notes when supported, theme state, asset placeholders or selected assets, save/readback status, undo/redo or change tracking where practical, and clear navigation back to Outline/Create. Chat may remain a blocked or future seam in this phase, but the deck must not be a static preview.

The implementation should preserve a real deck identity across all editor surfaces. Selecting a slide, editing text, changing notes, switching a theme, and navigating away/back should all operate on the same persisted deck object or clearly state why persistence is not yet available. This phase should leave the product feeling like an editor where generated content can be shaped, not a slideshow screenshot viewer.

## DO NOT

Do not show generated markdown as a deck. Do not use static screenshots or fake thumbnails as proof. Do not make controls visually clickable but nonfunctional. Do not claim persisted state unless reload/readback or equivalent proof exists. Do not use placeholders, functionless buttons, or mocked/sample data as real deck-editor proof.

## Minimum proof before moving on

Run build/typecheck and browser smoke for opening a generated/sample deck, selecting slides, editing content, seeing save/readback state, and checking no major layout overlap on desktop/mobile. Verify the slide canvas and thumbnails have stable dimensions.

## Handoff note

Record deck id behavior, persisted fields, edit behavior, readback proof, and remaining editor gaps.
