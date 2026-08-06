/* ============================================================================
   BUILDING THE FUTURE OF TALENT — static presentation
   Master Electronics | Business Enablement | INTERNAL

   One file, one screen, no server.

   There is deliberately nothing here but slides and navigation. No roles, no
   session, no sync, no storage, no network calls of any kind — this runs from
   a file:// path as happily as from a web address, which is the whole point.
   If it ever stops working, the reason is in this file or in style.css.

   Operating it: Next, Back, Home, Fullscreen. That is all there is.

   CONTENT
     Every definition, classification, competency, scale level and leader
     mandate below is taken verbatim or near-verbatim from the four approved
     source documents:
       - Business Enablement TMR Introduction.pptx
       - Business Enablement TMR Participant Guide.docx
       - Business Enablement TMR Quick Reference Guide.docx
       - BUSINESS ENABLEMENT TMR DUAL FACILITATOR GUIDE.docx
     Nothing has been simplified or reworded in a way that changes meaning.

     Twelve slides, condensed from the twelve sections of the full workshop.
     The Jordan practice case, the phone activities and the facilitator scripts
     are intentionally absent: this is the presentation, and the discussion
     happens out loud in the room.
   ========================================================================= */
'use strict';

/* ---------------------------------------------------------------- content */
const SLIDES = [

  /* 1 ------------------------------------------------------------------- */
  {
    kind: 'title',
    eyebrow: 'Master Electronics · Business Enablement · Internal',
    title: 'Building the Future of Talent',
    sub: 'An Introduction to Talent Management Reviews',
    meta: 'For VPs, Directors &amp; Managers',
    foot: 'A foundational introduction to Talent Management Reviews — not a Business '
        + 'Enablement implementation.'
  },

  /* 2 ------------------------------------------------------------------- */
  {
    kind: 'statement',
    nav: 'Why TMR exists',
    eyebrow: 'Why TMR exists',
    lead: 'If one of your key leaders left tomorrow, who could step into the role?',
    sub: 'And what evidence gives you confidence in that answer?',
    note: 'Most leaders can name a person. Far fewer can name the evidence. '
        + 'That gap is what Talent Management Review was built to close.'
  },

  /* 3 ------------------------------------------------------------------- */
  {
    kind: 'split',
    nav: 'What TMR is',
    eyebrow: 'The boundary',
    title: 'What TMR is, and is not',
    columns: [
      {
        tone: 'is',
        head: 'TMR is',
        items: [
          'A strategic process to assess talent depth and readiness',
          'A forward-looking leadership pipeline tool'
        ]
      },
      {
        tone: 'isnot',
        head: 'TMR is not',
        items: [
          'A replacement for performance reviews'
        ]
      }
    ],
    note: 'Operations built TMR to establish a common language for discussing talent '
        + 'consistently across teams — so two leaders looking at the same person ask the '
        + 'same questions and apply the same standards.'
  },

  /* 4 ------------------------------------------------------------------- */
  {
    kind: 'compare',
    nav: 'Performance vs TMR',
    eyebrow: 'Two different questions',
    title: 'Performance Review or Talent Management Review',
    columns: [
      {
        head: 'Performance Review',
        sub: 'What is being delivered today',
        items: [
          'Focuses on the current role',
          'Reviews past and current results',
          'Provides individual feedback',
          'Addresses performance expectations'
        ]
      },
      {
        head: 'Talent Management Review',
        sub: 'How someone may contribute in the future',
        items: [
          'Focuses on future capability',
          'Considers potential, readiness and expertise',
          'Involves leadership discussion',
          'Identifies development or utilization needs'
        ]
      }
    ],
    note: 'Strong current performance matters in both. In a performance review it is the '
        + 'subject. In TMR it is the floor — what we assume is already solid before we start '
        + 'talking about potential or readiness.'
  },

  /* 5 ------------------------------------------------------------------- */
  {
    kind: 'cards',
    nav: 'Four dimensions',
    eyebrow: 'The vocabulary',
    title: 'Four talent dimensions',
    lead: 'Four questions every leader should ask before talking about someone’s future.',
    cards: [
      {
        n: '01', head: 'Performance',
        sub: 'Current results and role effectiveness',
        body: 'Delivering results against goals, quality standards and role expectations. '
            + 'The baseline every rating builds on.'
      },
      {
        n: '02', head: 'Potential',
        sub: 'Capacity to grow into broader responsibility',
        body: 'Emerging leadership behaviors, appetite for stretch work and a consistent '
            + 'upward trajectory — weighed alongside willingness to develop.'
      },
      {
        n: '03', head: 'Readiness',
        sub: 'How soon someone could move into a target role',
        body: 'A named target role, a realistic timeline and few or no critical gaps left. '
            + 'Potential is capacity; readiness is timing.'
      },
      {
        n: '04', head: 'Professional Expertise',
        sub: 'Depth of mastery in the current role',
        body: 'Deep, reliable expertise, frequently sought out for guidance. Identifies talent '
            + 'best leveraged through mentoring or initiative leadership.'
      }
    ]
  },

  /* 6 ------------------------------------------------------------------- */
  {
    kind: 'cards',
    nav: 'Classifications',
    eyebrow: 'The four talent classifications',
    title: 'How Operations classifies talent',
    cards: [
      {
        n: '01', head: 'HiPo', sub: 'High Potential', tone: 'ok',
        body: 'Consistently strong performer with foundational and emerging leadership '
            + 'behaviors — can reasonably become ready for the next role within 12 months '
            + 'through a focused development plan.',
        mandate: 'Build a 12-month development plan tied to specific competency gaps.'
      },
      {
        n: '02', head: 'Mid Potential', sub: '', tone: 'info',
        body: 'Shows some HiPo traits but lacks consistency, or would need more than '
            + '12 months to be ready for the next role.',
        mandate: 'Coach and develop through regular performance management.'
      },
      {
        n: '03', head: 'HiPro', sub: 'High Professional', tone: 'warn',
        body: 'Highly capable in the current role and often shows HiPo-like strengths, but has '
            + 'reached a practical limit in ability or willingness to move up.',
        mandate: 'Build a utilization plan — mentoring, training, process or initiative ownership.'
      },
      {
        n: '04', head: 'Low Potential', sub: '', tone: 'no',
        body: 'Either too new to evaluate for advancement, or not currently showing the '
            + 'engagement or performance needed for growth.',
        mandate: 'Focus on onboarding success, or a clear performance and engagement plan.'
      }
    ],
    note: 'HiPo assumes the person is <strong>willing and able</strong> to grow. That is what '
        + 'separates HiPo from HiPro.'
  },

  /* 7 ------------------------------------------------------------------- */
  {
    kind: 'scale',
    nav: 'Competencies & scale',
    eyebrow: 'The competency framework',
    title: 'A shared language, and how it is rated',
    lead: 'Behavioral competencies provide a common language across the business, while '
        + 'technical and role-specific expectations vary by function.',
    levels: [
      { n: '1', name: 'Basic',
        body: 'Has basic knowledge and can complete the task independently.' },
      { n: '2', name: 'Advanced',
        body: 'Completes independently with quality beyond the basics.' },
      { n: '3', name: 'Expert',
        body: 'Completes independently and can effectively teach others.' },
      { n: '4', name: 'Specialist',
        body: 'Identifies optimization opportunities, resolves sources of error, and develops '
            + 'improved solutions.' }
    ],
    note: 'Level 1 already includes independent routine work. Level 3 is where coaching others '
        + 'begins. Level 4 is root cause and lasting improvement — and not every role or '
        + 'competency requires it.'
  },

  /* 8 ------------------------------------------------------------------- */
  {
    kind: 'evidence',
    nav: 'Evidence & bias',
    eyebrow: 'Observable evidence',
    title: 'Evidence, not impressions',
    lead: 'A rating is only as strong as the evidence behind it.',
    questions: [
      'What specific behavior did I observe?',
      'When did it occur?',
      'How often did it occur?',
      'What measurable impact did it have?',
      'Is this a pattern or a single event?',
      'What evidence would challenge my current view?',
      'What information is still missing?'
    ],
    bias: [
      { head: 'Recency', body: 'Weighing the last few weeks over the full period.',
        safe: 'Anchor to examples from all four quarters.' },
      { head: 'Affinity', body: 'Favoring people who remind you of yourself.',
        safe: 'Rate against the scale, not personal comparison.' },
      { head: 'Halo / Horn', body: 'Letting one strong or weak trait color every rating.',
        safe: 'Score each dimension separately.' }
    ],
    note: 'If you genuinely do not have a specific example, that is useful information in '
        + 'itself. <strong>Missing evidence is a real finding.</strong>'
  },

  /* 9 ------------------------------------------------------------------- */
  {
    kind: 'steps',
    nav: 'Preparation & calibration',
    eyebrow: 'Before the conversation',
    title: 'Preparation, then calibration',
    lead: 'Effective TMR conversations begin long before the meeting.',
    steps: [
      'Review performance results and project outcomes',
      'Document specific behavioral examples',
      'Compare current competency levels with the target role',
      'Consider willingness, ability and development timeline',
      'Identify where evidence is incomplete',
      'Review the full evaluation period for possible bias'
    ],
    aside: {
      head: 'What calibration does',
      items: [
        'Leaders compare evidence side by side, using specific examples',
        'Ratings may be challenged, and more evidence requested',
        'The same definitions apply the same way across every team'
      ]
    },
    note: 'Calibration is the next step in strengthening consistency within Operations. '
        + 'Business Enablement is learning the concept and may consider a future pilot — '
        + 'it is not running today.'
  },

  /* 10 ------------------------------------------------------------------ */
  {
    kind: 'plans',
    nav: 'Plans',
    eyebrow: 'What classifications produce',
    title: 'Development and utilization plans',
    lead: 'A classification is only worth something if it produces an action.',
    plans: [
      { head: 'HiPo', tone: 'ok', label: 'Focused development plan',
        body: 'Stretch assignments, mentoring, cross-functional leadership and regular '
            + 'progress reviews, tied to specific competency gaps.' },
      { head: 'HiPro', tone: 'warn', label: 'Utilization plan',
        body: 'Mentoring, training, process ownership or initiative leadership — raising '
            + 'impact and retention rather than moving the person up.' },
      { head: 'Mid / Low Potential', tone: 'info', label: 'Coaching and performance management',
        body: 'Not typically presented in TMR. Coach through regular performance management, '
            + 'or focus on onboarding success where the person is simply new.' }
    ],
    note: 'In every case the direct leader drives the plan and Senior Leadership reviews and '
        + 'approves it.'
  },

  /* 11 ------------------------------------------------------------------ */
  {
    kind: 'list',
    nav: 'Future considerations',
    eyebrow: 'Future Business Enablement considerations',
    title: 'Questions to carry forward',
    lead: 'These are discussion prompts to capture, not decisions to make today.',
    items: [
      'Which roles should be evaluated first?',
      'What future roles or broader responsibilities exist?',
      'Which competencies should apply across Business Enablement?',
      'Which competencies should vary by role?',
      'What additional framework development is needed?',
      'Who should participate in the next planning conversation?'
    ],
    note: 'Today’s session was the foundation. A future framework is a separate, deliberate '
        + 'planning effort.'
  },

  /* 12 ------------------------------------------------------------------ */
  {
    kind: 'closing',
    nav: 'Close',
    eyebrow: 'Coming full circle',
    lead: 'TMR is not preparation for a meeting.',
    big: 'It is the discipline of building readiness before the business is forced to test it.',
    question: 'What conversation about talent will you have differently after today?',
    foot: 'Thank you for your participation.'
  }
];

