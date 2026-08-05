/* ============================================================================
   TMR LEARNING EXPERIENCE — QR ENCODER
   Master Electronics | INTERNAL

   Zero dependencies. Node built-ins only.

   Why this exists
     The join QR used to be a file generated ahead of time by make-qr.py, which
     meant it encoded whatever address the laptop had at generation time. Move
     to a different Wi-Fi, or deploy to a public host, and the printed square
     silently pointed at nothing.

     The server now draws the QR at request time from the address the request
     actually arrived on, so the code is correct by construction on a LAN, on a
     tunnel, and on a hosted URL — with no command to remember and nothing to
     regenerate.

   Scope, deliberately narrow
     Byte mode, error correction level M, versions 1-10 (up to 213 bytes).
     That covers every join URL this project can produce by a wide margin.
     Anything longer throws rather than silently truncating.

   Correctness
     Verified two ways in tools/verify-qr.py: the module matrix is compared
     bit-for-bit against the reference `qrcode` Python library across all eight
     mask patterns and many URLs, and the rendered image is decoded back with
     OpenCV to prove it scans.

   API
     encode(text)            -> { size, version, modules: [[0|1]] }
     svg(text, opts)         -> string
     png(text, opts)         -> Buffer
   ========================================================================= */

'use strict';

const zlib = require('zlib');

/* ------------------------------------------------------------------ GF(256)
   Arithmetic for Reed-Solomon, primitive polynomial x^8+x^4+x^3+x^2+1 (0x11D).
   ------------------------------------------------------------------------- */
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
(function tables() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
})();

const mul = (a, b) => (a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]]);

/** Generator polynomial for n error-correction codewords, leading term first. */
function genPoly(n) {
  let g = [1];
  for (let i = 0; i < n; i++) {
    const next = new Array(g.length + 1).fill(0);
    for (let j = 0; j < g.length; j++) {
      next[j] ^= g[j];                       // multiply by x
      next[j + 1] ^= mul(g[j], EXP[i]);      // ... times alpha^i
    }
    g = next;
  }
  return g;
}

/** Reed-Solomon remainder: n error-correction codewords for one data block. */
function eccBlock(data, n) {
  const g = genPoly(n);
  const buf = new Uint8Array(data.length + n);
  buf.set(data);
  for (let i = 0; i < data.length; i++) {
    const c = buf[i];
    if (!c) continue;
    for (let j = 0; j < g.length; j++) buf[i + j] ^= mul(g[j], c);
  }
  return Array.from(buf.slice(data.length));
}

/* ------------------------------------------------------------------ tables
   Level M block structure, versions 1-10:
     [total codewords, ecc per block, group-1 blocks, group-1 data codewords,
      group-2 blocks, group-2 data codewords]
   ------------------------------------------------------------------------- */
const RS_M = {
  1:  [26,  10, 1, 16, 0, 0],
  2:  [44,  16, 1, 28, 0, 0],
  3:  [70,  26, 1, 44, 0, 0],
  4:  [100, 18, 2, 32, 0, 0],
  5:  [134, 24, 2, 43, 0, 0],
  6:  [172, 16, 4, 27, 0, 0],
  7:  [196, 18, 4, 31, 0, 0],
  8:  [242, 22, 2, 38, 2, 39],
  9:  [292, 22, 3, 36, 2, 37],
  10: [346, 26, 4, 43, 1, 44]
};

/** Alignment pattern centre coordinates per version. */
const ALIGN = {
  1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
  6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50]
};

/** 18-bit BCH version information, versions 7-10 (earlier versions carry none). */
const VERSION_BITS = { 7: 0x07c94, 8: 0x085bc, 9: 0x09a99, 10: 0x0a4d3 };

const MAX_VERSION = 10;

const dataCodewords = (v) => {
  const t = RS_M[v];
  return t[2] * t[3] + t[4] * t[5];
};

/** Byte-mode capacity in characters: total data bits, less mode and length. */
const byteCapacity = (v) => (dataCodewords(v) * 8 - 4 - (v < 10 ? 8 : 16)) >> 3;

/* ------------------------------------------------------------------ format
   15-bit BCH format information, XOR-masked with 0x5412. Level M is 0b00.
   ------------------------------------------------------------------------- */
