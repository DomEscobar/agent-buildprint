# Phase 03 — Outline and layout generation

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and the central output contract in `blueprint.yaml`. Focus on turning input into an editable outline and layout/template plan. Keep generation honest when provider calls are blocked by using a labeled local deterministic stand-in only for UI/proof paths.

## Building objective

Implement the Outline view and generation pipeline that turns prompt/document context plus settings into a per-slide outline. Preserve Presenton source mechanics: slide count may be explicit or auto-detected, language may be explicit or auto-detected, tone and verbosity affect slide content, title-slide/table-of-contents choices affect the outline, and instructions apply literally. Add layout/template selection that explains or visibly records why each slide receives a layout: table, chart, title, comparison, process, image-heavy, text-heavy, or table-of-contents. The outline must be editable before deck generation.

The output should include enough state for a reviewer to see the connection between source input, requested settings, outline order, and selected layouts. If the system uses a local deterministic fallback, its copy must make clear that it proves outline UI and deck plumbing, not live AI reasoning. This phase should also make it difficult for future builders to skip structured outline state and jump straight to slide-looking cards.

The outline content must be slide-specific. Deterministic fallback mode may be simple, but it must still derive different plans, bullets, notes, and layout reasons from the prompt, requested scenario, slide role, and settings. Do not repeat one generic "balanced executive slide" paragraph across multiple slides. Slides such as executive summary, table of contents, risks, operating signals, root causes, and action plan need distinct content shapes so the later Deck phase proves useful generation rather than only data plumbing.

## DO NOT

Do not skip the outline step. Do not generate slides directly from prompt without editable planning state. Do not assign random layouts or repeat one layout without reason. Do not repeat the same body plan under different slide titles. Do not call document-grounded output proven unless extracted document context actually shaped the outline. Do not use placeholders, functionless buttons, or mocked/sample data as real outline/layout proof.

## Minimum proof before moving on

Run build/typecheck and smoke at least one prompt-only outline. Verify the outline changes with slide count/instructions and that layout choices are visible. Check content specificity by confirming at least four non-title slides have different plan text, different bullet intent, and different layout reasons tied to the slide title/source prompt. If provider generation is unavailable, verify the local stand-in is labeled and cannot be mistaken for live AI output.

## Handoff note

Record outline source, generation mode, layout/template logic, edited outline behavior, and unproven live-provider/document claims.