/* ---------------------------------------------------------------- helpers */
const $ = (s, r) => (r || document).querySelector(s);
const el = (t, c, h) => {
  const n = document.createElement(t);
  if (c) n.className = c;
  if (h !== undefined) n.innerHTML = h;
  return n;
};
const li = (items) => items.map((x) => `<li>${x}</li>`).join('');

/* ---------------------------------------------------------------- render
   Each slide is built once, on load, and then only shown or hidden. Building
   on demand would mean the transition and the layout happen in the same frame,
   which is what makes a deck feel like it stutters on the first pass through. */
function build(s, i) {
  const sec = el('section', 'slide k-' + s.kind);
  sec.id = 'slide-' + i;
  sec.setAttribute('aria-hidden', 'true');
  const w = el('div', 'wrap');

  const eyebrow = s.eyebrow ? `<p class="eyebrow">${s.eyebrow}</p>` : '';
  const title = s.title ? `<h2 class="title">${s.title}</h2>` : '';
  const lead = s.lead ? `<p class="lead">${s.lead}</p>` : '';
  const note = s.note ? `<p class="note">${s.note}</p>` : '';

  switch (s.kind) {

    case 'title':
      w.innerHTML =
        `<p class="eyebrow">${s.eyebrow}</p>
         <h1 class="hero">${s.title}</h1>
         <p class="hero-sub">${s.sub}</p>
         <p class="hero-meta">${s.meta}</p>
         <p class="hero-foot">${s.foot}</p>`;
      break;

    case 'statement':
      w.innerHTML =
        `${eyebrow}
         <p class="statement">${s.lead}</p>
         <p class="statement two">${s.sub}</p>
         ${s.note ? `<p class="note wide">${s.note}</p>` : ''}`;
      break;

    case 'split':
      w.innerHTML =
        `${eyebrow}${title}
         <div class="two-col">${s.columns.map((c) => `
           <div class="col ${c.tone}">
             <p class="col-head">${c.head}</p>
             <ul>${li(c.items)}</ul>
           </div>`).join('')}</div>
         ${note}`;
      break;

    case 'compare':
      w.innerHTML =
        `${eyebrow}${title}
         <div class="two-col">${s.columns.map((c) => `
           <div class="col">
             <p class="col-head">${c.head}</p>
             <p class="col-sub">${c.sub}</p>
             <ul>${li(c.items)}</ul>
           </div>`).join('')}</div>
         ${note}`;
      break;

    case 'cards':
      w.innerHTML =
        `${eyebrow}${title}${lead}
         <div class="cards c${s.cards.length}">${s.cards.map((c) => `
           <div class="card ${c.tone || ''}">
             <p class="card-n">${c.n}</p>
             <h3>${c.head}</h3>
             ${c.sub ? `<p class="card-sub">${c.sub}</p>` : ''}
             <p class="card-body">${c.body}</p>
             ${c.mandate ? `<p class="card-mandate">${c.mandate}</p>` : ''}
           </div>`).join('')}</div>
         ${note}`;
      break;

    case 'scale':
      w.innerHTML =
        `${eyebrow}${title}${lead}
         <div class="levels">${s.levels.map((l) => `
           <div class="level">
             <p class="lvl-n">${l.n}</p>
             <p class="lvl-name">${l.name}</p>
             <p class="lvl-body">${l.body}</p>
           </div>`).join('')}</div>
         ${note}`;
      break;

    case 'evidence':
      w.innerHTML =
        `${eyebrow}${title}${lead}
         <div class="ev-grid">
           <div class="ev-q">
             <p class="col-head">The seven evidence questions</p>
             <ol>${li(s.questions)}</ol>
           </div>
           <div class="ev-b">
             <p class="col-head">Three tendencies, three safeguards</p>
             ${s.bias.map((x) => `
               <div class="bias">
                 <p class="bias-h">${x.head}</p>
                 <p class="bias-b">${x.body}</p>
                 <p class="bias-s">${x.safe}</p>
               </div>`).join('')}
           </div>
         </div>
         ${note}`;
      break;

    case 'steps':
      w.innerHTML =
        `${eyebrow}${title}${lead}
         <div class="ev-grid">
           <div class="ev-q">
             <ol class="steps">${li(s.steps)}</ol>
           </div>
           <div class="ev-b">
             <p class="col-head">${s.aside.head}</p>
             <ul class="aside">${li(s.aside.items)}</ul>
           </div>
         </div>
         ${note}`;
      break;

    case 'plans':
      w.innerHTML =
        `${eyebrow}${title}${lead}
         <div class="cards c3">${s.plans.map((p) => `
           <div class="card ${p.tone}">
             <h3>${p.head}</h3>
             <p class="card-sub">${p.label}</p>
             <p class="card-body">${p.body}</p>
           </div>`).join('')}</div>
         ${note}`;
      break;

    case 'list':
      w.innerHTML =
        `${eyebrow}${title}${lead}
         <ol class="big-list">${li(s.items)}</ol>
         ${note}`;
      break;

    case 'closing':
      w.innerHTML =
        `${eyebrow}
         <p class="closing-lead">${s.lead}</p>
         <p class="closing-big">${s.big}</p>
         <p class="closing-q">&ldquo;${s.question}&rdquo;</p>
         <p class="closing-foot">${s.foot}</p>`;
      break;

    default:
      w.innerHTML = `${eyebrow}${title}${lead}${note}`;
  }

  sec.appendChild(w);
  return sec;
}

