# Generated Agent Prompt

Generated from: blueprint.yaml

This file is not source of truth and is not authoritative. Follow `BUILDPRINT.md`, `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, required `06-contracts/`, active phase, `04-evaluation.md`, `05-evidence/evidence-ledger.schema.json`, and packet file `05-evidence/evidence-ledger.jsonl`.

Selected blueprint mode: mixed. Packet phase style: mixed_contract. Individual phases use product, data-pipeline, automation, integration, and infrastructure mode contracts.

Use subagents or delegated workers when available; otherwise self-simulate required roles and still write handoffs, returns, reviews, proof, and runtime evidence. Evidence rows must be narrow. Provider credentials, deployment access, or live OASIS/Zep/LLM access do not automatically block downstream implementation; they block live claim qualification only after adapter/config/test/runtime wiring exists.

UI-bearing phases must satisfy `visual_quality_gate`, avoid default browser controls as the final experience, and must not downgrade MiroFish into a local MVP or raw text-list substitute for graph, simulation, report, or chat surfaces.
