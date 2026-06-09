# Phase 03 — Idea Scoring

## Goal

Convert captured sources into scored `IdeaRecord` candidates with explicit rubric behavior.

## Required actions

1. Read only captured `SourceRecord` IDs; ideas cannot cite unrecorded sources.
2. Score `audienceFit`, `novelty`, `practicalWorkflow`, `visualExplainability`, `sourceStrength`, `businessRelevance`, `publishEffort`, and `slopRisk`.
3. Persist per-field numeric scores plus explanations and a `totalScore`.
4. Penalize weak source strength, repeated angles, high factual risk, and low practical workflow value.
5. Mark ideas `needs_more_sources` when factual support is too thin, `rejected` for banned topics or repeated angles, and `selected` only after passing the rubric threshold.

## Done when

- Tests show strong sources can produce candidates and weak/duplicate ideas are penalized or blocked.
- Idea files include `sourceIds` that resolve to stored `SourceRecord` files.
- The selected idea has an original angle and practical workflow value, not keyword-only ranking.
