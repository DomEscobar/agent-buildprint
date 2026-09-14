// Pack and exercise the shipped CLI. Synthetic skill files below prove only
// routing readiness; they are deliberately not game, visual, or skill-reading evidence.
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
let outputDir = null
for (let index = 0; index < args.length; index++) {
  if (args[index] !== '--output-dir') throw new Error(`unknown argument: ${args[index]}`)
  assert(outputDir === null && args[index + 1], '--output-dir requires one path')
  outputDir = path.resolve(args[++index])
}
function run(command, commandArgs, options = {}) {
  const npmCli = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js')
  const executable = process.platform === 'win32' && command === 'npm' ? process.execPath : command
  const executableArgs = process.platform === 'win32' && command === 'npm' ? [npmCli, ...commandArgs] : commandArgs
  if (process.platform === 'win32' && command === 'npm') expectation(fs.existsSync(npmCli), `Node installation does not expose npm-cli.js: ${npmCli}`)
  const result = spawnSync(executable, executableArgs, { cwd: options.cwd || sourceRoot, encoding: 'utf8', stdio: 'pipe', timeout: options.timeout ?? 60_000, killSignal: 'SIGTERM', env: { ...process.env, ...options.env } })
  if (result.status !== 0 || result.error) {
    const message = [result.error?.message, result.stdout, result.stderr].filter(Boolean).join('\n').trim()
    throw new Error(`${command} ${commandArgs.join(' ')} failed${message ? `:\n${message}` : ''}`)
  }
  return result.stdout
}
function write(file, value) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, value) }
function json(file, value) { write(file, `${JSON.stringify(value, null, 2)}\n`) }
function readJsonOutput(command, commandArgs, options) { return JSON.parse(run(command, commandArgs, options)) }
function revision(project, cli, cwd) { return readJsonOutput(process.execPath, [cli, 'state', 'status', project], { cwd }).revision }
function expectation(ok, message) { assert.ok(ok, message) }

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-packed-cli-'))
const packDir = outputDir || path.join(temp, 'pack')
const npmOptions = { env: { npm_config_cache: path.join(temp, 'npm-cache'), npm_config_update_notifier: 'false' } }
try {
  fs.mkdirSync(packDir, { recursive: true })
  const packageMeta = JSON.parse(fs.readFileSync(path.join(sourceRoot, 'package.json'), 'utf8'))
  const packed = JSON.parse(run('npm', ['pack', sourceRoot, '--ignore-scripts', '--json', '--pack-destination', packDir], npmOptions))
  expectation(Array.isArray(packed) && packed.length === 1 && typeof packed[0].filename === 'string', 'npm pack did not return exactly one tarball')
  const tarball = path.join(packDir, packed[0].filename)
  expectation(fs.existsSync(tarball) && fs.statSync(tarball).isFile(), 'npm pack did not create the reported tarball')
  const packedFiles = new Set(packed[0].files?.map(item => item.path) || [])
  for (const file of ['bin/agb.js', 'src/runtime/cli.js', 'src/runtime/state.js', 'src/runtime/skills.js', 'buildprints/standalone-isometric-game/package.json', 'buildprints/standalone-isometric-game/runtime.json', 'buildprints/standalone-isometric-game/loops/01-world-plan.md']) expectation(packedFiles.has(file), `packed tarball omitted required release file: ${file}`)
  console.log(`PACKED CLI: ${path.resolve(tarball)} (${packed[0].size} bytes); runtime, skill resolver, and standalone packet files present.`)

  const host = path.join(temp, 'host')
  fs.mkdirSync(host)
  json(path.join(host, 'package.json'), { private: true, name: 'agb-packed-smoke-host', version: '0.0.0' })
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false', tarball], { cwd: host, ...npmOptions })
  const installedRoot = path.join(host, 'node_modules', packageMeta.name)
  const cli = path.join(installedRoot, 'bin', 'agb.js')
  expectation(fs.existsSync(cli), 'packed install omitted executable CLI')
  const npmBin = path.join(host, 'node_modules', '.bin', process.platform === 'win32' ? 'agb.cmd' : 'agb')
  expectation(fs.existsSync(npmBin), `npm did not register the packed agb bin: ${npmBin}`)
  if (process.platform === 'win32') expectation(/agb\.js/i.test(fs.readFileSync(npmBin, 'utf8')), 'npm registered agb.cmd shim does not target bin/agb.js')
  else {
    expectation(fs.realpathSync(npmBin) === fs.realpathSync(cli), 'npm registered agb symlink does not target bin/agb.js')
    expectation(run(npmBin, ['--help'], { cwd: host }).includes('Versioned local runtime'), 'npm registered agb bin did not execute its shebang')
  }
  expectation(run(process.execPath, [cli, '--help'], { cwd: host }).includes('Versioned local runtime'), 'installed CLI help omitted runtime commands')
  const project = path.join(temp, 'standalone-project')
  const manifest = path.join(installedRoot, 'buildprints', 'standalone-isometric-game', 'package.json')
  run(process.execPath, [cli, 'start', manifest, project], { cwd: host })
  write(path.join(project, 'PROJECT_CONTRACT.md'), '# Synthetic packed-package contract\n')
  const initial = readJsonOutput(process.execPath, [cli, 'state', 'status', project], { cwd: host })
  expectation(initial.definition.skillRoot === 'node_modules/isometric-framework/skills', 'packed standalone runtime did not retain project-local skillRoot')
  expectation(initial.skillReadiness['01-world-plan'].ready === false, 'missing installed framework skills unexpectedly reported ready')
  const nextBefore = run(process.execPath, [cli, 'loop', 'next', project], { cwd: host })
  expectation(nextBefore.includes('Skill setup blockers'), 'loop next did not report missing required skill setup')
  expectation(revision(project, cli, host) === initial.revision, 'read-only status/next changed the initial revision')
  for (const id of initial.definition.approvals) {
    const current = readJsonOutput(process.execPath, [cli, 'state', 'status', project], { cwd: host })
    const approval = path.join(temp, `${id}-approval.json`)
    json(approval, { schema: 'agb/receipt/v2', id, decision: 'approved', actor: 'synthetic packed smoke operator', basis: 'Synthetic release smoke routing only; no game authorization.', contractSha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(project, 'PROJECT_CONTRACT.md'))).digest('hex') })
    run(process.execPath, [cli, 'state', 'approve', project, '--revision', String(current.revision), '--receipt', approval], { cwd: host })
  }
  const approved = readJsonOutput(process.execPath, [cli, 'state', 'status', project], { cwd: host })
  const beginReceipt = path.join(temp, 'begin.json')
  json(beginReceipt, { schema: 'agb/receipt/v2', loop: '01-world-plan' })
  const blocked = spawnSync(process.execPath, [cli, 'loop', 'begin', project, '--revision', String(approved.revision), '--receipt', beginReceipt], { cwd: host, encoding: 'utf8', stdio: 'pipe', timeout: 60_000, killSignal: 'SIGTERM' })
  expectation(blocked.status !== 0 && /skill setup blocked/.test(blocked.stderr), 'missing required packed skill did not block begin')
  expectation(revision(project, cli, host) === approved.revision, 'blocked begin changed revision')
  expectation(Object.values(readJsonOutput(process.execPath, [cli, 'state', 'status', project], { cwd: host }).approvals).every(item => item.decision === 'approved'), 'blocked begin changed recorded approvals')
  const skills = path.join(project, 'node_modules', 'isometric-framework', 'skills')
  write(path.join(skills, 'README.md'), '# Synthetic release-smoke skill catalog\n')
  write(path.join(skills, 'isometric-visual-loop', 'SKILL.md'), '# Synthetic release-smoke required skill\n')
  const ready = readJsonOutput(process.execPath, [cli, 'state', 'status', project], { cwd: host })
  expectation(ready.skillReadiness['01-world-plan'].ready === true, 'synthetic controlled installed skill did not restore required readiness')
  expectation(ready.revision === approved.revision, 'synthetic skill readiness read changed revision or approvals')
  run(process.execPath, [cli, 'loop', 'begin', project, '--revision', String(ready.revision), '--receipt', beginReceipt], { cwd: host })
  console.log('PACKED CLI: installed help, standalone start/status/next, missing-required-skill block, and synthetic controlled readiness passed. Synthetic files are routing fixtures only, never game or skill-reading proof.')
} finally {
  fs.rmSync(temp, { recursive: true, force: true })
}
