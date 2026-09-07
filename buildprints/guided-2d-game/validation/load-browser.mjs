// Import this at the production scene's loading boundary, not a separate proof page.
import { loadManifest } from './contracts.mjs';
async function readBytes(url, mime) {
  const response = await fetch(url, { cache: 'no-store', credentials: 'same-origin' });
  if (!response.ok) throw new Error(`Asset HTTP ${response.status}`);
  if (response.url && new URL(response.url).origin !== new URL(url).origin) throw new Error('Cross-origin asset redirect');
  const type = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (type !== mime) throw new Error(`Expected ${mime}, received ${type}`);
  return new Uint8Array(await response.arrayBuffer());
}
export async function loadBrowserManifest(manifestUrl) {
  const url = new URL(manifestUrl, location.href);
  if (url.origin !== location.origin) throw new Error('Manifest must be same-origin');
  return loadManifest(await readBytes(url, 'application/json'), (relative) => readBytes(new URL(relative, url), 'image/png'), async (bytes) => {
    const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
    try {
      const canvas = document.createElement('canvas'); canvas.width = bitmap.width; canvas.height = bitmap.height;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) throw new Error('Canvas 2D unavailable');
      context.drawImage(bitmap, 0, 0);
      return { width: bitmap.width, height: bitmap.height,
        rgba: context.getImageData(0, 0, bitmap.width, bitmap.height).data,
        // Engine texture registration consumes this exact decoded canvas, no second fetch.
        resource: canvas };
    } finally { bitmap.close(); }
  });
}
