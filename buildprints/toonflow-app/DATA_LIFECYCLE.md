# DATA_LIFECYCLE

Data-persistence gates are required for Toonflow because the product claims durable project, media, storyboard, memory, provider, and admin state.

| Data class | Store | Lifecycle proof required | Status |
|---|---|---|---|
| User/settings/token data | SQLite settings/user tables | create/read/update/auth restart proof | blocked |
| Projects/models | SQLite project rows | create/edit/list/restart proof | blocked |
| Novels/scripts/events/assets | SQLite rows plus local media files | import/generate/update/delete/readback proof | blocked |
| Storyboard/flow/canvas state | SQLite JSON/flow rows | save/read/restart/readback proof | blocked |
| Provider config/skills | filesystem and/or SQLite config | edit/test/reload/path-containment proof | blocked |
| Agent memory/RAG | SQLite memory rows and embedding runtime | add/query/clear/restart proof | blocked |
| Backups/import/reset | database export/import/clear APIs | isolated roundtrip and destructive confirmation proof | blocked |
