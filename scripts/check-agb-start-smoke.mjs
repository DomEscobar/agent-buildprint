#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const root = process.cwd()
const packet = path.join(root, 'buildprints', 'ai-influencer-os')
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-start-smoke-'))
const manifestPath = path.join(temp, 'package.json')
const out = path.join(temp, 'out')

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

function fail(message) {
  console.error(message)
  process.exit(1)
}

if (!fs.existsSync(packet)) fail(`missing packet directory: ${packet}`)

const files = walk(packet)
  .map((file) => path.relative(packet, file).split(path.sep).join('/'))
  .filter((file) => !file.startsWith('.'))
  .sort()

const manifest = {
  slug: 'ai-influencer-os',
  title: 'AI Influencer OS',
  category: 'Product OS',
  tier: 'agent-grade',
  status: 'validated',
  files: files.map((file) => ({ path: file, rawUrl: path.join(packet, file) })),
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')

try {
  execFileSync(process.execPath, [path.join(root, 'bin', 'agb.js'), 'start', manifestPath, out], {
    stdio: 'inherit',
  })
} catch {
  fail('agb start smoke failed')
}

for (const rel of ['BUILDPRINT.md', 'plans/04-wavespeed-image.md']) {
  const snapshot = path.join(out, '.buildprint', 'snapshots', rel)
  if (!fs.existsSync(snapshot) || fs.statSync(snapshot).size === 0) {
    fail(`missing or empty snapshot: ${rel}`)
  }
}

const buildprint = fs.readFileSync(path.join(out, '.buildprint', 'snapshots', 'BUILDPRINT.md'), 'utf8')
if (!/^# BUILDPRINT:/im.test(buildprint)) {
  fail('snapshot BUILDPRINT.md is missing canonical "# BUILDPRINT:" heading')
}

console.log('agb start smoke passed (local ai-influencer-os packet)')
