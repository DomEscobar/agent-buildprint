#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'

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

Examples:
  agb check ./my-buildprint
  agb check ./my-buildprint --code ./my-agent
  agb start https://agent-buildprint.com/buildprints/ai-influencer-os/package.json ./my-build
  agb packet check ./buildprints/ai-swarm-simulator
  agb packet next ./buildprints/ai-swarm-simulator
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

function isGitRepoUrl(value) {
  return /^(https?:\/\/|git@|ssh:\/\/|file:\/\/)/i.test(value)
}

function repoNameFromUrl(value) {
  return path.basename(String(value).replace(/[?#].*$/, '').replace(/\/$/, '').replace(/\.git$/, '')) || 'source-repo'
}

function tempCloneFolderFor(url) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const safeName = repoNameFromUrl(url).replace(/[^a-z0-9._-]+/gi, '-').slice(0, 80) || 'source-repo'
  return path.join(os.tmpdir(), `agb-map-${safeName}-${stamp}`)
}

function gitValue(repo, args) {
  try {
    return execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return null
  }
}

function prepareMapSource(repoArg) {
  if (!isGitRepoUrl(repoArg)) {
    const localPath = path.resolve(cwd, repoArg)
    return {
      input: repoArg,
      kind: 'local',
      localPath,
      url: null,
      clonePath: null,
      commit: gitValue(localPath, ['rev-parse', 'HEAD'])
    }
  }

  const clonePath = tempCloneFolderFor(repoArg)
  fs.mkdirSync(path.dirname(clonePath), { recursive: true })
  execFileSync('git', ['clone', '--depth', '1', repoArg, clonePath], { stdio: 'pipe' })
  return {
    input: repoArg,
    kind: 'git-url',
    localPath: clonePath,
    url: repoArg,
    clonePath,
    commit: gitValue(clonePath, ['rev-parse', 'HEAD'])
  }
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
  const checksum = crypto
    .createHash('sha256')
    .update([buildprintJsonText, buildprintMd, discoverPrompt, extractPrompt, phases].join('\n---MAPPER-OS-FILE---\n'))
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
      if (sp.path !== '.') c.push(candidate(`${sp.name} Runtime Slice Discovery`, `Runtime/package marker at ${sp.path}`, [sp.path], 'This runtime/package marker may indicate a reusable slice, but source review must confirm whether it is product-complete.', ['cross-project coupling'], ['Is this runtime intended as a standalone reusable blueprint?'], 'basic'))
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
  const ranked = [
    ...pathBacked.sort(byTier),
    ...(pathBacked.length < 2 ? folderFallbacks.sort(byTier) : []),
    ...signalOnly.sort(byTier)
  ]
  const seenTitles = new Set()
  return ranked.filter((item) => {
    const key = item.title.toLowerCase()
    if (seenTitles.has(key)) return false
    seenTitles.add(key)
    return true
  }).slice(0, 10)
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
  if (options.fullSuite && (options.scope || options.candidate)) {
    throw new Error('--full-suite cannot be combined with --scope or --candidate; it is already an explicit whole-repo selection')
  }
  const source = prepareMapSource(repoArg)
  const baseRepo = source.localPath
  if (!exists(baseRepo) || !fs.statSync(baseRepo).isDirectory()) throw new Error(`repo folder missing: ${baseRepo}`)
  const repo = options.scope ? path.resolve(baseRepo, options.scope) : baseRepo
  if (!repo.startsWith(baseRepo)) throw new Error(`scope must stay inside repo: ${options.scope}`)
  if (!exists(repo) || !fs.statSync(repo).isDirectory()) throw new Error(`scope folder missing: ${repo}`)
  const out = path.resolve(cwd, outArg ?? (source.kind === 'git-url' ? `${repoNameFromUrl(repoArg)}.mapped-buildprint` : path.join(baseRepo, '.project.buildprint')))
  fs.mkdirSync(out, { recursive: true })

  const facts = detectProjectFacts(repo)
  facts.source = {
    input: source.input,
    kind: source.kind,
    url: source.url,
    localPath: source.localPath,
    clonePath: source.clonePath,
    commit: source.commit
  }
  facts.sourceRoot = baseRepo
  if (options.scope) {
    facts.sourceRoot = baseRepo
    facts.scope = options.scope
  }
  const numberedCandidate = options.candidate ? facts.candidateBuildprints[Number(options.candidate) - 1] : null
  if (options.candidate && !numberedCandidate) throw new Error(`candidate ${options.candidate} not found; available candidates: ${facts.candidateBuildprints.length}`)
  if (numberedCandidate && !numberedCandidate.includedPaths.length) throw new Error(`candidate ${options.candidate} is signal-only and has no evidence-backed paths; choose a path-backed candidate or use --scope`)
  const scopedCandidate = options.scope ? candidate(
    'Explicit Scope Buildprint',
    `Explicit path scope: ${options.scope}`,
    [options.scope],
    'User selected a concrete repository path; map this bounded slice as the implementation scope.',
    facts.risky,
    ['Confirm whether dependencies outside this scoped path may be referenced but not implemented.'],
    facts.totalFilesScanned > 120 ? 'strong' : 'agent-grade',
    'explicit-scope'
  ) : null
  const fullSuiteCandidate = options.fullSuite ? candidate(
    'Full Suite Buildprint',
    'Full source repository feature suite',
    ['.'],
    'User explicitly selected the whole repository feature suite. Keep every reviewed capability in scope, but keep qualification blockers visible until runtime proof exists.',
    unique([...facts.risky, 'broad full-suite scope', 'provider/runtime proof required', 'security and deployment review required']),
    [
      'Which runtime checks prove provider, browser, report/log streaming, persistence, and deployment parity?',
      'Which known source defects or contract mismatches must be preserved as documented behavior vs fixed in the rebuild?',
      'Which external services need fakes, fixtures, or live credentials during qualification?'
    ],
    'system',
    'full-suite'
  ) : null
  const selectedCandidate = numberedCandidate ?? scopedCandidate ?? fullSuiteCandidate
  if (selectedCandidate) facts.selectedCandidate = selectedCandidate
  if (options.fullSuite) facts.fullSuite = true
  const confidence = confidenceFor(facts)
  const questions = []
  if (confidence.permission_model === 'low') questions.push('What is the intended permission model? Which roles may create, update, delete, or invite?')
  if (confidence.data_model === 'low') questions.push('Where is the source of truth for the data model? Database schema, ORM models, or external service?')
  if (facts.risky.includes('payments')) questions.push('What is the intended billing lifecycle and source of truth for subscription/access state?')
  if (facts.risky.includes('external messaging')) questions.push('Which user actions require human approval before email/SMS/external messages are sent?')
  for (const q of fidelityQuestionsFor(facts)) questions.push(q)
  questions.push('Which observed modules are legacy and should not be copied as desired architecture?')

  const sourceLines = [`- Input: ${facts.source.input}`, `- Kind: ${facts.source.kind}`, `- Local checkout: ${facts.source.localPath}`, `- Commit: ${facts.source.commit || 'unavailable'}`]
  if (facts.source.url) sourceLines.splice(2, 0, `- URL: ${facts.source.url}`)
  const discovered = `# Discovery Census\n\nProject: ${facts.packageName}\nRoot: ${facts.root}\nFiles scanned: ${facts.totalFilesScanned}\nPackage manager: ${facts.packageManager}\nDiscovery status: DISCOVERY_REVIEW_REQUIRED\n\n## Source checkout\n${sourceLines.join('\n')}\n\nThis file is a safe census, not a product map. Every item below is a \`CENSUS_HINT\` until an agent reads source and promotes it in \`CLAIM_REGISTER.md\` with evidence.\n\n## Framework / capability hints\n${censusHintList(facts.frameworks)}\n\n## Script hints\n${censusHintList(facts.scripts)}\n\n## UI route/page hints\n${censusHintList(facts.routes)}\n\n## API route/endpoint hints\n${censusHintList(facts.apis)}\n\n## Data/model file hints\n${censusHintList(facts.db)}\n\n## Test hints\n${censusHintList(facts.tests.slice(0, 80))}\n\n## Deploy / ops hints\n${censusHintList(facts.deploy)}\n\n## Integration hints from manifests and filenames\n${censusHintList(facts.integrations)}\n\n## Environment variable names only\n${censusHintList(facts.envNames)}\n`;

  const systemMap = `# SYSTEM_MAP\n\n## Project\n\n- Name: ${facts.packageName}\n- Root: ${facts.root}\n- Files scanned for census: ${facts.totalFilesScanned}\n- Package manager: ${facts.packageManager}\n- Scope selection required: ${facts.needsScopeSelection ? 'yes' : 'no'}\n- Discovery status: DISCOVERY_REVIEW_REQUIRED\n\n## Authority boundary\n\nThis is not a completed architecture map. It is an agent-guided workbench. Architecture zones below are reading lanes seeded by census hints. They become product facts only after source review promotes claims to \`OBSERVED(path:line)\`.\n\n## Architecture reading lanes\n\n### Frontend / UI\n${pendingDiscoveryList(facts.routes.slice(0, 60), 'inspect route/page hint ')}\n\n### API / backend\n${pendingDiscoveryList(facts.apis.slice(0, 60), 'inspect API/handler hint ')}\n\n### Data model\n${pendingDiscoveryList(facts.db.slice(0, 60), 'inspect data/model hint ')}\n\n### Integrations\n${pendingDiscoveryList(facts.integrations, 'inspect integration hint ')}\n\n### Subprojects / examples\n${facts.subprojects.length ? facts.subprojects.map((x) => `- CENSUS_HINT: inspect ${x.kind} ${x.path} (${x.name})`).join('\n') : '- PENDING_AGENT_DISCOVERY: inspect manifests and entrypoints before making topology claims'}\n\n## Risk hints\n${censusHintList(facts.risky)}\n\n${fidelityProfileMd(facts)}\n## Human or agent review needed\n\n- Read \`SOURCE_READING_PLAN.md\` and \`DISCOVERY_QUEUE.md\` before selecting a candidate.\n- Promote claims in \`CLAIM_REGISTER.md\` only with source evidence.\n- Confirm which modules are product behavior vs legacy/test/demo implementation.\n- Confirm auth, billing, external-write, data lifecycle, and reversal-fidelity rules.\n`;

  const candidatesMd = `# BUILDPRINT_CANDIDATES\n\nThese are candidate discovery tasks, not approved implementation scopes. Static census may suggest useful slices, but a candidate is selectable only after source review records evidence in \`CLAIM_REGISTER.md\`.\n\n${facts.needsScopeSelection ? '> Scope selection is required before final extraction. This repo appears large, mixed, or multi-scope.\n\n' : ''}${facts.candidateBuildprints.length ? facts.candidateBuildprints.map((c, i) => `## ${i + 1}. ${c.title}\n\n- Claim state: PENDING_AGENT_DISCOVERY\n- Census scope hint: ${c.scope}\n- Estimated tier hint: ${c.estimatedTier}\n- Why it may be reusable: ${c.whyReusable}\n- Paths to read before selection:\n${c.includedPaths.length ? c.includedPaths.map((x) => `  - CENSUS_HINT: ${x}`).join('\n') : '  - PENDING_AGENT_DISCOVERY: no paths selected by census'}\n- Exclusion questions:\n${c.excludedPaths.length ? c.excludedPaths.map((x) => `  - ${x}`).join('\n') : '  - PENDING_AGENT_DISCOVERY: exclusions require source review'}\n- Risk hints:\n${c.risks.length ? c.risks.map((x) => `  - CENSUS_HINT: ${x}`).join('\n') : '  - PENDING_AGENT_DISCOVERY: read source before risk claims'}\n- Questions:\n${c.questions.length ? c.questions.map((x) => `  - ${x}`).join('\n') : '  - Promote/reject this candidate with source evidence before extraction.'}\n`).join('\n') : 'No candidate has been agent-promoted yet. Use SYSTEM_MAP.md, SOURCE_READING_PLAN.md, and DISCOVERY_QUEUE.md for source review.\n'}\n`;

  const selectedCandidateMd = selectedCandidate ? `# SELECTED_CANDIDATE

## ${selectedCandidate.title}

- Scope: ${selectedCandidate.scope}
- Estimated tier: ${selectedCandidate.estimatedTier}
- Why reusable: ${selectedCandidate.whyReusable}

## Included paths
${selectedCandidate.includedPaths.length ? selectedCandidate.includedPaths.map((x) => `- ${x}`).join('\n') : '- QUESTION: no paths selected'}

## Excluded paths
${selectedCandidate.excludedPaths.length ? selectedCandidate.excludedPaths.map((x) => `- ${x}`).join('\n') : '- PENDING_AGENT_DISCOVERY: no exclusions recorded yet'}

## Risks
${selectedCandidate.risks.length ? selectedCandidate.risks.map((x) => `- ${x}`).join('\n') : '- PENDING_AGENT_DISCOVERY: read selected source before making risk claims'}

## Questions before implementation
${selectedCandidate.questions.length ? selectedCandidate.questions.map((x) => `- ${x}`).join('\n') : '- PENDING_AGENT_DISCOVERY: selected source review may add questions'}

${fidelityProfileMd(facts)}
## Agent instruction

Use this selected candidate as the extraction scope. Treat listed paths as the starting boundary, then ask before crossing into unrelated modules. Do not claim validation until checks have actually run.
` : '';

  const confidenceMd = `# Confidence Report\n\nThe mapper separates deterministic facts from inference. Low-confidence areas must be reviewed before coding agents make changes.\n\n${Object.entries(confidence).map(([k, v]) => `- ${k}: **${v}**`).join('\n')}\n\n## Questions to finalize this Buildprint\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n`;

  const risksMd = `# Risk Report\n\nDetected risk areas:\n\n${facts.risky.length ? facts.risky.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Default guardrails\n\n- Do not copy secret values into the Buildprint.\n- Do not perform external writes without an explicit approval rule.\n- Treat business rules and permissions as low confidence until a human confirms them.\n- Do not treat legacy code as desired architecture without review.\n`;

  const buildprintYaml = `name: ${facts.packageName}-mapped-buildprint\nkind: agent-buildprint/mapped-existing-project\nversion: 0.1.0\nsource_repo: ${facts.source.url || facts.root}\nsource_checkout: ${facts.source.localPath}\nsource_commit: ${facts.source.commit || 'unavailable'}\ngenerated_by: agb map\n\npurpose: >\n  Architecture contract draft generated from an existing repository. Use this to orient coding agents,\n  identify low-confidence areas, and create checks before future changes.\n\ndiscovered:\n  package_manager: ${facts.packageManager}\n  frameworks:\n${yamlList(facts.frameworks)}\n  integrations:\n${yamlList(facts.integrations)}\n  risk_areas:\n${yamlList(facts.risky)}\n  ui_routes:\n${yamlList(facts.routes.slice(0, 60))}\n  api_routes:\n${yamlList(facts.apis.slice(0, 60))}\n  data_files:\n${yamlList(facts.db.slice(0, 60))}\n  env_names_only:\n${yamlList(facts.envNames)}\n\nconfidence:\n${Object.entries(confidence).map(([k,v]) => `  ${k}: ${v}`).join('\n')}\n\npolicies:\n  secret_values: never_copy\n  low_confidence_business_rules: ask_human\n  external_writes: require_explicit_policy\n  destructive_actions: require_human_approval\n\nquestions:\n${yamlList(questions)}\n\nartifacts:\n  discovered_map: ./discovered-map.md\n  confidence_report: ./confidence-report.md\n  risks: ./risks.md\n  continuation_prompt: ./prompts/continue-building.md\n  architecture_checks: ./tests/architecture.yaml\n`;

  const prompt = `# Continue Building Prompt\n\nYou are working in this existing repository. Before changing code, read:\n\n1. .project.buildprint/discovered-map.md\n2. .project.buildprint/confidence-report.md\n3. .project.buildprint/risks.md\n4. .project.buildprint/buildprint.yaml\n\nRules:\n- Treat high-confidence facts as observed repo structure.\n- Treat low-confidence items as questions, not facts.\n- Do not modify low-confidence business rules or permission logic without asking.\n- Do not copy or expose secret values.\n- Preserve the existing stack unless explicitly asked to migrate.\n- Add or update checks when changing architecture, auth, billing, external writes, or data models.\n`;

  const checks = `name: mapped-project-architecture-checks\nchecks:\n  - id: no-secret-values-in-buildprint\n    rule: Buildprint artifacts must contain env var names only, never secret values.\n  - id: low-confidence-requires-question\n    rule: Low-confidence business rules, permissions, and billing lifecycle require human confirmation before implementation changes.\n  - id: external-writes-need-policy\n    rule: Email, SMS, payment, publishing, delete, and production mutation flows require explicit policy and approval semantics.\n  - id: update-buildprint-on-architecture-change\n    rule: When routes, APIs, data model, auth, or integrations change, update .project.buildprint.\n`;

  writeDiscoveryPackage(out, facts, confidence, questions, {
    buildprintYaml,
    discovered,
    systemMap,
    candidatesMd,
    confidenceMd,
    risksMd
  })
  if (selectedCandidate) {
    const selectedOut = path.join(out, 'selected-buildprint')
    fs.mkdirSync(selectedOut, { recursive: true })
    writeMappedPackageExtras(selectedOut, facts, confidence, questions)
    fs.writeFileSync(path.join(selectedOut, 'facts.json'), JSON.stringify(facts, null, 2) + '\n')
    fs.writeFileSync(path.join(selectedOut, 'SYSTEM_MAP.md'), systemMap)
    fs.writeFileSync(path.join(selectedOut, 'BUILDPRINT_CANDIDATES.md'), candidatesMd)
    fs.writeFileSync(path.join(selectedOut, 'SOURCE_READING_PLAN.md'), sourceReadingPlanMd(facts))
    fs.writeFileSync(path.join(selectedOut, 'DISCOVERY_QUEUE.md'), discoveryQueueMd(facts))
    fs.writeFileSync(path.join(selectedOut, 'CLAIM_REGISTER.md'), claimRegisterMd(facts))
    fs.writeFileSync(path.join(selectedOut, 'EVIDENCE_LEDGER.json'), JSON.stringify(evidenceLedger(facts), null, 2) + '\n')
    fs.writeFileSync(path.join(selectedOut, 'census.json'), JSON.stringify(evidenceLedger(facts).census, null, 2) + '\n')
    fs.writeFileSync(path.join(selectedOut, 'discovered-map.md'), discovered)
    fs.writeFileSync(path.join(selectedOut, 'confidence-report.md'), confidenceMd)
    fs.writeFileSync(path.join(selectedOut, 'risks.md'), risksMd)
    fs.mkdirSync(path.join(selectedOut, 'policies'), { recursive: true })
    fs.writeFileSync(path.join(selectedOut, 'policies', 'questions.md'), `# policy questions\n\n${questions.map((q) => `- ${q}`).join('\n')}\n`)
    fs.writeFileSync(path.join(selectedOut, 'evidence', 'facts.json'), JSON.stringify(facts, null, 2) + '\n')
    fs.writeFileSync(path.join(selectedOut, 'evidence', 'questions.md'), `# questions\n\n${questions.map((q) => `- ${q}`).join('\n')}\n`)
    fs.writeFileSync(path.join(selectedOut, 'SELECTED_CANDIDATE.md'), selectedCandidateMd)
    fs.writeFileSync(path.join(selectedOut, 'selected-candidate.json'), JSON.stringify(selectedCandidate, null, 2) + '\n')
  }
  sanitizeGeneratedMapOutput(out)

  return { out, facts, confidence, questions, source }
}

function mdList(items, empty = '- none detected') {
  return items.length ? items.map((x) => `- ${x}`).join('\n') : empty
}

function writeDiscoveryPackage(out, facts, confidence, questions, docs) {
  const discoveryDir = path.join(out, 'discovery')
  const evidenceDir = path.join(out, 'evidence')
  const qualityDir = path.join(out, 'quality')
  fs.mkdirSync(discoveryDir, { recursive: true })
  fs.mkdirSync(evidenceDir, { recursive: true })
  fs.mkdirSync(qualityDir, { recursive: true })

  const mapperOsAlignment = loadMapperOsAlignment()
  const sizeClassification = classifyMappedRepo(facts)
  const qualificationRecords = featureQualificationRecords(facts)
  const mode = facts.selectedCandidate ? 'discovery plus selected Buildprint extraction' : 'lean discovery'
  const selectedScope = facts.selectedCandidate ? `${facts.selectedCandidate.title}: ${facts.selectedCandidate.scope}` : null
  const requiredFiles = [
    'README.md',
    'manifest.json',
    'buildprint.yaml',
    'CURRENT_STATE.md',
    'MAPPER_OS_ALIGNMENT.md',
    'facts.json',
    'discovery/AGENT_EXECUTION_BRIEF.md',
    'discovery/SOURCE_READING_PLAN.md',
    'discovery/DISCOVERY_QUEUE.md',
    'discovery/SYSTEM_MAP.md',
    'discovery/BUILDPRINT_CANDIDATES.md',
    'discovery/FEATURE_INVENTORY.md',
    'discovery/PRODUCT_CAPABILITY_MAP.md',
    'discovery/CLAIM_REGISTER.md',
    'discovery/census.json',
    'evidence/EVIDENCE_LEDGER.json',
    'evidence/EVIDENCE_COVERAGE.md',
    'evidence/SOURCE_VALIDATION_QUEUE.md',
    'evidence/qualification-records.json',
    'review/PROMOTION_GATE.md'
  ]
  if (facts.selectedCandidate) requiredFiles.push('selected-buildprint/BUILDPRINT.md')

  const manifest = {
    schema: 'agent-buildprint/map-manifest.v1',
    mode,
    selectedScope,
    qualificationStatus: 'QUALIFICATION_REVIEW_REQUIRED',
    discoveryStatus: 'DISCOVERY_REVIEW_REQUIRED',
    source: facts.source,
    mapperOs: {
      slug: 'buildprint-mapper-os',
      source: 'buildprints/buildprint-mapper-os',
      checksum: mapperOsAlignment.checksum
    },
    sizeClassification,
    claimStates: CLAIM_STATES,
    requiredFiles,
    outputBoundary: {
      discoveryOnlyByDefault: true,
      implementationScaffold: facts.selectedCandidate ? 'selected-buildprint/' : 'not generated; pass --candidate, --scope, or --full-suite',
      forbiddenDefaultDirectories: ['implementation/', 'plans/', 'product/']
    },
    qualification: {
      command: 'agb map',
      status: 'QUALIFICATION_REVIEW_REQUIRED',
      gate: 'Source validation and runtime evidence are required before qualification.'
    }
  }
  const currentState = [
    '# CURRENT_STATE',
    '',
    `- Mode: ${mode}`,
    '- Qualification status: QUALIFICATION_REVIEW_REQUIRED',
    '- Discovery status: DISCOVERY_REVIEW_REQUIRED',
    `- Source input: ${facts.source?.input ?? facts.root}`,
    facts.source?.url ? `- Source URL: ${facts.source.url}` : null,
    `- Source checkout: ${facts.source?.localPath ?? facts.root}`,
    `- Source commit: ${facts.source?.commit ?? 'unavailable'}`,
    '',
    '## Read first',
    '',
    '- `discovery/AGENT_EXECUTION_BRIEF.md`',
    '- `discovery/SOURCE_READING_PLAN.md`',
    '- `discovery/DISCOVERY_QUEUE.md`',
    '- `discovery/CLAIM_REGISTER.md`',
    '- `evidence/EVIDENCE_LEDGER.json`',
    '- `review/PROMOTION_GATE.md`',
    facts.selectedCandidate ? '- `selected-buildprint/BUILDPRINT.md`' : '- No selected implementation Buildprint was generated.',
    '',
    '## Boundary',
    '',
    'This package is a discovery workspace. Implementation scaffold is generated only under `selected-buildprint/` when `--candidate` or `--scope` is passed.',
    ''
  ].filter((line) => line !== null).join('\n')
  const readme = [
    `# ${facts.packageName} mapped discovery`,
    '',
    'This package was generated by `agb map` as a Mapper OS discovery workspace.',
    '',
    '## Start here',
    '',
    '1. `CURRENT_STATE.md`',
    '2. `discovery/AGENT_EXECUTION_BRIEF.md`',
    '3. `discovery/SOURCE_READING_PLAN.md`',
    '4. `discovery/DISCOVERY_QUEUE.md`',
    '5. `discovery/CLAIM_REGISTER.md`',
    '6. `review/PROMOTION_GATE.md`',
    '',
    '## Output boundary',
    '',
    '- Default map output is discovery-only.',
    '- `implementation/`, `plans/`, and `product/` are not emitted by default.',
    '- Selected implementation scaffold appears only in `selected-buildprint/`.',
    '- Mapping never grants qualification by itself.',
    ''
  ].join('\n')
  const promotionGate = [
    '# PROMOTION_GATE',
    '',
    'Promotion status: QUALIFICATION_REVIEW_REQUIRED',
    '',
    '- Default `agb map` output is a discovery workspace only.',
    '- Scanner/census hints are not product facts.',
    '- Implementation scaffold requires explicit `--candidate` or `--scope` and is isolated under `selected-buildprint/`.',
    '- Final qualification requires source validation plus runtime evidence where required.',
    ''
  ].join('\n')

  fs.writeFileSync(path.join(out, 'README.md'), readme)
  fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
  fs.writeFileSync(path.join(out, 'buildprint.yaml'), docs.buildprintYaml)
  fs.writeFileSync(path.join(out, 'CURRENT_STATE.md'), currentState)
  fs.writeFileSync(path.join(out, 'MAPPER_OS_ALIGNMENT.md'), [
    '# MAPPER_OS_ALIGNMENT',
    '',
    'Mapper OS source: buildprints/buildprint-mapper-os',
    `Alignment checksum: ${mapperOsAlignment.checksum}`,
    '',
    '## Output boundary',
    '',
    '- `agb map` bootstraps discovery; it does not complete discovery or implementation.',
    '- Default output keeps discovery files under `discovery/` and evidence files under `evidence/`.',
    '- Implementation scaffold is generated only under `selected-buildprint/` when a candidate or scope is selected.',
    '- Scanner/census hints are never product facts.',
    ''
  ].join('\n'))
  fs.writeFileSync(path.join(out, 'facts.json'), JSON.stringify(facts, null, 2) + '\n')
  fs.writeFileSync(path.join(discoveryDir, 'AGENT_EXECUTION_BRIEF.md'), agentExecutionBriefMdForMap(facts).replace('`CLAIM_REGISTER.md`/`EVIDENCE_LEDGER.json`', '`CLAIM_REGISTER.md` and `evidence/EVIDENCE_LEDGER.json`'))
  fs.writeFileSync(path.join(discoveryDir, 'SOURCE_READING_PLAN.md'), sourceReadingPlanMd(facts))
  fs.writeFileSync(path.join(discoveryDir, 'DISCOVERY_QUEUE.md'), discoveryQueueMd(facts))
  fs.writeFileSync(path.join(discoveryDir, 'SYSTEM_MAP.md'), docs.systemMap)
  fs.writeFileSync(path.join(discoveryDir, 'BUILDPRINT_CANDIDATES.md'), docs.candidatesMd)
  fs.writeFileSync(path.join(discoveryDir, 'FEATURE_INVENTORY.md'), featureInventoryMd(facts))
  fs.writeFileSync(path.join(discoveryDir, 'PRODUCT_CAPABILITY_MAP.md'), productCapabilityMapMd(facts))
  fs.writeFileSync(path.join(discoveryDir, 'CLAIM_REGISTER.md'), claimRegisterMd(facts))
  fs.writeFileSync(path.join(discoveryDir, 'census.json'), JSON.stringify(evidenceLedger(facts).census, null, 2) + '\n')
  fs.writeFileSync(path.join(discoveryDir, 'discovered-map.md'), docs.discovered)
  fs.writeFileSync(path.join(discoveryDir, 'confidence-report.md'), docs.confidenceMd)
  fs.writeFileSync(path.join(discoveryDir, 'risks.md'), docs.risksMd)
  fs.writeFileSync(path.join(evidenceDir, 'EVIDENCE_LEDGER.json'), JSON.stringify(evidenceLedger(facts), null, 2) + '\n')
  fs.writeFileSync(path.join(evidenceDir, 'EVIDENCE_COVERAGE.md'), evidenceCoverageMd(facts))
  fs.writeFileSync(path.join(evidenceDir, 'SOURCE_VALIDATION_QUEUE.md'), sourceValidationQueueMd(facts))
  fs.writeFileSync(path.join(evidenceDir, 'qualification-records.json'), JSON.stringify({ summary: qualificationSummary(qualificationRecords), records: qualificationRecords }, null, 2) + '\n')
  fs.writeFileSync(path.join(qualityDir, 'PROMOTION_GATE.md'), promotionGate)
}

const CLAIM_STATES = [
  'CENSUS_HINT',
  'PENDING_AGENT_DISCOVERY',
  'OBSERVED',
  'INFERRED',
  'QUESTION',
  'BLOCKED',
  'OUT_OF_SCOPE'
]

function censusHintList(items, empty = '- PENDING_AGENT_DISCOVERY: no census hints; an agent must inspect source before making a claim') {
  return items?.length ? items.map((x) => `- CENSUS_HINT: ${x}`).join('\n') : empty
}

function pendingDiscoveryList(items, prefix, empty = '- PENDING_AGENT_DISCOVERY: source-reading required before this can become a product fact') {
  return items?.length ? items.map((x) => `- PENDING_AGENT_DISCOVERY: ${prefix}${x}`).join('\n') : empty
}

function discoveryQueueItems(facts) {
  const items = []
  const add = (id, title, hints, tasks, forbiddenClaims = []) => {
    items.push({ id, title, hints: unique(hints || []).slice(0, 40), tasks, forbiddenClaims })
  }
  add(
    'entrypoints-runtime',
    'Entrypoints and runtime topology',
    [...facts.subprojects.map((x) => `${x.path} (${x.kind}, ${x.name})`), ...facts.scripts.map((x) => `script ${x}`), ...facts.deploy],
    [
      'Read manifests and runtime entrypoints that start the app/service.',
      'Promote only the entrypoints whose behavior was read in source.',
      'Record whether each runtime is app, API, worker, CLI, deploy-only, fixture, or docs-only.'
    ],
    ['Do not claim a runtime boundary from package names alone.']
  )
  add(
    'frontend-workbench-routes',
    'Frontend workbench, pages, and navigation',
    facts.routes,
    [
      'Read router/page/component entrypoints and navigation state.',
      'Trace user actions to API calls, local state, uploads, streaming, or reports.',
      'Capture empty/loading/error/permission states only when source evidence exists.'
    ],
    ['Do not write "no UI routes detected"; absence of a census hint is not evidence of absence.']
  )
  add(
    'backend-api-workflows',
    'Backend APIs, workflows, jobs, and orchestration',
    facts.apis,
    [
      'Read server handlers, controllers, workers, and orchestration modules.',
      'Trace request schemas, response shapes, validation, side effects, retries, and errors.',
      'Separate public contracts from internal implementation details.'
    ],
    ['Do not promote route-shaped files into API parity claims without handler review.']
  )
  add(
    'state-persistence-artifacts',
    'State, persistence, uploads, and generated artifacts',
    facts.db,
    [
      'Read schema/model/store/upload/artifact files.',
      'Identify source of truth, ownership, lifecycle, restart behavior, import/export, and retention.',
      'Record which paths are durable product state vs cache/temp/test artifacts.'
    ],
    ['Do not claim persistence durability from filenames or dependency names.']
  )
  add(
    'providers-security-env',
    'Providers, integrations, security, and env names',
    [...facts.integrations, ...facts.envNames.map((x) => `env ${x}`), ...facts.risky],
    [
      'Read provider adapters, env loading, auth/session, network, and security-sensitive boundaries.',
      'Record env names only; never copy values.',
      'Identify fakes/mocks/fixtures as test-only unless product code proves otherwise.'
    ],
    ['Do not claim a provider is implemented, absent, or production-ready from dependency hints alone.']
  )
  add(
    'tests-acceptance-runtime-proof',
    'Tests, acceptance, and runtime proof',
    facts.tests,
    [
      'Read tests to determine what behavior is actually asserted.',
      'Map existing assertions to feature claims and missing proof.',
      'Record commands that must run before qualification.'
    ],
    ['Do not treat test file presence as passing evidence.']
  )
  return items
}

function sourceReadingPlanMd(facts) {
  return [
    '# SOURCE_READING_PLAN',
    '',
    '`agb map` created a safe census only. An agent must read source before promoting product claims.',
    '',
    '## Claim lifecycle',
    '',
    ...CLAIM_STATES.map((x) => `- ${x}`),
    '',
    '## Read order',
    '',
    ...discoveryQueueItems(facts).map((item, i) => [
      `### ${i + 1}. ${item.title}`,
      '',
      '- Census hints:',
      item.hints.length ? item.hints.map((x) => `  - ${x}`).join('\n') : '  - PENDING_AGENT_DISCOVERY: no automated hints',
      '- Agent tasks:',
      ...item.tasks.map((x) => `  - ${x}`),
      '- Forbidden until evidence exists:',
      ...(item.forbiddenClaims.length ? item.forbiddenClaims.map((x) => `  - ${x}`) : ['  - No final parity, route/API, provider, persistence, or runtime claims.']),
      ''
    ].join('\n')),
    '## Promotion rule',
    '',
    '- A claim may become `OBSERVED(path:line)` only after the agent reads the cited source.',
    '- Census hints can guide reading, but they are not product facts.',
    ''
  ].join('\n')
}

function discoveryQueueMd(facts) {
  return [
    '# DISCOVERY_QUEUE',
    '',
    'Use this queue to turn census hints into source-reviewed Buildprint claims.',
    '',
    ...discoveryQueueItems(facts).map((item) => [
      `## ${item.id}`,
      '',
      `- Status: PENDING_AGENT_DISCOVERY`,
      '- Hints:',
      item.hints.length ? item.hints.map((x) => `  - CENSUS_HINT: ${x}`).join('\n') : '  - PENDING_AGENT_DISCOVERY: no census hints',
      '- Required source-reading tasks:',
      ...item.tasks.map((x) => `  - ${x}`),
      '- Claims still forbidden:',
      ...(item.forbiddenClaims.length ? item.forbiddenClaims.map((x) => `  - ${x}`) : ['  - Qualified behavior or parity claims.']),
      ''
    ].join('\n')),
    ''
  ].join('\n')
}

function claimRegisterMd(facts) {
  const rows = [
    ['project-name', 'CENSUS_HINT', facts.packageName, 'facts.json'],
    ['package-manager', 'CENSUS_HINT', facts.packageManager, 'facts.json'],
    ['framework-hints', 'CENSUS_HINT', facts.frameworks.join(', ') || 'pending agent discovery', 'facts.json'],
    ['integration-hints', 'CENSUS_HINT', facts.integrations.join(', ') || 'pending agent discovery', 'facts.json'],
    ['env-name-hints', 'CENSUS_HINT', facts.envNames.join(', ') || 'pending agent discovery', 'facts.json'],
    ['product-architecture', 'PENDING_AGENT_DISCOVERY', 'agent must read source before writing architecture facts', 'SOURCE_READING_PLAN.md'],
    ['feature-candidates', 'PENDING_AGENT_DISCOVERY', 'agent must promote/reject candidates with source evidence', 'DISCOVERY_QUEUE.md'],
    ['runtime-qualification', 'BLOCKED', 'requires source review plus runtime evidence', 'review/PROMOTION_GATE.md']
  ]
  return [
    '# CLAIM_REGISTER',
    '',
    'Scanner output is not authoritative. Claims start as census hints or pending discovery until promoted with source evidence.',
    '',
    '| Claim | State | Value | Evidence |',
    '|---|---|---|---|',
    ...rows.map(([claim, state, value, evidence]) => `| ${claim} | ${state} | ${String(value).replace(/\|/g, '/')} | ${evidence} |`),
    '',
    '## Promotion requirements',
    '',
    '- `OBSERVED` claims require source path and line/section citation.',
    '- `INFERRED` claims must name the observed inputs and the uncertainty.',
    '- Negative claims require direct source evidence, never absence of a scanner hint.',
    ''
  ].join('\n')
}

function evidenceLedger(facts) {
  return {
    schema: 'agent-buildprint/evidence-ledger.v1',
    generatedBy: 'agb map',
    status: 'DISCOVERY_REVIEW_REQUIRED',
    rule: 'Census hints are reading guidance, not product facts.',
    claimStates: CLAIM_STATES,
    census: {
      root: facts.root,
      source: facts.source ?? null,
      packageName: facts.packageName,
      totalFilesScanned: facts.totalFilesScanned,
      packageManager: facts.packageManager,
      frameworks: facts.frameworks,
      scripts: facts.scripts,
      subprojects: facts.subprojects,
      routes: facts.routes,
      apis: facts.apis,
      dataFiles: facts.db,
      tests: facts.tests,
      deploy: facts.deploy,
      integrations: facts.integrations,
      envNamesOnly: facts.envNames,
      riskHints: facts.risky
    },
    discoveryQueue: discoveryQueueItems(facts).map((item) => ({
      id: item.id,
      title: item.title,
      status: 'PENDING_AGENT_DISCOVERY',
      hintCount: item.hints.length,
      tasks: item.tasks,
      forbiddenClaims: item.forbiddenClaims
    }))
  }
}

function agentExecutionBriefMdForMap(facts) {
  return [
    '# AGENT_EXECUTION_BRIEF',
    '',
    'This package is a guided discovery workbench. Do not implement from it as if it were qualified.',
    '',
    '## First action',
    '',
    'Read `SOURCE_READING_PLAN.md`, then work through `DISCOVERY_QUEUE.md` and update `CLAIM_REGISTER.md`/`EVIDENCE_LEDGER.json` as claims are promoted.',
    '',
    '## Hard rules',
    '',
    '- Census hints are not product facts.',
    '- Do not use absence of a scanner hint as evidence that a feature, route, provider, or state path is absent.',
    '- Promote claims only after source reading with path and line/section evidence.',
    '- Keep `QUALIFICATION_REVIEW_REQUIRED` until source/runtime proof exists.',
    '- Env names are allowed; secret values are never allowed.',
    '',
    '## Current package',
    '',
    `- Source input: ${facts.source?.input ?? facts.root}`,
    facts.source?.url ? `- Source URL: ${facts.source.url}` : null,
    `- Source checkout: ${facts.source?.localPath ?? facts.root}`,
    `- Source commit: ${facts.source?.commit ?? 'unavailable'}`,
    `- Source root: ${facts.root}`,
    `- Files scanned for census: ${facts.totalFilesScanned}`,
    `- Discovery status: DISCOVERY_REVIEW_REQUIRED`,
    ''
  ].filter((line) => line !== null).join('\n')
}

function sanitizeGeneratedMapOutput(out) {
  const replacements = [
    ['none detected', 'pending agent discovery'],
    ['no UI routes detected', 'UI routes not agent-discovered yet'],
    ['no API routes detected', 'API routes not agent-discovered yet'],
    ['no data model files detected', 'data model not agent-discovered yet'],
    ['No strong candidates detected', 'No candidate has been agent-promoted yet'],
    ['OBSERVED route:', 'CENSUS_HINT route-like path:'],
    ['OBSERVED API:', 'CENSUS_HINT API-like path:'],
    ['OBSERVED data/model file:', 'CENSUS_HINT data/model path:'],
    ['INFERRED integration:', 'CENSUS_HINT integration:'],
    ['OBSERVED ', 'CENSUS_HINT '],
    ['â€”', '-'],
    ['â€¦', '...'],
    ['âœ“', '[ok]'],
    ['âœ—', '[fail]']
  ]
  for (const rel of fs.readdirSync(out, { recursive: true })) {
    const file = path.join(out, rel)
    if (!fs.statSync(file).isFile()) continue
    if (!/\.(md|json|yaml|yml|xml|txt)$/.test(file)) continue
    let text = fs.readFileSync(file, 'utf8')
    for (const [from, to] of replacements) text = text.split(from).join(to)
    fs.writeFileSync(file, text)
  }
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
    'Read AGENT_EXECUTION_BRIEF.md, BUILDPRINT.md, FEATURE_INVENTORY.md, PRODUCT_CAPABILITY_MAP.md, IMPLEMENTATION_DECOMPOSITION.md, PHASE_PLAN.md, LOOP_GATES.md, PARITY_ACCEPTANCE.md, SYSTEM_MAP.md, BUILDPRINT_CANDIDATES.md, SPEC.md, CONTRACTS.md, PROOF_PLAN.md, TRACEABILITY_MATRIX.md, questions.md, and the mapped source files that matter for the selected scope.',
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
      source: facts.source ?? null,
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
      featureInventory: featureInventory(facts),
      evidenceCoverage: featureEvidenceCoverage(facts),
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
    'This file is legacy map-review scaffolding retained only for removed map command history.',
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


function featureInventory(facts) {
  const features = []
  const add = (title, kind, evidence = [], requiredBehavior = [], acceptance = [], risks = []) => {
    const ev = unique(evidence).slice(0, 30)
    if (!ev.length && kind !== 'system') return
    features.push({ title, kind, evidence: ev, requiredBehavior, acceptance, risks: unique(risks) })
  }
  const routeName = (file) => file
    .replace(/^.*?src\/pages\//, '')
    .replace(/^.*?pages\//, '')
    .replace(/^.*?src\/app\//, '')
    .replace(/^.*?app\//, '')
    .replace(/\/page\.(tsx|ts|jsx|js)$/, '')
    .replace(/\.(astro|tsx|ts|jsx|js|mdx)$/, '')
    .replace(/index$/, 'home')
  const routeGroups = new Map()
  for (const route of facts.routes) {
    const raw = routeName(route)
    const key = raw.split('/')[0] || 'home'
    if (!routeGroups.has(key)) routeGroups.set(key, [])
    routeGroups.get(key).push(route)
  }
  for (const [key, files] of routeGroups) add(
    `${titleize(key)} surface`,
    'user-facing',
    files,
    ['Recreate the user-visible route/screen behavior, navigation entry points, loading/error/empty states, and permission boundaries.'],
    ['Route or equivalent UI surface is reachable.', 'Primary happy path and denial/error states are validated.'],
    /admin/i.test(key) ? ['admin surfaces'] : []
  )
  const apiGroups = new Map()
  for (const api of facts.apis) {
    const key = api.replace(/^.*?api\//, '').replace(/\/route\.(ts|js)$/, '').split('/')[0] || 'api'
    if (!apiGroups.has(key)) apiGroups.set(key, [])
    apiGroups.get(key).push(api)
  }
  for (const [key, files] of apiGroups) add(
    `${titleize(key)} API/workflow`,
    'system',
    files,
    ['Recreate request/response behavior, validation, auth, side effects, idempotency/retry expectations, and observable failures.'],
    ['Contract tests cover accepted/rejected requests.', 'Side effects are real or explicitly out of scope.'],
    /admin/i.test(key) ? ['admin surfaces'] : []
  )
  for (const candidate of facts.candidateBuildprints) add(
    candidate.title.replace(/ Buildprint$/, ''),
    'capability',
    candidate.includedPaths,
    [`Preserve the product capability: ${candidate.scope}`],
    candidateValidationStrategy(candidate, facts),
    candidate.risks
  )
  if (facts.db.length) add('Data persistence and lifecycle', 'system', facts.db, ['Recreate durable data model, migrations/import/export expectations, retention, backup/recovery, and restart behavior.'], ['Write/read/restart proof exists.', 'Migration or schema contract is documented.'], ['data lifecycle'])
  if (facts.tests.length) add('Existing acceptance/test suite behavior', 'validation', facts.tests.slice(0, 30), ['Use existing tests/e2e specs as behavior evidence, not implementation constraints.'], ['Mapped acceptance tests cover product-critical flows.'], [])
  if (facts.deploy.length) add('Deployment and operational workflow', 'system', facts.deploy, ['Recreate build, release, update, observability, and rollback expectations when product-relevant.'], ['Build/release path is documented and smoke-tested or blocked.'], ['ops/release'])
  return features
}

function titleize(value) {
  return String(value || 'feature').replace(/[-_]+/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())
}


function evidenceTypeForPath(file) {
  if (/(__tests__|tests?|specs?|e2e|\.test\.|\.spec\.)/i.test(file)) return 'test/e2e evidence'
  if (/(README|docs\/|\.md$|gitbooks\/)/i.test(file)) return 'docs/readme evidence'
  if (/(page|route)\.(tsx|ts|jsx|js)$|src\/pages\/|pages\/|components?\//i.test(file)) return 'ui/route/component evidence'
  if (/(api\/|rpc|controller|handler|server|route\.(ts|js)$)/i.test(file)) return 'api/rpc evidence'
  if (/(schema|model|migration|prisma|database|store|state|entity|repository)/i.test(file)) return 'data/state evidence'
  if (/(config|nav|menu|sidebar|routes|manifest|tauri\.conf|package\.json)/i.test(file)) return 'config/navigation evidence'
  if (/(worker|job|cron|queue|agent|tool|integration|provider|webhook)/i.test(file)) return 'background/integration evidence'
  return 'source evidence'
}

function featureEvidenceCoverage(facts) {
  return featureInventory(facts).map((feature) => {
    const evidenceTypes = unique(feature.evidence.map(evidenceTypeForPath))
    const strongEnoughForDiscovery = feature.evidence.length > 0
    const enoughForQualification = evidenceTypes.length >= 2
    const missingEvidence = []
    if (!evidenceTypes.some((x) => /ui|api|background|integration/.test(x))) missingEvidence.push('entrypoint/trigger evidence')
    if (!evidenceTypes.some((x) => /data|state|test|docs/.test(x))) missingEvidence.push('behavior/state/acceptance evidence')
    if (!evidenceTypes.some((x) => /test|docs/.test(x))) missingEvidence.push('independent acceptance evidence')
    return {
      feature: feature.title,
      kind: feature.kind,
      evidenceCount: feature.evidence.length,
      evidenceTypes,
      strongEnoughForDiscovery,
      enoughForQualification,
      missingEvidence,
      qualificationStatus: enoughForQualification ? 'candidate_for_review' : 'unqualified_hypothesis'
    }
  })
}

function featureHypothesesMd(facts) {
  const features = featureInventory(facts)
  const coverage = new Map(featureEvidenceCoverage(facts).map((x) => [x.feature, x]))
  return [
    '# FEATURE_HYPOTHESES',
    '',
    'These are discovery hypotheses, not qualified Buildprint requirements. A feature becomes qualified only after source validation confirms behavior, state, permissions, side effects, and acceptance evidence.',
    '',
    ...features.map((f, i) => {
      const c = coverage.get(f.title)
      return [
        `## ${i + 1}. ${f.title}`,
        '',
        `- Hypothesis status: ${c?.qualificationStatus ?? 'unqualified_hypothesis'}`,
        `- Evidence types: ${c?.evidenceTypes?.join(', ') || 'none'}`,
        `- Missing evidence: ${c?.missingEvidence?.join(', ') || 'none detected'}`,
        '- Must validate:',
        '  - user/system trigger',
        '  - state changes and persistence expectations',
        '  - permissions/privacy constraints',
        '  - external side effects and reversal behavior',
        '  - acceptance checks or runtime proof',
        ''
      ].join('\n')
    }).join('\n')
  ].join('\n')
}

function evidenceCoverageMd(facts) {
  const rows = featureEvidenceCoverage(facts)
  return [
    '# EVIDENCE_COVERAGE',
    '',
    'Discovery quality gate: every feature hypothesis needs evidence before it can become a qualified implementation requirement. Static mapping alone does not qualify behavior.',
    '',
    '## Coverage table',
    '',
    ...rows.map((r) => [
      `### ${r.feature}`,
      '',
      `- Status: ${r.qualificationStatus}`,
      `- Evidence count: ${r.evidenceCount}`,
      `- Evidence types: ${r.evidenceTypes.join(', ') || 'none'}`,
      `- Missing evidence: ${r.missingEvidence.join(', ') || 'none detected'}`,
      `- Discovery usable: ${r.strongEnoughForDiscovery ? 'yes' : 'no'}`,
      `- Qualified-plan usable: ${r.enoughForQualification ? 'only after source review' : 'no'}`,
      ''
    ].join('\n')).join('\n'),
    '## Gate rule',
    '',
    '- If any selected feature is `unqualified_hypothesis`, the mapper must not call the output a qualified implementation plan.',
    '- Qualification requires source-file review and/or runtime evidence beyond scanner detection.',
    ''
  ].join('\n')
}

function sourceValidationQueueMd(facts) {
  const rows = featureEvidenceCoverage(facts)
  return [
    '# SOURCE_VALIDATION_QUEUE',
    '',
    'Use this queue before upgrading an unqualified map into a qualified Buildprint.',
    '',
    ...rows.filter((r) => !r.enoughForQualification).map((r, i) => [
      `## ${i + 1}. ${r.feature}`,
      '',
      `- Current status: ${r.qualificationStatus}`,
      `- Missing: ${r.missingEvidence.join(', ') || 'source validation'}`,
      '- Validation tasks:',
      '  1. Read the referenced source files, not only `facts.json`.',
      '  2. Identify trigger, behavior, state, permissions, side effects, and errors.',
      '  3. Find or create acceptance evidence: tests, e2e flow, runtime proof, or explicit blocker.',
      '  4. Mark product behavior vs replaceable implementation detail.',
      ''
    ].join('\n')).join('\n') || '- No weak hypotheses detected by the static coverage heuristic; still perform source review before qualification.',
    ''
  ].join('\n')
}

function featureInventoryMd(facts) {
  const features = featureInventory(facts)
  return [
    '# FEATURE_INVENTORY', '',
    'This is the product-scope inventory. Files are evidence; features are the rebuild contract. Reimplementation may use different tech if it preserves required behavior and acceptance.', '',
    '## Inventory rules', '',
    '- Start from full-repo evidence before selecting implementation scopes.',
    '- Preserve user-visible behavior, system side effects, data semantics, permission boundaries, and integration contracts.',
    '- Mark implementation details as replaceable unless they are part of product behavior or compatibility.',
    '- Do not claim full parity from this file alone; each feature needs source-file confirmation and validation evidence.', '',
    '## Features', '',
    features.length ? features.map((f, i) => [
      `### ${i + 1}. ${f.title}`, '', `- Kind: ${f.kind}`, '- Evidence:',
      f.evidence.length ? f.evidence.map((x) => `  - ${x}`).join('\n') : '  - QUESTION: evidence needs source review',
      '- Required behavior:', f.requiredBehavior.length ? f.requiredBehavior.map((x) => `  - ${x}`).join('\n') : '  - QUESTION: behavior needs source review',
      '- Acceptance signals:', f.acceptance.length ? f.acceptance.map((x) => `  - ${x}`).join('\n') : '  - focused behavior validation required',
      '- Risks:', f.risks.length ? f.risks.map((x) => `  - ${x}`).join('\n') : '  - none detected', ''
    ].join('\n')).join('\n') : '- QUESTION: no product features inferred; inspect docs/routes/tests manually.', ''
  ].join('\n')
}

function productCapabilityMapMd(facts) {
  const features = featureInventory(facts)
  const buckets = [['User-facing surfaces', features.filter((f) => f.kind === 'user-facing')], ['Product capabilities', features.filter((f) => f.kind === 'capability')], ['System/background capabilities', features.filter((f) => f.kind === 'system')], ['Validation/acceptance evidence', features.filter((f) => f.kind === 'validation')]]
  return ['# PRODUCT_CAPABILITY_MAP', '', 'This map groups product features into rebuild domains. It is capability-first: folder paths are evidence, not scope definitions.', '', ...buckets.flatMap(([title, items]) => [`## ${title}`, '', items.length ? items.map((f) => `- ${f.title} — evidence: ${f.evidence.slice(0, 5).map((x) => `\`${x}\``).join(', ')}${f.evidence.length > 5 ? ', …' : ''}`).join('\n') : '- none detected', '']), '## Reimplementation freedom', '', '- Frameworks, libraries, directory layout, and storage engines may change if behavior, contracts, privacy, durability, and acceptance still pass.', '- Keep compatibility only where users, external integrations, data import/export, or release/update channels depend on it.', ''].join('\n')
}

function implementationDecompositionMd(facts) {
  const features = featureInventory(facts)
  const phaseSeeds = [['00-product-contract', 'Freeze feature inventory, acceptance language, non-goals, and parity tiers.', features.slice(0, 8).map((f) => f.title)], ['01-foundation-shell', 'Create app/runtime shell, navigation, config, auth/session placeholders only where backed by product need.', features.filter((f) => /surface|auth|session|account|setting/i.test(f.title)).map((f) => f.title)], ['02-core-data-and-state', 'Implement durable data/state model, migrations, lifecycle, restart behavior, and import/export boundaries.', features.filter((f) => /data|memory|persistence|state|database/i.test(f.title)).map((f) => f.title)], ['03-primary-product-flows', 'Implement primary user-facing workflows end-to-end with real persistence and errors.', features.filter((f) => f.kind === 'user-facing').map((f) => f.title)], ['04-integrations-and-agents', 'Implement AI/tool/provider/integration flows with contract tests, retries, grounding, and external-write approval semantics.', features.filter((f) => /AI|Agent|Workflow|API|Integration|Composio|webhook/i.test(f.title)).map((f) => f.title)], ['05-native-and-operational-surfaces', 'Implement desktop/native/update/deploy/observability capabilities where product-relevant.', features.filter((f) => /desktop|native|tauri|deploy|operational|update/i.test(f.title)).map((f) => f.title)], ['06-full-parity-qa', 'Run feature parity, no-fake scan, security/privacy review, and final handover evidence.', features.map((f) => f.title).slice(0, 20)]]
  return ['# IMPLEMENTATION_DECOMPOSITION', '', 'This is the bridge from full feature scope to a clean rebuild plan. It decomposes by product capability, not by folder.', '', '## Phased rebuild plan', '', phaseSeeds.map(([id, goal, featureNames], i) => [`### Phase ${i}: ${id}`, '', `- Goal: ${goal}`, '- Features touched:', featureNames.length ? unique(featureNames).slice(0, 12).map((x) => `  - ${x}`).join('\n') : '  - QUESTION: confirm feature ownership for this phase', '- Loop:', '  1. Implement the smallest complete behavior slice.', '  2. Run objective checks and compare to `FEATURE_INVENTORY.md`.', '  3. Fix gaps without widening scope.', '  4. Repeat until pass or explicit blocker.', '- Exit criteria:', '  - Behavior works with real data/state where claimed.', '  - Tests or runtime proof are captured.', '  - No fake/mocked completion is hidden.', ''].join('\n')).join('\n'), ''].join('\n')
}

function loopGatesMd(facts) {
  const gates = [['feature-contract-loop', 'For each feature in FEATURE_INVENTORY.md, implement/check/fix until required behavior has proof or a blocker is written.'], ['data-durability-loop', 'For every persisted claim, prove write/read/restart or mark persistence out of scope.'], ['integration-contract-loop', 'For every external/AI/tool/API integration, prove request/response/error/retry behavior with safe tests or mark blocked.'], ['no-fake-loop', 'Scan for placeholders, no-ops, mock-only paths, route shells, in-memory persistence, and unbacked TODO claims before handover.']]
  return ['# LOOP_GATES', '', 'Loop gates are mandatory repeat-until-safe checks. Each loop stops only at `pass_or_blocker`.', '', gates.map(([id, check]) => [`## ${id}`, '', '- Repeat until: pass_or_blocker', `- Check: ${check}`, '- Smallest fix rule: fix only the failing feature/contract; do not widen product scope inside the loop.', '- Evidence required: command output, test result, screenshot/runtime proof, or explicit blocker with source-file citation.', '- Claims allowed after pass: the checked behavior for the checked feature only.', '- Claims still forbidden: full product parity, production readiness, or unrelated feature completion.', ''].join('\n')).join('\n'), ''].join('\n')
}



function architectureSystemModelMd(facts) {
  return ['# SYSTEM_MODEL', '', 'System model inferred from repository evidence. Validate runtime boundaries before qualification.', '', '## Subprojects', '', facts.subprojects.length ? facts.subprojects.map((x) => `- ${x.path} (${x.kind}, ${x.name})`).join('\n') : '- none detected', '', '## Routes / UI surfaces', '', facts.routes.length ? facts.routes.slice(0, 80).map((x) => `- ${x}`).join('\n') : '- none detected', '', '## APIs / RPC / endpoints', '', facts.apis.length ? facts.apis.slice(0, 80).map((x) => `- ${x}`).join('\n') : '- none detected', '', '## Data files', '', facts.db.length ? facts.db.slice(0, 80).map((x) => `- ${x}`).join('\n') : '- none detected', ''].join('\n')
}

function moduleInventory(facts) {
  const features = featureInventory(facts)
  const defs = [
    ['identity-access', 'Identity & Access', /auth|session|account|invite|permission|admin|user/i],
    ['agent-workflows', 'Agent, Workflow and Provider Runtime', /AI|Agent|chat|LLM|prompt|tool|workflow|stream/i],
    ['memory-data', 'Memory, Data & State', /memory|data|state|database|persistence|model|schema/i],
    ['integrations', 'Integrations & External Effects', /integration|webhook|provider|composio|calendar|email|notification|stripe|billing|payment/i],
    ['desktop-shell', 'App Shell & Native Runtime', /desktop|tauri|native|shell|surface|route|page|window|settings/i],
    ['ops-quality', 'Operations, Release & Quality', /deploy|operational|test|acceptance|observability|update|release/i]
  ]
  const modules = defs.map(([id, title, re]) => ({
    id, title,
    features: features.filter((f) => re.test(f.title + ' ' + f.requiredBehavior.join(' ') + ' ' + f.evidence.join(' ')))
  })).filter((m) => m.features.length)
  const assigned = new Set(modules.flatMap((m) => m.features.map((f) => f.title)))
  const unassigned = features.filter((f) => !assigned.has(f.title))
  if (unassigned.length) modules.push({ id: 'pending-discovery', title: 'Pending Discovery Capabilities', features: unassigned })
  return modules
}

function slugify(value) {
  return String(value || 'item').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'item'
}

function moduleAbstractionMd(facts) {
  const modules = moduleInventory(facts)
  return ['# MODULE_ABSTRACTION', '', 'Modules are product/domain abstractions compiled from feature evidence. They are not folders. They define rebuild boundaries and coupling rules.', '', ...modules.map((m) => [`## ${m.title}`, '', `- Module id: ${m.id}`, '- Responsibilities:', ...m.features.slice(0, 10).map((f) => `  - ${f.title}`), '- Owned state:', '  - QUESTION: confirm during source validation unless data/model evidence exists.', '- Inputs/outputs:', '  - Inputs: user actions, API/RPC calls, events, provider callbacks relevant to listed features.', '  - Outputs: UI state, persisted state, side effects, emitted events, or external writes relevant to listed features.', '- Forbidden coupling:', '  - Do not reach across modules except through explicit contracts/events/RPC boundaries.', '  - Do not make implementation folders the module boundary unless product behavior proves it.', ''].join('\n')).join('\n')].join('\n')
}

function moduleContractsMd(facts) {
  return ['# MODULE_CONTRACTS', '', 'Contracts are qualification targets. Every module must define inputs, outputs, state, side effects, permissions, failures, and acceptance evidence before the package can become qualified.', '', ...moduleInventory(facts).map((m) => [`## ${m.title}`, '', '- Inputs: QUESTION — validate source triggers and inbound calls.', '- Outputs: QUESTION — validate returned data, UI updates, emitted events, and side effects.', '- Owned state: QUESTION — validate durable state and lifecycle.', '- Permissions/privacy: QUESTION — validate authorization, consent, data exposure, and destructive/reversal rules.', '- Failure modes: QUESTION — validate empty/error/retry/offline behavior.', '- Acceptance evidence:', ...m.features.slice(0, 8).map((f) => `  - ${f.title}: ${f.acceptance[0] || 'behavior proof required'}`), ''].join('\n')).join('\n')].join('\n')
}

function dependencyGraphMd(facts) {
  const modules = moduleInventory(facts)
  return ['# DEPENDENCY_GRAPH', '', 'This is an inferred dependency graph. Treat every edge as a hypothesis until source validation confirms calls/events/state ownership.', '', '## Suggested build order', '', ...modules.map((m, i) => `${i + 1}. ${m.title}`).join('\n').split('\n'), '', '## Dependency rules', '', '- Foundation modules may expose contracts to product modules.', '- Product modules must not depend on UI folder layout.', '- Integrations must be isolated behind provider/tool contracts.', '- Persistence must be accessed through module-owned state boundaries.', '- Cross-module shortcuts require an ADR or explicit contract.', ''].join('\n')
}

function reimplementationBoundariesMd(facts) {
  return ['# REIMPLEMENTATION_BOUNDARIES', '', 'The goal is behavior-preserving reimplementation, not file-preserving cloning.', '', '## Must preserve', '', '- User-visible feature behavior validated from source evidence.', '- Data semantics, durability, import/export, retention, and restart behavior where claimed.', '- API/RPC/integration contracts that users or external systems depend on.', '- Security, privacy, authorization, consent, and destructive/reversal semantics.', '- Error, empty, loading, offline, retry, and failure states where product-relevant.', '', '## Replaceable', '', '- Frameworks, package layout, component internals, CSS/theming implementation, DB engine, queue engine, provider SDK, and directory names when product contracts still pass.', '', '## Requires explicit decision', '', '- Dropping features.', '- Changing external API formats.', '- Changing data portability or storage guarantees.', '- Weakening privacy/security behavior.', '- Replacing provider behavior that users observe.', ''].join('\n')
}

function verticalSliceMd(feature) {
  return ['# ' + feature.title, '', `Kind: ${feature.kind}`, '', '## Evidence', '', feature.evidence.length ? feature.evidence.map((x) => `- ${x}`).join('\n') : '- QUESTION: source evidence required', '', '## Behavior contract to validate', '', ...feature.requiredBehavior.map((x) => `- ${x}`), '', '## Implementation slice', '', '- Build the smallest end-to-end path that proves this feature works with real state/side effects where claimed.', '- Keep dependencies behind module contracts.', '- Do not widen scope to adjacent features unless a dependency is explicit.', '', '## Acceptance', '', ...(feature.acceptance.length ? feature.acceptance : ['behavior proof required']).map((x) => `- ${x}`), '', '## Loop gate', '', '- Repeat until: pass_or_blocker', '- Evidence required: test/runtime proof or blocker with source citation.', ''].join('\n')
}

function phaseDefinitionMd(id, title, goal, features) {
  return ['# ' + title, '', `Phase id: ${id}`, '', '## Goal', '', goal, '', '## Features/modules touched', '', features.length ? features.slice(0, 12).map((x) => `- ${x}`).join('\n') : '- QUESTION: confirm ownership during qualification', '', '## Tasks', '', '- Confirm feature contracts and exclusions.', '- Implement smallest complete behavior slice.', '- Add or update tests/proofs.', '- Run no-fake and claim-boundary checks.', '', '## Loop', '', '1. Implement smallest safe change.', '2. Run objective checks.', '3. Compare result to feature/module contract.', '4. Fix only the failing contract.', '5. Repeat until pass_or_blocker.', '', '## Exit criteria', '', '- Required behavior has evidence.', '- Blockers are explicit with missing input/evidence.', '- No unrelated parity claims are made.', ''].join('\n')
}

function implementationPhases(facts) {
  const features = featureInventory(facts)
  return [
    ['00-product-contract', 'Product Contract', 'Freeze validated feature scope, parity tier, non-goals, and source-validation blockers.', features.slice(0, 10).map((f) => f.title)],
    ['01-architecture-foundation', 'Architecture Foundation', 'Define modules, contracts, dependency direction, data ownership, and replaceability boundaries.', moduleInventory(facts).map((m) => m.title)],
    ['02-core-state-and-data', 'Core State and Data', 'Implement durable state/data semantics required by validated features.', features.filter((f) => /data|state|memory|persistence|model/i.test(f.title)).map((f) => f.title)],
    ['03-primary-user-flows', 'Primary User Flows', 'Implement validated user-facing workflows end-to-end.', features.filter((f) => f.kind === 'user-facing').map((f) => f.title)],
    ['04-integrations-and-effects', 'Integrations and Effects', 'Implement external, AI/tool, provider, webhook, and side-effect contracts.', features.filter((f) => /AI|Agent|Workflow|API|Integration|webhook|provider|billing|stripe/i.test(f.title)).map((f) => f.title)],
    ['05-ops-security-quality', 'Ops, Security and Quality', 'Implement release/update, observability, security/privacy, no-fake, and parity QA gates.', features.map((f) => f.title).slice(0, 12)],
    ['06-final-parity-handover', 'Final Parity Handover', 'Prove accepted parity tier, document blockers, and prepare final agent handover.', features.map((f) => f.title).slice(0, 20)]
  ]
}

function modularImplementationIndexMd(facts) {
  return ['# Implementation', '', 'This folder is modular. `PHASE_PLAN.md` is an index only; phase details, vertical slices, loops, and task checklists live in subfolders.', '', '## Read order', '', '1. `PHASE_PLAN.md`', '2. `phases/*.md`', '3. `capabilities/*.md` for selected feature work', '4. `loops/*.md` during implementation/validation', '5. `tasks/*.md` for concrete execution', ''].join('\n')
}

function parityAcceptanceMd(facts) {
  const features = featureInventory(facts)
  return ['# PARITY_ACCEPTANCE', '', 'Parity means product behavior is preserved, not that the old files or tech stack are copied.', '', '## Parity tiers', '', '- MVP parity: core happy paths work with real state and clear exclusions.', '- Functional parity: all listed feature contracts pass acceptance checks.', '- Operational parity: security, privacy, observability, release/update, recovery, and handover evidence are complete.', '', '## Feature acceptance checklist', '', features.length ? features.map((f) => `- [ ] ${f.title}: ${f.acceptance[0] || 'behavior proof captured'}`).join('\n') : '- [ ] Feature inventory confirmed manually.', '', '## Universal acceptance', '', '- [ ] No secret values copied into the Buildprint or implementation.', '- [ ] No fake implementations hidden behind UI/API shells.', '- [ ] User-visible errors, empty states, and denied states are handled.', '- [ ] Data durability claims have restart proof.', '- [ ] External writes require explicit policy/approval semantics.', '- [ ] Final handover lists evidence, blockers, and remaining non-goals.', ''].join('\n')
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
    ...classification.evidence.map((x) => `  - CENSUS_HINT: ${x}`),
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
  const outputMode = facts.selectedCandidate ? 'selected Buildprint extraction' : 'guided discovery workbench'
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
    'AGENT_EXECUTION_BRIEF.md',
    'facts.json',
    'census.json',
    'EVIDENCE_LEDGER.json',
    'SOURCE_READING_PLAN.md',
    'DISCOVERY_QUEUE.md',
    'CLAIM_REGISTER.md',
    'discovered-map.md',
    'SYSTEM_MAP.md',
    'FEATURE_INVENTORY.md',
    'FEATURE_HYPOTHESES.md',
    'EVIDENCE_COVERAGE.md',
    'SOURCE_VALIDATION_QUEUE.md',
    'PRODUCT_CAPABILITY_MAP.md',
    'IMPLEMENTATION_DECOMPOSITION.md',
    'PHASE_PLAN.md',
    'LOOP_GATES.md',
    'PARITY_ACCEPTANCE.md',
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
    'FEATURE_INVENTORY.md',
    'FEATURE_HYPOTHESES.md',
    'EVIDENCE_COVERAGE.md',
    'SOURCE_VALIDATION_QUEUE.md',
    'PRODUCT_CAPABILITY_MAP.md',
    'IMPLEMENTATION_DECOMPOSITION.md',
    'PHASE_PLAN.md',
    'LOOP_GATES.md',
    'PARITY_ACCEPTANCE.md',
    'SPEC.md',
    'PLAN.md',
    'CONTRACTS.md',
    'PROOF_PLAN.md',
    'VALIDATION_NOTES.md',
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
    facts.selectedCandidate ? 'status: draft-needs-review' : 'status: unqualified-map',
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
    `- Qualification status: QUALIFICATION_REVIEW_REQUIRED; mapped evidence only until source/runtime proof is recorded`,
    '- Discovery status: DISCOVERY_REVIEW_REQUIRED; census hints are not product facts.',
    `- Size class: ${sizeClassification.sizeClass}`,
    `- Scope pressure: ${sizeClassification.scopePressure}`,
    `- Latest safe starting phase: ${sizeClassification.latestSafeStartingPhase}`,
    `- Selected scope: ${selectedScope}`,
    '- If this is still a guided discovery workbench, do not claim it is a final extracted Buildprint.',
    '- The scanner is not authoritative. It can produce census hints, but only source-reading can promote product claims.',
    '- A mapped package becomes qualified only after source validation confirms feature behavior, state, permissions, side effects, and acceptance evidence.',
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
    '- Feature inventory: `FEATURE_INVENTORY.md`',
    '- Product capability map: `PRODUCT_CAPABILITY_MAP.md`',
    '- Implementation decomposition: `IMPLEMENTATION_DECOMPOSITION.md`, `PHASE_PLAN.md`, `LOOP_GATES.md`, `PARITY_ACCEPTANCE.md`',
    '- Behavior spec: `SPEC.md`',
    '- Execution plan: `PLAN.md` and `plans/*.md`',
    '- Agent execution rails: `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `CURRENT_STATE.md`, `manifest.json`',
    '- Interface/data contracts: `CONTRACTS.md`',
    '- Risk-to-proof map: `PROOF_PLAN.md`',
    '- QA and no-fake gates: `QA_PLAN.md`, `HEAD_TO_FOOT_QA.md`, `IMPLEMENTATION_COMPLETENESS.md`',
    '- Confidence report: `confidence-report.md`',
    '- Review questions: `questions.md`',
    '- AI review protocol: `REVIEW_PROTOCOL.md` and `REVIEW_PACKET.json`',
    '- Mapper OS alignment: `MAPPER_OS_ALIGNMENT.md`',
    '- Decomposition strategy: `DECOMPOSITION_STRATEGY.md`',
    '',
    '## Rules for coding agents',
    '',
    '- Treat census hints as reading guidance, not current product facts.',
    '- Treat observed facts as current repo state only when they cite source evidence.',
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
    'plans/04-validation.md',
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
    '# PROOF_PLAN',
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
    '02-safe-change-plan.md': '# Phase 02 - Safe Change Plan\n\n## Goal\nPlan the smallest production-grade selected scope.\n\n## Keep in context\n- `BUILDPRINT.md`\n- `SPEC.md`\n- `CONTRACTS.md`\n- `IMPLEMENTATION_COMPLETENESS.md`\n- `TRACEABILITY_MATRIX.md`\n\n## Steps\n- Identify included routes, APIs, data, providers, jobs, exports, and UI surfaces.\n- Exclude capabilities that cannot be real.\n- Map each important requirement to evidence and a validation check.\n- Define architecture topology expectations for UI/API/domain/service/provider/storage/task/test layers where the scope is medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy.\n- Define a capability depth matrix: UI/UX, API, domain logic, persistence/state, provider/runtime, failure states, tests, proof, and depth status.\n\n## Do not\n- Merge unrelated scopes.\n- Keep hard features as placeholders.\n- Count mocks, fixtures, or in-memory-only stores as product behavior.\n\n## Exit criteria\n- Change/extraction scope is explicit.\n- Required tests, QA, persistence, and no-fake checks are known.\n\n## Validation evidence\n- `TRACEABILITY_MATRIX.md` and `IMPLEMENTATION_COMPLETENESS.md` are updated.\n',
    '03-implementation.md': '# Phase 03 - Implementation\n\n## Goal\nImplement or extract only the confirmed selected scope.\n\n## Keep in context\n- `AGENT_EXECUTION_BRIEF.md`\n- `agent-contract.xml`\n- `CURRENT_STATE.md`\n- `PLAN.md`\n- `CONTRACTS.md`\n\n## Steps\n- Follow the selected scope exactly.\n- Preserve observed stack and behavior unless explicitly changed.\n- Update Buildprint artifacts when architecture changes.\n- Keep medium/large/full-suite architecture honest: route layer, domain/service logic, provider adapters, storage, task/runtime, and UI feature structure must be separated unless explicitly justified as tiny scope.\n- Update capability depth status as `REAL_IMPLEMENTED`, `CONTRACT_SEAM_ONLY`, `BLOCKED_WITH_REASON`, `OUT_OF_SCOPE_BY_USER_ONLY`, or `FAKE_OR_PLACEHOLDER_FAIL`.\n\n## Do not\n- Modify unrelated source areas.\n- Add route-shaped links, no-op controls, fake success states, or skeleton adapters.\n- Count deterministic provider/runtime adapters, static UI labels, or flat single-file shells as product-quality implementation.\n- Expand scope without recording the decision and QA impact.\n\n## Exit criteria\n- Included capabilities are real or explicitly excluded/blocked.\n- `CURRENT_STATE.md` records completed work and next action.\n\n## Validation evidence\n- Changed/generated files and blockers are listed in `SUBMISSION_CHECKLIST.md`.\n',
    '04-validation.md': '# Phase 04 - Tests and Validation\n\n## Goal\nProve the selected scope honestly.\n\n## Keep in context\n- `PROOF_PLAN.md`\n- `QA_PLAN.md`\n- `HEAD_TO_FOOT_QA.md`\n- `VALIDATION_NOTES.md`\n- `SUBMISSION_CHECKLIST.md`\n\n## Steps\n- Run available tests/build/checks or record blockers.\n- Run runtime/browser QA for product UI when applicable.\n- Run architecture topology review for medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy scopes.\n- Run capability depth review; every included capability must be `REAL_IMPLEMENTED` or honestly marked `CONTRACT_SEAM_ONLY`/`BLOCKED_WITH_REASON`.\n- Run persistence/restart QA when state exists.\n- Run no-fake implementation scan.\n- Finish with a chat handover.\n\n## Do not\n- Claim pass status for checks that did not run.\n- Hide known gaps.\n- Count test/demo fixtures as product implementation.\n\n## Exit criteria\n- Validation evidence, gaps, and next direction are recorded.\n- Final chat handover includes outcome, selected scope, evidence, files, commands, gaps, and next direction.\n\n## Validation evidence\n- `VALIDATION_NOTES.md` is filled or an explicit blocker explains why not.\n',
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
    '8. `PROOF_PLAN.md` and `HEAD_TO_FOOT_QA.md`',
    '9. `MAPPER_OS_ALIGNMENT.md`',
    '',
    '## Hard constraints',
    '',
    '- Included capabilities must be real, wired, persistent where relevant, and QA-tested.',
    '- Preserve review/depth, not only capability names: endpoint/label/seam presence is not implementation.',
    '- Medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy scopes require architecture topology evidence.',
    '- Each included capability needs a depth status: REAL_IMPLEMENTED, CONTRACT_SEAM_ONLY, BLOCKED_WITH_REASON, OUT_OF_SCOPE_BY_USER_ONLY, or FAKE_OR_PLACEHOLDER_FAIL.',
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
    '- A medium/large/full-suite implementation is collapsing into a flat static shell or mostly single-file backend without explicit tiny-scope justification.',
    '- Persistence is claimed but no durable adapter can be used.',
    '- Runtime/test/browser QA cannot run and no honest blocker is recorded.',
    ''
  ].join('\n')

  const agentContractXml = `<?xml version="1.0" encoding="UTF-8"?>
<buildprint-agent-contract version="1">
  <mission>Build the selected production-grade scope. Scope may be limited, but included capabilities must be real, wired, persistent where relevant, QA-tested, and depth-classified.</mission>
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
    <file priority="8">PROOF_PLAN.md</file>
    <file priority="9">HEAD_TO_FOOT_QA.md</file>
    <file priority="10">MAPPER_OS_ALIGNMENT.md</file>
  </read-order>
  <must>
    <rule>Separate OBSERVED, INFERRED, QUESTION, and OUT_OF_SCOPE claims.</rule>
    <rule>Implement included capabilities end-to-end or exclude/block them.</rule>
    <rule>Do not count endpoint/label/seam presence as implementation; mark seam-only work CONTRACT_SEAM_ONLY.</rule>
    <rule>For medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy scopes, provide architecture topology evidence.</rule>
    <rule>Run tests, build, runtime QA, browser/UI QA, persistence/restart QA, capability depth review, architecture topology review, and no-fake scan before claiming done.</rule>
    <rule>Provide final chat handover with outcome, selected scope, evidence, files, commands, gaps, and next direction.</rule>
  </must>
  <must-not>
    <rule>Do not count mocks, fixtures, skeleton adapters, deterministic provider/runtime adapters, static UI labels, placeholder routes, no-op controls, fake success states, flat shells, or in-memory-only claimed persistence as product implementation.</rule>
    <rule>Do not invent validation results.</rule>
    <rule>Do not copy secret values.</rule>
  </must-not>
</buildprint-agent-contract>
`

  const currentStateMd = [
    '# Current State',
    '',
    'Purpose: anti-context-rot continuity file. Update after every phase and before stopping.',
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
    '- Included capabilities must be real or explicitly depth-marked as seam-only/blocked/excluded.',
    '- Architecture topology and capability-depth gates are required for broad/product scopes.',
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

  const qualificationRecords = featureQualificationRecords(facts)
  const qualificationSummaryInfo = qualificationSummary(qualificationRecords)

  const manifestJson = {
    schemaVersion: 'buildprint-agent-manifest.v1',
    purpose: 'Machine-checkable manifest for an agent-first mapped Buildprint.',
    mode: outputMode,
    source: facts.source ?? null,
    selectedScope,
    readOrder: facts.selectedCandidate ? [
      'AGENT_EXECUTION_BRIEF.md',
      'agent-contract.xml',
      'CURRENT_STATE.md',
      'BUILDPRINT.md',
      'FEATURE_INVENTORY.md',
      'FEATURE_HYPOTHESES.md',
      'EVIDENCE_COVERAGE.md',
      'SOURCE_VALIDATION_QUEUE.md',
      'PRODUCT_CAPABILITY_MAP.md',
      'IMPLEMENTATION_DECOMPOSITION.md',
      'PHASE_PLAN.md',
      'LOOP_GATES.md',
      'PARITY_ACCEPTANCE.md',
      'SPEC.md',
      'CONTRACTS.md',
      'IMPLEMENTATION_COMPLETENESS.md',
      'PROOF_PLAN.md',
      'HEAD_TO_FOOT_QA.md',
      'REVIEW_PROTOCOL.md',
      'REVIEW_PACKET.json',
      'MAPPER_OS_ALIGNMENT.md',
      'DECOMPOSITION_STRATEGY.md'
    ] : [
      'BUILDPRINT.md',
      'SYSTEM_MAP.md',
      'FEATURE_INVENTORY.md',
      'FEATURE_HYPOTHESES.md',
      'EVIDENCE_COVERAGE.md',
      'SOURCE_VALIDATION_QUEUE.md',
      'PRODUCT_CAPABILITY_MAP.md',
      'IMPLEMENTATION_DECOMPOSITION.md',
      'PHASE_PLAN.md',
      'LOOP_GATES.md',
      'PARITY_ACCEPTANCE.md',
      'DECOMPOSITION_STRATEGY.md',
      'BUILDPRINT_CANDIDATES.md',
      'questions.md',
      'REVIEW_PROTOCOL.md',
      'REVIEW_PACKET.json',
      'MAPPER_OS_ALIGNMENT.md'
    ],
    qualificationStatus: 'QUALIFICATION_REVIEW_REQUIRED',
    discoveryStatus: 'DISCOVERY_REVIEW_REQUIRED',
    claimStates: CLAIM_STATES,
    qualificationGate: 'Source validation and runtime evidence are required before this package can be called a qualified Buildprint.',
    qualification: {
      command: 'agb map',
      promoted: false,
      summary: qualificationSummaryInfo,
      rules: [
        'agb map bootstraps a guided discovery workbench and explicit promotion gate.',
        'Scanner census hints are not product facts and cannot qualify routes, APIs, providers, persistence, or parity.',
        'Isolated eval harnesses review Mapper OS packets and downstream outcomes.',
        'No separate top-level qualify command is required for the core product flow.',
        'Side effects, auth, privacy, and external behavior require runtime proof before final promotion.',
        'Blocked unknowns must remain explicit and must not enter parity claims.'
      ]
    },
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
      'agent-source-reading-required',
      'scanner-non-authority',
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
    '- [ ] Mapper behavior receives manual review when it changes.',
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
    '- [ ] Capability depth matrix distinguishes REAL_IMPLEMENTED, CONTRACT_SEAM_ONLY, BLOCKED_WITH_REASON, and FAKE_OR_PLACEHOLDER_FAIL.',
    '- [ ] Architecture topology gate passed or has an explicit blocker/exception.',
    '- [ ] UI/browser proof exists for user-facing flows or is explicitly blocking qualification.',
    '- [ ] Provider/runtime proof exists for provider-backed/runtime flows or is explicitly blocking qualification.',
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
  fs.writeFileSync(path.join(out, 'PROOF_PLAN.md'), testMatrixMd)
  fs.writeFileSync(path.join(out, 'VALIDATION_NOTES.md'), validationTemplateMd)
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
  fs.writeFileSync(path.join(out, 'FEATURE_INVENTORY.md'), featureInventoryMd(facts))
  fs.writeFileSync(path.join(out, 'FEATURE_HYPOTHESES.md'), featureHypothesesMd(facts))
  fs.writeFileSync(path.join(out, 'EVIDENCE_COVERAGE.md'), evidenceCoverageMd(facts))
  fs.writeFileSync(path.join(out, 'SOURCE_VALIDATION_QUEUE.md'), sourceValidationQueueMd(facts))
  fs.writeFileSync(path.join(out, 'PRODUCT_CAPABILITY_MAP.md'), productCapabilityMapMd(facts))
  fs.writeFileSync(path.join(out, 'IMPLEMENTATION_DECOMPOSITION.md'), implementationDecompositionMd(facts))
  fs.writeFileSync(path.join(out, 'PHASE_PLAN.md'), implementationDecompositionMd(facts))
  fs.writeFileSync(path.join(out, 'LOOP_GATES.md'), loopGatesMd(facts))
  fs.writeFileSync(path.join(out, 'PARITY_ACCEPTANCE.md'), parityAcceptanceMd(facts))
  fs.writeFileSync(path.join(out, 'DECOMPOSITION_STRATEGY.md'), decompositionStrategyMd(facts, sizeClassification))
  if (isProductLike) fs.writeFileSync(path.join(out, 'PARITY_CLAIMS.md'), parityClaimsMd)
  if (needsThreatModel) fs.writeFileSync(path.join(out, 'THREAT_MODEL.md'), threatModelMd)
  if (needsDataLifecycle) fs.writeFileSync(path.join(out, 'DATA_LIFECYCLE.md'), dataLifecycleMd)
  if (needsObservability) fs.writeFileSync(path.join(out, 'OBSERVABILITY.md'), observabilityMd)
  if (needsArchitectureViews) fs.writeFileSync(path.join(out, 'ARCHITECTURE_VIEWS.md'), architectureViewsMd)
  if (isProductLike) fs.writeFileSync(path.join(out, 'QUALITY_SCORECARD.md'), qualityScorecardMd)

  const writeOut = (relative, content) => {
    const target = path.join(out, relative)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, content)
  }

  // Qualified-package modular structure. These files are generated during discovery as
  // unqualified drafts; later qualification/finalization should promote or correct them.
  writeOut('product/README.md', '# Product\n\nProduct intent, feature scope, user flows, parity target, and open questions.\n')
  writeOut('product/PRODUCT_SCOPE.md', qualifiedProductScopeMd(qualificationRecords))
  writeOut('product/FEATURE_CATALOG.md', featureInventoryMd(facts))
  writeOut('product/FEATURE_HYPOTHESES.md', featureHypothesesMd(facts))
  writeOut('product/USER_FLOWS.md', '# USER_FLOWS\n\nDerived from route/page/API evidence. Validate triggers and journeys before qualification.\n\n' + facts.routes.map((x) => `- QUESTION flow for route: ${x}`).join('\n') + '\n')
  writeOut('product/PARITY_TARGET.md', parityAcceptanceMd(facts))
  writeOut('product/OPEN_QUESTIONS.md', questionsMd)

  writeOut('architecture/README.md', '# Architecture\n\nCapability-first module abstraction, contracts, dependencies, and reimplementation boundaries.\n')
  writeOut('architecture/SYSTEM_MODEL.md', architectureSystemModelMd(facts))
  writeOut('architecture/MODULES.md', moduleAbstractionMd(facts))
  writeOut('architecture/MODULE_CONTRACTS.md', moduleContractsMd(facts))
  writeOut('architecture/DEPENDENCY_GRAPH.md', dependencyGraphMd(facts))
  writeOut('architecture/DATA_MODEL.md', dataLifecycleMd)
  writeOut('architecture/INTEGRATION_BOUNDARIES.md', '# INTEGRATION_BOUNDARIES\n\n' + (facts.integrations.length ? facts.integrations.map((x) => `- ${x}: validate provider contracts, retries, auth, side effects, and failure modes.`).join('\n') : '- none detected') + '\n')
  writeOut('architecture/REIMPLEMENTATION_BOUNDARIES.md', reimplementationBoundariesMd(facts))
  for (const m of moduleInventory(facts)) writeOut(`architecture/modules/${m.id}.md`, moduleAbstractionMd({ ...facts, candidateBuildprints: facts.candidateBuildprints.filter((c) => m.features.some((f) => f.evidence.some((e) => c.includedPaths.includes(e)))) }))

  writeOut('implementation/README.md', modularImplementationIndexMd(facts))
  writeOut('implementation/PHASE_PLAN.md', implementationDecompositionMd(facts))
  for (const [id, title, goal, featureNames] of implementationPhases(facts)) {
    writeOut(`implementation/phases/${id}.md`, phaseDefinitionMd(id, title, goal, featureNames))
    writeOut(`implementation/tasks/${id}.tasks.md`, phaseDefinitionMd(id, `${title} Tasks`, goal, featureNames))
  }
  for (const feature of featureInventory(facts).slice(0, 24)) writeOut(`implementation/capabilities/${slugify(feature.title)}.md`, verticalSliceMd(feature))
  writeOut('implementation/loops/feature-contract-loop.md', loopGatesMd(facts))
  writeOut('implementation/loops/persistence-loop.md', loopGatesMd(facts))
  writeOut('implementation/loops/integration-contract-loop.md', loopGatesMd(facts))
  writeOut('implementation/loops/no-fake-loop.md', loopGatesMd(facts))
  writeOut('implementation/loops/security-loop.md', loopGatesMd(facts))

  writeOut('review/README.md', '# Quality\n\nAcceptance, proof, no-fake, security/privacy, observability, and parity checks.\n')
  writeOut('review/ACCEPTANCE_MATRIX.md', parityAcceptanceMd(facts))
  writeOut('review/PROOF_STRATEGY.md', testMatrixMd)
  writeOut('review/NO_FAKE_CHECKS.md', implementationCompletenessMd)
  writeOut('review/SECURITY_PRIVACY_REVIEW.md', needsThreatModel ? threatModelMd : '# SECURITY_PRIVACY_REVIEW\n\nNo high-risk security surface detected by static mapper; still validate before qualification.\n')
  writeOut('review/OBSERVABILITY.md', observabilityMd)
  writeOut('review/PROMOTION_GATE.md', ['# PROMOTION_GATE', '', `Promotion status: ${manifestJson.qualificationStatus}`, '', '- `agb map` is allowed to generate evidence-backed draft packages only.', '- Manual review sessions are the review surface for mapped packages.', '- Final `QUALIFIED_BUILDPRINT` requires readable source evidence plus runtime proof where required.', '- Scope preservation alone is insufficient; broad/product scopes also require architecture topology evidence and a capability depth matrix.', '- Route-shaped endpoints, static UI shells, deterministic adapters, skeleton providers, and flat single-file prototypes are not product implementation unless proven by the applicable gates.', '- If any record is `blocked_unknown`, implementation phases may use it only as an open question or excluded scope.', ''].join('\n'))

  writeOut('evidence/README.md', '# Evidence\n\nSource evidence, coverage, validation logs, and review packet.\n')
  writeOut('evidence/SOURCE_EVIDENCE.md', '# SOURCE_EVIDENCE\n\n- Facts: `../facts.json` or root `facts.json`\n- Files scanned: ' + facts.totalFilesScanned + '\n- Routes: ' + facts.routes.length + '\n- APIs: ' + facts.apis.length + '\n- Tests: ' + facts.tests.length + '\n')
  writeOut('evidence/EVIDENCE_COVERAGE.md', evidenceCoverageMd(facts))
  writeOut('evidence/SOURCE_VALIDATION.md', sourceValidationMd(qualificationRecords))
  writeOut('evidence/qualification-records.json', JSON.stringify({ summary: qualificationSummaryInfo, records: qualificationRecords }, null, 2) + '\n')
  writeOut('evidence/SOURCE_VALIDATION_QUEUE.md', sourceValidationQueueMd(facts))
  writeOut('evidence/VALIDATION_LOG.md', validationTemplateMd)
  writeOut('evidence/REVIEW_PROTOCOL.md', formatMapReviewProtocol(reviewPacket))
  writeOut('evidence/REVIEW_PACKET.json', JSON.stringify(reviewPacket, null, 2) + '\n')

  writeOut('agent/README.md', '# Agent\n\nAgent execution rails and handover files.\n')
  writeOut('agent/AGENT_EXECUTION_BRIEF.md', agentExecutionBriefMd)
  writeOut('agent/agent-contract.xml', agentContractXml)
  writeOut('agent/CURRENT_STATE.md', currentStateMd)
  writeOut('agent/SUBMISSION_CHECKLIST.md', submissionChecklistMd)

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
    const file = typeof entry === 'string' ? entry : entry?.path
    const url = typeof entry === 'object' ? entry.url : null
    if (!file) continue
    const target = path.join(temp, file)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    if (url || baseUrl) {
      const source = url || new URL(file, baseUrl).toString()
      const res = await fetch(source)
      if (!res.ok) throw new Error(`failed to fetch packet file ${file}: ${res.status}`)
      fs.writeFileSync(target, await res.text())
    } else {
      const source = path.resolve(path.dirname(path.resolve(cwd, ref)), file)
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

function extractBuildprintGlanceSurfaces(text) {
  const section = sectionByHeading(text, 'Final product at a glance')
  const surfaceBlock = section.match(/\*\*Surfaces\*\*[\s\S]*?(?=\n\*\*Done looks like:|$)/i)?.[0] || ''
  return surfaceBlock
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*-\s*([^—\n]+?)\s*—/)?.[1]?.trim())
    .filter(Boolean)
}

function extractSetupMatrixRows(text) {
  const section = sectionByHeading(text, 'Mapped obligation/surface matrix')
  return section
    .split(/\r?\n/)
    .filter((line) => /^\s*\|/.test(line) && !/^\s*\|\s*-/.test(line) && !/Surface id/i.test(line))
    .map((line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()))
    .filter((cells) => cells.length >= 7)
    .map((cells) => ({
      surfaceId: cells[0],
      mappedObligation: cells[2],
      disposition: cells[3],
      owningPhase: cells[5],
      requiredProof: cells[6],
      raw: cells
    }))
}

function phaseFilesFromIndex(text) {
  return [...text.matchAll(/^\s*file:\s*(03-phases\/[^\s#]+\.md)\s*$/gmi)].map((m) => m[1].trim())
}

function containsForbiddenCompletionLanguage(text) {
  const cleaned = text
    .replace(/must not (?:claim|use)[^\n]*(validated|production-ready|complete|end-to-end|fully working)[^\n]*/gi, '')
    .replace(/Do not [^\n]*(validated|production-ready|complete|end-to-end|fully working)[^\n]*/gi, '')
  return /\b(validated|production-ready|fully working|complete|end-to-end)\b/i.test(cleaned)
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

function packetCheckResults(dir) {
  dir = packetCheckRoot(dir)
  const checks = []
  const ok = (label, pass, detail = '') => checks.push({ label, pass, detail })
  const files = new Set(packetFiles(dir))
  const allFiles = Array.from(files)
  const isMapperTemplatePacket = dir.split(path.sep).join('/').endsWith('buildprints/buildprint-mapper-os/templates/executable-packet')
  const need = [
    'BUILDPRINT.md', 'blueprint.yaml', '01-questions.md', '02-project-setup.md',
    '03-phases/phase-index.yaml', '03-phases/phase-flow.md', '04-evaluation.md',
    '05-evidence/evidence-ledger.schema.json', '05-evidence/evidence-ledger.jsonl'
  ]
  for (const file of need) ok(`packet file exists: ${file}`, files.has(file))
  ok('packet does not ship project AGENTS.md', !files.has('AGENTS.md') && !allFiles.some((file) => file.startsWith('docs/')))
  ok('packet avoids obsolete routers/files recursively', !allFiles.some(packetHasObsoleteRouter))
  const blueprint = safeReadText(path.join(dir, 'blueprint.yaml'))
  ok('blueprint declares executable Buildprint authority', /schema_version:\s*mapper-os\/executable-blueprint\s*$/im.test(blueprint) && /execution_start:\s*BUILDPRINT\.md/i.test(blueprint) && /machine_contract:\s*blueprint\.yaml/i.test(blueprint))
  ok('blueprint includes project setup gate', /questions:\s*01-questions\.md/i.test(blueprint) && /project_setup:\s*02-project-setup\.md/i.test(blueprint))
  ok('blueprint source fields are nested under source', !/\nsource:\s*\ninput:/i.test(`\n${blueprint}`))
  ok('blueprint includes implementation loop', /observe[\s\S]*plan[\s\S]*execute[\s\S]*verify[\s\S]*reflect[\s\S]*record/i.test(blueprint))
  ok('blueprint includes repair routing', /proof_gate_failed:\s*current_phase/i.test(blueprint) && /architecture_contradiction:\s*02-project-setup\.md/i.test(blueprint))
  const qualificationLabel = yamlScalar(blueprint, 'qualification_label') || yamlScalar(blueprint, 'claim_status')
  ok('blueprint declares qualification label', ['DISCOVERY_ONLY', 'PROOF_REQUIRED', 'QUALIFIED_SOURCE_INDEPENDENT'].includes(qualificationLabel))
  ok('blueprint declares setup tier', /setup_tier:\s*(compact_setup|full_setup|<compact_setup\|full_setup>)/i.test(blueprint))
  ok('blueprint declares Product Engineering Lead as accountability contract', /Product Engineering Lead/i.test(blueprint) && /accountability_contract_not_persona|accountability contract/i.test(blueprint))
  ok('blueprint declares optional PRODUCT.md rule', /PRODUCT\.md[\s\S]*(optional|large|complex|full-suite)/i.test(blueprint))
  ok('blueprint phase entries include proof/surface metadata', /glance_surfaces:/i.test(blueprint) && /owned_surface_ids:/i.test(blueprint) && /required_proofs:/i.test(blueprint) && /blueprint_mode:/i.test(blueprint) && /phase_style:/i.test(blueprint))
  const buildprint = safeReadText(path.join(dir, 'BUILDPRINT.md'))
  ok('BUILDPRINT owns read order', /01-questions\.md[\s\S]*02-project-setup\.md[\s\S]*03-phases\/phase-index\.yaml[\s\S]*03-phases\/phase-flow\.md/i.test(buildprint))
  ok('BUILDPRINT includes loop, phase-flow, and repair protocol', /Implementation loop/i.test(buildprint) && /phase-runs/i.test(buildprint) && /Repair routing/i.test(buildprint))
  ok('BUILDPRINT includes Product Engineering Lead contract', /Product Engineering Lead/i.test(buildprint) && /accountability contract|not a persona/i.test(buildprint))
  ok('BUILDPRINT requires phase preflight before coding', /phase-preflight\.yaml/i.test(buildprint) && /fake-done risks|fake_done_risks/i.test(buildprint) && /claim ceiling|claim_ceiling/i.test(buildprint))
  ok('PROOF_REQUIRED packet avoids completion language overclaim', isMapperTemplatePacket || qualificationLabel === 'QUALIFIED_SOURCE_INDEPENDENT' || !containsForbiddenCompletionLanguage(buildprint))
  const questions = safeReadText(path.join(dir, '01-questions.md'))
  ok('questions use numbered AI-default alignment', /## 1\./.test(questions) && /## 6\./.test(questions) && /AI best judgment/i.test(questions))
  const setup = safeReadText(path.join(dir, '02-project-setup.md'))
  ok('project setup defines architecture and AGENTS plan', /Architecture principles|Architecture rules/i.test(setup) && /implementation-project `AGENTS\.md`|AGENTS\.md plan/i.test(setup) && /Phase start gate/i.test(setup))
  ok('project setup defines phase-flow execution authority', /03-phases\/phase-flow\.md/i.test(setup) && /Foundation scaffold gate/i.test(setup) && /\.buildprint\/setup/i.test(setup))
  ok('project setup defines optional PRODUCT.md and setup tier', /PRODUCT\.md[\s\S]*(optional|large|complex|full-suite)/i.test(setup) && /compact_setup/i.test(setup) && /full_setup/i.test(setup))
  ok('project setup requires runnable verifier commands', /verify:no-fake/i.test(setup) && /verify:phase-artifacts/i.test(setup) && /exit non-zero|non-zero/i.test(setup))
  ok('project setup uses mapped obligation matrix', /\|\s*Surface id\s*\|[\s\S]*Mapped obligation[\s\S]*Owning phase[\s\S]*Required proof/i.test(setup))
  const phaseFlow = safeReadText(path.join(dir, '03-phases/phase-flow.md'))
  ok('phase flow defines phase-entry proof artifacts', /Phase-entry protocol/i.test(phaseFlow) && /\.buildprint\/phase-runs\/<phase-id>\/plan\.md/i.test(phaseFlow) && /\.buildprint\/phase-runs\/<phase-id>\/proof\.md/i.test(phaseFlow))
  ok('phase flow requires Lead Phase Preflight', /Lead Phase Preflight Gate/i.test(phaseFlow) && /phase-preflight\.yaml/i.test(phaseFlow) && /lead_decision/i.test(phaseFlow) && /criterion_ids/i.test(phaseFlow) && /proof_ids/i.test(phaseFlow) && /fake_done_risks/i.test(phaseFlow))
  ok('phase flow defines claim typing and evidence ceilings', /claim typing/i.test(phaseFlow) && /target[\s\S]*core_pass[\s\S]*claim_upgrade[\s\S]*blocker/i.test(phaseFlow) && /does not qualify live provider/i.test(phaseFlow))
  ok('phase flow blocks evidence until proof exists', /may not append runtime evidence|Before writing runtime evidence/i.test(phaseFlow) && /\.buildprint\/evidence\/evidence-ledger\.jsonl/i.test(phaseFlow))
  const phaseIndex = safeReadText(path.join(dir, '03-phases/phase-index.yaml'))
  ok('phase index names active proof-gated phase', /active_phase:\s*03-phases\//i.test(phaseIndex) && /phase_id:/i.test(phaseIndex) && /proof_gate:/i.test(phaseIndex))
  ok('phase index carries mode/surface/proof metadata', /blueprint_mode:/i.test(phaseIndex) && /phase_style:/i.test(phaseIndex) && /glance_surfaces:/i.test(phaseIndex) && /owned_surface_ids:/i.test(phaseIndex) && /required_proofs:/i.test(phaseIndex))
  const phaseIds = [...phaseIndex.matchAll(/^\s*-?\s*phase_id:\s*([^\s#]+)/gmi)].map((m) => m[1].trim())
  const phaseIdSet = new Set(phaseIds)
  ok('phase index has unique canonical phase ids', phaseIds.length === phaseIdSet.size)
  const phaseDir = path.join(dir, '03-phases')
  const phases = exists(phaseDir) ? fs.readdirSync(phaseDir).filter((file) => file.endsWith('.md')).sort() : []
  ok('packet has at least one phase file', phases.length > 0)
  for (const file of phases) {
    if (file === 'phase-flow.md') continue
    const text = safeReadText(path.join(phaseDir, file))
    ok(`${file} includes phase-flow entry plus inline interfaces/state/proof/repair`, /## How to implement this phase/i.test(text) && /03-phases\/phase-flow\.md/i.test(text) && /phase-flow required artifacts/i.test(text) && /## Interfaces touched/i.test(text) && /## State\/runtime touched/i.test(text) && /## Proof gate/i.test(text) && /## Repair routing/i.test(text))
    ok(`${file} includes structured phase contract`, /phase_contract:/i.test(text) && /owned_surface_ids:/i.test(text) && /core_pass_required:/i.test(text) && /claim_upgrade_tracks:/i.test(text))
    ok(`${file} requires preflight with criteria/proofs/fake-done risks`, /phase-preflight\.yaml/i.test(text) && /criterion ids|criterion_ids/i.test(text) && /proof ids|proof_ids/i.test(text) && /fake-done risks|fake_done_risks/i.test(text))
    ok(`${file} uses phase_id not capability_id for proof rows`, !/capability_id\s*:/i.test(text))
    ok(`${file} does not reference missing shared UX context`, !/02-context\/ux-contract\.md|design-quality-bar\.md/i.test(text))
  }
  const rules = safeReadText(path.join(dir, '04-evaluation.md'))
  for (const key of ['provider_live', 'durable_persistence', 'security_boundary', 'no_fake']) ok(`evaluation includes ${key}`, rules.includes(key))
  ok('evaluation defines claim typing', /target[\s\S]*core_pass[\s\S]*claim_upgrade[\s\S]*blocker/i.test(rules))
  ok('evaluation requires phase evidence manifest', /evidence\.json/i.test(rules) && /command\/artifact manifest|command.*artifact/i.test(rules))
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

  const glanceSurfaces = extractBuildprintGlanceSurfaces(buildprint)
  const matrixRows = extractSetupMatrixRows(setup)
  const phaseIndexFiles = phaseFilesFromIndex(phaseIndex)
  ok('BUILDPRINT defines at least one glance surface', glanceSurfaces.length > 0)
  ok('setup matrix has non-empty surface/proof rows', isMapperTemplatePacket || (matrixRows.length > 0 && matrixRows.every((row) => row.surfaceId && row.mappedObligation && row.disposition && row.requiredProof)))
  ok('setup matrix rows have one owning phase or explicit drop/block', isMapperTemplatePacket || matrixRows.every((row) => /drop|blocked/i.test(row.disposition) || phaseIndexFiles.includes(row.owningPhase.replace(/`/g, ''))))
  ok('glance surfaces trace into setup matrix', isMapperTemplatePacket || glanceSurfaces.every((surface) => matrixRows.some((row) => row.raw.join(' ').includes(surface))))
  ok('no generated sentinel placeholders remain', isMapperTemplatePacket || !allFiles.some((file) => {
    if (!/\.(md|yaml|json|jsonl)$/.test(file)) return false
    const text = safeReadText(path.join(dir, file)).replace(/<phase-id>/g, '')
    return /MAPPER_REQUIRED_|<[^>]+>/.test(text)
  }))
  ok('generated prompt is not authority', isMapperTemplatePacket || !files.has('generated/agent-prompt.md') || !/start here|read first|source of truth|override|canonical/i.test(safeReadText(path.join(dir, 'generated/agent-prompt.md')).replace(/Generated from:[^\n]+/gi, '').replace(/not source of truth|not authoritative/gi, '')))
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
    ? ['BUILDPRINT.md', '01-questions.md', '02-project-setup.md', 'blueprint.yaml', '03-phases/phase-index.yaml', '03-phases/phase-flow.md', '04-evaluation.md', '05-evidence/evidence-ledger.jsonl'].filter(hasManifestFile)
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
    '02-project-setup.md',
    'blueprint.yaml',
    '03-phases/phase-index.yaml',
    '03-phases/phase-flow.md',
    activePhase,
    '04-evaluation.md',
    '05-evidence/evidence-ledger.jsonl'
  ].filter((file) => file && hasManifestFile(file))
  const extras = baseReadOrder.filter((file) => hasManifestFile(file) && !canonical.includes(file))
  return uniqueStrings([...canonical, ...extras])
}

async function startBuildprint(manifestRef, targetFolder = cwd) {
  const { json: manifest, baseUrl } = await readJsonFromUrlOrFile(manifestRef)
  if (!manifest.slug || !Array.isArray(manifest.files)) throw new Error('invalid Buildprint package manifest: expected slug and files[]')
  const manifestFilePaths = manifest.files.map((file) => file.path).filter(Boolean)
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
    if (!file.path || file.path.includes('*')) continue
    const source = resolveManifestUrl(baseUrl, file.siteUrl || file.rawUrl)
    if (!source) throw new Error(`missing source URL for ${file.path}`)
    const text = await fetchTextExact(source)
    if (!text.trim() && !file.path.endsWith('.gitkeep')) throw new Error(`downloaded empty snapshot for ${file.path}`)
    // Minimum content length — suspiciously short files indicate a broken CDN or unpublished asset
    const snapshotBytes = Buffer.byteLength(text)
    const minBytes = 32
    if (snapshotBytes < minBytes && !file.path.endsWith('.gitkeep') && !file.path.endsWith('.jsonl')) {
      throw new Error(`downloaded snapshot ${file.path} is suspiciously short (${snapshotBytes} bytes from ${source}) — expected at least ${minBytes} bytes; the file may not be published or the URL is stale`)
    }
    // Key-file content assertions: critical spine files must contain their canonical anchor
    if (file.path === 'BUILDPRINT.md' && !/^# BUILDPRINT:/im.test(text)) {
      throw new Error(`downloaded BUILDPRINT.md is missing "# BUILDPRINT:" heading — content appears invalid or truncated from ${source}`)
    }
    if (file.path === 'blueprint.yaml' && !/schema_version:/i.test(text)) {
      throw new Error(`downloaded blueprint.yaml is missing schema_version: — content appears invalid or truncated from ${source}`)
    }
    if (file.path === '03-phases/phase-index.yaml' && !/active_phase:/i.test(text)) {
      throw new Error(`downloaded 03-phases/phase-index.yaml is missing active_phase: — content appears invalid or truncated from ${source}`)
    }
    const dest = path.join(snapshotDir, file.path)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, text)
    downloaded.push({ path: file.path, sourceUrl: source, bytes: Buffer.byteLength(text) })
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
  const evidenceDir = path.join(stateDir, 'evidence')
  const runtimeEvidencePath = path.join(evidenceDir, 'evidence-ledger.jsonl')
  const snapshotEvidencePath = path.join(snapshotDir, '05-evidence', 'evidence-ledger.jsonl')
  fs.mkdirSync(evidenceDir, { recursive: true })
  fs.writeFileSync(runtimeEvidencePath, fs.existsSync(snapshotEvidencePath) ? fs.readFileSync(snapshotEvidencePath, 'utf8') : '')

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
    readOrder: manifestReadOrder,
    executablePacket: isExecutablePacket,
  })

  writeJson(path.join(stateDir, 'state.json'), {
    buildprint: manifest.slug,
    currentPhase: isExecutablePacket ? activePhaseId || 'active-phase' : '00-alignment',
    activePhase,
    activePhaseId,
    executionMode: manifest.executionMode || manifest.execution_mode || (isExecutablePacket ? 'phase-gated' : null),
    completedPhases: [],
    blocked: false,
    lastAction: `downloaded ${downloaded.length} exact Buildprint snapshot files`,
    nextAction: isExecutablePacket
      ? 'read .buildprint/next-agent.md, complete project setup, then follow the active phase loop'
      : 'read .buildprint/next-agent.md and begin alignment or default-preset flow',
    runtimeEvidenceLedger: '.buildprint/evidence/evidence-ledger.jsonl',
    updatedAt: now,
  })

  fs.writeFileSync(path.join(stateDir, 'progress.md'), isExecutablePacket
    ? `# Build Progress\n\n## Done\n- Bootstrapped .buildprint/ from package manifest.\n- Downloaded ${downloaded.length} exact Buildprint snapshot files.\n- Initialized writable runtime evidence ledger at \`.buildprint/evidence/evidence-ledger.jsonl\`.\n\n## Current\n- Active phase: \`${activePhase || 'unknown'}\`.\n\n## Next\n- Follow \`.buildprint/next-agent.md\`, complete project setup, then execute the active phase loop.\n`
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
5. Create the required \`.buildprint/phase-runs/<phase-id>/\` plan/proof artifacts before evidence.
6. Load only the active phase named in \`.buildprint/snapshots/03-phases/phase-index.yaml\`: \`${activePhase || 'unknown'}\`.
7. Execute the phase implementation loop through phase-flow: observe, plan, execute, verify, reflect, record.
8. If verification fails, route repair to the current phase unless the failure proves setup/questions/prior phase/external blocker is responsible.
9. Append proof or blocker rows only to \`.buildprint/evidence/evidence-ledger.jsonl\`, and only after phase-flow artifacts exist.
10. After proof, consult \`.buildprint/snapshots/03-phases/phase-index.yaml\`, update local state, and continue one dependency-ready phase at a time.

Rules:

- Do not read every phase upfront.
- Do not write, rewrite, or append to \`.buildprint/snapshots/**\`; snapshots are immutable downloaded package files.
- Project root/local \`AGENTS.md\` files belong in the implementation project and should be created from \`02-project-setup.md\`, not shipped in the packet.
- Keep claims scoped until runtime evidence rows prove the required gates.
- Update \`.buildprint/state.json\`, \`.buildprint/progress.md\`, and this file before stopping.
- If blocked, update \`.buildprint/blockers.md\` and evidence ledger.
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
