/* ============================================================================
   TMR LEARNING EXPERIENCE — CONTENT, PART B (chapters 4–8)
   Master Electronics | INTERNAL
   Continues the STEPS registry defined in content-a.js.
   ========================================================================= */

/* ============================ CHAPTER 4 — CLASSIFICATIONS =============== */

S({id:'classifications', ch:4, kind:'classcards', min:10, who:'Autumn',
  eyebrow:'The four talent classifications',
  title:'How Operations classifies talent',
  intro:'Four classifications. Open each one — definition, an illustrative Business Enablement example, and what the leader is actually required to do next.',
  cards:[
    {n:1,name:'HiPo',full:'High Potential',tone:'ok',
     def:'Consistently strong performer with foundational and emerging leadership behaviors — can reasonably become ready for the next role, or an identified target role, within 12 months through a focused development plan.',
     pg:'Is willing and able to grow and can reasonably be ready for the next role, or an identified target role, within 12 months with a focused plan.',
     ex:'Maya, a Senior Data Analyst, delivers consistently, has begun mentoring junior analysts, and could lead a small analytics team within a year.',
     mandate:'Build a 12-month development plan tied to specific competency gaps. Review and approve it with Senior Leadership.'},
    {n:2,name:'Mid Potential',full:'',tone:'info',
     def:'Shows some HiPo traits but lacks consistency, or would need more than 12 months to be ready for the next role.',
     pg:'Shows some HiPo characteristics but lacks consistency and/or would require more than 12 months to be ready for the next role.',
     ex:'Devon, a Product Owner, delivers well on familiar initiatives but is still building the stakeholder and strategic skills the next level needs.',
     mandate:'Not typically presented in TMR. Coach and develop through regular performance management; revisit at midyear calibration.'},
    {n:3,name:'HiPro',full:'High Professional',tone:'warn',
     def:'Highly capable in the current role and often shows HiPo-like strengths, but has reached a practical limit in ability or willingness to move up.',
     pg:'Best leveraged as a subject matter expert, mentor, trainer, stabilizer, process owner, or initiative lead.',
     ex:'Priya, an Innovation Engineer, is repeatedly brought into the organization’s most complex technical problems and is highly effective at teaching others, but has declined broader leadership roles.',
     mandate:'Build a utilization plan — mentoring, training, process ownership, or initiative leadership — that raises impact and retention. Review with Senior Leadership.'},
    {n:4,name:'Low Potential',full:'',tone:'no',
     def:'Either too new to evaluate for advancement, or not currently showing the engagement or performance needed for growth.',
     pg:'Either too new to evaluate for advancement or not currently demonstrating the engagement or performance required for growth opportunities.',
     ex:'Sam, a Data Analyst Intern, joined the team eight weeks ago — too early to assess trajectory beyond onboarding progress.',
     mandate:'Not presented in TMR. Focus on onboarding success (if new) or a clear performance and engagement plan; re-evaluate after sustained improvement or tenure.'}
  ],
  discuss:['Think of someone who doesn’t fit neatly into one of these four boxes. What’s missing from the evidence?'],
  src:'Slides 13&ndash;16 &middot; Participant Guide, Talent Classifications',
  fac:{
    purpose:'Establishes all four official classifications and the leader action each one requires.',
    keys:['HiPo requires willingness, ability, strong performance, emerging leadership, and a realistic 12-month path.',
      'Mid Potential is not a negative classification — it means more time or more consistency is needed before a 12-month plan makes sense.',
      'HiPro is an intentional expertise strategy, not a consolation category.',
      'Low Potential is often simply a tenure issue — too early to assess trajectory beyond onboarding.'],
    delivery:'Read the official definition first, then the illustrative example to make it concrete, then land on the leader mandate. HiPo: the slide definition does not print the word &ldquo;willingness&rdquo; — the Participant Guide and the Facilitator Guide both do, and it is what separates HiPo from HiPro. ADD IT VERBALLY: &ldquo;HiPo also assumes the person is willing and able to grow.&rdquo; Do not edit the definition.',
    pause:'Pause after explaining that the framework does not establish a communication policy. On HiPro, pause on &ldquo;willingness&rdquo; — it can reflect a genuine choice, not just an ability ceiling.',
    watch:'The next activity presents Priya’s evidence with the declined-leadership clause deliberately withheld. Deliver the HiPro definition normally here — do not over-emphasise that clause or you will give the activity away.',
    qa:[['Does Maya know she’s classified as HiPo?',
      'The framework does not establish a communication policy. Leaders should discuss career interests, strengths, competency gaps, and development actions while following any communication guidance established for the process.'],
      ['Does Mid Potential ever get revisited?',
      'Yes — the leader mandate calls for coaching through regular performance management, with a revisit at midyear calibration.'],
      ['Is HiPro a step down from HiPo?',
      'No — it’s a different, intentional track focused on leveraging deep expertise rather than promotion, with its own utilization plan.'],
      ['Could a Low Potential classification follow someone permanently?',
      'The classification reflects current evidence and circumstances. Leaders should re-evaluate after additional tenure, sustained improvement, or meaningful changes in performance and engagement.']],
    next:'All four are now on the table. Let’s find out whether they’re usable.'
  }});

S({id:'class-sort', ch:4, kind:'sort', min:6, who:'Autumn',
  eyebrow:'Leadership Decision',
  title:'Which classification does the evidence support?',
  intro:'Three short fictional cases. You have <strong>only the evidence shown</strong>. One of the three is deliberately incomplete — and &ldquo;Not enough information&rdquo; is a real answer here, not a cop-out.',
  buckets:[
    {id:'hipo',h:'HiPo',sub:'Ready in ~12 months'},
    {id:'mid',h:'Mid Potential',sub:'Needs consistency or more time'},
    {id:'hipro',h:'HiPro',sub:'Expertise leverage'},
    {id:'low',h:'Low Potential',sub:'Too new, or not currently positioned'},
    {id:'nei',h:'Not enough information',sub:'The evidence does not support a call yet'}
  ],
  tiles:[
    {t:'A Senior Data Analyst delivers consistently, has begun mentoring junior analysts, and could lead a small analytics team within a year.',b:'hipo'},
    {t:'A Product Owner delivers well on familiar initiatives but is still building the stakeholder and strategic skills the next level needs.',b:'mid'},
    {t:'An Innovation Engineer is repeatedly brought into the organization’s most complex technical problems and is highly effective at teaching others.',b:'nei'}
  ],
  after:`<div class="panel"><p class="kicker">The third case withholds one fact on purpose</p>
    <p>On that evidence alone the person could be <strong>HiPo</strong> or <strong>HiPro</strong>.
    What separates them is not capability &mdash; it is <em>willingness and ability to move up</em>.
    HiPo requires that someone is willing and able to grow into a next role. HiPro describes someone
    highly capable who has reached a practical limit in ability and/or willingness to advance.
    Nothing shown tells you which.</p>
    <p style="margin:0">The full evidence adds one clause: <strong>this person has declined broader
    leadership roles.</strong> That is what makes it HiPro &mdash; a different, intentional track,
    not a step down.</p></div>`,
  discuss:['Some of you had enough information and some of you did not — and you were all looking at the same evidence.',
    'That is not a failure of this room. That is exactly the gap calibration exists to surface.',
    'You will run into it yourselves shortly, with Jordan.'],
  src:'Slides 13&ndash;16 evidence, names and labels withheld',
  fac:{
    purpose:'Turns the four classifications from definitions into a usable judgement, and deliberately surfaces the &ldquo;not enough information&rdquo; finding.',
    delivery:'Be explicit up front that participants have only the evidence shown, and that one case is deliberately incomplete. Give about two minutes, then reveal.',
    say:'Look at the split on the third one. The full evidence includes one more fact: this person has declined broader leadership roles. That single sentence is what makes it HiPro rather than HiPo — and HiPro is not a step down. Now hold on to what just happened: some of you had enough information and some of you didn’t, and you were all looking at the same page. That’s exactly the gap calibration exists to surface.',
    watch:'This activity is designed to split the room on case three. You are standing in front of VPs and Directors telling them their disagreement is correct. Rehearse this debrief out loud rather than reading it cold.',
    backup:'Read each case aloud and take a show of hands for each of the five classifications, then reveal from the teaching point.',
    handoff:{from:'Autumn',to:'Lexi',
      line:'Now that we’ve built a common language around talent, Lexi will walk us through how competencies, evidence, and bias affect the quality of those decisions.'},
    next:''
  }});

/* ============================ CHAPTER 5 — COMPETENCIES & EVIDENCE ======= */

