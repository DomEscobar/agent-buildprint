#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import crypto from 'node:crypto'

const root = path.resolve(import.meta.dirname, '..')

function usage(exitCode = 0) {
  console.log(`Buildprint Variant Eval Harness

Usage:
  node scripts/eval-buildprint-variants.mjs init <eval-dir>
  node scripts/eval-buildprint-variants.mjs prepare --config <config.json> [--out <run-dir>] [--seed <seed>]
  node scripts/eval-buildprint-variants.mjs run --config <config.json> --out <run-dir> [--variant <id>]
  node scripts/eval-buildprint-variants.mjs summarize --out <run-dir>

Purpose:
  Compare Buildprint variants by the product an agent builds, not by packet prose or checker success.
`)
  process.exit(exitCode)
}

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name)
  return i >= 0 ? process.argv[i + 1] : fallback
}

function hasFlag(name) {
  return process.argv.includes(name)
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function write(file, text) {
  mkdirp(path.dirname(file))
  fs.writeFileSync(file, text)
}

function resolveMaybe(p, base = root) {
  if (!p) return p
  return path.isAbsolute(p) ? p : path.resolve(base, p)
}

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, { encoding: 'utf8', stdio: options.stdio || 'pipe', cwd: options.cwd || root, timeout: options.timeout || undefined })
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    error: result.error ? String(result.error) : null
  }
}

function shuffle(items, seed) {
  const out = [...items]
  let state = crypto.createHash('sha256').update(seed).digest().readUInt32BE(0)
  const rand = () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 0x100000000
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function packageFile(buildprint) {
  const p = resolveMaybe(buildprint)
  if (!fs.existsSync(p)) throw new Error(`Buildprint path does not exist: ${p}`)
  const stat = fs.statSync(p)
  if (stat.isDirectory()) {
    for (const name of ['buildprint.json', 'package.json']) {
      const candidate = path.join(p, name)
      if (fs.existsSync(candidate)) return candidate
    }
    throw new Error(`Buildprint directory lacks buildprint.json/package.json: ${p}`)
  }
  return p
}

function runId() {
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, 'Z')
  return `run-${now}`
}

function promptFor(config, variant, packetDir) {
  return `You are participating in a controlled Buildprint variant evaluation.

Variant label: ${variant.label || variant.id}
Anonymous review label: assigned by harness, do not mention the real variant name in product UI.

Task:
${config.task?.instruction || 'Build a local product from the packet.'}

Controls:
- Use the packet in this directory as the governing source: ${packetDir}
- Same task, budget, and unblock policy apply to every variant.
- Do not ask for product coaching unless blocked by missing credentials, destructive/external actions, or impossible environment constraints.
- Optimize for a runnable, usable local product, not proof-looking process artifacts.
- Run the strongest local gates you can.
- Test like a real first-time user and record what happened.
- Write a concise HANDOVER or equivalent in the output root.

Budget:
- Wall clock: ${config.budget?.wallClockMinutes || 'unspecified'} minutes
- Max turns: ${config.budget?.maxTurns || 'unspecified'}
- Unblock policy: ${config.budget?.unblockPolicy || 'identical unblock policy for all variants'}

Completion evidence to surface for the reviewer:
1. how to start/run the product;
2. gates run and exact pass/fail;
3. manual user-smoke path performed;
4. known defects/blockers;
5. what you would improve next.
`
}

function reviewTemplate(config, assignments) {
  const dims = config.review?.dimensions || []
  const critical = config.review?.criticalRegressions || []
  return `# Product Review Worksheet

Score product outputs before reading agent self-reports/proof files.

## Anonymous mapping

Keep this section hidden from the blind reviewer until scoring is complete.

${assignments.map((a) => `- ${a.blind}: ${a.variant.id} — ${a.variant.label || ''}`).join('\n')}

## Score scale

Use 0–5 per dimension:

- 0 = absent/broken
- 1 = mostly fake or unusable
- 2 = partially usable with serious gaps
- 3 = usable but rough
- 4 = strong with minor gaps
- 5 = excellent for budget

## Critical regressions

${critical.map((x) => `- [ ] ${x}`).join('\n')}

## Per-output review

${assignments.map((a) => `### ${a.blind}

Path: \`${a.outputDir}\`

| Dimension | Score 0-5 | Evidence / defects |
|---|---:|---|
${dims.map((d) => `| ${d} |  |  |`).join('\n')}

Notes:

- Start command:
- Browser/user path tested:
- Screenshots/artifacts:
- Critical regressions:
- Verdict:
`).join('\n')}

