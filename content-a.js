/* ============================================================================
   TMR LEARNING EXPERIENCE — CONTENT
   Master Electronics | INTERNAL

   Every definition, example, classification, competency, leader mandate,
   learning objective and facilitator note below is taken verbatim or
   near-verbatim from the four source documents:
     - Business Enablement TMR Introduction.pptx
     - Business Enablement TMR Participant Guide.docx
     - Business Enablement TMR Quick Reference Guide.docx
     - BUSINESS ENABLEMENT TMR DUAL FACILITATOR GUIDE.docx
   Nothing here is simplified, shortened or reworded in a way that changes
   meaning. Source is cited on each step as `src`.
   ========================================================================= */

/* ------------------------------------------------------------- chapters */
const CHAPTERS = [
  'Welcome',
  'Why TMR Exists',
  'Performance vs TMR',
  'Four Dimensions',
  'Classifications',
  'Competencies & Evidence',
  'Jordan Practice',
  'Calibration & Plans',
  'Future & Close'
];

/* ------------------------------------------------------------- reference data */

// Quick Reference Guide — all 19 behavioural competencies, Level 1 descriptions
const COMPETENCIES = [
  [1,'Professional Correspondence','Uses respectful language in email/chat and follows basic formatting.'],
  [2,'Conflict Management','Stays respectful during disagreements and seeks help to resolve conflict.'],
  [3,'Coaching/Mentoring','Shares steps when asked and shows patience.'],
  [4,'Leading with Integrity','Follows rules and does the right thing in routine situations.'],
  [5,'Emotional Intelligence','Manages emotions in routine interactions and stays professional.'],
  [6,'Time Management','Arrives on time and completes tasks by the due time with reminders.'],
  [7,'Candidate Evaluation and Hiring','Participates in interviews and provides structured feedback.'],
  [8,'Creating and Executing Action Plans','Creates simple task plans and follows through using checklists.'],
  [9,'Peer to Peer Support','Accepts feedback and seeks help with a growth mindset.'],
  [10,'Workforce Planning','Records data accurately and understands why accuracy matters.'],
  [11,'Data Literacy','Understands, interprets, and uses data to support decisions and improvement.'],
  [12,'Development of Others','Shows awareness of others’ strengths and improvement areas.'],
  [13,'Difficult Conversations','Stays professional when tension arises but may avoid direct dialogue.'],
  [14,'Accountable to Results','Understands the goal of assigned tasks and delivers when conditions are normal.'],
  [15,'Accountable to Processes','Follows standard procedures accurately and consistently.'],
  [16,'Strategic Awareness','Understands how daily work connects to team goals.'],
  [17,'Self-Development','Seeks feedback and learns new skills to improve performance.'],
  [18,'Adaptability','Accepts change with explanation and adjusts with support.'],
  [19,'Building Effective Teams','Contributes reliably and supports shared goals.']
];
// competencies named on slide 18 (today's session) and used in the Jordan scenario
const TODAY_COMPS = [16,14,12,11,18,13];
const JORDAN_COMPS = [14,11,12,16];

// slide 18 one-line descriptions for the six named competencies
const COMP_SLIDE18 = {
  16:'Connects daily decisions to bigger-picture business and team goals.',
  14:'Owns outcomes and adapts when the standard approach won’t hit the target.',
  12:'Coaches, mentors, and builds growth plans for teammates.',
  11:'Reads, interprets, and uses data to guide decisions and improvements.',
  18:'Adjusts quickly and stays effective when priorities or conditions change.',
  13:'Addresses performance and behavior directly, clearly, and respectfully.'
};

