# v3.4 — Final production pass

Master Electronics · Business Enablement · INTERNAL

Everything below is in `main`. Run `npm test` to verify the whole set in about
twenty seconds.

---

## The two failures that were going to happen in front of the room

**A presenter refresh restarted the workshop.** On boot, the console pushed its
own position — scene 0 — to the server, overwriting the live session. The server
is now authoritative: it latches a `staged` flag the moment a scene is pushed,
and a console that opens onto an already-staged session *adopts* its position
instead of announcing one. It only pushes on a genuinely fresh start.

**Progressive reveals never reached the projected display.** `next()` and
`back()` updated the reveal index and repainted locally without ever calling the
live hook — that call only existed on scene boundaries. So the console advanced
and the room screen sat still. Every path that changes what the audience sees now
routes through one function, `liveStage()`.

---

## What the display mirrors now

Scene changes, back navigation, progressive reveals, popups, teaching-point
reveals, discussion prompts, results displays, timers, open and closed activity
states, modal content and activity instructions.

The mechanism is a small serialisable store (`UI` in `app.js`). Anything the room
can see change without the scene changing — an expanded competency definition, a
selected statement, a revealed set of written responses — is a key in that store,
pushed to the server and adopted by the display. Interaction state held only in
the DOM is invisible to a second browser, which is exactly why expanded panels
used to open on the console alone.

The activity timer is re-anchored on every frame and ticked locally on both
roles. The server only broadcasts on change, so a timer painted from the last
frame would have sat frozen on the wall.

**Never on the display:** presenter notes, facilitator controls, private scripts,
debug, the session information bar. Enforced by role and by `data-role` on the
document element, not by hiding things one at a time.

**Participant phones** stay on the waiting screen unless the facilitator opens an
activity. They never mirror the presentation.

---

## No resets, no timeouts

- Node's `requestTimeout`, `headersTimeout` and socket timeouts are disabled; the
  only thing that ends a session is the facilitator.
- Heartbeat every 12s, comfortably inside a typical 60s proxy idle timeout.
- A client watchdog reopens a stream that has gone silent for 40s — a dropped
  connection that the browser has not noticed looks identical to a quiet room.
- Reconnect, tab-return and network-return all pull authoritative state and
  rehydrate. None of them can move the scene.
- There is no inactivity timeout anywhere. A discussion can run as long as it
  runs.
- Connection status is a collapsed dot on the console. It does not interrupt the
  presentation; only a sustained failure says anything.

Presenter refresh restores scene, reveal position, open activity, results
visibility, timer state and session. Display refresh restores the exact audience
state. A phone that slept reconnects to the active activity or the waiting
screen.

---

## Transfer control removed

The first `/presenter` owns the session and keeps it through refreshes,
reconnections and long discussions. A second `/presenter` window is read-only and
useful as a second set of notes. No transfer button, no automatic release, no way
to take over mid-workshop.

The one escape hatch is **Release the facilitator console** on the server landing
page, behind a confirmation, for the case where the console laptop is genuinely
gone. It rotates the key so the old console cannot also still drive the room. The
session, the phones and every response are untouched.

---

## Session information bar

Presenter-only, and collapsed to a single status dot in the top-right, clear of
the scene frame and the bottom navigation. Tap it for code, participant count and
activity state. The projected display gets no persistent overlay at all.

---

## Content

**Slide 17.** Now reads: *"Behavioral competencies provide a common language
across the business, while technical and role-specific expectations vary by
function."* Technical competencies are still evaluated; behavioral competencies
are still the primary focus of development planning.

**Slide 18 — rebuilt.** All 19 competencies as a selectable explorer, the four
Jordan competencies visibly marked, approved definitions shown large enough to
read from the back. Opens with why the room is looking at it before Jordan
appears, ends with the private reflection prompt. The facilitator's "would anyone
like to explore one further?" is in the notes as a required beat. Phones carry the
same 19 as a private reference — clickable, no submission, no name entry, nothing
broadcast.

**Slide 19.** The strip-versus-Quick-Reference-Guide explanation is gone from the
audience view. The 1–4 scale is unchanged.

**Slide 20 — rebuilt.** No longer asks the room to rewrite a Jordan statement
before they have met Jordan. Five statements, sequenced worst to best, each
openable to show what is observable, what is measurable, what is missing and
which of the seven questions it answers. The third — a single specific stakeholder
update — is the teaching moment: specific is not the same as sufficient. Phones
hold the seven questions as reference only, expandable, no answer box. The rewrite
is now a shared whiteboard exercise with Jordan's evidence on screen.

