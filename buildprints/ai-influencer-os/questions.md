# Alignment Interview Questions

Before implementation, the coding agent must ask these questions and wait for answers unless the user explicitly says “use Mila defaults”.

## Identity and positioning

1. Should this be a new persona or a Mila-like reference implementation?
2. What is the persona name, language mix, niche, and public content lane?
3. Should the vibe be close to Mila: dry, direct, understated, mixed DE/EN, lifestyle/gaming/gym/streetwear?
4. What should be forbidden for the persona voice?

## Platform and channels

5. Which chat channel should OpenClaw connect to first: Telegram, WhatsApp, Discord, web chat, or something else?
6. Which public platforms should be supported: Instagram, TikTok, X, YouTube Shorts, none/mock only?
7. Should browser-based publishing through visible Chromium/noVNC be included exactly like Mila?

## Image/video generation

8. Should image generation use Wavespeed like Mila?
9. Do you already have `WAVESPEED_API_KEY`, or should the implementation create placeholders and setup docs?
10. Should reference-image / identity-preserving workflows be required from day one?
11. What public image style should be canon: realistic lifestyle, gaming desk, fashion, gym, travel, or other?

## Autonomy and safety

12. Should public posts require manual approval, auto-publish after QA, or mock-only at first?
13. Should private media requests exist at all? If yes, what trust/consent gates are required?
14. What should the system always refuse?
15. Who is allowed to manage/approve posts?

## Memory and life simulation

16. Should user relationship memory be stored per chat/user like Mila?
17. Should the persona have simulated life state, journal, calendar, and recurring arcs?
18. How often should life/social autonomy loops run?
19. Should the manager be allowed to patch prompts/code autonomously, or only report issues?

## Deployment

20. Should the result be a Dockerized OpenClaw bot like Mila?
21. What ports are acceptable for noVNC/dashboard/browser publishing?
22. Which model provider should be used: OpenRouter/DeepSeek like Mila, OpenAI, Anthropic, or user choice?
23. Should the implementation include a dashboard?

## Output preference

24. Do you want a faithful Mila clone architecture, a simplified MVP, or a production-ready starter?
25. Which parts should intentionally differ from Mila?
