#!/usr/bin/env bash
set -euo pipefail
ROOT=/root/blueprint
LOG_DIR="$ROOT/quality/overnight-remap-20260525"
SLUGS=(
  portable-ai-shorts-production-studio
  perfect-rag-retrieval-os
)
mkdir -p "$LOG_DIR"
cd "$ROOT"
notify() {
  local msg="$1"
  openclaw message send --channel telegram --target '579539601' --message "$msg" >/dev/null 2>&1 || true
}
{
  echo "== Resume remap started =="
  date -Is
  git checkout remap-old-buildprints-20260525
  git status --short
  for slug in "${SLUGS[@]}"; do
    echo ""
    echo "== Remapping $slug =="
    date -Is
    cat > "$LOG_DIR/$slug.prompt.txt" <<PROMPT
You are converting one existing Agent Buildprint from the old methodology to the current Mapper OS phase-flow methodology.

Repository: /root/blueprint
Target Buildprint slug: $slug
Target directory: buildprints/$slug

Hard constraints:
- Modify ONLY buildprints/$slug and any quality/report file under quality/overnight-remap-20260525 if needed. Do not modify Mapper OS, scripts, other Buildprints, package metadata outside the target, or website files.
- Treat the existing target directory as the source material. Preserve real product scope and valuable facts; do not shrink scope to make validation easy.
- Convert the target into executable Buildprint / Mapper OS phase-flow style, not a prompt template and not legacy document sludge.
- Use BUILDPRINT.md as the canonical start. Do NOT emit START_HERE.md, PRE_IMPLEMENTATION_QUESTIONS.md, 03-capabilities/, 04-interfaces/, 05-state-runtime/, 06-safety/, 08-evaluation/, 09-evidence/, or packet AGENTS.md.
- Required packet spine in buildprints/$slug:
  - BUILDPRINT.md
  - 01-questions.md
  - 02-project-setup.md
  - blueprint.yaml
  - 03-phases/phase-index.yaml
  - 03-phases/phase-flow.md
  - one or more 03-phases/*.md implementation phase files
  - 04-evaluation.md
  - 05-evidence/evidence-ledger.jsonl as seed-only
  - 05-evidence/evidence-ledger.schema.json
  - publication.json updated to describe the new packet honestly
- Every implementation phase file must start with exactly: ## How to implement this phase
- Every phase must require reading 03-phases/phase-flow.md, .buildprint/next-agent.md, and current project AGENTS.md.
- 02-project-setup.md must define architecture, team operating model, execution authority through 03-phases/phase-flow.md, delegation/handoff protocol, root/local AGENTS.md plan, quality gates, safety/permissions, assumptions, and the phase start gate.
- Runtime evidence belongs only in .buildprint/evidence/evidence-ledger.jsonl after phase-flow artifacts exist. Packaged 05-evidence/evidence-ledger.jsonl is seed-only.
- 05-evidence/evidence-ledger.schema.json must enforce honest runtime evidence fields: artifact_id, type, phase_id, status, source, proves, proof_type, provider_mode, upgrades_claim. Blocked/missing/synthetic/partial evidence cannot upgrade claims.
- Preserve security, provider, browser, persistence, billing, publishing, media, memory, retrieval, and other operational boundaries relevant to the target.
- Update publication.json summary/includes/checks/resultChecklist/copyPrompt so the website and package prompt reflect the new methodology.
- You may remove legacy duplicate files only inside buildprints/$slug when their content has been migrated into the new packet. If unsure, preserve as source/reference and ensure BUILDPRINT.md read order does not depend on them.

Before editing, inspect:
- buildprints/buildprint-mapper-os/METHODOLOGY.md
- buildprints/buildprint-mapper-os/EXECUTION_PROTOCOL.md
- buildprints/buildprint-mapper-os/templates/executable-packet/
- scripts/check-mapper-selected-output.mjs
- buildprints/$slug existing files

After editing, run:
- node scripts/check-mapper-selected-output.mjs buildprints/$slug
- npm run check:publication
- npm run check:spine
- git diff --check

Write a concise report to quality/overnight-remap-20260525/$slug.report.md with:
- scope preserved
- files changed
- validation commands and outcomes
- known gaps/blockers
- whether this target is ready to commit

Do not push. Do not send messages. Finish with a clear terminal summary.
PROMPT
    codex exec --full-auto "$(cat "$LOG_DIR/$slug.prompt.txt")" 2>&1 | tee "$LOG_DIR/$slug.codex.log"
    echo "== Gates after $slug =="
    node scripts/check-mapper-selected-output.mjs "buildprints/$slug" | tee "$LOG_DIR/$slug.check-mapper.log"
    npm run check:publication | tee "$LOG_DIR/$slug.check-publication.log"
    npm run check:spine | tee "$LOG_DIR/$slug.check-spine.log"
    git diff --check | tee "$LOG_DIR/$slug.diff-check.log"
    git add "buildprints/$slug"
    git commit -m "Remap $slug to phase-flow methodology"
  done
  echo ""
  echo "== Final gates =="
  npm run check:publication | tee "$LOG_DIR/final.check-publication.log"
  npm run check:spine | tee "$LOG_DIR/final.check-spine.log"
  for slug in portable-personal-agent-chat-os portable-ai-shorts-production-studio perfect-rag-retrieval-os; do
    node scripts/check-mapper-selected-output.mjs "buildprints/$slug" | tee "$LOG_DIR/$slug.final-check-mapper.log"
  done
  git diff --check | tee "$LOG_DIR/final.diff-check.log"
  git status --short
  git log -3 --oneline
  date -Is
  notify "Done: overnight remap resumed and finished on branch remap-old-buildprints-20260525. All three target Buildprints were committed locally; no push performed. Reports/logs are under /root/blueprint/quality/overnight-remap-20260525/."
} 2>&1 | tee "$LOG_DIR/resume.log" || {
  rc=${PIPESTATUS[0]:-1}
  notify "Failed: overnight remap resume stopped with exit code $rc on branch remap-old-buildprints-20260525. Check /root/blueprint/quality/overnight-remap-20260525/resume.log. No push performed."
  exit "$rc"
}
