#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = process.cwd();
const defaultPacket = 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/executable-packet-good/selected-buildprint';
const defaultReport = 'quality/mapper-replay-report.json';
const defaultTranscript = 'quality/mapper-replay-transcript.txt';

function usage() {
  return [
    'Usage: node scripts/eval-mapper-replay.mjs [options]',
    '',
    'Options:',
    `  --packet <path>       Selected executable-blueprint packet to replay (default: ${defaultPacket})`,
    `  --report <path>       JSON report path (default: ${defaultReport})`,
    `  --transcript <path>   Transcript artifact path (default: ${defaultTranscript})`,
    '  --codex <command>     Codex CLI command (default: CODEX_CLI or codex)',
    '  --timeout-ms <n>      Real Codex replay timeout in milliseconds (default: 1200000)',
    '  --keep-workspace      Keep the /tmp replay workspace after the run',
    '  --all-phases         Replay every phase in phase-index.yaml, not only active_phase',
    '  --dry-run, --no-codex Validate copy/git/prompt/report/scoring mechanics without invoking Codex',
    '  --help                Show this help',
  ].join('\n');
}

function parseArgs(argv) {
  const options = {
    packet: defaultPacket,
    report: defaultReport,
    transcript: defaultTranscript,
    codex: process.env.CODEX_CLI || 'codex',
    timeoutMs: 20 * 60 * 1000,
    dryRun: false,
    keepWorkspace: false,
    allPhases: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') {
      console.log(usage());
      process.exit(0);
    } else if (arg === '--dry-run' || arg === '--no-codex') {
      options.dryRun = true;
    } else if (arg === '--keep-workspace') {
      options.keepWorkspace = true;
    } else if (arg === '--all-phases') {
      options.allPhases = true;
    } else if (['--packet', '--report', '--transcript', '--codex', '--timeout-ms'].includes(arg)) {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`${arg} requires a value`);
      index += 1;
      if (arg === '--packet') options.packet = value;
      if (arg === '--report') options.report = value;
      if (arg === '--transcript') options.transcript = value;
      if (arg === '--codex') options.codex = value;
      if (arg === '--timeout-ms') {
        const parsed = Number(value);
        if (!Number.isFinite(parsed) || parsed <= 0) throw new Error('--timeout-ms must be a positive number');
        options.timeoutMs = parsed;
      }
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function toPosix(file) {
  return file.split(path.sep).join('/');
}

function rel(from, to) {
  return toPosix(path.relative(from, to));
}

function walk(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, base));
    if (entry.isFile()) out.push(rel(base, full));
  }
  return out.sort();
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function safeReadText(file) {
  try {
    return readText(file);
  } catch {
    return '';
  }
}

function hashDir(dir) {
  const hash = crypto.createHash('sha256');
  for (const file of walk(dir)) {
    hash.update(file);
    hash.update('\0');
    hash.update(fs.readFileSync(path.join(dir, file)));
    hash.update('\0');
  }
  return hash.digest('hex');
}

function copyPacket(source, workspace) {
  const target = path.join(workspace, 'selected-buildprint');
  fs.cpSync(source, target, { recursive: true });
  return target;
}

