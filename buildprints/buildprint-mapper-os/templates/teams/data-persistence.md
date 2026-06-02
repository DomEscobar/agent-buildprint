# data-persistence

Purpose: prevent throwaway state from masquerading as product behavior.

## Required Output

- State/schema model and lifecycle for create/read/update/delete/import/export/reporting behavior as applicable.
- Restart/readback proof for durable claims.
- Migration, cleanup, retention, and recovery expectations where relevant.

## Blocks

- In-memory-only product state unless tiny `trusted_local` scope explicitly justifies it.
- Persistence claims without restart/readback proof.
- Import/export/reporting behavior without data lifecycle proof.
- Graph/model/project data with no ownership or recovery story.
