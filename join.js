/* ============================================================================
   TMR LEARNING EXPERIENCE — PARTICIPANT PHONE APP  (/join)
   Master Electronics | INTERNAL

   One scan, one page, the whole workshop.

   PRIVACY
     The only thing stored on the phone is a random 16-character id used so a
     re-submission replaces rather than duplicates. No name, no email, no
     employee id, no login, no Microsoft identity, nothing about a real
     employee. The id is meaningless outside this session.

   The participant cannot move ahead: the phone shows exactly what the
   facilitator has opened, and nothing else.
   ========================================================================= */
'use strict';

var PID_KEY = 'tmr-pid';
var DRAFT = 'tmr-draft-';
var pid = null, ST = null, es = null, sending = false;
var answers = {};                 // current activity draft, keyed by field
var lastActivity = null;

var $ = function (s) { return document.querySelector(s); };
var view = $('#view'), foot = $('#foot'), dot = $('#dot');
var esc = function (s) {
  return String(s === undefined ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

var bTimer;
function toast(msg) {
  var b = $('#banner');
  b.innerHTML = msg; b.classList.add('up');
  clearTimeout(bTimer); bTimer = setTimeout(function () { b.classList.remove('up'); }, 3400);
}

function stepById(id) {
  for (var i = 0; i < STEPS.length; i++) if (STEPS[i].id === id) return STEPS[i];
  return null;
}

/* ------------------------------------------------------------------ identity */
function getPid() {
  try {
    var v = localStorage.getItem(PID_KEY);
    if (v && /^[a-f0-9]{16}$/.test(v)) return v;
  } catch (_) {}
  var a = new Uint8Array(8);
  (window.crypto || {}).getRandomValues ? crypto.getRandomValues(a)
    : a.forEach(function (_, i) { a[i] = Math.floor(Math.random() * 256); });
  var s = Array.from(a).map(function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  try { localStorage.setItem(PID_KEY, s); } catch (_) {}
  return s;
}

/* ------------------------------------------------------------------ transport */
function join() {
  return fetch('/api/join', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pid: pid })
  }).then(function (r) { return r.json(); });
}

function connect() {
  if (es) { try { es.close(); } catch (_) {} }
  es = new EventSource('/api/events?pid=' + encodeURIComponent(pid));
  es.onmessage = function (e) {
    try { apply(JSON.parse(e.data)); } catch (_) {}
    dot.classList.add('on');
  };
  es.onerror = function () {
    dot.classList.remove('on');
    // EventSource reconnects on its own; this only surfaces the state
  };
}

function submit() {
  var s = stepById(ST.activity);
  if (!s || sending) return;
  var miss = required(s).filter(function (k) {
    var v = answers[k];
    return v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length);
  });
  if (miss.length) { toast('Please answer every question before submitting.'); return; }
  sending = true; render();
  fetch('/api/submit', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pid: pid, stepId: s.id, payload: answers })
  }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
    .then(function (res) {
      sending = false;
      if (!res.ok) {
        toast(res.j && res.j.error === 'closed'
          ? 'Responses are closed for that activity.' : 'Could not submit. Try again.');
        render(); return;
      }
      try { localStorage.setItem(DRAFT + s.id, JSON.stringify({ sent: true, a: answers })); } catch (_) {}
      render();
    })
    .catch(function () { sending = false; toast('No connection. Try again in a moment.'); render(); });
}

function alreadySent(id) {
  try {
    var d = JSON.parse(localStorage.getItem(DRAFT + id) || 'null');
    return !!(d && d.sent);
  } catch (_) { return false; }
}

/* ------------------------------------------------------------------ specs
   What the phone asks for, per activity. Every option and every piece of
   evidence comes from the approved content already loaded in content-a/b.js —
   nothing here invents wording.                                              */
