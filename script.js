/* ============================================================================
   BUILDING THE FUTURE OF TALENT — static presentation
   Master Electronics | Business Enablement | INTERNAL

   Twenty slides. One screen. No server, no roles, no session, no storage, no
   network call of any kind — it runs from a file:// path as happily as from a
   web address.

   Controls: Next, Back, Home, Fullscreen. Nothing else.

   PRESENTER NOTES
     Every slide carries notes: presenter, main point, suggested explanation,
     one optional question, transition and approximate time. They are never on
     screen — there is no presenter view — but they are in the printed output,
     so Ctrl+P gives a facilitator the deck with their notes underneath.
   ========================================================================= */
'use strict';

const SLIDES = [

/* 1 ----------------------------------------------------------------------- */
{
  kind: 'title',
  eyebrow: 'Master Electronics · INTERNAL',
  title: 'Building the Future of Talent',
  sub: 'An Introduction to Talent Management Reviews for Business Enablement',
  meta: 'For VPs, Directors and Managers',
  foot: 'Today is a foundation. We are learning how Operations uses TMR — we are not '
      + 'implementing a Business Enablement process today.',
  notes: {
    who: 'Lexi',
    point: 'Set the room: this is a foundation session, not a rollout.',
    say: 'Welcome, and thank you for giving us three hours. Today we are going to build a '
       + 'shared language for talking about talent. We are learning how Operations uses '
       + 'Talent Management Review — nothing is being decided about Business Enablement today.',
    ask: 'Before we start — how many of you have sat in a talent or succession discussion before?',
    next: 'Here is how the time is laid out.',
    time: '2 min'
  }
},

/* 2 ----------------------------------------------------------------------- */
{
  kind: 'agenda',
  nav: 'Agenda',
  eyebrow: 'Agenda',
  title: 'What we will cover',
  /* Times are the sum of the presenter-note timings for the slides each topic
     covers, so the agenda and the notes can never quietly disagree. Durations
     rather than clock times: the session does not always start when it says. */
  open: { label: 'Opening, agenda and purpose', mins: 6 },
  items: [
    { t: 'Why TMR exists', mins: 6 },
    { t: 'How TMR evolved in Operations', mins: 6 },
    { t: 'Career paths and accountability', mins: 7 },
    { t: 'The competency matrix', mins: 7 },
    { t: 'The 1–4 scale', mins: 6 },
    { t: 'Talent dimensions', mins: 12 },
    { t: 'Talent classifications', mins: 9 },
    { t: 'Leader preparation', mins: 8 },
    { t: 'Evidence', mins: 7 },
    { t: 'Calibration and the Operations offsite', mins: 14 },
    { t: 'Actions after classification', mins: 14 },
    { t: 'Business Enablement next steps', mins: 15 }
  ],
  notes: {
    who: 'Lexi',
    point: 'Orient the room. Twelve topics, building from why to what next.',
    say: 'Twelve topics, and the times on the right are guides rather than gates — if a '
       + 'discussion is worth having we will take it and make the time up later. The first '
       + 'half is why TMR exists and how it works. The second half is '
       + 'what a leader actually does — prepare evidence, sit in calibration, and turn a '
       + 'classification into action. We finish on what Business Enablement would need to build.',
    ask: 'Is there anything on this list you especially want time on?',
    next: 'Let me be specific about what you should walk out able to do.',
    time: '2 min'
  }
},

/* 3 ----------------------------------------------------------------------- */
{
  kind: 'purpose',
  nav: 'Today’s purpose',
  eyebrow: 'Today’s purpose',
  title: 'What you should walk out with',
  items: [
    'Learn why Operations created TMR',
    'Understand how the process works',
    'See what leaders prepare before calibration',
    'Understand how classifications lead to action',
    'Identify what Business Enablement would need to build next'
  ],
  note: 'Today is a foundation. We are learning how Operations uses TMR. We are not '
      + 'implementing a Business Enablement process today.',
  notes: {
    who: 'Lexi',
    point: 'Five outcomes, and one clear scope boundary.',
    say: 'By the end you should understand why this exists, how it works, what you would '
       + 'prepare, and what happens after a classification is made. The last one matters most '
       + 'for us: what would Business Enablement need before it could do this well.',
    ask: 'Which of these five is most useful for your team right now?',
    next: 'So why does this exist at all?',
    time: '2 min'
  }
},

/* 4 ----------------------------------------------------------------------- */
{
  kind: 'why',
  nav: 'Why TMR exists',
  eyebrow: 'Why TMR exists',
  title: 'Performance tells you today. TMR tells you what comes next.',
  points: [
    'Performance reviews focus on the current role',
    'Leaders also need to understand readiness, succession, potential and professional expertise',
    'Operations needed a consistent language for talent',
    'Leaders needed shared definitions and stronger evidence',
    'TMR connects development and succession planning',
    'TMR helps leaders prepare before a vacancy occurs'
  ],
  flow: [
    { n: '01', head: 'The problem',
      body: 'Talent discussions varied by leader. Readiness was often an impression, and '
          + 'succession was visible only when someone left.' },
    { n: '02', head: 'A common framework',
      body: 'Shared definitions, a common competency language, and ratings that have to be '
          + 'supported by observable evidence.' },
    { n: '03', head: 'Development and succession',
      body: 'Gaps become development plans, expertise becomes utilization plans, and readiness '
          + 'is known before the seat is empty.' }
  ],
  notes: {
    who: 'Lexi',
    point: 'The gap between knowing how someone performs and knowing whether they are ready.',
    say: 'A performance review answers one question well: how is this person doing in the job '
       + 'they have. It does not tell you who could step up, how soon, or what evidence you '
       + 'have for saying so. Operations kept hitting that gap — usually at the worst possible '
       + 'moment, when someone resigned.',
    ask: 'If one of your key people left tomorrow, who steps in — and what evidence gives you '
       + 'confidence in that answer?',
    next: 'This did not arrive fully formed. Here is how it developed.',
    time: '6 min'
  }
},

/* 5 ----------------------------------------------------------------------- */
{
  kind: 'evolution',
  nav: 'How TMR evolved',
  eyebrow: 'How TMR evolved in Operations',
  title: 'An established framework that keeps developing',
  stages: [
    { label: 'Where we started', tone: 'a', items: [
      'Inconsistent talent discussions',
      'Different language and expectations across leaders',
      'Limited succession visibility',
      'Readiness sometimes based on impressions'
    ] },
    { label: 'What we learned', tone: 'b', items: [
      'Readiness must connect to a target role',
      'Ratings must be supported by observable evidence',
      'Leader preparation needs structure',
      'Classifications must connect to action',
      'Frameworks must evolve as roles and expectations grow'
    ] },
    { label: 'How we use it today', tone: 'c', items: [
      'Leaders prepare evidence',
      'Competencies guide the discussion',
      'Classifications connect to development or utilization',
      'Calibration supports consistency',
      'Succession readiness is reviewed over time'
    ] }
  ],
  note: 'TMR is an established, mature framework that continues to evolve as roles and '
      + 'expectations grow.',
  notes: {
    who: 'Autumn',
    point: 'Mature and in active use — evolving because the business evolves, not because it '
         + 'is unfinished.',
    say: 'Operations did not design this on paper and roll it out. It came from noticing that '
       + 'two leaders could describe the same person completely differently. What you see on '
       + 'the right is how it runs today, and it is still developing — roles change, so the '
       + 'framework has to keep up.',
    ask: 'Where does the left-hand column feel familiar from your own experience?',
    next: 'One thing they learned first: readiness means nothing without a target role.',
    time: '6 min'
  }
},

/* 6 ----------------------------------------------------------------------- */
{
  kind: 'ladder',
  nav: 'Career paths',
  eyebrow: 'Career paths and accountability',
  title: 'Readiness is always readiness for something',
  steps: [
    { name: 'Associate', scope: 'Own work and process' },
    { name: 'Team Lead', scope: 'Influences team results' },
    { name: 'Supervisor in Training', scope: 'Learning people accountability' },
    { name: 'Supervisor', scope: 'Owns team performance' },
    { name: 'Manager in Training', scope: 'Learning business accountability' },
    { name: 'Manager', scope: 'Owns people and business outcomes' },
    { name: 'Director', scope: 'Connects department to strategy' }
  ],
  points: [
    'Readiness cannot be judged without knowing the target role',
    'Accountability grows at each level',
    'Early roles focus mainly on personal work and process',
    'Team leaders increasingly influence team results',
    'Managers own broader people and business outcomes',
    'Directors connect department decisions to organizational strategy'
  ],
  aside: 'Specialty paths exist alongside this ladder — Trainer, for example — where depth of '
       + 'expertise is the destination rather than a step toward the next rung.',
  notes: {
    who: 'Autumn',
    point: 'You cannot rate readiness in the abstract. Ready for what?',
    say: 'Accountability widens as you move along this path. An Associate is accountable for '
       + 'their own work. A Supervisor is accountable for other people’s. A Director is '
       + 'accountable for how the department connects to where the business is going. That is '
       + 'why "ready" is meaningless until you name the role you mean.',
    ask: 'For someone you are thinking of right now — what is the target role, specifically?',
    next: 'To compare someone against a target role, you need a shared vocabulary.',
    time: '7 min'
  }
},

/* 7 ----------------------------------------------------------------------- */
{
  kind: 'matrix',
  nav: 'Competency matrix',
  eyebrow: 'The competency matrix',
  title: 'Four categories of competency',
  cats: [
    { n: '01', head: 'Basic skills', body: 'Apply broadly across the organization — safety, '
      + 'teamwork and following process.' },
    { n: '02', head: 'Role-specific skills', body: 'Depend on the job. What this particular '
      + 'role is expected to do well.' },
    { n: '03', head: 'Technical skills', body: 'Systems, tools, data, analysis, equipment and '
      + 'business knowledge.' },
    { n: '04', head: 'Behavioral skills', tone: 'ok', body: 'Observable leadership and '
      + 'interpersonal behavior — how someone leads, communicates and develops others.' }
  ],
  points: [
    'Behavioral competencies create a shared leadership and development language across the company',
    'Technical and role-specific expectations vary by function',
    'The matrix supports leader judgment; it does not replace it',
    'The matrix does not guarantee promotion',
    'Ratings must be supported by evidence',
    'Technical ratings are evaluated, while behavioral growth is the primary focus of development planning'
  ],
  notes: {
    who: 'Lexi',
    point: 'Four categories; behavioral is the one that travels across every function.',
    say: 'Basic skills apply to everyone. Role-specific and technical depend on the job — a '
       + 'buyer and an analyst need different things. Behavioral competencies are the ones '
       + 'that mean the same thing everywhere, which is why they carry the development '
       + 'conversation. And to be clear: this is a tool for your judgment, not a substitute '
       + 'for it, and it does not guarantee anyone a promotion.',
    ask: 'Which behavioral competency would be hardest to evidence on your team today?',
    next: 'Each competency gets rated on the same four-point scale.',
    time: '7 min'
  }
},

/* 8 ----------------------------------------------------------------------- */
{
  kind: 'scale',
  nav: 'The 1–4 scale',
  eyebrow: 'The 1–4 scale',
  title: 'One scale, four levels',
  levels: [
    { n: '1', name: 'Basic', body: 'Completes routine work independently.' },
    { n: '2', name: 'Advanced', body: 'Works beyond the basics with consistent quality.' },
    { n: '3', name: 'Expert', body: 'Teaches, coaches or guides others.' },
    { n: '4', name: 'Specialist', body: 'Improves systems, solves root causes and creates '
      + 'lasting improvement.' }
  ],
  points: [
    'Not every role requires Level 4',
    'Expected levels may vary by role',
    '“R” means the expected level depends on the role',
    'Ratings require observable evidence'
  ],
  notes: {
    who: 'Lexi',
    point: 'Two boundaries matter: 1 is already independent, and 3 is where teaching begins.',
    say: 'Watch two lines. Level 1 already means someone works independently on routine tasks — '
       + 'it is not "needs hand-holding". And Level 3 is not just doing it very well; it is '
       + 'teaching someone else to do it. Level 4 is fixing the system so the problem stops '
       + 'recurring. Not every role needs a 4.',
    ask: 'Where would you place someone who is excellent but has never taught anyone?',
    next: 'Before we go further, let us be precise about what this process is and is not.',
    time: '6 min'
  }
},

/* 9 ----------------------------------------------------------------------- */
{
  kind: 'isnot',
  nav: 'What TMR is',
  eyebrow: 'The boundary',
  title: 'What TMR is, and is not',
  is: {
    head: 'TMR is',
    items: [
      'A way to understand talent depth',
      'A forward-looking leadership process',
      'A tool for development and succession planning',
      'A structured leadership discussion',
      'A way to connect evidence to future opportunity'
    ]
  },
  isnot: {
    head: 'TMR is not',
    items: [
      'A replacement for performance reviews',
      'A guaranteed promotion',
      'A permanent label',
      'A decision based only on opinion',
      'A process completed only once a year'
    ]
  },
  notes: {
    who: 'Autumn',
    point: 'Kill the three common misconceptions before they take root.',
    say: 'Three things people assume and should not. This does not replace your performance '
       + 'review — they answer different questions and both still happen. A classification is '
       + 'not a promise of promotion. And it is not a label someone carries forever; it '
       + 'reflects current evidence and it changes.',
    ask: 'Which of the "is not" items surprises you most?',
    next: 'So what are we actually assessing? Four different questions.',
    time: '5 min'
  }
},

/* 10 ---------------------------------------------------------------------- */
{
  kind: 'dimensions',
  nav: 'Talent dimensions',
  eyebrow: 'The four talent dimensions',
  title: 'Four questions about the same person',
  dims: [
    { n: '01', head: 'Performance', q: 'How well is the person delivering today?',
      body: 'Results against goals, quality and role expectations. The floor everything else '
          + 'is built on.' },
    { n: '02', head: 'Potential', q: 'Could the person grow into broader responsibility?',
      body: 'Capacity and appetite for more — weighed alongside willingness to develop.' },
    { n: '03', head: 'Readiness', q: 'How soon could the person move into a target role?',
      body: 'A named role, a realistic timeline, and few critical gaps left. Potential is '
          + 'capacity; readiness is timing.' },
    { n: '04', head: 'Professional Expertise', q: 'How deep is the person’s expertise?',
      body: 'Depth of mastery in the current role, and how often others come to them for it.' }
  ],
  note: 'These are four different questions leaders must ask about the same person.',
  notes: {
    who: 'Autumn',
    point: 'These four are distinct. Conflating potential with readiness is the expensive error.',
    say: 'The mistake I see most often is treating strong performance as proof of readiness. '
       + 'It is not. Performance is the entry condition. Potential asks whether they could '
       + 'grow. Readiness asks how soon, and for what. Expertise asks how deep they already '
       + 'are — and that one is a destination in its own right, not a consolation prize.',
    ask: 'Can you think of someone high in expertise who has no interest in moving up?',
    next: 'Those four questions produce one of four classifications.',
    time: '7 min'
  }
},

/* 11 ---------------------------------------------------------------------- */
{
  kind: 'classes',
  nav: 'Classifications',
  eyebrow: 'The four talent classifications',
  title: 'Four classifications, four leader actions',
  classes: [
    { head: 'HiPo', tone: 'ok', full: 'High Potential',
      means: ['Strong performance', 'Emerging leadership',
              'Willingness and ability to grow', 'Realistic readiness in about 12 months'],
      action: 'Focused development plan' },
    { head: 'Mid Potential', tone: 'info', full: '',
      means: ['Shows some HiPo traits', 'Needs more consistency or more time'],
      action: 'Coaching and foundation building' },
    { head: 'HiPro', tone: 'warn', full: 'High Professional',
      means: ['Deep expert', 'High value in the current role',
              'Limited desire or ability to advance'],
      action: 'Utilization and retention plan' },
    { head: 'Low Potential', tone: 'no', full: '',
      means: ['Too new to assess', 'Or not currently demonstrating growth readiness'],
      action: 'Onboarding, or performance and engagement action' }
  ],
  note: 'The classification is not the outcome. <strong>The outcome is the action the leader '
      + 'takes.</strong>',
  notes: {
    who: 'Autumn',
    point: 'The label is administrative. The action is the point.',
    say: 'Four boxes, and I want you to look at the bottom line of each one rather than the '
       + 'name at the top. HiPo means you owe that person a development plan. HiPro means you '
       + 'owe them a utilization plan — mentoring, ownership, something that uses the depth '
       + 'they have. If a classification does not produce an action, it was just paperwork.',
    ask: 'Which of these four do you think gets handled worst in most organizations?',
    next: 'None of that works without preparation. Here is what a leader does beforehand.',
    time: '9 min'
  }
},

/* 12 ---------------------------------------------------------------------- */
{
  kind: 'process',
  nav: 'Leader preparation',
  eyebrow: 'What leaders prepare before TMR',
  title: 'Preparation happens before the room, not in it',
  steps: [
    'Identify the employee’s current role',
    'Identify the target role or broader responsibility',
    'Review current performance and results',
    'Review the competencies required for the target role',
    'Gather observable behavioral evidence',
    'Identify competency gaps',
    'Consider willingness and ability to grow',
    'Determine whether gaps could close in about 12 months',
    'Propose a classification',
    'Prepare a development or utilization recommendation',
    'Review the recommendation with Senior Leadership before the offsite'
  ],
  notes: {
    who: 'Autumn',
    point: 'Eleven steps, and the order matters — target role before evidence.',
    say: 'Notice step two. You name the target role before you gather anything, because the '
       + 'evidence you need depends on what you are comparing against. Steps five through '
       + 'eight are the real work: what did you actually observe, what is missing, and could '
       + 'the gaps realistically close in about a year. Step eleven means you never arrive at '
       + 'the offsite with something Senior Leadership has not already seen.',
    ask: 'Which of these eleven would be hardest to do well today?',
    next: 'Step five is where most preparation falls down. Let us look at evidence.',
    time: '8 min'
  }
},

/* 13 ---------------------------------------------------------------------- */
{
  kind: 'evidence',
  nav: 'Evidence',
  eyebrow: 'Evidence, not impressions',
  title: 'The same claim, twice',
  weak: { label: 'Impression',
    text: 'Jordan is a strong leader and is probably ready.' },
  strong: { label: 'Stronger evidence',
    text: 'Jordan coached two junior Project Managers through repeated status-review cycles, '
        + 'and both now lead those reviews independently.' },
  questions: [
    'What happened?',
    'How often did it happen?',
    'What impact did it have?',
    'Is it a pattern?',
    'What target role are we comparing against?',
    'What gaps remain?',
    'What information is still missing?'
  ],
  note: 'One of those you can defend when another leader questions it. The other you cannot.',
  notes: {
    who: 'Lexi',
    point: 'Specific, repeated, and with a result someone else can see.',
    say: 'Read the top one. Nobody would blink at it in a meeting — and it tells you nothing. '
       + 'Now the second. Same person, same claim. It names what happened, how often, and what '
       + 'changed as a result: two people can now do something they could not do before. That '
       + 'is what makes a rating survive being questioned.',
    ask: 'Which of the seven questions do your own talent notes usually miss?',
    next: 'Being questioned is not hypothetical. That is exactly what calibration is.',
    time: '7 min'
  }
},

/* 14 ---------------------------------------------------------------------- */
{
  kind: 'calibration',
  nav: 'Calibration',
  eyebrow: 'What calibration means',
  title: 'Leaders test each other’s evidence',
  points: [
    'Leaders compare evidence',
    'Ratings may be questioned',
    'Missing information is identified',
    'Shared definitions and standards are applied',
    'Leaders test whether ratings are consistent',
    'The goal is consistency, not winning'
  ],
  big: 'Calibration tests the evidence and helps leaders apply the same standards.',
  notes: {
    who: 'Autumn',
    point: 'Being challenged is the process working, not a personal criticism.',
    say: 'The first time your rating gets questioned it feels personal. It is not. The point '
       + 'is that a 3 from you and a 3 from me should mean the same thing. If I cannot answer '
       + 'what evidence supports my rating, the honest outcome is that I go and get more — '
       + 'and that is a legitimate result, not a failure.',
    ask: 'What would make it easier to have your rating questioned constructively?',
    next: 'Here is how that sits inside the Operations offsite.',
    time: '6 min'
  }
},

/* 15 ---------------------------------------------------------------------- */
{
  kind: 'stages',
  nav: 'The offsite',
  eyebrow: 'The Operations offsite',
  title: 'Before, during and after',
  stages: [
    { label: 'Before', tone: 'a', items: [
      'Leaders prepare evidence and ratings',
      'Target roles are identified',
      'HiPo and HiPro recommendations are prepared',
      'Development or utilization plans are drafted',
      'Senior Leadership reviews the material'
    ] },
    { label: 'During', tone: 'b', items: [
      'The leader presents the employee',
      'Other leaders ask evidence-based questions',
      'Ratings and classifications are tested',
      'Missing information is identified',
      'Development or utilization actions are discussed',
      'Ownership and follow-up are confirmed'
    ] },
    { label: 'After', tone: 'c', items: [
      'Plans are finalized',
      'Development opportunities are created',
      'Progress is reviewed',
      'Evidence is updated',
      'Assessments may change as circumstances change'
    ] }
  ],
  note: 'The goal is for Business Enablement leaders to eventually walk into the Operations '
      + 'offsite and present their HiPos and HiPros with confidence.',
  notes: {
    who: 'Autumn',
    point: 'Most of the work is before. The offsite is where it gets tested.',
    say: 'Look at the width of the first column. By the time the offsite starts, the thinking '
       + 'is done — the room is there to test it, not to do it. And notice the last line under '
       + '"After": assessments change. Someone rated Mid Potential this year may look very '
       + 'different next year, and that is the system working.',
    ask: 'What would we need in place before we could present our people in that room?',
    next: 'Once a classification is made, what actually happens?',
    time: '8 min'
  }
},

/* 16 ---------------------------------------------------------------------- */
{
  kind: 'actions',
  nav: 'After classification',
  eyebrow: 'What happens after classification',
  title: 'Every classification produces an action',
  groups: [
    { head: 'HiPo', tone: 'ok', items: [
      'Focused development plan', 'Specific behavioral gaps',
      'Approximately 12-month readiness horizon', 'Direct leader drives the plan',
      'Senior Leadership reviews and supports it'
    ] },
    { head: 'Mid Potential', tone: 'info', items: [
      'Ongoing coaching', 'Build consistency', 'Longer development horizon',
      'Reassess as evidence changes'
    ] },
    { head: 'HiPro', tone: 'warn', items: [
      'Utilization plan', 'Mentoring', 'Training', 'Knowledge transfer',
      'Process or initiative ownership', 'Retention and recognition'
    ] },
    { head: 'Low Potential', tone: 'no', items: [
      'Onboarding if new', 'Performance and engagement action if established',
      'Reassess after meaningful change'
    ] }
  ],
  notes: {
    who: 'Autumn',
    point: 'This is where TMR either creates value or becomes an exercise.',
    say: 'The HiPo column gets all the attention, but look at HiPro. Mentoring, knowledge '
       + 'transfer, process ownership, recognition — that is a retention strategy for the '
       + 'people who hold the deepest knowledge in your team. Losing one of them quietly is '
       + 'more expensive than most vacancies.',
    ask: 'Which of these plans would be hardest for you to actually deliver?',
    next: 'None of this works if it only happens once a year.',
    time: '8 min'
  }
},

/* 17 ---------------------------------------------------------------------- */
{
  kind: 'yearround',
  nav: 'Through the year',
  eyebrow: 'What leaders should do throughout the year',
  title: 'The work between the meetings',
  items: [
    'Observe behavior across multiple situations',
    'Record specific examples',
    'Discuss career interests',
    'Create stretch opportunities',
    'Review progress',
    'Update evidence',
    'Address gaps early',
    'Prepare before calibration, not during it',
    'Continue developing people throughout the year'
  ],
  big: 'TMR is not preparation for one annual meeting. It is the ongoing work of knowing your '
     + 'people, gathering evidence, and preparing them for what comes next.',
  notes: {
    who: 'Lexi',
    point: 'Evidence is gathered continuously or it is reconstructed badly from memory.',
    say: 'If you only think about this when the calendar invite arrives, you will do what '
       + 'everyone does — reach for the last three weeks and call it a year. A note after a '
       + 'good meeting takes thirty seconds and is worth more than an hour of recall in '
       + 'December. And the career-interest conversation is the one most people never have.',
    ask: 'When did you last ask someone on your team what they actually want next?',
    next: 'So what would Business Enablement need to do this properly?',
    time: '6 min'
  }
},

/* 18 ---------------------------------------------------------------------- */
{
  kind: 'build',
  nav: 'BE next steps',
  eyebrow: 'What Business Enablement would need to build',
  title: 'The design work ahead',
  items: [
    'Clear career paths',
    'Defined future roles',
    'Competency expectations by role',
    'A leader preparation process',
    'Evidence standards',
    'Development and utilization planning',
    'Calibration governance',
    'Clear ownership and follow-up'
  ],
  note: 'These are future design needs, not decisions being made today.',
  notes: {
    who: 'Lexi',
    point: 'Name the gap honestly, and keep the room out of design mode.',
    say: 'Operations has all eight of these. We have some of them informally and none of them '
       + 'written down. That is not a criticism — it is simply the work. I am capturing these '
       + 'as input for the next planning conversation rather than trying to solve any of them '
       + 'this afternoon.',
    ask: 'Which two of these eight would you start with?',
    next: 'Let us pull the whole thing together.',
    time: '6 min'
  }
},

/* 19 ---------------------------------------------------------------------- */
{
  kind: 'summary',
  nav: 'Summary',
  eyebrow: 'Summary',
  title: 'Six questions you should now be able to answer',
  items: [
    'What is TMR?',
    'Why do we use it?',
    'What should I observe in my team?',
    'What evidence should I gather?',
    'How should classification lead to action?',
    'What should I prepare before calibration?'
  ],
  notes: {
    who: 'Autumn',
    point: 'A self-check, not a test. Any gap here tells us where to go deeper.',
    say: 'Six questions. Read them and notice which one you would struggle to answer out loud '
       + 'right now — that is genuinely useful information for Lexi and me about where this '
       + 'material needs to be clearer next time.',
    ask: 'Which of the six is least clear?',
    next: 'Two last questions, and then we are done.',
    time: '4 min'
  }
},

/* 20 ---------------------------------------------------------------------- */
{
  kind: 'closing',
  nav: 'Close',
  eyebrow: 'Close',
  q1: 'What do you understand differently about TMR now?',
  q2: 'What would Business Enablement need to build before participating confidently in an '
    + 'Operations TMR offsite?',
  final: 'Today was the foundation. The next step is identifying Business Enablement’s roles, '
       + 'career paths, competency expectations, preparation process, and calibration governance.',
  foot: 'Thank you for your participation.',
  notes: {
    who: 'Lexi',
    point: 'Close on reflection and a clear next step, not a summary.',
    say: 'Two questions. Take the first one quietly — what do you understand differently now '
       + 'than you did three hours ago. The second one I would genuinely like answers to, '
       + 'because it shapes what we do next. Thank you for your time and for the quality of '
       + 'the questions today.',
    ask: 'Let the room answer both. Do not fill the silence.',
    next: '—',
    time: '5 min'
  }
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
const li = (a) => a.map((x) => `<li>${x}</li>`).join('');
const head = (s) => (s.eyebrow ? `<p class="eyebrow">${s.eyebrow}</p>` : '')
                  + (s.title ? `<h2 class="title">${s.title}</h2>` : '');
const noteOf = (s) => (s.note ? `<p class="note">${s.note}</p>` : '');

/* ---------------------------------------------------------------- render
   Built once on load, then only shown or hidden. Building on demand would put
   layout and transition in the same frame, which is what makes a deck feel like
   it stutters the first time through. */
function build(s, i) {
  const sec = el('section', 'slide k-' + s.kind);
  sec.setAttribute('aria-hidden', 'true');
  const w = el('div', 'wrap');
  let h = '';

  switch (s.kind) {

    case 'title':
      h = `<p class="eyebrow">${s.eyebrow}</p>
           <h1 class="hero">${s.title}</h1>
           <p class="hero-sub">${s.sub}</p>
           <p class="hero-meta">${s.meta}</p>
           <p class="hero-foot">${s.foot}</p>`;
      break;

    case 'agenda': {
      const total = s.items.reduce((a, x) => a + x.mins, 0) + (s.open ? s.open.mins : 0);
      h = head(s)
        + (s.open ? `<p class="ag-open"><span>${s.open.label}</span>
             <b>${s.open.mins} min</b></p>` : '')
        + `<ol class="agenda">${s.items.map((x, n) =>
            `<li><span class="ag-n">${String(n + 1).padStart(2, '0')}</span>
             <span class="ag-t">${x.t}</span>
             <span class="ag-time">${x.mins} min</span></li>`).join('')}</ol>`
        + `<p class="ag-total"><span>Total</span><b>${Math.floor(total / 60)} h
           ${total % 60} min</b><em>plus discussion and a break</em></p>`;
      break;
    }

    case 'purpose':
      h = head(s) + `<ul class="checks">${li(s.items)}</ul>` + noteOf(s);
      break;

    case 'why':
      h = head(s)
        + `<div class="flow">${s.flow.map((f, n) => `
            <div class="fl">
              <p class="fl-n">${f.n}</p>
              <h3>${f.head}</h3>
              <p>${f.body}</p>
            </div>${n < s.flow.length - 1 ? '<div class="fl-arrow" aria-hidden="true"></div>' : ''}`
          ).join('')}</div>`
        + `<ul class="cols2">${li(s.points)}</ul>`;
      break;

    case 'evolution':
    case 'stages':
      h = head(s)
        + `<div class="stages">${s.stages.map((st) => `
            <div class="stage t-${st.tone}">
              <p class="st-label">${st.label}</p>
              <ul>${li(st.items)}</ul>
            </div>`).join('')}</div>`
        + noteOf(s);
      break;

    case 'ladder':
      h = head(s)
        + `<div class="ladder">${s.steps.map((st, n) => `
            <div class="rung" style="--i:${n}">
              <span class="rg-n">${String(n + 1).padStart(2, '0')}</span>
              <span class="rg-name">${st.name}</span>
              <span class="rg-scope">${st.scope}</span>
            </div>`).join('')}</div>`
        + `<ul class="cols2">${li(s.points)}</ul>`
        + (s.aside ? `<p class="note">${s.aside}</p>` : '');
      break;

    case 'matrix':
      h = head(s)
        + `<div class="cards c4">${s.cats.map((c) => `
            <div class="card ${c.tone || ''}">
              <p class="card-n">${c.n}</p><h3>${c.head}</h3>
              <p class="card-body">${c.body}</p>
            </div>`).join('')}</div>`
        + `<ul class="cols2">${li(s.points)}</ul>`;
      break;

    case 'scale':
      h = head(s)
        + `<div class="levels">${s.levels.map((l) => `
            <div class="level">
              <p class="lvl-n">${l.n}</p><p class="lvl-name">${l.name}</p>
              <p class="lvl-body">${l.body}</p>
            </div>`).join('')}</div>`
        + `<ul class="cols2">${li(s.points)}</ul>`;
      break;

    case 'isnot':
      h = head(s)
        + `<div class="two-col">
             <div class="col is"><p class="col-head">${s.is.head}</p>
               <ul>${li(s.is.items)}</ul></div>
             <div class="col isnot"><p class="col-head">${s.isnot.head}</p>
               <ul>${li(s.isnot.items)}</ul></div>
           </div>`;
      break;

    case 'dimensions':
      h = head(s)
        + `<div class="cards c4">${s.dims.map((d) => `
            <div class="card">
              <p class="card-n">${d.n}</p><h3>${d.head}</h3>
              <p class="card-q">${d.q}</p>
              <p class="card-body">${d.body}</p>
            </div>`).join('')}</div>`
        + noteOf(s);
      break;

    case 'classes':
      h = head(s)
        + `<div class="cards c4">${s.classes.map((c) => `
            <div class="card ${c.tone}">
              <h3>${c.head}</h3>
              ${c.full ? `<p class="card-sub">${c.full}</p>` : ''}
              <ul class="tight">${li(c.means)}</ul>
              <p class="card-mandate"><span>Leader action</span>${c.action}</p>
            </div>`).join('')}</div>`
        + noteOf(s);
      break;

    case 'process':
      h = head(s)
        + `<ol class="track">${s.steps.map((x, n) => `
            <li><span class="tk-n">${String(n + 1).padStart(2, '0')}</span>
            <span class="tk-t">${x}</span></li>`).join('')}</ol>`;
      break;

    case 'evidence':
      h = head(s)
        + `<div class="compare">
             <div class="cmp weak">
               <p class="cmp-label">${s.weak.label}</p>
               <p class="cmp-text">&ldquo;${s.weak.text}&rdquo;</p>
             </div>
             <div class="cmp-arrow" aria-hidden="true"></div>
             <div class="cmp strong">
               <p class="cmp-label">${s.strong.label}</p>
               <p class="cmp-text">&ldquo;${s.strong.text}&rdquo;</p>
             </div>
           </div>
           <p class="col-head mid">Useful evidence answers</p>
           <ol class="qgrid">${li(s.questions)}</ol>`
        + noteOf(s);
      break;

    case 'calibration':
      h = head(s)
        + `<ul class="cols2 big">${li(s.points)}</ul>`
        + `<p class="bigline">${s.big}</p>`;
      break;

    case 'actions':
      h = head(s)
        + `<div class="cards c4">${s.groups.map((g) => `
            <div class="card ${g.tone}">
              <h3>${g.head}</h3>
              <ul class="tight">${li(g.items)}</ul>
            </div>`).join('')}</div>`;
      break;

    case 'yearround':
      h = head(s)
        + `<ul class="checks cols2">${li(s.items)}</ul>`
        + `<p class="bigline">${s.big}</p>`;
      break;

    case 'build':
      h = head(s)
        + `<ol class="big-list">${li(s.items)}</ol>`
        + noteOf(s);
      break;

    case 'summary':
      h = head(s)
        + `<ol class="qcards">${s.items.map((x, n) => `
            <li><span class="qc-n">${n + 1}</span><span>${x}</span></li>`).join('')}</ol>`;
      break;

    case 'closing':
      h = `<p class="eyebrow">${s.eyebrow}</p>
           <p class="closing-q">&ldquo;${s.q1}&rdquo;</p>
           <p class="closing-q two">&ldquo;${s.q2}&rdquo;</p>
           <p class="closing-final">${s.final}</p>
           <p class="closing-foot">${s.foot}</p>`;
      break;

    default:
      h = head(s) + noteOf(s);
  }

  w.innerHTML = h;
  sec.appendChild(w);

  /* Presenter notes: print only. There is no presenter view — this is the one
     deck — but a facilitator can print the deck and get their notes with it. */
  if (s.notes) {
    const n = s.notes;
    sec.appendChild(el('div', 'pnotes',
      `<h4>Presenter notes &mdash; slide ${i + 1}</h4>
       <dl>
         <dt>Presenter</dt><dd>${n.who}</dd>
         <dt>Main point</dt><dd>${n.point}</dd>
         <dt>Suggested explanation</dt><dd>${n.say}</dd>
         <dt>Optional question</dt><dd>${n.ask}</dd>
         <dt>Transition</dt><dd>${n.next}</dd>
         <dt>Approximate time</dt><dd>${n.time}</dd>
       </dl>`));
  }
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

const prog = $('#prog');
SLIDES.forEach((s, i) => {
  const t = el('button', 'tick');
  t.type = 'button';
  t.title = (i + 1) + '. ' + (s.nav || 'Title');
  t.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  t.addEventListener('click', () => go(i));
  prog.appendChild(t);
});
const ticks = Array.from(prog.children);

function go(i, instant) {
  i = Math.max(0, Math.min(SLIDES.length - 1, i));
  const back = i < at;
  slides.forEach((n, k) => {
    n.classList.toggle('on', k === i);
    n.classList.toggle('back', instant ? false : (back && k === i));
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

/* Touch, for running from a tablet. Generous threshold so scrolling a long
   slide is never mistaken for a swipe. */
let tx = 0, ty = 0;
stage.addEventListener('touchstart', (e) => {
  tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY;
}, { passive: true });
stage.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx)) return;
  dx < 0 ? next() : prev();
}, { passive: true });

/* The chrome recedes while presenting and returns on any movement. */
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
