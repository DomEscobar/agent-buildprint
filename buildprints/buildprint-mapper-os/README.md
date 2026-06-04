# Buildprint Mapper OS

Mapper OS is an agent-session workflow for mapping an existing source repo into a source-independent executable Buildprint.

The selected packet is now **v3 phase-driven**. The old slice/gate/team/runner model is retired because it was too compressed and runner-shaped. Mapper OS now emits readable implementation manuals: YAML routes; Markdown teaches and builds.

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
02-uiux-decision.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  01-<phase>.md
  02-<phase>.md
HANDOVER.md
```

## Packet principles

- `BUILDPRINT.md` owns product identity, golden path, constants, implementation contract, read order, and done criteria.
- `00-questions.md` asks only implementation-changing questions.
- `01-project-setup.md` creates the project foundation before phase work.
- `02-uiux-decision.md` defines UI/operator experience when relevant.
- `03-phases/phase-index.yaml` routes only.
- `03-phases/phase-flow.md` defines the active-phase loop and repair routing.
- Every phase file is a comprehensive product-engineering assignment with a detailed `Building objective`.
- `HANDOVER.md` captures built, verified, blocked, not-proven, and next actions.

## Forbidden selected-output shapes

Do not emit the retired slice/gate packet shape, team capsules, runner specs, generated prompt handoffs, evidence-ledger bureaucracy, tiny YAML implementation briefs, or stale v2 file names.

## Validate

```bash
node bin/agb.js packet check buildprints/buildprint-mapper-os
npm run eval:mapper-overhaul
```
