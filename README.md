# Building the Future of Talent — TMR Learning Experience

**Master Electronics | INTERNAL**
An interactive, facilitator-led presentation environment for *An Introduction to Talent
Management Reviews for Business Enablement*. Built for Autumn and Lexi.

This replaces the PowerPoint as the delivery method. It does not change the content.

---

## 1. Launch

### Live session — phones can join

```bash
node server.js
```

It prints the facilitator, display and participant links plus the session code.
Open the facilitator console on your laptop, the display on the room screen, and let
the room scan the QR once. Node 18+; **no npm install, no dependencies**.

### Backup mode — no server, no phones

**Double-click `index.html`.** The whole workshop runs offline exactly as before, with the
room's answers captured on the laptop. Use this if the network fails or you prefer manual
entry.

| Route | Who | What |
|---|---|---|
| `/presenter` | Autumn / Lexi laptop | Controls, notes, room capture. Keep private. |
| `/display` | Room screen | Clean presentation. No controls, no notes. |
| `/join` | Participant phones | One scan, one page, whole session. |
| `/qr`, `/qr.svg`, `/qr.png` | — | The join QR, drawn live for the current address. |

**No key, no token, no setup.** Open `/presenter` and you are the presenter; a refresh
keeps it. Anyone who opens it after that gets a read-only view that follows you with its
controls hidden, and is told another facilitator is already presenting. The console only
moves when you press **Transfer control**, which revokes your own session as it frees the
claim — so a hand-off can never leave two people driving the room. That one-console rule
is the whole protection model, including on a public URL.

**Nothing to regenerate.** The QR is drawn per request for whatever address the request
arrived on, so it is right on a LAN, behind a tunnel and on a hosted URL. `make-qr.py` is
now only for print artwork — the posters and the join card.

Public hosting needs one sign-in — see `HOSTING.md`.

## 2. What it is

A **spatial presentation**, not a slide deck and not a self-paced course. The twelve
sections of the workshop occupy distinct areas of one large canvas. Advancing flies the
camera between them, so the room sees how ideas connect rather than watching rectangles
replace each other.

Within a scene, content arrives in **facilitator-controlled reveals** — headline, then
definition, then example, then leader mandate, then the interaction, then results, then
the debrief. The whole section is never dumped on screen at once.

- **32 scenes** across **12 sections**
- **180 minutes** planned, matching the approved agenda blocks exactly
- **201 Continue presses** in a full run — roughly one every 54 seconds
- **6,500+ words** of approved content, nothing summarised away

### The twelve sections

| # | Section | Scenes |
|---|---|---|
| 1 | Opening and Context | 4 |
| 2 | What TMR Is | 3 |
| 3 | Four Talent Dimensions | 1 |
| 4 | Talent Classifications | 2 |
| 5 | Competencies & the 1–4 Scale | 4 |
| 6 | Evidence and Bias | 3 |
| 7 | Leader Preparation | 1 |
| 8 | Jordan Practice Scenario | 3 |
| 9 | Calibration | 3 |
| 10 | Development and Utilization | 3 |
| 11 | Future Considerations | 2 |
| 12 | Coming Full Circle | 3 |

Sections 9 and 10 are revisited later in the workshop order — the camera returns to the
Calibration area after Jordan, which is deliberate and shows the connection.

---

## 3. Facilitator controls

| Control | Key | What it does |
|---|---|---|
| Continue | `Space` `→` `Enter` | Next reveal, then next scene |
| Back | `←` `Backspace` | Previous reveal, then previous scene |
| Facilitator mode | `F` | Notes drawer, talking-point cue bar, room-capture controls |
| Presenter notes | `N` | Notes drawer on its own |
| Journey map | `M` | Zoom out to all twelve sections; click one to jump |
| Session clock | `T` | Start / pause. Double-click the clock to reset. |
| First / last scene | `Home` `End` | |
| Close overlay | `Esc` | |
| Key list | `?` | |

Everything also has a visible on-screen button. Nothing is keyboard-only.

### What is in the notes drawer

