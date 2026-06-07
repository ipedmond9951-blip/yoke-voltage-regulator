#!/usr/bin/env python3
"""Add 9-language translations to central-africa-avr-trade.json skeleton.
Each lang gets: title, description, headings, body (condensed but complete).
"""
import json
from collections import OrderedDict

PATH = 'content/articles/central-africa-avr-trade.json'
with open(PATH, 'r', encoding='utf-8') as f:
    art = json.load(f, object_pairs_hook=OrderedDict)

# Titles (compressed)
TITLES = {
    "zh": "中非稳压器贸易：刚果民主 喀麦隆 刚果 加蓬 乍得",
    "es": "Comercio de AVR en África Central: RDC Camerún Congo Gabón Chad",
    "fr": "Commerce d'AVR en Afrique Centrale : RDC Cameroun Congo Gabon Tchad",
    "ar": "تجارة AVR في وسط أفريقيا: الكونغو الديمقراطية الكاميرون الكونغو الغابون تشاد",
    "pt": "Comércio de AVR na África Central: RDC Camarões Congo Gabão Chade",
    "ru": "Торговля AVR в Центральной Африке: ДР Конго Камерун Конго Габон Чад",
    "ja": "中央アフリカ AVR 貿易：DRコンゴ カメルーン コンゴ ガボン チャド",
    "de": "Zentralafrika AVR-Handel: DR Kongo Kamerun Kongo Gabun Tschad",
    "hi": "मध्य अफ्रीका AVR व्यापार: DRC कैमरून कांगो गैबन चाड"
}

DESCRIPTIONS = {
    "zh": "中非稳压器市场概览，覆盖刚果民主、喀麦隆、刚果布拉柴维尔、加蓬、乍得、中非共和国、赤道几内亚、圣多美。8 个战略分销中心、CEMAC 贸易流、ANOR/ARSO 认证。",
    "es": "Mercado de estabilizadores de voltaje de África Central cubriendo RDC, Camerún, Congo Brazzaville, Gabón, Chad, RCA, Guinea Ecuatorial y Santo Tomé. 8 centros de distribución, flujos comerciales CEMAC.",
    "fr": "Marché des stabilisateurs de tension en Afrique Centrale couvrant RDC, Cameroun, Congo Brazzaville, Gabon, Tchad, RCA, Guinée équatoriale et São Tomé. 8 centres de distribution, flux commerciaux CEMAC.",
    "ar": "سوق مثبتات الجهد في وسط أفريقيا يغطي الكونغو الديمقراطية والكاميرون والكونغو برازافيل والغابون وتشاد وجمهورية أفريقيا الوسطى وغينيا الاستوائية وساو تومي. 8 مراكز توزيع.",
    "pt": "Mercado de estabilizadores de tensão da África Central cobrindo RDC, Camarões, Congo Brazzaville, Gabão, Chade, RCA, Guiné Equatorial e São Tomé. 8 centros de distribuição.",
    "ru": "Рынок стабилизаторов напряжения Центральной Африки: ДР Конго, Камерун, Конго Браззавиль, Габон, Чад, ЦАР, Экваториальная Гвинея, Сан-Томе. 8 распределительных центров.",
    "ja": "中央アフリカ電圧安定器市場：DRコンゴ、カメルーン、コンゴ ブラザビル、ガボン、チャド、CAR、赤道ギニア、サントメ。8 つの流通ハブ。",
    "de": "Zentralafrikanischer Spannungsstabilisator-Markt: DR Kongo, Kamerun, Kongo Brazzaville, Gabun, Tschad, ZAR, Äquatorialguinea, São Tomé. 8 Vertriebszentren.",
    "hi": "मध्य अफ्रीका वोल्टेज स्टेबलाइज़र बाज़ार: DRC, कैमरून, कांगो ब्राज़ाविल, गैबन, चाड, CAR, भूमध्यरेखीय गिनी, साओ टोमे। 8 वितरण केंद्र।"
}

