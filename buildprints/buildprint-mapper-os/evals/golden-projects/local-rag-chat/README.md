# Local RAG Chat Fixture

Source fixture inspired by Maxkrvo/OllamaChat. It is intentionally compact and exists to test Mapper OS source-signal extraction for a local-first AI app.

Expected product signals:

- streaming local model chat through an Ollama-compatible provider adapter;
- persisted conversations, documents, chunks, citations, settings, and memory;
- document upload and URL ingestion for RAG;
- SQLite/libSQL vector search;
- repeatable grounding evaluation and browser proof.

The fixture is not a runnable app. It preserves source shape and risk signals for the mapper golden harness.
