/* ============================================================================
   TMR LEARNING EXPERIENCE — PRESENTATION ENGINE
   Master Electronics | INTERNAL

   Runs entirely in the browser. No server, no framework, no build step.
   Open index.html and present.

   Architecture note (for whoever extends this later):
     All room responses go through the Vote store below. Vote is the single
     seam where participant-device synchronisation can be added later without
     touching any scene, renderer or transition. See optional-live-sync/.
   ========================================================================= */
'use strict';

/* ---------------------------------------------------------------- sections */
const SECTIONS = [
  {n:1, t:'Opening and Context',        steps:['welcome','objectives','opening','poll-confidence']},
  {n:2, t:'What TMR Is',                steps:['succession','what-tmr','pr-tmr']},
  {n:3, t:'Four Talent Dimensions',     steps:['dimensions']},
  {n:4, t:'Talent Classifications',     steps:['classifications','class-sort']},
  {n:5, t:'Competencies & the 1–4 Scale',steps:['comp-categories','comp-explorer','scale','scale-quiz']},
  {n:6, t:'Evidence and Bias',          steps:['evidence','evidence-build','bias']},
  {n:7, t:'Leader Preparation',         steps:['leader-prep']},
  {n:8, t:'Jordan Practice Scenario',   steps:['jordan-intro','jordan-worksheet','jordan-results']},
  {n:9, t:'Calibration',                steps:['calibration-intro','calibration-what','calibration-challenge']},
  {n:10,t:'Development and Utilization',steps:['plans','plans-match','break']},
  {n:11,t:'Future Considerations',      steps:['future','future-rank']},
  {n:12,t:'Coming Full Circle',steps:['empty-chair','confidence-close','reflection','appendix']}
];

/* spatial layout — a serpentine journey across the world canvas */
const W = 6400, H = 4200;
const POS = [
  [520, 380],[2050, 300],[3560, 460],[5000, 340],
  [5060,1420],[3520,1560],[2000,1500],[560,1620],
  [640,2760],[2160,2820],[3700,2700],[5060,2780]
];
const SCENE_W = 1290, SCENE_H = 760;

/* ---------------------------------------------------------------- state */
const LS = 'tmr-live-v1';
const State = {
  i:0, rv:0, mode:'present', map:false, drawer:false,
  clockOn:false, clockMs:0, clockAt:0,
  votes:{}, notes:{}, done:{}
};

function save(){
  try{ localStorage.setItem(LS, JSON.stringify({
    i:State.i, rv:State.rv, votes:State.votes, notes:State.notes,
    done:State.done, clockMs:elapsed(), clockOn:false
  })); }catch(_){}
}
function load(){
  try{
    const d = JSON.parse(localStorage.getItem(LS)||'{}');
    if(!d) return;
    if(typeof d.i==='number') State.i = Math.min(Math.max(0,d.i), STEPS.length-1);
    if(typeof d.rv==='number') State.rv = d.rv;
    State.votes = d.votes||{}; State.notes = d.notes||{}; State.done = d.done||{};
    State.clockMs = d.clockMs||0;
  }catch(_){}
}

/* ---------------------------------------------------------------- UI mirror
   Everything the ROOM can see change without the scene or the reveal index
   changing lives here: an expanded competency definition, an opened
   classification card, a revealed teaching point, a selected filter, the
   written responses the facilitator chose to show.

   Why a store rather than DOM events: the projected display is a second
   browser. It cannot observe a click on the presenter's laptop, so anything
   that is only held in the DOM is invisible to it — which is precisely why
   reveals, popups and expanded definitions used to appear on the console and
   not on the screen the room was watching. Routing them through one
   serialisable object means the display mirrors them for free, and a refresh
   on either side rebuilds them from the server.

   Keys are `stepId::something` so they stay stable across a re-render.        */
const UI = {
  s: {},
  applying: false,                 // guard: applying remote state must not re-post
  get(k, d){ const v = UI.s[k]; return v === undefined ? d : v; },
  set(k, v){
    if(UI.applying) return;
    if(UI.s[k] === v) return;
    UI.s[k] = v;
    UI.push();
  },
  toggle(k){ UI.set(k, !UI.get(k)); },
  /** Replace the whole store from the server, then repaint the current scene. */
  adopt(o){
    UI.s = (o && typeof o === 'object') ? o : {};
    UI.applying = true;
    try { applyUI(); } finally { UI.applying = false; }
  },
  push(){ if(window.LIVE && window.LIVE.onUI) window.LIVE.onUI(UI.s); }
};

/** Re-apply the mirrored interaction state onto the current scene's DOM. */
function applyUI(){
  const s = step();
  if(!s || !s._in) return;
  $$('details', s._in).forEach((d,idx)=>{ d.open = !!UI.get(s.id+'::d'+idx); });
  if(typeof s._applyUI === 'function') s._applyUI();
}

/** Give every <details> in a freshly rendered scene a mirrored open state. */
function wireDetails(s, c){
  $$('details', c).forEach((d,idx)=>{
    const k = s.id+'::d'+idx;
    d.open = !!UI.get(k);
    d.addEventListener('toggle', ()=> UI.set(k, d.open));
  });
}

/* ---------------------------------------------------------------- vote store
   The single integration seam. Counts are keyed by step id + question key.
   `add` is what the facilitator's taps call today; a sync adapter can call the
   exact same function when participant devices are wired up later.          */
const Vote = {
  key(stepId,k){ return stepId+'::'+(k||'q'); },
  bag(stepId,k){
    const key = Vote.key(stepId,k);
    if(!State.votes[key]) State.votes[key] = {};
    return State.votes[key];
  },
  add(stepId,k,value,by){
    const b = Vote.bag(stepId,k);
    b[value] = Math.max(0,(b[value]||0) + (by===undefined?1:by));
    save();
  },
  set(stepId,k,arr,labels){
    const b = {};
    labels.forEach((l,idx)=>{ if(arr[idx]) b[idx] = arr[idx]; });
    State.votes[Vote.key(stepId,k)] = b; save();
  },
  clear(stepId,k){ delete State.votes[Vote.key(stepId,k)]; save(); },
  total(stepId,k){
    const b = Vote.bag(stepId,k); let t=0;
    for(const x in b) t += b[x]; return t;
  },
  counts(stepId,k,n){
    const b = Vote.bag(stepId,k), out=[];
    for(let i=0;i<n;i++) out.push(b[i]||0);
    return out;
  },
  avg(stepId,k,values){
    const b = Vote.bag(stepId,k); let s=0,t=0;
    values.forEach((v,i)=>{ const c=b[i]||0; s+=v*c; t+=c; });
    return t? s/t : null;
  }
};

/* ---------------------------------------------------------------- helpers */
const $ = (s,r)=> (r||document).querySelector(s);
const $$ = (s,r)=> Array.from((r||document).querySelectorAll(s));
const el = (t,c,h)=>{ const n=document.createElement(t); if(c)n.className=c;
  if(h!==undefined)n.innerHTML=h; return n; };
const esc = (s)=> String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const step = ()=> STEPS[State.i];
const sectionOf = (id)=> SECTIONS.findIndex(s=>s.steps.includes(id));
const pad = (n)=> (n<10?'0':'')+n;
function elapsed(){ return State.clockMs + (State.clockOn? Date.now()-State.clockAt : 0); }
function fmtMs(ms){
  const s = Math.max(0,Math.floor(ms/1000));
  return Math.floor(s/60)+':'+pad(s%60);
}
let flashT;
function flash(msg){
  const f = $('#flash'); f.innerHTML = msg; f.classList.add('up');
  clearTimeout(flashT); flashT = setTimeout(()=>f.classList.remove('up'), 3600);
}

/* ---------------------------------------------------------------- build world */
function buildWorld(){
  const world = $('#world');
  world.style.width = W+'px'; world.style.height = H+'px';

  // connector paths between section centres
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns,'svg');
  svg.setAttribute('class','paths');
  svg.setAttribute('viewBox','0 0 '+W+' '+H);
  let d = '';
  POS.forEach((p,i)=>{
    const cx = p[0]+SCENE_W/2, cy = p[1]+SCENE_H/2;
    if(i===0){ d += `M ${cx} ${cy}`; }
    else{
      const q = POS[i-1], px = q[0]+SCENE_W/2, py = q[1]+SCENE_H/2;
      const mx = (px+cx)/2, my = (py+cy)/2 + (i%2? 160 : -160);
      d += ` Q ${mx} ${my} ${cx} ${cy}`;
    }
  });
  const path = document.createElementNS(ns,'path');
  path.setAttribute('d', d);
  svg.appendChild(path);
  world.appendChild(svg);

  // section landmarks + map nodes
  SECTIONS.forEach((sec,si)=>{
    const p = POS[si];
    const lm = el('div','landmark');
    lm.id = 'lm'+si;
    lm.style.left = p[0]+'px';
    lm.style.top = (p[1]-178)+'px';
    lm.innerHTML = esc(sec.t)+'<small>SECTION '+sec.n+'</small>';
    world.appendChild(lm);

    const node = el('div','mapnode');
    node.id = 'mn'+si;
    node.style.left = p[0]+'px';
    node.style.top = (p[1]+SCENE_H/2-46)+'px';
    node.innerHTML = `<div class="mn">SECTION ${sec.n}</div><div class="mt">${esc(sec.t)}</div>
      <div class="md">${sec.steps.length} scene${sec.steps.length>1?'s':''}</div>`;
    node.addEventListener('click', ()=>{
      const idx = STEPS.findIndex(s=>s.id===sec.steps[0]);
      if(idx>=0){ State.map=false; $('#viewport').classList.remove('mapview');
        $('#mapBtn').classList.remove('on'); goto(idx,1); }
    });
    world.appendChild(node);
  });

  // scenes
  STEPS.forEach((s,i)=>{
    const si = sectionOf(s.id);
    const withinSection = SECTIONS[si].steps.indexOf(s.id);
    const p = POS[si];
    const off = withinSection * 190;                    // fan scenes inside the area
    const sc = el('div','scene');
    sc.id = 'sc-'+s.id;
    sc.style.width = SCENE_W+'px';
    sc.style.height = SCENE_H+'px';   // fixed frame: keeps the camera scale readable
    sc.style.left = (p[0]+off)+'px';
    sc.style.top = (p[1]+off*0.42)+'px';
    sc.setAttribute('data-i', i);
    const inner = el('div','scene-in');
    const pad = el('div','scene-pad');       // margin-block:auto centres short scenes
    inner.appendChild(pad);
    sc.appendChild(inner);
    world.appendChild(sc);
    s._el = sc; s._in = pad; s._built = false;
  });
}

/* ---------------------------------------------------------------- camera
   `snap` skips the flight animation. Used on first paint and on resize: a CSS
   transition only advances while the compositor is running, so an animated
   first paint can leave the screen blank on a display that has just been
   connected. Snapping first, animating afterwards, is always safe.            */
