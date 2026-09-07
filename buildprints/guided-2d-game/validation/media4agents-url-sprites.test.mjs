// Offline documentation/example tests only; no provider requests or browser proof.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const doc = await readFile(new URL('../references/media4agents-url-sprites.md', import.meta.url), 'utf8');
const textBlocks = [...doc.matchAll(/```text\n([^`]+)\n```/g)].map(match => match[1]);
const examples = textBlocks.slice(1);
const script = doc.match(/```js\n([\s\S]*?)\n```/)[1];

test('four complete public-placeholder URLs obey exclusive workflow contracts', () => {
  assert.equal(textBlocks[0], 'https://media4agents.com/m/{PUBLIC_MEDIA4AGENTS_TOKEN}/{name}.png?prompt={subject-description}&style=pixel_game_asset&size={size}&model=retrodiffusion&assetType={assetType}');
  assert.equal(examples.length, 4);
  const sizes = {
    game_sprite: ['16x16', '32x32', '64x64', '128x128', '256x256'],
    texture: ['64x64', '128x128', '256x256'],
    tileset: ['16x16', '32x32'],
    spritesheet: ['48x48'],
  };
  const names = new Set();
  const types = new Set();
  for (const raw of examples) {
    const url = new URL(raw);
    assert.equal(url.origin, 'https://media4agents.com');
    assert.equal(url.hash, '');
    const path = decodeURIComponent(url.pathname);
    assert.match(path, /^\/m\/\{PUBLIC_MEDIA4AGENTS_TOKEN\}\/[a-z]+(?:-[a-z]+)*\.png$/);
    names.add(path);
    const q = url.searchParams;
    assert.equal(q.get('style'), 'pixel_game_asset');
    assert.equal(q.get('model'), 'retrodiffusion');
    const type = q.get('assetType');
    types.add(type);
    assert.ok(sizes[type]?.includes(q.get('size')));
    assert.doesNotMatch(q.get('prompt'), /pixel\s+art/i);
    assert.equal(raw.split('?prompt=')[1].split('&')[0], encodeURIComponent(q.get('prompt')));
    const required = ['prompt', 'style', 'size', 'model', 'assetType'];
    if (type === 'game_sprite' || type === 'texture') {
      required.push('removeBackground');
      assert.equal(q.get('removeBackground'), String(type === 'game_sprite'));
    }
    if (type === 'spritesheet') {
      required.push('animation');
      assert.equal(q.get('animation'), 'walking');
    }
    assert.deepEqual([...q.keys()].sort(), required.sort());
  }
  assert.equal(names.size, 4);
  assert.deepEqual([...types].sort(), Object.keys(sizes).sort());
});

// Minimal offline DOM/Image doubles exercise only example control flow.
function harness({ configured = true, fail = false, decodeFail = false, timeout = false } = {}) {
  const status = { textContent: '' };
  const draws = [];
  const ctx = { clearRect() {}, drawImage(...args) { draws.push(args); } };
  const canvas = { hidden: false, getContext: () => ctx };
  const requests = [];
  const timers = new Map();
  let created = 0;
  class OfflineImage {
    constructor() { created++; this.naturalWidth = 64; this.naturalHeight = 64; }
    set src(url) {
      requests.push(url);
      if (!timeout) queueMicrotask(() => fail ? this.onerror() : this.onload());
    }
    async decode() { if (decodeFail) throw new Error('Offline decode failure'); }
  }
  const context = vm.createContext({
    document: { getElementById: id => id === 'game' ? canvas : status },
    Image: OfflineImage,
    setTimeout: fn => { const id = timers.size + 1; timers.set(id, fn); return id; },
    clearTimeout: id => timers.delete(id),
  });
  const source = configured
    ? script.replace('const PUBLIC_MEDIA4AGENTS_TOKEN = "{PUBLIC_MEDIA4AGENTS_TOKEN}";', 'const PUBLIC_MEDIA4AGENTS_TOKEN = "OFFLINE_TEST_PUBLIC_TOKEN";')
    : script;
  new vm.Script(`${source}\nglobalThis.load = loadKnight; globalThis.url = knightUrl;`).runInContext(context);
  return { context, status, canvas, ctx, draws, requests, timers, created: () => created };
}

test('no approval or unconfigured placeholder means no Image and no request', async () => {
  const noApproval = harness();
  assert.equal(await noApproval.context.load(), null);
  assert.equal(noApproval.created(), 0);
  const noToken = harness({ configured: false });
  assert.equal(await noToken.context.load({ paidUseApproved: true }), null);
  assert.equal(noToken.created(), 0);
  assert.equal(noToken.canvas.hidden, true);
  assert.match(noToken.status.textContent, /blocked/);
});

test('approved example loads direct URL once, draws retained image and reuses exact URL', async () => {
  const h = harness();
  const pending = h.context.load({ paidUseApproved: true });
  assert.match(h.status.textContent, /Loading knight/);
  const image = await pending;
  assert.equal(h.requests.length, 1);
  assert.equal(h.context.url, examples[0].replace('{PUBLIC_MEDIA4AGENTS_TOKEN}', 'OFFLINE_TEST_PUBLIC_TOKEN'));
  assert.equal(image.crossOrigin, 'anonymous');
  assert.equal(h.draws[0][0], image);
  assert.equal(h.ctx.imageSmoothingEnabled, false);
  assert.equal(h.canvas.width, 320);
  assert.equal(h.canvas.height, 180);
  assert.equal(h.canvas.hidden, false);
  assert.equal(h.timers.size, 0);
  await h.context.load({ paidUseApproved: true });
  assert.equal(h.requests[0], h.requests[1]);
});

test('load/decode failures are visible with no automatic retry', async () => {
  for (const options of [{ fail: true }, { decodeFail: true }]) {
    const h = harness(options);
    assert.equal(await h.context.load({ paidUseApproved: true }), null);
    assert.equal(h.requests.length, 1);
    assert.equal(h.draws.length, 0);
    assert.equal(h.canvas.hidden, true);
    assert.match(h.status.textContent, /unavailable.*exact approved URL/);
    assert.equal(h.timers.size, 0);
  }
});

test('timeout has an honest charge warning and no automatic retry', async () => {
  const h = harness({ timeout: true });
  const pending = h.context.load({ paidUseApproved: true });
  for (const callback of [...h.timers.values()]) callback();
  assert.equal(await pending, null);
  assert.equal(h.requests.length, 1);
  assert.match(h.status.textContent, /timeout does not cancel generation or prove no charge/);
  assert.equal(h.timers.size, 0);
});
