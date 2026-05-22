# Stop Rules

Stop and report a blocker when:

- The active proof contract cannot run.
- Required product behavior needs live credentials the user did not provide.
- A destructive action would affect non-fixture user data.
- A security boundary is ambiguous.
- A UI state cannot be proven in a real browser.
- Context/tooling limits prevent honest continuation.

Do not stop after a passing active capability proof in `continuous-full-suite`; advance to the next dependency-ready packet.

