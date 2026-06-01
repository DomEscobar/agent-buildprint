#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import crypto from 'node:crypto'

const repoRoot = path.resolve(import.meta.dirname, '..')

function usage(code = 0) {
  console.log(`Buildprint Structure Product-Slice Eval

Usage:
  node scripts/eval-buildprint-structure-slices.mjs init <eval-dir>
  node scripts/eval-buildprint-structure-slices.mjs prepare --config <config.json> [--out <run-dir>] [--seed <seed>]
  node scripts/eval-buildprint-structure-slices.mjs run --config <config.json> --out <run-dir> [--variant <blind-or-id>]
  node scripts/eval-buildprint-structure-slices.mjs summarize --out <run-dir>

Purpose:
  Test Buildprint structures by downstream product quality on the same product slice.
  Example: Goal-Kernel vs Simulation-First vs Architecture-Garden on the Microfish intake slice.
`)
  process.exit(code)
}

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name)
  return i >= 0 ? process.argv[i + 1] : fallback
}
function hasFlag(name) { return process.argv.includes(name) }
function mkdirp(dir) { fs.mkdirSync(dir, { recursive: true }) }
function write(file, text) { mkdirp(path.dirname(file)); fs.writeFileSync(file, text) }
function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')) }
function resolveMaybe(p, base = repoRoot) { return path.isAbsolute(p) ? p : path.resolve(base, p) }
function exists(p) { return fs.existsSync(p) }

function runId() {
  return `run-${new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, 'Z')}`
}

function shuffle(items, seed) {
  const out = [...items]
  let state = crypto.createHash('sha256').update(seed).digest().readUInt32BE(0)
  const rand = () => { state = (1664525 * state + 1013904223) >>> 0; return state / 0x100000000 }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function copyDir(src, dst) {
  mkdirp(dst)
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dst, entry.name)
    if (entry.isDirectory()) copyDir(s, d)
    else if (entry.isSymbolicLink()) fs.symlinkSync(fs.readlinkSync(s), d)
    else fs.copyFileSync(s, d)
  }
}

function fileHashOrStatus(file) {
  if (!exists(file)) return null
  const bytes = fs.readFileSync(file)
  return crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 16)
}

function renderPrompt(config, manifestRow) {
  const slice = config.productSlice || {}
  const constraints = (slice.constraints || []).map((x) => `- ${x}`).join('\n')
  const outcomes = (slice.requiredOutcomes || []).map((x) => `- ${x}`).join('\n')
  const anti = (slice.forbiddenShortcuts || []).map((x) => `- ${x}`).join('\n')
  return `You are in a controlled Buildprint-structure evaluation.

Anonymous variant: ${manifestRow.blind}
Do not mention or infer the real variant/structure name in the product UI or handover.

The object under test is NOT your prose and NOT the Buildprint packet elegance.
The object under test is the product you build from this Buildprint.

Product slice under test: ${slice.name || config.name}

Slice brief:
${slice.brief || ''}

Required product outcomes:
${outcomes || '- See Buildprint.'}

Constraints and boundaries:
${constraints || '- Local-only unless explicitly authorized.'}

Forbidden shortcuts:
${anti || '- Do not fake provider/live/runtime success.'}

Buildprint packet to follow:
${manifestRow.packetDir}

Required start:
1. Read ${manifestRow.packetDir}/BUILDPRINT.md first.
2. Then follow that Buildprint's read order and execution rules.
3. Build in this output directory only: ${manifestRow.outputDir}

Equal-run controls:
- Same product slice for every variant.
- Same coding agent and budget for every variant.
- Same local-only/no-credential/no-destructive policy for every variant.
- Do not ask for coaching unless the blocker is credentialed, external, destructive, irreversible, or impossible in the environment.
- Optimize for first-user product outcome, not process artifacts.

Before stopping, produce:
1. runnable local product;
2. exact start command;
3. tests/checks run with pass/fail;
4. manual user-smoke path performed;
5. honest known defects/blockers;
6. concise HANDOVER.md in output root.
`
}

function scorecard(config, manifest, reveal = false) {
  const dims = config.review?.dimensions || defaultDimensions()
  const critical = config.review?.criticalRegressions || defaultCritical()
  const scale = config.review?.scale || defaultScale()
  const mapping = reveal
    ? manifest.map((m) => `- ${m.blind}: ${m.variantId} — ${m.label}`).join('\n')
    : 'Keep hidden until product scoring is complete. Use `manifest.private.json` only after scoring.'
  return `# Product-Slice Buildprint Structure Scorecard

This scores **final product outputs**, not Buildprint prose, packet completeness, or agent self-reports.

## Product slice

${config.productSlice?.name || config.name}

${config.productSlice?.brief || ''}

## Blind mapping

${mapping}

## Score scale

${scale.map((s) => `- ${s}`).join('\n')}

## Critical regressions

${critical.map((x) => `- [ ] ${x}`).join('\n')}

## Product-first review protocol

1. Start/use each product before reading HANDOVER.md, logs, or proof docs.
2. Complete the same user-smoke path for each product.
3. Score observable behavior first.
4. Then read handover/logs only to adjust run/gate/honesty dimensions.
5. Reveal mapping only after the score table is filled.

## Per-output review

${manifest.map((m) => `### ${m.blind}

Path: \`${m.outputDir}\`
Packet: \`${m.packetDir}\`

| Dimension | Score 0-5 | Evidence / defects |
|---|---:|---|
${dims.map((d) => `| ${d} |  |  |`).join('\n')}

Notes:

- Start command:
- Browser/user path tested:
- Screenshots/artifacts:
- Gates run:
- Critical regressions:
- Verdict:
`).join('\n')}

