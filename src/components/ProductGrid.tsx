'use client'

import Image from 'next/image'
import { type Locale, t } from '@/i18n'
import { useCurrency } from '@/contexts/CurrencyContext'

interface ProductGridProps { locale?: Locale }

const products = [
  { slug: 'svc-3000va', image: '/images/products/svc-3000va.jpg', pricePerPiece: 89.00, nameKey: 'svc3000va',
    specs: { capacity: '3KVA / 2.4KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' } },
  { slug: 'tnd-svc-3000va', image: '/images/products/tnd-svc-3000va.jpg', pricePerPiece: 95.00, nameKey: 'tnd3000va',
    specs: { capacity: '3KVA / 2.4KW', inputVoltage: '150-250V', outputVoltage: '220V±2%', frequency: '50/60Hz' } },
  { slug: 'svc-10kva', image: '/images/products/svc-10kva.jpg', pricePerPiece: 189.00, nameKey: 'svc10kva',
    specs: { capacity: '10KVA / 8KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' } },
  { slug: 'svc-30kva', image: '/images/products/svc-30kva.jpg', pricePerPiece: 459.00, nameKey: 'svc30kva',
    specs: { capacity: '30KVA / 24KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' } },
  { slug: 'svc-50kva', image: '/images/products/svc-50kva.jpg', pricePerPiece: 689.00, nameKey: 'svc50kva',
    specs: { capacity: '50KVA / 40KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' } },
  { slug: 'svc-60kva', image: '/images/products/svc-60kva.jpg', pricePerPiece: 789.00, nameKey: 'svc60kva',
    specs: { capacity: '60KVA / 48KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' } },
]

