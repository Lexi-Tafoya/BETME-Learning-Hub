# Building the Future of Talent

**An Introduction to Talent Management Reviews**
Master Electronics · Business Enablement · INTERNAL

A twenty-slide web presentation. One screen, one URL, no server.

---

## Running it

Open `index.html`. That is the whole procedure.

It works three ways, identically:

- double-clicked from a folder (`file://`)
- from a GitHub Pages link
- from any static web host

There is nothing to install, nothing to start, and no network connection is
required once the page has loaded.

## Operating it

| | |
|---|---|
| **Next** | `→` · `Space` · `Enter` · `Page Down` · swipe left |
| **Back** | `←` · `Backspace` · `Page Up` · swipe right |
| **Home** | `Home` key, or the house button |
| **Fullscreen** | `F`, or the corner button |
| **Jump to a slide** | click any tick in the bar along the top |

The controls fade out after a few seconds of stillness and return the moment you
move the mouse or press a key, so the room sees the slide rather than the
interface. The slide number is kept in the address bar, so a reload lands you
back where you were rather than at the beginning.

## The deck

Twenty slides, covering the full run of show.

| | | | |
|---|---|---|---|
| 1 Title | 6 Career paths | 11 Classifications | 16 After classification |
| 2 **Agenda** | 7 Competency matrix | 12 Leader preparation | 17 Through the year |
| 3 Today's purpose | 8 The 1–4 scale | 13 Evidence | 18 BE next steps |
| 4 Why TMR exists | 9 What TMR is / is not | 14 Calibration | 19 Summary |
| 5 How TMR evolved | 10 Talent dimensions | 15 The offsite | 20 Close |

Roughly two hours of material by the presenter-note timings.

Every definition, classification, competency, scale level and leader mandate is
taken verbatim or near-verbatim from the approved source documents.

Bullets appear where they explain something. Most slides are a layout instead —
a three-stage flow, a stepped career ladder, before/during/after columns, an
impression-versus-evidence comparison, classification cards that each end in a
leader action, an eleven-step preparation track.

Discussion happens out loud in the room. There are no activities, polls, forms
or participant devices — by design. Jordan appears once, as a two-line evidence
example, not as a case study.

## Presenter notes

Every slide carries notes: presenter, main point, suggested explanation, one
optional question, transition and approximate time.

They never appear on screen — there is no presenter view, because there is only
one screen. They are in the **printed** output: `Ctrl+P` gives you the deck with
each slide's notes underneath it.

## Files

```
index.html      the page
style.css       the design system and all twenty slide layouts
script.js       the slide content, the presenter notes and the four controls
assets/         icons and the wordmark
tools/          a build check, not needed to run the deck
```

Four files and a folder. If something breaks, it is in one of them.

## Checking a change

```
node tools/check-static.js
```

156 assertions covering the deck's shape, every major topic from the run of
show, presenter notes on every slide, layout variety, the four controls, and —
most usefully — that no network call, storage write or server dependency has
crept back in. It takes about a second and needs no dependencies.

After that, open the page and click through all twenty slides. The check cannot
tell you whether something looks right from the back of a room.

## Publishing

Any static host. For GitHub Pages: **Settings → Pages → Source: Deploy from a
branch → `main` / root → Save**. The site appears at
`https://<user>.github.io/<repo>/` within a minute or two.

There is no build step and no server, so there is nothing to configure and
nothing that can fail at deploy time beyond the files not being there.

## History

This replaced a live multi-screen workshop application — presenter console,
projected display, participant phones, session codes, QR joining and real-time
response collection. That version is preserved in git history at commit
`98c0395`, and its files are listed in `.gitignore` so they stay on the authoring
machine without being published.

The interactive version worked, but it asked a facilitator to manage a server, a
session and three classes of device in front of a room. This asks them to press
Next.
