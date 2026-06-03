# Codex Handoff — AI Swarm Simulator Remap

Start here after reading `BUILDPRINT.md` and `generated/agent-prompt.md`. This handoff converts the agent prompt into concrete Codex execution guidance.

## Immediate mission

Implement or continue the Mapper OS v2 packet as a local-first MiroFish-style graph-backed swarm simulation workbench. The current packet is authoritative; do not resurrect old `03-phases/` routers.

## Read first

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `generated/agent-prompt.md`
4. `generated/codex-handoff.md`
5. `02-project-setup.md`
6. `02-architecture.md`
7. `blueprint.yaml`
8. `03-ux-contract.md`
9. Active `slices/<id>/slice.yaml`

## Codex execution contract

- Treat Graphiti/open-source graph memory as the default replacement for Zep Cloud. If Graphiti cannot be installed, build the adapter seam plus explicit blocker; never require Zep.
- Implement provider config as OpenAI-compatible and runtime-selectable. Do not hard-code Qwen/OpenAI/one model.
- Prioritize product proof over broad scaffolding: sample path to graph/report, then real input to graph readback, then simulation/report.
- For UI work, make the graph canvas actually interactive. Clicking, selecting, dragging/zooming/panning, and inspecting details must either work or visibly block.
- Keep secrets out of commits, logs, screenshots, and handoff.

## Suggested Codex task prompt

```text
Read BUILDPRINT.md, generated/agent-prompt.md, generated/codex-handoff.md, 02-project-setup.md, 02-architecture.md, blueprint.yaml, 03-ux-contract.md, and the active slice yaml.

Build the next smallest real slice of the AI Swarm Simulator. Preserve Canva-like motion/clickable graph UX. Replace required Zep with an open-source graph-memory adapter defaulting to Graphiti. Keep LLM provider dynamic through OpenAI-compatible runtime config. Do not fake graph/simulation/report success; blocked is partial, not complete.

Before final response, run the project gates and report exact evidence: commands, outputs, screenshots/API proofs, blockers, and which path ids are complete/partial.
```

## First acceptance proof to seek

- Empty launch shows sample CTA and provider blocker.
- Sample path produces inspectable graph canvas and sample report.
- At least one node/edge click opens a detail panel.
- Missing provider blocks live graph/report calls legibly.
- Real input path either writes/reads graph memory through OSS adapter or marks exact blocker.
