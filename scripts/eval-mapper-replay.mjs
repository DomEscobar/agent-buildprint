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
    '  --archive <path>      Copy the completed replay workspace to this path before cleanup',
    '  --codex <command>     Codex CLI command (default: CODEX_CLI or codex)',
    '  --timeout-ms <n>      Real Codex replay timeout in milliseconds (default: 1200000)',
    '  --keep-workspace      Keep the /tmp replay workspace after the run',
    '  --all-phases         Replay every phase in phase-index.yaml, not only active_phase',
    '  --phase <phase-id>    Replay one named phase from phase-index.yaml',
    '  --require-ui-attempt  Fail UI-bearing phase replays unless UI files plus browser/UX proof or honest blocker evidence exist',
    '  --require-interactive-ui  Fail UI-bearing phase replays unless a real UI action/state-transition path is proven or honestly blocked',
    '  --require-ui-proof    Fail UI-bearing phase replays unless runtime evidence includes real browser/UX proof',
    '  --allow-timeout-after-pass  Treat a timeout as pass when all workspace scoring checks passed',
    '  --dry-run-bad <kind>  Internal negative replay fixture: static-ui-shell, checkpoint-only, ux-overclaim, browser-blocker-only',
    '  --dry-run, --no-codex Validate copy/git/prompt/report/scoring mechanics without invoking Codex',
    '  --help                Show this help',
  ].join('\n');
}

