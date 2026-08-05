/* Dumps a QR matrix as JSON so verify-qr.py can diff it against the reference
   library. Development tool only — the workshop never runs this.

       node tools/qr-dump.js "https://example.com/join" [mask]
*/
'use strict';

const path = require('path');
const qr = require(path.join(__dirname, '..', 'qr.js'));

const text = process.argv[2] || '';
const mask = process.argv[3] === undefined ? undefined : Number(process.argv[3]);

const r = qr.encode(text, mask === undefined ? undefined : { mask: mask });
process.stdout.write(JSON.stringify({
  size: r.size, version: r.version, mask: r.mask, modules: r.modules
}));
