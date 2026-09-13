import fs from 'node:fs'
import path from 'node:path'
import { bootstrap } from './bootstrap.js'
import { insist, safeAbsolute, inside, readJson, unlock } from './io.js'
import { status, next, mutate, operation } from './state.js'

export const runtimeHelp = `Versioned local runtime (opt-in manifest runtime.schema = agb/runtime/v2):
  agb start <manifest> [target] [--resume] [--manifest-sha256 <sha256>]
  agb bootstrap <manifest> <target> --allow-scaffold --framework <checkout> --archive <tgz> --archive-sha256 <sha256> [--manifest-sha256 <sha256>]
  agb state status <project>
  agb state approve <project> --revision <n> --receipt <json>
  agb loop next <project>
  agb loop begin|accept|advance|defect|resolve-defect|return|resolve-return <project> --revision <n> --receipt <json>
  agb evidence bind|record <project> --revision <n> --receipt <json>
  agb state unlock <project> --token <lock-token> [--bootstrap-lock]

Receipts and security/recovery contracts: docs/cli-runtime-v2.md.
No command runs tests, captures, reviews, installs, manifest shell commands or paid providers.
Acceptance is explicitly recorded attestation, NOT CLI pixel/runtime/reviewer verification.`

function parse(args, allowed) {
  const options = {}; const positional = []
  for (let i = 0; i < args.length; i++) {
    const value = args[i]
    if (!value.startsWith('--')) { positional.push(value); continue }
    insist(Object.hasOwn(allowed, value) && !Object.hasOwn(options, value), `unknown/duplicate option: ${value}`)
    if (allowed[value] === 'boolean') options[value] = true
    else { insist(args[i + 1] && !args[i + 1].startsWith('--'), `missing ${value} value`); options[value] = args[++i] }
  }
  return { options, positional }
}
export async function startCommand(args, legacyStart) {
  const isBootstrap = args[0] === 'bootstrap'
  const { positional, options: o } = parse(args.slice(1), { '--resume': 'boolean', '--manifest-sha256': 'value', '--allow-scaffold': 'boolean', '--framework': 'value', '--archive': 'value', '--archive-sha256': 'value' })
  insist(positional.length >= 1 && positional.length <= 2 && (!isBootstrap || positional.length === 2), 'expected manifest and target (target optional for start)')
  insist(isBootstrap || !['--allow-scaffold', '--framework', '--archive', '--archive-sha256'].some(k => o[k]), 'scaffold options belong to agb bootstrap')
  const result = await bootstrap(positional[0], positional[1] || process.cwd(), {
    resume: o['--resume'], manifestSha256: o['--manifest-sha256'], scaffold: isBootstrap, allowScaffold: o['--allow-scaffold'], framework: o['--framework'], archive: o['--archive'], archiveSha256: o['--archive-sha256']
  }, legacyStart)
  console.log(JSON.stringify(result, null, 2))
}
export async function runtimeCommand(args) {
  const [group, command] = args
  const allowed = { '--revision': 'value', '--receipt': 'value', '--token': 'value', '--bootstrap-lock': 'boolean' }
  const { positional, options } = parse(args.slice(2), allowed)
  insist(positional.length === 1, 'exactly one project path required')
  const root = safeAbsolute(positional[0])
  if (group === 'state' && command === 'unlock') {
    insist(options['--token'] && !options['--receipt'] && !options['--revision'], 'unlock requires --token only (plus optional --bootstrap-lock)')
    const file = options['--bootstrap-lock'] ? path.join(path.dirname(root), `.${path.basename(root)}.agb-bootstrap.lock`) : inside(root, '.buildprint/write.lock')
    unlock(file, options['--token']); console.log('Stopped-owner lock removed; no state or staging files modified.'); return
  }
  if (group === 'state' && command === 'status' || group === 'loop' && command === 'next') {
    insist(Object.keys(options).length === 0, 'read command takes no options')
    console.log(command === 'next' ? next(root) : JSON.stringify(status(root), null, 2)); return
  }
  const actions = { state: ['approve'], loop: ['begin', 'accept', 'advance', 'defect', 'resolve-defect', 'return', 'resolve-return'], evidence: ['bind', 'record'] }
  insist(actions[group]?.includes(command), 'unknown runtime command')
  insist(!options['--token'] && !options['--bootstrap-lock'] && /^\d+$/.test(options['--revision'] || '') && options['--receipt'], 'mutation requires --revision <n> and --receipt <json>')
  const receipt = readJson(safeAbsolute(options['--receipt']))
  const action = command === 'record' ? 'evidence' : command
  console.log(JSON.stringify(await mutate(root, Number(options['--revision']), action, context => operation(context, action, receipt)), null, 2))
}
export function hasRuntime(project) { return fs.existsSync(inside(project, '.buildprint/HEAD.json')) }
