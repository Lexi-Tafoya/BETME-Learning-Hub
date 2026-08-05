# HANDOFF — Business Enablement TMR Learning Experience

**Paste this whole file into a new chat as your first message.**

---

## Read this first, new chat

**Project folder — the only one to use:**
```
C:\Users\alexandra.tafoya\Downloads\BETMR
```
Do **not** save, reference, edit or route anything through the MasterFlow project.
This work is unrelated to it.

**Current working build:** `BETMR\TMR Learning Experience\`
**Latest package:** `BETMR\TMR Learning Experience v3.1 LIVE.zip`
**Backups:** `BETMR\_backups\` — back up before any structural change.

Continue from these files. **Do not rebuild the experience from scratch.**

---

## What this is

A facilitator-led, Prezi-style executive presentation that replaces a 32-slide
PowerPoint for a 3-hour Talent Management Review workshop. Autumn and Lexi
present; participants answer anonymously from their phones; the projected screen
shows live group results.

- Plain HTML/CSS/JS + one zero-dependency Node server. No frameworks, no npm install.
- 32 scenes across 12 spatial sections, 180 minutes, 201 Continue presses.
- 12 scenes take anonymous phone responses.

## How to run it

```bash
cd "C:\Users\alexandra.tafoya\Downloads\BETMR\TMR Learning Experience"
node server.js
```

Prints three links. Roles:

| Route | Device | Notes |
|---|---|---|
| `/presenter?key=…` | Facilitator laptop | **The `?key=` is required.** Regenerated every server start; read it from the terminal. Without it, control actions 401 and phones never update. |
| `/display` | Room screen | Clean. Notes/controls hidden. Mirrors the presenter. |
| `/join` | Phones | One scan, whole session. Same Wi-Fi as the laptop. |

**Backup mode:** double-click `index.html` — the whole workshop runs offline with
answers captured on the laptop. Keep this working; it is the fallback.

## File map

| File | Role |
|---|---|
| `index.html` | Presentation shell (used by `/presenter` and `/display`) |
| `app.js` | Engine: spatial camera, reveals, all scene renderers, facilitator drawer, `Vote` store |
| `content-a.js` / `content-b.js` | All approved content as a `STEPS` array. **Single source of truth for content.** |
| `stage.css` | Spatial layer: camera, scenes, reveals, journey map, live UI |
| `style.css` | Component vocabulary: cards, options, charts, panels |
| `live.js` | Live client. Role detection, SSE, auto-open, control actions, QR modal |
| `join.html` / `join.js` | Participant phone app |
| `server.js` | Session server: SSE, anonymous aggregation, routes, API |
| `make-qr.py` | Generates a decode-verified join QR (`pip install qrcode`) |
| `HOSTING.md` | Deployment options |
| `CHANGES-v3.md` | Full change log + test results |

## Key architecture facts

- **`Vote` in `app.js` is the single seam for all responses.** Server aggregates
  arrive as `{"stepId::key": {optionIndex: count}}` — exactly `Vote`'s shape — so
  live data lights up every existing chart without touching any scene.
- **`app.js` calls `window.LIVE.onStage(i, rv)` inside `goto()`.** That is how the
  presenter pushes stage changes and how auto-open fires.
- Top-level `const` is script-scoped, so `app.js` exports explicitly at the bottom
  (`window.STEPS`, `window.State`, `window.Vote`, `window.gotoStep`, `window.flashMsg`).
- **Which scenes take phone input** is defined twice and must stay in sync:
  `fields()` in `join.js` and `PHONE_KINDS`/`takesPhone()` in `live.js`.
  A scene with `noPhone:true` is deliberately facilitator-led.
- Cache-busting: bump `?v=` in `index.html` **and** `join.html` after editing JS/CSS,
  or browsers serve stale files. This has bitten twice.

## Hard content rules — do not violate

Sourced from four approved documents (`.pptx` + 3 `.docx` in `BETMR\..\Downloads\`).

- Never change the 4 classifications, 4 dimensions, or the Master Electronics 1–4 scale.
- **Jordan has no correct classification.** The activity is unscored with no answer
  key. Do not add one.
- Final Reflection wording is exact; it is private to each phone, never displayed.
- Operations TMR is **established, mature, evidence-based, and a living framework
  that evolves as roles evolve**. Never describe it as immature or unfinished.
  (This was corrected in v3 — do not regress it.)
- Business Enablement has **no** calibration governance; nothing is being decided
  in this workshop. It is foundational learning, not implementation.
- Keep the INTERNAL designation, the visual identity, Autumn/Lexi's roles, all four
  handoffs, presenter notes, and the 180-minute timing.
- Privacy: no names, emails, employee IDs, logins, or real-employee information.
  Nothing written to disk.

## Design philosophy (from the user, round 2)

> Every screen should answer one leadership question, create one meaningful
> discussion, or move the audience toward one insight. If a screen simply presents
> information that could have been read in a document, redesign it until
> participants experience the idea rather than read it.

- **Leadership decisions, not quizzes.** Pattern: leadership decision → anonymous
  response → visible room pattern → facilitator discussion → takeaway.
- Room-facing labels use leadership language (Leadership Decision, Framework
  Application, Evidence Review, Calibration Point, Executive Priorities).
  **Never** "Activity", "Quiz", "Knowledge Check", "Exercise".
- Let disagreement be the lesson. Never converge on a single right answer for Jordan.
- Source citations and facilitator notes must **never** consume a Continue press.
- Use silence deliberately. Reveal one idea at a time.

## Verified working (tested in-browser + against the real server)

- Full run: 201 Continue presses, 32/32 scenes, 0 JS errors, 0 blank screens.
- 3 simulated phones: 17/17 server checks. Duplicate submission **replaces, never
  doubles**. Closed → 409, reopen → 200. No participant id in broadcast state.
- Live phone data renders in existing charts; open→close confidence delta computed
  from real submissions.
- `/display` mirrors the presenter exactly and hides all notes/controls.
- Auto-open verified: every phone scene opens on arrival, teaching scenes return
  phones to waiting, `calibration-challenge` stays closed.
- QR decode-verified back to the exact join URL.

## Open items / what to do next

### 1. Public link (the main outstanding ask)
The user wants a link that works on **any** network with **no code**, just a scan.
The session code is already optional — scanning is sufficient; the code is only a
displayed fallback.

Two paths, both need one action from the user:

- **Fastest, no account:** Cloudflare quick tunnel.
  ```bash
  cloudflared tunnel --url http://localhost:8080
  ```
  Prints a public `https://…trycloudflare.com` URL that works on cell data and any
  Wi-Fi. Then regenerate the QR:
  `python make-qr.py https://<that-url>/join`
  Requires installing `cloudflared` once. Laptop must stay running.
