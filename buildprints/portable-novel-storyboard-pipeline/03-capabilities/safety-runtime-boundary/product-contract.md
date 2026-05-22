# Product Contract: safety-runtime-boundary

The portable implementation must make risky surfaces explicit:

- live provider credentials are opt-in;
- no-network deterministic providers are default;
- uploads cannot escape the app data root;
- destructive admin actions require confirmation, auth, audit, and isolated proof;
- public deployment is blocked until reviewed.