S({id:'comp-categories', ch:5, kind:'prose', min:3, who:'Lexi',
  eyebrow:'The competency framework',
  title:'Four categories of competency',
  body:`
  <p class="lede">The 2026 Talent Management Review framework organises competencies into four
  categories. <strong>Behavioral competencies are the primary focus for development planning.</strong></p>
  <div class="grid g2">
    <div class="card"><h3>Basic Skills</h3><p style="margin:0">Safety, teamwork, and rules
      compliance expected of every role.</p></div>
    <div class="card"><h3>Role-Specific Skills</h3><p style="margin:0">Competencies tied to the
      specific job or department a person is assigned to.</p></div>
    <div class="card"><h3>Technical Skills</h3><p style="margin:0">Systems, tools, data &amp;
      analysis, and business-acumen proficiency.</p></div>
    <div class="card tint"><h3>Behavioral Skills</h3><p style="margin:0">Leadership and
      interpersonal competencies &mdash; communication, coaching, accountability, adaptability.</p></div>
  </div>
  <div class="note">Technical competencies are evaluated, but development plans should remain
  focused on behavioral growth. <strong>Behavioral competencies provide a common language across
  the business, while technical and role-specific expectations vary by function.</strong></div>
  <div class="panel"><p class="kicker">The &ldquo;R&rdquo; suffix</p>
    <p style="margin:0"><strong>R</strong> &mdash; Indicates that the expected competency level
    varies depending on the specific role or responsibility. It is not a fixed number for everyone.</p></div>`,
  src:'Slide 17 &middot; Quick Reference Guide, Competency Framework',
  fac:{
    purpose:'Introduces the categories of competency Master Electronics rates, before drilling into behavioral competencies specifically.',
    keys:['The Competency Matrix groups competencies into basic, role-specific, technical, and behavioral categories.',
      'Behavioral competencies provide a shared leadership and development language across the company.',
      'Technical competencies are evaluated, but behavioral competencies are the primary focus of development planning.',
      'Technical and role-specific expectations still matter, and they vary by function.'],
    delivery:'Name the categories at a glance, then tell the room we’re zooming in on behavioral competencies. Do not linger — this is a map screen. Say the scope plainly: behavioral competencies are a company-wide language, not a Business Enablement one.',
    qa:[['Will we cover technical competencies today too?',
      'Not in depth. Technical competencies are evaluated, but behavioral competencies are the primary focus of development planning — and they are the shared language across the company, which is why we start there.'],
      ['Is this framework specific to Business Enablement?',
      'The behavioral competencies are a shared leadership and development language across the company. What varies by function is the technical and role-specific expectations.'],
      ['What does the &ldquo;R&rdquo; suffix mean?',
      'It flags that the expected competency level depends on the specific role rather than a single fixed number applied to everyone.']],
    next:'Let’s look at the behavioral competencies themselves.'
  }});

S({id:'comp-explorer', ch:5, kind:'explorer', min:5, who:'Lexi', phoneRef:true,
  eyebrow:'Framework Application &middot; Reference',
  title:'The behavioral language leaders use',
  why:'Before evaluating Jordan, become familiar with the behavioral language leaders use to describe observable capability. Four of these competencies will be used in the Jordan case.',
  reflect:'Think of someone on your team who demonstrates one or more of these competencies strongly. Keep the person’s name private.',
  jordanNote:'Four competencies carry the Jordan case. Everything else on this screen is context for the language, not the exercise.',
  src:'Slide 18 &middot; Quick Reference Guide, All 19 Behavioral Competencies',
  fac:{
    purpose:'Gives the room the behavioral vocabulary they are about to reason with, and tells them plainly why they are looking at a list of 19 competencies before a case study.',
    keys:['All 19 behavioral competencies are one shared language for describing observable capability.',
      'Four of them — Accountable to Results, Data Literacy, Development of Others, Strategic Awareness — carry the Jordan case.',
      'A competency is only usable in TMR if you can describe it in observable behaviour.',
      'The complete Matrix lives in the Master Electronics Competency Matrix and the Quick Reference Guide.'],
    say:'Before we evaluate anyone, we need the language. These are the 19 behavioral competencies — the vocabulary leaders use to describe capability you can actually observe, rather than capability you sense. I am not going to read all 19 to you. I want you to notice two things: how concrete the definitions are, and the four that are highlighted, because those four are the ones you will apply to Jordan in about twenty minutes.',
    delivery:'Show the complete list first so the room sees the scope. Then highlight the four Jordan competencies and read those four definitions aloud — those are the only four you need to say out loud. Open one or two others if the room asks. Keep this to five minutes; it is a vocabulary screen, not a lecture.',
    interaction:'Ask the room directly: is there any competency here you would like to explore further? Open whichever they name on the screen. That question is the interaction — do not move on without asking it.',
    pause:'Give the room a genuine thirty seconds of quiet for the reflection prompt. Say the instruction to keep the name private, and mean it.',
    tech:'Participant phones show the same 19 competencies as a private reference for this section. There is nothing to submit and no response comes back — say so, or people will hunt for a submit button.',
    qa:[['Is this the complete list of competencies?',
      'These are the 19 behavioral competencies. The full Matrix, including basic, role-specific and technical progression detail, lives in the Master Electronics Competency Matrix.'],
      ['Do we rate all 19 on every person?',
      'No. In practice a leader works from the competencies that matter for the role and the target role. Today we use four.'],
      ['Where do the definitions come from?',
      'They are the approved plain-language descriptions from the Competency Matrix and Quick Reference Guide. We have not reworded them.']],
    next:'You have the language. Now let’s look at how each of these actually gets rated.'
  }});

S({id:'scale', ch:5, kind:'scale', min:3, who:'Lexi',
  eyebrow:'The rating scale',
  title:'The Master Electronics 1&ndash;4 scale',
  intro:'Step through the four levels. Watch the two boundaries that matter most: 1 to 2, and 3 to 4.',
  src:'Slide 19 &middot; Quick Reference Guide, How to Apply the 1&ndash;4 Scale',
  fac:{
    purpose:'Establishes the shared 1–4 rating scale leaders use to rate each competency with observable evidence.',
    keys:['Level 1 already assumes independent, routine work — it is not &ldquo;needs hand-holding.&rdquo;',
      'Level 3 includes teaching others — a meaningful step beyond doing the work well yourself.',
      'Level 4 includes improving systems and solving root causes — it is about elevating the work, not just doing more of it.'],
    delivery:'Walk the four levels in order, about three minutes. Be explicit that Level 1 is already independent routine performance. At Level 3 emphasise teaching others. At Level 4 emphasise root cause and lasting improvement. Expanding a level shows the fuller description and a worked example — use that if the room wants detail, but do not read all four expansions aloud.',
    pause:'Pause between each level so the distinctions don’t blur, especially 1 vs 2 and 3 vs 4.',
    qa:[['Isn’t Level 1 basically an entry-level employee who still needs supervision?',
      'No — Level 1 already reflects someone who can complete routine work independently. Needing regular supervision would fall below this scale, not at Level 1.']],
    next:'Let’s test the two boundaries that matter most.'
  }});

S({id:'scale-quiz', ch:5, kind:'quiz', min:5, who:'Lexi',
  eyebrow:'Leadership Decision',
  title:'Rate each description on the 1&ndash;4 scale',
  intro:'Four short fictional descriptions. Watch the boundaries.',
  items:[
    {q:'A team member completes the standard weekly reporting process independently in routine situations, and asks for guidance when an unfamiliar exception comes up.',
     opts:['1 — Basic','2 — Advanced','3 — Expert','4 — Specialist'],a:0,
     fb:'<b>Level 1 — Basic.</b> Level 1 already includes independent routine work. It is not &ldquo;needs supervision.&rdquo; Needing regular supervision would fall <em>below</em> this scale, not at Level 1.'},
    {q:'A team member delivers the same reporting with consistent quality, anticipates the issues that usually come up, adjusts when conditions change, and informally helps a teammate who is stuck.',
     opts:['1 — Basic','2 — Advanced','3 — Expert','4 — Specialist'],a:1,
     fb:'<b>Level 2 — Advanced.</b> Level 2 goes beyond the basics through quality, anticipation, adaptation, and informal support of others. Note that helping a teammate informally is Level 2 — it is not yet coaching.'},
    {q:'A team member coaches two teammates through the process, adapts the approach to each situation, and sustains strong results.',
     opts:['1 — Basic','2 — Advanced','3 — Expert','4 — Specialist'],a:2,
     fb:'<b>Level 3 — Expert.</b> Level 3 is where coaching and teaching others begins. That is the defining behaviour, and it is a meaningful step beyond doing the work well yourself.'},
    {q:'A team member finds the root cause of a recurring error in the process, redesigns it, and the improvement holds across the department.',
     opts:['1 — Basic','2 — Advanced','3 — Expert','4 — Specialist'],a:3,
     fb:'<b>Level 4 — Specialist.</b> Level 4 improves systems and processes, finds root causes, and drives lasting improvement. Root cause plus a change that holds is what separates 4 from 3. And not every role or competency requires Level 4.'}
  ],
  after:`<div class="panel"><p class="kicker">What to remember</p><ul>
    <li>Level 1 already includes independent routine work.</li>
    <li>Level 2 goes beyond the basics through quality, adaptation, and informal support.</li>
    <li>Level 3 includes coaching or teaching others.</li>
    <li>Level 4 creates broader, repeatable, or strategic improvement.</li>
    <li>Not every role or competency requires Level 4.</li>
    <li>Ratings must be supported by observable evidence.</li></ul></div>`,
  src:'Quick Reference Guide, How to Apply the 1&ndash;4 Scale and What to Remember',
  fac:{
    say:'Two boundaries to hold on to. First, Level 1 is already independent — if you walked in thinking Level 1 meant a beginner who needs hand-holding, correct that now, because it will distort every rating you ever make. Second, the jump from 3 to 4 is not &ldquo;does more of it.&rdquo; It’s root cause and lasting improvement. And Level 4 is not the goal for everyone — the expected level depends on the role. That’s what the &ldquo;R&rdquo; suffix is telling you.',
    backup:'Read each description and take a show of hands for 1, 2, 3, 4, then reveal.',
    next:'A rating is only worth something if you can point to what you actually observed.'
  }});

