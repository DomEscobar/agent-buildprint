# Developer-First Framework Buildprint

Optimize for a developer adopting the plugin: clear install, adapter interfaces, examples, CLI/UI affordances, docs, and repeatable tests before extra polish.

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

1. **Adoption README first** — write the install/start/configure path and intended adapter seams, then build exactly that path.
2. **Framework seams** — keep fake adapter, event store, idempotency guard, recovery actions, export, and UI/CLI/API seams separate enough for a developer to extend.
3. **Example-driven product** — include seeded examples and a first host action that proves the framework wiring.
4. **Docs in the product** — surface test-mode safety, event types, redelivery behavior, and export meaning where the operator needs them.
5. **Verification** — automated checks must cover public seams; handover must explain how to add a new fake event/action.

Quality bar: a developer should understand how to embed or extend CheckoutBridge after one run.

## Product review mindset

Build a usable local product first. Prefer a modest complete loop over a broad decorative surface. If the environment blocks a framework choice, switch to the simplest local stack and document the reason.
