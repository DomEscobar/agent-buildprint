# Persistence

Use durable local persistence by default: SQLite, IndexedDB, filesystem JSON with atomic writes, or another local durable store.

Proof must show:

- state written before restart;
- app/server restarted or store reloaded;
- projects, chapters, events, scripts, assets, storyboard rows, media tasks, and manifest data read back correctly;
- failed provider/parser paths do not corrupt prior successful state.

In-memory-only state may be used for tests but must not be claimed as product durability.

