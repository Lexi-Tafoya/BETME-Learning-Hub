/* ============================================================================
   TMR LEARNING EXPERIENCE — LIVE SERVER CHECKS
   Master Electronics | INTERNAL

   Exercises the session server the way a real workshop does, including the
   things that have actually gone wrong: a facilitator console with no key, a QR
   pointing at an address no phone can reach, a duplicate submission counted
   twice, and a participant id leaking into the projected state.

   Zero dependencies. Start the server on a spare port, then:

       node tools/check-server.js http://localhost:8099

   Exits non-zero on the first failing assertion, so it can gate a release.
   ========================================================================= */
'use strict';

const http = require('http');
const path = require('path');
const qrcode = require(path.join(__dirname, '..', 'qr.js'));

const BASE = (process.argv[2] || 'http://localhost:8099').replace(/\/$/, '');

let passed = 0;
const failures = [];

function ok(name, cond, detail) {
  if (cond) { passed++; console.log('  ok    ' + name); }
  else {
    failures.push(name + (detail ? '  —  ' + detail : ''));
    console.log('  FAIL  ' + name + (detail ? '  —  ' + detail : ''));
  }
}

function req(p, opts) {
  const o = opts || {};
  return fetch(BASE + p, {
    method: o.method || 'GET',
    headers: o.headers || {},
    body: o.body ? JSON.stringify(o.body) : undefined,
    redirect: 'manual'
  });
}

const json = (p, o) => req(p, o).then((r) => r.json().then((j) => ({ r, j })));

/** One SSE frame, so the test never hangs on a stream that stays open. */
function firstEvent(query) {
  return new Promise((resolve, reject) => {
    const u = new URL(BASE + '/api/events' + (query || ''));
    const r = http.get(u, (res) => {
      let buf = '';
      res.on('data', (c) => {
        buf += c;
        const at = buf.indexOf('data: ');
        const nl = at >= 0 ? buf.indexOf('\n\n', at) : -1;
        if (nl > 0) {
          r.destroy();
          try { resolve(JSON.parse(buf.slice(at + 6, nl))); } catch (e) { reject(e); }
        }
      });
      res.on('error', reject);
    });
    r.on('error', reject);
    setTimeout(() => { r.destroy(); reject(new Error('no SSE frame in 4s')); }, 4000);
  });
}