function run(command, args, opts = {}) {
  const stdoutFile = path.join(os.tmpdir(), `mapper-replay-stdout-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const stderrFile = path.join(os.tmpdir(), `mapper-replay-stderr-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const stdoutFd = fs.openSync(stdoutFile, 'w');
  const stderrFd = fs.openSync(stderrFile, 'w');
  let result;
  try {
    result = spawnSync(command, args, {
      ...opts,
      stdio: ['ignore', stdoutFd, stderrFd],
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
  } finally {
    fs.closeSync(stdoutFd);
    fs.closeSync(stderrFd);
  }
  const stdout = safeReadText(stdoutFile);
  const stderr = safeReadText(stderrFile);
  fs.rmSync(stdoutFile, { force: true });
  fs.rmSync(stderrFile, { force: true });
  return {
    ...result,
    stdout,
    stderr,
    encoding: 'utf8',
  };
}

function initGit(workspace) {
  const init = run('git', ['init'], { cwd: workspace });
  if (init.status !== 0) throw new Error(`git init failed: ${init.stderr || init.stdout}`);
  run('git', ['config', 'user.email', 'mapper-replay@example.invalid'], { cwd: workspace });
  run('git', ['config', 'user.name', 'Mapper Replay Harness'], { cwd: workspace });
  run('git', ['add', '.'], { cwd: workspace });
  const commit = run('git', ['commit', '-m', 'Initialize mapper replay workspace'], { cwd: workspace });
  if (commit.status !== 0) throw new Error(`git commit failed: ${commit.stderr || commit.stdout}`);
}

function codexAvailable(command) {
  const check = run(command, ['--version']);
  return check.error && check.error.code === 'ENOENT'
    ? { ok: false, detail: `${command} was not found on PATH` }
    : { ok: true, detail: (check.stdout || check.stderr || '').trim() };
}

function parsePhaseIndex(packetDir) {
  const indexPath = path.join(packetDir, '03-phases/phase-index.yaml');
  const text = safeReadText(indexPath);
  const activeFile = text.match(/^active_phase:\s*(.+)$/m)?.[1]?.trim() || '03-phases/01-ingest-record.md';
  const phaseBlocks = text.split(/\n\s*-\s+phase_id:\s+/).slice(1);
  const phases = phaseBlocks.map((block) => {
    const phaseId = block.match(/^([^\n]+)/)?.[1]?.trim();
    const file = block.match(/\n\s*file:\s*([^\n]+)/)?.[1]?.trim();
    const proofGate = block.match(/\n\s*proof_gate:\s*([^\n]+)/)?.[1]?.trim() || (phaseId ? `proof-${phaseId}` : null);
    return phaseId && file ? { activeFile: file, phaseId, proofGate } : null;
  }).filter(Boolean);
  const fallbackPhaseId = path.basename(activeFile, '.md').replace(/^\d+-/, '');
  const active = phases.find((item) => item.activeFile === activeFile) || { activeFile, phaseId: fallbackPhaseId, proofGate: `proof-${fallbackPhaseId}` };
  return { ...active, phases: phases.length ? phases : [active] };
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildPrompt(phase, options = {}) {
  const phasesToReplay = options.allPhases ? phase.phases : [phase];
  const phaseList = phasesToReplay.map((item) => `- ${item.phaseId}: ${item.activeFile} (${item.proofGate})`).join('\n');
  const taskLine = options.allPhases
    ? 'Task: execute the full blueprint suite by implementing and verifying every phase in `03-phases/phase-index.yaml`, in dependency order. Do not stop after phase 1.'
    : 'Task: perform a practical active-phase replay according to the packet.';
  const proofLine = options.allPhases
    ? '7. Write runtime proof rows to `.buildprint/evidence/evidence-ledger.jsonl` for every phase_id. If any phase is blocked, stubbed, or only reserved, the replay must be reported as incomplete, not passed.'
    : '7. Write runtime proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` with the active `phase_id`.';
  return [
    'You are a fresh downstream implementation agent in an isolated temp workspace.',
    '',
    'Use only this workspace and the copied executable-blueprint packet at `selected-buildprint/`.',
    'Do not use any parent repository context, mapper implementation code, package fixtures, or network-only assumptions.',
    '',
    taskLine,
    '',
    'Phases to replay:',
    phaseList,
    '',
    'Required operating contract:',
    '1. Your first packet action must be reading `selected-buildprint/BUILDPRINT.md`. Do not run find/ls/tree/glob, enumerate packet files, or open any other packet file before reading it.',
    `2. Follow its read order through \`01-questions.md\`, \`02-project-setup.md\`, \`blueprint.yaml\`, \`03-phases/phase-index.yaml\`, \`03-phases/phase-flow.md\`, ${options.allPhases ? 'each phase file in dependency order' : `the active phase file \`${phase.activeFile}\``}, \`04-evaluation.md\`, the evidence ledger seed, and \`05-evidence/evidence-ledger.schema.json\` before writing runtime evidence.`,
    '3. Treat blank ordinary questions as AI best-judgment defaults. Ask or stop only for irreversible, expensive, credentialed, destructive, or product-defining choices.',
    '4. Complete the project setup gate before phase work. Create implementation-project instructions only in the temp workspace, not inside the copied packet.',
    '5. Treat AGENTS.md as a scope governor, not the product brain. The current assignment/handoff is the role and scope; do not infer extra global scope from unrelated files.',
    '6. For multi-phase work, create bounded handoffs before implementation: each handoff states files to read, allowed edits, non-goals, success criteria, verification command, and evidence row requirements. Then integrate, verify, and update continuity.',
    proofLine,
    '8. Runtime evidence rows must conform to `selected-buildprint/05-evidence/evidence-ledger.schema.json`: include `artifact_id`, `type`, `phase_id`, valid `status`, `source`, array `proves`, `proof_type`, `provider_mode`, and `upgrades_claim`.',
    '9. Never set `upgrades_claim: true` on blocker-qualified evidence. If proof is blocked, synthetic, dependency-missing, or only partially verified, use a valid blocker/skipped status and `upgrades_claim: false`.',
    '10. Do not claim `no_fake_scan_pass` unless you create and run an actual no-fake scan command/artifact; otherwise record a blocker or omit that proof claim.',
    '11. Run meaningful verification gates for your changes, including tests/build/runtime checks where possible.',
    '12. Do not create or route through obsolete packet entrypoints or capability folders.',
    '13. Do not traverse outside the temp workspace. Never run `find ..`, `ls ..`, `rg ..`, `grep ..`, or equivalent parent-directory scans.',
    '',
    'At the end, print a compact replay summary with files changed, setup gate handling, phase/proof-gate result for each replayed phase, verification command/result, evidence-ledger action, and the read-order sequence you actually followed.',
  ].join('\n');
}

function syntheticDryRun(workspace, phase, options = {}) {
  fs.writeFileSync(path.join(workspace, 'AGENTS.md'), [
    '# AGENTS.md',
    '',
    'Project shape, architecture rules, quality gates, safety rules, and workflow are derived from selected-buildprint/02-project-setup.md.',
  ].join('\n'));
  const ledgerDir = path.join(workspace, '.buildprint/evidence');
  fs.mkdirSync(ledgerDir, { recursive: true });
  const phasesToReplay = options.allPhases ? phase.phases : [phase];
  for (const item of phasesToReplay) {
    const phaseRunDir = path.join(workspace, '.buildprint/phase-runs', item.phaseId);
    fs.mkdirSync(path.join(phaseRunDir, 'reviews'), { recursive: true });
    fs.writeFileSync(path.join(phaseRunDir, 'reviews/architecture.md'), [
      '## Verdict',
      '',
      'pass-with-scoped-debt',
      '',
      '## Dependency direction',
      '',
      'Dry-run dependency direction is limited to harness-created artifacts; no generated implementation dependency is claimed.',
      '',
      '## Source capability preservation',
      '',
      'Dry-run preserves no product capability claim; it only exercises replay harness mechanics for the selected phase.',
      '',
      '## State and runtime ownership',
      '',
      'Harness owns the temporary `.buildprint` artifacts and does not claim product runtime state ownership.',
      '',
      '## Provider/live claim honesty',
      '',
      'No live provider, credential, network service, or deployment behavior is claimed by the dry run.',
      '',
      '## Scoped shortcuts',
      '',
      'Synthetic files are accepted only for dry-run harness validation and must not upgrade product claims.',
      '',
      '## Next-phase boundary',
      '',
      'Future phases cannot inherit product completion from this dry-run artifact.',
      '',
      '## Required repair before evidence',
      '',
      'None for harness mechanics; product evidence still requires a real Codex replay.',
    ].join('\n'));
    fs.writeFileSync(path.join(phaseRunDir, 'reviews/ux.md'), [
      '## Verdict',
      '',
      'not-ui-bearing',
      '',
      '## Reason',
      '',
      'Dry-run mode does not implement a UI surface and therefore cannot provide visual quality proof.',
      '',
      '## Downstream UI obligations',
      '',
      'A real replay must produce UI review evidence whenever the selected phase is UI-bearing.',
    ].join('\n'));
    fs.writeFileSync(path.join(phaseRunDir, 'reviews/qa.md'), [
      '## Verdict',
      '',
      'pass-with-scoped-debt',
      '',
      '## Commands run',
      '',
      '`--dry-run` harness path wrote synthetic artifacts only.',
      '',
      '## What passed',
      '',
      'Replay harness file creation, score plumbing, and evidence ledger mechanics were exercised.',
      '',
      '## What this does not prove',
      '',
      'It does not prove product implementation behavior, browser runtime, live providers, or full proof gates.',
      '',
      '## Blockers and claim limits',
      '',
      'Dry-run evidence cannot upgrade any product claim and must be replaced by real replay proof.',
      '',
      '## Evidence row check',
      '',
      '`upgrades_claim` remains false because this is synthetic harness evidence.',
    ].join('\n'));
  }
  fs.writeFileSync(path.join(ledgerDir, 'evidence-ledger.jsonl'), phasesToReplay.map((item) => JSON.stringify({
    artifact_id: `dry-run-replay-${item.phaseId}`,
    type: options.allPhases ? 'runtime_proof' : 'blocker',
    phase_id: item.phaseId,
    status: options.allPhases ? 'passed' : 'blocked',
    source: 'dry-run harness',
    proves: ['harness_mechanics_only'],
    proof_type: 'harness_dry_run',
    provider_mode: 'none',
    upgrades_claim: false,
  })).join('\n') + '\n');

  return [
    'DRY RUN: Codex was not invoked.',
    `Read order simulated: BUILDPRINT.md -> 01-questions.md -> 02-project-setup.md -> blueprint.yaml -> 03-phases/phase-index.yaml -> 03-phases/phase-flow.md -> ${phase.activeFile} -> 04-evaluation.md -> evidence ledger seed -> 05-evidence/evidence-ledger.schema.json.`,
    'Question gate simulated: blank ordinary answers became AI best judgment assumptions; no human question was required.',
    'Setup gate simulated: completed project setup and created root AGENTS.md in the temp implementation workspace.',
    `Phase replay simulated: ${options.allPhases ? 'all phases' : `active phase ${phase.phaseId}`} reached requested proof gates.`,
    `Evidence simulated: wrote .buildprint/evidence/evidence-ledger.jsonl for ${phasesToReplay.map((item) => item.phaseId).join(', ')}.`,
  ].join('\n');
}

function runCodexReplay(command, workspace, prompt, timeoutMs) {
  return run(command, ['exec', '--full-auto', prompt], {
    cwd: workspace,
    timeout: timeoutMs,
    env: {
      ...process.env,
      NO_COLOR: '1',
      TERM: 'dumb',
    },
  });
}

function textCorpus(workspace, output) {
  const files = walk(workspace);
  const readable = [];
  for (const file of files) {
    const full = path.join(workspace, file);
    const stat = fs.statSync(full);
    if (stat.size > 1024 * 1024) continue;
    const text = safeReadText(full);
    if (!text.includes('\0')) readable.push({ file, text });
  }
  return {
    files,
    fileText: readable.map((item) => `${item.file}\n${item.text}`).join('\n'),
    outputText: [output.stdout, output.stderr].filter(Boolean).join('\n'),
  };
}

function includesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function sectionBody(text, heading) {
  const escaped = escapeRegex(heading);
  const match = text.match(new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'mi'));
  return match ? match[1].trim() : '';
}

function sectionAnswered(text, heading, options = {}) {
  const body = sectionBody(text, heading);
  if (!body) return false;
  if (options.verdict) return /^(pass|pass-with-scoped-debt|blocker|not-ui-bearing)\b/i.test(body);
  const compact = body.replace(/[`*_>\-\s]/g, '').toLowerCase();
  if (/^(none|na|n\/a|notapplicable|ok|yes|passed|looksgood|todo|tbd)$/.test(compact)) return options.allowNone === true && /^(none|na|n\/a|notapplicable)$/.test(compact);
  if (compact.length < (options.minChars || 24)) return false;
  return true;
}

function reviewHasAnsweredSections(text, headings, optionsByHeading = {}) {
  return headings.every((heading) => sectionAnswered(text, heading, optionsByHeading[heading] || {}));
}

function reviewContractChecks(workspace, phasesToReplay) {
  const checks = [];
  for (const item of phasesToReplay) {
    const root = path.join(workspace, '.buildprint/phase-runs', item.phaseId);
    const arch = safeReadText(path.join(root, 'reviews/architecture.md'));
    const ux = safeReadText(path.join(root, 'reviews/ux.md'));
    const qa = safeReadText(path.join(root, 'reviews/qa.md'));
    const architectureHeadings = [
      'Dependency direction',
      'Source capability preservation',
      'State and runtime ownership',
      'Provider/live claim honesty',
      'Scoped shortcuts',
      'Next-phase boundary',
      'Required repair before evidence',
    ];
    const uxHeadings = [
      'Primary user job',
      'Screen composition',
      'State matrix',
      'Responsive/accessibility proof',
      'Destructive/sensitive actions',
      'Screenshot or DOM evidence',
      'Required repair before evidence',
    ];
    const qaHeadings = [
      'Commands run',
      'What passed',
      'What this does not prove',
      'Blockers and claim limits',
      'Evidence row check',
    ];
    checks.push({
      id: `architecture_review_contract_${item.phaseId}`,
      ok: sectionAnswered(arch, 'Verdict', { verdict: true }) && reviewHasAnsweredSections(arch, architectureHeadings, { 'Required repair before evidence': { allowNone: true } }),
      evidence: 'Architecture review must answer every rejection heading with concrete evidence, scoped debt, or blocker text.',
    });
    checks.push({
      id: `ux_review_contract_${item.phaseId}`,
      ok: (sectionAnswered(ux, 'Verdict', { verdict: true })
          && /^not-ui-bearing\b/i.test(sectionBody(ux, 'Verdict'))
          && reviewHasAnsweredSections(ux, ['Reason', 'Downstream UI obligations']))
        || (sectionAnswered(ux, 'Verdict', { verdict: true }) && reviewHasAnsweredSections(ux, uxHeadings, { 'Required repair before evidence': { allowNone: true } })),
      evidence: 'UX review must either prove UI quality through concrete headings or explicitly mark not-ui-bearing with downstream obligations.',
    });
    checks.push({
      id: `qa_review_contract_${item.phaseId}`,
      ok: sectionAnswered(qa, 'Verdict', { verdict: true }) && reviewHasAnsweredSections(qa, qaHeadings, { 'Commands run': { minChars: 8 } }),
      evidence: 'QA review must bind commands/proof/blockers to the evidence claim level with substantive section bodies.',
    });
  }
  return checks;
}

function parseJsonl(text) {
  const rows = [];
  for (const line of text.split('\n').filter(Boolean)) {
    try { rows.push(JSON.parse(line)); } catch { /* scoring handles malformed rows elsewhere */ }
  }
  return rows;
}

function scoreReplay(workspace, output, phase, options = {}) {
  const corpus = textCorpus(workspace, output);
  const combined = `${corpus.outputText}\n${corpus.fileText}`;
  const outputOnly = corpus.outputText;
  const lower = combined.toLowerCase();
  const files = new Set(corpus.files);
  const ledgerPath = path.join(workspace, '.buildprint/evidence/evidence-ledger.jsonl');
  const ledgerText = safeReadText(ledgerPath);
  const forbidden = [
    /START_HERE/,
    /PRE_IMPLEMENTATION_QUESTIONS/,
    /03-capabilities/,
  ];
  const generatedFileText = corpus.fileText
    .split('\n')
    .filter((line) => !line.startsWith('selected-buildprint/'))
    .filter((line) => !/do not|forbidden|avoid|obsolete|legacy_tokens_checked|tokens_checked/i.test(line))
    .join('\n');
  const legacyRoutingText = outputOnly
    .split('\n')
    .filter((line) => !/Required operating contract:|Do not create|forbidden|obsolete|tokens_checked|START_HERE.*PRE_IMPLEMENTATION_QUESTIONS/i.test(line))
    .filter((line) => !/^\.\.\//.test(line.trim()))
    .join('\n');
  const parentTraversalLines = outputOnly
    .split('\n')
    .filter((line) => /(^|[\s"'`])(find|ls|cat|sed|rg|grep)\s+\.\.(\s|\/|$)/.test(line) || /^\.\.\//.test(line.trim()));

  const phasesToReplay = options.allPhases ? phase.phases : [phase];
  const readOrderTokens = [
    'BUILDPRINT.md',
    '01-questions.md',
    '02-project-setup.md',
    'blueprint.yaml',
    '03-phases/phase-index.yaml',
    '03-phases/phase-flow.md',
    ...phasesToReplay.map((item) => item.activeFile),
    '05-evidence/evidence-ledger.schema.json',
  ];
  const readOrderIndexes = readOrderTokens.map((token) => outputOnly.indexOf(token));
  const readOrderMentioned = readOrderIndexes.every((index) => index >= 0);
  const readOrderOrdered = readOrderMentioned && readOrderIndexes.every((index, itemIndex, all) => itemIndex === 0 || index >= all[itemIndex - 1]);

  const phaseEvidenceChecks = phasesToReplay.map((item) => ({
    id: `runtime_evidence_ledger_behavior_${item.phaseId}`,
    ok: fs.existsSync(ledgerPath) && new RegExp(`phase_id[\"':\\s]+${escapeRegex(item.phaseId)}`, 'i').test(ledgerText),
    evidence: fs.existsSync(ledgerPath) ? `.buildprint/evidence/evidence-ledger.jsonl exists with phase_id ${item.phaseId} check.` : 'Runtime evidence ledger was not created.',
  }));
  const allPhaseNoBlockersCheck = {
    id: 'all_phase_replay_no_blockers',
    ok: !options.allPhases || !/("type"\s*:\s*"blocker"|"status"\s*:\s*"blocked")/i.test(ledgerText),
    evidence: options.allPhases ? 'Full-suite replay must not pass with blocker rows for requested phases.' : 'Not required for active-phase replay.',
  };
  const ledgerRows = parseJsonl(ledgerText);
  const ledgerLines = ledgerText.split('\n').filter(Boolean);
  const validStatuses = new Set(['missing', 'passed', 'proven', 'blocked', 'failed', 'skipped']);
  const requiredLedgerFields = ['artifact_id', 'type', 'phase_id', 'status', 'source', 'proves', 'proof_type', 'provider_mode', 'upgrades_claim'];
  const malformedLedgerRows = ledgerLines.length - ledgerRows.length;
  const invalidLedgerRows = ledgerRows.filter((row) => requiredLedgerFields.some((field) => !(field in row))
    || typeof row.artifact_id !== 'string'
    || typeof row.type !== 'string'
    || typeof row.phase_id !== 'string'
    || typeof row.status !== 'string'
    || !validStatuses.has(row.status)
    || typeof row.source !== 'string'
    || !Array.isArray(row.proves)
    || typeof row.proof_type !== 'string'
    || typeof row.provider_mode !== 'string'
    || typeof row.upgrades_claim !== 'boolean');
  const blockerOverUpgrades = ledgerRows.filter((row) => row.upgrades_claim === true
    && (/block|missing|unavailable|not_configured|not_executed|sandbox|network|credential|synthetic|partial/i.test(JSON.stringify(row))
      || ['blocked', 'missing', 'skipped', 'failed'].includes(row.status)));
  const noFakeClaims = ledgerRows.filter((row) => /no[-_ ]?fake/i.test(`${row.proof_type} ${JSON.stringify(row.proves || [])}`)
    && (row.upgrades_claim === true || ['passed', 'proven'].includes(row.status)));
  const hasNoFakeScanArtifact = corpus.files.some((file) => /no[-_]?fake.*\.(py|js|mjs|sh)$/i.test(file));
  const overClaimedNoFake = noFakeClaims.length > 0 && !hasNoFakeScanArtifact;
  const evidenceSchemaCheck = {
    id: 'runtime_evidence_schema_validity',
    ok: malformedLedgerRows === 0 && invalidLedgerRows.length === 0,
    evidence: invalidLedgerRows.length || malformedLedgerRows ? 'Runtime evidence rows must conform to evidence-ledger.schema.json required fields/types/status enum.' : 'Runtime evidence rows conform to required schema fields/types/status enum.',
  };
  const blockerClaimCheck = {
    id: 'no_blocker_evidence_overupgrade',
    ok: blockerOverUpgrades.length === 0,
    evidence: blockerOverUpgrades.length ? 'Blocker-qualified, missing, synthetic, or partial evidence rows must not set upgrades_claim true.' : 'No blocker-qualified evidence row upgrades claims.',
  };
  const noFakeClaimCheck = {
    id: 'no_fake_claim_requires_scan_artifact',
    ok: !overClaimedNoFake,
    evidence: overClaimedNoFake ? 'no_fake_scan_pass claims require an actual no-fake scan script/artifact in the workspace.' : 'No-fake claims are either absent/blocker-only or backed by a scan artifact.',
  };
  const overUpgradedProviderLive = ledgerRows.some((row) => {
    const body = JSON.stringify(row);
    const proves = JSON.stringify(row.proves || []);
    return row.upgrades_claim === true
      && /missing_credentials|network_blocked|provider[_ -]?blocked/i.test(body)
      && /provider_live|live provider|provider-live/i.test(proves);
  });
  const providerClaimCheck = {
    id: 'no_provider_live_overupgrade',
    ok: !overUpgradedProviderLive,
    evidence: 'Evidence rows must not upgrade provider-live claims when live provider proof is blocked.',
  };

  const checks = [
    {
      id: 'read_order_setup_adherence',
      ok: readOrderOrdered && /setup gate|project setup/i.test(combined),
      evidence: readOrderOrdered ? 'Transcript mentions canonical read order before phase work.' : 'Transcript does not show canonical read order in order.',
    },
    {
      id: 'question_setup_gate_handling',
      ok: includesAny(combined, [/AI best judgment/i, /blank ordinary/i, /blank answers/i]) && files.has('AGENTS.md'),
      evidence: files.has('AGENTS.md') ? 'Root AGENTS.md exists and question/default handling is mentioned.' : 'Root AGENTS.md was not created in the implementation workspace.',
    },
    {
      id: 'phase_proof_gate_references',
      ok: phasesToReplay.every((item) => new RegExp(`${escapeRegex(item.proofGate)}|proof gate`, 'i').test(combined) && new RegExp(`phase_id["':\\s]+${escapeRegex(item.phaseId)}`, 'i').test(combined)),
      evidence: `Looks for requested proof-gate language and phase_id evidence for ${phasesToReplay.map((item) => item.phaseId).join(', ')}.`,
    },
    ...phaseEvidenceChecks,
    ...reviewContractChecks(workspace, phasesToReplay),
    allPhaseNoBlockersCheck,
    evidenceSchemaCheck,
    providerClaimCheck,
    blockerClaimCheck,
    noFakeClaimCheck,
    {
      id: 'no_parent_context_enumeration',
      ok: parentTraversalLines.length === 0,
      evidence: parentTraversalLines.length ? `Replay enumerated parent/out-of-scope paths: ${parentTraversalLines.slice(0, 3).join(' | ')}` : 'Replay did not enumerate parent directories in transcript output.',
    },
    {
      id: 'no_legacy_routing',
      ok: !includesAny(legacyRoutingText, forbidden) && !includesAny(generatedFileText, forbidden) && !corpus.files.some((file) => !file.startsWith('selected-buildprint/') && includesAny(file, forbidden)),
      evidence: 'Checks generated output/files/paths for actual obsolete routing, ignoring packet guardrails that mention forbidden obsolete names negatively.',
    },
  ];

  return {
    pass: checks.every((check) => check.ok),
    checks,
    files: corpus.files,
    output_excerpt: outputOnly.slice(0, 12000),
    obsolete_tokens_checked: ['START_HERE', 'PRE_IMPLEMENTATION_QUESTIONS', '03-capabilities'],
    notes: [
      lower.includes('blocked') ? 'Replay recorded or mentioned a blocker; inspect transcript to confirm honesty.' : 'No blocker language detected in replay output/files.',
      'Automated scoring is signal-based. Product quality, no-fake completeness, and UX proof still require human review.',
    ],
  };
}

function writeArtifacts(options, report, transcript) {
  const reportPath = path.resolve(root, options.report);
  const transcriptPath = path.resolve(root, options.transcript);
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.mkdirSync(path.dirname(transcriptPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(transcriptPath, transcript);
}

let options;
try {
  options = parseArgs(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  console.error(usage());
  process.exit(2);
}

const packetSource = path.resolve(root, options.packet);
if (!fs.existsSync(packetSource) || !fs.statSync(packetSource).isDirectory()) {
  console.error(`Selected packet does not exist or is not a directory: ${packetSource}`);
  process.exit(1);
}

const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'mapper-replay-'));
let prompt;
let output = { status: 0, signal: null, stdout: '', stderr: '', error: null };
let fatal = null;

try {
  const packetTarget = copyPacket(packetSource, workspace);
  const phase = parsePhaseIndex(packetTarget);
  prompt = buildPrompt(phase, options);
  initGit(workspace);

  if (options.dryRun) {
    output.stdout = syntheticDryRun(workspace, phase, options);
  } else {
    const availability = codexAvailable(options.codex);
    if (!availability.ok) throw new Error(`${availability.detail}. Re-run with --dry-run to validate harness mechanics without Codex.`);
    output = runCodexReplay(options.codex, workspace, prompt, options.timeoutMs);
    if (output.error && output.error.code === 'ETIMEDOUT') output.stderr = `${output.stderr || ''}\nCodex replay timed out after ${options.timeoutMs}ms.\n`;
    if (output.error && output.error.code === 'ENOENT') throw new Error(`${options.codex} was not found on PATH. Re-run with --dry-run to validate harness mechanics without Codex.`);
  }

  const score = scoreReplay(workspace, output, phase, options);
  const report = {
    schema_version: 'mapper-os/replay-eval-report.v1',
    harness: 'fresh-agent-codex-replay',
    mode: options.dryRun ? 'dry-run' : 'codex',
    purpose: 'Tests downstream executable-blueprint packet consumption quality without reintroducing a deterministic mapper product.',
    pass: options.dryRun ? score.pass : output.status === 0 && !output.error && score.pass,
    packet: {
      source: rel(root, packetSource),
      source_hash: hashDir(packetSource),
      copied_to: rel(workspace, packetTarget),
      active_phase: phase,
      replay_scope: options.allPhases ? 'all-phases' : 'active-phase',
      phases_replayed: options.allPhases ? phase.phases : [phase],
    },
    workspace,
    command: options.dryRun ? null : { executable: options.codex, args: ['exec', '--full-auto', '<prompt>'], cwd: workspace, timeout_ms: options.timeoutMs },
    codex: {
      invoked: !options.dryRun,
      exit_status: output.status,
      signal: output.signal,
      error: output.error ? { code: output.error.code, message: output.error.message } : null,
    },
    scoring: score,
    artifacts: {
      report: options.report,
      transcript: options.transcript,
    },
    manual_review_remaining: [
      'Whether any produced implementation is genuinely product-complete for the selected phase.',
      'Whether proof artifacts are sufficient to upgrade claims beyond blocker/synthetic status.',
      'Whether UI/UX evidence, if generated, meets the Mapper OS design quality bar.',
    ],
  };

  const transcript = [
    '# Mapper OS Replay Transcript',
    '',
    `Mode: ${report.mode}`,
    `Workspace: ${workspace}`,
    `Packet: ${packetSource}`,
    '',
    '## Prompt',
    '',
    prompt,
    '',
    '## Stdout',
    '',
    output.stdout || '',
    '',
    '## Stderr',
    '',
    output.stderr || '',
  ].join('\n');
  writeArtifacts(options, report, transcript);

  if (!report.pass) {
    for (const check of score.checks.filter((check) => !check.ok)) console.error(`x ${check.id}: ${check.evidence}`);
    if (!options.dryRun && output.status !== 0) console.error(`x codex exited with status ${output.status}`);
    console.error(`\nMapper replay eval failed. Report: ${options.report}`);
    process.exitCode = 1;
  } else {
    console.log(`Mapper replay eval passed (${report.mode}). Report: ${options.report}`);
  }
} catch (error) {
  fatal = error;
  const report = {
    schema_version: 'mapper-os/replay-eval-report.v1',
    harness: 'fresh-agent-codex-replay',
    mode: options.dryRun ? 'dry-run' : 'codex',
    pass: false,
    fatal_error: error.message,
    workspace,
    artifacts: {
      report: options.report,
      transcript: options.transcript,
    },
  };
  writeArtifacts(options, report, `# Mapper OS Replay Transcript\n\nFatal error: ${error.message}\n`);
  console.error(error.message);
  process.exitCode = 1;
} finally {
  if (!options.keepWorkspace && workspace && fs.existsSync(workspace)) {
    try {
      fs.rmSync(workspace, { recursive: true, force: true });
    } catch (error) {
      if (!fatal) console.error(`Could not remove temp workspace ${workspace}: ${error.message}`);
    }
  }
}