- **Permanent hosted:** deploy to Azure App Service (best fit for a Microsoft
  tenant) or Render. Zero dependencies, so no build step. Set `PUBLIC_URL` env var,
  then regenerate the QR. Exact commands in `HOSTING.md`.

**I could not deploy** — it requires signing in to a hosting account.
**Flag before hosting publicly:** the content carries an INTERNAL Purview marking.
Azure inside their own subscription avoids the data-classification question; a
public free tier may not. Worth one check.

### 2. Consider removing the facilitator `?key=` friction
The user hit the phone-not-updating bug partly because the presenter was opened
without the key. Options: auto-issue the key via a first-visit cookie, or show a
prominent banner on `/presenter` when the key is missing. Currently it only
flashes a message.

### 3. Not yet done from round 2
- "Make Jordan feel like a case study" — richer build-up (role, team, history,
  performance snapshots, peer feedback) before the worksheet. Content must stay
  within the approved evidence; Jordan's four evidence statements cannot change.
- "Don't tell them TMR, let them discover it" — reordering the opening so the
  framework is named after the need for it emerges. Larger structural change;
  discuss before attempting.
- An "empty chair" emotional beat at the opening was suggested, not built.

## Bugs already found and fixed — don't reintroduce

1. `if (sel)` failed for tile index 0 — first sort item could never be placed.
2. `compareWith` pointed at a stale key, so the confidence comparison showed "—".
3. Camera animated on first paint; CSS transitions don't advance without a
   compositor, so a freshly-connected projector could show a blank screen. First
   paint now snaps, with a self-heal.
4. `scrollIntoView` scrolled the `.viewport` ancestor and dragged the whole canvas
   off-screen. Reveal scrolling is now contained to its own container.
5. Scene opacity had the same compositor problem → `healScenes()` in `app.js`.
6. `screenWaiting()` read `ST.code` before `ST` was assigned, silently killing the
   phone app's boot.
7. Auto-open (v3.1): arriving at an activity scene didn't open it on phones.

## Current session state (as of handoff)

A server may still be running on port 8080 from the previous chat. If the links
are dead, just restart it. The facilitator key changes on every restart.
