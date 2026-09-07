# Provider routes and dated public evidence

Public pages inspected **2026-09-07**. Documentation is discovery evidence, not live integration, quality, benchmark or pricing proof. Re-read current catalogs, terms, image limits and account pricing before each newly approved production batch. No benchmark evidence found. No plugin installation or paid generation is required to use this packet; the free fallback policy below applies when the preferred stack is unavailable.

## Asset-Maker quality contract
The preferred quality stack is **WaveSpeed + (RetroDiffusion OR Media4Agents)**, not three interchangeable provider alternatives. WaveSpeed MUST support both essential operations for the intended high-quality pipeline:
- Image editing: `bytedance/seedream-v5.0-pro/edit` — **Seedream, not Seedance**.
- Background removal: `bria/remove-background`.

Pair these WaveSpeed capabilities with verified RetroDiffusion or Media4Agents pixel-art/animation capabilities. Before promising this workflow, verify actual account access and current availability of both exact WaveSpeed models and the selected companion's required operations; record dated, non-secret evidence in the setup receipt. Catalog documentation alone is not account-access or live-integration proof. Verify current input/output schemas and limits rather than assuming pose, mask or strip support. Obtain user approval before any paid usage, including access probes, edits and background removal; do not spend merely to verify access.

If any required access/capability is missing or unverified, explicitly disclose the **quality limitation** before proceeding. Fallbacks are **only free solutions or suitably licensed free assets**; check provenance, attribution and redistribution rights. Custom SVG is a **last resort**, never an equivalent-quality replacement. Record the chosen fallback and user agreement to any changed art direction or quality target; never silently downgrade graphics. Apply the same visual QA, identity, alpha, motion and in-engine approval gates to fallback assets. If they cannot meet the agreed target, report a blocker rather than claiming equivalent quality.

