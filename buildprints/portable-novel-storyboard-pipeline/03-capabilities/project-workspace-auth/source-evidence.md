# Source Evidence: project-workspace-auth

- `src/routes/login/login.ts` handles local login.
- Socket route guards reject missing/invalid token or isolation key.
- `src/routes/project/addProject.ts`, `editProject.ts`, and `getProject.ts` preserve project metadata.
- `src/lib/initDB.ts` defines user, setting, and project tables.

Evidence is source-observed. Runtime behavior remains unproven until the clean-room implementation records evidence.

