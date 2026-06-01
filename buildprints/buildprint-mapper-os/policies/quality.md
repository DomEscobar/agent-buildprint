# Quality Policy

Core invariant: Buildprints should make better product implementation more likely. They should shape the agent's judgment before coding, not invite the agent to grade itself after coding.

## What Mapper OS should preserve

- The artifact type, promise, and central artifact/interface/boundary.
- The first usable end-to-end loop for the real consumer.
- Honest boundaries for credentials, providers, deployment, destructive actions, and security review.
- Mode-appropriate language and surface, not generic dashboards.
- State persistence/readback, traces, or reproducible outputs where the artifact needs continuity.
- A skeptical final review and concise handover.

## What Mapper OS should avoid

- Evidence theater: large proof ledgers, claim vocabulary, and self-reported compliance as quality substitute.
- Overlong phase files full of protocol language.
- Validators that reward proof-shaped prose instead of runnable structure.
- User-facing, developer-facing, or operator-facing surfaces that leak Buildprint/phase/proof/test vocabulary.
- Broad shallow panels that satisfy headings but do not create a usable product.

## Preferred generated packet shape

Keep the structure:

1. setup/alignment;
2. questions;
3. phases plus phase-flow;
4. reviewer step;
5. handover.

Rewrite the content toward product leadership:

- role/mission/craftsmanship alignment;
- central artifact/interface/boundary and artifact feel;
- concrete forbidden shortcuts;
- phase slices with product intention, build scope, quality bar, and do-not-ship list;
- phase flow that asks for the obvious next consumer action;
- final review that exercises controls/commands/API calls, reloads/reruns, changes input/config/events, and repairs slop;
- handover that tells the truth briefly.
