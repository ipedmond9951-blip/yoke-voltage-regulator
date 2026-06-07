#!/usr/bin/env python3
"""
Lighthouse / Core Web Vitals audit via Google PageSpeed Insights API v5.
No API key required, free tier with shared daily quota.
Measures LCP, FID, CLS, FCP, TTI, TBT, Speed Index, Performance Score.

NOTE: PageSpeed Insights API uses a shared consumer project. Daily quota is
limited and can be exhausted. When 429 is returned, the script falls back to
a local page-weight + response time measurement (no LCP/CLS but useful signal).
"""
import argparse
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
DEFAULT_PAGES = [
    '/en',
    '/en/products',
    '/en/industry/east-africa-avr-trade',
    '/en/industry/top-10-china-avr-brands-africa-2026',
    '/en/team/oshan-zhang',
    '/en/about',
    '/zh',
    '/ar',
]
THRESHOLDS = {
    'performance': {'good': 90, 'warn': 50},
    'lcp_ms': {'good': 2500, 'warn': 4000},
    'fcp_ms': {'good': 1800, 'warn': 3000},
    'cls': {'good': 0.1, 'warn': 0.25},
    'tbt_ms': {'good': 200, 'warn': 600},
    'si_ms': {'good': 3400, 'warn': 5800},
    'tti_ms': {'good': 3800, 'warn': 7300},
}

