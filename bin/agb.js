#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'
import { buildAnalyzePacket } from '../src/analyze/build-packet.js'
import { formatPacketMarkdown } from '../src/analyze/format-markdown.js'
import { formatPacketJson } from '../src/analyze/format-json.js'
import { formatPacketYaml } from '../src/analyze/format-yaml.js'

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
  agb analyze <buildprint-folder> [--phase <id>] [--json] [--yaml]
  agb check <blueprint-folder> [--code <generated-code-folder>]
  agb map <repo-folder> [--out <output-folder>] [--scope <path>] [--candidate <number>]
  agb start <buildprint-package-json-url-or-file> [target-folder]

Examples:
  agb analyze ./buildprints/buildprint-mapper-os
  agb analyze ./buildprints/portable-novel-storyboard-pipeline --phase 04-workbench-ui
  agb analyze ./buildprints/buildprint-mapper-os --json
  agb check ./my-buildprint
  agb check ./my-buildprint --code ./my-agent
  agb map ./my-project
  agb map ./my-project --out ./my-project.buildprint
  agb map ./my-project --candidate 1 --out ./selected.buildprint
  agb map ./my-project --scope apps/web --out ./web.buildprint
  agb start https://agent-buildprint.com/buildprints/ai-influencer-os/package.json ./my-build
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


function sectionByHeading(markdown, heading) {
  const lines = markdown.split(/\r?\n/)
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`)
  if (start < 0) return ''
  const out = []
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i])) break
    out.push(lines[i])
  }
  return out.join('\n').trim()
}

function requiredMapperOsFile(base, relative) {
  const file = path.join(base, relative)
  if (!exists(file)) throw new Error(`Mapper OS alignment file missing: buildprints/buildprint-mapper-os/${relative}`)
  return readText(file)
}

function loadMapperOsAlignment() {
  const base = path.join(packageRoot, 'buildprints', 'buildprint-mapper-os')
  const buildprintJsonText = requiredMapperOsFile(base, 'buildprint.json')
  const buildprintJson = JSON.parse(buildprintJsonText)
  const buildprintMd = requiredMapperOsFile(base, 'BUILDPRINT.md')
  const discoverPrompt = requiredMapperOsFile(base, 'prompts/discover.md')
  const extractPrompt = requiredMapperOsFile(base, 'prompts/extract-selected.md')
  const phases = requiredMapperOsFile(base, 'phases.yaml')
  const acceptance = requiredMapperOsFile(base, 'acceptance.yaml')
  const claims = requiredMapperOsFile(base, 'claims.yaml')
  const checksum = crypto
    .createHash('sha256')
    .update([buildprintJsonText, buildprintMd, discoverPrompt, extractPrompt, phases, acceptance, claims].join('\n---MAPPER-OS-FILE---\n'))
    .digest('hex')

  return {
    source: 'buildprints/buildprint-mapper-os',
    slug: buildprintJson.slug,
    title: buildprintJson.title,
    canonicalStart: buildprintJson.canonicalStart,
    authoritySpine: buildprintJson.authoritySpine,
    checksum,
    bindingSlice: buildprintJson.bindingSlice ?? [],
    forbiddenDefaults: buildprintJson.forbiddenDefaults ?? [],
    requiredDetailFiles: buildprintJson.requiredDetailFiles ?? [],
    llmAttentionContract: sectionByHeading(buildprintMd, 'LLM Attention Contract'),
    phaseGates: sectionByHeading(buildprintMd, 'Phase Gates'),
    acceptanceGates: sectionByHeading(buildprintMd, 'Acceptance Gates'),
    evidenceBoundary: sectionByHeading(buildprintMd, 'Evidence Boundary'),
    architecture: sectionByHeading(buildprintMd, 'Architecture'),
    discoveryPromptContract: sectionByHeading(discoverPrompt, 'Required outputs'),
    discoveryCandidateContract: sectionByHeading(discoverPrompt, '`BUILDPRINT_CANDIDATES.md` must include 2-5 candidates'),
    extractionOutputContract: sectionByHeading(extractPrompt, 'Required outputs'),
    extractionRules: sectionByHeading(extractPrompt, 'Extraction rules'),
    packageExpectations: sectionByHeading(extractPrompt, 'Buildprint package expectations')
  }
}

function formatMapperOsAlignment(alignment) {
  return [
    '# Mapper OS Alignment',
    '',
    `Source: \`${alignment.source}\``,
    `Canonical start: \`${alignment.canonicalStart}\``,
    `Authority spine: \`${alignment.authoritySpine}\``,
    `Alignment checksum: \`${alignment.checksum}\``,
    '',
    'This mapped package was generated by `agb map` using Buildprint Mapper OS as the canonical alignment contract. If mapper output and Mapper OS disagree, Mapper OS wins and the CLI must be updated.',
    '',
    '## LLM Attention Contract',
    '',
    alignment.llmAttentionContract || '- See Buildprint Mapper OS.',
    '',
    '## Binding Slice',
    '',
    mdList(alignment.bindingSlice),
    '',
    '## Forbidden Defaults',
    '',
    mdList(alignment.forbiddenDefaults),
    '',
    '## Phase Gates',
    '',
    alignment.phaseGates || '- See Buildprint Mapper OS.',
    '',
    '## Acceptance Gates',
    '',
    alignment.acceptanceGates || '- See Buildprint Mapper OS.',
    '',
    '## Evidence Boundary',
    '',
    alignment.evidenceBoundary || '- See Buildprint Mapper OS.',
    '',
    '## Discovery Contract',
    '',
    alignment.discoveryPromptContract || '- See Buildprint Mapper OS prompts/discover.md.',
    '',
    '## Candidate Contract',
    '',
    alignment.discoveryCandidateContract || '- See Buildprint Mapper OS prompts/discover.md.',
    '',
    '## Extraction Contract',
    '',
    alignment.extractionOutputContract || '- See Buildprint Mapper OS prompts/extract-selected.md.',
    '',
    '## Extraction Rules',
    '',
    alignment.extractionRules || '- See Buildprint Mapper OS prompts/extract-selected.md.',
    ''
  ].join('\n')
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


function walkProject(dir, options = {}) {
  const ignored = new Set(options.ignored ?? ['node_modules', '.git', 'dist', 'build', '.next', '.astro', 'coverage', '.turbo', '.cache', '.project.buildprint', 'buildprint-submission', 'project.buildprint'])
  const maxFiles = options.maxFiles ?? 3000
  const out = []
  function visit(current) {
    if (out.length >= maxFiles || !exists(current)) return
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (ignored.has(entry.name)) continue
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) visit(full)
      else out.push(full)
      if (out.length >= maxFiles) return
    }
  }
  visit(dir)
  return out
}

function readJsonMaybe(file) {
  try { return JSON.parse(readText(file)) } catch { return null }
}

function toPosixPath(value) {
  return String(value).replaceAll(path.sep, '/').replaceAll('\\', '/')
}

function posixDirname(value) {
  const normalized = toPosixPath(value)
  const index = normalized.lastIndexOf('/')
  return index < 0 ? '.' : normalized.slice(0, index)
}

function yamlList(items, indent = 2) {
  if (!items.length) return `${' '.repeat(indent)}[]`
  return items.map((item) => `${' '.repeat(indent)}- ${String(item).replaceAll('\n', ' ')}`).join('\n')
}

function detectProjectFacts(repo) {
  const files = walkProject(repo)
  const relFiles = files.map((f) => toPosixPath(path.relative(repo, f)))
  const packageJson = exists(path.join(repo, 'package.json')) ? readJsonMaybe(path.join(repo, 'package.json')) : null
  const packageJsonFiles = relFiles.filter((f) => /(^|\/)package\.json$/.test(f)).slice(0, 200)
  const depSet = new Set()
  for (const pkgFile of packageJsonFiles) {
    const pkg = readJsonMaybe(path.join(repo, pkgFile))
    if (!pkg) continue
    for (const dep of Object.keys({ ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}), ...(pkg.peerDependencies ?? {}), ...(pkg.optionalDependencies ?? {}) })) depSet.add(dep)
  }
  const deps = [...depSet].sort()
  const scripts = packageJson ? Object.keys(packageJson.scripts ?? {}).sort() : []

  const frameworks = []
  const has = (name) => deps.includes(name)
  if (has('next')) frameworks.push('Next.js')
  if (has('astro')) frameworks.push('Astro')
  if (has('react')) frameworks.push('React')
  if (has('vue')) frameworks.push('Vue')
  if (has('svelte')) frameworks.push('Svelte')
  if (has('express')) frameworks.push('Express')
  if (has('fastify')) frameworks.push('Fastify')
  if (has('@nestjs/core')) frameworks.push('NestJS')
  if (has('prisma')) frameworks.push('Prisma')
  if (has('drizzle-orm')) frameworks.push('Drizzle ORM')
  if (has('stripe')) frameworks.push('Stripe integration')
  if (has('openai')) frameworks.push('OpenAI integration')
  if (has('@anthropic-ai/sdk')) frameworks.push('Anthropic integration')
  if (has('ai') || deps.some((d) => d.startsWith('@ai-sdk/'))) frameworks.push('Vercel AI SDK integration')

  const routePatterns = [
    /^(?:.+\/)?src\/pages\/(.+)\.(astro|tsx|ts|jsx|js|mdx)$/,
    /^(?:.+\/)?src\/app\/(.+)\/page\.(tsx|ts|jsx|js)$/,
    /^(?:.+\/)?pages\/(.+)\.(tsx|ts|jsx|js)$/,
    /^(?:.+\/)?app\/(.+)\/page\.(tsx|ts|jsx|js)$/,
  ]
  const apiPatterns = [
    /^(?:.+\/)?src\/pages\/api\/(.+)\.(ts|js)$/,
    /^(?:.+\/)?pages\/api\/(.+)\.(ts|js)$/,
    /^(?:.+\/)?src\/app\/(?:.+\/)?api\/(.+)\/route\.(ts|js)$/,
    /^(?:.+\/)?app\/(?:.+\/)?api\/(.+)\/route\.(ts|js)$/,
  ]
  const apis = relFiles.filter((f) => apiPatterns.some((p) => p.test(f))).sort()
  for (const endpoint of detectCodeEndpoints(files, repo)) apis.push(endpoint)
  apis.sort()
  const apiSet = new Set(relFiles.filter((f) => apiPatterns.some((p) => p.test(f))))
  const routes = relFiles.filter((f) => routePatterns.some((p) => p.test(f)) && !apiSet.has(f) && !f.includes('/api/')).sort()
  const tests = relFiles.filter((f) => /(^|\/)(__tests__|tests?|specs?)\/|\.(test|spec)\.[cm]?[tj]sx?$|\.spec\.yaml$/.test(f)).sort()
  const db = relFiles.filter((f) => /(prisma\/schema\.prisma|migrations\/|schema\.sql|drizzle|entities|models)/i.test(f)).sort()
  const deploy = relFiles.filter((f) => /(Dockerfile|docker-compose|compose\.ya?ml|apphosting\.yaml|vercel\.json|netlify\.toml|fly\.toml|render\.yaml|\.github\/workflows)/i.test(f)).sort()

  const integrationNeedles = {
    stripe: ['stripe', '@stripe'],
    email: ['resend', 'nodemailer', 'sendgrid', 'postmark', 'mailgun'],
    ai: ['openai', '@anthropic-ai/sdk', 'genkit', '@google/generative-ai', 'langchain', 'ai', '@ai-sdk'],
    auth: ['next-auth', '@auth', 'clerk', '@clerk', 'lucia', 'passport', 'firebase'],
    storage: ['s3', '@aws-sdk/client-s3', 'cloudinary', 'uploadthing'],
    analytics: ['posthog', 'plausible', 'mixpanel', 'segment'],
    database: ['postgres', 'pg', 'mysql2', 'better-sqlite3', 'sqlite3', '@supabase/supabase-js', 'mongoose'],
    cache: ['@upstash/redis', 'ioredis', 'redis', '@vercel/kv'],
    queue: ['bullmq', 'bull', '@upstash/qstash', 'inngest'],
    search: ['algoliasearch', '@elastic/elasticsearch', 'meilisearch'],
  }
  const depMatches = (dep, needle) => needle.startsWith('@') ? dep === needle || dep.startsWith(`${needle}/`) : dep === needle || dep.startsWith(`${needle}-`) || dep.startsWith(`@${needle}/`)
  const integrations = Object.entries(integrationNeedles)
    .filter(([, names]) => names.some((n) => deps.some((d) => depMatches(d, n))))
    .map(([kind]) => kind)

  const envNames = new Set()
  for (const envFile of files.filter((f) => /(^|\/)\.env(\.|$)|\.env\.example$|example\.env$/i.test(path.basename(f)) || /\.env\.example$/i.test(f)).slice(0, 80)) {
    let text = ''
    try { text = readText(envFile) } catch { continue }
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z][A-Z0-9_]{2,})\s*=/)
      if (m) envNames.add(m[1])
    }
  }
  for (const file of files.filter((f) => /\.[cm]?[tj]sx?$|\.astro$|\.mdx?$/.test(f)).slice(0, 1200)) {
    let text = ''
    try { text = readText(file) } catch { continue }
    for (const m of text.matchAll(/process\.env\.([A-Z0-9_]+)/g)) envNames.add(m[1])
    for (const m of text.matchAll(/import\.meta\.env\.([A-Z0-9_]+)/g)) envNames.add(m[1])
  }

  const risky = []
  if (integrations.includes('stripe')) risky.push('payments')
  if (integrations.includes('email')) risky.push('external messaging')
  if (integrations.includes('ai')) risky.push('AI/tool calls')
  if (integrations.includes('auth')) risky.push('auth/session handling')
  if (relFiles.some((f) => /admin/i.test(f))) risky.push('admin surfaces')
  if (integrations.includes('storage') || relFiles.some((f) => /upload|multipart|s3|blob|storage|file-manager/i.test(f)) || apis.some((x) => /upload|multipart|s3|blob|storage|file-manager/i.test(x))) risky.push('file upload / storage')

  const subprojects = detectSubprojects(repo, relFiles)
  const codeSignals = collectCodeSignals(files, repo)
  const candidateBuildprints = suggestBuildprintCandidates({ relFiles, frameworks, routes, apis, tests, db, deploy, integrations, envNames: [...envNames].sort(), risky, subprojects, deps, codeSignals })
  const needsScopeSelection = relFiles.length > 180 || subprojects.length > 1 || candidateBuildprints.length > 3
  return { root: repo, totalFilesScanned: relFiles.length, packageManager: exists(path.join(repo, 'package-lock.json')) ? 'npm' : exists(path.join(repo, 'pnpm-lock.yaml')) ? 'pnpm' : exists(path.join(repo, 'yarn.lock')) ? 'yarn' : 'unknown', packageName: packageJson?.name ?? path.basename(repo), scripts, dependencies: deps, frameworks, routes, apis, tests, db, deploy, integrations, envNames: [...envNames].sort(), risky, subprojects, codeSignals, candidateBuildprints, needsScopeSelection }
}

