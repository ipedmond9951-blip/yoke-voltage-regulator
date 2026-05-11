'use client'
import { type Locale } from '@/i18n'
interface WhatsAppCTAProps { locale?: Locale }
const messages: Record<string, { text: string; label: string }> = {
  en: { text: "Hello YOKE, I'm interested in your AVR products. Can you provide a quote?", label: 'Chat on WhatsApp' },
  zh: { text: '你好YOKE，我想咨询稳压器产品，请问可以提供报价吗？', label: 'WhatsApp咨询' },
  es: { text: 'Hola YOKE, estoy interesado en sus productos AVR. ¿Puede darme una cotización?', label: 'Chatear en WhatsApp' },
  fr: { text: 'Bonjour YOKE, je suis intéressé par vos produits AVR. Pouvez-vous me fournir un devis?', label: 'Discuter sur WhatsApp' },
  ar: { text: 'مرحبا YOKE، أنا مهتم بمنتجات AVR الخاصة بكم. هل يمكنكم تقديم عرض أسعار؟', label: 'الدردشة على واتساب' },
  pt: { text: 'Olá YOKE, estou interessado nos seus produtos AVR. Pode-me dar um orçamento?', label: 'Conversar no WhatsApp' },
  ru: { text: 'Привет YOKE, я заинтересован в ваших продуктах AVR. Можете предоставить расценки?', label: 'Чат в WhatsApp' },
  ja: { text: 'こんにちはYOKE、AVR製品に興味があります。見積もりを提供できますか？', label: 'WhatsAppでチャット' },
  de: { text: 'Hallo YOKE, ich interessiere mich für Ihre AVR-Produkte. Können Sie mir ein Angebot machen?', label: 'Auf WhatsApp chatten' },
  hi: { text: 'नमस्ते YOKE, मैं आपके AVR उत्पादों में रुचि रखता हूं। क्या आप कोटेशन दे सकते हैं?', label: 'WhatsApp पर चैट करें' },
}
export default function WhatsAppCTA({ locale = 'en' }: WhatsAppCTAProps) {
  const msg = messages[locale] || messages.en
  const encoded = encodeURIComponent(msg.text)
  const whatsappUrl = `https://wa.me/8615963409951?text=${encoded}`
  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all">
      <span className="text-xl">💬</span><span className="font-semibold text-sm hidden md:inline">{msg.label}</span>
    </a>
  )
}