// The Master Electronics 1–4 scale. `deck` = concise wording shown on slide 19 and in the
// Participant Guide. `qrg` = the Quick Reference Guide's expanded explanation of the same
// four levels. These are NOT competing scales — the QRG is the fuller version.
const SCALE = [
  {n:1,label:'Basic',
   deck:'Has basic knowledge and can complete the task independently.',
   qrg:'Performs standard tasks independently in routine situations but may need guidance with unfamiliar or complex situations.',
   sa:'Understands how daily work connects to team goals. Uses basic information to make sound decisions within their scope.',
   remember:'Level 1 already includes independent routine work.'},
  {n:2,label:'Advanced',
   deck:'Completes independently with quality beyond the basics.',
   qrg:'Performs with consistent quality, anticipates common issues, adapts, and supports others informally.',
   sa:'Anticipates short-term needs, adjusts actions, recognizes upstream and downstream impacts, and suggests practical improvements.',
   remember:'Level 2 goes beyond the basics through quality, adaptation, and informal support.'},
  {n:3,label:'Expert',
   deck:'Completes independently and can effectively teach others.',
   qrg:'Guides others through coaching and mentoring, adapts approach to the situation, and sustains strong results.',
   sa:'Weighs options using data and context, solves problems, and coaches others to assess risk, think ahead, and improve systems.',
   remember:'Level 3 includes coaching or teaching others.'},
  {n:4,label:'Specialist',
   deck:'Identifies optimization opportunities, resolves sources of error, and develops improved solutions.',
   qrg:'Improves systems and processes, leads through complexity, finds root causes, and drives lasting improvements.',
   sa:'Shapes direction across complex environments, anticipates cross-functional impacts, and drives scalable, long-term solutions.',
   remember:'Level 4 creates broader, repeatable, or strategic improvement. Not every role or competency requires Level 4.'}
];

// Jordan — evidence is verbatim from slide 24 and Participant Guide pp. 3–4
const JORDAN = [
  {comp:'Accountable to Results',
   ev:'Consistently hits project deadlines even when scope changes mid-stream.'},
  {comp:'Data Literacy',
   ev:'Builds her own status dashboards but rarely digs into root-cause trends.'},
  {comp:'Development of Others',
   ev:'Has begun coaching two junior Project Managers informally, without being asked.'},
  {comp:'Strategic Awareness',
   ev:'Focuses on her own projects and has not yet consistently connected the work to broader department goals.'}
];

const CLASSES = ['HiPo','Mid Potential','HiPro','Low Potential','Not enough information'];

// Participant Guide evidence checklist (7 items, verbatim)
const CHECKLIST = [
  'What specific behavior did I observe?',
  'When did it occur?',
  'How often did it occur?',
  'What measurable impact did it have?',
  'Is this a pattern or a single event?',
  'What evidence would challenge my current view?',
  'What information is still missing?'
];

const SIX_QUESTIONS = [
  'Which roles should be evaluated first?',
  'What future roles or broader responsibilities exist?',
  'Which competencies should apply across Business Enablement?',
  'Which competencies should vary by role?',
  'What additional framework development is needed?',
  'Who should participate in the next planning conversation?'
];

/* ------------------------------------------------------------- steps */
const STEPS = [];
const S = (o) => { STEPS.push(o); return o; };

/* ============================ CHAPTER 0 — WELCOME ======================= */

S({id:'welcome', ch:0, kind:'hero', min:1, who:'Lexi',
  title:'Building the Future of Talent',
  sub:'An Introduction to Talent Management Reviews for Business Enablement',
  meta:'Master Electronics &middot; For VPs, Directors &amp; Managers &middot; 3 hours',
  body:`
  <p class="lede">Over the next three hours we will build a <strong>shared language</strong> for
  talent conversations &mdash; and you will do most of the work, not us.</p>
  <div class="panel protect">
    <p class="kicker">Session purpose</p>
    <p style="margin:0">&ldquo;Introduce how Operations uses TMR and help Business Enablement
    understand the framework before considering its own future approach.&rdquo;</p>
  </div>
  <p class="small">This is a foundational introduction to Talent Management Reviews &mdash;
  <strong>not</strong> a Business Enablement implementation. Nothing is being decided today.</p>`,
  src:'Slide 1 &middot; Dual Facilitator Guide, Slide 1',
  fac:{
    purpose:'Opens the workshop and frames today as a foundational introduction, not a Business Enablement rollout.',
    keys:['Today is a foundational introduction to Talent Management Reviews (TMR), not a Business Enablement implementation.',
      'The session is built specifically for Business Enablement VPs, Directors, and Managers.',
      'Over the next three hours we will build a shared language for talent conversations.'],
    delivery:'Welcome the room, thank them for setting aside three hours, and name the session. Situate it clearly as a first look at how Operations approaches TMR — not a decision-making session.',
    pause:'Pause briefly after the welcome to let the room settle.',
    qa:[['Is this a Business Enablement program we’re rolling out today?',
      'No — today introduces the Operations framework as a foundation. Any Business Enablement version is a future conversation.']],
    say:'You’ll be doing a fair amount of the work today rather than just listening to Autumn and me. Everything you submit is anonymous — we see group totals, never individual answers.',
    next:'Let’s be specific about what you’ll walk away able to do.'
  }});

