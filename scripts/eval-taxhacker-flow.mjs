#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = process.cwd();
const repoUrl = 'https://github.com/vas3k/TaxHacker.git';
const repoName = 'vas3k/TaxHacker';
const mapperOs = 'buildprints/buildprint-mapper-os';
const qualityDir = path.join(root, 'quality');
fs.mkdirSync(qualityDir, { recursive: true });

function usage() {
  return [
    'Usage: node scripts/eval-taxhacker-flow.mjs [options]',
    '',
    'Runs a cost-capped Mapper OS eval for TaxHacker:',
    '  1. Clone TaxHacker fresh into /tmp',
    '  2. Codex mapper creates a fresh executable packet',
    '  3. Packet + selected-output checks validate executable v5 shape',
    '  4. Deterministic checks verify product-surface coverage and no route-parity overconstraint',
    '  5. Codex map judge critiques the packet',
    '',
    'By default this eval does NOT run full implementation replay. Use --full-replay explicitly.',
    '',
    'Options:',
    '  --dry-run                 Validate harness mechanics without invoking Codex or network clone',
    '  --full-replay             Also run eval-mapper-replay and outcome judge (expensive)',
    '  --resume-outcome          Reuse existing replay artifacts and run only outcome judge',
    '  --timeout-ms <n>          Timeout for each Codex role (default: 900000)',
    '  --help                    Show this help',
  ].join('\n');
}

function parseArgs(argv) {
  const options = { dryRun: false, fullReplay: false, resumeOutcome: false, timeoutMs: 15 * 60 * 1000 };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') { console.log(usage()); process.exit(0); }
    if (arg === '--dry-run' || arg === '--no-codex') options.dryRun = true;
    else if (arg === '--full-replay') options.fullReplay = true;
    else if (arg === '--resume-outcome') options.resumeOutcome = true;
    else if (arg === '--timeout-ms') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error('--timeout-ms requires a value');
      index += 1;
      const parsed = Number(value);
      if (!Number.isFinite(parsed) || parsed <= 0) throw new Error('--timeout-ms must be a positive number');
      options.timeoutMs = parsed;
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function run(command, args, opts = {}) {
  return spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 50 * 1024 * 1024,
    ...opts,
  });
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), `${JSON.stringify(value, null, 2)}\n`);
}

function safeJsonFile(file) {
  try { return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')); }
  catch { return null; }
}

function safeReadText(file) {
  try { return fs.readFileSync(path.isAbsolute(file) ? file : path.join(root, file), 'utf8'); }
  catch { return ''; }
}

function listFiles(dir, base = dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, base));
    if (entry.isFile()) out.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return out.sort();
}

function extractJson(text) {
  const fenced = text.match(/```json\s*([\s\S]*?)\s*```/i);
  if (fenced) return JSON.parse(fenced[1]);
  const start = text.indexOf('{');
  if (start < 0) throw new Error('no JSON object found');
  let depth = 0, inString = false, escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (escaped) { escaped = false; continue; }
    if (char === '\\' && inString) { escaped = true; continue; }
    if (char === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return JSON.parse(text.slice(start, index + 1));
    }
  }
  throw new Error('unterminated JSON object');
}

function transcript(title, result, extra = '') {
  return [`# ${title}`, '', extra, '', '## Stdout', '', result.stdout || '', '', '## Stderr', '', result.stderr || ''].join('\n');
}

function codexExec(prompt, opts = {}) {
  if (opts.dryRun) return { status: 0, signal: null, stdout: opts.dryRunStdout || '{}', stderr: '', error: null };
  return run('codex', ['exec', '--full-auto', prompt], { cwd: opts.cwd || root, timeout: opts.timeoutMs });
}

