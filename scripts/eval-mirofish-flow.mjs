#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = process.cwd();
const checkedInPacket = 'buildprints/portable-ai-swarm-simulation-workbench';
const source = '/root/MiroFish';
const mapperOs = 'buildprints/buildprint-mapper-os';
const qualityDir = path.join(root, 'quality');
fs.mkdirSync(qualityDir, { recursive: true });

function usage() {
  return [
    'Usage: node scripts/eval-mirofish-flow.mjs [options]',
    '',
    'Runs the hard Mapper OS E2E eval with isolated roles:',
    '  1. Codex mapper maps /root/MiroFish into a fresh executable packet',
    '  2. Codex map judge critiques the generated packet against source + rubrics',
    '  3. Codex runner executes the generated packet without source repo access',
    '  4. Codex outcome judge critiques runner output + transcript/read order',
    '',
    'Options:',
    '  --use-checked-in-packet   Skip Codex mapping and evaluate buildprints/portable-ai-swarm-simulation-workbench',
    '  --resume-outcome          Reuse latest flow report + replay artifacts and run only the outcome judge',
    '  --dry-run                 Validate harness mechanics without invoking Codex mapper/judges/runner',
    '  --timeout-ms <n>          Timeout for each Codex role (default: 1200000)',
    '  --help                    Show this help',
  ].join('\n');
}