const productText: Record<string, Record<string, { name: string; desc: string }>> = {
  en: {
    svc3000va: { name: 'SVC-3000VA Automatic Voltage Regulator', desc: '3KVA automatic voltage stabilizer for home appliances. Compact design, fast response, reliable voltage protection. Suitable for refrigerators, air conditioners, TVs, and computers. Input 140-260V, output 220V±3%.' },
    tnd3000va: { name: 'TND-SVC-3000VA高精度稳压器', desc: '3KVA high precision automatic voltage regulator. Digital display, single phase. Ideal for sensitive electronics, medical equipment, and precision instruments. Input 150-250V, output 220V±2%.' },
    svc10kva: { name: 'SVC-10KVA Automatic Voltage Regulator', desc: '10KVA automatic voltage stabilizer for commercial and industrial use. Relay type with copper transformer. Protects air conditioners, motors, pumps, and heavy equipment. Input 140-260V, output 220V±3%.' },
    svc30kva: { name: 'SVC-30KVA Automatic Voltage Regulator', desc: '30KVA industrial grade automatic voltage regulator. Servo motor control, fast regulation. For CNC machines, welding equipment, and production lines. Input 140-260V, output 220V±3%.' },
    svc50kva: { name: 'SVC-50KVA Automatic Voltage Regulator', desc: '50KVA heavy duty voltage stabilizer. Triple protection: over-voltage, under-voltage, time delay. For factories, workshops, and large HVAC systems. Input 140-260V, output 220V±3%.' },
    svc60kva: { name: 'SVC-60KVA Automatic Voltage Regulator', desc: '60KVA industrial automatic voltage regulator. Digital meter display, automatic cut-off protection. For large motors, compressors, and industrial equipment. Input 140-260V, output 220V±3%.' },
  },
  zh: {
    svc3000va: { name: 'SVC-3000VA 自动稳压器', desc: '3KVA家用自动电压稳压器。体积小，响应快，可靠的电压保护。适用于冰箱、空调、电视、电脑。输入140-260V，输出220V±3%。' },
    tnd3000va: { name: 'TND-SVC-3000VA 高精度稳压器', desc: '3KVA高精度数字显示单相稳压器。适用于敏感电子设备、医疗设备、精密仪器。输入150-250V，输出220V±2%。' },
    svc10kva: { name: 'SVC-10KVA 自动稳压器', desc: '10KVA商用工业自动电压稳压器。继电器型，铜芯变压器。保护空调、电机、水泵、重型设备。输入140-260V，输出220V±3%。' },
    svc30kva: { name: 'SVC-30KVA 自动稳压器', desc: '30KVA工业级自动电压调节器。伺服电机控制，快速调节。适用于数控机床、焊接设备、生产线。输入140-260V，输出220V±3%。' },
    svc50kva: { name: 'SVC-50KVA 自动稳压器', desc: '50KVA重型电压稳压器。三重保护：过压、欠压、延时。适用于工厂、车间、大型暖通空调系统。输入140-260V，输出220V±3%。' },
    svc60kva: { name: 'SVC-60KVA 自动稳压器', desc: '60KVA工业自动电压调节器。数字仪表显示，自动切断保护。适用于大型电机、压缩机、工业设备。输入140-260V，输出220V±3%。' },
  },
  es: {
    svc3000va: { name: 'Regulador Automático SVC-3000VA', desc: 'Estabilizador de voltaje automático de 3KVA para electrodomésticos. Diseño compacto, respuesta rápida, protección confiable. Apto para refrigeradores, aires acondicionados, TVs y computadoras. Entrada 140-260V, salida 220V±3%.' },
    tnd3000va: { name: 'Regulador TND-SVC-3000VA Alta Precisión', desc: 'Regulador automático de voltaje de alta precisión 3KVA con pantalla digital. Ideal para electrónica sensible, equipos médicos e instrumentos de precisión. Entrada 150-250V, salida 220V±2%.' },
    svc10kva: { name: 'Regulador Automático SVC-10KVA', desc: 'Estabilizador de voltaje automático de 10KVA para uso comercial e industrial. Tipo relé con transformador de cobre. Protege aires acondicionados, motores, bombas y equipos pesados. Entrada 140-260V, salida 220V±3%.' },
    svc30kva: { name: 'Regulador Automático SVC-30KVA', desc: 'Regulador de voltaje automático grado industrial 30KVA. Control por servomotor, regulación rápida. Para máquinas CNC, equipos de soldadura y líneas de producción. Entrada 140-260V, salida 220V±3%.' },
    svc50kva: { name: 'Regulador Automático SVC-50KVA', desc: 'Estabilizador de voltaje pesado 50KVA. Triple protección: sobrevoltaje, bajo voltaje, retardo de tiempo. Para fábricas, talleres y sistemas HVAC grandes. Entrada 140-260V, salida 220V±3%.' },
    svc60kva: { name: 'Regulador Automático SVC-60KVA', desc: 'Regulador automático de voltaje industrial 60KVA. Display digital, corte automático. Para motores grandes, compresores y equipos industriales. Entrada 140-260V, salida 220V±3%.' },
  },
  ar: {
    svc3000va: { name: 'منظم الجهد التلقائي SVC-3000VA', desc: 'منظم جهد تلقائي 3KVA للأجهزة المنزلية. تصميم مدمج، استجابة سريعة، حماية موثوقة. مناسب للثلاجات، التكييف، التلفاز، والحواسيب. إدخال 140-260 فولت، إخراج 220 فولت ± 3%.' },
    tnd3000va: { name: 'منظم TND-SVC-3000VA عالي الدقة', desc: 'منظم جهد تلقائي عالي الدقة 3KVA مع شاشة رقمية. مثالي للإلكترونيات الحساسة، المعدات الطبية، وأجهزة الدقة. إدخال 150-250 فولت، إخراج 220 فولت ± 2%.' },
    svc10kva: { name: 'منظم الجهد التلقائي SVC-10KVA', desc: 'منظم جهد تلقائي 10KVA للاستخدام التجاري والصناعي. نوعريليه مع محول نحاسي. يحمي التكييف، المحركات، المضخات، والمعدات الثقيلة. إدخال 140-260 فولت، إخراج 220 فولت ± 3%.' },
    svc30kva: { name: 'منظم الجهد التلقائي SVC-30KVA', desc: 'منظم جهد تلقائي درجة صناعية 30KVA. تحكم بسervo motor، تنظيم سريع. لماكينات CNC، معدات اللحام، وخطوط الإنتاج. إدخال 140-260 فولت، إخراج 220 فولت ± 3%.' },
    svc50kva: { name: 'منظم الجهد التلقائي SVC-50KVA', desc: 'منظم جهد ثقيل 50KVA. حماية ثلاثية: الجهد الزائد، الجهد الناقص، المؤقت. للمصانع، الورش، وأنظمة التدفئة والتكييف الكبيرة. إدخال 140-260 فولت، إخراج 220 فولت ± 3%.' },
    svc60kva: { name: 'منظم الجهد التلقائي SVC-60KVA', desc: 'منظم جهد تلقائي صناعي 60KVA. شاشة رقمية، فصل تلقائي. للمحركات الكبيرة، الضواغط، والمعدات الصناعية. إدخال 140-260 فولت، إخراج 220 فولت ± 3%.' },
  },
  fr: {
    svc3000va: { name: 'Régulateur Automatique SVC-3000VA', desc: 'Stabilisateur de tension automatique 3KVA pour appareils électroménagers. Conception compacte, réponse rapide, protection fiable. Adapté aux réfrigérateurs, climatiseurs, TVs et ordinateurs. Entrée 140-260V, sortie 220V±3%.' },
    tnd3000va: { name: 'Régulateur TND-SVC-3000VA Haute Précision', desc: 'Régulateur de tension automatique haute précision 3KVA avec affichage numérique. Idéal pour électronique sensible, équipements médicaux et instruments de précision. Entrée 150-250V, sortie 220V±2%.' },
    svc10kva: { name: 'Régulateur Automatique SVC-10KVA', desc: 'Stabilisateur de tension automatique 10KVA pour usage commercial et industriel. Type relais avec transformateur cuivre. Protège climatiseurs, moteurs, pompes et équipements lourds. Entrée 140-260V, sortie 220V±3%.' },
    svc30kva: { name: 'Régulateur Automatique SVC-30KVA', desc: 'Régulateur de tension automatique grade industriel 30KVA. Contrôle par servomoteur, régulation rapide. Pour machines CNC, équipements de soudure et lignes de production. Entrée 140-260V, sortie 220V±3%.' },
    svc50kva: { name: 'Régulateur Automatique SVC-50KVA', desc: 'Stabilisateur de tension lourd 50KVA. Protection triple: surtension, sous-tension, temporisation. Pour usines, ateliers et grands systèmes HVAC. Entrée 140-260V, sortie 220V±3%.' },
    svc60kva: { name: 'Régulateur Automatique SVC-60KVA', desc: 'Régulateur de tension automatique industriel 60KVA. Affichage numérique, coupure automatique. Pour grands moteurs, compresseurs et équipements industriels. Entrée 140-260V, sortie 220V±3%.' },
  },
  pt: {
    svc3000va: { name: 'Regulador Automático SVC-3000VA', desc: 'Estabilizador de tensão automático 3KVA para eletrodomésticos. Design compacto, resposta rápida, proteção confiável. Adequado para geladeiras, ar condicionado, TVs e computadores. Entrada 140-260V, saída 220V±3%.' },
    tnd3000va: { name: 'Regulador TND-SVC-3000VA Alta Precisão', desc: 'Regulador de tensão automático alta precisão 3KVA com display digital. Ideal para eletrônica sensível, equipamentos médicos e instrumentos de precisão. Entrada 150-250V, saída 220V±2%.' },
    svc10kva: { name: 'Regulador Automático SVC-10KVA', desc: 'Estabilizador de tensão automático 10KVA para uso comercial e industrial. Tipo relé com transformador de cobre. Protege ar condicionado, motores, bombas e equipamentos pesados. Entrada 140-260V, saída 220V±3%.' },
    svc30kva: { name: 'Regulador Automático SVC-30KVA', desc: 'Regulador de tensão automático grau industrial 30KVA. Controle por servomotor, regulação rápida. Para máquinas CNC, equipamentos de solda e linhas de produção. Entrada 140-260V, saída 220V±3%.' },
    svc50kva: { name: 'Regulador Automático SVC-50KVA', desc: 'Estabilizador de tensão pesado 50KVA. Proteção tripla: sobretensão, subtensão, retardo. Para fábricas, oficinas e grandes sistemas HVAC. Entrada 140-260V, saída 220V±3%.' },
    svc60kva: { name: 'Regulador Automático SVC-60KVA', desc: 'Regulador de tensão automático industrial 60KVA. Display digital, corte automático. Para grandes motores, compressores e equipamentos industriais. Entrada 140-260V, saída 220V±3%.' },
  },
  ru: {
    svc3000va: { name: 'Автоматический регулятор напряжения SVC-3000VA', desc: 'Автоматический стабилизатор напряжения 3КВА для бытовой техники. Компактный дизайн, быстрый отклик, надежная защита. Подходит для холодильников, кондиционеров, телевизоров и компьютеров. Вход 140-260В, выход 220В±3%.' },
    tnd3000va: { name: 'Высокоточный регулятор TND-SVC-3000VA', desc: 'Высокоточный автоматический регулятор напряжения 3КВА с цифровым дисплеем. Идеально для чувствительной электроники, медицинского оборудования и прецизионных приборов. Вход 150-250В, выход 220В±2%.' },
    svc10kva: { name: 'Автоматический регулятор напряжения SVC-10KVA', desc: 'Автоматический стабилизатор напряжения 10КВА для коммерческого и промышленного использования. Релейного типа с медным трансформатором. Защищает кондиционеры, моторы, насосы и тяжелое оборудование. Вход 140-260В, выход 220В±3%.' },
    svc30kva: { name: 'Автоматический регулятор напряжения SVC-30KVA', desc: 'Промышленный автоматический регулятор напряжения 30КВА. Управление серводвигателем, быстрая регулировка. Для станков с ЧПУ, сварочного оборудования и производственных линий. Вход 140-260В, выход 220В±3%.' },
    svc50kva: { name: 'Автоматический регулятор напряжения SVC-50KVA', desc: 'Тяжелый стабилизатор напряжения 50КВА. Тройная защита: от перенапряжения, пониженного напряжения, с задержкой. Для заводов, мастерских и крупных систем ОВиК. Вход 140-260В, выход 220В±3%.' },
    svc60kva: { name: 'Автоматический регулятор напряжения SVC-60KVA', desc: 'Промышленный автоматический регулятор напряжения 60КВА. Цифровой дисплей, автоматическое отключение. Для крупных двигателей, компрессоров и промышленного оборудования. Вход 140-260В, выход 220В±3%.' },
  },
  ja: {
    svc3000va: { name: 'SVC-3000VA 自動電圧調整机', desc: '家庭用电器向け3KVA自動電圧安定化装置。コンパクト設計、迅速な応答、可靠な保護。冷蔵庫、エアコン、テレビ、コンピュータに適しています。入力140-260V、出力220V±3%。' },
    tnd3000va: { name: 'TND-SVC-3000VA 高精度調整机', desc: 'デジタル表示付き3KVA高精度自動電圧調整器。精密電子機器、医療機器、測定機器に最適。入力150-250V、出力220V±2%。' },
    svc10kva: { name: 'SVC-10KVA 自動電圧調整机', desc: '商用・産業用10KVA自動電圧安定化装置。銅変压器付き電磁リレー式。エアコン、モーター、ポンプ、重機保護。入力140-260V、出力220V±3%。' },
    svc30kva: { name: 'SVC-30KVA 自動電圧調整机', desc: '産業用30KVA自動電圧調整器。サーボモーター制御、快速調整。CNC機械、焊接設備、生産ライン向け。入力140-260V、出力220V±3%。' },
    svc50kva: { name: 'SVC-50KVA 自動電圧調整机', desc: 'ヘビーデューティ50KVA電圧安定化装置。三重保護：過電圧、不足電圧、遅延。工場、作業場、大型HVACシステム向け。入力140-260V、出力220V±3%。' },
    svc60kva: { name: 'SVC-60KVA 自動電圧調整机', desc: '産業用60KVA自動電圧調整器。デジタルmeter表示、自动遮断。大形モーター、コンプレッサー、産業機器向け。入力140-260V、出力220V±3%。' },
  },
  de: {
    svc3000va: { name: 'SVC-3000VA Automatischer Spannungsregler', desc: '3KVA automatischer Spannungsstabilisator für Haushaltsgeräte. Kompaktes Design, schnelle Reaktion, zuverlässiger Schutz. Geeignet für Kühlschränke, Klimaanlagen, TVs und Computer. Eingang 140-260V, Ausgang 220V±3%.' },
    tnd3000va: { name: 'TND-SVC-3000VA Hochpräziser Regler', desc: '3KVA hochpräziser automatischer Spannungsregler mit Digitalanzeige. Ideal für empfindliche Elektronik, medizinische Geräte und Präzisionsinstrumente. Eingang 150-250V, Ausgang 220V±2%.' },
    svc10kva: { name: 'SVC-10KVA Automatischer Spannungsregler', desc: '10KVA automatischer Spannungsstabilisator für kommerzielle und industrielle Nutzung. Relais-Typ mit Kupfertransformator. Schützt Klimaanlagen, Motoren, Pumpen und schwere Geräte. Eingang 140-260V, Ausgang 220V±3%.' },
    svc30kva: { name: 'SVC-30KVA Automatischer Spannungsregler', desc: '30KVA industrieller automatischer Spannungsregler. Servomotorsteuerung, schnelle Regelung. Für CNC-Maschinen, Schweißgeräte und Produktionslinien. Eingang 140-260V, Ausgang 220V±3%.' },
    svc50kva: { name: 'SVC-50KVA Automatischer Spannungsregler', desc: '50KVA schwerer Spannungsstabilisator. Dreifacher Schutz: Überspannung, Unterspannung, Zeitverzögerung. Für Fabriken, Werkstätten und große HLK-Systeme. Eingang 140-260V, Ausgang 220V±3%.' },
    svc60kva: { name: 'SVC-60KVA Automatischer Spannungsregler', desc: '60KVA industrieller automatischer Spannungsregler. Digitalanzeige, automatische Abschaltung. Für große Motoren, Kompressoren und Industriemaschinen. Eingang 140-260V, Ausgang 220V±3%.' },
  },
  hi: {
    svc3000va: { name: 'SVC-3000VA ऑटोमैटिक वोल्टेज रेगुलेटर', desc: 'घरेलू उपकरणों के लिए 3KVA ऑटोमैटिक वोल्टेज स्टेबलाइज़र। कॉम्पैक्ट डिज़ाइन, तेज़ रिस्पॉन्स, विश्वसनीय सुरक्षा। रेफ्रिजरेटर, एयर कंडीशनर, टीवी और कंप्यूटर के लिए उपयुक्त। इनपुट 140-260V, आउटपुट 220V±3%।' },
    tnd3000va: { name: 'TND-SVC-3000VA हाई प्रिसिज़न रेगुलेटर', desc: 'डिजिटल डिस्प्ले के साथ 3KVA हाई प्रिसिज़न ऑटोमैटिक वोल्टेज रेगुलेटर। संवेदनशील इलेक्ट्रॉनिक्स, मेडिकल उपकरण और प्रिसिज़न इंस्ट्रूमेंट्स के लिए आदर्श। इनपुट 150-250V, आउटपुट 220V±2%।' },
    svc10kva: { name: 'SVC-10KVA ऑटोमैटिक वोल्टेज रेगुलेटर', desc: '10KVA कमर्शियल और इंडस्ट्रियल उपयोग के लिए ऑटोमैटिक वोल्टेज स्टेबलाइज़र। रिले टाइप कॉपर ट्रांसफॉर्मर के साथ। एयर कंडीशनर, मोटर्स, पंप और भारी उपकरणों की सुरक्षा करता है। इनपुट 140-260V, आउटपुट 220V±3%।' },
    svc30kva: { name: 'SVC-30KVA ऑटोमैटिक वोल्टेज रेगुलेटर', desc: '30KVA इंडस्ट्रियल ग्रेड ऑटोमैटिक वोल्टेज रेगुलेटर। सर्वो मोटर कंट्रोल, तेज़ रेगुलेशन। CNC मशीनों, वेल्डिंग उपकरणों और प्रोडक्शन लाइनों के लिए। इनपुट 140-260V, आउटपुट 220V±3%।' },
    svc50kva: { name: 'SVC-50KVA ऑटोमैटिक वोल्टेज रेगुलेटर', desc: '50KVA हैवी ड्यूटी वोल्टेज स्टेबलाइज़र। ट्रिपल प्रोटेक्शन: ओवर वोल्टेज, अंडर वोल्टेज, टाइम डिले। फैक्ट्रियों, वर्कशॉप्स और बड़े HVAC सिस्टम के लिए। इनपुट 140-260V, आउटपुट 220V±3%।' },
    svc60kva: { name: 'SVC-60KVA ऑटोमैटिक वोल्टेज रेगुलेटर', desc: '60KVA इंडस्ट्रियल ऑटोमैटिक वोल्टेज रेगुलेटर। डिजिटल मीटर डिस्प्ले, ऑटोमैटिक कट-ऑफ। बड़े मोटर्स, कंप्रेसर्स और इंडस्ट्रियल इक्विपमेंट के लिए। इनपुट 140-260V, आउटपुट 220V±3%।' },
  },
}