function cloneTaxHacker(options) {
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), 'taxhacker-source-'));
  if (options.dryRun) {
    fs.writeFileSync(path.join(sourceDir, 'README.md'), 'Dry TaxHacker source: self-hosted AI accounting app for receipts, invoices, transactions, categories, projects, custom prompts, filters, export, provider configuration, and durable review workflow.\n');
    fs.writeFileSync(path.join(sourceDir, 'SOURCE_MANIFEST.json'), JSON.stringify({ repo: repoName, url: repoUrl, mode: 'dry-run' }, null, 2));
    return sourceDir;
  }
  const clone = run('git', ['clone', '--depth', '1', '--filter=blob:none', repoUrl, sourceDir], { timeout: 3 * 60 * 1000 });
  if (clone.status !== 0) throw new Error(`failed to clone ${repoUrl}: ${clone.stderr || clone.stdout}`);
  const commit = run('git', ['-C', sourceDir, 'rev-parse', 'HEAD']);
  const files = run('git', ['-C', sourceDir, 'ls-files']);
  fs.writeFileSync(path.join(sourceDir, 'SOURCE_MANIFEST.json'), JSON.stringify({ repo: repoName, url: repoUrl, commit: commit.stdout.trim(), file_count: files.stdout.trim().split(/\r?\n/).filter(Boolean).length }, null, 2));
  return sourceDir;
}

function makeMapperPrompt(sourceDir, mapWorkspace, outDir) {
  return `You are the mapper-codex role in a Mapper OS eval.\n\nTask: map the TaxHacker source repository at ${sourceDir} into a fresh current executable packet at ${outDir}.\n\nUse Mapper OS as authority:\n- ${path.join(root, mapperOs)}\n- ${path.join(root, mapperOs, 'prompts/extract-selected.md')}\n- ${path.join(root, mapperOs, 'templates/executable-packet')}\n- ${path.join(root, mapperOs, 'checks/acceptance.md')}\n\nHard requirements:\n- Write the packet directly under ${outDir}.\n- The packet must be source-independent: implementation agents must not need ${sourceDir}.\n- Use current executable packet baseline only: BUILDPRINT.md, blueprint.yaml, 01-questions.md, 02-project-setup.md, 03-phases/phase-index.yaml, 03-phases/*.md, 04-evaluation.md, 05-evidence/evidence-ledger.jsonl, 05-evidence/evidence-ledger.schema.json, generated/agent-prompt.md.\n- Preserve exact executable-packet scaffold anchors before adding TaxHacker-specific content. Required anchors include execution_start, machine_contract, setup_gate, implementation_loop, repair_loop.on_failure; BUILDPRINT headings Required read order, Project setup gate, Implementation loop, Repair routing; 01-questions headings ## 1. through ## 6.; phase-index active_phase as a full 03-phases/<phase>.md path; evaluation labels provider_live, durable_persistence, security_boundary, no_fake.\n- Do not create START_HERE.md, PRE_IMPLEMENTATION_QUESTIONS.md, packet AGENTS.md, docs/, 03-capabilities/, 08-evaluation/, 09-evidence/, or other obsolete packet layouts.\n- Model TaxHacker specifically: self-hosted AI accounting/document extraction app; receipt/invoice/PDF ingestion; OCR/parser/decomposition where present; LLM extraction adapter with deterministic/mock mode; transaction ledger/review/edit workflow; categories/projects/rules/custom prompts; filters/search/export; provider/secret configuration; persistence, import/export, and UI empty/loading/error/blocked/success states.\n- Build a source capability/surface ledger. Preserve capabilities without forcing exact route/function parity. Every source-backed UI/API/state/provider/job/export surface must be preserve/replace/merge/defer/drop with target contract and compatibility impact.\n- Dependencies must model workflow order. Do not set every phase to depends_on: [] unless justified.\n- Runtime proof/blocker rows belong in .buildprint/evidence/evidence-ledger.jsonl in a downstream implementation workspace. Packaged 05-evidence/evidence-ledger.jsonl is seed evidence only.\n\nAfter writing files, run and fix these self-checks if available:\n1. node /root/blueprint/bin/agb.js packet check ${outDir}\n2. node /root/blueprint/scripts/check-mapper-selected-output.mjs ${outDir}\nReturn a concise summary with created files and exact self-check results.\n\nWorkspace note: you may use ${mapWorkspace} for scratch files. Do not commit anything.`;
}

