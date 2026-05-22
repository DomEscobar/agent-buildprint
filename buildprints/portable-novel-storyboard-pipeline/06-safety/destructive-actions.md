# Destructive Actions

Destructive actions include delete-all, database clear/import overwrite, media file deletion, and provider configuration deletion.

They require:

- authenticated user/session;
- explicit confirmation;
- fixture-only proof by default;
- audit record;
- backup/export path before destructive run.

Until proven, destructive actions remain `INCLUDED_RISKY_REQUIRES_HARDENING`.