function detectCodeEndpoints(files, repo) {
  const endpoints = []
  const methodPattern = /\b(?:app|router|server|fastify)\.(get|post|put|patch|delete|options|head|all)\s*\(\s*['"`]([^'"`]+)['"`]/gi
  for (const file of files.filter((f) => /\.[cm]?[tj]sx?$/.test(f) && !/(^|\/)(__tests__|tests?|specs?)\/|\.(test|spec)\.[cm]?[tj]sx?$/.test(toPosixPath(path.relative(repo, f)))).slice(0, 1200)) {
    let text = ''
    try { text = readText(file) } catch { continue }
    const rel = toPosixPath(path.relative(repo, file))
    for (const m of text.matchAll(methodPattern)) endpoints.push(`${rel} ${m[1].toUpperCase()} ${m[2]}`)
  }
  return unique(endpoints).slice(0, 120)
}

function detectSubprojects(repo, relFiles) {
  const markers = relFiles.filter((f) => /(^|\/)(package.json|pyproject.toml|requirements.txt|go.mod|pom.xml|Gemfile|Cargo.toml|composer.json|server.csproj)$/.test(f))
  return markers.map((marker) => {
    const dir = posixDirname(marker)
    let kind = marker.split('/').pop()
    let name = dir
    if (kind === 'package.json') {
      const json = readJsonMaybe(path.join(repo, marker))
      if (json?.name) name = json.name
    }
    return { path: dir, marker, kind, name }
  }).sort((a, b) => a.path.localeCompare(b.path))
}

function collectCodeSignals(files, repo) {
  const signals = {
    requestSchemas: [],
    responseContracts: [],
    streamProtocols: [],
    providerAdapters: [],
    toolContracts: [],
    authSessionTouchpoints: [],
    persistenceTouchpoints: [],
    uiContracts: [],
  }
  const add = (key, file, signal) => {
    const entry = `${toPosixPath(path.relative(repo, file))} — ${signal}`
    if (!signals[key].includes(entry)) signals[key].push(entry)
  }
  for (const file of files.filter((f) => /\.[cm]?[tj]sx?$|\.astro$|\.mdx?$/.test(f)).slice(0, 1600)) {
    let text = ''
    try { text = readText(file) } catch { continue }
    if (/\b(z|zod)\.object\s*\(|valibot|yup\.object|typebox|superstruct|Schema\s*=|schema\s*=|validate[A-Z][A-Za-z]*Request|parse\s*\(/.test(text)) add('requestSchemas', file, 'request/schema validation marker')
    if (/Response\.json|NextResponse\.json|return\s+new\s+Response|to[A-Za-z]*Response\s*\(|json\s*\(/.test(text)) add('responseContracts', file, 'response/output contract marker')
    if (/streamText|toDataStreamResponse|toTextStreamResponse|ReadableStream|text\/event-stream|Server-Sent Events|SSE|createDataStream|resumeStream|streamId/.test(text)) add('streamProtocols', file, 'streaming/resumable protocol marker')
    if (/customProvider|create[A-Za-z]*Provider|LanguageModel|ModelProvider|openai\(|anthropic\(|google\(|myProvider|providerRegistry|modelProvider|generateText|streamText/.test(text)) add('providerAdapters', file, 'model/provider adapter marker')
    if (/\btool\s*\(|toolCall|toolCalls|execute\s*:\s*async|experimental_[A-Za-z]*Tool|ToolInvocation|tools\s*:\s*{/.test(text)) add('toolContracts', file, 'tool-call contract marker')
    if (/auth\s*\(|getServerSession|NextAuth|authOptions|session\b|currentUser|clerkClient|withAuth|cookies\s*\(/.test(text)) add('authSessionTouchpoints', file, 'auth/session boundary marker')
    if (/drizzle|prisma|db\.|database|postgres|insert\s*\(|select\s*\(|update\s*\(|delete\s*\(|redis|upstash|kv\.|save[A-Z]|create[A-Z].*Message/.test(text)) add('persistenceTouchpoints', file, 'persistence/state boundary marker')
    if (/useChat|useCompletion|messages\.map|Chat[A-Za-z]*|Message[A-Za-z]*|Conversation[A-Za-z]*/.test(text)) add('uiContracts', file, 'chat/UI interaction marker')
  }
  return Object.fromEntries(Object.entries(signals).map(([k, v]) => [k, v.slice(0, 40)]))
}

function unique(items) { return [...new Set(items.filter(Boolean))] }

function candidate(title, scope, includedPaths, whyReusable, risks = [], questions = [], estimatedTier = 'strong', kind = 'feature') {
  const paths = unique(includedPaths).slice(0, 24)
  return { title, scope, includedPaths: paths, excludedPaths: [], whyReusable, estimatedTier, risks: unique(risks), questions: unique(questions), kind, evidenceStatus: paths.length ? 'path-backed' : 'signal-only' }
}

function suggestBuildprintCandidates(facts) {
  const c = []
  const paths = facts.relFiles
  const hasPath = (re) => paths.some((f) => re.test(f))
  const matching = (re) => paths.filter((f) => re.test(f)).slice(0, 30)

  if (facts.subprojects.length > 1) {
    for (const sp of facts.subprojects.slice(0, 8)) {
      if (sp.path !== '.') c.push(candidate(`${sp.name} Subproject Buildprint`, `Subproject at ${sp.path}`, [sp.path], 'This subproject has its own package/runtime marker and can be mapped independently.', ['cross-project coupling'], ['Is this subproject intended as a standalone reusable blueprint?'], 'basic'))
    }
  }
  if (facts.integrations.includes('stripe') || hasPath(/stripe|billing|checkout|subscription|webhook/i)) {
    c.push(candidate('Billing / Stripe Workflow Buildprint', 'checkout, subscriptions, webhooks, customer portal, entitlement state', matching(/stripe|billing|checkout|subscription|webhook|price/i), 'Billing flows are reusable and commonly drift when agents miss webhook, subscription, and entitlement details.', ['payments', 'webhook signature', 'subscription state drift'], ['What is the source of truth for customer entitlement state?']))
  }
  const aiPathPattern = /(^|[\/_.-])(ai|openai|anthropic|genkit|assistant|assistants|embedding|embeddings|completion|completions|chat|prompt|prompts|batch|fine[-_]?tuning|moderation|vision)([\/_.-]|$)/i
  const authPathPattern = /(^|[\/_.-])(auth|login|register|rbac|permission|permissions|invite|invites)([\/_.-]|$)/i
  if (facts.integrations.includes('ai') || hasPath(aiPathPattern)) {
    const aiPaths = unique([
      ...matching(aiPathPattern),
      ...(facts.codeSignals?.requestSchemas ?? []).map((x) => x.split(' — ')[0]),
      ...(facts.codeSignals?.streamProtocols ?? []).map((x) => x.split(' — ')[0]),
      ...(facts.codeSignals?.providerAdapters ?? []).map((x) => x.split(' — ')[0]),
      ...(facts.codeSignals?.toolContracts ?? []).map((x) => x.split(' — ')[0]),
      ...(facts.codeSignals?.uiContracts ?? []).map((x) => x.split(' — ')[0]),
    ])
    c.push(candidate('AI Workflow Buildprint', 'LLM calls, prompts, tools, model adapters, request/response schemas, stream protocol, grounding and safety checks', aiPaths, 'AI workflows need explicit contracts for inputs, outputs, stream frames, tools, model/provider behavior, costs, persistence, and safety gates.', ['AI/tool calls', 'ungrounded output', 'external API dependency', 'stream protocol drift', 'tool contract drift'], ['What exact request schema is accepted?', 'What stream protocol/framing must clients consume?', 'Which model/provider behavior is required vs replaceable?', 'Which tool calls exist and what are their input/output contracts?', 'How do auth/session and persistence boundaries affect AI calls?'], 'agent-grade'))
  }
  if (facts.integrations.includes('auth') || hasPath(authPathPattern)) {
    c.push(candidate('Auth / Session Buildprint', 'login, registration, sessions, roles, permission checks', matching(authPathPattern), 'Auth and permission rules are high-risk and reusable across SaaS products.', ['auth/session handling', 'permission drift'], ['What roles and permissions are intended?']))
  }
  if (hasPath(/admin/i)) {
    c.push(candidate('Admin Surface Buildprint', 'admin screens, guarded actions, auditability, destructive controls', matching(/admin/i), 'Admin areas need explicit permission, audit, and destructive-action checks.', ['admin surfaces', 'destructive actions'], ['Which admin actions require confirmation or audit events?']))
  }
  if (facts.integrations.includes('cache') || facts.integrations.includes('queue') || facts.integrations.includes('search') || facts.envNames.some((x) => /REDIS|UPSTASH|QSTASH|ALGOLIA|ELASTIC|MEILI/i.test(x))) {
    c.push(candidate('Data Infrastructure Buildprint', 'cache, queues, search, background jobs, and provider lifecycle', matching(/redis|upstash|qstash|queue|bull|search|algolia|elastic|meili|cache|kv|vercel/i), 'Infrastructure integrations are reusable but need explicit failure, retry, and local-development contracts.', ['external infrastructure dependency', 'data consistency drift'], ['Which provider resources are production-critical vs optional?']))
  }
  if (facts.routes.length || facts.apis.length) {
    c.push(candidate('Web App Route/API Buildprint', 'public pages, API routes, routing contracts, page/data boundaries', [...facts.routes.slice(0, 12), ...facts.apis.slice(0, 12)], 'Routes and API handlers provide a reusable implementation map for web app structure.', ['route drift', 'API contract drift'], ['Which routes are public, authenticated, or internal?'], 'strong'))
  }
  const topFolders = unique(paths.map((f) => f.split('/')[0]).filter((x) => !x.startsWith('.')))
  const folderCandidateNames = /^(examples?|samples?|apps?|packages?|server|client|src|workers?|assistants?|chat_?completions?|embeddings?|batch|fine_?tuning|moderation|vision)$/i
  for (const folder of topFolders.filter((x) => folderCandidateNames.test(x)).slice(0, 10)) {
    const safeFolder = folder.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    const files = matching(new RegExp(`^${safeFolder}/`))
    if (files.length) c.push(candidate(`${folder} Folder Buildprint`, `Reusable slice under ${folder}/`, files, 'This folder appears to define a major implementation slice or example set.', [], ['Should this folder be extracted as one Buildprint or split further?'], 'basic', 'folder-fallback'))
  }
  const tierRank = { 'agent-grade': 0, strong: 1, basic: 2 }
  const pathBacked = c.filter((x) => x.evidenceStatus === 'path-backed' && x.kind !== 'folder-fallback')
  const signalOnly = c.filter((x) => x.evidenceStatus !== 'path-backed' && x.kind !== 'folder-fallback')
  const folderFallbacks = c.filter((x) => x.kind === 'folder-fallback')
  const byTier = (a, b) => (tierRank[a.estimatedTier] ?? 9) - (tierRank[b.estimatedTier] ?? 9)
  return [
    ...pathBacked.sort(byTier),
    ...(pathBacked.length < 2 ? folderFallbacks.sort(byTier) : []),
    ...signalOnly.sort(byTier)
  ].slice(0, 10)
}

function confidenceFor(facts) {
  return {
    dependency_map: facts.dependencies.length ? 'high' : 'low',
    ui_routes: facts.routes.length ? 'high' : 'medium',
    api_map: facts.apis.length ? 'high' : 'medium',
    data_model: facts.db.length ? 'medium' : 'low',
    permission_model: facts.integrations.includes('auth') ? 'low' : 'unknown',
    business_rules: 'low',
    deployment: facts.deploy.length ? 'medium' : 'low',
    tests: facts.tests.length ? 'medium' : 'low',
  }
}

function writeMappedBuildprint(repoArg, outArg, options = {}) {
  const baseRepo = path.resolve(cwd, repoArg)
  if (!exists(baseRepo) || !fs.statSync(baseRepo).isDirectory()) throw new Error(`repo folder missing: ${baseRepo}`)
  const repo = options.scope ? path.resolve(baseRepo, options.scope) : baseRepo
  if (!repo.startsWith(baseRepo)) throw new Error(`scope must stay inside repo: ${options.scope}`)
  if (!exists(repo) || !fs.statSync(repo).isDirectory()) throw new Error(`scope folder missing: ${repo}`)
  const out = path.resolve(cwd, outArg ?? path.join(baseRepo, '.project.buildprint'))
  fs.mkdirSync(out, { recursive: true })
  fs.mkdirSync(path.join(out, 'prompts'), { recursive: true })
  fs.mkdirSync(path.join(out, 'tests'), { recursive: true })
  fs.mkdirSync(path.join(out, 'policies'), { recursive: true })

  const facts = detectProjectFacts(repo)
  if (options.scope) {
    facts.sourceRoot = baseRepo
    facts.scope = options.scope
  }
  const selectedCandidate = options.candidate ? facts.candidateBuildprints[Number(options.candidate) - 1] : null
  if (options.candidate && !selectedCandidate) throw new Error(`candidate ${options.candidate} not found; available candidates: ${facts.candidateBuildprints.length}`)
  if (selectedCandidate && !selectedCandidate.includedPaths.length) throw new Error(`candidate ${options.candidate} is signal-only and has no evidence-backed paths; choose a path-backed candidate or use --scope`)
  if (selectedCandidate) facts.selectedCandidate = selectedCandidate
  const confidence = confidenceFor(facts)
  const questions = []
  if (confidence.permission_model === 'low') questions.push('What is the intended permission model? Which roles may create, update, delete, or invite?')
  if (confidence.data_model === 'low') questions.push('Where is the source of truth for the data model? Database schema, ORM models, or external service?')
  if (facts.risky.includes('payments')) questions.push('What is the intended billing lifecycle and source of truth for subscription/access state?')
  if (facts.risky.includes('external messaging')) questions.push('Which user actions require human approval before email/SMS/external messages are sent?')
  for (const q of fidelityQuestionsFor(facts)) questions.push(q)
  questions.push('Which observed modules are legacy and should not be copied as desired architecture?')

  const discovered = `# Discovered Project Map\n\nProject: ${facts.packageName}\nRoot: ${facts.root}\nFiles scanned: ${facts.totalFilesScanned}\nPackage manager: ${facts.packageManager}\n\n## Frameworks / major capabilities\n${facts.frameworks.length ? facts.frameworks.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Scripts\n${facts.scripts.length ? facts.scripts.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## UI routes/pages\n${facts.routes.length ? facts.routes.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## API routes/endpoints\n${facts.apis.length ? facts.apis.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Data/model files\n${facts.db.length ? facts.db.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Tests\n${facts.tests.length ? facts.tests.slice(0, 80).map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Deploy / ops files\n${facts.deploy.length ? facts.deploy.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Integrations inferred from dependencies\n${facts.integrations.length ? facts.integrations.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Environment variables referenced by name only\n${facts.envNames.length ? facts.envNames.map((x) => `- ${x}`).join('\n') : '- none detected'}\n`;

  const systemMap = `# SYSTEM_MAP\n\n## Project\n\n- Name: ${facts.packageName}\n- Root: ${facts.root}\n- Files scanned: ${facts.totalFilesScanned}\n- Package manager: ${facts.packageManager}\n- Scope selection required: ${facts.needsScopeSelection ? 'yes' : 'no'}\n\n## Architecture zones\n\n### Frontend / UI\n${facts.routes.length ? facts.routes.slice(0, 60).map((x) => `- OBSERVED route: ${x}`).join('\n') : '- QUESTION: no UI routes detected'}\n\n### API / backend\n${facts.apis.length ? facts.apis.slice(0, 60).map((x) => `- OBSERVED API: ${x}`).join('\n') : '- QUESTION: no API routes detected'}\n\n### Data model\n${facts.db.length ? facts.db.slice(0, 60).map((x) => `- OBSERVED data/model file: ${x}`).join('\n') : '- QUESTION: no data model files detected'}\n\n### Integrations\n${facts.integrations.length ? facts.integrations.map((x) => `- INFERRED integration: ${x}`).join('\n') : '- none detected'}\n\n### Subprojects / examples\n${facts.subprojects.length ? facts.subprojects.map((x) => `- OBSERVED ${x.kind}: ${x.path} (${x.name})`).join('\n') : '- none detected'}\n\n## Risk zones\n${facts.risky.length ? facts.risky.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n${fidelityProfileMd(facts)}\n## Human review needed\n\n- Confirm which candidate Buildprint should be extracted.\n- Confirm which observed modules are legacy vs desired architecture.\n- Confirm auth, billing, external-write, data lifecycle, and reversal-fidelity rules.\n`;

  const candidatesMd = `# BUILDPRINT_CANDIDATES\n\n${facts.needsScopeSelection ? '> Scope selection required before final extraction. This repo appears large, mixed, or multi-scope.\n\n' : ''}${facts.candidateBuildprints.length ? facts.candidateBuildprints.map((c, i) => `## ${i + 1}. ${c.title}\n\n- Scope: ${c.scope}\n- Estimated tier: ${c.estimatedTier}\n- Why reusable: ${c.whyReusable}\n- Included paths:\n${c.includedPaths.length ? c.includedPaths.map((x) => `  - ${x}`).join('\n') : '  - QUESTION: no paths selected'}\n- Excluded paths:\n${c.excludedPaths.length ? c.excludedPaths.map((x) => `  - ${x}`).join('\n') : '  - none yet'}\n- Risks:\n${c.risks.length ? c.risks.map((x) => `  - ${x}`).join('\n') : '  - none detected'}\n- Questions:\n${c.questions.length ? c.questions.map((x) => `  - ${x}`).join('\n') : '  - none'}\n`).join('\n') : 'No strong candidates detected. Use SYSTEM_MAP.md and questions.md for human scoping.\n'}\n`;

  const selectedCandidateMd = selectedCandidate ? `# SELECTED_CANDIDATE

## ${selectedCandidate.title}

- Scope: ${selectedCandidate.scope}
- Estimated tier: ${selectedCandidate.estimatedTier}
- Why reusable: ${selectedCandidate.whyReusable}

## Included paths
${selectedCandidate.includedPaths.length ? selectedCandidate.includedPaths.map((x) => `- ${x}`).join('\n') : '- QUESTION: no paths selected'}

## Excluded paths
${selectedCandidate.excludedPaths.length ? selectedCandidate.excludedPaths.map((x) => `- ${x}`).join('\n') : '- none yet'}

## Risks
${selectedCandidate.risks.length ? selectedCandidate.risks.map((x) => `- ${x}`).join('\n') : '- none detected'}

## Questions before implementation
${selectedCandidate.questions.length ? selectedCandidate.questions.map((x) => `- ${x}`).join('\n') : '- none'}

${fidelityProfileMd(facts)}
## Agent instruction

Use this selected candidate as the extraction scope. Treat listed paths as the starting boundary, then ask before crossing into unrelated modules. Do not claim validation until checks have actually run.
` : '';

  const confidenceMd = `# Confidence Report\n\nThe mapper separates deterministic facts from inference. Low-confidence areas must be reviewed before coding agents make changes.\n\n${Object.entries(confidence).map(([k, v]) => `- ${k}: **${v}**`).join('\n')}\n\n## Questions to finalize this Buildprint\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n`;

  const risksMd = `# Risk Report\n\nDetected risk areas:\n\n${facts.risky.length ? facts.risky.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Default guardrails\n\n- Do not copy secret values into the Buildprint.\n- Do not perform external writes without an explicit approval rule.\n- Treat business rules and permissions as low confidence until a human confirms them.\n- Do not treat legacy code as desired architecture without review.\n`;

  const buildprintYaml = `name: ${facts.packageName}-mapped-buildprint\nkind: agent-buildprint/mapped-existing-project\nversion: 0.1.0\nsource_repo: ${facts.root}\ngenerated_by: agb map\n\npurpose: >\n  Architecture contract draft generated from an existing repository. Use this to orient coding agents,\n  identify low-confidence areas, and create checks before future changes.\n\ndiscovered:\n  package_manager: ${facts.packageManager}\n  frameworks:\n${yamlList(facts.frameworks)}\n  integrations:\n${yamlList(facts.integrations)}\n  risk_areas:\n${yamlList(facts.risky)}\n  ui_routes:\n${yamlList(facts.routes.slice(0, 60))}\n  api_routes:\n${yamlList(facts.apis.slice(0, 60))}\n  data_files:\n${yamlList(facts.db.slice(0, 60))}\n  env_names_only:\n${yamlList(facts.envNames)}\n\nconfidence:\n${Object.entries(confidence).map(([k,v]) => `  ${k}: ${v}`).join('\n')}\n\npolicies:\n  secret_values: never_copy\n  low_confidence_business_rules: ask_human\n  external_writes: require_explicit_policy\n  destructive_actions: require_human_approval\n\nquestions:\n${yamlList(questions)}\n\nartifacts:\n  discovered_map: ./discovered-map.md\n  confidence_report: ./confidence-report.md\n  risks: ./risks.md\n  continuation_prompt: ./prompts/continue-building.md\n  architecture_checks: ./tests/architecture.yaml\n`;

  const prompt = `# Continue Building Prompt\n\nYou are working in this existing repository. Before changing code, read:\n\n1. .project.buildprint/discovered-map.md\n2. .project.buildprint/confidence-report.md\n3. .project.buildprint/risks.md\n4. .project.buildprint/buildprint.yaml\n\nRules:\n- Treat high-confidence facts as observed repo structure.\n- Treat low-confidence items as questions, not facts.\n- Do not modify low-confidence business rules or permission logic without asking.\n- Do not copy or expose secret values.\n- Preserve the existing stack unless explicitly asked to migrate.\n- Add or update checks when changing architecture, auth, billing, external writes, or data models.\n`;

  const checks = `name: mapped-project-architecture-checks\nchecks:\n  - id: no-secret-values-in-buildprint\n    rule: Buildprint artifacts must contain env var names only, never secret values.\n  - id: low-confidence-requires-question\n    rule: Low-confidence business rules, permissions, and billing lifecycle require human confirmation before implementation changes.\n  - id: external-writes-need-policy\n    rule: Email, SMS, payment, publishing, delete, and production mutation flows require explicit policy and approval semantics.\n  - id: update-buildprint-on-architecture-change\n    rule: When routes, APIs, data model, auth, or integrations change, update .project.buildprint.\n`;

  fs.writeFileSync(path.join(out, 'facts.json'), JSON.stringify(facts, null, 2) + '\n')
  fs.writeFileSync(path.join(out, 'buildprint.yaml'), buildprintYaml)
  fs.writeFileSync(path.join(out, 'discovered-map.md'), discovered)
  fs.writeFileSync(path.join(out, 'SYSTEM_MAP.md'), systemMap)
  fs.writeFileSync(path.join(out, 'BUILDPRINT_CANDIDATES.md'), candidatesMd)
  if (selectedCandidate) {
    fs.writeFileSync(path.join(out, 'SELECTED_CANDIDATE.md'), selectedCandidateMd)
    fs.writeFileSync(path.join(out, 'selected-candidate.json'), JSON.stringify(selectedCandidate, null, 2) + '\n')
  }
  fs.writeFileSync(path.join(out, 'confidence-report.md'), confidenceMd)
  fs.writeFileSync(path.join(out, 'risks.md'), risksMd)
  fs.writeFileSync(path.join(out, 'prompts', 'continue-building.md'), prompt)
  fs.writeFileSync(path.join(out, 'tests', 'architecture.yaml'), checks)
  writeMappedPackageExtras(out, facts, confidence, questions)

  return { out, facts, confidence, questions }
}

function mdList(items, empty = '- none detected') {
  return items.length ? items.map((x) => `- ${x}`).join('\n') : empty
}

function signalList(signals, key, empty = '- QUESTION: no markers detected; preserve behavior only after source review or human confirmation') {
  return mdList(signals?.[key] ?? [], empty)
}

function fidelityQuestionsFor(facts) {
  const q = []
  if (facts.integrations.includes('ai') || facts.risky.includes('AI/tool calls')) {
    q.push('What exact AI request schema is accepted, including roles, attachments, tool choices, model options, and validation errors?')
    q.push('What exact stream protocol must be preserved: event names, frame format, resume IDs, finish/error frames, and client compatibility requirements?')
    q.push('Which model/provider adapter behavior is required vs replaceable, including retries, fallbacks, temperature/default model, token limits, and rate limits?')
    q.push('Which tool calls exist, what are their input/output schemas, and which require approval or sandboxing?')
    q.push('How do auth/session, persistence, and resumable streams affect each AI call?')
  }
  if (facts.integrations.includes('auth')) q.push('Which routes/API calls require auth, session ownership, roles, or tenant checks?')
  if (facts.db.length || facts.integrations.includes('database') || facts.integrations.includes('cache')) q.push('Which persistence writes are required for the selected workflow, and what idempotency/retry behavior is expected?')
  return unique(q)
}

function decisionPromptsFor(facts) {
  const decisions = []
  const add = (decision, defaultAnswer, priority = 5) => decisions.push({ decision, defaultAnswer, priority })
  if (facts.selectedCandidate) add(`Confirm selected candidate: ${facts.selectedCandidate.title}`, 'Use selected candidate as scope', 1)
  else add('Choose one Buildprint candidate', 'Pick one candidate; do not merge unrelated scopes', 1)
  if (facts.needsScopeSelection) add('Confirm scope boundary', 'Use the smallest folder/candidate boundary that matches the goal', 2)
  if (facts.integrations.includes('ai') || facts.risky.includes('AI/tool calls')) {
    add('Choose reversal fidelity target', 'Architecture skeleton now; exact behavior only after source/human confirmation', 2)
    add('Confirm AI safety/default provider posture', 'Mock/injectable provider; no real API keys or network by default', 3)
  }
  if (facts.risky.includes('payments')) add('Confirm billing source of truth', 'Block billing changes until explicitly answered', 2)
  else if (facts.integrations.includes('auth')) add('Confirm auth posture', 'Require auth/ownership checks for private user data', 3)
  else if (facts.db.length || facts.integrations.includes('database') || facts.integrations.includes('cache')) add('Confirm persistence posture', 'Persist only after success; make retries idempotent', 4)
  if (facts.risky.includes('external messaging')) add('Confirm external-write approval', 'Require human approval before sending external messages', 3)
  const seen = new Set()
  return decisions
    .sort((a, b) => a.priority - b.priority)
    .filter((d) => {
      const key = d.decision.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, 5)
}

function appendixQuestionsFor(questions, decisions) {
  const decisionText = decisions.map((d) => d.decision.toLowerCase()).join(' ')
  return questions.filter((q) => !decisionText.includes(q.toLowerCase().slice(0, 24))).slice(0, 8)
}

function whyQuestionMatters(question) {
  if (/schema|request|validation/i.test(question)) return 'schema drift is one of the fastest ways a reversal build stops matching the original behavior'
  if (/stream|framing|resume|protocol/i.test(question)) return 'stream clients are brittle; event names, frames, resume IDs, and errors must match intentionally'
  if (/tool/i.test(question)) return 'tool calls can have side effects and need precise input/output contracts'
  if (/auth|session|permission|roles/i.test(question)) return 'permission mistakes are security bugs, not UX details'
  if (/billing|subscription|entitlement|payment/i.test(question)) return 'billing state must have one source of truth and webhook-safe behavior'
  if (/external|email|SMS|message/i.test(question)) return 'external writes need approval and retry policy to avoid accidental spam or user harm'
  if (/data|database|persistence|state/i.test(question)) return 'state changes need ownership, idempotency, and recovery rules'
  if (/legacy|copied|desired architecture/i.test(question)) return 'existing code may contain experiments or legacy paths that should not become the blueprint'
  return 'the mapper can observe structure, but this decision needs human/product intent'
}

function fidelityProfileMd(facts) {
  const signals = facts.codeSignals ?? {}
  return [
    '## Reversal fidelity profile',
    '',
    'These fields exist to make clean-room reversal tests stronger. OBSERVED markers are starting points, not full behavioral proof.',
    '',
    '### Request schema / validation markers',
    '',
    signalList(signals, 'requestSchemas'),
    '',
    '### Response / output contract markers',
    '',
    signalList(signals, 'responseContracts'),
    '',
    '### Stream protocol / resumability markers',
    '',
    signalList(signals, 'streamProtocols'),
    '',
    '### Model/provider adapter markers',
    '',
    signalList(signals, 'providerAdapters'),
    '',
    '### Tool-call contract markers',
    '',
    signalList(signals, 'toolContracts'),
    '',
    '### Auth/session boundaries',
    '',
    signalList(signals, 'authSessionTouchpoints'),
    '',
    '### Persistence / state boundaries',
    '',
    signalList(signals, 'persistenceTouchpoints'),
    '',
    '### UI/client contract markers',
    '',
    signalList(signals, 'uiContracts'),
    '',
    '### Fidelity questions before claiming behavior parity',
    '',
    mdList(fidelityQuestionsFor(facts), '- none detected'),
    ''
  ].join('\n')
}


function mapFindingSchema() {
  return {
    type: 'object',
    required: ['severity', 'area', 'file', 'evidence', 'issue', 'whyItMatters', 'recommendedFix'],
    properties: {
      severity: { enum: ['critical', 'high', 'medium', 'low', 'info'] },
      area: { type: 'string' },
      file: { type: 'string' },
      evidence: { type: 'string' },
      issue: { type: 'string' },
      whyItMatters: { type: 'string' },
      recommendedFix: { type: 'string' }
    }
  }
}

function mapLoopGateSchema() {
  return {
    type: 'object',
    required: [
      'id',
      'phaseId',
      'checkType',
      'repeatUntil',
      'check',
      'fixRule',
      'evidenceRequired',
      'stopConditions',
      'forbiddenDuringLoop',
      'claimsAllowedAfterPass',
      'claimsStillForbidden'
    ],
    properties: {
      id: { type: 'string' },
      phaseId: { type: 'string' },
      checkType: { enum: ['alignment', 'test', 'build', 'browser', 'artifact', 'claim', 'reversal', 'security'] },
      repeatUntil: { enum: ['pass_or_blocker'] },
      check: { type: 'string' },
      fixRule: { type: 'string' },
      evidenceRequired: { type: 'array', items: { type: 'string' } },
      stopConditions: { type: 'array', items: { type: 'string' } },
      forbiddenDuringLoop: { type: 'array', items: { type: 'string' } },
      claimsAllowedAfterPass: { type: 'array', items: { type: 'string' } },
      claimsStillForbidden: { type: 'array', items: { type: 'string' } }
    }
  }
}

function mapPhasePlanSchema() {
  return {
    type: 'object',
    required: ['objective', 'latestSafeStartingPhase', 'phases'],
    properties: {
      objective: { type: 'string' },
      latestSafeStartingPhase: { type: 'string' },
      phases: {
        type: 'array',
        items: {
          type: 'object',
          required: [
            'id',
            'name',
            'goal',
            'filesLikelyToChange',
            'changes',
            'acceptanceGatesAddedOrUpdated',
            'proofEvidenceRequired',
            'validationEvidence',
            'claimsAllowedAfterPhase',
            'claimsStillForbidden',
            'exitCriteria'
          ],
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            goal: { type: 'string' },
            filesLikelyToChange: { type: 'array', items: { type: 'string' } },
            changes: { type: 'array', items: { type: 'string' } },
            acceptanceGatesAddedOrUpdated: { type: 'array', items: { type: 'string' } },
            proofEvidenceRequired: { type: 'array', items: { type: 'string' } },
            validationEvidence: { type: 'array', items: { type: 'string' } },
            claimsAllowedAfterPhase: { type: 'array', items: { type: 'string' } },
            claimsStillForbidden: { type: 'array', items: { type: 'string' } },
            exitCriteria: { type: 'array', items: { type: 'string' } },
            dependencies: { type: 'array', items: { type: 'string' } },
            risksAddressed: { type: 'array', items: { type: 'string' } },
            loopGates: { type: 'array', items: mapLoopGateSchema() }
          }
        }
      }
    }
  }
}

function buildMapReviewPrompt(facts, mapperOsAlignment) {
  return [
    'You are the AI reviewer for a mapped Buildprint generated from an existing repository.',
    'Use REVIEW_PACKET.json as an evidence map, not as a verdict.',
    `Use ${mapperOsAlignment.title} from ${mapperOsAlignment.source} as the canonical mapper alignment. Alignment checksum: ${mapperOsAlignment.checksum}.`,
    'Read AGENT_EXECUTION_BRIEF.md, BUILDPRINT.md, SYSTEM_MAP.md, BUILDPRINT_CANDIDATES.md, SPEC.md, CONTRACTS.md, TEST_MATRIX.md, TRACEABILITY_MATRIX.md, questions.md, and the mapped source files that matter for the selected scope.',
    'Assess whether a coding agent can continue from this mapped package without scope drift, fake completion, secret leakage, or weak handover.',
    'Separate OBSERVED, INFERRED, QUESTION, and OUT_OF_SCOPE claims. Never promote scanner evidence to behavioral proof without source-file evidence.',
    facts.needsScopeSelection
      ? 'Because scope selection is required, review candidate boundaries and DECOMPOSITION_STRATEGY.md before recommending implementation.'
      : 'If the generated scope is already small enough, still verify claim boundaries and validation gates.',
    'Return product-quality verdict, implementation-risk verdict, coding-agent execution risk, confirmed findings, rejected suspicions, and missing rails/schemas/prompts.',
    'Then produce a max-quality readiness phase plan. Do not stop at one recommended next action.',
    'Each phase must name its goal, files likely to change, Buildprint/package changes, acceptance gates added or updated, proof evidence required, validation evidence, claim boundary changes, exit criteria, dependencies, and risks addressed.',
    'Assess whether any phase should include Loop Gates. Recommend a Loop Gate only when it has an objective check, smallest-fix rule, useful evidence, pass_or_blocker stop conditions, forbidden scope expansion, and claim boundaries.',
    'Do not recommend vague loops such as "until beautiful", "until production-grade", or "until no issues remain". If no Loop Gates are useful, say why.',
    'Use file evidence for every important claim and finish with a chat handover.'
  ].join('\n')
}

function buildMapReviewPacket(facts, confidence, questions, decisions, mapperOsAlignment) {
  const selectedScope = facts.selectedCandidate ? `${facts.selectedCandidate.title}: ${facts.selectedCandidate.scope}` : null
  return {
    schema: 'agent-buildprint/map-review-packet.v1',
    package: {
      sourceRoot: facts.sourceRoot ?? facts.root,
      scope: facts.scope ?? null,
      packageName: facts.packageName,
      filesScanned: facts.totalFilesScanned,
      mode: selectedScope ? 'selected Buildprint extraction' : 'discovery scaffold',
      selectedScope
    },
    reviewProtocol: [
      'The mapper is not the reviewer.',
      'This packet is deterministic evidence and a review protocol.',
      'Run this packet through an agent as the reviewer before claiming production readiness.',
      'Do not let scanner evidence replace source-file reading.',
      'Confirm every finding with file evidence.',
      'Do not collapse the review into one small next step.',
      'Produce a phased max-quality readiness plan with files, gates, evidence, claims, and exit criteria.',
      'Recommend Loop Gates only when they have objective checks, pass_or_blocker stop conditions, and evidence-backed blockers.',
      'Return the final answer as a chat handover.'
    ],
    mapperOsAlignment,
    reviewPrompt: buildMapReviewPrompt(facts, mapperOsAlignment),
    evidence: {
      frameworks: facts.frameworks,
      integrations: facts.integrations,
      riskAreas: facts.risky,
      routes: facts.routes.slice(0, 120),
      apis: facts.apis.slice(0, 120),
      dataFiles: facts.db.slice(0, 120),
      deployFiles: facts.deploy.slice(0, 120),
      tests: facts.tests.slice(0, 120),
      envNamesOnly: facts.envNames,
      subprojects: facts.subprojects,
      codeSignals: facts.codeSignals,
      candidates: facts.candidateBuildprints,
      selectedCandidate: facts.selectedCandidate ?? null,
      confidence,
      sizeClassification: classifyMappedRepo(facts),
      requiredDecisions: decisions,
      questions
    },
    schemas: {
      'finding.schema.json': mapFindingSchema(),
      'loop-gate.schema.json': mapLoopGateSchema(),
      'phase-plan.schema.json': mapPhasePlanSchema(),
      'final-handover.md': [
        'Outcome:',
        'Product-quality verdict:',
        'Implementation-risk verdict:',
        'Coding-agent execution risk:',
        'Evidence read:',
        'Confirmed findings:',
        'Rejected suspicions:',
        'Missing rails/schemas/prompts:',
        'Critical/high risks:',
        'Recommended Loop Gates:',
        '- If recommended: include id, phaseId, checkType, repeatUntil pass_or_blocker, check, fixRule, evidenceRequired, stopConditions, forbiddenDuringLoop, claimsAllowedAfterPass, claimsStillForbidden.',
        '- If none recommended: explain why objective looping would add no value.',
        'Max-quality readiness phase plan:',
        '- Phase id/name/goal:',
        '  Files likely to change:',
        '  Required changes:',
        '  Acceptance gates added/updated:',
        '  Proof command/screenshot/API evidence required:',
        '  Claims allowed after this phase:',
        '  Claims still forbidden after this phase:',
        'Latest safe starting phase:',
        'Final chat handover:'
      ].join('\n')
    }
  }
}

function formatMapReviewProtocol(packet) {
  return [
    '# Mapped Buildprint AI Review Protocol',
    '',
    'This file mirrors the `agb analyze` review-packet pattern for mapped existing projects.',
    '',
    '## Protocol',
    '',
    packet.reviewProtocol.map((x) => `- ${x}`).join('\n'),
    '',
    '## Reviewer Prompt',
    '',
    packet.reviewPrompt,
    '',
    '## Schemas included in REVIEW_PACKET.json',
    '',
    Object.keys(packet.schemas).map((x) => `- ${x}`).join('\n'),
    '',
    '## Required handover shape',
    '',
    'Use `schemas.final-handover.md` from `REVIEW_PACKET.json` for the final chat handover.',
    ''
  ].join('\n')
}


function classifyMappedRepo(facts) {
  const routeApiCount = facts.routes.length + facts.apis.length
  const riskDomainCount = facts.risky.length
  const candidateCount = facts.candidateBuildprints.length
  let sizeClass = 'small'
  if (facts.subprojects.filter((x) => x.path !== '.').length > 1) sizeClass = 'monorepo-system'
  else if (facts.totalFilesScanned > 500 || routeApiCount > 60) sizeClass = 'large'
  else if (facts.totalFilesScanned > 120 || routeApiCount > 15 || facts.subprojects.filter((x) => x.path !== '.').length === 1) sizeClass = 'medium'

  let scopePressure = 'low'
  if (riskDomainCount >= 4 || candidateCount >= 5 || routeApiCount > 30) scopePressure = 'high'
  else if (riskDomainCount >= 2 || candidateCount >= 3 || routeApiCount > 8) scopePressure = 'medium'

  const requiresDecomposition = sizeClass === 'large' || sizeClass === 'monorepo-system' || scopePressure === 'high'
  const selected = Boolean(facts.selectedCandidate)
  return {
    sizeClass,
    scopePressure,
    requiresDecomposition,
    recommendedMode: selected ? 'selected-slice' : requiresDecomposition ? 'discovery-plus-candidates' : sizeClass === 'small' ? 'single-buildprint' : 'discovery-plus-candidates',
    latestSafeStartingPhase: selected ? 'selected-slice-extraction' : requiresDecomposition ? 'candidate-selection' : 'single-buildprint-extraction',
    evidence: [
      `${facts.totalFilesScanned} files scanned`,
      `${routeApiCount} route/API surfaces detected`,
      `${candidateCount} candidate scopes detected`,
      `${riskDomainCount} risk domains detected`,
      `${facts.subprojects.length} runtime/package markers detected`
    ],
    whyNotOneGiantBuildprint: requiresDecomposition
      ? 'Scope pressure or topology makes one broad implementation Buildprint likely to hide boundaries, dependencies, and validation gaps.'
      : 'No strong scope pressure detected; one bounded Buildprint can be reasonable if claims remain evidence-labeled.'
  }
}

function candidateValidationStrategy(candidate, facts) {
  const checks = []
  if (/billing|stripe|webhook/i.test(candidate.title + ' ' + candidate.scope)) checks.push('API/webhook signature tests', 'entitlement persistence/restart check')
  if (/auth|session|admin|permission/i.test(candidate.title + ' ' + candidate.scope)) checks.push('permission matrix tests', 'negative authorization checks')
  if (/AI|LLM|prompt|tool|stream/i.test(candidate.title + ' ' + candidate.scope)) checks.push('request schema tests', 'stream/tool contract tests', 'safety/grounding checks')
  if (facts.routes.length) checks.push('browser/runtime route smoke for included UI')
  if (facts.apis.length) checks.push('API contract tests for included handlers')
  if (facts.db.length) checks.push('persistence write/read/restart proof')
  return unique(checks).slice(0, 8)
}

function decompositionStrategyMd(facts, classification) {
  const candidates = facts.candidateBuildprints.length ? facts.candidateBuildprints : []
  return [
    '# DECOMPOSITION_STRATEGY',
    '',
    'This file is generated from Buildprint Mapper OS size-aware mapping rules. It prevents large repositories from becoming one vague implementation plan.',
    '',
    '## Size classification',
    '',
    `- Size class: ${classification.sizeClass}`,
    `- Recommended mode: ${classification.recommendedMode}`,
    `- Latest safe starting phase: ${classification.latestSafeStartingPhase}`,
    '- Evidence:',
    ...classification.evidence.map((x) => `  - OBSERVED: ${x}`),
    `- Why not one giant Buildprint: ${classification.whyNotOneGiantBuildprint}`,
    '',
    '## Topology / domains',
    '',
    facts.subprojects.length
      ? facts.subprojects.map((sp) => `- ${sp.name} — ${sp.path} (${sp.kind})`).join('\n')
      : '- No separate package/runtime subprojects detected; use candidate domains below.',
    '',
    '## Candidate implementation order',
    '',
    candidates.length ? candidates.map((c, i) => [
      `### ${i + 1}. ${c.title}`,
      '',
      `- Scope: ${c.scope}`,
      `- Size fit: ${classification.sizeClass === 'small' ? 'single-buildprint candidate' : 'feature-slice candidate'}`,
      `- Included paths: ${c.includedPaths.length ? c.includedPaths.map((x) => `\`${x}\``).join(', ') : 'QUESTION'}`,
      `- Risks: ${c.risks.length ? c.risks.join(', ') : 'none detected'}`,
      '- Recommended phases:',
      '  1. Confirm selected scope and excluded capabilities.',
      '  2. Extract contracts, state, and edge cases from evidence files.',
      '  3. Implement/reverse only the selected feature slice.',
      '  4. Run focused validation and no-fake QA.',
      '- Validation strategy:',
      ...candidateValidationStrategy(c, facts).map((x) => `  - ${x}`),
      '- Dependencies before extraction:',
      c.questions.length ? c.questions.map((q) => `  - QUESTION: ${q}`).join('\n') : '  - none detected',
      ''
    ].join('\n')).join('\n') : '- No strong candidates detected; remain in discovery and ask for scope.',
    '',
    '## Cross-slice risks',
    '',
    facts.risky.length ? facts.risky.map((x) => `- ${x}`).join('\n') : '- none detected',
    '',
    '## Wait for later system synthesis',
    '',
    classification.sizeClass === 'small'
      ? '- System synthesis is likely unnecessary unless the user asks for architecture-only documentation.'
      : '- Cross-module observability, global navigation, shared permissions, shared data lifecycle, and full-system parity claims should wait until selected slices have evidence and validation.',
    '',
    '## Do not fake',
    '',
    '- Do not replace selected product behavior with mocks, no-op controls, route-shaped links, skeleton adapters, or in-memory persistence when durability is claimed.',
    '- Exclude capabilities that cannot be implemented and tested for real in the selected slice.',
    ''
  ].join('\n')
}

function writeMappedPackageExtras(out, facts, confidence, questions) {
  fs.mkdirSync(path.join(out, 'plans'), { recursive: true })
  const packageTier = facts.risky.length >= 2 || facts.apis.length + facts.routes.length > 12 || facts.integrations.length >= 2 ? 'agent-grade' : facts.apis.length || facts.routes.length || facts.integrations.length ? 'strong' : 'simple'
  const observedAnchor = 'This package maps an existing repository. Preserve observed behavior unless the user confirms a change. Separate observed facts, inferred behavior, and unknowns.'
  const outputMode = facts.selectedCandidate ? 'selected Buildprint extraction' : 'discovery scaffold'
  const selectedScope = facts.selectedCandidate ? `${facts.selectedCandidate.title}: ${facts.selectedCandidate.scope}` : 'not selected yet; choose one candidate before extraction'
  const isProductLike = facts.routes.length > 0 || facts.apis.length > 0 || facts.integrations.length > 0
  const needsThreatModel = facts.apis.length > 0 || facts.risky.some((x) => /auth|payments|admin|upload|external|AI/i.test(x))
  const needsDataLifecycle = facts.db.length > 0 || facts.integrations.some((x) => ['database', 'cache', 'storage'].includes(x))
  const needsObservability = facts.apis.length > 0 || facts.deploy.length > 0 || isProductLike
  const needsArchitectureViews = facts.subprojects.length > 1 || facts.needsScopeSelection
  const mapperOsAlignment = loadMapperOsAlignment()
  const sizeClassification = classifyMappedRepo(facts)
  const discoveryRequiredFiles = [
    'manifest.json',
    'README.md',
    'BUILDPRINT.md',
    'facts.json',
    'discovered-map.md',
    'SYSTEM_MAP.md',
    'BUILDPRINT_CANDIDATES.md',
    'DECOMPOSITION_STRATEGY.md',
    'questions.md',
    'confidence-report.md',
    'risks.md',
    'REVIEW_PROTOCOL.md',
    'REVIEW_PACKET.json',
    'MAPPER_OS_ALIGNMENT.md'
  ]
  const extractionRequiredFiles = [
    'AGENT_EXECUTION_BRIEF.md',
    'agent-contract.xml',
    'CURRENT_STATE.md',
    'manifest.json',
    'README.md',
    'BUILDPRINT.md',
    'SPEC.md',
    'PLAN.md',
    'CONTRACTS.md',
    'TEST_MATRIX.md',
    'VALIDATION_TEMPLATE.md',
    'QA_PLAN.md',
    'IMPLEMENTATION_COMPLETENESS.md',
    'HEAD_TO_FOOT_QA.md',
    'TRACEABILITY_MATRIX.md',
    'questions.md',
    'SUBMISSION_CHECKLIST.md',
    'REVIEW_PROTOCOL.md',
    'REVIEW_PACKET.json',
    'MAPPER_OS_ALIGNMENT.md',
    'DECOMPOSITION_STRATEGY.md'
  ]
  const requiredGeneratedFiles = facts.selectedCandidate ? extractionRequiredFiles : discoveryRequiredFiles
  const buildprintMd = [
    '---',
    `title: ${facts.packageName} Project Buildprint`,
    `slug: ${facts.packageName}-mapped`,
    'category: Mapped Existing Project',
    'status: draft-needs-review',
    `packageTier: ${packageTier}`,
    '---',
    '',
    `# BUILDPRINT: ${facts.packageName}`,
    '',
    observedAnchor,
    '',
    '## Output mode',
    '',
    `- Mode: ${outputMode}`,
    `- Size class: ${sizeClassification.sizeClass}`,
    `- Scope pressure: ${sizeClassification.scopePressure}`,
    `- Latest safe starting phase: ${sizeClassification.latestSafeStartingPhase}`,
    `- Selected scope: ${selectedScope}`,
    '- If this is still a discovery scaffold, do not claim it is a final extracted Buildprint.',
    '',
    '## Target shape',
    '',
    'Keep the current stack and architecture unless the user explicitly asks for a migration. Smaller complete scope is better than broad fake coverage.',
    '',
    '## Observed facts',
    '',
    `- Package manager: ${facts.packageManager}`,
    `- Frameworks/capabilities: ${facts.frameworks.join(', ') || 'none detected'}`,
    `- Integrations: ${facts.integrations.join(', ') || 'none detected'}`,
    `- Risk areas: ${facts.risky.join(', ') || 'none detected'}`,
    '',
    '## Source files',
    '',
    '- Deterministic facts: `facts.json`',
    '- Human map: `discovered-map.md`',
    '- Behavior spec: `SPEC.md`',
    '- Execution plan: `PLAN.md` and `plans/*.md`',
    '- Agent execution rails: `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `CURRENT_STATE.md`, `manifest.json`',
    '- Interface/data contracts: `CONTRACTS.md`',
    '- Risk-to-test map: `TEST_MATRIX.md`',
    '- QA and no-fake gates: `QA_PLAN.md`, `HEAD_TO_FOOT_QA.md`, `IMPLEMENTATION_COMPLETENESS.md`',
    '- Confidence report: `confidence-report.md`',
    '- Review questions: `questions.md`',
    '- AI review protocol: `REVIEW_PROTOCOL.md` and `REVIEW_PACKET.json`',
    '- Mapper OS alignment: `MAPPER_OS_ALIGNMENT.md`',
    '- Decomposition strategy: `DECOMPOSITION_STRATEGY.md`',
    '',
    '## Rules for coding agents',
    '',
    '- Treat observed facts as current repo state.',
    '- Treat inferred behavior as draft until confirmed.',
    '- Treat unknowns as questions, not permission to invent.',
    '- Do not copy secret values; env var names only.',
    '- Do not perform external writes without explicit policy.',
    '- Update this Buildprint when routes, APIs, data models, auth, integrations, or deploy shape change.',
    ''
  ].join('\n')

  const specMd = [
    `# SPEC: ${facts.packageName}`,
    '',
    observedAnchor,
    '',
    '## Observed',
    '',
    '### Frameworks / capabilities',
    '',
    mdList(facts.frameworks),
    '',
    '### UI routes',
    '',
    mdList(facts.routes.slice(0, 80)),
    '',
    '### API routes',
    '',
    mdList(facts.apis.slice(0, 80)),
    '',
    '### Data/model files',
    '',
    mdList(facts.db.slice(0, 80)),
    '',
    fidelityProfileMd(facts),
    '## Inferred behavior',
    '',
    '- UI routes imply user-facing screens, but exact UX/business rules need review.',
    '- API route names imply server behavior, but authorization and side effects need review.',
    '- Integrations imply external dependencies and risk policies.',
    '',
    '## Unknown / ask user',
    '',
    questions.map((q, i) => `${i + 1}. ${q}`).join('\n'),
    '',
    '## Acceptance behavior',
    '',
    '- Preserve existing public routes unless intentionally changed.',
    '- Preserve existing API contracts unless intentionally changed.',
    '- Do not change auth, billing, destructive actions, or external writes without explicit confirmation.',
    ''
  ].join('\n')

  const planMd = [
    '# PLAN',
    '',
    'Execute these phase plans in order.',
    '',
    '~~~txt',
    'plans/00-review-facts.md',
    'plans/01-confirm-unknowns.md',
    'plans/02-safe-change-plan.md',
    'plans/03-implementation.md',
    'plans/04-tests-validation.md',
    '~~~',
    '',
    '## Rules',
    '',
    '- Start from observed facts, not guesses.',
    '- Ask before changing low-confidence areas.',
    '- Add/update tests before or with risky changes.',
    '- Update Buildprint artifacts after architecture changes.',
    ''
  ].join('\n')

  const contractsMd = [
    '# CONTRACTS',
    '',
    'This mapper cannot know every internal interface. Use this file to preserve observed contracts and mark unknowns.',
    '',
    '## Observed route contracts',
    '',
    '### UI routes',
    '',
    facts.routes.length ? facts.routes.slice(0, 80).map((x) => `- \`${x}\``).join('\n') : '- none detected',
    '',
    '### API routes',
    '',
    facts.apis.length ? facts.apis.slice(0, 80).map((x) => `- \`${x}\``).join('\n') : '- none detected',
    '',
    '## Environment contract',
    '',
    'Env var names observed; values were not read or copied.',
    '',
    facts.envNames.length ? facts.envNames.map((x) => `- \`${x}\``).join('\n') : '- none detected',
    '',
    fidelityProfileMd(facts),
    '## Unknown contracts',
    '',
    '- Exact request schemas and validation error shape for selected API/AI workflows.',
    '- Exact stream/event protocol and resumability behavior for selected AI workflows.',
    '- Tool-call input/output schemas, approval gates, and sandbox boundaries.',
    '- Permission rules.',
    '- Business lifecycle rules.',
    '- External write approval semantics.',
    '- Error handling expectations.',
    ''
  ].join('\n')

  const testMatrixMd = [
    '# TEST_MATRIX',
    '',
    '| Risk | Required check |',
    '|---|---|',
    '| Secret leakage | Buildprint artifacts contain env names only, never values |',
    '| Low-confidence permission rules | Ask user before changing auth/roles/destructive actions |',
    '| External writes | Email/SMS/payment/publish/delete flows require explicit policy |',
    '| Route drift | Update tests and Buildprint when UI/API routes change |',
    '| Data model drift | Update tests and Buildprint when schema/model files change |',
    '| Integration drift | Update policies when adding/removing integrations |',
    '| AI request schema drift | Reversal test must verify accepted payloads and validation errors |',
    '| Stream protocol drift | Reversal test must verify event/frame names, finish/error frames, and resume behavior |',
    '| Tool contract drift | Reversal test must verify tool input/output schemas and approval/sandbox rules |',
    '',
    '## Existing tests observed',
    '',
    mdList(facts.tests.slice(0, 80)),
    ''
  ].join('\n')

  const validationTemplateMd = [
    '# Validation',
    '',
    '## Review status',
    '',
    '- Human reviewed observed facts: no',
    '- Human answered questions: no',
    '',
    '## Commands run',
    '',
    '~~~bash',
    '# add project test/build/lint commands here',
    '~~~',
    '',
    '## Test result',
    '',
    '- Overall:',
    '',
    '## Confirmed behavior',
    '',
    '- Observed facts preserved:',
    '- Inferred behavior confirmed:',
    '',
    '## Missing information',
    '',
    questions.map((q) => `- ${q}`).join('\n'),
    '',
    '## Reversal validation',
    '',
    '- Clean-room reversal attempted: no',
    '- Original repo/source withheld from implementing agent: no',
    '- Minimal architecture reversal passed: no',
    '- Behavioral fidelity gaps:',
    '- Exact commands/results:',
    '',
    '## Deviations / architecture changes',
    '',
    '- None / list changes here.',
    '',
    '## Next steps',
    '',
    '- Answer questions in `questions.md`.',
    '- Add tests for any changed auth, billing, external writes, or data model behavior.',
    ''
  ].join('\n')

  const decisions = decisionPromptsFor(facts)
  const reviewPacket = buildMapReviewPacket(facts, confidence, questions, decisions, mapperOsAlignment)
  const appendixQuestions = appendixQuestionsFor(questions, decisions)
  const questionsMd = [
    '# Decisions',
    '',
    'Answer only the few decisions that block the selected Buildprint. Do not turn mapping into an interview.',
    '',
    '## Required now',
    '',
    '| # | Decision | Safe default | Human answer |',
    '|---|---|---|---|',
    decisions.map((d, i) => `| ${i + 1} | ${d.decision} | ${d.defaultAnswer} |  |`).join('\n'),
    '',
    '## Agent rule',
    '',
    '- Ask at most one unresolved required decision at a time.',
    '- Use the safe default only if the user accepts it or the task is explicitly a low-fidelity skeleton/dry-run.',
    '- Do not block on appendix questions unless implementation touches that risk area.',
    '- Never invent answers for auth, money, external writes, persistence, AI/tool calls, or stream protocol parity.',
    '',
    appendixQuestions.length ? '## Appendix — ask only if touched' : '',
    appendixQuestions.length ? appendixQuestions.map((q, i) => `### A${i + 1}. ${q}\n\n- Why it matters: ${whyQuestionMatters(q)}\n- Default handling: keep as unknown; do not claim behavioral parity.`).join('\n\n') : '',
    ''
  ].filter(Boolean).join('\n')

  const phaseFiles = {
    '00-review-facts.md': '# Phase 00 - Review Facts\n\n## Goal\nUnderstand observed facts before planning or implementation.\n\n## Keep in context\n- `AGENT_EXECUTION_BRIEF.md`\n- `CURRENT_STATE.md`\n- `facts.json`\n- `discovered-map.md`\n- `confidence-report.md`\n\n## Steps\n- Read the observed routes, APIs, integrations, data files, tests, and risk areas.\n- Mark anything not directly evidenced as `INFERRED` or `QUESTION`.\n- Confirm this package is discovery scaffold or selected extraction.\n\n## Do not\n- Modify source files.\n- Treat filenames alone as behavior proof.\n- Claim validation or parity from census data.\n\n## Exit criteria\n- Observed facts are understood.\n- Current mode and selected scope are recorded.\n\n## Validation evidence\n- `CURRENT_STATE.md` notes phase completion and blockers.\n',
    '01-confirm-unknowns.md': '# Phase 01 - Confirm Unknowns\n\n## Goal\nResolve only the decisions that block selected-scope extraction.\n\n## Keep in context\n- `questions.md`\n- `policies/questions.md` if available\n- `BUILDPRINT_CANDIDATES.md`\n- `SYSTEM_MAP.md`\n\n## Steps\n- Ask at most one blocking question at a time.\n- Use safe defaults only for non-blocking unknowns.\n- Keep appendix questions out of chat unless the selected scope touches them.\n\n## Do not\n- Run a broad questionnaire.\n- Ask questions the repo already answers.\n- Invent answers for auth, money, data, external writes, providers, or parity.\n\n## Exit criteria\n- Selected candidate/scope is confirmed or blocker is recorded.\n- Production-grade selected-scope posture is confirmed.\n\n## Validation evidence\n- `questions.md` and `CURRENT_STATE.md` show decisions or blockers.\n',
    '02-safe-change-plan.md': '# Phase 02 - Safe Change Plan\n\n## Goal\nPlan the smallest production-grade selected scope.\n\n## Keep in context\n- `BUILDPRINT.md`\n- `SPEC.md`\n- `CONTRACTS.md`\n- `IMPLEMENTATION_COMPLETENESS.md`\n- `TRACEABILITY_MATRIX.md`\n\n## Steps\n- Identify included routes, APIs, data, providers, jobs, exports, and UI surfaces.\n- Exclude capabilities that cannot be real.\n- Map each important requirement to evidence and a validation check.\n\n## Do not\n- Merge unrelated scopes.\n- Keep hard features as placeholders.\n- Count mocks, fixtures, or in-memory-only stores as product behavior.\n\n## Exit criteria\n- Change/extraction scope is explicit.\n- Required tests, QA, persistence, and no-fake checks are known.\n\n## Validation evidence\n- `TRACEABILITY_MATRIX.md` and `IMPLEMENTATION_COMPLETENESS.md` are updated.\n',
    '03-implementation.md': '# Phase 03 - Implementation\n\n## Goal\nImplement or extract only the confirmed selected scope.\n\n## Keep in context\n- `AGENT_EXECUTION_BRIEF.md`\n- `agent-contract.xml`\n- `CURRENT_STATE.md`\n- `PLAN.md`\n- `CONTRACTS.md`\n\n## Steps\n- Follow the selected scope exactly.\n- Preserve observed stack and behavior unless explicitly changed.\n- Update Buildprint artifacts when architecture changes.\n\n## Do not\n- Modify unrelated source areas.\n- Add route-shaped links, no-op controls, fake success states, or skeleton adapters.\n- Expand scope without recording the decision and QA impact.\n\n## Exit criteria\n- Included capabilities are real or explicitly excluded/blocked.\n- `CURRENT_STATE.md` records completed work and next action.\n\n## Validation evidence\n- Changed/generated files and blockers are listed in `SUBMISSION_CHECKLIST.md`.\n',
    '04-tests-validation.md': '# Phase 04 - Tests and Validation\n\n## Goal\nProve the selected scope honestly.\n\n## Keep in context\n- `TEST_MATRIX.md`\n- `QA_PLAN.md`\n- `HEAD_TO_FOOT_QA.md`\n- `VALIDATION_TEMPLATE.md`\n- `SUBMISSION_CHECKLIST.md`\n\n## Steps\n- Run available tests/build/checks or record blockers.\n- Run runtime/browser QA for product UI when applicable.\n- Run persistence/restart QA when state exists.\n- Run no-fake implementation scan.\n- Finish with a chat handover.\n\n## Do not\n- Claim pass status for checks that did not run.\n- Hide known gaps.\n- Count test/demo fixtures as product implementation.\n\n## Exit criteria\n- Validation evidence, gaps, and next direction are recorded.\n- Final chat handover includes outcome, selected scope, evidence, files, commands, gaps, and next direction.\n\n## Validation evidence\n- `VALIDATION_TEMPLATE.md` is filled or an explicit blocker explains why not.\n',
  }

  const agentExecutionBriefMd = [
    '# Agent Execution Brief',
    '',
    'Purpose: first-read file for coding agents using this mapped Buildprint.',
    '',
    '## Mission',
    '',
    `Build or validate the selected production-grade scope for ${facts.packageName}.`,
    `Current mode: ${outputMode}.`,
    `Selected scope: ${selectedScope}.`,
    '',
    '## Read order',
    '',
    '1. `AGENT_EXECUTION_BRIEF.md`',
    '2. `agent-contract.xml`',
    '3. `CURRENT_STATE.md`',
    '4. `BUILDPRINT.md`',
    '5. `SPEC.md`',
    '6. `CONTRACTS.md`',
    '7. `IMPLEMENTATION_COMPLETENESS.md`',
    '8. `TEST_MATRIX.md` and `HEAD_TO_FOOT_QA.md`',
    '9. `MAPPER_OS_ALIGNMENT.md`',
    '',
    '## Hard constraints',
    '',
    '- Included capabilities must be real, wired, persistent where relevant, and QA-tested.',
    '- Cut or block capabilities that cannot be real.',
    '- Mocks and fixtures may exist only in named test/demo paths.',
    '- Do not copy secret values; env var names only.',
    '- Update `CURRENT_STATE.md` after each phase.',
    '- Final chat handover must state outcome, selected scope, evidence, files, commands, gaps, and next direction.',
    '- Mapper behavior must follow `MAPPER_OS_ALIGNMENT.md`; if this package conflicts with Buildprint Mapper OS, Mapper OS wins.',
    '',
    '## Stop conditions',
    '',
    '- Required credentials are missing for an explicitly included live provider.',
    '- A selected capability would need to be mocked or placeholdered to continue.',
    '- Persistence is claimed but no durable adapter can be used.',
    '- Runtime/test/browser QA cannot run and no honest blocker is recorded.',
    ''
  ].join('\n')

  const agentContractXml = `<?xml version="1.0" encoding="UTF-8"?>
<buildprint-agent-contract version="1">
  <mission>Build the selected production-grade scope. Scope may be limited, but included capabilities must be real, wired, persistent where relevant, and QA-tested.</mission>
  <mode>${outputMode}</mode>
  <selected-scope>${selectedScope.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</selected-scope>
  <read-order>
    <file priority="1">AGENT_EXECUTION_BRIEF.md</file>
    <file priority="2">agent-contract.xml</file>
    <file priority="3">CURRENT_STATE.md</file>
    <file priority="4">BUILDPRINT.md</file>
    <file priority="5">SPEC.md</file>
    <file priority="6">CONTRACTS.md</file>
    <file priority="7">IMPLEMENTATION_COMPLETENESS.md</file>
    <file priority="8">TEST_MATRIX.md</file>
    <file priority="9">HEAD_TO_FOOT_QA.md</file>
    <file priority="10">MAPPER_OS_ALIGNMENT.md</file>
  </read-order>
  <must>
    <rule>Separate OBSERVED, INFERRED, QUESTION, and OUT_OF_SCOPE claims.</rule>
    <rule>Implement included capabilities end-to-end or exclude/block them.</rule>
    <rule>Run tests, build, runtime QA, persistence/restart QA when relevant, and no-fake scan before claiming done.</rule>
    <rule>Provide final chat handover with outcome, selected scope, evidence, files, commands, gaps, and next direction.</rule>
  </must>
  <must-not>
    <rule>Do not count mocks, fixtures, skeleton adapters, placeholder routes, no-op controls, fake success states, or in-memory-only claimed persistence as product implementation.</rule>
    <rule>Do not invent validation results.</rule>
    <rule>Do not copy secret values.</rule>
  </must-not>
</buildprint-agent-contract>
`

  const currentStateMd = [
    '# Current State',
    '',
    'Purpose: anti-context-rot handoff file. Update after every phase and before stopping.',
    '',
    '## Mission',
    '',
    `Map or implement the selected production-grade scope for ${facts.packageName}.`,
    '',
    '## Current phase',
    '',
    'Phase 00 - Review Facts.',
    '',
    '## Mode and scope',
    '',
    `- Mode: ${outputMode}`,
    `- Selected scope: ${selectedScope}`,
    '',
    '## Active constraints',
    '',
    '- Discover first, ask later.',
    '- Smaller complete scope beats broad fake scope.',
    '- Evidence labels are required.',
    '- Included capabilities must be real or excluded.',
    '- Final chat handover is required.',
    '',
    '## Evidence so far',
    '',
    '- Commands run: `agb map` generated this package.',
    '- Tests: not run.',
    '- Build: not run.',
    '- Runtime QA: not run.',
    '- No-fake scan: not run.',
    '',
    '## Latest safe next step',
    '',
    facts.selectedCandidate ? '- Continue `plans/00-review-facts.md`, then validate selected-scope extraction.' : '- Choose one candidate from `BUILDPRINT_CANDIDATES.md` before final extraction.',
    ''
  ].join('\n')

  const manifestJson = {
    schemaVersion: 'buildprint-agent-manifest.v1',
    purpose: 'Machine-checkable manifest for an agent-first mapped Buildprint.',
    mode: outputMode,
    selectedScope,
    readOrder: facts.selectedCandidate ? [
      'AGENT_EXECUTION_BRIEF.md',
      'agent-contract.xml',
      'CURRENT_STATE.md',
      'BUILDPRINT.md',
      'SPEC.md',
      'CONTRACTS.md',
      'IMPLEMENTATION_COMPLETENESS.md',
      'TEST_MATRIX.md',
      'HEAD_TO_FOOT_QA.md',
      'REVIEW_PROTOCOL.md',
      'REVIEW_PACKET.json',
      'MAPPER_OS_ALIGNMENT.md',
      'DECOMPOSITION_STRATEGY.md'
    ] : [
      'BUILDPRINT.md',
      'SYSTEM_MAP.md',
      'DECOMPOSITION_STRATEGY.md',
      'BUILDPRINT_CANDIDATES.md',
      'questions.md',
      'REVIEW_PROTOCOL.md',
      'REVIEW_PACKET.json',
      'MAPPER_OS_ALIGNMENT.md'
    ],
    requiredFiles: requiredGeneratedFiles,
    conditionalFiles: {
      'PARITY_CLAIMS.md': 'generated when product/app/API/provider parity claims might be implied',
      'THREAT_MODEL.md': 'generated when auth, payments, admin, API, upload, AI/tool calls, or external writes are detected',
      'DATA_LIFECYCLE.md': 'generated when persistent data, cache, database, or storage surfaces are detected',
      'OBSERVABILITY.md': 'generated when deployable product/service/runtime surfaces are detected',
      'ARCHITECTURE_VIEWS.md': 'generated when the repo appears multi-scope or hierarchical',
      'QUALITY_SCORECARD.md': 'generated for product-like scopes before publish-ready claims'
    },
    requiredGates: facts.selectedCandidate ? [
      'scope-explicit',
      'production-grade-selected-scope-explicit',
      'observed-inferred-question-labels',
      'secrets-scan',
      'traceability-matrix-complete',
      'no-fake-implementation-scan',
      'tests-build-runtime-qa-run-or-blocked',
      'final-chat-handover'
    ] : [
      'size-classification-explicit',
      'decomposition-strategy-complete',
      'candidate-selection-required',
      'observed-inferred-question-labels',
      'secrets-scan',
      'no-implementation-claims',
      'final-chat-handover'
    ],
    sizeClassification,
    mapperOs: {
      source: mapperOsAlignment.source,
      slug: mapperOsAlignment.slug,
      title: mapperOsAlignment.title,
      canonicalStart: mapperOsAlignment.canonicalStart,
      authoritySpine: mapperOsAlignment.authoritySpine,
      checksum: mapperOsAlignment.checksum,
      bindingSlice: mapperOsAlignment.bindingSlice,
      forbiddenDefaults: mapperOsAlignment.forbiddenDefaults
    },
    mustNotCountAsProductImplementation: [
      'mock providers',
      'fixtures',
      'skeleton adapters',
      'placeholder routes',
      'route-shaped links',
      'no-op controls',
      'fake success states',
      'in-memory-only stores when persistence is claimed'
    ]
  }

  const qaPlanMd = [
    '# QA Plan',
    '',
    'QA must derive from observed routes, APIs, integrations, state, and risks.',
    '',
    '## Required checks',
    '',
    '- Static secret scan of generated artifacts.',
    '- Unit/build/lint commands from the mapped repo when available.',
    '- Contract checks for selected APIs/routes.',
    '- Runtime/browser QA for product UI when applicable.',
    '- Persistence/restart QA when product state exists.',
    '- No-fake scan for placeholders, no-op controls, route-shaped links, skeleton adapters, and mock-as-product paths.',
    '',
    '## Observed surfaces',
    '',
    `- UI routes: ${facts.routes.length}`,
    `- API routes/endpoints: ${facts.apis.length}`,
    `- Integrations: ${facts.integrations.join(', ') || 'none detected'}`,
    `- Risk areas: ${facts.risky.join(', ') || 'none detected'}`,
    ''
  ].join('\n')

  const implementationCompletenessMd = [
    '# Implementation Completeness',
    '',
    'Inventory every included capability. Mark each as real, excluded, or blocked.',
    '',
    '## Included surfaces to review',
    '',
    '### UI routes',
    facts.routes.length ? facts.routes.map((x) => `- [ ] ${x} - real behavior / excluded / blocked`).join('\n') : '- none detected',
    '',
    '### API routes/endpoints',
    facts.apis.length ? facts.apis.map((x) => `- [ ] ${x} - real handler contract / excluded / blocked`).join('\n') : '- none detected',
    '',
    '### Data and integrations',
    facts.db.length ? facts.db.map((x) => `- [ ] ${x} - durable behavior reviewed`).join('\n') : '- no data/model files detected',
    facts.integrations.length ? facts.integrations.map((x) => `- [ ] ${x} - real provider or explicitly excluded`).join('\n') : '- no integrations detected',
    '',
    '## No-fake blockers',
    '',
    '- Placeholder routes block completion.',
    '- No-op controls block completion.',
    '- Skeleton adapters block provider/export claims.',
    '- Mocks/fixtures are allowed only in test/demo paths.',
    '- In-memory-only stores block persistence claims.',
    ''
  ].join('\n')

  const headToFootQaMd = [
    '# Head-to-Foot QA',
    '',
    '- [ ] Static safety: no secret values copied; env names only.',
    '- [ ] Contract checks: selected APIs/routes have schemas, error behavior, and side effects documented.',
    '- [ ] Build/tests: exact commands run or blockers recorded.',
    '- [ ] Runtime happy path: product/app/feature can be exercised locally when applicable.',
    '- [ ] Runtime negative paths: invalid input, auth denial, provider failure, and empty states covered where relevant.',
    '- [ ] Persistence/restart: write, reload/restart, and read when state exists.',
    '- [ ] Browser QA: Playwright CLI or equivalent click-through when UI exists.',
    '- [ ] No-fake scan: no placeholders, no-op controls, skeleton adapters, fake success states, or mock-as-product behavior.',
    '- [ ] Final chat handover: outcome, selected scope, evidence, files, commands, gaps, next direction.',
    ''
  ].join('\n')

  const traceabilityMatrixMd = [
    '# Traceability Matrix',
    '',
    '| Requirement | Source evidence | Confidence | Reversal check | QA check | Status |',
    '|---|---|---|---|---|---|',
    ...facts.routes.slice(0, 20).map((x) => `| Preserve UI route \`${x}\` | OBSERVED route | high | route exists/rendered | browser/runtime QA | pending |`),
    ...facts.apis.slice(0, 20).map((x) => `| Preserve API contract \`${x}\` | OBSERVED API | medium | handler/schema test | contract/runtime QA | pending |`),
    ...facts.integrations.map((x) => `| Preserve ${x} boundary | INFERRED dependency | medium | adapter/exclusion proof | integration/no-network QA | pending |`),
    '',
    'Unverified requirements must stay `QUESTION` until confirmed.',
    ''
  ].join('\n')

  const submissionChecklistMd = [
    '# Submission Checklist',
    '',
    '- [ ] Scope explicit.',
    '- [ ] Selected mode recorded: discovery scaffold or selected extraction.',
    '- [ ] Production-grade selected-scope posture explicit.',
    '- [ ] Evidence labels used: OBSERVED / INFERRED / QUESTION / OUT_OF_SCOPE.',
    '- [ ] Required files exist.',
    '- [ ] `agent-contract.xml` parses.',
    '- [ ] `manifest.json` parses and required files exist.',
    '- [ ] Secrets check completed.',
    '- [ ] No-fake implementation scan completed or blocked.',
    '- [ ] Runtime/browser QA recorded when UI/runtime proof applies.',
    '- [ ] Persistence/restart QA recorded when state exists.',
    '- [ ] Golden mapper evals run when mapper behavior changes.',
    '- [ ] Final chat handover includes outcome, selected scope, evidence, files, commands, known gaps, and next direction.',
    ''
  ].join('\n')

  const readmeMd = [
    `# ${facts.packageName} Mapped Buildprint`,
    '',
    `Mode: ${outputMode}`,
    '',
    'Start with `AGENT_EXECUTION_BRIEF.md`, then follow `agent-contract.xml`, `CURRENT_STATE.md`, and `BUILDPRINT.md`.',
    '',
    'For max-quality review before implementation, use `REVIEW_PROTOCOL.md` and `REVIEW_PACKET.json`.',
    '',
    'This package is safe-by-default: no source app mutation, no secret copying, and no external writes unless explicitly selected and validated.',
    ''
  ].join('\n')

  const parityClaimsMd = [
    '# Parity Claims',
    '',
    '## Safe wording',
    '',
    '- Mapped Buildprint scaffold based on observed repository evidence.',
    '- Selected-scope implementation guide after human confirmation.',
    '',
    '## Unsafe wording',
    '',
    '- Do not claim full clone, drop-in replacement, exact behavior parity, provider parity, or production readiness without reversal/runtime evidence.',
    '',
    '## Upgrade evidence required',
    '',
    '- Selected scope confirmed.',
    '- Reversal validation passed.',
    '- Runtime/browser QA passed where applicable.',
    '- Known gaps listed honestly.',
    ''
  ].join('\n')

  const threatModelMd = [
    '# Threat Model',
    '',
    'Generated because sensitive surfaces were detected or may be implied.',
    '',
    '## Surfaces',
    '',
    mdList(facts.risky),
    '',
    '## Required review',
    '',
    '- Auth/session ownership.',
    '- External writes and destructive actions.',
    '- Secret handling.',
    '- Provider/API abuse and rate limits.',
    '- Admin or payment behavior if selected.',
    ''
  ].join('\n')

  const dataLifecycleMd = [
    '# Data Lifecycle',
    '',
    'Generated because persistent data/cache/storage surfaces were detected or may be implied.',
    '',
    '## Observed data/model files',
    '',
    mdList(facts.db),
    '',
    '## Required review',
    '',
    '- Source of truth.',
    '- Ownership and deletion.',
    '- Import/export compatibility.',
    '- Persistence/restart behavior.',
    '- Backup/recovery expectations.',
    ''
  ].join('\n')

  const observabilityMd = [
    '# Observability',
    '',
    'Generated because deployable/runtime surfaces were detected or may be implied.',
    '',
    '## Required signals',
    '',
    '- Request/job errors.',
    '- Provider failures and retries.',
    '- Auth/admin/security-sensitive events.',
    '- Persistence failures.',
    '- Build/test/runtime QA evidence.',
    ''
  ].join('\n')

  const architectureViewsMd = [
    '# Architecture Views',
    '',
    'Generated because this repo appears multi-scope or hierarchical.',
    '',
    '## Subprojects',
    '',
    facts.subprojects.length ? facts.subprojects.map((x) => `- ${x.path} (${x.kind}, ${x.name})`).join('\n') : '- none detected',
    '',
    '## Required use',
    '',
    '- Split unrelated scopes before extraction.',
    '- Prefer one smaller complete Buildprint over broad fake coverage.',
    ''
  ].join('\n')

  const qualityScorecardMd = [
    '# Quality Scorecard',
    '',
    '- [ ] Evidence-backed claims.',
    '- [ ] Selected scope is smaller and complete.',
    '- [ ] Included capabilities are real or excluded.',
    '- [ ] Edge cases and failure modes are represented.',
    '- [ ] QA is derived from mapped flows.',
    '- [ ] No-fake implementation scan passes.',
    '- [ ] Final chat handover is complete.',
    ''
  ].join('\n')

  fs.writeFileSync(path.join(out, 'BUILDPRINT.md'), buildprintMd)
  fs.writeFileSync(path.join(out, 'SPEC.md'), specMd)
  fs.writeFileSync(path.join(out, 'PLAN.md'), planMd)
  fs.writeFileSync(path.join(out, 'CONTRACTS.md'), contractsMd)
  fs.writeFileSync(path.join(out, 'TEST_MATRIX.md'), testMatrixMd)
  fs.writeFileSync(path.join(out, 'VALIDATION_TEMPLATE.md'), validationTemplateMd)
  fs.writeFileSync(path.join(out, 'questions.md'), questionsMd)
  fs.writeFileSync(path.join(out, 'AGENT_EXECUTION_BRIEF.md'), agentExecutionBriefMd)
  fs.writeFileSync(path.join(out, 'agent-contract.xml'), agentContractXml)
  fs.writeFileSync(path.join(out, 'CURRENT_STATE.md'), currentStateMd)
  fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifestJson, null, 2) + '\n')
  fs.writeFileSync(path.join(out, 'README.md'), readmeMd)
  fs.writeFileSync(path.join(out, 'QA_PLAN.md'), qaPlanMd)
  fs.writeFileSync(path.join(out, 'IMPLEMENTATION_COMPLETENESS.md'), implementationCompletenessMd)
  fs.writeFileSync(path.join(out, 'HEAD_TO_FOOT_QA.md'), headToFootQaMd)
  fs.writeFileSync(path.join(out, 'TRACEABILITY_MATRIX.md'), traceabilityMatrixMd)
  fs.writeFileSync(path.join(out, 'SUBMISSION_CHECKLIST.md'), submissionChecklistMd)
  fs.writeFileSync(path.join(out, 'REVIEW_PROTOCOL.md'), formatMapReviewProtocol(reviewPacket))
  fs.writeFileSync(path.join(out, 'REVIEW_PACKET.json'), JSON.stringify(reviewPacket, null, 2) + '\n')
  fs.writeFileSync(path.join(out, 'MAPPER_OS_ALIGNMENT.md'), formatMapperOsAlignment(mapperOsAlignment))
  fs.writeFileSync(path.join(out, 'DECOMPOSITION_STRATEGY.md'), decompositionStrategyMd(facts, sizeClassification))
  if (isProductLike) fs.writeFileSync(path.join(out, 'PARITY_CLAIMS.md'), parityClaimsMd)
  if (needsThreatModel) fs.writeFileSync(path.join(out, 'THREAT_MODEL.md'), threatModelMd)
  if (needsDataLifecycle) fs.writeFileSync(path.join(out, 'DATA_LIFECYCLE.md'), dataLifecycleMd)
  if (needsObservability) fs.writeFileSync(path.join(out, 'OBSERVABILITY.md'), observabilityMd)
  if (needsArchitectureViews) fs.writeFileSync(path.join(out, 'ARCHITECTURE_VIEWS.md'), architectureViewsMd)
  if (isProductLike) fs.writeFileSync(path.join(out, 'QUALITY_SCORECARD.md'), qualityScorecardMd)
  for (const [file, content] of Object.entries(phaseFiles)) fs.writeFileSync(path.join(out, 'plans', file), content)
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
  return { json: JSON.parse(readText(absolute)), baseUrl: `file://${absolute}` }
}