function dryRunPacket(outDir) {
  fs.mkdirSync(path.join(outDir, '03-phases'), { recursive: true });
  fs.mkdirSync(path.join(outDir, '05-evidence'), { recursive: true });
  fs.mkdirSync(path.join(outDir, 'generated'), { recursive: true });
  fs.writeFileSync(path.join(outDir, 'BUILDPRINT.md'), '# BUILDPRINT: Dry TaxHacker Eval Packet\n\n## Required read order\n1. BUILDPRINT.md\n2. 01-questions.md\n3. 02-project-setup.md\n4. blueprint.yaml\n5. 03-phases/phase-index.yaml\n6. active phase\n7. 04-evaluation.md\n8. 05-evidence/evidence-ledger.jsonl\n\n## Project setup gate\nComplete setup first.\n\n## Implementation loop\nobserve plan execute verify reflect record\n\n## Repair routing\nroute failures to current phase/setup/questions/prior phase/blocker ledger.\n');
  fs.writeFileSync(path.join(outDir, 'blueprint.yaml'), 'schema_version: mapper-os/executable-blueprint.v5\nexecution_start: BUILDPRINT.md\nmachine_contract: blueprint.yaml\nsource:\n  input: vas3k/TaxHacker\n  checkout_path: external-source-checkout\n  commit: dry-run\nclaim_status: SELECTED_UNQUALIFIED\nsetup_gate:\n  questions: 01-questions.md\n  project_setup: 02-project-setup.md\nimplementation_loop:\n  steps: [observe, plan, execute, verify, reflect, record]\nrepair_loop:\n  on_failure:\n    proof_gate_failed: current_phase\n    architecture_contradiction: 02-project-setup.md\nphases:\n  - phase_id: document-ingestion-extraction\n    file: 03-phases/01-document-ingestion-extraction.md\ncontext:\n  phase_index: 03-phases/phase-index.yaml\ngenerated_artifacts:\n  agent_prompt: generated/agent-prompt.md\n');
  fs.writeFileSync(path.join(outDir, '01-questions.md'), '# Questions\n\nDefault for every unanswered question: Use AI best judgment to produce the highest-quality appropriate implementation. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.\n\n## 1. Product direction\n\n## 2. Tech stack preferences\n\n## 3. UX/UI preferences\n\n## 4. Architecture preferences\n\n## 5. Quality bar\n\n## 6. Constraints / things to avoid\n');
  fs.writeFileSync(path.join(outDir, '02-project-setup.md'), '# Project Setup\n\n## Human preferences\n\n## Inferred project shape\nSelf-hosted AI accounting app with document ingestion, LLM extraction provider adapter, transaction review/editing, categories, projects, custom prompts, filters, export, provider config, and durable persistence.\n\n## Stack decisions\n\n## Source contract anchors\nSource path anchors include document upload/parsing, transaction ledger, category/project/custom prompt workflows, filters/export, provider configuration, and UI states.\n\n## Source capability/surface ledger\n- Surface id: SRC-DOCUMENT-INGESTION\n  - Source anchor: source path document ingestion/parsing surfaces.\n  - Source capability: upload receipt/invoice/PDF documents and extract structured accounting data.\n  - Target disposition: preserve | replace | merge | defer | drop. This dry-run preserves.\n  - Target contract: equivalent target behavior; route/function names may change.\n  - Compatibility impact: source path is an anchor only, not route/function parity.\n  - Phase(s): `03-phases/01-document-ingestion-extraction.md`.\n\n## Architecture rules\n\n## Team operating model\n\n## AGENTS.md plan\nThe implementation project must create Root `AGENTS.md` and local `AGENTS.md` files at real architectural boundaries after setup.\n\n## Quality gates\n\n## Safety and permissions\n\n## Open questions and assumptions\n\n## Phase start gate\nDo not start `03-phases/*` until this setup is explicit enough to generate root/local `AGENTS.md` without inventing architecture.\n');
  fs.writeFileSync(path.join(outDir, '03-phases/phase-index.yaml'), 'schema_version: mapper-os/phase-index.v1\nactive_phase: 03-phases/01-document-ingestion-extraction.md\nphases:\n  - phase_id: document-ingestion-extraction\n    file: 03-phases/01-document-ingestion-extraction.md\n    depends_on: []\n    proof_gate: proof-document-ingestion-extraction\n');
  fs.writeFileSync(path.join(outDir, '03-phases/01-document-ingestion-extraction.md'), '# Phase 01 — Document Ingestion and Extraction\n\n## Product outcome\nUsers can upload receipts/invoices/PDFs and receive extracted transaction candidates for review.\n\n## Source evidence\nTaxHacker source evidence anchors document ingestion, LLM extraction, transactions, categories, projects, custom prompts, filters, export, provider config, and persistence.\n\n## Source surface dispositions\n- Target disposition: preserve | replace | merge | defer | drop. This dry-run preserves.\n- Target contract: equivalent target behavior for source capability without forcing route/function parity.\n- Compatibility impact: source path is an anchor only, not route/function parity.\n\n## Implementation scope\n\n## Interfaces touched\nupload, parse, extraction adapter, transaction candidate API/UI, category/project prompt config.\n\n## State/runtime touched\ndocuments, extracted fields, transactions, categories, projects, prompts, provider config, export artifacts.\n\n## UX/UI requirements\nempty/loading/error/blocked/success states.\n\n## Safety/security constraints\nNo provider keys or private financial documents in logs/evidence.\n\n## Quality gates\n\n## Proof gate\nRuntime evidence ledger: runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`; phase_id: document-ingestion-extraction.\n\n## Repair routing\nReturn to current phase on proof failure. Route architecture contradictions to `02-project-setup.md`, missing human choices to `01-questions.md`, and external blockers to `05-evidence/evidence-ledger.jsonl`.\n');
  fs.writeFileSync(path.join(outDir, '04-evaluation.md'), '# Evaluation\n\nprovider_live durable_persistence security_boundary no_fake\n\n## Loop completion rule\nProof gates plus evidence rows required.\n\n## Blocker honesty\nRecord unavailable live provider/export/parser blockers honestly.\n');
  fs.writeFileSync(path.join(outDir, '05-evidence/evidence-ledger.schema.json'), '{"type":"object","properties":{"phase_id":{},"proof_type":{},"provider_mode":{},"upgrades_claim":{}}}\n');
  fs.writeFileSync(path.join(outDir, '05-evidence/evidence-ledger.jsonl'), '{"artifact_id":"dry-taxhacker-seed","type":"source_mapping_seed","status":"selected_unqualified","source":"vas3k/TaxHacker","proves":"dry-run packet mechanics only","phase_id":"document-ingestion-extraction","proof_type":"seed","provider_mode":"none","upgrades_claim":false}\n');
  fs.writeFileSync(path.join(outDir, 'generated/agent-prompt.md'), '# Generated agent prompt\n\nGenerated from: blueprint.yaml\n\nThis file is not source of truth and not authoritative. Follow BUILDPRINT.md, 01-questions.md, 02-project-setup.md, 03-phases/phase-index.yaml, 04-evaluation.md, and 05-evidence/evidence-ledger.jsonl.\n');
}

