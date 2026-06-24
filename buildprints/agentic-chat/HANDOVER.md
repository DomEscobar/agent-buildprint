# Handover

Use this template when stopping or finishing. Keep it concise, concrete, and evidence-based.

## Built

- <what was actually built>

## Verified

- Command/API/browser/runtime proof:
  - `<command>` — <result>
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
  - UI decision precision — <applicable/not applicable> — <proof or reason>
  - Visual viewport acceptance — <applicable/not applicable> — <desktop/mobile/overflow proof or reason>
  - Editor/content stress acceptance — <applicable/not applicable> — <fixture/proof or reason>
  - Semantic output acceptance — <applicable/not applicable> — <output-specificity proof or reason>
  - Integration/operator acceptance — <applicable/not applicable> — <install/configure/first-action/retry/audit proof or reason>
  - Critical review pushback — <score/result or blocker>
- Proven implementation requirements:
  - <hard domain> — <library/runtime/service used, custom proof, not applicable reason, or blocker>
- Capability maturity (see `capability_maturity` in `blueprint.yaml`):
  - streaming_chat_core — <proven/blocked; cite streaming token trace + persistence readback>
  - agentic_chat — <proven/blocked; cite a model-driven action-selection trace (provider tool call), an approval-gated audited tool/MCP/memory execution, and observation re-ingestion>
  - agentic_swarm — <proven/blocked; cite a real parallel subagent run trace, isolated per-worker context, supervisor fan-in synthesis, and partial-failure handling>
  - Highest honest claim — <streaming_chat_core | agentic_chat | agentic_swarm>
- Central output quality evidence:
  - <what the output makes clear>
  - <what still feels generic or weak>
  - <what a user/operator can do next from the output>

## Blocked

- <blocker> — <exact missing input/dependency/credential/command/decision>

## Not proven

- any capability maturity level whose proof above is blocked — do not claim `agentic_chat` without a model-driven action + approval-gated audited execution trace, and do not claim `agentic_swarm` without a real parallel subagent + supervisor synthesis trace
- model-driven action selection claimed while the build still relies on user-typed slash commands or keyword/regex intent matching
- parallel swarm claimed while subagents actually run sequentially or are fabricated
- paid-provider quality or public hosting when only the local default provider was proven
- <claim that should not be made yet>
- <central output quality claim that should not be made yet>
- <selected typed quality gate that did not run or did not pass>
- <consumer/action UI or visual taste claim that is not proven by .buildprint/ui-evidence.md, independent review, docs/DESIGN.md, and screenshot comparison>
- <chat-native Agentic Chat claim that is not proven by first-viewport screenshot evidence>
- <consumer chat craft claim that is not proven by Design Read, Taste Dials, and first-viewport desktop/mobile screenshot evidence>

## Next

1. <next useful action>
2. <alternate action if blocked>

## Continue paths (propose, do not auto-run)

Always offer the next agent a concrete continue menu, and gate the live items on missing inputs instead of treating them as done. In particular:

- If a real provider key is still missing, propose a credential-gated continue: "when `OPENROUTER_API_KEY` (or the selected provider key) is set, run the live verification chain" — live streaming floor, live model-driven tool/MCP/memory chat (no slash commands), live swarm dispatch with concurrency-timestamp proof, then capture `evidence-phase-04`/`evidence-phase-05`, screenshots, and re-run `agb verify ui .` + `agb claim check .` to lift the maturity claims.
- If a key is present but live traces are not yet captured, propose running each maturity proof and recording its evidence before claiming the level.
- Offer a no-credential continue too (UX/polish/test repairs) so progress is possible while live proof is blocked.
- Keep every proposed continue honest: a proposed verification is not a proven claim until its trace exists.

## Handoff warning

Do not claim completion beyond the evidence above. Visible controls must work or block honestly; provider/deployment/security claims require matching proof. Do not treat technically input-derived but domain-generic output as product completion. Do not claim consumer-grade, action-forward, visually tasteful, or distinctive UI unless `docs/ui-identity.md`, `docs/DESIGN.md`, `.buildprint/ui-evidence.md`, screenshots, and independent review prove it against the nearest bad silhouette and visual craft checks.
