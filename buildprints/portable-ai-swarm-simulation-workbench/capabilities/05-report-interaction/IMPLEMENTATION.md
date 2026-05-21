# Implementation: Report And Deep Interaction

## Agent Brief

- Goal: implement report and chat workflow.
- Dependencies: simulation runtime artifacts.
- Stable behavior: report sections/logs and chat with context.
- Implementation freedom: LLM/tool orchestration.
- Forbidden substitutions: canned report/chat as completed product.
- First verification gate: `npm test -- report-interaction`.
- Required evidence: report artifact and chat transcript.
- Required team packs: all selected teams.
- Stop or escalate when: report tool behavior is unbounded.

## First Real Vertical Slice

- User/API entry: `POST /api/report/generate`, `GET /api/report/:id`, `POST /api/report/chat`.
- Domain/service behavior: build context, generate outline/section, log tool calls, answer chat.
- Persistence/state effect: save report, sections, logs, chat transcript as configured.
- Provider/runtime effect: LLM and graph tool adapters.
- UI/browser proof when applicable: report loading/section/error/success and chat screenshots.
- Negative/failure path: unavailable tool returns recoverable error and logs blocker.

## Milestones

1. Report repository and deterministic report agent.
2. Report APIs with progress/logs/download.
3. Report and interaction UI with chat proof.

## Team-Pack Gates

| Team | Required action before coding | Evidence after implementation | Status |
|---|---|---|---|
| product-architect | report/chat topology | report evidence | missing |
| ux-ui-craft | report/chat screenshots | screenshots | missing |
| test-and-verification | report/chat tests | proof rows | missing |
| integration-runtime | LLM/tool adapter proof | adapter log | missing |
| security-boundary | prompt/secret redaction proof | negative proof | missing |
| data-persistence | report readback | restart proof | missing |

## Stop Conditions

- Report does not trace to graph/simulation artifacts.
- Chat returns canned responses without context/tool behavior.
