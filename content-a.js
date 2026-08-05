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

/* ============================================================================
   JORDAN — the executive case study
   ==========================================================================

   Jordan is FICTIONAL. Every name, project, date and figure below is invented
   for this workshop. Nothing here describes a real Master Electronics employee,
   and nothing here contains protected personal information — no health,
   family, demographic, compensation or disciplinary content. That constraint is
   not decoration: the moment a practice case resembles a real person, the room
   stops reasoning about evidence and starts reasoning about the person.

   Pronouns: Jordan is she/her throughout, taken from the approved slide 24
   evidence ("builds HER own status dashboards", "HER own projects"). Used
   consistently in every scene, every script and on the phone.

   The four anchor sentences from slide 24 and Participant Guide pp. 3–4 are
   preserved VERBATIM as `anchor`. Everything else expands around them without
   contradicting them.

   Designed to be genuinely hard:
     - the four competencies do not land on the same level;
     - the strongest evidence and the weakest evidence sit side by side;
     - the Development of Others evidence is deliberately parked on the 2/3
       boundary, which is where calibration rooms actually argue;
     - some statements are impressions in evidence clothing ("I feel…",
       "people say…", "Jordan is always…") and are marked as such only in the
       facilitator material, never on screen.
   ========================================================================= */
const JORDAN_PROFILE = {
  name:'Jordan',
  role:'Project Manager, Business Enablement',
  facts:[
    ['Current role','Project Manager, Business Enablement'],
    ['Company tenure','Six years at Master Electronics'],
    ['Time in current role','Two years and eight months'],
    ['Reports to','Manager, Business Enablement Project Delivery'],
    ['Scope','Runs three to five concurrent projects; no direct reports'],
    ['Evaluation period','The full prior twelve months']
  ],
  priorRoles:[
    'Customer Service Representative &mdash; 14 months. Joined Master Electronics here.',
    'Project Coordinator, Business Enablement &mdash; 21 months. Scheduling, status reporting, meeting coordination.',
    'Associate Project Manager &mdash; 17 months. First time owning delivery on small projects.',
    'Project Manager &mdash; current, two years and eight months.'
  ],
  responsibilities:[
    'End-to-end delivery of three to five concurrent Business Enablement projects.',
    'Weekly status reporting to project sponsors and the delivery manager.',
    'Requirements gathering with requesting departments.',
    'Vendor coordination on two recurring system integrations.',
    'Onboarding new Project Coordinators to the delivery process &mdash; assigned informally, not a formal responsibility.'
  ],
  timeline:[
    {y:'Two years ago',
     t:'Promoted to Project Manager. First independent portfolio of projects.'},
    {y:'18 months ago',
     t:'Took over the ERP data-migration workstream mid-flight after the previous PM left. Scope was re-baselined twice in the first quarter.'},
    {y:'12 months ago',
     t:'Delivered four projects against revised deadlines after scope changed, with no missed customer commitments. Built her own status dashboards during this period because the standard reporting pack did not show what sponsors were asking for.'},
    {y:'9 months ago',
     t:'Completed the internal Project Delivery Fundamentals programme. Asked for it; it was not assigned.'},
    {y:'6 months ago',
     t:'Began informally coaching two junior Project Managers. Nobody asked her to. Both have since started leading their own weekly status reviews independently.'},
    {y:'4 months ago',
     t:'Invited to a cross-functional Operations planning session as the Business Enablement delivery representative. Attended twice, contributed on delivery mechanics, did not raise the department-level implications of what was discussed.'},
    {y:'Last quarter',
     t:'A recurring data-quality issue surfaced on two of her projects. Jordan escalated it accurately each time and worked around it, but did not investigate why it kept recurring.'}
  ],
  performance:[
    'Last two annual performance reviews: <strong>Exceeds Expectations</strong> on delivery, <strong>Meets Expectations</strong> overall.',
    'Zero missed customer commitments across the evaluation period.',
    'Highest sponsor-satisfaction scores in the delivery team for two consecutive review cycles.',
    'No formal leadership responsibility has been held at any point.'
  ],
  stakeholders:[
    {who:'Delivery manager (direct leader)', tone:'hard',
     q:'&ldquo;Jordan re-baselined the ERP migration twice and still landed every revised date. I have never had to chase her for a status.&rdquo;'},
    {who:'Finance sponsor', tone:'hard',
     q:'&ldquo;Her dashboards are the only reporting I do not have to interpret before I can use it. I asked for a trend view of the recurring defects and did not get one.&rdquo;'},
    {who:'Peer Project Manager', tone:'soft',
     q:'&ldquo;I feel Jordan is a strong leader. People say she is the one the junior PMs go to.&rdquo;'},
    {who:'Operations planning lead', tone:'soft',
     q:'&ldquo;Jordan seems focused. She answered everything we asked about her projects. She did not tell us what any of it meant for the wider roadmap.&rdquo;'},
    {who:'Junior Project Manager (coached)', tone:'hard',
     q:'&ldquo;She sat with me through two status cycles until I could run the review myself. She has never once done it for me.&rdquo;'},
    {who:'Requesting department manager', tone:'soft',
     q:'&ldquo;Jordan is always reliable.&rdquo;'}
  ],
  gaps:[
    'No formal people-leadership experience, and no evidence of how she performs when she is accountable for someone else’s results.',
    'No evidence of root-cause analysis. She identifies and escalates data problems accurately but has not investigated why any of them recur.',
    'The coaching of the two junior PMs has been observed by one leader only, over roughly six months. Nobody has asked the two coached PMs’ own leaders what they have seen.',
    'No evidence of Jordan connecting her delivery work to department or company-level goals, in either direction.',
    'Career interest and willingness to move into leadership have not been discussed with her.',
    'Two of the stakeholder observations on record are impressions rather than evidence.'
  ]
};

