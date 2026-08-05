# Hosting the TMR Learning Experience

**Master Electronics | INTERNAL**

---

## It already runs live, today, with no account

`node server.js` gives you a genuinely working live session on your own laptop:
real URLs, a real scannable QR code, real phones joining, real anonymous
aggregation, real live charts. Participants just need to be on the same Wi-Fi.

**For a workshop in a room, that is the whole answer.** Nothing below is required.

The join QR is drawn by the server at request time, for whatever address the
request arrived on. Change Wi-Fi, change ports, put it behind a tunnel, deploy it
— `/qr` stays correct on its own. There is nothing to regenerate.

---

## A link that works on any network

The one thing that needs you: a hosting account. Everything else is done. The app
has no dependencies and no build step, so deploying is genuinely a single action.

### Render, from the GitHub repo — the recommended path

The repo already contains `render.yaml`, so Render configures itself.

1. Go to **render.com** and sign in with GitHub.
2. **New → Blueprint**.
3. Pick **`Lexi-Tafoya/BETME-Learning-Hub`** and confirm.

That is the whole deploy. You get a permanent address:

```
https://tmr-learning-experience.onrender.com
```

| | |
|---|---|
| Landing page, every link | `https://<host>/` |
| Facilitator console | `https://<host>/presenter` — open it first and it is yours |
| Projected display | `https://<host>/display` |
| Participants | `https://<host>/join` |
| Join QR | `https://<host>/qr` — already correct, nothing to regenerate |

Then generate the printable card once, for posters and Teams:

```bash
python make-qr.py https://tmr-learning-experience.onrender.com/join
```

**Two things to know about the free plan.** It sleeps after about 15 minutes of
no traffic, so the first request after a quiet period takes 30–50 seconds — open
the console a few minutes before the room fills, and it will stay awake for the
whole session because the phones hold open SSE connections. And an instance
restart clears session state, because nothing is written to disk by design. If
either matters, the paid plan removes both.

### Azure App Service — if the classification answer is "keep it in the tenant"

```bash
az login
az webapp up --runtime "NODE:20-lts" --name tmr-workshop --sku B1
```

That is enough. `PUBLIC_URL` is optional — the server reads the hostname from
the request. Set it only if you put a custom domain in front and want every
printed link to show that domain instead.

### Cloudflare quick tunnel — fastest, no account, laptop stays the host

```bash
cloudflared tunnel --url http://localhost:8080
```

Prints a public `https://….trycloudflare.com` address that works on cell data
and any Wi-Fi. Your laptop serves the session; the tunnel just publishes it. The
QR at `/qr` picks up the tunnel hostname automatically, so scan the one on
screen — the address changes every time you start a tunnel, so do not print it.

---

## Two things to settle before a real session on a public URL

### 1. The facilitator console

There is nothing to set up, on a laptop or on a public URL. Open `/presenter`
and you are the presenter. A refresh keeps it.

The protection on a public URL is that **only one console is live at a time.**
Whoever opens `/presenter` first holds it. Everyone arriving after that gets a
read-only view that follows the presenter with its controls hidden, and is told
that another facilitator is already presenting. The only way the console moves is
the **Administrative reset** on the server landing page, which
frees the claim and revokes their own session in the same action, so a hand-off
can never leave two people driving the room.

So open `/presenter` yourself before you share the URL, and you hold the session
for its duration. No key, no token, no environment variable.

### 2. Whether a public host is acceptable at all

The content carries an **INTERNAL** Purview marking. Participant responses are
anonymous and nothing is written to disk, but the *content* would be served from
outside the tenant. **Azure App Service inside your own subscription is the
clean answer to that; a public free tier is not.** Worth one conversation with
whoever owns data classification before you point a QR code at it.

If the answer is "keep it internal", the LAN mode you already have is the right
deployment and no hosting step is needed at all.

---

## Environment variables

| Variable | Purpose | Default |
|---|---|---|
| `PORT` | Listening port | `8080` |
| `PUBLIC_URL` | Forces the advertised base URL, overriding the request host | auto-detected |

Both are optional. Nothing needs to be set to run a session.

## What the server needs

Node 18 or newer. Nothing else. `npm install` does nothing because there are no
dependencies — that is deliberate, so there is no supply chain to review and
nothing to break at startup.

## Checking a deploy

```bash
node tools/check-server.js https://your-host
```

35 assertions covering pages, the QR, facilitator access, anonymous aggregation,
duplicate submissions, closing and reopening, SSE and export. Exits non-zero on
failure. It expects a server nothing has driven yet, and will say so if the
console is already claimed.
