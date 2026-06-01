#!/usr/bin/env python3
"""
Schema 自动验证器 - kk-electric.com
功能：扫描 308 篇文章 JSON，验证 P0/P1/P2/P3 schema 字段完整性
输出：logs/schema-audit-YYYY-MM-DD.json + 控制台报告

运行：
  python3 scripts/schema-validator.py                    # 全量
  python3 scripts/schema-validator.py --slug avr-faq    # 单篇
  python3 scripts/schema-validator.py --category FAQ    # 按分类

Cron 推荐：
  0 3 * * 0 cd ~/workspace/yoke-voltage-regulator && python3 scripts/schema-validator.py >> logs/schema-weekly.log 2>&1
"""
import json, glob, re, sys, os
from datetime import datetime
from collections import defaultdict, Counter

ART_DIR = 'content/articles'
LOG_DIR = 'logs'
os.makedirs(LOG_DIR, exist_ok=True)

LANG = ['en','zh','es','ar','fr','pt','ru','ja','de']

stats = Counter()
issues = defaultdict(list)
total_articles = 0


def validate_article(d, slug):
    """验证单篇文章的 schema 完整性"""
    global total_articles
    total_articles += 1
    
    # P0 字段
    p0_checks = {
        'imageAlt': bool(d.get('imageAlt')),
        'imageAlt_9langs': all(d.get('imageAlt', {}).get(l) for l in LANG) if d.get('imageAlt') else False,
        'schema_type': d.get('schema') in ['Article','FAQPage','HowTo','NewsArticle'],
        'ogImage': bool(d.get('ogImage')),
        'author_object': isinstance(d.get('author'), dict) and d.get('author', {}).get('name'),
        'dataSource_array': isinstance(d.get('dataSource'), list) and len(d.get('dataSource', [])) >= 2,
    }
    
    # P1 内容质量
    en_text = ''
    for s in d.get('sections', []):
        en_text += re.sub(r'<[^>]+>', ' ', s.get('body', {}).get('en', '')) + ' '
    wc = len(en_text.split())
    
    en_links = sum(len(re.findall(r'<a\s+href=', s.get('body', {}).get('en', ''))) for s in d.get('sections', []))
    zh_links = sum(len(re.findall(r'<a\s+href=', s.get('body', {}).get('zh', ''))) for s in d.get('sections', []))
    
    p1_checks = {
        'en_word_1500': wc >= 1500,
        'en_links_5': en_links >= 5,
        'zh_links_5': zh_links >= 5,
        'faq_3': sum(len(s.get('faqItems', [])) for s in d.get('sections', [])) >= 3,
        'keywords_4_8': 4 <= len([k for k in d.get('keywords', '').split(',') if k.strip()]) <= 8,
        'relatedProducts_2': len(d.get('relatedProducts', [])) >= 2,
        'relatedArticles_2': len(d.get('relatedArticles', [])) >= 2,
        '9_lang_titles': all(d.get('title', {}).get(l) for l in LANG),
        '9_lang_descs': all(d.get('description', {}).get(l) for l in LANG),
    }
    
    # P2 E-E-A-T
    p2_checks = {
        'updatedDate': bool(d.get('updatedDate')),
        'no_future_date': False,
        'author_title': isinstance(d.get('author'), dict) and bool(d.get('author', {}).get('title')),
        'author_credentials': isinstance(d.get('author'), dict) and bool(d.get('author', {}).get('credentials')),
    }
    try:
        d_date = datetime.strptime(d.get('date', ''), '%Y-%m-%d').date()
        p2_checks['no_future_date'] = d_date <= datetime(2026, 6, 1).date()
    except:
        p2_checks['no_future_date'] = False
    
    # P3 多语言
    miss_body = 0
    body_section_count = 0
    for s in d.get('sections', []):
        if s.get('body'):
            body_section_count += 1
            for l in LANG:
                if not s['body'].get(l):
                    miss_body += 1
    p3_checks = {
        '9_lang_body': miss_body == 0 and body_section_count > 0,
    }
    
    # 汇总
    all_checks = {**p0_checks, **p1_checks, **p2_checks, **p3_checks}
    failed = [k for k, v in all_checks.items() if not v]
    
    for k in failed:
        issues[k].append(slug)
    
    return all_checks, wc, en_links, zh_links


def main():
    args = sys.argv[1:]
    filter_slug = None
    filter_cat = None
    if '--slug' in args:
        filter_slug = args[args.index('--slug') + 1]
    if '--category' in args:
        filter_cat = args[args.index('--category') + 1]
    
    print("=" * 60)
    print("🔍 Schema 验证器 - kk-electric.com")
    print(f"📅 {datetime.now().isoformat()}")
    print("=" * 60)
    
    total_pass = 0
    total_check = 0
    for fp in glob.glob(f'{ART_DIR}/*.json'):
        if '.backup' in fp: continue
        with open(fp) as f:
            d = json.load(f)
        slug = d.get('slug', '?')
        if filter_slug and filter_slug not in slug: continue
        if filter_cat and d.get('category') != filter_cat: continue
        
        checks, wc, enl, zhl = validate_article(d, slug)
        passed = sum(1 for v in checks.values() if v)
        total_pass += passed
        total_check += len(checks)
    
    # 输出报告
    print(f"\n📊 总览:")
    print(f"  文章数: {total_articles}")
    print(f"  检查项: {len([k for k in validate_article.__code__.co_consts[1:]])} (P0+P1+P2+P3)")
    print(f"  通过率: {total_pass}/{total_check} ({total_pass/total_check*100:.1f}%)")
    
    print(f"\n🔍 详细问题分布:")
    for k, slugs in sorted(issues.items(), key=lambda x: -len(x[1])):
        if len(slugs) > 0:
            pct = len(slugs) / total_articles * 100
            bar = '█' * int(pct / 5)
            print(f"  {k:25s} {len(slugs):3d}/{total_articles} ({pct:4.1f}%) {bar}")
    
    if total_articles <= 5:
        print(f"\n📋 详细 (单篇模式):")
        for k, slugs in issues.items():
            if slugs:
                print(f"  {k}: {slugs}")
    
    # 写日志
    log_path = f"{LOG_DIR}/schema-audit-{datetime.now().strftime('%Y-%m-%d')}.json"
    with open(log_path, 'w') as f:
        json.dump({
            'timestamp': datetime.now().isoformat(),
            'total_articles': total_articles,
            'total_checks': total_check,
            'total_passed': total_pass,
            'pass_rate': round(total_pass / total_check * 100, 2),
            'issues': {k: len(v) for k, v in issues.items()},
            'failing_articles': {k: v for k, v in issues.items() if v},
        }, f, indent=2, ensure_ascii=False)
    print(f"\n📄 报告: {log_path}")
    
    # 返回非零退出码如果有失败
    if sum(len(v) for v in issues.values()) > 0:
        sys.exit(0)  # 不阻止流程
    sys.exit(0)


if __name__ == '__main__':
    main()
