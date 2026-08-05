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
     mandate:'Build a 12-month development plan tied to specific competency gaps. Review and approve it with your next-level leader.'},
    {n:2,name:'Mid Potential',full:'',tone:'info',
     def:'Shows some HiPo traits but lacks consistency, or would need more than 12 months to be ready for the next role.',
     pg:'Shows some HiPo characteristics but lacks consistency and/or would require more than 12 months to be ready for the next role.',
     ex:'Devon, a Product Owner, delivers well on familiar initiatives but is still building the stakeholder and strategic skills the next level needs.',
     mandate:'Not typically presented in TMR. Coach and develop through regular performance management; revisit at midyear calibration.'},
    {n:3,name:'HiPro',full:'High Professional',tone:'warn',
     def:'Highly capable in the current role and often shows HiPo-like strengths, but has reached a practical limit in ability or willingness to move up.',
     pg:'Best leveraged as a subject matter expert, mentor, trainer, stabilizer, process owner, or initiative lead.',
     ex:'Priya, an Innovation Engineer, is repeatedly brought into the organization’s most complex technical problems and is highly effective at teaching others, but has declined broader leadership roles.',
     mandate:'Build a utilization plan — mentoring, training, process ownership, or initiative leadership — that raises impact and retention. Review with your next-level leader.'},
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
  focused on behavioral growth. Today we zoom in on behavioral competencies because they are the
  common language across every Business Enablement function.</div>
  <div class="panel"><p class="kicker">The &ldquo;R&rdquo; suffix</p>
    <p style="margin:0"><strong>R</strong> &mdash; Indicates that the expected competency level
    varies depending on the specific role or responsibility. It is not a fixed number for everyone.</p></div>`,
  src:'Slide 17 &middot; Quick Reference Guide, Competency Framework',
  fac:{
    purpose:'Introduces the categories of competency Master Electronics rates, before drilling into behavioral competencies specifically.',
    keys:['The Competency Matrix groups competencies into basic, role-specific, technical, and behavioral categories.',
      'Today’s session focuses on behavioral competencies as the shared, cross-role language.',
      'Technical and role-specific competencies still matter, but they vary by function.'],
    delivery:'Name the categories at a glance, then tell the room we’re zooming in on behavioral competencies. Do not linger — this is a map screen.',
    qa:[['Will we cover technical competencies today too?',
      'Not in depth — today’s focus is the behavioral competencies and the 1–4 scale, since those are the shared language across roles.'],
      ['What does the &ldquo;R&rdquo; suffix mean?',
      'It flags that the expected competency level depends on the specific role rather than a single fixed number applied to everyone.']],
    next:'Let’s look at the behavioral competencies themselves.'
  }});

S({id:'comp-explorer', ch:5, kind:'explorer', min:4, who:'Lexi',
  eyebrow:'Reference',
  title:'All 19 behavioral competencies',
  intro:'The full list from the official 2026 Competency Matrix, with the plain-language Level 1 description for each. Search or filter — and note the four you will use on Jordan shortly.',
  src:'Slide 18 &middot; Quick Reference Guide, All 19 Behavioral Competencies',
  fac:{
    purpose:'Names the behavioral competencies that become the evidence vocabulary for the rest of the session.',
    keys:['Behavioral competencies include Strategic Awareness, Accountable to Results, Development of Others, Data Literacy, Adaptability, and Difficult Conversations.',
      'Four of them — Accountable to Results, Data Literacy, Development of Others, Strategic Awareness — are the ones rated in the Jordan practice scenario.',
      'The full list lives in the Master Electronics Competency Matrix and is in the Quick Reference Guide.'],
    delivery:'Read through the six named on the original slide briefly. You do not need to read all 19 aloud — point the room to the Quick Reference Guide and to this screen. Use the &ldquo;Used on Jordan&rdquo; filter to preview what is coming.',
    pause:'Pause after naming them to let people connect a competency or two to someone on their own team.',
    qa:[['Is this the complete list of competencies?',
      'These are the 19 behavioral competencies. The complete Matrix, including basic, role-specific and technical progression detail, lives in the Master Electronics Competency Matrix.']],
    next:'Now let’s look at how each of these actually gets rated.'
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
    delivery:'Walk the four levels in order, about three minutes. Be explicit that Level 1 is already independent routine performance. At Level 3 emphasise teaching others. At Level 4 emphasise root cause and lasting improvement. The concise wording on the main panel is what the room sees; the expanded Quick Reference Guide wording is the fuller explanation of the same four levels — they are not competing scales.',
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

S({id:'evidence', ch:5, kind:'prose', min:3, who:'Lexi',
  eyebrow:'Observable evidence',
  title:'Evidence, not impressions',
  body:`
  <p class="lede">TMR decisions must be grounded in <strong>facts</strong>, not impressions.
  A rating is only as strong as the evidence behind it.</p>
  <div class="grid g2">
    <div class="card"><p class="kicker">Strong evidence includes</p>
      <ul style="margin:0;padding-left:19px">
        <li>Quantifiable results tied to business outcomes</li>
        <li>Specific behaviors observed across multiple situations</li>
        <li>Cross-functional feedback from peers and stakeholders</li>
        <li>Demonstrated readiness under real conditions &mdash; not assumptions about potential</li>
      </ul></div>
    <div class="card tint"><p class="kicker">The seven-question evidence checklist</p>
      <ul style="margin:0;padding-left:19px" class="small">
        <li>What specific behavior did I observe?</li>
        <li>When did it occur?</li>
        <li>How often did it occur?</li>
        <li>What measurable impact did it have?</li>
        <li>Is this a pattern or a single event?</li>
        <li>What evidence would challenge my current view?</li>
        <li>What information is still missing?</li>
      </ul></div>
  </div>
  <div class="note">Vague impressions &mdash; &ldquo;good communicator,&rdquo; &ldquo;strong
  leader&rdquo; &mdash; aren’t ratable on their own. And if you genuinely don’t have a specific
  example, that is useful information in itself: <strong>missing evidence is a real finding.</strong></div>`,
  src:'Slide 20 &middot; Participant Guide, Evidence Checklist',
  fac:{
    purpose:'Trains leaders to convert vague impressions into observable, ratable evidence.',
    keys:['A rating is only as strong as the evidence behind it.',
      'Vague impressions aren’t ratable on their own.',
      'Observable evidence names what was done, how often, and what measurable impact it had.'],
    delivery:'Deliver the four evidence criteria in about two and a half minutes, then hand the work to the room.',
    watch:'CRITICAL: do NOT say the improved rewrite aloud on this screen. The next activity asks participants to rebuild the statement themselves, and the Facilitator Guide is explicit that the room must attempt it before the reveal.',
    qa:[['What if a leader genuinely doesn’t have specific examples on hand?',
      'That’s useful information itself — missing evidence is a real finding, and Leader Preparation, coming up, is built to close that gap before the conversation.']],
    next:'Let’s try it.'
  }});

S({id:'evidence-build', ch:5, kind:'builder', min:7, who:'Lexi',
  eyebrow:'Evidence Review',
  title:'Rewrite the statement',
  vague:'Jordan is a strong communicator.',
  ask:'Before you could rate that, what is missing? Select everything that applies — then rebuild the statement as observable evidence.',
  checklist:CHECKLIST,
  better:'Jordan presented weekly stakeholder updates for three consecutive quarters with zero escalations.',
  sortItems:[
    {t:'&ldquo;Jordan is a strong communicator.&rdquo;',a:'Impression'},
    {t:'&ldquo;Jordan presented weekly stakeholder updates for three consecutive quarters with zero escalations.&rdquo;',a:'Observable evidence'},
    {t:'&ldquo;Jordan presented a stakeholder update last week and it went well.&rdquo;',a:'Incomplete evidence'},
    {t:'&ldquo;Escalations on Jordan’s projects dropped from six per quarter to zero.&rdquo;',a:'Measurable impact'}
  ],
  note:'This is an exercise about how an evidence <em>statement</em> is built &mdash; not about classifying anyone.',
  discuss:['&ldquo;Strong communicator&rdquo; is the most common sentence in talent conversations, and it is unratable.',
    'Same person, same claim, two versions — one you can defend in a calibration conversation and one you cannot.',
    'If you cannot answer the checklist, that is not a dead end. Missing evidence is a real finding.'],
  src:'Dual Facilitator Guide, Slide 20 approved example &middot; Participant Guide, Evidence Checklist',
  fac:{
    purpose:'This IS the Facilitator Guide’s existing 60-second rewrite mini-activity, structured and captured.',
    delivery:'Let the room select what is missing and write their rewrite BEFORE you reveal the improved example. Do not skip straight to the answer.',
    say:'Look at what the room selected — you found essentially everything missing from a sentence that felt perfectly reasonable when you read it. Here’s the rebuilt version: &ldquo;Jordan presented weekly stakeholder updates for three consecutive quarters with zero escalations.&rdquo; Same person, same claim. One of those you can defend and one you cannot.',
    watch:'All seven checklist items are legitimately missing, which is why this part is unscored. There is no wrong selection.',
    note:'On the name: this example uses &ldquo;Jordan&rdquo; and so does the practice scenario later. That repetition is in the approved source materials and has been preserved rather than silently changed. If asked: &ldquo;This one is about how the sentence is built. The practice scenario later is a separate set of four competencies.&rdquo; Do not rename the scenario employee.',
    backup:'Read the four statements and take hands for each category. For the checklist, read the seven items and count hands.',
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

S({id:'jordan-intro', ch:6, kind:'jordanintro', min:4, who:'Autumn',
  eyebrow:'Guided practice',
  title:'Meet Jordan',
  intro:'Jordan is a Project Manager in Business Enablement. Using <strong>only the evidence below</strong>, you will rate each competency on the Master Electronics 1&ndash;4 scale — and be ready to defend your rating with a specific example.',
  rows:JORDAN,
  structure:[
    ['Individual','7 minutes','Rate all four competencies, note your evidence and what evidence you still need, propose a classification, and answer the 12-month question.'],
    ['Small group','8 minutes','Compare reasoning at your table. You are comparing evidence, not voting.'],
    ['Full group','7 minutes','Debrief with the anonymous distributions on screen.']
  ],
  warn:'There is <strong>no single forced correct classification</strong>. That is deliberate. What matters is how you reason from the evidence you were given, and where you would want more of it.',
  src:'Slide 24 &middot; Participant Guide pp. 3&ndash;4',
  fac:{
    purpose:'Gives leaders hands-on practice applying the framework to a realistic Business Enablement employee before they do it with their own people.',
    keys:['There is no single forced &ldquo;correct&rdquo; classification — the goal is sound reasoning from the evidence given.',
      'Pay close attention to where the evidence is incomplete — that’s as important as what the evidence shows.'],
    delivery:'Walk through the four competencies with observed evidence, then explain the individual, small-group and debrief structure BEFORE opening the worksheet. Be explicit that you are not looking for one right answer — you’re looking for how they reason from the evidence, and where they’d want more of it.',
    note:'On the name: &ldquo;Jordan&rdquo; was also used in the evidence-rewrite exercise earlier. That repetition is in the approved source materials and has been preserved. If anyone asks, keep it simple: &ldquo;That was an exercise about how a sentence is written. This is the practice scenario, and these four competencies are the evidence you’re working from.&rdquo;',
    watch:'This activity is protected. The 7 / 8 / 7 structure does not shorten. Under the 20-minutes-behind plan, small group goes 8→5 and debrief 7→5, but individual work stays at 7 minutes — that is where the reasoning practice happens.',
    qa:[['What’s the correct classification for Jordan?',
      'There isn’t one intended answer — the value is in the reasoning and in noticing where the evidence is thin.'],
      ['What if our group couldn’t agree?',
      'Disagreement is a useful, realistic outcome — it’s exactly the kind of gap calibration is meant to surface.']],
    next:'Open the worksheet and start the seven minutes.'
  }});

S({id:'jordan-worksheet', ch:6, kind:'worksheet', min:15, who:'Autumn',
  eyebrow:'Calibration Point',
  title:'Rate Jordan',
  rows:JORDAN,
  classes:CLASSES,
  src:'Participant Guide pp. 3&ndash;4, digitised',
  fac:{
    purpose:'The centrepiece of the workshop. Participants complete the worksheet on their own device; results appear instantly and anonymously.',
    delivery:'Open the activity, then run the clock. At 7 minutes call small-group discussion. At 15 minutes bring the room back and reveal the distributions.',
    say:'Your Participant Guide, pages 3–4, is where you work if you prefer paper. Seven minutes on your own, starting now.',
    phases:'At 7 minutes: &ldquo;Pens down, submit if you haven’t. Now compare at your table — eight minutes. You’re comparing evidence, not voting.&rdquo; At 15 minutes: &ldquo;Let’s come back together.&rdquo;',
    watch:'Nothing here is scored and there is no answer key. Do not create a correct answer during the debrief, however much the room asks for one. Written answers are collected but are NOT projected — they may reference real people despite the instruction.',
    backup:'The Participant Guide worksheet is already the primary instrument. Take a show of hands per competency and per classification and use the facilitator tally.',
    next:'Bring the room back and reveal what they collectively said.'
  }});

S({id:'jordan-results', ch:6, kind:'jordanresults', min:9, who:'Autumn',
  eyebrow:'What this room decided',
  title:'What this room said',
  rows:JORDAN,
  classes:CLASSES,
  discuss:['This room read the same four sentences and did not land in the same place — and that is the expected outcome, not a mistake.',
    'Where the spread is widest: what evidence drove your call, and what evidence do you wish you had?',
    'Notice where you agreed: many of you could not yet tell whether the gaps close in 12 months. That is the difference between HiPo and Mid Potential.'],
  src:'Aggregated from participant submissions. No names, no individual results.',
  fac:{
    purpose:'Turns the group’s disagreement into the setup for calibration.',
    delivery:'Show the distributions BEFORE anyone says what they picked. Work them one at a time. Draw out differing classifications and ask each table what evidence drove it — then do not converge on an answer.',
    say:'Before anyone tells me what they picked, look at the screen. This room read the same four sentences and did not land in the same place — and that is the expected outcome, not a mistake. Where the spread is widest, I want to hear what evidence drove your call, and just as importantly, what evidence you wish you had.',
    watch:'Resist the pull toward a single right answer. There isn’t one. What you can point out is where the room agreed — especially on the 12-month question.',
    next:'With Jordan fresh in mind, let’s look at what calibration actually does with those different classifications.'
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
     acct:'The direct leader drives the plan, creates development opportunities, and reviews progress regularly. The next-level leader reviews and approves the plan.'},
    {name:'Mid Potential Foundation Plan',tag:'2 of 3',person:'Devon',
     goal:'Build consistency in Devon, a Product Owner, before setting a promotion timeline — reassess in 12+ months.',
     actions:'Coaching on stakeholder influence and strategic prioritization through regular one-on-ones and performance management.',
     acct:'Not typically presented in TMR; leader coaches on an ongoing basis, with an optional check-in at midyear calibration.'},
    {name:'HiPro Expertise-Leverage Plan',tag:'3 of 3',person:'Priya',
     goal:'Maximize the impact and retention of Priya, an Innovation Engineer and the team’s deepest technical expert.',
     actions:'Formal mentoring of junior engineers, ownership of a technical standard, and leading the next innovation initiative.',
     acct:'Leader builds a utilization plan and reviews it with the next-level leader to sustain impact and retention.'}
  ],
  src:'Slides 26&ndash;28',
  fac:{
    purpose:'Shows what each classification actually produces — a time-bound, owned plan.',
    keys:['HiPo is a focused 12-month readiness-development plan.',
      'Mid Potential is a longer coaching-based foundation plan — &ldquo;not typically presented&rdquo; does not mean ignored.',
      'HiPro is a utilization and retention plan focused on leveraging expertise rather than advancement.'],
    delivery:'Present the Goal and Leader Accountability for each. The Key Actions text is on screen — let the room read it. Do NOT deliver the three-plan side-by-side summary verbally: the next activity performs exactly that comparison.',
    pause:'Note the dual accountability — direct leader drives, next-level leader approves — worth a beat.',
    qa:[['Who owns a HiPo development plan?',
      'The direct leader builds and drives it day to day; the next-level leader reviews and approves it.'],
      ['Does Devon eventually get reassessed?',
      'Yes — the plan calls for reassessment in 12+ months, with an optional check-in at midyear calibration.'],
      ['Who owns a HiPro utilization plan?',
      'The leader builds it and reviews it with the next-level leader to sustain impact and retention.']],
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
    '<b>HiPo → focused development plan.</b> Stretch assignments, mentoring, cross-functional leadership, regular progress reviews. The direct leader builds and drives it; the next-level leader reviews and approves it.',
    '<b>Mid Potential → coaching and foundational development</b> over more than 12 months. Not typically presented in TMR, which does not mean ignored — coaching, smaller leadership opportunities, practice, feedback, and regular performance management continue, with a revisit at midyear calibration.',
    '<b>HiPro → utilization.</b> Mentoring, training, knowledge transfer, process ownership, initiative leadership. A deliberate strategy, not a consolation category.',
    '<b>Low Potential → onboarding support, or a performance and engagement plan,</b> depending on the reason. Not presented in TMR. Re-evaluate after additional tenure or sustained improvement — the classification reflects current evidence, not a permanent label.'
  ],
  after:`<div class="panel"><p class="kicker">The through-line</p><p style="margin:0"><strong>Every
    classification leads to meaningful action.</strong> None of the four is a filing category. And in
    every case the direct leader drives the plan and the next-level leader reviews and approves it.</p></div>`,
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
  eyebrow:'Final reflection',
  question:'What conversation about talent will you have differently after today?',
  sub:'Thank you for your participation.',
  src:'Slide 31 &mdash; preserved exactly',
  fac:{
    purpose:'Closes the workshop by turning the framework back into a personal commitment for each leader in the room.',
    keys:['The goal is a personal takeaway, not a group answer.'],
    delivery:'Thank the room, then read the reflection question and LET IT SIT. Hold a genuine 10–15 second silence before inviting anyone to share. Do not fill the silence yourself.',
    watch:'THIS IS PROTECTED. No poll. No results. No group answer. Full 10 minutes including the silence. Writing is optional and private to each participant’s own device — nothing is collected, displayed or exported. Put the controls down and be present.',
    say:'That concludes today’s session. Thank you for your participation, your questions, and the perspective you brought to the conversation.',
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
    ['Who approves a HiPo development plan?','The direct leader builds it; the next-level leader reviews and approves it.'],
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
