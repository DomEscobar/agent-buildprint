import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { hash, jsonBytes, insist, safeAbsolute, inside, bytes, readJson, put, locked, syncDir, manifestSource } from './io.js'
import { initialize, load } from './state.js'

const PIN = '7542ff68de04ca6ea6736974b54ec5b5dde1cc33'
const TREE = '5363d058a3e15e6025a5a66bda09da343ca5215e'
const git = (repo, args) => execFileSync('git', ['--no-replace-objects', '-c', 'protocol.allow=never', '-c', 'core.hooksPath=/dev/null', '-c', 'core.fsmonitor=false', '-C', repo, ...args], { maxBuffer: 16 * 1024 * 1024, timeout: 30000, env: { ...process.env, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null', GIT_NO_REPLACE_OBJECTS: '1' } })
function scaffold(stage, options, source) {
  insist(options.allowScaffold === true, 'scaffold copy requires explicit --allow-scaffold; no manifest commands are ever executed')
  insist(options.framework && options.archive && /^[a-f0-9]{64}$/.test(options.archiveSha256 || ''), 'scaffold requires --framework, --archive and --archive-sha256')
  const lockEntry = source.entries.find(e => e.path === 'framework-lock.json')
  insist(lockEntry, 'scaffold needs included framework-lock.json')
  const lock = JSON.parse(lockEntry.payload.toString('utf8'))
  insist(lock.commit === PIN && lock.sourceTree === TREE && lock.packageName === 'isometric-framework' && lock.packageVersion === '0.1.0', 'unsupported framework pin/package; adapter is deliberately version-specific')
  const repo = safeAbsolute(options.framework)
  insist(git(repo, ['rev-parse', `${PIN}^{tree}`]).toString().trim() === TREE, 'framework source tree mismatch')
  // Read committed Git blobs, never worktree scripts; no checkout, build, install, hooks or shell.
  const listing = git(repo, ['ls-tree', '-r', '-z', PIN, '--', 'templates/game/']).toString().split('\0').filter(Boolean)
  insist(listing.length > 0 && listing.length <= 100, 'invalid pinned template inventory')
  const templateInventory = []
  for (const row of listing) {
    const [metadata, name] = row.split('\t')
    insist(/^100644 blob [a-f0-9]{40}$/.test(metadata), 'template links/executables/submodules refused')
    const rel = name.slice('templates/game/'.length)
    const dest = rel === 'gitignore' ? '.gitignore' : rel
    if (dest === 'PROJECT_CONTRACT.md' && fs.existsSync(inside(stage, dest))) continue
    const payload = git(repo, ['cat-file', 'blob', metadata.split(' ')[2]])
    put(inside(stage, dest), payload)
    templateInventory.push({ path: dest, sha256: hash(payload) })
  }
  const archive = bytes(safeAbsolute(options.archive), 256 * 1024 * 1024)
  insist(hash(archive) === options.archiveSha256, 'framework archive SHA-256 mismatch')
  const archiveName = 'isometric-framework-0.1.0.tgz'
  put(inside(stage, `vendor/${archiveName}`), archive)
  const manifestFile = inside(stage, 'package.json')
  const manifest = readJson(manifestFile)
  manifest.dependencies['isometric-framework'] = `file:vendor/${archiveName}`
  // This is our newly created private staging file, never an existing user file.
  fs.writeFileSync(manifestFile, jsonBytes(manifest))
  return { adapter: 'isometric-framework/pinned-template-v1', commit: PIN, sourceTree: TREE, templateInventory, archiveSha256: options.archiveSha256,
    execution: 'read-only Git subprocesses and file copies; no manifest/framework/package scripts', archiveClaim: 'Matches operator-supplied digest; NOT proven to be built from pinned source or publisher authenticated.' }
}
function syncTree(root) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const file = inside(root, entry.name)
    if (entry.isDirectory()) syncTree(file)
    else { const fd = fs.openSync(file, 'r'); try { fs.fsyncSync(fd) } finally { fs.closeSync(fd) } }
  }
  syncDir(root)
}
export async function bootstrap(ref, target, options, legacyStart) {
  const root = safeAbsolute(target); const parent = path.dirname(root)
  insist(fs.existsSync(parent) && fs.statSync(parent).isDirectory(), 'target parent must already exist')
  const lockFile = path.join(parent, `.${path.basename(root)}.agb-bootstrap.lock`)
  return locked(lockFile, async () => {
    const existingState = inside(root, '.buildprint')
    if (options.resume) {
      insist(!options.scaffold, 'resume does not rerun scaffold; use start --resume')
      const context = load(root)
      const source = await manifestSource(ref, options.manifestSha256)
      insist(context.state.manifestSha256 === source.digest, 'resume manifest differs; migration is not automatic')
      insist(JSON.stringify(context.state.inventory) === JSON.stringify(source.entries.map(({ path, sha256, bytes }) => ({ path, sha256, bytes }))), 'resume payload differs from pinned snapshot; no automatic refresh')
      return { resumed: true, revision: context.state.revision, activeLoop: context.state.activeLoop }
    }
    insist(!fs.existsSync(existingState), 'existing .buildprint preserved; v2 can use --resume; legacy state needs explicit owner migration')
    const existed = fs.existsSync(root)
    if (existed) insist(fs.statSync(root).isDirectory(), 'target is not a directory')
    let contract = null; let contractDigest = null
    if (options.scaffold && existed) {
      const names = fs.readdirSync(root)
      insist(names.length === 0 || (names.length === 1 && names[0] === 'PROJECT_CONTRACT.md'), 'scaffold target must be absent, empty, or contract-only; no merging existing games')
      if (names.length) { contract = bytes(inside(root, 'PROJECT_CONTRACT.md')); contractDigest = hash(contract) }
    }
    const source = await manifestSource(ref, options.manifestSha256)
    if (options.scaffold) insist(source.manifest.runtime, 'scaffold adapter requires versioned runtime opt-in')
    const stage = fs.mkdtempSync(path.join(parent, `.${path.basename(root)}.agb-stage-`))
    // Failed stages intentionally remain for inspection; never retry by merging them into a target.
    try {
      if (contract) put(inside(stage, 'PROJECT_CONTRACT.md'), contract)
      const scaffoldReceipt = options.scaffold ? scaffold(stage, options, source) : null
      const dir = inside(stage, '.buildprint')
      if (source.manifest.runtime) {
        fs.mkdirSync(dir)
        for (const entry of source.entries) put(inside(dir, `snapshots/${entry.path}`), entry.payload)
        put(inside(dir, 'source.json'), jsonBytes({ schema: 'agb/source/v2', slug: source.manifest.slug, manifestSha256: source.digest, integrityClaim: 'Byte identity only, not publisher authentication', scaffold: scaffoldReceipt }))
        initialize(dir, source)
        put(inside(dir, 'next-agent.md'), Buffer.from('# Next agent\n\nRead PROJECT_CONTRACT.md and snapshots/BUILDPRINT.md, then `agb state status .` and `agb loop next .`. Read-only snapshot loop-index is the packet default, not mutable progress. HEAD.json selects authoritative versioned state; never hand-edit it.\n\nAsk at most three alignment questions per batch; preserve approvals and full agreed scope. Mobile-first UX before UI implementation. Reuse available framework skills; do not auto-write harness skills. Tests, captures, reviews, dependency/script execution, uploads, paid calls and deployment require the actual owner\'s applicable authorization. Missing capabilities stay unverified.\n'))
        for (const name of ['progress', 'decisions', 'blockers']) put(inside(dir, `${name}.md`), Buffer.from(`# ${name}\n\nSupporting notes only. PROJECT_CONTRACT.md owns requirements; versioned CLI state owns routing and recorded attestations; upstream framework receipts own detailed production evidence.\n`))
      } else {
        // Feed already bounded/verified bytes through the existing legacy bootstrap writer.
        await legacyStart(ref, stage, source)
      }
      syncTree(stage)
      safeAbsolute(root); safeAbsolute(existingState)
      if (!existed) {
        insist(!fs.existsSync(root), 'target appeared during bootstrap')
        fs.renameSync(stage, root); syncDir(parent)
      } else if (!options.scaffold) {
        insist(!fs.existsSync(existingState), 'state appeared during bootstrap')
        fs.renameSync(dir, existingState); syncDir(root)
        fs.rmdirSync(stage)
      } else {
        // Populated-directory replacement is not a portable atomic operation. Refuse it.
        // Contract-only/empty targets are handled by an explicit recovery-preserving two-rename journal.
        const current = fs.readdirSync(root)
        insist(contract ? current.length === 1 && current[0] === 'PROJECT_CONTRACT.md' && hash(bytes(inside(root, current[0]))) === contractDigest : current.length === 0, 'target changed during scaffold')
        const backup = `${stage}.original`
        put(inside(stage, '.agb-bootstrap-recovery.json'), jsonBytes({ schema: 'agb/bootstrap-recovery/v1', target: root, original: backup, stage, note: 'Two-rename publication; original retained. If interrupted after first rename, move stage to absent target or restore original, never merge.' }))
        syncTree(stage)
        fs.renameSync(root, backup); syncDir(parent)
        fs.renameSync(stage, root); syncDir(parent)
      }
      return { created: root, version: source.manifest.runtime ? 2 : 1, scaffold: scaffoldReceipt, executedManifestCommands: [] }
    } catch (error) { throw new Error(`${error.message}\nPrivate staging (if still present) retained at ${stage}; target files were not merged. Inspect before retry/recovery.`) }
  })
}
