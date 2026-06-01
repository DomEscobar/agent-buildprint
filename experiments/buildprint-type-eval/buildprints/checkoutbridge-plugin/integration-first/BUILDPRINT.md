# Integration-First Plugin Buildprint

Make the integration contract visible first: configure test credentials, perform host actions, simulate webhooks, verify adapter boundaries, then polish operator experience.

## Target product

CheckoutBridge is a local-only Stripe-like integration/plugin slice. It must never ask for real Stripe credentials, never make external calls, and never imply live mode is working. Use deterministic fake local adapter data.

Required user/operator loop:

1. Start locally with one documented command.
2. Configure test-mode credentials; mask secrets everywhere.
3. Create checkout/session/customer/subscription-style action through a fake adapter.
4. Simulate webhook delivery.
5. Redeliver same event and visibly prove idempotency.
6. Inspect event/audit history.
7. Recover failed payment, refund, and cancel paths.
8. Export a JSON audit trace.

## Forbidden shortcuts

- Real Stripe credentials, external calls, deploys, or public services.
- Live-mode success language.
- Idempotency only claimed in prose.
- Static recovery text with no state transition.
- Unmasked secrets in UI, export, tests, or logs.
- Dead controls or unimplemented buttons.

## Required handover

Write `HANDOVER.md` in the output root with start command, tests/checks, manual smoke path, architecture notes, and honest known defects.


## Execution spine

1. **Integration contract first** — define the fake Stripe adapter methods, request/response shapes, event types, idempotency key model, and transaction trace schema before UI work.
2. **Small host journey** — build the shortest product path from credential config -> create checkout/session -> receive webhook -> inspect event.
3. **Retry and recovery** — add webhook redelivery, failed payment, refund, cancel, and recovery controls after the happy path is observable.
4. **Operator surface** — make status, masked config, event history, and export legible in the product UI.
5. **Verification** — test adapter behavior, idempotency, masking, and export; then run a manual smoke path as an operator.

Quality bar: an evaluator should feel they used a safe local integration sandbox, not a demo page with Stripe words.

## Product review mindset

Build a usable local product first. Prefer a modest complete loop over a broad decorative surface. If the environment blocks a framework choice, switch to the simplest local stack and document the reason.