// The four rated competencies. `anchor` is verbatim from slide 24 and the
// Participant Guide. `hard` is concrete supporting evidence; `soft` is what a
// leader has said that is NOT yet evidence; `gap` is what is missing.
const JORDAN = [
  {comp:'Accountable to Results',
   ev:'Consistently hits project deadlines even when scope changes mid-stream.',
   anchor:'Consistently hits project deadlines even when scope changes mid-stream.',
   hard:[
     'Delivered four projects against revised deadlines in the last twelve months after scope changed, with no missed customer commitments.',
     'Took over the ERP data-migration workstream mid-flight and landed every revised date through two re-baselines.',
     'Highest sponsor-satisfaction scores in the delivery team for two consecutive review cycles.'
   ],
   soft:['&ldquo;Jordan is always reliable.&rdquo; &mdash; requesting department manager'],
   gap:'No evidence of her improving the delivery process itself, or of results held under someone else’s accountability.'},

  {comp:'Data Literacy',
   ev:'Builds her own status dashboards but rarely digs into root-cause trends.',
   anchor:'Builds her own status dashboards but rarely digs into root-cause trends.',
   hard:[
     'Built her own status dashboards because the standard reporting pack did not answer what sponsors were asking.',
     'Finance sponsor: the dashboards are the only reporting they do not have to interpret before using.',
     'Escalated a recurring data-quality issue accurately on two projects last quarter.'
   ],
   soft:['&ldquo;She is good with data.&rdquo; &mdash; peer, in passing'],
   gap:'Asked for a trend view of recurring defects and did not produce one. No instance of her investigating why a problem recurs, only that it did.'},

  {comp:'Development of Others',
   ev:'Has begun coaching two junior Project Managers informally, without being asked.',
   anchor:'Has begun coaching two junior Project Managers informally, without being asked.',
   hard:[
     'Began coaching two junior Project Managers roughly six months ago, unprompted.',
     'Both coached PMs now lead their own weekly status reviews independently.',
     'One coached PM: &ldquo;She sat with me through two status cycles until I could run the review myself. She has never once done it for me.&rdquo;'
   ],
   soft:['&ldquo;I feel Jordan is a strong leader. People say she is the one the junior PMs go to.&rdquo; &mdash; peer Project Manager'],
   gap:'Six months, two people, observed by one leader. No formal leadership responsibility has ever been held, and the coached PMs’ own leaders have not been asked what they have seen.'},

  {comp:'Strategic Awareness',
   ev:'Focuses on her own projects and has not yet consistently connected the work to broader department goals.',
   anchor:'Focuses on her own projects and has not yet consistently connected the work to broader department goals.',
   hard:[
     'Attended cross-functional Operations planning twice as the Business Enablement delivery representative.',
     'Contributed accurately on delivery mechanics when asked.'
   ],
   soft:['&ldquo;Jordan seems focused.&rdquo; &mdash; Operations planning lead'],
   gap:'Did not raise the department-level implications of what was discussed, in either session. No evidence of her connecting delivery work upward to department or company goals, and no evidence she has been asked to.'}
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

/* ------------------------------------------------------------- instructions
   One entry per interactive scene, answering the same eight questions:
   why the room is doing it, on what device, what they submit, whether it is
   anonymous, whether there is a right answer, how long they have, what happens
   after they submit, and what they should be ready to discuss.

   Held centrally rather than inline so that a scene cannot be added without
   somebody noticing it has no instructions — and so the wording stays
   consistent in register across all thirty-two scenes. Kept short: this renders
   on a projected screen. The participant phone carries the longer version.

   `answer` is deliberately explicit about scoring. In a room of executives,
   ambiguity about whether something is being marked changes what people are
   willing to put on a screen.                                                */
const INSTRUCT = {
  'poll-confidence': {
    why:'Establishes a baseline we will return to at the end of the session.',
    device:'Your phone. One tap.',
    submit:'One confidence rating.',
    anon:'Anonymous. Only the group distribution is shown — never an individual answer.',
    answer:'No correct answer. This is a reading of the room, not an assessment.',
    time:'About one minute.',
    after:'The distribution appears on the main screen once the facilitator closes responses.',
    ready:'Be ready to say what would have to change to move you up one level.'
  },
  'pr-tmr': {
    why:'Separates performance review questions from talent review questions before we build on either.',
    device:'Your phone. Sort each statement into one of the two columns.',
    submit:'One placement for every statement.',
    anon:'Anonymous. Group totals only.',
    answer:'There is a correct answer for each, and it is revealed after responses close.',
    time:'Three minutes.',
    after:'We reveal the correct placements and work through any the room split on.',
    ready:'Be ready to explain any statement you found genuinely ambiguous.'
  },
  'class-sort': {
    why:'Tests whether the four classification definitions are usable on real evidence rather than just readable.',
    device:'Your phone. One classification per case.',
    submit:'A classification for each of the three cases.',
    anon:'Anonymous. Group totals only.',
    answer:'One of the three is deliberately incomplete. &ldquo;Not enough information&rdquo; is a legitimate answer, not a cop-out.',
    time:'Four minutes.',
    after:'We compare the room’s distribution against what the evidence actually supports.',
    ready:'Be ready to name the specific evidence that drove your call.'
  },
  'comp-explorer': {
    device:'Your phone is a private reference for this section. Nothing is submitted.',
    submit:'Nothing to submit. There is no scoring and no right answer here.',
    anon:'Private to your own device. Nothing you tap is broadcast to the room.',
    time:'About five minutes, led from the front.',
    after:'The four highlighted competencies are the ones you will apply to Jordan shortly.',
    ready:'Be ready to say which competency you would find hardest to evidence in your own team.'
  },
  'scale-quiz': {
    why:'Calibrates the two boundaries leaders most often get wrong: 1 to 2, and 3 to 4.',
    device:'Your phone. One level per description.',
    submit:'A rating of 1 to 4 for each of the four descriptions.',
    anon:'Anonymous. Group totals only.',
    answer:'Each description maps to one intended level, and we reveal it with the reasoning.',
    time:'Four minutes.',
    after:'Each answer is revealed with the reasoning behind it before we move on.',
    ready:'Be ready to challenge a boundary you would have drawn differently.'
  },
  'evidence': {
    why:'Gives you the seven questions that separate observable evidence from an impression.',
    device:'Your phone holds the seven questions as a private reference for the rest of the session.',
    submit:'Nothing. There is no response to send on this screen.',
    anon:'Private to your device. Nothing is broadcast.',
    answer:'No scoring. This is a reference tool.',
    time:'About four minutes, led from the front.',
    after:'We apply the seven questions to a set of statements as a room.',
    ready:'Be ready to say which of the seven questions your own talent notes usually fail.'
  },
  'evidence-build': {
    why:'Builds one defensible evidence statement together before you evaluate a full case alone.',
    device:'Whiteboard, as a room. Your phone holds the seven questions for reference only.',
    submit:'Nothing individually. The room produces one rewritten statement together.',
    anon:'Nothing is collected from this activity.',
    answer:'There is no single correct wording. There are wordings you could defend in calibration and wordings you could not.',
    time:'Six minutes at the board.',
    after:'We compare the room’s rewrite against a stronger version.',
    ready:'Be ready to point at which of the seven questions your rewrite now answers.'
  },
  'bias': {
    why:'Names the three rating tendencies that most distort talent decisions, and the structural safeguard for each.',
    device:'Your phone. Identify the tendency in each situation.',
    submit:'One identification for each of the three situations.',
    anon:'Anonymous. Group totals only — nobody sees what you selected.',
    answer:'Each situation maps to one tendency, revealed with its safeguard.',
    time:'Four minutes.',
    after:'We reveal each tendency and the structural safeguard that corrects it.',
    ready:'Be ready to say which of the three you think is most common in calibration conversations.'
  },
  'leader-prep': {
    why:'Turns six preparation steps into one honest self-assessment before your next talent conversation.',
    device:'Your phone. One selection.',
    submit:'The single preparation step you most need to strengthen.',
    anon:'Anonymous. Only the group distribution appears.',
    answer:'No correct answer. This is a self-assessment.',
    time:'Two minutes.',
    after:'The distribution appears on screen so the room can see where preparation is weakest.',
    ready:'Be ready to name what would make that step easier to do consistently.'
  },
  'jordan-worksheet': {
    why:'This is the central exercise of the workshop: apply the framework to a realistic case with incomplete evidence, the way calibration actually works.',
    device:'Work in pairs. <strong>One phone per pair, one submission per pair.</strong> Jordan\u2019s full profile is on that phone \u2014 background, role history, the four competencies, stakeholder comments and evidence gaps.',
    submit:'Four competency ratings, the evidence behind them, the evidence still missing, a proposed classification, the 12-month readiness call, your business case, and a first development action.',
    anon:'Anonymous. No participant names are shown or stored. Written answers are displayed anonymously only when the facilitator chooses to show them.',
    answer:'No forced correct classification. Your reasoning and your evidence are what is being examined.',
    time:'Seven minutes in pairs, then eight minutes comparing at your table.',
    after:'The room\u2019s distributions appear on screen, then the facilitators present their own ratings \u2014 some of which are deliberately not well supported.',
    ready:'Be ready to defend your rating with specific evidence, and to challenge a rating you disagree with.'
  },
  'calibration-challenge': {
    why:'Puts you in the seat of a leader whose rating is being questioned in a calibration room.',
    device:'Discuss as a room. No phone needed for this one.',
    submit:'Nothing. This is a spoken discussion.',
    anon:'Not applicable — nothing is captured.',
    answer:'There is a defensible answer, and we work to it together.',
    time:'Five minutes.',
    after:'We land the reasoning and connect it back to the evidence standard.',
    ready:'Be ready to say what additional evidence you would ask that leader for.'
  },
  'plans-match': {
    why:'Checks that each classification produces the right leader action, which is where TMR either works or stops being useful.',
    device:'Your phone. Match each classification to its required action.',
    submit:'One action per classification.',
    anon:'Anonymous. Group totals only.',
    answer:'Each pairing has a correct answer drawn from the framework.',
    time:'Four minutes.',
    after:'We reveal the correct pairings and the accountability behind each.',
    ready:'Be ready to say which plan you would find hardest to actually deliver.'
  },
  'future-rank': {
    why:'Executive Prioritization: the framework cannot develop everywhere at once, so the room decides where it goes next.',
    device:'Your phone. Select your top two.',
    submit:'Exactly two priorities.',
    anon:'Anonymous. Only the group ranking appears.',
    answer:'No correct answer. This is a genuine input into what gets developed next.',
    time:'Three minutes.',
    after:'The ranked result appears on screen and is carried out of this session as input.',
    ready:'Be ready to make the case for your first choice in one sentence.'
  },
  'confidence-close': {
    why:'Compares the room’s confidence now against the same question asked at the start.',
    device:'Your phone. One tap.',
    submit:'One confidence rating.',
    anon:'Anonymous. Only the distribution is shown, alongside the opening result.',
    answer:'No correct answer.',
    time:'One minute.',
    after:'Both distributions appear side by side so the room can see the shift.',
    ready:'Be ready to say what specifically moved you, if anything did.'
  },
  'reflection': {
    why:'Closes the session on a commitment rather than a summary.',
    device:'Your phone. One written answer.',
    submit:'One sentence, in your own words.',
    anon:'Anonymous. Shown on screen without any name, and only if the facilitator chooses to show them.',
    answer:'No correct answer and no scoring.',
    time:'Three minutes.',
    after:'The facilitators may display responses anonymously to close the session.',
    ready:'Nothing further. This is the last thing we ask of you.'
  }
};

/* ------------------------------------------------------------- steps */
const STEPS = [];
/* Attaching instructions here rather than in each literal guarantees that every
   interactive scene carries them, including any added later. */
const S = (o) => {
  if(!o.instruct && INSTRUCT[o.id]) o.instruct = INSTRUCT[o.id];
  STEPS.push(o);
  return o;
};

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
