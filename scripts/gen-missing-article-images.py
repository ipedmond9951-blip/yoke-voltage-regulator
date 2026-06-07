#!/usr/bin/env python3
"""
Generate branded article images for the 3 missing articles.
- central-africa-avr-trade.jpg
- north-africa-avr-trade.jpg
- top-10-china-avr-brands-africa-2026.jpg
All 1024x1024, JPEG, ~250KB. YOKE brand colors.
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
from pathlib import Path

OUTPUT = Path('public/images/articles')
OUTPUT.mkdir(parents=True, exist_ok=True)

# YOKE brand palette
DEEP_BLUE = (10, 61, 98)        # #0A3D62 - primary navbar
MID_BLUE = (30, 95, 139)        # #1E5F8B - main buttons
LIGHT_BLUE = (60, 145, 230)     # #3C91E6 - light accent
BRASS_GOLD = (184, 134, 11)     # #B8860B - accent
GOLD_LIGHT = (212, 168, 75)     # #D4A84B
OFF_WHITE = (245, 247, 250)
DARK_TEXT = (20, 30, 45)

# Available fonts
FONT_BOLD = '/System/Library/Fonts/Supplemental/Arial Black.ttf'
FONT_REGULAR = '/System/Library/Fonts/Supplemental/Arial.ttf'


def get_font(size, bold=False):
    try:
        return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)
    except OSError:
        return ImageFont.load_default()


def make_gradient(size, top_color, bottom_color):
    """Vertical gradient."""
    img = Image.new('RGB', size, top_color)
    pixels = img.load()
    w, h = size
    for y in range(h):
        ratio = y / h
        r = int(top_color[0] + (bottom_color[0] - top_color[0]) * ratio)
        g = int(top_color[1] + (bottom_color[1] - top_color[1]) * ratio)
        b = int(top_color[2] + (bottom_color[2] - top_color[2]) * ratio)
        for x in range(w):
            pixels[x, y] = (r, g, b)
    return img


def draw_pattern_grid(img, color, spacing=80, line_width=1):
    """Subtle grid pattern overlay."""
    draw = ImageDraw.Draw(img, 'RGBA')
    w, h = img.size
    for x in range(0, w, spacing):
        draw.line([(x, 0), (x, h)], fill=(*color, 25), width=line_width)
    for y in range(0, h, spacing):
        draw.line([(0, y), (w, y)], fill=(*color, 25), width=line_width)


def draw_africa_silhouette(draw, x, y, size, color):
    """Stylized Africa outline (simplified, placed at right side of canvas)."""
    w, h = size, int(size * 1.25)
    points = [
        (x + w*0.50, y + 0),               # top
        (x + w*0.62, y + h*0.10),
        (x + w*0.68, y + h*0.20),
        (x + w*0.62, y + h*0.30),
        (x + w*0.55, y + h*0.42),
        (x + w*0.65, y + h*0.55),
        (x + w*0.72, y + h*0.70),
        (x + w*0.55, y + h*0.85),
        (x + w*0.45, y + h*1.00),         # bottom
        (x + w*0.35, y + h*0.92),
        (x + w*0.30, y + h*0.75),
        (x + w*0.35, y + h*0.60),
        (x + w*0.32, y + h*0.42),
        (x + w*0.38, y + h*0.30),
        (x + w*0.40, y + h*0.15),
    ]
    draw.polygon(points, fill=color)


def draw_region_dots(draw, region, color):
    """Draw dots at city positions matching the Africa silhouette location.
    Silhouette is at x=620-900, y=80-430 (h scaled).
    Map that to city's lat/lon-like coordinates."""
    city_coords = {
        'central': [  # 8 CEMAC cities (relative to map 620-900, 80-430)
            (705, 350),  # Kinshasa (mid-west-central)
            (710, 365),  # Brazzaville
            (730, 280),  # Yaoundé
            (720, 290),  # Douala
            (700, 320),  # Libreville
            (770, 220),  # N'Djamena
            (790, 280),  # Bangui
            (705, 270),  # Malabo
        ],
        'north': [  # 6 North Africa cities
            (700, 175),  # Casablanca
            (720, 180),  # Algiers
            (730, 175),  # Tunis
            (770, 200),  # Tripoli
            (820, 200),  # Cairo
            (790, 300),  # Khartoum
        ],
    }
    coords = city_coords.get(region, [])
    for px, py in coords:
        # outer glow
        draw.ellipse([px-14, py-14, px+14, py+14], fill=(*color, 60))
        draw.ellipse([px-8, py-8, px+8, py+8], fill=color)
        draw.ellipse([px-3, py-3, px+3, py+3], fill=OFF_WHITE)


