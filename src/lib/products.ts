/**
 * Product data — shared between /[locale]/products list page and /[locale]/products/[slug] detail page.
 *
 * Built 2026-06-09 after GSC 404 audit revealed all 60 product detail URLs return 404
 * (only the /products list page existed). The grid in ProductGrid already linked to
 * /[locale]/products/[slug] but no [slug] route handler existed, so every product click
 * was a 404 for users and Googlebot.
 *
 * 6 product SKUs × 10 locales = 60 URLs to revive. Schema.org Product markup on each page
 * matches the listing page so we don't double up Product entity IDs in structured data.
 */

export interface ProductSpecs {
  capacity: string
  inputVoltage: string
  outputVoltage: string
  frequency: string
}

export interface Product {
  slug: string
  image: string
  pricePerPiece: number
  nameKey: 'svc3000va' | 'tnd3000va' | 'svc10kva' | 'svc30kva' | 'svc50kva' | 'svc60kva'
  specs: ProductSpecs
  features: string[]
  applications: string[]
}

export const allProducts: Product[] = [
  {
    slug: 'svc-3000va',
    image: '/images/products/svc-3000va.jpg',
    pricePerPiece: 89.0,
    nameKey: 'svc3000va',
    specs: { capacity: '3KVA / 2.4KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' },
    features: ['Compact design', 'Fast response', 'Reliable protection', 'LED display', 'CE certified'],
    applications: ['Home appliances', 'Refrigerators', 'Air conditioners', 'TVs', 'Computers'],
  },
  {
    slug: 'tnd-svc-3000va',
    image: '/images/products/tnd-svc-3000va.jpg',
    pricePerPiece: 95.0,
    nameKey: 'tnd3000va',
    specs: { capacity: '3KVA / 2.4KW', inputVoltage: '150-250V', outputVoltage: '220V±2%', frequency: '50/60Hz' },
    features: ['High precision', 'Digital display', 'Servo motor', 'Low noise', 'CE certified'],
    applications: ['Sensitive electronics', 'Medical equipment', 'Precision instruments', 'Laboratory devices'],
  },
  {
    slug: 'svc-10kva',
    image: '/images/products/svc-10kva.jpg',
    pricePerPiece: 189.0,
    nameKey: 'svc10kva',
    specs: { capacity: '10KVA / 8KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' },
    features: ['Copper transformer', 'Relay type', 'Overload protection', 'Time delay', 'CE certified'],
    applications: ['Air conditioners', 'Motors', 'Pumps', 'Commercial equipment', 'Small factories'],
  },
  {
    slug: 'svc-30kva',
    image: '/images/products/svc-30kva.jpg',
    pricePerPiece: 459.0,
    nameKey: 'svc30kva',
    specs: { capacity: '30KVA / 24KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' },
    features: ['Servo motor control', 'Fast regulation', 'Copper windings', 'Digital meter', 'CE certified'],
    applications: ['CNC machines', 'Welding equipment', 'Production lines', 'Industrial motors'],
  },
  {
    slug: 'svc-50kva',
    image: '/images/products/svc-50kva.jpg',
    pricePerPiece: 689.0,
    nameKey: 'svc50kva',
    specs: { capacity: '50KVA / 40KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' },
    features: ['Heavy duty', 'Triple protection', 'Copper transformer', 'Output meter', 'CE certified'],
    applications: ['Factories', 'Workshops', 'Large HVAC', 'Industrial equipment'],
  },
  {
    slug: 'svc-60kva',
    image: '/images/products/svc-60kva.jpg',
    pricePerPiece: 789.0,
    nameKey: 'svc60kva',
    specs: { capacity: '60KVA / 48KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' },
    features: ['Industrial grade', 'Auto cut-off', 'Digital display', 'Fan cooling', 'CE certified'],
    applications: ['Large motors', 'Compressors', 'Heavy industry', 'Power plants'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug)
}

export function getAllProductSlugs(): string[] {
  return allProducts.map((p) => p.slug)
}

/**
 * Localized product text — name + description for each product in each locale.
 * 10-language matrix covers all 6 SKUs.
 */
type ProductTextKey = Product['nameKey']
type ProductTextValue = { name: string; desc: string }
type ProductTextMatrix = Record<string, Record<ProductTextKey, ProductTextValue>>

export const productText: ProductTextMatrix = {
  en: {
    svc3000va: { name: 'SVC-3000VA Automatic Voltage Regulator', desc: '3KVA automatic voltage stabilizer for home appliances. Compact design, fast response, reliable voltage protection. Suitable for refrigerators, air conditioners, TVs, and computers. Input 140-260V, output 220V±3%.' },
    tnd3000va: { name: 'TND-SVC-3000VA High Precision Voltage Regulator', desc: '3KVA high precision automatic voltage regulator. Digital display, single phase. Ideal for sensitive electronics, medical equipment, and precision instruments. Input 150-250V, output 220V±2%.' },
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
    svc10kva: { name: 'منظم الجهد التلقائي SVC-10KVA', desc: 'منظم جهد تلقائي 10KVA للاستخدام التجاري والصناعي. نوع ريليه مع محول نحاسي. يحمي التكييف، المحركات، المضخات، والمعدات الثقيلة. إدخال 140-260 فولت، إخراج 220 فولت ± 3%.' },
    svc30kva: { name: 'منظم الجهد التلقائي SVC-30KVA', desc: 'منظم جهد تلقائي درجة صناعية 30KVA. تحكم بـ servo motor، تنظيم سريع. لماكينات CNC، معدات اللحام، وخطوط الإنتاج. إدخال 140-260 فولت، إخراج 220 فولت ± 3%.' },
    svc50kva: { name: 'منظم الجهد التلقائي SVC-50KVA', desc: 'منظم جهد ثقيل 50KVA. حماية ثلاثية: الجهد الزائد، الجهد الناقص، المؤقت. للمصانع، الورش، وأنظمة التدفئة والتكييف الكبيرة. إدخال 140-260 فولت، إخراج 220 فولت ± 3%.' },
    svc60kva: { name: 'منظم الجهد التلقائي SVC-60KVA', desc: 'منظم جهد تلقائي صناعي 60KVA. عرض رقمي، قطع تلقائي. للمحركات الكبيرة، الضواغط، والمعدات الصناعية. إدخال 140-260 فولت، إخراج 220 فولت ± 3%.' },
  },
  fr: {
    svc3000va: { name: 'Régulateur Automatique SVC-3000VA', desc: 'Stabilisateur de tension automatique 3KVA pour appareils électroménagers. Conception compacte, réponse rapide, protection fiable. Convient aux réfrigérateurs, climatiseurs, téléviseurs et ordinateurs. Entrée 140-260V, sortie 220V±3%.' },
    tnd3000va: { name: 'Régulateur TND-SVC-3000VA Haute Précision', desc: 'Régulateur de tension automatique haute précision 3KVA avec affichage numérique. Idéal pour électronique sensible, équipements médicaux et instruments de précision. Entrée 150-250V, sortie 220V±2%.' },
    svc10kva: { name: 'Régulateur Automatique SVC-10KVA', desc: 'Stabilisateur de tension automatique 10KVA pour usage commercial et industriel. Type relais avec transformateur en cuivre. Protège climatiseurs, moteurs, pompes et équipements lourds. Entrée 140-260V, sortie 220V±3%.' },
    svc30kva: { name: 'Régulateur Automatique SVC-30KVA', desc: 'Régulateur de tension automatique qualité industrielle 30KVA. Contrôle servo-moteur, régulation rapide. Pour machines CNC, équipements de soudure et chaînes de production. Entrée 140-260V, sortie 220V±3%.' },
    svc50kva: { name: 'Régulateur Automatique SVC-50KVA', desc: 'Stabilisateur de tension robuste 50KVA. Triple protection: surtension, sous-tension, temporisation. Pour usines, ateliers et grands systèmes CVC. Entrée 140-260V, sortie 220V±3%.' },
    svc60kva: { name: 'Régulateur Automatique SVC-60KVA', desc: 'Régulateur de tension automatique industriel 60KVA. Affichage numérique, coupure automatique. Pour gros moteurs, compresseurs et équipements industriels. Entrée 140-260V, sortie 220V±3%.' },
  },
  pt: {
    svc3000va: { name: 'Regulador Automático SVC-3000VA', desc: 'Estabilizador de tensão automático 3KVA para eletrodomésticos. Design compacto, resposta rápida, proteção confiável. Adequado para geladeiras, ar-condicionado, TVs e computadores. Entrada 140-260V, saída 220V±3%.' },
    tnd3000va: { name: 'Regulador TND-SVC-3000VA Alta Precisão', desc: 'Regulador de tensão automático de alta precisão 3KVA com display digital. Ideal para eletrônicos sensíveis, equipamentos médicos e instrumentos de precisão. Entrada 150-250V, saída 220V±2%.' },
    svc10kva: { name: 'Regulador Automático SVC-10KVA', desc: 'Estabilizador de tensão automático 10KVA para uso comercial e industrial. Tipo relé com transformador de cobre. Protege ar-condicionado, motores, bombas e equipamentos pesados. Entrada 140-260V, saída 220V±3%.' },
    svc30kva: { name: 'Regulador Automático SVC-30KVA', desc: 'Regulador de tensão automático grau industrial 30KVA. Controle por servomotor, regulação rápida. Para máquinas CNC, equipamentos de soldagem e linhas de produção. Entrada 140-260V, saída 220V±3%.' },
    svc50kva: { name: 'Regulador Automático SVC-50KVA', desc: 'Estabilizador de tensão pesado 50KVA. Tripla proteção: sobretensão, subtensão, retardo de tempo. Para fábricas, oficinas e grandes sistemas HVAC. Entrada 140-260V, saída 220V±3%.' },
    svc60kva: { name: 'Regulador Automático SVC-60KVA', desc: 'Regulador de tensão automático industrial 60KVA. Display digital, corte automático. Para motores grandes, compressores e equipamentos industriais. Entrada 140-260V, saída 220V±3%.' },
  },
  ru: {
    svc3000va: { name: 'Автоматический регулятор напряжения SVC-3000VA', desc: 'Автоматический стабилизатор напряжения 3KVA для бытовой техники. Компактный дизайн, быстрый отклик, надежная защита. Подходит для холодильников, кондиционеров, телевизоров и компьютеров. Вход 140-260В, выход 220В±3%.' },
    tnd3000va: { name: 'Регулятор TND-SVC-3000VA высокой точности', desc: 'Автоматический регулятор напряжения высокой точности 3KVA с цифровым дисплеем. Идеален для чувствительной электроники, медицинского оборудования и прецизионных приборов. Вход 150-250В, выход 220В±2%.' },
    svc10kva: { name: 'Автоматический регулятор напряжения SVC-10KVA', desc: 'Автоматический стабилизатор напряжения 10KVA для коммерческого и промышленного использования. Релейный тип с медным трансформатором. Защищает кондиционеры, двигатели, насосы и тяжелое оборудование. Вход 140-260В, выход 220В±3%.' },
    svc30kva: { name: 'Автоматический регулятор напряжения SVC-30KVA', desc: 'Автоматический регулятор напряжения промышленного класса 30KVA. Управление серводвигателем, быстрая регулировка. Для станков ЧПУ, сварочного оборудования и производственных линий. Вход 140-260В, выход 220В±3%.' },
    svc50kva: { name: 'Автоматический регулятор напряжения SVC-50KVA', desc: 'Тяжелый стабилизатор напряжения 50KVA. Тройная защита: перенапряжение, пониженное напряжение, задержка времени. Для заводов, мастерских и крупных систем HVAC. Вход 140-260В, выход 220В±3%.' },
    svc60kva: { name: 'Автоматический регулятор напряжения SVC-60KVA', desc: 'Промышленный автоматический регулятор напряжения 60KVA. Цифровой дисплей, автоматическое отключение. Для крупных двигателей, компрессоров и промышленного оборудования. Вход 140-260В, выход 220В±3%.' },
  },
  ja: {
    svc3000va: { name: 'SVC-3000VA 自動電圧調整器', desc: '家電製品向け3KVA自動電圧安定器。コンパクト設計、迅速な応答、信頼性の高い電圧保護。冷蔵庫、エアコン、テレビ、コンピュータに適しています。入力140-260V、出力220V±3%。' },
    tnd3000va: { name: 'TND-SVC-3000VA 高精度電圧調整器', desc: 'デジタル表示付き3KVA高精度自動電圧調整器。 sensitive electronics、医療機器、精密機器に最適。入力150-250V、出力220V±2%。' },
    svc10kva: { name: 'SVC-10KVA 自動電圧調整器', desc: '商業・工業用10KVA自動電圧安定器。銅変圧器付きリレータイプ。エアコン、モーター、ポンプ、重機を守ります。入力140-260V、出力220V±3%。' },
    svc30kva: { name: 'SVC-30KVA 自動電圧調整器', desc: '工業グレード30KVA自動電圧調整器。サーボモーター制御、高速調整。CNC機械、溶接機器、生産ライン向け。入力140-260V、出力220V±3%。' },
    svc50kva: { name: 'SVC-50KVA 自動電圧調整器', desc: 'ヘビーデューティ50KVA電圧安定器。トリプル保護：過電圧、不足電圧、時間遅延。工場、ワークショップ、大型HVACシステム向け。入力140-260V、出力220V±3%。' },
    svc60kva: { name: 'SVC-60KVA 自動電圧調整器', desc: '工業用60KVA自動電圧調整器。デジタルメーター表示、自動遮断保護。大型モーター、コンプレッサー、工業機器向け。入力140-260V、出力220V±3%。' },
  },
  de: {
    svc3000va: { name: 'Automatischer Spannungsregler SVC-3000VA', desc: '3KVA automatischer Spannungsstabilisator für Haushaltsgeräte. Kompaktes Design, schnelle Reaktion, zuverlässiger Spannungsschutz. Geeignet für Kühlschränke, Klimaanlagen, Fernseher und Computer. Eingang 140-260V, Ausgang 220V±3%.' },
    tnd3000va: { name: 'TND-SVC-3000VA Hochpräzisions-Spannungsregler', desc: '3KVA hochpräziser automatischer Spannungsregler mit Digitalanzeige. Ideal für empfindliche Elektronik, medizinische Geräte und Präzisionsinstrumente. Eingang 150-250V, Ausgang 220V±2%.' },
    svc10kva: { name: 'Automatischer Spannungsregler SVC-10KVA', desc: '10KVA automatischer Spannungsstabilisator für gewerbliche und industrielle Nutzung. Relaistyp mit Kupfertransformator. Schützt Klimaanlagen, Motoren, Pumpen und schwere Geräte. Eingang 140-260V, Ausgang 220V±3%.' },
    svc30kva: { name: 'Automatischer Spannungsregler SVC-30KVA', desc: '30KVA Industriegrad-Spannungsregler. Servomotorsteuerung, schnelle Regulierung. Für CNC-Maschinen, Schweißausrüstung und Produktionslinien. Eingang 140-260V, Ausgang 220V±3%.' },
    svc50kva: { name: 'Automatischer Spannungsregler SVC-50KVA', desc: '50KVA Hochleistungs-Spannungsstabilisator. Dreifachschutz: Überspannung, Unterspannung, Zeitverzögerung. Für Fabriken, Werkstätten und große HVAC-Systeme. Eingang 140-260V, Ausgang 220V±3%.' },
    svc60kva: { name: 'Automatischer Spannungsregler SVC-60KVA', desc: '60KVA industrieller automatischer Spannungsregler. Digitalanzeige, automatische Abschaltung. Für große Motoren, Kompressoren und Industrieanlagen. Eingang 140-260V, Ausgang 220V±3%.' },
  },
  hi: {
    svc3000va: { name: 'SVC-3000VA स्वचालित वोल्टेज नियामक', desc: 'घरेलू उपकरणों के लिए 3KVA स्वचालित वोल्टेज स्टेबलाइजर। कॉम्पैक्ट डिज़ाइन, तेज़ प्रतिक्रिया, विश्वसनीय वोल्टेज सुरक्षा। रेफ्रिजरेटर, एयर कंडीशनर, टीवी और कंप्यूटर के लिए उपयुक्त। इनपुट 140-260V, आउटपुट 220V±3%।' },
    tnd3000va: { name: 'TND-SVC-3000VA उच्च परिशुद्धता वोल्टेज नियामक', desc: 'डिजिटल डिस्प्ले के साथ 3KVA उच्च परिशुद्धता स्वचालित वोल्टेज नियामक। संवेदनशील इलेक्ट्रॉनिक्स, चिकित्सा उपकरण और सटीक उपकरणों के लिए आदर्श। इनपुट 150-250V, आउटपुट 220V±2%।' },
    svc10kva: { name: 'SVC-10KVA स्वचालित वोल्टेज नियामक', desc: 'व्यावसायिक और औद्योगिक उपयोग के लिए 10KVA स्वचालित वोल्टेज स्टेबलाइजर। तांबे के ट्रांसफार्मर के साथ रिले प्रकार। एयर कंडीशनर, मोटर, पंप और भारी उपकरणों की रक्षा करता है। इनपुट 140-260V, आउटपुट 220V±3%।' },
    svc30kva: { name: 'SVC-30KVA स्वचालित वोल्टेज नियामक', desc: '30KVA औद्योगिक ग्रेड स्वचालित वोल्टेज नियामक। सर्वो मोटर नियंत्रण, तेज़ नियमन। CNC मशीन, वेल्डिंग उपकरण और उत्पादन लाइनों के लिए। इनपुट 140-260V, आउटपुट 220V±3%।' },
    svc50kva: { name: 'SVC-50KVA स्वचालित वोल्टेज नियामक', desc: '50KVA हेवी ड्यूटी वोल्टेज स्टेबलाइजर। ट्रिपल सुरक्षा: ओवर-वोल्टेज, अंडर-वोल्टेज, समय विलंब। कारखानों, कार्यशालाओं और बड़ी HVAC प्रणालियों के लिए। इनपुट 140-260V, आउटपुट 220V±3%।' },
    svc60kva: { name: 'SVC-60KVA स्वचालित वोल्टेज नियामक', desc: '60KVA औद्योगिक स्वचालित वोल्टेज नियामक। डिजिटल मीटर डिस्प्ले, स्वचालित कट-ऑफ सुरक्षा। बड़ी मोटर, कंप्रेसर और औद्योगिक उपकरण के लिए। इनपुट 140-260V, आउटपुट 220V±3%।' },
  },
}

export function getProductText(locale: string, nameKey: ProductTextKey): ProductTextValue {
  const map = (productText as Record<string, Record<ProductTextKey, ProductTextValue>>)[locale]
  return map?.[nameKey] || productText.en[nameKey]
}
