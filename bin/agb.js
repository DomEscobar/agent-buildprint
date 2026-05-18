#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const cwd = process.cwd()
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
  agb map <repo-folder> [--out <output-folder>] [--scope <path>] [--candidate <number>]
  agb start <buildprint-package-json-url-or-file> [target-folder]

Examples:
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

function yamlList(items, indent = 2) {
  if (!items.length) return `${' '.repeat(indent)}[]`
  return items.map((item) => `${' '.repeat(indent)}- ${String(item).replaceAll('\n', ' ')}`).join('\n')
}

function detectProjectFacts(repo) {
  const files = walkProject(repo)
  const relFiles = files.map((f) => path.relative(repo, f))
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
    /^src\/pages\/(.+)\.(astro|tsx|ts|jsx|js|mdx)$/,
    /^src\/app\/(.+)\/page\.(tsx|ts|jsx|js)$/,
    /^pages\/(.+)\.(tsx|ts|jsx|js)$/,
    /^app\/(.+)\/page\.(tsx|ts|jsx|js)$/,
  ]
  const apiPatterns = [
    /^src\/pages\/api\/(.+)\.(ts|js)$/,
    /^pages\/api\/(.+)\.(ts|js)$/,
    /^src\/app\/(?:.+\/)?api\/(.+)\/route\.(ts|js)$/,
    /^app\/(?:.+\/)?api\/(.+)\/route\.(ts|js)$/,
  ]
  const apis = relFiles.filter((f) => apiPatterns.some((p) => p.test(f))).sort()
  for (const endpoint of detectCodeEndpoints(files, repo)) apis.push(endpoint)
  apis.sort()
  const apiSet = new Set(apis)
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
  for (const file of files.filter((f) => /\.[cm]?[tj]sx?$/.test(f) && !/(^|\/)(__tests__|tests?|specs?)\/|\.(test|spec)\.[cm]?[tj]sx?$/.test(path.relative(repo, f))).slice(0, 1200)) {
    let text = ''
    try { text = readText(file) } catch { continue }
    const rel = path.relative(repo, file)
    for (const m of text.matchAll(methodPattern)) endpoints.push(`${rel} ${m[1].toUpperCase()} ${m[2]}`)
  }
  return unique(endpoints).slice(0, 120)
}

function detectSubprojects(repo, relFiles) {
  const markers = relFiles.filter((f) => /(^|\/)(package.json|pyproject.toml|requirements.txt|go.mod|pom.xml|Gemfile|Cargo.toml|composer.json|server.csproj)$/.test(f))
  return markers.map((marker) => {
    const dir = path.dirname(marker) === '.' ? '.' : path.dirname(marker)
    let kind = path.basename(marker)
    let name = dir
    if (path.basename(marker) === 'package.json') {
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
    const entry = `${path.relative(repo, file)} — ${signal}`
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

function candidate(title, scope, includedPaths, whyReusable, risks = [], questions = [], estimatedTier = 'strong') {
  return { title, scope, includedPaths: unique(includedPaths).slice(0, 24), excludedPaths: [], whyReusable, estimatedTier, risks: unique(risks), questions: unique(questions) }
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
    if (files.length) c.push(candidate(`${folder} Folder Buildprint`, `Reusable slice under ${folder}/`, files, 'This folder appears to define a major implementation slice or example set.', [], ['Should this folder be extracted as one Buildprint or split further?'], 'basic'))
  }
  const tierRank = { 'agent-grade': 0, strong: 1, basic: 2 }
  return c.sort((a, b) => (tierRank[a.estimatedTier] ?? 9) - (tierRank[b.estimatedTier] ?? 9)).slice(0, 10)
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

function writeMappedPackageExtras(out, facts, confidence, questions) {
  fs.mkdirSync(path.join(out, 'plans'), { recursive: true })
  const packageTier = facts.risky.length >= 2 || facts.apis.length + facts.routes.length > 12 || facts.integrations.length >= 2 ? 'agent-grade' : facts.apis.length || facts.routes.length || facts.integrations.length ? 'strong' : 'simple'
  const observedAnchor = 'This package maps an existing repository. Preserve observed behavior unless the user confirms a change. Separate observed facts, inferred behavior, and unknowns.'
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
    '## Target shape',
    '',
    'Keep the current stack and architecture unless the user explicitly asks for a migration.',
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
    '- Interface/data contracts: `CONTRACTS.md`',
    '- Risk-to-test map: `TEST_MATRIX.md`',
    '- Confidence report: `confidence-report.md`',
    '- Review questions: `questions.md`',
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
    '00-review-facts.md': '# Phase 00 — Review Facts\n\nRead `facts.json`, `discovered-map.md`, and `confidence-report.md`.\n\nExit: observed facts understood; no code changed.\n',
    '01-confirm-unknowns.md': '# Phase 01 — Confirm Unknowns\n\nAsk the questions in `questions.md` before changing low-confidence areas.\n\nExit: answers captured or blockers recorded in `VALIDATION.md`.\n',
    '02-safe-change-plan.md': '# Phase 02 — Safe Change Plan\n\nPlan the smallest safe change. Identify affected routes, APIs, data models, integrations, and tests.\n\nExit: change scope and required tests are clear.\n',
    '03-implementation.md': '# Phase 03 — Implementation\n\nImplement only the confirmed change. Preserve observed stack and behavior unless explicitly changed.\n\nExit: code updated and Buildprint artifacts updated if architecture changed.\n',
    '04-tests-validation.md': '# Phase 04 — Tests and Validation\n\nRun relevant test/build/lint commands. Fill `VALIDATION.md` from `VALIDATION_TEMPLATE.md`.\n\nExit: results and remaining blockers are documented.\n',
  }

  fs.writeFileSync(path.join(out, 'BUILDPRINT.md'), buildprintMd)
  fs.writeFileSync(path.join(out, 'SPEC.md'), specMd)
  fs.writeFileSync(path.join(out, 'PLAN.md'), planMd)
  fs.writeFileSync(path.join(out, 'CONTRACTS.md'), contractsMd)
  fs.writeFileSync(path.join(out, 'TEST_MATRIX.md'), testMatrixMd)
  fs.writeFileSync(path.join(out, 'VALIDATION_TEMPLATE.md'), validationTemplateMd)
  fs.writeFileSync(path.join(out, 'questions.md'), questionsMd)
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
  fs.writeFileSync(path.join(stateDir, 'next-agent.md'), `# Next Agent Instructions\n\nStart here.\n\n1. Read \`.buildprint/source.json\`.\n2. Read \`.buildprint/state.json\`.\n3. Read \`.buildprint/snapshots/BUILDPRINT.md\`.\n4. Read \`.buildprint/snapshots/PLAN.md\` if present.\n5. Continue current phase: \`00-alignment\`.\n\nRules:\n\n- Snapshot files were downloaded exactly from the manifest. Do not rewrite them manually.\n- Update \`.buildprint/state.json\`, \`.buildprint/progress.md\`, and this file before stopping.\n- If blocked, update \`.buildprint/blockers.md\`.\n`)

  console.log(`✓ Created ${stateDir}`)
  console.log(`✓ Downloaded ${downloaded.length} snapshot files`)
  console.log('✓ Wrote source.json, state.json, progress.md, decisions.md, blockers.md, next-agent.md')
  console.log('\nNext: read .buildprint/next-agent.md')
}

if (args.length === 0 || isHelp(args[0])) usage(0)



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
