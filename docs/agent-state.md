# Agent State Handoff

_Last updated: 2026-05-29 08:36 Europe/Berlin_

## Current repo state

Repository: `DomEscobar/agent-buildprint`

Current pushed `main` head:

- `4536251 Polish remapped publication metadata`
- Previous integration commit: `246b5da Remap foundation Buildprints`

At the time of this handoff, local `main` matched `origin/main` before this document was added.

## What changed

Six foundation Buildprints were remapped with the live Mapper OS `copyAgent` prompt, integrated into the source repository, validated, committed, and pushed.

### Remapped / renamed Buildprints

New public slugs:

- `buildprints/local-rag-chat-workbench`
- `buildprints/perfect-rag-retrieval`
- `buildprints/ai-presentation-generation`
- `buildprints/ai-shorts-production-studio`
- `buildprints/personal-agent-chat`
- `buildprints/novel-storyboard`

Legacy package dirs replaced/removed:

- `buildprints/portable-local-rag-chat-workbench`
- `buildprints/perfect-rag-retrieval-os`
- `buildprints/portable-ai-presentation-generation-os`
- `buildprints/portable-ai-shorts-production-studio`
- `buildprints/portable-personal-agent-chat-os`
- `buildprints/portable-novel-storyboard`

### Publication metadata

The six remapped `publication.json` files were checked and polished:

- Slugs point to the new public package paths.
- Titles are legacy-branding-free.
- `copyPrompt` bootstrap URLs point at the new slugs.
- `copyPrompt` routes through `.buildprint/next-agent.md`.
- `copyPrompt` keeps the manual snapshot-writing prohibition.
- Remaining targeted `portable-*`, `Portable`, and `portable ` wording was removed from the six publication records.
- Fixed a typo in Perfect RAG copy prompt: `Perfect RAG  Retrieval` → `Perfect RAG Retrieval`.

Publication polish commit:

- `4536251 Polish remapped publication metadata`

### Validation run

Source repo gates passed:

- `npm test`
  - `check:spine`
  - `check:publication`
  - `check:mapper-output`
  - `check:mapper-published`
  - negative mapper fixture checks
  - mapper golden eval
  - mapper replay dry-run
  - CLI smoke checks

Targeted publication checks passed:

- `npm run check:publication`
- `npm run check:mapper-published`
- targeted grep found no legacy refs in the six remapped `publication.json` files.

Website verification passed from the website repository:

- `npm run sync:buildprints -- --source <agent-buildprint repo>`
- `npm run check:buildprints`
- `npm run build`
- live publication URLs returned HTTP 200 for all six remapped slugs and showed correct slug/title with no targeted legacy refs.

Live checked publication URLs:

- `https://agent-buildprint.com/buildprints/local-rag-chat-workbench/files/publication.json`
- `https://agent-buildprint.com/buildprints/perfect-rag-retrieval/files/publication.json`
- `https://agent-buildprint.com/buildprints/ai-presentation-generation/files/publication.json`
- `https://agent-buildprint.com/buildprints/ai-shorts-production-studio/files/publication.json`
- `https://agent-buildprint.com/buildprints/personal-agent-chat/files/publication.json`
- `https://agent-buildprint.com/buildprints/novel-storyboard/files/publication.json`

## Known caveats / what may be left to do

1. **Website sync source-path caveat**
   - The website sync script may need an explicit `--source <agent-buildprint repo>` argument depending on the local checkout layout.
   - Optional follow-up: standardize the repo checkout path or update the website workflow/docs so future agents do not depend on machine-specific paths.

2. **Public website proof pages still mention old proof package links outside these six publication records**
   - Example found earlier: the OpenShorts proof page links to `/buildprints/portable-ai-shorts-production-studio/`.
   - The six live package/publication URLs are correct, but old proof pages may still need link cleanup.

3. **Implementation proof remains downstream work**
   - These Buildprints are executable remap packets, not completed implementations.
   - Claims remain proof-gated; unresolved implementation/runtime proof should remain `PROOF_REQUIRED` until downstream phase-flow evidence exists.

4. **Current repo author identity warning**
   - Git produced the standard root committer identity warning on commits.
   - Optional follow-up: configure `user.name` / `user.email` if desired, then amend only if Dom wants history rewritten. Do not rewrite pushed history without explicit approval.

## Suggested next agent checklist

Before making further changes:

1. In the source repository, run `git status --short --branch`.
2. Confirm `main` is at/after this handoff commit and matches `origin/main`.
3. If touching publication metadata, run:
   - `npm run check:publication`
   - `npm run check:mapper-published`
   - targeted live URL checks after push/deploy.
4. If touching any Buildprint packet structure, run full `npm test`.
5. If verifying the website, use the website repository and run:
   - `npm run sync:buildprints -- --source <agent-buildprint repo>`
   - `npm run check:buildprints`
   - `npm run build`
