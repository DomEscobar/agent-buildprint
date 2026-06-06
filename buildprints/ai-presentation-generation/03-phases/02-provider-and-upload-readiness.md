# Phase 02 — Provider and upload readiness

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `00-questions.md`, `01-project-setup.md`, and `blueprint.yaml`. Focus only on provider/image configuration and prompt/document upload readiness. Preserve the source-fidelity contract around BYOK providers, local models, document decomposition, and honest blockers.

## Building objective

Build the Configure and Create surfaces so users can see text provider, image provider, local model, parser, storage, and export-runtime readiness before attempting generation. Implement prompt entry, document upload selection, slide count, language, tone, verbosity, title-slide/table-of-contents settings, template choice, and generation instructions. Uploaded files must become tracked local state with extraction/decomposition status; if parsing is unavailable, show a precise blocked state rather than pretending file content was used. Provider controls must validate enough to distinguish ready, missing key, unsupported model, local model unavailable, and not tested.

The result should make the first user decision obvious: either run a prompt-only deck path, attach documents for extraction, or fix a readiness blocker. The builder should surface how provider and parser state affects the next action, preserve local privacy copy, and prevent accidental claims that a document shaped the deck when only filename metadata exists. This phase should leave later outline/deck work with a clear request object and traceable input state.

## DO NOT

Do not store real secrets in visible state, logs, commits, snapshots, or generated decks. Do not call a provider ready from field presence alone. Do not accept uploaded documents and silently ignore them. Do not let the Generate button imply live generation when provider or parser requirements are not met. Do not use placeholders, functionless buttons, or mocked/sample data as real provider/upload proof.

## Minimum proof before moving on

Run build/typecheck and a smoke path for prompt-only setup plus upload-blocked setup. Verify provider/image/parser statuses are visible, accessible, and reflected in button enablement or adjacent blocker copy. Confirm uploaded document metadata can be inspected without leaking file contents unnecessarily.

## Handoff note

Record provider states tested, upload/parser states tested, secrets handling, and every unproven provider/parser claim.
