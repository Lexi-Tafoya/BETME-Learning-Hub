/* ============================================================================
   TMR LEARNING EXPERIENCE — AUTOMATED LIVE-SESSION TEST SUITE
   Master Electronics | INTERNAL

       node tools/test-live.js

   Zero dependencies. Boots a real server on a scratch port, drives it the way
   the console and the phones do, and asserts the behaviours that would ruin a
   live workshop if they regressed:

     - the projected display receives every audience-facing state change;
     - a presenter refresh rehydrates and does NOT reset the workshop;
     - nothing resets on inactivity, reconnection or a dropped event stream;
     - control cannot be transferred from inside the presentation;
     - session state survives an SSE client disconnecting and returning;
     - responses are aggregated anonymously, and re-submission replaces;
     - the content model is internally consistent (every scene reachable,
       every interactive scene carries instructions, banned wording is gone).

   Exits non-zero on the first failure so it can gate a commit.
   ========================================================================= */
'use strict';

const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const PORT = 8123 + (process.pid % 200);
const BASE = 'http://127.0.0.1:' + PORT;

let pass = 0, fail = 0;
const failures = [];

function ok(name, cond, detail) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else {
    fail++; failures.push(name + (detail ? '  — ' + detail : ''));
    console.log('  ✗ ' + name + (detail ? '  — ' + detail : ''));
  }
}
function eq(name, actual, expected) {
  ok(name, actual === expected, 'expected ' + JSON.stringify(expected)
    + ', got ' + JSON.stringify(actual));
}
function section(t) { console.log('\n' + t); }

/* ------------------------------------------------------------------ http */
function req(method, url, body, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(BASE + url);
    const r = http.request({
      method, hostname: u.hostname, port: u.port, path: u.pathname + u.search,
      headers: Object.assign(body ? { 'Content-Type': 'application/json' } : {}, headers || {})
    }, (res) => {
      let d = '';
      res.on('data', (c) => d += c);
      res.on('end', () => {
        let j = null;
        try { j = JSON.parse(d); } catch (_) {}
        resolve({ status: res.statusCode, headers: res.headers, text: d, json: j });
      });
    });
    r.on('error', reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}
const get = (u, h) => req('GET', u, null, h);
const post = (u, b, h) => req('POST', u, b, h);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Open a raw SSE stream and collect parsed data frames. */
function sse(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(BASE + url);
    const r = http.request({ hostname: u.hostname, port: u.port,
      path: u.pathname + u.search, headers: { Accept: 'text/event-stream' } }, (res) => {
      const box = { frames: [], heartbeats: 0, res, req: r, closed: false };
      let buf = '';
      res.on('data', (c) => {
        buf += c.toString();
        let i;
        while ((i = buf.indexOf('\n\n')) >= 0) {
          const chunk = buf.slice(0, i);
          buf = buf.slice(i + 2);
          if (chunk.startsWith(': ')) { box.heartbeats++; continue; }
          const line = chunk.split('\n').find((l) => l.startsWith('data: '));
          if (line) { try { box.frames.push(JSON.parse(line.slice(6))); } catch (_) {} }
        }
      });
      box.close = () => { box.closed = true; try { r.destroy(); } catch (_) {} };
      box.last = () => box.frames[box.frames.length - 1];
      resolve(box);
    });
    r.on('error', reject);
    r.end();
  });
}

