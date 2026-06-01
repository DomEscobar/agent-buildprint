# Stack Decision

Default:

- Vite + TypeScript + React.
- If React install/scaffold is blocked, use Vite + TypeScript without React and document why.
- If package installation is impossible, preserve the same modular structure with plain TS/JS and document the blocker.

Forbidden:

- one-file app containing UI, domain, provider, storage, and export logic;
- no tests;
- no architecture handover.