/* ---------------------------------------------------------------- state */
let at = 0;
const stage = $('#stage');
const slides = SLIDES.map((s, i) => {
  const n = build(s, i);
  stage.appendChild(n);
  return n;
});

/* Progress ticks double as a section indicator. Clickable, because a
   facilitator asked something about slide four is not going to press Back
   eight times to get there. */
const prog = $('#prog');
SLIDES.forEach((s, i) => {
  const t = el('button', 'tick');
  t.type = 'button';
  t.title = s.nav || s.title || 'Title';
  t.setAttribute('aria-label', 'Go to ' + (s.nav || 'title slide'));
  t.addEventListener('click', () => go(i));
  prog.appendChild(t);
});
const ticks = Array.from(prog.children);

function go(i, instant) {
  i = Math.max(0, Math.min(SLIDES.length - 1, i));
  const back = i < at;
  slides.forEach((n, k) => {
    n.classList.toggle('on', k === i);
    n.classList.toggle('back', instant ? false : (back ? k === at : false));
    n.setAttribute('aria-hidden', k === i ? 'false' : 'true');
  });
  ticks.forEach((t, k) => {
    t.classList.toggle('done', k < i);
    t.classList.toggle('here', k === i);
  });
  at = i;

  $('#count').textContent = (i + 1) + ' / ' + SLIDES.length;
  $('#back').disabled = i === 0;
  $('#next').disabled = i === SLIDES.length - 1;
  document.title = (SLIDES[i].nav ? SLIDES[i].nav + ' · ' : '')
    + 'Building the Future of Talent';

  // the address bar remembers the slide, so a reload does not lose your place
  try { history.replaceState(null, '', '#' + (i + 1)); } catch (_) {}
}

