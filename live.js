/* ============================================================================
   TMR LEARNING EXPERIENCE — LIVE SESSION CLIENT
   Master Electronics | INTERNAL

   Loads after app.js and adds live participant responses to the existing
   presentation without changing a single scene, transition or content file.

   ROLES  (from the URL path)
     /presenter   facilitator console. Drives the session. Notes + controls.
     /display     projected screen. Mirrors the presenter. No controls, no notes.
     anything else (file:// or index.html direct) = STANDALONE BACKUP MODE:
       the presentation behaves exactly as it did before, with responses
       captured on the presenter laptop. Nothing breaks if the server is gone.

   INTEGRATION SEAM
     Server aggregates arrive as {"stepId::key": {optionIndex: count}}, which is
     precisely the shape of app.js's Vote store. They are merged in, so every
     existing chart, histogram and confidence comparison lights up untouched.
   ========================================================================= */
'use strict';

(function () {

  var path = location.pathname.replace(/\/+$/, '');
  var ROLE = path.endsWith('/presenter') ? 'presenter'
           : path.endsWith('/display') ? 'display'
           : 'standalone';

  var LIVE = {
    role: ROLE, online: false, st: null, key: null, es: null,
    lastCountsHash: '', suppress: false, fac: null, who: null
  };
  window.LIVE = LIVE;

  if (ROLE === 'standalone') {
    document.documentElement.setAttribute('data-role', 'standalone');
    return;                      // untouched original behaviour
  }
  document.documentElement.setAttribute('data-role', ROLE);

  var $ = function (s) { return document.querySelector(s); };
  LIVE.key = new URLSearchParams(location.search).get('key') || '';

  /* ---------------------------------------------------------------- transport */
  function post(action, extra) {
    if (ROLE !== 'presenter') return Promise.resolve(null);
    var b = Object.assign({ action: action, key: LIVE.key }, extra || {});
    return fetch('/api/control', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(b)
    }).then(function (r) {
      if (r.status === 401) { LIVE.fac = false; whoami(); return null; }
      LIVE.fac = true;
      facWarn(false);
      return r.json();
    }).catch(function () { setOnline(false); return null; });
  }
  LIVE.post = post;

  /* ------------------------------------------------------- am I in control?
     A control action that silently fails is the worst possible feedback in a
     live room, because it is indistinguishable from the phones being broken.
     The console asks the server outright and says so on screen.
     ---------------------------------------------------------------------- */
  function whoami() {
    return fetch('/api/whoami').then(function (r) { return r.json(); }).then(function (w) {
      LIVE.who = w;
      LIVE.fac = !!w.facilitator;
      if (ROLE === 'presenter') facWarn(!w.facilitator);
      return w;
    }).catch(function () { return null; });
  }

  /** A standing banner, not a flash — this state does not resolve on its own. */
  function facWarn(show) {
    // A console that is not in control is read-only: it follows the presenter
    // and its controls are put away rather than left there to be pressed.
    var panel = $('#facPanel'), toggle = $('#facPanelToggle');
    if (panel) panel.style.display = show ? 'none' : '';
    if (toggle) toggle.style.display = show ? 'none' : '';

    var el = $('#facWarn');
    if (!show) { if (el) el.remove(); return; }
    if (el) return;
    el = document.createElement('div');
    el.id = 'facWarn';
    el.className = 'facwarn';
    el.innerHTML =
      '<b>Another facilitator is already presenting.</b>'
      + '<p>This screen is following theirs, read-only. Your controls are hidden so '
      + 'nothing here can interrupt the room.</p>'
      + '<p class="fw-fix">To present from this device instead, the facilitator who is '
      + 'running the session presses <b>Transfer control</b> in their Live controls. '
      + 'Reload this page afterwards and it becomes the console.</p>'
      + '<button type="button" class="fw-x">Continue read-only</button>';
    document.body.appendChild(el);
    el.querySelector('.fw-x').onclick = function () { el.remove(); };
  }
  LIVE.whoami = whoami;

  function connect() {
    if (LIVE.es) { try { LIVE.es.close(); } catch (_) {} }
    LIVE.es = new EventSource('/api/events');
    LIVE.es.onmessage = function (e) {
      setOnline(true);
      try { applyServer(JSON.parse(e.data)); } catch (_) {}
    };
    LIVE.es.onerror = function () { setOnline(false); };
  }

  function setOnline(v) {
    if (LIVE.online === v) return;
    LIVE.online = v;
    var d = $('#liveDot');
    if (d) { d.classList.toggle('on', v); d.title = v ? 'Live session connected' : 'Reconnecting…'; }
    if (!v) flash('<b>Live connection lost.</b> The presentation keeps working — responses '
      + 'can be captured on this laptop until it returns.');
  }

  function flash(m) { if (window.flashMsg) window.flashMsg(m); }

  /* ---------------------------------------------------------------- inbound */
  function applyServer(st) {
    LIVE.st = st;

    // 1. merge anonymous aggregates into the Vote store, then refresh charts
    var hash = JSON.stringify(st.counts);
    if (hash !== LIVE.lastCountsHash) {
      LIVE.lastCountsHash = hash;
      var cur = window.STEPS && window.STEPS[window.State.i];
      var touched = false;
      for (var k in st.counts) {
        var bag = {}, src = st.counts[k];
        for (var opt in src) {
          if (opt === '_texts') continue;
          bag[opt] = src[opt];
        }
        window.State.votes[k] = bag;
        if (cur && k.indexOf(cur.id + '::') === 0) touched = true;
      }
      LIVE.texts = {};
      for (var k2 in st.counts) if (st.counts[k2]._texts) LIVE.texts[k2] = st.counts[k2]._texts;
      if (touched) rerenderCurrent();
    }

    // 2. the display — and a read-only second console — mirror the presenter
    if (ROLE === 'display' || (ROLE === 'presenter' && LIVE.fac === false)) {
      if (st.stepIndex !== window.State.i || st.rv !== window.State.rv) {
        LIVE.suppress = true;
        window.gotoStep(st.stepIndex, st.rv);
        LIVE.suppress = false;
      }
    }
    paintBar();
  }

  function rerenderCurrent() {
    var s = window.STEPS[window.State.i];
    if (!s) return;
    var rv = window.State.rv;
    s._built = false;
    LIVE.suppress = true;
    window.gotoStep(window.State.i, rv);
    LIVE.suppress = false;
  }

  /* Which scenes accept phone responses. Mirrors fields() in join.js. */
  var PHONE_KINDS = {poll:1, rank:1, quiz:1, sort:1, match:1, worksheet:1,
                     builder:1, bias:1, reflect:1};
  function takesPhone(s) {
    if (!s || s.noPhone) return false;
    if (PHONE_KINDS[s.kind]) return true;
    return s.id === 'leader-prep';          // the one prose scene with a phone prompt
  }

  /* ---------------------------------------------------------------- outbound */
  // app.js calls this from inside goto(), so it fires on every real stage change
  LIVE.onStage = function (i, rv) {
    if (ROLE !== 'presenter' || LIVE.suppress) return;
    if (LIVE.fac === false) return;         // read-only console drives nothing
    post('stage', { stepIndex: i, rv: rv });
    // Arriving at a scene that takes phone responses opens it automatically, so
    // pressing Continue is all the facilitator has to do. Manual Close / Reopen
    // stay available in Live controls.
    var s = window.STEPS[i];
    if (!s) return;
    if (takesPhone(s)) {
      if (!LIVE.st || LIVE.st.activity !== s.id) post('open', { stepId: s.id });
    } else if (LIVE.st && LIVE.st.activity) {
      post('open', { stepId: null });        // leaving an activity -> phones wait
    }
  };

  /* ---------------------------------------------------------------- chrome */
  function bar() {
    if ($('#liveBar')) return;
    var b = document.createElement('div');
    b.id = 'liveBar';
    b.className = 'livebar' + (ROLE === 'display' ? ' display' : '');
    b.innerHTML =
      '<span class="ld" id="liveDot" title="Live session"></span>'
      + '<span class="lv" id="lvCode">—</span>'
      + '<span class="lv" id="lvPpl">0 joined</span>'
      + (ROLE === 'presenter' ? '<span class="lv" id="lvSub"></span>' : '');
    document.body.appendChild(b);

    if (ROLE !== 'presenter') return;

    var p = document.createElement('div');
    p.id = 'facPanel';
    p.className = 'facpanel';
    p.innerHTML =
      '<div class="fp-h"><b>Live activity</b><span id="fpName">—</span></div>'
      + '<div class="fp-g">'
      + '<button class="fpb pri" data-a="open">Open activity</button>'
      + '<button class="fpb" data-a="close">Close responses</button>'
      + '<button class="fpb" data-a="reopen">Reopen</button>'
      + '<button class="fpb" data-a="results">Show results</button>'
      + '<button class="fpb" data-a="hide">Hide results</button>'
      + '<button class="fpb" data-a="reveal">Reveal teaching point</button>'
      + '<button class="fpb" data-a="tstart">Start timer</button>'
      + '<button class="fpb" data-a="tpause">Pause</button>'
      + '<button class="fpb" data-a="treset">Reset timer</button>'
      + '<button class="fpb" data-a="qr">Show join QR</button>'
      + '<button class="fpb" data-a="clear">Clear this activity</button>'
      + '<button class="fpb" data-a="export">Export results</button>'
      + '<button class="fpb" data-a="transfer">Transfer control</button>'
      + '</div>';
    document.body.appendChild(p);

    p.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-a]');
      if (!btn) return;
      var a = btn.getAttribute('data-a');
      var s = window.STEPS[window.State.i];
      if (a === 'open')    post('open', { stepId: s.id });
      if (a === 'close')   post('close');
      if (a === 'reopen')  post('reopen');
      if (a === 'results') post('results', { show: true });
      if (a === 'hide')    post('results', { show: false });
      if (a === 'reveal')  post('reveal', { show: true });
      if (a === 'tstart')  post('timer', { mode: 'start' });
      if (a === 'tpause')  post('timer', { mode: 'pause' });
      if (a === 'treset')  post('timer', { mode: 'reset' });
      if (a === 'clear')   { if (confirm('Clear every response for this activity?'))
                              post('clearStep', { stepId: s.id }); }
      if (a === 'qr')      qrModal();
      if (a === 'transfer') {
        if (confirm('Hand the console to the next device that opens /presenter?\n\n'
          + 'This screen becomes read-only. The session, the phones and every '
          + 'response captured so far are unaffected.')) {
          post('transfer').then(function () { whoami(); });
        }
      }
      if (a === 'export')  window.open('/api/export?key=' + encodeURIComponent(LIVE.key), '_blank');
    });

    var t = document.createElement('button');
    t.id = 'facPanelToggle';
    t.className = 'fptoggle';
    t.type = 'button';
    t.textContent = 'Live controls';
    t.onclick = function () { p.classList.toggle('open'); t.classList.toggle('on'); };
    document.body.appendChild(t);
  }

  function paintBar() {
    var st = LIVE.st; if (!st) return;
    var c = $('#lvCode'), pp = $('#lvPpl'), sub = $('#lvSub'), nm = $('#fpName');
    if (c) c.textContent = 'Code ' + st.code;
    if (pp) pp.textContent = st.participants + (st.participants === 1 ? ' joined' : ' joined');
    if (sub) {
      sub.textContent = st.activity
        ? (st.submitted + ' submitted' + (st.accepting ? '' : ' · closed'))
        : 'no activity open';
    }
    if (nm) {
      var s = st.activity ? window.STEPS.filter(function (x) { return x.id === st.activity; })[0] : null;
      nm.textContent = s ? stripTags(s.title) + (st.accepting ? ' · open' : ' · closed')
                         : 'none open';
    }
  }

  function stripTags(h) {
    var d = document.createElement('div'); d.innerHTML = String(h || '');
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  }

  /* ---------------------------------------------------------------- QR modal */
  function qrModal() {
    var old = $('#qrScrim'); if (old) { old.remove(); return; }
    // The server's answer, not location.origin — a console opened on localhost
    // would otherwise print an address no phone in the room can reach.
    var url = (LIVE.who && LIVE.who.joinUrl) || (location.origin + '/join');
    var d = document.createElement('div');
    d.id = 'qrScrim';
    d.className = 'qrscrim';
    d.innerHTML =
      '<div class="qrbox">'
      + '<p class="kicker">Scan once &middot; keep the page open all session</p>'
      + '<img src="/qr.svg" alt="Join QR code">'
      + '<div class="qrcode">' + (LIVE.st ? LIVE.st.code : '—') + '</div>'
      + '<p class="small">' + url + '</p>'
      + '<p class="small" style="color:var(--ink-4)">No name, no email, no login. '
      + 'Answers are anonymous.</p>'
      + '<button class="go" id="qrClose">Close</button>'
      + '</div>';
    document.body.appendChild(d);
    d.addEventListener('click', function (e) { if (e.target === d) d.remove(); });
    $('#qrClose').onclick = function () { d.remove(); };
  }
  LIVE.qrModal = qrModal;

  /* ---------------------------------------------------------------- boot */
  function boot() {
    bar();
    if (ROLE === 'display') {
      document.body.classList.add('displayrole');
      document.body.classList.remove('fac');
    }
    // Settle the control question before driving anything, so the facilitator
    // sees one clear banner instead of a scene change that quietly fails.
    (ROLE === 'presenter' ? whoami() : Promise.resolve(null)).then(function () {
      return fetch('/api/state').then(function (r) { return r.json(); });
    }).then(function (st) {
      if (ROLE === 'presenter' && !st.live) post('start');
      applyServer(st);
      if (ROLE === 'presenter') post('stage', { stepIndex: window.State.i, rv: window.State.rv });
      connect();
    }).catch(function () {
      setOnline(false);
      flash('<b>Live session not reachable.</b> Presenting in backup mode — responses can be '
        + 'captured on this laptop.');
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(boot, 60);
  } else document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 60); });

})();
