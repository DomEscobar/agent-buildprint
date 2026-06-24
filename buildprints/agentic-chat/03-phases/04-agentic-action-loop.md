# Phase 04 - Model-Driven Agentic Action Loop

This phase promotes the product from `streaming_chat_core` to `agentic_chat`. The defining shift: the **model**, not the user and not a keyword matcher, decides when to run a tool, skill, MCP server, or memory action. If the build still relies on user-typed slash commands or regex intent parsing, this phase has not been done.

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`, `SPEC.md`, `CONTRACTS.md`, `EXTENSIONS.md`
- `blueprint.yaml` (`execution_model.product_loop`, `capability_maturity.agentic_chat`)
- `01-project-setup.md` and `02-ui-identity.md` as the standing architecture and UI identity contracts

Then implement this phase as one coherent product path on top of the proven streaming foundation. Do not regress the streaming floor. Build the smallest complete agentic loop that satisfies the objective, prove it with a real model-driven trace, and only then move on.

This phase requires a provider with **native tool/function calling** (or a structured-output equivalent). The provider/model recorded in `docs/architecture.md` must expose this; if it does not, either route the agentic turns through a configured provider that does, or record an honest blocker. A keyword/regex intent classifier is an explicit failure of this phase, not an acceptable fallback.

## Building objective

Keep `02-ui-identity.md` and the generated local UI identity open: agentic actions must appear as **inline, chat-native affordances** (action chips, inline approval/block cards, memory save prompts, trace disclosure attached to the message), never as a separate dashboard or command console.

Build the smallest useful **single-agent action loop**: a user states a goal in natural language; the model plans; the model autonomously emits a structured action request (tool / skill / MCP / memory) when one is needed; a typed policy decides allow/ask/block; side effects pause on an inline approval gate; the executed action returns a typed result; that observation re-enters the model context; the model continues, critiques, retries within budget, and produces a final synthesis tied to the original goal. The whole run is persisted and resumable.

Required runtime contracts (extend the phase-01/02 store; add a migration):

- `agent_run`: id, session id, originating message/turn id, goal text, status (`planning`/`awaiting_approval`/`running`/`completed`/`failed`/`blocked`/`cancelled`), step budget, retry budget, final synthesis, schema version.
- `agent_step`: id, agent run id, ordinal, kind (`model_decision`/`action_request`/`policy_result`/`approval`/`observation`/`critique`/`synthesis`), payload (product-safe), and timestamp.
- `action_request`: id, agent run id, action kind (`tool`/`skill`/`mcp`/`memory`), target id, typed arguments, the model rationale that selected it, and side-effect class (`none`/`read`/`write`/`external`).
- `policy_result`: allow / ask / block, reason, required approval scope; derived from an explicit allowlist, not from model text.
- `approval_record`: action request id, decision (`approved`/`denied`), actor, timestamp.
- `action_result`: action request id, status (`completed`/`failed`/`blocked`), typed output, latency, normalized error, and the observation summary fed back to the model.
- `memory_entry`: scope, content, write decision (`auto`/`ask`/`skip`/`block`), retention posture, created/updated timestamps; plus `compaction_summary` records in product language.

Product-proof contract for this phase:

- Named product loop: Model-Driven Agentic Turn.
- User/operator action: send a natural-language goal that implies a tool/MCP/memory action; observe the model select the action itself; approve or deny the side effect inline; see the typed result feed back; read the final goal-tied synthesis; reload and confirm the agent run, steps, approvals, and observations persisted.
- Failure modes that must produce honest product-visible states without fake success: model emits no action when one is needed (loop still answers honestly), model selects a non-allowlisted action (blocked, audited), approval denied (no side effect, run continues or blocks honestly), tool/MCP timeout or error (normalized, retried within budget or blocked), step/retry budget exhausted (honest stop with partial result), and persistence failure.
- Concrete proof artifact: `.buildprint/evidence-phase-04.md` with an API/browser transcript showing the provider tool-call selection, the approval gate, the typed result, observation re-ingestion, the final synthesis, and persisted readback after restart. The transcript must make clear the action was model-selected, not user-typed.

Required surface behavior:

- The model's action selection must be a real provider tool/function call (or structured-output contract) — include the raw selection in the trace disclosure, not just a rendered card.
- Every side-effecting action (`write`/`external`) must block on an inline approval card attached to the message; `none`/`read` actions may run without approval but must still persist an audit record.
- The thread stays dominant: action chips, approval cards, memory prompts, and trace disclosure are inline, not a separate console.
- MCP/tool execution stays blocked until allowlist + credentials + side-effect class + timeout/error handling exist; a blocked capability is shown as an actionable blocked state, never a stub presented as working.

## DO NOT

- Do not use slash commands, keyword matching, or regex to decide intent or select actions; selection must come from the model.
- Do not execute any action from implicit model prose; only typed, allowlisted action requests run.
- Do not run a side-effecting action without an approval record.
- Do not skip feeding the observation back into the model; a one-shot command that never re-enters the loop is not agentic.
- Do not fabricate tool/MCP results or present a permanently blocked capability as working.
- Do not regress or bypass the phase-01/02 streaming, routing, retry, or persistence guarantees.
- Do not let the agentic UI displace the conversation thread with a dashboard or run-control console.
- Do not mark this phase complete from code edits or prose alone.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Prove via API/browser transcript that the model selected an action through provider tool/function calling from a natural-language goal (no user command).
- Prove a side-effecting action blocked on the approval gate and only executed after approval, with an `approval_record` persisted.
- Prove a non-allowlisted or unconfigured action blocked without side effect and left an audit record.
- Prove the typed observation re-entered the model context and influenced the final synthesis.
- Prove bounded retry on a failed action and an honest stop when the step/retry budget is exhausted.
- Prove `agent_run`, `agent_step`, `action_request`, `approval_record`, and `action_result` persist and read back after restart.
- Capture screenshot/browser/API evidence for the planning, awaiting-approval, running, blocked, and completed states.
- Record any blocker with the exact missing dependency, credential, command, or decision.

## Handoff note

Write what was built, the provider/model and its tool-calling mode, the exact agentic routes/commands, the model-driven selection proof, the approval-gate proof, the observation-re-ingestion proof, the memory write-policy proof, retry/budget behavior, persisted readback evidence, the highest honest claim (`agentic_chat` proven or blocked), and what the swarm phase can trust from this single-agent loop.
