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
    case 'meetjordan':
      // One joint response per PAIR, submitted from one phone. The wording says
      // so on every screen, because a room that submits individually produces
      // twice the responses and half the discussion.
      s.rows.forEach(function (r, i) {
        out.push({ k: 'c' + i, t: 'scale', q: r.comp, ev: r.ev });
      });
      out.push({ k: 'cls', t: 'choice', q: 'Proposed classification for Jordan', opts: s.classes });
      out.push({
        k: '12mo', t: 'choice',
        q: 'Could Jordan realistically be ready within approximately 12 months?',
        opts: ['Yes', 'No', 'Not enough information']
      });
      out.push({ k: 'ev', t: 'text', q: 'Evidence supporting your ratings',
        hint: 'Displayed anonymously if the facilitators choose to show responses. '
            + 'Do not include any real employee’s name.' });
      out.push({ k: 'need', t: 'text', q: 'Evidence still missing before you would finalise this',
        hint: 'Naming the gap is a legitimate answer, and a valuable one.' });
      out.push({ k: 'case', t: 'text', q: 'Your business case for that classification',
        hint: 'One or two sentences. This is what you would say in a calibration room.' });
      out.push({ k: 'dev', t: 'text',
        q: 'First recommended development or utilization action', opt: true });
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
        hint: 'Anonymous. No name is attached to it. The facilitators may show responses on '
            + 'screen to close the session.'
      });
      break;
  }
  return out;
}

/* ------------------------------------------------------------------ reference
   Some sections open on phones but collect nothing: the 19 competency
   definitions, and the seven evidence questions. Participants need these in
   their hand while the room works, and nothing about them should be submitted,
   broadcast or scored. Kept as an explicit screen rather than an activity with
   the submit button hidden, so there is no path by which a stray tap sends
   something to the room. */
function isRef(s) { return !!(s && s.phoneRef); }

/* ------------------------------------------------------------------ Jordan
   The whole case lives here now, not on the wall. One pair reads it together on
   one phone, at reading distance, and answers in the same view.

   Two constraints drove the shape of this screen.

   First, a pair must be able to move between the evidence and their answers
   without losing anything. So this is built ONCE and the sections are toggled
   with a class — nothing is re-rendered when a rating is tapped, when text is
   typed, or when a state frame arrives from the server. A re-render would reset
   the scroll position and blur the textarea mid-sentence, which in testing was
   enough to make people stop writing.

   Second, the design must not grade the evidence for them. There is no colour
   coding, no icon, no emphasis that separates strong evidence from an
   impression. Every observation, quote and gap uses the identical neutral card.
   "I feel", "people say" and "Jordan is always" are all still in the case,
   unhighlighted — recognising them is the exercise, and a red border would do
   that work for the participant.                                             */
var JD_TAB = 'tmr-jd-tab';
var jdBuiltFor = null;

function jdTab() {
  try { return localStorage.getItem(JD_TAB) || 'bg'; } catch (_) { return 'bg'; }
}
function jdSetTab(t) {
  try { localStorage.setItem(JD_TAB, t); } catch (_) {}
  var wrap = view.querySelector('.jd');
  if (wrap) wrap.setAttribute('data-tab', t);
  Array.prototype.forEach.call(view.querySelectorAll('.jdnav button'), function (b) {
    b.classList.toggle('on', b.getAttribute('data-t') === t);
  });
  var sec = view.querySelector('.jd section[data-sec="' + t + '"]');
  if (sec) sec.scrollIntoView({ block: 'start' });
  window.scrollTo(0, Math.max(0, (sec ? sec.offsetTop : 0) - 96));
}

var JD_TABS = [
  ['bg', 'Jordan'],
  ['comp', 'Competencies'],
  ['stake', 'Stakeholders'],
  ['gaps', 'Gaps'],
  ['submit', 'Submit']
];

function jdList(items) {
  return '<ul class="jdul">' + items.map(function (x) {
    return '<li>' + x + '</li>';
  }).join('') + '</ul>';
}

/** Every piece of evidence, in the same neutral card. No grading, no colour. */
function jdRows(items) {
  return items.map(function (x) {
    return '<div class="jdrow"><p>' + x + '</p></div>';
  }).join('');
}

