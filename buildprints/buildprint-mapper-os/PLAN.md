# PLAN: Buildprint Mapper OS

## Goal

Map source projects into source-independent Buildprint packets that improve downstream built product quality.

## Operating plan

1. Acquire source safely and read-only.
2. Census the repo for hints: manifests, routes, components, data, providers, commands, deployment, tests.
3. Discover observable behavior by reading source files.
4. Preserve requested scope and mark questions/blockers honestly.
5. Distill source behavior into:
   - product promise;
   - primary user/operator;
   - central artifact;
   - first usable loop;
   - state/persistence/readback needs;
   - provider/deployment/destructive/security boundaries;
   - implementation slices.
6. Emit selected packet with typed product-quality structure:
   - `BUILDPRINT.md`;
   - `01-questions.md`;
   - `02-project-setup.md`;
   - `blueprint.yaml`;
   - `03-phases/phase-index.yaml`;
   - `03-phases/phase-flow.md`;
   - phase files;
   - `04-review.md`;
   - `05-handover.md`;
   - `generated/agent-prompt.md`.
7. Validate packet structure and references.
8. Handoff with honest status and blockers.

## Product direction

Keep the useful broad Buildprint shape: setup/alignment, questions, phases plus phase-flow, reviewer, handover.

Remove the old center of gravity: proof ledgers, claim taxonomies, phase-preflight bureaucracy, and self-reported evidence as quality substitute.

## Completion bar

Done means the packet is structurally valid, source-independent, selected-scope faithful, and type-aware enough for a fresh coding agent to build a usable artifact-type slice without reading the source repo.
