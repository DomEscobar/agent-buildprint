# Mapper OS Remap Comparison — MiroFish / Microfish

Date: 2026-06-06

## Purpose

This note compares the patched `ai-swarm-simulator` buildprint against a fresh Mapper OS remap of the original MiroFish/Microfish source at `/tmp/MiroFish-inspect`. The current buildprint is a useful regression oracle because it forced a better novice product wrapper and stronger social output quality. It is not a complete gold standard for source fidelity.

## What the current buildprint already does well

- Keeps the user-facing product understandable through Start, Map, Run, Feed, Story, and Projects views.
- Requires honest trusted-local/provider-blocked semantics.
- Requires differentiated social posts, Reddit-style disagreement, timeline events, run insights, actor motives, risks, stances, influence, and publishing brief.
- Separates simulated feed/export from real public posting.
- Requires provider, external graph memory, persistence, accessibility, and production hardening gates.

## What the Mapper OS remap recovered from source

- The original pipeline starts with uploaded seed documents and an explicit prediction requirement, not only built-in example scenarios.
- Graph build is ontology generation plus Zep-style GraphRAG with entity types, relation types, nodes, edges, facts, and relationship chains.
- Environment setup converts graph entities into OASIS-compatible profiles and simulation configuration.
- Simulation output is an action log with platform, round, timestamp, agent id/name, action type, action args, result, and success.
- Report generation is a ReportAgent-style workflow with outline, sections, tool/provenance trail, saved report state, and uncertainty.
- Deep interaction lets the user ask the report context or selected agents follow-up questions.

## Proven gap

The current buildprint can still over-optimize for the polished local social-simulation studio and under-specify the original Microfish mechanics. A generated app could satisfy the previous output-quality bar by showing a strong map/feed/story while still skipping upload/ontology/GraphRAG, entity-to-agent config generation, OASIS action-log semantics, ReportAgent provenance, and deep interaction.

## Patch applied

The buildprint now carries a source-fidelity contract in `blueprint.yaml`, README guidance, a new enhancement gap, and stronger phase objectives for graph memory, simulation runtime, and report/interaction. This keeps the friendly product wrapper while making the original Microfish pipeline non-optional when claiming source-aligned output.

## Acceptance questions for future reruns

1. Which seed facts became ontology types, graph nodes, graph edges, graph facts, and relationship chains?
2. Which graph entities became agents, and what persona/activity/stance/influence settings prove they were not generic?
3. Which platform actions occurred in which rounds, with what action args, result, and success?
4. Which report claims are backed by graph facts, feed/action logs, and provider/tool calls?
5. What can the operator ask, rerun, inspect, save, export, or publish next?
6. Which claims remain blocked: LLM, Zep, OASIS, ReportAgent, real posting, auth, privacy, deployment, predictive accuracy?