function formatBits(mask) {
  const d = (0 << 3) | mask;
  let v = d << 10;
  for (let i = 4; i >= 0; i--) if (v & (1 << (i + 10))) v ^= 0x537 << i;
  return ((d << 10) | v) ^ 0x5412;
}

/* ------------------------------------------------------------------ mask fns */
const MASKS = [
  (r, c) => (r + c) % 2 === 0,
  (r, c) => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0
];

/* ------------------------------------------------------------------ bitstream */
function bitstream(bytes, version) {
  const bits = [];
  const push = (val, len) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1);
  };

  push(0b0100, 4);                                  // byte mode
  push(bytes.length, version < 10 ? 8 : 16);        // character count
  for (const b of bytes) push(b, 8);

  const capacityBits = dataCodewords(version) * 8;
  push(0, Math.min(4, capacityBits - bits.length)); // terminator
  while (bits.length % 8) bits.push(0);             // pad to a byte boundary

  const words = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
    words.push(b);
  }
  // pad codewords alternate 0xEC / 0x11 until the block is full
  const pads = [0xec, 0x11];
  for (let i = 0; words.length < dataCodewords(version); i++) words.push(pads[i % 2]);
  return words;
}

/** Split into blocks, add ECC, then interleave data then ECC as the spec requires. */
function codewords(words, version) {
  const [, eccPer, g1, g1d, g2, g2d] = RS_M[version];
  const blocks = [];
  let at = 0;
  for (let i = 0; i < g1; i++) { blocks.push(words.slice(at, at + g1d)); at += g1d; }
  for (let i = 0; i < g2; i++) { blocks.push(words.slice(at, at + g2d)); at += g2d; }

  const eccs = blocks.map((b) => eccBlock(b, eccPer));
  const out = [];
  const longest = Math.max(...blocks.map((b) => b.length));
  for (let i = 0; i < longest; i++)
    for (const b of blocks) if (i < b.length) out.push(b[i]);
  for (let i = 0; i < eccPer; i++) for (const e of eccs) out.push(e[i]);
  return out;
}

/* ------------------------------------------------------------------ matrix */
function blank(version) {
  const n = version * 4 + 17;
  const m = [], fn = [];
  for (let i = 0; i < n; i++) {
    m.push(new Uint8Array(n));
    fn.push(new Uint8Array(n));       // 1 = function pattern or reserved area
  }

  const set = (r, c, v) => { m[r][c] = v; fn[r][c] = 1; };

  // finder patterns with their separators
  const finder = (top, left) => {
    for (let r = -1; r <= 7; r++) for (let c = -1; c <= 7; c++) {
      const rr = top + r, cc = left + c;
      if (rr < 0 || cc < 0 || rr >= n || cc >= n) continue;
      const ring = Math.max(Math.abs(r - 3), Math.abs(c - 3));
      set(rr, cc, ring === 2 || ring === 4 ? 0 : ring <= 3 ? 1 : 0);
    }
  };
  finder(0, 0); finder(0, n - 7); finder(n - 7, 0);

  // timing patterns
  for (let i = 8; i < n - 8; i++) {
    const v = i % 2 === 0 ? 1 : 0;
    set(6, i, v); set(i, 6, v);
  }

  // alignment patterns, skipping the three that would sit on a finder
  const cs = ALIGN[version];
  const last = cs[cs.length - 1];
  for (const r of cs) for (const c of cs) {
    if ((r === 6 && c === 6) || (r === 6 && c === last) || (r === last && c === 6)) continue;
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
      const ring = Math.max(Math.abs(dr), Math.abs(dc));
      set(r + dr, c + dc, ring === 1 ? 0 : 1);
    }
  }

  // dark module
  set(n - 8, 8, 1);

  // reserve the two format-information strips
  for (let i = 0; i <= 8; i++) {
    if (i !== 6) { fn[8][i] = 1; fn[i][8] = 1; }
  }
  for (let i = 0; i < 8; i++) { fn[8][n - 1 - i] = 1; fn[n - 1 - i][8] = 1; }

  // reserve the version-information blocks
  if (version >= 7) {
    for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) {
      fn[n - 11 + j][i] = 1;
      fn[i][n - 11 + j] = 1;
    }
  }

  return { m, fn, n };
}