export default function ProductGrid({ locale = 'en' }: ProductGridProps) {
  const { formatPrice } = useCurrency()

  return (
    <section className="py-16 md:py-20 bg-gray-50" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t(locale, 'products.title') || 'Automatic Voltage Regulators'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t(locale, 'products.subtitle') || 'Professional AVR solutions for home and industrial use'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => {
            const text = productText[locale]?.[product.nameKey] || productText['en'][product.nameKey]
            return (
              <div key={product.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 md:h-56 bg-gray-100">
                  <Image
                    src={product.image}
                    alt={text?.name || product.nameKey}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 md:p-6 flex flex-col h-full">
                  <a href={`/${locale}/products/${product.slug}`} className="block">
                    <h3 className="font-bold text-primary-900 text-sm md:text-base lg:text-lg mb-1">{text?.name}</h3>
                  </a>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">{text?.desc}</p>
                  
                  <div className="space-y-1.5 text-xs md:text-sm mt-auto">
                    <div className="flex justify-between"><span className="text-gray-500">Capacity:</span><span className="font-medium text-right truncate ml-2">{product.specs.capacity}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Input:</span><span className="font-medium text-right truncate ml-2">{product.specs.inputVoltage}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Output:</span><span className="font-medium text-right truncate ml-2">{product.specs.outputVoltage}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">{t(locale, 'products.lead') || 'Lead Time'}:</span><span className="font-medium">7-15 {locale === 'zh' ? '天' : 'days'}</span></div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <span className="text-primary-900 font-bold text-sm md:text-base whitespace-nowrap">{formatPrice(product.pricePerPiece)}</span>
                    <a href={`/${locale}#inquiry`} className="bg-primary-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-primary-800 transition-colors whitespace-nowrap">
                      {t(locale, 'products.inquiry') || 'Inquire'}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
