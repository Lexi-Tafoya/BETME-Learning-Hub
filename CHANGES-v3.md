# v3 — live participant phones + Round 2 creative refinements

**Master Electronics | INTERNAL** · Business Enablement TMR project
Working folder: `C:\Users\alexandra.tafoya\Downloads\BETMR`
Backup of v2: `_backups\TMR Learning Experience BACKUP 2026-08-04_1838\` (+ .zip)

---

## 1. Files added

| File | Purpose |
|---|---|
| `server.js` | Live session server. Zero dependencies, Node built-ins only. Routes `/`, `/presenter`, `/display`, `/join`, `/qr`, plus the API. |
| `join.html` | Participant phone app shell. |
| `join.js` | Participant logic: anonymous id, SSE, waiting → activity → confirmation. |
| `live.js` | Live client for the presentation. Role detection, SSE, control actions, QR modal. |
| `make-qr.py` | Generates a real, decode-verified QR for the join link. |
| `assets/join-qr.svg` | Working QR, vector. |
| `assets/join-qr.png` | Working QR, 1200 × 1200. |
| `assets/join-qr-card.png` | Printable join card with the URL and the privacy note. |
| `package.json`, `Procfile`, `.gitignore` | Deployment config. No dependencies. |
| `HOSTING.md` | The single authentication step, per host. |
| `CHANGES-v3.md` | This file. |

Removed: `optional-live-sync/` — superseded, its server became the real one.

## 2. Files modified

| File | Change |
|---|---|
| `index.html` | Loads `live.js`. Cache version → 3.0. |
| `app.js` | Stage hook inside `goto()`; explicit exports for `live.js`; dimensions renderer rebuilt as a leadership scenario; `why this matters` slots; full-circle callback slot; source citations no longer consume a click. |
| `content-a.js` | Operations story rewritten for accuracy; Four Talent Dimensions reframed; matching quiz removed; executive vocabulary; timings. |
| `content-b.js` | True/False check removed; calibration wording rescoped; full-circle callback added; `noPhone` on the calibration challenge; executive vocabulary; timings. |
| `stage.css` | Live session layer; neighbouring-scene suppression; scenario and why-this-matters styles; evidence readability; callback styles. |
| `join.js` | Respects `noPhone`. |
| `START HERE.txt`, `README.md` | Rewritten for the live session. |

## 3. Round 2 creative revisions applied

| You asked for | What changed |
|---|---|
| Stop calling them "Activities" | Every room-facing label is now leadership language: **Leadership Decision, Framework Application, Evidence Review, Calibration Point, Executive Priorities, Leadership Reflection, What this room decided**. No "activity", "quiz", "knowledge check" or "exercise" remains on any participant-facing screen. |
| Remove the True/False knowledge check | Removed entirely. Not replaced. |
| Rework the Four Talent Dimensions | No longer a matching exercise. The section now opens with a leadership question — *"What questions should every leader ask before talking about someone's future?"* — and a real succession scenario. Four questions are put to the room; each dimension arrives as the **resolution of the room's own argument**. The official definitions and leader mandates follow underneath. |
| Give every interaction a "why this matters" | Added to all four dimensions, explaining what leaders get wrong and what it costs. |
| Operations story accuracy | All language implying the framework is immature or unfinished is gone. It now says Operations built TMR to establish a common language, that the framework is **established, mature and evidence-based**, and that it is a **living framework** that evolves as roles evolve — leads doing work that used to sit with supervisors — *because the organisation moves, not because the framework is incomplete*. |
| Slide 2 extra clicks | Fixed, and fixed systemically. Source citations no longer consume a click anywhere in the experience, and the five-second-silence instruction moved into facilitator mode. The opening question is 5 reveals → **3**. Whole workshop: 236 → **201** Continue presses. |
| Neighbouring scenes competing | Neighbour opacity 0.13 → **0.028** plus a 2px blur; landmark text 0.10 → 0.045; connector paths 0.16 → 0.07; active scene background deepened to near-opaque. The spatial feeling is intact; background text can no longer compete. |
| Evidence card readability | Both cards now share one hierarchy: equal padding, 16px list text in full-strength ink, gold section labels at 11.5px/.15em. The checklist card no longer reads as secondary. |
| Finish where you started | The closing confidence scene now re-states the **exact opening question** above it and asks directly whether confidence has changed. |
| Participant phones as core | 12 moments now take anonymous phone responses (list below). |
| Future BE prioritization on phones | Voting is on phones; the ranked visual updates live; the discussion afterwards is unchanged. |
| Jordan on phones | Whole worksheet on phones — four ratings, classification, 12-month question, missing evidence, development recommendation. Projected screen updates live with anonymous distributions. |
| Final Reflection on phones | Submitted privately from phones. Wording unchanged. |
| "Two leaders, same competency" stays facilitator-led | Marked `noPhone`. Phones show the waiting screen; it remains a group discussion. |
| Keep manual entry as backup | Kept. Every activity still accepts room capture on the laptop, and `index.html` opened directly runs the entire workshop with no server at all. |

## 4. Preserved exactly, as instructed

Opening confidence question · Leadership Succession Challenge · Performance
Review vs TMR including "the one that splits a room" · How Operations
classifies talent · Which classification does the evidence support · Rate each
description on the 1–4 scale · Rewrite the statement · Reducing Bias · Rate
Jordan and its 7/8/7 structure · Two leaders, same competency · The same
question, three hours later · Final Reflection wording · Autumn and Lexi's
speaking roles and all four handoffs · presenter notes · 180 minutes · the
INTERNAL designation · the Master Electronics visual identity · Jordan's exact
evidence · no forced Jordan classification.

## 5. Test results

Run against the real server with three simulated phones plus browser tabs for
the facilitator console and the projected display.

**Server (`/api` end-to-end)**

| Check | Result |
|---|---|
| Three participants join, counted | 3 |
| Submitting to an activity that is not open | rejected, 409 |
| Multiple-choice aggregation | correct |
| **Duplicate submission from the same phone** | **replaces, never doubles** — counts went `{0:1, 2:2}` → `{2:2, 4:1}`, still 3 submissions |
| Close responses → submit | rejected, 409 |
| Reopen → submit | accepted, 200 |
| Jordan ratings / classification / 12-month | aggregated correctly |
| Written answers | returned with no identifier |
| Empty response set | reported empty, no fake bars |
| Show / hide results, reveal | flags correct |
| Timer start / pause / reset | ran 1.0s, paused within 120ms, reset to 0 |
| Unauthorised control attempt | rejected, 401 |
| **Participant ids in broadcast state** | **none — verified absent** |

**Presentation**

| Check | Result |
|---|---|
| Full facilitator run, Continue only | 201 presses, 32/32 scenes, **0 JS errors, 0 blank screens, 0 misframed scenes** |
| Live phone responses render in existing charts | Jordan histograms 0/0/2/1 etc., averages 3.33 / 2.33 / 2.67 / 1.55 |
| Opening → closing confidence comparison from phone data | 3.33 → 4.33, **+1.00** |
| Display mirrors presenter | stepIndex 9 / rv 2, in sync |
| Projected screen is clean | notes, cue, Continue and all controls hidden; controls not even created |
| Presenter refresh | resumes on the same scene, responses intact |
| Participant refresh / sleep | reconnects and resumes |
| Phone follows a newly opened activity | switched to "Rate Jordan" with no reload and no rescan |
| Phone submit | confirmation screen, change-answer offered while open |
| QR code | **decode-verified** back to the exact join URL |
| Timing | 180 minutes across 32 scenes |

## 6. Phone coverage

**On phones (12):** opening confidence · Performance Review vs TMR ·
which classification does the evidence support · the 1–4 scale · rewrite the
statement · reducing bias · leader preparation · Rate Jordan · development and
utilization · future Business Enablement priorities · closing confidence ·
Final Reflection.

**Facilitator-led (20):** every teaching scene, plus "Two leaders, same
competency" by your instruction.

## 7. Known limitation

The live session runs on your laptop and phones must share its network. A public
URL needs one sign-in to a hosting account, which I cannot do for you — see
`HOSTING.md` for the exact single command per host. The app is fully configured
and dependency-free, so deployment is one action, not a project.

---

# v3.2 — the QR and the facilitator key stop being things you maintain

Two pieces of friction were, on inspection, the same problem: a fact about *how
the session is reachable* was being decided once, ahead of time, and then going
stale. The pre-generated QR encoded whichever address the laptop had when
`make-qr.py` last ran. The facilitator key had to be carried in the URL. Both
failed silently and both failed in front of a room.

## Files added

| File | Purpose |
|---|---|
| `qr.js` | QR encoder. Byte mode, error correction M, versions 1–10, standard mask selection. Zero dependencies. |
| `render.yaml` | One-click Render deploy from the GitHub repo. |
| `tools/verify-qr.py` | Proves `qr.js` correct: matrix diff against the reference encoder, plus a real decode. |
| `tools/qr-dump.js` | Matrix dump the verifier compares against. |
| `tools/check-server.js` | 32 live-server assertions, runnable against a deploy. |

Removed: `assets/join-qr.svg`, `assets/join-qr.png` — the server draws these
now, and keeping stale copies invited serving the wrong one. `make-qr.py` still
generates them, plus the printable card, for posters and Teams.

## What changed

| Was | Is |
|---|---|
| `/qr` served a file generated ahead of time by `make-qr.py`. Wrong after any network change. | `/qr`, `/qr.svg`, `/qr.png` are drawn per request for the address the request arrived on. Correct on a LAN, behind a tunnel, and on a hosted URL with nothing to regenerate. |
| The QR modal printed `location.origin + '/join'` — `http://localhost:8080/join` on the console, which no phone in the room can reach. | It prints the address the server actually hands out. |
| `/presenter` without `?key=` looked fine and then failed on every control, with one transient flash. | The first visit from the laptop running the server claims the console via an httpOnly cookie. Nothing to paste. Using the `?key=` link also sets the cookie, so a refresh stays in control. |
| A console that was not in control gave no standing indication. | A standing banner names the situation, says what still works, and says how to take control back. |
| The facilitator key was random every start, readable only from the log. | `FAC_KEY` makes it a fixed value, so a hosted presenter link is bookmarkable. Random remains the default. |