Per scene, drawn from the approved Dual Facilitator Guide: presenter ownership, timing
and cumulative position, purpose, key messages, suggested delivery, exact "say this"
language, pause and facilitation cues, interaction cues, what to watch for, likely
questions with approved responses, the no-technology backup, what to drop if running
behind, the four handoff statements, transition language, and the source citation.

All 32 scenes have notes. All four handoffs are present:

- Lexi → Autumn after the succession story
- Autumn → Lexi after the classification activity
- Lexi → Autumn after Leader Preparation
- Autumn → Lexi after the development-plan matching

Two handoffs sit later than in the original deck because Autumn now debriefs the activity
that follows her section. The wording is unchanged.

### The talking-point cue bar

In facilitator mode a single line appears at the bottom-left with the most useful sentence
for the current scene. It is the one thing you can glance at without opening the drawer.

---

## 4. Capturing the room

One device runs the presentation, so the facilitator records the room's responses.

**Tap to count.** Every activity option is a large target. Tap once per person as hands go
up. The running count sits on the option and the chart builds from it.

**Quick entry.** In facilitator mode, each activity has a box under it. Type counts in
order — `3,4,4,1,0` — and press Set. Fastest for a full room.

**Then reveal.** Charts show percentages and totals. Scored activities have a *Reveal the
answer* button that marks the correct option, flags what the room chose, and shows the
approved feedback.

Counts are stored only in this browser. Nothing is transmitted. There are no names.

### Participant phones

Twelve moments take anonymous responses from phones — see `CHANGES-v3.md` for the list.
Every response still flows through one object, `Vote` in `app.js`, which is why the live
server could be added without touching a single scene, renderer or transition.

Manual room capture remains available on every activity, and `index.html` opened directly
runs the whole workshop with no server at all.

---

## 5. Recovery

| Situation | Behaviour |
|---|---|
| Page refresh | Reopens on the same scene, at the same reveal, with all captured responses and private notes intact |
| Laptop sleep | Same |
| Accidental advance | `Back` steps reveal by reveal |
| Lost your place | `M` for the map, click the section |
| Jump directly | `index.html?s=jordan-worksheet` — any scene id, or `?s=22` for a number, or `&f=1` to open in facilitator mode, or `&rv=all` to fully reveal |
| Projector connected late | Resize the window once, or press `M` then `Esc`. The camera re-frames and the first paint never animates, so a display that is slow to composite cannot leave a blank screen. |
| Empty response set | Charts show an honest "No responses captured yet" state, never a fake bar |
| Duplicate capture | Use the `−` button, or Clear on the quick-entry row |
| Need a clean start | Facilitator mode → *Clear captured responses*. Confirms first. Content untouched. |
| Total technology failure | Every activity's notes carry a show-of-hands or flip-chart backup. The workshop is fully deliverable without this application. |

---

## 6. Content integrity

Everything comes from the four approved sources. Each scene carries a source citation on
screen.

- `Business Enablement TMR Introduction.pptx`
- `Business Enablement TMR Participant Guide.docx`
- `Business Enablement TMR Quick Reference Guide.docx`
- `BUSINESS ENABLEMENT TMR DUAL FACILITATOR GUIDE.docx`

**Preserved exactly, and verified by automated assertion:**

- The four classifications, their official definitions, illustrative examples and leader mandates
- The four talent dimensions and the Participant Guide definitions, word for word
- The Master Electronics 1–4 scale — deck wording on screen, Quick Reference Guide wording as the fuller explanation, never presented as competing scales
- All 19 behavioral competencies with their Level 1 descriptions
- The "R" suffix
- Jordan's four evidence statements, verbatim
- **No correct classification for Jordan.** The activity is unscored, has no answer key, and states that disagreement and missing evidence are the expected outcomes
- The Final Reflection question, exactly, with no poll, no results and no group answer — writing is optional and private to the device
- Every scope guard: this is foundational learning, Business Enablement has no formal calibration governance, Operations' calibration is still developing, nothing is being decided today

**Deliberately preserved rather than silently corrected** — five inconsistencies found
across the sources, all documented in `../TMR Interactive Presentation Change Log.docx`:
the two 1–4 scale wordings; willingness absent from the HiPo slide but present in two
other sources (the notes tell the presenter to add it verbally); Low Potential absent from
the Participant Guide development table; "Jordan" used for two different things; and the
duplicate calibration content.

