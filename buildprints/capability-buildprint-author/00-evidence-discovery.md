# 00 Evidence Discovery

## Objective

Replace generic LLM recall with current, inspectable evidence before the author asks broad questions or writes packet files.

## When to run

Run this before intake questions whenever the user has not provided enough concrete context to author safely.

Examples:

- provider capability such as Stripe, Supabase, Clerk, Resend, OpenAI, Sentry, PostHog, or Vercel
- framework-specific capability such as Next.js middleware auth, Express RBAC, Django billing, or Rails background jobs
- "best way", "modern way", "recommended approach", "proven pattern", or "benchmark" language
- source repository, docs URL, package name, benchmark name, or competing implementation mentioned by the user
- unclear host framework, runtime, provider API version, pricing/billing behavior, security boundary, or destructive side effect

## Required evidence pass

Before asking the user, gather what can be discovered without them:

- official provider or framework docs for the relevant API/version
- changelog or migration notes when the provider/framework is moving quickly
- source code or package examples when a repo/path is provided
- known reference implementations or starter templates from the provider/framework
- security, auth, billing, data, webhook, or migration constraints
- benchmark, comparison, or evaluation evidence if the capability claims "best", "fastest", "most reliable", "recommended", or "proven"

Prefer a project-local skill/alignment workflow when available. If the environment has a deep research, source-driven-development, official-docs, or repo-orientation skill/tool, use it and record its output. If no such tool exists, use the best available primary-source search and code inspection.

## Evidence notes

Write an evidence note before authoring packet files. It can live in the working notes or in the authored packet's `references/` folder when the evidence should ship with the packet.

The note must include:

- sources inspected, with dates or versions when available
- implementation constraints discovered
- host assumptions the evidence supports
- benchmark/comparison claims found, or `No benchmark evidence found`
- unresolved questions that still require the user
- stale-risk areas that future agents must re-check

## Asking rule

Ask the user only after this evidence pass, and ask only for:

- product/business decisions the sources cannot decide
- secrets/account/provider access
- acceptable risk, cost, or migration tradeoffs
- target host framework when no host can be inferred
- permission to inspect private repos or external systems

## DO NOT

- Do not ask "what docs should I use?" before trying to find official docs yourself.
- Do not claim a provider pattern is current without checking docs or source.
- Do not convert a blog post, stale README, or model memory into a packet authority without marking it lower confidence.
- Do not invent benchmark numbers. Cite them or state that the packet is not benchmark-backed.
- Do not hide missing evidence inside assumptions.
