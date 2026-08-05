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

   THE SERVER IS THE SOURCE OF TRUTH
     This is the change that stops a refresh sending the room back to slide 1.
     A presenter console that opens onto a session which has already been
     staged ADOPTS the server's position — scene, reveal index, open activity,
     results visibility, timer, expanded panels — rather than announcing its
     own. It only pushes on first start, when nothing has been staged yet.

   WHAT THE DISPLAY MIRRORS
     Scene, reveal index, expanded definitions, teaching-point reveals,
     discussion prompts, results, timers, open/closed activity state, modal
     content and activity instructions. What it must never show — presenter
     notes, facilitator controls, private scripts, debug — is kept off it by
     role, not by remembering to hide things one at a time.

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
    lastCountsHash: '', lastUiHash: '', suppress: false, fac: null, who: null,
    lastMsgAt: 0, retries: 0, adopted: false, texts: {}
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
      setOnline(true);
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
      '<b>This is the second presenter window &mdash; read-only.</b>'
      + '<p>The console that opened first is driving the room. This screen follows it and '
      + 'shows the same presenter notes, so it is useful as a second set of notes. Its '
      + 'controls are hidden so nothing here can interrupt the workshop.</p>'
      + '<p class="fw-fix">Control is deliberately not transferable during a session. If the '
      + 'console laptop is genuinely unavailable, release it from the server landing page '
      + '&mdash; the session, the phones and every response so far are unaffected.</p>'
      + '<button type="button" class="fw-x">Continue read-only</button>';
    document.body.appendChild(el);
    el.querySelector('.fw-x').onclick = function () { el.remove(); };
  }
  LIVE.whoami = whoami;

  /* ------------------------------------------------------------- connection
     EventSource reconnects on its own, but it cannot detect a stream that has
     gone silent without closing — a proxy dropping the connection mid-workshop
     looks exactly like a quiet room. The watchdog closes and reopens a stream
     that has not produced a heartbeat, and on every reconnect the server sends
     full state, so the workshop rehydrates instead of restarting.
     ------------------------------------------------------------------------ */
  function connect() {
    if (LIVE.es) { try { LIVE.es.close(); } catch (_) {} }
    LIVE.es = new EventSource('/api/events');
    LIVE.es.onopen = function () { LIVE.retries = 0; LIVE.lastMsgAt = Date.now(); setOnline(true); };
    LIVE.es.onmessage = function (e) {
      LIVE.lastMsgAt = Date.now();
      setOnline(true);
      try { applyServer(JSON.parse(e.data)); } catch (_) {}
    };
    LIVE.es.onerror = function () {
      setOnline(false);
      // browser retries by itself; if it has given up entirely, we reopen
      if (LIVE.es && LIVE.es.readyState === 2) scheduleReconnect();
    };
    LIVE.lastMsgAt = Date.now();
  }

  function scheduleReconnect() {
    LIVE.retries = Math.min(LIVE.retries + 1, 6);
    var wait = Math.min(1000 * LIVE.retries, 5000);
    clearTimeout(scheduleReconnect._t);
    scheduleReconnect._t = setTimeout(function () { rejoin(); }, wait);
  }

  /** Pull authoritative state, then reopen the stream. Never resets position. */
  function rejoin() {
    fetch('/api/state').then(function (r) { return r.json(); }).then(function (st) {
      applyServer(st);
      connect();
    }).catch(function () { scheduleReconnect(); });
  }

  // Watchdog: 12s heartbeat server-side, so 40s of silence means the stream is
  // dead even though the browser has not noticed.
  setInterval(function () {
    if (!LIVE.lastMsgAt) return;
    if (Date.now() - LIVE.lastMsgAt > 40000) { LIVE.lastMsgAt = Date.now(); rejoin(); }
  }, 10000);

  // A console or display that was backgrounded (laptop lid, projector input
  // switched, tab hidden for a long discussion) re-syncs the moment it returns.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) return;
    rejoin();
  });
  window.addEventListener('online', function () { rejoin(); });

  function setOnline(v) {
    if (LIVE.online === v) { paintConn(); return; }
    LIVE.online = v;
    paintConn();
    // Deliberately no flash on reconnect, and no interruption on a blip: the
    // status pill is the channel for this. Only a sustained failure speaks up.
    if (!v) {
      clearTimeout(setOnline._t);
      setOnline._t = setTimeout(function () {
        if (!LIVE.online && ROLE === 'presenter') {
          flash('<b>Reconnecting to the live session.</b> The presentation keeps working — '
            + 'responses can be captured on this laptop until it returns.');
        }
      }, 12000);
    } else clearTimeout(setOnline._t);
  }

  function flash(m) { if (window.flashMsg) window.flashMsg(m); }

  /* ---------------------------------------------------------------- inbound */
  function applyServer(st) {
    var first = !LIVE.st;
    LIVE.st = st;

    // 1. merge anonymous aggregates into the Vote store, then refresh charts
    var hash = JSON.stringify(st.counts);
    var countsChanged = hash !== LIVE.lastCountsHash;
    if (countsChanged) {
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

    // 2. position. The display always follows. A presenter follows only when it
    //    is the read-only second window, or when it has just opened onto a
    //    session already in progress (a refresh) and has not adopted yet.
    var follow = ROLE === 'display'
              || (ROLE === 'presenter' && LIVE.fac === false)
              || (ROLE === 'presenter' && !LIVE.adopted && st.staged);

    if (follow) {
      if (st.stepIndex !== window.State.i || st.rv !== window.State.rv) {
        LIVE.suppress = true;
        window.gotoStep(st.stepIndex, st.rv);
        LIVE.suppress = false;
      }
      if (ROLE === 'presenter' && st.staged) LIVE.adopted = true;
    }

    // 3. audience-facing interaction state: expanded definitions, revealed
    //    teaching points, selected competency, shown written responses.
    var uh = JSON.stringify(st.ui || {});
    if (uh !== LIVE.lastUiHash) {
      LIVE.lastUiHash = uh;
      if (follow || first) {
        LIVE.suppress = true;
        try {
          window.UI.adopt(st.ui || {});
          if (window.toggleMapView) window.toggleMapView(!!(st.ui && st.ui.__map));
        } catch (_) {}
        LIVE.suppress = false;
      }
    }

    // 4. results / reveal / timer / modal — audience-visible, so the display
    //    gets them too. app.js reads these off LIVE.st when it paints.
    if (follow && !countsChanged) repaintLiveBits();

    // 5. the activity timer, re-anchored on every frame and ticked locally
    adoptTimer(st);

    paintBar();
    paintConn();
    // The projected screen paints popups. The console does not: a popup the
    // facilitator opened is for the room, and covering their own controls with
    // it is how a facilitator loses the thread.
    if (ROLE === 'display') paintModal(st.modal);
  }

  function repaintLiveBits() {
    // Results visibility and teaching-point reveals are rendered from LIVE.st,
    // so the cheapest correct thing is to repaint the current scene in place.
    if (!window.rerenderScene) return;
    clearTimeout(repaintLiveBits._t);
    repaintLiveBits._t = setTimeout(function () {
      LIVE.suppress = true;
      try { window.rerenderScene(); } catch (_) {}
      LIVE.suppress = false;
    }, 30);
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

  /* --------------------------------------------------------- projected modal
     A popup the facilitator opens must appear on the room screen, not only on
     the console. Content comes from the approved scene content, never from
     presenter notes. */
  function paintModal(m) {
    var old = $('#liveModal');
    if (!m) { if (old) old.remove(); return; }
    if (old && old.getAttribute('data-k') === (m.k || '')) return;
    if (old) old.remove();
    var d = document.createElement('div');
    d.id = 'liveModal';
    d.className = 'livemodal';
    d.setAttribute('data-k', m.k || '');
    d.innerHTML = '<div class="lmbox">'
      + (m.kicker ? '<p class="kicker">' + m.kicker + '</p>' : '')
      + (m.title ? '<h2>' + m.title + '</h2>' : '')
      + (m.body ? '<div class="lmbody">' + m.body + '</div>' : '')
      + '</div>';
    document.body.appendChild(d);
  }
  LIVE.paintModal = paintModal;

  /* Which scenes accept phone responses. Mirrors fields() in join.js. */
  var PHONE_KINDS = {poll:1, rank:1, quiz:1, sort:1, match:1, worksheet:1,
                     builder:1, bias:1, reflect:1};
  function takesPhone(s) {
    if (!s || s.noPhone) return false;
    // Reference scenes open on phones but collect nothing: the competency
    // definitions and the seven evidence questions are things a participant
    // needs in their hand, not things the room submits.
    if (s.phoneRef) return true;
    if (PHONE_KINDS[s.kind]) return true;
    return s.id === 'leader-prep';          // the one prose scene with a phone prompt
  }

  /* ---------------------------------------------------------------- outbound */
  // app.js calls this from goto() AND from every reveal change, so it fires on
  // each audience-facing move rather than only on scene boundaries.
  LIVE.onStage = function (i, rv) {
    if (ROLE !== 'presenter' || LIVE.suppress) return;
    if (LIVE.fac === false) return;         // read-only console drives nothing
    LIVE.adopted = true;                    // we are driving now, stop following
    post('stage', { stepIndex: i, rv: rv, ui: window.UI ? window.UI.s : {} });
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

  // Any audience-facing interaction that is not a scene or reveal change.
  LIVE.onUI = function (uiState) {
    if (ROLE !== 'presenter' || LIVE.suppress) return;
    if (LIVE.fac === false) return;
    post('ui', { ui: uiState });
  };

  LIVE.showModal = function (m) {
    if (ROLE !== 'presenter') return;
    post('modal', { modal: m || null });
  };

  /* ---------------------------------------------------------------- chrome
     The session information bar used to sit across the lower presentation
     content on BOTH roles, over the very text the room was reading. It is now
     presenter-only, and a collapsed pill by default: one dot, tap to expand.
     The projected display gets no persistent overlay at all — participant
     count and activity state belong to the scene when a scene wants them. */
  function bar() {
    if ($('#liveBar')) return;
    if (ROLE !== 'presenter') return;        // display: nothing over the content

    var b = document.createElement('div');
    b.id = 'liveBar';
    b.className = 'livepill';
    b.setAttribute('role', 'status');
    b.innerHTML =
      '<button class="lp-dot" id="liveDot" type="button" title="Live session status"></button>'
      + '<span class="lp-x" id="lpWrap">'
      + '<span class="lv" id="lvConn">connecting</span>'
      + '<span class="lv" id="lvCode">&mdash;</span>'
      + '<span class="lv" id="lvPpl">0 joined</span>'
      + '<span class="lv" id="lvSub"></span>'
      + '</span>';
    document.body.appendChild(b);
    // collapsed by default; the dot alone carries the state at a glance
    b.classList.add('mini');
    $('#liveDot').onclick = function () { b.classList.toggle('mini'); };

    var p = document.createElement('div');
    p.id = 'facPanel';
    p.className = 'facpanel';
    p.innerHTML =
      '<div class="fp-h"><b>Live activity</b><span id="fpName">&mdash;</span></div>'
      + '<div class="fp-g">'
      + '<button class="fpb pri" data-a="open">Open activity</button>'
      + '<button class="fpb" data-a="close">Close responses</button>'
      + '<button class="fpb" data-a="reopen">Reopen</button>'
      + '<button class="fpb" data-a="results">Show results</button>'
      + '<button class="fpb" data-a="hide">Hide results</button>'
      + '<button class="fpb" data-a="reveal">Reveal teaching point</button>'
      + '<button class="fpb" data-a="unreveal">Hide teaching point</button>'
      + '<button class="fpb" data-a="tstart">Start timer</button>'
      + '<button class="fpb" data-a="tpause">Pause</button>'
      + '<button class="fpb" data-a="treset">Reset timer</button>'
      + '<button class="fpb" data-a="qr">Show join QR</button>'
      + '<button class="fpb" data-a="clear">Clear this activity</button>'
      + '<button class="fpb" data-a="export">Export results</button>'
      + '</div>';
    document.body.appendChild(p);

    p.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-a]');
      if (!btn) return;
      var a = btn.getAttribute('data-a');
      var s = window.STEPS[window.State.i];
      if (a === 'open')     post('open', { stepId: s.id });
      if (a === 'close')    post('close');
      if (a === 'reopen')   post('reopen');
      if (a === 'results')  post('results', { show: true });
      if (a === 'hide')     post('results', { show: false });
      if (a === 'reveal')   post('reveal', { show: true });
      if (a === 'unreveal') post('reveal', { show: false });
      if (a === 'tstart')   post('timer', { mode: 'start' });
      if (a === 'tpause')   post('timer', { mode: 'pause' });
      if (a === 'treset')   post('timer', { mode: 'reset' });
      if (a === 'clear')    { if (confirm('Clear every response for this activity?'))
                               post('clearStep', { stepId: s.id }); }
      if (a === 'qr')       qrModal();
      if (a === 'export')   window.open('/api/export?key=' + encodeURIComponent(LIVE.key), '_blank');
    });

    var t = document.createElement('button');
    t.id = 'facPanelToggle';
    t.className = 'fptoggle';
    t.type = 'button';
    t.textContent = 'Live controls';
    t.onclick = function () { p.classList.toggle('open'); t.classList.toggle('on'); };
    document.body.appendChild(t);
  }

  /* ------------------------------------------------------------ activity timer
     The server broadcasts only when something changes, so a timer that was
     painted from the last frame would sit frozen on the projected screen while
     the facilitator watched it count on theirs. The elapsed value is therefore
     anchored once per frame and advanced locally from there, on BOTH roles.

     This is audience-facing — a room being timed should be able to see the
     clock — so unlike the session status pill it does render on /display. */
  var TIMER = { base: 0, at: 0, running: false };

  function adoptTimer(st) {
    TIMER.base = st.timerMs || 0;
    TIMER.at = Date.now();
    TIMER.running = !!st.timerRunning;
    paintTimer();
  }

  function timerMs() {
    return TIMER.base + (TIMER.running ? Date.now() - TIMER.at : 0);
  }

  function fmt(ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60);
  }

  function paintTimer() {
    var live = TIMER.running || TIMER.base > 0;
    var el = $('#actTimer');
    if (!live) { if (el) el.remove(); return; }
    if (!el) {
      el = document.createElement('div');
      el.id = 'actTimer';
      el.className = 'acttimer';
      el.innerHTML = '<span class="at-k">Time on this activity</span>'
        + '<span class="at-v" id="atV">0:00</span>';
      document.body.appendChild(el);
    }
    el.classList.toggle('paused', !TIMER.running);
    var v = $('#atV');
    if (v) v.textContent = fmt(timerMs());
  }
  setInterval(paintTimer, 250);

  function paintConn() {
    var d = $('#liveDot');
    if (d) {
      d.classList.toggle('on', LIVE.online);
      d.title = LIVE.online ? 'Live session connected' : 'Reconnecting to the live session…';
    }
    var c = $('#lvConn');
    if (c) c.textContent = LIVE.online ? 'live' : 'reconnecting';
  }

  function paintBar() {
    var st = LIVE.st; if (!st) return;
    var c = $('#lvCode'), pp = $('#lvPpl'), sub = $('#lvSub'), nm = $('#fpName');
    if (c) c.textContent = 'Code ' + st.code;
    if (pp) pp.textContent = st.participants + ' joined';
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
      // Only announce our own position when nothing has been staged yet — a
      // genuinely fresh session. If the workshop is already running, we have
      // just adopted its position above and must not overwrite it. This single
      // condition is what stops a console refresh restarting the workshop.
      if (ROLE === 'presenter' && !st.staged) {
        LIVE.adopted = true;
        post('stage', { stepIndex: window.State.i, rv: window.State.rv,
                        ui: window.UI ? window.UI.s : {} });
      }
      connect();
    }).catch(function () {
      setOnline(false);
      flash('<b>Live session not reachable.</b> Presenting in backup mode — responses can be '
        + 'captured on this laptop.');
      scheduleReconnect();
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(boot, 60);
  } else document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 60); });

})();
