# Target: CheckoutBridge local Stripe-like plugin/integration slice

Build a local-only developer/operator product called **CheckoutBridge**. It simulates a Stripe-like checkout integration without real credentials, external calls, or deploys.

## Required outcomes

A developer/operator can:

1. install/start the local product with one clear command;
2. configure **test-mode** credentials safely, with no real secret request or live-mode ambiguity;
3. create a checkout/session/customer/subscription-style action through a fake local Stripe adapter;
4. simulate webhook delivery from the fake adapter;
5. prove webhook/event idempotency by redelivering the same event;
6. see event/audit history with statuses and timestamps;
7. recover from failed payment, refund, and cancel paths;
8. export/audit a transaction trace as JSON;
9. understand docs/operator controls without reading code first.

## Hard boundaries

- No real Stripe credentials.
- No external network calls.
- No deploys or public services.
- No fake live-mode success.
- Secrets must be masked in UI/export/logs.
- Idempotency must be observable, not just claimed.

## Rubric emphasis

Integration/plugin quality is judged by install/configure loop, credential safety, test/live-mode clarity, first host action, webhook/event correctness, idempotency, failure recovery, observability/audit trail, developer/operator docs, architecture, and verification.