# Headings per language (7 sections × 9 langs)
HEADINGS = {
    "zh": ["中非稳压器市场概览", "中非电力质量挑战与 AVR 选型", "如何为中非应用选型稳压器",
           "中非现场安装与最佳实践", "中非稳压器常见问题", "8 个 YOKE 中非分销中心：战略布局",
           "结论：中非稳压器市场展望"],
    "es": ["Descripción del mercado de estabilizadores de voltaje de África Central",
           "Desafíos de calidad de energía en África Central y selección de AVR",
           "Cómo elegir estabilizadores de voltaje para aplicaciones en África Central",
           "Instalación y mejores prácticas para sitios de África Central",
           "Preguntas frecuentes sobre estabilizadores de voltaje en África Central",
           "Centros de distribución estratégica: 8 puntos de distribución YOKE en África Central",
           "Conclusión: Perspectivas del mercado de África Central"],
    "fr": ["Aperçu du marché des stabilisateurs de tension en Afrique Centrale",
           "Défis de qualité d'énergie en Afrique Centrale et sélection d'AVR",
           "Comment choisir les stabilisateurs de tension pour les applications d'Afrique Centrale",
           "Installation et meilleures pratiques pour les sites d'Afrique Centrale",
           "Questions fréquemment posées sur les stabilisateurs de tension en Afrique Centrale",
           "Centres de distribution stratégique : 8 points de distribution YOKE en Afrique Centrale",
           "Conclusion : Perspectives du marché d'Afrique Centrale"],
    "ar": ["نظرة عامة على سوق مثبتات الجهد في وسط أفريقيا",
           "تحديات جودة الطاقة في وسط أفريقيا واختيار AVR",
           "كيفية اختيار مثبتات الجهد لتطبيقات وسط أفريقيا",
           "التثبيت وأفضل الممارسات لمواقع وسط أفريقيا",
           "أسئلة شائعة حول مثبتات الجهد في وسط أفريقيا",
           "مراكز التوزيع الاستراتيجية: 8 مراكز توزيع YOKE في وسط أفريقيا",
           "الخلاصة: توقعات السوق في وسط أفريقيا"],
    "pt": ["Visão geral do mercado de estabilizadores de tensão da África Central",
            "Desafios de qualidade de energia na África Central e seleção de AVR",
            "Como escolher estabilizadores de tensão para aplicações na África Central",
            "Instalação e melhores práticas para locais da África Central",
            "Perguntas frequentes sobre estabilizadores de tensão na África Central",
            "Centros de distribuição estratégica: 8 pontos de distribuição YOKE na África Central",
            "Conclusão: Perspectivas do mercado da África Central"],
    "ru": ["Обзор рынка стабилизаторов напряжения Центральной Африки",
           "Проблемы качества электроэнергии в Центральной Африке и выбор AVR",
           "Как выбрать стабилизаторы напряжения для применений в Центральной Африке",
           "Установка и лучшие практики для объектов Центральной Африки",
           "Часто задаваемые вопросы о стабилизаторах напряжения в Центральной Африке",
           "Стратегические распределительные центры: 8 точек распределения YOKE в Центральной Африке",
           "Заключение: Перспективы рынка Центральной Африки"],
    "ja": ["中央アフリカ電圧安定器（AVR）市場概要",
           "中央アフリカの電力品質課題と AVR 選定",
           "中央アフリカ向け電圧安定器の選び方",
           "中央アフリカサイトの設置とベストプラクティス",
           "中央アフリカの電圧安定器に関するよくある質問",
           "戦略的流通ハブ：中央アフリカ全土の 8 つの YOKE 流通拠点",
           "結論：中央アフリカ電圧安定器市場の見通し"],
    "de": ["Übersicht über den zentralafrikanischen Spannungsstabilisator-Markt",
           "Stromqualitätsherausforderungen in Zentralafrika und AVR-Auswahl",
           "Auswahl von Spannungsstabilisatoren für zentralafrikanische Anwendungen",
           "Installation und Best Practices für zentralafrikanische Standorte",
           "Häufig gestellte Fragen zu Spannungsstabilisatoren in Zentralafrika",
           "Strategische Vertriebszentren: 8 YOKE-Vertriebspunkte in Zentralafrika",
           "Fazit: Ausblick auf den zentralafrikanischen Markt"],
    "hi": ["मध्य अफ्रीका वोल्टेज स्टेबलाइज़र बाज़ार अवलोकन",
            "मध्य अफ्रीका बिजली गुणवत्ता चुनौतियाँ और AVR चयन",
            "मध्य अफ्रीका अनुप्रयोगों के लिए वोल्टेज स्टेबलाइज़र कैसे चुनें",
            "मध्य अफ्रीका साइटों के लिए स्थापना और सर्वोत्तम अभ्यास",
            "मध्य अफ्रीका वोल्टेज स्टेबलाइज़र के बारे में अक्सर पूछे जाने वाले प्रश्न",
            "रणनीतिक वितरण केंद्र: मध्य अफ्रीका में 8 YOKE वितरण बिंदु",
            "निष्कर्ष: मध्य अफ्रीका बाज़ार दृष्टिकोण"]
}

# Save state
art["title"].update(TITLES)
art["description"].update(DESCRIPTIONS)

for i, sec in enumerate(art["sections"]):
    sec["heading"].update({lang: HEADINGS[lang][i] for lang in HEADINGS})

print(f"Added titles, descriptions, headings for 9 langs")
print(f"Sections count: {len(art['sections'])}")
print(f"Saving intermediate state to {PATH}")
with open(PATH, 'w', encoding='utf-8') as f:
    json.dump(art, f, ensure_ascii=False, indent=2)
print(f"Size: {__import__('os').path.getsize(PATH)} bytes")
