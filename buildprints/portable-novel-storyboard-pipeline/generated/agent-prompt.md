# Generated Agent Prompt

Generated from: blueprint.yaml

This generated prompt is not source of truth. If it conflicts with `START_HERE.md`, `blueprint.yaml`, or the active capability packet, those files win.

Start at `START_HERE.md`, read `blueprint.yaml`, then read `02-context/context-map.yaml`, then read `PRE_IMPLEMENTATION_QUESTIONS.md`, then read `02-context/team-stack.yaml`. Ask unresolved blockers or apply its safe defaults before coding. For UI-bearing active capabilities, read `02-context/ux-contract.md` and `02-context/design-quality-bar.md`; they are blocking gates, not optional polish. Implement only the active capability packet first: `03-capabilities/project-workspace-auth/`. After proof, append a row to `.buildprint/evidence/evidence-ledger.jsonl`, consult `03-capabilities/capability-index.yaml`, and continue one packet at a time.

Use deterministic no-network providers by default. Do not use Toonflow source as implementation input. Do not claim Toonflow clone, live provider parity, Electron parity, exact UI/canvas parity, or final stitched-video parity.
