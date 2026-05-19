# AGB Analyze Agent Guide

`agb analyze` is an AI-first review launcher. It does not call an LLM and it does not mutate files. Its local scanner gathers deterministic evidence, then the coding agent performs the real review.

## Mental Model

- The CLI scanner is evidence, not judgment.
- The AI reviewer must read the referenced files.
- Findings must be confirmed, rejected, or deepened with file evidence.
- The final result must be a chat handover with next direction.

## Command Modes

| Command | Use |
|---|---|
| `agb analyze <folder>` | Default AI review brief for a coding agent. |
| `agb analyze <folder> --phase <id>` | AI review brief with phase-local checks pinned first. |
| `agb analyze <folder> --scan` | Full deterministic scanner evidence report. |
| `agb analyze <folder> --json` | Machine-readable scanner evidence. |
| `agb analyze <folder> --strict` | Exit nonzero when scanner finds critical/high gaps. |

## Review Discipline

1. Start with the default AI review brief.
2. Read the files in the review path.
3. Use the edge checklist as coverage guidance.
4. Treat scanner findings as claims to verify.
5. Do not mutate the Buildprint unless the user explicitly requests implementation.
6. End with a chat handover:
   - outcome;
   - package shape;
   - evidence read;
   - confirmed gaps;
   - rejected scanner suspicions;
   - critical/high risks;
   - recommended next direction.

## Non-Goals

- No built-in LLM calls.
- No network.
- No auto-fix.
- No source mutation.
- No claim that regex/heuristic evidence is complete.