def draw_text_with_bg(draw, xy, text, font, text_color, bg_color, padding=10):
    """Draw text on a background box, auto-sized to fit text."""
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0] + padding * 2
    h = bbox[3] - bbox[1] + padding * 2
    draw.rectangle([x, y, x + w, y + h], fill=bg_color)
    draw.text((x + padding, y + padding - bbox[1]), text, font=font, fill=text_color)
    return w, h


def draw_voltage_symbol(draw, cx, cy, color, scale=1.0):
    """Stylized voltage sine wave."""
    w = int(200 * scale)
    h = int(80 * scale)
    points = []
    for i in range(0, w+1, 2):
        import math
        t = (i / w) * 4 * math.pi
        y = math.sin(t) * (h / 2.5)
        points.append((cx - w/2 + i, cy + y))
    if len(points) >= 2:
        draw.line(points, fill=color, width=max(2, int(3*scale)))


def make_central_africa():
    img = make_gradient((1024, 1024), DEEP_BLUE, MID_BLUE)
    draw = ImageDraw.Draw(img, 'RGBA')

    draw_pattern_grid(img, BRASS_GOLD, spacing=64)

    # Top + side accents
    draw.rectangle([0, 0, 1024, 8], fill=BRASS_GOLD)
    draw.rectangle([0, 0, 8, 1024], fill=BRASS_GOLD)

    # Africa silhouette (right side, more visible)
    draw_africa_silhouette(draw, 620, 80, 280, (*BRASS_GOLD, 100))

    # Region dots - on top of silhouette
    draw_region_dots(draw, 'central', BRASS_GOLD)

    # Voltage wave decoration (subtle, left side)
    draw_voltage_symbol(draw, 350, 320, GOLD_LIGHT, scale=0.8)

    # Top label (auto-sized box)
    draw_text_with_bg(draw, (60, 60), 'P0-A · AFRICA SERIES',
                      get_font(24, bold=True), DEEP_BLUE, BRASS_GOLD, padding=8)

    # Main title (2 lines)
    title_font = get_font(58, bold=True)
    draw.text((60, 180), 'Central Africa', font=title_font, fill=OFF_WHITE)
    draw.text((60, 250), 'AVR Trade', font=title_font, fill=BRASS_GOLD)

    # Subtitle
    subtitle_font = get_font(32, bold=True)
    draw.text((60, 340), 'CEMAC Region Power Solutions', font=subtitle_font, fill=GOLD_LIGHT)

    # Body tag
    tag_font = get_font(26)
    draw.text((60, 410), '8 Cities · 8 Countries', font=tag_font, fill=OFF_WHITE)
    draw.text((60, 450), '3,140 Units · 10 Languages', font=tag_font, fill=OFF_WHITE)

    # Country list (bottom)
    countries_font = get_font(22, bold=True)
    draw.text((60, 870), 'DRC · Cameroon · Congo · Gabon · Chad · CAR · Eq. Guinea', font=countries_font, fill=GOLD_LIGHT)
    draw.text((60, 905), 'Kinshasa · Brazzaville · Yaoundé · Douala · Libreville', font=get_font(18), fill=OFF_WHITE)
    draw.text((60, 935), "N'Djamena · Bangui · Malabo · São Tomé", font=get_font(18), fill=OFF_WHITE)

    # Brand mark (auto-sized)
    draw_text_with_bg(draw, (60, 980), 'YOKE · P0-A',
                      get_font(20, bold=True), DEEP_BLUE, BRASS_GOLD, padding=8)

    img.save(OUTPUT / 'central-africa-avr-trade.jpg', 'JPEG', quality=88, optimize=True)
    print(f"  ✓ central-africa-avr-trade.jpg  {img.size}")


