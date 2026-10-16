"""Generate a 1200x630 social image per page from the exported HTML.

Reads each dist/public/**/index.html, takes the ScenicHero headline (accent
words from .accent-word spans), eyebrow and priority hero image, and renders
an on-brand card: the page's own scene, a charcoal shade, the crest, the
eyebrow and the headline in Cormorant caps with gold accent words.

usage (from artifacts/mythos-website, after `pnpm run build`):
  python -I scripts/generate-og-pages.py . <fonts_dir> public/assets/social/pages
then rebuild. <fonts_dir> holds cormorant.woff2 and inter.woff2 — the
variable Cormorant Garamond and Inter files (e.g. copied from
.next/static/media after `next dev`, or from Google Fonts). Requires Pillow.
Delete the _manifest.json it writes; page metadata calls lib/social.ts.
"""
import html as htmllib
import json
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

site, fonts, out = sys.argv[1], sys.argv[2], sys.argv[3]
dist = os.path.join(site, "dist", "public")
public = os.path.join(site, "public")
os.makedirs(out, exist_ok=True)

W, H = 1200, 630
IVORY = (237, 228, 213)
CHAMPAGNE = (229, 197, 143)
GOLD = (208, 164, 90)
CHARCOAL = (18, 21, 23)
SKIP = {"", "demo", "404"}
SHIFT = {"use-cases-quantum-adjacent-ai-integration": 260}


def font(name, size, weight):
    f = ImageFont.truetype(os.path.join(fonts, name), size)
    f.set_variation_by_axes([weight])
    return f


def strip(s):
    return htmllib.unescape(re.sub(r"<[^>]+>", "", s)).strip()


