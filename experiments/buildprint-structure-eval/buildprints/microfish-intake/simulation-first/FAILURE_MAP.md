# Failure Map

Build to remove these failures:

| id | User failure | Severity | Product response required |
|---|---|---|---|
| F-01 | User cannot tell what to do first. | blocks_journey | Clear first step, sample evidence, create project affordance. |
| F-02 | Ontology output is generic or unrelated to evidence. | blocks_journey | Evidence-sensitive extraction with visible entities/relations/assumptions. |
| F-03 | Provider/live status is fake or ambiguous. | blocks_trust | Explicit deterministic/local mode and missing-live-provider blocker. |
| F-04 | User changes evidence but output does not change. | blocks_journey | Regeneration must reflect new input. |
| F-05 | Reload loses project state. | blocks_journey | Local persistence and readback. |
| F-06 | Export is missing important fields. | blocks_handoff | JSON export includes project, evidence, ontology, provider status, timestamp. |
| F-07 | Product looks like generic CRUD. | hurts_quality | Microfish-specific labels, states, and workflow. |
