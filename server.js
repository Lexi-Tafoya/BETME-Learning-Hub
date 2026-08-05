/* ============================================================================
   TMR LEARNING EXPERIENCE — LIVE SESSION SERVER
   Master Electronics | INTERNAL

   Zero dependencies. Node built-ins only. No npm install.

       node server.js

   ROUTES
     /              landing card with all three links + the session code
     /presenter     facilitator console — controls, notes, room capture
     /display       clean projected presentation — no controls, no notes
     /join          participant phone experience
     /qr            the join QR, drawn on demand for whatever address the
                    request arrived on — LAN, tunnel or hosted URL

   REAL TIME
     Server-Sent Events (/api/events). One long-lived HTTP stream per device.
     Chosen over WebSockets deliberately: it survives proxies, needs no
     handshake library, reconnects automatically in every browser, and has
     zero dependencies.

   PRIVACY — enforced here, not just promised
     Stored per response: sessionId, anonymous participant id, activity id,
     the answer, submission time. Nothing else.
     Never stored: names, emails, employee ids, Microsoft identities, IP
     addresses, user agents. The participant id is random, opaque, and
     discarded when the session resets. Nothing is written to disk.
   ========================================================================= */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const qrcode = require('./qr.js');

const PORT = Number(process.env.PORT || 8080);
const ROOT = __dirname;

/* ------------------------------------------------------------------ session */
const rnd = (n) => crypto.randomBytes(n).toString('hex');
function makeCode() {
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';     // no I O 0 1
  let s = '';
  for (let i = 0; i < 4; i++) s += A[crypto.randomInt(A.length)];
  return s;
}

function fresh() {
  return {
    id: rnd(6),
    code: makeCode(),
    live: false,                 // has the facilitator started the session
    stepIndex: 0,
    rv: 1,
    activity: null,              // stepId of the OPEN activity, or null
    accepting: false,            // are submissions being accepted
    resultsVisible: false,
    revealed: false,
    timerRunning: false,
    timerBase: 0,                // ms accumulated
    timerAt: 0,                  // epoch when started
    participants: new Map(),     // pid -> lastSeen   (no personal data)
    responses: new Map(),        // stepId -> Map(pid -> {[key]: value})
    tally: new Map()             // stepId::key -> {optionIndex: count}  (backup mode)
  };
}

let S = fresh();
const clients = new Set();

/* ------------------------------------------------------- facilitator access
   The console needs a key so a participant cannot drive the session. Having to
   carry that key in the URL was a real source of trouble: opening /presenter
   without it left every control silently returning 401, which on the day looks
   exactly like the phones being broken.

   So the first visit to /presenter from this laptop claims the console and gets
   the key back in an httpOnly cookie. Nothing to copy, nothing to paste. The
   printed ?key=… link still works, and using it also sets the cookie, so a
   later refresh without the query string stays authorised.

   Auto-claim is restricted to loopback — the machine actually running the
   server. Behind a proxy or on a hosted URL nobody is loopback, so there the
   key is still required; set FAC_KEY to a value of your own and the presenter
   link becomes stable enough to bookmark.
   ------------------------------------------------------------------------- */
const FAC_KEY = process.env.FAC_KEY || rnd(8);
const FAC_FROM_ENV = !!process.env.FAC_KEY;
const FAC_COOKIE = 'tmrfac';
let facClaimed = false;

function cookies(req) {
  const out = {};
  const raw = (req.headers && req.headers.cookie) || '';
  for (const part of raw.split(';')) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    out[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
  }
  return out;
}

/** True only for the machine running the server, and never through a proxy. */
function loopback(req) {
  const h = req.headers || {};
  if (h['x-forwarded-for'] || h['x-forwarded-host']) return false;
  const a = (req.socket && req.socket.remoteAddress) || '';
  return a === '127.0.0.1' || a === '::1' || a === '::ffff:127.0.0.1';
}

function authed(req, key) {
  if (key && key === FAC_KEY) return true;
  return cookies(req)[FAC_COOKIE] === FAC_KEY;
}

function facCookie(req) {
  const secure = /^https/.test((req.headers['x-forwarded-proto'] || '').split(',')[0].trim());
  return FAC_COOKIE + '=' + FAC_KEY + '; Path=/; Max-Age=43200; HttpOnly; SameSite=Lax'
    + (secure ? '; Secure' : '');
}

/* ------------------------------------------------------------------ helpers */
function prune() {
  const cut = Date.now() - 75_000;
  for (const [pid, t] of S.participants) if (t < cut) S.participants.delete(pid);
}

function timerMs() {
  return S.timerBase + (S.timerRunning ? Date.now() - S.timerAt : 0);
}

