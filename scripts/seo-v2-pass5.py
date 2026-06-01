#!/usr/bin/env python3
"""SEO v2 Pass 5: 给 13 篇补足 relatedProducts/relatedArticles"""
import json, glob, re
from collections import defaultdict

ART_DIR = 'content/articles'

# 6 个产品全部
ALL_PRODUCTS = ['svc-3000va', 'tnd-svc-3000va', 'svc-10kva', 'svc-30kva', 'svc-50kva', 'svc-60kva']

# 加载所有文章做索引
ALL_ARTICLES = {}
for fp in glob.glob(f'{ART_DIR}/*.json'):
    if '.backup' in fp: continue
    d = json.load(open(fp))
    ALL_ARTICLES[d['slug']] = d

# 10 篇需要补 relatedProducts
TO_FIX_PRODUCTS = [
    'avr-maintenance-troubleshooting-guide',
    'protecting-sensitive-equipment',
    'industrial-applications-voltage-stabilizers',
    'choosing-right-avr-capacity',
    'svc-vs-tnd-series-comparison',
    'voltage-fluctuations-causes-solutions',
    'understanding-avr-specifications',
    'energy-efficiency-cost-savings-avr',
    'how-automatic-voltage-regulators-work',
    'yoke-avr-installation-guide',
]

# 3 篇需要补 relatedArticles
TO_FIX_ARTICLES = [
    'protecting-sensitive-equipment',
    'energy-efficiency-cost-savings-avr',
    'yoke-avr-installation-guide',
]

stats = defaultdict(int)
for fp in glob.glob(f'{ART_DIR}/*.json'):
    if '.backup' in fp: continue
    d = json.load(open(fp))
    slug = d.get('slug', '?')
    
    # 补 relatedProducts
    if slug in TO_FIX_PRODUCTS or len(d.get('relatedProducts',[])) < 2:
        d['relatedProducts'] = ['svc-3000va', 'tnd-svc-3000va', 'svc-10kva']
        stats[f'products_fixed'] += 1
    
    # 补 relatedArticles
    if slug in TO_FIX_ARTICLES or len(d.get('relatedArticles',[])) < 2:
        # 找 3 个最相关的其他文章（同 category 优先）
        cat = d.get('category', '')
        candidates = [(s, dd) for s, dd in ALL_ARTICLES.items() if s != slug]
        # 同分类优先
        same_cat = [(s, dd) for s, dd in candidates if dd.get('category') == cat]
        others = [(s, dd) for s, dd in candidates if dd.get('category') != cat]
        # 选 3 个
        picks = (same_cat + others)[:3]
        d['relatedArticles'] = [{'slug': s, 'title': dd.get('title',{}).get('en', s)} for s, dd in picks]
        stats[f'articles_fixed'] += 1
    
    json.dump(d, open(fp,'w'), indent=2, ensure_ascii=False)
    open(fp,'a').write('\n')

print("=== Pass 5 补 relatedProducts/Articles ===")
for k, v in sorted(stats.items()):
    print(f"  {k}: {v}")