function applyCam(tf, snap){
  const world = $('#world');
  if(snap){
    world.classList.add('snap');
    world.style.transform = tf;
    void world.offsetHeight;                       // force the value to take effect
    requestAnimationFrame(()=> world.classList.remove('snap'));
  } else {
    world.style.transform = tf;
    // self-heal: if the transition never advanced, snap to the target
    clearTimeout(applyCam._t);
    applyCam._t = setTimeout(()=>{
      const got = getComputedStyle(world).transform;
      if(got === 'matrix(1, 0, 0, 1, 0, 0)' && tf.indexOf('scale(1)') < 0){
        world.classList.add('snap');
        world.style.transform = tf;
        void world.offsetHeight;
        requestAnimationFrame(()=> world.classList.remove('snap'));
      }
    }, 1300);
  }
}

let camReady = false;
function camera(snap){
  if(!camReady) snap = true;      // first paint always snaps
  const vp = $('#viewport');
  if(vp.scrollLeft || vp.scrollTop){ vp.scrollLeft = 0; vp.scrollTop = 0; }
  const vw = vp.clientWidth || 1280, vh = vp.clientHeight || 720;

  if(State.map){
    const s = Math.min(vw/(W+380), vh/(H+380));
    const x = (vw - W*s)/2, y = (vh - H*s)/2;
    applyCam(`translate(${x}px,${y}px) scale(${s})`, snap);
    camReady = true;
    return;
  }
  const s = step(), r = s._el;
  const sw = r.offsetWidth || SCENE_W, sh = r.offsetHeight || SCENE_H;
  const inset = Math.min(vw,vh) > 900 ? 96 : 34;
  // clamp: a hidden or zero-height viewport must never yield a zero/negative scale
  const sc = Math.max(0.12, Math.min((vw-inset*2)/sw, (vh-inset*2)/sh, 1.06));
  const cx = parseFloat(r.style.left) + sw/2;
  const cy = parseFloat(r.style.top) + sh/2;
  const x = vw/2 - cx*sc, y = vh/2 - cy*sc;
  applyCam(`translate(${x}px,${y}px) scale(${sc})`, snap);
  camReady = true;
}

/* ---------------------------------------------------------------- reveals */
function revealCount(){ return $$('[data-rv]', step()._in).length; }
function paintReveals(){
  const pad = step()._in;
  const box = pad.parentElement;                  // .scene-in, the scroll container
  const items = $$('[data-rv]', pad);
  items.forEach((n,idx)=>{
    if(idx < State.rv) n.classList.add('shown'); else n.classList.remove('shown');
  });
  // centre only when everything fits, otherwise top-align and scroll
  if(box) box.classList.toggle('fits', pad.scrollHeight <= box.clientHeight + 1);
  // Keep the newest reveal in view by scrolling ONLY its own container.
  // scrollIntoView() would also scroll the .viewport ancestor and drag the
  // whole spatial canvas sideways.
  const last = items[State.rv-1];
  if(last && box){
    const bt = box.getBoundingClientRect(), lt = last.getBoundingClientRect();
    if(lt.bottom > bt.bottom - 6)      box.scrollTop += (lt.bottom - bt.bottom) + 26;
    else if(lt.top < bt.top + 6)       box.scrollTop -= (bt.top - lt.top) + 26;
  }
}

/* ---------------------------------------------------------------- navigation */
function goto(i, rv){
  i = Math.max(0, Math.min(STEPS.length-1, i));
  const changed = i !== State.i;
  State.i = i;
  const s = step();
  if(!s._built){ render(s); s._built = true; }
  // Landing on a scene always shows its headline. rv is 1-based: 0 would leave
  // the projected screen blank, which is never what a facilitator wants.
  const total = revealCount();
  State.rv = (rv===undefined || rv===0) ? 1 : (rv < 0 ? total : rv);
  State.rv = Math.max(1, Math.min(State.rv, total || 1));

  STEPS.forEach((t,idx)=>{
    t._el.classList.toggle('on', idx===i);
    const sameSec = sectionOf(t.id)===sectionOf(s.id);
    t._el.classList.toggle('near', idx!==i && sameSec);
  });
  SECTIONS.forEach((sec,si)=>{
    const lit = si===sectionOf(s.id);
    $('#lm'+si).classList.toggle('lit', lit);
    const mn = $('#mn'+si);
    mn.classList.toggle('here', lit);
    mn.classList.toggle('done', !!State.done['sec'+si] && !lit);
  });
  State.done['sec'+sectionOf(s.id)] = true;

  paintReveals();
  camera();
  chrome();
  drawer();
  save();
  healScenes();
  liveStage();
  if(changed) document.title = s.title ? stripTags(s.title)+' — TMR' : 'TMR Learning Experience';
}

/* The single place the live layer is told where the room is.
   It must be called from EVERY path that changes what the audience sees —
   scene change, forward reveal, back navigation, map toggle. A reveal that
   updates State.rv and repaints locally without coming through here is a
   reveal the projected display never learns about, which was the original
   synchronisation defect. */
function liveStage(){
  if(window.LIVE && window.LIVE.onStage) window.LIVE.onStage(State.i, State.rv);
}
function stripTags(h){
  const d = el('div','',String(h));
  return (d.textContent||'').replace(/\s+/g,' ').trim();
}

/* Some reveals are empty containers that fill in later (a results box, a
   facilitator-only panel in presentation mode). Skip them so Continue never
   appears to do nothing. */
function skipEmpty(dir){
  const items = $$('[data-rv]', step()._in);
  let guard = 0;
  while(guard++ < 12){
    const cur = items[State.rv-1];
    if(!cur || cur.offsetHeight > 4) break;
    const nx = State.rv + dir;
    if(nx < 1 || nx > items.length) break;
    State.rv = nx;
  }
}

function next(){
  if(State.map){ toggleMap(false); return; }
  const total = revealCount();
  if(State.rv < total){
    State.rv++; skipEmpty(1); paintReveals(); save(); chrome(); liveStage(); return;
  }
  if(State.i < STEPS.length-1) goto(State.i+1, 1);
  else flash('<b>That is the end of the experience.</b> Thank you.');
}
function back(){
  if(State.map){ toggleMap(false); return; }
  if(State.rv > 1){
    State.rv--; skipEmpty(-1); paintReveals(); save(); chrome(); liveStage(); return;
  }
  if(State.i > 0) goto(State.i-1, -1);
}
function toggleMap(force){
  State.map = (force===undefined)? !State.map : force;
  $('#viewport').classList.toggle('mapview', State.map);
  $('#mapBtn').classList.toggle('on', State.map);
  camera(); chrome();
  UI.set('__map', !!State.map);
}

/* Scene opacity relies on a CSS transition, and a transition only advances while
   the compositor is running. On a display that has just been connected, or a
   throttled background tab, that can leave the active scene at opacity 0 — a
   blank projected screen. This verifies the end state and forces it if needed. */
function healScenes(){
  clearTimeout(healScenes._t);
  healScenes._t = setTimeout(function(){
    const on = step()._el;
    if(!on) return;
    if(parseFloat(getComputedStyle(on).opacity) < 0.95){
      STEPS.forEach(t=>{
        const el2 = t._el;
        el2.style.transition = 'none';
        el2.style.opacity = el2.classList.contains('on') ? '1'
                          : (el2.classList.contains('near') ? '0.028' : '0');
      });
      void on.offsetHeight;
      requestAnimationFrame(()=> STEPS.forEach(t=>{ t._el.style.transition = ''; }));
    }
  }, 780);
}

/* ---------------------------------------------------------------- chrome */
function chrome(){
  const s = step();
  const prog = $('#prog');
  if(prog.children.length !== SECTIONS.length){
    prog.innerHTML = '';
    SECTIONS.forEach((sec,si)=>{
      const seg = el('div','pseg','<i></i>');
      seg.title = 'Section '+sec.n+' — '+sec.t;
      seg.addEventListener('click',()=>{
        const idx = STEPS.findIndex(t=>t.id===sec.steps[0]);
        if(idx>=0) goto(idx,1);
      });
      prog.appendChild(seg);
    });
  }
  const cur = sectionOf(s.id);
  $$('.pseg',prog).forEach((seg,si)=>{
    seg.classList.toggle('done', si < cur);
    seg.classList.toggle('here', si === cur);
  });

  const total = revealCount();
  const nb = $('#nextBtn'), nl = $('#nextLbl');
  if(State.map){ nl.textContent = 'Return to the presentation'; }
  else if(State.rv < total){ nl.textContent = 'Continue'; }
  else if(State.i < STEPS.length-1){
    const nx = STEPS[State.i+1];
    const nextSec = sectionOf(nx.id) !== cur;
    nl.textContent = nextSec ? ('Next: '+SECTIONS[sectionOf(nx.id)].t) : 'Continue';
  } else nl.textContent = 'End';
  nb.disabled = false;
  $('#backBtn').disabled = (State.i===0 && State.rv<=1 && !State.map);

  // cue bar — the one line the facilitator most needs, from the source notes
  const cue = $('#cue');
  const f = s.fac||{};
  const line = f.say || f.delivery || f.purpose || '';
  if(State.mode==='fac' && line && !State.map){
    cue.classList.remove('hide');
    $('#cueBody').innerHTML = line;
    $('#cueWho').textContent = s.who || '';
  } else cue.classList.add('hide');
}

/* ---------------------------------------------------------------- clock */
function tickClock(){
  const t = $('#clock');
  const ms = elapsed();
  t.textContent = fmtMs(ms);
  const target = STEPS.slice(0,State.i+1).reduce((a,b)=>a+(b.min||0),0);
  t.classList.toggle('run', State.clockOn);
  t.classList.toggle('over', ms/60000 > target + 4);
  t.title = `Session clock ${fmtMs(ms)} · planned to here ${target} min · click to `+
            (State.clockOn?'pause':'start')+', double-click to reset';
  const ft = $('#facTime');
  if(ft) ft.textContent = (step().min||0)+' min';
}

