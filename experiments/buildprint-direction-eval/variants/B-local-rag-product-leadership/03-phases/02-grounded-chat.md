# Phase 02 — Grounded Chat

## Product intention

The user can ask a question and see an answer grounded in retrieved snippets.

## Build

- Chat input and session turns.
- Retrieval against local chunks.
- Answer text that cites snippets/documents.
- Visible retrieved evidence with scores or reasons.
- Honest “not enough evidence” state.

## Quality bar

Changing the question or corpus must change the retrieval and answer. The answer should never look omniscient when sources are weak.

## Do not ship

Generic chatbot response, canned answer, hidden retrieval, fake citations, or answer without source evidence.