S({id:'objectives', ch:0, kind:'prose', min:4, who:'Lexi',
  eyebrow:'Learning objectives',
  title:'By the end of today, you’ll be able to',
  body:`
  <div class="grid g2">
    <div class="card tint"><p class="kicker">01</p><p style="margin:0">Explain how Operations uses
      TMR and consider how the framework could support Business Enablement</p></div>
    <div class="card tint"><p class="kicker">02</p><p style="margin:0">Apply the four
      classifications and the 1&ndash;4 competency scale</p></div>
    <div class="card tint"><p class="kicker">03</p><p style="margin:0">Rate a real scenario using
      observable evidence, not impressions</p></div>
    <div class="card tint"><p class="kicker">04</p><p style="margin:0">Identify the questions
      Business Enablement must answer before developing its own TMR framework</p></div>
  </div>
  <h3>How the three hours are shaped</h3>
  <ul class="tl">
    <li class="now"><h4>Foundations &middot; 0:00&ndash;1:15</h4><p>What TMR is, the four dimensions,
      the four classifications, competencies, evidence and bias.</p></li>
    <li><h4>Guided Practice &middot; 1:15&ndash;1:40</h4><p>You rate a realistic Business Enablement
      scenario and compare reasoning.</p></li>
    <li><h4>Calibration Introduction &middot; 1:40&ndash;1:55</h4><p>How leaders compare evidence and
      test consistency.</p></li>
    <li><h4>Development &amp; Utilization Plans &middot; 1:55&ndash;2:15</h4><p>What each
      classification actually produces.</p></li>
    <li><h4>Break &middot; 2:15&ndash;2:30</h4><p>15 minutes.</p></li>
    <li><h4>Future Business Enablement Considerations &middot; 2:30&ndash;3:00</h4><p>The open
      questions, and a closing reflection.</p></li>
  </ul>`,
  src:'Slides 3&ndash;4 &middot; Participant Guide, Agenda',
  fac:{
    purpose:'Sets clear, concrete expectations for what participants will be able to do by the end of the session.',
    keys:['Objectives build from understanding the framework to applying it to a real scenario.',
      'The session ends at open questions for Business Enablement, not a finished framework.',
      'Everything today is grounded in observable evidence, not impressions.'],
    delivery:'Read the four objectives at a normal pace. Connect the last one back to the opening question that is coming next. Walk the timeline briskly — it is orientation, not discussion.',
    pause:'Pause briefly after the fourth objective — it sets today’s scope boundary.',
    qa:[['Are we deciding on a Business Enablement framework today?',
      'No — today builds the foundation and surfaces the questions. A formal Business Enablement framework is a future planning conversation.'],
      ['Will we get a copy of this agenda?','Yes — it’s in your Participant Guide, along with space for notes at each stage.']],
    next:'Let’s start with a question every leader in this room has probably already asked themselves.'
  }});

S({id:'opening', ch:0, kind:'question', min:2, who:'Lexi',
  eyebrow:'A question for leaders',
  q1:'If one of your key leaders left tomorrow, who could step into the role?',
  q2:'What evidence gives you confidence in that answer?',
  src:'Slide 2',
  fac:{
    purpose:'Surfaces the succession-readiness gap that makes TMR immediately relevant to this audience.',
    keys:['Most leaders can name a person, but the evidence question is the harder one.',
      'Confidence in a successor should rest on evidence, not gut feel.',
      'That gap is exactly what TMR is designed to close.'],
    delivery:'Read both questions to the room at a measured pace. Ask leaders to silently hold their own answer in mind. Do not ask anyone to name specific employees out loud.',
    pause:'HOLD A FULL FIVE-SECOND SILENT PAUSE after asking the question before you say anything else — let the discomfort do the work. Do not skip this. It is what makes the next screen land.',
    qa:[['Do you want us to share who we’re thinking of?',
      'Not names — just notice how confident you feel in the evidence behind your answer.']],
    next:'Let’s put a number on that feeling — anonymously.'
  }});

