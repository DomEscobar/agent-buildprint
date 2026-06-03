# Review

Run this as an operational walkthrough, not a self-score.

## Novice Walkthrough

Pretend you have never seen this product. You have not read the source repo, the buildprint, or the docs. You have no LLM credentials configured. You have not uploaded anything.

1. First useful result without configuration
   - Do: open a fresh app instance; touch only what is visible on the landing screen.
   - Observe: does `00b-ux-contract/first-run-path.md` match what you see? Is the "try with sample" affordance reachable without configuring an LLM provider?
   - Record: time to first useful result, or the exact missing affordance.
2. Domain vocabulary check
   - Do: scan every visible label, button, tooltip, empty-state copy, and blocked-state copy on the first three screens.
   - Observe: does every term in `00b-ux-contract/copy-quality-bar.md#jargon-ban` appear with its alt-copy (or not appear at all)? Were "ontology", "graph memory", "OASIS", "agent interview", "base URL", "API key", "provider label", "graph entity", "report sections", "interaction history" handled?
   - Record: each un-aliased jargon appearance with file/line and screenshot.
3. Canvas discoverability
   - Do: open the precomputed sample graph; try to click a node and read the details panel.
   - Observe: can a novice interact with the canvas and understand what a node represents without docs?
   - Record: any unlabeled IDs, missing detail panel, or undiscoverable affordance.
4. Blocked-state legibility
   - Do: remove or block LLM credentials and try the same path.
   - Observe: does the blocked copy match `00b-ux-contract/empty-blocked-loading-states.yaml#blocked.missing-llm`? Does it tell the novice in product language what to do and that the sample path still works?
   - Record: any technical/jargon language or any implication that nothing works without provider config.
5. Novice acceptance
   - Do: for each of `NOVICE-FIRST-RESULT-60S`, `NOVICE-NO-JARGON-FIRST-SCREEN`, `NOVICE-CANVAS-DISCOVERABLE`, `NOVICE-BLOCKED-PROVIDER-LEGIBLE`, try to satisfy the measurable outcome.
   - Observe: did it occur within budget? Is there a row for it in `.buildprint/ux-traceability.yaml`?
   - Record: pass/fail per `ux_ac_id` with screenshot/log path.

A finding here is recorded like any other reviewer finding: screen, observed step, severity, exit code or screenshot path. A finding without observed evidence is not a finding.

## Core Walkthrough

1. Start from a fresh local app.
2. Submit a small seed document and prediction requirement.
3. Generate or block ontology through the configured LLM provider.
4. Build graph memory through the open-source graph adapter.
5. Reload the project and confirm graph state reads back.
6. Inspect the graph canvas in graph, split, and workbench modes.
7. Click or select at least one node and one edge.
8. Refresh graph data.
9. Prepare a small simulation from graph entities.
10. Run, stop, or honestly block simulation runtime.
11. Generate and read back a report or honestly block provider/runtime.
12. Try report chat or agent interview if runtime state supports it.

## Observe And Record

- Does uploaded input affect ontology/graph output?
- Are graph controls alive and useful?
- Does state persist after reload/restart?
- Are missing providers shown as blocked states, not fake success?
- Are destructive actions explicit?
- Are public/private production claims absent under trusted_local posture?

## Defects To Fix Before Handover

- Generic dashboard smell.
- Decorative graph that cannot be inspected.
- Raw JSON as the main user experience.
- Canned output unrelated to input.
- Dead controls.
- Placeholder copy.
- Hidden Zep dependency.
- Hard-coded AI provider.
- Missing persistence/readback for visible history.
- Secret values in UI, logs, or generated artifacts.

