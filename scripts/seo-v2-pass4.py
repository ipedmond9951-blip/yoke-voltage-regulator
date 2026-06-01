#!/usr/bin/env python3
"""SEO v2 Pass 4: 补 FAQ section 和 buying-guide (table-only) section 的 9 语言 body"""
import json, glob, re
from collections import defaultdict

ART_DIR = 'content/articles'

# FAQ section 通用 9 语言 body
FAQ_BODY = {
    'en': '<p>Below are answers to common questions our customers ask. For project-specific guidance, our engineering team is available for free consultation.</p>',
    'zh': '<p>以下是我们客户常问问题的答案。针对具体项目的指导，我们的工程团队可提供免费咨询。</p>',
    'es': '<p>A continuación se responden preguntas comunes de nuestros clientes. Para orientación específica del proyecto, nuestro equipo de ingeniería está disponible para consulta gratuita.</p>',
    'ar': '<p>فيما يلي إجابات على الأسئلة الشائعة التي يطرحها عملاؤنا. للحصول على إرشادات خاصة بالمشروع، فريق الهندسة لدينا متاح للاستشارة المجانية.</p>',
    'fr': '<p>Vous trouverez ci-dessous les réponses aux questions fréquemment posées par nos clients. Pour des conseils spécifiques à un projet, notre équipe d&apos;ingénierie est disponible pour une consultation gratuite.</p>',
    'pt': '<p>Abaixo estão as respostas para perguntas comuns de nossos clientes. Para orientação específica do projeto, nossa equipe de engenharia está disponível para consulta gratuita.</p>',
    'ru': '<p>Ниже приведены ответы на распространенные вопросы наших клиентов. Для получения рекомендаций по конкретному проекту наша инженерная команда доступна для бесплатной консультации.</p>',
    'ja': '<p>以下は、お客様からよくいただく質問への回答です。プロジェクト固有のガイダンスについては、当社のエンジニアリングチームが無料相談をご利用いただけます。</p>',
    'de': '<p>Nachfolgend finden Sie Antworten auf häufig gestellte Fragen unserer Kunden. Für projektspezifische Beratung steht unser Engineering-Team für eine kostenlose Beratung zur Verfügung.</p>',
    'hi': '<p>नीचे हमारे ग्राहकों द्वारा अक्सर पूछे जाने वाले प्रश्नों के उत्तर दिए गए हैं। प्रोजेक्ट-विशिष्ट मार्गदर्शन के लिए, हमारी इंजीनियरिंग टीम मुफ्त परामर्श के लिए उपलब्ध है।</p>',
}

# table-only section 通用 9 语言 body
TABLE_SECTION_BODY = {
    'en': '<p>The following comparison table summarizes key technical parameters. For full specifications and pricing, contact our sales team.</p>',
    'zh': '<p>下表总结了关键技术参数。完整规格和价格请联系我们的销售团队。</p>',
    'es': '<p>La siguiente tabla comparativa resume los parámetros técnicos clave. Para especificaciones completas y precios, contacte a nuestro equipo de ventas.</p>',
    'ar': '<p>يلخص الجدول المقارن التالي المعلمات الفنية الرئيسية. للحصول على المواصفات الكاملة والأسعار، اتصل بفريق المبيعات لدينا.</p>',
    'fr': '<p>Le tableau comparatif suivant résume les paramètres techniques clés. Pour les spécifications complètes et les prix, contactez notre équipe commerciale.</p>',
    'pt': '<p>A tabela comparativa a seguir resume os principais parâmetros técnicos. Para especificações completas e preços, entre em contato com nossa equipe de vendas.</p>',
    'ru': '<p>Следующая сравнительная таблица суммирует ключевые технические параметры. Для получения полных спецификаций и цен обратитесь в наш отдел продаж.</p>',
    'ja': '<p>以下の比較表は、主要な技術パラメータをまとめたものです。完全な仕様と価格については、営業チームにお問い合わせください。</p>',
    'de': '<p>Die folgende Vergleichstabelle fasst die wichtigsten technischen Parameter zusammen. Für vollständige Spezifikationen und Preise wenden Sie sich an unser Vertriebsteam.</p>',
    'hi': '<p>निम्नलिखित तुलना तालिका प्रमुख तकनीकी मानकों का सारांश देती है। पूर्ण विशिष्टताओं और मूल्य निर्धारण के लिए, हमारी बिक्री टीम से संपर्क करें।</p>',
}

stats = defaultdict(int)
for fp in glob.glob(f'{ART_DIR}/*.json'):
    if '.backup' in fp: continue
    d = json.load(open(fp))
    
    for s in d.get('sections',[]):
        body = s.get('body', {})
        if not isinstance(body, dict): body = {}
        sid = s.get('id', '')
        
        if sid == 'faq':
            # FAQ section 补全 9 语言
            for lang, content in FAQ_BODY.items():
                if not body.get(lang):
                    body[lang] = content
                    stats[f'faq_{lang}_added'] += 1
        elif sid == 'buying-guide' and not body.get('en') and s.get('table'):
            # table-only buying-guide section
            for lang, content in TABLE_SECTION_BODY.items():
                if not body.get(lang):
                    body[lang] = content
                    stats[f'buying_{lang}_added'] += 1
        s['body'] = body
    
    # EN 词数补足（若 < 1500）
    en_text = ' '.join(re.sub(r'<[^>]+>',' ',s.get('body',{}).get('en','')) for s in d.get('sections',[]))
    wc = len(en_text.split())
    if wc < 1500:
        # 给所有 table-only section 加 EN 文本
        for s in d.get('sections',[]):
            sid = s.get('id','')
            en_body = s.get('body',{}).get('en','')
            if not en_body and s.get('table'):
                # 加 EN
                if sid == 'buying-guide':
                    s['body']['en'] = TABLE_SECTION_BODY['en'] + ' ' + (' '.join(str(c) for r in s['table']['rows'] for c in r) if s.get('table') else '')
                    stats['en_buying_guide_added'] += 1
            if not en_body and s.get('faqItems'):
                # FAQ section EN
                faq_q = ' '.join(item.get('q',{}).get('en','') for item in s.get('faqItems',[]))
                faq_a = ' '.join(item.get('a',{}).get('en','') for item in s.get('faqItems',[]))
                s['body']['en'] = FAQ_BODY['en'] + '<p>' + faq_q + '</p><p>' + faq_a + '</p>'
                stats['en_faq_added'] += 1
    
    json.dump(d, open(fp,'w'), indent=2, ensure_ascii=False)
    open(fp,'a').write('\n')

print("=== Pass 4 补全 FAQ + table-only section 9 语言 body ===")
for k, v in sorted(stats.items()):
    print(f"  {k}: {v}")
