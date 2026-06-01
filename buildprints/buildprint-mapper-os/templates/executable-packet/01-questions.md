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
8. How should the agent advance through phases (execution cadence)?
   - `one_phase`: implement the next phase only, then stop and present the continue menu. Best when you want to review between phases.
   - `to_checkpoint`: implement through the next major checkpoint (verification, then final review), pausing only on real blockers.
   - `all_remaining`: implement every dependency-ready phase to completion, stopping only on real blockers (credentials, destructive, deployment, environment).
   - Default if unanswered: `one_phase`.

Posture defaults by mode:

- `trusted_local`: optimize for a credible local workbench and explicit production blockers.
- `private_authenticated`: default to production-shaped architecture on a mainstream maintained stack.
- `public_webapp`: default to production-grade architecture with tenant/security/operability controls.

Posture changes operability only (auth, deployment, observability, backup, CI). It never lowers the product-craft floor: every UI-bearing product, including `trusted_local`, uses a real component/UI framework with a build step and a design/styling system. No single-file hand-rolled shell at any posture. See `02-project-setup.md`.