/** Zigzag data placement: column pairs right to left, skipping the timing column. */
function place(m, fn, n, words) {
  const bits = [];
  for (const w of words) for (let i = 7; i >= 0; i--) bits.push((w >>> i) & 1);

  let at = 0, up = true;
  for (let right = n - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let v = 0; v < n; v++) {
      for (let j = 0; j < 2; j++) {
        const c = right - j;
        const r = up ? n - 1 - v : v;
        if (fn[r][c]) continue;
        m[r][c] = at < bits.length ? bits[at] : 0;
        at++;
      }
    }
    up = !up;
  }
}

function applyMask(m, fn, n, k) {
  const f = MASKS[k];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++)
    if (!fn[r][c] && f(r, c)) m[r][c] ^= 1;
}

function writeInfo(m, n, version, mask) {
  const f = formatBits(mask);
  const bit = (i) => (f >> i) & 1;

  // Copy 1 wraps the top-left finder. The horizontal arm runs from the most
  // significant bit inward; the vertical arm runs from the least significant
  // bit down. Getting these two backwards still produces a tidy-looking
  // square that no scanner can read, so both arms are pinned by the
  // matrix diff in tools/verify-qr.py.
  for (let i = 0; i <= 5; i++) m[8][i] = bit(14 - i);
  m[8][7] = bit(8);
  m[8][8] = bit(7);
  m[7][8] = bit(6);
  for (let i = 0; i <= 5; i++) m[i][8] = bit(i);

  // Copy 2 is split between the other two finders. The vertical arm stops one
  // short of the dark module at (n-8, 8) — it is not a format cell.
  for (let i = 0; i <= 7; i++) m[8][n - 1 - i] = bit(i);
  for (let i = 8; i <= 14; i++) m[n - 15 + i][8] = bit(i);

  if (version >= 7) {
    const vb = VERSION_BITS[version];
    for (let i = 0; i < 18; i++) {
      const b = (vb >> i) & 1;
      m[Math.floor(i / 3)][n - 11 + (i % 3)] = b;
      m[n - 11 + (i % 3)][Math.floor(i / 3)] = b;
    }
  }
}

/* ------------------------------------------------------------------ penalties
   The four standard scoring rules. The lowest total wins.
   ------------------------------------------------------------------------- */
function penalty(m, n) {
  let score = 0;

  // rule 1 — runs of five or more of the same colour
  const runs = (get) => {
    for (let a = 0; a < n; a++) {
      let run = 1;
      for (let b = 1; b < n; b++) {
        if (get(a, b) === get(a, b - 1)) run++;
        else { if (run >= 5) score += run - 2; run = 1; }
      }
      if (run >= 5) score += run - 2;
    }
  };
  runs((r, c) => m[r][c]);
  runs((c, r) => m[r][c]);

  // rule 2 — 2x2 blocks of one colour
  for (let r = 0; r < n - 1; r++) for (let c = 0; c < n - 1; c++) {
    const v = m[r][c];
    if (v === m[r][c + 1] && v === m[r + 1][c] && v === m[r + 1][c + 1]) score += 3;
  }

  // rule 3 — a finder-like 1:1:3:1:1 run beside four light modules
  const A = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const B = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
  const seq = (get) => {
    for (let a = 0; a < n; a++) for (let b = 0; b <= n - 11; b++) {
      let okA = true, okB = true;
      for (let i = 0; i < 11; i++) {
        const v = get(a, b + i);
        if (v !== A[i]) okA = false;
        if (v !== B[i]) okB = false;
        if (!okA && !okB) break;
      }
      if (okA) score += 40;
      if (okB) score += 40;
    }
  };
  seq((r, c) => m[r][c]);
  seq((c, r) => m[r][c]);

  // rule 4 — how far the dark proportion strays from half
  let dark = 0;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) dark += m[r][c];
  const pct = (dark * 100) / (n * n);
  score += Math.floor(Math.abs(pct - 50) / 5) * 10;

  return score;
}

/* ------------------------------------------------------------------ encode */
/**
 * Encode text as a QR symbol.
 * @param {string} text
 * @param {{mask?: number}} [opts] force a mask pattern, for verification only
 * @returns {{size: number, version: number, mask: number, modules: number[][]}}
 */
