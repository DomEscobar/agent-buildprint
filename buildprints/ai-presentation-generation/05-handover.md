# Handover

## Current status

Not built yet. This Buildprint packet is ready for downstream implementation of a trusted-local Presenton-inspired AI presentation generation workbench.

## Built surfaces

None by this packet alone. The implementation must build provider setup, deck creation, outline generation, slide editing, assets/templates, chat iteration, export, API/webhook/MCP/desktop seams, and review proof.

## Verification required after implementation

- setup/build/test commands;
- backend/API smoke tests;
- browser walkthrough of provider setup, prompt/document input, outline, slide generation, editing, chat, and export;
- persistence readback after reload/restart;
- provider/image/parser/export blocked-state review;
- API/webhook/MCP/desktop proof where claimed.

## Known defects and blockers

- Live text/image provider proof requires configured credentials or local model endpoint.
- Document parsing proof requires parser dependencies and representative files.
- PPTX/PDF export proof requires selected export runtime dependencies.
- MCP and desktop packaging are boundaries until explicitly implemented and tested.
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
2. Implement phase 01 deck workbench shell.
3. Implement phase 02 prompt/document/template-to-outline-to-deck loop.
4. Continue through feature, persistence, intelligence, design, architecture, and verification phases only after the core deck loop is real.

## Continue from here

1. Continue one phase: implement only `03-phases/00-product-system-alignment.md`.
2. Continue to checkpoint: implement phases 00 through 02 and stop after first browser deck proof.
3. Do all remaining phases: implement phases 00 through 08, then final review and handover.
4. Stop: leave this selected Buildprint packet as the handoff artifact.