Auto-claim is restricted to loopback, so on a public URL the first stranger to
open `/presenter` cannot take the session. That is the reason `FAC_KEY` exists.

## Verification

**`python tools/verify-qr.py` — 120 checks, all passing.** For twelve join URLs
spanning versions 1, 2, 3, 4, 5, 8 and 10, the module matrix is compared cell by
cell against the reference `qrcode` library across all eight mask patterns, the
automatically chosen mask matches, and every rendered PNG decodes back to its
exact URL through OpenCV.

Worth recording, because it is the only reason this is trustworthy: the first
run failed all 120. Thirteen cells differed — the format-information strips.
The bit order of both copies was reversed and it was overwriting the dark
module. Every data module was already correct, which is exactly the failure a
glance cannot catch: a tidy, plausible, completely unreadable square.

**`node tools/check-server.js` — 32 checks, all passing**, on a fresh server
with and without `FAC_KEY` (33 with). Covers the pages, the QR following
`x-forwarded-host` the way a hosted deploy needs, control on the cookie alone,
a proxied request being refused auto-claim, three phones aggregating,
resubmission replacing rather than doubling, close → 409, reopen → 200, written
answers arriving unattributed, SSE, export, and reset.

**In a real browser.** 201 Continue presses, 32/32 scenes, 0 blank, 0 JS errors,
0 failed requests. Auto-open still fires on phone scenes and still leaves
`calibration-challenge` closed. `/display` mirrored the presenter at step 11
reveal 2 with notes and controls hidden. The banner appeared when the console
was claimed elsewhere, cleared when opened with the key, and stayed cleared on a
refresh with no key. A stale cookie after a server restart re-claims cleanly.
Backup mode still reports `role: standalone`, creates no live chrome, and records
a laptop-captured vote. Banner checked at 375 px: no overflow, 44 px touch target.

## Not changed

No content, no scene, no timing, no classification, no dimension, no scale, no
Jordan evidence, no Final Reflection wording, no presenter note, no handoff.
`content-a.js` and `content-b.js` are untouched. The four round-2 items still
open — the Jordan case-study build-up, discovering TMR before it is named, and
the empty-chair beat — remain open, as they need your decision first.