function fields(s) {
  var out = [];
  if (!s) return out;
  // some scenes are deliberately facilitator-led and take no phone input
  if (s.noPhone) return out;
  switch (s.kind) {
    case 'poll':
      out.push({ k: 'q', t: 'choice', q: s.prompt, opts: s.options });
      break;
    case 'rank':
      out.push({ k: 'q', t: 'multi', q: s.prompt, opts: s.options, pick: s.pickCount || 2 });
      break;
    case 'quiz':
      s.items.forEach(function (it, i) {
        out.push({ k: 'q' + i, t: 'choice', q: (i + 1) + '. ' + it.q, opts: it.opts });
      });
      break;
    case 'sort':
      s.tiles.forEach(function (tl, i) {
        out.push({
          k: 't' + i, t: 'choice', q: tl.t,
          opts: s.buckets.map(function (b) { return b.h; }),
          vals: s.buckets.map(function (b) { return b.id; })
        });
      });
      break;
    case 'match':
      s.keys.forEach(function (kk, i) {
        out.push({ k: 'k' + i, t: 'choice', q: kk, opts: s.opts });
      });
      break;
    case 'worksheet':
      s.rows.forEach(function (r, i) {
        out.push({ k: 'c' + i, t: 'scale', q: r.comp, ev: r.ev });
      });
      out.push({ k: 'cls', t: 'choice', q: 'Proposed classification for Jordan', opts: s.classes });
      out.push({
        k: '12mo', t: 'choice',
        q: 'Could the gaps realistically be addressed within 12 months?',
        opts: ['Yes', 'No', 'Not enough information']
      });
      out.push({ k: 'ev', t: 'text', q: 'Evidence supporting your ratings', opt: true,
        hint: 'Do not include any real employee’s name.' });
      out.push({ k: 'need', t: 'text', q: 'Additional evidence you would need before finalising',
        opt: true });
      out.push({ k: 'dev', t: 'text', q: 'The first development action you would recommend',
        opt: true });
      break;
    case 'builder':
      out.push({
        k: 'chk', t: 'multi', pick: 0,
        q: 'Before you could rate “' + s.vague + '”, what is missing?',
        opts: s.checklist
      });
      out.push({ k: 'rewrite', t: 'text', q: 'Rewrite it as observable evidence', opt: true,
        hint: 'Name the behaviour, how often, over what period, and what changed.' });
      break;
    case 'bias':
      s.cases.forEach(function (c, i) {
        out.push({
          k: 'b' + i, t: 'choice',
          q: 'Situation ' + String.fromCharCode(65 + i) + ': ' + c.sit,
          opts: ['Recency Bias', 'Affinity Bias', 'Halo / Horn Effect']
        });
      });
      break;
    case 'prose':
      if (s.id === 'leader-prep') {
        out.push({
          k: 'weak', t: 'choice',
          q: 'Which of the six preparation steps do you most need to strengthen '
             + 'before your next talent conversation?',
          opts: ['Review performance results and project outcomes',
                 'Document specific behavioral examples',
                 'Compare current competency levels with the target role',
                 'Consider willingness, ability, and development timeline',
                 'Identify where evidence is incomplete',
                 'Review the full evaluation period for possible bias']
        });
      }
      break;
    case 'reflect':
      out.push({
        k: 'reflection', t: 'text', opt: true,
        q: s.question,
        hint: 'Private. This is never shown on screen, never shared and never exported.'
      });
      break;
  }
  return out;
}
function required(s) {
  return fields(s).filter(function (f) { return !f.opt; }).map(function (f) { return f.k; });
}
/** Does this activity accept phone responses at all? */
function interactive(s) { return fields(s).length > 0; }

/* ------------------------------------------------------------------ render */
function apply(st) {
  var was = ST;
  ST = st;
  if (st.activity !== lastActivity) {          // a new activity opened
    lastActivity = st.activity;
    answers = {};
    if (st.activity) {
      try {
        var d = JSON.parse(localStorage.getItem(DRAFT + st.activity) || 'null');
        if (d && d.a) answers = d.a;
      } catch (_) {}
    }
  }
  render();
}