const next = () => go(at + 1);
const prev = () => go(at - 1);
const home = () => go(0);

/* ---------------------------------------------------------------- controls */
$('#next').addEventListener('click', next);
$('#back').addEventListener('click', prev);
$('#home').addEventListener('click', home);

const fsBtn = $('#full');
fsBtn.addEventListener('click', () => {
  if (document.fullscreenElement) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else {
    const r = document.documentElement;
    (r.requestFullscreen || r.webkitRequestFullscreen).call(r);
  }
});
document.addEventListener('fullscreenchange', () => {
  const on = !!document.fullscreenElement;
  fsBtn.classList.toggle('on', on);
  fsBtn.title = on ? 'Leave fullscreen (F)' : 'Fullscreen (F)';
});

document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  switch (e.key) {
    case 'ArrowRight': case 'PageDown': case ' ': case 'Enter':
      e.preventDefault(); next(); break;
    case 'ArrowLeft': case 'PageUp': case 'Backspace':
      e.preventDefault(); prev(); break;
    case 'Home': e.preventDefault(); home(); break;
    case 'End': e.preventDefault(); go(SLIDES.length - 1); break;
    case 'f': case 'F': e.preventDefault(); fsBtn.click(); break;
    default: break;
  }
});

/* Touch, for running it from a tablet. Deliberately generous on the threshold
   so a scroll on a long slide is never read as a swipe. */
let tx = 0, ty = 0;
stage.addEventListener('touchstart', (e) => {
  tx = e.changedTouches[0].clientX;
  ty = e.changedTouches[0].clientY;
}, { passive: true });
stage.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx)) return;
  dx < 0 ? next() : prev();
}, { passive: true });

/* The chrome fades out while presenting and returns on any movement, so the
   room sees the slide rather than the controls. */
let idle;
function wake() {
  document.body.classList.remove('idle');
  clearTimeout(idle);
  idle = setTimeout(() => document.body.classList.add('idle'), 2600);
}
['mousemove', 'keydown', 'touchstart', 'click'].forEach((ev) =>
  document.addEventListener(ev, wake, { passive: true }));

/* ---------------------------------------------------------------- boot */
const fromHash = parseInt((location.hash || '').replace('#', ''), 10);
go(Number.isFinite(fromHash) && fromHash > 0 ? fromHash - 1 : 0, true);
wake();
