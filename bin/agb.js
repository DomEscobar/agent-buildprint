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

function isCapabilityPacket(dir) {
  const capabilityFile = path.join(dir, 'capability.yaml')
  if (!exists(capabilityFile)) return false
  const capability = safeReadText(capabilityFile)
  return /schema:\s*agent-buildprint\/capability\.v0/i.test(capability) ||
    /type:\s*capability/i.test(capability)
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
  const phasesDir = '02-implementation-phases'
  const phaseFiles = [
    `${phasesDir}/01-contract-and-config.md`,
    `${phasesDir}/02-core-integration.md`,
    `${phasesDir}/03-host-wiring.md`,
    `${phasesDir}/04-user-operator-surface.md`,
    `${phasesDir}/05-verification-and-receipt.md`,
  ]
  const requiredFiles = [
    'BUILDPRINT.md',
    'README.md',
    'capability.yaml',
    'compatibility.md',
    'apply.md',
    'verify.md',
    '00-host-assessment.md',
    '00-assessment-questions.md',
    '01-integration-plan.md',
    ...phaseFiles,
  ]
  const phaseTexts = phaseFiles.map((file) => safeReadText(path.join(dir, file)))
  const assessmentQuestions = safeReadText(path.join(dir, '00-assessment-questions.md'))
  const combinedCapabilityText = [capability, buildprint, apply, verify, compatibility, publication, ...phaseTexts].join('\n')
  const requiredCapabilityItems = yamlListItemsInSection(capability, 'requires', 'existing_capabilities')
  const expectedCapabilityItems = yamlListItemsInSection(capability, 'composition', 'expects')
  const credentialCapability = isCredentialCapability(capability, buildprint, publication)
  const secureRagCapability = isSecureRagCapability(capability, buildprint, publication)
  const agenticChatEvalCapability = isAgenticChatEvalCapability(capability, buildprint, publication)
  const designQualityLiftCapability = isDesignQualityLiftCapability(capability, buildprint, publication)
  const evolutionaryCodingRuntimeCapability = isEvolutionaryCodingRuntimeCapability(capability, buildprint, publication)

  for (const file of requiredFiles) ok(`capability file exists: ${file}`, files.has(file))
  ok('capability packet has no product-only v3 blueprint router', !files.has('blueprint.yaml') && !files.has('03-phases/phase-index.yaml') && !files.has('HANDOVER.md'))
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
  ok('BUILDPRINT enforces read order through verify', /BUILDPRINT\.md[\s\S]*capability\.yaml[\s\S]*compatibility\.md[\s\S]*00-host-assessment\.md[\s\S]*00-assessment-questions\.md[\s\S]*01-integration-plan\.md[\s\S]*apply\.md[\s\S]*verify\.md/i.test(buildprint))
  ok('BUILDPRINT forbids implementation before assessment and plan', /No source edits before host assessment and capability plan/i.test(buildprint) || /must not make source edits before.*host assessment.*capability plan/i.test(buildprint))
  ok('capability packet requires discovery decision gate', hasDiscoveryDecisionGate(`${buildprint}\n${safeReadText(path.join(dir, '00-host-assessment.md'))}\n${apply}`))
  ok('capability packet requires assessment-led questions after host assessment',
    /after `?00-host-assessment\.md`?.*before `?01-integration-plan\.md`?/i.test(assessmentQuestions) &&
    /Hard-stop questions/i.test(assessmentQuestions) &&
    /Assumable defaults/i.test(assessmentQuestions) &&
    /Deferrable questions/i.test(assessmentQuestions) &&
    /agent_assumption.*invalid|invalid.*agent_assumption/i.test(assessmentQuestions)
  )
  ok('capability packet requires proof reconciliation and claim downgrade', hasAssessmentReconciliation(`${verify}\n${safeReadText(path.join(dir, '01-integration-plan.md'))}\n${buildprint}`))

  ok('compatibility names host signals and block conditions', /host app|host project/i.test(compatibility) && /block|blocked|must not proceed/i.test(compatibility))
  ok('apply requires assessment, questions, plan, phases, verify, and receipt in order', /00-host-assessment\.md[\s\S]*00-assessment-questions\.md[\s\S]*01-integration-plan\.md[\s\S]*02-implementation-phases[\s\S]*verify\.md[\s\S]*capability-receipt\.md/i.test(apply))
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

  for (const file of phaseFiles) {
    const text = safeReadText(path.join(dir, file))
    ok(`${file} has objective and proof gate`, /##\s*Objective/i.test(text) && /Proof before moving on|Required output|DO NOT/i.test(text))
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

function mapperOsRootCheckResults(dir) {
  const checks = []
  const ok = (label, pass, detail = '') => checks.push({ label, pass, detail })
  const buildprintJson = safeReadText(path.join(dir, 'buildprint.json'))
  const contracts = safeReadText(path.join(dir, 'CONTRACTS.md'))
  const quality = safeReadText(path.join(dir, 'policies/quality.md'))
  const spec = safeReadText(path.join(dir, 'SPEC.md'))
  const readme = safeReadText(path.join(dir, 'README.md'))
  const templateDir = path.join(dir, 'templates', 'executable-packet')
  const templateChecks = packetCheckResults(templateDir)
  const rootText = [buildprintJson, contracts, quality, spec, readme].join('\n')

  ok('mapper manifest includes critical review template source', /templates\/executable-packet\/03-phases\/critical-review-pushback\.md/i.test(buildprintJson))
  ok('mapper root requires hard-stop decisions before setup', /hard-stop/i.test(rootText) && /decisions\.md/i.test(rootText) && /before .*setup|before any phase work/i.test(rootText))
  ok('mapper root requires architecture framework and styling decisions', /Framework And Styling Decisions/i.test(rootText) && /ui_stack_exception/i.test(rootText) && /static DOM|plain CSS|static\/vanilla/i.test(rootText))
  ok('mapper root requires design construction contract', /docs\/DESIGN\.md/i.test(rootText) && /construction contract/i.test(rootText) && /taste prose|moodboard/i.test(rootText))
  ok('mapper root requires UI evidence binder', /\.buildprint\/ui-evidence\.md/i.test(rootText) && /screenshot|file:line/i.test(rootText) && /Identity prose is not evidence|prose-only/i.test(rootText))
  ok('mapper root separates phase core pass from claim qualification', /phase_core_passed/i.test(rootText) && /claim_qualified/i.test(rootText))

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
  const phaseIndex = safeReadText(path.join(dir, '03-phases/phase-index.yaml'))
  const phaseFlow = safeReadText(path.join(dir, '03-phases/phase-flow.md'))
  const isMapperTemplatePacket = normalizedPacketDir.endsWith('buildprints/buildprint-mapper-os/templates/executable-packet') ||
    normalizedPacketDir.endsWith('.buildprint/snapshots/templates/executable-packet') ||
    /Replace this template-level rule with the selected artifact's source-derived central output contract/i.test(blueprint)
  const uiIdentityText = safeReadText(path.join(dir, '02-ui-identity.md'))
  const isAgenticChatPacket = normalizedPacketDir.endsWith('buildprints/agentic-chat') ||
    /Product:\s*Agentic Chat/i.test(uiIdentityText) ||
    /capability_maturity:[\s\S]*full_claim:\s*agentic_chat/i.test(blueprint) ||
    /central_output_contract:[\s\S]*Agentic Chat/i.test(blueprint)
  const requiresTypedQualityRouting = isMapperTemplatePacket
  const isPresentationPacket = /name:\s*AI Presentation Generation Workbench/i.test(blueprint)
  const requiresCriticalReviewPushback = isMapperTemplatePacket ||
    isPresentationPacket ||
    /99-critical-review-pushback/i.test(phaseIndex) ||
    /99-critical-review-pushback/i.test(blueprint)

  const obsoleteFiles = allFiles.filter((file) =>
    file === '02-architecture.md' ||
    file === '03-ux-contract.md' ||
    file === '04-handover.md' ||
    file === '04-review.md' ||
    file === '05-handover.md' ||
    file.startsWith('slices/') ||
    file.startsWith('gates/') ||
    file.startsWith('teams/') ||
    file.startsWith('runner/') ||
    file.startsWith('generated/') ||
    file.startsWith('05-evidence/') ||
    file.includes('/slice.yaml') ||
    file.includes('/gate-index.yaml') ||
    packetHasObsoleteRouter(file)
  )

  const isLegacySliceGatePacket = /schema_version:\s*mapper-os\/executable-blueprint\/v2/i.test(blueprint) ||
    files.has('slices/_template/slice.yaml') ||
    files.has('gates/gate-index.yaml') ||
    /slices_dir:|gates_dir:|capsules_dir:/i.test(blueprint)

  ok('packet rejects obsolete v2 packet shape', !isLegacySliceGatePacket, isLegacySliceGatePacket ? 'found v2 schema, slices/gates, or slices_dir/gates_dir/capsules_dir' : '')

  const usesSetupFirstIdentitySecond = files.has('01-project-setup.md') && files.has('02-ui-identity.md')
  const setupFile = usesSetupFirstIdentitySecond ? '01-project-setup.md' : '02-project-setup.md'
  const uiIdentityFile = usesSetupFirstIdentitySecond ? '02-ui-identity.md' : '01-ui-identity.md'
  const need = [
    'BUILDPRINT.md',
    '00-questions.md',
    setupFile,
    uiIdentityFile,
    'blueprint.yaml',
    '03-phases/phase-index.yaml',
    '03-phases/phase-flow.md',
    'README.md',
    'HANDOVER.md'
  ]
  for (const file of need) ok(`packet file exists: ${file}`, files.has(file))
  ok('packet has no obsolete useless files', obsoleteFiles.length === 0, obsoleteFiles.length ? obsoleteFiles.join(', ') : '')
  ok('packet avoids obsolete routers/files recursively', !allFiles.some(packetHasObsoleteRouter))

  ok('blueprint declares v3 phase-driven schema', /schema_version:\s*mapper-os\/executable-blueprint\/v3/i.test(blueprint))
  ok('blueprint starts at BUILDPRINT and uses blueprint.yaml as machine contract', /execution_start:\s*BUILDPRINT\.md/i.test(blueprint) && /machine_contract:\s*blueprint\.yaml/i.test(blueprint))
  ok('blueprint routes only, markdown teaches/builds', /YAML routes; markdown teaches and builds/i.test(blueprint) || /phase_driven_comprehensive/i.test(blueprint))
  ok('blueprint declares required v3 packet files', need.every((file) => blueprint.includes(file)))
  ok('blueprint forbids obsolete selected shapes', /forbidden_shapes:/i.test(blueprint) && /slices\//i.test(blueprint) && /gates\//i.test(blueprint) && /generated\/agent-prompt\.md/i.test(blueprint))
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
  ok('agentic-chat declares explicit agentic execution model',
    !isAgenticChatPacket ||
    (/execution_model:/i.test(blueprint) &&
     /mode:\s*agentic_loop/i.test(blueprint) &&
     /builder_loop:/i.test(blueprint) &&
     /product_loop:/i.test(blueprint) &&
     /proof_loop:/i.test(blueprint) &&
     /Observe|observe/i.test(blueprint) &&
     /Interpret|interpret/i.test(blueprint) &&
     /Plan|plan/i.test(blueprint) &&
     /Act|act/i.test(blueprint) &&
     /Inspect|inspect/i.test(blueprint) &&
     /Critique|critique/i.test(blueprint) &&
     /Repair|repair/i.test(blueprint) &&
     /Verify|verify/i.test(blueprint) &&
     /Decide|decide/i.test(blueprint))
  )
  ok('agentic-chat separates streaming core from full agentic maturity',
    !isAgenticChatPacket ||
    (/capability_maturity:/i.test(blueprint) &&
     /current_floor:\s*streaming_chat_core/i.test(blueprint) &&
     /full_claim:\s*agentic_(chat|swarm)/i.test(blueprint) &&
     /Do not call the artifact (a complete Agentic Chat|agentic)/i.test(blueprint) &&
     /planning\/next-step loop|plan or next-step/i.test(blueprint) &&
     /tool\/skill execution policy|tool.*skill/i.test(blueprint) &&
     /MCP adapter posture/i.test(blueprint) &&
     /memory\/compaction/i.test(blueprint) &&
     /subagent\/delegation/i.test(blueprint) &&
     /benchmark evidence/i.test(blueprint))
  )
  ok('blueprint declares harness provider and profile selection',
    /harness:\s*\n[\s\S]*profiles:/i.test(blueprint) &&
    /provider:\s*agents/i.test(blueprint) &&
    /webapp|backend|agentic|full|default/i.test(blueprint)
  )
  ok('blueprint declares typed quality gate routing',
    !requiresTypedQualityRouting ||
    /typed_quality_gates:/i.test(blueprint) &&
    /ui_decision_precision:/i.test(blueprint) &&
    /visual_viewport_acceptance:/i.test(blueprint) &&
    /editor_stress_acceptance:/i.test(blueprint) &&
    /semantic_output_acceptance:/i.test(blueprint) &&
    /integration_operator_acceptance:/i.test(blueprint) &&
    /critical_review_pushback:/i.test(blueprint) &&
    /Select only the gates that match the artifact type/i.test(blueprint)
  )
  ok('blueprint declares proven implementation requirements',
    /proven_implementation_requirements:/i.test(blueprint) &&
    /proven libraries|proven packages|proven tool/i.test(blueprint) &&
    /fixed-format export|fixed format export/i.test(blueprint) &&
    /rich editing|rich text/i.test(blueprint) &&
    /document parsing|document extraction/i.test(blueprint) &&
    /drag|reorder/i.test(blueprint) &&
    /provider/i.test(blueprint) &&
    /task/i.test(blueprint) &&
    /frontend UI runtime/i.test(blueprint) &&
    /component\/state styling/i.test(blueprint) &&
    /responsive viewport proof/i.test(blueprint) &&
    /design token enforcement/i.test(blueprint) &&
    /migration/i.test(blueprint) &&
    /from-scratch|custom implementation/i.test(blueprint)
  )

  const readOrderPattern = usesSetupFirstIdentitySecond
    ? /00-questions\.md[\s\S]*01-project-setup\.md[\s\S]*02-ui-identity\.md[\s\S]*03-phases\/phase-index\.yaml[\s\S]*03-phases\/phase-flow\.md[\s\S]*HANDOVER\.md/i
    : /00-questions\.md[\s\S]*01-ui-identity\.md[\s\S]*02-project-setup\.md[\s\S]*03-phases\/phase-index\.yaml[\s\S]*03-phases\/phase-flow\.md[\s\S]*HANDOVER\.md/i
  ok('BUILDPRINT owns v3 read order', readOrderPattern.test(buildprint))
  ok('BUILDPRINT is an AI builder briefing', /responsible builder/i.test(buildprint) && /senior product engineer/i.test(buildprint))
  ok('BUILDPRINT defines role, responsibility, and perfection alignment', /Your role/i.test(buildprint) && /Your responsibility/i.test(buildprint) && /Perfection alignment/i.test(buildprint))
  ok('BUILDPRINT avoids product-specific mapped-source briefing', !/MiroFish|mapped from|previous repository|original repo|source project/i.test(buildprint))
  ok('BUILDPRINT forbids fake-success paths', /functionless buttons|dead controls|mocked\/sample data|fake provider|raw JSON/i.test(buildprint))

  const questions = safeReadText(path.join(dir, '00-questions.md'))
  const hardStopBeforeFile = usesSetupFirstIdentitySecond ? setupFile : uiIdentityFile
  ok('questions classify blocking power', /Hard-stop questions/i.test(questions) && /Assumable defaults/i.test(questions) && /Deferrable questions/i.test(questions) && new RegExp(`stop before \`?${hardStopBeforeFile.replace('.', '\\.')}\`?`, 'i').test(questions))
  ok('questions hard-stop sensitive decisions', /Deployment posture/i.test(questions) && /Secrets and provider policy/i.test(questions) && /Destructive\/data-loss behavior/i.test(questions) && /Privacy\/compliance exposure/i.test(questions) && /Product\/artifact identity/i.test(questions))
  ok('questions forbid hard-stop self-defaults',
    /confirmed_by:\s*user/i.test(questions) &&
    /confirmed_by:\s*explicit_user_delegation/i.test(questions) &&
    /agent_assumption.*invalid|invalid.*agent_assumption/i.test(questions) &&
    !/If not answered,\s*the agent may choose a reversible default/i.test(questions)
  )

  const setup = safeReadText(path.join(dir, setupFile))
  ok('project setup defines foundation before phase work', /foundation pour/i.test(setup) && (/Do not start `?03-phases\/\*`?/i.test(setup) || /Do not start `?02-ui-identity\.md`? or `?03-phases\/\*`?/i.test(setup)))
  ok('project setup requires durable setup artifacts', /AGENTS\.md/i.test(setup) && /docs\/architecture\.md/i.test(setup) && /\.env\.example/i.test(setup) && /setup-receipt\.md/i.test(setup))
  ok('project setup requires local skill harness',
    /agb harness init/i.test(setup) &&
    /agb harness checkup/i.test(setup) &&
    /Buildprint skill harness|local skill harness/i.test(setup) &&
    /setup-runbook/i.test(setup) &&
    /frontend-ui-product-design/i.test(setup) &&
    /subagent-driven-implementation/i.test(setup) &&
    /verify-and-review/i.test(setup) &&
    /triggers/i.test(setup) &&
    /skips/i.test(setup) &&
    /completion_signal/i.test(setup) &&
    /\.agents\/skills/i.test(setup) &&
    /AGENTS\.md/i.test(setup)
  )
  ok('project setup routes typed quality through architecture',
    !requiresTypedQualityRouting ||
    /typed_quality_gates/i.test(setup) &&
    /docs\/architecture\.md/i.test(setup) &&
    /applicable\/not applicable/i.test(setup) &&
    /command\/proof path/i.test(setup) &&
    /not applicable/i.test(setup)
  )
  ok('project setup routes proven implementation requirements',
    /proven_implementation_requirements/i.test(setup) &&
    /docs\/architecture\.md/i.test(setup) &&
    /libraries|runtimes|SDKs|platform services/i.test(setup) &&
    /hand-roll|from-scratch/i.test(setup) &&
    /Framework And Styling Decisions/i.test(setup) &&
    /React \+ Vite \+ TypeScript/i.test(setup) &&
    /Tailwind CSS v4 \+ tokenized CSS variables/i.test(setup) &&
    /ui_stack_exception/i.test(setup)
  )
  ok('project setup requires engineering quality bar',
    /scalab/i.test(setup) &&
    /maintainab/i.test(setup) &&
    /\bSOLID\b/i.test(setup) &&
    /\bKISS\b/i.test(setup) &&
    /coding standards|best practices/i.test(setup) &&
    /module boundaries|separation of concerns/i.test(setup) &&
    /lint|format|type-check/i.test(setup)
  )
  if (!usesSetupFirstIdentitySecond) {
    ok('project setup requires UI identity screen-state contract',
      /docs\/ui-identity\.md/i.test(setup) &&
      /dominant (creative )?object/i.test(setup) &&
      /primary (creative )?gesture/i.test(setup) &&
      /screen states|screen-state|visible-together|hidden\/reachable/i.test(setup) &&
      /forbidden default silhouette|old\/default layout patterns/i.test(setup) &&
      /first[- ]run comprehension|first[- ]screen sketch|primary screen sketch/i.test(setup)
    )
  } else {
    ok('project setup leaves UI identity to the identity step',
      !/docs\/ui-identity\.md|generated UI identity|preserve the generated UI identity|dominant object|primary gesture|forbidden default silhouette/i.test(setup)
    )
  }
  ok('project setup forbids fake setup shortcuts', /placeholder commands|real secrets|hide hard-stop/i.test(setup))

  const uiux = safeReadText(path.join(dir, uiIdentityFile))
  ok('ui identity opens with UX importance and understandability', /UX is a must/i.test(uiux) && /understand/i.test(uiux) && /not a finished product/i.test(uiux))
  ok('ui identity runs in the declared setup order',
    usesSetupFirstIdentitySecond
      ? /after `?01-project-setup\.md`?/i.test(uiux) && /before `?03-phases\/\*`?/i.test(uiux)
      : /before project setup/i.test(uiux) && /before `?02-project-setup\.md`?/i.test(uiux)
  )
  if (usesSetupFirstIdentitySecond) {
    ok('ui identity loads local frontend skill harness',
      /frontend-ui-product-design/i.test(uiux) &&
      /\.agents\/skills\/frontend-ui-product-design\/SKILL\.md/i.test(uiux) &&
      /references\/screen-states\.md/i.test(uiux) &&
      /return to `?01-project-setup\.md`?/i.test(uiux)
    )
  }
  ok('ui identity requires generated local identity and design artifacts', /docs\/ui-identity\.md/i.test(uiux) && /UI-IDENTITY\.md/i.test(uiux) && /docs\/DESIGN\.md/i.test(uiux) && /generated UI identity|generate a local/i.test(uiux))
  ok('ui identity requires first-run comprehension and user-language control', /First-run comprehension contract/i.test(uiux) && /User-language map/i.test(uiux) && /internal.*terms|proof terms|evaluator language/i.test(uiux))
  ok('ui identity is substantial enough to guide generation', uiux.trim().length >= (isMapperTemplatePacket ? 3500 : 4500))
  ok('ui identity defines generated identity sections', /Product identity thesis/i.test(uiux) && /Chosen style direction/i.test(uiux) && /Layout model/i.test(uiux) && /Interaction model/i.test(uiux) && /Component language/i.test(uiux) && /Color and typography tokens/i.test(uiux))
  ok('ui identity requires product metaphor and manipulation model',
    /Creative product concept/i.test(uiux) &&
    /product metaphor|emotional\/product metaphor|emotional\/operator affordance/i.test(uiux) &&
    /dominant object|central creative object/i.test(uiux) &&
    /primary (creative )?gesture|primary gesture\/manipulation/i.test(uiux) &&
    /moment-to-moment manipulation/i.test(uiux)
  )
  ok('ui identity rejects default product silhouette',
    /Silhouette rejection/i.test(uiux) &&
    /forbidden default silhouette|forbidden silhouette/i.test(uiux) &&
    /generic dashboard/i.test(uiux) &&
    /renamed workbench|old workbench|proof workbench/i.test(uiux) &&
    /card grid|central card grid/i.test(uiux) &&
    /proof console/i.test(uiux)
  )
  ok('ui identity requires autonomous product reasoning before implementation', /reason from the artifact|Think through the product|think deeply/i.test(uiux) && /golden path/i.test(uiux) && /central output/i.test(uiux) && /before setup|before phase|before implementation/i.test(uiux))
  ok('ui identity selects typed proof obligations without gate spam',
    !requiresTypedQualityRouting ||
    /Proof obligations/i.test(uiux) &&
    /most likely UI failure|most likely quality failure|screenshot delta review/i.test(uiux)
  )
  ok('ui identity requires exact generated visual tokens', /exact semantic color/i.test(uiux) && /typography/i.test(uiux) && /state colors|focus/i.test(uiux))
  ok('ui identity defines components, motion/states, stress fixtures, and proof', /Component language/i.test(uiux) && /empty\/loading\/error\/blocked|Empty, loading, error, and blocked/i.test(uiux) && /Content stress fixtures/i.test(uiux) && /Proof obligations/i.test(uiux))
  ok('ui identity rejects generic dead UI and proof jargon', /functionless buttons|dead controls/i.test(uiux) && /raw JSON/i.test(uiux) && /proof.*labels|proof terms|evaluator language/i.test(uiux))
  ok('ui identity requires nearest-silhouette distinguishing treatment',
    !usesSetupFirstIdentitySecond ||
    (/adjacent at-risk silhouette|adjacent silhouette/i.test(uiux) &&
     /distinguish/i.test(uiux) &&
     /do not count as a distinguishing treatment/i.test(uiux))
  )
  ok('ui identity requires anti-silhouette distinctiveness proof',
    !usesSetupFirstIdentitySecond ||
    (/anti-silhouette distinctiveness screenshot check/i.test(uiux) &&
     /indistinguishable/i.test(uiux) &&
     /Mechanical checks alone|mechanical checks/i.test(uiux))
  )
  ok('ui identity requires evidence binder and action surface gate',
    !usesSetupFirstIdentitySecond ||
    (/Evidence binder requirements/i.test(uiux) &&
     /\.buildprint\/ui-evidence\.md/i.test(uiux) &&
     /Identity prose is not evidence/i.test(uiux) &&
     /Action surface gate/i.test(uiux) &&
     /stronger than "type and send"/i.test(uiux) &&
     /next powerful user action/i.test(uiux) &&
     /status panels are subordinate/i.test(uiux))
  )
  ok('ui identity requires separate DESIGN.md visual taste system',
    !usesSetupFirstIdentitySecond ||
    (/Required sections in generated DESIGN\.md/i.test(uiux) &&
     /screen construction contract/i.test(uiux) &&
     /Visual Thesis/i.test(uiux) &&
     /Exact Tokens/i.test(uiux) &&
     /Type Scale/i.test(uiux) &&
     /Layout Contract/i.test(uiux) &&
     /Component Specs/i.test(uiux) &&
     /State Matrix/i.test(uiux) &&
     /Implementation Mapping/i.test(uiux) &&
     /Screenshot Acceptance/i.test(uiux) &&
     /Banned Patterns/i.test(uiux) &&
     /Do not collapse `?docs\/ui-identity\.md`? and `?docs\/DESIGN\.md`?/i.test(uiux))
  )
  ok('agentic-chat requires chat-native action gate',
    !isAgenticChatPacket ||
    (/Product genre:\s*chat-native agent interface/i.test(uiux) &&
     /conversation thread and composer\/input/i.test(uiux) &&
     /Chat-native action gate/i.test(uiux) &&
     /mission sheet.*guided-run.*task dashboard.*status lane.*workflow/i.test(uiux) &&
     /action UI enhances chat; it does not displace chat/i.test(uiux))
  )
  ok('agentic-chat requires consumer chat craft gate',
    !isAgenticChatPacket ||
    (/references\/product-taste\.md/i.test(uiux) &&
     /Design read and taste dials/i.test(uiux) &&
     /Consumer chat craft gate/i.test(uiux) &&
     /seeded feature-demo action cards/i.test(uiux) &&
     /giant blank dead zone/i.test(uiux) &&
     /system labels/i.test(uiux) &&
     /cramped mobile composer\/chips/i.test(uiux))
  )

  ok('phase flow defines active phase loop',
    /active phase only/i.test(phaseFlow) &&
    /Do not read every phase upfront/i.test(phaseFlow) &&
    /thinking checkpoint/i.test(phaseFlow) &&
    /smallest real vertical user\/operator path/i.test(phaseFlow) &&
    /3-7 likely failure modes/i.test(phaseFlow) &&
    /proof plan/i.test(phaseFlow) &&
    /claim ceiling/i.test(phaseFlow)
  )
  ok('phase flow activates agentic review without paperwork',
    /not a deliverable file/i.test(phaseFlow) &&
    /Do not create phase-run paperwork by default/i.test(phaseFlow) &&
    /Compare the result against the predicted failure modes/i.test(phaseFlow) &&
    /one concrete weakness repair/i.test(phaseFlow) &&
    /what the proof does not prove/i.test(phaseFlow)
  )
  ok('agentic-chat phase flow binds builder, product, and proof loops',
    !isAgenticChatPacket ||
    (/builder loop/i.test(phaseFlow) &&
     /product loop/i.test(phaseFlow) &&
     /proof loop/i.test(phaseFlow) &&
     /goal intake/i.test(phaseFlow) &&
     /action selection/i.test(phaseFlow) &&
     /policy\/approval/i.test(phaseFlow) &&
     /observation ingestion/i.test(phaseFlow) &&
     /critique\/retry\/recovery/i.test(phaseFlow) &&
     /agentic_chat:\s*blocked|agentic_chat:\s*not_qualified/i.test(phaseFlow))
  )
  ok('phase flow rejects proof theater', /Edits alone, placeholder screens, mocked data, functionless buttons/i.test(phaseFlow) && /do not fake live success/i.test(phaseFlow))
  ok('phase flow requires UI identity verification before completion',
    /missing local UI identity/i.test(phaseFlow) &&
    /missing local design system/i.test(phaseFlow) &&
    /missing UI evidence binder/i.test(phaseFlow) &&
    /\.buildprint\/ui-evidence\.md/i.test(phaseFlow) &&
    /docs\/DESIGN\.md/i.test(phaseFlow) &&
    /stronger than "type and send"/i.test(phaseFlow) &&
    /agb verify ui \./i.test(phaseFlow) &&
    /screenshot evidence/i.test(phaseFlow)
  )
  ok('agentic-chat phase flow blocks chat-native genre drift',
    !isAgenticChatPacket ||
    (/chat-native interface/i.test(phaseFlow) &&
     /mission sheet.*guided-run.*task dashboard.*status lane.*form-first workflow/i.test(phaseFlow) &&
     /conversation thread and composer\/input/i.test(phaseFlow))
  )
  ok('agentic-chat phase flow blocks consumer chat craft failure',
    !isAgenticChatPacket ||
    (/Consumer Chat Craft Gate/i.test(phaseFlow) &&
     /seeded feature cards/i.test(phaseFlow) &&
     /giant blank dead zone/i.test(phaseFlow) &&
     /internal status labels/i.test(phaseFlow) &&
     /cramped mobile composer\/chips/i.test(phaseFlow))
  )
  ok('phase flow defines repair routing', new RegExp(`return to \`?${setupFile.replace('.', '\\.')}\`?`, 'i').test(phaseFlow) && /return to `?00-questions\.md`?/i.test(phaseFlow) && new RegExp(`return to \`?${uiIdentityFile.replace('.', '\\.')}\`?`, 'i').test(phaseFlow))
  ok('phase flow has no evidence-ledger bureaucracy', !/evidence-ledger\.jsonl|proof_contract|capability_id/i.test(phaseFlow))

  ok('phase index declares v3 schema and active phase', /schema_version:\s*mapper-os\/phase-index\/v3/i.test(phaseIndex) && /active_phase:\s*03-phases\/[\w.-]+\.md/i.test(phaseIndex))
  const phaseIds = [...phaseIndex.matchAll(/^\s*-\s*phase_id:\s*([^\s#]+)/gmi)].map((m) => m[1].trim())
  const phaseIdSet = new Set(phaseIds)
  const phaseIndexFiles = phaseFilesFromIndex(phaseIndex)
  ok('phase index has unique phase ids', phaseIds.length > 0 && phaseIds.length === phaseIdSet.size)
  ok('phase index referenced phase files exist', phaseIndexFiles.length > 0 && phaseIndexFiles.every((file) => files.has(file)))
  const activePhase = (phaseIndex.match(/active_phase:\s*(03-phases\/[\w.-]+\.md)/i) || [])[1]
  ok('phase index active phase exists', !!activePhase && files.has(activePhase))
  ok('phase index routes only without role/gate/slice machinery', !/requires_roles|gate|slice|capsule|runner/i.test(phaseIndex))
  if (requiresCriticalReviewPushback) {
    const criticalReviewPhase = phaseFileForId(phaseIndex, '99-critical-review-pushback')
    const criticalReviewText = criticalReviewPhase ? safeReadText(path.join(dir, criticalReviewPhase)) : ''
    ok('phase index includes 99-critical-review-pushback final phase', criticalReviewPhase === '03-phases/critical-review-pushback.md' && files.has(criticalReviewPhase))
    ok('phase flow requires 99-critical-review-pushback before final completion', /99-critical-review-pushback/i.test(phaseFlow) && /critical-review-pushback\.md/i.test(phaseFlow) && /Final mandatory phase/i.test(phaseFlow) && /rubric does not pass/i.test(phaseFlow) && /fix .*ad hoc flaws/i.test(phaseFlow))
    ok('critical-review-pushback defines scored rubric and pass threshold',
      /Score each category 0 to 5/i.test(criticalReviewText) &&
      /total score out of 60/i.test(criticalReviewText) &&
      /at least 50\/60/i.test(criticalReviewText) &&
      /no category below 4/i.test(criticalReviewText) &&
      /no unresolved high-severity finding/i.test(criticalReviewText)
    )
    ok('critical-review-pushback requires experience originality, disclosure, and screenshot delta',
      /Experience originality/i.test(criticalReviewText) &&
      /screenshot delta review/i.test(criticalReviewText) &&
      /progressive-disclosure screenshot review/i.test(criticalReviewText) &&
      /dominant surface/i.test(criticalReviewText) &&
      /interaction model/i.test(criticalReviewText) &&
      /creative\/operator object|creative object/i.test(criticalReviewText) &&
      /information hierarchy/i.test(criticalReviewText) &&
      /palette, copy, labels, spacing, iconography/i.test(criticalReviewText)
    )
    ok('critical-review-pushback defines repair loop for failed score',
      /repair loop/i.test(criticalReviewText) &&
      /name the flaw and severity/i.test(criticalReviewText) &&
      /patch the smallest real fix/i.test(criticalReviewText) &&
      /rerun the relevant proof/i.test(criticalReviewText) &&
      /rescore/i.test(criticalReviewText) &&
      /five iterations/i.test(criticalReviewText)
    )
    ok('critical-review-pushback requires external reviewer independence',
      /External reviewer independence protocol/i.test(criticalReviewText) &&
      /fresh-context reviewer/i.test(criticalReviewText) &&
      /## Reviewer independence/i.test(criticalReviewText) &&
      /REVIEW_INVALID/i.test(criticalReviewText) &&
      /must not score its own work/i.test(criticalReviewText)
    )
    ok('critical-review-pushback requires worst-flaws-first and evidence-bound scores',
      /five worst flaws/i.test(criticalReviewText) &&
      /Do not score until this section exists/i.test(criticalReviewText) &&
      /prose-only justification/i.test(criticalReviewText) &&
      /cite a concrete artifact/i.test(criticalReviewText)
    )
    ok('critical-review-pushback defines objective auto-fail triggers',
      /Objective auto-fail triggers/i.test(criticalReviewText) &&
      /Echo or canned core output/i.test(criticalReviewText) &&
      /Forbidden silhouette match/i.test(criticalReviewText) &&
      /Dead or decorative controls/i.test(criticalReviewText) &&
      /Thin or default architecture/i.test(criticalReviewText) &&
      /Self-review without independence/i.test(criticalReviewText)
    )
    ok('critical-review-pushback defines screenshot capture protocol',
      /\.buildprint\/screenshots/i.test(criticalReviewText) &&
      /\b375\b/.test(criticalReviewText) &&
      /\b1280\b/.test(criticalReviewText) &&
      /Playwright|tool chain|browser screenshot/i.test(criticalReviewText) &&
      /forbidden silhouette/i.test(criticalReviewText) &&
      /adjacent at-risk silhouette/i.test(criticalReviewText)
    )
    ok('critical-review-pushback references artifact verification',
      /agb verify ui/i.test(criticalReviewText) &&
      /artifact-check\.md/i.test(criticalReviewText)
    )
    ok('critical-review-pushback separates phase core pass from claim qualification',
      /phase_core_passed/i.test(criticalReviewText) &&
      /claim_qualified/i.test(criticalReviewText)
    )
    ok('critical-review-pushback defines three-track pass requirement',
      /Track A/i.test(criticalReviewText) &&
      /Track B/i.test(criticalReviewText) &&
      /Track C/i.test(criticalReviewText) &&
      /Track B.*Track C.*must both be fully clear|Track B \(product\/UI\) and Track C/i.test(criticalReviewText)
    )
    ok('critical-review-pushback blocks pass on UI\/decisions track failure',
      /may not reach PASS or PENDING_RECHECK.*Track B|PASS or PENDING_RECHECK.*resolving only Track A/i.test(criticalReviewText)
    )
    ok('critical-review-pushback blocks missing identity and proof-console leakage',
      /Missing local UI identity/i.test(criticalReviewText) &&
      /ui-identity-present/i.test(criticalReviewText) &&
      /Proof\/debug console leakage/i.test(criticalReviewText) &&
      /proof-console-leakage/i.test(criticalReviewText)
    )
    ok('critical-review-pushback requires evidence binder and action surface gate',
      /\.buildprint\/ui-evidence\.md/i.test(criticalReviewText) &&
      /Missing UI evidence binder/i.test(criticalReviewText) &&
      /Weak action surface/i.test(criticalReviewText) &&
      /Prose-only identity compliance/i.test(criticalReviewText) &&
      /next powerful user action/i.test(criticalReviewText) &&
      /nearest bad silhouette/i.test(criticalReviewText)
    )
    ok('agentic-chat critical review blocks chat-native genre drift',
      !isAgenticChatPacket ||
      (/Chat-native genre drift/i.test(criticalReviewText) &&
       /conversation thread plus composer\/input/i.test(criticalReviewText) &&
       /mission sheet.*guided-run.*task dashboard.*status lane.*form-first workflow/i.test(criticalReviewText))
    )
    ok('agentic-chat critical review blocks consumer chat craft failure',
      !isAgenticChatPacket ||
      (/Consumer chat craft failure/i.test(criticalReviewText) &&
       /seeded approval\/memory\/restore cards/i.test(criticalReviewText) &&
       /giant blank dead zone/i.test(criticalReviewText) &&
       /internal route\/provider\/memory labels/i.test(criticalReviewText) &&
       /cramped mobile chips\/composer/i.test(criticalReviewText))
    )
  }

  const setupForDecisions = safeReadText(path.join(dir, setupFile))
  ok('project setup requires decisions hard-stop before phase work',
    /decisions\.md/i.test(setupForDecisions) &&
    /hard-stop/i.test(setupForDecisions) &&
    /No implementation decisions recorded yet/i.test(setupForDecisions)
  )

  const collectPhaseMd = (root) => exists(root)
    ? fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(root, entry.name)
        if (entry.isDirectory()) return collectPhaseMd(full)
        return entry.name.endsWith('.md') && entry.name !== 'phase-flow.md' ? [full] : []
      })
    : []
  const phaseFiles = collectPhaseMd(path.join(dir, '03-phases')).sort()
  ok('packet has comprehensive phase files', phaseFiles.length >= 1)
  for (const fullPath of phaseFiles) {
    const file = path.relative(dir, fullPath).split(path.sep).join('/')
    const text = safeReadText(fullPath)
    const objective = (text.match(/##\s*Building objective\s*\n([\s\S]*?)(?=\n##\s*DO NOT)/i) || [])[1] || ''
    ok(`${file} has comprehensive phase headings`, /##\s*How to implement this phase/i.test(text) && /##\s*Building objective/i.test(text) && /##\s*DO NOT/i.test(text) && /##\s*Minimum proof before moving on/i.test(text) && /##\s*Handoff note/i.test(text))
    ok(`${file} has substantial building objective`, objective.trim().length >= (isMapperTemplatePacket ? 500 : 700), `objective length ${objective.trim().length}`)
    ok(`${file} reads required phase context`, /03-phases\/phase-flow\.md/i.test(text) && /\.buildprint\/next-agent\.md/i.test(text) && /AGENTS\.md/i.test(text) && text.includes(uiIdentityFile))
    ok(`${file} forbids placeholders/functionless/mocks`, /placeholders/i.test(text) && /functionless buttons/i.test(text) && /mocked\/sample data/i.test(text))
    ok(`${file} does not use decomposed v2/schema machinery`, !/slice\.yaml|acceptance-spec|build-brief|requires_roles|capability_id|proof_contract|evidence-ledger\.jsonl/i.test(text))
    for (const check of phaseProofChecks({ file, text, objective, isMapperTemplatePacket, isAgenticChatPacket })) ok(check.label, check.pass, check.detail || '')
  }

  const handover = safeReadText(path.join(dir, 'HANDOVER.md'))
  ok('handover captures built/verified/blocked/not-proven/next', /##\s*Built/i.test(handover) && /##\s*Verified/i.test(handover) && /##\s*Blocked/i.test(handover) && /##\s*Not proven/i.test(handover) && /##\s*Next/i.test(handover))
  ok('handover captures typed quality gate results',
    !requiresTypedQualityRouting ||
    /Typed quality gates/i.test(handover) &&
    /UI decision precision/i.test(handover) &&
    /Visual viewport acceptance/i.test(handover) &&
    /Editor\/content stress acceptance/i.test(handover) &&
    /Semantic output acceptance/i.test(handover) &&
    /Integration\/operator acceptance/i.test(handover) &&
    /Critical review pushback/i.test(handover)
  )
  ok('handover captures UI identity and screenshot gate',
    /UI identity and screenshot gate/i.test(handover) &&
    /Local identity artifact/i.test(handover) &&
    /agb verify ui \./i.test(handover) &&
    /Screenshot set/i.test(handover)
  )
  ok('handover captures UI evidence and action gate',
    /UI evidence binder/i.test(handover) &&
    /Consumer\/action UI proven/i.test(handover) &&
    /Nearest bad silhouette comparison/i.test(handover) &&
    /\.buildprint\/ui-evidence\.md/i.test(handover) &&
    /next powerful user action/i.test(handover)
  )
  ok('agentic-chat handover captures chat-native action gate',
    !isAgenticChatPacket ||
    (/Chat-native action gate/i.test(handover) &&
     /conversation thread and composer\/input/i.test(handover) &&
     /inline rather than replacing chat/i.test(handover))
  )
  ok('agentic-chat handover captures consumer chat craft gate',
    !isAgenticChatPacket ||
    (/Consumer chat craft gate/i.test(handover) &&
     /Design Read/i.test(handover) &&
     /Taste Dials/i.test(handover) &&
     /composer quality/i.test(handover) &&
     /system-label suppression/i.test(handover))
  )
  ok('agentic-chat handover captures maturity and loop proof',
    !isAgenticChatPacket ||
    (/Capability maturity/i.test(handover) &&
     /streaming_chat_core/i.test(handover) &&
     /agentic_chat/i.test(handover) &&
     /Builder loop/i.test(handover) &&
     /Product loop/i.test(handover) &&
     /Proof loop/i.test(handover) &&
     /plan-mode baseline/i.test(handover))
  )
  ok('handover warns against overclaiming', /Do not claim completion beyond the evidence/i.test(handover))

  if (isPresentationPacket) {
    const setup = safeReadText(path.join(dir, '02-project-setup.md'))
    const uiux = safeReadText(path.join(dir, '01-ui-identity.md'))
    const phase04 = safeReadText(path.join(dir, '03-phases/04-editable-deck-workbench.md'))
    const phase08 = safeReadText(path.join(dir, '03-phases/08-verification-and-handover.md'))

    for (const gate of [
      'deck_output_quality',
      'outline_quality',
      'layout_template_quality',
      'editable_workbench_quality',
      'desktop_visual_acceptance',
      'mobile_visual_acceptance',
      'content_specificity_acceptance',
      'long_text_stress_acceptance',
      'export_runtime_probe',
      'provider_probe',
      'document_parser_probe',
      'api_webhook_mcp_probe',
      'desktop_runtime_probe',
      'auth_privacy_observability_deployment'
    ]) {
      ok(`presentation blueprint declares gate: ${gate}`, blueprint.includes(gate))
    }

    ok('presentation blueprint declares verification artifacts',
      /verification_artifacts:/i.test(blueprint) &&
      /required_generated_app_scripts:/i.test(blueprint) &&
      /required_screenshot_proofs:/i.test(blueprint) &&
      /required_semantic_proofs:/i.test(blueprint) &&
      /screenshot_capture/i.test(blueprint) &&
      /deck_desktop_1440_or_wider/i.test(blueprint) &&
      /deck_mobile_phone_width/i.test(blueprint) &&
      /long_text_desktop/i.test(blueprint) &&
      /long_text_mobile/i.test(blueprint)
    )

    ok('presentation setup requires generated proof commands',
      /desktop screenshot/i.test(setup) &&
      /mobile screenshot/i.test(setup) &&
      /content-specificity/i.test(setup) &&
      /long-text stress/i.test(setup) &&
      /proven runtime behavior/i.test(setup) &&
      /intentionally blocked/i.test(setup)
    )

    ok('presentation UI requires repeatable viewport and semantic checks',
      /repeatable commands/i.test(uiux) &&
      /page-level horizontal overflow/i.test(uiux) &&
      /overlapping canvas regions/i.test(uiux) &&
      /repeated generic slide content/i.test(uiux) &&
      /missing stress fixtures/i.test(uiux)
    )

    ok('presentation phase 04 requires geometry and overflow assertions',
      /1440px or wider/i.test(phase04) &&
      /mobile Deck screenshot/i.test(phase04) &&
      /same deck id/i.test(phase04) &&
      /page-level horizontal overflow/i.test(phase04) &&
      /stable 16:9 canvas bounds/i.test(phase04) &&
      /long-text stress states/i.test(phase04)
    )

    ok('presentation phase 08 requires repeatable proof assertions',
      /desktop geometry/i.test(phase08) &&
      /mobile overflow/i.test(phase08) &&
      /content-specificity/i.test(phase08) &&
      /long-text stress/i.test(phase08) &&
      /test runner/i.test(phase08)
    )

    ok('presentation handover requires proof paths and pass/fail status',
      /wide desktop Deck screenshot path/i.test(handover) &&
      /desktop visual acceptance result/i.test(handover) &&
      /mobile Deck screenshot path/i.test(handover) &&
      /mobile visual acceptance/i.test(handover) &&
      /content-specificity proof/i.test(handover) &&
      /long-text stress proof/i.test(handover) &&
      /generated-app proof commands/i.test(handover)
    )
  }

  ok('no generated sentinel placeholders remain', isMapperTemplatePacket || !allFiles.some((file) => {
    if (!/\.(md|yaml|json|jsonl)$/.test(file)) return false
    const text = safeReadText(path.join(dir, file)).replace(/<phase>/g, '').replace(/<phase-id>/g, '')
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
  const phaseIndex = safeReadText(path.join(dir, '03-phases/phase-index.yaml'))
  const activePath = phaseIndex.match(/active_phase:\s*([^\s#]+)/)?.[1]
  if (!activePath) throw new Error('missing active_phase in 03-phases/phase-index.yaml')
  const active = safeReadText(path.join(dir, activePath))
  if (!active) throw new Error(`missing active phase ${activePath}`)
  console.log(active.trim())
}


function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))]
}

function readOrderFromManifest(manifest, isExecutablePacket, hasManifestFile) {
  if (Array.isArray(manifest.instructions?.readOrder) && manifest.instructions.readOrder.length) return manifest.instructions.readOrder
  if (Array.isArray(manifest.readOrder) && manifest.readOrder.length) return manifest.readOrder
  const setupFile = hasManifestFile('01-project-setup.md') ? '01-project-setup.md' : '02-project-setup.md'
  const uiIdentityFile = hasManifestFile('02-ui-identity.md') ? '02-ui-identity.md' : '01-ui-identity.md'
  return isExecutablePacket
    ? ['BUILDPRINT.md', '00-questions.md', setupFile, uiIdentityFile, 'blueprint.yaml', '03-phases/phase-index.yaml', '03-phases/phase-flow.md', 'README.md', 'HANDOVER.md'].filter(hasManifestFile)
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
  const setupFile = hasManifestFile('01-project-setup.md') ? '01-project-setup.md' : '02-project-setup.md'
  const uiIdentityFile = hasManifestFile('02-ui-identity.md') ? '02-ui-identity.md' : '01-ui-identity.md'
  const canonical = [
    'BUILDPRINT.md',
    '00-questions.md',
    setupFile,
    uiIdentityFile,
    'blueprint.yaml',
    '03-phases/phase-index.yaml',
    '03-phases/phase-flow.md',
    activePhase,
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
    const rootHasExecutablePacket = ['00-questions.md', 'blueprint.yaml', '03-phases/phase-index.yaml']
      .every((file) => manifestFilePaths.includes(file))
    if (rootHasExecutablePacket) return ''
    const templatePrefix = 'templates/executable-packet/'
    const templateHasExecutablePacket = ['00-questions.md', 'blueprint.yaml', '03-phases/phase-index.yaml']
      .every((file) => manifestFilePaths.includes(`${templatePrefix}${file}`))
    return templateHasExecutablePacket ? templatePrefix : ''
  })()
  const manifestPathFor = (filePath) => `${executablePacketPrefix}${filePath}`
  const hasManifestFile = (filePath) => manifestFilePaths.includes(manifestPathFor(filePath))
  const snapshotPathFor = (filePath) => `.buildprint/snapshots/${manifestPathFor(filePath)}`
  const setupFile = hasManifestFile('01-project-setup.md') ? '01-project-setup.md' : '02-project-setup.md'
  const uiIdentityFile = hasManifestFile('02-ui-identity.md') ? '02-ui-identity.md' : '01-ui-identity.md'
  const usesSetupFirstIdentitySecond = setupFile === '01-project-setup.md' && uiIdentityFile === '02-ui-identity.md'
  const isExecutablePacket = hasManifestFile('00-questions.md') && hasManifestFile(setupFile) && hasManifestFile(uiIdentityFile) && hasManifestFile('blueprint.yaml')
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
  const executableSnapshotDir = path.join(snapshotDir, ...executablePacketPrefix.split('/').filter(Boolean))
  const phaseIndexPath = path.join(executableSnapshotDir, '03-phases', 'phase-index.yaml')
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
    currentPhase: isExecutablePacket ? activePhaseId || 'active-phase' : '00-alignment',
    activePhase,
    activePhaseId,
    executionMode: manifest.executionMode || manifest.execution_mode || (isExecutablePacket ? 'product-led-phase-flow' : null),
    completedPhases: [],
    blocked: false,
    lastAction: `downloaded ${downloaded.length} exact Buildprint snapshot files`,
    nextAction: isExecutablePacket
      ? usesSetupFirstIdentitySecond
        ? 'read .buildprint/next-agent.md, complete project setup and local skill harness, generate UI identity, then follow the active phase loop'
        : 'read .buildprint/next-agent.md, initialize local skill harness, generate UI identity, complete project setup, then follow the active phase loop'
      : 'read .buildprint/next-agent.md and begin alignment or default-preset flow',
    runtimeEvidenceLedger: hasLegacyRuntimeEvidence ? '.buildprint/evidence/evidence-ledger.jsonl' : null,
    harnessProfiles,
    updatedAt: now,
  })

  fs.writeFileSync(path.join(stateDir, 'progress.md'), isExecutablePacket
    ? `# Build Progress\n\n## Done\n- Bootstrapped .buildprint/ from package manifest.\n- Downloaded ${downloaded.length} exact Buildprint snapshot files.\n- Prepared product-led phase-flow state.\n\n## Current\n- Active phase: \`${activePhase || 'unknown'}\`.\n\n## Next\n- Follow \`.buildprint/next-agent.md\`, ${usesSetupFirstIdentitySecond ? 'complete product setup and local skill harness, generate UI identity' : 'initialize the local skill harness, generate UI identity, complete product setup'}, then execute the active phase loop.\n`
    : `# Build Progress\n\n## Done\n- Bootstrapped .buildprint/ from package manifest.\n- Downloaded ${downloaded.length} exact Buildprint snapshot files.\n\n## Current\n- Phase 00 - Alignment.\n\n## Next\n- Read snapshots and follow the Buildprint alignment rules.\n`)
  fs.writeFileSync(path.join(stateDir, 'decisions.md'), `# Decisions

No implementation decisions recorded yet. Add confirmed alignment choices here.

Hard-stop rows must be filled before setup or phase work. Use \`confirmed_by: user\`, \`confirmed_by: explicit_user_delegation\`, or \`confirmed_by: blocker\`; never use \`confirmed_by: agent_assumption\` for hard-stops.

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

This is a Mapper OS v3 executable Buildprint. Local runtime state wins over stale assumptions, but package snapshots remain read-only.

1. Read \`.buildprint/source.json\` and \`.buildprint/state.json\`.
2. Read order: ${manifestReadOrder.map((file) => `\`${snapshotPathFor(file)}\``).join(' -> ')}.
3. Read \`${snapshotPathFor('00-questions.md')}\`; stop at \`00-questions.md\` unless every hard-stop row is user-confirmed, explicitly delegated, or recorded as a blocker in \`.buildprint/decisions.md\`. Ask unresolved hard-stop questions before \`${snapshotPathFor(setupFile)}\`.
4. Read and complete \`${snapshotPathFor(setupFile)}\`; initialize the project-local skill harness from the profiles declared in \`${snapshotPathFor('blueprint.yaml')}\` by running \`${harnessInitCommand}\` if \`agb\` is available. Then run \`agb harness check . --provider agents${harnessProfiles.map((profile) => profile === 'default' ? '' : ` --profile ${profile}`).join('')}\` and \`agb harness checkup . --provider agents${harnessProfiles.map((profile) => profile === 'default' ? '' : ` --profile ${profile}`).join('')}\`. If \`agb\` is unavailable, create the \`AGENTS.md\` harness section and local skills described by the setup file.
5. Read \`${snapshotPathFor(uiIdentityFile)}\`; for UI-bearing artifacts, load the local \`frontend-ui-product-design\` skill and generate local \`docs/ui-identity.md\` or \`UI-IDENTITY.md\` before phase work.
6. Confirm setup and identity proof are complete before phase work.
7. Read \`${snapshotPathFor('03-phases/phase-flow.md')}\`.
8. Load only the active phase named in \`${snapshotPathFor('03-phases/phase-index.yaml')}\`: \`${activePhase || 'unknown'}\`.
9. Execute the phase-flow loop: restate the smallest real vertical product path, build it, verify it, repair visible slop/fake-success shortcuts, and record useful handover facts.
10. If verification or product review fails, route repair to the current phase unless the failure proves setup/questions/prior phase/external blocker is responsible.
11. Before completion or stopping, write the handover described in \`${snapshotPathFor('HANDOVER.md')}\`.

Whenever you stop, end your handover with this menu so the developer has a concrete choice (fill in real phase ids from \`03-phases/phase-index.yaml\`):

1. Continue one phase — implement the next phase only, then stop and show this menu again.
2. Continue to the next checkpoint — implement through verification, pausing only on a real blocker.
3. Do all remaining phases — implement every dependency-ready phase through final handover, stopping only on real blockers.
4. Stop here.

Rules:

- Do not read every phase upfront.
- Do not write, rewrite, or append to \`.buildprint/snapshots/**\`; snapshots are immutable downloaded package files.
- Project root/local \`AGENTS.md\` files belong in the implementation project and should be created or patched by \`${harnessInitCommand}\` from \`${setupFile}\`, not shipped in the packet. Use the profiles declared in \`blueprint.yaml\`; do not default to \`full\`.
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