function render() {
  if (!ST) return;
  var s = ST.activity ? stepById(ST.activity) : null;

  if (!ST.live) return screenWaiting('The session has not started yet',
    'Keep this page open. It will update by itself when the facilitators begin.');

  if (!s || !interactive(s)) {
    return screenWaiting('You’re connected',
      'Nothing to answer right now. Follow the main screen — this page will update by '
      + 'itself the moment the next activity opens.');
  }

  if (alreadySent(s.id) && !ST.accepting) return screenDone(s, true);
  if (alreadySent(s.id)) return screenDone(s, false);
  if (!ST.accepting) return screenWaiting('Responses are closed',
    'The facilitators have closed this activity. Follow the main screen.');

  screenActivity(s);
}

function screenWaiting(h, p) {
  view.innerHTML =
    '<div class="wait">'
    + '<div class="pulse"><span></span><span></span><i></i></div>'
    + '<h1>' + esc(h) + '</h1>'
    + '<p class="lede">' + esc(p) + '</p>'
    + '<div class="card tint" style="margin-top:28px;text-align:left">'
    + '<p class="small" style="margin:0 0 6px;letter-spacing:.14em;text-transform:uppercase;'
    + 'font-weight:700;color:var(--slate-4)">Session</p>'
    + '<div class="code">' + esc((ST && ST.code) || '—') + '</div>'
    + '<ul class="rules">'
    + '<li><b>Anonymous.</b> No name, no email, no login. Only group totals ever appear.</li>'
    + '<li>Never name or describe a real employee. Every scenario is fictional.</li>'
    + '<li>Leave this page open for the whole workshop — you only scan once.</li>'
    + '</ul></div></div>';
  foot.innerHTML = '';
}

function screenDone(s, closed) {
  view.innerHTML =
    '<div class="done">'
    + '<div class="tick"><svg viewBox="0 0 24 24"><path d="M4 12.5l5.5 5.5L20 7"/></svg></div>'
    + '<h1>Response received</h1>'
    + '<p class="lede">Thank you. Your answer is anonymous — the facilitators see group '
    + 'totals only.</p>'
    + '<p class="small">' + (closed
      ? 'This activity is now closed.'
      : 'You can change your answer while this activity is still open.') + '</p>'
    + '</div>';
  foot.innerHTML = closed ? ''
    : '<button class="btn ghost" id="again">Change my answer</button>';
  var a = $('#again');
  if (a) a.onclick = function () {
    try { localStorage.removeItem(DRAFT + s.id); } catch (_) {}
    render();
  };
}