function runMapper(sourceDir, options) {
  const mapWorkspace = fs.mkdtempSync(path.join(os.tmpdir(), 'mapper-taxhacker-map-'));
  const outDir = path.join(mapWorkspace, 'selected-buildprint');
  const prompt = makeMapperPrompt(sourceDir, mapWorkspace, outDir);
  let result;
  if (options.dryRun) { dryRunPacket(outDir); result = { status: 0, signal: null, stdout: `Dry-run mapper wrote ${outDir}`, stderr: '', error: null }; }
  else result = codexExec(prompt, { cwd: mapWorkspace, timeoutMs: options.timeoutMs });
  const files = listFiles(outDir);
  const required = ['BUILDPRINT.md', 'blueprint.yaml', '01-questions.md', '02-project-setup.md', '03-phases/phase-index.yaml', '04-evaluation.md', '05-evidence/evidence-ledger.jsonl', '05-evidence/evidence-ledger.schema.json', 'generated/agent-prompt.md'];
  const missing = required.filter((file) => !files.includes(file));
  const report = {
    schema_version: 'mapper-os/taxhacker-codex-map-report.v1',
    mode: options.dryRun ? 'dry-run' : 'codex',
    pass: result.status === 0 && fs.existsSync(outDir) && missing.length === 0,
    source: sourceDir,
    repository: repoName,
    mapper_os: path.join(root, mapperOs),
    workspace: mapWorkspace,
    packet: outDir,
    command: options.dryRun ? null : { executable: 'codex', args: ['exec', '--full-auto', '<prompt>'], cwd: mapWorkspace, timeout_ms: options.timeoutMs },
    codex: { exit_status: result.status, signal: result.signal, error: result.error ? { code: result.error.code, message: result.error.message } : null },
    files,
    missing_required_files: missing,
  };
  fs.writeFileSync(path.join(root, 'quality/taxhacker-codex-map-transcript.txt'), transcript('TaxHacker Codex Mapper Transcript', result, `## Prompt\n\n${prompt}`));
  writeJson('quality/taxhacker-codex-map-report.json', report);
  return { packet: outDir, workspace: mapWorkspace, report };
}