function screenJordan(s) {
  var P = s.profile || {};
  var fs = fields(s);
  var h = '';

  h += '<div class="jd" data-tab="' + esc(jdTab()) + '">';
  h += '<p class="eyebrow">Meet Jordan</p>';
  h += '<h1>Meet Jordan</h1>';
  h += '<div class="pairbar"><b>One phone per pair.</b><span>Read the case together, then '
    + 'submit a single joint response from this phone. No participant names are shown or '
    + 'stored.</span></div>';
  h += '<div class="jdnav">' + JD_TABS.map(function (t) {
    return '<button type="button" data-t="' + t[0] + '"'
      + (t[0] === jdTab() ? ' class="on"' : '') + '>' + t[1] + '</button>';
  }).join('') + '</div>';

  /* --- 1. background, role history, responsibilities ------------------- */
  h += '<section data-sec="bg">';
  h += '<h2>Jordan today</h2>';
  h += '<div class="jdfacts">' + (P.facts || []).map(function (f) {
    return '<div><dt>' + esc(f[0]) + '</dt><dd>' + f[1] + '</dd></div>';
  }).join('') + '</div>';
  h += '<h2>Employment and role history</h2>' + jdList(P.priorRoles || []);
  h += '<h2>Major responsibilities</h2>' + jdList(P.responsibilities || []);
  h += '<h2>Timeline</h2>';
  h += '<div class="jdtl">' + (P.timeline || []).map(function (x) {
    return '<div class="jdtli"><span>' + esc(x.y) + '</span><p>' + x.t + '</p></div>';
  }).join('') + '</div>';
  h += '<h2>Performance history</h2>' + jdList(P.performance || []);
  h += '</section>';

  /* --- 2. the four competencies -------------------------------------- */
  h += '<section data-sec="comp">';
  h += '<p class="jdlede">Four competencies to rate. Read what has been recorded for each one '
    + 'before you decide anything.</p>';
  (s.rows || []).forEach(function (r, i) {
    h += '<div class="jdcomp">';
    h += '<h2>' + (i + 1) + '. ' + esc(r.comp) + '</h2>';
    h += '<p class="jdlab">Approved competency statement</p>';
    h += '<div class="jdrow"><p>' + (r.anchor || r.ev) + '</p></div>';
    if (r.hard && r.hard.length) {
      h += '<p class="jdlab">Recorded observations</p>' + jdRows(r.hard);
    }
    if (r.soft && r.soft.length) {
      h += '<p class="jdlab">Stakeholder comments</p>' + jdRows(r.soft);
    }
    if (r.gap) {
      h += '<p class="jdlab">Evidence gap</p><div class="jdrow"><p>' + r.gap + '</p></div>';
    }
    h += '</div>';
  });
  h += '<h2>The 1&ndash;4 scale</h2>';
  h += '<div class="jdscale">' + [[1, 'Basic', 'Has basic knowledge and can complete the task independently.'],
      [2, 'Advanced', 'Completes independently with quality beyond the basics.'],
      [3, 'Expert', 'Completes independently and can effectively teach others.'],
      [4, 'Specialist', 'Identifies optimization opportunities, resolves sources of error, and develops improved solutions.']]
    .map(function (L) {
      return '<div><b>' + L[0] + ' &middot; ' + L[1] + '</b><span>' + L[2] + '</span></div>';
    }).join('') + '</div>';
  h += '</section>';

  /* --- 3. the full stakeholder record --------------------------------- */
  h += '<section data-sec="stake">';
  h += '<h2>What stakeholders have said</h2>';
  h += '<p class="jdlede">The complete record, as given.</p>';
  h += (P.stakeholders || []).map(function (x) {
    return '<div class="jdrow"><p>' + x.q + '</p><p class="jdwho">' + esc(x.who) + '</p></div>';
  }).join('');
  h += '</section>';

  /* --- 4. where the evidence runs out -------------------------------- */
  h += '<section data-sec="gaps">';
  h += '<h2>Where the evidence runs out</h2>';
  h += '<p class="jdlede">What is not known about Jordan. Missing evidence is a legitimate '
    + 'finding, and you can say so in your answers.</p>';
  h += jdRows(P.gaps || []);
  h += '</section>';

  /* --- 5. the pair submission ---------------------------------------- */
  h += '<section data-sec="submit">';
  h += '<h2>Your pair&rsquo;s response</h2>';
  h += '<p class="jdlede">One response per pair. You can move back to the evidence at any '
    + 'time &mdash; nothing you have entered here is lost.</p>';

  fs.forEach(function (f, fi) {
    h += '<div class="blk">';
    h += '<p class="qnum">' + (fi + 1) + ' of ' + fs.length + (f.opt ? ' &middot; optional' : '')
      + '</p>';
    h += '<h3 class="jdq">' + f.q + '</h3>';
    if (f.ev) h += '<p class="ev">' + esc(f.ev) + '</p>';
    if (f.hint) h += '<p class="hint">' + esc(f.hint) + '</p>';

    if (f.t === 'scale') {
      h += '<div class="scale">';
      [[1, 'Basic'], [2, 'Advanced'], [3, 'Expert'], [4, 'Specialist']].forEach(function (L) {
        var on = String(answers[f.k]) === String(L[0] - 1);
        h += '<button class="' + (on ? 'pick' : '') + '" data-jf="' + f.k + '" data-v="'
          + (L[0] - 1) + '"><b>' + L[0] + '</b><span>' + L[1] + '</span></button>';
      });
      h += '</div>';
    } else if (f.t === 'choice') {
      h += '<div class="opts">';
      f.opts.forEach(function (o, oi) {
        var val = f.vals ? f.vals[oi] : oi;
        var on = String(answers[f.k]) === String(val);
        h += '<button class="opt' + (on ? ' pick' : '') + '" data-jf="' + f.k + '" data-v="'
          + esc(val) + '"><span class="mk">' + String.fromCharCode(65 + oi) + '</span>'
          + '<span>' + o + '</span></button>';
      });
      h += '</div>';
    } else {
      h += '<textarea data-t="' + f.k + '" placeholder="Type your answer…">'
        + esc(answers[f.k] || '') + '</textarea>';
    }
    h += '</div>';
  });
  h += '</section>';
  h += '</div>';

  view.innerHTML = h;
  jdBuiltFor = s.id;

  // tabs
  Array.prototype.forEach.call(view.querySelectorAll('.jdnav button'), function (b) {
    b.onclick = function () { jdSetTab(b.getAttribute('data-t')); };
  });

  /* Choices update in place. Re-rendering here is what used to lose the pair's
     scroll position and their half-typed business case. */
  Array.prototype.forEach.call(view.querySelectorAll('[data-jf]'), function (b) {
    b.onclick = function () {
      var k = b.getAttribute('data-jf');
      answers[k] = b.getAttribute('data-v');
      var group = b.parentElement;
      Array.prototype.forEach.call(group.querySelectorAll('[data-jf]'), function (o) {
        o.classList.toggle('pick', o === b);
      });
      saveDraft(s.id);
      jdFoot(s);
    };
  });
  Array.prototype.forEach.call(view.querySelectorAll('[data-t]'), function (t) {
    if (t.tagName !== 'TEXTAREA') return;
    t.oninput = function () {
      answers[t.getAttribute('data-t')] = t.value;
      saveDraft(s.id);
      jdFoot(s);
    };
  });

  jdFoot(s);
}

