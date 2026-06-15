import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const source = path.join(root, 'buildprints', 'api-key-management')
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-capability-regression-'))
const packet = path.join(temp, 'api-key-management')

fs.cpSync(source, packet, { recursive: true })

const capabilityFile = path.join(packet, 'capability.yaml')
let capability = fs.readFileSync(capabilityFile, 'utf8')
capability = capability.replace(
  /(composition:\n\s+expects:\n\s+- )auth\.user_identity or explicitly approved service_account owner model/,
  '$1auth.user_identity',
)
capability = capability.replace(/\n\s+- valid prefix with wrong secret body is denied/g, '')
capability = capability.replace(
  /\n\s+- add tests or fixtures for valid, revoked, wrong-scope, missing, malformed, and valid-prefix\/wrong-secret keys/g,
  '\n    - add tests or fixtures for valid, revoked, wrong-scope, missing, and malformed keys',
)
fs.writeFileSync(capabilityFile, capability)

let output = ''
try {
  execFileSync('node', ['bin/agb.js', 'packet', 'check', packet], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
  throw new Error('mutated capability packet unexpectedly passed')
} catch (error) {
  output = `${error.stdout || ''}\n${error.stderr || ''}`
  if (/mutated capability packet unexpectedly passed/.test(error.message)) throw error
}

const requiredFailures = [
  'capability.yaml keeps requires.existing_capabilities aligned with composition.expects',
  'credential capability.yaml proves full-secret verification after prefix lookup',
]

const missing = requiredFailures.filter((label) => !output.includes(`✗ ${label}`))
if (missing.length) {
  console.error(output)
  throw new Error(`mutated packet failed for the wrong reasons; missing expected failures: ${missing.join(', ')}`)
}

fs.rmSync(temp, { recursive: true, force: true })
console.log('capability regression checks caught expected failures')