/** Aggregate to counts only. Free text is returned as an anonymous list. */
function counts() {
  const out = {};
  const bump = (k, v) => {
    if (!out[k]) out[k] = {};
    out[k][v] = (out[k][v] || 0) + 1;
  };
  for (const [stepId, m] of S.responses) {
    for (const payload of m.values()) {
      for (const key in payload) {
        const v = payload[key];
        if (v === null || v === undefined || v === '') continue;
        const k = stepId + '::' + key;
        if (Array.isArray(v)) v.forEach((x) => bump(k, x));
        else if (typeof v === 'string' && !/^\d+$/.test(v)) {
          // free text: keep anonymous content for the themes view, no ids
          if (!out[k]) out[k] = {};
          if (!out[k]._texts) out[k]._texts = [];
          if (out[k]._texts.length < 60) out[k]._texts.push(v.slice(0, 400));
        } else bump(k, v);
      }
    }
  }
  // facilitator backup entry merges in on top
  for (const [k, bag] of S.tally) {
    if (!out[k]) out[k] = {};
    for (const opt in bag) out[k][opt] = (out[k][opt] || 0) + bag[opt];
  }
  return out;
}

function submittedFor(stepId) {
  const m = S.responses.get(stepId);
  return m ? m.size : 0;
}

function state() {
  prune();
  return {
    sessionId: S.id,
    code: S.code,
    live: S.live,
    stepIndex: S.stepIndex,
    rv: S.rv,
    activity: S.activity,
    accepting: S.accepting,
    resultsVisible: S.resultsVisible,
    revealed: S.revealed,
    timerRunning: S.timerRunning,
    timerMs: timerMs(),
    participants: S.participants.size,
    submitted: S.activity ? submittedFor(S.activity) : 0,
    counts: counts(),
    serverTime: Date.now()
  };
}

function broadcast() {
  const line = 'data: ' + JSON.stringify(state()) + '\n\n';
  for (const c of clients) {
    try { c.res.write(line); } catch (_) { clients.delete(c); }
  }
}

function send(res, code, body, type) {
  res.writeHead(code, {
    'Content-Type': type || 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}

function body(req) {
  return new Promise((resolve) => {
    let d = '';
    req.on('data', (c) => { d += c; if (d.length > 200000) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(d || '{}')); } catch (_) { resolve({}); } });
  });
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8'
};

function serveFile(res, rel, extra) {
  const full = path.join(ROOT, path.normalize(rel).replace(/^(\.\.[/\\])+/, ''));
  if (!full.startsWith(ROOT)) return send(res, 403, { error: 'forbidden' });
  fs.stat(full, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, '<h1>404</h1><p><a href="/">Back</a></p>',
      'text/html; charset=utf-8');
    res.writeHead(200, Object.assign({
      'Content-Type': MIME[path.extname(full).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache', 'Content-Length': st.size
    }, extra || {}));
    fs.createReadStream(full).pipe(res);
  });
}

/* ------------------------------------------------------------------ network */
function ips() {
  const out = [];
  const nets = os.networkInterfaces();
  for (const k of Object.keys(nets))
    for (const ni of nets[k] || [])
      if (ni.family === 'IPv4' && !ni.internal) out.push(ni.address);
  return out;
}

/**
 * The address a participant's phone should use.
 *
 * Resolved per request rather than once at startup, because the right answer
 * changes: on a LAN it is this laptop's current address, behind a tunnel or on
 * a hosted plan it is the public hostname the request came in on. A pre-baked
 * URL is wrong the moment the Wi-Fi changes, which is exactly how a QR code
 * ends up pointing at nothing in front of a room.
 */
function baseUrl(req) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/$/, '');
  const h = (req && req.headers) || {};
  const first = (v) => String(v || '').split(',')[0].trim();
  const host = first(h['x-forwarded-host']) || first(h.host);
  // A phone cannot reach "localhost" — that name only ever means the laptop
  // itself. When the console is open on localhost, hand out the LAN address.
  if (!host || /^(localhost|127\.0\.0\.1|\[::1\]|::1)(:\d+)?$/i.test(host))
    return 'http://' + (ips()[0] || 'localhost') + ':' + PORT;
  return (first(h['x-forwarded-proto']) || 'http') + '://' + host;
}

const joinUrl = (req) => baseUrl(req) + '/join';

