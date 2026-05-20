# Discover Prompt

Use Mapper OS to perform lean discovery on a source project.

## Instructions

- Treat source as read-only.
- Collect safe census hints only.
- Do not copy secret values.
- Do not assert product behavior from filenames, manifests, dependencies, or route patterns.
- Create `CENSUS_HINT` or `PENDING_AGENT_DISCOVERY` claims only until source reading promotes evidence.
- Discover product capabilities before file/module boundaries.
- Record unknowns as `QUESTION` or `BLOCKED`.

## Required Discovery Output

```text
discovery/
  SOURCE_READING_PLAN.md
  DISCOVERY_QUEUE.md
  CLAIM_REGISTER.md
  SYSTEM_MAP.md
  BUILDPRINT_CANDIDATES.md
evidence/
  EVIDENCE_LEDGER.json
quality/
  PROMOTION_GATE.md
CURRENT_STATE.md
manifest.json
```

Discovery output must use qualification label `DISCOVERY_ONLY`.