(async function main() {
  const bar = '='.repeat(72);
  console.log('\n' + bar + '\n  live server checks against ' + BASE + '\n' + bar + '\n');

  /* ---------------------------------------------------------- pages and QR */
  console.log('  pages');
  for (const [p, needle] of [['/', 'Session code'], ['/display', '<title>'],
                             ['/join', '<title>']]) {
    const r = await req(p);
    const body = await r.text();
    ok(p + ' serves html', r.status === 200 && body.indexOf(needle) >= 0,
      'status ' + r.status);
  }

  console.log('\n  join QR, drawn for the address the request arrived on');
  const who0 = (await json('/api/whoami')).j;
  const lanJoin = who0.joinUrl;
  ok('join url is not localhost', !/localhost|127\.0\.0\.1/.test(lanJoin), lanJoin);

  const svg = await (await req('/qr.svg')).text();
  ok('/qr.svg encodes the join url', svg === qrcode.svg(lanJoin));
  const svg6 = await (await req('/qr?px=6')).text();
  ok('/qr?px=6 honours the module size', svg6 === qrcode.svg(lanJoin, { px: 6 }));
  const pngRes = await req('/qr.png');
  const png = Buffer.from(await pngRes.arrayBuffer());
  ok('/qr.png encodes the join url',
    pngRes.headers.get('content-type') === 'image/png'
    && png.equals(qrcode.png(lanJoin)));

  // A hosted deploy reaches the server through a proxy. The QR must follow the
  // public hostname, or every phone scans a code pointing at a private address.
  const proxied = { 'x-forwarded-host': 'tmr.example.com', 'x-forwarded-proto': 'https',
                    'x-forwarded-for': '203.0.113.9' };
  const hostedSvg = await (await req('/qr.svg', { headers: proxied })).text();
  ok('QR follows x-forwarded-host on a hosted deploy',
    hostedSvg === qrcode.svg('https://tmr.example.com/join'));

  /* ------------------------------------------------------- facilitator access
     The console can only be claimed once per server process, so the claim
     assertions need a server that nothing has driven yet. Rather than silently
     failing on a re-run, the script detects that and says which checks it
     skipped and how to get them back. */
  console.log('\n  facilitator access');
  const key = process.env.FAC_KEY || null;
  let cookie = {};                 // cookie header, once we hold the console
  const withKey = (b) => (key && !cookie.cookie ? Object.assign({ key: key }, b) : b);
  const ctl = (b) => json('/api/control',
    { method: 'POST', headers: cookie, body: withKey(b) });

  if (who0.claimed) {
    console.log('  skip  console-claim checks — this server has already been driven.');
    console.log('        Restart it to include them.');
    if (!key) {
      failures.push('cannot authenticate: server already claimed and FAC_KEY is not set');
      console.log('  FAIL  cannot authenticate — restart the server, or set FAC_KEY');
    }
  } else {
    const noKey = await json('/api/control', { method: 'POST', body: { action: 'stage' } });
    ok('control with no key is refused', noKey.r.status === 401, 'status ' + noKey.r.status);

    const pres = await req('/presenter');
    const setCookie = pres.headers.get('set-cookie') || '';
    // 16 random hex characters, or whatever FAC_KEY was set to.
    ok('the first device to open /presenter becomes the console', /tmrfac=\S+/.test(setCookie),
      setCookie || '(no Set-Cookie)');
    ok('the cookie is httpOnly and same-site', /HttpOnly/i.test(setCookie)
      && /SameSite=Lax/i.test(setCookie));
    cookie = { cookie: setCookie.split(';')[0] };

    const me = await json('/api/whoami', { headers: cookie });
    ok('whoami confirms control with the cookie alone',
      me.j.facilitator === true && me.j.claimed === true, JSON.stringify(me.j));

    const byCookie = await json('/api/control',
      { method: 'POST', headers: cookie, body: { action: 'stage', stepIndex: 3, rv: 2 } });
    ok('control works on the cookie alone — no key to paste',
      byCookie.r.status === 200 && byCookie.j.stepIndex === 3, 'status ' + byCookie.r.status);

    const stranger = await json('/api/whoami');
    ok('another device is told it is not in control', stranger.j.facilitator === false
      && stranger.j.claimed === true, JSON.stringify(stranger.j));

    // One live console at a time is the whole protection model now, so this is
    // the assertion that matters on a public URL: second arrival gets nothing.
    const second = await req('/presenter', { headers: proxied });
    ok('a second device does not get the console',
      !/tmrfac=/.test(second.headers.get('set-cookie') || ''));

    // Transfer must free the claim AND revoke the old cookie. If it only did the
    // first, a transfer would leave two devices able to drive the room.
    await json('/api/control', { method: 'POST', headers: cookie, body: { action: 'transfer' } });
    const after = await json('/api/whoami', { headers: cookie });
    ok('transfer revokes the previous console', after.j.facilitator === false
      && after.j.claimed === false, JSON.stringify(after.j));

    const next = await req('/presenter');
    const nextCookie = next.headers.get('set-cookie') || '';
    ok('the next device to open /presenter becomes the console',
      /tmrfac=\S+/.test(nextCookie) && nextCookie.indexOf(cookie.cookie.split('=')[1]) < 0);
    cookie = { cookie: nextCookie.split(';')[0] };

    const drives = await json('/api/control',
      { method: 'POST', headers: cookie, body: { action: 'stage', stepIndex: 5, rv: 1 } });
    ok('and it can drive the session', drives.r.status === 200, 'status ' + drives.r.status);
  }

  // No explicit-key assertion any more: a key is no longer part of the
  // facilitator's path, and Transfer control rotates it by design, so anything
  // FAC_KEY was set to is deliberately not honoured after a hand-off.

  /* --------------------------------------------------------------- responses */
  console.log('\n  anonymous responses');
  const pids = [];
  for (let i = 0; i < 3; i++) {
    const j = (await json('/api/join', { method: 'POST', body: {} })).j;
    pids.push(j.pid);
  }
  ok('three phones join with opaque ids',
    pids.length === 3 && pids.every((p) => /^[a-f0-9]{16}$/.test(p))
    && new Set(pids).size === 3);

  const STEP = 'pr-vs-tmr';
  await ctl({ action: 'open', stepId: STEP });

  for (let i = 0; i < 3; i++) {
    const s = await json('/api/submit', { method: 'POST',
      body: { pid: pids[i], stepId: STEP, payload: { choice: i === 2 ? 0 : 1 } } });
    ok('phone ' + (i + 1) + ' submits', s.r.status === 200 && s.j.ok === true,
      'status ' + s.r.status);
  }

  let st = (await json('/api/state')).j;
  ok('answers aggregate to counts', JSON.stringify(st.counts[STEP + '::choice']) ===
    JSON.stringify({ 0: 1, 1: 2 }), JSON.stringify(st.counts[STEP + '::choice']));
  ok('submitted count is three', st.submitted === 3, String(st.submitted));

  // The bug that would quietly corrupt every chart: a phone resubmitting and
  // being counted twice.
  await json('/api/submit', { method: 'POST',
    body: { pid: pids[0], stepId: STEP, payload: { choice: 0 } } });
  st = (await json('/api/state')).j;
  ok('a resubmission replaces, never doubles', st.submitted === 3
    && JSON.stringify(st.counts[STEP + '::choice']) === JSON.stringify({ 0: 2, 1: 1 }),
    st.submitted + ' / ' + JSON.stringify(st.counts[STEP + '::choice']));

  const raw = JSON.stringify(st);
  ok('no participant id appears in the broadcast state',
    pids.every((p) => raw.indexOf(p) < 0));

  await ctl({ action: 'close' });
  const late = await json('/api/submit', { method: 'POST',
    body: { pid: pids[1], stepId: STEP, payload: { choice: 1 } } });
  ok('a late answer is refused once responses close', late.r.status === 409,
    'status ' + late.r.status);

  await ctl({ action: 'reopen' });
  const reopened = await json('/api/submit', { method: 'POST',
    body: { pid: pids[1], stepId: STEP, payload: { choice: 1 } } });
  ok('reopening lets latecomers in', reopened.r.status === 200,
    'status ' + reopened.r.status);

  const free = 'jordan-worksheet';
  await ctl({ action: 'open', stepId: free });
  await json('/api/submit', { method: 'POST', body: { pid: pids[0], stepId: free,
    payload: { missing: 'No peer feedback on the cross-functional work.' } } });
  st = (await json('/api/state')).j;
  const texts = (st.counts[free + '::missing'] || {})._texts || [];
  ok('written answers come back with no attribution',
    texts.length === 1 && texts[0].indexOf('peer feedback') >= 0
    && JSON.stringify(st.counts[free + '::missing']).indexOf(pids[0]) < 0);

  /* --------------------------------------------------------------- streaming */
  console.log('\n  realtime and export');
  const frame = await firstEvent('?pid=' + pids[0]);
  ok('SSE delivers a state frame on connect',
    frame && typeof frame.stepIndex === 'number' && frame.code === st.code);
  ok('SSE frame carries no participant id',
    pids.every((p) => JSON.stringify(frame).indexOf(p) < 0));

  const exNo = await req('/api/export');
  ok('export is refused without control', exNo.status === 401, 'status ' + exNo.status);
  const exYes = await req('/api/export' + (key && !cookie.cookie ? '?key=' + encodeURIComponent(key) : ''), { headers: cookie });
  const exBody = await exYes.text();
  ok('export works on the cookie alone', exYes.status === 200
    && exBody.indexOf('"counts"') >= 0, 'status ' + exYes.status);
  ok('export carries no participant id', pids.every((p) => exBody.indexOf(p) < 0));

  await ctl({ action: 'reset' });
  st = (await json('/api/state')).j;
  ok('reset clears every response', Object.keys(st.counts).length === 0);

  /* ------------------------------------------------------------------ result */
  console.log('\n' + bar);
  if (failures.length) {
    console.log('  FAILED — ' + failures.length + ' of ' + (passed + failures.length));
    for (const f of failures) console.log('    ' + f);
    console.log(bar + '\n');
    process.exit(1);
  }
  console.log('  PASS — all ' + passed + ' checks');
  console.log(bar + '\n');
})().catch((e) => {
  console.error('\n  check run failed: ' + (e && e.stack || e) + '\n');
  process.exit(1);
});