/* ------------------------------------------------------------------ routes */
const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const p = u.pathname.replace(/\/+$/, '') || '/';

  /* ---- SSE stream */
  if (p === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    });
    res.write('retry: 1500\n\n');
    const pid = /^[a-f0-9]{16}$/.test(u.searchParams.get('pid') || '')
      ? u.searchParams.get('pid') : null;
    const c = { res, pid };
    clients.add(c);
    if (pid) S.participants.set(pid, Date.now());
    res.write('data: ' + JSON.stringify(state()) + '\n\n');
    const hb = setInterval(() => {
      try { res.write(': hb\n\n'); if (pid) S.participants.set(pid, Date.now()); }
      catch (_) { clearInterval(hb); }
    }, 15000);
    req.on('close', () => { clearInterval(hb); clients.delete(c); broadcast(); });
    broadcast();
    return;
  }

  if (p === '/api/state') return send(res, 200, state());

  if (p === '/api/join' && req.method === 'POST') {
    const b = await body(req);
    const pid = /^[a-f0-9]{16}$/.test(b.pid || '') ? b.pid : rnd(8);
    S.participants.set(pid, Date.now());
    broadcast();
    return send(res, 200, { pid, code: S.code, state: state() });
  }

  if (p === '/api/submit' && req.method === 'POST') {
    const b = await body(req);
    if (!b.pid || !b.stepId) return send(res, 400, { error: 'pid and stepId required' });
    if (!S.accepting || S.activity !== b.stepId)
      return send(res, 409, { error: 'closed', activity: S.activity });
    if (!S.responses.has(b.stepId)) S.responses.set(b.stepId, new Map());
    // one record per participant per activity: re-submitting REPLACES, never doubles
    S.responses.get(b.stepId).set(b.pid, Object.assign({}, b.payload || {}));
    S.participants.set(b.pid, Date.now());
    broadcast();
    return send(res, 200, { ok: true, submitted: submittedFor(b.stepId) });
  }

  if (p === '/api/control' && req.method === 'POST') {
    const b = await body(req);
    if (!authed(req, b.key)) return send(res, 401, { error: 'facilitator key required' });
    switch (b.action) {
      case 'start':    S.live = true; break;
      case 'stage':    S.stepIndex = Math.max(0, b.stepIndex | 0); S.rv = Math.max(1, b.rv | 0);
                       break;
      case 'open':     S.activity = b.stepId || null;
                       S.accepting = !!b.stepId;      // null stepId = no activity open
                       S.resultsVisible = false; S.revealed = false; break;
      case 'close':    S.accepting = false; break;
      case 'reopen':   S.accepting = true; break;
      case 'results':  S.resultsVisible = !!b.show; break;
      case 'reveal':   S.revealed = !!b.show; break;
      case 'timer':
        if (b.mode === 'start') { if (!S.timerRunning) { S.timerAt = Date.now(); S.timerRunning = true; } }
        else if (b.mode === 'pause') { S.timerBase = timerMs(); S.timerRunning = false; }
        else if (b.mode === 'reset') { S.timerBase = 0; S.timerRunning = false; }
        break;
      case 'tally':    if (b.k) S.tally.set(b.k, b.bag || {}); break;
      case 'clearStep':S.responses.delete(b.stepId);
                       for (const k of [...S.tally.keys()]) if (k.startsWith(b.stepId + '::')) S.tally.delete(k);
                       break;
      case 'reset':    { const code = S.code; S = fresh(); S.code = code; S.live = true; break; }
      case 'newcode':  S.code = makeCode(); break;
      default: return send(res, 400, { error: 'unknown action' });
    }
    broadcast();
    return send(res, 200, state());
  }

  if (p === '/api/export') {
    if (!authed(req, u.searchParams.get('key'))) return send(res, 401, { error: 'key required' });
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="tmr-session-results.json"'
    });
    return res.end(JSON.stringify({
      exportedAt: new Date().toISOString(),
      note: 'Anonymous aggregate. No names, emails, employee ids or IP addresses are collected.',
      sessionCode: S.code, participants: S.participants.size, counts: counts()
    }, null, 2));
  }

  /* ---- QR: drawn now, for the address this request actually arrived on */
  if (p === '/qr' || p === '/qr.svg' || p === '/qr.png') {
    const target = joinUrl(req);
    try {
      if (p === '/qr.png') {
        const buf = qrcode.png(target, { target: Number(u.searchParams.get('size')) || 1200 });
        return send(res, 200, buf, 'image/png');
      }
      return send(res, 200, qrcode.svg(target, { px: Number(u.searchParams.get('px')) || 10 }),
        'image/svg+xml; charset=utf-8');
    } catch (e) {
      return send(res, 500, { error: String(e.message || e) });
    }
  }

  /* ---- roles */
  if (p === '/presenter') {
    const ok = authed(req, u.searchParams.get('key'));
    const claim = ok || (!facClaimed && loopback(req));
    if (claim) facClaimed = true;
    return serveFile(res, 'index.html', claim ? { 'Set-Cookie': facCookie(req) } : undefined);
  }
  if (p === '/display')   return serveFile(res, 'index.html');
  if (p === '/join')      return serveFile(res, 'join.html');

  /* Lets the console tell the facilitator plainly whether it is in control,
     instead of leaving them to infer it from controls that quietly do nothing. */
  if (p === '/api/whoami') return send(res, 200, {
    facilitator: authed(req, u.searchParams.get('key')),
    claimed: facClaimed,
    keyFromEnv: FAC_FROM_ENV,
    hosted: !loopback(req),
    joinUrl: joinUrl(req)          // so the QR modal shows the address phones use
  });

  if (p === '/') {
    const b = baseUrl(req);
    return send(res, 200, `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>TMR Session</title>
<link rel="stylesheet" href="/style.css"><link rel="icon" href="/assets/icons/favicon.svg">
<style>body{position:static;overflow:auto;display:grid;place-items:center;min-height:100vh}
.w{max-width:720px;padding:40px 24px}a.card{display:block;text-decoration:none;margin:0 0 14px}
.code{font:700 44px/1 var(--mono);letter-spacing:.18em;color:var(--cream)}</style></head><body>
<div class="w">
<p class="eyebrow">Master Electronics &middot; Business Enablement &middot; INTERNAL</p>
<h1 style="font-size:36px">Building the Future of Talent</h1>
<p class="lede">Live session is ready. Open the links below on the right devices.</p>
<div class="card tint" style="margin:22px 0"><p class="kicker">Session code</p>
  <div class="code">${S.code}</div>
  <p class="small" style="margin:10px 0 0">Participants can also type this on the join screen.</p></div>
<a class="card" href="/presenter"><h3 style="margin:0 0 4px">Facilitator console &rarr;</h3>
  <p class="small" style="margin:0">Your laptop. Controls, presenter notes, room capture. Keep private.</p></a>
<a class="card" href="/display"><h3 style="margin:0 0 4px">Projected display &rarr;</h3>
  <p class="small" style="margin:0">The room screen. Clean presentation, no controls, no notes.</p></a>
<a class="card" href="/join"><h3 style="margin:0 0 4px">Participant join &rarr;</h3>
  <p class="small" style="margin:0">What the QR code opens. Phones only need this one link all session.</p></a>
<div class="card" style="margin-top:22px"><p class="kicker">Join QR</p>
  <img src="/qr?px=6" alt="Join QR code" style="width:210px;background:#fff;padding:8px;border-radius:10px">
  <p class="small" style="margin:12px 0 0;word-break:break-all">${b}/join</p></div>
<p class="src">Foundational learning &mdash; not an implementation of a Business Enablement TMR
process.</p></div></body></html>`, 'text/html; charset=utf-8');
  }

  return serveFile(res, u.pathname);
});

