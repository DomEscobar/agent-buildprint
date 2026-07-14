# Phase Flow

Use this loop for the active phase only. Do not read every phase upfront. Do not turn phase execution into paperwork. The Buildprint is not a linear phase recipe: the active phase runs inside the builder loop, product loop, and proof loop declared in `blueprint.yaml`.

## How to run a phase

1. Read `BUILDPRINT.md`, `references/runtime-techniques-basis.md`, `00-questions.md`, `01-project-setup.md`, and `02-ui-identity.md` before every active phase. For UI-bearing artifacts, `02-ui-identity.md`, the generated local UI identity, and `docs/DESIGN.md` are standing contracts, not optional polish files: `docs/ui-identity.md` governs product/interaction fit, and `docs/DESIGN.md` governs visual taste and craft.
1a. Before implementation edits, confirm the setup architecture start model exists: `architecture/system-architecture.md`, `architecture/agent-runtime-loop.md`, `architecture/chat-turn-sequence.md`, `architecture/state-and-memory-model.md`, `architecture/failure-recovery-flow.md`, `PROJECT_STRUCTURE.md`, and `ARCHITECTURE_STRUCTURE_TRACE.md`. If any are missing, generic, unlabeled, unmapped to code, or scored below `4`, return to `01-project-setup.md`.
2. Read `.buildprint/next-agent.md` and current project `AGENTS.md` if they exist.
3. Read the active phase file named in `03-phases/phase-index.yaml`.
4. Before editing code, state a short thinking checkpoint in the working response or task plan: active phase, smallest real vertical user/operator path, builder-loop step, product-loop claim, architecture component(s) and `PROJECT_STRUCTURE.md` area(s) being touched, proof-loop score target, 3-7 likely failure modes, proof plan, and claim ceiling. This is not a deliverable file. Do not create phase-run paperwork by default.
5. Build the path only after that checkpoint is clear. Use `subagent-driven-implementation` only when the phase splits into cleanly owned workstreams; otherwise keep implementation local.
6. Verify with the most meaningful available command, API/runtime check, browser/screenshot inspection, or persistence/readback proof. Load `verify-and-review` before claiming phase completion.
7. Compare the result against the predicted failure modes and the three loops in `blueprint.yaml`: builder loop (observe/interpret/plan/act/inspect/critique/repair/verify/decide), product loop (goal/action/observation/critique/retry/resume), and proof loop (score/reject/route/patch/rerun/rescore). Also compare the changed code against `architecture/*.md`, `PROJECT_STRUCTURE.md`, and `ARCHITECTURE_STRUCTURE_TRACE.md`. Mark each avoided, found and fixed, still blocked, or not applicable.
8. Repair visible slop and fake-success shortcuts before continuing. Do one concrete weakness repair unless none is found. If the phase touches a full Agentic Chat claim, repair one missing plan/action/observation/critique/retry/resume affordance or record the exact blocker.
9. Record what works, what is blocked, what was verified, what the proof does not prove, which capability maturity level is currently proven, and what the next phase may trust.
10. Continue through the dependency-ready implementation phases in `03-phases/phase-index.yaml`.
98. Mandatory claim verification before final review: run `03-phases/06-claim-verification.md`. If `.buildprint/claim-gates.json` is missing, invalid, or computes a lower `highest_honest_claim` than the UI/README/HANDOVER claims, lower the claim or capture the missing proof before continuing.
99. Final mandatory phase: run `03-phases/critical-review-pushback.md` as `99-critical-review-pushback`; if the rubric does not pass, fix the named ad hoc flaws and rerun the relevant proof before claiming done.

## Completion rule

A phase passes only when the building objective is satisfied by a real product path or a blocker is honestly recorded. For UI-bearing artifacts, phase completion also requires generated local `docs/ui-identity.md` or `UI-IDENTITY.md`, generated local `docs/DESIGN.md`, `.buildprint/ui-evidence.md` grounding identity/design/action claims in screenshot or source evidence, `agb verify ui .` without unresolved FAIL checks, and screenshot evidence for the relevant desktop/mobile states before final handoff. Edits alone, placeholder screens, mocked data, functionless buttons, sample-only proof, unchecked screenshots, missing setup architecture packet, missing responsibility-based project structure, missing architecture-structure trace, missing local UI identity, missing local design system, missing UI evidence binder, or a skipped thinking checkpoint do not complete a phase.

For Agentic Chat, `streaming_chat_core` and `agentic_chat` are separate claim levels. Real streaming chat can pass the foundation floor. Full Agentic Chat cannot pass until the product loop proves goal intake, plan or next-step state, action selection, policy/approval, execution trace, observation ingestion, critique/retry/recovery, resumable state, and final synthesis tied to the user goal. If those are not built and proven, the handoff must say `agentic_chat: blocked` or `agentic_chat: not_qualified`.

Phase 06 is authoritative for final claim level. It must derive `highest_honest_claim` from `.buildprint/claim-gates.json`. A prose handoff, UI label, screenshot, config file, SDK import, or mock/sample transcript cannot override a failed or blocked claim gate.

