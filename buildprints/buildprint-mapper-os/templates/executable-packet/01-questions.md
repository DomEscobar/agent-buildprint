# Questions

Ask or answer only questions that change implementation.

Do not continue selected extraction until deployment posture is set. If no answer is provided after one prompt, default to `trusted_local` and record that posture plus the resulting operability blockers in `05-handover.md`.

1. Which deployment posture should this packet target?
   - `trusted_local`: local workstation first. Operability items may remain explicit blockers.
   - `private_authenticated`: production-shaped private deployment with auth/session, durable state, worker ownership, observability, and restart-safe behavior.
   - `public_webapp`: production-grade public deployment with tenant isolation, abuse controls, security review, and release gates.
2. Who is the primary user or operator for this build?
3. What is the product's central artifact, boundary transaction, or main work surface?
4. What is the first usable end-to-end loop?
5. Which input/output/state must persist and read back after restart?
6. What provider, credential, deployment, destructive, or paid-service boundaries must stay blocked/honest?
7. What would make this embarrassing in a 60-second screen recording?

Posture defaults by mode:

- `trusted_local`: optimize for a credible local workbench and explicit production blockers.
- `private_authenticated`: default to production-shaped architecture on a mainstream maintained stack.
- `public_webapp`: default to production-grade architecture with tenant/security/operability controls.
