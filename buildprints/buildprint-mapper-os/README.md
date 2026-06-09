# Buildprint Mapper OS

Mapper OS is an agent-session workflow for mapping an existing source repo into a source-independent executable Buildprint.

The selected packet is **v3 phase-driven**. Obsolete runner-shaped abstractions are gone. Mapper OS now emits readable implementation manuals: YAML routes; Markdown teaches and builds.

## Use it

1. Open the source repo or provide a repo URL/path to the agent.
2. Bootstrap this package if needed:

```bash
agb start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json ./mapper-os
```

3. Follow `.buildprint/next-agent.md` and the Mapper OS docs.
4. Discover behavior before selecting scope.
5. Emit a v3 selected packet.

## Selected packet shape

```text
BUILDPRINT.md
00-questions.md
01-project-setup.md
02-ui-identity.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  01-<phase>.md
  02-<phase>.md
README.md
HANDOVER.md
```

## Packet principles

- `BUILDPRINT.md` is the generic AI-builder briefing: role, responsibility, perfection alignment, fake-success intolerance, and read order. It must not carry product specifics or names from the mapped source.
- `00-questions.md` asks only implementation-changing hard stops, assumptions, and deferrable decisions.
- `01-project-setup.md` creates the project foundation and local skill harness before identity or phase work: stack, local `AGENTS.md`, core skills (`setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, `verify-and-review`), optional profiles, `docs/architecture.md`, env contract, and setup receipt.
- `02-ui-identity.md` is the UI identity step. It loads the local `frontend-ui-product-design` skill, opens with "UX is a must," explains understandability, then writes a detailed design schema: thesis, style direction, color tokens, typography, layout, screen states, components, motion, state behavior, anti-generic rules, and phase obligation.
- `blueprint.yaml` is the machine route and product-contract mirror: product name, central artifact, golden path, central output contract, runtime/posture constraints, required files, forbidden shapes, phase index, and phase flow.
- `blueprint.yaml` also carries `proven_implementation_requirements` for source-derived hard domains such as fixed-format export, rich editing, document extraction, drag/reorder interaction, charts/diagrams, provider clients, task orchestration, migrations, and durable storage. These stay stack-neutral but require proven libraries/runtimes/services or equivalent proof.
- `03-phases/phase-index.yaml` routes only.
- `03-phases/phase-flow.md` defines the active-phase loop and requires `02-ui-identity.md` before every phase for UI-bearing artifacts.
- Every phase file is a comprehensive product-engineering assignment with a detailed `Building objective`, required context, proof, handoff, and standing comprehension, user-language, and visual identity responsibility.
- `README.md` is the product-facing README for the selected artifact. It must explain features, version/status badges, requirements, env/provider keys from `.env.example`, quick start, verification, and limitations without making the Buildprint packet the subject.
- `HANDOVER.md` captures built, verified, blocked, not-proven, and next actions.

## Why this split matters

The downstream coding agent needs a simple start file and a strong packet. If `BUILDPRINT.md` contains product-specific source baggage, the first thing the builder reads becomes noisy and stale. If setup mixes in identity work, it turns design into paperwork before the frontend skill is loaded. If `02-ui-identity.md` is weak, later phases build generic slop even when the backend works. If the local skill harness is missing, agents skip setup-runbook, frontend, subagent, and verify-and-review discipline at the moment they need it most. If the central output contract is missing, the app can technically process input while producing bland or interchangeable results. If phases do not reload the UI identity, design responsibility disappears during “backend” work and resurfaces too late.

## Forbidden selected-output shapes

Do not emit obsolete v2 packet shapes, team capsules, runner specs, generated prompt handoffs, evidence-ledger bureaucracy, tiny YAML implementation briefs, product-specific `BUILDPRINT.md` briefings, weak UI moodboards, or stale v2 file names.

## Validate

```bash
node bin/agb.js packet check buildprints/buildprint-mapper-os
npm run eval:mapper-overhaul
```
