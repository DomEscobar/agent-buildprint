#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const cwd = process.cwd()
const args = process.argv.slice(2)

function usage(exitCode = 0) {
  console.log(`Agent Buildprint

Usage:
  agb check <blueprint-folder> [--code <generated-code-folder>]
  agb init langgraph <target-folder>
  agb map <repo-folder> [--out <output-folder>]
  agb start <buildprint-package-json-url-or-file>

Examples:
  agb check ./langgraph
  agb check ./langgraph --code ./my-agent
  agb map ./my-project
  agb map ./my-project --out ./my-project.buildprint
  agb start https://agent-buildprint.com/buildprints/ai-influencer-os/package.json
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
  const ignored = new Set(options.ignored ?? ['node_modules', '.git', 'dist', 'build', '.next', '.astro', 'coverage', '.turbo', '.cache'])
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
  const deps = packageJson ? Object.keys({ ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) }).sort() : []
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

  const routePatterns = [
    /^src\/pages\/(.+)\.(astro|tsx|ts|jsx|js|mdx)$/,
    /^src\/app\/(.+)\/page\.(tsx|ts|jsx|js)$/,
    /^pages\/(.+)\.(tsx|ts|jsx|js)$/,
    /^app\/(.+)\/page\.(tsx|ts|jsx|js)$/,
  ]
  const apiPatterns = [
    /^src\/pages\/api\/(.+)\.(ts|js)$/,
    /^pages\/api\/(.+)\.(ts|js)$/,
    /^src\/app\/api\/(.+)\/route\.(ts|js)$/,
    /^app\/api\/(.+)\/route\.(ts|js)$/,
  ]
  const apis = relFiles.filter((f) => apiPatterns.some((p) => p.test(f))).sort()
  const apiSet = new Set(apis)
  const routes = relFiles.filter((f) => routePatterns.some((p) => p.test(f)) && !apiSet.has(f) && !f.includes('/api/')).sort()
  const tests = relFiles.filter((f) => /(^|\/)(__tests__|tests?|specs?)\/|\.(test|spec)\.[cm]?[tj]sx?$|\.spec\.yaml$/.test(f)).sort()
  const db = relFiles.filter((f) => /(prisma\/schema\.prisma|migrations\/|schema\.sql|drizzle|entities|models)/i.test(f)).sort()
  const deploy = relFiles.filter((f) => /(Dockerfile|docker-compose|compose\.ya?ml|apphosting\.yaml|vercel\.json|netlify\.toml|fly\.toml|render\.yaml|\.github\/workflows)/i.test(f)).sort()

  const integrationNeedles = {
    stripe: ['stripe', '@stripe'],
    email: ['resend', 'nodemailer', 'sendgrid', 'postmark', 'mailgun'],
    ai: ['openai', '@anthropic-ai/sdk', 'genkit', '@google/generative-ai', 'langchain'],
    auth: ['next-auth', '@auth', 'clerk', '@clerk', 'lucia', 'passport', 'firebase'],
    storage: ['s3', '@aws-sdk/client-s3', 'cloudinary', 'uploadthing'],
    analytics: ['posthog', 'plausible', 'mixpanel', 'segment'],
  }
  const integrations = Object.entries(integrationNeedles)
    .filter(([, names]) => names.some((n) => deps.some((d) => d.includes(n))))
    .map(([kind]) => kind)

  const envNames = new Set()
  for (const file of files.filter((f) => /\.[cm]?[tj]sx?$|\.astro$|\.mdx?$/.test(f)).slice(0, 800)) {
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
  if (relFiles.some((f) => /upload|file/i.test(f))) risky.push('file upload / storage')

  return { root: repo, totalFilesScanned: relFiles.length, packageManager: exists(path.join(repo, 'package-lock.json')) ? 'npm' : exists(path.join(repo, 'pnpm-lock.yaml')) ? 'pnpm' : exists(path.join(repo, 'yarn.lock')) ? 'yarn' : 'unknown', packageName: packageJson?.name ?? path.basename(repo), scripts, dependencies: deps, frameworks, routes, apis, tests, db, deploy, integrations, envNames: [...envNames].sort(), risky }
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

function writeMappedBuildprint(repoArg, outArg) {
  const repo = path.resolve(cwd, repoArg)
  if (!exists(repo) || !fs.statSync(repo).isDirectory()) throw new Error(`repo folder missing: ${repo}`)
  const out = path.resolve(cwd, outArg ?? path.join(repo, '.project.buildprint'))
  fs.mkdirSync(out, { recursive: true })
  fs.mkdirSync(path.join(out, 'prompts'), { recursive: true })
  fs.mkdirSync(path.join(out, 'tests'), { recursive: true })
  fs.mkdirSync(path.join(out, 'policies'), { recursive: true })

  const facts = detectProjectFacts(repo)
  const confidence = confidenceFor(facts)
  const questions = []
  if (confidence.permission_model === 'low') questions.push('What is the intended permission model? Which roles may create, update, delete, or invite?')
  if (confidence.data_model === 'low') questions.push('Where is the source of truth for the data model? Database schema, ORM models, or external service?')
  if (facts.risky.includes('payments')) questions.push('What is the intended billing lifecycle and source of truth for subscription/access state?')
  if (facts.risky.includes('external messaging')) questions.push('Which user actions require human approval before email/SMS/external messages are sent?')
  questions.push('Which observed modules are legacy and should not be copied as desired architecture?')

  const discovered = `# Discovered Project Map\n\nProject: ${facts.packageName}\nRoot: ${facts.root}\nFiles scanned: ${facts.totalFilesScanned}\nPackage manager: ${facts.packageManager}\n\n## Frameworks / major capabilities\n${facts.frameworks.length ? facts.frameworks.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Scripts\n${facts.scripts.length ? facts.scripts.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## UI routes/pages\n${facts.routes.length ? facts.routes.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## API routes/endpoints\n${facts.apis.length ? facts.apis.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Data/model files\n${facts.db.length ? facts.db.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Tests\n${facts.tests.length ? facts.tests.slice(0, 80).map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Deploy / ops files\n${facts.deploy.length ? facts.deploy.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Integrations inferred from dependencies\n${facts.integrations.length ? facts.integrations.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Environment variables referenced by name only\n${facts.envNames.length ? facts.envNames.map((x) => `- ${x}`).join('\n') : '- none detected'}\n`;

  const confidenceMd = `# Confidence Report\n\nThe mapper separates deterministic facts from inference. Low-confidence areas must be reviewed before coding agents make changes.\n\n${Object.entries(confidence).map(([k, v]) => `- ${k}: **${v}**`).join('\n')}\n\n## Questions to finalize this Buildprint\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n`;

  const risksMd = `# Risk Report\n\nDetected risk areas:\n\n${facts.risky.length ? facts.risky.map((x) => `- ${x}`).join('\n') : '- none detected'}\n\n## Default guardrails\n\n- Do not copy secret values into the Buildprint.\n- Do not perform external writes without an explicit approval rule.\n- Treat business rules and permissions as low confidence until a human confirms them.\n- Do not treat legacy code as desired architecture without review.\n`;

  const buildprintYaml = `name: ${facts.packageName}-mapped-buildprint\nkind: agent-buildprint/mapped-existing-project\nversion: 0.1.0\nsource_repo: ${facts.root}\ngenerated_by: agb map\n\npurpose: >\n  Architecture contract draft generated from an existing repository. Use this to orient coding agents,\n  identify low-confidence areas, and create checks before future changes.\n\ndiscovered:\n  package_manager: ${facts.packageManager}\n  frameworks:\n${yamlList(facts.frameworks)}\n  integrations:\n${yamlList(facts.integrations)}\n  risk_areas:\n${yamlList(facts.risky)}\n  ui_routes:\n${yamlList(facts.routes.slice(0, 60))}\n  api_routes:\n${yamlList(facts.apis.slice(0, 60))}\n  data_files:\n${yamlList(facts.db.slice(0, 60))}\n  env_names_only:\n${yamlList(facts.envNames)}\n\nconfidence:\n${Object.entries(confidence).map(([k,v]) => `  ${k}: ${v}`).join('\n')}\n\npolicies:\n  secret_values: never_copy\n  low_confidence_business_rules: ask_human\n  external_writes: require_explicit_policy\n  destructive_actions: require_human_approval\n\nquestions:\n${yamlList(questions)}\n\nartifacts:\n  discovered_map: ./discovered-map.md\n  confidence_report: ./confidence-report.md\n  risks: ./risks.md\n  continuation_prompt: ./prompts/continue-building.md\n  architecture_checks: ./tests/architecture.yaml\n`;

  const prompt = `# Continue Building Prompt\n\nYou are working in this existing repository. Before changing code, read:\n\n1. .project.buildprint/discovered-map.md\n2. .project.buildprint/confidence-report.md\n3. .project.buildprint/risks.md\n4. .project.buildprint/buildprint.yaml\n\nRules:\n- Treat high-confidence facts as observed repo structure.\n- Treat low-confidence items as questions, not facts.\n- Do not modify low-confidence business rules or permission logic without asking.\n- Do not copy or expose secret values.\n- Preserve the existing stack unless explicitly asked to migrate.\n- Add or update checks when changing architecture, auth, billing, external writes, or data models.\n`;

  const checks = `name: mapped-project-architecture-checks\nchecks:\n  - id: no-secret-values-in-buildprint\n    rule: Buildprint artifacts must contain env var names only, never secret values.\n  - id: low-confidence-requires-question\n    rule: Low-confidence business rules, permissions, and billing lifecycle require human confirmation before implementation changes.\n  - id: external-writes-need-policy\n    rule: Email, SMS, payment, publishing, delete, and production mutation flows require explicit policy and approval semantics.\n  - id: update-buildprint-on-architecture-change\n    rule: When routes, APIs, data model, auth, or integrations change, update .project.buildprint.\n`;

  fs.writeFileSync(path.join(out, 'facts.json'), JSON.stringify(facts, null, 2) + '\n')
  fs.writeFileSync(path.join(out, 'buildprint.yaml'), buildprintYaml)
  fs.writeFileSync(path.join(out, 'discovered-map.md'), discovered)
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
    '## Unknown contracts',
    '',
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

  const questionsMd = [
    '# Questions',
    '',
    'Answer these before a coding agent changes low-confidence behavior.',
    '',
    questions.map((q, i) => `${i + 1}. ${q}`).join('\n'),
    ''
  ].join('\n')

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

async function startBuildprint(manifestRef) {
  const { json: manifest, baseUrl } = await readJsonFromUrlOrFile(manifestRef)
  if (!manifest.slug || !Array.isArray(manifest.files)) throw new Error('invalid Buildprint package manifest: expected slug and files[]')

  const stateDir = path.join(cwd, '.buildprint')
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

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') usage(0)



if (args[0] === 'start') {
  const manifest = args[1]
  if (!manifest) usage(1)
  try {
    await startBuildprint(manifest)
    process.exit(0)
  } catch (error) {
    console.error(`Start failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'map') {
  const repo = args[1]
  if (!repo) usage(1)
  const outIndex = args.indexOf('--out')
  const out = outIndex >= 0 ? args[outIndex + 1] : null
  try {
    const result = writeMappedBuildprint(repo, out)
    console.log(`Created mapped Buildprint: ${result.out}`)
    console.log(`Files scanned: ${result.facts.totalFilesScanned}`)
    console.log(`Frameworks: ${result.facts.frameworks.join(', ') || 'none detected'}`)
    console.log(`Risk areas: ${result.facts.risky.join(', ') || 'none detected'}`)
    console.log(`Review questions: ${result.questions.length}`)
    process.exit(0)
  } catch (error) {
    console.error(`Map failed: ${error.message}`)
    process.exit(1)
  }
}

if (args[0] === 'check') {
  const folder = args[1]
  if (!folder) usage(1)
  const codeIndex = args.indexOf('--code')
  const code = codeIndex >= 0 ? args[codeIndex + 1] : null
  const ok = printResults(checkBlueprint(folder, { code }))
  process.exit(ok ? 0 : 1)
}

if (args[0] === 'init' && args[1] === 'langgraph') {
  const target = args[2]
  if (!target) usage(1)
  const here = path.dirname(fileURLToPath(import.meta.url))
  const template = path.resolve(here, '../templates/langgraph-agent-contract')
  copyDir(template, path.resolve(cwd, target))
  console.log(`Created LangGraph-style agent contract at ${target}`)
  process.exit(0)
}

usage(1)
