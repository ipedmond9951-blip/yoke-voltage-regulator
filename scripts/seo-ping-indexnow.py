#!/usr/bin/env python3
"""
IndexNow API auto-submitter for YOKE AVR (kk-electric.com).

Pings IndexNow (Bing + Yandex + Seznam + Naver) with URLs to crawl.
Each search engine independently fetches and indexes — single API call.

Usage:
  # One-off submit specific URLs:
  python3 scripts/seo-ping-indexnow.py --urls https://kk-electric.com/en/industry/foo https://kk-electric.com/zh/industry/foo

  # Submit latest 10 articles (by date desc):
  python3 scripts/seo-ping-indexnow.py --latest 10

  # Submit all articles (heavy! ~3090 URLs):
  python3 scripts/seo-ping-indexnow.py --all

  # Daily cron (auto-submits articles updated in last 24h):
  python3 scripts/seo-ping-indexnow.py --daily

Endpoint: https://api.indexnow.org/indexnow
Method:   POST
Body:     { host, key, keyLocation, urlList[] }
Max URLs per batch: 10,000 (we send up to 100 per batch to be safe)
Response: 200 OK on accept, 4xx on error (429 = rate limit, 403 = key mismatch)

IndexNow key file at: public/{INDEXNOW_KEY}.txt  (proves ownership to engines)
"""

import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime, timedelta
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
ARTICLES_DIR = PROJECT_ROOT / 'content' / 'articles'
PUBLIC_DIR = PROJECT_ROOT / 'public'
LOG_DIR = PROJECT_ROOT / 'logs'

HOST = 'kk-electric.com'
INDEXNOW_KEY = 'ce03de2e-3f7d-4ce3-b06d-4cda92b0f20f'  # Also need public/ce03de2e-3f7d-4ce3-b06d-4cda92b0f20f.txt
ENDPOINT = 'https://api.indexnow.org/indexnow'
LOCALES = ['en', 'zh', 'es', 'ar', 'fr', 'pt', 'ru', 'ja', 'de', 'hi']

# Daily threshold: only submit URLs updated in last 24h
DAILY_WINDOW_HOURS = 24


def log(msg: str) -> None:
    ts = datetime.now().isoformat(timespec='seconds')
    line = f'[{ts}] {msg}'
    print(line)
    LOG_DIR.mkdir(exist_ok=True)
    log_file = LOG_DIR / 'indexnow.log'
    with open(log_file, 'a') as f:
        f.write(line + '\n')


def ensure_key_file() -> None:
    """Ensure public/{INDEXNOW_KEY}.txt exists for ownership verification."""
    key_file = PUBLIC_DIR / f'{INDEXNOW_KEY}.txt'
    if not key_file.exists():
        key_file.write_text(INDEXNOW_KEY)
        log(f'✓ Created key file: {key_file.relative_to(PROJECT_ROOT)}')
    else:
        log(f'✓ Key file exists: {key_file.relative_to(PROJECT_ROOT)}')