/* ---------------------------------------------------------------- drawer */
function drawer(){
  const s = step(), f = s.fac||{}, b = $('#drBody');
  $('#drWho').textContent = s.who ? ('Presenter: '+s.who) : '';
  let h = '';
  const sec = (t,v)=> v? `<h5>${t}</h5>${v}` : '';
  h += sec('Timing', `<p>${s.min||0} minute${s.min===1?'':'s'} for this scene &middot; planned
      cumulative ${STEPS.slice(0,State.i+1).reduce((a,x)=>a+(x.min||0),0)} min of 180</p>`);
  h += sec('Purpose', f.purpose? `<p>${f.purpose}</p>`:'');
  if(f.keys) h += `<h5>Key messages</h5><ul>${f.keys.map(k=>`<li>${k}</li>`).join('')}</ul>`;
  h += sec('Delivery', f.delivery? `<p>${f.delivery}</p>`:'');
  h += sec('Say this', f.say? `<div class="say">${f.say}</div>`:'');
  h += sec('Pause / cue', f.pause? `<p>${f.pause}</p>`:'');
  h += sec('Interaction cue', f.interaction? `<p>${f.interaction}</p>`:'');
  h += sec('Phase calls', f.phases? `<p>${f.phases}</p>`:'');
  if(f.watch) h += `<h5>Watch for</h5><div class="warnbox">${f.watch}</div>`;
  if(f.never) h += `<h5>Do not skip</h5><div class="warnbox">${f.never}</div>`;
  h += sec('Note', f.note? `<p>${f.note}</p>`:'');
  if(f.qa) h += `<h5>Likely questions</h5>`+f.qa.map(q=>
      `<div class="qa"><q>${q[0]}</q><p>${q[1]}</p></div>`).join('');
  h += sec('Backup — no technology', f.backup? `<p>${f.backup}</p>`:'');
  h += sec('If running behind', f.drop? `<p>${f.drop}</p>`:'');
  if(f.handoff) h += `<div class="handoffbox"><b>Handoff: ${f.handoff.from} &rarr;
      ${f.handoff.to}</b><br>&ldquo;${f.handoff.line}&rdquo;</div>`;
  h += sec('Transition', f.next? `<div class="say">${f.next}</div>`:'');
  h += sec('Source', s.src? `<p style="color:var(--ink-4);font-size:12.5px">${s.src}</p>`:'');
  b.innerHTML = h || '<p>No presenter notes for this scene.</p>';
  b.scrollTop = 0;
}
function toggleDrawer(force){
  State.drawer = (force===undefined)? !State.drawer : force;
  $('#drawer').classList.toggle('open', State.drawer);
  $('#facBtn').classList.toggle('on', State.mode==='fac');
}
function toggleFac(){
  State.mode = State.mode==='fac' ? 'present' : 'fac';
  document.body.classList.toggle('fac', State.mode==='fac');
  $('#facBtn').classList.toggle('on', State.mode==='fac');
  toggleDrawer(State.mode==='fac');
  chrome();
  flash(State.mode==='fac'
    ? '<b>Facilitator mode on.</b> Notes drawer and room-capture controls are visible. Press F to hide.'
    : '<b>Presentation mode.</b> The screen is clean for the room.');
}

/* ---------------------------------------------------------------- chart bits */
function barChart(labels, counts, opts){
  opts = opts||{};
  const total = counts.reduce((a,b)=>a+b,0);
  if(!total) return `<div class="chart-empty">No responses captured yet.
    ${State.mode==='fac'?'Use the room capture controls to record the room&rsquo;s answers.'
      :'The facilitator will open this shortly.'}</div>`;
  const max = Math.max.apply(null,counts);
  return '<div class="chart">'+labels.map((l,i)=>{
    const c = counts[i], pc = total? Math.round(c/total*100) : 0;
    const wid = max? (c/max*100) : 0;
    const cls = (opts.correct===i)?'row correct':(c===max&&c>0?'row hi':'row');
    return `<div class="${cls}"><div class="row-top"><span class="row-lab">${l}</span>
      <span class="row-val">${pc}% &middot; ${c}</span></div>
      <div class="row-bar"><i style="width:${wid}%"></i></div></div>`;
  }).join('')+`<p class="small" style="margin-top:14px">${total} response${total===1?'':'s'}
    &middot; anonymous &middot; group totals only</p></div>`;
}
function hist(labels, counts, avg){
  const max = Math.max(1, Math.max.apply(null,counts));
  const total = counts.reduce((a,b)=>a+b,0);
  return `<div class="hist">${counts.map((c,i)=>
      `<div class="hist-col"><div class="hist-bar" style="height:${(c/max*100)||2}%"></div>
       <div class="hist-lab"><b>${c}</b>${labels[i]}</div></div>`).join('')}</div>
    <p class="small">${total? 'Average '+avg.toFixed(2)+' &middot; '+total+' responses'
      : 'No responses captured yet'}</p>`;
}

/* room capture — facilitator records the room's answers on this device */
function roomCapture(stepId, key, labels, onChange){
  const wrap = el('div','room fac-only');
  function paint(){
    wrap.innerHTML = '';
    labels.forEach((l,i)=>{
      const row = el('div','room-row');
      row.innerHTML = `<span class="room-lab">${l}</span>
        <span class="room-n">${Vote.bag(stepId,key)[i]||0}</span>`;
      const minus = el('button','room-b','&minus;');
      const plus = el('button','room-b','+');
      minus.addEventListener('click',()=>{ Vote.add(stepId,key,i,-1); paint(); onChange&&onChange(); });
      plus.addEventListener('click', ()=>{ Vote.add(stepId,key,i, 1); paint(); onChange&&onChange(); });
      row.appendChild(minus); row.appendChild(plus);
      wrap.appendChild(row);
    });
    const q = el('div','room-quick');
    const inp = el('input'); inp.type='text';
    inp.placeholder = 'Quick entry: counts in order, e.g. '+labels.map((_,i)=>i+2).join(',');
    const set = el('button','go sub','Set');
    set.addEventListener('click',()=>{
      const arr = inp.value.split(/[,\s]+/).filter(Boolean).map(n=>parseInt(n,10)||0);
      if(!arr.length){ flash('Enter counts separated by commas.'); return; }
      Vote.set(stepId,key,arr,labels); inp.value=''; paint(); onChange&&onChange();
      flash('<b>Room counts recorded.</b> '+arr.reduce((a,b)=>a+b,0)+' responses.');
    });
    const clr = el('button','go sub','Clear');
    clr.addEventListener('click',()=>{ Vote.clear(stepId,key); paint(); onChange&&onChange(); });
    q.appendChild(inp); q.appendChild(set); q.appendChild(clr);
    wrap.appendChild(q);
  }
  paint();
  return wrap;
}

/* ---------------------------------------------------------------- renderers */
function render(s){
  const c = s._in;
  c.innerHTML = '';
  s._applyUI = null;
  const R = RENDER[s.kind] || RENDER.prose;
  R(s, c);
  // everything that should reveal progressively is tagged by the renderer;
  // if a renderer tagged nothing, treat the whole scene as one reveal.
  if(!$$('[data-rv]',c).length){
    Array.from(c.children).forEach(n=> n.setAttribute('data-rv',''));
  }
  // every expandable panel in the scene now mirrors to the projected display
  wireDetails(s, c);
}
/* The headline (eyebrow + title) is always ONE reveal — landing on a scene should
   never show a blank frame. Supporting copy reveals after it. */
function head(s, c, opts){
  opts = opts||{};
  const hd = el('div','');
  if(s.eyebrow) hd.appendChild(el('p','eyebrow', s.eyebrow));
  if(s.title)   hd.appendChild(el('h1','', s.title));
  if(hd.children.length){ hd.setAttribute('data-rv',''); c.appendChild(hd); }
  if(s.sub && opts.sub!==false){ const p = el('p','lede', s.sub); p.setAttribute('data-rv','');
    c.appendChild(p); }
  if(s.intro){ const p = el('p','lede', s.intro); p.setAttribute('data-rv',''); c.appendChild(p); }
  // Instructions belong immediately under the headline on every interactive
  // scene, before the first thing the room is asked to do. Placed here rather
  // than in each renderer so no interactive scene can be added later without
  // one. Scenes that need it lower down pass {instruct:false} and append it
  // themselves.
  if(s.instruct && opts.instruct!==false) c.appendChild(instructBlock(s.instruct));
}

const RENDER = {};

/* --- plain content: each top-level element becomes one facilitator reveal */
RENDER.prose = (s,c)=>{
  head(s,c);
  if(s.meta){ const m = el('p','small', s.meta); m.setAttribute('data-rv',''); c.appendChild(m); }
  if(s.body){
    const tmp = el('div','',s.body);
    Array.from(tmp.children).forEach(n=>{ n.setAttribute('data-rv',''); c.appendChild(n); });
  }
  if(s.src) c.appendChild(el('p','src','Source: '+s.src));
};
RENDER.hero = (s,c)=>{
  // the whole title block is a single reveal — this is the screen the room walks in to
  const id = el('div','');
  id.setAttribute('data-rv','');
  id.innerHTML = `<p class="eyebrow">Master Electronics &middot; Business Enablement</p>
    <h1>${s.title}</h1>
    <p class="lede" style="max-width:44ch">${s.sub}</p>
    <p class="small">${s.meta||''}</p>`;
  c.appendChild(id);
  const t = el('div','',s.body);
  Array.from(t.children).forEach(n=>{ n.setAttribute('data-rv',''); c.appendChild(n); });
};

/* --- the opening question, as a spatial focal point */
RENDER.question = (s,c)=>{
  c.innerHTML = `<p class="eyebrow" data-rv>${s.eyebrow}</p>
    <p class="bigq" data-rv>${s.q1}</p>
    <p class="bigq two" data-rv>${s.q2}</p>
    <div class="pause fac-only">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12"
        cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
      <div><b>Hold a full five-second silence here.</b> Let the discomfort do the work. Do not fill
      it.</div></div>
    <p class="src">Source: ${s.src}</p>`;
};