## Existing solutions first
- [Phaser introduction](https://docs.phaser.io/phaser/getting-started/what-is-phaser): documented free/open-source 2D framework targeting desktop/mobile browsers; good browser-first candidate, not a universal engine mandate.
- [Godot documentation](https://docs.godotengine.org/en/stable/): alternative to inspect for native/editor-first delivery; version/export support must be checked in the applying project.
- [Tiled manual](https://doc.mapeditor.org/en/stable/): inspect selected export/tileset format before writing a custom map editor.
- [Kenney assets](https://kenney.nl/assets): candidate pack catalog; landing-page extraction did not establish individual licenses. Inspect each selected pack's license file and redistribution requirements before importing. Fallback packs must be free and suitably licensed, with provenance and style fit.

## Pixel-art companion option — Media4Agents (conditional)
[Public site](https://media4agents.com/) returned its application landing page. `/docs` and `/llms.txt` returned 404 at inspection. No usable public API/model/auth/recovery contract was verified. **Do not infer an endpoint, model slug or query flag from another packet or a remembered URL.**

An operator may select this route using current account documentation/dashboard. Before the first request, verify supported pixel-game workflow, reference/strip inputs, estimate method, charging/cache semantics and request recovery. Keep auth or billable token-bearing URLs out of source, manifests, logs, chat and public HTML. Use protected host-side setup and approved SDK/connector, cache approved output to rights-cleared static local assets, then ship those—not provider generation URLs. If the available route requires exposing a token URL or has unknown duplicate-charge behavior, block this companion and check direct RetroDiffusion alongside WaveSpeed; if the preferred stack remains unavailable, disclose the limitation and use only the free fallback policy above. Do not silently substitute a paid provider.

## Pixel-art companion option — direct RetroDiffusion MCP
[Official repository](https://github.com/Retro-Diffusion/retro-diffusion-mcp) documents a hosted Streamable HTTP server at `https://mcp.retrodiffusion.ai/mcp`; no local plugin is required by that service. The host/operator must connect it securely if desired; this packet does not install it. Authentication belongs in protected header configuration, never token URLs or command arguments.

Documented discovery tools: `list_available_models`, `list_available_styles`, `get_style_usage`, `list_edit_tools`. Use current returned schemas, not pinned invented style/model IDs. Check style-specific reference, size, transparency, animation and tileset constraints before choosing a request. `estimate_inference_cost` and `estimate_edit_tool_cost` are documented free estimates; obtain user approval for actual cap and allowed attempts before submission.

Documented generation/recovery:
- `create_inference` returns a `request_id`; `get_inference_result(request_id)` recovers/refreshes successful results without generating again.
- Prefer `start_inference_job` for animations/batches; poll `get_inference_job`. If a submit response is lost, use `list_inference_jobs` to recover the task rather than repeating generation.
- Missing/expired signed output URLs are a **retrieval** problem, not permission to generate anew. Download approved output promptly into controlled storage and hash it.

The [API compatibility policy](https://github.com/Retro-Diffusion/retro-diffusion-mcp/blob/master/API_COMPATIBILITY.md) is linked by the inspected repository; recheck version/retry/error details before integration. Repo documentation/manifests are MIT per its README, but service and output usage are governed separately by current terms. This packet copies no upstream scripts.

## WaveSpeed — essential image editing and background removal
[REST overview](https://wavespeed.ai/docs/rest-api), [model integration](https://wavespeed.ai/docs/docs-api) and [result retrieval](https://wavespeed.ai/docs/get-result) were inspected. The exact models required by the Asset-Maker contract above are requirements, not a claim of verified account access or successful execution. Check each model's current official page and actual account availability, input image fields, reference count, mask/pose support where needed, dimensions, output alpha, price and retention before promising or using it. Do not substitute a different model silently or assume a text-to-image model can edit a seed.

Docs describe task submission under `https://api.wavespeed.ai/api/v3/` using the complete model ID from that model's page. Record the returned prediction/task ID. Result query is documented as `GET https://api.wavespeed.ai/api/v3/predictions/{task-id}/result`. Poll no faster than two seconds, back off toward 5–10 seconds for long jobs and honor Retry-After. `completed` yields outputs; `failed`, `cancelled`, `timeout`, `deleted` are terminal failures; other states remain pending until a bounded client deadline. A deadline is not cancellation or proof of nonbilling.

The official integration page explicitly warns not to blindly retry submission: disconnected responses can still represent billed predictions. Recover by ID; if the ID is lost and no documented history lookup can be verified, use operator task history/support to reconcile. Do not invent an idempotency header or issue another POST automatically. After pose edits, restore pixel grid/palette with approved tools and rerun the full strip identity, alpha, anchor and motion QA—an attractive edited pose is not a game-ready animation.

## Protected setup and cost/recovery policy (all routes)
Use host-managed masked secret entry and supported secret references. If unavailable, the operator configures credentials securely outside the conversation. Never ask for or print credentials, pairing codes, token URLs or signed retrieval URLs in public evidence. No secrets in browser bundles, scripts, shell arguments or checked-in config. Only approved reference images may leave the host.

Keep the small **private generation request-ID ledger** in `templates/generation-ledger.md` for spending/recovery, separate from public assets and generic review evidence. Before submission record intent ID, provider, selected operation, exact non-secret parameter/source hashes, live estimate/currency, approved cap and attempts, approval reference and pending state. Submit once, persist returned IDs immediately, and reserve uncertain charges against the cap.

On timeout/disconnect: mark `unknown_acceptance`; first recover result/status/history, never blind retry. With a found job, poll/retrieve it without regeneration. With a terminal failure, check billing/refund facts; failure does not imply free. With no recoverable ID, stop and ask the operator to reconcile; any further spend needs explicit renewed approval acknowledging unresolved possible charges. Atomic local intent persistence and one submitter prevent accidental duplicate clicks but do not create provider idempotency. Publish only safe summary and final static hashes/licenses, not ledger contents or raw requests.
