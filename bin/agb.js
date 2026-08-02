#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { checkBlueprint, printBlueprintResults } from '../src/blueprint/blueprint-check.js'
import { evidenceCheck } from '../src/evidence/evidence-ledger.js'
import { harnessCheckResult, harnessInit, printHarnessResult } from '../src/harness/local-harness.js'
import { architectureUiStackChecks, centralOutputInstantiationChecks, claimChecks, designSystemChecks, hardStopDecisionChecks, phaseProofChecks, uiEvidenceChecks } from '../src/product-proof-checks.js'

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

function optionValues(...flags) {
  const values = []
  for (let i = 0; i < args.length; i++) {
    const value = args[i]
    if (!flags.includes(value)) continue
    const next = args[i + 1]
    if (!next || next.startsWith('--')) throw new Error(`missing value for ${value}`)
    values.push(...next.split(',').map((item) => item.trim()).filter(Boolean))
    i++
  }
  return values
}

function positionalArgs(startIndex = 0) {
  const positional = []
  for (let i = startIndex; i < args.length; i++) {
    const value = args[i]
    if (value.startsWith('--')) {
      if ((value === '--agent' || value === '--provider' || value === '--profile' || value === '--profiles') && args[i + 1] && !args[i + 1].startsWith('--')) i++
      continue
    }
    positional.push(value)
  }
  return positional
}

