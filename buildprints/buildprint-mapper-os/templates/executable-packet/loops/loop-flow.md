# Loop Flow

Use this kernel for the active loop only. Do not read every loop upfront. Do not turn loop execution into paperwork.

```text
goal → bare agentic loop → optional independent fan-out → contract review
```

## How to run a loop

1. Read `BUILDPRINT.md`, `00-goal.md`, `01-setup.md`, and `02-identity.md` before every active loop.
2. Read `.buildprint/next-agent.md` and current project `AGENTS.md` if they exist.
3. Read the active loop file named in `loops/loop-index.yaml`.
4. Run a **bare agentic loop**: think → act → observe against the goal and this loop's building objective until done or stuck. State a short thinking checkpoint in the working response (not a deliverable file): active loop, smallest real path, likely failure modes, proof plan, claim ceiling.
5. Fan out with `subagent-driven-implementation` only when ownership is clean. Each worker gets a goal slice + contract; no shared mutable context; no supervisor theater.
6. Verify with the most meaningful available command, API/runtime check, browser/screenshot inspection, or persistence/readback proof. Load `verify-and-review` before claiming loop completion.
7. Repair visible slop and fake-success shortcuts before continuing.
8. Record what works, what is blocked, what was verified, what the proof does not prove, and what the next loop may trust.
9. Continue through dependency-ready loops in `loops/loop-index.yaml`.
10. Before claiming done, run `review.md` with an independent fresh-context reviewer.

## Completion rule

A loop passes only when the building objective is satisfied by a real product path or a blocker is honestly recorded. Edits alone, placeholder screens, mocked data, functionless buttons, sample-only proof, or a skipped thinking checkpoint do not complete a loop.

Do not create loop-run markdown, evidence ledgers, or claim-gates JSON products by default. Persist only concise progress, blockers, and handoff facts.

Final completion is impossible until `review.md` has run with an independent reviewer and either passed or recorded an external blocker.

Skill completion signals are part of the handoff contract when skills governed the work: `SETUP_RUNBOOK_DONE`, `UI_IDENTITY_DONE`, `SUBAGENT_PHASE_DONE` when fan-out ran, and `VERIFY_REVIEW_DONE` before loop completion.

## Repair routing

- If the loop objective is wrong or too thin, repair the loop file before coding more.
- If setup is missing harness, commands, env, or setup receipt, return to `01-setup.md`.
- If a product-defining/security/destructive/secret decision is missing, return to `00-goal.md` and stop.
- If UI quality is generic or drifts from identity, return to `02-identity.md` before advancing.
- If runtime/provider/deployment is unavailable, build the seam and record a blocker; do not fake live success.

## Handoff discipline

Before stopping, update `.buildprint/progress.md`, `.buildprint/blockers.md`, and handoff notes. Keep the handoff concise and evidence-based.