**Slide 24 — rebuilt as an executive case.** Jordan is a Project Manager in
Business Enablement, six years' tenure, two years eight months in role, she/her
throughout. Prior roles, responsibilities, a seven-point timeline, performance
history, six stakeholder observations and six named evidence gaps. The four
approved anchor sentences are preserved verbatim and expanded around.

Deliberately hard: the four competencies do not land on the same level, Development
of Others sits on the 2/3 boundary where calibration rooms actually argue, and two
of the six stakeholder observations are impressions in evidence clothing ("I
feel…", "people say…", "Jordan is always…"). Jordan is fictional and carries no
protected personal information.

Pairs submit one joint response from one phone: four ratings, supporting evidence,
missing evidence, classification, 12-month readiness, business case, first
development action. The rating form is on the phone; the projected screen keeps
the evidence readable for the full fifteen minutes.

**Jordan results.** Distributions plus median, classification and readiness
spread, and the anonymous written responses displayed on the facilitator's call —
each behind its own reveal. Removed: "There is no answer key", "There is no single
forced correct classification for Jordan…", and "Written answers stay on each
participant's own device and are never displayed." Replaced with the honest
version: more than one classification is defensible, none is fully supported, and
in a real calibration room the outcome is a request for more evidence.

**Facilitator challenge.** `facilitator-rating-sheet.html` — printable, marked
facilitator-only, not linked from any participant-facing page. Pre-set ratings
with two deliberately weak plants (Data Literacy 4, Development of Others 1), the
weak rationale to present verbatim, why each is wrong, concession language, the
two pushback questions, and guidance on when to hold versus when to ask for more
evidence.

**Closing scenario — new scene.** The empty chair, as a facilitator-led
visualisation: environment cues to dim the lights and allow silence (facilitator-
only, never projected), the script one line per reveal so it can be spoken slowly,
the resignation email preserved, then "So what happens now?", then the question to
the room. Teaching point connects to continuous talent visibility, and lands on:
*"TMR is not preparation for a meeting. It is the discipline of building readiness
before the business is forced to test it."* Phones collect nothing here. The
confidence question follows and compares against the opening baseline.

**Final reflection.** Question preserved exactly. Submitted privately and
anonymously; displayed only when the facilitator chooses. Calm close, nothing
scored.

**Instructions on every interaction.** Held centrally in `INSTRUCT`
(`content-a.js`) so a scene cannot be added without them, and rendered in a fixed
order on every interactive scene: why, how, what to submit, privacy, scoring,
time, what happens next, what to be ready to discuss. Terse on the projected
screen, fuller on the phone. Executive register throughout — Leadership Decision,
Framework Application, Evidence Review, Calibration Point, Executive
Prioritization, Leadership Reflection. No quiz, game or points language.

**Terminology.** Every instance of "Next-Level Leader" and its variants replaced
with **Senior Leadership**, used consistently. Ten occurrences, all in
`content-b.js`, covering classification mandates, development and utilization
plans, accountability lines, presenter notes and the backup Q&A. Process and
meaning unchanged.

---

## Testing

`npm test` — 128 assertions. Boots a real server, drives it as the console and the
phones do, and asserts: display mirroring for reveals, back navigation, popups,
teaching points, results, timers and activity state; presenter refresh not
resetting; second window read-only; dropped stream recovering without reset; idle
sessions holding; anonymous aggregation with no participant ids in broadcast
state; re-submission replacing rather than doubling; administrative release
behaviour; every scene placed in exactly one section; a renderer for every scene
kind; instructions on every interactive scene; the removed wording actually gone;
and the Jordan anchors preserved verbatim.

`tools/browser-test.html` — open it with the server running. Runs the real
`/presenter`, `/display` and two `/join` pages in frames and walks all 33 scenes
and every reveal, checking the display follows each one; verifies notes and
controls never render on the display; checks the session pill does not overlap
scene content; drives the competency explorer, evidence gallery, expandable
panels, popups and timer and confirms each mirrors; submits from both phones and
confirms anonymous aggregation; then refreshes presenter, display and a phone
mid-workshop and confirms nothing returns to the beginning. Ends with the short
list of things that can only be checked on the real hardware.

---

## Not done

**Presenter assignment.** The final Autumn/Lexi slide allocation was not in the
uploads folder, so presenter ownership per scene is unchanged from the previous
version and the scripts follow the existing `who:` values. The scripts themselves
have been written out properly — assigned presenter, opening sentence, main
explanation, key emphasis, audience instruction, discussion question, anticipated
misconception, debrief language, transition, timing and technology cue — for the
scenes rebuilt in this pass. Send the file and every scene's assignment,
handoffs and transitions get updated against it.

**Hosting unchanged**, as instructed. Render, Auto-Deploy on commit. Health check
now points at `/healthz`, which reports uptime, session code and current scene.
