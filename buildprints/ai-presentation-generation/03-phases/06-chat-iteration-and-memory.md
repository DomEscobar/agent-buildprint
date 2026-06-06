# Phase 06 — Chat iteration and memory

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and source requirements for chat history, presentation context, selected slide targeting, and tool/trace state. Build chat as a deck-aware iteration surface, not a generic assistant panel.

## Building objective

Implement or precisely block chat iteration tied to the active deck and selected slide. A useful chat turn should know the presentation id, selected slide, outline/deck context, and recent conversation. It should produce either an editable deck change, a suggested change with apply controls, or an honest blocked state. Store chat conversations and history when persistence exists. If streaming is implemented, show chunks/status/trace in user-readable form.

The phase should prevent a common failure mode: bolting on a generic chatbot that sounds useful but cannot identify the current deck, selected slide, source outline, or editable fields. Chat state must be scoped, recoverable, and honest about provider availability. If the system can only preview suggested changes, make apply/undo boundaries explicit instead of silently rewriting slides.

## DO NOT

Do not add a generic chatbot that ignores deck state. Do not claim memory if chat history is not persisted or recoverable. Do not apply destructive slide edits without confirmation or undo/readback. Do not show raw tool payloads as the main chat UX. Do not use placeholders, functionless buttons, or mocked/sample data as real chat/memory proof.

## Minimum proof before moving on

Run build/typecheck and smoke a chat turn against a selected slide, or verify the exact blocked state. Confirm chat references the correct deck/slide and that any applied change updates deck state visibly.

## Handoff note

Record chat scope, persistence proof, applied edit behavior, trace visibility, and unproven live-provider/memory claims.
