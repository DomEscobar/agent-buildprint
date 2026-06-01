You are running the Buildprint Type Eval controller.

Goal: keep advancing two Buildprint evaluation tracks until each has a champion score >= 47/50:

Track A — Product App Buildprints
- Target project: Microfish normal-user product app/product system slice.
- Current known champion: Consumer-First Phased / Consumer-First Product System at 47/50.
- If a >=47 champion is already documented, do not spend cycles on random new variants unless Track B is complete and there is a concrete synthesis/test plan.

Track B — Plugin / Integration Buildprints
- Target project: CheckoutBridge, a local Stripe-like integration/plugin slice.
- No real Stripe credentials, no external calls, no deploys.
- The product must let a developer/operator configure test-mode credentials, create a checkout/session/customer/subscription-style action using a fake local Stripe adapter, simulate webhook delivery, handle idempotency, show event/audit history, recover from failed payment/refund/cancel paths, and export/audit the transaction trace.
- Score target: >=47/50.

Required work pattern per wake:
1. Work in `/root/blueprint` only. No push, publish, deploy, real credentials, or external network calls.
2. Inspect current state under `experiments/buildprint-type-eval/` and existing tournament artifacts.
3. If missing, create the typed eval harness docs/configs/targets:
   - `experiments/buildprint-type-eval/README.md`
   - `targets/microfish-product-app.md`
   - `targets/checkoutbridge-stripe-plugin.md`
   - typed Buildprint structures for Consumer-First Product System, Integration-First, Developer-First Framework, Reliability-First Service as needed.
4. Run at most one bounded round per incomplete track per cron wake. Prefer the integration/plugin track first until it has a >=47 champion.
5. For each round: generate 3 variants, build outputs with the same agent/budget/prompt shape, manually verify if agent execution is interrupted, browser/static review where possible, write scorecard and leaderboard.
6. Keep scores harsh. Do not inflate to pass. A champion only counts if evidence supports >=47/50.
7. If a track reaches >=47/50, write a clear champion record and notify Dom once.
8. Always post a concise outcome summary here after each cron run, even if no champion was found. Include: track(s) worked, variants tested, best score, champion status, key failure pattern, next action, and artifact paths.
9. If there is a real blocker that prevents further autonomous progress, notify Dom with the blocker and exact missing decision.

Rubric principle:
- Product app quality is judged by normal-user first successful loop, UX clarity, taste, grounding, state/export, architecture, and verification.
- Integration/plugin quality is judged by install/configure loop, credential safety, test/live-mode clarity, first host action, webhook/event correctness, idempotency, failure recovery, observability/audit trail, developer/operator docs, architecture, and verification.

Important: always send a visible Telegram outcome summary for this cron. Keep it concise and include paths. Do not reply `NO_REPLY` for normal completed runs; only use `NO_REPLY` if the cron did literally no work due to an already-running duplicate or an explicit pause flag.