S({id:'poll-confidence', ch:0, kind:'poll', min:2, who:'Lexi',
  eyebrow:'Leadership Reflection',
  title:'How confident are you?',
  prompt:'How confident are you that you could support a succession-readiness decision with objective evidence today?',
  note:'This measures confidence today. It is not a measure of anyone’s performance. This 1&ndash;5 confidence scale is <strong>not</strong> the Master Electronics 1&ndash;4 competency scale.',
  options:['Not confident yet','Slightly confident','Moderately confident','Very confident','Fully confident'],
  discuss:['Most leaders can name a person. Far fewer can name the evidence.',
    'That gap is what Operations built TMR to close.',
    'We will ask this exact question again at the end of the session and compare.'],
  src:'Slide 2 &middot; opening confidence baseline',
  fac:{
    purpose:'Establishes the baseline for the before-and-after comparison at the close.',
    delivery:'Open the poll straight after the five-second pause. Give it about 45 seconds, then reveal.',
    watch:'Do not editorialise about a low average. A low baseline is useful and expected, and reacting to it will bias the closing measurement.',
    say:'That’s a picture of the room right now, and it’s anonymous, so nobody’s on the spot. What I want you to notice is not the number — it’s that most of us can name a person and far fewer of us can name the evidence.',
    backup:'On a count of three, hold up fingers — one to five. Eyeball it, state the distribution, and write the rough average down so you can compare at the close.',
    never:'Never skip this activity. Without the baseline there is nothing to compare against at the end.',
    next:'To see why this matters, let’s look at the challenge underneath all of this.'
  }});

/* ============================ CHAPTER 1 — WHY TMR EXISTS ================ */

S({id:'succession', ch:1, kind:'story', min:6, who:'Lexi',
  eyebrow:'Why TMR exists',
  title:'The leadership succession challenge',
  beats:[
    {k:'The question underneath everything',h:'Momentum stalls',
     p:'When key leaders leave without a ready successor, momentum stalls. TMR gives leaders the visibility to close readiness gaps before they become a crisis.'},
    {k:'Why Operations built it',h:'One language for talent, across every team',
     p:'Operations built TMR to establish a common language for discussing talent consistently across teams — so two leaders looking at the same person are asking the same questions and applying the same standards.'},
    {k:'What it is today',h:'Established, mature, evidence-based',
     p:'The framework is established, mature and evidence-based. It gives leaders a repeatable way to assess talent and build leadership depth, grounded in observable evidence rather than impressions.'},
    {k:'And it keeps evolving',h:'A living framework, because the business is living',
     p:'As expectations grow, roles naturally evolve. Leads today may perform work that historically belonged to supervisors, and future leadership expectations will keep changing. TMR evolves with the business so it continues to reflect the organisation — not because it is unfinished, but because the organisation moves.'}
  ],
  src:'Slides 5&ndash;6 &middot; Dual Facilitator Guide, Slides 5&ndash;6',
  fac:{
    purpose:'Names the business problem that makes TMR necessary, and explains its origin as an Operations-built framework rather than a Business Enablement mandate.',
    keys:['Losing a key leader without a ready successor stalls momentum.',
      'TMR gave Operations leaders a repeatable, evidence-based way to assess talent and build leadership depth.',
      'The framework is established, mature and evidence-based — and it keeps evolving as roles and expectations change.'],
    delivery:'Connect this directly back to the opening question — this is the &ldquo;why&rdquo; behind the discomfort they may have just felt, and behind the confidence numbers they just saw. Frame it as Operations solving its own consistency problem: a shared language and rubric before a shared process. Be careful not to describe Operations’ calibration practice as fully mature.',
    interaction:'Ask if anyone recognises the &ldquo;inconsistent and reactive&rdquo; pattern from their own teams — a show of hands is enough.',
    qa:[['Has this actually happened here in Business Enablement?',
      'This reflects the general challenge that led Operations to build TMR.'],
      ['Is the Operations framework finished, or still being built?',
      'It is established, mature and evidence-based, and in active use. It also keeps evolving as roles and expectations change — a living framework that reflects the organisation rather than an unfinished one.']],
    handoff:{from:'Lexi',to:'Autumn',
      line:'We’ve talked about why Operations built Talent Management Reviews. Autumn will now walk us through the framework itself and the language leaders use when discussing talent.'},
    next:''
  }});

