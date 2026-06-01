# Local RAG Chat Workbench — Product Leadership Variant

## Mission

Build a local-first research/chat workbench where a user can add documents, see what the system knows, ask grounded questions, inspect citations, and manage memory/history without pretending to have live AI when it does not.

The product must feel like a trustworthy knowledge workbench, not a generic chatbot skin.

## Product promise

A user can ingest local text, watch it become searchable knowledge, ask questions, receive answers grounded in retrieved snippets, inspect source evidence, and return later with documents/history intact.

## Central artifact

The central artifact is the grounded answer workspace: chat answer + retrieved source snippets + document/library state. It must show why an answer was produced.

A good answer surface:

- cites document/source chunks;
- separates known facts from uncertainty;
- changes when corpus or query changes;
- exposes retrieval results, not just a smooth paragraph;
- survives reload through local persistence.

## Product feel

- Research desk / operator console, not SaaS dashboard.
- Trustworthy over flashy.
- Source-first language: documents, chunks, citations, retrieved evidence, answer confidence, memory notes.
- Local deterministic mode is valid; fake live-model behavior is not.

## Forbidden shortcuts

- Generic chatbot that ignores uploaded docs.
- Canned answers unrelated to retrieval.
- “AI says…” without citations.
- Raw JSON as primary product UI.
- Dead upload/search/chat/settings controls.
- Fake provider success or silent missing-credential fallbacks.
- Proof/evidence jargon leaking into product UI.

## Completion bar

A constrained local build is successful when a user can add docs, ask grounded questions, inspect citations, see honest provider/retrieval state, preserve history after reload, and understand the first next improvement.