function deterministicMapChecks(packetPath) {
  const packetRoot = path.isAbsolute(packetPath) ? packetPath : path.join(root, packetPath);
  const files = new Set(listFiles(packetRoot));
  const checks = [];
  const add = (id, ok, evidence, details = null) => checks.push({ id, ok, evidence, ...(details ? { details } : {}) });
  const yamlCheck = run('python3', ['-c', `import pathlib, yaml; yaml.safe_load(pathlib.Path(${JSON.stringify(path.join(packetRoot, 'blueprint.yaml'))}).read_text()); print('ok')`]);
  add('blueprint_yaml_parses', yamlCheck.status === 0, yamlCheck.status === 0 ? 'blueprint.yaml parsed with PyYAML.' : (yamlCheck.stderr || yamlCheck.stdout).trim());
  const setup = safeReadText(path.join(packetRoot, '02-project-setup.md'));
  const phaseText = Array.from(files).filter((file) => file.startsWith('03-phases/') && file.endsWith('.md')).map((file) => fs.readFileSync(path.join(packetRoot, file), 'utf8')).join('\n');
  const combined = `${setup}\n${phaseText}`;
  const terms = ['receipt', 'invoice', 'document', 'transaction', 'category', 'project', 'prompt', 'provider', 'export', 'filter', 'persistence'];
  const presentTerms = terms.filter((term) => new RegExp(term, 'i').test(combined));
  add('taxhacker_surface_terms_present', presentTerms.length >= 8, `Found TaxHacker surface terms: ${presentTerms.join(', ') || 'none'}.`, { expectedTerms: terms });
  const hasLedger = /Source capability\/surface ledger/i.test(setup);
  const dispositions = ['preserve', 'replace', 'merge', 'defer', 'drop'].filter((term) => new RegExp(`\\b${term}\\b`, 'i').test(combined));
  const hasNoParity = /not route\/function parity|without forcing route\/function parity|route\/function names may change/i.test(combined);
  add('source_surface_ledger_has_dispositions', hasLedger && dispositions.length >= 2 && hasNoParity, `Ledger=${hasLedger}; dispositions=${dispositions.join(', ') || 'none'}; noParity=${hasNoParity}.`);
  const phaseIndex = safeReadText(path.join(packetRoot, '03-phases/phase-index.yaml'));
  const phaseCount = (phaseIndex.match(/\n\s*-\s+phase_id:/g) || []).length;
  const emptyDeps = (phaseIndex.match(/depends_on:\s*\[\]/g) || []).length;
  add('phase_dependencies_model_workflow', !(phaseCount > 1 && emptyDeps === phaseCount), `${emptyDeps}/${phaseCount} phases declare depends_on: [].`);
  const forbidden = ['03-capabilities/', '08-evaluation/', '09-evidence/', 'START_HERE.md', 'PRE_IMPLEMENTATION_QUESTIONS.md', 'AGENTS.md'];
  const badFiles = Array.from(files).filter((file) => forbidden.some((item) => file === item || file.startsWith(item)));
  add('no_legacy_or_project_instruction_files', badFiles.length === 0, badFiles.length ? `Forbidden files found: ${badFiles.join(', ')}` : 'No forbidden legacy/project instruction files found.');
  return { schema_version: 'mapper-os/taxhacker-deterministic-map-checks.v1', pass: checks.every((check) => check.ok), packet: packetPath, checks };
}