/* Slide 20, rebuilt.
   The old sequence asked the room to rewrite a statement about Jordan before
   they had met Jordan. That inverted the teaching: participants were reaching
   for wording rather than reading evidence. This scene now introduces the seven
   questions against a gallery of statements — some strong, some vague, one
   deliberately half-way — and the rewrite becomes a shared exercise at the
   whiteboard immediately afterwards. */
S({id:'evidence', ch:5, kind:'evgallery', min:5, who:'Lexi', phoneRef:true,
  eyebrow:'Evidence Review',
  title:'Evidence, not impressions',
  why:'A rating is only as strong as the evidence behind it. These seven questions are how you tell the difference between something you observed and something you concluded — and you will use them on Jordan shortly.',
  criteria:['Quantifiable results tied to business outcomes',
    'Specific behaviors observed across multiple situations',
    'Cross-functional feedback from peers and stakeholders',
    'Demonstrated readiness under real conditions &mdash; not assumptions about potential'],
  checklist:CHECKLIST,
  ask:'Read each statement. What is observable, what is measurable, what is still missing — and which of the seven questions does it actually answer?',
  statements:[
    {t:'I feel Jordan is a strong leader.',
     tone:'weak', tag:'Impression',
     answers:[],
     obs:'Nothing. &ldquo;I feel&rdquo; reports the rater’s conclusion, not the employee’s behaviour.',
     meas:'Nothing is measured. There is no result, no frequency and no timeframe.',
     miss:'Everything. What did Jordan do, when, how often, and what changed as a result. This sentence cannot be rated, challenged or defended.',
     why:'This is the most common sentence in talent conversations and the least usable. Notice it feels reasonable when you read it.'},
    {t:'Jordan always does a good job.',
     tone:'weak', tag:'General impression',
     answers:[],
     obs:'Nothing specific. &ldquo;Always&rdquo; sounds like frequency but names no behaviour to be frequent about.',
     meas:'Nothing. &ldquo;A good job&rdquo; has no standard attached to it.',
     miss:'A behaviour, a period, a result. Absolute words — always, never — are usually a sign that no single example came to mind.',
     why:'Words like &ldquo;always&rdquo; feel like evidence of a pattern. They are the opposite: they are what we say when we cannot name the instances.'},
    {t:'Jordan presented a stakeholder update last week and it went well.',
     tone:'weak', tag:'Incomplete evidence',
     answers:[0,1],
     obs:'Yes — a specific behaviour, and when it happened.',
     meas:'No. &ldquo;It went well&rdquo; is a judgement, not an outcome.',
     miss:'Frequency, pattern and impact. One good week is not a capability, and this is the trap: it reads as evidence because it is specific.',
     why:'This is the honest middle. Specific is not the same as sufficient — a single event tells you almost nothing about capability.'},
    {t:'Jordan informally coached two junior Project Managers during three active projects, and both began independently leading weekly status reviews.',
     tone:'strong', tag:'Observable evidence',
     answers:[0,2,3,4],
     obs:'Yes — coaching, named, and unprompted. You can picture what happened.',
     meas:'Yes. Two people, three projects, and a change in what those two people can now do without help.',
     miss:'Exact dates, and whether anyone other than this leader observed it. Worth asking for, but this is ratable as written.',
     why:'The impact is someone else’s changed behaviour. That is the strongest kind of evidence for Development of Others.'},
    {t:'Jordan delivered four projects by the revised deadlines after scope changed, with no missed customer commitments.',
     tone:'strong', tag:'Measurable impact',
     answers:[0,2,3,4],
     obs:'Yes — delivery under changed conditions, which is the behaviour that matters.',
     meas:'Yes. Four projects, revised deadlines met, zero missed customer commitments.',
     miss:'Over what period, and how the revised deadlines were set. Ask, but do not discard.',
     why:'&ldquo;After scope changed&rdquo; is doing the work here. It tells you the result held under pressure rather than under ideal conditions.'}
  ],
  note:'If you genuinely do not have a specific example, that is useful information in itself: <strong>missing evidence is a real finding</strong>, not a gap to fill with an impression.',
  src:'Slide 20 &middot; Participant Guide, Evidence Checklist',
  fac:{
    purpose:'Introduces the seven evidence questions and trains the room to read a statement for what it can and cannot support — before they meet the Jordan case.',
    keys:['A rating is only as strong as the evidence behind it.',
      'Specific is not the same as sufficient — one event is not a pattern.',
      'Absolute words (always, never) usually mean no example came to mind.',
      '&ldquo;I feel&rdquo; and &ldquo;people say&rdquo; report the rater, not the employee.',
      'Missing evidence is a real finding.'],
    say:'TMR decisions have to be grounded in facts, not impressions. Here are seven questions. They are not a form to fill in — they are how you find out whether what you are about to say in a calibration room will survive being questioned. I am going to put five statements on the screen. Some of them are strong. Some of them are not. One of them is going to feel strong and is not, and that is the one I want you to watch for.',
    delivery:'Show the seven questions first, briefly. Then work the statements one at a time, in order — they are sequenced from worst to best deliberately. Ask the room before you open each one: what is observable, what is measurable, what is missing. Open the analysis only after the room has answered. Five minutes total; do not turn this into a lecture on each statement.',
    interaction:'The third statement — the single stakeholder update — is the teaching moment. Most rooms accept it because it is specific. Let them accept it, then open it and show that specificity without frequency or impact is still not ratable.',
    tech:'Participant phones hold the seven questions as a reference for the rest of the session. There is no answer box and nothing to submit — say so plainly, because people will look for one.',
    watch:'Do NOT rewrite a statement for the room here. The next scene is the shared rewrite at the whiteboard, and it only works if the room attempts it first.',
    qa:[['What if a leader genuinely doesn’t have specific examples on hand?',
      'Then that is the finding, and it is a legitimate one. Say &ldquo;I do not have the evidence yet&rdquo; rather than filling the gap with an impression. Leader Preparation, coming up, is built to close that gap before the conversation happens.'],
      ['Isn’t requiring all seven every time unrealistic?',
      'You will rarely have all seven. The questions are there so you know which ones you are missing, and can say so out loud — that is the difference between an incomplete rating and an unsupported one.']],
    next:'Let’s build one together.'
  }});

S({id:'evidence-build', ch:5, kind:'builder', min:7, who:'Lexi', noPhone:true,
  eyebrow:'Evidence Review &middot; Whiteboard',
  title:'Build one defensible statement together',
  purposeLine:'Practice building a defensible evidence statement together before evaluating the full Jordan case.',
  vague:'Jordan is a strong communicator.',
  ask:'Working as a room at the whiteboard: which of the seven questions does this statement fail, and how would you rewrite it so a calibration room could not dismantle it?',
  checklist:CHECKLIST,
  better:'Jordan presented weekly stakeholder updates for three consecutive quarters with zero escalations.',
  sortItems:[
    {t:'&ldquo;Jordan is a strong communicator.&rdquo;',a:'Impression'},
    {t:'&ldquo;Jordan presented weekly stakeholder updates for three consecutive quarters with zero escalations.&rdquo;',a:'Observable evidence'},
    {t:'&ldquo;Jordan presented a stakeholder update last week and it went well.&rdquo;',a:'Incomplete evidence'},
    {t:'&ldquo;Escalations on Jordan’s projects dropped from six per quarter to zero.&rdquo;',a:'Measurable impact'}
  ],
  note:'This is an exercise about how an evidence <em>statement</em> is built &mdash; not about classifying anyone. Nothing is submitted from your phone on this screen.',
  discuss:['&ldquo;Strong communicator&rdquo; is the most common sentence in talent conversations, and it is unratable.',
    'Same person, same claim, two versions — one you can defend in a calibration conversation and one you cannot.',
    'If you cannot answer the checklist, that is not a dead end. Missing evidence is a real finding.'],
  src:'Dual Facilitator Guide, Slide 20 approved example &middot; Participant Guide, Evidence Checklist',
  fac:{
    purpose:'The Facilitator Guide’s rewrite activity, run as a single shared exercise at the whiteboard rather than as individual typing on phones.',
    say:'One sentence, on the board: &ldquo;Jordan is a strong communicator.&rdquo; Nobody would blink at that in a talent conversation. Walk it through the seven questions with me and tell me what we actually know. Then we rebuild it together — I want the sentence a calibration room could not take apart.',
    delivery:'Write the vague statement on the whiteboard. Walk the seven questions aloud and mark which ones it fails — the room will tell you it fails all of them. Then take a rebuilt version from the room, out loud, and write it up. Only then reveal the stronger version on screen. Six minutes.',
    interaction:'Take the rewrite from the room verbally — do not let this become silent individual work. If the room stalls, prompt with one question at a time: what did Jordan actually do? How often? Over what period? What changed?',
    tech:'Phones stay on the waiting screen for this scene. It is deliberate: this is a whiteboard exercise and there is nothing to collect.',
    watch:'Let the room attempt the rewrite BEFORE you press Reveal the stronger version. All seven checklist items are legitimately missing from the original, so no selection the room makes is wrong.',
    note:'On the name: this example uses &ldquo;Jordan&rdquo; and so does the case study later. That repetition is in the approved source materials and has been preserved rather than silently changed. If asked: &ldquo;This one is about how the sentence is built. The case study later is the same employee, and these are the four competencies you will rate.&rdquo; Do not rename the employee.',
    backup:'This is already the no-technology version — whiteboard and discussion. Nothing to fall back to.',
    next:'Evidence protects against more than vague ratings — it also protects against bias.'
  }});