## Decision

Winner:

Why:

Loser failure pattern:

Methodology lesson for Mapper OS:

Do not count a variant as winner because its packet/checker is prettier. Count only built product quality.
`
}

function init(evalDir) {
  mkdirp(evalDir)
  write(path.join(evalDir, 'README.md'), `# Buildprint Variant Eval Run

This folder is for one controlled product-quality evaluation of Buildprint variants.

1. Copy or edit a config JSON.
2. Run prepare from repo root:
   \`node scripts/eval-buildprint-variants.mjs prepare --config <config.json> --out <this-dir>\`
3. Run agents:
   \`node scripts/eval-buildprint-variants.mjs run --config <config.json> --out <this-dir>\`
4. Start/use each output manually and fill \`review/scorecard.md\`.
5. Reveal mapping only after product scoring.
`)
  mkdirp(path.join(evalDir, 'variants'))
  mkdirp(path.join(evalDir, 'outputs'))
  mkdirp(path.join(evalDir, 'review'))
  console.log(`Initialized ${evalDir}`)
}

function prepare(configPath, outDir, seed) {
  const config = readJson(resolveMaybe(configPath))
  const out = resolveMaybe(outDir || path.join(root, 'experiments/buildprint-variant-eval/runs', runId()))
  mkdirp(out)
  write(path.join(out, 'config.snapshot.json'), JSON.stringify(config, null, 2) + '\n')
  const labels = config.review?.blindLabels || ['alpha', 'beta', 'gamma', 'delta', 'epsilon']
  if ((config.variants || []).length > labels.length) throw new Error('Not enough blind labels for variants')
  const assignments = shuffle(config.variants, seed || config.name || out).map((variant, index) => ({ variant, blind: labels[index] }))

  const manifest = []
  for (const a of assignments) {
    const variantDir = path.join(out, 'variants', a.blind)
    const outputDir = path.join(out, 'outputs', a.blind)
    mkdirp(variantDir)
    mkdirp(outputDir)
    const pkg = packageFile(a.variant.buildprint)
    const start = run(process.execPath, [path.join(root, 'bin/agb.js'), 'start', pkg, variantDir], { cwd: root })
    write(path.join(variantDir, 'agb-start.log'), `${start.stdout}${start.stderr}`)
    if (!start.ok) throw new Error(`agb start failed for ${a.variant.id}: ${start.stdout}${start.stderr}`)
    const prompt = promptFor(config, a.variant, variantDir)
    write(path.join(outputDir, 'EVAL_PROMPT.md'), prompt)
    write(path.join(outputDir, 'RUN_NOTES.md'), `# Run Notes — ${a.blind}\n\n- Variant hidden label: ${a.blind}\n- Output dir: ${outputDir}\n- Packet dir: ${variantDir}\n- Started:\n- Finished:\n- Fatal blockers:\n`)
    manifest.push({ blind: a.blind, variantId: a.variant.id, label: a.variant.label, packetDir: variantDir, outputDir, package: pkg })
  }
  write(path.join(out, 'manifest.private.json'), JSON.stringify(manifest, null, 2) + '\n')
  write(path.join(out, 'review/scorecard.md'), reviewTemplate(config, assignments.map((a) => ({ ...a, outputDir: path.join(out, 'outputs', a.blind) }))))
  write(path.join(out, 'README.md'), runReadme(config, manifest))
  console.log(`Prepared ${manifest.length} variants in ${out}`)
  console.log(`Next: node scripts/eval-buildprint-variants.mjs run --config ${configPath} --out ${out}`)
}

