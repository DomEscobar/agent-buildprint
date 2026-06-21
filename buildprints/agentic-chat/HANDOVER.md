# Handover

Use this template when stopping or finishing. Keep it concise, concrete, and evidence-based.

## Built

- <what was actually built>

## Verified

- Command/API/browser/runtime proof:
  - `<command>` — <result>
- Setup architecture and project structure gate:
  - Architecture packet — <paths to architecture/system-architecture.md, architecture/agent-runtime-loop.md, architecture/chat-turn-sequence.md, architecture/state-and-memory-model.md, architecture/failure-recovery-flow.md; PASS/FAIL/blocker>
  - Mermaid/labeled-edge check — <PASS/FAIL/blocker; cite generic boxes or unlabeled edges if failed>
  - `PROJECT_STRUCTURE.md` — <PASS/FAIL/blocker; cite product/runtime responsibility mapping and any rejected generic folders>
  - `ARCHITECTURE_STRUCTURE_TRACE.md` — <PASS/FAIL/blocker; component-to-file-to-proof trace coverage and architecture score 0-5>
  - Architecture drift — <none, updated, or blocker; cite changed components/files>
- Screenshot/browser/API/readback evidence:
  - <what was inspected>
- UI identity and screenshot gate:
  - Local identity artifacts — <docs/ui-identity.md/UI-IDENTITY.md and docs/DESIGN.md, not-ui-bearing marker, or blocker>
  - `agb verify ui .` — <PASS, FAIL with blocker, or not applicable reason>
  - Screenshot set — <paths for desktop/mobile/state captures in .buildprint/screenshots/ and silhouette comparison result>
  - UI evidence binder — <.buildprint/ui-evidence.md PASS/FAIL/blocker, with identity/design/action claims grounded in screenshot/source evidence>
  - Visual taste system proven — <yes/no; cite docs/DESIGN.md section, screenshot paths/regions, and any failed craft dial repairs>
  - Consumer/action UI proven — <yes/no; cite the next powerful user action, agent next move, visible state/result change, and moment-of-need recovery/approval/memory action>
  - Chat-native action gate — <PASS/FAIL/blocker; cite screenshot/source proof that conversation thread and composer/input dominate, and action affordances are inline rather than replacing chat>
  - Consumer chat craft gate — <PASS/FAIL/blocker; cite screenshot/source proof for Design Read, Taste Dials, polished empty state, composer quality, mobile comfort, system-label suppression, and no seeded feature-demo cards>
  - Nearest bad silhouette comparison — <named silhouette, screenshot/source evidence, and why the shipped UI is structurally different>
- Typed quality gates:
  - Architecture structure readiness — <applicable/not applicable> — <architecture packet, project structure, traceability proof, score, or blocker>
  - UI decision precision — <applicable/not applicable> — <proof or reason>
  - Visual viewport acceptance — <applicable/not applicable> — <desktop/mobile/overflow proof or reason>
  - Editor/content stress acceptance — <applicable/not applicable> — <fixture/proof or reason>
  - Semantic output acceptance — <applicable/not applicable> — <output-specificity proof or reason>
  - Integration/operator acceptance — <applicable/not applicable> — <install/configure/first-action/retry/audit proof or reason>
  - Critical review pushback — <score/result or blocker>
- Proven implementation requirements:
  - <hard domain> — <library/runtime/service used, custom proof, not applicable reason, or blocker>
- Central output quality evidence:
  - <what the output makes clear>
  - <what still feels generic or weak>
  - <what a user/operator can do next from the output>
- Capability maturity:
  - `streaming_chat_core` — <PASS/FAIL/blocker with real streaming, routing, persistence, retry/cancel, and chat UI proof>
  - `agentic_chat` — <PASS/FAIL/blocker with goal-to-action loop proof; do not pass from streaming chat alone>
- Builder loop:
  - observe/interpret/plan/act/inspect/critique/repair/verify/decide — <what changed during the repair loop and what evidence changed after rerun>
- Product loop:
  - goal intake — <screenshot/API/source proof or blocker>
  - plan or next-step state — <proof or blocker>
  - action selection — <model/tool/skill/MCP/memory/subagent proof or blocker>
  - policy/approval — <approval or blocked side-effect proof>
  - observation ingestion — <result attached to conversation proof>
  - critique/retry/recovery — <bounded retry or recovery proof>
  - resumable state — <restart/readback proof>
  - final synthesis — <proof that final answer ties back to original user goal>
- Proof loop:
  - score/reject/route/patch/rerun/rescore — <checks run, failed evidence rejected, repair made, rerun result>
  - plan-mode baseline — <comparison result against normal coding-agent plan mode or blocker; keep `agentic_chat` unqualified if not run>

## Blocked

- <blocker> — <exact missing input/dependency/credential/command/decision>

## Not proven

- full `agentic_chat` maturity when only `streaming_chat_core` is proven
- tools/skills, MCP, memory/compaction, or subagents when they lack typed runtime paths, policy states, audit records, and product-loop proof
- paid-provider quality or public hosting when only the local default provider was proven
- <claim that should not be made yet>
- <architecture, project structure, or runtime ownership claim that is not proven by architecture/*.md, PROJECT_STRUCTURE.md, and ARCHITECTURE_STRUCTURE_TRACE.md>
- <central output quality claim that should not be made yet>
- <selected typed quality gate that did not run or did not pass>
- <consumer/action UI or visual taste claim that is not proven by .buildprint/ui-evidence.md, independent review, docs/DESIGN.md, and screenshot comparison>
- <chat-native Agentic Chat claim that is not proven by first-viewport screenshot evidence>
- <consumer chat craft claim that is not proven by Design Read, Taste Dials, and first-viewport desktop/mobile screenshot evidence>

## Next

1. <next useful action>
2. <alternate action if blocked>

## Handoff warning

Do not claim completion beyond the evidence above. Visible controls must work or block honestly; provider/deployment/security claims require matching proof. Do not treat technically input-derived but domain-generic output as product completion. Do not claim the implementation has a sound architecture or maintainable project structure unless `architecture/*.md`, `PROJECT_STRUCTURE.md`, and `ARCHITECTURE_STRUCTURE_TRACE.md` prove product-specific components, labeled flows, component-to-code mapping, responsibility ownership, and score `4` or `5`. Do not claim consumer-grade, action-forward, visually tasteful, or distinctive UI unless `docs/ui-identity.md`, `docs/DESIGN.md`, `.buildprint/ui-evidence.md`, screenshots, and independent review prove it against the nearest bad silhouette and visual craft checks.