/** The submit button, refreshed without touching the view. */
function jdFoot(s) {
  var need = required(s).filter(function (k) {
    var v = answers[k];
    return v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length);
  }).length;
  var btn = document.getElementById('send');
  var label = sending ? 'Sending…'
    : (need ? need + ' still to answer' : 'Submit our pair’s response');
  if (!btn) {
    foot.innerHTML = '<button class="btn" id="send">' + label + '</button>';
    btn = document.getElementById('send');
    btn.onclick = function () {
      if (jdBuiltFor) {
        var miss = required(s).filter(function (k) {
          var v = answers[k];
          return v === undefined || v === null || v === '';
        });
        if (miss.length) {
          jdSetTab('submit');
          toast('Answer every question before submitting.');
          return;
        }
      }
      submit();
    };
  } else btn.textContent = label;
  btn.disabled = sending || need > 0;
}

function screenReference(s) {
  var h = '';
  h += '<p class="eyebrow">' + esc(stripTags(s.eyebrow || 'Reference')) + '</p>';
  h += '<h1>' + esc(stripTags(s.title || '')) + '</h1>';

  if (s.kind === 'explorer') {
    h += '<p class="lede">Explore the competency definitions privately. Pay particular attention '
      + 'to the four highlighted competencies; you will apply them to Jordan shortly. Use your '
      + 'paper guide to record any notes or questions.</p>';
    h += '<div class="refnote">Nothing on this screen is submitted. No employee name is entered '
      + 'anywhere, and nothing you tap is shown to the room.</div>';
    h += '<div class="jorkey"><b>Used in the Jordan case</b>'
      + '<span>Accountable to Results &middot; Data Literacy &middot; Development of Others '
      + '&middot; Strategic Awareness</span></div>';
    h += '<div class="reflist">';
    COMPETENCIES.forEach(function (row) {
      var n = row[0], name = row[1], def = row[2];
      var jor = JORDAN_COMPS.indexOf(n) > -1;
      h += '<details class="refitem' + (jor ? ' jor' : '') + '">'
        + '<summary><span class="rn">' + n + '</span><span class="rt">' + esc(name) + '</span>'
        + (jor ? '<span class="rb">Jordan case</span>' : '') + '</summary>'
        + '<div class="rbody"><p>' + esc(def) + '</p>'
        + (typeof COMP_SLIDE18 !== 'undefined' && COMP_SLIDE18[n]
            ? '<p class="rsm">In this session: ' + esc(COMP_SLIDE18[n]) + '</p>' : '')
        + '</div></details>';
    });
    h += '</div>';
  } else {
    h += '<p class="lede">These are the seven questions that separate observable evidence from an '
      + 'impression. Keep them open while the room works — tap any question to expand it.</p>';
    h += '<div class="refnote">Reference only. There is no answer box on this screen and nothing '
      + 'is submitted.</div>';
    h += '<div class="reflist">';
    (s.checklist || []).forEach(function (q, i) {
      h += '<details class="refitem">'
        + '<summary><span class="rn">' + (i + 1) + '</span><span class="rt">' + esc(q)
        + '</span></summary>'
        + '<div class="rbody"><p>' + esc(EV_Q_HELP[i] || '') + '</p></div></details>';
    });
    h += '</div>';
  }
  view.innerHTML = h;
  foot.innerHTML = '<p class="refoot">Follow the main screen. This page stays available for the '
    + 'rest of the session.</p>';
}