S({id:'what-tmr', ch:1, kind:'isnot', min:2, who:'Autumn',
  eyebrow:'The boundary',
  title:'What TMR is &amp; is not',
  is:['A strategic process to assess talent depth and readiness',
      'A forward-looking leadership pipeline tool'],
  isnot:['A replacement for performance reviews'],
  src:'Slide 7',
  fac:{
    purpose:'Draws a clean boundary around what TMR does and does not do before any definitions are introduced.',
    keys:['TMR is a strategic process for assessing talent depth and readiness.',
      'TMR is a forward-looking leadership pipeline tool.',
      'TMR is not a replacement for performance reviews.'],
    delivery:'Take over from Lexi, then read the IS / IS NOT contrast directly — this is the anchor definition for the rest of the morning.',
    pause:'Pause on &ldquo;is not a replacement for performance reviews&rdquo; — it’s the most common misconception in the room, and the next activity tests it.',
    qa:[['So is this in addition to our regular performance reviews?',
      'Yes — TMR and performance reviews run alongside each other and answer different questions, which the next screen walks through directly.']],
    next:'Let’s look at that distinction directly, side by side.'
  }});

/* ============================ CHAPTER 2 — PR vs TMR ===================== */

S({id:'pr-tmr', ch:2, kind:'sort', min:6, who:'Autumn',
  eyebrow:'Framework Application',
  title:'Performance Review or Talent Management Review?',
  intro:'Ten statements. Put each one where it belongs. Rather than us reading both columns to you, find out whether the distinction is already clear.',
  buckets:[
    {id:'pr',h:'Performance Review',sub:'What is being delivered today'},
    {id:'tmr',h:'Talent Management Review',sub:'How someone may contribute in the future'}
  ],
  tiles:[
    {t:'Focuses on the current role',b:'pr'},
    {t:'Reviews past and current results',b:'pr'},
    {t:'Provides individual feedback',b:'pr'},
    {t:'Addresses performance expectations',b:'pr'},
    {t:'Looks at what the employee is delivering today',b:'pr'},
    {t:'Focuses on future capability',b:'tmr'},
    {t:'Considers potential, readiness, and expertise',b:'tmr'},
    {t:'Involves leadership discussion',b:'tmr'},
    {t:'Identifies development or utilization needs',b:'tmr'},
    {t:'Looks at how the employee may contribute in the future',b:'tmr'}
  ],
  after:`<div class="panel"><p class="kicker">The one that splits a room</p>
    <p style="margin:0"><strong>Strong current performance matters in both.</strong> In a performance
    review it is the subject. In TMR it is the floor &mdash; the thing we assume is already solid
    before we start talking about potential or readiness. That is exactly why TMR is
    <em>not</em> a replacement for performance reviews.</p></div>`,
  discuss:['Where does most of your talent conversation time go today — the left column or the right?'],
  src:'Slide 8 &middot; Slide 9 (&ldquo;the baseline every rating builds on&rdquo;)',
  fac:{
    purpose:'Emphasises that performance reviews and TMR answer fundamentally different questions, not competing or duplicate ones.',
    keys:['Performance review: current role, past and current results, individual feedback.',
      'TMR: future capability, potential/readiness/expertise, leadership discussion.',
      'One looks at what’s being delivered today; the other looks at how someone may contribute tomorrow.'],
    delivery:'Do NOT read both columns row by row. Frame the contrast in about a minute — left column is today, right column is tomorrow — then hand the sorting to the room. They learn the distinction by making it, not by hearing it.',
    qa:[['Doesn’t a strong performance review already tell us about potential?',
      'Performance is the baseline every TMR rating builds on, but on its own it doesn’t tell you about growth capacity, readiness for a specific role, or expertise depth — that’s what the four dimensions coming up add.']],
    backup:'Read each statement aloud and take a show of hands for each column.',
    next:'Those four dimensions are next — starting with performance itself.'
  }});

/* ============================ CHAPTER 3 — FOUR DIMENSIONS =============== */

