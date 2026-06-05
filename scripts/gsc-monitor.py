#!/usr/bin/env python3
"""
kk-electric.com GSC / sitemap / meta tag daily monitor.
Runs via launchd `com.kk-electric.gsc-monitor.plist` every 6 hours.

Performance notes (2026-06-05):
- HTML pages are 50-200KB; only need <head> so cap body read at 30KB.
- Use HEAD for pure status checks; GET (truncated) for body checks.
- 23 checks total, target < 30s end-to-end.

Checks:
1. 10 locale sitemaps (en/zh/es/ar/fr/pt/ru/ja/de/hi) — HTTP 200 + <loc> count
2. sitemap-index.xml — HTTP 200 + 10 child sitemaps
3. robots.txt — HTTP 200 + contain AI bot whitelist
4. HTML file /google39f58fe255970694.html — HTTP 200 + correct GSC token
5. 10 locale HTML pages — HTTP 200 + GSC meta tag + correct token + no www. in first 30KB

Output: log to /Users/zhangming/workspace/yoke-voltage-regulator/logs/gsc-monitor.log
Exit 0 = all OK, Exit 1 = at least one failure.
"""
import re
import socket
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone
from pathlib import Path

BASE = "https://kk-electric.com"
GSC_TOKEN = "UTGkDx8G0Uk-u5s04dxGcT9Cb4jREmgBXJS5r3biwMw"
LOCALES = ["en", "zh", "es", "ar", "fr", "pt", "ru", "ja", "de", "hi"]
TIMEOUT = 8
MAX_BODY = 30_000  # 30KB is enough to find <meta name="google-site-verification"/>
UA = "kk-electric-gsc-monitor/1.0 (mac mini; contact: ai@yoke-electric.com)"

LOG_DIR = Path("/Users/zhangming/workspace/yoke-voltage-regulator/logs")
LOG_FILE = LOG_DIR / "gsc-monitor.log"
ERROR_FILE = LOG_DIR / "gsc-monitor-error.log"

META_TOKEN_RE = re.compile(
    r'<meta\s+name="google-site-verification"\s+content="([^"]+)"\s*/>',
    re.IGNORECASE,
)
HTML_FILE_TOKEN = "google-site-verification=" + GSC_TOKEN
META_TOKEN = GSC_TOKEN
# Only flag www. on kk-electric.com itself, NOT www.sitemaps.org / www.w3.org / www.linkedin.com
NO_WWW_RE = re.compile(r"https?://www\.kk-electric\.", re.IGNORECASE)


def log(msg: str, err: bool = False) -> None:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    with (LOG_FILE if not err else ERROR_FILE).open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def fetch_head(url: str) -> tuple[int, str]:
    """Return (status, content-type) via HEAD."""
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return resp.status, resp.headers.get("Content-Type", "")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except (socket.timeout, urllib.error.URLError, Exception) as e:
        return 0, f"ERROR: {type(e).__name__}: {e}"


def fetch_get(url: str, max_bytes: int = MAX_BODY) -> tuple[int, str]:
    """Return (status, body) via GET, reading at most max_bytes."""
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            data = resp.read(max_bytes)
            return resp.status, data.decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except (socket.timeout, urllib.error.URLError, Exception) as e:
        return 0, f"ERROR: {type(e).__name__}: {e}"


def check_sitemap(lang: str) -> list[str]:
    url = f"{BASE}/sitemap/{lang}"
    # sitemap is ~450KB; read 500KB to be safe
    status, body = fetch_get(url, max_bytes=500_000)
    issues = []
    if status != 200:
        issues.append(f"sitemap/{lang}: HTTP {status}")
        return issues
    n_locs = body.count("<loc>")
    if n_locs < 300:
        issues.append(f"sitemap/{lang}: only {n_locs} URLs (expected ~314)")
    if NO_WWW_RE.search(body):
        m = NO_WWW_RE.search(body)
        issues.append(f"sitemap/{lang}: contains www.kk-electric prefix near: ...{body[max(0, m.start()-20):m.end()+40]}...")
    return issues


def check_sitemap_index() -> list[str]:
    url = f"{BASE}/sitemap-index.xml"
    status, body = fetch_get(url, max_bytes=5_000)
    issues = []
    if status != 200:
        issues.append(f"sitemap-index.xml: HTTP {status}")
        return issues
    n = body.count("<loc>")
    if n < 10:
        issues.append(f"sitemap-index.xml: only {n} child sitemaps (expected 10)")
    if "sitemapindex" not in body:
        issues.append("sitemap-index.xml: missing <sitemapindex> root")
    if NO_WWW_RE.search(body):
        m = NO_WWW_RE.search(body)
        issues.append(f"sitemap-index.xml: www.kk-electric near: ...{body[max(0, m.start()-20):m.end()+40]}...")
    return issues