S({id:'bias', ch:5, kind:'bias', min:5, who:'Lexi',
  eyebrow:'Reducing bias',
  title:'Three tendencies, three structural safeguards',
  intro:'These are normal human tendencies that affect every rater, including us. Naming them is not an accusation. Work each situation, then see the safeguard.',
  cases:[
    {sit:'A leader is preparing ratings in December. The examples that come to mind most easily are all from the last three weeks.',
     bias:'Recency Bias',
     def:'Weighing the last few weeks over the full period.',
     safe:'Anchor ratings to examples from all four quarters.'},
    {sit:'A leader notices they consistently rate one team member higher than the others, and realises that person approaches problems much the way the leader does.',
     bias:'Affinity Bias',
     def:'Favoring people who remind you of yourself.',
     safe:'Rate against the scale, not personal comparison.'},
    {sit:'A team member is outstanding at one competency. On the rating sheet all of their other competencies came out high as well, without a specific example behind each one.',
     bias:'Halo / Horn Effect',
     def:'Letting one strong or weak trait color every rating.',
     safe:'Score each dimension separately.'}
  ],
  disclaimer:'General calibration best practice &mdash; not part of the official Competency Matrix.',
  after:`<div class="panel"><p class="kicker">The pattern</p><p style="margin:0">Every safeguard is
    <strong>structural</strong>. None of them is &ldquo;try harder to be fair.&rdquo; Structure,
    full-period evidence, and separate competency ratings are the correction.</p></div>`,
  src:'Slide 21 &middot; Participant Guide, Bias Check',
  fac:{
    purpose:'Names common rating biases as normal human tendencies to guard against, not accusations of unfairness.',
    keys:['Bias here means normal human tendencies — recency, affinity, halo/horn — not intentional unfairness.',
      'Structure and evidence are the correction: rating each competency separately, anchored to examples across the full period.'],
    delivery:'Be explicit up front that naming these is not an accusation — every rater is exposed to them, and the point is guardrails, not blame. Keep the slide’s own disclaimer visible in your framing.',
    interaction:'Ask which bias feels most familiar from their own experience rating people — keep it reflective, not confessional.',
    qa:[['Doesn’t naming bias imply our leaders are being unfair on purpose?',
      'No — these are normal, well-documented human tendencies that affect every rater. The goal is structural safeguards, not blame.'],
      ['How do we reduce favoritism?',
      'By reducing bias through structure: rating against the defined scale rather than personal comparison, anchoring to specific examples across the full period, and rating each competency separately.']],
    note:'The Participant Guide lists four further biases — tenure bias, effort versus impact, overreliance on one recent event, and horn effect separately. Those are optional debrief material only.',
    next:'Structure and shared evidence are also what make calibration possible.'
  }});

S({id:'calibration-intro', ch:5, kind:'prose', min:4, who:'Lexi',
  eyebrow:'Calibration',
  title:'What calibration is for',
  body:`
  <div class="grid g3">
    <div class="card"><h3>Shared Evidence</h3><p style="margin:0">Leaders bring specific examples
      supporting competency ratings and classifications.</p></div>
    <div class="card"><h3>Constructive Review</h3><p style="margin:0">Other leaders ask questions,
      identify missing evidence, and test whether definitions are being applied consistently.</p></div>
    <div class="card"><h3>Consistent Standards</h3><p style="margin:0">The same classification
      definitions and competency scale guide the discussion.</p></div>
  </div>
  <div class="panel" style="border-color:rgba(232,143,143,.34);background:rgba(232,143,143,.07)">
    <p class="kicker" style="color:#F3C0C0">Be precise about scope</p>
    <p>Calibration is the <strong>next step in strengthening consistency</strong> within
    Operations — the framework itself is established and in active use.</p>
    <p style="margin:0"><strong>Business Enablement has no formal calibration governance today.</strong>
    This session is about understanding the concept, not standing one up.</p>
  </div>
  <p class="small">General calibration best practice &mdash; not part of the official Competency Matrix.</p>`,
  src:'Slide 22',
  fac:{
    purpose:'Introduces calibration as the mechanism for testing consistency across leaders, and is precise about what Business Enablement has and has not established.',
    keys:['Calibration means leaders come together to compare evidence and test whether ratings are being applied consistently.',
      'Calibration is the next step in strengthening consistency within Operations; the TMR framework itself is established and mature.',
      'Business Enablement has no formal calibration governance today.'],
    delivery:'Introduce calibration as the mechanism that keeps standards consistent across leaders. Be precise about scope: the Operations framework is established and mature, and calibration is how consistency keeps strengthening there. What Business Enablement has not established is calibration governance — no decision authority exists for it today.',
    qa:[['Does Business Enablement already have a calibration process we should be following?',
      'Not today — Business Enablement hasn’t established a calibration process. This session introduces the concept as part of the foundation.']],
    next:'Before any of this reaches a real conversation, leaders need to prepare.'
  }});

S({id:'leader-prep', ch:5, kind:'prose', min:4, who:'Lexi',
  eyebrow:'Leader preparation',
  title:'Effective TMR conversations begin long before the meeting',
  body:`
  <ul class="tl">
    <li><h4>1 &middot; Review performance results and project outcomes</h4></li>
    <li><h4>2 &middot; Document specific behavioral examples</h4></li>
    <li><h4>3 &middot; Compare current competency levels with the target role</h4></li>
    <li><h4>4 &middot; Consider willingness, ability, and development timeline</h4></li>
    <li><h4>5 &middot; Identify where evidence is incomplete</h4></li>
    <li><h4>6 &middot; Review the full evaluation period for possible bias</h4></li>
  </ul>
  <div class="note">Preparation means reviewing evidence and identifying gaps <strong>before</strong>
  the conversation, not during it. Where evidence is thin, that’s a signal to gather more &mdash;
  not to guess.</div>`,
  src:'Slide 23 &middot; Participant Guide, Leader Preparation',
  fac:{
    purpose:'Gives leaders a concrete preparation checklist to walk into a real talent conversation ready.',
    keys:['Preparation means reviewing evidence and identifying gaps before the conversation, not during it.',
      'Leaders should be ready to name specific examples for every competency they rate.',
      'Where evidence is thin, that’s a signal to gather more — not to guess.'],
    delivery:'Walk through the steps as a practical checklist leaders can actually use before their own talent conversations. The same six steps are printed in the Participant Guide, so they do not need to write them down.',
    qa:[['How much time should we budget to prepare properly?',
      'Enough to gather specific evidence for each competency you plan to rate — the practice scenario coming up gives you a feel for the level of detail to aim for.']],
    handoff:{from:'Lexi',to:'Autumn',
      line:'We’ve built the evaluation foundation. Autumn will now guide us through a realistic Business Enablement scenario so we can apply it.'},
    next:''
  }});

/* ============================ CHAPTER 6 — JORDAN ======================== */

