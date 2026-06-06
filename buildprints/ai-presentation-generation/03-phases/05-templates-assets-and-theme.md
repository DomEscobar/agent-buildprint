# Phase 05 — Templates, assets, and theme

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and Presenton source-fidelity requirements around built-in templates, custom HTML/Tailwind layouts, PPTX-derived templates, fonts, icons, images, charts, and theme data. Keep the Templates view useful even if advanced import remains blocked.

## Building objective

Implement template, layout, asset, and theme surfaces that actually affect deck generation or editing. Built-in templates must expose layout families and preview behavior. Custom template creation may begin with a limited editor, but it must include saved metadata and preview or a precise blocker. Image/icon/chart assets must track provider/source status. Uploaded images and fonts must have local state and deletion boundaries. Themes must apply to deck canvas and export state, not just a detached settings page.

The phase should make template fidelity visible: a user can tell which layout family is active, which slides use it, what assets belong to the deck, whether images/icons were uploaded, searched, generated, or blocked, and whether font/theme choices will survive save/export. If PPTX-derived template import is not implemented, the UI should show why and what runtime/parser proof is still needed.

## DO NOT

Do not build a template gallery that has no effect on slides. Do not claim PPTX template import without file processing proof. Do not claim generated images/icons/charts without provider/source evidence. Do not let fonts or uploaded assets leak outside local storage boundaries. Do not use placeholders, functionless buttons, or mocked/sample data as real template/asset proof.

## Minimum proof before moving on

Run build/typecheck and smoke selecting or changing a template/theme and observing deck changes. Verify asset provider/upload states and blocked import behavior. Confirm theme changes affect the deck and are persisted.

## Handoff note

Record template/layout/theme/assets behavior, import blockers, provider blockers, and unproven asset claims.