/* Short plain-language expansion of each of the seven evidence questions. */
var EV_Q_HELP = [
  'Name the action, not the impression. What would a camera have recorded? '
    + '“Ran the meeting” is observable; “was engaged” is not.',
  'Anchor it in time. A leader who cannot place an example is usually recalling the last '
    + 'three weeks rather than the full period.',
  'Once is an anecdote. Repeatedly is a capability. Say how many times, across how many '
    + 'situations.',
  'What changed as a result — for the customer, the project, the numbers, or another person’s '
    + 'ability to work independently?',
  'A single event tells you almost nothing about readiness. A pattern is what a classification '
    + 'has to rest on.',
  'Look for the counter-example on purpose. If you cannot think of one, you may not have looked.',
  'Say the gap out loud. Missing evidence is a real finding, and it is a legitimate answer in a '
    + 'calibration room.'
];
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

  // reference sections: open, but nothing is collected
  if (s && isRef(s)) return screenReference(s);

  /* The Jordan case. Built once and left alone: a state frame arriving from the
     server every time another pair submits must not rebuild this view under a
     pair who is halfway through typing. Only the submit button refreshes. */
  if (s && s.kind === 'meetjordan' && ST.accepting && !alreadySent(s.id)) {
    if (jdBuiltFor === s.id && view.querySelector('.jd')) { jdFoot(s); return; }
    return screenJordan(s);
  }
  if (jdBuiltFor && (!s || s.kind !== 'meetjordan')) jdBuiltFor = null;

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

/* The phone carries the fuller instructions: it is held at reading distance, so
   it can afford the detail the projected screen cannot. Same eight questions,
   same order as the main screen, so a participant looking between the two is
   never comparing two different sets of rules. */
var PHONE_INSTRUCT = [
  ['why',    'Why you’re doing this'],
  ['device', 'How to work'],
  ['submit', 'What to submit'],
  ['anon',   'Privacy'],
  ['answer', 'Scoring'],
  ['time',   'How long you have'],
  ['after',  'What happens next'],
  ['ready',  'Be ready to discuss']
];

function instructPanel(s) {
  var x = s.instruct;
  if (!x) return '';
  var rows = PHONE_INSTRUCT.filter(function (r) { return x[r[0]]; });
  if (!rows.length) return '';
  return '<details class="howto-p" open><summary>How this works</summary><dl>'
    + rows.map(function (r) {
        return '<dt>' + r[1] + '</dt><dd>' + x[r[0]] + '</dd>';
      }).join('')
    + '</dl></details>';
}

function screenActivity(s) {
  var fs = fields(s), h = '';
  h += '<p class="eyebrow">' + esc(stripTags(s.eyebrow || 'Activity')) + '</p>';
  h += '<h1>' + esc(stripTags(s.title || '')) + '</h1>';
  if (s.kind === 'meetjordan') {
    h += '<div class="pairbar"><b>Submit one response per pair.</b>'
      + '<span>Work with your partner and send a single joint response from this phone. '
      + 'No participant names are shown or stored.</span></div>';
  }
  h += instructPanel(s);
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
