#!/usr/bin/env python3
"""Add 7 remaining language bodies (es, ar, pt, ru, ja, de, hi) to central-africa article."""
import json
import os
from collections import OrderedDict

PATH = 'content/articles/central-africa-avr-trade.json'
with open(PATH, 'r', encoding='utf-8') as f:
    art = json.load(f, object_pairs_hook=OrderedDict)

# ============ SPANISH ============
ES = {
0: """# Descripción del mercado de estabilizadores de voltaje de África Central

El mercado de estabilizadores de voltaje (AVR) de África Central representa una **oportunidad anual de US$185 millones en 2026**, cubriendo **8 países** de la zona económica y monetaria **CEMAC** (Comunidad Económica y Monetaria de África Central). Población total superior a **220 millones** en RDC, Camerún, Congo Brazzaville, Gabón, Chad, República Centroafricana (RCA), Guinea Ecuatorial y Santo Tomé y Príncipe.

África Central es única por tres factores estructurales:

1. **Dependencia hidroeléctrica y estacionalidad**: la cuenca del Congo (RDC, Congo Brazzaville) y el río Sanaga (Camerún) generan 60-70% de la electricidad, pero las variaciones estacionales del nivel del agua (junio-octubre, caudal bajo de afluentes sur) causan fluctuaciones de voltaje de ±25%.

2. **Concentración portuaria atlántica**: la logística de importación fluye a través de **Douala (Camerún)** y **Pointe-Noire (Congo Brazzaville)**.

3. **Reconstrucción post-conflicto**: la RCA, el este de RDC y el norte de Camerún necesitan AVR servo trifásicos robustos para hospitales, servicios de agua y backhaul de telecomunicaciones.

Según el IEA Africa Energy Outlook 2024, África Central tiene la **mayor demanda insatisfecha per cápita de equipos de calidad de energía** entre todas las subregiones africanas: solo 9% de los establecimientos comerciales fuera de las capitales tienen estabilizador dedicado (vs 23% en África Occidental, 38% en África Austral).

YOKE ha estado sirviendo activamente a África Central desde 2018. Datos de despliegue Q4 2024 a Q1 2026: **3.140 unidades enviadas a África Central (14% del total de envíos africanos)**, desglose por país:
- **RDC**: 1.180 unidades (37,6%)
- **Camerún**: 720 unidades (22,9%)
- **Congo Brazzaville**: 410 unidades (13,1%)
- **Gabón**: 380 unidades (12,1%)
- **Chad**: 240 unidades (7,6%)
- **RCA**: 90 unidades (2,9%)
- **Guinea Ecuatorial**: 90 unidades (2,9%)
- **Santo Tomé y Príncipe**: 30 unidades (1,0%)

Este artículo cubre los desafíos de calidad de energía, criterios de selección de AVR, mejores prácticas de instalación y los **8 centros de distribución estratégica** que YOKE mantiene en la región.""",

1: """# Desafíos de calidad de energía en África Central y selección de AVR

## 1. Variación estacional hidroeléctrica

La cuenca del Congo y Sanaga entregan frecuencia estable (50 Hz ±0,5 Hz) pero voltaje variable. En **Kinshasa (RDC)**, donde las represas Inga I e Inga II alimentan la red occidental, la capacidad en estación seca cae a 65% de la placa, llevando a **voltaje de brownout de 175-195 V**. En **Yaoundé (Camerún)**, la red Sonatrel está mejor regulada pero aún oscila 200-235 V al final de alimentadores 33 kV de 30-50 km.

Productos YOKE recomendados:
- **Estabilizadores monofásicos serie TND** (1-30 kVA): hogares, clínicas, comercio en áreas de bajo voltaje
- **Estabilizadores servo serie SVC** (10-500 kVA): sitios comerciales/industriales ligeros que necesitan ±1% en 150-260 V
- **Estabilizadores trifásicos TSD** (30-2000 kVA): hospitales, telecomunicaciones, agua, minería

## 2. Pérdidas de transmisión a larga distancia

La red de África Central está **sub-transmitida** respecto a su territorio. La línea de 225 kV más larga es el **corredor HV Inga-Kolwezi de 1.100 km en RDC**. La tensión a media línea puede descender a 198 V (88% del nominal 225 V) bajo carga. Para clientes mineros en Likasi, Kolwezi, Lubumbashi (cinturón de cobre RDC), YOKE especifica **SVC ±15% con soporte de 5 segundos**.

## 3. Coexistencia con generadores diesel

Fuera de las grandes ciudades, 60-70% de los establecimientos comerciales funcionan con **generador diesel + red**. En Bangui (RCA), N'Djamena (Chad), Malabo (Guinea Ecuatorial), el diesel es el suministro principal, requiriendo AVR para limpiar la forma de onda. Los generadores producen **THD de 8-15%** y **deriva de frecuencia de ±2 Hz**, requiriendo:
- Ventana de frecuencia amplia (45-65 Hz)
- Respuesta rápida (< 20 ms)
- Capacidad de sobretensión 5x para arranques de motor

**SVC y TSD** soportan operación con generador de serie, con transformadores de aislamiento opcionales para sitios con **THD > 20%**.

## 4. Guinea Ecuatorial y Santo Tomé: microrredes insulares

Guinea Ecuatorial (isla de Bioko) y Santo Tomé y Príncipe operan en **microrredes insulares aisladas** con diésel + solar-híbrido recientemente añadido. El SVC-Series con **firmware de modo isla** es la recomendación predeterminada para estos sitios.

Para plataformas petrolíferas costa afuera de Guinea Ecuatorial, YOKE proporciona bajo pedido **recintos antideflagrantes ATEX/IECEx Zona 2**.""",

2: """# Cómo elegir estabilizadores de voltaje para aplicaciones en África Central

## Paso 1: Medir la envolvente de voltaje de entrada

Use un **voltímetro con registro de 3 días** (Fluke 1730 o equivalente) en el lado de carga del medidor. Observaciones típicas en África Central:
- Kinshasa, Brazzaville, Libreville, Malabo: 195-240 V
- Yaoundé, Douala: 200-235 V
- N'Djamena, Bangui: 170-230 V
- Cinturón de cobre RDC (Lubumbashi, Kolwezi): 198-225 V en el medidor, con caídas frecuentes de sub-ciclo a 175 V

Si la ventana de entrada supera ±20% del nominal, se requiere **estabilizador servo (SVC o TSD)**.

## Paso 2: Determinar el perfil de carga

Tres arquetipos de carga:
- **Carga inductiva pesada** (HVAC, bombas de agua, ascensores, motores industriales): capacidad de sobretensión 3-5x
- **Carga electrónica sensible** (imagen médica, estaciones base de telecomunicaciones, salas de servidores): precisión ±1%, respuesta < 20 ms
- **Residencial-comercial mixto**: típico 5-30 kVA monofásico

## Paso 3: Confirmar la configuración de suministro

África Central opera a **220 V / 50 Hz** (excolonias francesas) y **220 V / 50 Hz** (Guinea Ecuatorial, Santo Tomé). Trifásico: 380-400 V entre líneas, 50 Hz. YOKE construye por defecto 220 V / 50 Hz / 380 V trifásico con tomas selectoras 230 V / 240 V. Para instalaciones de 60 Hz (raras, sitios industriales antiguos en Gabón), plazo de 8 semanas.

## Paso 4: Planificar el entorno de instalación

- Interior climatizado (hospital, banco, centro de datos): IP20 estándar
- Exterior techado (estación base de telecomunicaciones, casa de bombas): IP54 con resistencia anti-condensación
- Exterior expuesto (patio de transformador de mina, muelle de puerto): IP55 con sombra, anti-condensación, aire acondicionado de gabinete opcional

## Paso 5: Presupuesto y costo total de propiedad (TCO)

Precio de fábrica 2026 para 100 kVA SVC a Douala o Pointe-Noire: **US$3.800-4.400**. Agregar 18-22% por aranceles CEMAC y evaluación de conformidad ANOR/ARSO. Costo puesto en Kinshasa o Yaoundé: aproximadamente **US$4.800-5.400 por unidad 100 kVA**, garantía de 5 años en piezas y mano de obra.

Los estabilizadores de relé de bajo costo vendidos por distribuidores locales en Kinshasa a US$2.200-2.800 por 100 kVA tienen solo 1 año de garantía y tasas de fallo documentadas más allá de los 18 meses. El SVC-Series de YOKE alcanza típicamente 12-15 años de vida útil, TCO 5-7x menor.

## Paso 6: Involucrar al equipo de ingeniería YOKE África Central

Soporte de ingeniería de proyecto (diagramas unifilares, estudios de armónicos, dimensionamiento, supervisión de puesta en servicio): engineering@yoke-electric.com. Revisión técnica gratuita para proyectos ≥ 50 kVA. **Ingeniero de campo basado en Libreville** (Gabón, Guinea Ecuatorial, Santo Tomé) e **ingeniero de campo basado en Douala** (Camerún, Chad, RCA, Congo Brazzaville, oeste RDC).""",

3: """# Instalación y mejores prácticas para sitios de África Central

## Encuesta del sitio antes de la instalación

Antes de entregar cualquier AVR a un sitio de África Central, realice una encuesta en 4 pasos:
1. Verificar la ventana de voltaje de suministro con un voltímetro de registro de 3 días
2. Confirmar la corriente de cortocircuito disponible en el punto de conexión del AVR
3. Documentar las condiciones ambientales (temperatura, humedad, polvo, sol, altitud)
4. Confirmar las longitudes de cable medidor→AVR y AVR→carga (> 50 m requiere compensación de caída de voltaje)

## Instalación mecánica

- **Superficie de montaje**: nivelada, sin vibraciones, no combustible. Para SVC/TSD ≥ 100 kVA, se recomienda un plinto de concreto al menos 100 mm por encima del nivel del piso para proteger contra inundaciones en la estación lluviosa (marzo-mayo).
- **Holgura de ventilación**: **300 mm** en los cuatro lados para enfriamiento por convección natural. Ventilación mecánica en sala de interruptores cerrada (≥ 2 renovaciones/hora) para mantener < 35 °C.
- **Entrada de cable**: **prensaestopas de entrada inferior** con bucles de goteo. Para IP55 exterior, agregar adicionalmente **sellos de tránsito de cable** (Roxtec o equivalente).
- **Puesta a tierra**: resistividad del suelo muy variable (costa 50-500 Ω·m, interior 200-2000 Ω·m). Para AVR ≥ 30 kVA, **al menos 4 varillas de tierra a 1,8 m de profundidad**, conexión del chasis AVR a la red de tierra con conductor de cobre de 25 mm² mínimo.

## Instalación eléctrica

- **Protección aguas arriba**: dimensionada a **1,25-1,5x** la corriente de plena carga del AVR, con disyuntor termomagnético (no fusibles — difíciles de reemplazar en sitios remotos). AVR 100 kVA trifásico 380 V → disyuntor aguas arriba 200 A.
- **Circuito de bypass**: cada SVC/TSD ≥ 30 kVA se suministra con un **interruptor de bypass de 3 polos** estándar, cableado al busbar aguas arriba.
- **Distribución de salida**: usar un **tablero de distribución de salida dedicado** aguas abajo del AVR con disyuntor principal y MCB de ramas.
- **Rotación de fases**: para AVR trifásicos, verificar la rotación L1-L2-L3 con un medidor de secuencia de fases antes de energizar. La inversión de fase es una causa común de daño al motor en el cinturón minero.

## Puesta en marcha

Cada AVR YOKE ≥ 30 kVA se envía con **certificado de prueba de fábrica** y **lista de verificación de puesta en marcha**. El ingeniero de puesta en marcha debe:
1. Verificar los pares de apriete de las conexiones eléctricas (25-40 Nm típico para 100 kVA)
2. **Energización sin carga** y verificación del voltaje de salida en las 3 fases (380 V ± 1%)
3. **Carga por pasos** (25%, 50%, 75%, 100%) y verificación de estabilidad y tiempo de respuesta
4. Operación **al menos 4 horas** bajo carga antes de la aceptación
5. Capacitar al equipo de operaciones del cliente

YOKE ofrece **2 días gratis de supervisión de puesta en marcha en sitio** para cualquier pedido ≥ 200 kVA enviado a Douala, Pointe-Noire o Libreville.

## Mantenimiento preventivo

- **Mensual**: inspección visual, indicadores del panel frontal, ventilador de enfriamiento
- **Trimestral**: limpiar filtros de aire (IP54/IP55), verificar decoloración térmica de terminales de cable, operación del bypass
- **Anual**: prueba eléctrica completa (resistencia de aislamiento, precisión de salida bajo carga, tiempo de respuesta), reemplazar escobillas de carbón del servomotor (intervalo típico 7-10 años)
- **Después de cualquier falla de la red** (rayo, línea caída, falla de transformador): prueba eléctrica completa antes de volver al servicio

YOKE mantiene un **inventario de repuestos en Douala** (Camerún, Chad, RCA) y **Pointe-Noire** (Congo Brazzaville, RDC, Gabón). Las piezas comunes (tarjetas de control, servomotores, escobillas, ventiladores, contactores) están típicamente disponibles en stock con entrega de 2-3 días a cualquier capital de África Central.""",

4: """# Preguntas frecuentes sobre estabilizadores de voltaje en África Central

**P1: ¿Cuál es el rango de voltaje de entrada típico que debo especificar para un AVR en África Central?**

R1: Para las principales capitales de África Central (Kinshasa, Brazzaville, Yaoundé, Douala, Libreville, Malabo), especifique una ventana de entrada de **150-260 V (monofásico)** o **260-460 V (trifásico entre líneas)**. Para N'Djamena, Bangui y sitios mineros remotos de RDC, amplíe a **140-270 V** para cubrir condiciones más extremas. SVC y TND-Series de YOKE están disponibles con ventanas extendidas bajo pedido sin costo adicional.

**P2: ¿Necesito SONCAP u otra evaluación de conformidad para los AVR importados a África Central?**

R2: SONCAP es **obligatorio solo para Nigeria** bajo la ley SON. Camerún opera el marco **ANOR** (Agence des Normes et de la Qualité) para equipos eléctricos generales pero actualmente no requiere evaluación de conformidad previa al envío para AVRs industriales. Gabón, Congo Brazzaville, Chad, RCA, Guinea Ecuatorial y Santo Tomé y Príncipe generalmente aceptan la certificación **CE / IEC / ISO** sin pruebas previas al envío adicionales. Se recomienda una inspección comercial en origen (**Bureau Veritas, SGS, Intertek**) para fines de aduanas. YOKE envía con certificado CE, informe de prueba de fábrica y factura comercial conforme con CEMAC. **Para Nigeria, SONCAP agrega 4-6 semanas y aproximadamente US$1.200 por contenedor**.

**P3: ¿Cuánto tiempo lleva enviar un contenedor de 40 pies de AVRs desde China a Douala o Pointe-Noire?**

R3: Flete marítimo estándar desde Shanghai/Ningbo a **Douala (Camerún)**: **35-40 días**; a **Pointe-Noire (Congo Brazzaville)**: **40-45 días**; a **Matadi (RDC, vía río Congo)**: **45-55 días** incluyendo transferencia por barcaza fluvial. Para pedidos urgentes, flete aéreo de 7-10 días para hasta 2.000 kg por envío. Despacho aduanero CEMAC en Douala: 5-10 días hábiles (documentación completa); en Pointe-Noire: 3-7 días hábiles.

**P4: ¿Qué garantía y soporte post-instalación ofrece YOKE para África Central?**

R4: Garantía estándar de **5 años en piezas y mano de obra** en SVC y TSD, 3 años en TND. Incluye reemplazo gratuito de cualquier componente fallado durante el período de garantía, con envío a cargo de YOKE. Para sitios dentro de 200 km de Douala, Libreville o Pointe-Noire, servicio en sitio en 48 horas. Para sitios remotos (cinturón minero RDC, norte de Chad, Bangui), servicio vía **envío anticipado de componentes de reemplazo + guía de video-llamada remota** para el electricista del cliente, resolución típica 5-7 días.

**P5: ¿Puede YOKE suministrar AVRs con documentación y etiquetado bilingüe francés/inglés para Camerún?**

R5: Sí. YOKE proporciona **manuales de instalación, placas de características y etiquetas de advertencia bilingües francés/inglés** como estándar para todas las unidades destinadas a Camerún. Para Guinea Ecuatorial (español) y Santo Tomé (portugués), documentación bilingüe disponible bajo pedido. Para otros destinos de África Central, francés es estándar, inglés o árabe bajo pedido. Las placas están grabadas en acero inoxidable (no impresas) para durabilidad en clima tropical.""",

5: """# Centros de distribución estratégica: 8 puntos de distribución YOKE en África Central

YOKE mantiene **8 puntos de distribución y servicio estratégicamente ubicados** en África Central.

## 1. Kinshasa (RDC) — Centro Oeste RDC
- **Cobertura**: zona metropolitana de Kinshasa, provincias occidentales RDC (Kongo Central, Kwango, Kwilu, Mai-Ndombe)
- **Población atendida**: 17 millones (metro)
- **Logística**: depósito de contenedores interior en zona industrial **Limete** de Kinshasa; recibe contenedores del puerto de Matadi por ferrocarril (1 día) o carretera (1-2 días)
- **Inventario**: 280 unidades en stock (TND, SVC, TSD, 5-100 kVA); kit de repuestos críticos 18 unidades
- **Plazo al cliente**: 1-2 días para stock, 7-10 días para configuraciones especiales
- **Idiomas**: francés, lingala, swahili

## 2. Brazzaville (Congo Brazzaville) — Centro Río Congo
- **Cobertura**: Congo Brazzaville (Brazzaville, Pointe-Noire, Oyo, Owando)
- **Población atendida**: 6 millones
- **Logística**: puerto fluvial y conexión ferroviaria a Pointe-Noire (puerto atlántico, 500 km)
- **Inventario**: 120 unidades en stock; kit repuestos 12 unidades
- **Plazo al cliente**: 1-2 días para stock
- **Idiomas**: francés, lingala, kituba

## 3. Yaoundé (Camerún) — Centro capital política
- **Cobertura**: Yaoundé, centro y norte de Camerún
- **Población atendida**: 4,5 millones
- **Logística**: 220 km tierra adentro desde el puerto de Douala por carretera pavimentada
- **Inventario**: 90 unidades en stock; kit repuestos 12 unidades
- **Plazo al cliente**: 1-2 días
- **Idiomas**: francés, inglés

## 4. Douala (Camerún) — Centro Puerta de Entrada CEMAC
- **Cobertura**: Douala, oeste de Camerún, tránsito a Chad, RCA, Guinea Ecuatorial
- **Población atendida**: 4 millones Douala + tránsito 9 millones (Chad 1,6M, RCA 0,9M, EG 1,4M, tránsito norte RDC 5M)
- **Logística**: **mayor centro de distribución YOKE en CEMAC** en zona franca del puerto de Douala, 4.200 m² de almacén cubierto
- **Inventario**: 450 unidades en stock + buffer de 1.200 unidades; inventario completo de repuestos
- **Plazo al cliente**: mismo día para stock; 1-2 días para cualquier destino CEMAC
- **Idiomas**: francés, inglés, pidgin
- **Especial**: la oficina de YOKE Douala es la sede regional de **ingeniería de África Central + Occidental** — 8 ingenieros de campo, 12 electricistas locales certificados, 3 gerentes de proyecto

## 5. Libreville (Gabón) — Centro Sede Monetaria CEMAC
- **Cobertura**: Gabón, tránsito a Guinea Ecuatorial (ferry o aéreo)
- **Población atendida**: 900.000 (Gabón) + tránsito EG 1,4 millones
- **Logística**: ciudad portuaria, contenedores directos desde transporte marítimo internacional
- **Inventario**: 180 unidades en stock; kit repuestos 12 unidades
- **Plazo al cliente**: mismo día para stock
- **Idiomas**: francés, fang, myene

## 6. N'Djamena (Chad) — Centro sin litoral
- **Cobertura**: N'Djamena, sur de Chad (Moundou, Sarh)
- **Población atendida**: 1,6 millones
- **Logística**: sin litoral; todo el entrante vía **tránsito Camerún** (Douala → N'Djamena carretera, 1.500 km, 4-5 días camión) o **tránsito Nigeria** (Lagos → N'Djamena, 1.800 km, 5-7 días)
- **Inventario**: 60 unidades en stock; kit repuestos 8 unidades
- **Plazo al cliente**: 1-2 días para stock; 4-7 días para configuraciones especiales desde buffer Douala
- **Idiomas**: francés, árabe, sara

## 7. Bangui (República Centroafricana) — Centro Reconstrucción
- **Cobertura**: Bangui, suroeste de RCA
- **Población atendida**: 900.000
- **Logística**: sin litoral; transita por **Douala** (Camerún → RCA carretera, 1.500 km, 4-5 días; requiere coordinación de agente de aduanas lado RCA)
- **Inventario**: 40 unidades en stock; kit repuestos 6 unidades
- **Plazo al cliente**: 1-2 días para stock; 5-7 días desde buffer Douala
- **Idiomas**: francés, sango

## 8. Malabo (Guinea Ecuatorial) — Centro Microrred Insular
- **Cobertura**: isla de Bioko (Malabo), continente Río Muni (Bata, Ebebiyín)
- **Población atendida**: 1,6 millones
- **Logística**: Bioko requiere aéreo o marítimo (sin conexión por carretera al continente); YOKE mantiene un pequeño contenedor en el **puerto de Luba** (Bioko) para tránsito al continente
- **Inventario**: 30 unidades en stock (Malabo) + 20 unidades (Bata, puerto Luba); kit repuestos 6 unidades
- **Plazo al cliente**: mismo día para stock
- **Idiomas**: español, francés, fang, bubi, portugués

YOKE opera además un pequeño **buffer de transbordo en Santo Tomé** (20 unidades en stock, kit de 4 repuestos) para proyectos de microrred de Santo Tomé y Príncipe.

Esta red de 8 centros cubre **los 8 países de África Central** con plazo promedio al cliente de **1-2 días para stock** y **5-7 días para configuraciones especiales**. El inventario total en la red supera **1.300 unidades + 88 kits de repuestos críticos**, soportando una capacidad de despliegue sostenida de **6.000-8.000 unidades por año**.""",

6: """# Conclusión: Perspectivas del mercado de estabilizadores de voltaje de África Central

El mercado de estabilizadores de voltaje de África Central está en una **fuerte trayectoria de crecimiento** hasta 2030, impulsado por cuatro factores convergentes:

1. **Integración de infraestructura CEMAC**: el plan maestro de infraestructura 2024-2030 de la CEMAC (Programa Económico Regional, PER) incluye US$14 mil millones en actualizaciones de transmisión y distribución, con el proyecto hidroeléctrico Inga III (RDC, 11.000 MW) avanzando en la fase final de viabilidad.

2. **Expansión de telecomunicaciones móviles**: la cobertura 4G en África Central es actualmente del 38% de la población (2024); pilotos de 5G han comenzado en Douala y Kinshasa. Cada nueva estación base de telecomunicaciones requiere un estabilizador dedicado. El SVC-Series de YOKE es la especificación estándar para **MTN Camerún, Orange RDC, Airtel Chad y Telecel RCA** — 14.500 estaciones base combinadas en la región, de las cuales solo 9.800 tienen actualmente estabilizadores YOKE (47% de cuota de mercado, 4.700 oportunidades de actualización).

3. **Electrificación minera**: el cinturón de cobre de RDC (Likasi, Kolwezi, Lubumbashi) se está expandiendo rápidamente para satisfacer la demanda de vehículos eléctricos y almacenamiento de baterías. Cada nueva mina de cobre-cobalto requiere 8-25 MW de potencia de calidad de red, con AVR robustos dedicados para procesamiento, extracción y ventilación. YOKE ha suministrado 14 proyectos mineros de RDC en 2024-2025, con otros 9 en la línea de 2026.

4. **Construcción hospitalaria y de servicios de agua**: África Central tiene 0,9 camas de hospital por 1.000 habitantes (vs. recomendación OMS de 3,0) y el 41% de la población carece de acceso a agua potable. El Banco Mundial, el Banco Africano de Desarrollo y donantes bilaterales están financiando **US$3,8 mil millones en infraestructura de salud y WASH** en África Central 2024-2028.

**Prioridades estratégicas YOKE 2026-2028 en África Central**:

- **2026 T3**: expandir el centro de distribución de Douala de 4.200 m² a 6.500 m² (+55% capacidad de almacenamiento)
- **2026 T4**: abrir un nuevo centro de servicio de 1.500 m² en la **zona industrial Limete de Kinshasa**
- **2027 T1**: lanzar un sitio de referencia de AVR solar-híbrido de 30 kW en **Bangui** en asociación con el PNUD
- **2027 T2**: introducir modelos **antideflagrantes ATEX/IECEx Zona 2** para plataformas petroleras
- **2027 T4**: obtener la **certificación ARSO (Organización Africana de Normalización) en toda la CEMAC** para toda la gama
- **2028**: abrir un tercer centro regional en **Yaoundé**

Para 2028, YOKE apunta al **20% de cuota de mercado del mercado abordable de estabilizadores de voltaje en África Central** (actualmente 12,7% en 2024-2025), lo que se traduce en aproximadamente **9.500 unidades enviadas por año** y un equipo regional de **42 personas** en 8 centros de distribución.

Para consultas de ingeniería, cotizaciones de proyectos o soporte técnico en África Central, contacte al equipo de YOKE África Central en **central-africa@yoke-electric.com** o llame a la sede regional de Douala al **+237 233 XX XX XX** (lun-vie 8:00-17:00 WAT, guardia 24/7 para garantía de emergencia).""",

7: None
}

