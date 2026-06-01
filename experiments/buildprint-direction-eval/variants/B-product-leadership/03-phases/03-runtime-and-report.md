# Phase 03 — Runtime and Report

## Product intention

The user can run a local deterministic process and receive a report/storyboard timeline that is visibly derived from the seed and simulation config.

## Build

- Start/retry/reset runtime states.
- Progress or activity feedback.
- Generated report/storyboard artifact.
- Artifact readback after reload.
- Honest failed/blocked state for live providers.

## Quality bar

The report should use story language and reflect inputs. A user should be able to tell what changed when they changed the seed/config.

## Do not ship

Canned report unrelated to input, endless spinner, success toast without artifact, raw logs as the main output.