S({id:'jordan-intro', ch:6, kind:'jordanintro', min:6, who:'Autumn',
  eyebrow:'Executive Case Study',
  title:'The evidence on Jordan',
  intro:'Jordan is a Project Manager in Business Enablement, six years with the company and two years eight months in role. Everything on this screen is what her leader has on record. It is a realistic mixture: some of it is strong evidence, some of it is an impression that has been repeated often enough to sound like evidence, and some of what you need is simply not there.',
  profile:JORDAN_PROFILE,
  rows:JORDAN,
  structure:[
    ['In pairs','7 minutes','Rate all four competencies, name the evidence behind each rating and the evidence still missing, propose a classification, answer the 12-month question, and write your business case. One submission per pair.'],
    ['At your table','8 minutes','Compare reasoning with the pair next to you. You are comparing evidence, not votes.'],
    ['Full room','7 minutes','The distributions go up, then Autumn and Lexi present their own ratings — and you challenge them.']
  ],
  warn:'Jordan is <strong>fictional</strong>. No real employee is described here. The four competencies do <strong>not</strong> all land on the same level, and the classification is genuinely arguable &mdash; that is the point of the exercise, not a flaw in it.',
  src:'Slide 24 &middot; Participant Guide pp. 3&ndash;4, expanded',
  fac:{
    purpose:'Gives leaders a case with enough depth to be genuinely difficult: strong evidence, ambiguous evidence, and real gaps, on a person whose four competency levels are deliberately not the same.',
    keys:['Jordan is fictional. Say it once, clearly, at the start.',
      'The four competencies do not land on the same level — anyone rating all four the same has almost certainly stopped reading.',
      'Two of the stakeholder observations on record are impressions, not evidence. The room should notice.',
      'Missing evidence is a real finding and a legitimate answer.',
      'Jordan uses she/her throughout.'],
    say:'This is Jordan. She is fictional — nobody in this room is being described, and nothing here is drawn from a real employee record. She is a Project Manager in Business Enablement, six years with the company, two years and eight months in this role. What you are about to see is what her leader actually has on record: a performance history, a timeline, what six stakeholders have said, and where the evidence runs out. Some of it is strong. Some of it is the kind of sentence that sounds like evidence and is not. I want you to read it the way you would read it in a calibration room — which means reading for what is missing as carefully as for what is there.',
    delivery:'Reveal in order: the profile facts, the timeline, the four competencies with their evidence, then the stakeholder observations, then the gaps. Six minutes. Do not editorialise on which evidence is weak — the pairs need to find that themselves. Explain the pair structure BEFORE you open the activity.',
    interaction:'Before you open the activity, ask one question: which of these six stakeholder comments would not survive being questioned? Take two answers. Do not resolve it — they will come back to it.',
    tech:'Phones open automatically when you reach the rating screen. Say clearly: one phone per pair, one submission per pair. Otherwise you will get eighteen individual submissions and no paired discussion.',
    watch:'The Development of Others evidence is deliberately parked on the 2/3 boundary — coaching has begun, unprompted, with an observable result, but over six months and observed by one leader. Expect the room to split there. Do not resolve it for them.',
    note:'On the name: &ldquo;Jordan&rdquo; was also used in the evidence-rewrite exercise earlier. That repetition is in the approved source materials and has been preserved. It is the same fictional employee, which now makes the earlier exercise a deliberate warm-up rather than a coincidence.',
    qa:[['What’s the correct classification for Jordan?',
      'There is no single forced classification, and the evidence genuinely does not settle it. What we are examining is your reasoning and whether your evidence would survive being questioned.'],
      ['Can we ask for more information?',
      'Yes, and naming exactly what you would ask for is one of the strongest answers you can give. Just do not fill the gap with an assumption in the meantime.'],
      ['Is Jordan based on a real person?',
      'No. She is fictional, and deliberately so. Every project, date and figure was invented for this workshop.'],
      ['Should we rate on potential or on what we see?',
      'On observable evidence. Potential is the conclusion you draw from evidence — it is not itself evidence.']],
    next:'Find your partner. One phone between you.'
  }});

/* The rating form itself is deliberately NOT on the projected screen. The room
   screen holds Jordan's evidence, which is what pairs need to keep reading while
   they work; the form lives on the phone in their hand. Putting both on the wall
   was the old design and it meant the evidence scrolled away the moment anyone
   needed to check a rating. */
S({id:'jordan-worksheet', ch:6, kind:'worksheet', min:15, who:'Autumn',
  eyebrow:'Calibration Point',
  title:'Jordan &mdash; the evidence, while you work',
  profile:JORDAN_PROFILE,
  rows:JORDAN,
  classes:CLASSES,
  pairNote:'Work in pairs. <strong>One phone per pair, one submission per pair.</strong> The rating form is on your phone. This screen keeps Jordan’s evidence in front of you.',
  src:'Participant Guide pp. 3&ndash;4, digitised',
  fac:{
    purpose:'The centrepiece of the workshop. Pairs rate Jordan on their phone while the evidence stays readable on the room screen; results arrive anonymously and immediately.',
    say:'Find a partner. One phone between the two of you — one submission per pair, because I want you arguing with each other, not typing in parallel. The rating form is on your phone. Jordan’s evidence stays on this screen the whole time, so you do not need to remember any of it. Seven minutes, starting now.',
    delivery:'Open the activity, start the timer, and keep this screen on the evidence. At 7 minutes call table comparison. At 15 minutes bring the room back. Walk the room during the seven minutes and listen for pairs rating all four competencies the same — nudge those pairs to re-read.',
    phases:'At 7 minutes: &ldquo;Submit if you have not. Now compare with the pair beside you — eight minutes. You are comparing evidence, not votes.&rdquo; At 15 minutes: &ldquo;Bring it back.&rdquo;',
    interaction:'While pairs work, note two pairs who reasoned out loud well. You will want them by name-free reference in the debrief: &ldquo;one pair told me…&rdquo;',
    tech:'One phone per pair. Say it twice — once when you open the activity, once at the two-minute mark. The submitted count on your Live controls should land near half the room size, not the full room.',
    watch:'Written answers ARE displayed anonymously in the next scene when you choose to show them. The phone tells participants this before they type. Do not promise the room that written answers stay private — that is no longer true, and it was changed deliberately so the room can see each other’s reasoning.',
    backup:'The Participant Guide worksheet, pages 3–4, is the paper instrument. Take a show of hands per competency and per classification and use the facilitator tally in Live controls.',
    next:'Bring the room back and put the distributions up.'
  }});

S({id:'jordan-results', ch:6, kind:'jordanresults', min:12, who:'Autumn',
  eyebrow:'Calibration Point',
  title:'What this room said',
  rows:JORDAN,
  classes:CLASSES,
  challenge:'Autumn and Lexi will now present their own ratings. <strong>Listen for ratings that are not fully supported. If you disagree, raise your hand and challenge the rating constructively &mdash; just as leaders do during calibration.</strong>',
  discuss:['This room read the same evidence and did not land in the same place. That is the expected outcome, not a mistake.',
    'Where the spread is widest: what evidence drove your call?',
    'Which missing evidence stopped you being certain?',
    'Did we apply the same definition of each level consistently, or did the level move to fit the person?',
    'Where the room agreed — especially on the 12-month question — what made that one easier?'],
  src:'Aggregated from anonymous pair submissions. No participant names are collected or shown.',
  fac:{
    purpose:'Turns the room’s disagreement into the setup for calibration, and then models a calibration challenge with the facilitators as the ones being questioned.',
    keys:['Where the room aligned, and where it split.',
      'Which specific evidence drove the differences.',
      'Which missing evidence prevented certainty.',
      'Whether the level definitions were applied consistently, or bent to fit.'],
    say:'Before anyone tells me what they picked, look at the screen. Same evidence, same four competencies, and this room did not land in the same place. That is not a failure of this room — it is exactly why calibration exists. Where the spread is widest, I want to hear what evidence drove your call. And then Lexi and I are going to give you our ratings, and I want you to come after them.',
    delivery:'Distributions first, before anyone speaks. Work one competency at a time. Then show the written responses — evidence, then missing evidence, then business cases. Then present the facilitator ratings from the printed facilitator rating sheet and invite challenge. Twelve minutes.',
    phases:'Distributions (3 min) → written responses (3 min) → facilitator ratings and challenge (6 min).',
    interaction:'When a participant challenges a facilitator rating, ask them: &ldquo;What evidence supports your rating?&rdquo; and then &ldquo;What is your business case?&rdquo; Those two questions are the whole point of this section. Concede when their evidence is genuinely better — modelling a leader changing their mind is worth more than defending a rating.',
    watch:'This is not a trick exercise. Two of the facilitator ratings on the printed sheet are deliberately weak, and if the room does not challenge them, prompt: &ldquo;Nobody is going to question a 4 on Data Literacy?&rdquo; Do not let an unsupported rating stand unchallenged just because the room is being polite.',
    never:'Do not force a single final classification. If the evidence genuinely does not settle it, say so and leave it open. The honest ending is &ldquo;we would ask for more evidence before we finalised this.&rdquo;',
    note:'Written responses are displayed anonymously. Pairs were told this on their phones before they typed. If a response names a real person despite the instruction, skip it and say why — that is itself a teaching moment about what belongs in a talent record.',
    qa:[['So which classification was right?',
      'The evidence supports more than one defensible answer, and it does not fully support any of them. In a real calibration room the outcome here would be a request for more evidence on Development of Others before finalising.'],
      ['Why did the facilitators rate it differently from us?',
      'Some of our ratings were deliberately not well supported. That is what you were meant to catch — and several of you did.']],
    next:'With Jordan fresh in mind, let’s look at what calibration actually does with these differences.'
  }});

