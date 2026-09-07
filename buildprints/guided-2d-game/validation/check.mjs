import { loadNodeManifest } from './load-node.mjs';
try {
  if (process.argv.length !== 3) throw new Error('Usage: node check.mjs path/to/runtime-manifest.json');
  const loaded = await loadNodeManifest(process.argv[2]);
  console.log(JSON.stringify(loaded.receipt, null, 2));
} catch (error) {
  console.error(`Contract validation failed: ${error.message}`);
  process.exitCode = 1;
}
