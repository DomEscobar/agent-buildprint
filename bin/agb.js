#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'

const cwd = process.cwd()
const cliDir = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(cliDir, '..')
const args = process.argv.slice(2)

function isHelp(value) {
  return value === '--help' || value === '-h'
}

function optionValue(flag) {
  const index = args.indexOf(flag)
  if (index < 0) return null
  const value = args[index + 1]
  if (!value || value.startsWith('--')) throw new Error(`missing value for ${flag}`)
  return value
}

function usage(exitCode = 0) {
  console.log(`Agent Buildprint

Usage:
  agb check <blueprint-folder> [--code <generated-code-folder>]
  agb start <buildprint-package-json-url-or-file> [target-folder]
  agb packet check <packet-folder-or-package-json-url>
  agb packet next <packet-folder-or-build-state-folder>
  agb evidence check <evidence-ledger-jsonl>
  agb persona --slice <slice-yaml> --role build|acceptance [--packet-dir <path>]
  agb state derive [--project-dir <path>] [--packet-dir <path>]
  agb drift check [--project-dir <path>] [--packet-dir <path>]
  agb slice status [--project-dir <path>]

Examples:
  agb check ./my-buildprint
  agb check ./my-buildprint --code ./my-agent
  agb start https://agent-buildprint.com/buildprints/ai-influencer-os/package.json ./my-build
  agb packet check ./buildprints/ai-swarm-simulator
  agb packet next ./buildprints/ai-swarm-simulator
  agb evidence check .buildprint/evidence/evidence-ledger.jsonl
  agb persona --slice slices/01-onboarding/slice.yaml --role build
  agb persona --slice slices/01-onboarding/slice.yaml --role acceptance
  agb state derive
  agb drift check
  agb slice status

Mapper note:
  The old agb map CLI has been removed. To map a source project, run an agent
  session with buildprints/buildprint-mapper-os/ as the governing Buildprint.
`)
  process.exit(exitCode)
}


function readText(file) {
  return fs.readFileSync(file, 'utf8')
}

function exists(p) {
  return fs.existsSync(p)
}

