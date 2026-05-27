#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = new Set(process.argv.slice(2));
const strict = args.has('--strict');
const root = path.resolve('buildprints');

function rel(file) {
  return file.split(path.sep).join('/');
}

function packageDirs() {
  return fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(root, entry.name))
    .filter((dir) => fs.existsSync(path.join(dir, 'blueprint.yaml')))
    .filter((dir) => /schema_version:\s*mapper-os\/executable-blueprint\b/i.test(fs.readFileSync(path.join(dir, 'blueprint.yaml'), 'utf8')))
    .sort();
}

function isPublished(dir) {
  const publicationPath = path.join(dir, 'publication.json');
  if (!fs.existsSync(publicationPath)) return false;
  try {
    const publication = JSON.parse(fs.readFileSync(publicationPath, 'utf8'));
    return publication.publish !== false;
  } catch {
    return true;
  }
}

const targets = packageDirs().filter(isPublished);
const rows = [];

for (const dir of targets) {
  const slug = path.basename(dir);
  const result = spawnSync(process.execPath, ['scripts/check-mapper-selected-output.mjs', rel(dir)], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const output = `${result.stdout}\n${result.stderr}`;
  const issues = [...output.matchAll(/^x\s+/gmi)].length;
  rows.push({
    slug,
    status: result.status === 0 ? 'current' : 'needs-migration',
    issues,
    firstIssue: result.status === 0 ? '' : output.split(/\r?\n/).find((line) => /^x\s+/.test(line)) ?? 'strict validation failed',
  });
}

const current = rows.filter((row) => row.status === 'current');
const stale = rows.filter((row) => row.status !== 'current');

console.log('Mapper published executable packet audit');
console.log(`Current strict baseline: ${current.length}/${rows.length}`);
console.log('');

for (const row of rows) {
  const prefix = row.status === 'current' ? 'ok' : 'migrate';
  const issueText = row.issues ? ` (${row.issues} issue${row.issues === 1 ? '' : 's'})` : '';
  console.log(`${prefix} ${row.slug}${issueText}`);
  if (row.firstIssue) console.log(`  first: ${row.firstIssue}`);
}

if (strict && stale.length) {
  console.error(`\n${stale.length} published executable packet(s) are not on the current Mapper OS baseline.`);
  process.exit(1);
}

