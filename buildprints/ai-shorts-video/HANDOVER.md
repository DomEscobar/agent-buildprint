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
- Central output quality evidence:
  - <what the output makes clear>
  - <what still feels generic or weak>
  - <what a user/operator can do next from the output>

## Blocked

- <blocker> — <exact missing input/dependency/credential/command/decision>

## Not proven

- <claim that should not be made yet>
- <central output quality claim that should not be made yet>
- <selected typed quality gate that did not run or did not pass>
- <consumer/action UI or visual taste claim that is not proven by .buildprint/ui-evidence.md, independent review, docs/DESIGN.md, and screenshot comparison>

## Next

1. <next useful action>
2. <alternate action if blocked>

## Handoff warning

Do not claim completion beyond the evidence above. Visible controls must work or block honestly; provider/deployment/security claims require matching proof. Do not treat technically input-derived but domain-generic output as product completion. Do not claim consumer-grade, action-forward, visually tasteful, or distinctive UI unless `docs/ui-identity.md`, `docs/DESIGN.md`, `.buildprint/ui-evidence.md`, screenshots, and independent review prove it against the nearest bad silhouette and visual craft checks.