/* ============================ CHAPTER 7 — CALIBRATION & PLANS =========== */

S({id:'calibration-what', ch:7, kind:'prose', min:6, who:'Autumn',
  eyebrow:'Calibration mechanics',
  title:'What calibration actually does',
  body:`
  <div class="grid g2">
    <div class="card"><h3>Leaders compare evidence</h3><p style="margin:0">Ratings are discussed
      side by side using the specific examples behind them &mdash; not general impressions.</p></div>
    <div class="card"><h3>Ratings may be challenged</h3><p style="margin:0">Other leaders may ask
      questions about a rating and request additional evidence.</p></div>
    <div class="card"><h3>The goal is consistency</h3><p style="margin:0">The same classification
      definitions and competency scale apply the same way across every team.</p></div>
    <div class="card"><h3>More information may be requested</h3><p style="margin:0">If the evidence
      is thin, the leader is asked to gather more before a final decision is made.</p></div>
  </div>
  <div class="panel" style="border-color:rgba(232,143,143,.34);background:rgba(232,143,143,.07)">
    <p style="margin:0">Calibration is the next step in strengthening consistency
    <strong>within Operations</strong>. Business Enablement is <strong>learning the concept</strong>
    and may consider a future pilot &mdash; it is not running today.</p></div>`,
  src:'Slide 25',
  fac:{
    purpose:'Explains, mechanically, what calibration does with the classifications leaders just practiced on Jordan.',
    keys:['Calibration means comparing evidence side by side using specific examples, not general impressions.',
      'Ratings may be challenged, and if evidence is thin, the leader is asked to gather more before a final decision.',
      'The goal is consistency — the same definitions and scale applied the same way across every team.'],
    delivery:'Tie this directly back to the Jordan debrief — if the room landed on different classifications, that’s exactly the situation calibration works through. Then close with the scope framing.',
    watch:'Business Enablement has not established calibration governance and has no decision authority for this today. Do not imply otherwise.',
    qa:[['Who decides if leaders still disagree?',
      'Operations is still strengthening its calibration practice, and Business Enablement has not established decision governance. That is one of the future questions to address before a formal pilot.']],
    next:'Let’s put that into practice with two leaders who disagree.'
  }});

S({id:'calibration-challenge', ch:7, kind:'quiz', min:6, who:'Autumn', noPhone:true,
  eyebrow:'Leadership Decision',
  title:'Two leaders, same competency, different conclusions',
  intro:`<div class="grid g2" style="margin-bottom:6px">
    <div class="card tint"><p class="kicker">Leader A rates 3</p><p style="margin:0">&ldquo;She has
      coached two junior Project Managers over the past two quarters without being asked. I have sat
      in on two of those sessions. One of the two has since taken on their own project.&rdquo;</p></div>
    <div class="card tint"><p class="kicker">Leader B rates 2</p><p style="margin:0">&ldquo;She is
      helpful with the junior PMs. It feels informal to me rather than real coaching.&rdquo;</p></div>
  </div><p class="small">Both leaders have rated Jordan on <strong>Development of Others</strong>.
  This is not about who wins.</p>`,
  items:[
    {q:'Which leader has brought stronger evidence to the conversation?',
     opts:['Leader A','Leader B','They are equally strong','Not enough information'],a:0,
     fb:'<b>Leader A</b> — and note the question was about the <em>strength of the evidence</em>, not the correctness of the rating. Leader A brought specific behaviour, frequency, a defined period, direct observation, and an outcome. Leader B brought a genuine professional impression, but &ldquo;it feels informal to me&rdquo; is not something the room can examine. Leader B may still turn out to be right — they have just not yet brought evidence that can be compared.'},
    {q:'What should calibration ask next?',
     opts:['“What specific coaching did each of you observe, when, and what changed as a result?”',
           '“Which leader has more experience rating people?”',
           '“Should we average the two ratings to a 2.5?”',
           '“Whose team does Jordan sit closer to?”'],a:0,
     fb:'<b>Ask for the specific evidence.</b> Calibration compares evidence side by side using specific examples, not general impressions. It does not resolve a disagreement by seniority, by splitting the difference, or by proximity.'},
    {q:'Should the rating be finalised now, or should more evidence be gathered?',
     opts:['Gather more evidence before finalising','Finalise at 3 — Leader A had better evidence',
           'Finalise at 2 — be conservative','Escalate for a decision'],a:0,
     fb:'<b>Gather more evidence.</b> If the evidence is thin, the leader is asked to gather more before a final decision is made. Note what the right answer is <em>not</em>: it is not that the leader with better evidence wins by default, and it is not that a third party rules on it. The two leaders are also working the Level 2 / Level 3 boundary — informal support versus coaching and mentoring — which is exactly the kind of definitional question calibration exists to test.'}
  ],
  discuss:['The learning point is not who was right. It is what the conversation did.',
    'Leaders compared evidence, one rating was challenged constructively, both worked from the same definitions, and the outcome was a request for more information rather than a verdict.'],
  src:'Jordan’s approved evidence &middot; Quick Reference Guide Level 2 and Level 3 definitions',
  fac:{
    delivery:'About two minutes, then reveal all three together.',
    say:'And I want to be precise about scope. The Operations framework is established and mature. Calibration is the next step in strengthening consistency there. What Business Enablement has not established is calibration governance — there is no decision authority for this today. Who decides when leaders still disagree is one of the open questions we’ll come to at the end.',
    watch:'If the room chose &ldquo;finalise at 3 — Leader A had better evidence,&rdquo; that is the most instructive wrong answer in the workshop. Better evidence does not win by default; thin evidence means gather more.',
    note:'Neither rating is declared correct. Both positions are built only from Jordan’s approved evidence plus the Quick Reference Guide level definitions.',
    next:'Classification is only useful if it leads somewhere.'
  }});

S({id:'plans', ch:7, kind:'plans', min:9, who:'Autumn',
  eyebrow:'What classifications produce',
  title:'Three plan types',
  intro:'A classification is not a filing category. Each one produces a specific, owned plan.',
  cards:[
    {name:'HiPo Development Plan',tag:'1 of 3',person:'Maya',
     goal:'Prepare Maya for broader analytics leadership responsibilities within approximately 12 months.',
     actions:'Stretch assignments in cross-team reporting, mentoring from her director, and stakeholder-alignment opportunities.',
     acct:'The direct leader drives the plan, creates development opportunities, and reviews progress regularly. Senior Leadership reviews and approves the plan.'},
    {name:'Mid Potential Foundation Plan',tag:'2 of 3',person:'Devon',
     goal:'Build consistency in Devon, a Product Owner, before setting a promotion timeline — reassess in 12+ months.',
     actions:'Coaching on stakeholder influence and strategic prioritization through regular one-on-ones and performance management.',
     acct:'Not typically presented in TMR; leader coaches on an ongoing basis, with an optional check-in at midyear calibration.'},
    {name:'HiPro Expertise-Leverage Plan',tag:'3 of 3',person:'Priya',
     goal:'Maximize the impact and retention of Priya, an Innovation Engineer and the team’s deepest technical expert.',
     actions:'Formal mentoring of junior engineers, ownership of a technical standard, and leading the next innovation initiative.',
     acct:'Leader builds a utilization plan and reviews it with Senior Leadership to sustain impact and retention.'}
  ],
  src:'Slides 26&ndash;28',
  fac:{
    purpose:'Shows what each classification actually produces — a time-bound, owned plan.',
    keys:['HiPo is a focused 12-month readiness-development plan.',
      'Mid Potential is a longer coaching-based foundation plan — &ldquo;not typically presented&rdquo; does not mean ignored.',
      'HiPro is a utilization and retention plan focused on leveraging expertise rather than advancement.'],
    delivery:'Present the Goal and Leader Accountability for each. The Key Actions text is on screen — let the room read it. Do NOT deliver the three-plan side-by-side summary verbally: the next activity performs exactly that comparison.',
    pause:'Note the dual accountability — direct leader drives, Senior Leadership approves — worth a beat.',
    qa:[['Who owns a HiPo development plan?',
      'The direct leader builds and drives it day to day; Senior Leadership reviews and approves it.'],
      ['Does Devon eventually get reassessed?',
      'Yes — the plan calls for reassessment in 12+ months, with an optional check-in at midyear calibration.'],
      ['Who owns a HiPro utilization plan?',
      'The leader builds it and reviews it with Senior Leadership to sustain impact and retention.']],
    next:'Three plans, three classifications — plus a fourth we haven’t matched yet.'
  }});

