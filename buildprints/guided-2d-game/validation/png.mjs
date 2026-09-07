// Dependency-free decoder for the packet's normalized PNG export contract only:
// 8-bit RGBA, non-interlaced. Other formats require a real decoder/explicit export.
import { inflateSync } from 'node:zlib';
export function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
export function decodePng(input) {
  const bytes = Buffer.from(input);
  const assert = (v, msg) => { if (!v) throw new Error(`PNG: ${msg}`); };
  assert(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), 'signature');
  let offset = 8, width, height, ended = false, hasData = false, dataEnded = false;
  const compressed = [];
  while (offset < bytes.length) {
    assert(offset + 12 <= bytes.length, 'truncated chunk');
    const length = bytes.readUInt32BE(offset), type = bytes.toString('ascii', offset + 4, offset + 8);
    assert(offset + 12 + length <= bytes.length, 'chunk length');
    const body = bytes.subarray(offset + 8, offset + 8 + length);
    assert(crc32(bytes.subarray(offset + 4, offset + 8 + length)) === bytes.readUInt32BE(offset + 8 + length), 'CRC');
    if (!width) assert(type === 'IHDR', 'IHDR must be first');
    if (type === 'IHDR') {
      assert(!width && length === 13, 'IHDR');
      width = body.readUInt32BE(0); height = body.readUInt32BE(4);
      // Resource safety by decoded pixel count, not an aesthetic file-size rule.
      assert(width > 0 && height > 0 && width * height <= 16_777_216, 'decoded pixel resource limit');
      assert(body[8] === 8 && body[9] === 6 && body[10] === 0 && body[11] === 0 && body[12] === 0,
        'requires normalized non-interlaced RGBA8');
    } else if (type === 'IDAT') {
      assert(!dataEnded, 'IDAT chunks must be consecutive');
      hasData = true; compressed.push(body);
    } else if (type === 'IEND') {
      assert(length === 0 && hasData, 'IEND'); ended = true; offset += length + 12; break;
    } else {
      if (hasData) dataEnded = true;
      assert(type === 'PLTE' || type[0] === type[0].toLowerCase(), `unsupported critical chunk ${type}`);
    }
    offset += length + 12;
  }
  assert(ended && offset === bytes.length, 'missing IEND/trailing bytes');
  const stride = width * 4, expected = (stride + 1) * height;
  const raw = inflateSync(Buffer.concat(compressed), { maxOutputLength: expected });
  assert(raw.length === expected, 'scanline length');
  const rgba = new Uint8Array(width * height * 4);
  const paeth = (a, b, c) => {
    const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)]; assert(filter <= 4, 'filter');
    for (let x = 0; x < stride; x++) {
      const i = y * stride + x, left = x >= 4 ? rgba[i - 4] : 0, up = y ? rgba[i - stride] : 0;
      const corner = y && x >= 4 ? rgba[i - stride - 4] : 0;
      const prediction = [0, left, up, Math.floor((left + up) / 2), paeth(left, up, corner)][filter];
      rgba[i] = (raw[y * (stride + 1) + x + 1] + prediction) & 255;
    }
  }
  return { width, height, rgba };
}