function parseArgs(argv) {
  const options = {
    packet: defaultPacket,
    report: defaultReport,
    transcript: defaultTranscript,
    archive: null,
    codex: process.env.CODEX_CLI || 'codex',
    timeoutMs: 20 * 60 * 1000,
    dryRun: false,
    keepWorkspace: false,
    allPhases: false,
    phaseId: null,
    requireUiAttempt: false,
    requireInteractiveUi: false,
    requireUiProof: false,
    allowTimeoutAfterPass: false,
    dryRunBad: null,
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
    } else if (arg === '--require-ui-attempt') {
      options.requireUiAttempt = true;
    } else if (arg === '--require-interactive-ui') {
      options.requireInteractiveUi = true;
      options.requireUiAttempt = true;
    } else if (arg === '--require-ui-proof') {
      options.requireUiProof = true;
    } else if (arg === '--allow-timeout-after-pass') {
      options.allowTimeoutAfterPass = true;
    } else if (['--packet', '--report', '--transcript', '--archive', '--codex', '--timeout-ms', '--phase', '--dry-run-bad'].includes(arg)) {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`${arg} requires a value`);
      index += 1;
      if (arg === '--packet') options.packet = value;
      if (arg === '--report') options.report = value;
      if (arg === '--transcript') options.transcript = value;
      if (arg === '--archive') options.archive = value;
      if (arg === '--codex') options.codex = value;
      if (arg === '--phase') options.phaseId = value;
      if (arg === '--dry-run-bad') {
        if (!['static-ui-shell', 'checkpoint-only', 'ux-overclaim', 'browser-blocker-only'].includes(value)) throw new Error(`Unknown --dry-run-bad kind: ${value}`);
        options.dryRun = true;
        options.dryRunBad = value;
      }
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

function selectReplayPhases(phase, options = {}) {
  if (options.allPhases) return phase.phases;
  if (options.phaseId) {
    const selected = phase.phases.find((item) => item.phaseId === options.phaseId);
    if (!selected) throw new Error(`--phase ${options.phaseId} not found in phase-index.yaml`);
    return [selected];
  }
  return [phase];
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildPrompt(phase, options = {}) {
  const phasesToReplay = selectReplayPhases(phase, options);
  const phaseList = phasesToReplay.map((item) => `- ${item.phaseId}: ${item.activeFile} (${item.proofGate})`).join('\n');
  const taskLine = options.allPhases
    ? 'Task: execute the full blueprint suite in dependency order, but load and implement only one phase file at a time. Start with the active phase from `03-phases/phase-index.yaml`; after its proof gate passes, consult the index and continue to the next dependency-ready phase. Do not stop after phase 1 unless blocked.'
    : options.phaseId
      ? `Task: perform a practical replay for phase ${options.phaseId}. Read the canonical router first, consult phase-index, then load only the selected phase file.`
    : 'Task: perform a practical active-phase replay according to the packet.';
  const proofLine = options.allPhases
    ? '7. After each phase proof command passes, immediately write runtime proof rows to `.buildprint/evidence/evidence-ledger.jsonl` for that phase_id before optional polish or final summary. If any phase is blocked, stubbed, or only reserved, the replay must be reported as incomplete, not passed.'
    : '7. After the active phase proof command passes, immediately write runtime proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` with the active `phase_id` before optional polish or final summary.';
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
    `2. Follow its initial read order through \`01-questions.md\`, \`02-project-setup.md\`, \`blueprint.yaml\`, \`03-phases/phase-index.yaml\`, \`03-phases/phase-flow.md\`, the active phase file \`${phasesToReplay[0].activeFile}\`, \`04-evaluation.md\`, the evidence ledger seed, and \`05-evidence/evidence-ledger.schema.json\` before writing runtime evidence.`,
    '2b. Initial packet reads must be sequential and observable in the transcript. Do not batch, parallelize, or reorder Get-Content/cat reads for the required context files.',
    options.allPhases ? '2a. For full-suite continuation, do not read later phase files upfront. After the current phase proof is recorded, return to `03-phases/phase-index.yaml`, choose the next dependency-ready phase, read only that phase file, then repeat phase-flow/proof/evidence. Non-upgrading live-provider/browser/e2e/deployment/external-service blockers do not block continuation when core local implementation/runtime proof passed; mark those rows `blocks_continuation: false`.' : null,
    '3. Treat blank ordinary questions as AI best-judgment defaults. Ask or stop only for irreversible, expensive, credentialed, destructive, or product-defining choices.',
    '4. Complete the project setup gate before phase work. Before creating phase-run artifacts or implementation files, write `.buildprint/setup.md` or `.buildprint/setup/*.md` in the temp workspace with concrete auth/session/tenant, provider, persistence, worker/runtime, deployment/ops, browser/e2e, safety, and verification decisions. Create implementation-project instructions only in the temp workspace, not inside the copied packet.',
    '5. Treat AGENTS.md as a scope governor, not the product brain. The current assignment/handoff is the role and scope; do not infer extra global scope from unrelated files.',
    '6. Before implementation, create compact phase-run plan and team-gates artifacts. Create handoff/return files only for real delegation; do not spend the run writing fake specialist paperwork.',
    proofLine,
    '8. Runtime evidence rows must conform to `selected-buildprint/05-evidence/evidence-ledger.schema.json`: include `artifact_id`, `type`, `phase_id`, valid `status`, `source`, array `proves`, `proof_type`, `provider_mode`, and `upgrades_claim`.',
    '9. Never set `upgrades_claim: true` on blocker-qualified evidence. If proof is blocked, synthetic, dependency-missing, or only partially verified, use a valid blocker/skipped status and `upgrades_claim: false`.',
    '10. Do not claim `no_fake_scan_pass` unless you create and run an actual no-fake scan command/artifact; otherwise record a blocker or omit that proof claim.',
    '11. Evidence rows must be narrow. Do not claim browser/e2e/screenshot/security/data-lifecycle/worker proof labels from generic HTTP traces, static files, static DOM/string checks, or review prose; those need matching proof artifacts or non-upgrading blocker rows.',
    '11a. Review prose is not implementation proof. review_artifact rows default to upgrades_claim:false. Do not upgrade UX, security, worker, data-lifecycle, browser/e2e, or live-provider labels from review rows; create separate executable proof rows for those labels.',
    '11b. Do not upgrade worker_retry_cancel_recovery, migration_retention_backup_upload_limits, or security_boundary_review from a generic runtime_trace, local_http_runtime_trace, API smoke test, or broad end-to-end script row. Split these into separate rows with proof_type/source/commands that explicitly name the worker recovery, migration/retention/backup/upload-limit, or security/destructive-action/secret-boundary path.',
    '11c. Do not upgrade ux_design_gate from static markup, string checks, or non-browser DOM-state scripts. If Playwright/Chrome/browser tooling is unavailable, write a non-upgrading UX/browser blocker row instead.',
    '11d. Upgrading rows for security, worker, data-lifecycle, browser/e2e, or UX proof must not use type, proof_type, or source wording that relies on review notes as proof. If review notes exist, write them as a separate non-upgrading review_artifact row.',
    '11e. QA review `Commands run` sections must name exact commands plus the relevant output artifact or subtest section. A bare aggregate such as `npm test` is not enough for an all-phase replay.',
    options.requireUiAttempt ? '11f. This replay is running with UI-attempt pressure. If the selected phase is UI-bearing, API-only/runtime-only work is not enough: create real UI files and either browser/e2e/screenshot-backed UX evidence or an honest non-upgrading browser tooling blocker after attempting the proof command.' : null,
    options.requireInteractiveUi ? '11i. This replay is running with interactive UI pressure. For UI-bearing phases, static state cards and dead controls are not enough: prove at least one user action path through a UI/controller boundary, state transition, provider/runtime call, and persisted/readback result. If browser tooling is unavailable, run a local interaction/state-transition proof command and write browser proof as a separate non-upgrading blocker.' : null,
    options.requireUiProof ? '11f. This replay is running with strict UI proof. If the selected phase is UI-bearing, non-upgrading browser/UX blockers are not enough for a passing replay; create repeatable browser/e2e or screenshot-backed UX evidence, or the harness must fail.' : null,
    options.requireUiProof ? '11g. Keep strict UI replay lean: finish runtime tests, reviews, and evidence rows before optional polish. A nice UI without `.buildprint/evidence/evidence-ledger.jsonl` is still a failed replay.' : null,
    options.requireUiAttempt ? '11h. For UI-attempt replay, write the first valid `.buildprint/evidence/evidence-ledger.jsonl` checkpoint immediately after provider/persistence tests and UI-state proof pass. Browser tooling, live provider, worker, deployment, and optional HTTP-server polish can be blocker rows after that checkpoint; do not defer evidence while expanding the app.' : null,
    '12. Run meaningful verification gates for your changes, including tests/build/runtime checks where possible. Prefer the smallest implementation that proves the active gate; do not build optional CLI/server/UI surfaces unless the active phase explicitly requires them.',
    '13. Do not create or route through obsolete packet entrypoints or capability folders.',
    '14. Do not traverse outside the temp workspace. Never run `find ..`, `ls ..`, `rg ..`, `grep ..`, or equivalent parent-directory scans.',
    '',
    'At the end, print a compact replay summary with files changed, setup gate handling, phase/proof-gate result for each replayed phase, verification command/result, evidence-ledger action, and the read-order sequence you actually followed.',
  ].filter(Boolean).join('\n');
}

function syntheticDryRun(workspace, phase, options = {}) {
  fs.writeFileSync(path.join(workspace, 'AGENTS.md'), [
    '# AGENTS.md',
    '',
    'Project shape, architecture rules, quality gates, safety rules, and workflow are derived from selected-buildprint/02-project-setup.md.',
  ].join('\n'));
  fs.mkdirSync(path.join(workspace, '.buildprint'), { recursive: true });
  fs.writeFileSync(path.join(workspace, '.buildprint/setup.md'), [
    '# Setup Gate',
    '',
    'Auth/session/tenant boundary: dry-run harness only; no product claim upgraded.',
    'Provider integration contract: dry-run harness only; no live provider claim upgraded.',
    'Durable persistence contract: dry-run harness only; no product persistence claim upgraded.',
    'Worker/runtime contract: dry-run harness only; no worker claim upgraded.',
    'Deployment and operations contract: dry-run harness only; no deployment claim upgraded.',
    'Browser/e2e contract: dry-run harness only; no browser claim upgraded.',
    'Safety and permissions: no destructive or external actions.',
    'Verification commands: dry-run synthetic artifact creation only.',
  ].join('\n'));
  const ledgerDir = path.join(workspace, '.buildprint/evidence');
  fs.mkdirSync(ledgerDir, { recursive: true });
  const phasesToReplay = selectReplayPhases(phase, options);
  const readOrderPhaseSegment = phasesToReplay[0].activeFile;
  for (const item of phasesToReplay) {
    const phaseRunDir = path.join(workspace, '.buildprint/phase-runs', item.phaseId);
    fs.mkdirSync(path.join(phaseRunDir, 'reviews'), { recursive: true });
    fs.writeFileSync(path.join(phaseRunDir, 'team-gates.md'), [
      '## Active Team Gates',
      '',
      '- product-architect: dry-run harness gate only.',
      '- test-and-verification: dry-run harness gate only.',
      '',
      'No handoff/return files are written because no real delegation occurs in dry-run mode.',
    ].join('\n'));
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
      options.requireUiAttempt ? 'blocker' : 'not-ui-bearing',
      '',
      options.requireUiAttempt ? '## Primary user job' : '## Reason',
      '',
      options.requireUiAttempt ? 'Dry-run user can inspect a synthetic chat state file only; no product UI claim is upgraded.' : 'Dry-run mode does not implement a UI surface and therefore cannot provide visual quality proof.',
      '',
      options.requireUiAttempt ? '## Screen composition' : '## Downstream UI obligations',
      '',
      options.requireUiAttempt ? 'Synthetic chat state markup exists under ui/dry-run-chat.html for harness mechanics.' : 'A real replay must produce UI review evidence whenever the selected phase is UI-bearing.',
      ...(options.requireUiAttempt ? [
        '',
        '## State matrix',
        '',
        'Dry-run state markers include empty, blocked-provider, error, and success placeholders.',
        '',
        '## Responsive/accessibility proof',
        '',
        'No real browser or accessibility behavior is proven in dry-run mode.',
        '',
        '## Destructive/sensitive actions',
        '',
        'No destructive or sensitive UI action is modeled by the dry-run artifact.',
        '',
        '## Screenshot or DOM evidence',
        '',
        'Dry-run writes a synthetic file and a non-upgrading browser-tooling blocker row only.',
        '',
        '## Required repair before evidence',
        '',
        'None for harness mechanics; real UI proof still requires a real replay.',
      ] : []),
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
  if (options.requireUiAttempt) {
    fs.mkdirSync(path.join(workspace, 'ui'), { recursive: true });
    const staticShell = options.dryRunBad === 'static-ui-shell' || options.dryRunBad === 'checkpoint-only';
    fs.writeFileSync(path.join(workspace, 'ui/dry-run-chat.html'), staticShell ? [
      '<main>',
      '  <section class="card">Dashboard</section>',
      '  <section class="card" data-chat-state="empty">Coming soon</section>',
      '  <button type="button">Send</button>',
      '</main>',
      '',
    ].join('\n') : [
      '<main data-chat-state="empty">',
      '  <form data-chat-form>',
      '    <textarea data-message-input></textarea>',
      '    <button type="button" data-send-message>Send</button>',
      '  </form>',
      '  <section data-chat-state="loading"></section>',
      '  <section data-chat-state="blocked-provider"></section>',
      '  <section data-chat-state="error"></section>',
      '  <section data-chat-state="success" data-readback></section>',
      '  <script>',
      '    document.querySelector("[data-send-message]").addEventListener("click", () => {',
      '      document.querySelector("[data-chat-state=success]").dataset.lastAction = "message-submitted";',
      '    });',
      '  </script>',
      '</main>',
      '',
    ].join('\n'));
    if (options.requireInteractiveUi && !['static-ui-shell', 'checkpoint-only', 'browser-blocker-only'].includes(options.dryRunBad)) {
      fs.mkdirSync(path.join(workspace, 'artifacts'), { recursive: true });
      fs.writeFileSync(path.join(workspace, 'artifacts/dry-run-ui-interaction.json'), `${JSON.stringify({
        mode: 'dry-run',
        user_action_path: 'message input -> send action -> provider seam placeholder -> persisted readback state',
        state_transition: ['empty', 'loading', 'success'],
      }, null, 2)}\n`);
    }
  }
  const dryRunRows = phasesToReplay.flatMap((item) => {
    const rows = [{
      artifact_id: `dry-run-replay-${item.phaseId}`,
      type: options.allPhases ? 'runtime_proof' : 'blocker',
      phase_id: item.phaseId,
      status: options.allPhases ? 'passed' : 'blocked',
      source: 'dry-run harness',
      proves: ['harness_mechanics_only'],
      proof_type: 'harness_dry_run',
      provider_mode: 'none',
      upgrades_claim: false,
    }];
    if (options.requireUiAttempt) rows.push({
      artifact_id: `dry-run-ui-attempt-${item.phaseId}`,
      type: 'browser_tooling_blocker',
      phase_id: item.phaseId,
      status: 'blocked',
      source: 'dry-run browser-proof placeholder for UI-attempt harness mechanics',
      proves: ['browser_runtime_trace', 'repeatable_browser_e2e', 'screenshot_state_set', 'ux_design_gate'],
      proof_type: 'browser_tooling_unavailable_blocker',
      provider_mode: 'none',
      upgrades_claim: false,
      commands: ['dry-run browser-proof placeholder'],
      blocks_continuation: false,
    });
    if (options.requireInteractiveUi && !['static-ui-shell', 'checkpoint-only', 'browser-blocker-only'].includes(options.dryRunBad)) rows.push({
      artifact_id: `dry-run-ui-interaction-${item.phaseId}`,
      type: 'ui_interaction_trace',
      phase_id: item.phaseId,
      status: 'passed',
      source: 'artifacts/dry-run-ui-interaction.json user action/state-transition placeholder for harness mechanics',
      proves: ['ui_action_path', 'state_transition_proof', 'phase_core_passed'],
      proof_type: 'local_ui_interaction_state_transition',
      provider_mode: 'none',
      upgrades_claim: false,
      commands: ['dry-run interaction placeholder'],
    });
    if (options.dryRunBad === 'ux-overclaim') rows.push({
      artifact_id: `bad-static-ux-overclaim-${item.phaseId}`,
      type: 'ui_state_trace',
      phase_id: item.phaseId,
      status: 'passed',
      source: 'static string check over ui/dry-run-chat.html',
      proves: ['ux_design_gate'],
      proof_type: 'static_dom_string_check',
      provider_mode: 'none',
      upgrades_claim: true,
      commands: ['dry-run static string check'],
    });
    return rows;
  });
  fs.writeFileSync(path.join(ledgerDir, 'evidence-ledger.jsonl'), dryRunRows.map((row) => JSON.stringify(row)).join('\n') + '\n');

  return [
    'DRY RUN: Codex was not invoked.',
    `Read order simulated: BUILDPRINT.md -> 01-questions.md -> 02-project-setup.md -> blueprint.yaml -> 03-phases/phase-index.yaml -> 03-phases/phase-flow.md -> ${readOrderPhaseSegment} -> 04-evaluation.md -> evidence ledger seed -> 05-evidence/evidence-ledger.schema.json.`,
    options.allPhases ? `Continuation simulated one phase at a time after proof: ${phasesToReplay.slice(1).map((item) => item.activeFile).join(' -> ')}.` : '',
    'Question gate simulated: blank ordinary answers became AI best judgment assumptions; no human question was required.',
    'Setup gate simulated: completed project setup and created root AGENTS.md in the temp implementation workspace.',
    `Phase replay simulated: ${options.allPhases ? 'all phases' : `phase ${phasesToReplay[0].phaseId}`} reached requested proof gates.`,
    `Evidence simulated: wrote .buildprint/evidence/evidence-ledger.jsonl for ${phasesToReplay.map((item) => item.phaseId).join(', ')}.`,
  ].filter(Boolean).join('\n');
}

function runCodexReplay(command, workspace, prompt, timeoutMs) {
  return run(command, ['exec', '--sandbox', 'workspace-write', prompt], {
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
  if (options.allowNone === true && /^none\b/i.test(body.trim())) return true;
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
    .filter((line) => !/do not|forbidden|avoid|obsolete|tokens_checked/i.test(line))
    .join('\n');
  const obsoleteRoutingText = outputOnly
    .split('\n')
    .filter((line) => !/Required operating contract:|Do not create|forbidden|obsolete|tokens_checked|START_HERE.*PRE_IMPLEMENTATION_QUESTIONS/i.test(line))
    .filter((line) => !/^\.\.\//.test(line.trim()))
    .join('\n');
  const parentTraversalLines = outputOnly
    .split('\n')
    .filter((line) => /(^|[\s"'`])(find|ls|cat|sed|rg|grep)\s+\.\.(\s|\/|$)/.test(line) || /^\.\.\//.test(line.trim()));

  const phasesToReplay = selectReplayPhases(phase, options);
  const readOrderTokens = [
    'BUILDPRINT.md',
    '01-questions.md',
    '02-project-setup.md',
    'blueprint.yaml',
    '03-phases/phase-index.yaml',
    '03-phases/phase-flow.md',
    phasesToReplay[0].activeFile,
    '04-evaluation.md',
    '05-evidence/evidence-ledger.schema.json',
  ];
  const actualReadOrderLines = outputOnly
    .split('\n')
    .filter((line) => /-Command .*Get-Content\b|\bcat\s+.*selected-buildprint|Read order followed|Read order simulated/i.test(line));
  const readOrderSource = actualReadOrderLines
    .join('\n')
    .replace(/\\+/g, '/')
    .replace(/\/+/g, '/');
  const readOrderIndexes = readOrderTokens.map((token) => readOrderSource.indexOf(token));
  const readOrderMentioned = readOrderIndexes.every((index) => index >= 0);
  const readOrderOrdered = readOrderMentioned && readOrderIndexes.every((index, itemIndex, all) => itemIndex === 0 || index >= all[itemIndex - 1]);

  const phaseEvidenceChecks = phasesToReplay.map((item) => ({
    id: `runtime_evidence_ledger_behavior_${item.phaseId}`,
    ok: fs.existsSync(ledgerPath) && new RegExp(`phase_id[\"':\\s]+${escapeRegex(item.phaseId)}`, 'i').test(ledgerText),
    evidence: fs.existsSync(ledgerPath) ? `.buildprint/evidence/evidence-ledger.jsonl exists with phase_id ${item.phaseId} check.` : 'Runtime evidence ledger was not created.',
  }));
  const setupFiles = corpus.files.filter((file) => file === '.buildprint/setup.md' || file.startsWith('.buildprint/setup/'));
  const setupText = setupFiles.map((file) => safeReadText(path.join(workspace, file))).join('\n');
  const setupGateTokens = [
    /auth|session|tenant|owner/i,
    /provider|adapter|credential|env/i,
    /persist|database|storage|readback|migration/i,
    /worker|runtime|queue|retry|cancel|recovery|synchronous/i,
    /deploy|operations|health|logging|metrics|ci|local dev/i,
    /browser|e2e|screenshot|ui/i,
    /safety|permission|destructive|secret/i,
    /verify|test|proof|command/i,
  ];
  const teamGateChecks = phasesToReplay.map((item) => ({
    id: `phase_team_gates_${item.phaseId}`,
    ok: fs.existsSync(path.join(workspace, '.buildprint/phase-runs', item.phaseId, 'team-gates.md')),
    evidence: 'Each replayed phase must create compact team-gates.md before evidence; handoff/return files are optional unless real delegation occurs.',
  }));
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
    && (
      ['blocked', 'missing', 'skipped', 'failed'].includes(row.status)
      || /blocker/i.test(String(row.type))
      || /blocker|synthetic|partial|not_executed/i.test(String(row.proof_type))
      || /live_unavailable|network_unavailable|credentials_unavailable/i.test(String(row.provider_mode))
    ));
  const allowedQualificationBlocker = (row) => row.upgrades_claim === false
    && (
      (row.blocks_continuation === false && ['blocked', 'skipped'].includes(row.status))
      || (row.status === 'blocked' && /live_provider|browser|e2e|screenshot|deployment|external_service/i.test(String(row.proof_type)))
      || /live_provider_proof_blocker_only|browser_runtime_trace|repeatable_browser_e2e|screenshot_state_set|ux_design_gate/i.test(JSON.stringify(row.proves || []))
    );
  const disallowedBlockers = ledgerRows.filter((row) => ['blocked', 'missing', 'skipped', 'failed'].includes(row.status) && !allowedQualificationBlocker(row));
  const allPhaseNoBlockersCheck = {
    id: 'all_phase_replay_no_unresolved_phase_blockers',
    ok: !options.allPhases || disallowedBlockers.length === 0,
    evidence: options.allPhases ? 'Full-suite replay may preserve live-provider blockers only; other blocked/missing/skipped/failed phase rows keep the replay incomplete.' : 'Not required for active-phase replay.',
  };
  const noFakeClaims = ledgerRows.filter((row) => /no[-_ ]?fake/i.test(`${row.proof_type} ${JSON.stringify(row.proves || [])}`)
    && (row.upgrades_claim === true || ['passed', 'proven'].includes(row.status)));
  const hasNoFakeScanArtifact = corpus.files.some((file) => /no[-_]?fake.*\.(py|js|mjs|ps1|sh|txt|json|md)$/i.test(file));
  const hasNoFakePackageScript = corpus.fileText.includes('"no-fake-scan"') && /npm run no-fake-scan/i.test(combined);
  const hasNoFakeScanCommand = noFakeClaims.some((row) => {
    const body = `${row.source || ''} ${JSON.stringify(row.commands || [])}`;
    return /(rg|grep|Select-String)/i.test(body) && /(TODO|FIXME|fake|stub|placeholder|mock|dummy|NotImplemented)/i.test(body);
  });
  const overClaimedNoFake = noFakeClaims.length > 0 && !hasNoFakeScanArtifact && !hasNoFakePackageScript && !hasNoFakeScanCommand;
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
  const isUiBearingPhase = (item) => {
    const phaseText = safeReadText(path.join(workspace, 'selected-buildprint', item.activeFile));
    return /UX\/UI requirements|Chat UI|Document UI|Memory\/settings UI|browser\/e2e|screenshot/i.test(phaseText)
      && !/No UI is implemented|not-ui-bearing|API\/runtime proof is enough/i.test(phaseText);
  };
  const uiFiles = corpus.files.filter((file) => /^(public|app|src|frontend|ui)\/.*\.(html|css|js|jsx|ts|tsx|vue|svelte)$/i.test(file));
  const uiFileText = uiFiles.map((file) => safeReadText(path.join(workspace, file))).join('\n');
  const hasInteractiveUiSurface = /addEventListener|on(click|submit|input|change)=|fetch\(|XMLHttpRequest|FormData|data-(send|submit|action|message-input|chat-form)|<form\b|<button\b/i.test(uiFileText)
    && /data-(readback|state|chat-state)|aria-live|loading|success|error|blocked/i.test(uiFileText);
  const genericShellOnly = uiFiles.length > 0
    && /dashboard|card|stats|overview|coming soon|placeholder/i.test(uiFileText)
    && !/message|chat|upload|document|citation|conversation|provider|readback|state transition/i.test(uiFileText);
  const strictUiProofChecks = options.requireUiProof ? phasesToReplay.map((item) => {
    const uiBearing = isUiBearingPhase(item);
    const uiRows = ledgerRows.filter((row) => {
      if (row.phase_id !== item.phaseId || (!row.upgrades_claim && !options.dryRun) || !['passed', 'proven'].includes(row.status)) return false;
      const proves = JSON.stringify(row.proves || []);
      const proofSource = `${row.source || ''} ${JSON.stringify(row.commands || [])} ${row.type || ''} ${row.proof_type || ''}`;
      return /browser_runtime_trace|repeatable_browser_e2e|screenshot_state_set|ux_design_gate/i.test(proves)
        && /playwright|browser|chrom(e|ium)|screenshot|axe|accessibility/i.test(proofSource);
    });
    return {
      id: `strict_ui_runtime_proof_${item.phaseId}`,
      ok: !uiBearing || uiRows.length > 0,
      evidence: uiBearing
        ? 'UI-bearing phase must produce upgrading browser/e2e/screenshot-backed UX runtime evidence in strict UI proof mode.'
        : 'Selected phase is not UI-bearing, so strict UI proof is not required.',
    };
  }) : [];
  const uiAttemptChecks = options.requireUiAttempt ? phasesToReplay.map((item) => {
    const uiBearing = isUiBearingPhase(item);
    const hasUiFiles = uiFiles.length > 0;
    const hasBrowserEvidence = ledgerRows.some((row) => {
      if (row.phase_id !== item.phaseId) return false;
      const proves = JSON.stringify(row.proves || []);
      const body = `${row.source || ''} ${JSON.stringify(row.commands || [])} ${row.type || ''} ${row.proof_type || ''}`;
      const mentionsBrowserClaim = /browser_runtime_trace|repeatable_browser_e2e|screenshot_state_set|ux_design_gate/i.test(proves);
      const mentionsBrowserAction = /playwright|browser|chrom(e|ium)|screenshot|axe|accessibility|proof:browser|browser-proof/i.test(body);
      const honestBlocker = row.upgrades_claim === false && ['blocked', 'skipped'].includes(row.status);
      const proof = row.upgrades_claim === true && ['passed', 'proven'].includes(row.status);
      return mentionsBrowserClaim && mentionsBrowserAction && (proof || honestBlocker);
    });
    return {
      id: `ui_runtime_attempt_${item.phaseId}`,
      ok: !uiBearing || (hasUiFiles && hasBrowserEvidence),
      evidence: uiBearing
        ? 'UI-bearing phase must create UI files and either browser/UX proof evidence or an honest non-upgrading browser tooling blocker.'
        : 'Selected phase is not UI-bearing, so UI attempt pressure is not required.',
    };
  }) : [];
  const interactiveUiChecks = options.requireInteractiveUi ? phasesToReplay.flatMap((item) => {
    const uiBearing = isUiBearingPhase(item);
    const interactionRows = ledgerRows.filter((row) => {
      if (row.phase_id !== item.phaseId || (!row.upgrades_claim && !options.dryRun) || !['passed', 'proven'].includes(row.status)) return false;
      const proves = JSON.stringify(row.proves || []);
      const source = `${row.source || ''} ${JSON.stringify(row.commands || [])} ${row.type || ''} ${row.proof_type || ''}`;
      return /ui_action_path|state_transition_proof|phase_core_passed|interactive_ui_trace/i.test(proves)
        && /interaction|user action|state transition|submit|send|input|readback|conversation|controller|ui/i.test(source);
    });
    const browserRows = ledgerRows.filter((row) => {
      if (row.phase_id !== item.phaseId) return false;
      const proves = JSON.stringify(row.proves || []);
      const source = `${row.source || ''} ${JSON.stringify(row.commands || [])} ${row.type || ''} ${row.proof_type || ''}`;
      return /browser_runtime_trace|repeatable_browser_e2e|screenshot_state_set|ux_design_gate/i.test(proves)
        && /playwright|browser|chrom(e|ium)|screenshot|axe|accessibility|browser-proof/i.test(source)
        && ((row.upgrades_claim === true && ['passed', 'proven'].includes(row.status)) || (row.upgrades_claim === false && ['blocked', 'skipped'].includes(row.status)));
    });
    return [
      {
        id: `interactive_ui_surface_${item.phaseId}`,
        ok: !uiBearing || (uiFiles.length > 0 && hasInteractiveUiSurface && !genericShellOnly),
        evidence: uiBearing
          ? 'UI-bearing phase must create an interaction surface with controls, state hooks, and product-specific state text; static cards or generic dashboards are not enough.'
          : 'Selected phase is not UI-bearing, so interactive UI surface is not required.',
      },
      {
        id: `interactive_ui_runtime_trace_${item.phaseId}`,
        ok: !uiBearing || interactionRows.length > 0,
        evidence: uiBearing
          ? 'UI-bearing phase must produce upgrading local interaction/state-transition evidence for a user action path before phase core can pass.'
          : 'Selected phase is not UI-bearing, so interaction runtime trace is not required.',
      },
      {
        id: `interactive_ui_browser_attempt_${item.phaseId}`,
        ok: !uiBearing || browserRows.length > 0,
        evidence: uiBearing
          ? 'UI-bearing phase must either produce browser/e2e/screenshot-backed evidence or a separate honest non-upgrading browser/UX blocker after local interaction proof.'
          : 'Selected phase is not UI-bearing, so browser attempt is not required.',
      },
    ];
  }) : [];
  const unsupportedBroadClaims = ledgerRows.filter((row) => {
    if (row.upgrades_claim !== true) return false;
    const claimText = JSON.stringify(row.proves || []);
    const sourceText = `${row.source || ''} ${JSON.stringify(row.commands || [])} ${row.type || ''} ${row.proof_type || ''}`.toLowerCase();
    const reviewOnly = /review_artifact|review/i.test(`${row.type || ''} ${row.proof_type || ''}`);
    if (reviewOnly && /ux_design_gate|security_boundary_review|worker_retry_cancel_recovery|migration_retention_backup_upload_limits|browser_runtime_trace|repeatable_browser_e2e|screenshot_state_set|live_provider_proof_blocker_only/i.test(claimText)) return true;
    const claimsUxDesign = /ux_design_gate/i.test(claimText);
    if (claimsUxDesign && !/playwright|browser|chrom(e|ium)|screenshot|axe|accessibility/i.test(sourceText)) return true;
    const claimsBrowser = /browser_runtime_trace|repeatable_browser_e2e|screenshot_state_set/i.test(claimText);
    if (claimsBrowser && !/playwright|browser|chrom(e|ium)|screenshot|axe|accessibility/i.test(sourceText)) return true;
    const claimsWorker = /worker_retry_cancel_recovery/i.test(claimText);
    if (claimsWorker && !/worker|queue|retry|cancel|recovery|dead[- ]?letter/i.test(sourceText)) return true;
    const claimsLifecycle = /migration_retention_backup_upload_limits/i.test(claimText);
    if (claimsLifecycle && !/migration|retention|backup|upload limit|quota|delete|export|reset/i.test(sourceText)) return true;
    const claimsSecurity = /security_boundary_review/i.test(claimText);
    if (claimsSecurity && !/security|tenant|auth|secret|permission|destructive|boundary/i.test(sourceText)) return true;
    return false;
  });
  const narrowEvidenceClaimCheck = {
    id: 'no_unsupported_broad_evidence_upgrades',
    ok: unsupportedBroadClaims.length === 0,
    evidence: unsupportedBroadClaims.length
      ? `Evidence rows must not upgrade browser/e2e/screenshot/security/data-lifecycle/worker claims without matching proof artifacts. Offending rows: ${unsupportedBroadClaims.map((row) => row.artifact_id).join(', ')}.`
      : 'Broad evidence labels are not over-upgraded from generic traces.',
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
      id: 'project_setup_runtime_artifact',
      ok: setupFiles.length > 0 && setupGateTokens.every((pattern) => pattern.test(setupText)),
      evidence: setupFiles.length
        ? 'Runtime setup artifact must record auth/session/tenant, provider, persistence, worker/runtime, deployment/ops, browser/e2e, safety, and verification decisions before phase work.'
        : 'Runtime setup artifact .buildprint/setup.md or .buildprint/setup/* was not created.',
    },
    {
      id: 'phase_proof_gate_references',
      ok: phasesToReplay.every((item) => new RegExp(`${escapeRegex(item.proofGate)}|proof gate`, 'i').test(combined) && new RegExp(`phase_id["':\\s]+${escapeRegex(item.phaseId)}`, 'i').test(combined)),
      evidence: `Looks for requested proof-gate language and phase_id evidence for ${phasesToReplay.map((item) => item.phaseId).join(', ')}.`,
    },
    ...phaseEvidenceChecks,
    ...teamGateChecks,
    ...reviewContractChecks(workspace, phasesToReplay),
    allPhaseNoBlockersCheck,
    evidenceSchemaCheck,
    providerClaimCheck,
    ...uiAttemptChecks,
    ...interactiveUiChecks,
    ...strictUiProofChecks,
    blockerClaimCheck,
    narrowEvidenceClaimCheck,
    noFakeClaimCheck,
    {
      id: 'no_parent_context_enumeration',
      ok: parentTraversalLines.length === 0,
      evidence: parentTraversalLines.length ? `Replay enumerated parent/out-of-scope paths: ${parentTraversalLines.slice(0, 3).join(' | ')}` : 'Replay did not enumerate parent directories in transcript output.',
    },
    {
      id: 'no_obsolete_routing',
      ok: !includesAny(obsoleteRoutingText, forbidden) && !includesAny(generatedFileText, forbidden) && !corpus.files.some((file) => !file.startsWith('selected-buildprint/') && includesAny(file, forbidden)),
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

function archiveWorkspace(options, workspace) {
  if (!options.archive || !workspace || !fs.existsSync(workspace)) return null;
  const archivePath = path.resolve(root, options.archive);
  fs.rmSync(archivePath, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(archivePath), { recursive: true });
  fs.cpSync(workspace, archivePath, { recursive: true });
  return archivePath;
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
  const timedOutAfterPassingWorkspace = Boolean(
    options.allowTimeoutAfterPass
    && output.error
    && output.error.code === 'ETIMEDOUT'
    && score.pass
  );
  const archivePath = archiveWorkspace(options, workspace);
  const report = {
    schema_version: 'mapper-os/replay-eval-report.v1',
    harness: 'fresh-agent-codex-replay',
    mode: options.dryRun ? 'dry-run' : 'codex',
    purpose: 'Tests downstream executable-blueprint packet consumption quality without reintroducing a deterministic mapper product.',
    pass: options.dryRun ? score.pass : ((output.status === 0 && !output.error && score.pass) || timedOutAfterPassingWorkspace),
    packet: {
      source: rel(root, packetSource),
      source_hash: hashDir(packetSource),
      copied_to: rel(workspace, packetTarget),
      active_phase: phase,
      replay_scope: options.allPhases ? 'all-phases' : (options.phaseId ? 'selected-phase' : 'active-phase'),
      phases_replayed: selectReplayPhases(phase, options),
    },
    workspace,
    archived_workspace: archivePath ? rel(root, archivePath) : null,
    command: options.dryRun ? null : { executable: options.codex, args: ['exec', '--sandbox', 'workspace-write', '<prompt>'], cwd: workspace, timeout_ms: options.timeoutMs },
    codex: {
      invoked: !options.dryRun,
      exit_status: output.status,
      signal: output.signal,
      error: output.error ? { code: output.error.code, message: output.error.message } : null,
      timed_out_after_passing_workspace: timedOutAfterPassingWorkspace,
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
    archivePath ? `Archived workspace: ${archivePath}` : null,
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
  ].filter((line) => line !== null).join('\n');
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