S({id:'plans-match', ch:7, kind:'match', min:5, who:'Autumn',
  eyebrow:'Framework Application',
  title:'Match the classification to the leader focus',
  intro:'This is the &ldquo;so what&rdquo; of the whole afternoon. Every classification leads to action.',
  keys:['HiPo','Mid Potential','HiPro','Low Potential'],
  opts:[
    'Focused development plan closing specific competency gaps within approximately 12 months',
    'Coaching and foundational development over a longer period, more than 12 months',
    'Utilization — expertise leverage, mentoring, process ownership, initiative leadership',
    'Onboarding support when too new, or a performance and engagement plan when current evidence does not support growth'
  ],
  answers:[0,1,2,3],
  fbs:[
    '<b>HiPo → focused development plan.</b> Stretch assignments, mentoring, cross-functional leadership, regular progress reviews. The direct leader builds and drives it; Senior Leadership reviews and approves it.',
    '<b>Mid Potential → coaching and foundational development</b> over more than 12 months. Not typically presented in TMR, which does not mean ignored — coaching, smaller leadership opportunities, practice, feedback, and regular performance management continue, with a revisit at midyear calibration.',
    '<b>HiPro → utilization.</b> Mentoring, training, knowledge transfer, process ownership, initiative leadership. A deliberate strategy, not a consolation category.',
    '<b>Low Potential → onboarding support, or a performance and engagement plan,</b> depending on the reason. Not presented in TMR. Re-evaluate after additional tenure or sustained improvement — the classification reflects current evidence, not a permanent label.'
  ],
  after:`<div class="panel"><p class="kicker">The through-line</p><p style="margin:0"><strong>Every
    classification leads to meaningful action.</strong> None of the four is a filing category. And in
    every case the direct leader drives the plan and Senior Leadership reviews and approves it.</p></div>`,
  src:'Participant Guide development/utilization table &middot; Slide 16 Leader Mandate (Low Potential)',
  fac:{
    delivery:'About 90 seconds, then reveal. This activity performs the three-plan side-by-side summary.',
    watch:'Low Potential is the one most often missed, because it is the only classification not presented in TMR at all. Its actions are limited to what the source materials establish — onboarding support when too new, or a performance and engagement plan. Do not describe it as a formal development-plan category; the materials do not establish one.',
    backup:'Four show-of-hands votes against the lettered list.',
    handoff:{from:'Autumn',to:'Lexi',
      line:'We’ve seen how classifications should lead to meaningful action. Lexi will close by helping us consider what Business Enablement may need to address next.'},
    next:''
  }});

S({id:'break', ch:7, kind:'break', min:15, who:'Lexi',
  title:'15-minute break',
  sub:'Stretch, refill your coffee, and reset.',
  body:'We’ll resume with future Business Enablement considerations and close the session.',
  src:'Slide 29',
  fac:{
    delivery:'Announce the break and state the clock time you’ll resume — not just &ldquo;15 minutes.&rdquo; Note briefly what’s coming after.',
    pause:'Hold the room for questions before releasing — once the break starts, side questions are harder to gather back up.',
    watch:'The break is protected at 15 minutes. Shorten it only under the 30-minutes-behind plan, which reduces it to 10.',
    next:'Welcome back — let’s turn to what this means specifically for Business Enablement.'
  }});

/* ============================ CHAPTER 8 — FUTURE & CLOSE ================ */

S({id:'future', ch:8, kind:'prose', min:4, who:'Lexi',
  eyebrow:'Future Business Enablement considerations',
  title:'Questions to carry forward',
  body:`
  <p class="lede">These are discussion prompts to <strong>capture</strong>, not decisions to make
  today. Today’s session was the foundation &mdash; a future framework is a separate, deliberate
  planning effort.</p>
  <div class="grid g2">
    ${SIX_QUESTIONS.map((q,i)=>`<div class="card"><p class="kicker">0${i+1}</p>
      <p style="margin:0">${q}</p></div>`).join('')}
  </div>`,
  src:'Slide 30 &middot; Participant Guide, Future Business Enablement Considerations',
  fac:{
    purpose:'Surfaces the open questions Business Enablement needs to work through before any formal TMR framework of its own — without turning today into a design session.',
    keys:['These are discussion prompts to capture, not decisions to make today.',
      'Today’s session was the foundation — a future framework is a separate, deliberate planning effort.'],
    delivery:'Read the six questions as prompts in about two minutes, then open the prioritization so every person is counted rather than the most vocal few.',
    watch:'FACILITATION BOUNDARY — use it the moment discussion starts trying to design or decide: &ldquo;These are valuable ideas. I’m going to capture them as input for the next planning conversation rather than trying to resolve them today.&rdquo;',
    qa:[['When will Business Enablement actually build its own TMR framework?',
      'That timing is one of the questions for the next planning conversation — today was about building the foundation.'],
      ['Should we just adopt the Operations model as-is?',
      'Not necessarily as-is. Business Enablement would need to decide whether and how the Operations framework should be adapted to its roles and needs, which is exactly what these questions are meant to surface.']],
    next:'Let’s find out where this room would start.'
  }});

S({id:'future-rank', ch:8, kind:'rank', min:5, who:'Lexi',
  eyebrow:'Executive Priorities',
  title:'Which two should Business Enablement explore first?',
  prompt:'Select exactly <strong>two</strong>. You are giving input for the next planning conversation, not making a decision today.',
  options:SIX_QUESTIONS,
  pickCount:2,
  discuss:['That is where this room says to start — and every person in it is counted, not just the ones who spoke.',
    'Let’s spend our remaining time on the top two rather than trying to touch all six.',
    'We are surfacing questions, not designing a framework.'],
  src:'Slide 30, all six options verbatim',
  fac:{
    delivery:'About a minute to respond, then show the ranking and spend the remaining time on the top two.',
    say:'That’s where this room says to start — and every person in it is counted, not just the ones who spoke. Let’s spend our remaining time on the top two rather than trying to touch all six.',
    watch:'Export or photograph this ranking. It is a genuine deliverable from the session and belongs in the next planning conversation.',
    backup:'Two adhesive dots per person on a flip chart listing the six questions.',
    next:'Last check before we close.'
  }});

/* The empty chair.
   A facilitator-led visualisation, not a phone activity. The room's phones stay
   on the waiting screen and the projected screen carries only the story — no
   charts, no counters, nothing to read ahead. The whole scene is built to be
   spoken slowly in a dimmed room, which is why the reveals are one line at a
   time rather than one panel at a time. */
S({id:'empty-chair', ch:8, kind:'viz', min:12, who:'Lexi', noPhone:true,
  eyebrow:'Leadership Reflection',
  title:'The same question, three hours later',
  environment:['Dim the lights.',
    'Ask participants to close their eyes if they are comfortable doing so.',
    'Speak slowly. Leave the pauses in.',
    'No response charts on screen during the story.',
    'Allow silence. Do not fill it.'],
  lines:[
    'Picture yourself arriving at work on an ordinary morning.',
    'You find a parking space, start walking toward the building, and realise you have forgotten your badge. So you walk back to the car, return to the entrance, and finally make it inside.',
    'On the way to your desk you pass one of your leaders’ offices. The office is empty. It feels slightly unusual, but you keep walking.',
    'You sit down, open your laptop, and start working through your email. And there is a message from that leader.'
  ],
  mail:'I apologize for how sudden this is. Due to unforeseen circumstances, I am resigning effective immediately.',
  after:[
    'Your first thought is about the person. Are they alright? Has something happened?',
    'And then your eyes move to the empty chair.',
    'You start thinking about everything that person was carrying. Projects with deadlines this month. Decisions only they fully understood. Morning coverage. The questions their team brings them. Relationships with stakeholders who will notice by lunchtime. Work that is now going to land on you, and on other people who are already full.',
    'You think about the delays. The longer days. A team that is about to feel uncertain. Work that may have to start again, because the knowledge that made it possible walked out with one person.',
    'And then you start thinking about your own team. Who could step forward? Who might be ready?',
    'And when you try to prove that someone is ready — actually prove it, the way you would have to in a room full of other leaders — you realise you do not have the evidence to say so with confidence.'
  ],
  closeQ:'So what happens now?',
  askAfter:'As you worked through that scenario, what did you feel?',
  teaching:['TMR is not something leaders think about once a year when a form appears.',
    'Talent visibility has to be built throughout the year, not assembled in a week.',
    'Leaders should be gathering evidence continuously — a note after a meeting is worth more than an hour of recall in December.',
    'Development conversations belong in the ordinary rhythm of the work, not in an annual event.',
    'People should be stretched and prepared <em>before</em> a vacancy exists, not in response to one.',
    'Critical knowledge and leadership capability should never sit with only one person.',
    'Succession planning protects momentum, it protects the team, and it protects the business.',
    'Losing one good person should not be able to stop the operation.',
    'And without continuous talent development, you can lose someone good while never noticing someone great.'],
  landing:'TMR is not preparation for a meeting. It is the discipline of building readiness before the business is forced to test it.',
  src:'Closing scenario &middot; facilitator-led visualisation',
  fac:{
    purpose:'Turns three hours of framework into something the room feels rather than something they were taught. This is the emotional close, and it is what people will remember next month.',
    keys:['TMR is a continuous discipline, not an annual event.',
      'Evidence has to be gathered before it is needed.',
      'Readiness is built before the vacancy, not after.',
      'Critical capability sitting with one person is a business risk, not a compliment to that person.'],
    say:'I am going to ask you to do something slightly unusual for the last part of our time together. I would like you to put your pens down. If you are comfortable, close your eyes. And just listen. — [DIM THE LIGHTS] — Picture yourself arriving at work on an ordinary morning…',
    delivery:'Dim the lights BEFORE you start. Read one line per reveal, slowly. This script is written to be spoken, not summarised — read it as written. Pause fully after the resignation email, and again after &ldquo;you do not have the evidence to say so with confidence.&rdquo; Then ask the question and bring the lights back up. Twelve minutes including the discussion.',
    pause:'Three deliberate pauses: after the email (four seconds), after &ldquo;the empty chair&rdquo; (two seconds), and a long one after &ldquo;So what happens now?&rdquo; — at least five seconds, and it will feel much longer than that from the front of the room. Do not rescue it.',
    interaction:'Bring the lights up, then ask: &ldquo;As you worked through that scenario, what did you feel?&rdquo; Take three or four answers. Do not correct anyone and do not rush to the teaching point — the answers ARE the teaching point. Common ones: exposed, guilty, unprepared, and occasionally &ldquo;relieved, because I do have someone.&rdquo; That last one is worth drawing out.',
    tech:'Participant phones deliberately stay on the waiting screen for this entire scene. Nothing is collected until the confidence question on the next screen. Do not open an activity here.',
    watch:'Do not display any chart, count or result during the story. If the room is quiet after you ask what they felt, wait. The silence is doing the work — the first answer usually comes at about eight seconds.',
    never:'Do not shorten this scene, and do not summarise the script in your own words. It is the emotional close of a three-hour workshop and it is the reason the framework sticks.',
    qa:[['This feels uncomfortable — is that intentional?',
      'Yes. The discomfort is the point, and it is the same discomfort as the question we opened with three hours ago. The difference is that you now know what to do about it.'],
      ['What if I genuinely do have a ready successor?',
      'Then the question becomes: could you prove it in a room full of other leaders? And is that true for every critical role you own, or just the one you thought of first?']],
    next:'Let’s ask the opening question one more time.'
  }});