def cover(img, pos):
    px, py = pos
    scale = max(W / img.width, H / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    x = round((img.width - W) * px)
    y = round((img.height - H) * py)
    return img.crop((x, y, x + W, y + H))


def shade(img):
    over = Image.new("RGBA", (W, H))
    px = over.load()
    for x in range(W):
        t = x / W
        a = 0.93 if t < 0.32 else max(0.12, 0.93 - (t - 0.32) * 1.5)
        for y in range(H):
            ty = y / H
            extra = 0.25 * max(0.0, 1 - ty * 4) + 0.35 * max(0.0, ty - 0.75) * 4
            alpha = min(0.96, a + extra * (1 - a))
            px[x, y] = (*CHARCOAL, round(alpha * 255))
    base = img.convert("RGBA")
    base.alpha_composite(over)
    return base


def wrap(words, f, max_w, space):
    lines, cur, cur_w = [], [], 0
    for word, gold in words:
        w = f.getlength(word)
        if cur and cur_w + space + w > max_w:
            lines.append(cur)
            cur, cur_w = [], 0
        cur.append((word, gold, w))
        cur_w += (space if cur_w else 0) + w
    if cur:
        lines.append(cur)
    return lines


def tag_words(inner):
    """Split headline HTML into (WORD, is_accent) pairs."""
    tagged = []
    for part in re.split(r'(<span class="accent-word[^"]*">.*?</span>)', inner, flags=re.S):
        gold = part.startswith("<span")
        for w in strip(part).upper().split():
            tagged.append((w, gold))
    return tagged


def parse(page_html, home=False):
    pat = r'<h1[^>]*id="home-hero-title"[^>]*aria-label="([^"]*)"[^>]*>(.*?)</h1>' if home else r'<h1[^>]*id="page-title"[^>]*aria-label="([^"]*)"[^>]*>(.*?)</h1>'
    h1 = re.search(pat, page_html, re.S)
    if not h1:
        return None
    plain = htmllib.unescape(h1.group(1)).strip()
    tagged = tag_words(h1.group(2))
    eyebrow = re.search(r'<p class="hero-rise mb-5[^"]*"[^>]*>(.*?)</p>', page_html, re.S)
    img = re.search(r'<img[^>]*fetchPriority="high"[^>]*>', page_html, re.S | re.I)
    src = re.search(r'src="([^"]+)"', img.group(0)).group(1) if img else None
    pos = re.search(r"object-position:\s*([\d.]+)%\s+([\d.]+)%", img.group(0)) if img else None
    return {
        "plain": plain,
        "tagged": tagged,
        "eyebrow": strip(eyebrow.group(1)) if eyebrow else "",
        "src": src,
        "pos": (float(pos.group(1)) / 100, float(pos.group(2)) / 100) if pos else (0.5, 0.5),
    }


crest_master = Image.open(os.path.join(public, "assets", "brand", "crest-512.png")).convert("RGBA")
crest_master = crest_master.crop(crest_master.getbbox())
crest = crest_master.resize((round(crest_master.width * 52 / crest_master.height), 52), Image.LANCZOS)
f_brand = font("cormorant.woff2", 30, 600)
f_eyebrow = font("inter.woff2", 17, 600)
f_url = font("inter.woff2", 17, 500)

manifest = {}
for root, _, files in os.walk(dist):
    if "index.html" not in files:
        continue
    route = os.path.relpath(root, dist).replace(os.sep, "/")
    route = "" if route == "." else route
    if route in SKIP and route != "" or route.startswith("_next"):
        continue
    home = route == ""
    meta = parse(open(os.path.join(root, "index.html"), encoding="utf-8").read(), home=home)
    if home and meta:
        meta.update(eyebrow="AI deployment assurance", src="/assets/olympus/panorama.webp", pos=(0.6, 0.4))
    if not meta or not meta["src"]:
        print("skip (no scenic hero):", route or "/")
        continue
    key = route.replace("/", "-") or "home"
    src_path = os.path.join(public, meta["src"].lstrip("/").replace("/", os.sep))
    bg = cover(Image.open(src_path).convert("RGB"), meta["pos"])
    if key in SHIFT:  # art that would sit under the headline moves right
        shifted = Image.new("RGB", (W, H), CHARCOAL)
        shifted.paste(bg, (SHIFT[key], 0))
        bg = shifted
    card = shade(bg)
    if home:
        big = crest_master.resize((round(crest_master.width * 400 / crest_master.height), 400), Image.LANCZOS)
        card.alpha_composite(big, (W - big.width - 70, (H - big.height) // 2))
    d = ImageDraw.Draw(card)

    # Brand row
    card.alpha_composite(crest, (64, 52))
    d.text((64 + crest.width + 14, 60), "MYTHOS", font=f_brand, fill=IVORY)

    # Eyebrow
    eb = meta["eyebrow"].upper()
    if len(eb) > 52:
        eb = eb[:50].rstrip(" ·") + "…"
    d.line((64, 200, 104, 200), fill=CHAMPAGNE, width=2)
    x = 118
    for ch in eb:
        d.text((x, 190), ch, font=f_eyebrow, fill=CHAMPAGNE)
        x += f_eyebrow.getlength(ch) + 3.2

    # Headline: uppercase Cormorant, accent words in gold, sized to fit.
    tagged = meta["tagged"]
    for size in (68, 62, 56, 50, 46, 42, 38):
        f_title = font("cormorant.woff2", size, 520)
        lines = wrap(tagged, f_title, 620 if home else 700, size * 0.28)
        if len(lines) <= 4:
            break
    y = 238
    lh = round(size * 1.06)
    for line in lines:
        x = 64
        for word, gold, w in line:
            d.text((x, y), word, font=f_title, fill=GOLD if gold else IVORY)
            x += w + size * 0.28
        y += lh

    # Footer
    d.line((64, 556, 124, 556), fill=GOLD, width=2)
    d.text((64, 568), "mythosaisecurity.com", font=f_url, fill=(237, 228, 213, 200))

    card.convert("RGB").save(os.path.join(out, f"{key}.jpg"), quality=84, optimize=True, progressive=True)
    manifest[route] = {"key": key, "alt": f"{meta['plain']} — Mythos AI Security"}
    print("ok", route, "->", key)

json.dump(manifest, open(os.path.join(out, "_manifest.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