function runReadme(config, manifest) {
  return `# ${config.name || 'Buildprint Variant Eval'}

This run compares Buildprint variants by **built product quality**, not structural packet validity.

## What this is

A harness-generated eval run. Each variant has:

- \`variants/<blind>/\` — bootstrapped Buildprint packet/input.
- \`outputs/<blind>/\` — isolated implementation directory and agent prompt.
- \`review/scorecard.md\` — product scoring worksheet.
- \`manifest.private.json\` — blind-label mapping. Do not show this to the reviewer before scoring.

## How to run

From repo root:

\`\`\`bash
node scripts/eval-buildprint-variants.mjs run --config <config.json> --out <this-run-dir>
\`\`\`

Or run one variant:

\`\`\`bash
node scripts/eval-buildprint-variants.mjs run --config <config.json> --out <this-run-dir> --variant ${manifest[0]?.blind || 'alpha'}
\`\`\`

## Review rule

Start and use each product before reading handover/proof/process files. Score visible product behavior first.

## Variants prepared

${manifest.map((m) => `- ${m.blind}: packet \`${m.packetDir}\`, output \`${m.outputDir}\``).join('\n')}

## Durable lesson

Structural gates answer: “is the packet well-formed?”

This harness answers: “does this Buildprint technique make agents build a better product under controlled conditions?”
`
}

function runAgents(configPath, outDir, variantFilter) {
  const config = readJson(resolveMaybe(configPath))
  const out = resolveMaybe(outDir)
  const manifest = readJson(path.join(out, 'manifest.private.json'))
  const selected = manifest.filter((m) => !variantFilter || m.blind === variantFilter || m.variantId === variantFilter)
  if (!selected.length) throw new Error(`No variants matched ${variantFilter || '(all)'}`)
  const agent = config.agent || { command: 'codex', args: ['exec', '--full-auto'] }
  for (const m of selected) {
    const prompt = fs.readFileSync(path.join(m.outputDir, 'EVAL_PROMPT.md'), 'utf8')
    const logFile = path.join(m.outputDir, 'agent.log')
    console.log(`Running ${m.blind} (${m.variantId}) in ${m.outputDir}`)
    const result = run(agent.command || 'codex', [...(agent.args || ['exec', '--full-auto']), prompt], {
      cwd: m.outputDir,
      timeout: (agent.timeoutSeconds || 7200) * 1000
    })
    write(logFile, `${result.stdout}${result.stderr}${result.error ? `\nERROR: ${result.error}\n` : ''}`)
    write(path.join(m.outputDir, 'agent-exit.json'), JSON.stringify({ status: result.status, ok: result.ok, error: result.error }, null, 2) + '\n')
    console.log(`${m.blind}: ${result.ok ? 'ok' : `failed status ${result.status}`}`)
  }
}

function summarize(outDir) {
  const out = resolveMaybe(outDir)
  const manifest = readJson(path.join(out, 'manifest.private.json'))
  const rows = []
  for (const m of manifest) {
    const exitFile = path.join(m.outputDir, 'agent-exit.json')
    const exit = fs.existsSync(exitFile) ? readJson(exitFile) : null
    const files = fs.existsSync(m.outputDir) ? fs.readdirSync(m.outputDir).sort() : []
    rows.push({ blind: m.blind, variantId: m.variantId, ok: exit?.ok ?? null, status: exit?.status ?? null, files })
  }
  write(path.join(out, 'summary.json'), JSON.stringify(rows, null, 2) + '\n')
  console.log(JSON.stringify(rows, null, 2))
}

const cmd = process.argv[2]
try {
  if (!cmd || hasFlag('--help') || hasFlag('-h')) usage(0)
  if (cmd === 'init') init(resolveMaybe(process.argv[3] || path.join(root, 'experiments/buildprint-variant-eval/runs', runId())))
  else if (cmd === 'prepare') prepare(arg('--config'), arg('--out'), arg('--seed'))
  else if (cmd === 'run') runAgents(arg('--config'), arg('--out'), arg('--variant'))
  else if (cmd === 'summarize') summarize(arg('--out'))
  else usage(1)
} catch (error) {
  console.error(error.stack || error.message || String(error))
  process.exit(1)
}