function resolveManifestUrl(manifestRef, maybeRelative) {
  if (!maybeRelative) return null
  if (isUrl(maybeRelative)) return maybeRelative
  if (isUrl(manifestRef)) return new URL(maybeRelative, manifestRef).href
  if (manifestRef.startsWith('file://')) {
    const manifestPath = fileURLToPath(manifestRef)
    return `file://${path.resolve(path.dirname(manifestPath), maybeRelative)}`
  }
  return maybeRelative
}

async function fetchTextExact(url) {
  if (url.startsWith('file://')) return readText(fileURLToPath(url))
  const res = await fetch(url)
  if (!res.ok) throw new Error(`failed to fetch ${url}: HTTP ${res.status}`)
  const text = await res.text()
  if (looksLikeHtml(text)) throw new Error(`expected Buildprint snapshot text but received HTML from ${url}`)
  return text
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
}

async function startBuildprint(manifestRef, targetFolder = cwd) {
  const { json: manifest, baseUrl } = await readJsonFromUrlOrFile(manifestRef)
  if (!manifest.slug || !Array.isArray(manifest.files)) throw new Error('invalid Buildprint package manifest: expected slug and files[]')

  const targetRoot = path.resolve(cwd, targetFolder)
  fs.mkdirSync(targetRoot, { recursive: true })
  const stateDir = path.join(targetRoot, '.buildprint')
  const snapshotDir = path.join(stateDir, 'snapshots')
  fs.mkdirSync(snapshotDir, { recursive: true })

  const downloaded = []
  for (const file of manifest.files) {
    if (!file.path || file.path.includes('*')) continue
    const source = resolveManifestUrl(baseUrl, file.siteUrl || file.rawUrl)
    if (!source) throw new Error(`missing source URL for ${file.path}`)
    const text = await fetchTextExact(source)
    if (!text.trim()) throw new Error(`downloaded empty snapshot for ${file.path}`)
    const dest = path.join(snapshotDir, file.path)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, text)
    downloaded.push({ path: file.path, sourceUrl: source, bytes: Buffer.byteLength(text) })
  }

  const now = new Date().toISOString()
  writeJson(path.join(stateDir, 'source.json'), {
    slug: manifest.slug,
    title: manifest.title,
    category: manifest.category,
    tier: manifest.tier,
    status: manifest.status,
    manifestUrl: isUrl(manifestRef) ? manifestRef : path.resolve(cwd, manifestRef),
    agentUrl: resolveManifestUrl(baseUrl, manifest.entrypoints?.agent),
    promptUrl: resolveManifestUrl(baseUrl, manifest.entrypoints?.prompt),
    githubUrl: manifest.entrypoints?.github,
    rawBase: manifest.entrypoints?.rawBase,
    snapshotMode: 'download_exact',
    startedAt: now,
    downloaded,
  })

  writeJson(path.join(stateDir, 'state.json'), {
    buildprint: manifest.slug,
    currentPhase: '00-alignment',
    completedPhases: [],
    blocked: false,
    lastAction: `downloaded ${downloaded.length} exact Buildprint snapshot files`,
    nextAction: 'read .buildprint/next-agent.md and begin alignment or default-preset flow',
    updatedAt: now,
  })

  fs.writeFileSync(path.join(stateDir, 'progress.md'), `# Build Progress\n\n## Done\n- Bootstrapped .buildprint/ from package manifest.\n- Downloaded ${downloaded.length} exact Buildprint snapshot files.\n\n## Current\n- Phase 00 — Alignment.\n\n## Next\n- Read snapshots and follow the Buildprint alignment rules.\n`)
  fs.writeFileSync(path.join(stateDir, 'decisions.md'), `# Decisions\n\nNo implementation decisions recorded yet. Add confirmed alignment choices here.\n`)
  fs.writeFileSync(path.join(stateDir, 'blockers.md'), `# Blockers\n\nNone currently.\n`)
  fs.writeFileSync(path.join(stateDir, 'next-agent.md'), `# Next Agent Instructions

Start here.

1. Read \`.buildprint/snapshots/BUILDPRINT.md\` first.
2. Read \`.buildprint/source.json\` and \`.buildprint/state.json\` for local bootstrap/state context.
3. Follow \`BUILDPRINT.md\`'s Required Read Order, Phase Gates, and Acceptance Gates.
4. Continue current phase: \`00-alignment\`.

Rules:

- \`BUILDPRINT.md\` is the canonical start file and owns the required read order.
- Structured control files such as \`buildprint.json\`, \`phases.yaml\`, \`acceptance.yaml\`, and \`claims.yaml\` are machine-readable mirrors only; do not treat them as competing instructions.
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
  if (isHelp(args[1])) usage(0)
  const folder = args[1]
  if (!folder) usage(1)
  try {
    const phase = optionValue('--phase')
    if (args.includes('--strict')) throw new Error('unsupported option for analyze: --strict; agb analyze now emits review packets instead of pass/fail verdicts')
    if (args.includes('--scan')) throw new Error('unsupported option for analyze: --scan; use default Markdown, --json, or --yaml packet output')
    const json = args.includes('--json')
    const yaml = args.includes('--yaml')
    const packet = buildAnalyzePacket(folder, { phase })
    process.stdout.write(json ? formatPacketJson(packet) : yaml ? formatPacketYaml(packet) : formatPacketMarkdown(packet))
    process.exit(0)
  } catch (error) {
    console.error(`Analyze failed: ${error.message}`)
    process.exit(1)
  }
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

if (args[0] === 'map') {
  if (isHelp(args[1])) usage(0)
  const repo = args[1]
  if (!repo) usage(1)
  try {
    const out = optionValue('--out')
    const scope = optionValue('--scope')
    const candidate = optionValue('--candidate')
    const result = writeMappedBuildprint(repo, out, { scope, candidate })
    console.log(`Created mapped Buildprint: ${result.out}`)
    console.log(`Files scanned: ${result.facts.totalFilesScanned}`)
    console.log(`Frameworks: ${result.facts.frameworks.join(', ') || 'none detected'}`)
    console.log(`Risk areas: ${result.facts.risky.join(', ') || 'none detected'}`)
    console.log(`Review questions: ${result.questions.length}`)
    if (result.facts.scope) console.log(`Scope: ${result.facts.scope}`)
    if (result.facts.selectedCandidate) console.log(`Selected candidate: ${result.facts.selectedCandidate.title}`)
    process.exit(0)
  } catch (error) {
    console.error(`Map failed: ${error.message}`)
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
