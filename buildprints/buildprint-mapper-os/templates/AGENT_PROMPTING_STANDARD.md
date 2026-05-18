# Agent Prompting Standard

Purpose: make Buildprints executable by coding agents, not merely readable by humans.

## Attention design

- Put mission, hard constraints, and stop conditions first.
- Prefer short imperative bullets over long prose.
- Use explicit markers: MUST, MUST NOT, STOP, BLOCKED, DONE.
- Keep the first-read path small; move detail into referenced files.
- Repeat critical constraints in `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, and `CURRENT_STATE.md`.
- Use tables/checklists for scope, gates, and evidence.

## Instruction hierarchy inside a Buildprint

1. `agent-contract.xml` — strict instruction envelope.
2. `AGENT_EXECUTION_BRIEF.md` — operational summary.
3. `CURRENT_STATE.md` — active phase and anti-context-rot handoff.
4. `BUILDPRINT.md` / `SPEC.md` / `CONTRACTS.md` — product and system requirements.
5. QA and validation files — proof obligations.

If files conflict, stop and report the conflict.

## Context-rot prevention

- Update `CURRENT_STATE.md` after every phase.
- Before implementing a new phase, reread `CURRENT_STATE.md` and `agent-contract.xml`.
- Before final report, reread `IMPLEMENTATION_COMPLETENESS.md` and `TEST_MATRIX.md`.
- If a task becomes long, summarize completed evidence into `CURRENT_STATE.md` before continuing.

## Prompt behavior rules for coding agents

- One phase at a time.
- One blocking question at a time.
- Do not invent missing product decisions.
- Do not downgrade included scope into mocks or stubs.
- Do not claim done from code existence; claim done only from evidence.
- Treat failed tests/build/runtime QA as active work, not final success.
- If credentials/providers are missing for included scope, STOP and report blocked or exclude only with explicit scope decision.

## Evidence-first final answer

A final response must include:

- commands run,
- pass/fail results,
- runtime URL if applicable,
- screenshots/artifacts if applicable,
- persistence/restart proof if applicable,
- no-fake scan result,
- remaining gaps/blockers.

No evidence means not done.