/* --- story beats, revealed one at a time */
RENDER.story = (s,c)=>{
  head(s,c);
  const ul = el('ul','tl');
  s.beats.forEach((b,i)=>{
    const li = el('li', i===s.beats.length-1?'now':'');
    li.innerHTML = `<p class="kicker">${b.k}</p><h4>${b.h}</h4><p>${b.p}</p>`;
    li.setAttribute('data-rv','');
    ul.appendChild(li);
  });
  c.appendChild(ul);
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- TMR is / is not */
RENDER.isnot = (s,c)=>{
  head(s,c);
  const g = el('div','split');
  g.innerHTML = `<div data-rv><div class="card tint"><p class="kicker" style="color:#A8E4C2">TMR is</p>
      ${s.is.map(x=>`<p style="font-size:18px;margin:0 0 12px">${x}</p>`).join('')}</div></div>
    <div data-rv><div class="card" style="border-color:rgba(232,143,143,.4);
      background:rgba(232,143,143,.07)"><p class="kicker" style="color:#F3C0C0">TMR is not</p>
      ${s.isnot.map(x=>`<p style="font-size:18px;margin:0">${x}</p>`).join('')}</div></div>`;
  c.appendChild(g);
  const n = el('div','note','TMR and performance reviews run alongside each other and answer '+
    'different questions.'); n.setAttribute('data-rv',''); c.appendChild(n);
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- four dimensions: a leadership scenario first, the vocabulary second */
RENDER.dimcards = (s,c)=>{
  head(s,c);
  // the scenario: each question is a reveal, its resolution is the next reveal
  (s.scenario||[]).forEach((b,i)=>{
    const q = el('div','sq'); q.setAttribute('data-rv','');
    q.innerHTML = `<p class="sq-n">Question ${i+1}</p><p class="sq-q">${b.q}</p>`;
    c.appendChild(q);
    const a = el('div','sa'); a.setAttribute('data-rv','');
    a.innerHTML = b.a;
    c.appendChild(a);
  });
  if(s.close){
    const cl = el('div','panel protect'); cl.setAttribute('data-rv','');
    cl.innerHTML = `<p style="margin:0;font-size:18px">${s.close}</p>`;
    c.appendChild(cl);
  }
  // the framework, assembled
  const assy = el('div','assy'); assy.setAttribute('data-rv','');
  assy.innerHTML = s.cards.map(d=>`<div class="pill in"><div class="pn">${d.name.toUpperCase()}</div>
    <div class="pd">${d.pg}</div></div>`).join('');
  c.appendChild(assy);
  s.cards.forEach(d=>{
    const det = el('details','exp'); det.setAttribute('data-rv','');
    det.innerHTML = `<summary><span class="exp-n">${d.n}</span>${d.name}</summary>
      <div class="body">
        <h4>What it is</h4><p>${d.what}</p>
        <h4>What good looks like</h4><p>${d.good}</p>
        <h4>How TMR uses it</h4><p>${d.uses}</p>
        ${d.flag?`<div class="note" style="margin:12px 0">${d.flag}</div>`:''}
        ${d.why?`<div class="why"><p class="why-k">Why this matters</p><p>${d.why}</p></div>`:''}
      </div>`;
    c.appendChild(det);
  });
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- classifications */
RENDER.classcards = (s,c)=>{
  head(s,c);
  s.cards.forEach(d=>{
    const det = el('details','exp');
    det.innerHTML = `<summary><span class="exp-n">${d.n}</span>${d.name}
      ${d.full?`<span class="chip ${d.tone}" style="margin-left:8px">${d.full}</span>`:''}</summary>
      <div class="body">
        <h4>Official definition</h4><p>${d.def}</p>
        <div class="note">Participant Guide adds: ${d.pg}</div>
        <h4>Illustrative Business Enablement example</h4><p>${d.ex}</p>
        <h4>Leader mandate</h4><p><strong>${d.mandate}</strong></p>
        ${d.why?`<div class="why"><p class="why-k">Why this matters</p><p>${d.why}</p></div>`:''}
      </div>`;
    det.setAttribute('data-rv','');
    c.appendChild(det);
  });
  if(s.discuss) c.appendChild(discussBlock(s.discuss));
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- plans */
RENDER.plans = (s,c)=>{
  head(s,c);
  s.cards.forEach(d=>{
    const det = el('details','exp');
    det.innerHTML = `<summary><span class="exp-n">${d.tag.split(' ')[0]}</span>${d.name}</summary>
      <div class="body"><h4>Goal</h4><p>${d.goal}</p>
      <h4>Key actions</h4><p>${d.actions}</p>
      <h4>Leader accountability</h4><p><strong>${d.acct}</strong></p></div>`;
    det.setAttribute('data-rv','');
    c.appendChild(det);
  });
  c.appendChild(el('p','src','Source: '+s.src));
};

function discussBlock(lines){
  const d = el('div','panel discuss');
  d.innerHTML = `<p class="kicker">Discussion</p><ul>${lines.map(l=>`<li>${l}</li>`).join('')}</ul>`;
  d.setAttribute('data-rv','');
  return d;
}

/* ---------------------------------------------------------------- instructions
   Every interactive scene now answers the same eight questions before the room
   is asked to do anything: why they are doing it, which device, what they
   submit, whether it is anonymous, whether there is a right answer, how long
   they have, what happens next, and what to be ready to discuss.

   This exists because "the facilitator will explain it" is not a design. In a
   room of executives the cost of an unclear instruction is not confusion, it is
   silence — people opt out rather than ask. Kept deliberately terse: this
   renders on a projected screen, and the participant phone carries the longer
   version where one is needed.

   `s.instruct` accepts any subset. Order is fixed so the room learns where to
   look. Language is executive by convention — Leadership Decision, Framework
   Application, Evidence Review, Calibration Point, Executive Prioritization,
   Leadership Reflection — and never Quiz, Game or exercise.                   */
const INSTRUCT_ROWS = [
  ['why',    'Why'],
  ['device', 'How'],
  ['submit', 'Submit'],
  ['anon',   'Privacy'],
  ['answer', 'Scoring'],
  ['time',   'Time'],
  ['after',  'Next'],
  ['ready',  'Be ready to']
];
function instructBlock(x){
  const rows = INSTRUCT_ROWS.filter(([k])=> x[k]);
  const d = el('div','howto');
  d.innerHTML = `<p class="kicker">How this works</p>
    <dl>${rows.map(([k,lab])=>
      `<div><dt>${lab}</dt><dd>${x[k]}</dd></div>`).join('')}</dl>`;
  d.setAttribute('data-rv','');
  return d;
}

/* --- poll (unscored) */
RENDER.poll = (s,c)=>{
  head(s,c);
  if(s.callback){
    const cb = el('div','callback'); cb.setAttribute('data-rv','');
    cb.innerHTML = s.callback;
    c.appendChild(cb);
  }
  const q = el('p','bigq two', s.prompt); q.setAttribute('data-rv',''); c.appendChild(q);
  if(s.note){ const n = el('div','note', s.note); n.setAttribute('data-rv',''); c.appendChild(n); }

  const opts = el('div','opts'); opts.setAttribute('data-rv','');
  s.options.forEach((o,i)=>{
    const b = el('button','opt');
    b.innerHTML = `<span class="mk">${i+1}</span><span>${o}</span><span class="tail"
      data-n="${i}">0</span>`;
    b.addEventListener('click',()=>{ Vote.add(s.id,'q',i); bump(b); paintPoll(); });
    opts.appendChild(b);
  });
  c.appendChild(opts);

  const cap = el('p','small'); cap.setAttribute('data-rv','');
  cap.innerHTML = 'Tap an option once per person as hands go up. '+
    '<span class="fac-only" style="display:inline">Room capture is also in the drawer.</span>';
  c.appendChild(cap);
  c.appendChild(roomCapture(s.id,'q',s.options, paintPoll));

  const res = el('div',''); res.id='pollRes'; res.setAttribute('data-rv','');
  c.appendChild(res);
  if(s.compareWith){ const cmp = el('div',''); cmp.id='pollCmp'; cmp.setAttribute('data-rv','');
    c.appendChild(cmp); }
  if(s.discuss) c.appendChild(discussBlock(s.discuss));
  c.appendChild(el('p','src','Source: '+s.src));

  function paintPoll(){
    s.options.forEach((_,i)=>{
      const t = $(`[data-n="${i}"]`, opts); if(t) t.textContent = Vote.bag(s.id,'q')[i]||0;
    });
    $('#pollRes', c).innerHTML = barChart(s.options, Vote.counts(s.id,'q',s.options.length));
    if(s.compareWith){
      const vals = [1,2,3,4,5];
      const a = Vote.avg(s.compareWith,'q',vals), b = Vote.avg(s.id,'q',vals);
      const box = $('#pollCmp', c);
      if(a===null && b===null){ box.innerHTML=''; return; }
      const d = (a!==null&&b!==null)? (b-a) : null;
      box.innerHTML = `<div class="compare">
        <div class="cbox"><p class="ck">At the start</p>
          <p class="cavg">${a!==null?a.toFixed(2):'&mdash;'}</p>
          <p class="cn">${Vote.total(s.compareWith,'q')} responses</p></div>
        <div class="arrow">&rarr;</div>
        <div class="cbox"><p class="ck">Now</p>
          <p class="cavg">${b!==null?b.toFixed(2):'&mdash;'}</p>
          <p class="cn">${Vote.total(s.id,'q')} responses</p></div></div>
        ${d!==null?`<div class="delta ${d>0.15?'up':'flat'}">${d>0?'+':''}${d.toFixed(2)}
          change in average confidence</div>`:''}`;
    }
  }
  paintPoll();
};
function bump(b){ b.animate([{transform:'scale(1)'},{transform:'scale(.97)'},
  {transform:'scale(1)'}],{duration:180}); }

/* --- rank (pick N) */
RENDER.rank = (s,c)=>{
  head(s,c);
  const q = el('p','lede', s.prompt); q.setAttribute('data-rv',''); c.appendChild(q);
  const opts = el('div','opts'); opts.setAttribute('data-rv','');
  s.options.forEach((o,i)=>{
    const b = el('button','opt');
    b.innerHTML = `<span class="mk">${i+1}</span><span>${o}</span><span class="tail"
      data-n="${i}">0</span>`;
    b.addEventListener('click',()=>{ Vote.add(s.id,'q',i); bump(b); paint(); });
    opts.appendChild(b);
  });
  c.appendChild(opts);
  const cap = el('p','small','Tap each question once per vote. Every participant selects two, so '+
    'the total will be about twice the number of people in the room.');
  cap.setAttribute('data-rv',''); c.appendChild(cap);
  c.appendChild(roomCapture(s.id,'q',s.options,paint));
  const res = el('div',''); res.id='rankRes'; res.setAttribute('data-rv',''); c.appendChild(res);
  if(s.discuss) c.appendChild(discussBlock(s.discuss));
  c.appendChild(el('p','src','Source: '+s.src));

  function paint(){
    s.options.forEach((_,i)=>{ const t=$(`[data-n="${i}"]`,opts);
      if(t) t.textContent = Vote.bag(s.id,'q')[i]||0; });
    const counts = Vote.counts(s.id,'q',s.options.length);
    const order = counts.map((c2,i)=>({i,c:c2})).sort((a,b)=>b.c-a.c);
    const total = counts.reduce((a,b)=>a+b,0);
    $('#rankRes',c).innerHTML = total
      ? '<div class="chart">'+order.map((o,rank)=>{
          const pc = Math.round(o.c/total*100), max = order[0].c||1;
          return `<div class="row ${rank<2?'hi':''}"><div class="row-top">
            <span class="row-lab"><b>${rank+1}.</b> ${s.options[o.i]}</span>
            <span class="row-val">${o.c}</span></div>
            <div class="row-bar"><i style="width:${o.c/max*100}%"></i></div></div>`;
        }).join('')+`<p class="small" style="margin-top:14px">${total} votes &middot; anonymous
          &middot; the top two are where this room would start</p></div>`
      : barChart(s.options,counts);
  }
  paint();
};

/* --- quiz (scored, with reveal) */
RENDER.quiz = (s,c)=>{
  head(s,c);
  s.items.forEach((it,qi)=>{
    const wrap = el('div',''); wrap.setAttribute('data-rv','');
    wrap.innerHTML = `<h3>${qi+1}. ${it.q}</h3>`;
    const opts = el('div','opts');
    it.opts.forEach((o,oi)=>{
      const b = el('button','opt');
      b.innerHTML = `<span class="mk">${String.fromCharCode(65+oi)}</span><span>${o}</span>
        <span class="tail" data-n="${oi}">0</span>`;
      b.addEventListener('click',()=>{ Vote.add(s.id,'q'+qi,oi); bump(b); paint(qi); });
      opts.appendChild(b);
    });
    wrap.appendChild(opts);
    wrap.appendChild(roomCapture(s.id,'q'+qi,it.opts,()=>paint(qi)));
    const res = el('div',''); res.id = 'qr'+qi; wrap.appendChild(res);
    const rvBtn = el('button','go sub rvbtn','Reveal the answer');
    rvBtn.style.marginTop='14px';
    rvBtn.addEventListener('click',()=>{
      $$('.opt',opts).forEach((b,oi)=>{
        b.classList.add('locked');
        b.classList.toggle('right', oi===it.a);
        b.classList.toggle('wrong', oi!==it.a && (Vote.bag(s.id,'q'+qi)[oi]||0)>0);
      });
      $('#qf'+qi,wrap) || (()=>{
        const fb = el('div','fb good'); fb.id='qf'+qi;
        fb.innerHTML = `<p class="fb-h">Answer</p>${it.fb}`;
        wrap.appendChild(fb);
      })();
      rvBtn.remove();
    });
    wrap.appendChild(rvBtn);
    c.appendChild(wrap);

    function paint(k){
      it.opts.forEach((_,oi)=>{ const t=$(`[data-n="${oi}"]`,opts);
        if(t) t.textContent = Vote.bag(s.id,'q'+k)[oi]||0; });
      $('#qr'+k,wrap).innerHTML = barChart(it.opts, Vote.counts(s.id,'q'+k,it.opts.length),
        {correct: undefined});
    }
    paint(qi);
  });
  if(s.after){ const a = el('div','',s.after); Array.from(a.children).forEach(n=>{
    n.setAttribute('data-rv',''); c.appendChild(n); }); }
  if(s.discuss) c.appendChild(discussBlock(s.discuss));
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- sort: tap a tile, tap a side. Works with mouse, touch and keyboard. */
RENDER.sort = (s,c)=>{
  head(s,c);
  const hint = el('p','small','Tap a statement to pick it up, then tap the side it belongs to. '+
    'Tap a placed statement to send it back.');
  hint.setAttribute('data-rv',''); c.appendChild(hint);

  const pool = el('div','pool'); pool.setAttribute('data-rv','');
  const sides = el('div','sides'); sides.setAttribute('data-rv','');
  const placed = {};
  let sel = null;

  s.buckets.forEach(b=>{
    const d = el('div','side'); d.dataset.b = b.id;
    d.innerHTML = `<h4>${b.h}</h4><p class="sh">${b.sub||''}</p><div class="items"></div>`;
    // sel can legitimately be 0, so test against null explicitly
    d.addEventListener('click',()=>{ if(sel !== null) place(sel,b.id); });
    sides.appendChild(d);
  });

  c.appendChild(pool); c.appendChild(sides);

  const bar = el('div',''); bar.style.cssText='display:flex;gap:10px;margin-top:18px;flex-wrap:wrap';
  bar.setAttribute('data-rv','');
  const chk = el('button','go sub','Check the room&rsquo;s sort');
  const rst = el('button','go sub','Reset');
  bar.appendChild(chk); bar.appendChild(rst); c.appendChild(bar);
  const fb = el('div',''); fb.id='sortFb'; fb.setAttribute('data-rv',''); c.appendChild(fb);

  if(s.after){ const a=el('div','',s.after); Array.from(a.children).forEach(n=>{
    n.setAttribute('data-rv',''); c.appendChild(n); }); }
  if(s.discuss) c.appendChild(discussBlock(s.discuss));
  c.appendChild(el('p','src','Source: '+s.src));

  function place(i,b){ placed[i]=b; sel=null; paint(); }
  function paint(){
    $$('.side',sides).forEach(d=>{
      d.classList.toggle('armed', sel!==null);
      $('.items',d).innerHTML = '';
    });
    pool.innerHTML = '';
    s.tiles.forEach((t,i)=>{
      const tile = el('button','tile', t.t);
      tile.dataset.i = i;
      if(sel===i) tile.classList.add('sel');
      tile.addEventListener('click',(e)=>{
        e.stopPropagation();
        if(placed[i]!==undefined){ delete placed[i]; paint(); return; }
        sel = (sel===i)? null : i; paint();
      });
      if(placed[i]!==undefined){
        const d = $(`.side[data-b="${placed[i]}"] .items`, sides);
        (d||pool).appendChild(tile);
      } else pool.appendChild(tile);
    });
    if(!pool.children.length) pool.innerHTML =
      '<p class="small" style="margin:0">All statements placed. Check the sort when the room is ready.</p>';
  }
  chk.addEventListener('click',()=>{
    let right=0;
    s.tiles.forEach((t,i)=>{
      const tile = $(`.tile[data-i="${i}"]`,c); if(!tile) return;
      const ok = placed[i]===t.b;
      tile.classList.toggle('right', ok);
      tile.classList.toggle('wrong', placed[i]!==undefined && !ok);
      if(ok) right++;
    });
    $('#sortFb',c).innerHTML = `<div class="fb ${right===s.tiles.length?'good':''}">
      <p class="fb-h">Result</p><b>${right} of ${s.tiles.length} placed correctly.</b>
      ${right===s.tiles.length?' Every statement is where it belongs.':
        ' Anything outlined in red is on the wrong side — talk through why before moving on.'}</div>`;
  });
  rst.addEventListener('click',()=>{
    for(const k in placed) delete placed[k];
    $('#sortFb',c).innerHTML=''; sel=null; paint();
  });
  paint();
};

/* --- match */
RENDER.match = (s,c)=>{
  head(s,c);
  const m = el('div','match'); m.setAttribute('data-rv','');
  s.keys.forEach((k,i)=>{
    const row = el('div','match-row');
    row.innerHTML = `<div class="match-key">${k}</div>`;
    const sel = el('select','match-sel');
    sel.innerHTML = '<option value="">Choose the leader focus…</option>'+
      s.opts.map((o,oi)=>`<option value="${oi}">${o}</option>`).join('');
    sel.dataset.i = i;
    row.appendChild(sel);
    m.appendChild(row);
  });
  c.appendChild(m);
  const bar = el('div',''); bar.style.cssText='display:flex;gap:10px;margin-top:16px;flex-wrap:wrap';
  bar.setAttribute('data-rv','');
  const chk = el('button','go sub','Check the matches');
  bar.appendChild(chk); c.appendChild(bar);
  const fb = el('div',''); fb.id='mFb'; fb.setAttribute('data-rv',''); c.appendChild(fb);
  chk.addEventListener('click',()=>{
    let right=0, out='';
    $$('.match-sel',m).forEach((sel,i)=>{
      const ok = String(s.answers[i])===sel.value;
      sel.classList.toggle('right',ok); sel.classList.toggle('wrong',!ok && sel.value!=='');
      if(ok) right++;
      out += `<div class="fb ${ok?'good':''}"><p class="fb-h">${s.keys[i]}</p>${s.fbs[i]}</div>`;
    });
    $('#mFb',c).innerHTML = `<p class="small"><b>${right} of ${s.keys.length} correct.</b></p>`+out;
  });
  if(s.after){ const a=el('div','',s.after); Array.from(a.children).forEach(n=>{
    n.setAttribute('data-rv',''); c.appendChild(n); }); }
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- competency explorer */
/* --- competency explorer (slide 18)
   Rebuilt around a question the room can answer rather than a list they scroll.
   Three things had to become true: the screen says WHY the competencies are on
   it before Jordan appears, the four competencies that carry the case are
   visibly marked, and selecting one puts its approved definition up large
   enough to read from the back of the room.

   Selection and highlight state go through the UI mirror, so the competency the
   facilitator opens is the competency the room sees — the previous version
   expanded it on the console only. */
RENDER.explorer = (s,c)=>{
  head(s,c,{instruct:false});

  if(s.why){
    const w = el('div','panel'); w.setAttribute('data-rv','');
    w.innerHTML = `<p class="kicker">Why this matters now</p>
      <p style="margin:0;font-size:19px;line-height:1.55">${s.why}</p>`;
    c.appendChild(w);
  }
  if(s.instruct) c.appendChild(instructBlock(s.instruct));

  const KEY_SEL  = s.id+'::sel';
  const KEY_ONLY = s.id+'::only';

  const tools = el('div','exp-tools'); tools.setAttribute('data-rv','');
  const bAll  = el('button','go sub','Show all 19');
  const bJor  = el('button','go sub','Highlight the four used on Jordan');
  tools.appendChild(bAll); tools.appendChild(bJor);
  c.appendChild(tools);

  const grid = el('div','compgrid'); grid.setAttribute('data-rv','');
  c.appendChild(grid);

  const detail = el('div','compdetail'); detail.setAttribute('data-rv','');
  c.appendChild(detail);

  function isJordan(n){ return JORDAN_COMPS.indexOf(n) > -1; }

  function paint(){
    const only = !!UI.get(KEY_ONLY);
    const sel  = UI.get(KEY_SEL, 0);
    const rows = COMPETENCIES.filter(([n])=> !only || isJordan(n));

    grid.innerHTML = rows.map(([n,name])=>{
      const cls = ['comptile'];
      if(isJordan(n)) cls.push('jor');
      if(sel === n)   cls.push('sel');
      return `<button class="${cls.join(' ')}" data-n="${n}">
        <span class="ct-n">${n}</span><span class="ct-t">${name}</span>
        ${isJordan(n)?'<span class="ct-b">Jordan case</span>':''}</button>`;
    }).join('');

    $$('[data-n]',grid).forEach(b=>{
      b.addEventListener('click',()=>{
        const n = Number(b.getAttribute('data-n'));
        UI.set(KEY_SEL, UI.get(KEY_SEL,0) === n ? 0 : n);
      });
    });

    bAll.classList.toggle('on', !only);
    bJor.classList.toggle('on', only);

    const row = COMPETENCIES.filter(x=>x[0]===sel)[0];
    if(!row){
      detail.innerHTML = `<div class="compempty">Select any competency to show its approved
        definition. ${only? 'These four are the competencies used in the Jordan case.'
        : 'The four marked <b>Jordan case</b> are the ones you will apply shortly.'}</div>`;
    } else {
      const [n,name,def] = row;
      detail.innerHTML = `<div class="compopen${isJordan(n)?' jor':''}">
        <p class="kicker">Competency ${n}${isJordan(n)?' &middot; used in the Jordan case':''}</p>
        <h2>${name}</h2>
        <p class="compdef">${def}</p>
        ${COMP_SLIDE18[n]?`<p class="small" style="margin:14px 0 0">In this session:
          ${COMP_SLIDE18[n]}</p>`:''}
      </div>`;
    }
  }

  bAll.addEventListener('click',()=> UI.set(KEY_ONLY, false));
  bJor.addEventListener('click',()=> UI.set(KEY_ONLY, true));
  paint();
  s._applyUI = paint;          // remote state repaints without a full re-render

  if(s.jordanNote){
    const jn = el('div','note', s.jordanNote); jn.setAttribute('data-rv','');
    c.appendChild(jn);
  }

  if(s.reflect){
    const r = el('div','panel protect'); r.setAttribute('data-rv','');
    r.innerHTML = `<p class="kicker">Leadership Reflection &middot; private</p>
      <p style="margin:0 0 8px;font-size:20px;line-height:1.5">${s.reflect}</p>
      <p class="small" style="margin:0">Nothing is submitted and no name is entered anywhere.
      Use your paper guide if you want to write it down.</p>`;
    c.appendChild(r);
  }

  const note = el('div','note','Behavioral competencies are the primary focus for development '+
    'planning in TMR. Technical competencies are evaluated, but development plans should remain '+
    'focused on behavioral growth.');
  note.setAttribute('data-rv',''); c.appendChild(note);
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- 1-4 scale */
RENDER.scale = (s,c)=>{
  head(s,c);
  const strip = el('div','assy'); strip.setAttribute('data-rv','');
  strip.innerHTML = SCALE.map(l=>`<div class="pill" data-l="${l.n}">
    <div class="pn">LEVEL ${l.n}</div><div class="pt">${l.label}</div>
    <div class="pd">${l.deck}</div></div>`).join('');
  c.appendChild(strip);
  SCALE.forEach(l=>{
    const det = el('details','exp'); det.setAttribute('data-rv','');
    det.innerHTML = `<summary><span class="exp-n">${l.n}</span>${l.label}</summary>
      <div class="body">
        <h4>On the scale</h4><p>${l.deck}</p>
        <h4>What this looks like in practice</h4><p>${l.qrg}</p>
        <h4>Worked example &mdash; Strategic Awareness at this level</h4><p>${l.sa}</p>
        <div class="note" style="margin:12px 0 0">${l.remember}</div></div>`;
    det.addEventListener('toggle',()=>{ if(det.open)
      $(`.pill[data-l="${l.n}"]`,strip).classList.add('in'); });
    c.appendChild(det);
  });
  /* The internal note explaining that the strip wording and the Quick Reference
     Guide wording are the same scale has been removed from the audience view.
     It was written for the facilitators, and on a projected screen it reads as
     a caveat about the framework rather than as an aid. The 1–4 scale itself is
     unchanged. */
  const note = el('div','note','Every rating on this scale must be supported by observable '+
    'evidence. Expand any level to see the full description and a worked example.');
  note.setAttribute('data-rv',''); c.appendChild(note);
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- evidence gallery (slide 20)
   Five statements, worst to best, each openable to show what is observable,
   what is measurable, what is still missing, and which of the seven questions
   it actually answers. Open/closed state is mirrored, so the statement the
   facilitator opens is the statement the room is looking at. */
RENDER.evgallery = (s,c)=>{
  head(s,c,{instruct:false});

  if(s.why){
    const w = el('div','panel'); w.setAttribute('data-rv','');
    w.innerHTML = `<p class="kicker">Why this matters now</p>
      <p style="margin:0;font-size:19px;line-height:1.55">${s.why}</p>`;
    c.appendChild(w);
  }
  if(s.instruct) c.appendChild(instructBlock(s.instruct));

  // the seven questions, and what strong evidence contains
  const g = el('div','grid g2'); g.setAttribute('data-rv','');
  g.innerHTML =
    `<div class="card"><p class="kicker">Strong evidence includes</p>
      <ul style="margin:0;padding-left:19px">${
        (s.criteria||[]).map(x=>`<li>${x}</li>`).join('')}</ul></div>
     <div class="card tint"><p class="kicker">The seven evidence questions</p>
      <ol style="margin:0;padding-left:19px">${
        (s.checklist||[]).map(x=>`<li>${x}</li>`).join('')}</ol></div>`;
  c.appendChild(g);

  if(s.ask){
    const a = el('p','lede', s.ask); a.setAttribute('data-rv',''); c.appendChild(a);
  }

  const wrap = el('div','evgrid'); wrap.setAttribute('data-rv','');
  c.appendChild(wrap);

  function paint(){
    const open = UI.get(s.id+'::ev', -1);
    wrap.innerHTML = (s.statements||[]).map((x,i)=>{
      const isOpen = open === i;
      const ans = x.answers || [];
      return `<button class="evcard ${x.tone}" data-ev="${i}">
        <span class="evtag">${x.tag}</span>
        <p class="evq">&ldquo;${x.t}&rdquo;</p>
        ${isOpen ? `<div class="evopen">
          <h4>What is observable</h4><p>${x.obs}</p>
          <h4>What is measurable</h4><p>${x.meas}</p>
          <h4>What is still missing</h4><p>${x.miss}</p>
          <h4>Which of the seven questions this answers</h4>
          <ul class="evq7">${(s.checklist||[]).map((q,qi)=>
            `<li class="${ans.indexOf(qi)>-1?'yes':'no'}">
              <b>${ans.indexOf(qi)>-1?'&#10003;':'&mdash;'}</b><span>${q}</span></li>`).join('')}</ul>
          <h4>Why this one matters</h4><p style="margin:0">${x.why}</p>
        </div>` : ''}
      </button>`;
    }).join('');
    $$('[data-ev]',wrap).forEach(b=>{
      b.addEventListener('click',()=>{
        const i = Number(b.getAttribute('data-ev'));
        UI.set(s.id+'::ev', UI.get(s.id+'::ev',-1) === i ? -1 : i);
      });
    });
  }
  paint();
  s._applyUI = paint;

  if(s.note){ const n = el('div','note', s.note); n.setAttribute('data-rv',''); c.appendChild(n); }
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- evidence builder, run at the whiteboard
   The individual textarea was removed on purpose: this is now a shared exercise
   led from the front, and a room of executives typing separately produced far
   weaker sentences than the same room arguing about one sentence out loud. What
   remains is the checklist the facilitator walks, and the reveal. */
RENDER.builder = (s,c)=>{
  head(s,c);
  if(s.purposeLine){
    const p = el('div','panel'); p.setAttribute('data-rv','');
    p.innerHTML = `<p class="kicker">The purpose of this activity</p>
      <p style="margin:0;font-size:19px;line-height:1.55">${s.purposeLine}</p>`;
    c.appendChild(p);
  }
  const v = el('div','card'); v.setAttribute('data-rv','');
  v.innerHTML = `<p class="kicker">The statement as written</p>
    <p class="bigq two" style="margin:0">&ldquo;${s.vague}&rdquo;</p>`;
  c.appendChild(v);
  const ask = el('p','lede', s.ask); ask.setAttribute('data-rv',''); c.appendChild(ask);

  /* The seven questions, marked off as the room works them. Mirrored, so the
     display shows the same marks the facilitator is making. */
  const chk = el('div','opts'); chk.setAttribute('data-rv','');
  function paintChk(){
    const picked = UI.get(s.id+'::chk', []) || [];
    $$('.opt',chk).forEach((b,i)=> b.classList.toggle('pick', picked.indexOf(i)>-1));
    const cn = $('#bCount',c);
    if(cn) cn.textContent = picked.length+' of 7 marked as missing';
  }
  s.checklist.forEach((q,i)=>{
    const b = el('button','opt');
    b.innerHTML = `<span class="mk">${i+1}</span><span>${q}</span>`;
    b.addEventListener('click',()=>{
      const cur = (UI.get(s.id+'::chk', []) || []).slice();
      const at = cur.indexOf(i);
      if(at>-1) cur.splice(at,1); else cur.push(i);
      UI.set(s.id+'::chk', cur);
      paintChk();
    });
    chk.appendChild(b);
  });
  c.appendChild(chk);
  const cnt = el('p','small','0 of 7 marked as missing'); cnt.id='bCount';
  cnt.setAttribute('data-rv','');
  c.appendChild(cnt);
  paintChk();

  const wb = el('div','panel'); wb.setAttribute('data-rv','');
  wb.innerHTML = `<p class="kicker">At the whiteboard</p>
    <p style="margin:0">Rebuild the statement out loud, as a room. Name the behaviour, how often,
    over what period, and what changed as a result. Write it up before we compare.</p>`;
  c.appendChild(wb);

  const rv = el('button','go gold','Reveal the stronger version'); rv.setAttribute('data-rv','');
  c.appendChild(rv);
  const out = el('div',''); out.id='bOut'; out.setAttribute('data-rv',''); c.appendChild(out);

  function paintReveal(){
    const shown = !!UI.get(s.id+'::rev');
    rv.style.display = shown ? 'none' : '';
    const o = $('#bOut',c);
    if(!o) return;
    o.innerHTML = shown
      ? `<div class="fb good"><p class="fb-h">Observable evidence</p>
        <p style="font-size:19px;color:var(--ink);margin:0 0 12px">&ldquo;${s.better}&rdquo;</p>
        <p style="margin:0">Same person, same claim. One of those you can defend in a calibration
        conversation and one you cannot. <b>All seven questions are unanswered by the original</b>
        &mdash; which is the point.</p></div>
        <div class="grid g2" style="margin-top:18px">${s.sortItems.map(x=>
          `<div class="card"><p class="kicker">${x.a}</p><p style="margin:0">${x.t}</p></div>`).join('')}</div>`
      : '';
  }
  rv.addEventListener('click',()=> UI.set(s.id+'::rev', true));
  paintReveal();
  s._applyUI = ()=>{ paintChk(); paintReveal(); };
  if(s.note){ const n=el('div','note',s.note); n.setAttribute('data-rv',''); c.appendChild(n); }
  if(s.discuss) c.appendChild(discussBlock(s.discuss));
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- bias */
RENDER.bias = (s,c)=>{
  head(s,c);
  s.cases.forEach((x,i)=>{
    const wrap = el('div','card'); wrap.setAttribute('data-rv','');
    wrap.innerHTML = `<p class="kicker">Situation ${String.fromCharCode(65+i)}</p>
      <p style="font-size:17px">${x.sit}</p>`;
    const btn = el('button','go sub','Name the bias and the safeguard');
    wrap.appendChild(btn);
    const out = el('div',''); wrap.appendChild(out);
    btn.addEventListener('click',()=>{
      out.innerHTML = `<div class="fb good" style="margin-top:16px">
        <p class="fb-h">${x.bias}</p><p>${x.def}</p>
        <p style="margin:0"><b>Safeguard:</b> ${x.safe}</p></div>`;
      btn.remove();
    });
    c.appendChild(wrap);
  });
  const dis = el('p','small', s.disclaimer); dis.setAttribute('data-rv',''); c.appendChild(dis);
  if(s.after){ const a=el('div','',s.after); Array.from(a.children).forEach(n=>{
    n.setAttribute('data-rv',''); c.appendChild(n); }); }
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- Jordan intro */
/* ---- Jordan: the shared evidence view
   Used by both the intro scene and the pair-activity scene, because the pairs
   need exactly the same evidence in front of them while they rate. Built as one
   function so the two screens can never drift apart. */
function jordanEvidence(s, c, opts){
  opts = opts||{};
  const P = s.profile;

  if(P && opts.facts!==false){
    const d = el('div','dossier'); d.setAttribute('data-rv','');
    d.innerHTML = P.facts.map(([k,v])=>
      `<div class="dcell"><p class="kicker">${k}</p><p class="dv">${v}</p></div>`).join('');
    c.appendChild(d);
  }

  if(P && opts.history!==false){
    const g = el('div','grid g2'); g.setAttribute('data-rv','');
    g.innerHTML =
      `<div class="card"><p class="kicker">How she got here</p>
        <ul style="margin:0;padding-left:19px">${
          P.priorRoles.map(x=>`<li>${x}</li>`).join('')}</ul></div>
       <div class="card"><p class="kicker">What she is responsible for</p>
        <ul style="margin:0;padding-left:19px">${
          P.responsibilities.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
    c.appendChild(g);

    const perf = el('div','card tint'); perf.setAttribute('data-rv','');
    perf.innerHTML = `<p class="kicker">Performance history</p>
      <ul style="margin:0;padding-left:19px">${
        P.performance.map(x=>`<li>${x}</li>`).join('')}</ul>`;
    c.appendChild(perf);
  }

  if(P && opts.timeline!==false){
    const tw = el('div',''); tw.setAttribute('data-rv','');
    tw.innerHTML = `<h3 style="margin:6px 0 12px">Timeline</h3>
      <ul class="tl">${P.timeline.map(x=>
        `<li><span class="tly">${x.y}</span><p class="tlt">${x.t}</p></li>`).join('')}</ul>`;
    c.appendChild(tw);
  }

  /* The four competencies. The approved anchor sentence leads each one, with the
     supporting evidence and the gap beneath it — so the room can see exactly how
     much weight the anchor is actually carrying. */
  s.rows.forEach((r,ri)=>{
    const box = el('div','card'); box.setAttribute('data-rv','');
    box.innerHTML = `<p class="kicker">Competency ${ri+1} of 4</p>
      <h3 style="margin:2px 0 10px">${r.comp}</h3>
      <div class="evrow"><p><strong>${r.anchor||r.ev}</strong></p>
        <p class="evsrc">Recorded observation</p></div>
      ${(r.hard||[]).map(x=>`<div class="evrow hard"><p>${x}</p></div>`).join('')}
      ${(r.soft||[]).map(x=>`<div class="evrow soft"><p>${x}</p></div>`).join('')}
      ${r.gap?`<div class="evrow gapbox"><p><strong>Evidence gap:</strong> ${r.gap}</p></div>`:''}`;
    c.appendChild(box);
  });

  if(P && opts.stakeholders!==false){
    const sh = el('div',''); sh.setAttribute('data-rv','');
    sh.innerHTML = `<h3 style="margin:6px 0 12px">What stakeholders have said</h3>`+
      P.stakeholders.map(x=>
        `<div class="evrow ${x.tone}"><p>${x.q}</p>
         <p class="evsrc">${x.who}</p></div>`).join('');
    c.appendChild(sh);
  }

  if(P && opts.gaps!==false){
    const gp = el('div','panel'); gp.setAttribute('data-rv','');
    gp.style.borderColor = 'rgba(240,192,112,.4)';
    gp.style.background = 'rgba(240,192,112,.06)';
    gp.innerHTML = `<p class="kicker" style="color:#F6DCAC">Where the evidence runs out</p>
      <ul style="margin:0;padding-left:19px">${
        P.gaps.map(x=>`<li>${x}</li>`).join('')}</ul>`;
    c.appendChild(gp);
  }
}

RENDER.jordanintro = (s,c)=>{
  head(s,c);
  jordanEvidence(s,c);

  const st = el('div','grid g3'); st.setAttribute('data-rv','');
  st.innerHTML = s.structure.map(x=>`<div class="card tint"><p class="kicker">${x[0]}</p>
    <p class="big-num" style="font-size:30px">${x[1]}</p><p class="small"
    style="margin:0">${x[2]}</p></div>`).join('');
  c.appendChild(st);
  const w = el('div','panel protect', `<p style="margin:0">${s.warn}</p>`);
  w.setAttribute('data-rv',''); c.appendChild(w);
  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- Jordan pair activity
   The rating form has been removed from this screen. Pairs rate on one phone;
   the room screen holds the evidence they are reasoning about, readable from the
   back, for the full fifteen minutes. The facilitator's own capture controls
   remain, hidden from the projected display by `.fac-only`, for the case where
   the phones are unavailable. */
RENDER.worksheet = (s,c)=>{
  head(s,c);

  if(s.pairNote){
    const pn = el('div','panel'); pn.setAttribute('data-rv','');
    pn.style.borderColor = 'rgba(240,192,112,.45)';
    pn.style.background = 'rgba(240,192,112,.08)';
    pn.innerHTML = `<p class="kicker" style="color:#F6DCAC">How to work</p>
      <p style="margin:0;font-size:20px;line-height:1.5">${s.pairNote}</p>`;
    c.appendChild(pn);
  }

  jordanEvidence(s,c,{history:false});

  const ref = el('div','card tint'); ref.setAttribute('data-rv','');
  ref.innerHTML = `<p class="kicker">The 1&ndash;4 scale &mdash; reference</p>
    <div class="assy">${SCALE.map(l=>`<div class="pill">
      <div class="pn">LEVEL ${l.n}</div><div class="pt">${l.label}</div>
      <div class="pd">${l.deck}</div></div>`).join('')}</div>`;
  c.appendChild(ref);

  /* No-technology fallback only. Never rendered on the projected display. */
  const cap = el('div','fac-only'); cap.setAttribute('data-rv','');
  cap.innerHTML = '<h3>Facilitator capture &mdash; only if phones are unavailable</h3>';
  s.rows.forEach((r,ri)=>{
    const row = el('div','');
    row.innerHTML = `<p class="kicker" style="margin:14px 0 6px">${r.comp}</p>`;
    row.appendChild(roomCapture(s.id,'c'+ri, SCALE.map(l=>l.n+' — '+l.label)));
    cap.appendChild(row);
  });
  const clsCap = el('div','');
  clsCap.innerHTML = '<p class="kicker" style="margin:14px 0 6px">Proposed classification</p>';
  clsCap.appendChild(roomCapture(s.id,'cls',s.classes));
  cap.appendChild(clsCap);
  const twCap = el('div','');
  twCap.innerHTML = '<p class="kicker" style="margin:14px 0 6px">Ready within ~12 months</p>';
  twCap.appendChild(roomCapture(s.id,'12mo',['Yes','No','Not enough information']));
  cap.appendChild(twCap);
  c.appendChild(cap);

  c.appendChild(el('p','src','Source: '+s.src));
};

/* --- Jordan results
   Two changes from the previous version. First, the written responses are now
   displayed — anonymously, and only when the facilitator chooses to show them.
   Participants are told this on their phone before they type, and it turns the
   debrief from a summary of numbers into the room reading each other's
   reasoning. Second, the "there is no answer key" panel is gone: it was reading
   as permission to stop reasoning. What remains is the honest version — the
   evidence does not settle it, and naming that is the finding. */
RENDER.jordanresults = (s,c)=>{
  head(s,c);
  const src = 'jordan-worksheet';

  const g = el('div','grid g4'); g.setAttribute('data-rv','');
  s.rows.forEach((r,ri)=>{
    const counts = Vote.counts(src,'c'+ri,4);
    const avg = Vote.avg(src,'c'+ri,[1,2,3,4]);
    const med = median(counts,[1,2,3,4]);
    const card = el('div','card');
    card.innerHTML = `<p class="kicker">${r.comp}</p>`+
      hist(SCALE.map(l=>l.label), counts, avg||0)+
      (med!==null?`<p class="small" style="margin:6px 0 0">Median ${med}</p>`:'');
    g.appendChild(card);
  });
  c.appendChild(g);

  const two = el('div','split'); two.setAttribute('data-rv','');
  two.innerHTML =
    '<div><h3 style="margin-top:0">Proposed classification</h3>'+
      barChart(s.classes, Vote.counts(src,'cls',s.classes.length))+'</div>'+
    '<div><h3 style="margin-top:0">Ready within approximately 12 months?</h3>'+
      barChart(['Yes','No','Not enough information'], Vote.counts(src,'12mo',3))+'</div>';
  c.appendChild(two);

  /* Anonymous written responses, each behind its own facilitator reveal. */
  [['ev','Evidence the room pointed to'],
   ['need','Evidence the room said was still missing'],
   ['case','The business cases, in the room&rsquo;s own words'],
   ['dev','First development or utilization actions recommended']].forEach(([k,lab])=>{
    c.appendChild(textReveal(s, src, k, lab));
  });

  if(s.challenge){
    const ch = el('div','panel'); ch.setAttribute('data-rv','');
    ch.style.borderColor = 'rgba(240,192,112,.45)';
    ch.style.background = 'rgba(240,192,112,.08)';
    ch.innerHTML = `<p class="kicker" style="color:#F6DCAC">Calibration challenge</p>
      <p style="margin:0;font-size:20px;line-height:1.5">${s.challenge}</p>`;
    c.appendChild(ch);
  }

  const w = el('div','panel protect'); w.setAttribute('data-rv','');
  w.innerHTML = `<p class="kicker">What the evidence supports</p>
    <p style="margin:0">More than one classification is defensible here, and none of them is
    fully supported. In a real calibration room the outcome would be a request for more evidence
    &mdash; particularly on Development of Others &mdash; before finalising. Naming that is a
    stronger answer than forcing a call.</p>`;
  c.appendChild(w);

  if(s.discuss) c.appendChild(discussBlock(s.discuss));
  c.appendChild(el('p','src','Source: '+s.src));
};

/** Median level from a count distribution. Useful where the mean hides a split. */
function median(counts, values){
  const total = counts.reduce((a,b)=>a+b,0);
  if(!total) return null;
  const mid = total/2;
  let seen = 0;
  for(let i=0;i<counts.length;i++){
    seen += counts[i];
    if(seen >= mid) return values[i];
  }
  return null;
}

/* Anonymous free-text, revealed on the facilitator's call and mirrored to the
   projected screen. The texts come from LIVE.texts, which the server builds
   without participant ids — there is no path from a displayed quote back to a
   person, which is what makes showing them acceptable at all. */
function textReveal(s, srcStep, key, label){
  const wrap = el('div',''); wrap.setAttribute('data-rv','');
  const uk = s.id+'::tx-'+key;
  const btn = el('button','go sub','Show: '+stripTags(label).toLowerCase());
  const out = el('div','');
  wrap.appendChild(el('h3','', label));
  wrap.appendChild(btn);
  wrap.appendChild(out);

  function paint(){
    const shown = !!UI.get(uk);
    btn.style.display = shown ? 'none' : '';
    const texts = (window.LIVE && LIVE.texts && LIVE.texts[srcStep+'::'+key]) || [];
    if(!shown){ out.innerHTML = ''; return; }
    out.innerHTML = texts.length
      ? `<div class="texts">${texts.map(t=>`<p class="tq">${esc(t)}</p>`).join('')}</div>
         <p class="textsmeta">${texts.length} anonymous response${texts.length===1?'':'s'}
         &middot; no names are collected or shown</p>`
      : `<div class="chart-empty">No written responses captured yet.</div>`;
  }
  btn.addEventListener('click',()=> UI.set(uk, true));
  paint();
  // chain onto any applier the scene already registered
  const prev = s._applyUI;
  s._applyUI = ()=>{ if(prev) prev(); paint(); };
  return wrap;
}

/* --- break */
RENDER.break = (s,c)=>{
  c.innerHTML = `<p class="eyebrow" data-rv>Take a break</p>
    <h1 data-rv>${s.title}</h1>
    <p class="lede" data-rv>${s.sub}</p>
    <p data-rv>${s.body}</p>
    <div class="pause" data-rv><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
      <div><b>State the clock time you will resume</b> &mdash; not just &ldquo;15 minutes.&rdquo;
      Hold the room for questions before releasing them.</div></div>
    <p class="src">Source: ${s.src}</p>`;
};

/* --- the empty chair: a facilitator-led visualisation
   One line per reveal on purpose. The facilitator is speaking this in a dimmed
   room and needs to control the pace sentence by sentence; a panel of six
   paragraphs would put the ending on the wall before they had said the middle.
   The environment cue is `.fac-only`, so the instruction to dim the lights never
   appears on the wall the room is looking at. */
RENDER.viz = (s,c)=>{
  const wrap = el('div','viz');

  const hd = el('div',''); hd.setAttribute('data-rv','');
  hd.innerHTML = `<p class="eyebrow">${s.eyebrow}</p><h1>${s.title}</h1>`;
  wrap.appendChild(hd);

  if(s.environment){
    const cue = el('div','dimcue fac-only'); cue.setAttribute('data-rv','');
    cue.innerHTML = `<p><b>Before you begin:</b> ${s.environment.join(' ')}</p>`;
    wrap.appendChild(cue);
  }

  (s.lines||[]).forEach(l=>{
    const p = el('p','vline', l); p.setAttribute('data-rv',''); wrap.appendChild(p);
  });

  if(s.mail){
    const m = el('div','vmail'); m.setAttribute('data-rv','');
    m.innerHTML = `<p>&ldquo;${s.mail}&rdquo;</p>`;
    wrap.appendChild(m);
  }

  (s.after||[]).forEach(l=>{
    const p = el('p','vline', l); p.setAttribute('data-rv',''); wrap.appendChild(p);
  });

  if(s.closeQ){
    const q = el('p','vq', s.closeQ); q.setAttribute('data-rv',''); wrap.appendChild(q);
  }
  if(s.askAfter){
    const a = el('p','vq', '&ldquo;'+s.askAfter+'&rdquo;'); a.setAttribute('data-rv','');
    a.style.color = 'var(--cream)';
    wrap.appendChild(a);
  }
  if(s.teaching){
    const t = el('div','panel'); t.setAttribute('data-rv','');
    t.innerHTML = `<p class="kicker">What this is really about</p>
      <ul style="margin:0;padding-left:19px">${s.teaching.map(x=>`<li>${x}</li>`).join('')}</ul>`;
    wrap.appendChild(t);
  }
  if(s.landing){
    const l = el('div','panel protect'); l.setAttribute('data-rv','');
    l.innerHTML = `<p style="margin:0;font:700 clamp(21px,2.2vw,32px)/1.35 var(--serif);
      color:var(--cream)">${s.landing}</p>`;
    wrap.appendChild(l);
  }
  const sr = el('p','src','Source: '+s.src); sr.setAttribute('data-rv','');
  wrap.appendChild(sr);
  c.appendChild(wrap);
};

/* --- final reflection
   Still protected, still unhurried, but no longer device-private: responses are
   collected anonymously and displayed only when the facilitator chooses to. The
   room hearing each other's commitments is a better close than each person
   holding their own. Participants are told this on the phone before they type. */
RENDER.reflect = (s,c)=>{
  const wrap = el('div','reflect-wrap');
  wrap.innerHTML = `<p class="eyebrow" data-rv style="justify-content:center">${s.eyebrow}</p>
    <p class="reflect-q" data-rv>&ldquo;${s.question}&rdquo;</p>`;

  const hint = el('p','lede'); hint.setAttribute('data-rv','');
  hint.style.textAlign='center'; hint.style.margin='0 auto 8px';
  hint.innerHTML = 'Answer privately on your phone. Responses are anonymous &mdash; no name is '
    + 'attached to anything, and nothing appears on this screen unless we choose to show it.';
  wrap.appendChild(hint);
  c.appendChild(wrap);

  const reveal = textReveal(s, s.id, 'reflection', 'What this room said');
  c.appendChild(reveal);

  const th = el('p','lede', s.sub); th.setAttribute('data-rv','');
  th.style.textAlign='center'; th.style.margin='26px auto 0'; c.appendChild(th);
  const sr = el('p','src','Source: '+s.src);
  sr.style.textAlign='center'; sr.setAttribute('data-rv',''); c.appendChild(sr);
  Array.from(wrap.children).forEach(n=>{ if(!n.hasAttribute('data-rv')) n.setAttribute('data-rv',''); });
};

/* --- appendix */
RENDER.appendix = (s,c)=>{
  head(s,c);
  s.routing.forEach(r=>{
    const d = el('div','card'); d.setAttribute('data-rv','');
    d.innerHTML = `<p class="kicker">${r[0]}</p><p style="margin:0">${r[1]}</p>`;
    c.appendChild(d);
  });
  s.qa.forEach(q=>{
    const det = el('details','exp'); det.setAttribute('data-rv','');
    det.innerHTML = `<summary>${q[0]}</summary><div class="body"><p>${q[1]}</p></div>`;
    c.appendChild(det);
  });
  c.appendChild(el('p','src','Source: '+s.src));
};

/* ---------------------------------------------------------------- keyboard */
function keys(e){
  if(/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) {
    if(e.key==='Escape') e.target.blur();
    return;
  }
  const k = e.key;
  if(k===' '||k==='ArrowRight'||k==='PageDown'||k==='Enter'){ e.preventDefault(); next(); }
  else if(k==='ArrowLeft'||k==='PageUp'||k==='Backspace'){ e.preventDefault(); back(); }
  else if(k==='f'||k==='F'){ toggleFac(); }
  else if(k==='n'||k==='N'){ toggleDrawer(); }
  else if(k==='m'||k==='M'){ toggleMap(); }
  else if(k==='t'||k==='T'){ clockToggle(); }
  else if(k==='Home'){ goto(0,1); }
  else if(k==='End'){ goto(STEPS.length-1,1); }
  else if(k==='Escape'){ if(State.map) toggleMap(false); else toggleDrawer(false); }
  else if(k==='?'){ flash('<b>Keys:</b> Space / &rarr; continue &middot; &larr; back &middot; '+
    'F facilitator &middot; N notes &middot; M map &middot; T timer'); }
}
function clockToggle(){
  if(State.clockOn){ State.clockMs = elapsed(); State.clockOn=false; }
  else { State.clockAt = Date.now(); State.clockOn=true; }
  tickClock(); save();
}

/* ---------------------------------------------------------------- boot */
function boot(){
  load();
  buildWorld();

  $('#nextBtn').addEventListener('click', next);
  $('#backBtn').addEventListener('click', back);
  $('#mapBtn').addEventListener('click', ()=>toggleMap());
  $('#facBtn').addEventListener('click', toggleFac);
  $('#notesBtn').addEventListener('click', ()=>toggleDrawer());
  $('#drX').addEventListener('click', ()=>toggleDrawer(false));
  $('#clock').addEventListener('click', clockToggle);
  $('#clock').addEventListener('dblclick', ()=>{
    State.clockMs=0; State.clockOn=false; tickClock(); save(); flash('Session clock reset.');
  });
  $('#drNext').addEventListener('click', next);
  $('#drBack').addEventListener('click', back);
  $('#drMap').addEventListener('click', ()=>toggleMap(true));
  $('#drReset').addEventListener('click', ()=>{
    if(!confirm('Clear every captured response, note and reflection on this device?\n\n'+
      'The presentation content is not affected.')) return;
    State.votes={}; State.notes={}; save();
    STEPS.forEach(t=>{ t._built=false; });
    const cur = State.i; goto(cur,1);
    flash('<b>All captured responses cleared.</b>');
  });

  document.addEventListener('keydown', keys);
  window.addEventListener('resize', ()=>camera(true));
  setInterval(tickClock, 500);

  // Deep link: ?s=12 jumps to a scene index, ?s=jordan-worksheet to a scene id.
  // Lets a facilitator get straight back to where they were after any interruption.
  const q = new URLSearchParams(location.search);
  if(q.has('s')){
    const v = q.get('s');
    const byId = STEPS.findIndex(t=>t.id===v);
    const idx = byId>=0 ? byId : (parseInt(v,10)-1);
    if(!isNaN(idx) && idx>=0 && idx<STEPS.length){ State.i = idx; State.rv = 1; }
  }
  if(q.get('f')==='1'){ State.mode='fac'; }
  if(q.get('rv')==='all'){ State.rv = -1; }

  document.body.classList.toggle('fac', State.mode==='fac');
  $('#facBtn').classList.toggle('on', State.mode==='fac');
  goto(State.i, State.rv);
  if(State.mode==='fac') toggleDrawer(true);
  tickClock();

  setTimeout(()=>{ $('#hint').classList.add('show');
    setTimeout(()=>$('#hint').classList.remove('show'), 7000); }, 1400);
}
document.addEventListener('DOMContentLoaded', boot);

/* ---------------------------------------------------------------- exports
   Top-level const/let live in script scope, not on window. live.js needs
   these, so expose them explicitly rather than relying on globals leaking. */
window.STEPS = STEPS;
window.SECTIONS = SECTIONS;
window.State = State;
window.Vote = Vote;
window.gotoStep = goto;
window.flashMsg = flash;
window.cameraRefresh = camera;
window.UI = UI;
window.applyUI = applyUI;
window.toggleMapView = toggleMap;
window.rerenderScene = function(){
  const s = step();
  if(!s) return;
  s._built = false;
  render(s);
  s._built = true;
  paintReveals();
};
