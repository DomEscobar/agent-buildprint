# 00 Internet Deepsearch

## Objective

When the user has not provided enough implementation context, search the internet and current primary sources to determine the best current technique before asking broad questions or writing packet files.

## When to run

Run this before intake questions whenever the user has not provided enough concrete context to choose a technique safely.

Examples:

- provider capability such as Stripe, Supabase, Clerk, Resend, OpenAI, Sentry, PostHog, or Vercel
- framework-specific capability such as Next.js middleware auth, Express RBAC, Django billing, or Rails background jobs
- "best way", "modern way", "recommended approach", "proven pattern", or "benchmark" language
- source repository, docs URL, package name, benchmark name, or competing implementation mentioned by the user
- unclear host framework, runtime, provider API version, pricing/billing behavior, security boundary, or destructive side effect

## Required internet deepsearch

Before asking the user, discover the likely best technique yourself:

- official provider or framework docs for the relevant API/version
- changelog or migration notes when the provider/framework is moving quickly
- source code or package examples when a repo/path is provided
- known reference implementations or starter templates from the provider/framework
- security, auth, billing, data, webhook, or migration constraints
- benchmark, comparison, or evaluation evidence for competing techniques when available
- current community or maintainer guidance only as secondary evidence after primary sources

Prefer an internet-capable deep research/search skill or tool when available. Pair it with project-local alignment/source inspection when a host repo or source package is provided. If no deepsearch tool exists, use the best available web search, official docs, and code inspection.

## Technique decision

The note must identify:

- candidate techniques or patterns considered
- selected technique and why it fits the target host/risk
- rejected techniques and why they are weaker, stale, too risky, or out of scope
- confidence level: high, medium, or low
- benchmark/proof basis, or `No benchmark evidence found`

## Evidence notes

Write an evidence note before authoring packet files. It can live in the working notes or in the authored packet's `references/` folder when the evidence should ship with the packet.

The note must include:

- sources inspected, with dates or versions when available
- implementation constraints discovered
- host assumptions the evidence supports
- benchmark/comparison claims found, or `No benchmark evidence found`
- selected best-current technique or explicit `No confident best technique found`
- unresolved questions that still require the user
- stale-risk areas that future agents must re-check

## Asking rule

Ask the user only after this internet deepsearch, and ask only for:

- product/business decisions the sources cannot decide
- secrets/account/provider access
- acceptable risk, cost, or migration tradeoffs
- target host framework when no host can be inferred
- permission to inspect private repos or external systems

## DO NOT

- Do not ask "what docs should I use?" before trying to find official docs yourself.
- Do not ask "which approach should I use?" before comparing current techniques yourself.
- Do not claim a provider pattern is current without checking docs or source.
- Do not convert a blog post, stale README, or model memory into a packet authority without marking it lower confidence.
- Do not invent benchmark numbers. Cite them or state that the packet is not benchmark-backed.
- Do not pretend there is a best technique when sources are weak; write `No confident best technique found`.
- Do not hide missing evidence inside assumptions.
