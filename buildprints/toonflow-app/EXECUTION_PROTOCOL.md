# EXECUTION_PROTOCOL

Execution mode defaults to `continuous-full-suite`: load `CURRENT_STATE.md`, `CONTEXT_PACKET.json`, and only the active capability pack, prove it, update state/context, then consult `CAPABILITY_INDEX.md` to choose the next dependency-ready pack. Use `active-capability-handoff` only when explicitly selected. Do not read unrelated packs upfront in either mode.

1. Read `PRE_IMPLEMENTATION_QUESTIONS.md` before coding.
2. Preserve full-suite scope in the readiness map. Implementation slices may be sequential; scope must not shrink silently.
3. Choose implementation/review passes from the signals in `CURRENT_STATE.md`: product/UX, frontend, backend/runtime, provider/integration, security/privacy, browser/API QA, and coverage review.
4. Start with the active capability named by `CURRENT_STATE.md` and `CONTEXT_PACKET.json`; for a fresh run that is the auth/API shell slice, then project setup, SQLite persistence, and browser login/project CRUD proof.
5. Before provider-backed work, implement provider contracts and test-only fakes for tests, then block live qualification until sandbox credentials are available.
6. For each capability, update its pack and root `VERIFICATION.md` with proof command, artifact, negative test, runtime/browser evidence, depth status, and promotion blocker.
7. After proof passes, update state, ledgers, and `CONTEXT_PACKET.json`. In `continuous-full-suite`, consult `CAPABILITY_INDEX.md`, advance to the next dependency-ready pack, and continue in the same session. In `active-capability-handoff`, stop after naming the next pack and preserving handoff state.
8. Reject route-shaped endpoints, static labels, no-op controls, deterministic adapters, and in-memory-only state as implementation proof for this full-suite scope.
9. Run fresh security review for auth, uploads, provider VM, destructive admin, import/export, and external writes.
10. Run browser/Electron proof for all user-facing flows: login, projects, novel import/events, script agent, production workbench, assets/media, provider settings, skills, memory, admin.
11. Stop and replan only on explicit blocker, missing proof, provider/runtime uncertainty, destructive safety issue, secret exposure, user interruption, context/tooling limit, or any included capability that lacks source evidence, product obligation, topology, proof plan, negative test, runtime/browser proof requirement, or explicit blocker.

