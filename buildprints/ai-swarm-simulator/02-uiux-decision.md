# 02 UI/UX Decision

AI Swarm Simulator is human-facing and graph-heavy, so the UI contract is mandatory.

## Visual hierarchy

The primary surface is a sleek canvas workbench: seed/input panel, provider status, graph canvas, simulation controls, report/inspector panel, and run history. The graph canvas should feel closer to a polished Canva-like interaction surface than an admin table: smooth motion, readable clusters, selected node/edge affordances, and clear empty/loading/error/blocked states.

## Interaction model

Required interactions: upload or select seed material, configure provider, test provider status, trigger graph extraction, pan/zoom graph, select/inspect nodes and edges, run or block simulation, view simulation trace, generate report, and continue from report. Every visible button must either execute, validate, navigate, or show a specific blocker. Functionless buttons, inert tabs, decorative charts, sample data masquerading as real output, and optimistic success toasts are rejected.

## State coverage

Cover empty/loading/error/blocked states for provider config, graph memory, simulation runtime, report generation, and persistence. Missing provider keys, missing graph adapter, failed extraction, simulation runtime unavailable, and report generation failure must be visible and recoverable.

## Product copy

Prefer honest operator language: “Provider not configured,” “Graph memory unavailable,” “Simulation runtime blocked,” “Report generated from current graph,” not vague success language.