# ============ ARABIC ============
AR = {
0: """# نظرة عامة على سوق مثبتات الجهد في وسط أفريقيا

يمثل سوق مثبتات الجهد (AVR) في وسط أفريقيا **فرصة سنوية بقيمة 185 مليون دولار أمريكي في 2026**، تمتد عبر **8 دول** في منطقة **CEMAC** الاقتصادية والنقدية. إجمالي السكان يتجاوز **220 مليون** في الكونغو الديمقراطية والكاميرون والكونغو برازافيل والغابون وتشاد وجمهورية أفريقيا الوسطى (RCA) وغينيا الاستوائية وساو تومي وبرينسيبي.

وسط أفريقيا فريدة بثلاثة عوامل هيكلية:

1. **الاعتماد على الطاقة الكهرومائية والموسمية**: حوض نهر الكونغو (الكونغو الديمقراطية، الكونغو برازافيل) ونهر ساناجا (الكاميرون) يولّدان 60-70% من الكهرباء، لكن التغيرات الموسمية في منسوب المياه (يونيو-أكتوبر تدفق منخفض) تسبب تقلبات جهد ±25%.

2. **تركيز الموانئ الأطلسية**: تتدفق لوجستيات الاستيراد عبر **دوالا (الكاميرون)** و **بوانت-نوار (الكونغو برازافيل)**.

3. **إعادة الإعمار بعد الصراع**: RCA وشرق الكونغو الديمقراطية وشمال الكاميرون تحتاج إلى AVR سيرفو ثلاثي الطور قوي للمستشفيات وخدمات المياه والترحيل العكسي للاتصالات.

بيانات نشر YOKE للربع الرابع 2024 إلى الربع الأول 2026: **3,140 وحدة شُحنت إلى وسط أفريقيا (14% من إجمالي الشحنات الأفريقية)**، موزعة حسب الدولة:
- الكونغو الديمقراطية: 1,180 وحدة (37.6%)
- الكاميرون: 720 وحدة (22.9%)
- الكونغو برازافيل: 410 وحدات (13.1%)
- الغابون: 380 وحدة (12.1%)
- تشاد: 240 وحدة (7.6%)
- RCA: 90 وحدة (2.9%)
- غينيا الاستوائية: 90 وحدة (2.9%)
- ساو تومي وبرينسيبي: 30 وحدة (1.0%)

تغطي هذه المقالة تحديات جودة الطاقة ومعايير اختيار AVR وأفضل ممارسات التثبيت و**8 مراكز توزيع استراتيجية** تحتفظ بها YOKE في المنطقة.""",

1: """# تحديات جودة الطاقة في وسط أفريقيا واختيار AVR

## 1. التغير الموسمي للطاقة الكهرومائية

حوض نهر الكونغو وساناجا يقدمان تردداً ثابتاً (50 هرتز ±0.5 هرتز) لكن جهد متغير. في **كينشاسا (الكونغو الديمقراطية)**، تنخفض سعة الموسم الجاف إلى 65% من اللوحة، مما يؤدي إلى **جهد انقطاع 175-195 فولت**. في **ياوندي (الكاميرون)**، تكون شبكة Sonatrel أفضل تنظيماً لكنها تتأرجح 200-235 فولت في نهاية مغذيات 33 كيلوفولت بطول 30-50 كم.

منتجات YOKE الموصى بها:
- **مثبتات أحادية الطور سلسلة TND** (1-30 كيلوفولت أمبير): للعيادات والمنازل
- **مثبتات سيرفو سلسلة SVC** (10-500 كيلوفولت أمبير): ±1% على مدى 150-260 فولت
- **مثبتات ثلاثية الطور TSD** (30-2000 كيلوفولت أمبير): المستشفيات والاتصالات والمياه والتعدين

## 2. خسائر النقل لمسافات طويلة

شبكة وسط أفريقيا **غير كافية النقل** بالنسبة لإقليمها. أطول خط 225 كيلوفولت هو **ممر إنجا-كولويزي HV بطول 1,100 كم في الكونغو الديمقراطية**. يمكن أن ينخفض جهد منتصف الخط إلى 198 فولت. للعملاء في حزام النحاس RDC، توصي YOKE بـ **SVC ±15% مع تحمل 5 ثوانٍ**.

## 3. التعايش مع مولدات الديزل

في بانجي وندجامينا ومالابو، الديزل هو الإمداد الرئيسي. المولدات تنتج **THD 8-15%** و**انحراف تردد ±2 هرتز**، مما يتطلب نافذة تردد واسعة (45-65 هرتز) واستجابة سريعة (< 20 مللي ثانية) وقدرة تحمل زيادة 5x.

**SVC و TSD** كلاهما يدعمان تشغيل المولد، مع محولات عزل اختيارية للمواقع ذات **THD > 20%**.

## 4. غينيا الاستوائية وساو تومي: شبكات جزرية معزولة

تعمل غينيا الاستوائية (جزيرة بيوكو) وساو تومي على **شبكات جزرية معزولة** ديزل + هجين شمسي مضاف مؤخراً. **برامج الوضع الجزري لـ SVC** هي التوصية الافتراضية.

للمنصات النفطية قبالة غينيا الاستوائية، توفر YOKE عند الطلب **حاويات مقاومة للانفجار ATEX/IECEx Zone 2**.""",

2: """# كيفية اختيار مثبتات الجهد لتطبيقات وسط أفريقيا

## الخطوة 1: قياس نطاق جهد الدخل

استخدم **فولتميتر تسجيل 3 أيام**. الملاحظات النموذجية:
- كينشاسا، برازافيل، ليبرفيل، مالابو: 195-240 فولت
- ياوندي، دوالا: 200-235 فولت
- ندجامينا، بانجي: 170-230 فولت
- حزام النحاس RDC: 198-225 فولت عند العداد، مع انخفاضات دون الدورة إلى 175 فولت

إذا تجاوز نطاق الدخل ±20% من المقدر، يلزم **مثبت سيرفو (SVC أو TSD)**.

## الخطوة 2: تحديد ملف الحمل

- **حمل حثي ثقيل**: سعة زيادة 3-5x
- **حمل إلكتروني حساس**: دقة ±1%، استجابة < 20 مللي ثانية
- **مختلط سكني-تجاري**: نموذجي 5-30 كيلوفولت أمبير أحادي الطور

## الخطوة 3: تأكيد تكوين الإمداد

وسط أفريقيا تعمل على **220 فولت / 50 هرتز**. ثلاثي الطور: 380-400 فولت بين الخطوط، 50 هرتز. تثبيت YOKE الافتراضي 220 فولت / 50 هرتز / 380 فولت ثلاثي الطور.

## الخطوة 4: تخطيط بيئة التثبيت

- داخلي مكيف: IP20 قياسي
- خارجي مغطى: IP54 مع مقاومة التكثيف
- خارجي مكشوف: IP55 مع ظل، مضاد للتكثيف

## الخطوة 5: الميزانية والتكلفة الإجمالية للملكية (TCO)

سعر المصنع 2026 لـ 100 كيلوفولت أمبير SVC إلى دوالا أو بوانت-نوار: **3,800-4,400 دولار أمريكي**. التكلفة المنقولة إلى كينشاسا أو ياوندي: **4,800-5,400 دولار أمريكي لكل وحدة 100 كيلوفولت أمبير**، ضمان 5 سنوات قطع غيار وعمل.

تصل مدة خدمة SVC من YOKE عادةً إلى 12-15 سنة، TCO أقل 5-7 مرات.

## الخطوة 6: التواصل مع فريق هندسة YOKE لوسط أفريقيا

engineering@yoke-electric.com. مراجعة فنية مجانية للمشاريع ≥ 50 كيلوفولت أمبير. **مهندس ميداني مقيم في ليبرفيل** (الغابون وغينيا الاستوائية وساو تومي) و**مهندس ميداني مقيم في دوالا** (الكاميرون وتشاد وRCA والكونغو برازافيل وغرب RDC).""",

3: """# التثبيت وأفضل الممارسات لمواقع وسط أفريقيا

## مسح الموقع قبل التثبيت

1. التحقق من نافذة جهد الإمداد
2. تأكيد تيار الدائرة القصيرة المتاح
3. توثيق الظروف البيئية
4. تأكيد أطوال الكابلات

## التثبيت الميكانيكي

- **سطح التركيب**: مستوٍ، خالٍ من الاهتزاز، غير قابل للاحتراق. قاعدة خرسانية 100 ملم للأرضية لـ ≥ 100 كيلوفولت أمبير
- **خلوص التهوية**: 300 ملم على الجوانب الأربعة
- **مدخل الكابل**: **غلاندات دخول سفلي** مع حلقات تقطير
- **التأريض**: 4 أقطاب تأريض على الأقل بعمق 1.8 م

## التثبيت الكهربائي

- **حماية المنبع**: 1.25-1.5x تيار الحمل الكامل، قاطع ثيرمو-مغناطيسي
- **دائرة التجاوز**: مفتاح تجاوز 3 أقطاب قياسي
- **توزيع الخرج**: لوحة توزيع مخصصة
- **دوران الطور**: التحقق بـ L1-L2-L3

## التكليف

كل AVR YOKE ≥ 30 كيلوفولت أمبير يأتي مع **شهادة اختبار المصنع** و**قائمة مراجعة التكليف**. يجب على المهندس:
1. التحقق من عزم الوصلات (25-40 نيوتن متر نموذجي)
2. **تنشيط بدون حمل** والتحقق من جهد الخرج
3. **حمل متدرج** والتحقق من الاستقرار
4. التشغيل **لمدة 4 ساعات** على الأقل
5. تدريب فريق العمليات

YOKE تقدم **يومين مجانيين من إشراف التكليف في الموقع** للطلبات ≥ 200 كيلوفولت أمبير.

## الصيانة الوقائية

- **شهرياً**: فحص بصري، مؤشرات، مروحة
- **ربع سنوي**: تنظيف فلاتر الهواء، فحص الأطراف
- **سنوياً**: اختبار كهربائي كامل
- **بعد عطل الشبكة**: اختبار كامل قبل إعادة الخدمة

YOKE تحتفظ بـ **مخزون قطع غيار في دوالا** و**بوانت-نوار**. قطع الغيار الشائعة متاحة من المخزون مع تسليم 2-3 أيام لأي عاصمة في وسط أفريقيا.""",

4: """# الأسئلة الشائعة حول مثبتات الجهد في وسط أفريقيا

**س1: ما هو نطاق جهد الدخل النموذجي لـ AVR في وسط أفريقيا؟**

ج1: للعواصم الرئيسية، حدد نافذة دخل **150-260 فولت (أحادي الطور)** أو **260-460 فولت (ثلاثي الطور بين الخطوط)**. لندجامينا وبانجي ومواقع التعدين RDC النائية، وسع إلى **140-270 فولت**. SVC وTND من YOKE متاحان بنوافذ ممتدة عند الطلب بدون تكلفة إضافية.

**س2: هل أحتاج SONCAP أو تقييم مطابقة آخر؟**

ج2: SONCAP إلزامي **لنيجيريا فقط**. الكاميرون تشغل إطار **ANOR** ولكن لا تتطلب حالياً تقييم مطابقة ما قبل الشحن. تقبل دول أخرى **CE / IEC / ISO** بشكل عام. YOKE تشحن مع شهادة CE. **لنيجيريا، SONCAP يضيف 4-6 أسابيع وحوالي 1,200 دولار لكل حاوية**.

**س3: كم من الوقت لشحن حاوية 40 قدم من الصين؟**

ج3: الشحن البحري إلى **دوالا (الكاميرون)**: **35-40 يوماً**؛ إلى **بوانت-نوار (الكونغو برازافيل)**: **40-45 يوماً**؛ إلى **ماتادي (RDC)**: **45-55 يوماً**. للطلبات العاجلة، شحن جوي 7-10 أيام لما يصل إلى 2,000 كجم.

**س4: ما الضمان ودعم ما بعد التثبيت؟**

ج4: ضمان قياسي **5 سنوات قطع غيار وعمل** على SVC وTSD، 3 سنوات على TND. للمواقع في حدود 200 كم من دوالا أو ليبرفيل أو بوانت-نوار، خدمة في الموقع خلال 48 ساعة. للمواقع النائية، **شحن مسبق للمكونات البديلة + إرشاد فيديو عن بُعد**، حل نموذجي 5-7 أيام.

**س5: هل يمكن لـ YOKE توفير AVRs بوثائق ثنائية اللغة فرنسية/إنجليزية للكاميرون؟**

ج5: نعم. YOKE توفر **كتيبات تركيب ولوحات اسم وملصقات تحذير ثنائية اللغة فرنسية/إنجليزية** كقياسي لجميع الوحدات الموجهة إلى الكاميرون. لوحات الاسم محفورة على الفولاذ المقاوم للصدأ.""",

5: """# 8 مراكز توزيع استراتيجية لـ YOKE في وسط أفريقيا

## 1. كينشاسا (الكونغو الديمقراطية)
- التغطية: منطقة كينشاسا الحضرية، مقاطعات غرب RDC
- السكان: 17 مليون (مترو)
- المخزون: 280 وحدة، 18 طقم قطع غيار
- المهلة: 1-2 يوم للمخزون

## 2. برازافيل (الكونغو برازافيل)
- التغطية: الكونغو برازافيل
- السكان: 6 ملايين
- المخزون: 120 وحدة

## 3. ياوندي (الكاميرون)
- التغطية: ياوندي، وسط وشمال الكاميرون
- السكان: 4.5 ملايين
- المخزون: 90 وحدة

## 4. دوالا (الكاميرون) — المركز الرئيسي CEMAC
- التغطية: دوالا، غرب الكاميرون، عبور تشاد وRCA وغينيا الاستوائية
- السكان: 4 مليون دوالا + عبور 9 مليون
- المخزون: 450 وحدة + مخزن مؤقت 1,200 وحدة
- **مكتب ياوندي = المقر الإقليمي لهندسة وسط + غرب أفريقيا** — 8 مهندسين ميدانيين، 12 كهربائياً محلياً معتمداً، 3 مديري مشاريع

## 5. ليبرفيل (الغابون)
- التغطية: الغابون، عبور غينيا الاستوائية
- المخزون: 180 وحدة

## 6. ندجامينا (تشاد)
- التغطية: ندجامينا، جنوب تشاد
- المخزون: 60 وحدة

## 7. بانجي (جمهورية أفريقيا الوسطى)
- التغطية: بانجي، جنوب غرب RCA
- المخزون: 40 وحدة

## 8. مالابو (غينيا الاستوائية)
- التغطية: جزيرة بيوكو، البر الرئيسي ريو موني
- المخزون: 30 وحدة في مالابو + 20 وحدة في باتا/لوبا

تعمل YOKE أيضاً بمخزن صغير في **ساو تومي** (20 وحدة، 4 قطع غيار).

شبكة المراكز الثمانية تغطي **جميع دول وسط أفريقيا الثماني** بمهلة عميل متوسطة **1-2 يوم للمخزون** و**5-7 أيام للتكوينات الخاصة**. المخزون الإجمالي **1,300 وحدة + 88 طقم قطع غيار حرجة**، تدعم **6,000-8,000 وحدة سنوياً**.""",

6: """# الخلاصة: توقعات سوق مثبتات الجهد في وسط أفريقيا

سوق وسط أفريقيا في **مسار نمو قوي** حتى 2030، مدفوعاً بأربعة عوامل:

1. **تكامل البنية التحتية CEMAC**: خطة 2024-2030 تشمل 14 مليار دولار في ترقيات النقل والتوزيع، مع مشروع إنجا الثالث الكهرومائي (RDC، 11,000 ميجاوات).

2. **توسع الاتصالات المتنقلة**: تغطية 4G الحالية 38%؛ تجارب 5G بدأت في دوالا وكينشاسا. SVC من YOKE هي المواصفة القياسية لـ **MTN الكاميرون، Orange RDC، Airtel تشاد، Telecel RCA** — 14,500 محطة قاعدة في المنطقة.

3. **كهرباء التعدين**: حزام النحاس RDC (ليكاسي، كولويزي، لومومباشي) يتوسع بسرعة. كل منجم نحاس-كوبالت جديد يحتاج 8-25 ميجاوات.

4. **البناء المستشفياتي والمائي**: وسط أفريقيا بها 0.9 سرير مستشفى لكل 1,000 شخص و41% بدون مياه آمنة. البنك الدولي ومصرف التنمية الأفريقي والجهات المانحة الثنائية تمول **3.8 مليار دولار** في البنية التحتية الصحية وWASH 2024-2028.

**الأولويات الاستراتيجية YOKE 2026-2028 في وسط أفريقيا**:
- 2026 Q3: توسيع مركز دوالا من 4,200 م² إلى 6,500 م²
- 2026 Q4: افتتاح مركز خدمة جديد 1,500 م² في **منطقة كينشاسا ليميت الصناعية**
- 2027 Q1: إطلاق موقع مرجعي للطاقة الشمسية الهجينة AVR 30 كيلوواط في **بانجي** مع UNDP
- 2027 Q2: إدخال نماذج **ATEX/IECEx Zone 2 المقاومة للانفجار**
- 2027 Q4: الحصول على **شهادة ARSO CEMAC**
- 2028: افتتاح مركز إقليمي ثالث في **ياوندي**

بحلول 2028، تستهدف YOKE **20% حصة سوق** من سوق مثبتات الجهد في وسط أفريقيا، أي حوالي **9,500 وحدة سنوياً** وفريق إقليمي من **42 شخصاً** في 8 مراكز.

للاستفسارات الهندسية وعروض الأسعار والدعم الفني عبر وسط أفريقيا: **central-africa@yoke-electric.com** أو اتصل بالمقر الإقليمي في دوالا على **+237 233 XX XX XX** (الإثنين-الجمعة 8:00-17:00 WAT، خدمة الطوارئ 24/7).""",

7: None
}

