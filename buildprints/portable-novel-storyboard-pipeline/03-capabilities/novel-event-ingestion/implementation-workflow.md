# Implementation Workflow: novel-event-ingestion

1. Add chapter import data model and UI/API entry.
2. Add deterministic event extractor adapter.
3. Persist event state per chapter.
4. Add malformed-output and provider-failure paths.
5. Prove 3 ordered chapters become 3 successful events.

