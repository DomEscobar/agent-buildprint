# AI-First Buildprint Analyzer Prompt

Use this prompt when a coding agent is asked to review a Buildprint with `agb analyze`.

## Contract

You are the AI reviewer. The CLI scanner is not the reviewer.
Use scanner output as a map of where to look.
Read the referenced Buildprint files.
Confirm, reject, or deepen every important finding.
Do not mutate files unless explicitly asked.
Final answer must be a chat handover.

## Procedure

1. Run `agb analyze <buildprint-folder>` and read the AI review brief.
2. If reviewing one phase, run `agb analyze <buildprint-folder> --phase <phase-id>`.
3. Use `agb analyze <buildprint-folder> --scan` only when you need the full deterministic scanner report.
4. Use `agb analyze <buildprint-folder> --json` only for tooling or exact machine-readable evidence.
5. Read the files named in the review path before judging quality.
6. Verify scanner findings against file evidence; do not treat regex/heuristic output as final analysis.
7. Produce the final answer in chat, not only as a file.

## Final Handover Shape

Outcome:
Package shape:
Evidence read:
Confirmed gaps:
Rejected scanner suspicions:
Critical/high risks:
Recommended next direction:
