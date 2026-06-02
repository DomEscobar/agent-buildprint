# Handover

## Current status

Not built yet. This Buildprint packet is ready for downstream implementation of a trusted-local graph-backed swarm simulation workbench.

## Built surfaces

None by this packet alone. The implementation must build upload, graph canvas, simulation, report, and interaction surfaces.

## Verification

Required after implementation:

- setup/build/test commands;
- backend smoke tests;
- browser walkthrough of upload, graph, simulation, report, and interaction;
- provider blocked-state review;
- persistence readback after reload/restart.

## Known defects and blockers

- Live LLM provider proof requires configured API key/base URL/model.
- Live graph-memory proof requires the open-source graph backend to be installed and configured.
- OASIS runtime proof requires local runtime dependencies and a small scenario.
- Public/private deployment is blocked until auth, tenancy, upload hardening, observability, deployment, CI, backup, and abuse controls are implemented.

## Not production-grade

- Auth and tenancy: not included for trusted-local.
- Observability and health: blocked until posture promotion.
- Deployment and operability: local only until explicitly promoted.
- CI and release gates: required before release.
- Backup and recovery: required before durable production data claims.
- Security and abuse controls: required before public/private upload exposure.

## Next atomic actions

1. Implement phase 00 adapter and app-structure alignment.
2. Implement phase 01 workbench shell.
3. Implement phase 02 upload-to-open-source-graph-to-canvas loop.
4. Continue through simulation/report/interaction only after the graph loop is real.

## Continue from here

1. Continue one phase: implement only `03-phases/00-product-system-alignment.md`.
2. Continue to checkpoint: implement phases 00 through 02 and stop after browser graph proof.
3. Do all remaining phases: implement phases 00 through 08, then final review and handover.
4. Stop: leave this selected Buildprint packet as the handoff artifact.