function walk(dir) {
  if (!exists(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}


function parseYamlLite(text) {
  // Purposefully tiny parser for blueprint validation; supports the conventions used by this MVP.
  // It is not a general YAML parser. The blueprint stays human-readable; checks use targeted extraction.
  return text
}

function extractRelativeRefs(text) {
  const refs = new Set()
  const patterns = [
    /(?:\.\/?[\w.-]+(?:\/[\w.\-#]+)+)/g,
    /(?:\.\/[\w.\-]+\.[\w]+)/g
  ]
  for (const pattern of patterns) {
    for (const m of text.matchAll(pattern)) {
      const clean = m[0].split('#')[0]
      if (clean.startsWith('./')) refs.add(clean)
    }
  }
  return [...refs]
}

function extractForbiddenDeps(text) {
  const lines = text.split(/\r?\n/)
  const start = lines.findIndex((line) => /^\s{2}forbidden_dependencies:\s*$/.test(line) || /^forbidden_dependencies:\s*$/.test(line))
  if (start < 0) return []
  const deps = []
  const baseIndent = lines[start].match(/^\s*/)[0].length
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    const indent = line.match(/^\s*/)[0].length
    if (indent <= baseIndent && !/^\s*-/.test(line)) break
    const m = line.match(/^\s*-\s*['"]?([^'"\n]+?)['"]?\s*$/)
    if (m) deps.push(m[1].trim())
    else if (!/^\s*-/.test(line) && indent <= baseIndent + 2) break
  }
  return deps
}

function extractNodes(text) {
  const nodesBlock = text.match(/\nnodes:\n([\s\S]*?)(?:\nedges:|\ncheckpointing:|\nhuman_interrupts:|\ngeneration_tasks:|$)/)
  if (!nodesBlock) return []
  return [...nodesBlock[1].matchAll(/^\s{2}([A-Za-z_][\w-]*):\s*$/gm)].map((m) => m[1])
}

function extractEdges(text) {
  const edgesBlock = text.match(/\nedges:\n([\s\S]*?)(?:\ncheckpointing:|\nhuman_interrupts:|\ngeneration_tasks:|$)/)
  if (!edgesBlock) return []
  const froms = [...edgesBlock[1].matchAll(/^\s*-\s*from:\s*([\w-]+)/gm)].map((m) => m[1])
  const tos = [...edgesBlock[1].matchAll(/^\s*to:\s*([\w-]+)/gm)].map((m) => m[1])
  return { froms, tos }
}

function scanImports(codeDir) {
  const imports = []
  for (const file of walk(codeDir).filter((f) => /\.[cm]?[tj]sx?$/.test(f))) {
    const rel = path.relative(codeDir, file)
    const text = readText(file)
    for (const m of text.matchAll(/(?:import\s+(?:[^'";]+\s+from\s+)?|import\s*\(|require\()\s*['"]([^'"]+)['"]/g)) {
      imports.push({ file: rel, specifier: m[1] })
    }
  }
  return imports
}

function pass(msg) { return { ok: true, msg } }
function fail(msg) { return { ok: false, msg } }
function warn(msg) { return { ok: null, msg } }

function checkBlueprint(folder, options = {}) {
  const root = path.resolve(cwd, folder)
  const bp = path.join(root, 'blueprint.yaml')
  const results = []

  results.push(exists(root) ? pass(`folder exists: ${root}`) : fail(`folder missing: ${root}`))
  if (!exists(root)) return results

  results.push(exists(bp) ? pass('blueprint.yaml exists') : fail('blueprint.yaml missing'))
  if (!exists(bp)) return results

  const text = readText(bp)
  parseYamlLite(text)

  for (const required of ['purpose:', 'runtime:', 'state:', 'nodes:', 'edges:', 'acceptance_criteria:']) {
    results.push(text.includes(required) ? pass(`required section present: ${required}`) : fail(`required section missing: ${required}`))
  }

  const refs = extractRelativeRefs(text)
  for (const ref of refs) {
    const absolute = path.resolve(root, ref)
    results.push(exists(absolute) ? pass(`referenced file exists: ${ref}`) : fail(`referenced file missing: ${ref}`))
  }

  const nodes = extractNodes(text)
  results.push(nodes.length > 0 ? pass(`nodes declared: ${nodes.join(', ')}`) : fail('no nodes declared'))

  for (const node of nodes) {
    const nodeBlock = text.match(new RegExp(`\\n  ${node}:\\n([\\s\\S]*?)(?:\\n  [A-Za-z_][\\w-]*:\\n|\\nedges:|$)`))?.[1] ?? ''
    results.push(/input:\n[\s\S]*?reads:/.test(nodeBlock) ? pass(`node ${node} declares input reads`) : fail(`node ${node} missing input reads`))
    results.push(/output:\n[\s\S]*?writes:/.test(nodeBlock) ? pass(`node ${node} declares output writes`) : fail(`node ${node} missing output writes`))
    results.push(/side_effects:/.test(nodeBlock) ? pass(`node ${node} declares side effects`) : fail(`node ${node} missing side_effects`))
  }

  const edges = extractEdges(text)
  if (Array.isArray(edges)) {
    results.push(fail('edges block could not be parsed'))
  } else {
    const allowed = new Set(['start', 'end', ...nodes])
    for (const from of edges.froms) results.push(allowed.has(from) ? pass(`edge from known node: ${from}`) : fail(`edge from unknown node: ${from}`))
    for (const to of edges.tos) results.push(allowed.has(to) ? pass(`edge to known node: ${to}`) : fail(`edge to unknown node: ${to}`))
  }

  const forbidden = extractForbiddenDeps(text)
  results.push(forbidden.length ? pass(`forbidden dependencies declared: ${forbidden.join(', ')}`) : warn('no forbidden dependencies declared'))

  const codeDir = options.code ? path.resolve(cwd, options.code) : null
  if (codeDir) {
    if (!exists(codeDir)) {
      results.push(fail(`code folder missing: ${codeDir}`))
    } else {
      const imports = scanImports(codeDir)
      for (const dep of forbidden) {
        const offenders = imports.filter((i) => i.specifier === dep || i.specifier.startsWith(dep + '/'))
        results.push(offenders.length === 0
          ? pass(`no forbidden import: ${dep}`)
          : fail(`forbidden import ${dep}: ${offenders.map((o) => o.file).join(', ')}`))
      }
    }
  } else {
    results.push(warn('no --code folder provided; skipped generated-code import checks'))
  }

  return results
}

function printResults(results) {
  let failed = 0
  let warned = 0
  for (const r of results) {
    if (r.ok === true) console.log(`✓ ${r.msg}`)
    else if (r.ok === false) { console.log(`✗ ${r.msg}`); failed++ }
    else { console.log(`! ${r.msg}`); warned++ }
  }
  console.log(`\nResult: ${failed ? 'FAIL' : 'PASS'} (${failed} failed, ${warned} warnings)`)
  return failed === 0
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(s, d)
    else fs.copyFileSync(s, d)
  }
}


function isUrl(value) {
  return /^https?:\/\//.test(value)
}

function looksLikeHtml(text) {
  return /^\s*<!doctype html/i.test(text) || /^\s*<html[\s>]/i.test(text)
}

async function readJsonFromUrlOrFile(ref) {
  if (isUrl(ref)) {
    const res = await fetch(ref)
    if (!res.ok) throw new Error(`failed to fetch ${ref}: HTTP ${res.status}`)
    const text = await res.text()
    if (looksLikeHtml(text)) throw new Error(`expected JSON manifest but received HTML from ${ref}`)
    try {
      return { json: JSON.parse(text), baseUrl: ref }
    } catch (error) {
      throw new Error(`invalid JSON manifest from ${ref}: ${error.message}`)
    }
  }
  const absolute = path.resolve(cwd, ref)
  return { json: JSON.parse(readText(absolute)), baseUrl: pathToFileURL(absolute).href }
}

function resolveManifestUrl(manifestRef, maybeRelative) {
  if (!maybeRelative) return null
  if (isUrl(maybeRelative)) return maybeRelative
  if (isUrl(manifestRef)) return new URL(maybeRelative, manifestRef).href
  if (manifestRef.startsWith('file://')) {
    const manifestPath = fileURLToPath(manifestRef)
    return pathToFileURL(path.resolve(path.dirname(manifestPath), maybeRelative)).href
  }
  return maybeRelative
}

function safeManifestPath(filePath, label = 'manifest file path') {
  if (typeof filePath !== 'string' || !filePath.trim()) throw new Error(`invalid ${label}`)
  const normalizedInput = filePath.replace(/\\/g, '/')
  if (normalizedInput.includes('\0') || normalizedInput.startsWith('/') || /^[A-Za-z]:\//.test(normalizedInput)) {
    throw new Error(`unsafe ${label}: ${filePath}`)
  }
  const parts = normalizedInput.split('/')
  if (parts.some((part) => part === '..')) throw new Error(`unsafe ${label}: ${filePath}`)
  const normalized = path.posix.normalize(normalizedInput)
  if (normalized === '.' || normalized === '..' || normalized.startsWith('../')) throw new Error(`unsafe ${label}: ${filePath}`)
  return normalized
}

function safePathInside(baseDir, filePath, label = 'manifest file path') {
  const safePath = safeManifestPath(filePath, label)
  const resolvedBase = path.resolve(baseDir)
  const target = path.resolve(resolvedBase, ...safePath.split('/'))
  const comparableBase = process.platform === 'win32' ? resolvedBase.toLowerCase() : resolvedBase
  const comparableTarget = process.platform === 'win32' ? target.toLowerCase() : target
  if (comparableTarget === comparableBase || !comparableTarget.startsWith(`${comparableBase}${path.sep}`)) {
    throw new Error(`unsafe ${label}: ${filePath}`)
  }
  return target
}

function redactUrl(value) {
  if (!value || typeof value !== 'string' || !/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) return value
  try {
    const url = new URL(value)
    if (url.username) url.username = 'REDACTED'
    if (url.password) url.password = 'REDACTED'
    if (url.search) url.search = '?redacted=1'
    if (url.hash) url.hash = ''
    return url.href
  } catch {
    return value
  }
}

async function fetchTextExact(url) {
  if (url.startsWith('file://')) return readText(fileURLToPath(url))
  const res = await fetch(url)
  if (!res.ok) throw new Error(`failed to fetch ${url}: HTTP ${res.status}`)
  const text = await res.text()
  if (looksLikeHtml(text)) throw new Error(`expected Buildprint snapshot text but received HTML from ${url}`)
  if (/^not\s+found\s*$/i.test(text.trim())) throw new Error(`expected Buildprint snapshot content but received "${text.trim()}" from ${url} — the file may not be published yet or the URL is stale; re-run agb start after the packet is published`)
  return text
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
}


function looksLikeManifestRef(value) {
  return /package\.json(?:$|[?#])/i.test(value) || (exists(value) && path.basename(value) === 'package.json')
}

async function fetchJson(ref) {
  if (isUrl(ref)) {
    const res = await fetch(ref)
    if (!res.ok) throw new Error(`failed to fetch ${ref}: ${res.status}`)
    return await res.json()
  }
  return JSON.parse(readText(path.resolve(cwd, ref)))
}

async function packetDirFromRef(ref) {
  if (!ref) throw new Error('missing packet reference')
  const local = path.resolve(cwd, ref)
  if (exists(local) && fs.statSync(local).isDirectory()) return local
  if (!looksLikeManifestRef(ref)) return local
  const manifest = await fetchJson(ref)
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-packet-check-'))
  const files = Array.isArray(manifest.files) ? manifest.files : []
  const baseUrl = isUrl(ref) ? new URL('.', ref).toString() : null
  for (const entry of files) {
    const rawFile = typeof entry === 'string' ? entry : entry?.path
    const url = typeof entry === 'object' ? (entry.url || entry.rawUrl || entry.siteUrl) : null
    if (!rawFile) continue
    const file = safeManifestPath(rawFile)
    const target = safePathInside(temp, file)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    if (url || baseUrl) {
      const source = url || new URL(file, baseUrl).toString()
      const res = await fetch(source)
      if (!res.ok) throw new Error(`failed to fetch packet file ${file}: ${res.status}`)
      fs.writeFileSync(target, await res.text())
    } else {
      const source = safePathInside(path.dirname(path.resolve(cwd, ref)), file)
      if (exists(source)) fs.copyFileSync(source, target)
    }
  }
  return temp
}

function packetFiles(dir) {
  return walk(dir).map((file) => path.relative(dir, file).split(path.sep).join('/')).sort()
}

function safeReadText(file) {
  try { return readText(file) } catch { return '' }
}

function packetCheckRoot(dir) {
  const directBlueprint = path.join(dir, 'blueprint.yaml')
  const templateBlueprint = path.join(dir, 'templates', 'executable-packet', 'blueprint.yaml')
  if (!exists(directBlueprint) && exists(templateBlueprint)) return path.join(dir, 'templates', 'executable-packet')
  return dir
}


function yamlScalar(text, key) {
  const match = text.match(new RegExp(`^\\s*${key}:\\s*([^\\n#]+)`, 'mi'))
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : ''
}

function phaseFilesFromIndex(text) {
  return [...text.matchAll(/^\s*file:\s*(03-phases\/[^\s#]+\.md)\s*$/gmi)].map((m) => m[1].trim())
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function phaseEntryBlock(text, phaseId) {
  const lines = text.split(/\r?\n/)
  const start = lines.findIndex((line) => new RegExp(`^\\s*-\\s*phase_id:\\s*${escapeRegExp(phaseId)}\\s*$`, 'i').test(line))
  if (start < 0) return ''
  const collected = [lines[start]]
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i]
    if (/^\s*-\s*phase_id:/i.test(line) || /^\S/.test(line)) break
    collected.push(line)
  }
  return collected.join('\n')
}

function phaseFileForId(text, phaseId) {
  const block = phaseEntryBlock(text, phaseId)
  return (block.match(/^\s*file:\s*(03-phases\/[^\s#]+\.md)\s*$/mi) || [])[1] || ''
}

function packetHasObsoleteRouter(file) {
  return file === 'START_HERE.md' || file === 'PRE_IMPLEMENTATION_QUESTIONS.md' || file === 'AGENTS.md' ||
    file === 'CAPABILITY_INDEX.md' || file === 'CONTEXT_PACKET.json' || file === 'TEAM_STACK.md' ||
    file === 'UX_CONTRACT.md' || file === 'DESIGN_QUALITY_BAR.md' || file === 'CURRENT_STATE.md' ||
    file === 'EXECUTION_PROTOCOL.md' || file === 'IMPLEMENTATION_PLAN.md' || file === 'manifest.json' ||
    file.endsWith('/START_HERE.md') || file.endsWith('/PRE_IMPLEMENTATION_QUESTIONS.md') ||
    file.endsWith('/EXECUTION_PROTOCOL.md') || file.endsWith('/IMPLEMENTATION_PLAN.md') ||
    file.includes('/03-capabilities/') || file.startsWith('03-capabilities/') ||
    file.includes('/04-interfaces/') || file.startsWith('04-interfaces/') ||
    file.includes('/05-state-runtime/') || file.startsWith('05-state-runtime/') ||
    file.includes('/06-safety/') || file.startsWith('06-safety/') ||
    file.includes('/07-execution/') || file.startsWith('07-execution/') ||
    file.includes('/08-evaluation/') || file.startsWith('08-evaluation/') ||
    file.includes('/09-evidence/') || file.startsWith('09-evidence/') ||
    file.includes('/capability.yaml') || file.includes('/source-evidence.md') ||
    file.includes('/product-contract.md') || file.includes('/implementation-workflow.md') ||
    file.includes('/proof-contract.yaml')
}

function evidenceRowsFromText(text) {
  return text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line, index) => {
    try { return { index, row: JSON.parse(line), error: null } }
    catch (error) { return { index, row: null, error } }
  })
}

function packetCheckResultsV2(dir, files, allFiles, isMapperTemplatePacket) {
  const checks = []
  const ok = (label, pass, detail = '') => checks.push({ label, pass, detail })

  // v2 spine files
  const needV2 = ['BUILDPRINT.md', 'blueprint.yaml', '01-questions.md', '02-project-setup.md', '02-architecture.md', '03-ux-contract.md', '04-handover.md']
  for (const file of needV2) ok(`v2 packet file exists: ${file}`, files.has(file))
  ok('v2 packet has slices template', files.has('slices/_template/slice.yaml'))
  ok('v2 packet has gate index', files.has('gates/gate-index.yaml'))
  ok('v2 packet avoids obsolete routers/files recursively', !allFiles.some(packetHasObsoleteRouter))

  const blueprint = safeReadText(path.join(dir, 'blueprint.yaml'))
  ok('v2 blueprint declares v2 schema', /schema_version:\s*mapper-os\/executable-blueprint\/v2/i.test(blueprint))
  ok('v2 blueprint declares slices_dir', /slices_dir:/i.test(blueprint))
  ok('v2 blueprint declares gates_dir', /gates_dir:/i.test(blueprint))
  ok('v2 blueprint declares capsules_dir', /capsules_dir:/i.test(blueprint))
  ok('v2 blueprint derived-state rule present', /state_json_path:/i.test(blueprint) && /agent.*never.*write|never.*write.*state|agb state derive/i.test(blueprint))
  ok('v2 blueprint declares posture', /deployment_posture:/i.test(blueprint))
  ok('v2 blueprint agent_contract has partial-not-complete rule', /partial.*not.*complete|blocked.*partial/i.test(blueprint))

  const uxText = safeReadText(path.join(dir, '03-ux-contract.md'))
  ok('v2 ux-contract has Path Map', /##\s*Path Map/i.test(uxText))
  ok('v2 ux-contract has operator acceptance rows (sample_can_satisfy: false)', /sample_can_satisfy:\s*false/i.test(uxText))
  ok('v2 ux-contract has novice acceptance rows', /novice/i.test(uxText))

  const archText = safeReadText(path.join(dir, '02-architecture.md'))
  ok('v2 architecture defines stack', /stack|framework|language|runtime/i.test(archText))
  ok('v2 architecture defines persistence', /persist|database|storage|db/i.test(archText))

  const handoverText = safeReadText(path.join(dir, '04-handover.md'))
  ok('v2 handover template has slice status section', /slice status|## Slice/i.test(handoverText))
  ok('v2 handover template has overall readiness block', /overall readiness|overall_status|not.*complete|partial.*status/i.test(handoverText))

  // Gate index check
  const gateIndex = safeReadText(path.join(dir, 'gates', 'gate-index.yaml'))
  ok('v2 gate index has active_when_posture entries', /active_when_posture:/i.test(gateIndex))
  ok('v2 gate index has human signoff gate', /requires_human_signoff:\s*true/i.test(gateIndex))

  // Slice template check
  const sliceTemplate = safeReadText(path.join(dir, 'slices', '_template', 'slice.yaml'))
  ok('v2 slice template has paths field', /^paths:/mi.test(sliceTemplate))
  ok('v2 slice template has core_proof_required field', /core_proof_required:/i.test(sliceTemplate))
  ok('v2 slice template has persona field', /^persona:/mi.test(sliceTemplate))

  // BUILDPRINT sanity
  const buildprint = safeReadText(path.join(dir, 'BUILDPRINT.md'))
  ok('v2 BUILDPRINT has slice system section', /slice|slices/i.test(buildprint))

  ok('v2 no generated sentinel placeholders remain', isMapperTemplatePacket || !allFiles.some((file) => {
    if (!/\.(md|yaml|json|jsonl)$/.test(file)) return false
    const text = safeReadText(path.join(dir, file)).replace(/<phase-id>/g, '')
    return /MAPPER_REQUIRED_|<mapped-app>|<capability name/i.test(text)
  }))

  return checks
}

function packetCheckResults(dir) {
  dir = packetCheckRoot(dir)
  const checks = []
  const ok = (label, pass, detail = '') => checks.push({ label, pass, detail })
  const files = new Set(packetFiles(dir))
  const allFiles = Array.from(files)
  const normalizedPacketDir = dir.split(path.sep).join('/')
  const isMapperTemplatePacket = normalizedPacketDir.endsWith('buildprints/buildprint-mapper-os/templates/executable-packet') || normalizedPacketDir.endsWith('.buildprint/snapshots/templates/executable-packet')

  // Detect v2 packet (Slice/Gate structure)
  const blueprint0 = safeReadText(path.join(dir, 'blueprint.yaml'))
  const isV2Packet = /schema_version:\s*mapper-os\/executable-blueprint\/v2/i.test(blueprint0) ||
    (files.has('slices/_template/slice.yaml') && files.has('gates/gate-index.yaml'))
  if (isV2Packet) return packetCheckResultsV2(dir, files, allFiles, isMapperTemplatePacket)

  // Keep this checker as an executable-packet smoke alarm, not a product-quality theology gate.
  // Product taste lives in generated/agent-prompt.md and the Buildprint prose; this check only
  // rejects packets that are structurally unbootstrappable, stale, or obviously placeholder-filled.
  const need = [
    'BUILDPRINT.md', 'blueprint.yaml', '01-questions.md', '02-project-setup.md',
    '03-phases/phase-index.yaml', '03-phases/phase-flow.md'
  ]
  for (const file of need) ok(`packet file exists: ${file}`, files.has(file))
  const hasProductReviewHandover = files.has('04-review.md') && files.has('05-handover.md')
  const hasLegacyEvidenceLedger = files.has('05-evidence/evidence-ledger.schema.json') || files.has('05-evidence/evidence-ledger.jsonl')
  ok('packet includes review/handover', hasProductReviewHandover)
  ok('packet avoids legacy evidence ledger', !hasLegacyEvidenceLedger)
  ok('packet file exists: 04-review.md', files.has('04-review.md'))
  ok('packet file exists: 05-handover.md', files.has('05-handover.md'))
  ok('packet does not ship project AGENTS.md', !files.has('AGENTS.md') && !allFiles.some((file) => file.startsWith('docs/')))
  ok('packet avoids obsolete routers/files recursively', !allFiles.some(packetHasObsoleteRouter))

  const blueprint = safeReadText(path.join(dir, 'blueprint.yaml'))
  ok('blueprint declares executable Buildprint authority', /schema_version:\s*mapper-os\/executable-blueprint\s*$/im.test(blueprint) && /execution_start:\s*BUILDPRINT\.md/i.test(blueprint) && /machine_contract:\s*blueprint\.yaml/i.test(blueprint))
  ok('blueprint includes project setup gate', /01-questions\.md/i.test(blueprint) && /02-project-setup\.md/i.test(blueprint))
  ok('blueprint source fields are nested under source', !/\nsource:\s*\ninput:/i.test(`\n${blueprint}`))
  ok('blueprint includes implementation loop', /phase_flow:\s*03-phases\/phase-flow\.md/i.test(blueprint) || /observe[\s\S]*plan[\s\S]*execute[\s\S]*verify[\s\S]*reflect[\s\S]*record/i.test(blueprint))
  ok('blueprint includes repair routing', /repair_routing:/i.test(blueprint) && /02-project-setup\.md/i.test(blueprint))
  const qualificationLabel = yamlScalar(blueprint, 'qualification_label') || yamlScalar(blueprint, 'claim_status')
  ok('blueprint declares qualification label', ['DISCOVERY_ONLY', 'PROOF_REQUIRED', 'QUALIFIED_SOURCE_INDEPENDENT', 'product_build_required', 'local_build_requires_review'].includes(qualificationLabel))
  ok('blueprint declares setup tier', /setup_tier:\s*(compact_setup|full_setup|product_leadership|typed_product_leadership|<compact_setup\|full_setup>)/i.test(blueprint))
  ok('blueprint declares artifact mode', /blueprint_mode:\s*\n[\s\S]*primary:\s*(product|framework|library|integration|automation|data-pipeline|infrastructure|mixed)/i.test(blueprint))

  const buildprint = safeReadText(path.join(dir, 'BUILDPRINT.md'))
  ok('BUILDPRINT owns read order', /01-questions\.md[\s\S]*(generated\/agent-prompt\.md[\s\S]*)?02-project-setup\.md[\s\S]*03-phases\/phase-index\.yaml[\s\S]*03-phases\/phase-flow\.md/i.test(buildprint))
  ok('BUILDPRINT includes phase loop', /How to use this packet|Implementation loop/i.test(buildprint) && /phase/i.test(buildprint))
  ok('BUILDPRINT includes final reviewer mode', /Final critical reviewer|Final Reviewer|reviewer step|04-review\.md/i.test(buildprint) && /dead buttons|dead controls|placeholder|slop|generic dashboard/i.test(buildprint))

  const questions = safeReadText(path.join(dir, '01-questions.md'))
  ok('questions classify blocking power', /Hard-stop/i.test(questions) && /Assumable/i.test(questions) && /Deferrable/i.test(questions) && /Do not proceed to `?02-project-setup\.md`?|stop before setup/i.test(questions))
  ok('questions hard-stop sensitive decisions', /deployment posture/i.test(questions) && /secrets|credentials/i.test(questions) && /destructive|data-loss/i.test(questions) && /privacy|compliance/i.test(questions) && /product\/artifact identity|central artifact/i.test(questions))

  const setup = safeReadText(path.join(dir, '02-project-setup.md'))
  ok('project setup defines implementation alignment', /senior development architect|senior product\/developer\/operator engineer/i.test(setup) && /artifact type|central artifact|product loop|first loop|artifact loop/i.test(setup) && /Forbidden shortcuts|Product quality rules|Product-craft floor/i.test(setup))
  ok('project setup consumes questions into decisions', /01-questions\.md/i.test(setup) && /hard-stop/i.test(setup) && /assumable/i.test(setup) && /deferrable/i.test(setup) && /question-to-decision|Answer \/ assumption|architectural impact/i.test(setup) && /Reversible\?|Blocks setup\?/i.test(setup))
  ok('project setup requires durable setup artifacts', /AGENTS\.md/i.test(setup) && /\.env\.example/i.test(setup) && /docs\/(architecture|product-loop|artifact-loop)\.md/i.test(setup) && /setup-receipt\.md/i.test(setup))
  ok('project setup requires agent and UI identity contracts', /AGENTS\.md/i.test(setup) && /mandatory read/i.test(setup) && /code ownership|ownership map/i.test(setup) && /UI-IDENTITY\.md|ui-identity\.md/i.test(setup) && /UX\/UI persona|UX UI persona|persona pass/i.test(setup) && /screenshot critique|visual identity/i.test(setup))
  ok('project setup forces architect base not vibes', /foundation pour|architectural foundation/i.test(setup) && /selected stack/i.test(setup) && /adapter/i.test(setup) && /persistence/i.test(setup) && /verification commands|smoke/i.test(setup))

  const phaseZero = safeReadText(path.join(dir, '03-phases/00-product-system-alignment.md'))
  ok('phase 00 defines product system alignment', /Product system alignment/i.test(phaseZero) && /product promise/i.test(phaseZero) && /user segments|users|consumer/i.test(phaseZero) && /primary loops/i.test(phaseZero) && /feature map/i.test(phaseZero) && /state model/i.test(phaseZero) && /architecture boundaries/i.test(phaseZero) && /quality bar/i.test(phaseZero))

  const phaseFlow = safeReadText(path.join(dir, '03-phases/phase-flow.md'))
  ok('phase flow defines phase-entry behavior', /For each phase/i.test(phaseFlow) && /smallest real usable slice/i.test(phaseFlow))
  ok('phase flow requires explicit product intention or planning', /product intention|restate|plan|intention/i.test(phaseFlow))
  ok('phase flow defines quality or blocker behavior', /slop|blocked|blocker|dead|fake|usable/i.test(phaseFlow))
  ok('phase flow avoids self-proof theater', !/evidence-ledger\.jsonl/i.test(phaseFlow) || /hondo|handover|blocker/i.test(phaseFlow))

  const phaseIndex = safeReadText(path.join(dir, '03-phases/phase-index.yaml'))
  ok('phase index names active phase file', /active_phase:\s*03-phases\/[^\s#]+\.md/i.test(phaseIndex))
  const phaseIds = [...phaseIndex.matchAll(/^\s*-?\s*phase_id:\s*([^\s#]+)/gmi)].map((m) => m[1].trim())
  const phaseIdSet = new Set(phaseIds)
  ok('phase index has unique canonical phase ids', phaseIds.length > 0 && phaseIds.length === phaseIdSet.size)
  const deploymentPosture = (blueprint.match(/deployment_posture:[\s\S]*?^\s*current:\s*([^\s#]+)/mi) || [])[1] || ''
  const postureValues = [deploymentPosture, ...[...phaseIndex.matchAll(/^\s*deployment_posture:\s*([^\s#]+)/gmi)].map((m) => m[1])].filter(Boolean).map((value) => value.trim().replace(/^['"]|['"]$/g, ''))
  const phaseStatuses = [...phaseIndex.matchAll(/^\s*status:\s*([^\s#]+)/gmi)].map((m) => m[1].trim().replace(/^['"]|['"]$/g, ''))
  const allowedPostures = new Set(['trusted_local', 'private_authenticated', 'public_webapp'])
  const allowedStatuses = new Set(['included', 'included_blocked', 'conditional', 'blocked'])
  const contractVocabularyText = `${blueprint}\n${phaseIndex}`
  const hasInvalidPostureSpelling = /trusted-local|private authenticated|public webapp/i.test(contractVocabularyText)
  const hasLegacyUppercaseStatus = /\bINCLUDED_BLOCKED\b/.test(contractVocabularyText)
  ok('packet uses canonical posture and phase status values', postureValues.length > 0 && postureValues.every((value) => allowedPostures.has(value)) && phaseStatuses.every((value) => allowedStatuses.has(value)) && !hasInvalidPostureSpelling && !hasLegacyUppercaseStatus)
  const phaseIndexFiles = phaseFilesFromIndex(phaseIndex)
  const activePhase = (phaseIndex.match(/active_phase:\s*(03-phases\/[^\s#]+\.md)/i) || [])[1]
  ok('phase index active phase exists', !!activePhase && files.has(activePhase))
  ok('phase index referenced phase files exist', phaseIndexFiles.length > 0 && phaseIndexFiles.every((file) => files.has(file)))

  const selectedSpine = yamlScalar(blueprint, 'selected_spine')
  const blueprintPrimary = ((blueprint.match(/blueprint_mode:[\s\S]*?^\s*primary:\s*([^\s#]+)/mi) || [])[1] || '').trim().replace(/^['"]|['"]$/g, '')
  const hardeningPhases = [
    '09-auth-and-tenancy',
    '10-observability-and-health',
    '11-deployment-and-operability',
    '12-ci-and-release-gates',
    '13-backup-and-recovery',
    '14-security-and-abuse-controls'
  ]
  ok('phase index includes posture hardening phases', hardeningPhases.every((phaseId) => phaseIdSet.has(phaseId)))
  ok('included_blocked phases name blocked reasons', phaseIds.every((phaseId) => {
    const block = phaseEntryBlock(phaseIndex, phaseId)
    return !/status:\s*included_blocked\b/i.test(block) || /blocked_reason:\s*\S/i.test(block)
  }))
  const spinePhaseRequirements = {
    product_app_consumer_first: {
      label: 'product spine uses Buildprint Consumer-First phases',
      phases: ['00-product-system-alignment', '01-shell-and-navigation', '02-core-loop-first', '03-feature-slices', '04-state-and-data', '05-domain-and-intelligence', '06-design-system-and-copy', '07-architecture-garden', '08-verification']
    },
    developer_first_framework: {
      label: 'developer_first_framework spine uses Developer-First phases',
      phases: ['01-adoption-contract', '02-framework-seams', '03-first-host-action', '04-events-failures-observability', '05-examples-and-docs']
    },
    reliability_first_service: {
      label: 'reliability_first_service spine uses Reliability-First phases',
      phases: ['01-service-goal-slo', '02-state-machine-data-contracts', '03-happy-transaction', '04-retry-failure-recovery', '05-observability-admin-controls', '06-runbook-regression-verification']
    },
    automation_task_loop: {
      label: 'automation_task_loop spine uses Automation phases',
      phases: ['01-task-contract', '02-approval-and-inputs', '03-first-task-run', '04-stop-conditions-and-recovery', '05-trace-and-handover']
    },
    data_pipeline_quality_loop: {
      label: 'data_pipeline_quality_loop spine uses Data Pipeline phases',
      phases: ['01-data-contracts', '02-ingestion-and-lineage', '03-transform-quality-loop', '04-quality-gates-and-recovery', '05-output-reproducibility']
    },
    infrastructure_operations_loop: {
      label: 'infrastructure_operations_loop spine uses Infrastructure phases',
      phases: ['01-operation-contract', '02-plan-apply-boundaries', '03-health-and-drift', '04-rollback-and-recovery', '05-runbook-and-release-gates']
    }
  }
  if (spinePhaseRequirements[selectedSpine]) {
    const requirement = spinePhaseRequirements[selectedSpine]
    ok(requirement.label, requirement.phases.every((phaseId) => phaseIdSet.has(phaseId)))
  } else if (selectedSpine === 'mixed') {
    ok('mixed spine declares per-phase modes', /mixed_phase_modes:|phase_mode:/i.test(`${blueprint}\n${phaseIndex}`))
  }
  ok('selected spine uses known executable spine', [...Object.keys(spinePhaseRequirements), 'mixed'].includes(selectedSpine))
  const primarySpineMap = {
    product: ['product_app_consumer_first'],
    framework: ['developer_first_framework'],
    library: ['developer_first_framework'],
    integration: ['developer_first_framework', 'reliability_first_service'],
    automation: ['automation_task_loop'],
    'data-pipeline': ['data_pipeline_quality_loop'],
    infrastructure: ['infrastructure_operations_loop'],
    mixed: ['mixed']
  }
  ok('blueprint primary uses matching executable spine', (primarySpineMap[blueprintPrimary] || []).includes(selectedSpine))

  const knownRoles = new Set(['product-architect', 'ux-ui-craft', 'integration-runtime', 'security-boundary', 'data-persistence'])
  const phaseDir = path.join(dir, '03-phases')
  const collectPhaseMd = (root) => exists(root)
    ? fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(root, entry.name)
        if (entry.isDirectory()) return collectPhaseMd(full)
        return entry.name.endsWith('.md') && entry.name !== 'phase-flow.md' ? [full] : []
      })
    : []
  const phaseFiles = collectPhaseMd(phaseDir).sort()
  ok('packet has at least one phase file', phaseFiles.length > 0)
  const observabilityFile = phaseFileForId(phaseIndex, '10-observability-and-health') ||
    (files.has('03-phases/conditional/observability-and-health.md') ? '03-phases/conditional/observability-and-health.md' : '') ||
    (files.has('03-phases/10-observability-and-health.md') ? '03-phases/10-observability-and-health.md' : '')
  const observabilityPhase = observabilityFile ? safeReadText(path.join(dir, observabilityFile)) : ''
  ok('observability phase embeds security-boundary', !!observabilityPhase && /^requires_roles:\s*\[[^\]]*security-boundary[^\]]*\]/mi.test(observabilityPhase) && /##\s*Required output\s*\(security-boundary\)/i.test(observabilityPhase) && /##\s*Blocks\s*\(security-boundary\)/i.test(observabilityPhase))
  for (const fullPath of phaseFiles) {
    const file = path.relative(phaseDir, fullPath).split(path.sep).join('/')
    const text = safeReadText(fullPath)
    ok(`${file} has implementable phase contract`, /Product intention|Product outcome|Capability outcome|Operation outcome|Phase mode contract/i.test(text) && /## Build|## Implementation scope|## Review/i.test(text) && /Quality bar|Do not ship|Handover|Repair routing/i.test(text))
    ok(`${file} uses phase_id not capability_id for proof rows`, !/capability_id\s*:/i.test(text))
    ok(`${file} does not reference missing shared UX context`, !/02-context\/ux-contract\.md|design-quality-bar\.md/i.test(text))
    const rolesMatch = text.match(/^\s*requires_roles\s*:\s*\[([^\]]*)\]/m)
    if (rolesMatch) {
      const declaredRoles = rolesMatch[1].split(',').map((role) => role.trim()).filter(Boolean)
      const embeddedRoles = (text.match(/##\s*Required output\s*\(([^)]+)\)/gi) || []).map((heading) => heading.replace(/##\s*Required output\s*\(/i, '').replace(/\)\s*$/, '').trim())
      const unresolved = declaredRoles.filter((role) => !embeddedRoles.includes(role))
      ok(`${file} embeds every requires_roles role (no dangling role tokens)`, unresolved.length === 0, unresolved.length ? `missing embedded "## Required output (<role>)" for: ${unresolved.join(', ')}` : '')
      const unknown = declaredRoles.filter((role) => !knownRoles.has(role))
      ok(`${file} requires_roles names known capsules`, unknown.length === 0, unknown.length ? `unknown role(s): ${unknown.join(', ')} (allowed: ${Array.from(knownRoles).join(', ')})` : '')
    }
  }

  const rules = files.has('04-evaluation.md') ? safeReadText(path.join(dir, '04-evaluation.md')) : safeReadText(path.join(dir, '04-review.md'))
  ok('evaluation/review includes anti-fake product quality', /no_fake|fake|dead controls|generic dashboard|slop/i.test(rules))
  ok('evaluation/review includes honest blocker or boundary semantics', /production_readiness|blocker|blocked|boundary|credentials/i.test(rules))

  if (hasLegacyEvidenceLedger) {
    const schema = safeReadText(path.join(dir, '05-evidence/evidence-ledger.schema.json'))
    for (const key of ['phase_id', 'proof_type', 'provider_mode', 'upgrades_claim', 'claim_type', 'blocks_continuation']) ok(`evidence schema includes ${key}`, schema.includes(key))
    ok('evidence schema constrains proof/provider/claim types', /unit_contract/i.test(schema) && /provider_live/i.test(schema) && /claim_upgrade/i.test(schema))
    const seedText = safeReadText(path.join(dir, '05-evidence/evidence-ledger.jsonl'))
    const seedParse = evidenceRowsFromText(seedText)
    const seedRows = seedParse.filter((item) => item.row).map((item) => item.row)
    ok('seed evidence JSONL parses', seedParse.every((item) => !item.error))
    ok('seed evidence phase ids match phase index', seedRows.every((row) => !row.phase_id || phaseIdSet.has(row.phase_id)))
    ok('seed evidence cannot upgrade claims', seedRows.every((row) => row.upgrades_claim !== true))
    ok('seed evidence rows use phase_id not capability_id', seedRows.every((row) => !('capability_id' in row) || 'phase_id' in row))
  }

  ok('no generated sentinel placeholders remain', isMapperTemplatePacket || !allFiles.some((file) => {
    if (!/\.(md|yaml|json|jsonl)$/.test(file)) return false
    const text = safeReadText(path.join(dir, file)).replace(/<phase-id>/g, '')
    return /MAPPER_REQUIRED_|<mapped-app>|<capability name/i.test(text)
  }))
  ok('generated prompt is alignment speech, not authority', isMapperTemplatePacket || !files.has('generated/agent-prompt.md') || (/not a checklist|senior product engineer|senior product engineer|product engineer|checklist executor/i.test(safeReadText(path.join(dir, 'generated/agent-prompt.md'))) && !/start here|read first|source of truth|override|canonical/i.test(safeReadText(path.join(dir, 'generated/agent-prompt.md')).replace(/Generated from:[^\n]+/gi, '').replace(/not source of truth|not authoritative|not a substitute/gi, ''))))
  ok('generated prompt includes anti-slop/product reviewer when present', isMapperTemplatePacket || !files.has('generated/agent-prompt.md') || /anti-slop|ai-slop|slop gate|skeptical reviewer|dead buttons|generic dashboards/i.test(safeReadText(path.join(dir, 'generated/agent-prompt.md'))))
  return checks
}

function printPacketChecks(checks) {
  let failed = 0
  for (const check of checks) {
    if (check.pass) console.log(`✓ ${check.label}`)
    else { failed++; console.log(`✗ ${check.label}${check.detail ? `: ${check.detail}` : ''}`) }
  }
  console.log(`\nPacket check: ${failed ? 'FAIL' : 'PASS'} (${failed} failed)`)
  return failed === 0
}

async function packetCheck(ref) {
  const dir = await packetDirFromRef(ref)
  return printPacketChecks(packetCheckResults(dir))
}

async function packetNext(ref) {
  const dir = packetCheckRoot(await packetDirFromRef(ref))
  const phaseIndex = safeReadText(path.join(dir, '03-phases/phase-index.yaml'))
  const activePath = phaseIndex.match(/active_phase:\s*([^\s#]+)/)?.[1]
  if (!activePath) throw new Error('missing active_phase in 03-phases/phase-index.yaml')
  const active = safeReadText(path.join(dir, activePath))
  if (!active) throw new Error(`missing active phase ${activePath}`)
  console.log(active.trim())
}


function evidenceCheck(file) {
  const text = readText(path.resolve(cwd, file))
  let failed = 0
  let count = 0
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = raw.trim()
    if (!line) continue
    count++
    try {
      const row = JSON.parse(line)
      for (const field of ['artifact_id', 'type', 'phase_id', 'status', 'source', 'proves', 'proof_type', 'provider_mode', 'upgrades_claim', 'claim_type']) {
        if (!(field in row)) {
          failed++
          console.error(`✗ line ${index + 1}: missing ${field}`)
        }
      }
      if (!['missing', 'passed', 'proven', 'blocked', 'failed', 'skipped'].includes(String(row.status))) {
        failed++; console.error(`✗ line ${index + 1}: invalid status ${row.status}`)
      }
      if (!['static', 'unit_contract', 'integration', 'runtime_api', 'browser_e2e', 'screenshot_review', 'persistence_restart', 'provider_fake', 'provider_live', 'security_review', 'no_fake_scan', 'clean_room_reversal', 'deployment_ops', 'blocker'].includes(String(row.proof_type))) {
        failed++; console.error(`✗ line ${index + 1}: invalid proof_type ${row.proof_type}`)
      }
      if (!['none', 'fake', 'deterministic', 'sandbox', 'live', 'blocked', 'missing_live_credentials', 'not_applicable'].includes(String(row.provider_mode))) {
        failed++; console.error(`✗ line ${index + 1}: invalid provider_mode ${row.provider_mode}`)
      }
      if (!['target', 'core_pass', 'claim_upgrade', 'blocker'].includes(String(row.claim_type))) {
        failed++; console.error(`✗ line ${index + 1}: invalid claim_type ${row.claim_type}`)
      }
      if (row.upgrades_claim === true && row.provider_mode === 'deterministic' && Array.isArray(row.proves) && row.proves.includes('provider_live')) {
        failed++; console.error(`✗ line ${index + 1}: deterministic provider cannot prove provider_live`)
      }
      if (row.upgrades_claim === true && row.proof_type === 'blocker') {
        failed++; console.error(`✗ line ${index + 1}: blocker proof cannot upgrade a claim`)
      }
    } catch (error) {
      failed++
      console.error(`✗ line ${index + 1}: invalid JSON (${error.message})`)
    }
  }
  if (!failed) console.log(`✓ evidence ledger valid (${count} row${count === 1 ? '' : 's'})`)
  return failed === 0
}


function readJsonFile(file) {
  return JSON.parse(readText(file))
}

function copyDirectorySafe(from, to) {
  if (!exists(from)) throw new Error(`input folder does not exist: ${from}`)
  if (exists(to)) throw new Error(`output folder already exists: ${to}`)
  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.cpSync(from, to, { recursive: true, errorOnExist: true })
}

function featureQualificationRecords(facts) {
  return featureInventory(facts).map((feature) => {
    const evidence = feature.evidence.filter(Boolean)
    const readableEvidence = evidence.filter((relative) => {
      const file = path.join(facts.root || '', relative)
      return exists(file)
    })
    const hasSource = readableEvidence.length > 0
    const missing = []
    if (!hasSource) missing.push('source evidence file')
    if (!feature.requiredBehavior?.length) missing.push('required behavior')
    if (!feature.acceptance?.length) missing.push('acceptance proof')
    const needsRuntimeProof = /external|provider|stripe|billing|payment|email|notification|AI|Agent|tool|webhook|auth|permission/i.test(feature.title + ' ' + feature.requiredBehavior.join(' '))
    if (needsRuntimeProof) missing.push('runtime proof for side effects, auth, privacy, or external behavior')
    return {
      title: feature.title,
      kind: feature.kind,
      status: missing.length ? 'blocked_unknown' : 'validated_feature',
      previousStatus: 'unqualified_hypothesis',
      evidence,
      readableEvidence,
      confirmed: {
        trigger: hasSource ? 'source evidence exists; human/agent must confirm exact runtime trigger' : 'unknown',
        behavior: feature.requiredBehavior,
        stateChanges: hasSource ? 'requires source review; not inferred as qualified from filenames' : 'unknown',
        permissions: needsRuntimeProof ? 'requires explicit auth/privacy review' : 'not detected by static mapper',
        externalSideEffects: needsRuntimeProof ? 'requires runtime evidence before promotion' : 'not detected by static mapper',
        errorEmptyStates: 'requires source/test review before promotion',
        acceptanceProof: feature.acceptance
      },
      blockers: missing
    }
  })
}

function qualificationSummary(records) {
  const counts = records.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] || 0) + 1 }), {})
  return { total: records.length, ...counts }
}

function sourceValidationMd(records) {
  return ['# SOURCE_VALIDATION', '', 'Qualification reads map evidence and refuses to promote unresolved hypotheses. Static evidence can validate file existence and source-review targets, but runtime behavior still needs proof.', '', ...records.map((r) => [`## ${r.title}`, '', `- Status: ${r.status}`, `- Previous status: ${r.previousStatus}`, '- Evidence:', ...(r.evidence.length ? r.evidence.map((x) => `  - ${x}${r.readableEvidence.includes(x) ? ' (readable)' : ' (missing)'}`) : ['  - none']), '- Confirmed / required:', `  - Trigger: ${r.confirmed.trigger}`, `  - State changes: ${r.confirmed.stateChanges}`, `  - Permissions: ${r.confirmed.permissions}`, `  - External side effects: ${r.confirmed.externalSideEffects}`, `  - Error/empty states: ${r.confirmed.errorEmptyStates}`, '- Blockers:', ...(r.blockers.length ? r.blockers.map((x) => `  - ${x}`) : ['  - none']), ''].join('\n')).join('\n')].join('\n')
}

function qualifiedProductScopeMd(records) {
  return ['# PRODUCT_SCOPE', '', 'This product scope is derived from qualification records. Preserve validated behavior; do not claim parity for blocked unknowns.', '', '## Must preserve', '', ...(records.filter((r) => r.status === 'validated_feature').map((r) => `- ${r.title}`) || []), '', '## Unknown / blocked', '', ...(records.filter((r) => r.status !== 'validated_feature').map((r) => `- ${r.title}: ${r.blockers.join('; ')}`) || ['- none']), '', '## Can replace', '', '- Internal framework/library choices unless product behavior, data semantics, privacy, or integration contracts depend on them.', '- File/folder layout unless it is part of a public package/API contract.', '', '## Explicitly excluded', '', '- Features without source evidence.', '- Full production parity for blocked unknowns.', '- Runtime/security/privacy guarantees without tests or source proof.', ''].join('\n')
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))]
}

function readOrderFromManifest(manifest, isExecutablePacket, hasManifestFile) {
  if (Array.isArray(manifest.instructions?.readOrder) && manifest.instructions.readOrder.length) return manifest.instructions.readOrder
  if (Array.isArray(manifest.readOrder) && manifest.readOrder.length) return manifest.readOrder
  return isExecutablePacket
    ? ['BUILDPRINT.md', '01-questions.md', 'generated/agent-prompt.md', '02-project-setup.md', 'blueprint.yaml', '03-phases/phase-index.yaml', '03-phases/phase-flow.md', '04-review.md', '05-handover.md', '04-evaluation.md', '05-evidence/evidence-ledger.jsonl'].filter(hasManifestFile)
    : ['BUILDPRINT.md'].filter(hasManifestFile)
}

function phaseIndexActiveInfo(phaseIndexText) {
  const activePhase = phaseIndexText.match(/active_phase:\s*([^\s#]+)/)?.[1] || null
  if (!activePhase) return { activePhase: null, activePhaseId: null }
  const blocks = phaseIndexText.split(/\n\s*-\s+phase_id:\s*/).slice(1)
  for (const block of blocks) {
    const firstLine = block.split(/\r?\n/, 1)[0] || ''
    const phaseId = firstLine.trim().split(/\s+/)[0]
    const file = block.match(/\n\s*file:\s*([^\s#]+)/)?.[1]
    if (file === activePhase) return { activePhase, activePhaseId: phaseId || null }
  }
  const fallbackId = path.basename(activePhase, path.extname(activePhase))
  return { activePhase, activePhaseId: fallbackId || null }
}

function executableReadOrder(baseReadOrder, hasManifestFile, activePhase) {
  const canonical = [
    'BUILDPRINT.md',
    '01-questions.md',
    'generated/agent-prompt.md',
    'generated/codex-handoff.md',
    '02-project-setup.md',
    'blueprint.yaml',
    '03-phases/phase-index.yaml',
    '03-phases/phase-flow.md',
    activePhase,
    '04-review.md',
    '05-handover.md',
    '04-evaluation.md',
    '05-evidence/evidence-ledger.jsonl'
  ].filter((file) => file && hasManifestFile(file))
  const extras = baseReadOrder.filter((file) => hasManifestFile(file) && !canonical.includes(file))
  return uniqueStrings([...canonical, ...extras])
}

async function startBuildprint(manifestRef, targetFolder = cwd) {
  const { json: manifest, baseUrl } = await readJsonFromUrlOrFile(manifestRef)
  if (!manifest.slug || !Array.isArray(manifest.files)) throw new Error('invalid Buildprint package manifest: expected slug and files[]')
  const manifestFilePaths = manifest.files
    .map((file) => typeof file === 'string' ? file : file.path)
    .filter(Boolean)
    .map((filePath) => safeManifestPath(filePath))
    .filter((filePath) => !filePath.includes('*'))
  const hasManifestFile = (filePath) => manifestFilePaths.includes(filePath)
  const isExecutablePacket = hasManifestFile('01-questions.md') && hasManifestFile('02-project-setup.md') && hasManifestFile('blueprint.yaml')
  const baseReadOrder = readOrderFromManifest(manifest, isExecutablePacket, hasManifestFile)

  const targetRoot = path.resolve(cwd, targetFolder)
  fs.mkdirSync(targetRoot, { recursive: true })
  const stateDir = path.join(targetRoot, '.buildprint')
  const snapshotDir = path.join(stateDir, 'snapshots')
  fs.mkdirSync(snapshotDir, { recursive: true })

  const downloaded = []
  for (const file of manifest.files) {
    const rawPath = typeof file === 'string' ? file : file.path
    if (!rawPath) continue
    const safePath = safeManifestPath(rawPath)
    if (safePath.includes('*')) continue
    let source = resolveManifestUrl(baseUrl, typeof file === 'object' ? file.siteUrl || file.rawUrl : null)
    if (!source && baseUrl.startsWith('file://')) {
      const manifestPath = fileURLToPath(baseUrl)
      source = pathToFileURL(safePathInside(path.dirname(manifestPath), safePath)).href
    }
    if (!source) throw new Error(`missing source URL for ${safePath}`)
    const text = await fetchTextExact(source)
    if (!text.trim() && !safePath.endsWith('.gitkeep')) throw new Error(`downloaded empty snapshot for ${safePath}`)
    // Minimum content length — suspiciously short files indicate a broken CDN or unpublished asset
    const snapshotBytes = Buffer.byteLength(text)
    const minBytes = 32
    if (snapshotBytes < minBytes && !safePath.endsWith('.gitkeep') && !safePath.endsWith('.jsonl')) {
      throw new Error(`downloaded snapshot ${safePath} is suspiciously short (${snapshotBytes} bytes from ${source}) — expected at least ${minBytes} bytes; the file may not be published or the URL is stale`)
    }
    // Key-file content assertions: critical spine files must contain their canonical anchor
    if (safePath === 'BUILDPRINT.md' && !/^# BUILDPRINT:/im.test(text)) {
      throw new Error(`downloaded BUILDPRINT.md is missing "# BUILDPRINT:" heading — content appears invalid or truncated from ${source}`)
    }
    if (safePath === 'blueprint.yaml' && !/schema_version:/i.test(text)) {
      throw new Error(`downloaded blueprint.yaml is missing schema_version: — content appears invalid or truncated from ${source}`)
    }
    if (safePath === '03-phases/phase-index.yaml' && !/active_phase:/i.test(text)) {
      throw new Error(`downloaded 03-phases/phase-index.yaml is missing active_phase: — content appears invalid or truncated from ${source}`)
    }
    const dest = safePathInside(snapshotDir, safePath)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, text)
    downloaded.push({ path: safePath, sourceUrl: redactUrl(source), bytes: Buffer.byteLength(text) })
  }

  // Post-download corruption check: if key spine files are missing or broken, fail loudly
  // (guards against servers that respond 200 with error-page text for non-existent files)
  const spineChecks = [
    { path: 'BUILDPRINT.md', test: (t) => /^# BUILDPRINT:/im.test(t), msg: 'missing "# BUILDPRINT:" heading' },
    { path: 'blueprint.yaml', test: (t) => /schema_version:/i.test(t), msg: 'missing schema_version:' },
  ]
  for (const check of spineChecks) {
    const spineFile = path.join(snapshotDir, check.path)
    if (!fs.existsSync(spineFile)) continue // optional file absent; already caught by required-file checks elsewhere
    const spineText = fs.readFileSync(spineFile, 'utf8')
    if (!check.test(spineText)) {
      throw new Error(
        `Snapshot integrity failure: ${check.path} ${check.msg}.\n` +
        `This usually means the published packet files are not yet live or the manifest URLs point to stale content.\n` +
        `Do not proceed — re-run agb start after the packet is published, or supply the packet files manually.`
      )
    }
  }
  const now = new Date().toISOString()
  const phaseIndexPath = path.join(snapshotDir, '03-phases', 'phase-index.yaml')
  const phaseIndexText = fs.existsSync(phaseIndexPath) ? fs.readFileSync(phaseIndexPath, 'utf8') : ''
  const { activePhase, activePhaseId } = phaseIndexActiveInfo(phaseIndexText)
  const manifestReadOrder = isExecutablePacket
    ? executableReadOrder(baseReadOrder, hasManifestFile, activePhase)
    : uniqueStrings(baseReadOrder.filter(hasManifestFile))
  const snapshotEvidencePath = path.join(snapshotDir, '05-evidence', 'evidence-ledger.jsonl')
  const hasLegacyRuntimeEvidence = fs.existsSync(snapshotEvidencePath)
  if (hasLegacyRuntimeEvidence) {
    const evidenceDir = path.join(stateDir, 'evidence')
    const runtimeEvidencePath = path.join(evidenceDir, 'evidence-ledger.jsonl')
    fs.mkdirSync(evidenceDir, { recursive: true })
    fs.writeFileSync(runtimeEvidencePath, fs.readFileSync(snapshotEvidencePath, 'utf8'))
  }

  writeJson(path.join(stateDir, 'source.json'), {
    slug: manifest.slug,
    title: manifest.title,
    category: manifest.category,
    tier: manifest.tier,
    status: manifest.status,
    manifestUrl: redactUrl(isUrl(manifestRef) ? manifestRef : path.resolve(cwd, manifestRef)),
    agentUrl: redactUrl(resolveManifestUrl(baseUrl, manifest.entrypoints?.agent)),
    promptUrl: redactUrl(resolveManifestUrl(baseUrl, manifest.entrypoints?.prompt)),
    githubUrl: redactUrl(manifest.entrypoints?.github),
    rawBase: redactUrl(manifest.entrypoints?.rawBase),
    snapshotMode: 'download_exact',
    startedAt: now,
    downloaded,
    readOrder: manifestReadOrder,
    executablePacket: isExecutablePacket,
  })

  writeJson(path.join(stateDir, 'state.json'), {
    buildprint: manifest.slug,
    currentPhase: isExecutablePacket ? activePhaseId || 'active-phase' : '00-alignment',
    activePhase,
    activePhaseId,
    executionMode: manifest.executionMode || manifest.execution_mode || (isExecutablePacket ? 'product-led-phase-flow' : null),
    completedPhases: [],
    blocked: false,
    lastAction: `downloaded ${downloaded.length} exact Buildprint snapshot files`,
    nextAction: isExecutablePacket
      ? 'read .buildprint/next-agent.md, complete project setup, then follow the active phase loop'
      : 'read .buildprint/next-agent.md and begin alignment or default-preset flow',
    runtimeEvidenceLedger: hasLegacyRuntimeEvidence ? '.buildprint/evidence/evidence-ledger.jsonl' : null,
    updatedAt: now,
  })

  fs.writeFileSync(path.join(stateDir, 'progress.md'), isExecutablePacket
    ? `# Build Progress\n\n## Done\n- Bootstrapped .buildprint/ from package manifest.\n- Downloaded ${downloaded.length} exact Buildprint snapshot files.\n- Prepared product-led phase-flow state.\n\n## Current\n- Active phase: \`${activePhase || 'unknown'}\`.\n\n## Next\n- Follow \`.buildprint/next-agent.md\`, complete product setup, then execute the active phase loop.\n`
    : `# Build Progress\n\n## Done\n- Bootstrapped .buildprint/ from package manifest.\n- Downloaded ${downloaded.length} exact Buildprint snapshot files.\n\n## Current\n- Phase 00 - Alignment.\n\n## Next\n- Read snapshots and follow the Buildprint alignment rules.\n`)
  fs.writeFileSync(path.join(stateDir, 'decisions.md'), `# Decisions\n\nNo implementation decisions recorded yet. Add confirmed alignment choices here.\n`)
  fs.writeFileSync(path.join(stateDir, 'blockers.md'), `# Blockers\n\nNone currently.\n`)
  fs.writeFileSync(path.join(stateDir, 'next-agent.md'), isExecutablePacket ? `# Next Agent Instructions

Start here.

This is a Mapper OS executable Buildprint. Local runtime state wins over stale assumptions, but package snapshots remain read-only.

1. Read \`.buildprint/source.json\` and \`.buildprint/state.json\`.
2. Read order: ${manifestReadOrder.map((file) => `\`.buildprint/snapshots/${file}\``).join(' -> ')}.
3. Read and complete \`.buildprint/snapshots/02-project-setup.md\` before phase work.
4. Read \`.buildprint/snapshots/03-phases/phase-flow.md\`.
5. Load only the active phase named in \`.buildprint/snapshots/03-phases/phase-index.yaml\`: \`${activePhase || 'unknown'}\`.
6. Execute the phase-flow loop: restate product intention, build the smallest real usable slice, improve the obvious next user action, run relevant checks, remove visible slop, and record useful handover facts.
7. If verification or product review fails, route repair to the current phase unless the failure proves setup/questions/prior phase/external blocker is responsible.
8. Advance according to \`execution_cadence\` in \`.buildprint/snapshots/blueprint.yaml\` (default \`one_phase\`): \`one_phase\` stops after each phase, \`to_checkpoint\` runs through verification then final review, \`all_remaining\` runs every dependency-ready phase to completion. Stop only on a real blocker.
9. Before completion, run \`.buildprint/snapshots/04-review.md\` and write the handover described in \`.buildprint/snapshots/05-handover.md\`.

Whenever you stop, end your handover with this menu so the developer has a concrete choice (fill in real phase ids from \`03-phases/phase-index.yaml\`):

1. Continue one phase — implement the next phase only, then stop and show this menu again.
2. Continue to the next checkpoint — implement through verification, pausing only on a real blocker.
3. Do all remaining phases — implement every dependency-ready phase through final review/handover, stopping only on real blockers.
4. Stop here.

Rules:

- Do not read every phase upfront.
- Do not write, rewrite, or append to \`.buildprint/snapshots/**\`; snapshots are immutable downloaded package files.
- Project root/local \`AGENTS.md\` files belong in the implementation project and should be created from \`02-project-setup.md\`, not shipped in the packet.
- Keep claims scoped until the built product has been checked directly.
- Do not create proof theater; local checks and product review are useful only insofar as they catch real defects.
- Update \`.buildprint/state.json\`, \`.buildprint/progress.md\`, and this file before stopping.
- If blocked, update \`.buildprint/blockers.md\` with the real blocker and next repair route.
` : `# Next Agent Instructions

Start here.

1. Read \`.buildprint/snapshots/BUILDPRINT.md\` first.
2. Read \`.buildprint/source.json\` and \`.buildprint/state.json\` for local bootstrap/state context.
3. Follow \`BUILDPRINT.md\`'s Required Read Order, Phase Gates, and Acceptance Gates.
4. Continue current phase: \`00-alignment\`.

Rules:

- \`BUILDPRINT.md\` is the canonical start file and owns the required read order.
- Structured control files such as \`buildprint.json\` and \`phases.yaml\` are machine-readable mirrors only; do not treat them as competing instructions.
- Snapshot files were downloaded exactly from the manifest. Do not rewrite them manually.
- Update \`.buildprint/state.json\`, \`.buildprint/progress.md\`, and this file before stopping.
- If blocked, update \`.buildprint/blockers.md\`.
`)
  console.log(`✓ Created ${stateDir}`)
  console.log(`✓ Downloaded ${downloaded.length} snapshot files`)
  console.log('✓ Wrote source.json, state.json, progress.md, decisions.md, blockers.md, next-agent.md')
  console.log('\nNext: read .buildprint/next-agent.md')
}

if (args.length === 0 || isHelp(args[0])) usage(0)


if (args[0] === 'analyze') {
  console.error('agb analyze has been removed. Use an agent session with buildprints/buildprint-mapper-os/ for mapping.')
  process.exit(1)
}




if (args[0] === 'start') {
  if (isHelp(args[1])) usage(0)
  const manifest = args[1]
  const target = args[2] ?? cwd
  if (!manifest) usage(1)
  try {
    await startBuildprint(manifest, target)
    process.exit(0)
  } catch (error) {
    console.error(`Start failed: ${error.message}`)
    process.exit(1)
  }
}


if (args[0] === 'packet') {
  const sub = args[1]
  const ref = args[2]
  if (!sub || isHelp(sub)) usage(0)
  if (!ref) usage(1)
  try {
    if (sub === 'check') process.exit(await packetCheck(ref) ? 0 : 1)
    if (sub === 'next') { await packetNext(ref); process.exit(0) }
    throw new Error(`unknown packet subcommand: ${sub}`)
  } catch (error) {
    console.error(`Packet ${sub} failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'evidence') {
  const sub = args[1]
  const file = args[2]
  if (!sub || isHelp(sub)) usage(0)
  if (sub !== 'check' || !file) usage(1)
  try {
    process.exit(evidenceCheck(file) ? 0 : 1)
  } catch (error) {
    console.error(`Evidence check failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'map') {
  console.error('agb map has been removed.')
  console.error('Use an agent session with buildprints/buildprint-mapper-os/ to map a source project into a Buildprint.')
  process.exit(1)
}

// ─── Slice/Gate runner commands ───────────────────────────────────────────────

function findProjectRoot(start) {
  // Walk up from `start` until we find a dir that has either .buildprint/ or slices/ as a child.
  let current = path.resolve(start)
  for (let i = 0; i < 10; i++) {
    if (exists(path.join(current, '.buildprint')) || exists(path.join(current, 'slices'))) return current
    const parent = path.dirname(current)
    if (parent === current) break
    current = parent
  }
  return path.resolve(start)
}

function findPacketDir(projectDir) {
  const root = findProjectRoot(projectDir)
  const sourceJson = path.join(root, '.buildprint', 'source.json')
  if (exists(sourceJson)) {
    try {
      const data = readJsonFile(sourceJson)
      if (data.packet_dir && exists(data.packet_dir)) return data.packet_dir
    } catch { /* fall through */ }
  }
  for (const candidate of [
    path.join(root, 'packet'),
    path.join(root, '.buildprint', 'snapshots'),
    root,
  ]) {
    if (exists(path.join(candidate, 'blueprint.yaml'))) return candidate
  }
  return null
}

function findCapsuleDir(packetDir) {
  // Read capsules_dir from blueprint.yaml; resolve relative to packet. Fall back to common locations.
  const blueprint = safeReadText(path.join(packetDir, 'blueprint.yaml'))
  const capsulesDirField = (blueprint.match(/^\s*capsules_dir:\s*([^\s#]+)/m) || [])[1]
  const candidates = []
  if (capsulesDirField) candidates.push(path.resolve(packetDir, capsulesDirField))
  candidates.push(
    path.join(packetDir, 'teams'),
    path.join(packetDir, '..', 'teams'),
    path.join(packetDir, '..', '..', 'teams'),
  )
  for (const c of candidates) if (exists(c)) return c
  return null
}

function readYamlLite(file) {
  // Reuse safeReadText; returns raw text, callers extract what they need
  return safeReadText(file)
}

function yamlListField(text, key) {
  // Extract a YAML list field. Supports inline (paths: [a, b]) and block (paths:\n  - a\n  - b).
  // The block form stops at the next sibling key (^\w[\w-]*:) so it doesn't bleed into the next field.
  const inlineMatch = text.match(new RegExp(`^\\s*${key}:\\s*\\[([^\\]]+)\\]`, 'm'))
  if (inlineMatch) return inlineMatch[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
  const lines = text.split(/\r?\n/)
  const startIdx = lines.findIndex(line => new RegExp(`^\\s*${key}:\\s*$`).test(line))
  if (startIdx < 0) return []
  const items = []
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    const sibling = line.match(/^[A-Za-z_][\w-]*:/)
    if (sibling) break
    const itemMatch = line.match(/^\s+-\s+(\S+)/)
    if (itemMatch) items.push(itemMatch[1].trim().replace(/^['"]|['"]$/g, ''))
  }
  return items
}

function extractUxPathSection(uxText, pathIds) {
  const lines = uxText.split(/\r?\n/)
  let inPathMap = false
  const collected = []
  let currentId = null
  let currentBlock = []
  for (const line of lines) {
    if (/^##\s+Path Map/.test(line)) { inPathMap = true; continue }
    if (inPathMap && /^##\s/.test(line)) {
      if (currentId && pathIds.includes(currentId)) collected.push(...currentBlock)
      break
    }
    if (inPathMap) {
      const idMatch = line.match(/^\s+-\s+id:\s+(\S+)/)
      if (idMatch) {
        if (currentId && pathIds.includes(currentId)) collected.push(...currentBlock)
        currentId = idMatch[1]
        currentBlock = [line]
      } else if (currentBlock.length) {
        currentBlock.push(line)
      }
    }
  }
  if (currentId && pathIds.includes(currentId) && inPathMap) collected.push(...currentBlock)
  return collected.length ? collected.join('\n') : '(No matching paths found in ux-contract Path Map)'
}

function hashFileSync(filePath) {
  if (!exists(filePath)) return 'unknown'
  // Simple non-crypto hash for contract versioning (file content hash)
  const content = readText(filePath)
  let h = 0
  for (let i = 0; i < content.length; i++) { h = (Math.imul(31, h) + content.charCodeAt(i)) | 0 }
  return Math.abs(h).toString(16).padStart(8, '0')
}

function buildPersonaPrompt(sliceYamlPath, role, packetDir) {
  const sliceText = safeReadText(sliceYamlPath)
  const sliceId = (sliceText.match(/^id:\s*(\S+)/m) || [])[1] || path.basename(path.dirname(sliceYamlPath))
  const persona = role === 'acceptance' ? 'acceptance-hostile-reviewer' : ((sliceText.match(/^persona:\s*(\S+)/m) || [])[1] || 'ux-ui-craft')
  const paths = yamlListField(sliceText, 'paths')
  const coreProof = yamlListField(sliceText, 'core_proof_required')

  const capsuleDir = findCapsuleDir(packetDir)
  if (!capsuleDir) throw new Error(`Capsule directory not found. Looked at packetDir/teams, ../teams, ../../teams, and capsules_dir from blueprint.yaml. packetDir=${packetDir}`)
  const capsuleFile = path.join(capsuleDir, `${persona}.md`)
  const capsuleText = safeReadText(capsuleFile)
  if (!capsuleText) throw new Error(`Capsule file not found: ${capsuleFile}\nAvailable capsules in ${capsuleDir}: ${exists(capsuleDir) ? fs.readdirSync(capsuleDir).filter(f => f.endsWith('.md')).join(', ') : '(none)'}`)

  const archText = safeReadText(path.join(packetDir, '02-architecture.md'))
  const uxContractPath = path.join(packetDir, '03-ux-contract.md')
  const uxText = safeReadText(uxContractPath)
  const uxSections = uxText ? extractUxPathSection(uxText, paths) : '(03-ux-contract.md not found)'
  const contractVersion = hashFileSync(uxContractPath)

  const lines = [
    '## System Identity',
    '',
    capsuleText.trim(),
    '',
    '---',
    '',
    '## Required Reading',
    '',
    '### Architecture (02-architecture.md)',
    '',
    archText ? archText.slice(0, 2000) + (archText.length > 2000 ? '\n...(truncated — read full file)' : '') : '(02-architecture.md not found)',
    '',
    '### UX Contract paths for this slice (03-ux-contract.md)',
    '',
    uxSections,
    '',
    '---',
    '',
    '## Scope',
    '',
    `Slice: \`${sliceId}\``,
    `Role: \`${role}\``,
    `UX contract version: \`${contractVersion}\``,
    '',
    'Paths to implement/test:',
    ...paths.map(p => `  - \`${p}\`${coreProof.includes(p) ? '  [CORE PROOF REQUIRED]' : ''}`),
    '',
    'Core proof required (observed end-to-end, not proxied by sample or blocker):',
    ...coreProof.map(p => `  - \`${p}\``),
  ]

  if (role === 'build') {
    lines.push(
      '', '---', '',
      '## Self-Check Instruction',
      '',
      `Before handoff, produce \`slices/${sliceId}/slice-self-check.yaml\` with one row per Blocks entry: id, result (clean/violated/n.a.), note.`,
      '',
      '## State Rule',
      '',
      'Never write \`state.json\`. Never write \`acceptance-result.json\`. The runner derives state from your acceptance result.',
    )
  } else {
    lines.push(
      '', '---', '',
      '## Acceptance Output',
      '',
      `Write \`slices/${sliceId}/acceptance-result.json\`.`,
      'A blocked core_proof_required path makes the slice \`partial\`, not \`complete\`.',
      'Never write \`state.json\`.',
    )
  }

  return lines.join('\n')
}

function deriveState(projectDir, packetDir) {
  const blueprintText = safeReadText(path.join(packetDir, 'blueprint.yaml'))
  const posture = (blueprintText.match(/deployment_posture:[\s\S]*?^\s*current:\s*(\S+)/m) || [])[1] || 'trusted_local'
  const slicesDir = path.join(projectDir, 'slices')
  const gatesDir = path.join(packetDir, 'gates')
  const uxContractPath = path.join(packetDir, '03-ux-contract.md')
  const archPath = path.join(packetDir, '02-architecture.md')
  const contractHash = hashFileSync(uxContractPath)
  const archHash = hashFileSync(archPath)

  const slices = {}
  if (exists(slicesDir)) {
    for (const entry of fs.readdirSync(slicesDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name === '_template') continue
      const sliceId = entry.name
      const arPath = path.join(slicesDir, sliceId, 'acceptance-result.json')
      if (!exists(arPath)) {
        slices[sliceId] = { status: 'not-started', evidence: [], reasons: ['no acceptance-result.json'] }
        continue
      }
      let result
      try { result = readJsonFile(arPath) } catch (e) {
        slices[sliceId] = { status: 'fail', evidence: [arPath], reasons: [`invalid JSON: ${e.message}`] }
        continue
      }
      const fileHash = result.contract_version || ''
      if (fileHash && fileHash !== contractHash) {
        slices[sliceId] = { status: 'stale', evidence: [arPath], reasons: [`contract changed (was ${fileHash}, now ${contractHash})`] }
        continue
      }
      const overall = result.overall_slice_status || ''
      const paths = result.paths || []
      if (overall === 'complete') {
        const badCore = paths.filter(p => p.is_core_proof && !p.upgrades_claim).map(p => `${p.path_id} missing upgrades_claim:true`)
        slices[sliceId] = badCore.length
          ? { status: 'partial', evidence: [arPath], reasons: badCore }
          : { status: 'complete', evidence: [arPath], reasons: [] }
      } else if (overall === 'partial') {
        const reasons = paths.filter(p => p.is_core_proof && p.status !== 'pass').map(p => `${p.path_id}: ${p.observed || 'blocked'}`)
        slices[sliceId] = { status: 'partial', evidence: [arPath], reasons: reasons.length ? reasons : [result.reason || 'partial'] }
      } else if (overall === 'fail') {
        slices[sliceId] = { status: 'fail', evidence: [arPath], reasons: [result.reason || 'failed'] }
      } else {
        slices[sliceId] = { status: 'partial', evidence: [arPath], reasons: ['unknown overall_slice_status'] }
      }
    }
  }

  const gates = {}
  const gateIndexPath = path.join(gatesDir, 'gate-index.yaml')
  if (exists(gateIndexPath)) {
    const gateText = readText(gateIndexPath)
    const gateBlocks = [...gateText.matchAll(/^\s*-\s+id:\s+(\S+)([\s\S]*?)(?=^\s*-\s+id:|\Z)/gm)]
    for (const [, gateId, block] of gateBlocks) {
      const activePostures = (block.match(/active_when_posture:\s*\[([^\]]+)\]/) || [])[1]?.split(',').map(s => s.trim()) || []
      const requiresSignoff = /requires_human_signoff:\s*true/i.test(block)
      const resultPath = path.join(projectDir, 'gates', gateId, 'result.json')
      if (!activePostures.includes(posture)) {
        gates[gateId] = { status: 'inactive', inactive_reason: `${posture} posture`, signoff: null }
        continue
      }
      if (!exists(resultPath)) {
        gates[gateId] = { status: 'pending', inactive_reason: null, signoff: null }
        continue
      }
      let gResult
      try { gResult = readJsonFile(resultPath) } catch (e) {
        gates[gateId] = { status: 'failed', inactive_reason: null, signoff: `invalid JSON: ${e.message}` }
        continue
      }
      if (gResult.status === 'inactive') {
        gates[gateId] = { status: 'inactive', inactive_reason: gResult.inactive_reason || 'not specified', signoff: null }
      } else if (gResult.status === 'passed') {
        if (requiresSignoff && (!gResult.signoff_by || ['agent', 'auto', 'generated', ''].includes(gResult.signoff_by.toLowerCase()))) {
          gates[gateId] = { status: 'failed', inactive_reason: null, signoff: `requires human signoff but signoff_by='${gResult.signoff_by}'` }
        } else {
          gates[gateId] = { status: 'passed', inactive_reason: null, signoff: gResult.signoff_by || 'auto-test' }
        }
      } else {
        gates[gateId] = { status: gResult.status || 'pending', inactive_reason: null, signoff: null }
      }
    }
  }

  const allComplete = Object.values(slices).length > 0 && Object.values(slices).every(s => s.status === 'complete')
  const allGatesOk = Object.values(gates).every(g => ['passed', 'inactive'].includes(g.status))
  const overall = Object.values(slices).length === 0 ? 'not-started' : (allComplete && allGatesOk ? 'complete' : 'partial')

  return {
    schema_version: '2',
    posture,
    slices,
    gates,
    overall_status: overall,
    contract_versions: { '03-ux-contract.md': contractHash, '02-architecture.md': archHash },
    derived_at: new Date().toISOString(),
    derived_by: 'agb state derive',
  }
}

function runDriftChecks(projectDir, packetDir) {
  const results = []
  const ok = (id, pass, reason = '') => results.push({ id, pass, reason })
  const slicesDir = path.join(projectDir, 'slices')
  const uxContractPath = path.join(packetDir, '03-ux-contract.md')
  const uxText = safeReadText(uxContractPath)
  const stateJsonPath = path.join(projectDir, '.buildprint', 'state.json')

  // no-slice-without-path-map
  if (exists(slicesDir)) {
    const missing = fs.readdirSync(slicesDir, { withFileTypes: true })
      .filter(e => e.isDirectory() && e.name !== '_template' && !exists(path.join(slicesDir, e.name, 'slice.yaml')))
      .map(e => e.name)
    ok('no-slice-without-path-map', missing.length === 0, missing.length ? `Missing slice.yaml: ${missing.join(', ')}` : '')
  } else {
    ok('no-slice-without-path-map', true, 'SKIP: no slices/ directory')
  }

  // every-path-id-traces
  if (uxText && exists(slicesDir)) {
    const knownIds = new Set([...uxText.matchAll(/^\s*-\s+id:\s+(\S+)/gm)].map(m => m[1]))
    const unknown = []
    for (const e of fs.readdirSync(slicesDir, { withFileTypes: true })) {
      if (!e.isDirectory() || e.name === '_template') continue
      const st = safeReadText(path.join(slicesDir, e.name, 'slice.yaml'))
      for (const pid of yamlListField(st, 'paths')) {
        if (!knownIds.has(pid)) unknown.push(`${e.name}/${pid}`)
      }
    }
    ok('every-path-id-traces', unknown.length === 0, unknown.length ? `Unknown path ids: ${unknown.join(', ')}` : '')
  } else {
    ok('every-path-id-traces', true, 'SKIP: ux-contract or slices/ not found')
  }

  // operator-acceptance-present
  if (uxText) {
    const operatorRows = [...uxText.matchAll(/ux_ac_id:\s+(\S+)[\s\S]*?sample_can_satisfy:\s*false/g)].map(m => m[1])
    ok('operator-acceptance-present', operatorRows.length > 0, operatorRows.length ? '' : 'No OPERATOR acceptance rows (sample_can_satisfy: false) in ux-contract')
  } else {
    ok('operator-acceptance-present', true, 'SKIP: 03-ux-contract.md not found')
  }

  // no-state-self-write
  if (exists(stateJsonPath)) {
    let derivedBy = ''
    try { derivedBy = readJsonFile(stateJsonPath).derived_by || '' } catch { /* */ }
    ok('no-state-self-write', derivedBy.includes('agb state derive'), derivedBy.includes('agb') ? '' : `state.json derived_by='${derivedBy}'; must be 'agb state derive'`)
  } else {
    ok('no-state-self-write', true, 'SKIP: state.json not found')
  }

  // contract-version-current
  if (uxText && exists(slicesDir)) {
    const currentHash = hashFileSync(uxContractPath)
    const stale = []
    for (const f of walk(slicesDir).filter(f => f.endsWith('acceptance-result.json'))) {
      try {
        const data = readJsonFile(f)
        if (data.contract_version && data.contract_version !== currentHash) stale.push(path.relative(slicesDir, path.dirname(f)))
      } catch { /* */ }
    }
    ok('contract-version-current', stale.length === 0, stale.length ? `Stale acceptance results: ${stale.join(', ')}` : '')
  } else {
    ok('contract-version-current', true, 'SKIP')
  }

  // no-fake-provider
  const fakePatterns = /simulate_success|fake_provider|mock_llm|hardcoded_response/i
  const nonTestFiles = walk(projectDir).filter(f =>
    /\.(py|js|ts|vue|svelte)$/.test(f) &&
    !f.includes('/tests/') && !f.includes('/test/') && !f.includes('node_modules') && !f.includes('.buildprint')
  )
  const fakeMatches = nonTestFiles.filter(f => fakePatterns.test(safeReadText(f))).map(f => path.relative(projectDir, f))
  ok('no-fake-provider', fakeMatches.length === 0, fakeMatches.length ? `Possible fake provider in: ${fakeMatches.slice(0, 5).join(', ')}` : '')

  // no-plaintext-secrets
  const secretPattern = /sk-[A-Za-z0-9]{20,}|api_key\s*=\s*['"][A-Za-z0-9]{8,}/
  const secretMatches = walk(projectDir).filter(f =>
    !/\.env($|\.example)|fixture|test_data/.test(f) && !f.includes('node_modules') && !f.includes('.git') && !f.includes('.buildprint') && /\.(env|json|yaml|yml|py|js|ts)$/.test(f)
  ).filter(f => secretPattern.test(safeReadText(f))).map(f => path.relative(projectDir, f))
  ok('no-plaintext-secrets', secretMatches.length === 0, secretMatches.length ? `Possible secrets in: ${secretMatches.slice(0, 5).join(', ')}` : '')

  return results
}

if (args[0] === 'persona') {
  if (isHelp(args[1])) usage(0)
  const sliceArg = optionValue('--slice')
  const roleArg = optionValue('--role')
  const packetDirArg = optionValue('--packet-dir')
  if (!sliceArg || !roleArg) {
    console.error('Usage: agb persona --slice <slice-yaml> --role build|acceptance [--packet-dir <path>]')
    process.exit(1)
  }
  if (!['build', 'acceptance'].includes(roleArg)) {
    console.error('--role must be build or acceptance')
    process.exit(1)
  }
  const slicePath = path.resolve(cwd, sliceArg)
  if (!exists(slicePath)) { console.error(`slice.yaml not found: ${slicePath}`); process.exit(1) }
  const resolvedPacketDir = packetDirArg
    ? path.resolve(cwd, packetDirArg)
    : findPacketDir(cwd) || findPacketDir(path.dirname(slicePath)) || (() => { console.error('Cannot find packet dir. Pass --packet-dir'); process.exit(1) })()
  try {
    console.log(buildPersonaPrompt(slicePath, roleArg, resolvedPacketDir))
    process.exit(0)
  } catch (error) {
    console.error(`persona failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'state') {
  const sub = args[1]
  if (!sub || isHelp(sub)) usage(0)
  if (sub !== 'derive') { console.error(`unknown state subcommand: ${sub}`); process.exit(1) }
  const projectDirArg = optionValue('--project-dir') || cwd
  const packetDirArg = optionValue('--packet-dir')
  const projectDir = path.resolve(cwd, projectDirArg)
  const packetDir = packetDirArg
    ? path.resolve(cwd, packetDirArg)
    : findPacketDir(projectDir) || (() => { console.error('Cannot find packet dir. Pass --packet-dir'); process.exit(1) })()
  try {
    const state = deriveState(projectDir, packetDir)
    const outPath = path.join(projectDir, '.buildprint', 'state.json')
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    writeJson(outPath, state)
    console.log(`✓ state.json written to ${outPath}`)
    console.log(`  Overall status: ${state.overall_status}`)
    const partials = Object.entries(state.slices).filter(([, v]) => v.status !== 'complete' && v.status !== 'not-started')
    if (partials.length) console.log(`  Partial/blocked: ${partials.map(([k]) => k).join(', ')}`)
    process.exit(0)
  } catch (error) {
    console.error(`state derive failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'drift') {
  const sub = args[1]
  if (!sub || isHelp(sub)) usage(0)
  if (sub !== 'check') { console.error(`unknown drift subcommand: ${sub}`); process.exit(1) }
  const projectDirArg = optionValue('--project-dir') || cwd
  const packetDirArg = optionValue('--packet-dir')
  const projectDir = path.resolve(cwd, projectDirArg)
  const packetDir = packetDirArg
    ? path.resolve(cwd, packetDirArg)
    : findPacketDir(projectDir) || projectDir
  try {
    const results = runDriftChecks(projectDir, packetDir)
    let failed = 0
    for (const r of results) {
      const sym = r.pass ? '✓' : '✗'
      console.log(`${sym} ${r.pass ? 'PASS' : 'FAIL'} ${r.id}${r.reason ? `  — ${r.reason}` : ''}`)
      if (!r.pass) failed++
    }
    console.log(`\ndrift check: ${failed ? 'FAIL' : 'PASS'} (${failed} rule${failed === 1 ? '' : 's'} violated)`)
    process.exit(failed ? 1 : 0)
  } catch (error) {
    console.error(`drift check failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'slice') {
  const sub = args[1]
  if (!sub || isHelp(sub)) usage(0)
  if (sub !== 'status') { console.error(`unknown slice subcommand: ${sub}`); process.exit(1) }
  const projectDirArg = optionValue('--project-dir') || cwd
  const projectDir = path.resolve(cwd, projectDirArg)
  const stateFile = path.join(projectDir, '.buildprint', 'state.json')
  if (!exists(stateFile)) {
    console.error(`state.json not found at ${stateFile}\nRun: agb state derive`)
    process.exit(1)
  }
  try {
    const state = readJsonFile(stateFile)
    const line = '─'.repeat(60)
    console.log(`\nSlice status  (derived ${state.derived_at || 'unknown'})`)
    console.log(line)
    for (const [id, s] of Object.entries(state.slices || {})) {
      const sym = s.status === 'complete' ? '✓' : s.status === 'not-started' ? '○' : '✗'
      const reason = s.reasons?.length ? `  — ${s.reasons[0]}` : ''
      console.log(`${sym} ${id.padEnd(36)} ${s.status}${reason}`)
    }
    console.log(`\nGate status`)
    console.log(line)
    for (const [id, g] of Object.entries(state.gates || {})) {
      const sym = g.status === 'passed' ? '✓' : g.status === 'inactive' ? '~' : '✗'
      const note = g.inactive_reason ? `(${g.inactive_reason})` : (g.signoff ? `(signed: ${g.signoff})` : '')
      console.log(`${sym} ${id.padEnd(36)} ${g.status} ${note}`)
    }
    console.log(`\nOverall: ${state.overall_status?.toUpperCase() || 'UNKNOWN'}`)
    process.exit(state.overall_status === 'complete' ? 0 : 1)
  } catch (error) {
    console.error(`slice status failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'check') {
  if (isHelp(args[1])) usage(0)
  const folder = args[1]
  if (!folder) usage(1)
  try {
    const code = optionValue('--code')
    const ok = printResults(checkBlueprint(folder, { code }))
    process.exit(ok ? 0 : 1)
  } catch (error) {
    console.error(`Check failed: ${error.message}`)
    process.exit(1)
  }
}
usage(1)