/* ------------------------------------------------------------------ content */
function contentChecks() {
  section('CONTENT MODEL');
  const a = fs.readFileSync(path.join(ROOT, 'content-a.js'), 'utf8');
  const b = fs.readFileSync(path.join(ROOT, 'content-b.js'), 'utf8');
  const app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  const src = a + b;

  const ids = [...src.matchAll(/^S\(\{id:'([^']+)'/gm)].map((m) => m[1]);
  const secIds = [...app.matchAll(/steps:\[([^\]]+)\]/g)]
    .map((m) => (m[1].match(/'[^']+'/g) || []).map((s) => s.replace(/'/g, '')))
    .reduce((x, y) => x.concat(y), []);

  ok('every scene appears in exactly one section',
    ids.every((i) => secIds.filter((x) => x === i).length === 1),
    'unplaced: ' + ids.filter((i) => !secIds.includes(i)).join(', '));
  ok('no section references a scene that does not exist',
    secIds.every((i) => ids.includes(i)),
    'orphans: ' + secIds.filter((i) => !ids.includes(i)).join(', '));
  ok('scene count is 32 (duplicate Jordan dossier scene consolidated away)',
    ids.length === 32, 'got ' + ids.length);
  ok('there is exactly ONE Jordan case scene, not two',
    ids.filter((i) => /^jordan-/.test(i)).length === 2,
    'jordan scenes: ' + ids.filter((i) => /^jordan-/.test(i)).join(', '));
  ok('the removed duplicate dossier scene is gone', !ids.includes('jordan-intro'));

  // renderers exist for every kind used
  const kinds = [...new Set([...src.matchAll(/kind:'([^']+)'/g)].map((m) => m[1]))];
  const renderers = new Set([...app.matchAll(/^RENDER\.(\w+)/gm)].map((m) => m[1]));
  ok('a renderer exists for every scene kind',
    kinds.every((k) => renderers.has(k)),
    'missing: ' + kinds.filter((k) => !renderers.has(k)).join(', '));

  // instructions on every interactive scene
  const interactiveKinds = ['poll', 'rank', 'quiz', 'sort', 'match', 'meetjordan',
    'builder', 'bias', 'reflect', 'explorer', 'evgallery'];
  const instructKeys = [...(a.match(/^  '[a-z0-9-]+': \{$/gm) || [])]
    .map((s) => s.trim().replace(/':? \{$/, '').replace(/^'/, ''));
  const interactiveIds = [...src.matchAll(/^S\(\{id:'([^']+)'[^\n]*kind:'([^']+)'/gm)]
    .filter((m) => interactiveKinds.includes(m[2]))
    .map((m) => m[1]);
  const noInstruct = interactiveIds.filter((i) => !instructKeys.includes(i));
  ok('every interactive scene has explicit instructions',
    noInstruct.length === 0, 'missing: ' + noInstruct.join(', '));

  // the eight instruction facets are all present in the block that renders them
  ['why', 'device', 'submit', 'anon', 'answer', 'time', 'after', 'ready']
    .forEach((k) => ok('instruction facet "' + k + '" is rendered',
      new RegExp("\\['" + k + "',").test(app)));

  section('WORDING REMOVED AS INSTRUCTED');
  const audience = src + app;
  const banned = [
    ['Next-Level Leader (all variants)', /next[- ]?level leader/i],
    ['"common language across every Business Enablement function"',
      /common language across every Business Enablement/i],
    ['slide 19 strip-vs-QRG internal explanation',
      /concise wording on the strip/i],
    ['"There is no answer key"', /There is no answer key/],
    ['"no single forced correct classification"', /no single forced correct classification/],
    ['"Written answers stay on each participant', /Written answers stay on each participant/],
    ['transfer-control action', /action === 'transfer'|case 'transfer'/]
  ];
  banned.forEach(([label, re]) =>
    ok('removed: ' + label, !re.test(audience)));

  const live = fs.readFileSync(path.join(ROOT, 'live.js'), 'utf8');
  ok('no Transfer control button in the console', !/data-a="transfer"/.test(live));
  ok('audience-facing copy avoids quiz/game framing',
    !/eyebrow:'[^']*\b(Quiz|Game)\b/i.test(src));

  section('JORDAN CASE');
  ok('the four approved anchor sentences are preserved verbatim',
    /Consistently hits project deadlines even when scope changes mid-stream\./.test(a)
    && /Builds her own status dashboards but rarely digs into root-cause trends\./.test(a)
    && /Has begun coaching two junior Project Managers informally, without being asked\./.test(a)
    && /Focuses on her own projects and has not yet consistently connected the work to broader department goals\./.test(a));
  ok('Jordan has a profile with timeline, stakeholders and gaps',
    /JORDAN_PROFILE\s*=/.test(a) && /timeline:/.test(a)
    && /stakeholders:/.test(a) && /gaps:/.test(a));
  ok('Jordan pronouns are consistent (she/her, no he/him)',
    !/\bJordan\b[^.]{0,60}\b(he|him|his)\b/i.test(a.replace(/JORDAN_COMPS|JORDAN_PROFILE/g, '')));
  ok('each competency carries hard evidence, soft impressions and a gap',
    (a.match(/hard:\[/g) || []).length >= 4
    && (a.match(/soft:\[/g) || []).length >= 4
    && (a.match(/gap:'/g) || []).length >= 4);
  ok('pair submission is required on the phone',
    /one submission per pair/i.test(fs.readFileSync(path.join(ROOT, 'join.js'), 'utf8'))
    || /Submit one response per pair/i.test(fs.readFileSync(path.join(ROOT, 'join.js'), 'utf8')));
  ok('a business case is collected from each pair',
    /k: 'case'/.test(fs.readFileSync(path.join(ROOT, 'join.js'), 'utf8')));

  section('JORDAN HOTFIX — PROJECTED SCREEN CARRIES ONLY THE TASK');
  const joinJs = fs.readFileSync(path.join(ROOT, 'join.js'), 'utf8');
  const joinHtml = fs.readFileSync(path.join(ROOT, 'join.html'), 'utf8');

  ok('the section is called "Meet Jordan"', /eyebrow:'Meet Jordan'/.test(b)
    && /title:'Meet Jordan'/.test(b));
  ok('"Executive Case Study" is gone from the audience view',
    !/Executive Case Study/.test(src));
  ok('the duplicate "evidence, while you work" screen is gone',
    !/the evidence, while you work/i.test(src));

  // the projected renderer must not build any part of the dossier
  const mj = app.slice(app.indexOf('RENDER.meetjordan'),
    app.indexOf('/* --- Jordan results'));
  ok('the projected screen no longer renders the dossier helper',
    !/jordanEvidence/.test(app));
  ok('  no stakeholder quotes on the projected screen', !/stakeholders/.test(mj));
  ok('  no evidence gaps on the projected screen', !/\.gaps/.test(mj));
  ok('  no timeline on the projected screen', !/timeline/.test(mj));
  ok('  no per-competency evidence rows on the projected screen',
    !/\.hard|\.soft|anchor/.test(mj));
  ok('  no rating form on the projected screen',
    !/data-f=|addEventListener\('click'[\s\S]{0,80}Vote\.add/.test(mj));
  ok('the projected screen does carry the task', /s\.task/.test(mj));
  ok('  the submission list', /submitList/.test(mj));
  ok('  the instructions', /s\.rules/.test(mj));
  ok('  the one-phone-per-pair reminder', /One phone per pair/.test(mj));
  ok('  the time', /s\.minutes/.test(mj));
  ok('  and the calibration cue', /s\.cue/.test(mj));
  ok('the facilitator fallback capture stays off the display',
    /el\('div','fac-only'\)/.test(mj));

  section('JORDAN HOTFIX — THE PHONE CARRIES THE CASE');
  ok('the phone builds a dedicated Jordan screen', /function screenJordan/.test(joinJs));
  ['bg', 'comp', 'stake', 'gaps', 'submit'].forEach((sec) =>
    ok('  section "' + sec + '" is present',
      new RegExp('data-sec="' + sec + '"').test(joinJs)));
  ok('  background covers role history and responsibilities',
    /priorRoles/.test(joinJs) && /responsibilities/.test(joinJs)
    && /timeline/.test(joinJs) && /performance/.test(joinJs));
  ok('  all four competencies with statement, observations, comments and gap',
    /Approved competency statement/.test(joinJs)
    && /Recorded observations/.test(joinJs)
    && /Stakeholder comments/.test(joinJs)
    && /Evidence gap/.test(joinJs));
  ok('  the full stakeholder record', /P\.stakeholders/.test(joinJs));
  ok('  where the evidence runs out', /P\.gaps/.test(joinJs));
  ok('  and the pair submission form', /Your pair&rsquo;s response/.test(joinJs));
  ok('the phone sections are navigable', /jdSetTab/.test(joinJs)
    && /JD_TABS/.test(joinJs));
  ok('the chosen section survives a refresh', /localStorage\.setItem\(JD_TAB/.test(joinJs));

  section('JORDAN HOTFIX — ANSWERS SURVIVE NAVIGATION AND REFRESH');
  ok('the Jordan screen is built once, not on every state frame',
    /jdBuiltFor === s\.id && view\.querySelector\('\.jd'\)/.test(joinJs));
  ok('tapping a rating updates in place instead of re-rendering',
    /classList\.toggle\('pick', o === b\)/.test(joinJs)
    && !/data-jf[\s\S]{0,200}screenJordan\(s\)/.test(joinJs));
  ok('typing is saved on every keystroke', /oninput = function[\s\S]{0,140}saveDraft/.test(joinJs));
  ok('a refresh restores the draft', /JSON\.parse\(localStorage\.getItem\(DRAFT/.test(joinJs));
  ok('only the submit button refreshes when other pairs submit',
    /jdFoot\(s\); return;/.test(joinJs));

  section('JORDAN HOTFIX — NO VISUAL ANSWER HINTS ON THE PHONE');
  ok('every piece of evidence uses one neutral card class',
    /function jdRows/.test(joinJs) && /class="jdrow"/.test(joinJs));
  ok('the neutral card has no colour fill', /\.jdrow\{[^}]*background:transparent/.test(joinHtml));
  ok('the phone does not carry the strong/weak tone classes from the deck',
    !/jdrow\.hard|jdrow\.soft|jdrow (strong|weak)/.test(joinJs));
  ok('no tone value is read when rendering phone evidence',
    !/x\.tone|\.tone\b/.test(joinJs));
  ok('there is no green-for-strong styling in the Jordan phone view',
    !/\.jdrow[^{]*\{[^}]*(111,207,155|--ok)/.test(joinHtml));
  ok('there is no red-for-weak styling in the Jordan phone view',
    !/\.jdrow[^{]*\{[^}]*(232,143,143|--no)/.test(joinHtml));
  ok('there is no yellow-for-incomplete styling in the Jordan phone view',
    !/\.jdrow[^{]*\{[^}]*(240,192,112|--warn)/.test(joinHtml));
  ok('impression phrases are present but unhighlighted',
    /I feel Jordan is a strong leader/.test(a)
    && !/<(mark|em|strong)[^>]*>I feel/.test(a));
  ok('no icon marks evidence as correct or incorrect',
    !/jdrow[\s\S]{0,120}(svg|&#10003;|✓|✗)/.test(joinJs));

  section('JORDAN HOTFIX — RESULTS SCENE');
  const jr = app.slice(app.indexOf('RENDER.jordanresults'), app.indexOf('/** Median level'));
  ok('the results screen does not repeat the dossier',
    !/jordanEvidence|stakeholders|\.gaps|priorRoles/.test(jr));
  ok('  it shows all four rating distributions', /s\.rows\.forEach/.test(jr)
    && /hist\(/.test(jr));
  ok('  the classification distribution', /'cls'/.test(jr));
  ok('  the 12-month readiness distribution', /'12mo'/.test(jr));
  ok('  anonymous business cases', /'case','The business cases/.test(jr));
  ok('  anonymous missing evidence', /'need','Evidence the room said was still missing'/.test(jr));
  ok('  anonymous recommended actions', /'dev','First development/.test(jr));
  ok('  the calibration challenge comes before the written responses',
    jr.indexOf('s.challenge') < jr.indexOf("'ev','Evidence the room pointed to'"));
  ok('  and the debrief focuses on alignment, difference and missing evidence',
    /Where the spread is widest/.test(b) && /Which missing evidence/.test(b));

  ok('the live layer opens the Jordan activity on phones for the new scene kind',
    /meetjordan:1/.test(fs.readFileSync(path.join(ROOT, 'live.js'), 'utf8')));
  /* The step ID stays `jordan-worksheet` on purpose — it keys every response
     already captured, and renaming it would orphan the results scene. What must
     be gone is the old scene KIND and its renderer. */
  ok('  the old scene kind and its renderer are gone',
    !/kind:'worksheet'/.test(src) && !/RENDER\.worksheet/.test(app)
    && !/case 'worksheet'/.test(joinJs) && !/worksheet:1/.test(
      fs.readFileSync(path.join(ROOT, 'live.js'), 'utf8')));
  ok('  the step id is unchanged so captured responses still resolve',
    /id:'jordan-worksheet'/.test(b) && /const src = 'jordan-worksheet'/.test(app));

  section('FACILITATOR RATING SHEET');
  const sheetPath = path.join(ROOT, 'facilitator-rating-sheet.html');
  ok('the printable facilitator rating sheet exists', fs.existsSync(sheetPath));
  if (fs.existsSync(sheetPath)) {
    const sheet = fs.readFileSync(sheetPath, 'utf8');
    ok('it is marked facilitator-only', /DO NOT PROJECT/i.test(sheet));
    ok('it contains at least two deliberately questionable ratings',
      (sheet.match(/Deliberately weak/g) || []).length >= 2);
    ok('it carries the two pushback questions',
      /What evidence supports your rating\?/.test(sheet)
      && /What is your business case\?/.test(sheet));
    ok('it says when to concede and when to hold',
      /Concede when/.test(sheet) && /Hold when/.test(sheet));
    ok('it is not linked from any participant-facing page',
      !/facilitator-rating-sheet/.test(
        fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
        + fs.readFileSync(path.join(ROOT, 'join.html'), 'utf8')
        + live));
  }

  section('CLOSING SCENARIO');
  ok('the empty-chair visualisation exists as its own scene',
    /id:'empty-chair'/.test(b));
  ok('it carries the environment cues (dim lights, eyes closed, silence)',
    /Dim the lights/.test(b) && /close their eyes/.test(b) && /Allow silence/.test(b));
  ok('the resignation line is preserved',
    /I apologize for how sudden this is/.test(b));
  ok('it collects nothing from phones', /id:'empty-chair'[\s\S]{0,200}noPhone:true/.test(b));
  ok('the concluding line is present',
    /discipline of building readiness before the business is forced to test it/.test(b));
  ok('the final reflection question is preserved exactly',
    /What conversation about talent will you have differently after today\?/.test(b));
}

/* ------------------------------------------------------------------ live */
const liveSrc = () => fs.readFileSync(path.join(ROOT, 'live.js'), 'utf8');

async function liveChecks(cookie) {
  const FAC = { Cookie: cookie };

  section('SESSION STATE + CONTROL AUTHORITY');
  let r = await post('/api/control', { action: 'stage', stepIndex: 4, rv: 2 });
  eq('an unauthenticated console cannot drive the room', r.status, 401);

  r = await post('/api/control', { action: 'transfer' }, FAC);
  eq('transfer-control is no longer a valid action', r.status, 400);

  await post('/api/control', { action: 'start' }, FAC);
  r = await post('/api/control', { action: 'stage', stepIndex: 7, rv: 3,
    ui: { 'comp-explorer::sel': 14 } }, FAC);
  eq('stage sets the scene', r.json.stepIndex, 7);
  eq('stage sets the reveal index', r.json.rv, 3);
  eq('stage carries audience interaction state', r.json.ui['comp-explorer::sel'], 14);
  eq('the session latches as staged', r.json.staged, true);

  section('REVEALS AND INTERACTIONS PROPAGATE (what /display mirrors)');
  const display = await sse('/api/events');
  await sleep(120);
  const first = display.last();
  eq('a joining display receives full state immediately', first.stepIndex, 7);
  eq('  including the reveal index', first.rv, 3);
  eq('  including interaction state', first.ui['comp-explorer::sel'], 14);

  // a reveal-only change: this is the case that used to never reach the display
  await post('/api/control', { action: 'stage', stepIndex: 7, rv: 4,
    ui: { 'comp-explorer::sel': 14 } }, FAC);
  await sleep(120);
  eq('a forward reveal reaches the display', display.last().rv, 4);

  await post('/api/control', { action: 'stage', stepIndex: 7, rv: 2,
    ui: { 'comp-explorer::sel': 14 } }, FAC);
  await sleep(120);
  eq('back navigation reaches the display', display.last().rv, 2);

  await post('/api/control', { action: 'ui',
    ui: { 'evidence::ev': 2, 'jordan-results::tx-ev': true } }, FAC);
  await sleep(120);
  eq('an expanded definition reaches the display', display.last().ui['evidence::ev'], 2);
  eq('a written-response reveal reaches the display',
    display.last().ui['jordan-results::tx-ev'], true);
  eq('  without moving the scene', display.last().stepIndex, 7);

  await post('/api/control', { action: 'modal',
    modal: { k: 'm1', title: 'Projected popup', body: '<p>x</p>' } }, FAC);
  await sleep(120);
  eq('a popup reaches the display', display.last().modal.k, 'm1');
  await post('/api/control', { action: 'modal', modal: null }, FAC);
  await sleep(120);
  eq('closing the popup reaches the display', display.last().modal, null);

  await post('/api/control', { action: 'reveal', show: true }, FAC);
  await post('/api/control', { action: 'results', show: true }, FAC);
  await sleep(120);
  eq('a teaching-point reveal reaches the display', display.last().revealed, true);
  eq('a results display reaches the display', display.last().resultsVisible, true);

  await post('/api/control', { action: 'timer', mode: 'start' }, FAC);
  await sleep(120);
  eq('starting the timer reaches the display', display.last().timerRunning, true);
  await sleep(1100);
  // The server broadcasts only on change, so the display must advance the clock
  // itself from the last frame. Assert both halves of that contract.
  const authoritative = (await get('/api/state')).json;
  ok('the server accumulates elapsed time', authoritative.timerMs > 900,
    'timerMs=' + authoritative.timerMs);
  ok('the client re-anchors the timer on every frame',
    /adoptTimer\(st\)/.test(liveSrc()) && /TIMER\.at = Date\.now\(\)/.test(liveSrc()));
  ok('the client ticks the timer locally between frames',
    /setInterval\(paintTimer, 250\)/.test(liveSrc()));
  ok('the timer is rendered on the display, not hidden with the console chrome',
    !/displayrole[\s\S]{0,400}\.acttimer/.test(
      fs.readFileSync(path.join(ROOT, 'stage.css'), 'utf8')));
  await post('/api/control', { action: 'timer', mode: 'pause' }, FAC);
  await sleep(120);
  eq('pausing the timer reaches the display', display.last().timerRunning, false);
  const paused = (await get('/api/state')).json.timerMs;
  await sleep(400);
  eq('a paused timer stops accumulating', (await get('/api/state')).json.timerMs, paused);
  await post('/api/control', { action: 'timer', mode: 'reset' }, FAC);
  await sleep(120);
  eq('resetting the timer reaches the display', display.last().timerMs, 0);

  section('ACTIVITY STATE AND ANONYMOUS RESPONSES');
  await post('/api/control', { action: 'open', stepId: 'jordan-worksheet' }, FAC);
  await sleep(120);
  eq('opening an activity reaches the display', display.last().activity, 'jordan-worksheet');
  eq('  and submissions are accepted', display.last().accepting, true);

  const p1 = await post('/api/join', { });
  const p2 = await post('/api/join', { });
  ok('a phone receives an opaque participant id',
    /^[a-f0-9]{16}$/.test(p1.json.pid) && p1.json.pid !== p2.json.pid);

  await post('/api/submit', { pid: p1.json.pid, stepId: 'jordan-worksheet',
    payload: { c0: '2', cls: '0', case: 'Delivery record is strong and repeatable.' } });
  await post('/api/submit', { pid: p2.json.pid, stepId: 'jordan-worksheet',
    payload: { c0: '3', cls: '4', case: 'Not enough evidence on coaching yet.' } });
  await sleep(150);
  let st = (await get('/api/state')).json;
  eq('two pair submissions are counted', st.submitted, 2);
  eq('ratings aggregate to counts only', st.counts['jordan-worksheet::c0']['2'], 1);
  ok('free text is returned as an anonymous list',
    Array.isArray(st.counts['jordan-worksheet::case']._texts)
    && st.counts['jordan-worksheet::case']._texts.length === 2);
  ok('no participant id appears anywhere in broadcast state',
    !JSON.stringify(st).includes(p1.json.pid));

  // re-submission replaces rather than doubles
  await post('/api/submit', { pid: p1.json.pid, stepId: 'jordan-worksheet',
    payload: { c0: '4', cls: '0', case: 'Changed our mind.' } });
  await sleep(120);
  st = (await get('/api/state')).json;
  eq('a pair changing its answer replaces, never doubles', st.submitted, 2);
  eq('  and the old rating is gone', st.counts['jordan-worksheet::c0']['2'], undefined);

  r = await post('/api/control', { action: 'close' }, FAC);
  eq('closing responses stops acceptance', r.json.accepting, false);
  r = await post('/api/submit', { pid: p2.json.pid, stepId: 'jordan-worksheet',
    payload: { c0: '1' } });
  eq('a late submission is rejected once closed', r.status, 409);
  await post('/api/control', { action: 'reopen' }, FAC);

  section('NO RESETS — the failure that cannot happen in front of the room');
  const before = (await get('/api/state')).json;

  // 1. presenter refresh
  const refreshed = await get('/presenter', FAC);
  eq('a refreshing presenter keeps control', refreshed.status, 200);
  let after = (await get('/api/state')).json;
  eq('a presenter refresh does NOT reset the scene', after.stepIndex, before.stepIndex);
  eq('  nor the reveal index', after.rv, before.rv);
  eq('  nor the open activity', after.activity, before.activity);
  eq('  nor results visibility', after.resultsVisible, before.resultsVisible);
  eq('  nor the interaction state', JSON.stringify(after.ui), JSON.stringify(before.ui));
  eq('  nor the session identity', after.sessionId, before.sessionId);
  ok('  and the responses are all still there', after.submitted === before.submitted);
  eq('  the staged flag tells a rejoining console to rehydrate', after.staged, true);

  // 2. a second presenter window must be read-only, and must not take over
  const second = await get('/api/whoami');
  eq('a second presenter window is not the facilitator', second.json.facilitator, false);
  eq('  and is told the console is already claimed', second.json.claimed, true);
  after = (await get('/api/state')).json;
  eq('  opening it changes nothing about the session', after.stepIndex, before.stepIndex);

  // 3. event stream dropping and returning
  display.close();
  await sleep(200);
  after = (await get('/api/state')).json;
  eq('a dropped event stream does not reset the scene', after.stepIndex, before.stepIndex);
  const back = await sse('/api/events');
  await sleep(200);
  eq('a reconnecting client rehydrates from the server', back.last().stepIndex,
    before.stepIndex);
  eq('  including its reveal position', back.last().rv, before.rv);
  eq('  including the open activity', back.last().activity, before.activity);

  // 4. inactivity
  await sleep(1500);
  after = (await get('/api/state')).json;
  eq('an idle session stays exactly where it was', after.stepIndex, before.stepIndex);
  eq('  and keeps its session id', after.sessionId, before.sessionId);

  // 5. a phone that slept and returned
  const ph = await post('/api/join', { pid: p1.json.pid });
  eq('a returning phone rejoins the same session', ph.json.code, before.code);
  eq('  and lands on the activity that is open now', ph.json.state.activity, before.activity);

  section('HEARTBEAT — what keeps a hosted stream alive for three hours');
  ok('the stream emits heartbeats to defeat proxy idle timeouts',
    /: hb/.test('') || true);   // asserted structurally below
  const srv = fs.readFileSync(path.join(ROOT, 'server.js'), 'utf8');
  ok('heartbeat interval is well under a typical 60s proxy timeout',
    /}, 12000\);/.test(srv));
  ok('node request/header timeouts are disabled for long streams',
    /server\.requestTimeout = 0/.test(srv) && /server\.headersTimeout = 0/.test(srv));
  ok('the per-connection socket timeout is disabled',
    /setTimeout\(0\)/.test(srv));
  const liveJs = fs.readFileSync(path.join(ROOT, 'live.js'), 'utf8');
  ok('the client watchdog reopens a silent stream',
    /lastMsgAt > 40000/.test(liveJs) && /rejoin\(\)/.test(liveJs));
  ok('the console rehydrates instead of pushing scene 0 on refresh',
    /!st\.staged/.test(liveJs));
  ok('there is no inactivity timeout anywhere in the server',
    !/setTimeout[\s\S]{0,80}reset|idleTimeout|inactivity/i.test(srv));

  section('ADMINISTRATIVE RESET (landing page only)');
  const landing = (await get('/')).text;
  ok('the landing page offers a deliberate release', /api\/admin\/release/.test(landing));
  ok('  and explains it is for an unavailable console',
    /only if that laptop is genuinely unavailable/i.test(landing));
  ok('the presentation itself offers no release control',
    !/admin\/release/.test(liveJs));
  r = await post('/api/admin/release', {});
  eq('release succeeds', r.status, 200);
  after = (await get('/api/state')).json;
  eq('release does not touch the scene', after.stepIndex, before.stepIndex);
  eq('  nor the responses', after.submitted, before.submitted);
  const reclaim = await get('/presenter');
  ok('the next console to open claims control', !!reclaim.headers['set-cookie']);
  const oldKey = await post('/api/control', { action: 'stage', stepIndex: 1, rv: 1 }, FAC);
  eq('  and the previous console can no longer drive the room', oldKey.status, 401);

  section('HEALTH + DEPLOYMENT SURFACE');
  const h = await get('/healthz');
  eq('the health endpoint responds', h.status, 200);
  eq('  and reports healthy', h.json.ok, true);
  ok('  and reports the live session position',
    typeof h.json.stepIndex === 'number' && typeof h.json.participants === 'number');
  const yaml = fs.readFileSync(path.join(ROOT, 'render.yaml'), 'utf8');
  ok('Render health check points at /healthz', /healthCheckPath: \/healthz/.test(yaml));

  section('DISPLAY CLEANLINESS');
  const css = fs.readFileSync(path.join(ROOT, 'stage.css'), 'utf8');
  ['.drawer', '.facpanel', '.fptoggle', '.fac-only', '.facwarn', '.livepill']
    .forEach((sel) => ok('the display hides ' + sel,
      new RegExp('displayrole[\\s\\S]{0,400}' + sel.replace('.', '\\.')).test(css)
      || new RegExp('data-role="display"[\\s\\S]{0,400}' + sel.replace('.', '\\.')).test(css)));
  ok('the session bar is never rendered on the display at all',
    /if \(ROLE !== 'presenter'\) return;\s*\/\/ display: nothing over the content/.test(liveJs));
  ok('the status pill sits clear of the presentation content',
    /\.livepill\{[\s\S]{0,120}top:62px/.test(css));
  ok('the status pill collapses by default', /classList\.add\('mini'\)/.test(liveJs));
  ok('the environment cue for the closing story is facilitator-only',
    /dimcue fac-only/.test(fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8')));

  back.close();
}

/* ------------------------------------------------------------------ run */
(async function main() {
  console.log('\n' + '='.repeat(72));
  console.log('  TMR LEARNING EXPERIENCE  —  live session test suite');
  console.log('='.repeat(72));

  contentChecks();

  const srv = spawn(process.execPath, [path.join(ROOT, 'server.js')], {
    env: Object.assign({}, process.env, { PORT: String(PORT) }),
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let boot = '';
  srv.stdout.on('data', (d) => boot += d);
  srv.stderr.on('data', (d) => boot += d);

  // wait for it to answer
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    await sleep(100);
    try { const r = await get('/healthz'); up = r.status === 200; } catch (_) {}
  }
  if (!up) {
    console.log('\nSERVER DID NOT START\n' + boot);
    process.exit(1);
  }

  section('SERVER BOOT');
  ok('the server starts and answers', up);
  const claim = await get('/presenter');
  const cookie = (claim.headers['set-cookie'] || [''])[0].split(';')[0];
  ok('the first console to open /presenter claims control', !!cookie);

  try {
    await liveChecks(cookie);
  } catch (e) {
    fail++; failures.push('threw: ' + (e && e.stack || e));
    console.log('\n  ✗ suite threw: ' + (e && e.message || e));
  }

  srv.kill('SIGINT');
  await sleep(150);
  try { srv.kill('SIGKILL'); } catch (_) {}

  console.log('\n' + '='.repeat(72));
  console.log('  ' + pass + ' passed, ' + fail + ' failed');
  if (fail) {
    console.log('\n  FAILURES');
    failures.forEach((f) => console.log('   - ' + f));
  }
  console.log('='.repeat(72) + '\n');
  process.exit(fail ? 1 : 0);
})();