def make_north_africa():
    img = make_gradient((1024, 1024), (15, 45, 75), DEEP_BLUE)

    # Desert sand tone overlay
    overlay = Image.new('RGB', (1024, 1024), (200, 170, 110))
    overlay = overlay.filter(ImageFilter.GaussianBlur(80))
    img = Image.blend(img, overlay, 0.15)
    draw = ImageDraw.Draw(img, 'RGBA')

    draw_pattern_grid(img, BRASS_GOLD, spacing=64)

    # Top + side accents
    draw.rectangle([0, 0, 1024, 8], fill=BRASS_GOLD)
    draw.rectangle([0, 0, 8, 1024], fill=BRASS_GOLD)

    # Africa silhouette
    draw_africa_silhouette(draw, 620, 80, 280, (*BRASS_GOLD, 100))
    draw_region_dots(draw, 'north', BRASS_GOLD)

    # Voltage wave
    draw_voltage_symbol(draw, 350, 320, GOLD_LIGHT, scale=0.8)

    # Top label
    draw_text_with_bg(draw, (60, 60), 'P0-A · AFRICA SERIES',
                      get_font(24, bold=True), DEEP_BLUE, BRASS_GOLD, padding=8)

    title_font = get_font(58, bold=True)
    draw.text((60, 180), 'North Africa', font=title_font, fill=OFF_WHITE)
    draw.text((60, 250), 'AVR Trade', font=title_font, fill=BRASS_GOLD)

    subtitle_font = get_font(32, bold=True)
    draw.text((60, 340), 'Maghreb & Nile Power', font=subtitle_font, fill=GOLD_LIGHT)

    tag_font = get_font(26)
    draw.text((60, 410), '6 Cities · 6 Countries', font=tag_font, fill=OFF_WHITE)
    draw.text((60, 450), '2,800 Units · Industrial', font=tag_font, fill=OFF_WHITE)

    countries_font = get_font(22, bold=True)
    draw.text((60, 870), 'Morocco · Algeria · Tunisia · Libya · Egypt · Sudan', font=countries_font, fill=GOLD_LIGHT)
    draw.text((60, 905), 'Casablanca · Algiers · Tunis · Tripoli · Cairo · Khartoum', font=get_font(18), fill=OFF_WHITE)

    draw_text_with_bg(draw, (60, 980), 'YOKE · P0-A',
                      get_font(20, bold=True), DEEP_BLUE, BRASS_GOLD, padding=8)

    img.save(OUTPUT / 'north-africa-avr-trade.jpg', 'JPEG', quality=88, optimize=True)
    print(f"  ✓ north-africa-avr-trade.jpg  {img.size}")


def make_top10_brands():
    img = make_gradient((1024, 1024), DEEP_BLUE, (5, 25, 50))
    draw = ImageDraw.Draw(img, 'RGBA')

    draw_pattern_grid(img, BRASS_GOLD, spacing=64)

    # Top + side accents
    draw.rectangle([0, 0, 1024, 8], fill=BRASS_GOLD)
    draw.rectangle([0, 0, 8, 1024], fill=BRASS_GOLD)

    # Africa silhouette (right side, faded)
    draw_africa_silhouette(draw, 620, 80, 280, (*BRASS_GOLD, 60))

    # Top 10 number showcase (left)
    big_num = get_font(220, bold=True)
    draw.text((100, 80), '10', font=big_num, fill=BRASS_GOLD)

    # Title
    title_font = get_font(54, bold=True)
    draw.text((100, 360), 'Top 10', font=title_font, fill=BRASS_GOLD)
    draw.text((100, 430), 'China AVR Brands', font=title_font, fill=OFF_WHITE)
    draw.text((100, 500), 'for Africa 2026', font=title_font, fill=OFF_WHITE)

    subtitle_font = get_font(30, bold=True)
    draw.text((100, 590), 'Ranked by African Buyer Reviews', font=subtitle_font, fill=GOLD_LIGHT)

    # Side stats
    stats = [
        ('SVC Series Coverage', '> 60%'),
        ('Export Volume Africa', '8,500+ units'),
        ('CE / CB Certified', 'All 10'),
        ('Sea Freight to', '50+ ports'),
    ]
    stat_font = get_font(22, bold=True)
    val_font = get_font(26, bold=True)
    y0 = 700
    for i, (k, v) in enumerate(stats):
        y = y0 + i * 50
        draw.rectangle([100, y, 105, y+30], fill=BRASS_GOLD)
        draw.text((125, y-2), k, font=stat_font, fill=OFF_WHITE)
        draw.text((600, y-2), v, font=val_font, fill=BRASS_GOLD)

    # Brand mark (auto-sized)
    draw_text_with_bg(draw, (60, 980), 'YOKE · P1-A',
                      get_font(20, bold=True), DEEP_BLUE, BRASS_GOLD, padding=8)

    img.save(OUTPUT / 'top-10-china-avr-brands-africa-2026.jpg', 'JPEG', quality=88, optimize=True)
    print(f"  ✓ top-10-china-avr-brands-africa-2026.jpg  {img.size}")


if __name__ == '__main__':
    print("=== Generating 3 missing article images ===")
    make_central_africa()
    make_north_africa()
    make_top10_brands()
    print("\n=== Verify ===")
    for name in ['central-africa-avr-trade.jpg', 'north-africa-avr-trade.jpg', 'top-10-china-avr-brands-africa-2026.jpg']:
        p = OUTPUT / name
        if p.exists():
            print(f"  ✓ {name}  {p.stat().st_size/1024:.1f} KB")
        else:
            print(f"  ✗ {name}  MISSING")