Do not create phase-run markdown, evidence ledgers, or planning artifacts by default. The thinking checkpoint is behavioral: it should shape the work, not become paperwork. Persist only concise progress, blockers, and handoff facts needed for continuation.

This packet is a capability ladder (`capability_maturity` in `blueprint.yaml`): `streaming_chat_core` (phases 01-03) → `agentic_chat` (phase 04) → `agentic_swarm` (phase 05) → claim verification (phase 06). Phases 04 and 05 are in scope, not deferred. The foundation floor passes at phase 03, but the packet's full claim is only reached when the model-driven action loop and the parallel swarm are proven by their phase proofs and phase 06 computes the matching highest honest claim, or each unreached level is recorded as an honest blocker. Do not market streaming-only work as agentic, or a single-agent loop as a swarm.

Final completion is impossible until phase `06-claim-verification` has produced a valid claim verdict and phase `99-critical-review-pushback` has run and either passed or recorded an external blocker. Treat both as phase graph requirements, not optional review prose.

Skill completion signals are part of the handoff contract: `SETUP_RUNBOOK_DONE`, `UI_IDENTITY_DONE`, `SUBAGENT_PHASE_DONE` when subagents governed the work, and `VERIFY_REVIEW_DONE` before phase completion.

## Repair routing

- If the phase objective is wrong or too thin, repair the phase file before coding more.
- If setup is missing architecture, responsibility-based project structure, architecture-structure traceability, local skill harness, commands, env, proof surfaces, or setup receipt, return to `01-project-setup.md`.
- If architecture diagrams are generic, arrows are unlabeled, components do not map to planned files, `PROJECT_STRUCTURE.md` is organized as vague technical buckets, or `ARCHITECTURE_STRUCTURE_TRACE.md` scores below `4`, return to `01-project-setup.md`.
- If a product-defining/security/destructive/secret decision is missing, return to `00-questions.md` and stop.
- If UI quality is generic, interactionless, visually incoherent, stuffing multiple capabilities into one permanent view, or drifting away from the generated identity contract, return to `02-ui-identity.md` or `docs/ui-identity.md` before advancing.
- If visual craft, palette, typography, density, motion, component styling, or responsive collapse drift away from the generated design system, return to `docs/DESIGN.md` and repair the UI before advancing.
- If UI claims cannot be grounded in `.buildprint/ui-evidence.md`, or the first viewport cannot prove an action surface stronger than "type and send", return to `02-ui-identity.md`, `docs/ui-identity.md`, or `docs/DESIGN.md` according to the failed claim and repair the UI before advancing.
- For Agentic Chat, if the UI drifts away from a chat-native interface — for example a mission sheet, guided-run launcher, task dashboard, status lane, or form-first workflow displaces the conversation thread and composer/input — return to `02-ui-identity.md` and repair the UI before advancing.
- For Agentic Chat, if the default first viewport feels like a harness demo rather than a polished consumer chat — seeded feature cards before user intent, giant blank dead zone, internal status labels, uniform bordered card stack, or cramped mobile composer/chips — return to `02-ui-identity.md` and repair the Consumer Chat Craft Gate before advancing.
- For Agentic Chat, if the product only proves real streaming chat but claims complete agentic behavior, route to `03-phases/04-agentic-loop-runtime.md` and repair the product loop or lower the claim ceiling.
- For Agentic Chat, if the agentic loop lacks harness, budget policy, loop breaker, verifier, run receipt, or session-event durability, return to `03-phases/04-agentic-loop-runtime.md` and repair the runtime or lower the claim ceiling.
- For Agentic Chat, if the tool-calling proof only cites an assumed pre-existing/external tool the building agent never implemented or wired, or if the proof trace used the deterministic test double instead of a live real-running provider, return to `03-phases/04-agentic-loop-runtime.md` and repair before claiming `agentic_chat`.
- If runtime/provider/deployment is unavailable, build the seam and record a blocker; do not fake live success.
- If the agentic loop selects actions via slash commands, keyword matching, or regex intent parsing instead of model-driven provider tool/function calling, return to `03-phases/04-agentic-loop-runtime.md` before claiming `agentic_chat`.
- If a side-effecting action runs without an approval record, or a tool/MCP/memory capability is stubbed and presented as working, return to `03-phases/04-agentic-loop-runtime.md` and repair the policy/approval/audit path.
- If subagents run sequentially while being presented as parallel, or worker output is fabricated, or workers have unscoped global tool access, return to `03-phases/05-swarm-dispatching.md` before claiming `agentic_swarm`.
- If `.buildprint/claim-gates.json` is missing, invalid, cites missing evidence, or computes a lower claim than the product presents, return to `03-phases/06-claim-verification.md` and lower the claim or capture proof.

## Handoff discipline

Before stopping, update `.buildprint/progress.md`, `.buildprint/blockers.md`, and handoff notes. If those files do not exist yet, create them. Keep the handoff concise and evidence-based.
