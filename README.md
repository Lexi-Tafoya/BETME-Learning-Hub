# Building the Future of Talent

**An Introduction to Talent Management Reviews**
Master Electronics · Business Enablement · INTERNAL

A twelve-slide web presentation. One screen, one URL, no server.

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

1. Title
2. Why TMR exists
3. What TMR is, and is not
4. Performance Review or Talent Management Review
5. Four talent dimensions
6. How Operations classifies talent
7. A shared language, and how it is rated
8. Evidence, not impressions
9. Preparation, then calibration
10. Development and utilization plans
11. Questions to carry forward
12. Close

Every definition, classification, competency, scale level and leader mandate is
taken verbatim or near-verbatim from the four approved source documents. Nothing
has been simplified or reworded in a way that changes meaning.

Discussion happens out loud in the room. There are no activities, polls, forms
or participant devices — by design.

## Files

```
index.html      the page
style.css       the design system and all twelve slide layouts
script.js       the slide content and the four controls
assets/         icons and the wordmark
tools/          a build check, not needed to run the deck
```

Four files and a folder. If something breaks, it is in one of them.

## Checking a change

```
node tools/check-static.js
```

One hundred assertions covering the deck's shape, its content, the controls, and
— most usefully — that no network call, storage write or server dependency has
crept back in. It takes about a second and needs no dependencies.

After that, open the page and click through all twelve slides. The check cannot
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
