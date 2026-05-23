# PRE_IMPLEMENTATION_QUESTIONS

Ask these before implementation if the answer is not already supplied by the harness.

1. Which persistence backend should qualify the product: local filesystem, SQLite/Postgres, object storage, or another durable store?
2. Should live provider proof use real LLM, Zep-compatible graph memory, and OASIS/CAMEL runtime credentials, or should the implementation remain deterministic-test-double only?
3. What upload limits, file retention rules, and deletion-confirmation semantics are required for user documents and generated reports?
4. Is the first implementation expected to be bilingual like the source, or English-only until the core workflow is proven?
5. Are simulated social platforms limited to Twitter/Reddit-compatible behavior, or should the implementation expose a platform adapter interface?

Safe defaults if unanswered: filesystem persistence for first slice, deterministic provider adapters, 50 MB upload limit, explicit destructive confirmations, English UI, Twitter/Reddit adapter labels without live platform calls.


## Safe Defaults

Ask at most five blocking questions. If unanswered, use deterministic no-network providers, local durable persistence, private/local deployment, non-destructive demo data, and keep claim status `SELECTED_UNQUALIFIED`. Do not ask for quality tier or team choice.
