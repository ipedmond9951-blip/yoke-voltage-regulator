#!/usr/bin/env python3
"""
GSC 索引状态审计 — 跑所有 sitemap URL 看 HTTP 状态 + canonical 链
用途：定位 GSC 报告的 6 个未编入索引原因
- 404 → "未找到"
- 重定向 → "网页会自动重定向"
- 备用 canonical → "备用网页"（i18n 正常）
- canonical 与 sitemap 不一致 → "重复网页 vs 规范"
"""
import asyncio
import aiohttp
import re
import sys
import json
from urllib.parse import urlparse
from collections import Counter, defaultdict

BASE = "https://kk-electric.com"
LOCALES = ["en", "zh", "es", "ar", "fr", "pt", "ru", "ja", "de", "hi"]

async def fetch_sitemap(session, lang):
    url = f"{BASE}/sitemap/{lang}"
    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=15)) as r:
            text = await r.text()
            return [m.group(1) for m in re.finditer(r'<loc>([^<]+)</loc>', text)]
    except Exception as e:
        print(f"ERROR sitemap {lang}: {e}", file=sys.stderr)
        return []

async def check_url(session, url, sem):
    async with sem:
        try:
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=10), allow_redirects=True) as r:
                final = str(r.url)
                # 读 body 找 canonical（最多 30KB）
                body = await r.content.read(30_000)
                body_str = body.decode('utf-8', errors='ignore')
                m = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', body_str)
                canonical = m.group(1) if m else ''
                return {
                    'url': url,
                    'status': r.status,
                    'final': final,
                    'redirected': final != url,
                    'canonical': canonical,
                    'lang': re.search(r'/([a-z]{2})/', url).group(1) if re.search(r'/([a-z]{2})/', url) else '',
                }
        except Exception as e:
            return {'url': url, 'status': -1, 'error': str(e)[:100]}

async def main():
    all_urls = []
    sem = asyncio.Semaphore(20)
    async with aiohttp.ClientSession(headers={'User-Agent': 'kk-electric-gsc-audit/1.0'}) as session:
        for lang in LOCALES:
            urls = await fetch_sitemap(session, lang)
            all_urls.extend(urls)
            print(f"  sitemap/{lang}: {len(urls)} URLs", file=sys.stderr)
        
        print(f"TOTAL: {len(all_urls)} URLs", file=sys.stderr)
        tasks = [check_url(session, u, sem) for u in all_urls]
        results = await asyncio.gather(*tasks)
    
    # 分析
    by_status = Counter(r['status'] for r in results)
    redirected = [r for r in results if r.get('redirected')]
    no_canonical = [r for r in results if not r.get('canonical')]
    canonical_mismatch = []
    for r in results:
        c = r.get('canonical', '')
        u = r.get('url', '')
        if c and c != u and c != u.rstrip('/'):
            # 备用页：en 指向 /en/...，zh 指向 /en/...，正常
            # 不正常：zh 指向 /en/ 其它 zh 页
            url_lang = u.split('/')[3] if len(u.split('/')) > 3 else ''
            c_lang = c.split('/')[3] if len(c.split('/')) > 3 else ''
            if url_lang != c_lang:
                canonical_mismatch.append(r)
    
    print(f"\n=== STATUS DISTRIBUTION ===")
    for s, c in by_status.most_common():
        print(f"  {s}: {c}")
    
    print(f"\n=== REDIRECTED ({len(redirected)}) ===")
    for r in redirected[:20]:
        print(f"  {r['status']} {r['url']} → {r['final']}")
    
    print(f"\n=== NO CANONICAL ({len(no_canonical)}) ===")
    for r in no_canonical[:10]:
        print(f"  {r['url']}")
    
    print(f"\n=== CANONICAL LANG MISMATCH ({len(canonical_mismatch)}) ===")
    for r in canonical_mismatch[:20]:
        print(f"  {r['url']} → canonical {r['canonical']}")
    
    # 错误详情
    errors = [r for r in results if r.get('status', 0) >= 400]
    print(f"\n=== 4XX/5XX ({len(errors)}) ===")
    for r in errors[:30]:
        print(f"  {r.get('status')} {r.get('url','')}")
    
    with open('logs/gsc-status-audit.json', 'w') as f:
        json.dump(results, f, ensure_ascii=False, indent=1)
    print(f"\nSaved: logs/gsc-status-audit.json")

asyncio.run(main())
