#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function quoteWinArg(value) {
  const text = String(value);
  return /[\s&()^%!"]/u.test(text) ? `"${text.replaceAll('"', '\\"')}"` : text;
}

function run(command, args, options = {}) {
  const win = process.platform === 'win32';
  const result = spawnSync(
    win ? process.env.ComSpec || 'cmd.exe' : command,
    win ? ['/d', '/s', '/c', [command, ...args.map(quoteWinArg)].join(' ')] : args,
    {
    stdio: options.stdio ?? 'inherit',
    shell: false,
    ...options,
    },
  );
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with exit ${result.status}`);
  }
  return result;
}

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const tempRoot = path.join(os.tmpdir(), `agb-pack-smoke-${process.pid}`);
fs.rmSync(tempRoot, { recursive: true, force: true });
fs.mkdirSync(tempRoot, { recursive: true });

try {
  run(npm, ['pack', '--dry-run']);
  run(npm, ['pack', '--pack-destination', tempRoot], { stdio: 'pipe' });

  const tarball = fs.readdirSync(tempRoot).find((file) => /^agent-buildprint-.*\.tgz$/.test(file));
  if (!tarball) throw new Error('npm pack did not create an agent-buildprint tarball');

  const installRoot = path.join(tempRoot, 'install');
  fs.mkdirSync(installRoot, { recursive: true });
  run(npm, ['init', '-y'], { cwd: installRoot, stdio: 'pipe' });
  run(npm, ['install', path.join(tempRoot, tarball)], { cwd: installRoot, stdio: 'pipe' });

  const bin = process.platform === 'win32'
    ? path.join(installRoot, 'node_modules', '.bin', 'agb.cmd')
    : path.join(installRoot, 'node_modules', '.bin', 'agb');
  run(bin, ['--help'], { cwd: installRoot, stdio: 'pipe' });
  console.log(`pack smoke passed: ${path.join(tempRoot, tarball)}`);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