## Scoreboard

Fill after scoring, before reveal.

| Rank | Blind | Total /${dims.length * 5} | Avg /5 | Critical regressions | Verdict |
|---:|---|---:|---:|---|---|
|  |  |  |  |  |  |

## Decision

Winner:

Why this Buildprint structure produced the better product:

Failure pattern of weaker structures:

Reusable methodology lesson:
`
}

function leaderboardTemplate(config, manifest) {
  const dims = config.review?.dimensions || defaultDimensions()
  return `# Product-Slice Eval Leaderboard

Run: fill after scoring.

Product slice: ${config.productSlice?.name || config.name}

## Rubric dimensions

${dims.map((d, i) => `${i + 1}. ${d}`).join('\n')}

## Scoreboard

| Rank | Blind | Variant after reveal | Total /${dims.length * 5} | Avg /5 | Clean run? | Verdict |
|---:|---|---|---:|---:|---|---|
${manifest.map((m) => `|  | ${m.blind} | hidden until reveal |  |  |  |  |`).join('\n')}

## Dimension scores

| Dimension | ${manifest.map((m) => m.blind).join(' | ')} |
|---|${manifest.map(() => '---:').join('|')}|
${dims.map((d) => `| ${d} | ${manifest.map(() => ' ').join(' | ')} |`).join('\n')}
| **Total** | ${manifest.map(() => ' ').join(' | ')} |

## Reveal

After scoring, copy mapping from manifest.private.json here.
`
}

function defaultDimensions() {
  return [
    'runs locally',
    'first-user core loop completion',
    'product slice fidelity',
    'input-output causality',
    'state/readback/persistence honesty',
    'UX clarity and polish',
    'architecture maintainability',
    'verification depth',
    'anti-fake/provider honesty',
    'handover usefulness'
  ]
}
function defaultCritical() {
  return [
    'does not run locally',
    'core loop cannot be completed',
    'central product artifact is decorative',
    'input changes do not affect output/state',
    'fake live-provider/runtime behavior',
    'dead controls dominate the UI',
    'scope silently shrank from the product slice',
    'security/privacy boundary violated'
  ]
}
function defaultScale() {
  return ['0 = absent/broken', '1 = mostly fake or unusable', '2 = partial with serious gaps', '3 = usable but rough', '4 = strong with minor gaps', '5 = excellent for budget']
}

function runReadme(config, manifest) {
  return `# ${config.name}

This run tests **Buildprint structure -> downstream product quality**.

It is intentionally not a Mapper OS eval and not a packet-prose beauty contest.

## Product slice

${config.productSlice?.name || config.name}

${config.productSlice?.brief || ''}

## Directory layout

- \`packets/<blind>/\` — copied Buildprint variant packet.
- \`outputs/<blind>/\` — isolated product implementation output.
- \`review/scorecard.md\` — product-first rubric.
- \`review/leaderboard.md\` — scoreboard template.
- \`manifest.private.json\` — hidden blind mapping.

## Run commands

Run all variants:

\`\`\`bash
node scripts/eval-buildprint-structure-slices.mjs run --config ${config.__configPath || '<config>'} --out <this-run-dir>
\`\`\`

Run one variant:

\`\`\`bash
node scripts/eval-buildprint-structure-slices.mjs run --config ${config.__configPath || '<config>'} --out <this-run-dir> --variant ${manifest[0]?.blind || 'alpha'}
\`\`\`

Summarize execution status:

\`\`\`bash
node scripts/eval-buildprint-structure-slices.mjs summarize --out <this-run-dir>
\`\`\`

## Review rule

Start and use each product before reading handover/logs. Score product behavior first. Reveal mapping only after scoring.
`
}

function init(dir) {
  const out = resolveMaybe(dir)
  mkdirp(path.join(out, 'buildprints'))
  mkdirp(path.join(out, 'configs'))
  mkdirp(path.join(out, 'runs'))
  write(path.join(out, 'README.md'), '# Buildprint Structure Product-Slice Eval\n\nUse this folder to test Buildprint structures against the same product slice.\n')
  console.log(`Initialized ${out}`)
}