def audit(url, strategy='mobile'):
    params = {
        'url': url,
        'strategy': strategy,
        'category': ['performance', 'accessibility', 'best-practices', 'seo'],
    }
    full_url = API + '?' + urllib.parse.urlencode(params, doseq=True)
    try:
        with urllib.request.urlopen(full_url, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {'error': f'HTTP {e.code}: {e.reason}'}
    except Exception as e:
        return {'error': str(e)}

def lightweight_audit(url):
    """Fallback when PageSpeed quota exhausted. Measures basic page weight + response time."""
    try:
        start = time.time()
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 CWV-Audit/1.0'})
        with urllib.request.urlopen(req, timeout=30) as r:
            html = r.read()
            elapsed_ms = (time.time() - start) * 1000
            headers = dict(r.headers)
            return {
                'url': url,
                'fallback': True,
                'ttfb_ms': round((time.time() - start) * 1000, 2),
                'html_size_kb': round(len(html) / 1024, 1),
                'html_size_bytes': len(html),
                'content_encoding': headers.get('Content-Encoding', 'none'),
                'cache_control': headers.get('Cache-Control', 'none'),
                'x_vercel_cache': headers.get('X-Vercel-Cache', 'none'),
                'server': headers.get('Server', 'unknown'),
                'response_time_ms': round(elapsed_ms, 2),
            }
    except Exception as e:
        return {'url': url, 'fallback': True, 'error': str(e)}

def extract_metrics(data):
    if 'error' in data:
        return None
    lh = data.get('lighthouseResult', {})
    cats = lh.get('categories', {})
    audits = lh.get('audits', {})
    final_url = lh.get('finalUrl', lh.get('requestedUrl', ''))
    metrics = {
        'url': final_url,
        'fetch_time': lh.get('fetchTime'),
        'performance_score': cats.get('performance', {}).get('score'),
        'accessibility_score': cats.get('accessibility', {}).get('score'),
        'best_practices_score': cats.get('best-practices', {}).get('score'),
        'seo_score': cats.get('seo', {}).get('score'),
        'lcp_ms': audits.get('largest-contentful-paint', {}).get('numericValue'),
        'fcp_ms': audits.get('first-contentful-paint', {}).get('numericValue'),
        'cls': audits.get('cumulative-layout-shift', {}).get('numericValue'),
        'tbt_ms': audits.get('total-blocking-time', {}).get('numericValue'),
        'si_ms': audits.get('speed-index', {}).get('numericValue'),
        'tti_ms': audits.get('interactive', {}).get('numericValue'),
    }
    return {k: round(v, 2) if isinstance(v, float) else v for k, v in metrics.items() if v is not None or k in ('url', 'fetch_time')}

def status(value, key):
    if value is None or key not in THRESHOLDS:
        return '?'
    t = THRESHOLDS[key]
    if value <= t['good']:
        return '✓'
    if value <= t['warn']:
        return '⚠'
    return '✗'

def format_row(m):
    perf = m.get('performance_score')
    perf_str = f"{int(perf * 100)}" if perf is not None else '?'
    return (
        f"{m['url'][:70]:<70} | "
        f"perf {perf_str:>3}{status(perf, 'performance')} | "
        f"LCP {int(m.get('lcp_ms', 0)):>5}ms{status(m.get('lcp_ms'), 'lcp_ms')} | "
        f"FCP {int(m.get('fcp_ms', 0)):>4}ms{status(m.get('fcp_ms'), 'fcp_ms')} | "
        f"CLS {m.get('cls', 0):.3f}{status(m.get('cls'), 'cls')} | "
        f"TBT {int(m.get('tbt_ms', 0)):>4}ms{status(m.get('tbt_ms'), 'tbt_ms')}"
    )

def main():
    parser = argparse.ArgumentParser(description='Run Lighthouse CWV audit on kk-electric.com pages')
    parser.add_argument('--strategy', choices=['mobile', 'desktop'], default='mobile')
    parser.add_argument('--pages', nargs='+', help='Override pages (e.g., /en /zh/products)')
    parser.add_argument('--base-url', default='https://kk-electric.com', help='Base URL')
    parser.add_argument('--output', default='logs/cwv-audit-{date}.json', help='Output file')
    parser.add_argument('--quiet', action='store_true', help='Suppress per-page output')
    args = parser.parse_args()

    pages = args.pages or DEFAULT_PAGES
    base = args.base_url.rstrip('/')
    log_dir = Path('logs')
    log_dir.mkdir(exist_ok=True)
    out_file = args.output.format(date=datetime.now().strftime('%Y-%m-%d'))

    results = []
    print(f"\n{'='*100}")
    print(f"Lighthouse CWV Audit — {base} ({args.strategy})")
    print(f"{'='*100}\n")

    for p in pages:
        url = base + p
        print(f"Auditing: {url} ...", file=sys.stderr if args.quiet else sys.stdout)
        data = audit(url, args.strategy)
        is_rate_limited = ('error' in data and ('429' in data.get('error', '') or 'RESOURCE_EXHAUSTED' in str(data)))
        if is_rate_limited:
            print(f"  PageSpeed quota exhausted, using lightweight fallback...")
            fallback = lightweight_audit(url)
            if 'error' not in fallback:
                print(f"  → HTML: {fallback.get('html_size_kb')} KB, response: {fallback.get('response_time_ms'):.0f}ms, Vercel cache: {fallback.get('x_vercel_cache')}")
            else:
                print(f"  ERROR (fallback): {fallback.get('error')}")
            results.append(fallback)
        else:
            m = extract_metrics(data) if data else None
            if m:
                results.append(m)
                print(format_row(m))
            else:
                err = data.get('error', 'unknown') if data else 'no data'
                print(f"  ERROR: {err}")
                results.append({'url': url, 'error': err})
        time.sleep(1)

    if results:
        with open(out_file, 'w') as f:
            json.dump({
                'audit_time': datetime.now().isoformat(),
                'strategy': args.strategy,
                'base_url': base,
                'pages_audited': len(results),
                'results': results,
            }, f, indent=2)
        print(f"\n{'='*100}")
        print(f"Report saved: {out_file}")
        print(f"{'='*100}\n")

        valid = [r for r in results if 'performance_score' in r]
        if valid:
            avg_perf = sum(r['performance_score'] for r in valid) / len(valid) * 100
            avg_lcp = sum(r.get('lcp_ms', 0) for r in valid) / len(valid)
            avg_cls = sum(r.get('cls', 0) for r in valid) / len(valid)
            print(f"Average performance: {avg_perf:.0f}/100")
            print(f"Average LCP: {avg_lcp:.0f}ms")
            print(f"Average CLS: {avg_cls:.3f}")
            good_count = sum(1 for r in valid if r.get('performance_score', 0) >= 0.9)
            print(f"Pages scoring ≥90: {good_count}/{len(valid)}")
        return 0
    return 1

if __name__ == '__main__':
    sys.exit(main())