# ============ PORTUGUESE ============
PT = {
0: """# Visão geral do mercado de estabilizadores de tensão da África Central

O mercado de estabilizadores de tensão (AVR) da África Central representa uma **oportunidade anual de US$ 185 milhões em 2026**, abrangendo **8 países** da zona económica e monetária **CEMAC** (Comunidade Económica e Monetária da África Central). População total superior a **220 milhões** em RDC, Camarões, Congo Brazzaville, Gabão, Chade, República Centro-Africana (RCA), Guiné Equatorial e São Tomé e Príncipe.

A África Central é única por três fatores estruturais que criam demanda sustentada de AVR:

1. **Dependência hidrelétrica e sazonalidade**: a bacia do Congo (RDC, Congo Brazzaville) e o rio Sanaga (Camarões) geram 60-70% da eletricidade, mas as variações sazonais do nível da água (junho-outubro, caudal baixo dos afluentes sul) causam flutuações de tensão de ±25%.

2. **Concentração portuária atlântica**: a logística de importação flui através de **Douala (Camarões)** — servindo Chade, RCA, norte RDC — e **Pointe-Noire (Congo Brazzaville)** — servindo as províncias ocidentais da RDC e o Congo.

3. **Reconstrução pós-conflito**: a RCA, o leste da RDC e o norte dos Camarões necessitam de AVR servo trifásicos robustos para hospitais, serviços de água e backhaul de telecomunicações móveis.

Segundo o IEA Africa Energy Outlook 2024, a África Central tem a **maior demanda per capita não satisfeita por equipamentos de qualidade de energia** entre todas as sub-regiões africanas: apenas 9% dos estabelecimentos comerciais fora das capitais possuem um estabilizador dedicado, contra 23% na África Ocidental e 38% na África Austral.

A YOKE tem servido ativamente a África Central desde 2018. Dados de implantação do Q4 2024 ao Q1 2026: **3.140 unidades expedidas para a África Central (14% do total de embarques africanos)**, distribuição por país:
- **RDC**: 1.180 unidades (37,6%)
- **Camarões**: 720 unidades (22,9%)
- **Congo Brazzaville**: 410 unidades (13,1%)
- **Gabão**: 380 unidades (12,1%)
- **Chade**: 240 unidades (7,6%)
- **RCA**: 90 unidades (2,9%)
- **Guiné Equatorial**: 90 unidades (2,9%)
- **São Tomé e Príncipe**: 30 unidades (1,0%)

Este artigo cobre os desafios de qualidade de energia, critérios de seleção de AVR, melhores práticas de instalação e os **8 centros de distribuição estratégica** que a YOKE mantém na região.""",

1: """# Desafios de qualidade de energia na África Central e seleção de AVR

## 1. Variação sazonal hidrelétrica

A bacia do Congo e o rio Sanaga entregam frequência estável (50 Hz ±0,5 Hz) mas tensão variável. Em **Kinshasa (RDC)**, onde as barragens Inga I e Inga II alimentam a rede ocidental, a capacidade na estação seca cai para 65% da placa, levando a **tensão de brownout de 175-195 V**. Em **Yaoundé (Camarões)**, a rede Sonatrel está melhor regulada mas ainda oscila 200-235 V no final de alimentadores de 33 kV de 30-50 km.

Produtos YOKE recomendados:
- **Estabilizadores monofásicos série TND** (1-30 kVA): residências, clínicas, comércio em áreas de baixa tensão
- **Estabilizadores servo série SVC** (10-500 kVA): ±1% em faixa de 150-260 V
- **Estabilizadores trifásicos TSD** (30-2000 kVA): hospitais, telecomunicações, água, mineração

## 2. Perdas de transmissão a longa distância

A rede da África Central está **sub-transmitida** em relação ao seu território. A linha de 225 kV mais longa é o **corredor HV Inga-Kolwezi de 1.100 km na RDC**. A tensão a meio da linha pode descer a 198 V (88% do nominal de 225 V) sob carga. Para clientes mineiros em Likasi, Kolwezi, Lubumbashi (cinturão de cobre da RDC), a YOKE especifica **SVC ±15% com suporte de 5 segundos** para absorver quedas de sub-ciclo.

## 3. Coexistência com geradores a diesel

Fora das grandes cidades, 60-70% dos estabelecimentos comerciais operam um arranjo **gerador diesel + rede**. Em Bangui (RCA), N'Djamena (Chade), Malabo (Guiné Equatorial), o diesel é o fornecimento principal, exigindo um AVR para limpar a forma de onda. Os geradores produzem **THD de 8-15%** e **desvio de frequência de ±2 Hz**, exigindo:
- Janela de frequência ampla (45-65 Hz)
- Resposta rápida (< 20 ms)
- Capacidade de sobretensão 5x para arranques de motor

**SVC e TSD** suportam operação com gerador de série, com transformadores de isolamento opcionais para locais com **THD > 20%**.

## 4. Guiné Equatorial e São Tomé: microrredes insulares

A Guiné Equatorial (ilha de Bioko) e São Tomé e Príncipe operam em **microrredes insulares isoladas** com diesel + solar-híbrido recentemente adicionado. O SVC-Series com **firmware de modo ilha** é a recomendação padrão para estes locais.

Para plataformas de petróleo offshore da Guiné Equatorial, a YOKE fornece sob pedido **caixas à prova de explosão ATEX/IECEx Zona 2**.""",

2: """# Como escolher estabilizadores de tensão para aplicações na África Central

## Passo 1: Medir a envolvente de tensão de entrada

Use um **voltímetro com registo de 3 dias** (Fluke 1730 ou equivalente) no lado de carga do medidor. Observações típicas:
- Kinshasa, Brazzaville, Libreville, Malabo: 195-240 V
- Yaoundé, Douala: 200-235 V
- N'Djamena, Bangui: 170-230 V
- Cinturão de cobre RDC: 198-225 V no medidor, com quedas frequentes de sub-ciclo a 175 V

Se a janela de entrada exceder ±20% do nominal, é necessário um **estabilizador servo (SVC ou TSD)**.

## Passo 2: Determinar o perfil de carga

Três arquétipos de carga:
- **Carga indutiva pesada** (HVAC, bombas de água, elevadores, motores industriais): capacidade de sobretensão 3-5x
- **Carga eletrónica sensível** (imagiologia médica, estações base de telecomunicações, salas de servidores): precisão ±1%, resposta < 20 ms
- **Misto residencial-comercial**: típico 5-30 kVA monofásico

## Passo 3: Confirmar a configuração de alimentação

A África Central opera a **220 V / 50 Hz** (ex-colónias francesas) e **220 V / 50 Hz** (Guiné Equatorial, São Tomé). Trifásico: 380-400 V entre linhas, 50 Hz. YOKE constrói por padrão 220 V / 50 Hz / 380 V trifásico com tomadas seletoras 230 V / 240 V. Para instalações de 60 Hz (raras, locais industriais antigos no Gabão), prazo de 8 semanas.

## Passo 4: Planear o ambiente de instalação

- Interior climatizado (hospital, banco, centro de dados): IP20 padrão
- Exterior coberto (estação base de telecomunicações, casa de bombas): IP54 com resistência anti-condensação
- Exterior exposto (pátio de transformador de mina, cais de porto): IP55 com proteção solar, anti-condensação, ar condicionado de armário opcional

## Passo 5: Orçamento e custo total de propriedade (TCO)

Preço de fábrica 2026 para 100 kVA SVC para Douala ou Pointe-Noire: **US$ 3.800-4.400**. Adicionar 18-22% para direitos CEMAC e avaliação de conformidade ANOR/ARSO. Costo posto em Kinshasa ou Yaoundé: aproximadamente **US$ 4.800-5.400 por unidade de 100 kVA**, garantia de 5 anos em peças e mão de obra.

Os estabilizadores de relé de baixo custo vendidos pelos distribuidores locais em Kinshasa a US$ 2.200-2.800 por 100 kVA têm apenas 1 ano de garantia e taxas de falha documentadas além dos 18 meses. O SVC-Series da YOKE alcança tipicamente 12-15 anos de vida útil, TCO 5-7x menor.

## Passo 6: Envolver a equipa de engenharia YOKE da África Central

Suporte de engenharia de projeto (diagramas unifilares, estudos de harmónicas, dimensionamento, supervisão de comissionamento): engineering@yoke-electric.com. Revisão técnica gratuita para projetos ≥ 50 kVA. **Engenheiro de campo baseado em Libreville** (Gabão, Guiné Equatorial, São Tomé) e **engenheiro de campo baseado em Douala** (Camarões, Chade, RCA, Congo Brazzaville, oeste da RDC).""",

3: """# Instalação e melhores práticas para locais da África Central

## Levantamento do local antes da instalação

Antes de entregar qualquer AVR a um local da África Central, realize um levantamento em 4 passos:
1. Verificar a janela de tensão de alimentação com voltímetro de registo de 3 dias
2. Confirmar a corrente de curto-circuito disponível no ponto de ligação do AVR
3. Documentar as condições ambientais (temperatura, humidade, poeira, sol, altitude)
4. Confirmar os comprimentos de cabo medidor→AVR e AVR→carga (> 50 m requer compensação de queda de tensão)

## Instalação mecânica

- **Superfície de montagem**: nivelada, sem vibrações, não combustível. Para SVC/TSD ≥ 100 kVA, recomenda-se uma base de betão pelo menos 100 mm acima do nível do chão para proteção contra inundações na estação das chuvas (março-maio).
- **Folga de ventilação**: **300 mm** nos quatro lados para arrefecimento por convecção natural. Ventilação mecânica em sala de quadros fechada (≥ 2 renovações/hora) para manter < 35 °C.
- **Entrada de cabo**: ** bucins de entrada inferior** com laços de gotejamento. Para IP55 exterior, acrescentar **vedações de trânsito de cabo** (Roxtec ou equivalente).
- **Ligação à terra**: resistividade do solo muito variável (costeira 50-500 Ω·m, interior 200-2000 Ω·m). Para AVR ≥ 30 kVA, **pelo menos 4 varetas de terra a 1,8 m de profundidade**, chassis AVR ligado à rede de terra com condutor de cobre de 25 mm² mínimo.

## Instalação elétrica

- **Proteção a montante**: dimensionada a **1,25-1,5x** a corrente de carga total do AVR, disjuntor termomagnético (não fusíveis — difíceis de substituir em locais remotos). AVR 100 kVA trifásico 380 V → disjuntor a montante 200 A.
- **Circuito de bypass**: cada SVC/TSD ≥ 30 kVA é fornecido com um **interruptor de bypass de 3 pólos** padrão, cablado ao barramento a montante.
- **Distribuição de saída**: usar um **quadro de distribuição de saída dedicado** a jusante do AVR com disjuntor principal e MCBs de ramos.
- **Rotação de fases**: para AVRs trifásicos, verificar a rotação L1-L2-L3 com um medidor de sequência de fases antes de ligar. A inversão de fase é uma causa comum de danos no motor no cinturão mineiro.

## Comissionamento

Cada AVR YOKE ≥ 30 kVA é enviado com **certificado de teste de fábrica** e **lista de verificação de comissionamento**. O engenheiro de comissionamento deve:
1. Verificar os binários de aperto das ligações elétricas (25-40 Nm típico para 100 kVA)
2. **Energização sem carga** e verificação da tensão de saída nas 3 fases (380 V ± 1%)
3. **Carga por escalões** (25%, 50%, 75%, 100%) e verificação da estabilidade e do tempo de resposta
4. Operação **pelo menos 4 horas** sob carga antes da aceitação
5. Formação da equipa de operações do cliente

A YOKE oferece **2 dias grátis de supervisão de comissionamento no local** para qualquer encomenda ≥ 200 kVA expedida para Douala, Pointe-Noire ou Libreville.

## Manutenção preventiva

- **Mensal**: inspeção visual, indicadores do painel frontal, ventoinha de arrefecimento
- **Trimestral**: limpar filtros de ar (IP54/IP55), verificar descoloração térmica dos terminais de cabo, operação do bypass
- **Anual**: teste elétrico completo (resistência de isolamento, precisão de saída sob carga, tempo de resposta), substituir escovas de carvão do servomotor (intervalo típico 7-10 anos)
- **Após qualquer falha da rede** (relâmpago, linha caída, falha de transformador): teste elétrico completo antes de voltar ao serviço

A YOKE mantém um **inventário de peças de reposição em Douala** (Camarões, Chade, RCA) e **Pointe-Noire** (Congo Brazzaville, RDC, Gabão). As peças comuns (placas de controlo, servomotores, escovas, ventoinhas, contactores) estão tipicamente disponíveis em stock com entrega de 2-3 dias para qualquer capital da África Central.""",

4: """# Perguntas frequentes sobre estabilizadores de tensão na África Central

**P1: Qual é a faixa de tensão de entrada típica que devo especificar para um AVR na África Central?**

R1: Para as principais capitais da África Central (Kinshasa, Brazzaville, Yaoundé, Douala, Libreville, Malabo), especifique uma janela de entrada de **150-260 V (monofásico)** ou **260-460 V (trifásico entre linhas)**. Para N'Djamena, Bangui e locais mineiros remotos da RDC, amplie para **140-270 V** para cobrir condições mais extremas. SVC e TND-Series da YOKE estão disponíveis com janelas estendidas sob pedido sem custo adicional.

**P2: Preciso de SONCAP ou outra avaliação de conformidade para AVRs importados para a África Central?**

R2: SONCAP é **obrigatório apenas para a Nigéria** sob a lei SON. Os Camarões operam o quadro **ANOR** (Agence des Normes et de la Qualité) para equipamentos elétricos gerais, mas atualmente não exigem avaliação de conformidade pré-embarque para AVRs industriais. Gabão, Congo Brazzaville, Chade, RCA, Guiné Equatorial e São Tomé e Príncipe geralmente aceitam a certificação **CE / IEC / ISO** sem testes adicionais pré-embarque. Recomenda-se uma inspeção comercial na origem (**Bureau Veritas, SGS, Intertek**) para fins aduaneiros. A YOKE envia com certificado CE, relatório de teste de fábrica e fatura comercial em conformidade com a CEMAC. **Para a Nigéria, SONCAP adiciona 4-6 semanas e aproximadamente US$ 1.200 por contentor**.

**P3: Quanto tempo leva para enviar um contentor de 40 pés de AVRs da China para Douala ou Pointe-Noire?**

R3: Frete marítimo padrão de Xangai/Ningbo para **Douala (Camarões)**: **35-40 dias**; para **Pointe-Noire (Congo Brazzaville)**: **40-45 dias**; para **Matadi (RDC, via rio Congo)**: **45-55 dias** incluindo transferência por barcaça fluvial. Para encomendas urgentes, frete aéreo de 7-10 dias para até 2.000 kg por envio. Desalfandegamento CEMAC em Douala: 5-10 dias úteis (documentação completa); em Pointe-Noire: 3-7 dias úteis.

**P4: Que garantia e suporte pós-instalação a YOKE oferece para a África Central?**

R4: Garantia padrão de **5 anos em peças e mão de obra** em SVC e TSD, 3 anos em TND. Inclui substituição gratuita de qualquer componente falhado durante o período de garantia, com envio a cargo da YOKE. Para locais num raio de 200 km de Douala, Libreville ou Pointe-Noire, serviço no local em 48 horas. Para locais remotos (cinturão mineiro da RDC, norte do Chade, Bangui), serviço via **envio antecipado de componentes de substituição + orientação por videochamada remota** para o eletricista do cliente, resolução típica de 5-7 dias.

**P5: A YOKE pode fornecer AVRs com documentação e etiquetagem bilingue francês/inglês para os Camarões?**

R5: Sim. A YOKE fornece **manuais de instalação, placas de identificação e etiquetas de aviso bilingues francês/inglês** como padrão para todas as unidades destinadas aos Camarões. Para a Guiné Equatorial (espanhol) e São Tomé (português), documentação bilingue disponível sob pedido. Para outros destinos da África Central, francês é padrão, inglês ou árabe sob pedido. As placas de identificação são gravadas em aço inoxidável (não impressas) para durabilidade em clima tropical.""",

5: """# Centros de distribuição estratégica: 8 pontos de distribuição YOKE na África Central

A YOKE mantém **8 pontos de distribuição e serviço estrategicamente localizados** na África Central.

## 1. Kinshasa (RDC) — Centro Oeste RDC
- **Cobertura**: área metropolitana de Kinshasa, províncias ocidentais RDC (Kongo Central, Kwango, Kwilu, Mai-Ndombe)
- **População servida**: 17 milhões (metro)
- **Logística**: depósito interior de contentores na zona industrial **Limete** de Kinshasa
- **Inventário**: 280 unidades em stock (TND, SVC, TSD, 5-100 kVA); kit de peças críticas 18 unidades
- **Prazo ao cliente**: 1-2 dias para stock, 7-10 dias para configurações especiais
- **Idiomas**: francês, lingala, suaíli

## 2. Brazzaville (Congo Brazzaville) — Centro Rio Congo
- **Cobertura**: Congo Brazzaville (Brazzaville, Pointe-Noire, Oyo, Owando)
- **População servida**: 6 milhões
- **Inventário**: 120 unidades em stock; kit de peças 12 unidades
- **Prazo ao cliente**: 1-2 dias para stock
- **Idiomas**: francês, lingala, kituba

## 3. Yaoundé (Camarões) — Centro capital política
- **Cobertura**: Yaoundé, centro e norte dos Camarões
- **População servida**: 4,5 milhões
- **Inventário**: 90 unidades em stock
- **Prazo ao cliente**: 1-2 dias
- **Idiomas**: francês, inglês

## 4. Douala (Camarões) — Centro Porta de Entrada CEMAC
- **Cobertura**: Douala, oeste dos Camarões, trânsito para Chade, RCA, Guiné Equatorial
- **População servida**: 4 milhões Douala + trânsito 9 milhões
- **Logística**: **maior centro de distribuição YOKE na CEMAC** na zona franca do porto de Douala, 4.200 m² de armazém coberto
- **Inventário**: 450 unidades em stock + buffer 1.200 unidades
- **Prazo ao cliente**: mesmo dia para stock; 1-2 dias para qualquer destino CEMAC
- **Idiomas**: francês, inglês, pidgin
- **Especial**: o escritório YOKE Douala é a sede regional de **engenharia África Central + Ocidental** — 8 engenheiros de campo, 12 eletricistas locais certificados, 3 gestores de projeto

## 5. Libreville (Gabão) — Centro Sede Monetária CEMAC
- **Cobertura**: Gabão, trânsito para Guiné Equatorial
- **População servida**: 900.000 (Gabão) + trânsito EG 1,4 milhões
- **Inventário**: 180 unidades em stock
- **Prazo ao cliente**: mesmo dia para stock
- **Idiomas**: francês, fang, myene

## 6. N'Djamena (Chade) — Centro Sem Litoral
- **Cobertura**: N'Djamena, sul do Chade (Moundou, Sarh)
- **População servida**: 1,6 milhões
- **Logística**: sem litoral; tudo via **trânsito Camarões** ou **trânsito Nigéria**
- **Inventário**: 60 unidades em stock
- **Prazo ao cliente**: 1-2 dias para stock; 4-7 dias para configurações especiais
- **Idiomas**: francês, árabe, sara

## 7. Bangui (República Centro-Africana) — Centro Reconstrução
- **Cobertura**: Bangui, sudoeste da RCA
- **População servida**: 900.000
- **Logística**: sem litoral; transita por **Douala**
- **Inventário**: 40 unidades em stock
- **Prazo ao cliente**: 1-2 dias para stock; 5-7 dias desde buffer Douala
- **Idiomas**: francês, sango

## 8. Malabo (Guiné Equatorial) — Centro Microrrede Insular
- **Cobertura**: ilha de Bioko (Malabo), continente Rio Muni (Bata, Ebebiyín)
- **População servida**: 1,6 milhões
- **Logística**: Bioko requer aéreo ou marítimo
- **Inventário**: 30 unidades em stock (Malabo) + 20 unidades (Bata, porto Luba)
- **Prazo ao cliente**: mesmo dia para stock
- **Idiomas**: espanhol, francês, fang, bubi, português

A YOKE opera ainda um pequeno **buffer de transbordo em São Tomé** (20 unidades em stock, kit de 4 peças) para projetos de microrrede de São Tomé e Príncipe.

Esta rede de 8 centros cobre **os 8 países da África Central** com prazo médio ao cliente de **1-2 dias para stock** e **5-7 dias para configurações especiais**. O inventário total na rede excede **1.300 unidades + 88 kits de peças críticas**, suportando uma capacidade de implantação sustentada de **6.000-8.000 unidades por ano**.""",

6: """# Conclusão: Perspetivas do mercado de estabilizadores de tensão da África Central

O mercado de estabilizadores de tensão da África Central está numa **forte trajetória de crescimento** até 2030, impulsionado por quatro fatores convergentes:

1. **Integração de infraestruturas CEMAC**: o plano diretor de infraestruturas 2024-2030 da CEMAC (Programa Económico Regional, PER) inclui 14 mil milhões de USD em atualizações de transporte e distribuição, com o projeto hidrelétrico Inga III (RDC, 11.000 MW) avançando para a fase final de viabilidade.

2. **Expansão das telecomunicações móveis**: a cobertura 4G na África Central é atualmente de 38% da população (2024); pilotos de 5G começaram em Douala e Kinshasa. Cada nova estação base de telecomunicações requer um estabilizador dedicado. O SVC-Series da YOKE é a especificação padrão para **MTN Camarões, Orange RDC, Airtel Chade e Telecel RCA** — 14.500 estações base combinadas na região, das quais apenas 9.800 têm atualmente estabilizador YOKE (47% de quota de mercado, 4.700 oportunidades de atualização).

3. **Eletrificação mineira**: o cinturão de cobre da RDC (Likasi, Kolwezi, Lubumbashi) está a expandir-se rapidamente para satisfazer a procura de veículos elétricos e armazenamento em baterias. Cada nova mina de cobre-cobalto requer 8-25 MW de potência com qualidade de rede, com AVR robustos dedicados para processamento, extração e ventilação. A YOKE forneceu 14 projetos mineiros da RDC em 2024-2025, com outros 9 no pipeline 2026.

4. **Construção hospitalar e hidráulica**: a África Central tem 0,9 camas de hospital por 1.000 habitantes (vs. recomendação OMS 3,0) e 41% da população sem acesso a água potável. O Banco Mundial, o Banco Africano de Desenvolvimento e doadores bilaterais estão a financiar **3,8 mil milhões de USD em infraestruturas de saúde e WASH** na África Central 2024-2028.

**Prioridades estratégicas YOKE 2026-2028 na África Central**:

- **2026 T3**: expandir o centro de distribuição Douala de 4.200 m² para 6.500 m² (+55% capacidade de armazenamento)
- **2026 T4**: abrir um novo centro de serviço de 1.500 m² na **zona industrial Limete de Kinshasa**
- **2027 T1**: lançar um local de referência AVR solar-híbrido de 30 kW em **Bangui** em parceria com o PNUD
- **2027 T2**: introduzir modelos **antideflagrantes ATEX/IECEx Zona 2** para plataformas de petróleo
- **2027 T4**: obter a **certificação ARSO (Organização Africana de Normalização) em toda a CEMAC** para toda a gama
- **2028**: abrir um terceiro centro regional em **Yaoundé**

Até 2028, a YOKE visa **20% de quota de mercado do mercado endereçável de estabilizadores de tensão na África Central** (atualmente 12,7% em 2024-2025), traduzindo-se em aproximadamente **9.500 unidades expedidas por ano** e uma equipa regional de **42 pessoas** em 8 centros de distribuição.

Para pedidos de engenharia, orçamentos de projeto ou suporte técnico em toda a África Central, contacte a equipa YOKE África Central em **central-africa@yoke-electric.com** ou ligue para a sede regional de Douala no **+237 233 XX XX XX** (seg-sex 8:00-17:00 WAT, plantão 24/7 para garantia de emergência).""",

7: None
}

# Save ES/AR/PT bodies
for i in range(7):
    art["sections"][i]["body"]["es"] = ES[i]
    art["sections"][i]["body"]["ar"] = AR[i]
    art["sections"][i]["body"]["pt"] = PT[i]

with open(PATH, 'w', encoding='utf-8') as f:
    json.dump(art, f, ensure_ascii=False, indent=2)
print(f"Added ES+AR+PT bodies. Size: {os.path.getsize(PATH)} bytes")
