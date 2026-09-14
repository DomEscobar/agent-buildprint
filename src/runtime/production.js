// Read-only adapter for the pinned isometric-visual-loop production receipt format.
// Mirrors production_flow.py inputs/collect and verify-world.py protected records.
// Never runs a manifest/framework script; byte-linked claims are not pixel review.
import fs from 'node:fs'
import path from 'node:path'
import { bytes, hash, inside, insist, readJson, relative } from './io.js'

export const productionStages = ['preflight', 'layout', 'assembly', 'static', 'motion', 'final']
const object = value => value && typeof value === 'object' && !Array.isArray(value)
const nonempty = value => typeof value === 'string' && value.trim().length > 0
const same = (a, b) => object(a) && object(b) && Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(k => a[k] === b[k])
const digest = file => hash(bytes(file, 256 * 1024 * 1024))
function protectedFiles(root, expected, actual, label) {
  insist(object(actual) && same(expected, actual), `production ${label} binding changed or incomplete`)
  for (const [file, sha] of Object.entries(actual)) {
    const rel = path.relative(root, file)
    insist(inside(root, rel) === file && digest(file) === sha, `production ${label} stale`)
  }
}
function fileMap(root, names) {
  insist(Array.isArray(names) && names.length > 0 && names.length <= 500, 'production check needs bounded inputs')
  const result = {}; let total = 0
  function walk(rel) {
    const file = inside(root, rel); const stat = fs.lstatSync(file)
    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(file).sort()) walk(`${rel}/${child}`)
    } else {
      const raw = bytes(file, 256 * 1024 * 1024); total += raw.length
      insist(total <= 1024 * 1024 * 1024 && Object.keys(result).length < 20000, 'production input inventory limit exceeded')
      result[rel] = hash(raw)
    }
  }
  names.forEach(name => walk(relative(name)))
  insist(Object.keys(result).length > 0, 'production check has no source files')
  return result
}
export function productionPlan(root, definition) {
  const config = definition.productionEvidence
  const planFile = inside(root, definition.acceptancePlan)
  const plan = readJson(planFile)
  const baselineFile = inside(root, config.baseline); const baseline = readJson(baselineFile)
  insist(plan.version === 3 && plan.contract === 'PROJECT_CONTRACT.md' && path.resolve(path.dirname(planFile), plan.root || '.') === root, 'production plan must resolve to sole project contract')
  insist(baseline.version === 1 && baseline.plan === planFile && baseline.planSha256 === digest(planFile), 'production baseline plan identity/hash mismatch')
  insist(Array.isArray(plan.artChecks) && Array.isArray(plan.comparisons), 'production protected art/references required')
  const specFiles = plan.artChecks.map(p => inside(root, p))
  const refFiles = plan.comparisons.map(c => inside(root, c.reference))
  protectedFiles(root, Object.fromEntries(specFiles.map(p => [p, digest(p)])), baseline.artSpecs, 'art specs')
  protectedFiles(root, Object.fromEntries(refFiles.map(p => [p, digest(p)])), baseline.references, 'references')
  const contract = inside(root, 'PROJECT_CONTRACT.md')
  protectedFiles(root, { [contract]: digest(contract) }, baseline.contract, 'contract')
  insist(plan.production?.version === 1 && Array.isArray(plan.production.checks) && plan.production.checks.length > 0 && plan.production.checks.length <= 500, 'production v1 checks required')
  insist(Array.isArray(plan.inputRoots) && plan.inputRoots.length > 0, 'production input roots required')
  const roots = plan.inputRoots.map(p => relative(p)); const ids = new Set()
  for (const check of plan.production.checks) {
    insist(nonempty(check.id) && !ids.has(check.id), 'production check identity duplicate/invalid'); ids.add(check.id)
    insist(productionStages.includes(check.stage) && ['review', 'layout', 'art'].includes(check.method), 'production check stage/method invalid')
    insist(Array.isArray(check.inputs) && check.inputs.length > 0 && check.inputs.every(p => { relative(p); return roots.some(r => p === r || p.startsWith(`${r}/`)) }), 'production check inputs outside protected roots')
    insist(Array.isArray(check.requirements) && check.requirements.length > 0 && check.requirements.every(id => plan.requirements?.some(r => r.id === id)), 'production check requirement identity invalid')
    insist(Array.isArray(check.views) && check.views.length > 0 && check.views.every(nonempty), 'production check views required')
    insist(['measurement', 'image', 'motion'].includes(check.evidenceKind), 'production evidence kind invalid')
    if (check.method === 'review' && ['assembly', 'static', 'final'].includes(check.stage)) insist(check.evidenceKind === 'image', 'production assembly/static/final review requires images')
  }
  // Do not allow evidence storage inside source roots (self-invalidating evidence).
  for (const output of [config.baseline, config.receipts]) insist(!roots.some(r => output === r || output.startsWith(`${r}/`)), 'production outputs must be outside input roots')
  return { plan, baselineHash: digest(baselineFile) }
}
export function productionCurrent(root, definition, loop) {
  if (!loop.productionStages?.length) return []
  const { plan, baselineHash } = productionPlan(root, definition)
  const checks = plan.production.checks.filter(c => loop.productionStages.includes(c.stage))
  for (const stage of loop.productionStages) insist(checks.some(c => c.stage === stage), `production stage missing from plan: ${stage}`)
  if (loop.productionStages.includes('layout')) insist(checks.some(c => c.stage === 'layout' && c.method === 'layout'), 'production layout checker missing')
  if (loop.productionStages.includes('assembly')) {
    insist(checks.some(c => c.stage === 'assembly' && c.method === 'review'), 'production representative assembly review missing')
    if (plan.production.rigidAssets?.length) insist(checks.some(c => c.stage === 'assembly' && c.method === 'art'), 'production rigid assembly check missing')
  }
  const directory = inside(root, definition.productionEvidence.receipts)
  insist(fs.existsSync(directory) && fs.statSync(directory).isDirectory(), 'production receipt directory missing')
  const files = fs.readdirSync(directory).filter(n => n.endsWith('.json')).sort()
  insist(files.length <= 2000, 'production receipt inventory limit exceeded')
  const latest = new Map()
  for (const name of files) {
    const file = inside(directory, name); const receipt = readJson(file)
    if (receipt.kind !== 'production-receipt' || receipt.baselineSha256 !== baselineHash) continue
    insist(plan.production.checks.some(c => c.id === receipt.check), 'production receipt names unknown check')
    insist(nonempty(receipt.completedAt) && Number.isFinite(Date.parse(receipt.completedAt)), 'production receipt completion time invalid')
    const prior = latest.get(receipt.check)
    insist(!prior || prior.receipt.completedAt !== receipt.completedAt, 'production receipts have ambiguous completion time')
    if (!prior || receipt.completedAt > prior.receipt.completedAt) latest.set(receipt.check, { receipt, file })
  }
  return checks.map(check => {
    const found = latest.get(check.id)
    insist(found, `production receipt missing: ${check.id}`)
    const { receipt, file } = found
    insist(receipt.status === 'pass', `production check ${check.id} is ${receipt.status || 'invalid'}, not pass`)
    insist(nonempty(receipt.startedAt) && Number.isFinite(Date.parse(receipt.startedAt)) && Date.parse(receipt.completedAt) >= Date.parse(receipt.startedAt) && /^[a-f0-9]{64}$/.test(receipt.ticketSha256) && nonempty(receipt.reviewer) && nonempty(receipt.observed), `production receipt incomplete: ${check.id}`)
    insist(same(receipt.inputs, fileMap(root, check.inputs)), `production inputs stale: ${check.id}`)
    if (check.method !== 'review') insist(receipt.automatic?.passed === true, `production automatic check did not pass: ${check.id}`)
    insist(Array.isArray(receipt.evidence) && receipt.evidence.length > 0 && receipt.evidence.length <= 100, `production evidence missing: ${check.id}`)
    const extensions = { image: ['.png', '.jpg', '.jpeg', '.webp'], motion: ['.webm', '.mp4', '.gif'], measurement: ['.json', '.txt'] }
    for (const item of receipt.evidence) {
      const evidenceFile = inside(root, item.path); const raw = bytes(evidenceFile, 256 * 1024 * 1024)
      insist(raw.length > 0 && hash(raw) === item.sha256 && extensions[check.evidenceKind].includes(path.extname(evidenceFile).toLowerCase()), `production evidence changed/invalid: ${check.id}`)
    }
    insist(check.views.every(view => receipt.evidence.some(e => e.view === view)), `production evidence views incomplete: ${check.id}`)
    return { check: check.id, path: path.relative(root, file), sha256: digest(file) }
  })
}
