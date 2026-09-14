import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const LIMIT = 16 * 1024 * 1024
export const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex')
export const jsonBytes = value => Buffer.from(JSON.stringify(value, null, 2) + '\n')
export function insist(ok, message) { if (!ok) throw new Error(message) }
export function relative(value) {
  insist(typeof value === 'string' && value.length > 0 && value.length <= 240, 'invalid relative path')
  insist(!/[\\\x00-\x1f:*?<>|]/.test(value) && !value.startsWith('/') && value.split('/').every(p => p && p !== '.' && p !== '..' && !p.endsWith('.') && !p.endsWith(' ')), `unsafe path: ${value}`)
  insist(!value.split('/').some(p => /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\.|$)/i.test(p)), 'reserved path')
  return value
}
// Reject symlinks in every existing component, including dangling links.
export function safeAbsolute(value) {
  const absolute = path.resolve(value)
  let part = path.parse(absolute).root
  for (const segment of absolute.slice(part.length).split(path.sep).filter(Boolean)) {
    part = path.join(part, segment)
    try { insist(!fs.lstatSync(part).isSymbolicLink(), `symlink refused: ${part}`) }
    catch (error) { if (error.code !== 'ENOENT') throw error }
  }
  return absolute
}
export function inside(root, rel) { return safeAbsolute(path.join(safeAbsolute(root), relative(rel))) }
export function bytes(file, limit = LIMIT) {
  safeAbsolute(file)
  const before = fs.lstatSync(file)
  insist(before.isFile() && before.size <= limit, `not a bounded ordinary file: ${file}`)
  const fd = fs.openSync(file, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW || 0) | (fs.constants.O_NONBLOCK || 0))
  try {
    const stat = fs.fstatSync(fd)
    insist(stat.isFile() && stat.size <= limit, `not a bounded ordinary file: ${file}`)
    // Bounded read even if another process grows/replaces an input while it is read.
    const value = Buffer.allocUnsafe(stat.size + 1)
    let length = 0
    while (length < value.length) {
      const count = fs.readSync(fd, value, length, value.length - length, null)
      if (!count) break
      length += count
    }
    const after = fs.fstatSync(fd)
    insist(length === stat.size && after.size === stat.size && after.mtimeMs === stat.mtimeMs && after.ctimeMs === stat.ctimeMs, `file changed during bounded read: ${file}`)
    return value.subarray(0, length)
  } finally { fs.closeSync(fd) }
}
export const readJson = file => JSON.parse(bytes(file).toString('utf8'))
export function syncDir(dir) {
  const fd = fs.openSync(dir, 'r')
  try { fs.fsyncSync(fd) } finally { fs.closeSync(fd) }
}
export function put(file, value) {
  safeAbsolute(file)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const fd = fs.openSync(file, 'wx', 0o600)
  try { fs.writeFileSync(fd, value); fs.fsyncSync(fd) } finally { fs.closeSync(fd) }
}
export function atomicJson(file, value) {
  const temporary = `${file}.${crypto.randomUUID()}.tmp`
  put(temporary, jsonBytes(value))
  fs.renameSync(temporary, file)
  syncDir(path.dirname(file))
}
export async function locked(file, action) {
  safeAbsolute(file)
  const owner = { token: crypto.randomUUID(), pid: process.pid, createdAt: new Date().toISOString() }
  try { put(file, jsonBytes(owner)) }
  catch (error) { if (error.code === 'EEXIST') throw new Error(`lock exists: ${file}; stop its owner before explicit recovery`); throw error }
  try { return await action() } finally { fs.unlinkSync(file); syncDir(path.dirname(file)) }
}
export function unlock(file, token) {
  const owner = readJson(file)
  insist(owner.token === token, 'lock recovery token mismatch')
  let live = true
  try { process.kill(owner.pid, 0) } catch (error) { if (error.code === 'ESRCH') live = false }
  insist(!live, 'lock owner still alive (or cannot establish it is stopped)')
  fs.unlinkSync(file); syncDir(path.dirname(file))
}
export async function remoteBytes(url, limit = LIMIT, origin = null) {
  const parsed = new URL(url)
  insist(parsed.protocol === 'https:' && !parsed.username && !parsed.password, 'only credential-free HTTPS remote sources are supported')
  if (origin) insist(parsed.origin === origin, 'cross-origin payload refused; publish on the manifest origin')
  const response = await fetch(parsed, { redirect: 'error', signal: AbortSignal.timeout(30000) })
  insist(response.ok, `download failed: HTTP ${response.status}`)
  insist(Number(response.headers.get('content-length') || 0) <= limit, 'download too large')
  let size = 0; const chunks = []
  for await (const chunk of response.body) { size += chunk.length; if (size > limit) { await response.body.cancel().catch(() => {}); throw new Error('download too large') }; chunks.push(chunk) }
  return Buffer.concat(chunks)
}
export async function manifestSource(ref, expectedHash) {
  const remote = /^https?:/i.test(ref)
  const file = remote ? null : safeAbsolute(ref.startsWith('file:') ? fileURLToPath(ref) : ref)
  const raw = remote ? await remoteBytes(ref, 1024 * 1024) : bytes(file, 1024 * 1024)
  const digest = hash(raw)
  if (expectedHash) insist(/^[a-f0-9]{64}$/.test(expectedHash) && digest === expectedHash, 'manifest SHA-256 mismatch')
  const manifest = JSON.parse(raw.toString('utf8'))
  insist(typeof manifest.slug === 'string' && /^[a-z0-9][a-z0-9-]{0,79}$/.test(manifest.slug) && Array.isArray(manifest.files) && manifest.files.length > 0 && manifest.files.length <= 512, 'invalid manifest slug/files (1..512)')
  // The existing website v1 schema used runtime as descriptive string labels.
  // Preserve those labels without treating them as versioned execution opt-in.
  if (Array.isArray(manifest.runtime)) {
    insist(manifest.runtime.every(label => typeof label === 'string'), 'invalid legacy runtime labels')
    manifest.runtimeLabels = manifest.runtime
    delete manifest.runtime
  }
  insist(!manifest.runtime || manifest.runtime.schema === 'agb/runtime/v2', 'unsupported runtime version')
  if (remote && manifest.runtime) insist(expectedHash, 'remote v2 requires --manifest-sha256 from a separately trusted channel')
  const seen = new Set(); let total = 0
  const entries = []
  for (const item of manifest.files) {
    const entry = typeof item === 'string' ? { path: item } : item
    insist(entry && typeof entry === 'object', 'invalid file entry')
    if (!manifest.runtime && typeof entry.path === 'string' && entry.path.includes('*')) continue // historical start skipped globs; never expand them
    const name = relative(entry.path)
    const folded = name.toLowerCase()
    insist(!seen.has(folded) && ![...seen].some(p => p.startsWith(folded + '/') || folded.startsWith(p + '/')), `duplicate/colliding path: ${name}`)
    seen.add(folded)
    const source = entry.url || entry.rawUrl || entry.siteUrl || name
    let payload
    if (remote) {
      insist(!/^(file:|\/|\\)/i.test(source), 'remote manifest cannot load local/absolute paths')
      payload = await remoteBytes(new URL(source, ref).href, LIMIT, new URL(ref).origin)
      if (manifest.runtime) insist(entry.sha256, `remote v2 payload needs sha256: ${name}`)
    } else if (/^https:/i.test(source)) {
      payload = await remoteBytes(source)
    } else {
      // Legacy explicitly named file URLs remain supported; v2 confines local sources.
      // Relative entries always stay under the manifest directory; remote manifests never reach this branch.
      const root = path.dirname(file)
      const sourceFile = source.startsWith('file:') ? fileURLToPath(source) : inside(root, source)
      if (manifest.runtime || !source.startsWith('file:')) insist(path.resolve(sourceFile).startsWith(root + path.sep), 'local payload escapes manifest directory')
      payload = bytes(sourceFile)
    }
    if (/\.(md|ya?ml|json|txt)$/i.test(name)) insist(!/^\s*(?:<!doctype html|<html[\s>])/i.test(payload.toString('utf8')) && !/^not\s+found\s*$/i.test(payload.toString('utf8').trim()), `unexpected error-page content for ${name}`)
    total += payload.length; insist(total <= 64 * 1024 * 1024, 'snapshot exceeds 64 MiB')
    const sha256 = hash(payload)
    if (entry.sha256) insist(/^[a-f0-9]{64}$/.test(entry.sha256) && sha256 === entry.sha256, `payload SHA-256 mismatch: ${name}`)
    entries.push({ path: name, sha256, bytes: payload.length, payload })
  }
  const readOrder = manifest.instructions?.readOrder || manifest.readOrder || []
  insist(Array.isArray(readOrder) && readOrder.every(p => entries.some(e => e.path === p)), 'readOrder must reference included files')
  const phases = manifest.instructions?.phaseReadOrder
  if (phases !== undefined) insist(phases && typeof phases === 'object' && !Array.isArray(phases) && Object.keys(phases).length <= 12 && Object.entries(phases).every(([phase, files]) => /^[a-z][a-z-]{0,31}$/.test(phase) && Array.isArray(files) && files.length > 0 && files.every(p => entries.some(e => e.path === p))), 'phaseReadOrder must map named phases to included files')
  return { manifest, entries, digest, baseUrl: remote ? ref : pathToFileURL(file).href }
}
