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

const assessmentFile = path.join(packet, '00-host-assessment.md')
let assessment = fs.readFileSync(assessmentFile, 'utf8')
assessment = assessment
  .replace(/\n- finding classifications: `infer safely`, `patch locally`, `must ask user`, or `out of scope`/g, '')
  .replace(/\n## Finding Classifications\n/g, '\n')
fs.writeFileSync(assessmentFile, assessment)

const buildprintFile = path.join(packet, 'BUILDPRINT.md')
let buildprint = fs.readFileSync(buildprintFile, 'utf8')
buildprint = buildprint.replace(/## Discovery decision gate[\s\S]*?(?=\n## Hard-stop conditions)/, '')
fs.writeFileSync(buildprintFile, buildprint)

const applyFile = path.join(packet, 'apply.md')
let apply = fs.readFileSync(applyFile, 'utf8')
apply = apply.replace(/\nHost assessment is a hard gate\.[\s\S]*?stop and ask before source edits\.\n/, '\n')
fs.writeFileSync(applyFile, apply)

const verifyFile = path.join(packet, 'verify.md')
let verify = fs.readFileSync(verifyFile, 'utf8')
verify = verify.replace(/\n- `.buildprint\/capability-receipt.md` reconciles every host-assessment blocker, assumption, baseline failure, and hard-stop question with the final proof level/g, '')
fs.writeFileSync(verifyFile, verify)

const planFile = path.join(packet, '01-integration-plan.md')
let plan = fs.readFileSync(planFile, 'utf8')
plan = plan
  .replace(/\n- reconciliation with `.buildprint\/host-assessment.md`: every `must ask user`, blocker, baseline failure, and assumption is resolved, accepted as a claim ceiling, or left blocking/g, '')
  .replace(/\n## Assessment Reconciliation\n/g, '\n')
fs.writeFileSync(planFile, plan)

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
  'capability packet requires discovery decision gate',
  'capability packet requires proof reconciliation and claim downgrade',
]

const missing = requiredFailures.filter((label) => !output.includes(`✗ ${label}`))
if (missing.length) {
  console.error(output)
  throw new Error(`mutated packet failed for the wrong reasons; missing expected failures: ${missing.join(', ')}`)
}

fs.rmSync(temp, { recursive: true, force: true })
console.log('capability regression checks caught expected failures')