S({id:'confidence-close', ch:8, kind:'poll', min:5, who:'Lexi',
  eyebrow:'Leadership Reflection',
  title:'The same question, three hours later',
  callback:'<p class="cb-k">Think back to the very first question</p>'
    +'<p class="cb-q">&ldquo;If one of your key leaders left tomorrow, who could step into the '
    +'role? What evidence gives you confidence in that answer?&rdquo;</p>'
    +'<p class="cb-a">Same question. Three hours of evidence, classifications, bias and '
    +'calibration later. Has your confidence changed?</p>',
  prompt:'How confident are you that you could support a succession-readiness decision with objective evidence today?',
  note:'Worded identically to the question at the start of the session, so the comparison is valid.',
  options:['Not confident yet','Slightly confident','Moderately confident','Very confident','Fully confident'],
  compareWith:'poll-confidence',        // step id of the opening baseline
  discuss:['Group understanding across the six items, and how confidence moved.',
    'What matters most is where the group is weakest — that tells us where the material needs to be clearer, and what to bring to the next planning conversation.',
    'No individual results. No names. Group only.'],
  src:'Slide 2 question, repeated',
  fac:{
    delivery:'Open it, give 30 seconds, then show the open-versus-close comparison.',
    say:'Group understanding across the six items: read the percentage. Confidence opened at X and closed at Y. And here’s what I actually care about — the one or two lowest-scoring items. That’s not a comment on anybody in this room; it tells Autumn and me where this material needs to be clearer next time.',
    watch:'If confidence barely moved, say so honestly: &ldquo;Three hours doesn’t close an evidence gap. What it does is tell you what evidence to start collecting.&rdquo; Do not oversell the number.',
    never:'Never skip the confidence question, even under the 30-minutes-behind plan. It takes 30 seconds and it is the only before-and-after measure in the session.',
    next:'Let’s close the way we should.'
  }});

S({id:'reflection', ch:8, kind:'reflect', min:10, who:'Lexi',
  eyebrow:'Leadership Reflection',
  question:'What conversation about talent will you have differently after today?',
  sub:'Thank you for your participation.',
  src:'Slide 31 &mdash; question preserved exactly',
  fac:{
    purpose:'Closes the workshop by turning the framework back into a personal commitment from each leader in the room.',
    keys:['The goal is a personal commitment, not a group answer.',
      'Anonymous, and shown only if you choose to show it.'],
    say:'One question to finish, and it is the only one I want you to take out of this room with you. &ldquo;What conversation about talent will you have differently after today?&rdquo; — [LET IT SIT] — Answer it on your phone if you would like to. It is anonymous. And then I would like to read some of them back to you.',
    delivery:'Read the question and LET IT SIT. Hold a genuine 10–15 second silence before saying anything else — do not fill it. Then open the activity and give the room three minutes. When responses are in, reveal them and read three or four aloud. Close on thanks, not on a summary.',
    pause:'The silence after the question is the most important pause in the session. Ten to fifteen seconds, and resist every instinct to shorten it.',
    interaction:'Read three or four responses aloud, exactly as written. Do not comment on them or improve them. The room hearing their own commitments in each other’s words is the close.',
    tech:'Responses are anonymous and are displayed only when you press the reveal on this screen. Participants are told this on their phone before they type. Nothing is scored.',
    watch:'THIS IS PROTECTED — the full ten minutes, including the silence. If a response names a real employee, skip it rather than reading it.',
    never:'Do not turn this into a scored ending, a summary of the day, or a call for volunteers to speak. Calm close. Put the controls down and be present.',
    next:''
  }});

S({id:'appendix', ch:8, kind:'appendix', min:0, who:'Both',
  eyebrow:'Reference',
  title:'Backup Q&amp;A',
  intro:'Common questions Business Enablement leaders ask when they’re new to TMR. Reference material — not a scripted read-through.',
  qa:[
    ['What if a leader disagrees during calibration?','Leaders review the evidence and apply the agreed classification and competency definitions. Business Enablement will need to establish decision governance before piloting formal calibration.'],
    ['How is the “R” suffix used on the scale?','It flags that the expected level depends on the specific role, not a fixed number for everyone.'],
    ['What happens to Mid or Low Potential employees in TMR?','They aren’t presented in TMR; leaders manage them through regular coaching and performance management instead.'],
    ['Who approves a HiPo development plan?','The direct leader builds it; Senior Leadership reviews and approves it.'],
    ['Is this the same framework Operations uses, or will BE have its own version?','This session teaches Operations’ model as the foundation. Business Enablement will adapt it into a role-specific version, not adopt it unchanged.'],
    ['Why not just use performance reviews?','Performance reviews look at current-role results; TMR looks at future capability — potential, readiness, and expertise — so leaders can plan ahead, not just evaluate the past.'],
    ['Does HiPo guarantee promotion?','No. HiPo means a leader believes someone could realistically be ready within about 12 months with a focused development plan — it signals readiness to develop, not a guaranteed promotion.'],
    ['Can someone move between classifications?','Yes. Classifications reflect current evidence, not a permanent label, and are revisited as performance, readiness, and evidence change.'],
    ['Can someone be both HiPo and HiPro?','The two describe different trajectories. HiPro can show HiPo-like strengths but has reached a practical limit in ability or willingness to advance, while HiPo points toward near-term movement into a next role.'],
    ['What if an employee does not want to advance?','Willingness is part of the HiPo definition. Someone highly capable who doesn’t want to move up is likely a better fit for HiPro.'],
    ['Why is the 12-month limit important?','It’s what separates HiPo from Mid Potential: HiPo assumes any gaps are closeable in about 12 months, while Mid Potential is used when it would realistically take longer.'],
    ['Do employees know their classification?','The official framework does not specify how classifications should be communicated. Leaders should have transparent conversations about career interests, observable strengths, competency gaps, and development actions.'],
    ['What if there is not enough evidence?','Leader Preparation calls for identifying evidence gaps before the conversation. In calibration, if evidence is thin, the leader is asked to gather more before a final decision is made.'],
    ['Were our individual answers recorded?','No individual results are shown to anyone. Only group totals appear, and raw responses are not retained after the debrief.']
  ],
  routing:[
    ['Autumn leads','TMR definitions; performance, potential, readiness and expertise; the four classifications; the competency scale; development and utilization plans; Operations framework questions.'],
    ['Lexi leads','Session purpose; Business Enablement future considerations; process ownership; future planning; next-step discussions; meeting flow and timing.'],
    ['Both may answer','Bias; calibration concepts; leader preparation; the Jordan scenario; general leadership questions.']
  ],
  src:'Slide 32 &middot; Dual Facilitator Guide, Question Bank and Who Answers What',
  fac:{
    delivery:'Keep this in reserve. If a question surfaces that matches one of these, answer directly from here rather than improvising. Do not read the whole appendix aloud.',
    next:''
  }});