def submit_urls(urls: list[str]) -> dict:
    """Submit a batch of URLs to IndexNow. Max 10000 per call."""
    if not urls:
        return {'submitted': 0, 'status': 'no_urls'}

    payload = {
        'host': HOST,
        'key': INDEXNOW_KEY,
        'keyLocation': f'https://{HOST}/{INDEXNOW_KEY}.txt',
        'urlList': urls,
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={'Content-Type': 'application/json; charset=utf-8'},
        method='POST',
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            status = resp.status
            body = resp.read().decode('utf-8', errors='replace')[:200]
            log(f'  IndexNow response: HTTP {status} | {body}')
            return {'submitted': len(urls), 'status': status, 'body': body}
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')[:200] if e.fp else ''
        log(f'  IndexNow HTTP error: {e.code} | {body}')
        return {'submitted': 0, 'status': e.code, 'body': body, 'error': str(e)}
    except Exception as e:
        log(f'  IndexNow error: {e}')
        return {'submitted': 0, 'status': 0, 'error': str(e)}


def chunked(lst: list, n: int) -> list[list]:
    """Split list into chunks of n."""
    return [lst[i:i + n] for i in range(0, len(lst), n)]


def get_article_urls(latest: int = 0, daily: bool = False) -> list[str]:
    """Generate URLs for all articles × all locales (or filtered)."""
    if not ARTICLES_DIR.exists():
        log(f'ERROR: Articles dir not found: {ARTICLES_DIR}')
        return []

    articles = []
    for json_file in ARTICLES_DIR.glob('*.json'):
        try:
            with open(json_file) as f:
                data = json.load(f)
            slug = data.get('slug', json_file.stem)
            date_str = data.get('date', data.get('updatedDate', '2025-01-01'))
            try:
                date = datetime.fromisoformat(date_str)
            except ValueError:
                date = datetime(2025, 1, 1)
            articles.append((slug, date))
        except (json.JSONDecodeError, KeyError) as e:
            log(f'  WARN: Skipping {json_file.name}: {e}')

    # Sort by date desc
    articles.sort(key=lambda x: x[1], reverse=True)

    if daily:
        cutoff = datetime.now() - timedelta(hours=DAILY_WINDOW_HOURS)
        articles = [(s, d) for s, d in articles if d >= cutoff]
        log(f'  Daily mode: {len(articles)} articles updated in last {DAILY_WINDOW_HOURS}h')
    elif latest > 0:
        articles = articles[:latest]
        log(f'  Latest mode: top {len(articles)} articles')

    # Generate URLs × 10 locales
    urls = []
    for slug, _ in articles:
        for locale in LOCALES:
            urls.append(f'https://{HOST}/{locale}/industry/{slug}')

    return urls


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description='IndexNow auto-submitter for YOKE AVR')
    p.add_argument('--urls', nargs='+', help='Specific URLs to submit')
    p.add_argument('--latest', type=int, default=0, help='Submit latest N articles (× 10 locales)')
    p.add_argument('--all', action='store_true', help='Submit ALL articles (× 10 locales, ~3090 URLs)')
    p.add_argument('--daily', action='store_true', help='Submit only articles updated in last 24h')
    p.add_argument('--batch-size', type=int, default=100, help='URLs per IndexNow request (max 10000)')
    p.add_argument('--dry-run', action='store_true', help='Print URLs without submitting')
    return p.parse_args()


def main() -> int:
    args = parse_args()
    ensure_key_file()

    if args.urls:
        urls = args.urls
        log(f'Mode: explicit URLs ({len(urls)})')
    elif args.all:
        urls = get_article_urls(latest=0)
        log(f'Mode: ALL articles ({len(urls)} URLs)')
    elif args.latest > 0:
        urls = get_article_urls(latest=args.latest)
        log(f'Mode: latest {args.latest} articles ({len(urls)} URLs)')
    elif args.daily:
        urls = get_article_urls(daily=True)
        log(f'Mode: daily (24h window, {len(urls)} URLs)')
    else:
        print(__doc__)
        return 1

    if args.dry_run:
        for u in urls[:20]:
            print(u)
        if len(urls) > 20:
            print(f'... and {len(urls) - 20} more')
        return 0

    total_submitted = 0
    total_batches = 0
    chunks = chunked(urls, args.batch_size)
    log(f'Submitting in {len(chunks)} batch(es) of ≤{args.batch_size} URLs...')

    for i, chunk in enumerate(chunks, 1):
        log(f'Batch {i}/{len(chunks)}: {len(chunk)} URLs')
        result = submit_urls(chunk)
        total_submitted += result.get('submitted', 0)
        total_batches += 1

    log(f'✓ Done: {total_submitted} URLs in {total_batches} batch(es)')
    return 0


if __name__ == '__main__':
    sys.exit(main())