function encode(text, opts) {
  const bytes = Buffer.from(String(text), 'utf8');

  let version = 0;
  for (let v = 1; v <= MAX_VERSION; v++) {
    if (bytes.length <= byteCapacity(v)) { version = v; break; }
  }
  if (!version) {
    throw new Error('QR: ' + bytes.length + ' bytes exceeds the '
      + byteCapacity(MAX_VERSION) + '-byte limit of version ' + MAX_VERSION
      + ' at error correction M. Use a shorter URL.');
  }

  const words = codewords(bitstream(bytes, version), version);
  const forced = opts && Number.isInteger(opts.mask) ? opts.mask : null;

  let best = null;
  for (let k = 0; k < 8; k++) {
    if (forced !== null && k !== forced) continue;
    const { m, fn, n } = blank(version);
    place(m, fn, n, words);
    applyMask(m, fn, n, k);
    // Scored before the information strips are written, so the score depends
    // only on the data region — the same convention the reference library uses.
    const score = penalty(m, n);
    if (!best || score < best.score) {
      writeInfo(m, n, version, k);
      best = { score, mask: k, m, n };
    }
  }

  return {
    size: best.n,
    version: version,
    mask: best.mask,
    modules: best.m.map((row) => Array.from(row))
  };
}

/* ------------------------------------------------------------------ render */
const NAVY = '#0C1436';
const WHITE = '#FFFFFF';

/**
 * Vector QR, in Master Electronics colours. Scales to any size, including print.
 * @param {string} text
 * @param {{px?: number, quiet?: number, dark?: string, light?: string}} [opts]
 */
function svg(text, opts) {
  const o = opts || {};
  const px = Math.max(1, Math.min(40, o.px || 10));
  const q = o.quiet === undefined ? 4 : Math.max(0, o.quiet);
  const { modules, size } = encode(text);
  const dim = (size + q * 2) * px;

  let path = '';
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
    if (modules[r][c])
      path += 'M' + (c + q) * px + ' ' + (r + q) * px + 'h' + px + 'v' + px + 'h' + -px + 'z';
  }

  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + dim + '" height="' + dim + '" '
    + 'viewBox="0 0 ' + dim + ' ' + dim + '" shape-rendering="crispEdges" role="img" '
    + 'aria-label="Scan to join the Master Electronics TMR session">\n'
    + '  <title>Join the TMR session</title>\n'
    + '  <rect width="' + dim + '" height="' + dim + '" rx="' + px * 2 + '" fill="'
    + (o.light || WHITE) + '"/>\n'
    + '  <path d="' + path + '" fill="' + (o.dark || NAVY) + '"/>\n'
    + '</svg>\n';
}

/* PNG: 1-bit indexed colour. Hand-built because it is a handful of lines and
   keeps the zero-dependency promise. */
const CRC_TABLE = (function () {
  const t = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

/**
 * Raster QR for slides, Teams and posters.
 * @param {string} text
 * @param {{target?: number, quiet?: number}} [opts] target is the edge length in px
 */
function png(text, opts) {
  const o = opts || {};
  const q = o.quiet === undefined ? 4 : Math.max(0, o.quiet);
  const { modules, size } = encode(text);
  const across = size + q * 2;
  const scale = Math.max(1, Math.floor((o.target || 1200) / across));
  const dim = across * scale;

  // one byte carries eight pixels, most significant bit first
  const stride = Math.ceil(dim / 8);
  const raw = Buffer.alloc((stride + 1) * dim);
  for (let y = 0; y < dim; y++) {
    const rowAt = y * (stride + 1);
    raw[rowAt] = 0;                                    // filter type: none
    const mr = Math.floor(y / scale) - q;
    if (mr < 0 || mr >= size) continue;
    const row = modules[mr];
    for (let x = 0; x < dim; x++) {
      const mc = Math.floor(x / scale) - q;
      if (mc < 0 || mc >= size || !row[mc]) continue;   // palette index 0 = white
      raw[rowAt + 1 + (x >> 3)] |= 0x80 >> (x & 7);     // palette index 1 = navy
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(dim, 0);
  ihdr.writeUInt32BE(dim, 4);
  ihdr[8] = 1;      // bit depth
  ihdr[9] = 3;      // colour type: indexed
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('PLTE', Buffer.from([0xff, 0xff, 0xff, 0x0c, 0x14, 0x36])),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

module.exports = { encode, svg, png, byteCapacity, MAX_VERSION };
