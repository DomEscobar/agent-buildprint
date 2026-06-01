# Skeptical Review

Review the built artifact as a product, not as a packet.

## Core Loop

- Create a new project from seed documents and a prediction requirement.
- Generate ontology and inspect entity/relation definitions.
- Build graph memory and inspect it in the canvas.
- Prepare simulation from graph entities.
- Run deterministic local simulation or verified live OASIS.
- Generate a report and inspect logs.
- Chat with report agent or simulated agents where available.

## Required Checks

- Reload the browser mid-flow and verify project state survives.
- Restart backend and verify project, graph id, simulation state, report metadata, and logs read back.
- Change the seed text or requirement and confirm ontology/report/graph/search outputs change.
- Use graph refresh, maximize, edge-label toggle, node selection, edge selection, and self-loop detail paths.
- Trigger missing LLM provider, missing graph-memory backend, empty upload, malformed file, graph build failure, report failure, and simulation failure states.
- Confirm no secret values appear in logs, report files, browser output, or handover.

## Repair Before Handover

Repair any central local defect:

- blank or unusable graph canvas;
- graph-memory adapter returning unusable node/edge shape;
- direct Zep dependency remaining in core flow;
- in-memory-only project/report/simulation state;
- fake simulation/report/chat behavior;
- broken first local commands;
- dead primary controls;
- raw JSON as main product surface.
