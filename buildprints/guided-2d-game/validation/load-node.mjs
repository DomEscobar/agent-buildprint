import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { loadManifest } from './contracts.mjs';
import { decodePng } from './png.mjs';
export async function loadNodeManifest(filename) {
  const resolved = await realpath(filename), root = path.dirname(resolved);
  return loadManifest(await readFile(resolved), async (relative) => {
    const asset = await realpath(path.resolve(root, relative));
    if (!asset.startsWith(root + path.sep)) throw new Error('asset symlink escapes manifest directory');
    return readFile(asset);
  }, decodePng);
}