def check_robots() -> list[str]:
    url = f"{BASE}/robots.txt"
    status, body = fetch_get(url, max_bytes=3_000)
    issues = []
    if status != 200:
        issues.append(f"robots.txt: HTTP {status}")
        return issues
    required_bots = ["GPTBot", "CCBot", "PerplexityBot", "anthropic-ai"]
    for bot in required_bots:
        if bot not in body:
            issues.append(f"robots.txt: missing allow rule for {bot}")
    if "Disallow: /api/" not in body:
        issues.append("robots.txt: missing Disallow: /api/")
    if "Disallow: /_next/" not in body:
        issues.append("robots.txt: missing Disallow: /_next/")
    n_sitemap = body.count("Sitemap:")
    if n_sitemap < 10:
        issues.append(f"robots.txt: only {n_sitemap} Sitemap: lines (expected ≥ 10)")
    return issues


def check_html_file() -> list[str]:
    url = f"{BASE}/google39f58fe255970694.html"
    status, body = fetch_get(url, max_bytes=500)
    issues = []
    if status != 200:
        issues.append(f"google HTML file: HTTP {status}")
        return issues
    body_stripped = body.strip()
    expected = HTML_FILE_TOKEN
    if body_stripped != expected:
        issues.append(
            f"google HTML file: content mismatch\n  expected: {expected}\n  got:      {body_stripped}"
        )
    return issues


def check_locale_page(lang: str) -> list[str]:
    # No trailing slash: production canonical uses no slash; /{lang}/ → 308 → /{lang}
    # Using no slash avoids the redirect entirely.
    url = f"{BASE}/{lang}"
    # 30KB cap is enough to find <head><meta> in Next.js output (usually <5KB head)
    status, body = fetch_get(url, max_bytes=MAX_BODY)
    issues = []
    if status != 200:
        issues.append(f"locale /{lang}/: HTTP {status}")
        return issues
    m = META_TOKEN_RE.search(body)
    if not m:
        issues.append(f"locale /{lang}/: missing GSC meta tag")
    elif m.group(1) != META_TOKEN:
        issues.append(
            f"locale /{lang}/: GSC token mismatch\n  expected: {META_TOKEN}\n  got:      {m.group(1)}"
        )
    if NO_WWW_RE.search(body):
        m = NO_WWW_RE.search(body)
        issues.append(
            f"locale /{lang}/: www.kk-electric prefix near: ...{body[max(0, m.start()-30):m.end()+50]}..."
        )
    return issues


def main() -> int:
    log("=== gsc-monitor started ===")
    all_issues: list[str] = []

    log("[1/5] Checking 10 locale sitemaps...")
    for lang in LOCALES:
        issues = check_sitemap(lang)
        all_issues.extend(issues)
        if not issues:
            log(f"  ✓ sitemap/{lang}")

    log("[2/5] Checking sitemap-index.xml...")
    issues = check_sitemap_index()
    all_issues.extend(issues)
    if not issues:
        log("  ✓ sitemap-index.xml")

    log("[3/5] Checking robots.txt...")
    issues = check_robots()
    all_issues.extend(issues)
    if not issues:
        log("  ✓ robots.txt")

    log("[4/5] Checking google39f58fe255970694.html...")
    issues = check_html_file()
    all_issues.extend(issues)
    if not issues:
        log("  ✓ google HTML file")

    log("[5/5] Checking 10 locale HTML pages (GSC meta tag + no www)...")
    for lang in LOCALES:
        issues = check_locale_page(lang)
        all_issues.extend(issues)
        if not issues:
            log(f"  ✓ /{lang}")

    log("=== gsc-monitor finished ===")
    if all_issues:
        log(f"❌ FAILED: {len(all_issues)} issues", err=True)
        for i, iss in enumerate(all_issues, 1):
            log(f"  {i}. {iss}", err=True)
        return 1
    log(f"✅ OK: all 5 categories passed (10 sitemaps + index + robots + html file + 10 locales)")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:
        log(f"💥 CRASH: {type(e).__name__}: {e}", err=True)
        sys.exit(2)
