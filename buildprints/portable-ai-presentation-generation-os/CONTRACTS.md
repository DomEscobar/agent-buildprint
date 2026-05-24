# CONTRACTS

## Generation request

A generation request accepts content plus optional slides markdown, instructions, tone, verbosity, web search, slide count, language, template, file ids, export format, and webhook trigger.

## Runtime contracts

- Authenticated API routes must reject unauthenticated `/api/v1` calls except explicit auth endpoints.
- Provider adapters must disclose deterministic/local/live mode and normalize provider errors.
- File upload and asset routes must validate type/size/path and avoid secret/path leakage.
- Presentation state must persist presentations, slides, templates/themes, assets, chat history, async task status, and export artifacts where claimed.
- Export must return real PPTX/PDF artifacts or a blocker; placeholder downloads do not satisfy the contract.