function codexJudge(kind, prompt, outFile, options) {
  const transcriptFile = outFile.replace(/\.json$/, '-transcript.txt');
  const dryRunReport = { schema_version: `mapper-os/${kind}-judge.v1`, pass: true, score: 1, rating: 'dry-run', recommendation: 'dry-run', strengths: ['Harness dry-run only.'], risks: [], missing_or_weak: [], evidence: [] };
  const result = options.dryRun ? { status: 0, signal: null, stdout: JSON.stringify(dryRunReport), stderr: '', error: null } : codexExec(prompt, { cwd: root, timeoutMs: options.timeoutMs });
  fs.writeFileSync(path.join(root, transcriptFile), transcript(`${kind} Codex Judge Transcript`, result, `## Prompt\n\n${prompt}`));
  let parsed = null, parseError = null;
  try { parsed = extractJson(result.stdout || `${result.stdout}\n${result.stderr}`); }
  catch (error) { parseError = error.message; }
  const report = parsed || { schema_version: `mapper-os/${kind}-judge.v1`, pass: false, score: 0, parse_error: parseError, raw_excerpt: `${result.stdout}\n${result.stderr}`.slice(0, 12000) };
  writeJson(outFile, report);
  return { result, report, transcriptFile };
}

const options = parseArgs(process.argv.slice(2));
if (!fs.existsSync(path.join(root, mapperOs))) throw new Error(`missing Mapper OS ${mapperOs}`);
const stages = {};
let source = null;
let packetPath = null;

function writeFlowSummary() {
  const replayRequired = options.fullReplay || options.resumeOutcome;
  const summary = {
    schema_version: 'mapper-os/taxhacker-flow-eval.v1',
    mode: replayRequired ? 'full-replay' : 'map-only-cost-capped',
    pass: stages.codex_mapping?.pass === true
      && stages.packet_check?.status === 0
      && stages.selected_output_check?.status === 0
      && stages.deterministic_map_checks?.pass === true
      && stages.map_judge?.pass === true
      && (!replayRequired || (stages.codex_replay?.status === 0 && stages.codex_replay?.pass === true && stages.outcome_judge?.pass === true)),
    status: stages.map_judge ? (replayRequired && !stages.outcome_judge ? 'partial' : 'complete') : 'partial',
    repository: repoName,
    source,
    generated_packet: packetPath,
    mapper_os: mapperOs,
    stages,
  };
  writeJson('quality/taxhacker-flow-report.json', summary);
  return summary;
}

if (options.resumeOutcome) {
  const prior = safeJsonFile('quality/taxhacker-flow-report.json');
  if (!prior?.generated_packet) throw new Error('--resume-outcome requires quality/taxhacker-flow-report.json with generated_packet');
  packetPath = prior.generated_packet;
  source = prior.source;
  Object.assign(stages, prior.stages || {});
} else {
  source = cloneTaxHacker(options);
  writeFlowSummary();
  const mapping = runMapper(source, options);
  packetPath = mapping.packet;
  stages.codex_mapping = { pass: mapping.report.pass, artifact: 'quality/taxhacker-codex-map-report.json', transcript: 'quality/taxhacker-codex-map-transcript.txt', workspace: mapping.workspace, packet: packetPath };
  writeFlowSummary();
  const packetCheck = run(process.execPath, ['./bin/agb.js', 'packet', 'check', packetPath]);
  fs.writeFileSync(path.join(root, 'quality/taxhacker-packet-check.txt'), `${packetCheck.stdout}\n${packetCheck.stderr}`);
  stages.packet_check = { status: packetCheck.status, artifact: 'quality/taxhacker-packet-check.txt' };
  writeFlowSummary();
  const selectedCheck = run(process.execPath, ['scripts/check-mapper-selected-output.mjs', packetPath]);
  fs.writeFileSync(path.join(root, 'quality/taxhacker-selected-output-check.txt'), `${selectedCheck.stdout}\n${selectedCheck.stderr}`);
  stages.selected_output_check = { status: selectedCheck.status, artifact: 'quality/taxhacker-selected-output-check.txt' };
  writeFlowSummary();
  const deterministic = deterministicMapChecks(packetPath);
  writeJson('quality/taxhacker-map-deterministic-checks.json', deterministic);
  stages.deterministic_map_checks = { pass: deterministic.pass, artifact: 'quality/taxhacker-map-deterministic-checks.json', failed: deterministic.checks.filter((check) => !check.ok).map((check) => check.id) };
  writeFlowSummary();
  const mapJudgePrompt = `You are the map-judge-codex role in a Mapper OS eval.\n\nEvaluate the freshly mapped executable packet at ${packetPath} against TaxHacker source at ${source}.\n\nJudge map quality only, not downstream implementation. Authority inputs:\n- ${path.join(root, mapperOs, 'checks/acceptance.md')}\n- ${path.join(root, mapperOs, 'prompts/extract-selected.md')}\n- Packet check: ${path.join(root, 'quality/taxhacker-packet-check.txt')}\n- Selected-output check: ${path.join(root, 'quality/taxhacker-selected-output-check.txt')}\n- Deterministic checks: ${path.join(root, 'quality/taxhacker-map-deterministic-checks.json')}\n\nSpecifically judge whether the packet captures TaxHacker as a self-hosted AI accounting/document extraction app: receipt/invoice/PDF ingestion, extraction provider adapter, transaction ledger/review/editing, categories/projects/custom prompts, filters/search/export, provider/secret configuration, persistence/readback, UI states, security/no-fake gates. It must preserve source capabilities without forcing exact route/function parity.\n\nReturn ONLY valid JSON with this schema:\n{\n  "schema_version":"mapper-os/taxhacker-map-judge.v1",\n  "pass":boolean,\n  "score":number,\n  "rating":"poor|weak|adequate|good|excellent",\n  "completeness_score":number,\n  "content_score":number,\n  "required_elements_missing":[string],\n  "source_fidelity_gaps":[string],\n  "strengths":[string],\n  "risks":[string],\n  "missing_or_weak":[string],\n  "evidence":[{"claim":string,"files":[string]}],\n  "recommendation":"ship|ship-with-notes|needs-fix"\n}`;
  const mapJudge = codexJudge('taxhacker-map', mapJudgePrompt, 'quality/taxhacker-map-judge.json', options);
  stages.map_judge = { status: mapJudge.result.status, pass: mapJudge.report.pass, artifact: 'quality/taxhacker-map-judge.json', transcript: mapJudge.transcriptFile, score: mapJudge.report.score, recommendation: mapJudge.report.recommendation };
  writeFlowSummary();
}