function prepare(configPath, outDir, seed) {
  if (!configPath) throw new Error('--config is required')
  const configFile = resolveMaybe(configPath)
  const config = readJson(configFile)
  config.__configPath = path.relative(repoRoot, configFile)
  const out = resolveMaybe(outDir || path.join(repoRoot, 'experiments/buildprint-structure-eval/runs', runId()))
  mkdirp(out)
  write(path.join(out, 'config.snapshot.json'), JSON.stringify(config, null, 2) + '\n')
  const labels = config.review?.blindLabels || ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta']
  if ((config.variants || []).length > labels.length) throw new Error('Not enough blind labels')
  const variants = shuffle(config.variants || [], seed || config.name || out)
  const manifest = variants.map((variant, i) => {
    const blind = labels[i]
    const packetDir = path.join(out, 'packets', blind)
    const outputDir = path.join(out, 'outputs', blind)
    const sourceDir = resolveMaybe(variant.buildprintDir)
    if (!exists(sourceDir) || !fs.statSync(sourceDir).isDirectory()) throw new Error(`variant buildprintDir missing: ${sourceDir}`)
    copyDir(sourceDir, packetDir)
    mkdirp(outputDir)
    return {
      blind,
      variantId: variant.id,
      label: variant.label || variant.id,
      buildprintDir: sourceDir,
      buildprintHash: fileHashOrStatus(path.join(sourceDir, 'BUILDPRINT.md')),
      packetDir,
      outputDir
    }
  })
  for (const row of manifest) {
    write(path.join(row.outputDir, 'EVAL_PROMPT.md'), renderPrompt(config, row))
    write(path.join(row.outputDir, 'RUN_NOTES.md'), `# Run Notes — ${row.blind}\n\n- Started:\n- Finished:\n- Fatal blockers:\n`)
  }
  write(path.join(out, 'manifest.private.json'), JSON.stringify(manifest, null, 2) + '\n')
  write(path.join(out, 'README.md'), runReadme(config, manifest))
  write(path.join(out, 'review/scorecard.md'), scorecard(config, manifest, false))
  write(path.join(out, 'review/leaderboard.md'), leaderboardTemplate(config, manifest))
  console.log(`Prepared ${manifest.length} Buildprint structures in ${out}`)
}

function runAgentCommand(agent, prompt, cwd, logFile) {
  mkdirp(path.dirname(logFile))
  const fd = fs.openSync(logFile, 'a')
  try {
    fs.writeSync(fd, `\n--- run started ${new Date().toISOString()} ---\n`)
    const result = spawnSync(agent.command || 'codex', [...(agent.args || ['exec', '--full-auto']), prompt], {
      cwd,
      stdio: ['ignore', fd, fd],
      timeout: (agent.timeoutSeconds || 7200) * 1000,
      env: { ...process.env, ...(agent.env || {}) }
    })
    return { status: result.status, signal: result.signal, ok: result.status === 0, error: result.error ? String(result.error) : null }
  } finally {
    fs.closeSync(fd)
  }
}

function runAgents(configPath, outDir, filter) {
  if (!configPath || !outDir) throw new Error('--config and --out are required')
  const config = readJson(resolveMaybe(configPath))
  const out = resolveMaybe(outDir)
  const manifest = readJson(path.join(out, 'manifest.private.json'))
  const selected = manifest.filter((m) => !filter || m.blind === filter || m.variantId === filter)
  if (!selected.length) throw new Error(`No variant matched ${filter || '(all)'}`)
  const agent = config.agent || { command: 'codex', args: ['exec', '--full-auto'], timeoutSeconds: 7200 }
  for (const row of selected) {
    console.log(`Running ${row.blind} in ${row.outputDir}`)
    const prompt = fs.readFileSync(path.join(row.outputDir, 'EVAL_PROMPT.md'), 'utf8')
    const exit = runAgentCommand(agent, prompt, row.outputDir, path.join(row.outputDir, 'agent.log'))
    write(path.join(row.outputDir, 'agent-exit.json'), JSON.stringify(exit, null, 2) + '\n')
    console.log(`${row.blind}: ${exit.ok ? 'ok' : `failed status ${exit.status || exit.signal || exit.error}`}`)
  }
}

function summarize(outDir) {
  if (!outDir) throw new Error('--out is required')
  const out = resolveMaybe(outDir)
  const manifest = readJson(path.join(out, 'manifest.private.json'))
  const rows = manifest.map((m) => {
    const exitFile = path.join(m.outputDir, 'agent-exit.json')
    const exit = exists(exitFile) ? readJson(exitFile) : null
    const files = exists(m.outputDir) ? fs.readdirSync(m.outputDir).sort() : []
    return { blind: m.blind, variantId: m.variantId, ok: exit?.ok ?? null, status: exit?.status ?? null, signal: exit?.signal ?? null, files }
  })
  write(path.join(out, 'summary.json'), JSON.stringify(rows, null, 2) + '\n')
  console.log(JSON.stringify(rows, null, 2))
}

const cmd = process.argv[2]
try {
  if (!cmd || hasFlag('--help') || hasFlag('-h')) usage(0)
  if (cmd === 'init') init(process.argv[3] || 'experiments/buildprint-structure-eval')
  else if (cmd === 'prepare') prepare(arg('--config'), arg('--out'), arg('--seed'))
  else if (cmd === 'run') runAgents(arg('--config'), arg('--out'), arg('--variant'))
  else if (cmd === 'summarize') summarize(arg('--out'))
  else usage(1)
} catch (error) {
  console.error(error.stack || error.message || String(error))
  process.exit(1)
}
