# Phase 02 - Agent And XML Pipeline

## Goal

Run ScriptAgent and ProductionAgent stages through deterministic provider output with validated structured parsing.

## Keep In Context

- `LLM_FLOW.md`
- `AGENT_PROMPT_PACK.md`
- `XML_OUTPUT_CONTRACT.md`
- `CONTRACTS.md`

## Steps

1. Implement deterministic text provider stages for event extraction, skeleton, adaptation, scripts, director plan, storyboard table, and storyboard rows.
2. Parse accepted XML/structured output for each stage.
3. Validate singleton tags, script item names/content, storyboard item attributes, durations, asset refs, and storyboard mode rules.
4. Persist valid artifacts transactionally.
5. On malformed/partial output, record failed task with reason and preserve prior good state.

## Do Not

- trust raw LLM text without validation;
- silently repair output without recording validation behavior;
- partially persist corrupt storyboard/script state;
- feed full source skill files into every stage.

## Exit Criteria

- happy-path integration produces story outline, adaptation strategy, at least one script, director plan, storyboard table, and storyboard rows;
- malformed storyboard XML fails visibly and preserves prior rows.

## Validation Evidence

- valid-output integration test;
- malformed-output/no-partial-persistence test.

