import fs from 'node:fs'
import path from 'node:path'
import { LIMIT, hash, jsonBytes, insist, relative, safeAbsolute, inside, bytes, readJson, put, atomicJson, locked, syncDir } from './io.js'

export const STATE_SCHEMA = 'agb/state/v2'
const now = () => new Date().toISOString()
const identifier = value => typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,95}$/.test(value)
const text = value => typeof value === 'string' && value.trim().length >= 3 && value.length <= 12000
export function definitionCheck(definition, entries) {
  insist(definition?.schema === 'agb/loops/v2' && Array.isArray(definition.loops) && definition.loops.length > 0 && definition.loops.length <= 100, 'invalid loops/v2 definition')
  const ids = new Set()
  insist(Array.isArray(definition.approvals) && definition.approvals.every(identifier), 'invalid approval identifiers')
  insist(Array.isArray(definition.bindingFiles) && definition.bindingFiles.includes('PROJECT_CONTRACT.md'), 'bindingFiles must include the single PROJECT_CONTRACT.md')
  definition.bindingFiles.forEach(relative)
  if (definition.acceptancePlan) relative(definition.acceptancePlan)
  if (definition.runtimeRoots) { insist(Array.isArray(definition.runtimeRoots), 'runtimeRoots must be an array'); definition.runtimeRoots.forEach(relative) }
  for (const loop of definition.loops) {
    insist(identifier(loop.id) && !ids.has(loop.id), 'duplicate/invalid loop id'); ids.add(loop.id)
    insist(entries.some(e => e.path === relative(loop.file)), `missing loop file: ${loop.file}`)
    insist(Array.isArray(loop.dependsOn) && loop.dependsOn.every(id => ids.has(id) && id !== loop.id), 'dependencies must precede loop; cycles/unknown IDs refused')
    insist(Array.isArray(loop.approvals) && loop.approvals.every(id => definition.approvals.includes(id)), 'unknown loop approval')
    insist(Array.isArray(loop.acceptance) && loop.acceptance.length > 0 && new Set(loop.acceptance).size === loop.acceptance.length && loop.acceptance.every(x => ['implemented', 'functional', 'visual'].includes(x)), 'invalid acceptance dimensions')
    insist(Array.isArray(loop.requirements) && loop.requirements.length > 0 && loop.requirements.every(identifier), 'loop needs contract coverage requirement identifiers')
    insist(typeof loop.independentReview === 'boolean', 'independentReview must be explicit')
    if (loop.fullCoverage) insist(definition.acceptancePlan, 'fullCoverage requires an upstream acceptancePlan')
  }
  return definition
}
export function initialize(dir, source) {
  const definitionPath = relative(source.manifest.runtime.definition)
  const definitionEntry = source.entries.find(e => e.path === definitionPath)
  insist(definitionEntry, 'runtime definition missing from files')
  const definition = definitionCheck(JSON.parse(definitionEntry.payload.toString('utf8')), source.entries)
  const state = { schema: STATE_SCHEMA, revision: 0, previous: null, createdAt: now(), updatedAt: now(), manifestSha256: source.digest,
    sourceSha256: hash(bytes(inside(dir, 'source.json'))),
    inventory: source.entries.map(({ path, sha256, bytes }) => ({ path, sha256, bytes })), definition,
    activeLoop: definition.loops[0].id, generation: 0, approvals: {}, candidate: null, evidence: [], defects: [], returns: [], history: [],
    loops: Object.fromEntries(definition.loops.map(l => [l.id, { status: 'pending', acceptance: {} }])) }
  commit(dir, state)
}
function commit(dir, state) {
  const value = jsonBytes(state); insist(value.length <= LIMIT && state.revision < 10000, 'state/history capacity exceeded; no commit performed'); const digest = hash(value)
  const name = `revisions/${String(state.revision).padStart(8, '0')}-${digest}.json`
  const file = inside(dir, name)
  // An orphan revision from a crash is harmless; never overwrite it.
  if (fs.existsSync(file)) insist(hash(bytes(file)) === digest, 'revision collision')
  else put(file, value)
  syncDir(path.dirname(file))
  atomicJson(inside(dir, 'HEAD.json'), { schema: STATE_SCHEMA, revision: state.revision, file: name, sha256: digest })
}
export function load(project) {
  const root = safeAbsolute(project); const dir = inside(root, '.buildprint')
  const head = readJson(inside(dir, 'HEAD.json'))
  insist(head.schema === STATE_SCHEMA && Number.isSafeInteger(head.revision) && head.revision >= 0, 'unsupported/corrupt state HEAD')
  insist(head.file === `revisions/${String(head.revision).padStart(8, '0')}-${head.sha256}.json`, 'invalid HEAD revision path')
  let cursor = head; let state
  for (let count = 0; cursor; count++) {
    insist(count < 10000, 'revision history limit reached')
    const raw = bytes(inside(dir, cursor.file))
    insist(hash(raw) === cursor.sha256, 'state integrity mismatch')
    const item = JSON.parse(raw)
    insist(item.schema === STATE_SCHEMA && item.revision === cursor.revision, 'state schema/revision mismatch')
    if (!state) state = item
    if (item.revision === 0) insist(item.previous === null, 'invalid initial revision')
    else insist(item.previous && item.previous.revision === item.revision - 1 && item.previous.file === `revisions/${String(item.previous.revision).padStart(8, '0')}-${item.previous.sha256}.json`, 'broken history chain')
    cursor = item.previous
  }
  insist(hash(bytes(inside(dir, 'source.json'))) === state.sourceSha256, 'source provenance record changed')
  for (const item of state.inventory) insist(hash(bytes(inside(dir, `snapshots/${item.path}`))) === item.sha256, `snapshot changed: ${item.path}`)
  definitionCheck(state.definition, state.inventory)
  return { root, dir, head, state }
}
export async function mutate(project, expectedRevision, action, change) {
  const root = safeAbsolute(project)
  load(root) // Invalid/non-v2 projects must not acquire a lock or create .buildprint.
  return locked(inside(root, '.buildprint/write.lock'), async () => {
    const context = load(root)
    insist(Number.isSafeInteger(expectedRevision) && expectedRevision === context.state.revision, `revision conflict; current revision ${context.state.revision}`)
    const result = await change(context)
    context.state.previous = context.head
    context.state.revision++
    context.state.updatedAt = now()
    context.state.history.push({ action, at: now() })
    commit(context.dir, context.state)
    return { revision: context.state.revision, result }
  })
}
function fingerprintRoot(root) {
  const files = []; let total = 0
  function walk(dir, prefix = '') {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
      if (['.git', '.buildprint', '.game-quality', 'node_modules'].includes(entry.name) && !prefix) continue
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name
      const full = inside(root, rel)
      insist(!entry.isSymbolicLink(), `symlink in candidate inputs: ${rel}`)
      if (entry.isDirectory()) walk(full, rel)
      else {
        insist(files.length < 20000, 'candidate has too many files')
        const raw = bytes(full, 256 * 1024 * 1024); total += raw.length
        insist(total <= 1024 * 1024 * 1024, 'candidate exceeds 1 GiB')
        files.push({ path: rel, sha256: hash(raw) })
      }
    }
  }
  walk(root)
  return { sha256: hash(jsonBytes(files)), files }
}
function contractHash(root) { return hash(bytes(inside(root, 'PROJECT_CONTRACT.md'))) }
function loopFor(state, id = state.activeLoop) { const loop = state.definition.loops.find(l => l.id === id); insist(loop, 'unknown loop'); return loop }
function approvalsCurrent(root, state, loop) {
  const contract = contractHash(root)
  for (const id of loop.approvals) insist(state.approvals[id]?.contractSha256 === contract && state.approvals[id]?.decision === 'approved', `missing/stale approval: ${id}`)
}
function eligible(root, state, loop, visited = new Set()) {
  if (visited.has(loop.id)) return
  visited.add(loop.id)
  approvalsCurrent(root, state, loop)
  for (const id of loop.dependsOn) {
    insist(state.loops[id].status === 'complete', `incomplete prerequisite: ${id}`)
    const dependency = loopFor(state, id)
    approvalsCurrent(root, state, dependency)
    for (const dimension of dependency.acceptance) {
      const accepted = state.loops[id].acceptance[dimension]
      insist(accepted, `prerequisite ${id} missing ${dimension} attestation`)
      const record = state.evidence.find(e => e.id === accepted.evidence)
      evidenceCurrent(root, state, record)
    }
    // Require the complete ancestor chain, not only the immediately previous loop.
    eligible(root, state, dependency, visited)
  }
  insist(!state.returns.some(r => r.status === 'open'), 'resolve the open alignment/setup/identity return first')
  insist(!state.defects.some(d => d.status === 'open'), 'open defects block acceptance and progression')
}
function currentCandidate(root, state) {
  insist(state.candidate && state.candidate.generation === state.generation, 'bind a fresh candidate first')
  insist(fingerprintRoot(root).sha256 === state.candidate.projectSha256, 'candidate stale: project/build/assets changed; bind fresh inputs and recapture')
  for (const item of state.candidate.runtimeRoots) insist(fingerprintRoot(inside(root, item.path)).sha256 === item.sha256, `installed runtime stale: ${item.path}`)
  for (const file of state.candidate.boundFiles) insist(hash(bytes(inside(root, file.path), 256 * 1024 * 1024)) === file.sha256, `candidate binding stale: ${file.path}`)
  return state.candidate
}
function evidenceCurrent(root, state, record) {
  insist(record && record.candidate === currentCandidate(root, state).id && record.generation === state.generation, 'stale evidence')
  for (const artifact of record.artifacts) insist(hash(bytes(inside(root, artifact.path), 256 * 1024 * 1024)) === artifact.sha256, `evidence changed: ${artifact.path}`)
}
function invalidate(state, id, reason) {
  const affected = new Set([id])
  for (const loop of state.definition.loops) if (loop.dependsOn.some(dep => affected.has(dep))) affected.add(loop.id)
  for (const loopId of affected) state.loops[loopId] = { status: 'pending', acceptance: {} }
  state.activeLoop = id; state.generation++; state.candidate = null
  state.history.push({ action: 'invalidate', loops: [...affected], reason, at: now() })
}
export function status(project) {
  const { root, state } = load(project)
  let candidateStatus = 'missing'
  if (state.candidate) { try { currentCandidate(root, state); candidateStatus = 'current' } catch (error) { candidateStatus = error.message } }
  const eligibility = {}
  for (const loop of state.definition.loops) { try { eligible(root, state, loop); eligibility[loop.id] = 'eligible' } catch (error) { eligibility[loop.id] = error.message } }
  const acceptanceFreshness = {}
  for (const loop of state.definition.loops) {
    acceptanceFreshness[loop.id] = {}
    for (const [dimension, accepted] of Object.entries(state.loops[loop.id].acceptance)) {
      try { evidenceCurrent(root, state, state.evidence.find(e => e.id === accepted.evidence)); acceptanceFreshness[loop.id][dimension] = 'current byte-bound attestation' }
      catch (error) { acceptanceFreshness[loop.id][dimension] = `historical/stale: ${error.message}` }
    }
  }
  return { ...state, candidateStatus, eligibility, acceptanceFreshness, claimCeiling: 'Recorded attestations only; integrity/eligibility checks do not verify execution, pixels, completeness, approval authority, or reviewer independence.' }
}
export function next(project) {
  const { root, dir, state } = load(project)
  if (state.activeLoop === null) return 'All loops recorded complete; inspect agb state status for current evidence and claim limitations.'
  const loop = loopFor(state)
  // Reading the next work is allowed even while blocked. This never advances anything.
  let blocker = ''
  try { eligible(root, state, loop) } catch (error) { blocker = `\nBlocked: ${error.message}\n` }
  return `Revision ${state.revision}; loop ${loop.id}; ${state.loops[loop.id].status}${blocker}\n${bytes(inside(dir, `snapshots/${loop.file}`)).toString('utf8')}`
}
export function operation(context, action, receipt) {
  const { root, state } = context
  insist(receipt && typeof receipt === 'object' && !Array.isArray(receipt) && receipt.schema === 'agb/receipt/v2', 'agb/receipt/v2 JSON object required')
  if (action === 'approve') {
    insist(state.definition.approvals.includes(receipt.id) && ['approved', 'denied'].includes(receipt.decision) && text(receipt.actor) && text(receipt.basis), 'approval needs known id, decision, actor and explicit authorization basis')
    insist(receipt.contractSha256 === contractHash(root), 'approval must name current contract SHA-256')
    state.approvals[receipt.id] = { ...receipt, at: now(), authority: 'recorded claim; not authenticated' }
    return 'Approval recorded; no commands or paid operations authorized by the CLI itself.'
  }
  if (action === 'bind') {
    insist(text(receipt.buildCommand) && text(receipt.servedUrl) && text(receipt.sourceToBuild) && Array.isArray(receipt.buildFiles) && receipt.buildFiles.length > 0 && Array.isArray(receipt.runtimeFiles) && receipt.runtimeFiles.length > 0, 'bind requires actual buildCommand, servedUrl, sourceToBuild observation, buildFiles and runtimeFiles')
    const served = new URL(receipt.servedUrl)
    insist(['http:', 'https:'].includes(served.protocol) && !served.username && !served.password, 'servedUrl must be credential-free HTTP(S); never store secrets in receipts')
    const inventory = fingerprintRoot(root)
    let plan = null
    if (state.definition.acceptancePlan) {
      plan = readJson(inside(root, state.definition.acceptancePlan))
      insist(plan.version === 3 && plan.contract === 'PROJECT_CONTRACT.md' && path.resolve(path.dirname(inside(root, state.definition.acceptancePlan)), plan.root || '.') === root, 'upstream v3 acceptance plan must resolve to this project and sole contract')
      insist(Array.isArray(plan.requirements) && plan.requirements.length > 0 && plan.requirements.every(r => identifier(r.id) && Array.isArray(r.views) && r.views.length > 0 && r.views.every(identifier)), 'acceptance plan needs requirement IDs and protected views')
      insist(new Set(plan.requirements.map(r => r.id)).size === plan.requirements.length, 'duplicate plan requirement IDs')
      insist(Array.isArray(plan.comparisons) && plan.comparisons.length > 0, 'acceptance plan needs retained original comparison references')
    }
    const names = [...new Set([...state.definition.bindingFiles, ...(plan ? [state.definition.acceptancePlan, ...plan.comparisons.map(c => relative(c.reference))] : []), ...receipt.buildFiles, ...receipt.runtimeFiles])]
    insist(names.length <= 500, 'too many binding files')
    for (const file of receipt.buildFiles) insist(inventory.files.some(f => f.path === file), 'buildFiles must be within fingerprinted project inputs')
    const boundFiles = names.map(file => ({ path: relative(file), sha256: hash(bytes(inside(root, file), 256 * 1024 * 1024)) }))
    const runtimeRoots = (state.definition.runtimeRoots || []).map(file => ({ path: file, sha256: fingerprintRoot(inside(root, file)).sha256 }))
    state.generation++
    state.candidate = { id: hash(jsonBytes({ inventory: inventory.sha256, boundFiles, runtimeRoots, generation: state.generation })), generation: state.generation, projectSha256: inventory.sha256, boundFiles, runtimeRoots, reviewMode: plan?.reviewMode || null, planRequirements: plan?.requirements || [], buildClaim: receipt, at: now() }
    // Keep completed milestones as historical attestations, explicitly stale in status.
    // Active work never inherits acceptance across candidates.
    for (const value of Object.values(state.loops)) if (value.status !== 'complete') value.acceptance = {}
    return state.candidate
  }
  if (action === 'evidence') {
    const candidate = currentCandidate(root, state)
    insist(identifier(receipt.loop), 'explicit loop id required')
    const loop = loopFor(state, receipt.loop)
    approvalsCurrent(root, state, loop)
    insist(['active', 'complete'].includes(state.loops[loop.id].status) || state.defects.some(d => d.loop === loop.id && d.status === 'open'), 'begin loop before recording evidence (except open-defect repair)')
    insist(identifier(receipt.id) && !state.evidence.some(e => e.id === receipt.id), 'evidence id must be unique')
    insist(receipt.candidate === candidate.id && receipt.generation === state.generation, 'receipt must explicitly name current candidate and generation')
    insist(loop.acceptance.includes(receipt.dimension) && ['pass', 'fail', 'unverified'].includes(receipt.verdict), 'invalid evidence dimension/verdict')
    insist(Array.isArray(receipt.coverage) && loop.requirements.every(id => receipt.coverage.some(c => c.requirement === id && ['pass', 'fail', 'unverified'].includes(c.verdict) && text(c.observation))), 'evidence requires per-requirement verdict and observations')
    insist(receipt.verdict !== 'pass' || receipt.coverage.every(c => c.verdict === 'pass'), 'passing receipt contains non-pass requirement')
    if (loop.fullCoverage) for (const requirement of candidate.planRequirements) {
      const coverage = receipt.coverage.find(c => c.requirement === requirement.id)
      insist(coverage && Array.isArray(coverage.views) && requirement.views.every(id => coverage.views.some(v => v.id === id && ['pass', 'fail', 'unverified'].includes(v.verdict) && text(v.observation))), `missing protected requirement/view coverage: ${requirement.id}`)
      if (receipt.verdict === 'pass') insist(coverage.views.every(v => v.verdict === 'pass'), 'passing receipt has non-pass protected view')
    }

    const passing = receipt.verdict === 'pass'
    insist(Array.isArray(receipt.artifacts) && receipt.artifacts.length <= 100 && (receipt.artifacts.length > 0 || (!passing && text(receipt.capabilityGap))), 'evidence artifacts required; unavailable evidence needs explicit capabilityGap and non-pass verdict')
    const kinds = new Set(receipt.artifacts.map(a => a.kind))
    const required = { implemented: ['source'], functional: ['runtime', 'interaction'], visual: ['running-capture', 'motion', 'interaction', 'review'] }[receipt.dimension]
    insist(required.every(k => kinds.has(k)) || (!passing && text(receipt.capabilityGap)), `required artifact kinds: ${required.join(', ')}`)
    if (passing && receipt.dimension === 'visual' && state.definition.acceptancePlan) insist(kinds.has('production-receipt'), 'visual acceptance must link actual upstream production receipt')
    if (passing && loop.fullCoverage && ['visual', 'functional'].includes(receipt.dimension)) {
      const views = new Set(candidate.planRequirements.flatMap(r => r.views))
      const viewKinds = receipt.dimension === 'visual' ? ['running-capture', 'motion', 'interaction'] : ['runtime', 'interaction']
      for (const view of views) for (const kind of viewKinds) insist(receipt.artifacts.some(a => a.view === view && a.kind === kind), `missing ${kind} artifact for protected view: ${view}`)
    }

    for (const artifact of receipt.artifacts) {
      insist(text(artifact.observation) && /^[a-f0-9]{64}$/.test(artifact.sha256), 'artifact needs observation and explicit SHA-256')
      const raw = bytes(inside(root, artifact.path), 256 * 1024 * 1024)
      insist(hash(raw) === artifact.sha256, 'artifact SHA-256 mismatch')
      if (artifact.kind === 'running-capture') insist(raw.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) || raw.subarray(0, 3).equals(Buffer.from([255,216,255])) || (raw.toString('ascii', 0, 4) === 'RIFF' && raw.toString('ascii', 8, 12) === 'WEBP'), 'capture needs PNG/JPEG/WebP bytes; this is not pixel or live-build verification')
      if (artifact.kind === 'motion') insist(raw.toString('ascii', 4, 8) === 'ftyp' || raw.subarray(0, 4).equals(Buffer.from([26,69,223,163])) || /^GIF8[79]a/.test(raw.toString('ascii', 0, 6)), 'motion needs MP4/WebM/GIF media, not a timed still list; playback is not verified by CLI')
    }
    insist(text(receipt.actor) && text(receipt.method) && (text(receipt.executedAt) || (!passing && receipt.executedAt === null && text(receipt.capabilityGap))), 'actor, method and actual executedAt required; unexecuted non-pass records need null time and capabilityGap')
    if (receipt.dimension === 'visual' && (passing || !text(receipt.capabilityGap))) {
      insist(text(receipt.runningBuildObservation) && text(receipt.viewportAndState) && receipt.review && text(receipt.review.actor) && text(receipt.review.observation) && ['independent', 'self', 'unavailable'].includes(receipt.review.mode), 'visual evidence needs running-build, viewport/state and actual review claims')
      if (receipt.verdict === 'pass') insist(receipt.review.mode !== 'unavailable' && (!(loop.independentReview || candidate.reviewMode === 'independent') || receipt.review.mode === 'independent'), 'required reviewer capability unavailable; record unverified')
    }
    if (receipt.verdict === 'fail') {
      insist(Array.isArray(receipt.findings) && receipt.findings.length > 0 && receipt.findings.length <= 100, 'failed evidence needs concrete findings to route repairs')
      for (const finding of receipt.findings) {
        insist(identifier(finding.id) && !state.defects.some(d => d.id === finding.id) && text(finding.description), 'failure findings need unique id and description')
        state.defects.push({ id: finding.id, description: finding.description, loop: loop.id, dimension: receipt.dimension, status: 'open', openedGeneration: state.generation, evidence: receipt.id, at: now() })
      }
    }
    delete state.loops[loop.id].acceptance[receipt.dimension]
    if (receipt.verdict === 'fail' || (state.loops[loop.id].status === 'complete' && receipt.verdict !== 'pass')) invalidate(state, loop.id, `new ${receipt.verdict} evidence: ${receipt.id}`)
    state.evidence.push({ ...receipt, at: now(), verification: 'bytes bound; execution and review are recorded claims, not authenticated facts' })
    return receipt.id
  }
  if (action === 'defect') {
    insist(identifier(receipt.loop) && ['implemented', 'functional', 'visual'].includes(receipt.dimension), 'defect needs loop and acceptance dimension')
    const loop = loopFor(state, receipt.loop)
    insist(identifier(receipt.id) && !state.defects.some(d => d.id === receipt.id) && text(receipt.description), 'unique defect id, loop and description required')
    state.defects.push({ ...receipt, status: 'open', openedGeneration: state.generation, at: now() })
    invalidate(state, loop.id, receipt.description); return receipt.id
  }
  if (action === 'resolve-defect') {
    const defect = state.defects.find(d => d.id === receipt.id && d.status === 'open')
    insist(defect && text(receipt.fix) && Array.isArray(receipt.evidence) && receipt.evidence.length > 0, 'open defect, actual fix and fresh evidence required')
    for (const id of receipt.evidence) {
      const evidence = state.evidence.find(e => e.id === id)
      insist(evidence && evidence.loop === defect.loop && evidence.dimension === defect.dimension && evidence.verdict === 'pass' && evidence.generation > defect.openedGeneration, 'resolution needs fresh passing evidence for defective loop')
      evidenceCurrent(root, state, evidence)
      insist(state.evidence.filter(e => e.loop === defect.loop && e.dimension === defect.dimension && e.candidate === evidence.candidate).at(-1)?.id === evidence.id, 'newer evidence supersedes defect resolution')
    }
    defect.status = 'resolved'; defect.resolution = { ...receipt, at: now() }; return receipt.id
  }
  if (action === 'return') {
    insist(['alignment', 'setup', 'identity'].includes(receipt.target) && identifier(receipt.id) && !state.returns.some(r => r.id === receipt.id) && text(receipt.reason), 'return requires unique id, target alignment/setup/identity and reason')
    insist(identifier(receipt.loop), 'return needs explicit affected loop')
    const loop = loopFor(state, receipt.loop)
    state.returns.push({ ...receipt, status: 'open', at: now() }); invalidate(state, loop.id, receipt.reason); return receipt.id
  }
  if (action === 'resolve-return') {
    const item = state.returns.find(r => r.id === receipt.id && r.status === 'open')
    insist(item && text(receipt.resolution) && text(receipt.actor), 'open return, resolution and actor required')
    approvalsCurrent(root, state, loopFor(state, item.loop)); item.status = 'resolved'; item.resolution = { ...receipt, at: now() }; return receipt.id
  }
  insist(identifier(receipt.loop), 'transition requires an explicit loop id')
  const loop = loopFor(state, receipt.loop)
  insist(loop.id === state.activeLoop || (action === 'accept' && state.loops[loop.id].status === 'complete'), 'transition must target active loop (or re-attest completed prerequisite)')
  if (action === 'begin') {
    eligible(root, state, loop); insist(state.loops[loop.id].status === 'pending', 'loop is not pending')
    state.loops[loop.id].status = 'active'; return loop.id
  }
  if (action === 'accept') {
    eligible(root, state, loop); insist(['active', 'complete'].includes(state.loops[loop.id].status), 'begin loop before acceptance')
    const record = state.evidence.find(e => e.id === receipt.evidence)
    insist(record && record.loop === loop.id && record.verdict === 'pass', 'accept needs explicitly selected passing evidence')
    evidenceCurrent(root, state, record)
    const latest = state.evidence.filter(e => e.loop === loop.id && e.dimension === record.dimension && e.candidate === record.candidate).at(-1)
    insist(latest.id === record.id, 'cannot select an older verdict over newer evidence')
    state.loops[loop.id].acceptance[record.dimension] = { evidence: record.id, status: `${record.dimension}_attested`, at: now() }; return state.loops[loop.id].acceptance
  }
  if (action === 'advance') {
    eligible(root, state, loop)
    insist(state.loops[loop.id].status === 'active', 'begin loop before advance')
    for (const dimension of loop.acceptance) {
      const accepted = state.loops[loop.id].acceptance[dimension]
      insist(accepted, `missing explicit ${dimension} acceptance`)
      const record = state.evidence.find(e => e.id === accepted.evidence)
      evidenceCurrent(root, state, record)
      insist(state.evidence.filter(e => e.loop === loop.id && e.dimension === dimension && e.candidate === record.candidate).at(-1)?.id === record.id, 'newer evidence supersedes acceptance')
    }
    state.loops[loop.id].status = 'complete'
    const next = state.definition.loops.find(l => state.loops[l.id].status !== 'complete' && l.dependsOn.every(id => state.loops[id].status === 'complete'))
    state.activeLoop = next?.id || null
    return { completed: loop.id, activeLoop: state.activeLoop, claim: 'attested, not independently verified by CLI' }
  }
  throw new Error(`unknown operation: ${action}`)
}