if (options.fullReplay || options.resumeOutcome) {
  const replayReport = 'quality/taxhacker-codex-replay-report.json';
  const replayTranscript = 'quality/taxhacker-codex-replay-transcript.txt';
  if (!options.resumeOutcome) {
    const replayArgs = ['scripts/eval-mapper-replay.mjs', '--packet', packetPath, '--report', replayReport, '--transcript', replayTranscript, '--timeout-ms', String(options.timeoutMs), '--keep-workspace'];
    if (options.dryRun) replayArgs.push('--dry-run');
    const replay = run(process.execPath, replayArgs, { timeout: options.timeoutMs + 60 * 1000 });
    const replayJson = safeJsonFile(replayReport);
    stages.codex_replay = { status: replay.status, artifact: replayReport, transcript: replayTranscript, pass: replayJson?.pass, workspace: replayJson?.workspace, active_phase: replayJson?.packet?.active_phase };
    writeFlowSummary();
  }
  const replayJson = safeJsonFile(replayReport);
  const outcomePrompt = `You are the outcome-judge-codex role. Judge whether replay from TaxHacker packet ${packetPath} created meaningful first-phase implementation behavior without source leakage, fake completeness, or missing evidence. Use replay report ${path.join(root, replayReport)} and transcript ${path.join(root, replayTranscript)}. Return ONLY JSON {"schema_version":"mapper-os/taxhacker-outcome-judge.v1","pass":boolean,"score":number,"rating":"poor|weak|adequate|good|excellent","recommendation":"ship|ship-with-notes|needs-fix","strengths":[string],"risks":[string],"missing_or_weak":[string],"evidence":[{"claim":string,"files":[string]}]}.`;
  const outcomeJudge = replayJson?.workspace ? codexJudge('taxhacker-outcome', outcomePrompt, 'quality/taxhacker-outcome-judge.json', options) : null;
  stages.outcome_judge = outcomeJudge ? { status: outcomeJudge.result.status, pass: outcomeJudge.report.pass, artifact: 'quality/taxhacker-outcome-judge.json', transcript: outcomeJudge.transcriptFile, score: outcomeJudge.report.score, recommendation: outcomeJudge.report.recommendation } : { status: 'skipped', pass: false };
}

const summary = writeFlowSummary();
if (!summary.pass) {
  console.error(`TaxHacker flow eval failed or needs review. Report: quality/taxhacker-flow-report.json`);
  process.exitCode = 1;
} else {
  console.log(`TaxHacker flow eval passed. Report: quality/taxhacker-flow-report.json`);
}