/* ------------------------------------------------------------------ boot */
server.listen(PORT, () => {
  const list = ips();
  const lan = list[0];
  const bar = '='.repeat(70);
  console.log('\n' + bar);
  console.log('  TMR LEARNING EXPERIENCE  —  live session server');
  console.log(bar);
  console.log('\n  SESSION CODE:   ' + S.code + '\n');
  console.log('  FACILITATOR   (your laptop, keep private)');
  console.log('     http://localhost:' + PORT + '/presenter');
  console.log('       Opening that on this laptop claims the console — no key to paste.');
  console.log('     http://localhost:' + PORT + '/presenter?key=' + FAC_KEY);
  console.log('       Use this one from any other device, or to take control back.\n');
  console.log('  PROJECTED DISPLAY   (the room screen)');
  console.log('     http://localhost:' + PORT + '/display\n');
  console.log('  PARTICIPANTS   (this is what the QR code points to)');
  if (lan) console.log('     http://' + lan + ':' + PORT + '/join');
  for (const ip of list.slice(1)) console.log('     http://' + ip + ':' + PORT + '/join');
  if (!lan) console.log('     http://localhost:' + PORT + '/join   (no LAN interface found)');
  console.log('\n  JOIN QR CODE   drawn on demand, always matches the address above');
  console.log('     http://localhost:' + PORT + '/qr\n');
  console.log('  Landing page with every link:  http://localhost:' + PORT + '/');
  console.log('\n  Phones must be on the same network as this laptop.');
  console.log('  Ctrl+C ends the session. Nothing is written to disk.');
  console.log('\n' + bar + '\n');
});

process.on('SIGINT', () => {
  console.log('\n  Session ended. All responses discarded.\n');
  process.exit(0);
});
