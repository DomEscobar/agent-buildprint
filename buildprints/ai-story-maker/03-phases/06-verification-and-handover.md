# 06 Verification And Handover

## How to implement this phase

Read every required start file, `02-ui-identity.md`, `blueprint.yaml`, `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, current project `AGENTS.md` if present, prior handoffs, and `HANDOVER.md`. Verify the whole selected product path instead of checking isolated files. Then write a concise handover with proof, blockers, unproven claims, and next actions.

## Building objective

Run end-to-end verification for the selected production canvas product. The proof target is not "the app builds"; it is that a creator can move through the real canvas workflow: authenticate, choose project and episode, view the connected production board, edit or generate a meaningful artifact, persist and read back state, use or honestly block the assistant/provider path, inspect media states, and operate the UI without visual collapse.

Run the strongest available checks:

- type/build/test command for the implementation stack;
- API tests for auth, project/episode, flow-data fetch/save, media state, and provider blocked/live paths;
- realtime assistant connect/send/stop/reconnect/mutation test;
- browser test for login to project to production canvas;
- desktop screenshot inspection with assistant open;
- narrow viewport screenshot inspection with assistant collapsed/drawer mode;
- persistence readback after reload;
- semantic output review against `blueprint.yaml` central output contract;
- no-overlap/no-clipping/no-horizontal-overflow inspection.

Classify claims honestly. `PROOF_REQUIRED` remains if browser proof, live provider generation, durable media storage, security hardening, or production deployment has not been proven. If deterministic tests are used for providers, say that they prove seams and blocked behavior only, not real generation quality.

## DO NOT

- Do not claim production-ready from local proof.
- Do not ship placeholders, functionless buttons, or mocked/sample data counted as proof.
- Do not claim live provider success without real credentials and generated output.
- Do not count screenshots as proof if they were not inspected.
- Do not bury blockers behind "not tested".
- Do not omit UI defects because the backend tests pass.
- Do not stop without filling `HANDOVER.md`.

## Minimum proof before moving on

- Build/test commands run or exact blockers recorded.
- Browser route proof covers login to project to production canvas.
- At least one edit or assistant/tool mutation is saved and read back.
- Provider path is either live-tested or blocked honestly.
- Desktop and narrow viewport screenshots are inspected.
- Central output contract reviewer questions are answered with proof or blockers.
- `HANDOVER.md` is filled with built, verified, blocked, not proven, and next sections.

## Handoff note

Record final command outputs, browser URLs, screenshot paths, seeded data, provider state, persistence proof, unresolved security/deployment blockers, and whether critical review is ready to run.