function usage(exitCode = 0) {
  console.log(`Agent Buildprint

Usage:
  agb check <blueprint-folder> [--code <generated-code-folder>]
  agb start <buildprint-package-json-url-or-file> [target-folder]
  agb packet check <packet-folder-or-package-json-url>
  agb packet next <packet-folder-or-build-state-folder>
  agb harness init [project-folder] [--provider agents|codex|claude|cline|cursor|all] [--profile default|webapp|backend|agentic|full] [--profiles webapp,backend] [--json]
  agb harness check [project-folder] [--provider agents|codex|claude|cline|cursor|all] [--profile default|webapp|backend|agentic|full] [--profiles webapp,backend] [--json]
  agb harness checkup [project-folder] [--provider agents|codex|claude|cline|cursor|all] [--profile default|webapp|backend|agentic|full] [--profiles webapp,backend] [--json]
  agb evidence check <evidence-ledger-jsonl>
  agb verify ui [project-folder]
  agb claim check [project-folder]
  agb check:design-quality-lift [project-folder]

Examples:
  agb check ./my-buildprint
  agb check ./my-buildprint --code ./my-agent
  agb start https://agent-buildprint.com/buildprints/ai-influencer-os/package.json ./my-build
  agb packet check ./buildprints/buildprint-mapper-os
  agb packet next ./buildprints/buildprint-mapper-os
  agb harness init .
  agb harness check .
  agb harness checkup .
  agb evidence check .buildprint/evidence/evidence-ledger.jsonl
  agb verify ui .
  agb verify ui /path/to/my-build
  agb claim check .
  agb check:design-quality-lift .

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
  return /^(https?:\/\/|file:\/\/)/i.test(value)
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

function isCapabilityPacket(dir) {
  const capabilityFile = path.join(dir, 'capability.yaml')
  if (!exists(capabilityFile)) return false
  const capability = safeReadText(capabilityFile)
  if (/type:\s*capability-standard/i.test(capability)) return false
  return /schema:\s*agent-buildprint\/capability\.v0/i.test(capability) ||
    /type:\s*capability(?!-standard)/i.test(capability)
}

function isBuildprintAuthorPacket(dir) {
  const authorFile = path.join(dir, 'author.yaml')
  if (!exists(authorFile)) return false
  const author = safeReadText(authorFile)
  return /type:\s*buildprint-author/i.test(author) ||
    /schema:\s*agent-buildprint\/author\.v0/i.test(author)
}

function isMapperOsRoot(dir) {
  return exists(path.join(dir, 'buildprint.json')) &&
    exists(path.join(dir, 'templates', 'executable-packet', 'blueprint.yaml'))
}

function yamlScalar(text, key) {
  const match = text.match(new RegExp(`^\\s*${key}:\\s*([^\\n#]+)`, 'mi'))
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : ''
}

function yamlListItems(text, key) {
  const lines = text.split(/\r?\n/)
  const index = lines.findIndex((line) => new RegExp(`^\\s*${escapeRegExp(key)}:\\s*$`, 'i').test(line))
  if (index < 0) return []
  const keyIndent = (lines[index].match(/^\s*/) || [''])[0].length
  const items = []
  for (let i = index + 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim() || /^\s*#/.test(line)) continue
    const indent = (line.match(/^\s*/) || [''])[0].length
    if (indent <= keyIndent && /^\s*[\w.-]+:/.test(line)) break
    const item = line.match(/^\s*-\s*(.+?)\s*(?:#.*)?$/)
    if (item) items.push(item[1].trim().replace(/^['"]|['"]$/g, ''))
  }
  return items
}

function yamlSection(text, key) {
  const lines = text.split(/\r?\n/)
  const index = lines.findIndex((line) => new RegExp(`^\\s*${escapeRegExp(key)}:\\s*$`, 'i').test(line))
  if (index < 0) return ''
  const keyIndent = (lines[index].match(/^\s*/) || [''])[0].length
  const collected = []
  for (let i = index + 1; i < lines.length; i++) {
    const line = lines[i]
    const indent = (line.match(/^\s*/) || [''])[0].length
    if (line.trim() && indent <= keyIndent && /^\s*[\w.-]+:/.test(line)) break
    collected.push(line)
  }
  return collected.join('\n')
}

function yamlListItemsInSection(text, sectionKey, listKey) {
  return yamlListItems(yamlSection(text, sectionKey), listKey)
}

function normalizedCapabilityItem(value) {
  return String(value || '').toLowerCase().replace(/[`'"]/g, '').replace(/\s+/g, ' ').trim()
}

function hasGenericPlaceholder(value) {
  return /<[a-z][a-z0-9_.\s-]*>|\bplaceholder\b|\bTODO\b|\bTBD\b|\blorem ipsum\b|\bmapped artifact\b|\bcentral surface\b|\bgeneric capability\b|\bexample[-_]|domain\.specific_capability|detected-host-framework|Replace this example/i.test(String(value || ''))
}

function yamlListHasConcreteItems(text, key) {
  const items = yamlListItems(text, key)
  return items.length > 0 && items.every((item) => !hasGenericPlaceholder(item))
}

function listItemsOverlap(left, right) {
  const normalizedLeft = left.map(normalizedCapabilityItem).filter(Boolean)
  const normalizedRight = right.map(normalizedCapabilityItem).filter(Boolean)
  return normalizedLeft.some((a) => normalizedRight.some((b) => a === b || a.includes(b) || b.includes(a)))
}

function capabilityRequirementsAlign(requiredItems, expectedItems) {
  const normalizedRequired = requiredItems.map(normalizedCapabilityItem).filter(Boolean)
  const normalizedExpected = expectedItems.map(normalizedCapabilityItem).filter(Boolean)
  if (!normalizedRequired.length || !normalizedExpected.length) return true
  for (const required of normalizedRequired) {
    if (/\s+or\s+/.test(required) && !normalizedExpected.includes(required)) return false
  }
  return listItemsOverlap(normalizedRequired, normalizedExpected)
}

function isCredentialCapability(capability, buildprint, publication) {
  const name = `${yamlScalar(capability, 'name')} ${yamlScalar(capability, 'capability')}`
  if (/(api[-_\s]?key|token|secret|credential)/i.test(name)) return true
  return /api[-_\s]?key management|token management|secret management|credential management/i.test(`${buildprint}\n${publication}`)
}

function isSecureRagCapability(capability, buildprint, publication) {
  const identity = `${yamlScalar(capability, 'name')} ${yamlScalar(capability, 'capability')} ${yamlScalar(capability, 'title')} ${yamlScalar(capability, 'description')}`
  return /(secure[-_\s]?hybrid[-_\s]?rag|secure[-_\s]?rag|hybrid[-_\s]?rag|rights-aware hybrid retrieval|ai\.secure-hybrid-rag-mcp)/i.test(identity)
}

function isAgenticChatEvalCapability(capability, buildprint, publication) {
  const identity = `${yamlScalar(capability, 'name')} ${yamlScalar(capability, 'capability')} ${yamlScalar(capability, 'title')} ${yamlScalar(capability, 'description')} ${publication}`
  return /agentic[-_\s]?chat/i.test(identity) && /eval|harness|evaluation/i.test(identity)
}

function isDesignQualityLiftCapability(capability, buildprint, publication) {
  const identity = `${yamlScalar(capability, 'name')} ${yamlScalar(capability, 'capability')} ${yamlScalar(capability, 'title')} ${yamlScalar(capability, 'description')} ${publication}`
  return /design[-_\s]?quality[-_\s]?lift|design[-_\s]?taste|design[-_\s]?enhancement/i.test(identity)
}

function isEvolutionaryCodingRuntimeCapability(capability, buildprint, publication) {
  const identity = `${yamlScalar(capability, 'name')} ${yamlScalar(capability, 'capability')} ${yamlScalar(capability, 'title')} ${yamlScalar(capability, 'description')} ${publication}`
  return /evolutionary[-_\s]?coding[-_\s]?agent|evolutionary[-_\s]?coding[-_\s]?runtime|alphaevolve|codeevolve|agents\.evolutionary_coding_runtime/i.test(identity)
}

function hasDiscoveryDecisionGate(text) {
  return /infer safely/i.test(text) &&
    /patch locally/i.test(text) &&
    /must ask user/i.test(text) &&
    /out of scope/i.test(text) &&
    /decision/i.test(text) &&
    /block/i.test(text)
}

function hasAssessmentReconciliation(text) {
  return /reconcile|reconciliation/i.test(text) &&
    /host-assessment\.md/i.test(text) &&
    /capability-plan\.md/i.test(text) &&
    /baseline|assumption|hard-stop|blocker/i.test(text) &&
    /downgrade|claim ceiling|partial|blocked/i.test(text)
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

function capabilityPacketCheckResults(dir) {
  const checks = []
  const ok = (label, pass, detail = '') => checks.push({ label, pass, detail })
  const files = new Set(packetFiles(dir))
  const allFiles = Array.from(files)

  const capability = safeReadText(path.join(dir, 'capability.yaml'))
  const buildprint = safeReadText(path.join(dir, 'BUILDPRINT.md'))
  const apply = safeReadText(path.join(dir, 'apply.md'))
  const verify = safeReadText(path.join(dir, 'verify.md'))
  const compatibility = safeReadText(path.join(dir, 'compatibility.md'))
  const publication = safeReadText(path.join(dir, 'publication.json'))
  const loopFiles = [
    'loops/loop-flow.md',
    'loops/01-contract-and-config.md',
    'loops/02-core-integration.md',
    'loops/03-host-wiring.md',
    'loops/04-operator-surface.md',
  ]
  const requiredFiles = [
    'BUILDPRINT.md',
    'README.md',
    'capability.yaml',
    'compatibility.md',
    '00-goal.md',
    '01-host.md',
    'review.md',
    'verify.md',
    ...loopFiles,
  ]
  const loopTexts = loopFiles.map((file) => safeReadText(path.join(dir, file)))
  const goal = safeReadText(path.join(dir, '00-goal.md'))
  const host = safeReadText(path.join(dir, '01-host.md'))
  const reviewCap = safeReadText(path.join(dir, 'review.md'))
  const combinedCapabilityText = [capability, buildprint, apply, verify, compatibility, publication, goal, host, reviewCap, ...loopTexts].join('\n')
  const requiredCapabilityItems = yamlListItemsInSection(capability, 'requires', 'existing_capabilities')
  const expectedCapabilityItems = yamlListItemsInSection(capability, 'composition', 'expects')
  const credentialCapability = isCredentialCapability(capability, buildprint, publication)
  const secureRagCapability = isSecureRagCapability(capability, buildprint, publication)
  const agenticChatEvalCapability = isAgenticChatEvalCapability(capability, buildprint, publication)
  const designQualityLiftCapability = isDesignQualityLiftCapability(capability, buildprint, publication)
  const evolutionaryCodingRuntimeCapability = isEvolutionaryCodingRuntimeCapability(capability, buildprint, publication)

  for (const file of requiredFiles) ok(`capability file exists: ${file}`, files.has(file))
  ok('capability packet has no product-only blueprint router', !files.has('blueprint.yaml') && !files.has('03-phases/phase-index.yaml'))
  ok('capability packet avoids obsolete routers/files recursively', !allFiles.some(packetHasObsoleteRouter))

  ok('capability.yaml declares v0 schema', /schema:\s*agent-buildprint\/capability\.v0/i.test(capability))
  ok('capability.yaml declares type capability', /type:\s*capability/i.test(capability))
  ok('capability.yaml has stable kebab-case name', /^[a-z0-9][a-z0-9-]{1,80}$/.test(yamlScalar(capability, 'name')))
  ok('capability.yaml declares dotted capability id', /^[a-z][a-z0-9_.-]*\.[a-z0-9_.-]+$/i.test(yamlScalar(capability, 'capability')))
  ok('capability.yaml declares execution profile', /execution_profile:\s*(light|guarded|strict)/i.test(capability))
  ok('capability.yaml declares host frameworks', yamlListHasConcreteItems(capability, 'host_frameworks'))
  ok('capability.yaml has no generic placeholder values',
    !hasGenericPlaceholder(yamlScalar(capability, 'name')) &&
    !hasGenericPlaceholder(yamlScalar(capability, 'capability')) &&
    !hasGenericPlaceholder(yamlScalar(capability, 'description')) &&
    !hasGenericPlaceholder(yamlSection(capability, 'risk')) &&
    !hasGenericPlaceholder(yamlSection(capability, 'failure_modes')) &&
    !hasGenericPlaceholder(yamlSection(capability, 'verify')) &&
    !hasGenericPlaceholder(yamlSection(capability, 'evidence'))
  )
  ok('capability.yaml declares claim proof ceiling', /claim_status:\s*(unproven|fixture_proven|host_proven|blocked)/i.test(capability))
  ok('capability.yaml declares host detection signals', /host_detection:\s*\n[\s\S]*(package_files|route_signals|auth_signals|database_signals):/i.test(capability))
  ok('capability.yaml declares existing capabilities or human decisions', /requires:\s*\n[\s\S]*(existing_capabilities|human_decisions|env):/i.test(capability))
  ok('capability.yaml declares touched surfaces', yamlListItems(capability, 'touches').length >= 3)
  ok('capability.yaml declares apply inspect and steps', /apply:\s*\n[\s\S]*inspect:\s*\n[\s\S]*steps:/i.test(capability))
  ok('capability.yaml declares forbidden apply actions', /apply:\s*\n[\s\S]*forbidden:/i.test(capability))
  ok('capability.yaml declares verify commands and runtime checks', /verify:\s*\n[\s\S]*commands:\s*\n[\s\S]*runtime_checks:/i.test(capability))
  ok('capability.yaml declares blocked checks', /blocked_checks:/i.test(capability))
  ok('capability.yaml declares risk level and reason', /risk:\s*\n[\s\S]*level:\s*(low|medium|high|critical)/i.test(capability) && /reason:/i.test(capability))
  ok('capability.yaml declares failure modes', yamlListItems(capability, 'failure_modes').length >= 3)
  ok('capability.yaml declares composition expectations/provides/conflicts', /composition:\s*\n[\s\S]*(expects|provides):/i.test(capability) && /conflicts_with:/i.test(capability))
  if (requiredCapabilityItems.length && expectedCapabilityItems.length) {
    ok('capability.yaml keeps requires.existing_capabilities aligned with composition.expects', capabilityRequirementsAlign(requiredCapabilityItems, expectedCapabilityItems))
  }

  ok('BUILDPRINT identifies bounded capability, not whole product', /bounded capability|not a whole-product/i.test(buildprint) && !/Product Buildprint builds a whole/i.test(buildprint))
  ok('BUILDPRINT enforces kernel capability read order', /BUILDPRINT\.md[\s\S]*capability\.yaml[\s\S]*00-goal\.md[\s\S]*01-host\.md[\s\S]*loops\/[\s\S]*review\.md[\s\S]*verify\.md/i.test(buildprint))
  ok('BUILDPRINT forbids implementation before goal and host', /No source edits before|must not make source edits before/i.test(buildprint) && /00-goal|01-host|host assessment|goal/i.test(buildprint))
  ok('capability packet requires discovery decision gate', hasDiscoveryDecisionGate(`${buildprint}\n${host}\n${apply}`))
  ok('capability packet requires goal hard-stops', /Hard-stop questions/i.test(goal) && /Assumable defaults/i.test(goal) && /Deferrable questions/i.test(goal))
  ok('capability packet requires proof reconciliation and claim downgrade', hasAssessmentReconciliation(`${verify}\n${host}\n${reviewCap}\n${buildprint}`))

  ok('compatibility names host signals and block conditions', /host app|host project/i.test(compatibility) && /block|blocked|must not proceed/i.test(compatibility))
  ok('apply or host requires goal → loops → review → verify order', /00-goal\.md[\s\S]*loops\/[\s\S]*review\.md[\s\S]*verify\.md/i.test(`${apply}\n${host}\n${buildprint}`))
  ok('apply forbids over-broad rewrites', /bounded|Do not redesign|Do not.*whole/i.test(apply))
  ok('verify defines structural/runtime/blocker checks', /Required structural checks/i.test(verify) && /Runtime checks/i.test(verify) && /Blocked checks/i.test(verify))
  ok('verify requires receipt before success claim', /capability-receipt\.md/i.test(verify) && /Pass condition/i.test(verify))
  ok('verify blocks overclaiming by requiring not-proven or blocked evidence', /not[- ]proven|blocked checks|blockers/i.test(verify) && /proof level/i.test(verify))

  if (credentialCapability) {
    ok('credential apply forbids plaintext secrets', /Do not store plaintext|plaintext API keys|plaintext|plain text/i.test(apply))
    ok('credential capability forbids plaintext/recoverable secret storage', /plaintext|plain text/i.test(combinedCapabilityText) && /(not plaintext|no plaintext|forbid|forbidden|do not store plaintext|not reversible|non-reversible)/i.test(combinedCapabilityText))
    ok('credential capability requires one-time secret disclosure', /one[- ]time|only once|shown once|visible only at creation/i.test(combinedCapabilityText))
    ok('credential capability requires keyed or host-approved versioned hash material', /(keyed|hmac|pepper|host-approved)[\s\S]{0,80}(hash|digest)|hash[\s\S]{0,80}(version|versioned)/i.test(combinedCapabilityText))
    ok('credential capability.yaml requires keyed/versioned or host-approved hash material', /(keyed|hmac|pepper|host-approved)[\s\S]{0,80}(hash|digest)|hash[\s\S]{0,80}(version|versioned)/i.test(capability))
    ok('credential capability requires high-entropy prefix and collision handling when prefixes are used', /prefix/i.test(combinedCapabilityText) && /high[- ]entropy|enough entropy|collision retry|unique-constraint retry|collision handling/i.test(combinedCapabilityText))
    ok('credential capability.yaml requires high-entropy prefix and collision handling when prefixes are used', /prefix/i.test(capability) && /high[- ]entropy|enough entropy|collision retry|unique-constraint retry|collision handling/i.test(capability))
    ok('credential capability proves full-secret verification after prefix lookup', /valid[- ]prefix\/wrong[- ]secret|valid prefix with wrong secret|wrong secret body/i.test(combinedCapabilityText))
    ok('credential capability.yaml proves full-secret verification after prefix lookup', /valid[- ]prefix\/wrong[- ]secret|valid prefix with wrong secret|wrong secret body/i.test(capability))
    ok('credential verify.md proves full-secret verification after prefix lookup', /valid[- ]prefix\/wrong[- ]secret|valid prefix with wrong secret|wrong secret body/i.test(verify))
  }

  if (secureRagCapability) {
    ok('secure RAG capability requires pre-retrieval authorization',
      /pre[- ]retrieval authorization|access control happens before retrieval|authorized corpus is computed before/i.test(combinedCapabilityText))
    ok('secure RAG capability forbids post-retrieval filtering as security boundary',
      /post[- ]retrieval filtering/i.test(combinedCapabilityText) && /(invalid|not the security boundary|not.*primary security mechanism|forbidden)/i.test(combinedCapabilityText))
    ok('secure RAG capability requires shared vector and keyword authorization filter',
      /(vector|dense)[\s\S]{0,120}(keyword|full-text)[\s\S]{0,160}(same|shared|equivalent)[\s\S]{0,120}(authorization|auth|filter|boundary)|same[\s\S]{0,120}(authorization|auth|filter|boundary)[\s\S]{0,160}(vector|dense)[\s\S]{0,120}(keyword|full-text)/i.test(combinedCapabilityText))
    ok('secure RAG capability proves allow and deny retrieval paths',
      /allowed subject|allowed retrieval|authorized users/i.test(verify) && /denied subject|denied retrieval|unauthorized users|denied path/i.test(verify))
    ok('secure RAG capability requires cited generation and weak-evidence uncertainty',
      /citation|citations|cited/i.test(combinedCapabilityText) && /uncertainty|weak evidence|unsupported/i.test(combinedCapabilityText))
    ok('secure RAG capability covers deletion and reindex lifecycle',
      /reindex/i.test(combinedCapabilityText) && /delete|deletion|invalidate/i.test(combinedCapabilityText))
    ok('secure RAG capability forbids raw sensitive context logging by default',
      /(do not log|must not log|forbid|forbidden)[\s\S]{0,120}(raw|sensitive)[\s\S]{0,80}(chunk|content|context)|raw sensitive[\s\S]{0,80}(logging|logs)[\s\S]{0,80}(default)/i.test(combinedCapabilityText))
  }

  if (agenticChatEvalCapability) {
    ok('agentic chat eval requires trace-aware scenario harness',
      /scenario/i.test(combinedCapabilityText) && /trace|span/i.test(combinedCapabilityText) && /scenario-based|scenario runner|scenario fixtures/i.test(combinedCapabilityText))
    ok('agentic chat eval forbids final-answer-only grading',
      /final[- ]answer[- ]only|score only final|grade only the final answer|No pass from final text alone/i.test(combinedCapabilityText))
    ok('agentic chat eval requires tool side-effect proof',
      /tool|action/i.test(combinedCapabilityText) && /side[- ]effect/i.test(combinedCapabilityText) && /proof|receipt|expected/i.test(combinedCapabilityText))
    ok('agentic chat eval bounds model-judge scoring behind deterministic gates',
      /model[- ]judge/i.test(combinedCapabilityText) && /deterministic/i.test(combinedCapabilityText) && /(never the sole proof|cannot be overridden|override|bounded|advisory)/i.test(combinedCapabilityText))
    ok('agentic chat eval requires safe sandbox or mock mode for destructive tools',
      /destructive/i.test(combinedCapabilityText) && /sandbox|mock|blocked/i.test(combinedCapabilityText))
    ok('agentic chat eval handles optional RAG profile as proven or not-proven/blocked',
      /optional RAG profile|rag profile/i.test(combinedCapabilityText) && /not-proven|blocked/i.test(combinedCapabilityText))
    ok('agentic chat eval ships example scenario and receipt artifacts',
      files.has('examples/core-chat-scenario.yaml') && files.has('examples/eval-receipt.md'))
  }

  if (designQualityLiftCapability) {
    const bannedDefaultsSection = yamlSection(capability, 'banned_defaults')
    const directionProfilesSection = yamlSection(capability, 'direction_profiles')
    ok('design quality lift locks direction profile before any code',
      /(direction[-_ ]profile[-_ ]locked|direction[- ]locked|locked direction|lock a direction|direction lock)/i.test(combinedCapabilityText) &&
      /(hard[- ]?stop|mandatory|before any code|before.*source)/i.test(combinedCapabilityText))
    ok('design quality lift enforces banned defaults list',
      /patterns:/i.test(bannedDefaultsSection) &&
      /(Fraunces|Instrument_Serif)/i.test(bannedDefaultsSection) &&
      /(AI-purple|ai-purple-gradient|purple|violet|fuchsia|indigo)/i.test(bannedDefaultsSection) &&
      /(inter[- ]slate|slate-900|Inter)/i.test(bannedDefaultsSection) &&
      /hand-rolled-svg-icons/i.test(bannedDefaultsSection) &&
      /generic-friendly-microcopy/i.test(bannedDefaultsSection))
    ok('design quality lift requires three dials recorded per direction',
      /three[- ]dials?/i.test(combinedCapabilityText) && /DESIGN_VARIANCE|MOTION_INTENSITY|VISUAL_DENSITY/i.test(combinedCapabilityText))
    ok('design quality lift requires per-direction signature moment',
      (directionProfilesSection.match(/signature_moment:/gi) || []).length >= 5 &&
      /required/i.test(directionProfilesSection))
    ok('design quality lift requires visual risk budget with 1-3 rule breaks',
      /visual[- ]risk[- ]budget/i.test(combinedCapabilityText) && /(rule[- ]break|allowed)/i.test(combinedCapabilityText))
    ok('design quality lift requires sans display first with serif as exception',
      /sans[- ]display/i.test(combinedCapabilityText) && /(serif|very discouraged|exception)/i.test(combinedCapabilityText))
    ok('design quality lift requires icon library without hand-rolled SVGs',
      /icon[- ]library/i.test(combinedCapabilityText) && /hand[- ]rolled[- ]SVG/i.test(combinedCapabilityText))
    ok('design quality lift requires prefers-reduced-motion and reduced-transparency fallbacks',
      /prefers[- ]reduced[- ]motion/i.test(combinedCapabilityText) && /prefers[- ]reduced[- ]transparency/i.test(combinedCapabilityText))
    ok('design quality lift bounds model-judge behind visual proof gates',
      /(model[- ]judge|visual[- ]judge)/i.test(combinedCapabilityText) && /override|never the sole proof|bounded/i.test(combinedCapabilityText))
    ok('design quality lift requires before/after screenshots in receipt',
      /before.*after.*screenshot/i.test(combinedCapabilityText))
    ok('design quality lift requires lighthouse and axe audit in receipt',
      /lighthouse/i.test(combinedCapabilityText) && /axe/i.test(combinedCapabilityText))
    ok('design quality lift ships direction profiles and example receipt',
      files.has('examples/direction-profiles-v1.yaml') && files.has('examples/design-quality-lift-receipt.md'))
    ok('design quality lift references taste-skill or animations-dev research basis',
      files.has('references/research-basis.md') && (/taste-skill/i.test(combinedCapabilityText) || /animations\.dev/i.test(combinedCapabilityText) || /emil kowalski/i.test(combinedCapabilityText)))
  }

  if (evolutionaryCodingRuntimeCapability) {
    ok('evolutionary coding runtime requires deterministic evaluator as hard dependency',
      /deterministic/i.test(combinedCapabilityText) &&
      /evaluator|fitness function|benchmark/i.test(combinedCapabilityText) &&
      /No deterministic evaluator|no deterministic evaluator/i.test(combinedCapabilityText))
    ok('evolutionary coding runtime requires sandbox limits before candidate execution',
      /sandbox/i.test(combinedCapabilityText) &&
      /timeout/i.test(combinedCapabilityText) &&
      /memory/i.test(combinedCapabilityText) &&
      /(execute candidates without sandbox|without sandbox|No sandbox boundary)/i.test(combinedCapabilityText))
    ok('evolutionary coding runtime requires forbidden mutation scope',
      /(forbidden mutation|forbidden-file|forbidden file|forbidden paths|forbidden-file guardrails)/i.test(combinedCapabilityText) &&
      /(secrets|credentials|deployment|billing|production data)/i.test(combinedCapabilityText))
    ok('evolutionary coding runtime requires baseline versus winner proof',
      /baseline/i.test(combinedCapabilityText) &&
      /winner/i.test(combinedCapabilityText) &&
      /same evaluator|same settings|baseline comparison/i.test(combinedCapabilityText))
    ok('evolutionary coding runtime requires lineage archive fields',
      /lineage/i.test(combinedCapabilityText) &&
      /parent/i.test(combinedCapabilityText) &&
      /mutation prompt/i.test(combinedCapabilityText) &&
      /patch/i.test(combinedCapabilityText) &&
      /score/i.test(combinedCapabilityText))
    ok('evolutionary coding runtime requires no-improvement honest receipt path',
      /no[- ]improvement/i.test(combinedCapabilityText) &&
      /not[- ]proven/i.test(combinedCapabilityText) &&
      /receipt/i.test(combinedCapabilityText))
    ok('evolutionary coding runtime rejects model-judge-only scoring',
      /model[- ]judge/i.test(combinedCapabilityText) &&
      /(advisory|cannot override|cannot.*override|not.*override)/i.test(combinedCapabilityText) &&
      /deterministic/i.test(combinedCapabilityText))
    ok('evolutionary coding runtime blocks uncontrolled self-modification',
      /self[- ]modification|self[- ]improvement|self-modifying/i.test(combinedCapabilityText) &&
      /approval/i.test(combinedCapabilityText) &&
      /rollback/i.test(combinedCapabilityText))
    ok('evolutionary coding runtime ships fixture run and receipt examples',
      files.has('examples/minimal-evolution-run.json') && files.has('examples/fixture-evolution-receipt.md'))
  }

  for (const file of loopFiles.filter((f) => f !== 'loops/loop-flow.md')) {
    const text = safeReadText(path.join(dir, file))
    ok(`${file} has objective and proof gate`, /##\s*(Objective|Building objective)/i.test(text) && /Proof before moving on|Minimum proof|Required output|DO NOT/i.test(text))
  }

  if (publication) {
    ok('publication metadata marks capability stack', /"stack"\s*:\s*\[[\s\S]*capability\.yaml[\s\S]*apply\.md[\s\S]*verify\.md/i.test(publication))
  }

  return checks
}

function buildprintAuthorCheckResults(dir) {
  const checks = []
  const ok = (label, pass, detail = '') => checks.push({ label, pass, detail })
  const files = new Set(packetFiles(dir))
  const author = safeReadText(path.join(dir, 'author.yaml'))
  const buildprint = safeReadText(path.join(dir, 'BUILDPRINT.md'))
  const classifier = safeReadText(path.join(dir, '00-request-classifier.md'))
  const deepsearch = safeReadText(path.join(dir, '00-internet-deepsearch.md'))
  const intake = safeReadText(path.join(dir, '00-intake.md'))
  const boundary = safeReadText(path.join(dir, '01-capability-boundary.md'))
  const contract = safeReadText(path.join(dir, '02-contract-authoring.md'))
  const phaseAuthoring = safeReadText(path.join(dir, '03-phase-authoring.md'))
  const validation = safeReadText(path.join(dir, '04-validation-and-publication.md'))
  const brutalGate = safeReadText(path.join(dir, '05-brutal-quality-gate.md'))
  const capabilityTemplate = safeReadText(path.join(dir, 'templates/capability-packet/capability.yaml'))
  const templateBuildprint = safeReadText(path.join(dir, 'templates/capability-packet/BUILDPRINT.md'))
  const combined = [author, buildprint, classifier, deepsearch, intake, boundary, contract, phaseAuthoring, validation, brutalGate, capabilityTemplate, templateBuildprint].join('\n')

  for (const file of [
    'BUILDPRINT.md',
    'author.yaml',
    '00-request-classifier.md',
    '00-internet-deepsearch.md',
    '00-intake.md',
    '01-capability-boundary.md',
    '02-contract-authoring.md',
    '03-phase-authoring.md',
    '04-validation-and-publication.md',
    '05-brutal-quality-gate.md',
    'templates/capability-packet/BUILDPRINT.md',
    'templates/capability-packet/capability.yaml',
  ]) ok(`author file exists: ${file}`, files.has(file))

  ok('author.yaml declares buildprint-author schema', /schema:\s*agent-buildprint\/author\.v0/i.test(author) && /type:\s*buildprint-author/i.test(author))
  ok('author read order runs classifier before authoring', /00-request-classifier\.md[\s\S]*00-internet-deepsearch\.md[\s\S]*00-intake\.md[\s\S]*01-capability-boundary\.md[\s\S]*02-contract-authoring\.md[\s\S]*03-phase-authoring\.md/i.test(author))
  ok('author routes greenfield products away from capability packets', /greenfield_product:[\s\S]*do_not_create_capability_packet:\s*true/i.test(author) && /whole new product|app|SaaS|dashboard|agent system/i.test(author))
  ok('author requires internet deepsearch before broad questions', /required_when_user_context_is_thin:\s*true/i.test(author) && /before broad questions|before asking broad questions|before questions/i.test(`${author}\n${buildprint}\n${deepsearch}`))
  ok('author records selected and rejected current techniques with source basis',
    /selected technique/i.test(combined) &&
    /rejected techniques/i.test(combined) &&
    /official docs/i.test(combined) &&
    /source examples/i.test(combined) &&
    /confidence/i.test(combined)
  )
  ok('author hard-stops setup-changing capability decisions',
    /host/i.test(intake) &&
    /secret|provider access/i.test(intake) &&
    /destructive/i.test(intake) &&
    /migration/i.test(intake) &&
    /security posture|auth\/tenant|auth\/tenant boundaries/i.test(intake) &&
    /billing|provider side effects|external billing/i.test(`${intake}\n${templateBuildprint}`)
  )
  ok('author requires real-host proof and adversarial review before 10/10 claims',
    /real[- ]host proof/i.test(combined) &&
    /adversarial review/i.test(combined) &&
    /10\/10|perfect/i.test(combined) &&
    /downgrade/i.test(combined)
  )
  ok('author requires security negative tests and failure modes',
    /negative tests/i.test(combined) &&
    /failure modes/i.test(combined) &&
    /happy-path-only|happy path only|not only happy-path|not only happy path/i.test(combined)
  )
  ok('capability template has no placeholder fields',
    !hasGenericPlaceholder(capabilityTemplate) &&
    yamlListHasConcreteItems(capabilityTemplate, 'host_frameworks') &&
    yamlListHasConcreteItems(capabilityTemplate, 'failure_modes') &&
    yamlListHasConcreteItems(yamlSection(capabilityTemplate, 'verify'), 'commands')
  )
  ok('capability template declares claim proof ceiling', /claim_status:\s*(unproven|fixture_proven|host_proven|blocked)/i.test(capabilityTemplate))
  ok('author validation blocks publication copy outrunning proof',
    /publication copy/i.test(combined) &&
    /outrun|outruns|beyond/i.test(combined) &&
    /evidence|proof/i.test(combined) &&
    /not[- ]proven|blocked|downgrade/i.test(combined)
  )

  return checks
}

function loopFilesFromIndex(text) {
  return [...text.matchAll(/^\s*file:\s*(loops\/[^\s#]+\.md)\s*$/gmi)].map((m) => m[1].trim())
}

function loopEntryBlock(text, loopId) {
  const lines = text.split(/\r?\n/)
  const start = lines.findIndex((line) => new RegExp(`^\\s*-\\s*loop_id:\\s*${escapeRegExp(loopId)}\\s*$`, 'i').test(line))
  if (start < 0) return ''
  const collected = [lines[start]]
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i]
    if (/^\s*-\s*loop_id:/i.test(line) || /^\S/.test(line)) break
    collected.push(line)
  }
  return collected.join('\n')
}

function loopFileForId(text, loopId) {
  const block = loopEntryBlock(text, loopId)
  return (block.match(/^\s*file:\s*(loops\/[^\s#]+\.md)\s*$/mi) || [])[1] || ''
}

function mapperOsRootCheckResults(dir) {
  const checks = []
  const ok = (label, pass, detail = '') => checks.push({ label, pass, detail })
  const buildprintJson = safeReadText(path.join(dir, 'buildprint.json'))
  const contracts = safeReadText(path.join(dir, 'CONTRACTS.md'))
  const quality = safeReadText(path.join(dir, 'policies/quality.md'))
  const spec = safeReadText(path.join(dir, 'SPEC.md'))
  const readme = safeReadText(path.join(dir, 'README.md'))
  const vision = safeReadText(path.join(dir, 'vision.md'))
  const templateDir = path.join(dir, 'templates', 'executable-packet')
  const templateChecks = packetCheckResults(templateDir)
  const rootText = [buildprintJson, contracts, quality, spec, readme, vision].join('\n')

  ok('mapper manifest includes review template source', /templates\/executable-packet\/review\.md/i.test(buildprintJson))
  ok('mapper root requires kernel packet shape', /buildprint\/kernel\/v1/i.test(rootText) && /kernel_loop/i.test(rootText))
  ok('mapper root requires goal → loop → fan-out → review kernel', /bare agentic loop/i.test(rootText) && /independent/i.test(rootText) && /contract review/i.test(rootText))
  ok('mapper root forbids phase_driven_comprehensive selected output', /phase_driven_comprehensive/i.test(rootText) && /forbid|reject|obsolete|do not emit/i.test(rootText))
  ok('mapper root forbids evidence-ledger bureaucracy', /evidence-ledger/i.test(rootText) && /forbid|reject|do not/i.test(rootText))
  ok('mapper root separates loop core pass from claim qualification', /loop_core_passed/i.test(rootText) && /claim_qualified/i.test(rootText))
  ok('mapper root requires hard-stop decisions before setup', /hard-stop/i.test(rootText) && /decisions\.md/i.test(rootText))

  return [...checks, ...templateChecks]
}

function packetCheckResults(dir) {
  if (isMapperOsRoot(dir)) return mapperOsRootCheckResults(dir)
  if (isBuildprintAuthorPacket(dir)) return buildprintAuthorCheckResults(dir)
  dir = packetCheckRoot(dir)
  if (isCapabilityPacket(dir)) return capabilityPacketCheckResults(dir)
  const checks = []
  const ok = (label, pass, detail = '') => checks.push({ label, pass, detail })
  const files = new Set(packetFiles(dir))
  const allFiles = Array.from(files)
  const normalizedPacketDir = dir.split(path.sep).join('/')

  const blueprint = safeReadText(path.join(dir, 'blueprint.yaml'))
  const buildprint = safeReadText(path.join(dir, 'BUILDPRINT.md'))
  const loopIndex = safeReadText(path.join(dir, 'loops/loop-index.yaml'))
  const loopFlow = safeReadText(path.join(dir, 'loops/loop-flow.md'))
  const review = safeReadText(path.join(dir, 'review.md'))
  const isMapperTemplatePacket = normalizedPacketDir.endsWith('buildprints/buildprint-mapper-os/templates/executable-packet') ||
    normalizedPacketDir.endsWith('.buildprint/snapshots/templates/executable-packet') ||
    /Replace this template-level rule with the selected artifact's source-derived central output contract/i.test(blueprint)
  const identityText = safeReadText(path.join(dir, '02-identity.md'))
  const isAgenticChatPacket = normalizedPacketDir.endsWith('buildprints/agentic-chat') ||
    /Product:\s*Agentic Chat/i.test(identityText) ||
    /capability_maturity:[\s\S]*full_claim:\s*agentic_chat/i.test(blueprint) ||
    /central_output_contract:[\s\S]*Agentic Chat/i.test(blueprint)
  const requiresTypedQualityRouting = isMapperTemplatePacket

  const obsoleteFiles = allFiles.filter((file) =>
    file === '02-architecture.md' ||
    file === '03-ux-contract.md' ||
    file === '04-handover.md' ||
    file === '04-review.md' ||
    file === '05-handover.md' ||
    file === '00-questions.md' ||
    file === '01-project-setup.md' ||
    file === '02-ui-identity.md' ||
    file.startsWith('slices/') ||
    file.startsWith('gates/') ||
    file.startsWith('teams/') ||
    file.startsWith('runner/') ||
    file.startsWith('generated/') ||
    file.startsWith('05-evidence/') ||
    file.startsWith('03-phases/') ||
    file.includes('/slice.yaml') ||
    file.includes('/gate-index.yaml') ||
    packetHasObsoleteRouter(file)
  )

  const isLegacySliceGatePacket = /schema_version:\s*mapper-os\/executable-blueprint\/v2/i.test(blueprint) ||
    files.has('slices/_template/slice.yaml') ||
    files.has('gates/gate-index.yaml') ||
    /slices_dir:|gates_dir:|capsules_dir:/i.test(blueprint)

  const isLegacyPhasePacket = /schema_version:\s*mapper-os\/executable-blueprint\/v3/i.test(blueprint) ||
    /phase_driven_comprehensive/i.test(blueprint) ||
    files.has('03-phases/phase-index.yaml')

  ok('packet rejects obsolete v2 packet shape', !isLegacySliceGatePacket, isLegacySliceGatePacket ? 'found v2 schema, slices/gates, or slices_dir/gates_dir/capsules_dir' : '')
  ok('packet rejects obsolete v3 phase spine', !isLegacyPhasePacket, isLegacyPhasePacket ? 'found v3 schema, phase_driven_comprehensive, or 03-phases/' : '')

  const need = [
    'BUILDPRINT.md',
    '00-goal.md',
    '01-setup.md',
    '02-identity.md',
    'blueprint.yaml',
    'loops/loop-index.yaml',
    'loops/loop-flow.md',
    'review.md',
    'README.md',
    'HANDOVER.md'
  ]
  for (const file of need) ok(`packet file exists: ${file}`, files.has(file))
  ok('packet has no obsolete useless files', obsoleteFiles.length === 0, obsoleteFiles.length ? obsoleteFiles.join(', ') : '')
  ok('packet avoids obsolete routers/files recursively', !allFiles.some(packetHasObsoleteRouter))

  ok('blueprint declares kernel v1 schema', /schema_version:\s*buildprint\/kernel\/v1/i.test(blueprint))
  ok('blueprint starts at BUILDPRINT and uses blueprint.yaml as machine contract', /execution_start:\s*BUILDPRINT\.md/i.test(blueprint) && /machine_contract:\s*blueprint\.yaml/i.test(blueprint))
  ok('blueprint declares kernel_loop style', /style:\s*kernel_loop/i.test(blueprint) && /YAML routes; markdown teaches and builds/i.test(blueprint))
  ok('blueprint declares required kernel packet files', need.every((file) => blueprint.includes(file)))
  ok('blueprint forbids obsolete selected shapes', /forbidden_shapes:/i.test(blueprint) && /slices\//i.test(blueprint) && /03-phases\//i.test(blueprint) && /evidence-ledger/i.test(blueprint))
  ok('blueprint declares kernel execution model',
    /kernel:\s*\n/i.test(blueprint) &&
    /bare agentic loop|bare_agentic_loop/i.test(blueprint) &&
    /independent.*fan-out|independent_fan_out|fan-out/i.test(blueprint) &&
    /contract review|contract_review/i.test(blueprint)
  )
  ok('blueprint declares canonical deployment posture', /deployment_posture:[\s\S]*current:\s*trusted_local/i.test(blueprint) && !/trusted-local|private authenticated|public webapp/i.test(blueprint))
  ok('blueprint declares central output quality contract',
    /central_output_contract:/i.test(blueprint) &&
    /central_output:/i.test(blueprint) &&
    /output_primitives:/i.test(blueprint) &&
    /quality_signals:/i.test(blueprint) &&
    /unacceptable_generic_substitutes:/i.test(blueprint) &&
    /reviewer_acceptance_questions:/i.test(blueprint) &&
    /claim_gates:/i.test(blueprint)
  )
  for (const check of centralOutputInstantiationChecks(blueprint, isMapperTemplatePacket, isAgenticChatPacket)) ok(check.label, check.pass, check.detail || '')
  ok('blueprint declares harness provider and profile selection',
    /harness:\s*\n[\s\S]*profiles:/i.test(blueprint) &&
    /provider:\s*agents/i.test(blueprint) &&
    /webapp|backend|agentic|full|default/i.test(blueprint)
  )
  ok('blueprint declares typed quality gate routing',
    !requiresTypedQualityRouting ||
    (/typed_quality_gates:/i.test(blueprint) &&
    /Select only the gates that match the artifact type/i.test(blueprint))
  )
  ok('blueprint declares proven implementation requirements',
    /proven_implementation_requirements:/i.test(blueprint) &&
    /proven libraries|proven packages|proven tool/i.test(blueprint)
  )
  ok('blueprint keeps production maturity as upgrade not floor',
    /maturity_upgrades:|optional.*upgrade|upgrade layer|claim-gated/i.test(blueprint) ||
    /never the (path|floor)|not required for first/i.test(blueprint)
  )

  ok('BUILDPRINT owns kernel read order',
    /00-goal\.md[\s\S]*01-setup\.md[\s\S]*02-identity\.md[\s\S]*loops\/loop-index\.yaml[\s\S]*loops\/loop-flow\.md[\s\S]*review\.md[\s\S]*HANDOVER\.md/i.test(buildprint)
  )
  ok('BUILDPRINT is an AI builder briefing', /responsible builder/i.test(buildprint) && /senior product engineer/i.test(buildprint))
  ok('BUILDPRINT defines role, responsibility, and perfection alignment', /Your role/i.test(buildprint) && /Your responsibility/i.test(buildprint) && /Perfection alignment/i.test(buildprint))
  ok('BUILDPRINT states kernel execution', /bare agentic loop/i.test(buildprint) && /fan-out|fan out/i.test(buildprint) && /contract review/i.test(buildprint))
  ok('BUILDPRINT avoids product-specific mapped-source briefing', !/MiroFish|mapped from|previous repository|original repo|source project/i.test(buildprint))
  ok('BUILDPRINT forbids fake-success paths', /functionless buttons|dead controls|mocked\/sample data|fake provider|raw JSON/i.test(buildprint))

  const goal = safeReadText(path.join(dir, '00-goal.md'))
  ok('goal defines observable goal and acceptance', /##\s*Goal/i.test(goal) && /##\s*Acceptance criteria/i.test(goal))
  ok('goal classifies blocking power', /Hard-stop questions/i.test(goal) && /Assumable defaults/i.test(goal) && /Deferrable questions/i.test(goal) && /stop before `?01-setup\.md`?/i.test(goal))
  ok('goal hard-stop sensitive decisions', /Deployment posture/i.test(goal) && /Secrets and provider policy/i.test(goal) && /Destructive\/data-loss behavior/i.test(goal) && /Privacy\/compliance exposure/i.test(goal) && /Product\/artifact identity/i.test(goal))
  ok('goal forbids hard-stop self-defaults',
    /confirmed_by:\s*user/i.test(goal) &&
    /confirmed_by:\s*explicit_user_delegation/i.test(goal) &&
    /agent_assumption.*invalid|invalid.*agent_assumption/i.test(goal)
  )

  const setup = safeReadText(path.join(dir, '01-setup.md'))
  ok('setup defines foundation before loop work', /foundation|before loop|Do not start `?loops\//i.test(setup))
  ok('setup requires durable setup artifacts', /AGENTS\.md/i.test(setup) && /docs\/architecture\.md/i.test(setup) && /\.env\.example/i.test(setup) && /setup-receipt\.md/i.test(setup))
  ok('setup requires local skill harness',
    /agb harness init/i.test(setup) &&
    /setup-runbook/i.test(setup) &&
    /frontend-ui-product-design/i.test(setup) &&
    /subagent-driven-implementation/i.test(setup) &&
    /verify-and-review/i.test(setup) &&
    /\.agents\/skills/i.test(setup)
  )
  ok('setup routes proven implementation requirements',
    /proven_implementation_requirements/i.test(setup) &&
    /docs\/architecture\.md/i.test(setup)
  )
  ok('setup leaves identity to the identity step',
    !/docs\/ui-identity\.md|generated UI identity|forbidden default silhouette/i.test(setup)
  )
  ok('setup forbids fake setup shortcuts', /placeholder commands|real secrets|hide hard-stop/i.test(setup))
  ok('setup requires decisions hard-stop before loop work',
    /decisions\.md/i.test(setup) &&
    /hard-stop/i.test(setup)
  )

  const identity = identityText
  const notUiBearing = /not-ui-bearing/i.test(identity)
  if (!notUiBearing) {
    ok('identity opens with UX importance', /UX is a must/i.test(identity) && /not a finished product/i.test(identity))
    ok('identity runs after setup before loops', /after `?01-setup\.md`?/i.test(identity) && /before `?loops\//i.test(identity))
    ok('identity loads local frontend skill harness',
      /frontend-ui-product-design/i.test(identity) &&
      /\.agents\/skills\/frontend-ui-product-design\/SKILL\.md/i.test(identity)
    )
    ok('identity defines product metaphor and primary gesture',
      /product metaphor|metaphor/i.test(identity) &&
      /dominant object|primary gesture/i.test(identity)
    )
    ok('identity rejects generic dead UI', /functionless buttons|dead controls/i.test(identity) && /raw JSON/i.test(identity))
  } else {
    ok('non-UI identity declares not-ui-bearing with operator experience', /not-ui-bearing/i.test(identity) && /operator|developer|CLI|API/i.test(identity))
  }

  ok('loop flow defines kernel execution',
    /goal/i.test(loopFlow) &&
    /bare agentic loop/i.test(loopFlow) &&
    /fan-out|fan out/i.test(loopFlow) &&
    /contract review/i.test(loopFlow) &&
    /active loop only/i.test(loopFlow)
  )
  ok('loop flow rejects paperwork and fake success',
    /Do not create .*paperwork|not a deliverable file/i.test(loopFlow) &&
    /do not fake live success|Edits alone|mocked data|functionless buttons/i.test(loopFlow)
  )
  ok('loop flow defines repair routing',
    /return to `?01-setup\.md`?/i.test(loopFlow) &&
    /return to `?00-goal\.md`?/i.test(loopFlow) &&
    /return to `?02-identity\.md`?/i.test(loopFlow)
  )
  ok('loop flow has no evidence-ledger bureaucracy', !/evidence-ledger\.jsonl|claim-gates\.json/i.test(loopFlow))
  ok('loop flow requires review.md before final completion', /review\.md/i.test(loopFlow))

  ok('loop index declares kernel schema and active loop', /schema_version:\s*buildprint\/loop-index\/v1/i.test(loopIndex) && /active_loop:\s*loops\/[\w.-]+\.md/i.test(loopIndex))
  const loopIds = [...loopIndex.matchAll(/^\s*-\s*loop_id:\s*([^\s#]+)/gmi)].map((m) => m[1].trim())
  const loopIdSet = new Set(loopIds)
  const loopIndexFiles = loopFilesFromIndex(loopIndex)
  ok('loop index has unique loop ids', loopIds.length > 0 && loopIds.length === loopIdSet.size)
  ok('loop index referenced loop files exist', loopIndexFiles.length > 0 && loopIndexFiles.every((file) => files.has(file)))
  const activeLoop = (loopIndex.match(/active_loop:\s*(loops\/[\w.-]+\.md)/i) || [])[1]
  ok('loop index active loop exists', !!activeLoop && files.has(activeLoop))
  ok('loop index routes only without role/gate/slice machinery', !/requires_roles|gate|slice|capsule|runner/i.test(loopIndex))

  ok('review requires independent fresh-context reviewer',
    /fresh-context reviewer|independent reviewer/i.test(review) &&
    /REVIEW_INVALID/i.test(review) &&
    /must not score its own work|must not review its own/i.test(review)
  )
  ok('review reads goal and loop contracts only',
    /00-goal\.md/i.test(review) &&
    (/loop contract|active loop|Building objective/i.test(review)) &&
    /builder.*chat|builder rationale/i.test(review)
  )
  ok('review separates loop_core_passed from claim_qualified', /loop_core_passed/i.test(review) && /claim_qualified/i.test(review))
  ok('review forbids evidence-ledger products', !/evidence-ledger\.jsonl/i.test(review) && /contract/i.test(review))

  const collectLoopMd = (root) => exists(root)
    ? fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(root, entry.name)
        if (entry.isDirectory()) return collectLoopMd(full)
        return entry.name.endsWith('.md') && entry.name !== 'loop-flow.md' ? [full] : []
      })
    : []
  const loopFiles = collectLoopMd(path.join(dir, 'loops')).sort()
  ok('packet has comprehensive loop files', loopFiles.length >= 1)
  for (const fullPath of loopFiles) {
    const file = path.relative(dir, fullPath).split(path.sep).join('/')
    const text = safeReadText(fullPath)
    const objective = (text.match(/##\s*Building objective\s*\n([\s\S]*?)(?=\n##\s*DO NOT)/i) || [])[1] || ''
    ok(`${file} has comprehensive loop headings`, /##\s*How to implement this loop/i.test(text) && /##\s*Building objective/i.test(text) && /##\s*DO NOT/i.test(text) && /##\s*Minimum proof before moving on/i.test(text) && /##\s*Handoff note/i.test(text))
    ok(`${file} has substantial building objective`, objective.trim().length >= (isMapperTemplatePacket ? 400 : 500), `objective length ${objective.trim().length}`)
    ok(`${file} reads required loop context`, /loops\/loop-flow\.md/i.test(text) && /\.buildprint\/next-agent\.md/i.test(text) && /AGENTS\.md/i.test(text) && /02-identity\.md/i.test(text))
    ok(`${file} forbids placeholders/functionless/mocks`, /placeholders/i.test(text) && /functionless buttons/i.test(text) && /mocked\/sample data/i.test(text))
    ok(`${file} does not use decomposed v2/schema machinery`, !/slice\.yaml|acceptance-spec|build-brief|requires_roles|capability_id|proof_contract|evidence-ledger\.jsonl/i.test(text))
  }

  const handover = safeReadText(path.join(dir, 'HANDOVER.md'))
  ok('handover captures built/verified/blocked/not-proven/next', /##\s*Built/i.test(handover) && /##\s*Verified/i.test(handover) && /##\s*Blocked/i.test(handover) && /##\s*Not proven/i.test(handover) && /##\s*Next/i.test(handover))
  ok('handover warns against overclaiming', /Do not claim completion beyond the evidence/i.test(handover))

  if (isAgenticChatPacket) {
    ok('agentic-chat keeps maturity upgrades optional',
      /maturity_upgrades|upgrade/i.test(blueprint) &&
      /streaming_chat_core|first successful loop|agentic_chat/i.test(blueprint + handover + goal)
    )
    ok('agentic-chat does not require claim-gates JSON product',
      !files.has('.buildprint/claim-gates.json') &&
      !/claim-gates\.json/i.test(loopFlow)
    )
  }

  ok('no generated sentinel placeholders remain', isMapperTemplatePacket || !allFiles.some((file) => {
    if (!/\.(md|yaml|json|jsonl)$/.test(file)) return false
    const text = safeReadText(path.join(dir, file)).replace(/<loop>/g, '').replace(/<loop-id>/g, '').replace(/<phase>/g, '')
    return /MAPPER_REQUIRED_|<mapped-app>|<capability name/i.test(text)
  }))

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
  const loopIndex = safeReadText(path.join(dir, 'loops/loop-index.yaml'))
  const activePath = loopIndex.match(/active_loop:\s*([^\s#]+)/)?.[1]
  if (!activePath) throw new Error('missing active_loop in loops/loop-index.yaml')
  const active = safeReadText(path.join(dir, activePath))
  if (!active) throw new Error(`missing active loop ${activePath}`)
  console.log(active.trim())
}



function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))]
}

function readOrderFromManifest(manifest, isExecutablePacket, hasManifestFile) {
  if (Array.isArray(manifest.instructions?.readOrder) && manifest.instructions.readOrder.length) return manifest.instructions.readOrder
  if (Array.isArray(manifest.readOrder) && manifest.readOrder.length) return manifest.readOrder
  return isExecutablePacket
    ? ['BUILDPRINT.md', '00-goal.md', '01-setup.md', '02-identity.md', 'blueprint.yaml', 'loops/loop-index.yaml', 'loops/loop-flow.md', 'review.md', 'README.md', 'HANDOVER.md'].filter(hasManifestFile)
    : ['BUILDPRINT.md'].filter(hasManifestFile)
}

function phaseIndexActiveInfo(phaseIndexText) {
  const activePhase = phaseIndexText.match(/active_loop:\s*([^\s#]+)/)?.[1]
    || phaseIndexText.match(/active_phase:\s*([^\s#]+)/)?.[1]
    || null
  if (!activePhase) return { activePhase: null, activePhaseId: null }
  const loopBlocks = phaseIndexText.split(/\n\s*-\s+loop_id:\s*/).slice(1)
  for (const block of loopBlocks) {
    const firstLine = block.split(/\r?\n/, 1)[0] || ''
    const phaseId = firstLine.trim().split(/\s+/)[0]
    const file = block.match(/\n\s*file:\s*([^\s#]+)/)?.[1]
    if (file === activePhase) return { activePhase, activePhaseId: phaseId || null }
  }
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
    '00-goal.md',
    '01-setup.md',
    '02-identity.md',
    'blueprint.yaml',
    'loops/loop-index.yaml',
    'loops/loop-flow.md',
    activePhase,
    'review.md',
    'README.md',
    'HANDOVER.md'
  ].filter((file, index, arr) => file && hasManifestFile(file) && arr.indexOf(file) === index)
  const extras = baseReadOrder.filter((file) => hasManifestFile(file) && !canonical.includes(file))
  return uniqueStrings([...canonical, ...extras])
}

function cleanHarnessProfileValue(value) {
  return String(value || '')
    .replace(/[[\]'"]/g, '')
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function harnessProfilesFromBlueprint(blueprintText) {
  const lines = blueprintText.split(/\r?\n/)
  const profiles = []
  for (let i = 0; i < lines.length; i++) {
    if (!/^harness:\s*(?:#.*)?$/.test(lines[i])) continue
    for (let j = i + 1; j < lines.length; j++) {
      const line = lines[j]
      if (/^\S/.test(line) && !/^#/.test(line)) break
      const profile = line.match(/^\s*profile:\s*(.+?)\s*(?:#.*)?$/)
      if (profile) profiles.push(...cleanHarnessProfileValue(profile[1]))
      const inlineProfiles = line.match(/^\s*profiles:\s*(.+?)\s*(?:#.*)?$/)
      if (inlineProfiles && inlineProfiles[1].trim()) profiles.push(...cleanHarnessProfileValue(inlineProfiles[1]))
      if (/^\s*profiles:\s*(?:#.*)?$/.test(line)) {
        for (let k = j + 1; k < lines.length; k++) {
          const item = lines[k]
          if (/^\s{2,}\w[\w-]*:/.test(item) || /^\S/.test(item)) break
          const bullet = item.match(/^\s*-\s*(.+?)\s*(?:#.*)?$/)
          if (bullet) profiles.push(...cleanHarnessProfileValue(bullet[1]))
        }
      }
    }
  }
  return uniqueStrings(profiles.length ? profiles : ['default'])
}

function harnessInitCommandForProfiles(profiles) {
  const normalized = uniqueStrings((profiles || ['default']).filter(Boolean))
  const profileArgs = normalized.length && !(normalized.length === 1 && normalized[0] === 'default')
    ? normalized.map((profile) => ` --profile ${profile}`).join('')
    : ''
  return `agb harness init . --provider agents${profileArgs}`
}

async function startBuildprint(manifestRef, targetFolder = cwd) {
  const { json: manifest, baseUrl } = await readJsonFromUrlOrFile(manifestRef)
  if (!manifest.slug || !Array.isArray(manifest.files)) throw new Error('invalid Buildprint package manifest: expected slug and files[]')
  const manifestFilePaths = manifest.files
    .map((file) => typeof file === 'string' ? file : file.path)
    .filter(Boolean)
    .map((filePath) => safeManifestPath(filePath))
    .filter((filePath) => !filePath.includes('*'))
  const executablePacketPrefix = (() => {
    const rootHasExecutablePacket = ['00-goal.md', 'blueprint.yaml', 'loops/loop-index.yaml']
      .every((file) => manifestFilePaths.includes(file))
    if (rootHasExecutablePacket) return ''
    const templatePrefix = 'templates/executable-packet/'
    const templateHasExecutablePacket = ['00-goal.md', 'blueprint.yaml', 'loops/loop-index.yaml']
      .every((file) => manifestFilePaths.includes(`${templatePrefix}${file}`))
    return templateHasExecutablePacket ? templatePrefix : ''
  })()
  const manifestPathFor = (filePath) => `${executablePacketPrefix}${filePath}`
  const hasManifestFile = (filePath) => manifestFilePaths.includes(manifestPathFor(filePath))
  const snapshotPathFor = (filePath) => `.buildprint/snapshots/${manifestPathFor(filePath)}`
  const setupFile = '01-setup.md'
  const uiIdentityFile = '02-identity.md'
  const usesSetupFirstIdentitySecond = true
  const isExecutablePacket = hasManifestFile('00-goal.md') && hasManifestFile(setupFile) && hasManifestFile(uiIdentityFile) && hasManifestFile('blueprint.yaml')
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
    if (safePath === 'loops/loop-index.yaml' && !/active_loop:/i.test(text)) {
      throw new Error(`downloaded loops/loop-index.yaml is missing active_loop: — content appears invalid or truncated from ${source}`)
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
  const executableSnapshotDir = path.join(snapshotDir, ...executablePacketPrefix.split('/').filter(Boolean))
  const phaseIndexPath = path.join(executableSnapshotDir, 'loops', 'loop-index.yaml')
  const phaseIndexText = fs.existsSync(phaseIndexPath) ? fs.readFileSync(phaseIndexPath, 'utf8') : ''
  const blueprintPath = path.join(executableSnapshotDir, 'blueprint.yaml')
  const blueprintText = fs.existsSync(blueprintPath) ? fs.readFileSync(blueprintPath, 'utf8') : ''
  const harnessProfiles = harnessProfilesFromBlueprint(blueprintText)
  const harnessInitCommand = harnessInitCommandForProfiles(harnessProfiles)
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
    harnessProfiles,
  })

  writeJson(path.join(stateDir, 'state.json'), {
    buildprint: manifest.slug,
    currentPhase: isExecutablePacket ? activePhaseId || 'active-loop' : '00-alignment',
    activePhase,
    activePhaseId,
    executionMode: manifest.executionMode || manifest.execution_mode || (isExecutablePacket ? 'kernel-loop' : null),
    completedPhases: [],
    blocked: false,
    lastAction: `downloaded ${downloaded.length} exact Buildprint snapshot files`,
    nextAction: isExecutablePacket
      ? 'read .buildprint/next-agent.md, complete setup and local skill harness, generate identity, then follow the active kernel loop'
      : 'read .buildprint/next-agent.md and begin alignment or default-preset flow',
    runtimeEvidenceLedger: hasLegacyRuntimeEvidence ? '.buildprint/evidence/evidence-ledger.jsonl' : null,
    harnessProfiles,
    updatedAt: now,
  })

  fs.writeFileSync(path.join(stateDir, 'progress.md'), isExecutablePacket
    ? `# Build Progress\n\n## Done\n- Bootstrapped .buildprint/ from package manifest.\n- Downloaded ${downloaded.length} exact Buildprint snapshot files.\n- Prepared kernel-loop state.\n\n## Current\n- Active loop: \`${activePhase || 'unknown'}\`.\n\n## Next\n- Follow \`.buildprint/next-agent.md\`, complete setup and local skill harness, generate identity, then execute the active kernel loop.\n`
    : `# Build Progress\n\n## Done\n- Bootstrapped .buildprint/ from package manifest.\n- Downloaded ${downloaded.length} exact Buildprint snapshot files.\n\n## Current\n- Phase 00 - Alignment.\n\n## Next\n- Read snapshots and follow the Buildprint alignment rules.\n`)
  fs.writeFileSync(path.join(stateDir, 'decisions.md'), `# Decisions

No implementation decisions recorded yet. Add confirmed alignment choices here.

Hard-stop rows must be filled before setup or loop work. Use \`confirmed_by: user\`, \`confirmed_by: explicit_user_delegation\`, or \`confirmed_by: blocker\`; never use \`confirmed_by: agent_assumption\` for hard-stops.

| Question | answer | confirmed_by | delegation_quote | reversible | blocks_setup |
|---|---|---|---|---:|---:|
| Deployment posture |  |  |  | no | yes |
| Secrets and provider policy |  |  |  | no | yes |
| Destructive/data-loss behavior |  |  |  | no | yes |
| Privacy/compliance exposure |  |  |  | no | yes |
| Product/artifact identity |  |  |  | no | yes |
`)
  fs.writeFileSync(path.join(stateDir, 'blockers.md'), `# Blockers\n\nNone currently.\n`)
  fs.writeFileSync(path.join(stateDir, 'next-agent.md'), isExecutablePacket ? `# Next Agent Instructions

Start here.

This is a kernel_loop executable Buildprint (\`buildprint/kernel/v1\`). Local runtime state wins over stale assumptions, but package snapshots remain read-only.

Kernel: goal → bare agentic loop → optional independent fan-out → contract review.

1. Read \`.buildprint/source.json\` and \`.buildprint/state.json\`.
2. Read order: ${manifestReadOrder.map((file) => `\`${snapshotPathFor(file)}\``).join(' -> ')}.
3. Read \`${snapshotPathFor('00-goal.md')}\`; stop unless every hard-stop row is user-confirmed, explicitly delegated, or recorded as a blocker in \`.buildprint/decisions.md\`. Ask unresolved hard-stop questions before \`${snapshotPathFor(setupFile)}\`.
4. Read and complete \`${snapshotPathFor(setupFile)}\`; initialize the project-local skill harness from the profiles declared in \`${snapshotPathFor('blueprint.yaml')}\` by running \`${harnessInitCommand}\` if \`agb\` is available. Then run \`agb harness check . --provider agents${harnessProfiles.map((profile) => profile === 'default' ? '' : ` --profile ${profile}`).join('')}\` and \`agb harness checkup . --provider agents${harnessProfiles.map((profile) => profile === 'default' ? '' : ` --profile ${profile}`).join('')}\`. If \`agb\` is unavailable, create the \`AGENTS.md\` harness section and local skills described by the setup file.
5. Read \`${snapshotPathFor(uiIdentityFile)}\`; for UI-bearing artifacts, load the local \`frontend-ui-product-design\` skill and generate local identity/design artifacts before loop work.
6. Confirm setup and identity proof are complete before loop work.
7. Read \`${snapshotPathFor('loops/loop-flow.md')}\`.
8. Load only the active loop named in \`${snapshotPathFor('loops/loop-index.yaml')}\`: \`${activePhase || 'unknown'}\`.
9. Run a bare agentic loop against the goal: think → act → observe, verify, repair visible slop/fake-success shortcuts, and record useful handover facts. Fan out only with clean ownership.
10. Before claiming done, run independent \`${snapshotPathFor('review.md')}\`.
11. Before completion or stopping, write the handover described in \`${snapshotPathFor('HANDOVER.md')}\`.

Whenever you stop, end your handover with this menu so the developer has a concrete choice (fill in real loop ids from \`loops/loop-index.yaml\`):

1. Continue one loop — implement the next loop only, then stop and show this menu again.
2. Continue to the next checkpoint — implement through verification, pausing only on a real blocker.
3. Do all remaining loops — implement every dependency-ready loop through final handover, stopping only on real blockers.
4. Stop here.

Rules:

- Do not read every loop upfront.
- Do not write, rewrite, or append to \`.buildprint/snapshots/**\`; snapshots are immutable downloaded package files.
- Project root/local \`AGENTS.md\` files belong in the implementation project and should be created or patched by \`${harnessInitCommand}\` from \`${setupFile}\`, not shipped in the packet. Use the profiles declared in \`blueprint.yaml\`; do not default to \`full\`.
- Keep claims scoped until the built product has been checked directly.
- Do not create proof theater or evidence-ledger bureaucracy; contract review against the goal is the verification surface.
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

if (args[0] === 'harness') {
  const sub = args[1]
  if (!sub || isHelp(sub)) usage(0)
  const project = positionalArgs(2)[0] || cwd
  const provider = optionValue('--provider') || optionValue('--agent') || 'agents'
  const profiles = optionValues('--profile', '--profiles')
  const selectedProfiles = profiles.length ? profiles : ['default']
  const json = args.includes('--json')
  try {
    if (sub === 'init') process.exit(harnessInit(project, provider, json, selectedProfiles) ? 0 : 1)
    if (sub === 'check') {
      const result = harnessCheckResult(project, provider, selectedProfiles)
      printHarnessResult(result, json)
      process.exit(result.status === 'pass' ? 0 : 1)
    }
    if (sub === 'checkup') {
      const result = harnessCheckResult(project, provider, selectedProfiles, 'checkup')
      printHarnessResult(result, json)
      process.exit(result.status === 'missing' ? 1 : 0)
    }
    throw new Error(`unknown harness subcommand: ${sub}`)
  } catch (error) {
    console.error(`Harness ${sub} failed: ${error.message}`)
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

// Obsolete runner commands were removed with the Mapper OS v3 phase-driven packet.

// ---------------------------------------------------------------------------
// agb verify ui <project>
// Deterministic artifact checker. Reads the BUILT project and reports
// literal/identity-derived violations that a builder cannot self-pass.
// Each check is a pure function returning { id, pass, evidence }.
// ---------------------------------------------------------------------------

function verifyUiChecks(projectRoot) {
  const buildprintDir = path.join(projectRoot, '.buildprint')
  const decisionsFile = path.join(buildprintDir, 'decisions.md')
  const stateFile = path.join(buildprintDir, 'state.json')
  const uiIdentityFiles = [
    path.join(projectRoot, 'docs', 'ui-identity.md'),
    path.join(projectRoot, 'UI-IDENTITY.md')
  ]
  const uiIdentityFile = uiIdentityFiles.find((file) => exists(file)) || uiIdentityFiles[0]
  const designSystemFile = path.join(projectRoot, 'docs', 'DESIGN.md')
  const architectureFile = path.join(projectRoot, 'docs', 'architecture.md')
  const uiEvidenceFile = path.join(buildprintDir, 'ui-evidence.md')
  const results = []

  // Check 1: decisions-stub
  // Fails when decisions.md still contains the empty stub while state records completed phases.
  const decisionsStubText = 'No implementation decisions recorded yet.'
  const decisionsContent = safeReadText(decisionsFile)
  const stateContent = safeReadText(stateFile)
  let stateCompletedPhases = []
  try { stateCompletedPhases = JSON.parse(stateContent).completedPhases || [] } catch { /* ignore */ }
  const decisionsIsStub = decisionsContent.includes(decisionsStubText)
  const hasPhasesCompleted = stateCompletedPhases.length > 0
  results.push({
    id: 'decisions-stub',
    pass: !(decisionsIsStub && hasPhasesCompleted),
    evidence: decisionsIsStub && hasPhasesCompleted
      ? `${path.relative(projectRoot, decisionsFile)} still contains the empty stub while ${stateCompletedPhases.length} phase(s) are marked complete in state.json`
      : '',
  })
  if (hasPhasesCompleted) results.push(...hardStopDecisionChecks(projectRoot))

  // Check 2: raw-json-in-dom
  // Fails when HTML/JS renders payloads via JSON.stringify(..., null, 2) bound to .textContent / innerHTML.
  // Scoped to event, telemetry, message, memory, and trace surfaces to avoid false positives on JSON viewers.
  const RAW_JSON_PATTERN = /JSON\.stringify\s*\([^)]*,\s*null\s*,\s*2\s*\)/g
  const CONTEXT_ASSIGN_PATTERN = /\.(textContent|innerHTML)\s*=\s*JSON\.stringify|JSON\.stringify[^;]*\.textContent|JSON\.stringify[^;]*\.innerHTML/
  const htmlFiles = walk(path.join(projectRoot, 'public')).filter((f) => f.endsWith('.html') || f.endsWith('.js'))
  const srcFiles = walk(path.join(projectRoot, 'src')).filter((f) => f.endsWith('.ts') || f.endsWith('.js'))
  const candidateFiles = [...htmlFiles, ...srcFiles]
  const uiSurfaceFiles = candidateFiles.filter((file) =>
    !/[\\/]node_modules[\\/]/.test(file) &&
    !/[\\/](test|tests|__tests__|fixtures|evidence)[\\/]/i.test(file) &&
    !/\.(test|spec)\.[cm]?[jt]sx?$/i.test(file) &&
    !/\.d\.ts$/i.test(file)
  )
  const rawJsonEvidence = []
  for (const file of candidateFiles) {
    const content = safeReadText(file)
    const lines = content.split(/\r?\n/)
    lines.forEach((line, idx) => {
      if (RAW_JSON_PATTERN.test(line) && CONTEXT_ASSIGN_PATTERN.test(line)) {
        rawJsonEvidence.push(`${path.relative(projectRoot, file)}:${idx + 1}`)
      }
      RAW_JSON_PATTERN.lastIndex = 0
    })
  }
  results.push({
    id: 'raw-json-in-dom',
    pass: rawJsonEvidence.length === 0,
    evidence: rawJsonEvidence.length > 0 ? `raw JSON rendered to DOM at: ${rawJsonEvidence.join(', ')}` : '',
  })

  // Check 3: context-leakage
  // Fails when rendered message/assistant output or response payloads contain internal runtime field tokens.
  // These are tokens that the mock provider echoes back from context; they are never valid product output.
  const LEAKAGE_TOKENS = ['--TURN', 'context_source', 'recent_messages', 'session_checkpoint']
  const leakageFiles = [...htmlFiles, ...srcFiles, ...walk(path.join(projectRoot, 'evidence')).filter((f) => f.endsWith('.txt') || f.endsWith('.json'))]
  const leakageEvidence = []
  for (const file of leakageFiles) {
    const content = safeReadText(file)
    for (const token of LEAKAGE_TOKENS) {
      if (content.includes(token)) {
        leakageEvidence.push(`"${token}" in ${path.relative(projectRoot, file)}`)
        break
      }
    }
  }
  results.push({
    id: 'context-leakage',
    pass: leakageEvidence.length === 0,
    evidence: leakageEvidence.length > 0 ? `internal runtime tokens found in output surfaces: ${leakageEvidence.join('; ')}` : '',
  })

  // Check 4: ui-identity-present
  // UI verification is a shipment gate. A UI-bearing artifact cannot pass if its
  // product identity contract is absent, because derived checks have no source.
  const uiIdentity = safeReadText(uiIdentityFile)
  const isExplicitNonUi = /\bnot-ui-bearing\b/i.test(uiIdentity)
  results.push({
    id: 'ui-identity-present',
    pass: !!uiIdentity || isExplicitNonUi,
    evidence: uiIdentity
      ? `${path.relative(projectRoot, uiIdentityFile)} present${isExplicitNonUi ? ' and marks artifact not-ui-bearing' : ''}`
      : 'missing docs/ui-identity.md or UI-IDENTITY.md; UI-bearing artifacts must generate an identity before phase work and handoff',
  })

  // Check 4b: design-system-present
  // UI verification also requires a separate visual taste system. Product/interaction
  // identity and visual craft are distinct contracts; either can fail independently.
  const designSystem = safeReadText(designSystemFile)
  results.push({
    id: 'design-system-present',
    pass: isExplicitNonUi || !!designSystem,
    evidence: designSystem
      ? `${path.relative(projectRoot, designSystemFile)} present`
      : (isExplicitNonUi
          ? 'artifact is marked not-ui-bearing in the UI identity artifact'
          : 'missing docs/DESIGN.md; UI-bearing artifacts must generate a visual taste system before phase work and handoff'),
  })
  results.push(...designSystemChecks({ projectRoot, designSystemFile, isUiBearing: !isExplicitNonUi }))

  const isAgenticChatArtifact = /Agentic Chat|chat-native agent interface/i.test(uiIdentity)
  const uiEvidence = safeReadText(uiEvidenceFile)
  results.push(...uiEvidenceChecks({ projectRoot, uiEvidenceFile, isUiBearing: !isExplicitNonUi }))

  // Check 4c: agentic-chat-consumer-craft-evidence
  // Agentic Chat has an additional shipment gate: evidence must explicitly prove
  // the default viewport is a polished consumer chat surface, not the old
  // harness-demo state with seeded feature cards.
  if (isAgenticChatArtifact && !isExplicitNonUi) {
    const hasConsumerCraftEvidence =
      /Consumer Chat Craft Gate/i.test(uiEvidence) &&
      /Design Read/i.test(uiEvidence) &&
      /Taste Dials/i.test(uiEvidence) &&
      /no seeded|without seeded|seeded.*(absent|removed|not visible|not present)/i.test(uiEvidence) &&
      /composer/i.test(uiEvidence) &&
      /mobile/i.test(uiEvidence) &&
      /system-label|internal status|route\/provider\/memory|provider.*label/i.test(uiEvidence)
    results.push({
      id: 'agentic-chat-consumer-craft-evidence',
      pass: hasConsumerCraftEvidence,
      evidence: hasConsumerCraftEvidence
        ? `${path.relative(projectRoot, uiEvidenceFile)} records Consumer Chat Craft Gate, Design Read, taste dials, no seeded cards, composer/mobile, and system-label suppression evidence`
        : 'Agentic Chat evidence must explicitly record Consumer Chat Craft Gate, Design Read, taste dials, no seeded feature cards in the default viewport, composer/mobile proof, and system-label suppression',
    })
  }

  // Check 4d: agentic-chat-no-seeded-default-actions
  // Fails stale or reused implementations that still show default approval,
  // memory, restore, provider, or route cards before user intent.
  if (isAgenticChatArtifact && !isExplicitNonUi) {
    const staleSeededPatterns = [
      /Read current folder/i,
      /Save preference/i,
      /Restore point ready/i,
      /Inspect local files\?/i,
      /Save this memory/i,
      /Restore here/i,
    ]
    const seededEvidence = []
    const seededSearchFiles = [
      uiEvidenceFile,
      ...walk(path.join(projectRoot, 'data')).filter((f) => /\.(json|jsonl|txt|md)$/i.test(f)),
    ].filter(Boolean)
    for (const file of seededSearchFiles) {
      const content = safeReadText(file)
      const lines = content.split(/\r?\n/)
      lines.forEach((line, idx) => {
        if (seededEvidence.length >= 20) return
        const seededMatch = staleSeededPatterns.find((pattern) => pattern.test(line))
        if (seededMatch) seededEvidence.push(`${path.relative(projectRoot, file)}:${idx + 1} contains stale seeded action text matching ${seededMatch}`)
      })
    }
    results.push({
      id: 'agentic-chat-no-seeded-default-actions',
      pass: seededEvidence.length === 0,
      evidence: seededEvidence.length > 0
        ? seededEvidence.join('; ')
        : '',
    })

    const staleStatusPatterns = [
      /Local route ready/i,
      /Live route needs key/i,
      /\bsaved memories\b/i,
    ]
    const statusEvidence = []
    const statusSearchFiles = [
      uiEvidenceFile,
      ...walk(path.join(projectRoot, 'data')).filter((f) => /\.(json|jsonl|txt|md)$/i.test(f)),
    ].filter(Boolean)
    for (const file of statusSearchFiles) {
      const lines = safeReadText(file).split(/\r?\n/)
      lines.forEach((line, idx) => {
        if (statusEvidence.length >= 20) return
        const match = staleStatusPatterns.find((pattern) => pattern.test(line))
        if (match) statusEvidence.push(`${path.relative(projectRoot, file)}:${idx + 1} exposes default system status text matching ${match}`)
      })
    }
    results.push({
      id: 'agentic-chat-default-status-suppression',
      pass: statusEvidence.length === 0,
      evidence: statusEvidence.length > 0
        ? statusEvidence.join('; ')
        : '',
    })
  }

  // Check 5: proof-console-leakage
  // Fails when obvious build/evaluator/debug wording appears in app-facing UI.
  // Diagnostics can still expose internals, but the product surface cannot be a
  // proof console with nicer spacing.
  const DEBUG_UI_PATTERNS = [
    /\bproof\b/i,
    /\bfixture\b/i,
    /\bdeterministic\b/i,
    /\bblocked provider\b/i,
    /\brun ledger\b/i,
    /\bsaved point\b/i,
    /\bresponse engine setup\b/i,
    /\bmock provider\b/i,
    /\bevaluator\b/i,
    /\bbuildprint\b/i,
  ]
  const debugUiEvidence = []
  for (const file of uiSurfaceFiles) {
    const lines = safeReadText(file).split(/\r?\n/)
    lines.forEach((line, idx) => {
      if (debugUiEvidence.length >= 20) return
      const match = DEBUG_UI_PATTERNS.find((pattern) => pattern.test(line))
      if (match) debugUiEvidence.push(`${path.relative(projectRoot, file)}:${idx + 1} matches ${match}`)
    })
  }
  results.push({
    id: 'proof-console-leakage',
    pass: debugUiEvidence.length === 0,
    evidence: debugUiEvidence.length > 0 ? `debug/build/proof terms found in app-facing UI: ${debugUiEvidence.join('; ')}` : '',
  })

  const GENERIC_SHELL_PATTERNS = [
    /\bdashboard\b/i,
    /\bworkbench\b/i,
    /\bstudio\b/i,
    /\bcontrol panel\b/i,
    /\bstatus panel\b/i,
  ]
  const shellEvidence = []
  if (isAgenticChatArtifact && !isExplicitNonUi) {
    for (const file of uiSurfaceFiles) {
      const lines = safeReadText(file).split(/\r?\n/)
      lines.forEach((line, idx) => {
        if (shellEvidence.length >= 20) return
        const match = GENERIC_SHELL_PATTERNS.find((pattern) => pattern.test(line))
        if (match) shellEvidence.push(`${path.relative(projectRoot, file)}:${idx + 1} matches ${match}`)
      })
    }
  }
  results.push({
    id: 'generic-shell-language',
    pass: shellEvidence.length === 0,
    evidence: shellEvidence.length > 0 ? `generic dashboard/workbench shell language found: ${shellEvidence.join('; ')}` : '',
  })

  const architecture = safeReadText(architectureFile)
  const architectureRequired = hasPhasesCompleted || exists(architectureFile)
  const architectureDeepEnough = /scalab/i.test(architecture) &&
    /maintainab/i.test(architecture) &&
    /\bSOLID\b/i.test(architecture) &&
    /\bKISS\b/i.test(architecture) &&
    /\bDRY\b/i.test(architecture) &&
    /schema evolution|migration/i.test(architecture) &&
    /boundary|interface|adapter/i.test(architecture)
  results.push({
    id: 'architecture-foundation-depth',
    pass: !architectureRequired || architectureDeepEnough,
    evidence: architectureRequired
      ? 'docs/architecture.md must name scalability, maintainability, SOLID/KISS/DRY, schema evolution or migrations, and runtime/module boundaries'
      : '',
  })
  results.push(...architectureUiStackChecks({ architectureText: architecture, isUiBearing: !isExplicitNonUi }))

  // Check 6: forbidden-words
  // Reads docs/ui-identity.md to derive the project's own forbidden-word list and "not a X" claims,
  // then checks whether the shipped UI markup uses those words.
  // Identity-derived: if the project has no ui-identity.md, this check fails instead of skipping.
  if (!uiIdentity) {
    results.push({ id: 'forbidden-words', pass: false, evidence: 'cannot evaluate forbidden words because the UI identity artifact is missing' })
  } else {
    // Extract "Forbidden main surface words" list from the identity doc (section 5)
    const forbiddenSection = uiIdentity.match(/##\s*\d*[^#\n]*[Ff]orbidden[^#\n]*main[^#\n]*surface[^#\n]*([\s\S]*?)(?=\n##|\n#[^#]|$)/i)?.[1] || ''
    const forbiddenWords = [...forbiddenSection.matchAll(/["`'*]([^`'"*\n]+)["`'*]/g)].map((m) => m[1].trim()).filter((w) => w.length > 2)
    // Extract "not a X" phrases from section 1/product thesis — capture the first word only, skip very short tokens
    const notAMatches = [...uiIdentity.matchAll(/not\s+an?\s+([A-Za-z][A-Za-z-]+)/gi)].map((m) => m[1].trim()).filter((w) => w.length >= 5)
    const allForbidden = [...new Set([...forbiddenWords, ...notAMatches])]

    const uiMarkupFiles = uiSurfaceFiles.filter((file) => /\.(html|jsx?|tsx?)$/i.test(file))
    const forbiddenViolations = []
    for (const file of uiMarkupFiles) {
      const content = safeReadText(file)
      for (const word of allForbidden) {
        const re = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
        const lineIdx = content.split(/\r?\n/).findIndex((l) => re.test(l))
        if (lineIdx >= 0) {
          forbiddenViolations.push(`"${word}" found in ${path.relative(projectRoot, file)}:${lineIdx + 1}`)
        }
      }
    }
    results.push({
      id: 'forbidden-words',
      pass: forbiddenViolations.length === 0,
      evidence: forbiddenViolations.length > 0 ? `identity-doc forbidden words found in markup: ${forbiddenViolations.join('; ')}` : '',
    })
  }

  return results
}

function printVerifyUiResults(checks, projectRoot) {
  const reportLines = ['# Artifact Check\n']
  let failed = 0
  for (const check of checks) {
    if (check.pass) {
      console.log(`✓ ${check.id}${check.evidence ? ` (${check.evidence})` : ''}`)
      reportLines.push(`- [PASS] ${check.id}${check.evidence ? `: ${check.evidence}` : ''}`)
    } else {
      failed++
      console.log(`✗ ${check.id}: ${check.evidence}`)
      reportLines.push(`- [FAIL] ${check.id}: ${check.evidence}`)
    }
  }
  const summary = failed === 0 ? 'PASS' : `FAIL (${failed} check${failed > 1 ? 's' : ''} failed)`
  console.log(`\nArtifact check: ${summary}`)
  reportLines.push(`\n## Result\n\n${summary}`)
  const buildprintDir = path.join(projectRoot, '.buildprint')
  if (exists(buildprintDir)) {
    fs.writeFileSync(path.join(buildprintDir, 'artifact-check.md'), reportLines.join('\n') + '\n')
  }
  return failed === 0
}

function verifyUi(projectRoot) {
  const resolved = path.resolve(projectRoot || '.')
  if (!exists(resolved)) throw new Error(`project folder not found: ${resolved}`)
  const checks = verifyUiChecks(resolved)
  return printVerifyUiResults(checks, resolved)
}

function printClaimResults(checks) {
  let failed = 0
  for (const check of checks) {
    if (check.pass) console.log(`âœ“ ${check.id}`)
    else {
      failed++
      console.log(`âœ— ${check.id}: ${check.evidence}`)
    }
  }
  console.log(`\nClaim check: ${failed ? `FAIL (${failed} failed)` : 'PASS'}`)
  return failed === 0
}

function claimCheck(projectRoot) {
  const resolved = path.resolve(projectRoot || '.')
  if (!exists(resolved)) throw new Error(`project folder not found: ${resolved}`)
  return printClaimResults(claimChecks(resolved))
}

function hostAuditFiles(projectRoot) {
  const ignoredDirs = new Set([
    '.git',
    'node_modules',
    'dist',
    'build',
    '.next',
    '.expo',
    'coverage',
    'backups',
  ])
  const allowed = /\.(css|scss|sass|less|html|js|jsx|ts|tsx|vue|svelte|mdx?)$/i
  const out = []
  function visit(dir) {
    if (!exists(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ignoredDirs.has(entry.name)) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (full.includes(`${path.sep}.buildprint${path.sep}screenshots`)) continue
        visit(full)
        continue
      }
      if (entry.isFile() && allowed.test(entry.name)) out.push(full)
    }
  }
  visit(projectRoot)
  return out
}

function firstPatternHit(files, pattern, projectRoot, limit = 20) {
  const hits = []
  for (const file of files) {
    const lines = safeReadText(file).split(/\r?\n/)
    lines.forEach((line, index) => {
      if (hits.length >= limit) return
      pattern.lastIndex = 0
      if (pattern.test(line)) hits.push(`${path.relative(projectRoot, file)}:${index + 1}`)
    })
    if (hits.length >= limit) break
  }
  return hits
}

function designQualityLiftChecks(projectRoot) {
  const buildprintDir = path.join(projectRoot, '.buildprint')
  const directionFile = path.join(buildprintDir, 'design-direction.yaml')
  const receiptFile = path.join(buildprintDir, 'design-quality-lift-receipt.md')
  const direction = safeReadText(directionFile)
  const receipt = safeReadText(receiptFile)
  const files = hostAuditFiles(projectRoot)
  const combined = files.map((file) => safeReadText(file)).join('\n')
  const checks = []
  const ok = (id, pass, evidence = '') => checks.push({ id, pass, evidence })

  ok('direction-profile-locked',
    exists(directionFile) &&
      /^direction:\s*(clean-minimal|warm-human|brutalist|premium-luxury|wild-creative|custom:[a-z0-9][a-z0-9_-]*)\s*$/mi.test(direction),
    exists(directionFile) ? '' : 'missing .buildprint/design-direction.yaml')
  ok('three-dials-recorded',
    /DESIGN_VARIANCE:\s*(10|[1-9])\b/i.test(direction) &&
      /MOTION_INTENSITY:\s*(10|[1-9])\b/i.test(direction) &&
      /VISUAL_DENSITY:\s*(10|[1-9])\b/i.test(direction),
    'design-direction.yaml must set DESIGN_VARIANCE, MOTION_INTENSITY, and VISUAL_DENSITY to 1-10')
  ok('visual-risk-budget-recorded',
    /visual_risk_budget:\s*\n\s*-\s+\S+/i.test(direction),
    'design-direction.yaml must record at least one visual risk budget item')
  ok('typography-and-icon-recorded',
    /typography_pairing:/i.test(direction) && /icon_library:\s*\S+/i.test(direction),
    'design-direction.yaml must record typography_pairing and icon_library')

  const receiptFields = [
    'direction_profile_locked',
    'three_dials_recorded',
    'before_after_screenshots',
    'lighthouse_audit',
    'axe_audit',
    'microcopy_inventory',
    'motion_inventory',
    'icon_library_inventory',
    'typography_pairing_recorded',
    'signature_moment_proof',
    'visual_risk_budget_audit',
    'banned_defaults_audit',
  ]
  const missingReceiptFields = receiptFields.filter((field) => !new RegExp(field, 'i').test(receipt))
  ok('design-quality-receipt-complete',
    exists(receiptFile) && missingReceiptFields.length === 0,
    exists(receiptFile)
      ? `missing receipt fields: ${missingReceiptFields.join(', ')}`
      : 'missing .buildprint/design-quality-lift-receipt.md')

  const bannedDefaults = [
    ['llm-default-serif-display', /\b(Fraunces|Instrument_Serif|Playfair Display|Cormorant Garamond)\b/i],
    ['llm-default-inter-slate', /Inter[\s\S]{0,80}(slate-900|#0f172a)|slate-900[\s\S]{0,80}Inter/i],
    ['ai-purple-gradient', /linear-gradient\([^)]*(purple|violet|fuchsia|indigo)[^)]*\)/i],
    ['centered-hero-dark-mesh', /radial-gradient\([^)]*(purple|violet|fuchsia|indigo|slate|black)[^)]*\)/i],
    ['three-equal-feature-cards', /\b(three|3)\s+equal\s+(feature\s+)?cards\b/i],
    ['hand-rolled-svg-icons', /<svg[\s\S]{0,240}<path\s+d=/i],
    ['generic-friendly-microcopy', /\b(Oops|Whoopsie|Whoops)\b/i],
    ['infinite-loop-animations', /\banimation\s*:[^;{}]*\binfinite\b|\banimate-spin\b/i],
    ['random-cubic-bezier', /cubic-bezier\((?!0\.2,\s*0,\s*0,\s*1|0\.4,\s*0,\s*0\.2,\s*1|0,\s*0,\s*0\.2,\s*1)[^)]+\)/i],
  ]
  for (const [id, pattern] of bannedDefaults) {
    const hits = firstPatternHit(files, pattern, projectRoot)
    ok(`banned-default-${id}`, hits.length === 0, hits.length ? hits.join(', ') : '')
  }

  ok('prefers-reduced-motion-fallback',
    /prefers-reduced-motion/i.test(combined),
    'missing prefers-reduced-motion fallback in audited host files')
  ok('prefers-reduced-transparency-fallback',
    /prefers-reduced-transparency/i.test(combined),
    'missing prefers-reduced-transparency fallback in audited host files')

  return checks
}

function printDesignQualityLiftResults(checks) {
  let failed = 0
  for (const check of checks) {
    if (check.pass) console.log(`✓ ${check.id}`)
    else {
      failed++
      console.log(`✗ ${check.id}: ${check.evidence}`)
    }
  }
  console.log(`\nDesign quality lift check: ${failed ? `FAIL (${failed} failed)` : 'PASS'}`)
  return failed === 0
}

function designQualityLiftCheck(projectRoot) {
  const resolved = path.resolve(projectRoot || '.')
  if (!exists(resolved)) throw new Error(`project folder not found: ${resolved}`)
  return printDesignQualityLiftResults(designQualityLiftChecks(resolved))
}

if (args[0] === 'verify') {
  const sub = args[1]
  const project = args[2] || '.'
  if (!sub || isHelp(sub)) usage(0)
  try {
    if (sub === 'ui') process.exit(verifyUi(project) ? 0 : 1)
    throw new Error(`unknown verify subcommand: ${sub}`)
  } catch (error) {
    console.error(`Verify ${sub} failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'claim') {
  const sub = args[1]
  const project = args[2] || '.'
  if (!sub || isHelp(sub)) usage(0)
  try {
    if (sub === 'check') process.exit(claimCheck(project) ? 0 : 1)
    throw new Error(`unknown claim subcommand: ${sub}`)
  } catch (error) {
    console.error(`Claim ${sub} failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'check:design-quality-lift') {
  const project = args[1] || '.'
  if (isHelp(project)) usage(0)
  try {
    process.exit(designQualityLiftCheck(project) ? 0 : 1)
  } catch (error) {
    console.error(`Design quality lift check failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'check') {
  if (isHelp(args[1])) usage(0)
  const folder = args[1]
  if (!folder) usage(1)
  try {
    const code = optionValue('--code')
    const ok = printBlueprintResults(checkBlueprint(folder, { code, cwd }))
    process.exit(ok ? 0 : 1)
  } catch (error) {
    console.error(`Check failed: ${error.message}`)
    process.exit(1)
  }
}
usage(1)
