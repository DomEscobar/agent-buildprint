# EXECUTION_PROTOCOL

1. Read `PRE_IMPLEMENTATION_QUESTIONS.md` before coding.
2. Preserve full-suite scope in the readiness map. Implementation slices may be sequential; scope must not shrink silently.
3. Choose implementation/review passes from the signals in `CURRENT_STATE.md`: product/UX, frontend, backend/runtime, provider/integration, security/privacy, browser/API QA, and coverage review.
4. Start with the first vertical slice: auth/API shell, project setup, SQLite persistence, and browser login/project CRUD proof.
5. Before provider-backed work, implement provider contracts and test-only fakes for tests, then block live qualification until sandbox credentials are available.
6. For each capability, update its pack and root `VERIFICATION.md` with proof command, artifact, negative test, runtime/browser evidence, depth status, and promotion blocker.
7. Reject route-shaped endpoints, static labels, no-op controls, deterministic adapters, and in-memory-only state as implementation proof for this full-suite scope.
8. Run fresh security review for auth, uploads, provider VM, destructive admin, import/export, and external writes.
9. Run browser/Electron proof for all user-facing flows: login, projects, novel import/events, script agent, production workbench, assets/media, provider settings, skills, memory, admin.
10. Stop and replan if any included capability lacks source evidence, product obligation, topology, proof plan, negative test, runtime/browser proof requirement, or explicit blocker.