function parseArgs(argv) {
  const options = {
    useCheckedInPacket: false,
    resumeOutcome: false,
    dryRun: false,
    timeoutMs: 20 * 60 * 1000,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') {
      console.log(usage());
      process.exit(0);
    } else if (arg === '--use-checked-in-packet') {
      options.useCheckedInPacket = true;
    } else if (arg === '--resume-outcome') {
      options.resumeOutcome = true;
    } else if (arg === '--dry-run' || arg === '--no-codex') {
      options.dryRun = true;
    } else if (arg === '--timeout-ms') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error('--timeout-ms requires a value');
      index += 1;
      const parsed = Number(value);
      if (!Number.isFinite(parsed) || parsed <= 0) throw new Error('--timeout-ms must be a positive number');
      options.timeoutMs = parsed;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
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

function readText(file) {
  return fs.readFileSync(path.isAbsolute(file) ? file : path.join(root, file), 'utf8');
}

function safeReadText(file) {
  try { return readText(file); }
  catch { return ''; }
}

function listFiles(dir, base = dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
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
  let depth = 0;
  let inString = false;
  let escaped = false;
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
  return [
    `# ${title}`,
    '',
    extra,
    '',
    '## Stdout',
    '',
    result.stdout || '',
    '',
    '## Stderr',
    '',
    result.stderr || '',
  ].join('\n');
}

function codexExec(prompt, opts = {}) {
  if (opts.dryRun) {
    return { status: 0, signal: null, stdout: opts.dryRunStdout || '{}', stderr: '', error: null };
  }
  return run('codex', ['exec', '--full-auto', prompt], {
    cwd: opts.cwd || root,
    timeout: opts.timeoutMs,
  });
}

function makeMapperPrompt(mapWorkspace, outDir) {
  return `You are the mapper-codex role in a Mapper OS eval.\n\nTask: map the source repository at ${source} into a fresh current executable packet at ${outDir}.\n\nUse Mapper OS as the authority:\n- ${path.join(root, mapperOs)}\n- ${path.join(root, mapperOs, 'prompts/extract-selected.md')}\n- ${path.join(root, mapperOs, 'templates/executable-packet')}\n- ${path.join(root, mapperOs, 'checks/acceptance.md')}\n\nHard requirements:\n- Write the packet directly under ${outDir}.\n- The packet must be source-independent: implementation agents must not need ${source}.\n- Do not patch ${checkedInPacket}; this eval needs a fresh generated specimen.\n- Use current executable packet baseline only: BUILDPRINT.md, blueprint.yaml, 01-questions.md, 02-project-setup.md, 03-phases/phase-index.yaml, 03-phases/phase-flow.md, 03-phases/*.md, 04-evaluation.md, 05-evidence/evidence-ledger.jsonl, 05-evidence/evidence-ledger.schema.json, generated/agent-prompt.md.\n- Preserve the executable-packet scaffold anchors from ${path.join(root, mapperOs, 'templates/executable-packet')} exactly before adding MiroFish-specific content. Do not paraphrase validator-owned keys/headings/tokens.\n- Required exact anchors include blueprint keys execution_start, machine_contract, setup_gate, implementation_loop, repair_loop.on_failure; BUILDPRINT headings Required read order, Project setup gate, Implementation loop, Repair routing; 01-questions headings ## 1. through ## 6.; phase-index active_phase as a full 03-phases/<phase>.md path; phase-flow phase-run orchestration before evidence; evaluation labels provider_live, durable_persistence, security_boundary, no_fake.\n- Do not create START_HERE.md, PRE_IMPLEMENTATION_QUESTIONS.md, packet AGENTS.md, docs/, 03-capabilities/, 08-evaluation/, 09-evidence/, or other obsolete packet layouts.\n- Model MiroFish specifically: Flask/Vue/Vite, Zep/OASIS/OpenAI/provider boundaries, ontology generation, graph build, task lifecycle, simulation runtime, reports/interactions, data lifecycle, storage/artifacts/env names, route/API/job prefixes, UI states, proof gates.\n- Use canonical phase IDs consistently everywhere. Prefer numbered filename-matching IDs such as 01-ingestion-ontology, but phase-index file references and active_phase must be full packet-relative paths such as 03-phases/01-ingestion-ontology.md.\n- Dependencies must model workflow order; do not set every phase to depends_on: [] unless justified.\n- Runtime proof/blocker rows belong in .buildprint/evidence/evidence-ledger.jsonl in a downstream implementation workspace, and only after phase-flow plan/team/handoff/return/review/proof artifacts exist. Packaged 05-evidence/evidence-ledger.jsonl is seed evidence only.\n- Runtime artifact examples such as env_status.json and section_XX.md are implementation artifacts, not packet files. Do not write them as ambiguous backticked packet references unless they are prefixed as runtime artifact paths or clearly labeled non-packet examples.\n\nAfter writing files, run these self-checks if available and fix failures before returning:\n1. node /root/blueprint/bin/agb.js packet check ${outDir}\n2. node /root/blueprint/scripts/check-mapper-selected-output.mjs ${outDir}\nReturn a concise summary with created files and the exact self-check results.\n\nWorkspace note: you may use ${mapWorkspace} for scratch files. Do not commit anything.`;
}

function dryRunPacket(outDir) {
  fs.mkdirSync(path.join(outDir, '03-phases'), { recursive: true });
  fs.mkdirSync(path.join(outDir, '05-evidence'), { recursive: true });
  fs.mkdirSync(path.join(outDir, 'generated'), { recursive: true });
  fs.writeFileSync(path.join(outDir, 'BUILDPRINT.md'), '# BUILDPRINT: Dry MiroFish Eval Packet\n\n## Required read order\n1. BUILDPRINT.md\n2. 01-questions.md\n3. 02-project-setup.md\n4. blueprint.yaml\n5. 03-phases/phase-index.yaml\n6. 03-phases/phase-flow.md\n7. active phase\n8. 04-evaluation.md\n9. 05-evidence/evidence-ledger.jsonl\n\n## Project setup gate\nComplete setup first.\n\n## Implementation loop\nUse phase-runs through 03-phases/phase-flow.md: observe plan execute verify reflect record before evidence.\n\n## Repair routing\n- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`\n');
  fs.writeFileSync(path.join(outDir, 'blueprint.yaml'), 'schema_version: mapper-os/executable-blueprint\nexecution_start: BUILDPRINT.md\nmachine_contract: blueprint.yaml\nsource:\n  input: /root/MiroFish\n  checkout_path: /root/MiroFish\n  commit: dry-run\nclaim_status: SELECTED_UNQUALIFIED\nsetup_gate:\n  questions: 01-questions.md\n  project_setup: 02-project-setup.md\nimplementation_loop:\n  steps: [observe, plan, execute, verify, reflect, record]\nrepair_loop:\n  on_failure:\n    proof_gate_failed: current_phase\n    architecture_contradiction: 02-project-setup.md\nphases:\n  - phase_id: 01-ingestion-ontology\n    file: 03-phases/01-ingestion-ontology.md\ncontext:\n  phase_index: 03-phases/phase-index.yaml\ngenerated_artifacts:\n  agent_prompt: generated/agent-prompt.md\n');
  fs.writeFileSync(path.join(outDir, '01-questions.md'), '# Questions\n\n## 1. Defaults\nUse AI best judgment for non-blocking choices.\n\n## 6. Human stop points\nAsk for secrets/cost/destructive actions.\n');
  fs.writeFileSync(path.join(outDir, '02-project-setup.md'), '# Project Setup\n\n## Human preferences\n\n## Inferred project shape\nFlask API, Vue/Vite UI, Zep, OASIS, OpenAI, Docker, file-backed storage, env provider boundaries.\n\n## Source contract anchors\n- Route/API/job prefixes and handlers: /ontology/generate, /build, /task/, /simulation, /report, /data/, /delete/.\n\n## Source capability/surface ledger\n- Surface id: dry-run\n  - Source anchor: source path dry-run.\n  - Source capability: dry-run mapping.\n  - Target disposition: preserve | replace | merge | defer | drop. This dry-run preserves.\n  - Target contract: equivalent target behavior.\n  - Compatibility impact: none; not route/function parity.\n  - Phase(s): `03-phases/01-ingestion-ontology.md`.\n\n## Stack decisions\n\n## Architecture rules\n\n## Team operating model\n\n## Execution authority model\nRoot `AGENTS.md` is a scope governor, not a product brain. `.buildprint/next-agent.md` is continuity for fresh sessions. `03-phases/phase-flow.md` is the executable phase-entry constitution. Bounded handoff text is the only valid source of delegated role, scope, allowed edits, proof command, and evidence row expectations.\n\n## Delegation and handoff protocol\nFor each phase, the orchestrator creates bounded handoffs with files to read, allowed edits, non-goals, success criteria, verification command, and evidence row requirements; specialists return changed files, proof results, evidence row draft, and risks; the orchestrator integrates, verifies, records evidence, and updates continuity.\n\n## AGENTS.md plan\n\n## Quality gates\n\n## Safety and permissions\n\n## Open questions and assumptions\n\n## Phase start gate\n');
  fs.writeFileSync(path.join(outDir, '03-phases/phase-flow.md'), fs.readFileSync(path.join(root, mapperOs, 'templates/executable-packet/03-phases/phase-flow.md'), 'utf8'));
fs.writeFileSync(path.join(outDir, '03-phases/phase-index.yaml'), 'active_phase: 03-phases/01-ingestion-ontology.md\nphases:\n  - phase_id: 01-ingestion-ontology\n    file: 03-phases/01-ingestion-ontology.md\n    status: ready\n    depends_on: []\n    proof_gate: proof-01-ingestion-ontology\n');
  fs.writeFileSync(path.join(outDir, '03-phases/01-ingestion-ontology.md'), '# Phase 01: Ingestion Ontology\n\n## How to implement this phase\n\nBefore writing code, read:\n\n1. `03-phases/phase-flow.md`\n2. `.buildprint/next-agent.md`\n3. current project `AGENTS.md`\n\nExecute this phase through phase-flow required artifacts before appending evidence.\n\nrequires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary, test-and-verification]\n\n## Product outcome\nImplement source-independent ontology ingestion.\n\n## Source evidence\nMiroFish routes /ontology/generate and provider boundaries.\n\n## Implementation scope\n\n## Interfaces touched\n/ontology/generate, /build, /task/, /data/, /delete/, /simulation, /report\n\n## State/runtime touched\nfile-backed storage and task lifecycle.\n\n## UX/UI requirements\nempty/loading/error/blocked/success states inline.\n\n## Safety/security constraints\n\n## Quality gates\n\n## Proof gate\nRequired runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl`; phase_id: 01-ingestion-ontology.\n\n## Repair routing\nReturn here on proof failure.\n');
  fs.writeFileSync(path.join(outDir, '04-evaluation.md'), '# Evaluation\n\nprovider_live durable_persistence security_boundary no_fake\n');
  fs.writeFileSync(path.join(outDir, '05-evidence/evidence-ledger.schema.json'), '{"type":"object","properties":{"phase_id":{},"proof_type":{},"provider_mode":{},"upgrades_claim":{}}}\n');
  fs.writeFileSync(path.join(outDir, '05-evidence/evidence-ledger.jsonl'), '{"phase_id":"01-ingestion-ontology","proof_type":"seed","provider_mode":"none","upgrades_claim":false}\n');
  fs.writeFileSync(path.join(outDir, 'generated/agent-prompt.md'), '# Agent Prompt\n\nFollow BUILDPRINT.md read order.\n');
}

function runMapper(options) {
  if (options.useCheckedInPacket) {
    return {
      packet: checkedInPacket,
      workspace: null,
      report: { schema_version: 'mapper-os/mirofish-codex-map-report.v1', mode: 'checked-in-packet', pass: true, packet: checkedInPacket },
    };
  }

  const mapWorkspace = fs.mkdtempSync(path.join(os.tmpdir(), 'mapper-os-map-'));
  const outDir = path.join(mapWorkspace, 'selected-buildprint');
  const prompt = makeMapperPrompt(mapWorkspace, outDir);
  let result;
  if (options.dryRun) {
    dryRunPacket(outDir);
    result = { status: 0, signal: null, stdout: `Dry-run mapper wrote ${outDir}`, stderr: '', error: null };
  } else {
    fs.mkdirSync(mapWorkspace, { recursive: true });
    result = codexExec(prompt, { cwd: mapWorkspace, timeoutMs: options.timeoutMs });
  }
  const files = listFiles(outDir);
  const required = ['BUILDPRINT.md', 'blueprint.yaml', '01-questions.md', '02-project-setup.md', '03-phases/phase-index.yaml', '03-phases/phase-flow.md', '04-evaluation.md', '05-evidence/evidence-ledger.jsonl', '05-evidence/evidence-ledger.schema.json', 'generated/agent-prompt.md'];
  const missing = required.filter((file) => !files.includes(file));
  const report = {
    schema_version: 'mapper-os/mirofish-codex-map-report.v1',
    mode: options.dryRun ? 'dry-run' : 'codex',
    pass: result.status === 0 && fs.existsSync(outDir) && missing.length === 0,
    source,
    mapper_os: path.join(root, mapperOs),
    workspace: mapWorkspace,
    packet: outDir,
    command: options.dryRun ? null : { executable: 'codex', args: ['exec', '--full-auto', '<prompt>'], cwd: mapWorkspace, timeout_ms: options.timeoutMs },
    codex: { exit_status: result.status, signal: result.signal, error: result.error ? { code: result.error.code, message: result.error.message } : null },
    files,
    missing_required_files: missing,
  };
  fs.writeFileSync(path.join(root, 'quality/mirofish-codex-map-transcript.txt'), transcript('MiroFish Codex Mapper Transcript', result, `## Prompt\n\n${prompt}`));
  writeJson('quality/mirofish-codex-map-report.json', report);
  return { packet: outDir, workspace: mapWorkspace, report };
}


function isReferenceRoleLabeled(line) {
  return /\b(?:packet file|packet authority|source path|source anchor|source evidence|source repo|source repository|source file|runtime artifact|runtime output|product artifact|generated artifact|generated output|implementation artifact|implementation output|storage artifact|report output|downstream implementation|implementation project|root\/local)\b/i.test(line);
}

function isIgnoredReference(ref) {
  return ref.startsWith('/')
    || ref.startsWith('http')
    || ref.includes('*')
    || ref.startsWith('.buildprint/')
    || ref.includes('<')
    || ref.includes('>');
}

function deterministicMapChecks(packetPath) {
  const packetRoot = path.isAbsolute(packetPath) ? packetPath : path.join(root, packetPath);
  const files = new Set(listFiles(packetRoot));
  const checks = [];
  const add = (id, ok, evidence, details = null) => checks.push({ id, ok, evidence, ...(details ? { details } : {}) });

  const yamlCheck = run('python3', ['-c', `import pathlib, yaml; yaml.safe_load(pathlib.Path(${JSON.stringify(path.join(packetRoot, 'blueprint.yaml'))}).read_text()); print('ok')`]);
  add('blueprint_yaml_parses', yamlCheck.status === 0, yamlCheck.status === 0 ? 'blueprint.yaml parsed with PyYAML.' : (yamlCheck.stderr || yamlCheck.stdout).trim());

  const phaseIndex = safeReadText(path.join(packetRoot, '03-phases/phase-index.yaml'));
  const phaseCount = (phaseIndex.match(/\n\s*-\s+phase_id:/g) || []).length;
  const emptyDeps = (phaseIndex.match(/depends_on:\s*\[\]/g) || []).length;
  add('phase_dependencies_model_workflow', !(phaseCount > 1 && emptyDeps === phaseCount), `${emptyDeps}/${phaseCount} phases declare depends_on: []. Sequential/stateful products should model dependencies or justify parallelism.`);

  const missingRefs = [];
  const unclassifiedRefs = [];
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.yaml') && !file.endsWith('.json') && !file.endsWith('.jsonl')) continue;
    const text = fs.readFileSync(path.join(packetRoot, file), 'utf8');
    const lines = text.split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      for (const match of line.matchAll(/`([^`]+\.(?:md|yaml|json|jsonl))`/g)) {
        const ref = match[1];
        if (isIgnoredReference(ref)) continue;
        if (ref === 'AGENTS.md') continue;
        if (files.has(ref)) continue;
        if (isReferenceRoleLabeled(line)) continue;
        unclassifiedRefs.push({ file, line: index + 1, ref });
        missingRefs.push({ file, ref, reason: 'unclassified file reference' });
      }
    }
  }
  add('referenced_packet_files_exist', missingRefs.length === 0, missingRefs.length ? 'Some backticked file references are neither existing packet files nor role-labeled source/runtime/implementation references.' : 'All backticked file references are existing packet files or role-labeled non-packet references.', { missingRefs: missingRefs.slice(0, 50), unclassifiedRefs: unclassifiedRefs.slice(0, 50), total: missingRefs.length });

  const setup = safeReadText(path.join(packetRoot, '02-project-setup.md'));
  const concreteTerms = ['Flask', 'Vue', 'Vite', 'Zep', 'OASIS', 'OpenAI', 'Docker', 'file-backed', 'storage', 'env'];
  const presentTerms = concreteTerms.filter((term) => new RegExp(term, 'i').test(setup));
  add('setup_gate_contains_source_specific_architecture', presentTerms.length >= 5, `Found source-specific setup terms: ${presentTerms.join(', ') || 'none'}.`, { expectedTerms: concreteTerms });

  const phaseText = Array.from(files).filter((file) => file.startsWith('03-phases/') && file.endsWith('.md')).map((file) => fs.readFileSync(path.join(packetRoot, file), 'utf8')).join('\n');
  const ledgerText = setup + '\n' + phaseText;
  const dispositionTerms = ['preserve', 'replace', 'merge', 'defer', 'drop'].filter((term) => new RegExp(`\\b${term}\\b`, 'i').test(ledgerText));
  const hasLedger = /Source capability\/surface ledger/i.test(setup);
  const hasEquivalence = /equivalent target behavior|target contract|compatibility impact/i.test(ledgerText);
  const hasNoParity = /not route\/function parity|Do not require route\/function parity|not mandatory clone targets/i.test(ledgerText);
  add('source_surface_ledger_has_dispositions', hasLedger && dispositionTerms.length >= 2 && hasEquivalence && hasNoParity, `Ledger=${hasLedger}; dispositions=${dispositionTerms.join(', ') || 'none'}; equivalence=${hasEquivalence}; noParity=${hasNoParity}.`, { expected: ['Source capability/surface ledger', 'preserve|replace|merge|defer|drop', 'target/equivalent contract', 'compatibility impact or no route/function parity'] });

  return { schema_version: 'mapper-os/mirofish-deterministic-map-checks.v1', pass: checks.every((check) => check.ok), packet: packetPath, checks };
}

function codexJudge(kind, prompt, outFile, options) {
  const transcriptFile = outFile.replace(/\.json$/, '-transcript.txt');
  const dryRunReport = {
    schema_version: `mapper-os/${kind}-judge.v1`,
    pass: true,
    score: 1,
    rating: 'dry-run',
    recommendation: 'dry-run',
    strengths: ['Harness dry-run only.'],
    risks: [],
    missing_or_weak: [],
    evidence: [],
  };
  const result = options.dryRun
    ? { status: 0, signal: null, stdout: JSON.stringify(dryRunReport), stderr: '', error: null }
    : codexExec(prompt, { cwd: root, timeoutMs: options.timeoutMs });
  fs.writeFileSync(path.join(root, transcriptFile), transcript(`${kind} Codex Judge Transcript`, result, `## Prompt\n\n${prompt}`));
  let parsed = null;
  let parseError = null;
  try { parsed = extractJson(result.stdout || `${result.stdout}\n${result.stderr}`); }
  catch (error) { parseError = error.message; }
  const report = parsed || {
    schema_version: `mapper-os/${kind}-judge.v1`,
    pass: false,
    score: 0,
    parse_error: parseError,
    raw_excerpt: `${result.stdout}\n${result.stderr}`.slice(0, 12000),
  };
  writeJson(outFile, report);
  return { result, report, transcriptFile };
}

const options = parseArgs(process.argv.slice(2));
if (!fs.existsSync(source)) throw new Error(`missing source ${source}`);
if (!fs.existsSync(path.join(root, mapperOs))) throw new Error(`missing Mapper OS ${mapperOs}`);
if (options.useCheckedInPacket && !fs.existsSync(path.join(root, checkedInPacket))) throw new Error(`missing packet ${checkedInPacket}`);

let packetPath = null;
let mappingWorkspace = null;
const stages = {};

function writeFlowSummary() {
  const summary = {
    schema_version: 'mapper-os/mirofish-flow-eval.v2',
    pass: stages.codex_mapping?.pass === true
      && stages.packet_check?.status === 0
      && stages.deterministic_map_checks?.pass === true
      && stages.map_judge?.pass === true
      && stages.codex_replay?.status === 0
      && stages.codex_replay?.pass === true
      && stages.outcome_judge?.pass === true,
    status: stages.outcome_judge ? 'complete' : 'partial',
    source,
    checked_in_packet: checkedInPacket,
    generated_packet: packetPath,
    mapper_os: mapperOs,
    stages,
  };
  writeJson('quality/mirofish-flow-report.json', summary);
  return summary;
}

if (options.resumeOutcome) {
  const prior = safeJsonFile('quality/mirofish-flow-report.json');
  if (!prior?.generated_packet) throw new Error('--resume-outcome requires quality/mirofish-flow-report.json with generated_packet');
  packetPath = prior.generated_packet;
  Object.assign(stages, prior.stages || {});
  const replayReport = 'quality/mirofish-codex-replay-report.json';
  const replayTranscript = 'quality/mirofish-codex-replay-transcript.txt';
  const replayJson = safeJsonFile(replayReport);
  if (replayJson) {
    stages.codex_replay = {
      status: replayJson.codex?.exit_status ?? (replayJson.pass ? 0 : 1),
      artifact: replayReport,
      transcript: replayTranscript,
      pass: replayJson.pass,
      workspace: replayJson.workspace,
      active_phase: replayJson.packet?.active_phase,
    };
  }
  const outcomeJudgePrompt = `You are the outcome-judge-codex role in a Mapper OS handover eval.

The source repo is ${source}, but use it only to understand whether the runner preserved scope. The runner was not allowed to use it as implementation input.
The mapped packet is ${packetPath}.
The runner Codex replay report is ${path.join(root, replayReport)}.
The runner Codex replay transcript/session log is ${path.join(root, replayTranscript)}.
The runner implementation workspace is ${replayJson?.workspace || 'UNKNOWN'}.

Critically judge the result using packet rubrics and the runner session log. Do not reward mere file creation.

Specifically check:
- Did the runner follow the intended read order: BUILDPRINT.md -> 01-questions.md -> 02-project-setup.md -> blueprint.yaml -> 03-phases/phase-index.yaml -> 03-phases/phase-flow.md -> active phase -> 04-evaluation.md/evidence schema?
- Did the runner respect setup/question gates and AI-best-judgment defaults?
- Did it avoid using ${source} or root mapper internals as implementation input?
- Did it implement meaningful first-phase behavior rather than fake placeholders?
- Did it record honest runtime evidence/blockers in .buildprint/evidence/evidence-ledger.jsonl?
- Did verification output support any claim upgrade?

Return ONLY valid JSON with this schema:
{
  "schema_version":"mapper-os/mirofish-outcome-judge.v1",
  "pass":boolean,
  "score":number,
  "rating":"poor|weak|adequate|good|excellent",
  "implemented_phase":string,
  "read_order_followed":boolean,
  "read_order_evidence":[string],
  "source_repo_leakage":"none|possible|confirmed",
  "verification_quality":"none|synthetic|minimal|meaningful|strong",
  "evidence_quality":"none|weak|honest-blocker|minimal-proof|strong-proof",
  "fake_completeness_risk":"low|medium|high",
  "strengths":[string],
  "risks":[string],
  "missing_or_weak":[string],
  "evidence":[{"claim":string,"files":[string]}],
  "recommendation":"ship|ship-with-notes|needs-fix"
}`;
  const outcomeJudge = replayJson?.workspace ? codexJudge('mirofish-outcome', outcomeJudgePrompt, 'quality/mirofish-outcome-judge.json', options) : null;
  stages.outcome_judge = outcomeJudge ? { status: outcomeJudge.result.status, pass: outcomeJudge.report.pass, artifact: 'quality/mirofish-outcome-judge.json', transcript: outcomeJudge.transcriptFile, score: outcomeJudge.report.score, recommendation: outcomeJudge.report.recommendation } : { status: 'skipped', pass: false };
  const summary = writeFlowSummary();
  if (!summary.pass) {
    console.error(`MiroFish flow eval failed or needs review. Report: quality/mirofish-flow-report.json`);
    process.exitCode = 1;
  } else {
    console.log(`MiroFish flow eval passed. Report: quality/mirofish-flow-report.json`);
  }
  process.exit();
}

writeFlowSummary();
const mapping = runMapper(options);
packetPath = mapping.packet;
mappingWorkspace = mapping.workspace;
stages.codex_mapping = { pass: mapping.report.pass, artifact: 'quality/mirofish-codex-map-report.json', transcript: 'quality/mirofish-codex-map-transcript.txt', workspace: mappingWorkspace, packet: packetPath };
writeFlowSummary();
const packetCheck = run(process.execPath, ['./bin/agb.js', 'packet', 'check', packetPath]);
fs.writeFileSync(path.join(root, 'quality/mirofish-packet-check.txt'), `${packetCheck.stdout}\n${packetCheck.stderr}`);
stages.packet_check = { status: packetCheck.status, artifact: 'quality/mirofish-packet-check.txt' };
writeFlowSummary();
const deterministicChecks = deterministicMapChecks(packetPath);
writeJson('quality/mirofish-map-deterministic-checks.json', deterministicChecks);
stages.deterministic_map_checks = { pass: deterministicChecks.pass, artifact: 'quality/mirofish-map-deterministic-checks.json', failed: deterministicChecks.checks.filter((check) => !check.ok).map((check) => check.id) };
writeFlowSummary();

const mapJudgePrompt = `You are the map-judge-codex role in a Mapper OS eval.\n\nEvaluate the freshly mapped executable packet at ${packetPath} against the source repo at ${source}.\n\nUse these rubrics/checklists as authority when relevant:\n- ${path.join(root, mapperOs, 'checks/acceptance.md')}\n- ${path.join(root, mapperOs, 'prompts/extract-selected.md')}\n- Packet check output: ${path.join(root, 'quality/mirofish-packet-check.txt')}\n- Deterministic checks: ${path.join(root, 'quality/mirofish-map-deterministic-checks.json')}\n- Mapper transcript/report: ${path.join(root, 'quality/mirofish-codex-map-transcript.txt')} and ${path.join(root, 'quality/mirofish-codex-map-report.json')}\n\nJudge only the map/Buildprint packet quality, not a downstream implementation.\n\nGrade both:\nA. Completeness: required files, read order, setup gate, phase index, dependencies, proof gates, evidence schema/seed, no obsolete packet layout.\nB. Content quality: source fidelity to MiroFish behavior, APIs/routes/jobs, state/artifacts, provider boundaries, UI states, no-fake safeguards, handoff usefulness, source independence.\n\nReturn ONLY valid JSON with this schema:\n{\n  "schema_version":"mapper-os/mirofish-map-judge.v1",\n  "pass":boolean,\n  "score":number,\n  "rating":"poor|weak|adequate|good|excellent",\n  "completeness_score":number,\n  "content_score":number,\n  "required_elements_missing":[string],\n  "source_fidelity_gaps":[string],\n  "strengths":[string],\n  "risks":[string],\n  "missing_or_weak":[string],\n  "evidence":[{"claim":string,"files":[string]}],\n  "recommendation":"ship|ship-with-notes|needs-fix"\n}`;
const mapJudge = codexJudge('mirofish-map', mapJudgePrompt, 'quality/mirofish-map-judge.json', options);
stages.map_judge = { status: mapJudge.result.status, pass: mapJudge.report.pass, artifact: 'quality/mirofish-map-judge.json', transcript: mapJudge.transcriptFile, score: mapJudge.report.score, recommendation: mapJudge.report.recommendation };
writeFlowSummary();

const replayReport = 'quality/mirofish-codex-replay-report.json';
const replayTranscript = 'quality/mirofish-codex-replay-transcript.txt';
const replayArgs = [
  'scripts/eval-mapper-replay.mjs',
  '--packet', packetPath,
  '--report', replayReport,
  '--transcript', replayTranscript,
  '--timeout-ms', String(options.timeoutMs),
  '--keep-workspace',
];
if (options.dryRun) replayArgs.push('--dry-run');
const replay = run(process.execPath, replayArgs, { timeout: options.timeoutMs + 60 * 1000 });
const replayJson = safeJsonFile(replayReport);
stages.codex_replay = { status: replay.status, artifact: replayReport, transcript: replayTranscript, pass: replayJson?.pass, workspace: replayJson?.workspace, active_phase: replayJson?.packet?.active_phase };
writeFlowSummary();

const outcomeJudgePrompt = `You are the outcome-judge-codex role in a Mapper OS handover eval.\n\nThe source repo is ${source}, but use it only to understand whether the runner preserved scope. The runner was not allowed to use it as implementation input.\nThe mapped packet is ${packetPath}.\nThe runner Codex replay report is ${path.join(root, replayReport)}.\nThe runner Codex replay transcript/session log is ${path.join(root, replayTranscript)}.\nThe runner implementation workspace is ${replayJson?.workspace || 'UNKNOWN'}.\n\nCritically judge the result using packet rubrics and the runner session log. Do not reward mere file creation.\n\nSpecifically check:\n- Did the runner follow the intended read order: BUILDPRINT.md -> 01-questions.md -> 02-project-setup.md -> blueprint.yaml -> 03-phases/phase-index.yaml -> 03-phases/phase-flow.md -> active phase -> 04-evaluation.md/evidence schema?\n- Did the runner respect setup/question gates and AI-best-judgment defaults?\n- Did it avoid using ${source} or root mapper internals as implementation input?\n- Did it implement meaningful first-phase behavior rather than fake placeholders?\n- Did it record honest runtime evidence/blockers in .buildprint/evidence/evidence-ledger.jsonl?\n- Did verification output support any claim upgrade?\n\nReturn ONLY valid JSON with this schema:\n{\n  "schema_version":"mapper-os/mirofish-outcome-judge.v1",\n  "pass":boolean,\n  "score":number,\n  "rating":"poor|weak|adequate|good|excellent",\n  "implemented_phase":string,\n  "read_order_followed":boolean,\n  "read_order_evidence":[string],\n  "source_repo_leakage":"none|possible|confirmed",\n  "verification_quality":"none|synthetic|minimal|meaningful|strong",\n  "evidence_quality":"none|weak|honest-blocker|minimal-proof|strong-proof",\n  "fake_completeness_risk":"low|medium|high",\n  "strengths":[string],\n  "risks":[string],\n  "missing_or_weak":[string],\n  "evidence":[{"claim":string,"files":[string]}],\n  "recommendation":"ship|ship-with-notes|needs-fix"\n}`;
const outcomeJudge = replayJson?.workspace ? codexJudge('mirofish-outcome', outcomeJudgePrompt, 'quality/mirofish-outcome-judge.json', options) : null;
stages.outcome_judge = outcomeJudge ? { status: outcomeJudge.result.status, pass: outcomeJudge.report.pass, artifact: 'quality/mirofish-outcome-judge.json', transcript: outcomeJudge.transcriptFile, score: outcomeJudge.report.score, recommendation: outcomeJudge.report.recommendation } : { status: 'skipped', pass: false };
const summary = writeFlowSummary();

if (!summary.pass) {
  console.error(`MiroFish flow eval failed or needs review. Report: quality/mirofish-flow-report.json`);
  process.exitCode = 1;
} else {
  console.log(`MiroFish flow eval passed. Report: quality/mirofish-flow-report.json`);
}