---

## 7. Files

```
index.html          the application shell
style.css           design system — colours, type, components
stage.css           the spatial layer — camera, scenes, reveals, map, drawer
content-a.js        content, sections 1–3
content-b.js        content, sections 4–12
app.js              engine — camera, reveals, all interactions, facilitator mode
assets/
  images/mark.svg   wordmark
  icons/            favicon and UI symbols
  animations/       standalone SVG landmark pulse + a note on where motion lives
server.js           live session server (zero dependencies)
qr.js               QR encoder — the server draws the join code itself
join.html/join.js   participant phone app
live.js             live client for /presenter and /display
make-qr.py          print artwork: high-resolution QR and the join card
render.yaml         one-click Render deploy
tools/
  verify-qr.py      proves qr.js against the reference encoder, and decodes it
  check-server.js   35 live-server assertions
  qr-dump.js        matrix dump used by verify-qr.py
START HERE.txt      one-page launch card
README.md           this file
```

Brand values are taken from the source deck: `#1F3899` navy, `#3D5D7D` slate,
`#FCF3E7` cream. The deck's own fonts (Garet Bold, Red Hat Display) are embedded in the
`.pptx` and are not licensed for redistribution here, so the application uses the Segoe UI
Variable / system stack, which matches the weight and proportions closely and needs no
download.

If you edit any `.js` or `.css` file, bump the `?v=1.0` version strings in `index.html`
so browsers pick the change up instead of serving a cached copy.

---

## 8. Interactions

| Scene | Interaction |
|---|---|
| Opening Confidence | Anonymous 1–5 poll, becomes the baseline |
| Performance Review vs TMR | Ten statements sorted into two sides, then checked |
| Four Talent Dimensions | Expandable cards that assemble the framework as each is opened, then a matching check |
| Talent Classifications | Expandable definitions, then three cases sorted into five categories |
| Competency explorer | All 19 competencies, searchable, filterable to those named today and those used on Jordan |
| The 1–4 scale | Step through four levels with the worked Strategic Awareness example |
| Apply the scale | Four descriptions rated 1–4 with automated explanations |
| Evidence vs Impression | Select what is missing from the seven-item checklist, rewrite the statement, then reveal the stronger version |
| Bias | Three situations, each revealing the bias and its structural safeguard |
| **Jordan** | Digital worksheet — four competency ratings, classification, the 12-month question, three private text fields. Results become four histograms with averages plus classification and 12-month distributions. No answer key. |
| Calibration Challenge | Two leaders, three questions, reveal |
| Development Planning | Match four classifications to four leader focuses |
| Future Considerations | Anonymous pick-two, live ranked visual |
| Final Understanding | Six true/false items |
| Closing Confidence | The identical opening question, with an open-versus-close comparison and the change in average |
| Final Reflection | Protected. No interaction. |

---

## 9. Verification performed

Tested in a real browser, driven through the complete workshop:

- All 32 scenes render — no errors, no empty scenes, all 23 scene types exercised
- A full facilitator run of **201 Continue presses** visits every scene with **zero JavaScript errors and zero blank screens**
- Poll maths confirmed against hand-calculated values (12 responses, average 2.25, 58% for 7 of 12)
- Sort activity: 10 of 10 and 3 of 3 placed and checked correctly
- Quiz reveal marks the correct option, flags the room's wrong choice, shows approved feedback
- Matching: 4 of 4 with per-item feedback
- Jordan: ratings, classification and 12-month counts flow into four histograms with correct averages (3.22 / 2.09 / 2.91 / 1.55)
- Confidence comparison: 2.25 → 4.00, +1.75 delta
- Refresh recovery: scene, reveal position, captured responses and private notes all restored exactly
- Reveal-driven auto-scroll keeps the current reveal inside the frame on every long scene
- Responsive at 1600×900 and 390×844 with no horizontal overflow
- Zero external network requests

---

*Foundational learning — not an implementation of a Business Enablement TMR process.*
