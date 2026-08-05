#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TMR LEARNING EXPERIENCE — join QR generator
Master Electronics | INTERNAL

Creates print-quality QR artwork for the participant join link, in Master
Electronics colours, and PROVES it scans by decoding it before saving.

You no longer need this to run a session. The server draws the join QR itself at
/qr, /qr.svg and /qr.png, for whatever address the request arrived on, so it is
always current on a LAN, a tunnel or a hosted URL. Use this script when you want
the printable card or a high-resolution PNG for a poster or a Teams message.

    python make-qr.py                          auto-detect this laptop's LAN URL
    python make-qr.py https://your.app/join    after deploying to a public host
    python make-qr.py --port 9000              different port

Writes, next to this script:
    assets/join-qr.svg      vector, for print and for the presentation
    assets/join-qr.png      1200 x 1200, for slides, Teams, posters
    assets/join-qr-card.png a printable A-ish card with the URL and code space

Requires:  pip install qrcode
Verification uses opencv if available (pip install opencv-python-headless).
"""
import os
import socket
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "assets")

NAVY = (12, 20, 54)
CREAM = (252, 243, 231)
WHITE = (255, 255, 255)


def lan_ip():
    """Best-effort primary LAN address, without sending anything."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.255.255.255", 1))
        return s.getsockname()[0]
    except Exception:
        try:
            return socket.gethostbyname(socket.gethostname())
        except Exception:
            return "127.0.0.1"
    finally:
        s.close()


def build(url):
    try:
        import qrcode
        from qrcode.constants import ERROR_CORRECT_M
    except ImportError:
        sys.exit("Missing dependency. Run:  pip install qrcode")

    os.makedirs(ASSETS, exist_ok=True)

    qr = qrcode.QRCode(version=None, error_correction=ERROR_CORRECT_M,
                       box_size=10, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    matrix = qr.get_matrix()
    n = len(matrix)

    # ---------------------------------------------------------------- SVG
    px, q = 10, 4
    dim = (n + q * 2) * px
    path = []
    for r, row in enumerate(matrix):
        for c, on in enumerate(row):
            if on:
                path.append(f"M{(c + q) * px} {(r + q) * px}h{px}v{px}h{-px}z")
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{dim}" height="{dim}" '
        f'viewBox="0 0 {dim} {dim}" shape-rendering="crispEdges" role="img" '
        f'aria-label="Scan to join the Master Electronics TMR session">\n'
        f'  <title>Join the TMR session</title>\n'
        f'  <rect width="{dim}" height="{dim}" rx="{px*2}" fill="#FFFFFF"/>\n'
        f'  <path d="{"".join(path)}" fill="#0C1436"/>\n'
        f'</svg>\n'
    )
    svg_p = os.path.join(ASSETS, "join-qr.svg")
    with open(svg_p, "w", encoding="utf-8") as f:
        f.write(svg)

    # ---------------------------------------------------------------- PNG
    from PIL import Image, ImageDraw, ImageFont
    scale = max(1, 1200 // (n + q * 2))
    size = (n + q * 2) * scale
    img = Image.new("RGB", (size, size), WHITE)
    d = ImageDraw.Draw(img)
    for r, row in enumerate(matrix):
        for c, on in enumerate(row):
            if on:
                x0, y0 = (c + q) * scale, (r + q) * scale
                d.rectangle([x0, y0, x0 + scale - 1, y0 + scale - 1], fill=NAVY)
    png_p = os.path.join(ASSETS, "join-qr.png")
    img.save(png_p, "PNG", optimize=True)

    # ------------------------------------------------------- printable card
    def font(sz, bold=False):
        for nm in (("seguisb.ttf", "arialbd.ttf") if bold else ("segoeui.ttf", "arial.ttf")):
            try:
                return ImageFont.truetype(nm, sz)
            except Exception:
                continue
        return ImageFont.load_default()

    CW, CH = 1200, 1600
    card = Image.new("RGB", (CW, CH), NAVY)
    cd = ImageDraw.Draw(card)

    def ctr(txt, y, f, fill=CREAM):
        bb = cd.textbbox((0, 0), txt, font=f)
        cd.text(((CW - (bb[2] - bb[0])) / 2 - bb[0], y), txt, font=f, fill=fill)

    ctr("MASTER ELECTRONICS", 78, font(30, True), (196, 190, 178))
    ctr("Join the session", 130, font(58, True))
    ctr("Scan once. Keep the page open for the whole workshop.", 216, font(27),
        (196, 190, 178))

    qbox = 760
    qimg = img.resize((qbox, qbox), Image.NEAREST)
    card.paste(qimg, ((CW - qbox) // 2, 300))

    ctr(url, 1112, font(26), (196, 190, 178))
    cd.rounded_rectangle([210, 1180, CW - 210, 1420], radius=26, fill=(61, 93, 125))
    ctr("No name, no email, no login.", 1224, font(30, True))
    ctr("Your answers are anonymous. Only group", 1276, font(25), (230, 224, 212))
    ctr("totals ever appear on the screen.", 1312, font(25), (230, 224, 212))
    ctr("Never name or describe a real employee.", 1360, font(25), (230, 224, 212))
    ctr("INTERNAL", CH - 60, font(24, True), (138, 164, 255))
    card_p = os.path.join(ASSETS, "join-qr-card.png")
    card.save(card_p, "PNG", optimize=True)

    return svg_p, png_p, card_p, n, img


def verify(img, url):
    """Decode our own PNG to prove it scans. Returns (ok, decoded)."""
    try:
        import numpy as np
        import cv2
    except ImportError:
        return None, "opencv not installed - skipped (pip install opencv-python-headless)"
    arr = np.array(img.convert("L"))
    data, _, _ = cv2.QRCodeDetector().detectAndDecode(arr)
    return (data == url), data


def main():
    args = [a for a in sys.argv[1:]]
    port = 8080
    if "--port" in args:
        i = args.index("--port")
        port = int(args[i + 1])
        del args[i:i + 2]
    url = args[0] if args else f"http://{lan_ip()}:{port}/join"
    if not url.startswith("http"):
        sys.exit("The URL must start with http:// or https://")

    svg_p, png_p, card_p, n, img = build(url)
    ok, decoded = verify(img, url)

    bar = "=" * 68
    print("\n" + bar)
    print("  TMR join QR code generated")
    print(bar)
    print(f"\n  Encodes:   {url}")
    print(f"  Version:   {(n - 17) // 4}  ({n} x {n} modules)  error correction M")
    print("\n  Files:")
    for p in (svg_p, png_p, card_p):
        print(f"    {os.path.relpath(p, HERE)}   ({os.path.getsize(p):,} bytes)")
    if ok is True:
        print(f"\n  VERIFIED: decoded back to exactly the target URL.")
    elif ok is False:
        print(f"\n  *** WARNING: decode returned {decoded!r} — do not use this code. ***")
        sys.exit(1)
    else:
        print(f"\n  Not verified: {decoded}")
    print("\n  For print and posters. A running session does not need these files —")
    print("  the server draws its own QR at /qr for the address it is reached on.")
    print(bar + "\n")


if __name__ == "__main__":
    main()
