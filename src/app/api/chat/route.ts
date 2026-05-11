import { NextRequest, NextResponse } from 'next/server';

const knowledgeBase: Record<string, string[]> = {
  products: ['product', 'products', 'avr', 'voltage', 'stabilizer', 'regulator', 'svc', 'tnd'],
  moq: ['moq', 'minimum', 'order', 'quantity'],
  shipping: ['shipping', 'delivery', 'ship', 'deliver', 'time', 'days', 'freight'],
  contact: ['contact', 'email', 'phone', 'whatsapp', 'reach'],
  company: ['company', 'about', 'who', 'yoke'],
  price: ['price', 'cost', 'quote', 'pricing', 'cheap', 'expensive'],
  certification: ['certified', 'certification', 'iso', 'quality', 'ce', 'cb'],
};

const responses: Record<string, Record<string, string>> = {
  products: {
    en: 'We manufacture YOKE AVR SVC and TND series voltage regulators. SVC for single-phase (1-60kVA), TND for digital precision (1-100kVA), TSD for three-phase (3-300kVA). All CE and CB certified. Would you like a quote for a specific model?',
    zh: '我们生产YOKE AVR的SVC和TND系列稳压器。SVC用于单相（1-60kVA），TND用于数字精密（1-100kVA），TSD用于三相（3-300kVA）。全部CE和CB认证。您需要特定型号的报价吗？',
  },
  moq: {
    en: 'Our minimum order quantity is typically 1 unit for standard AVR models. For custom specifications, MOQ may vary. What capacity and type do you need?',
    zh: '我们的标准AVR型号最小起订量通常为1台。定制规格可能有所不同。您需要什么容量和类型？',
  },
  shipping: {
    en: 'We ship to 50+ African countries. Sea freight to Durban 25-30 days, Lagos 30-35 days, Mombasa 28-32 days. Air freight available for urgent orders. Where are you located?',
    zh: '我们向50多个非洲国家发货。海运至德班25-30天，拉各斯30-35天，蒙巴萨28-32天。紧急订单可提供空运。您在哪个国家？',
  },
  contact: {
    en: 'You can reach us at:\n📧 info@kk-electric.com\n📞 +86-159-6340-9951\n💬 WhatsApp: +86-159-6340-9951\nWe respond within 24 hours!',
    zh: '联系方式：\n📧 info@kk-electric.com\n📞 +86-159-6340-9951\n💬 WhatsApp: +86-159-6340-9951\n我们会在24小时内回复！',
  },
  company: {
    en: 'YOKE AVR has 10+ years of Africa-focused experience. We are CE & CB certified, ISO 9001:2015. Based in Shenzhen, China, serving 50+ African countries with sea freight to Durban, Lagos, Mombasa.',
    zh: 'YOKE AVR拥有10年非洲专注经验。通过CE和CB认证，ISO 9001:2015。位于中国深圳，海运至德班、拉各斯、蒙巴萨等服务50多个非洲国家。',
  },
  price: {
    en: 'Our prices are competitive for wholesale quantities. Prices vary by capacity, phase type, and order quantity. Please tell us what capacity and quantities you need for an accurate quote.',
    zh: '我们的批发价格具有竞争力。价格因容量、相数和订单量而异。请告诉我们您需要的容量和数量，以便提供准确报价。',
  },
  certification: {
    en: 'YOKE AVR is CE and CB certified, ISO 9001:2015. Our products meet international safety standards and African market requirements.',
    zh: 'YOKE AVR已获得CE和CB认证，ISO 9001:2015。我们的产品符合国际安全标准和非洲市场要求。',
  },
};

function findResponse(message: string, locale: string): string | null {
  const lowerMsg = message.toLowerCase();
  for (const [topic, keywords] of Object.entries(knowledgeBase)) {
    if (keywords.some(kw => lowerMsg.includes(kw))) {
      return responses[topic]?.[locale] || responses[topic]?.en || null;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { message, locale = 'en' } = await req.json();
    const validLocale = locale === 'zh' || locale === 'es' ? locale : 'en';
    const response = findResponse(message, validLocale) || (
      validLocale === 'zh'
        ? '感谢您的咨询！您可以告诉我们您需要的稳压器容量和应用场景，我们会尽快为您提供报价。'
        : 'Thank you for your inquiry! Please tell us about the AVR capacity and application scenario you need, and we will provide a quote promptly.'
    );
    return NextResponse.json({ response, locale: validLocale });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
