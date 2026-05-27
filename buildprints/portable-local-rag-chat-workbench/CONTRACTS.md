# Contracts

## Provider

The app must expose a provider adapter boundary with deterministic test-double mode and Ollama-compatible live mode. Missing local Ollama blocks live proof only after adapter/config/test/runtime wiring exists.

## Persistence

Conversation, message, document, chunk, citation, memory, settings, export, delete, and reindex state must be durable and read back through tests.

## UI

Chat, document, RAG citation, memory, settings, provider-blocked, loading, error, and success states require repeatable browser/e2e proof.

## Evidence

Runtime rows must be appended to `.buildprint/evidence/evidence-ledger.jsonl`; packaged `05-evidence/evidence-ledger.jsonl` is seed-only.