S({id:'dimensions', ch:3, kind:'dimcards', min:10, who:'Autumn',
  eyebrow:'Leadership scenario',
  title:'What questions should every leader ask before talking about someone’s future?',
  intro:'Before the vocabulary, the situation. A seat on your leadership team opens in six months. '
    +'One of your strongest people puts their hand up. Work through what you would actually need to '
    +'know — then watch four questions fall out of it.',
  scenario:[
    {q:'They are hitting every target this year. Is that enough to say yes?',
     a:'No — but it is the floor. If today’s results are not solid, nothing else in the '
       +'conversation holds. You have just used <strong>Performance</strong>.'},
    {q:'They have never operated at that level. Could they?',
     a:'That is a different question from whether they deliver today. You are asking about capacity '
       +'to grow into broader responsibility. You have just used <strong>Potential</strong>.'},
    {q:'The seat opens in six months. Could they step in without major gaps?',
     a:'Capacity is not timing. A named target role, a realistic timeline, few critical gaps left '
       +'— that is <strong>Readiness</strong>, and it is what turns potential into a plan.'},
    {q:'And the person everyone goes to for the hardest technical calls — who does not want the seat?',
     a:'They are not a failed candidate. Depth of mastery in the current role is its own answer, '
       +'and it is <strong>Professional Expertise</strong>.'}
  ],
  cards:[
    {n:1,name:'Performance',
     pg:'Current results and role effectiveness',
     what:'Delivering results against goals, quality standards, and role expectations.',
     good:'Consistent output, reliable follow-through, and sound judgment in the current role.',
     uses:'The baseline every rating builds on — potential and readiness assume performance is already solid.',
     flag:'A working lens for understanding the classifications ahead — not a separate rating in the Matrix.',
     why:'Leaders get this wrong by treating strong delivery as proof of readiness. It is the entry condition, not the answer.'},
    {n:2,name:'Potential',
     pg:'Capacity to grow into broader responsibility',
     what:'Capacity to grow into broader or higher-level responsibility over time.',
     good:'Emerging leadership behaviors, appetite for stretch work, and a consistent upward trajectory.',
     uses:'Weighs growth capacity alongside performance, readiness, and willingness to develop.',
     why:'This is where the word <em>willingness</em> starts to matter. Capacity without appetite is a very different conversation, and it is the distinction that decides HiPo versus HiPro later.'},
    {n:3,name:'Readiness',
     pg:'How soon someone could move into a target role',
     what:'How soon someone could step into a specific next role without major gaps.',
     good:'A named target role, a realistic timeline, and few or no critical skill gaps left.',
     uses:'Turns potential into a plan — the ~12-month timeline attached to a HiPo classification.',
     why:'Confusing potential with readiness is the most expensive mistake in succession planning. One is capacity; the other is a date. Without a named target role there may simply not be enough information to assess it.'},
    {n:4,name:'Professional Expertise',
     pg:'Depth of mastery in the current role',
     what:'Depth of technical or functional mastery in the current role.',
     good:'Demonstrates deep and reliable expertise in the current role and is frequently sought out for guidance.',
     uses:'Identifies talent best leveraged through expertise, mentoring, or initiative leadership.',
     why:'Organisations quietly lose their deepest experts by treating the leadership track as the only track. This dimension exists so that depth is a destination, not a consolation.'}
  ],
  close:'Four questions. Performance, potential, readiness, expertise. You were already asking them '
    +'— TMR makes sure every leader asks the same four, in the same order, about everyone.',
  src:'Slides 9&ndash;12 &middot; Participant Guide, Four Talent Dimensions',
  fac:{
    purpose:'Lets leaders arrive at the four dimensions by working a succession decision, rather than being handed four definitions.',
    keys:['Performance is the baseline — potential and readiness assume it is already solid, and it is not a separate rating in the Matrix.',
      'Potential is capacity; readiness is timing. Readiness is what attaches the ~12-month timeline to a HiPo classification.',
      'Professional expertise identifies talent best leveraged through mentoring or initiative leadership — not necessarily promotion.',
      'The four dimensions are the full working vocabulary for everything that follows.'],
    delivery:'Read the scenario, then put each question to the room BEFORE revealing the answer beneath it. Let them argue about whether hitting targets is enough. The dimension name then lands as the resolution of their own argument rather than as a definition you delivered. Open the four cards afterwards for the official wording and the leader mandate.',
    pause:'After the second question, pause on willingness. It is easy to skip and it decides HiPo versus HiPro later.',
    interaction:'Ask the first question out loud and wait. Someone will say &ldquo;it depends what the next role needs&rdquo; — that is readiness arriving on its own.',
    qa:[['If someone is a strong performer, are they automatically high potential?',
      'No — strong performance is necessary but not sufficient. Potential, readiness and expertise are separate lenses layered on top.'],
      ['Can someone have potential but not want to move up?',
      'Yes, and willingness matters — it shows up directly in the HiPo and HiPro definitions.'],
      ['What if someone has potential but no realistic target role yet?',
      'Without a realistic target role or broader responsibility, there may not be enough information to assess readiness. The leader should clarify the target before finalising the classification.'],
      ['Is deep expertise a lesser outcome than being on a leadership track?',
      'No — it is a different, equally intentional track. That is exactly what HiPro and utilization plans are built around.']],
    next:'With those four questions in hand, let’s see how Operations turns them into classifications.'
  }});