function screenActivity(s) {
  var fs = fields(s), h = '';
  h += '<p class="eyebrow">' + esc(stripTags(s.eyebrow || 'Activity')) + '</p>';
  h += '<h1>' + esc(stripTags(s.title || '')) + '</h1>';
  if (s.note) h += '<p class="small" style="margin-bottom:20px">' + s.note + '</p>';

  fs.forEach(function (f, fi) {
    h += '<div class="blk">';
    h += '<p class="qnum">' + (fs.length > 1 ? 'Question ' + (fi + 1) + ' of ' + fs.length
      : 'Your answer') + (f.opt ? ' &middot; optional' : '') + '</p>';
    h += '<h2>' + f.q + '</h2>';
    if (f.ev) h += '<p class="ev">' + esc(f.ev) + '</p>';
    if (f.hint) h += '<p class="hint">' + esc(f.hint) + '</p>';

    if (f.t === 'choice') {
      h += '<div class="opts">';
      f.opts.forEach(function (o, oi) {
        var val = f.vals ? f.vals[oi] : oi;
        var on = String(answers[f.k]) === String(val);
        h += '<button class="opt' + (on ? ' pick' : '') + '" data-f="' + f.k + '" data-v="'
          + esc(val) + '"><span class="mk">' + String.fromCharCode(65 + oi) + '</span>'
          + '<span>' + o + '</span></button>';
      });
      h += '</div>';
    } else if (f.t === 'multi') {
      var cur = answers[f.k] || [];
      h += f.pick ? '<p class="hint">Select exactly ' + f.pick + '.</p>'
                  : '<p class="hint">Select everything that applies.</p>';
      h += '<div class="opts">';
      f.opts.forEach(function (o, oi) {
        var on = cur.indexOf(oi) > -1;
        h += '<button class="opt' + (on ? ' pick' : '') + '" data-m="' + f.k + '" data-v="'
          + oi + '" data-pick="' + (f.pick || 0) + '"><span class="mk">'
          + (on ? '✓' : String.fromCharCode(65 + oi)) + '</span><span>' + o
          + '</span></button>';
      });
      h += '</div>';
    } else if (f.t === 'scale') {
      h += '<div class="scale">';
      [[1, 'Basic'], [2, 'Advanced'], [3, 'Expert'], [4, 'Specialist']].forEach(function (L) {
        var on = String(answers[f.k]) === String(L[0] - 1);
        h += '<button class="' + (on ? 'pick' : '') + '" data-f="' + f.k + '" data-v="'
          + (L[0] - 1) + '"><b>' + L[0] + '</b><span>' + L[1] + '</span></button>';
      });
      h += '</div>';
    } else if (f.t === 'text') {
      h += '<textarea data-t="' + f.k + '" placeholder="Type your answer…">'
        + esc(answers[f.k] || '') + '</textarea>';
    }
    h += '</div>';
  });
  view.innerHTML = h;

  Array.prototype.forEach.call(view.querySelectorAll('[data-f]'), function (b) {
    b.onclick = function () {
      answers[b.getAttribute('data-f')] = b.getAttribute('data-v');
      saveDraft(s.id); screenActivity(s);
    };
  });
  Array.prototype.forEach.call(view.querySelectorAll('[data-m]'), function (b) {
    b.onclick = function () {
      var k = b.getAttribute('data-m'), v = Number(b.getAttribute('data-v'));
      var lim = Number(b.getAttribute('data-pick')) || 0;
      var cur = (answers[k] || []).slice();
      var at = cur.indexOf(v);
      if (at > -1) cur.splice(at, 1);
      else {
        if (lim && cur.length >= lim) { toast('Select exactly ' + lim + '. Deselect one first.'); return; }
        cur.push(v);
      }
      answers[k] = cur; saveDraft(s.id); screenActivity(s);
    };
  });
  Array.prototype.forEach.call(view.querySelectorAll('[data-t]'), function (t) {
    t.oninput = function () { answers[t.getAttribute('data-t')] = t.value; saveDraft(s.id); };
  });

  var need = required(s).filter(function (k) {
    var v = answers[k];
    return v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length);
  }).length;
  foot.innerHTML = '<button class="btn" id="send"' + (sending ? ' disabled' : '') + '>'
    + (sending ? 'Sending…' : (need ? need + ' still to answer' : 'Submit my response'))
    + '</button>';
  var sb = $('#send');
  if (sb) { sb.disabled = sending || need > 0; sb.onclick = submit; }
}

function saveDraft(id) {
  try { localStorage.setItem(DRAFT + id, JSON.stringify({ sent: false, a: answers })); } catch (_) {}
}
function stripTags(h) {
  var d = document.createElement('div'); d.innerHTML = String(h || '');
  return (d.textContent || '').replace(/\s+/g, ' ').trim();
}

/* ------------------------------------------------------------------ boot */
(function () {
  pid = getPid();
  ST = { live: false, code: '—', activity: null, accepting: false };
  screenWaiting('Connecting…', 'One moment.');
  join().then(function (r) {
    if (r && r.state) apply(r.state);
    connect();
  }).catch(function () {
    screenWaiting('Cannot reach the session',
      'Check that you are on the same Wi-Fi as the presenter laptop, then pull down to reload.');
    setTimeout(function () { location.reload(); }, 6000);
  });
  // phone woke from sleep: make sure we are current
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      fetch('/api/state').then(function (r) { return r.json(); })
        .then(apply).catch(function () {});
      if (!es || es.readyState === 2) connect();
    }
  });
})();
