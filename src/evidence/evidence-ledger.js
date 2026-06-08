import path from 'node:path'
import { readText } from '../shared/fs.js'

const REQUIRED_FIELDS = [
  'artifact_id',
  'type',
  'phase_id',
  'status',
  'source',
  'proves',
  'proof_type',
  'provider_mode',
  'upgrades_claim',
  'claim_type'
]

const VALID_STATUS = new Set(['missing', 'passed', 'proven', 'blocked', 'failed', 'skipped'])
const VALID_PROOF_TYPE = new Set(['static', 'unit_contract', 'integration', 'runtime_api', 'browser_e2e', 'screenshot_review', 'persistence_restart', 'provider_fake', 'provider_live', 'security_review', 'no_fake_scan', 'clean_room_reversal', 'deployment_ops', 'blocker'])
const VALID_PROVIDER_MODE = new Set(['none', 'fake', 'deterministic', 'sandbox', 'live', 'blocked', 'missing_live_credentials', 'not_applicable'])
const VALID_CLAIM_TYPE = new Set(['target', 'core_pass', 'claim_upgrade', 'blocker'])

export function evidenceCheck(file, options = {}) {
  const cwd = options.cwd ?? process.cwd()
  const text = readText(path.resolve(cwd, file))
  let failed = 0
  let count = 0

  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = raw.trim()
    if (!line) continue
    count++
    try {
      const row = JSON.parse(line)
      for (const field of REQUIRED_FIELDS) {
        if (!(field in row)) {
          failed++
          console.error(`✗ line ${index + 1}: missing ${field}`)
        }
      }
      if (!VALID_STATUS.has(String(row.status))) {
        failed++; console.error(`✗ line ${index + 1}: invalid status ${row.status}`)
      }
      if (!VALID_PROOF_TYPE.has(String(row.proof_type))) {
        failed++; console.error(`✗ line ${index + 1}: invalid proof_type ${row.proof_type}`)
      }
      if (!VALID_PROVIDER_MODE.has(String(row.provider_mode))) {
        failed++; console.error(`✗ line ${index + 1}: invalid provider_mode ${row.provider_mode}`)
      }
      if (!VALID_CLAIM_TYPE.has(String(row.claim_type))) {
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
