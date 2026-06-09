#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { checkBlueprint, printBlueprintResults } from '../src/blueprint/blueprint-check.js'
import { evidenceCheck } from '../src/evidence/evidence-ledger.js'
import { harnessCheckResult, harnessInit, printHarnessResult } from '../src/harness/local-harness.js'

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

function packetCheckResults(dir) {
  dir = packetCheckRoot(dir)
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
  const requiresTypedQualityRouting = isMapperTemplatePacket
  const isPresentationPacket = /name:\s*AI Presentation Generation Workbench/i.test(blueprint)
  const requiresCriticalReviewPushback = isMapperTemplatePacket ||
    isPresentationPacket

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
    /hand-roll|from-scratch/i.test(setup)
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
  ok('ui identity requires generated local identity artifact', /docs\/ui-identity\.md/i.test(uiux) && /UI-IDENTITY\.md/i.test(uiux) && /generated UI identity|generate a local/i.test(uiux))
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
  ok('phase flow rejects proof theater', /Edits alone, placeholder screens, mocked data, functionless buttons/i.test(phaseFlow) && /do not fake live success/i.test(phaseFlow))
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
  }

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
  fs.writeFileSync(path.join(stateDir, 'decisions.md'), `# Decisions\n\nNo implementation decisions recorded yet. Add confirmed alignment choices here.\n`)
  fs.writeFileSync(path.join(stateDir, 'blockers.md'), `# Blockers\n\nNone currently.\n`)
  fs.writeFileSync(path.join(stateDir, 'next-agent.md'), isExecutablePacket ? `# Next Agent Instructions

Start here.

This is a Mapper OS v3 executable Buildprint. Local runtime state wins over stale assumptions, but package snapshots remain read-only.

1. Read \`.buildprint/source.json\` and \`.buildprint/state.json\`.
2. Read order: ${manifestReadOrder.map((file) => `\`${snapshotPathFor(file)}\``).join(' -> ')}.
3. Read \`${snapshotPathFor('00-questions.md')}\`; stop only for true hard-stop decisions.
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
