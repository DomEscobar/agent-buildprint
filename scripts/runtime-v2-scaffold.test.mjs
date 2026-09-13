// AUTHORED ONLY. No execution during the overhaul.
// Optional pinned-template integration; set AGB_TEST_FRAMEWORK to a trusted read-only
// checkout containing the documented commit before explicitly authorizing this test.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { bootstrap } from '../src/runtime/bootstrap.js'
import { hash, jsonBytes, readJson } from '../src/runtime/io.js'

const framework = process.env.AGB_TEST_FRAMEWORK
const write = (file, data) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, data) }

test('pinned template copy preserves sole contract, verifies archive digest and keeps original recovery directory', { skip: !framework }, async t => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-scaffold-regression-'))
  t.after(() => fs.rmSync(base, { recursive: true, force: true }))
  const packet = path.join(base, 'packet'); const target = path.join(base, 'game')
  const contract = Buffer.from('# Synthetic approved-contract preservation fixture\n')
  write(path.join(target, 'PROJECT_CONTRACT.md'), contract)
  const lock = { commit: '7542ff68de04ca6ea6736974b54ec5b5dde1cc33', sourceTree: '5363d058a3e15e6025a5a66bda09da343ca5215e', packageName: 'isometric-framework', packageVersion: '0.1.0' }
  const definition = { schema: 'agb/loops/v2', approvals: [], bindingFiles: ['PROJECT_CONTRACT.md'], loops: [{ id: 'a', file: 'loops/a.md', dependsOn: [], approvals: [], requirements: ['a'], acceptance: ['implemented'], independentReview: false }] }
  write(path.join(packet, 'framework-lock.json'), jsonBytes(lock))
  write(path.join(packet, 'runtime.json'), jsonBytes(definition))
  write(path.join(packet, 'loops/a.md'), '# Synthetic routing loop\n')
  write(path.join(packet, 'package.json'), jsonBytes({ slug: 'scaffold-fixture', files: ['framework-lock.json', 'runtime.json', 'loops/a.md'], runtime: { schema: 'agb/runtime/v2', definition: 'runtime.json' } }))
  // Deliberately opaque bytes: the adapter promises digest identity only, not a valid
  // package, execution safety, provenance, or build correspondence. Never install these.
  const archive = path.join(base, 'opaque-fixture.tgz'); const opaque = Buffer.from('SYNTHETIC OPAQUE ARCHIVE BYTES — NEVER INSTALL')
  write(archive, opaque)
  const options = { scaffold: true, allowScaffold: true, framework, archive, archiveSha256: '0'.repeat(64) }
  await assert.rejects(bootstrap(path.join(packet, 'package.json'), target, options, () => {}), /archive SHA-256 mismatch/)
  assert.deepEqual(fs.readFileSync(path.join(target, 'PROJECT_CONTRACT.md')), contract)
  options.archiveSha256 = hash(opaque)
  const result = await bootstrap(path.join(packet, 'package.json'), target, options, () => {})
  assert.deepEqual(fs.readFileSync(path.join(target, 'PROJECT_CONTRACT.md')), contract)
  assert.deepEqual(fs.readFileSync(path.join(target, 'vendor/isometric-framework-0.1.0.tgz')), opaque)
  assert.equal(readJson(path.join(target, 'package.json')).dependencies['isometric-framework'], 'file:vendor/isometric-framework-0.1.0.tgz')
  assert.ok(fs.existsSync(path.join(target, '.gitignore')))
  assert.ok(fs.existsSync(path.join(target, '.buildprint/HEAD.json')))
  const recovery = readJson(path.join(target, '.agb-bootstrap-recovery.json'))
  assert.deepEqual(fs.readFileSync(path.join(recovery.original, 'PROJECT_CONTRACT.md')), contract)
  assert.match(result.scaffold.archiveClaim, /NOT proven/)
  assert.deepEqual(result.executedManifestCommands, [])
})
