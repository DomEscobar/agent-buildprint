---
title: AI Influencer OS
slug: ai-influencer-os
category: Product OS
stack: [Persona, Memory, Image generation, Social publishing, TypeScript, JSON storage]
difficulty: Advanced
status: publishable-draft
creator: Agent Buildprint
---

# AI Influencer OS Buildprint

## 1. Product promise

Build a believable AI creator system: not just a chatbot, and not just an image generator, but a coherent persona with memory, life continuity, content planning, media boundaries, manager QA, and social publishing flow.

The first implementation should be local, mock-first, and safe. It should prove the architecture before connecting real social accounts, real image generation, or autonomous posting.

## 2. What this builds

A minimal AI Influencer OS with these modules:

1. **Persona Canon** — stable identity, voice, niche, visual rules, boundaries.
2. **Relationship Memory** — user-specific facts, preferences, trust, recent messages, open loops.
3. **Self-State / Life Continuity** — mood, energy, current arcs, calendar, journal, plausible recurring habits.
4. **Runtime Context Builder** — compact private context injected into chat/planning prompts.
5. **Content Planner** — turns life beats and content pillars into social draft ideas.
6. **Media Policy** — separates public-safe media, private media, blocked requests, and approval gates.
7. **Media Queue** — mock image/video jobs linked to drafts or private requests.
8. **Manager QA** — blocks low-quality, unsafe, inconsistent, or canon-breaking drafts.
9. **Mock Publisher** — approval-gated publishing to a local history log, not a real platform.
10. **Tests/Checks** — prove the lifecycle and safety gates work.

## 3. Non-goals for first implementation

- No real Instagram/TikTok posting.
- No real adult content generation.
- No real impersonation of existing people.
- No autonomous outreach to real people.
- No hidden prompt/policy leakage.
- No external paid API calls required.

## 4. Required file structure for generated implementation

Recommended minimal output:

```txt
persona/
  SOUL.md
  CANON.md
  BOUNDARIES.md
src/
  context-builder.ts
  memory-store.ts
  self-state.ts
  life-tick.ts
  social-planner.ts
  media-policy.ts
  media-queue.ts
  manager-qa.ts
  mock-publisher.ts
  types.ts
storage/
  users/.gitkeep
  self/state.json
  calendar/events.json
  journal/.gitkeep
  social/drafts.json
  social/published.json
tests/
  influencer-os.test.ts
VALIDATION.md
package.json
```

## 5. Data model

### User memory

```ts
type UserMemory = {
  userId: string;
  trust: number;
  stage: 'cold' | 'warm' | 'close';
  facts: string[];
  preferences: string[];
  openLoops: string[];
  recentMessages: { role: 'user' | 'persona'; text: string; at: string }[];
};
```

### Self-state

```ts
type SelfState = {
  mood: string;
  energy: number;
  socialBattery: number;
  currentArcs: string[];
  recurringHabits: string[];
  contentBacklog: string[];
  lastUpdated: string;
};
```

### Social draft

```ts
type SocialDraft = {
  id: string;
  platform: 'instagram' | 'tiktok' | 'x' | 'mock';
  caption: string;
  visualPrompt?: string;
  source: 'life' | 'calendar' | 'manual' | 'trend';
  groundedIn: string[];
  status: 'draft' | 'needs_qa' | 'approved' | 'blocked' | 'published';
  qaNotes: string[];
};
```

### Media request

```ts
type MediaRequest = {
  id: string;
  requesterUserId?: string;
  visibility: 'public' | 'private';
  prompt: string;
  adultIntent: boolean;
  includeFace: boolean;
  status: 'queued' | 'blocked' | 'ready' | 'failed';
  policyReason?: string;
};
```

## 6. Core flows

### Chat context flow

```txt
incoming user message
→ load user memory
→ load self-state / recent journal / social state
→ build compact private context
→ model/persona response can use context but must not leak internals
→ update memory/reflection after response
```

### Life continuity flow

```txt
scheduled life tick
→ read current self-state
→ make small plausible update
→ optionally add calendar/journal beat
→ never invent dramatic events without approval
```

### Social content flow

```txt
life/calendar/backlog/trend input
→ draft social post
→ manager QA checks grounding, voice, safety, repetition, visual consistency
→ approved draft enters mock publish queue
→ mock publisher writes local published history
```

### Media request flow

```txt
media request
→ classify visibility/adult/include-face
→ apply trust/safety/platform policy
→ public content must be platform-safe
→ private sensitive content requires explicit gates
→ queue mock media job or block with reason
```

## 7. Safety and ethics requirements

- Persona must be fictional or explicitly authorized.
- The system must not impersonate a real person.
- Public posts must not claim real events unless grounded in stored state.
- Real posting must require approval until separately enabled.
- Media generation must have public/private policy separation.
- Trust gates must exist for sensitive private media.
- User memory must never be published accidentally.
- Secrets and API keys must never be committed.

## 8. Acceptance checks

The generated project passes if:

- `npm test` or equivalent validation passes.
- A public post draft with ungrounded life claims is blocked.
- A safe grounded draft can be approved and mock-published.
- A private adult/sensitive media request from a low-trust user is blocked.
- Persona canon exists and manager QA checks against it.
- Mock publisher does not call external platforms.
- `VALIDATION.md` explains implementation choices and ambiguities.

## 9. Copyable agent prompt

```txt
Build an AI Influencer OS from this Buildprint.

Create a minimal local TypeScript/Node implementation with persona canon files, JSON storage, context builder, user memory, self-state, life tick, social draft planner, media policy, mock media queue, manager QA, mock publisher, and tests.

Do not call external APIs.
Do not integrate real social posting.
Do not create real-person impersonation.
Start with mock data and approval gates.

Run tests and write VALIDATION.md with:
1. what you built,
2. how to run it,
3. what ambiguities you found,
4. what should be improved in this Buildprint.
```
