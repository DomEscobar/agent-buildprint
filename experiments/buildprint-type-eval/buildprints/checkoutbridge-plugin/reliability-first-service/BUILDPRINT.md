# Reliability-First Service Buildprint

Optimize for correctness under retries and failures: event log, idempotency keys, state machine, recovery controls, audit export, and verification gates drive the product.

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

1. **State machine first** — model sessions/subscriptions/payments/refunds/cancellations and event transitions explicitly.
2. **Event log as source of truth** — every fake adapter action and webhook creates an auditable event with ids, timestamps, status, and idempotency key.
3. **Idempotency and retry proof** — redelivery must produce an observable dedupe record without corrupting state.
4. **Recovery console** — failed payment, refund, and cancel paths must move through clear states with operator action and audit trail.
5. **Verification** — tests/checks should hit duplicate events, masked credentials, failed transitions, export trace integrity, and a manual smoke.

Quality bar: the product should make integration failure modes feel inspectable and recoverable.

## Product review mindset

Build a usable local product first. Prefer a modest complete loop over a broad decorative surface. If the environment blocks a framework choice, switch to the simplest local stack and document the reason.
