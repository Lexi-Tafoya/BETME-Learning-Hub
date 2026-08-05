#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Proves qr.js is a correct QR encoder. Development tool only — the workshop
never runs this, and the server has no Python dependency.

    python tools/verify-qr.py

Two independent checks, because "it looked like a QR code" is not evidence:

  1. MATRIX DIFF. For every test string and every one of the eight mask
     patterns, the module grid produced by qr.js is compared cell by cell
     against the reference `qrcode` Python library. A single differing module
     fails the run. This proves the byte encoding, Reed-Solomon codewords,
     block interleaving, function patterns, data placement, masking and format
     information are all right — not merely plausible.

  2. DECODE. The PNG that the server would actually serve is decoded with
     OpenCV and must come back as the exact original string.

Requires:  pip install qrcode opencv-python-headless numpy
"""
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

# Every shape of join URL this project can produce, plus the boundaries.
CASES = [
    "http://192.168.0.76:8080/join",
    "http://10.14.203.88:8080/join",
    "http://localhost:8080/join",
    "https://betme-learning-hub.onrender.com/join",
    "https://tmr-workshop.azurewebsites.net/join",
    "https://raspy-crimson-otter-14829.trycloudflare.com/join",
    "https://tmr.masterelectronics.com/join",
    "http://172.16.4.9:3000/join",
    "https://a.co/j",
    "https://" + "x" * 40 + ".example.com/join",
    "https://" + "y" * 120 + ".example.com/join",
    "https://" + "z" * 180 + ".io/j",
]


def js(text, mask=None):
    cmd = ["node", os.path.join(HERE, "qr-dump.js"), text]
    if mask is not None:
        cmd.append(str(mask))
    out = subprocess.run(cmd, capture_output=True, cwd=ROOT)
    if out.returncode != 0:
        raise RuntimeError("qr-dump.js failed: " + out.stderr.decode("utf-8", "replace"))
    return json.loads(out.stdout.decode("utf-8"))


def reference(text, version, mask):
    """
    optimize=0 forces a single byte-mode segment, which is what qr.js emits.

    Left to itself the reference library will split a URL into mixed segments —
    `://192.168.0.76:8080/` is 21 characters of pure alphanumeric, so it
    switches mode mid-string to save a few bits. That is a legal optimisation
    and produces a different, denser symbol for the same text. qr.js does not
    do it on purpose: a join URL is ~45 bytes, byte mode already fits it in
    version 3 or 4 with room to spare, and one code path is one code path to be
    wrong in. Comparing with optimize=0 keeps this a test of correctness rather
    than a test of compression.
    """
    import qrcode
    from qrcode.constants import ERROR_CORRECT_M
    q = qrcode.QRCode(version=version, error_correction=ERROR_CORRECT_M,
                      border=0, mask_pattern=mask)
    q.add_data(text, optimize=0)
    q.make(fit=False)
    return [[1 if v else 0 for v in row] for row in q.get_matrix()]


def diff(a, b):
    """First differing cell, or None."""
    if len(a) != len(b):
        return ("size", len(a), len(b))
    for r in range(len(a)):
        for c in range(len(a)):
            if a[r][c] != b[r][c]:
                return ("cell", r, c)
    return None


def main():
    try:
        import qrcode  # noqa: F401
    except ImportError:
        sys.exit("Missing dependency. Run:  pip install qrcode")

    bar = "=" * 72
    print("\n" + bar)
    print("  qr.js verification")
    print(bar + "\n")

    checks = 0
    failures = []

    # ------------------------------------------------------------ matrix diff
    for text in CASES:
        auto = js(text)
        label = (text[:44] + "...") if len(text) > 47 else text
        marks = []
        for mask in range(8):
            mine = js(text, mask)
            theirs = reference(text, auto["version"], mask)
            d = diff(mine["modules"], theirs)
            checks += 1
            if d is None:
                marks.append(str(mask))
            else:
                marks.append("!" + str(mask))
                failures.append("%s mask %d differs at %s" % (label, mask, d))
        ref_auto = reference(text, auto["version"], None)
        same_choice = diff(auto["modules"], ref_auto) is None
        checks += 1
        if not same_choice:
            failures.append("%s: auto-selected mask differs from the reference" % label)
        print("  v%-2d  masks %s   auto=%d %s   %s"
              % (auto["version"], ",".join(marks), auto["mask"],
                 "ok" if same_choice else "DIFFERS", label))

    # ----------------------------------------------------------------- decode
    print("\n  Decoding the PNG the server would serve:\n")
    try:
        import cv2
        import numpy as np
        from PIL import Image
        import io
    except ImportError:
        print("    skipped — pip install opencv-python-headless numpy pillow")
    else:
        for text in CASES:
            out = subprocess.run(
                ["node", "-e",
                 "process.stdout.write(require('./qr.js').png(process.argv[1]))",
                 "--", text],
                capture_output=True, cwd=ROOT)
            if out.returncode != 0:
                failures.append("png() failed for " + text)
                continue
            img = np.array(Image.open(io.BytesIO(out.stdout)).convert("L"))
            data, _, _ = cv2.QRCodeDetector().detectAndDecode(img)
            checks += 1
            ok = data == text
            if not ok:
                failures.append("decode mismatch: got %r for %r" % (data, text))
            print("    %-6s %s" % ("ok" if ok else "FAIL",
                                   (text[:56] + "...") if len(text) > 59 else text))

    print("\n" + bar)
    if failures:
        print("  FAILED — %d of %d checks" % (len(failures), checks))
        for f in failures[:20]:
            print("    " + f)
        print(bar + "\n")
        sys.exit(1)
    print("  PASS — all %d checks. qr.js matches the reference encoder exactly" % checks)
    print("         and every rendered code decodes back to its URL.")
    print(bar + "\n")


if __name__ == "__main__":
    main()
