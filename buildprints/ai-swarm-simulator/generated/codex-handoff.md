# Codex Handoff — AI Swarm Simulator Remap

Use this as the Codex-facing implementation handoff after bootstrapping the package. This file is generated handoff context, not the authority; the Buildprint packet is authoritative.

## Bootstrap

```bash
agb start https://agent-buildprint.com/buildprints/ai-swarm-simulator/package.json
cd <created-project>
cat .buildprint/next-agent.md
```

Then read the snapshot files in this order:

1. `.buildprint/snapshots/BUILDPRINT.md`
2. `.buildprint/snapshots/01-questions.md`
3. `.buildprint/snapshots/generated/agent-prompt.md`
4. `.buildprint/snapshots/generated/codex-handoff.md`
5. `.buildprint/snapshots/02-project-setup.md`
6. `.buildprint/snapshots/blueprint.yaml`
7. `.buildprint/snapshots/03-phases/phase-index.yaml`
8. `.buildprint/snapshots/03-phases/phase-flow.md`
9. `.buildprint/snapshots/04-review.md`
10. `.buildprint/snapshots/05-handover.md`

## Codex task prompt

You are Codex implementing the Mapper OS remap for AI Swarm Simulator.

Your first job is not feature coding. Your first job is setup:

1. Read the packet in the order above.
2. Resolve hard-stop questions in `01-questions.md`. If any are unanswered, stop and ask the human.
3. Complete `02-project-setup.md` before phase work.
4. Create the implementation-project setup artifacts:
   - `AGENTS.md` as a concise repo constitution with Buildprint authority, mandatory read order, commands, ownership map, forbidden shortcuts, blocker/evidence rules, and local `AGENTS.md` boundary rules.
   - `docs/agent-harness.md` mapping AGENTS/local AGENTS, repo-local skills/playbooks, permissions/hooks, harness evals, and human review gates.
   - repo-local playbooks/skills where the chosen runner supports them.
   - runner permissions/hooks where supported, or exact blocker + human gate where unsupported.
   - `.buildprint/harness-evals/` checks for hidden Zep, hard-coded LLM vendor, generic dashboard, static fake graph, dead click control, skipped screenshot proof, skipped provider/graph blocked-state proof, generated-file edit trap, secret-read trap, dependency-sprawl trap, skipped-check trap, review-mode-edit trap, and external-action trap.
   - `UI-IDENTITY.md`, produced by an explicit UX/UI persona pass.
   - `.env.example`, `docs/architecture.md`, `docs/product-loop.md`, initial skeleton, verification commands, and `.buildprint/setup-receipt.md`.
5. Only then enter the active phase from `03-phases/phase-index.yaml`.

## Product constraints Codex must preserve

- Source reference: `666ghj/MiroFish` at commit `96096ea0ff42b1a30cbc41a1560b8c91090f9968`.
- Product feel: sleek Canva-like graph/simulation workbench with polished motion and real clickable interactions.
- UX rule: every visible clickable control either works or shows an honest blocked state.
- Graph memory: replace Zep Cloud with a free open-source graph-memory layer; default to Graphiti unless implementation evidence proves a better OSS fit.
- Provider: dynamic OpenAI-compatible LLM adapter with configurable provider label, base URL, model, API key, and status. No Qwen/OpenAI hard-code.
- Core loop: upload seed material -> extract -> ontology -> graph memory build/readback -> canvas inspect -> simulation run/block -> report readback -> interaction.
- Honesty: missing credentials, missing graph backend, missing OASIS runtime, unavailable export/deploy controls, or public-posture gaps must be visible blockers, not fake success.

## UX/UI persona call requirement

Before coding UI, run a deliberate UX/UI persona pass and write `UI-IDENTITY.md` with:

- visual promise and product metaphor;
- motion principles;
- graph canvas interaction model;
- clickability contract;
- layout and responsive rules;
- accessibility baseline;
- component/state matrix;
- screenshot critique rubric;
- forbidden generic dashboard/default-MVP patterns.

Do not treat this as optional polish. It is a setup gate.

## Completion evidence

Report:

- setup artifacts created;
- hard-stop question status;
- graph-memory adapter decision and why it is open-source;
- dynamic LLM provider adapter surface;
- UI identity persona output path;
- harness evals created;
- commands run and results;
- screenshot/browser proof status for UI work;
- blockers, if any.
