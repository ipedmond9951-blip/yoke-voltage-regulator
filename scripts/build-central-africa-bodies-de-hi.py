#!/usr/bin/env python3
"""Add de + hi bodies to central-africa article."""
import json
import os
from collections import OrderedDict

PATH = 'content/articles/central-africa-avr-trade.json'
with open(PATH, 'r', encoding='utf-8') as f:
    art = json.load(f, object_pairs_hook=OrderedDict)

DE = {
0: """# Übersicht des Zentralafrika-Spannungsstabilisatorenmarktes

Der Zentralafrika-Spannungsstabilisatorenmarkt (AVR) stellt **2026 eine jährliche Chance von 185 Mio. USD** dar und deckt **8 Länder** der **CEMAC**-Zone (Zentralafrikanische Wirtschafts- und Währungsgemeinschaft) ab. Die Gesamtbevölkerung in DRC, Kamerun, Kongo-Brazzaville, Gabun, Tschad, Zentralafrikanische Republik (ZAR), Äquatorialguinea und São Tomé und Príncipe übersteigt **220 Mio.**

Zentralafrika ist durch drei strukturelle Faktoren einzigartig:

1. **Wasserkraftabhängigkeit und Saisonalität**: Das Kongobecken (DRC, Kongo-Brazzaville) und der Sanaga-Fluss (Kamerun) erzeugen 60-70% des Stroms, aber saisonale Wasserspiegelschwankungen (Juni-Oktober, Niedrigwasser südlicher Nebenflüsse) verursachen Spannungsschwankungen von ±25%.

2. **Atlantikhafenkonzentration**: Die Importlogistik läuft über **Douala (Kamerun)** und **Pointe-Noire (Kongo-Brazzaville)**.

3. **Wiederaufbau nach Konflikten**: ZAR, Ost-DRC und Nordkamerun benötigen robuste dreiphasige Servostabilisatoren für Krankenhäuser, Wasserversorgung und Telekommunikations-Backhaul.

Laut IEA Africa Energy Outlook 2024 hat Zentralafrika **die höchste ungedeckte Pro-Kopf-Nachfrage nach Stromqualitätsausrüstung** aller afrikanischen Subregionen: nur 9% der gewerblichen Betriebe außerhalb der Hauptstädte haben einen dedizierten Stabilisator (vs. 23% in Westafrika, 38% in Südafrika).

YOKE bedient Zentralafrika aktiv seit 2018. Einsatzdaten Q4 2024 bis Q1 2026: **3.140 Einheiten nach Zentralafrika versandt (14% der gesamten afrikanischen Lieferungen)**, Aufschlüsselung nach Ländern:
- **DRC**: 1.180 Einheiten (37,6%)
- **Kamerun**: 720 Einheiten (22,9%)
- **Kongo-Brazzaville**: 410 Einheiten (13,1%)
- **Gabun**: 380 Einheiten (12,1%)
- **Tschad**: 240 Einheiten (7,6%)
- **ZAR**: 90 Einheiten (2,9%)
- **Äquatorialguinea**: 90 Einheiten (2,9%)
- **São Tomé und Príncipe**: 30 Einheiten (1,0%)

Dieser Artikel behandelt Stromqualitätsherausforderungen, AVR-Auswahlkriterien, Installations-Best-Practices und die **8 strategischen Vertriebszentren**, die YOKE in der Region unterhält.""",

1: """# Stromqualitätsherausforderungen in Zentralafrika und AVR-Auswahl

## 1. Saisonale Wasserkraftschwankungen

Das Kongobecken und der Sanaga liefern stabile Frequenz (50 Hz ±0,5 Hz), aber instabile Spannung. In **Kinshasa (DRC)**, wo die Inga I- und Inga II-Dämme das westliche Netz speisen, fällt die Kapazität in der Trockenzeit auf 65% des Nennwerts und führt zu **Brownout-Spannungen von 175-195 V**. In **Yaoundé (Kamerun)** ist das Sonatrel-Netz besser reguliert, schwankt aber immer noch 200-235 V am Ende von 30-50 km langen 33 kV-Feedern.

Empfohlene YOKE-Produkte:
- **Einphasige TND-Serie-Stabilisatoren** (1-30 kVA): Haushalte, Kliniken, Handel in Niederspannungsgebieten
- **SVC-Serie-Servostabilisatoren** (10-500 kVA): gewerbliche/leichte Industriestandorte, die ±1% bei 150-260 V benötigen
- **Dreiphasige TSD-Stabilisatoren** (30-2000 kVA): Krankenhäuser, Telekommunikation, Wasser, Bergbau

## 2. Übertragungsverluste bei langen Strecken

Das Zentralafrika-Netz ist **unterausgebaut** im Verhältnis zu seinem Territorium. Die längste 225-kV-Leitung ist der **1.100 km lange HV-Korridor Inga-Kolwezi in DRC**. Die Spannung in der Leitungsmitte kann unter Last auf 198 V (88% des 225-V-Nennwerts) abfallen. Für Bergbaukunden in Likasi, Kolwezi, Lubumbashi (DRC-Kupfergürtel) spezifiziert YOKE **SVC ±15% mit 5-Sekunden-Überlastfähigkeit**.

## 3. Koexistenz mit Dieselgeneratoren

Außerhalb der Großstädte werden 60-70% der Gewerbebetriebe mit **Dieselgenerator + Netz** betrieben. In Bangui (ZAR), N'Djamena (Tschad), Malabo (Äquatorialguinea) ist Diesel die Hauptversorgung und erfordert AVR zur Wellenformbereinigung. Generatoren erzeugen **THD von 8-15%** und **Frequenzdrift von ±2 Hz**, was Folgendes erfordert:
- Breites Frequenzfenster (45-65 Hz)
- Schnelle Reaktion (< 20 ms)
- 5-fache Überspannungsfähigkeit für Motoranläufe

**SVC und TSD** unterstützen den Generatorbetrieb serienmäßig, mit optionalen Isolationstransformatoren für Standorte mit **THD > 20%**.

## 4. Äquatorialguinea und São Tomé: Insel-Mikronetze

Äquatorialguinea (Bioko-Insel) und São Tomé und Príncipe arbeiten in **isolierten Insel-Mikronetzen** mit Diesel + kürzlich hinzugefügtem Solar-Hybrid. SVC-Serie mit **Inselmodus-Firmware** ist die Standardempfehlung für diese Standorte.

Für Offshore-Ölplattformen Äquatorialguineas liefert YOKE auf Anfrage **ATEX/IECEx-Zone-2-Explosionsgeschützte-Gehäuse**.""",

2: """# Auswahl von Spannungsstabilisatoren für Zentralafrika-Anwendungen

## Schritt 1: Eingangsspannungs-Hüllkurve messen

Verwenden Sie einen **Spannungsmesser mit 3-Tage-Aufzeichnung** (Fluke 1730 oder gleichwertig) auf der Lastseite des Zählers. Typische Beobachtungen in Zentralafrika:
- Kinshasa, Brazzaville, Libreville, Malabo: 195-240 V
- Yaoundé, Douala: 200-235 V
- N'Djamena, Bangui: 170-230 V
- DRC-Kupfergürtel (Lubumbashi, Kolwezi): 198-225 V am Zähler, mit häufigen Subzyklus-Einbrüchen auf 175 V

Wenn das Eingangsfenster ±20% des Nennwerts überschreitet, ist ein **Servostabilisator (SVC oder TSD)** erforderlich.

## Schritt 2: Lastprofil bestimmen

Drei Last-Archetypen:
- **Schwere induktive Last** (HLK, Wasserpumpen, Aufzüge, Industriemotoren): 3-5-fache Überspannungsfähigkeit
- **Empfindliche elektronische Last** (medizinische Bildgebung, Telekommunikations-Basisstationen, Serverräume): Genauigkeit ±1%, Reaktion < 20 ms
- **Wohn-Gewerbe-Mix**: typisch 5-30 kVA einphasig

## Schritt 3: Versorgungskonfiguration bestätigen

Zentralafrika arbeitet mit **220 V / 50 Hz** (ehemalige französische Kolonien) und **220 V / 50 Hz** (Äquatorialguinea, São Tomé). Dreiphasig: 380-400 V zwischen Leitungen, 50 Hz. YOKE baut standardmäßig 220 V / 50 Hz / 380 V dreiphasig mit umschaltbaren Abgriffen 230 V / 240 V. Für 60-Hz-Installationen (selten, ältere Industriestandorte in Gabun) gilt eine 8-Wochen-Vorlaufzeit.

## Schritt 4: Installationsumgebung planen

- Klimatisierter Innenraum (Krankenhaus, Bank, Rechenzentrum): Standard IP20
- Überdachtes Freien (Telekommunikations-Basisstation, Pumpenhaus): IP54 mit Anti-Kondensation-Heizung
- Freies Freien (Bergbau-Transformatorenhof, Hafenkai): IP55 mit Schatten, Anti-Kondensation, optionaler Schaltschrank-Klimaanlage

## Schritt 5: Budget und Gesamtbetriebskosten (TCO)

Werkspreis 2026 für 100 kVA SVC in Douala oder Pointe-Noire: **3.800-4.400 USD**. 18-22% für CEMAC-Zölle und ANOR/ARSO-Konformitätsbewertung hinzufügen. Gelandete Kosten in Kinshasa oder Yaoundé: ungefähr **4.800-5.400 USD pro 100-kVA-Einheit**, 5-Jahres-Garantie auf Teile und Arbeit.""",

3: """# AVR-Installations- und Wartungspraktiken in Zentralafrika

## 1. Verkabelung und Erdung

Alle Installationen müssen **IEC 60364** und lokalen Vorschriften entsprechen. In Kamerun und Gabun ist dies die **NF C 15-100**-Norm; in DRC **RNIE 2018**; in ZAR und Tschad eine vereinfachte Version von IEC. YOKE liefert AVR mit **Werkserdungssätzen** (1,2 m Kupferstab + 6 m 6 AWG-Erdungsleiter).

## 2. Wärmemanagement

Zentralafrika hat tropisches Klima mit typischen Temperaturen von 28-38°C und relativer Luftfeuchtigkeit von 70-95% in Küstengebieten (Douala, Libreville, Malabo). YOKE **SVC-Serie und TND-Serie** sind für den Betrieb bei **0-50°C ohne Leistungsreduzierung** und 0-95% relativer Luftfeuchtigkeit ohne Kondensation ausgelegt. Für Installationen in **klimatisierten Rechenzentrumsräumen** (typische Zulufttemperatur 22°C) sind keine Änderungen erforderlich.

## 3. Blitzschutz

Die Äquatorialzone hat **180-220 Gewittertage pro Jahr** — die höchste Rate der Welt. Jede in Zentralafrika installierte YOKE-Einheit sollte mit einem **Klasse-II 40-kA-Überspannungsschutzgerät (SPD)** am Eingang ausgestattet sein. Für direkten Blitzschlag ausgesetzte DRC-Bergwerke wird Klasse-I 100-kA-SPD empfohlen. YOKE verkauft SPD separat oder im Bündel.

## 4. Feuchtigkeits- und Staubschutz

Die IP-Bewertung ist ein kritischer Parameter:
- **IP20**: Innenreinräume
- **IP54**: Überdachte Außeninstallationen, typische Telekommunikations-Basisstation
- **IP55**: Offene Außeninstallationen mit Schatten
- **IP65**: Installationen mit direktem Regen (bei YOKE anfragen)

## 5. Geplante Wartung

- **Monatlich**: Sichtprüfung, LED-Überprüfung, Spannungsmessung
- **Quartalsweise**: Verbindungsanzugsmoment prüfen (nach 3 Monaten Betrieb), Staubfilter reinigen
- **Jährlich**: Thermographie der Sammelschienen, verschlissene Servobürsten ersetzen (SVC > 500 Zyklen)
- **Alle 3 Jahre**: Kondensatoren ersetzen, Kühllüfter ersetzen

Das YOKE-Servicenetz in Zentralafrika führt eine **4-Stunden-SLA-Reaktion** in Douala, Yaoundé, Kinshasa und Libreville für Garantiefälle durch.""",

4: """# AVR-Preise und Logistik in Zentralafrika

## Werkspreis 2026 (FOB Shenzhen)

| Modell | Kapazität | FOB-Preis | Anwendung |
| --- | --- | --- | --- |
| TND-20 | 20 kVA | 480-560 USD | Basis-Einphasen, Haushalt/Klinik |
| SVC-30 | 30 kVA | 720-820 USD | Kleines Gewerbe |
| SVC-100 | 100 kVA | 3.800-4.400 USD | Hotel, kleine Fabrik |
| SVC-300 | 300 kVA | 9.200-10.800 USD | Mittlere Fabrik, Telekommunikations-Knoten |
| TSD-200 | 200 kVA | 7.500-8.800 USD | Krankenhaus, Wasserwerk |
| TSD-500 | 500 kVA | 16.000-19.000 USD | Bergbau, Rechenzentrum |
| TSD-1000 | 1000 kVA | 28.000-34.000 USD | Schwerindustrie, Öl & Gas |

## CEMAC-Zölle und Konformitätsbewertung

Der CEMAC-Zolltarif 2024 für Spannungsstabilisatoren (HS 8504.40) beträgt **18% CIF** für CEMAC-Mitgliedstaaten. Dazu kommt:
- **ANOR/ARSO-Konformitätsbewertung** (Kamerun, Gabun): 2-4% des CIF
- **SONATREL-Zertifikat** (Kamerun) für netzseitige Installationen: 1,2% des CIF
- **Transportversicherung** (1% des FOB) für alle CEMAC-Sendungen obligatorisch
- **Entladegebühr** in Douala oder Pointe-Noire: 80-150 USD pro Einheit

## Seefrachtraten 2026

Von Shenzhen/Guangzhou nach Douala oder Pointe-Noire (20-Fuß-Container):
- **Transitzeit**: 28-35 Tage (direkt) oder 35-42 Tage (mit Singapur-Umladung)
- **Seefracht 2026**: 3.200-4.000 USD pro 20-Fuß-Container
- **Containerkapazität**: ~80 Einheiten SVC-100 oder 200 Einheiten TND-20
- **Zollabfertigung** in Douala: 7-12 Werktage
- **Zollabfertigung** in Pointe-Noire: 10-15 Werktage

## Geschätzte Lieferkosten (CIF Douala)

| Modell | Werkspreis (FOB) | + Fracht + Zoll | CIF Douala |
| --- | --- | --- | --- |
| TND-20 (×200) | 480 USD | 145 USD | 625 USD |
| SVC-100 (×80) | 4.100 USD | 1.080 USD | 5.180 USD |
| TSD-500 (×12) | 17.500 USD | 3.800 USD | 21.300 USD |

## Zahlungsmethoden

YOKE akzeptiert die folgenden Zahlungsmethoden für Kunden in Zentralafrika:
- **T/T-Banküberweisung** (bevorzugt, minimale Gebühr)
- **L/C-Akkreditiv** (für Bestellungen > 50.000 USD, 0,8% Gebühr)
- **D/P-Dokumente gegen Zahlung** (für Stammkunden mit guter Kredithistorie)
- **Bitcoin/USDT** (auf Anfrage, für Kunden mit eingeschränktem Devisenzugang)

**YOKE erhebt KEINE versteckten Gebühren** — alle Kosten sind in der Rechnung transparent. Vermeiden Sie Vermittler, die 8-15% Provision auf den Werkspreis verlangen.""",

5: """# YOKE-Vertriebs- und Servicenetz in Zentralafrika

YOKE betreibt **8 Vertriebs- und Servicezentren** in Zentralafrika, jedes mit lokalem Personal, Lagerbestand und Serviceteam:

## 1. Douala (Kamerun) — CEMAC-Regionalsitz
- **Abdeckung**: Kamerun, Großhandel für ZAR/Tschad
- **Bediente Bevölkerung**: 4 Mio. (Douala-Stadtgebiet) + 8 Mio. (kamerunisches Hinterland)
- **Lager**: 4.200 m², 1.200 Puffereinheiten + 88 kritische Teile-Sätze
- **Kundenvorlaufzeit**: 1-2 Tage ab Lager; 5-7 Tage für Spezialkonfigurationen
- **Personal**: 8 Ingenieure, 4 Techniker
- **Sprachen**: Französisch, Englisch, Pidgin-Englisch, Fulani, Bamileke

## 2. Yaoundé (Kamerun) — Hauptstadt-Servicezentrum
- **Abdeckung**: Regierungseinrichtungen, Telekommunikations-Knoten im zentralen/östlichen Kamerun
- **Bediente Bevölkerung**: 4,5 Mio. (Yaoundé-Stadtgebiet)
- **Lager**: 1.800 m², 90 Einheiten auf Lager
- **Kundenvorlaufzeit**: 1-2 Tage
- **Sprachen**: Französisch, Englisch, Ewondo, Fulfude

## 3. Kinshasa (DRC) — Westkongo-Becken-Zentrum
- **Abdeckung**: Kinshasa, Provinz Kongo, Ost-Kasai
- **Bediente Bevölkerung**: 17 Mio. (Kinshasa-Stadtgebiet)
- **Lager**: 2.100 m², 280 Einheiten auf Lager
- **Kundenvorlaufzeit**: 1-2 Tage ab Lager; 4-7 Tage für Spezialkonfigurationen
- **Logistik**: Flussverbindung über **Kinshasa-Brazzaville** (Fähre 45 Min.) für grenzüberschreitende Bestellungen
- **Sprachen**: Französisch, Lingala, Suaheli, Chiluba

## 4. Brazzaville (Kongo) — Kongo-Grenzüberschreitendes Zentrum
- **Abdeckung**: Kongo-Brazzaville, Nordangola
- **Bediente Bevölkerung**: 2,4 Mio.
- **Lager**: 600 m², 120 Einheiten auf Lager
- **Kundenvorlaufzeit**: 1-2 Tage
- **Sprachen**: Französisch, Kituba, Lingala

## 5. Libreville (Gabun) — CEMAC-Währungssitz-Zentrum
- **Abdeckung**: Gabun, Transit nach Äquatorialguinea
- **Bediente Bevölkerung**: 900.000 (Gabun) + EG-Transit 1,4 Mio.
- **Lager**: 800 m², 180 Einheiten auf Lager
- **Kundenvorlaufzeit**: gleicher Tag ab Lager
- **Sprachen**: Französisch, Fang, Myene

## 6. N'Djamena (Tschad) — Binnenland-Zentrum
- **Abdeckung**: N'Djamena, Südschad (Moundou, Sarh)
- **Bediente Bevölkerung**: 1,6 Mio.
- **Logistik**: Binnenland; alles über **Kamerun-Transit** oder **Nigeria-Transit**
- **Lager**: 350 m², 60 Einheiten auf Lager
- **Kundenvorlaufzeit**: 1-2 Tage ab Lager; 4-7 Tage für Spezialkonfigurationen
- **Sprachen**: Französisch, Arabisch, Sara

## 7. Bangui (ZAR) — Wiederaufbau-Zentrum
- **Abdeckung**: Bangui, Südwest-ZAR
- **Bediente Bevölkerung**: 900.000
- **Logistik**: Binnenland; Transit über **Douala**
- **Lager**: 250 m², 40 Einheiten auf Lager
- **Kundenvorlaufzeit**: 1-2 Tage ab Lager; 5-7 Tage ab Douala-Puffer
- **Sprachen**: Französisch, Sango

## 8. Malabo (Äquatorialguinea) — Insel-Mikronetz-Zentrum
- **Abdeckung**: Bioko-Insel (Malabo), Festland Rio Muni (Bata, Ebebiyín)
- **Bediente Bevölkerung**: 1,6 Mio.
- **Logistik**: Bioko erfordert Luft- oder Seetransport
- **Lager**: 180 m², 30 Einheiten auf Lager (Malabo) + 20 Einheiten (Bata, Hafen Luba)
- **Kundenvorlaufzeit**: gleicher Tag ab Lager
- **Sprachen**: Spanisch, Französisch, Fang, Bubi, Portugiesisch

YOKE betreibt auch einen kleinen **Umladepuffer in São Tomé** (20 Einheiten auf Lager, 4-teiliger Kit) für Mikronetzprojekte in São Tomé und Príncipe.

Dieses **8-Zentren-Netz** deckt **alle 8 Länder Zentralafrikas** ab mit einer durchschnittlichen Kundenvorlaufzeit von **1-2 Tagen ab Lager** und **5-7 Tagen für Spezialkonfigurationen**. Der Gesamtbestand im Netz übersteigt **1.300 Einheiten + 88 kritische Teile-Sätze** und unterstützt eine nachhaltige Einsatzkapazität von **6.000-8.000 Einheiten pro Jahr**.""",

6: """# Schlussfolgerung: Aussichten für den Zentralafrika-Spannungsstabilisatorenmarkt

Der Zentralafrika-Spannungsstabilisatorenmarkt befindet sich auf einer **starken Wachstumstrajektorie** bis 2030, getrieben von vier konvergierenden Faktoren:

1. **CEMAC-Infrastrukturintegration**: Der CEMAC-Infrastrukturmasterplan 2024-2030 (Regionales Wirtschaftsprogramm, PER) umfasst **14 Mrd. USD** für Übertragungs- und Verteilungsaufrüstung, wobei das **Inga-III-Wasserkraftprojekt (DRC, 11.000 MW)** in die finale Machbarkeitsphase voranschreitet.

2. **Mobile-Kommunikationserweiterung**: Die 4G-Abdeckung in Zentralafrika liegt derzeit bei 38% der Bevölkerung (2024); 5G-Piloten wurden in Douala und Kinshasa gestartet. Jede neue Telekommunikations-Basisstation benötigt einen dedizierten Stabilisator. Die SVC-Serie von YOKE ist die Standardspezifikation für **MTN Kamerun, Orange DRC, Airtel Tschad und Telecel ZAR** — insgesamt **14.500 Basisstationen** in der Region, von denen derzeit nur 9.800 einen YOKE-Stabilisator haben (47% Marktanteil, 4.700 Aufrüstungschancen).

3. **Bergbau-Elektrifizierung**: Der DRC-Kupfergürtel (Likasi, Kolwezi, Lubumbashi) expandiert rasant, um die Nachfrage nach Elektrofahrzeugen und Batterien zu decken. Jede neue Kupfer-Kobalt-Mine benötigt 8-25 MW Netzqualitätsleistung mit dedizierten robusten AVR für Verarbeitung, Extraktion und Belüftung. YOKE lieferte **14 DRC-Bergbauprojekte** in 2024-2025, weitere 9 in der Pipeline 2026.

4. **Krankenhaus- und Wasserbau**: Zentralafrika hat **0,9 Krankenhausbetten pro 1.000 Einwohner** (vs. WHO-Empfehlung 3,0) und 41% der Bevölkerung haben keinen Zugang zu sauberem Wasser. Die Weltbank, die Afrikanische Entwicklungsbank und bilaterale Geber finanzieren **3,8 Mrd. USD an Gesundheits- und WASH-Infrastruktur** in Zentralafrika 2024-2028.

**YOKE strategische Prioritäten 2026-2028 in Zentralafrika**:

- **2026 Q3**: Douala-Vertriebszentrum von 4.200 m² auf 6.500 m² erweitern (+55% Lagerkapazität)
- **2026 Q4**: Neues 1.500-m²-Servicezentrum in der **Limete-Industriezone in Kinshasa** eröffnen
- **2027 Q1**: **30-kW-Solar-Hybrid-AVR-Referenzstandort in Bangui** in Partnerschaft mit UNDP starten
- **2027 Q2**: **ATEX/IECEx-Zone-2-explosionsgeschützte** Modelle für Ölplattformen einführen
- **2027 Q4**: **ARSO-Zertifizierung (Afrikanische Standardisierungsorganisation) CEMAC-weit** für die gesamte Palette erhalten
- **2028**: Drittes regionales Zentrum in **Yaoundé** eröffnen

Bis 2028 strebt YOKE einen **20% Marktanteil** des adressierbaren Zentralafrika-Spannungsstabilisatorenmarktes an (derzeit 12,7% in 2024-2025), was etwa **9.500 Einheiten pro Jahr** und ein regionales Team von **42 Personen** in 8 Vertriebszentren entspricht.

Für Engineering-Anfragen, Projektangebote oder technischen Support in ganz Zentralafrika kontaktieren Sie das YOKE-Zentralafrika-Team unter **central-africa@yoke-electric.com** oder rufen Sie den regionalen Hauptsitz in Douala unter **+237 233 XX XX XX** an (Mo-Fr 8:00-17:00 WAT, 24/7-Bereitschaft für Notfall-Garantie).""",
}

HI = {
0: """# मध्य अफ्रीका वोल्टेज स्टेबिलाइज़र बाज़ार अवलोकन

मध्य अफ्रीका वोल्टेज स्टेबिलाइज़र (AVR) बाज़ार **2026 में 185 मिलियन अमेरिकी डॉलर के वार्षिक अवसर** का प्रतिनिधित्व करता है, जो **CEMAC** (मध्य अफ्रीकी आर्थिक और मौद्रिक समुदाय) क्षेत्र के **8 देशों** को कवर करता है। DRC, कैमरून, कांगो ब्राज़ाविल, गैबॉन, चाड, मध्य अफ्रीकी गणराज्य (CAR), भूमध्यरेखीय गिनी और साओ टोमे और प्रिंसिपी में कुल जनसंख्या **220 मिलियन** से अधिक है।

मध्य अफ्रीका तीन संरचनात्मक कारकों से अद्वितीय है:

1. **जलविद्युत निर्भरता और मौसमी**: कांगो बेसिन (DRC, कांगो ब्राज़ाविल) और सनागा नदी (कैमरून) 60-70% बिजली उत्पन्न करते हैं, लेकिन पानी के स्तर के मौसमी उतार-चढ़ाव (जून-अक्टूबर, दक्षिणी सहायक नदियों का निम्न जल) ±25% वोल्टेज उतार-चढ़ाव का कारण बनते हैं।

2. **अटलांटिक बंदरगाह एकाग्रता**: आयात लॉजिस्टिक्स **डुआला (कैमरून)** और **पॉइंट-नोआर (कांगो ब्राज़ाविल)** के माध्यम से होती है।

3. **संघर्ष के बाद पुनर्निर्माण**: CAR, पूर्वी DRC और उत्तरी कैमरून को अस्पतालों, जल आपूर्ति और दूरसंचार बैकहॉल के लिए मजबूत तीन-चरण सर्वो स्टेबिलाइज़र की आवश्यकता है।

IEA Africa Energy Outlook 2024 के अनुसार, मध्य अफ्रीका में सभी अफ्रीकी उप-क्षेत्रों में **प्रति व्यक्ति बिजली गुणवत्ता उपकरण की सबसे अधिक असंतुष्ट मांग** है: राजधानियों के बाहर के केवल 9% व्यावसायिक प्रतिष्ठानों के पास समर्पित स्टेबिलाइज़र है (पश्चिम अफ्रीका में 23%, दक्षिणी अफ्रीका में 38% की तुलना में)।

YOKE 2018 से मध्य अफ्रीका की सक्रिय रूप से सेवा कर रहा है। Q4 2024 से Q1 2026 तक की तैनाती डेटा: **3,140 इकाइयाँ मध्य अफ्रीका को भेजी गईं (कुल अफ्रीकी शिपमेंट का 14%)**, देश के अनुसार विभाजन:
- **DRC**: 1,180 इकाइयाँ (37.6%)
- **कैमरून**: 720 इकाइयाँ (22.9%)
- **कांगो ब्राज़ाविल**: 410 इकाइयाँ (13.1%)
- **गैबॉन**: 380 इकाइयाँ (12.1%)
- **चाड**: 240 इकाइयाँ (7.6%)
- **CAR**: 90 इकाइयाँ (2.9%)
- **भूमध्यरेखीय गिनी**: 90 इकाइयाँ (2.9%)
- **साओ टोमे और प्रिंसिपी**: 30 इकाइयाँ (1.0%)

यह लेख बिजली गुणवत्ता चुनौतियों, AVR चयन मानदंडों, स्थापना सर्वोत्तम प्रथाओं और **8 रणनीतिक वितरण केंद्रों** को कवर करता है जिन्हें YOKE क्षेत्र में बनाए रखता है।""",

1: """# मध्य अफ्रीका में बिजली गुणवत्ता चुनौतियाँ और AVR चयन

## 1. मौसमी जलविद्युत उतार-चढ़ाव

कांगो बेसिन और सनागा स्थिर आवृत्ति (50 Hz ±0.5 Hz) देते हैं लेकिन अस्थिर वोल्टेज। **किंशासा (DRC)** में, जहाँ इंगा I और इंगा II बांध पश्चिमी ग्रिड को खिलाते हैं, सूखे मौसम में क्षमता नाममात्र के 65% तक गिर जाती है, जिससे **175-195V के ब्राउनआउट वोल्टेज** होते हैं। **याउंडे (कैमरून)** में, Sonatrel ग्रिड बेहतर नियंत्रित है लेकिन फिर भी 30-50 km लंबे 33 kV फीडर के अंत में 200-235V पर दोलन करता है।

अनुशंसित YOKE उत्पाद:
- **सिंगल-फेज TND-सीरीज़ स्टेबिलाइज़र** (1-30 kVA): कम वोल्टेज क्षेत्रों में घर, क्लिनिक, वाणिज्य
- **SVC-सीरीज़ सर्वो स्टेबिलाइज़र** (10-500 kVA): 150-260V पर ±1% की आवश्यकता वाले वाणिज्यिक/हल्के औद्योगिक स्थल
- **तीन-चरण TSD स्टेबिलाइज़र** (30-2000 kVA): अस्पताल, दूरसंचार, पानी, खनन

## 2. लंबी दूरी की पारेषण हानियाँ

मध्य अफ्रीका ग्रिड अपने क्षेत्रफल के सापेक्ष **अविकसित** है। सबसे लंबी 225 kV लाइन DRC में **1,100 km HV इंगा-कोलवेज़ी कॉरिडोर** है। लोड के तहत लाइन के मध्य में वोल्टेज 198V (225V नाममात्र का 88%) तक गिर सकता है। DRC कॉपर बेल्ट (लिकासी, कोलवेज़ी, लुबुम्बाशी) में खनन ग्राहकों के लिए, YOKE **5-सेकंड ओवरलोड क्षमता के साथ SVC ±15%** निर्दिष्ट करता है।

## 3. डीजल जनरेटर के साथ सहअस्तित्व

बड़े शहरों के बाहर, 60-70% व्यावसायिक प्रतिष्ठान **डीजल जनरेटर + ग्रिड** पर चलते हैं। बांगुई (CAR), एन'जमेना (चाड), मालाबो (भूमध्यरेखीय गिनी) में, डीजल मुख्य आपूर्ति है, जिसे तरंग को साफ करने के लिए AVR की आवश्यकता होती है। जनरेटर **8-15% THD** और **±2 Hz आवृत्ति ड्रिफ्ट** उत्पन्न करते हैं, जिसके लिए आवश्यक है:
- विस्तृत आवृत्ति विंडो (45-65 Hz)
- तेज़ प्रतिक्रिया (< 20 ms)
- मोटर स्टार्ट के लिए 5x सर्ज क्षमता

**SVC और TSD** मानक रूप से जनरेटर संचालन का समर्थन करते हैं, **THD > 20%** वाले स्थलों के लिए वैकल्पिक आइसोलेशन ट्रांसफार्मर के साथ।

## 4. भूमध्यरेखीय गिनी और साओ टोमे: द्वीप माइक्रोग्रिड

भूमध्यरेखीय गिनी (बायोको द्वीप) और साओ टोमे और प्रिंसिपी हाल ही में जोड़े गए डीजल + सोलर-हाइब्रिड के साथ **अलग-थलग द्वीप माइक्रोग्रिड** में संचालित होते हैं। **आइलैंड मोड फर्मवेयर** के साथ SVC-सीरीज़ इन साइटों के लिए डिफ़ॉल्ट सिफारिश है।

भूमध्यरेखीय गिनी के अपतटीय तेल प्लेटफार्मों के लिए, YOKE अनुरोध पर **ATEX/IECEx ज़ोन 2 विस्फोट-प्रूफ बाड़े** प्रदान करता है।""",

2: """# मध्य अफ्रीका अनुप्रयोगों के लिए वोल्टेज स्टेबिलाइज़र कैसे चुनें

## चरण 1: इनपुट वोल्टेज एनवलप मापें

मीटर के लोड साइड पर **3-दिन की रिकॉर्डिंग के साथ वोल्टमीटर** (Fluke 1730 या समकक्ष) का उपयोग करें। मध्य अफ्रीका में विशिष्ट अवलोकन:
- किंशासा, ब्राज़ाविल, लिबरविल, मालाबो: 195-240V
- याउंडे, डुआला: 200-235V
- एन'जमेना, बांगुई: 170-230V
- DRC कॉपर बेल्ट (लुबुम्बाशी, कोलवेज़ी): मीटर पर 198-225V, 175V तक लगातार उप-चक्र ड्रॉप

यदि इनपुट विंडो नाममात्र के ±20% से अधिक है, तो **सर्वो स्टेबिलाइज़र (SVC या TSD)** आवश्यक है।

## चरण 2: लोड प्रोफ़ाइल निर्धारित करें

तीन लोड आर्कटाइप:
- **भारी प्रेरक लोड** (HVAC, वॉटर पंप, एलिवेटर, औद्योगिक मोटर): 3-5x सर्ज क्षमता
- **संवेदनशील इलेक्ट्रॉनिक लोड** (मेडिकल इमेजिंग, दूरसंचार बेस स्टेशन, सर्वर रूम): सटीकता ±1%, प्रतिक्रिया < 20 ms
- **आवासीय-वाणिज्यिक मिश्रण**: विशिष्ट 5-30 kVA सिंगल-फेज

## चरण 3: आपूर्ति कॉन्फ़िगरेशन की पुष्टि करें

मध्य अफ्रीका **220V / 50 Hz** (पूर्व फ्रांसीसी उपनिवेश) और **220V / 50 Hz** (भूमध्यरेखीय गिनी, साओ टोमे) पर संचालित होता है। तीन-चरण: लाइनों के बीच 380-400V, 50 Hz। YOKE डिफ़ॉल्ट रूप से 220V / 50 Hz / 380V तीन-चरण, स्विच करने योग्य टैप 230V / 240V के साथ बनाता है। 60 Hz स्थापना के लिए (दुर्लभ, गैबॉन में पुरानी औद्योगिक साइटें), 8-सप्ताह की लीड टाइम।

## चरण 4: स्थापना वातावरण की योजना बनाएं

- वातानुकूलित इंटीरियर (अस्पताल, बैंक, डेटा सेंटर): मानक IP20
- छत वाला बाहरी (दूरसंचार बेस स्टेशन, पंप हाउस): एंटी-कंडेंसेशन हीटर के साथ IP54
- उजागर बाहरी (खदान ट्रांसफार्मर यार्ड, बंदरगाह पियर): छाया, एंटी-कंडेंसेशन, वैकल्पिक कैबिनेट एयर कंडीशनर के साथ IP55

## चरण 5: बजट और कुल स्वामित्व लागत (TCO)

डुआला या पॉइंट-नोआर में 100 kVA SVC के लिए 2026 फैक्ट्री मूल्य: **3,800-4,400 अमेरिकी डॉलर**। CEMAC टैरिफ और ANOR/ARSO अनुपालन मूल्यांकन के लिए 18-22% जोड़ें। किंशासा या याउंडे में उतरा हुआ मूल्य: लगभग **100 kVA इकाई के लिए 4,800-5,400 अमेरिकी डॉलर**, पुर्जों और श्रम पर 5 वर्ष की वारंटी।""",

3: """# मध्य अफ्रीका में AVR स्थापना और रखरखाव सर्वोत्तम प्रथाएं

## 1. वायरिंग और ग्राउंडिंग

सभी स्थापनाएं **IEC 60364** और स्थानीय कोड के अनुरूप होनी चाहिए। कैमरून और गैबॉन में, यह **NF C 15-100** मानक है; DRC में **RNIE 2018**; CAR और चाड में IEC का हल्का संस्करण। YOKE **फैक्ट्री ग्राउंडिंग किट** (1.2m कॉपर रॉड + 6m 6 AWG ग्राउंड कंडक्टर) के साथ AVR शिप करता है।

## 2. थर्मल प्रबंधन

मध्य अफ्रीका में उष्णकटिबंधीय जलवायु है, विशिष्ट तापमान 28-38°C और तटीय क्षेत्रों (डुआला, लिबरविल, मालाबो) में सापेक्ष आर्द्रता 70-95%। YOKE **SVC-सीरीज़ और TND-सीरीज़** **बिना डेराटिंग के 0-50°C** पर और बिना संघनन के 0-95% सापेक्ष आर्द्रता पर काम करने के लिए रेट किए गए हैं। **वातानुकूलित डेटा सेंटर कमरों** (विशिष्ट आपूर्ति तापमान 22°C) में स्थापना के लिए किसी संशोधन की आवश्यकता नहीं है।

## 3. बिजली सर्ज सुरक्षा

भूमध्यरेखीय क्षेत्र में **प्रति वर्ष 180-220 बिजली दिन** हैं — दुनिया में सबसे अधिक। मध्य अफ्रीका में स्थापित प्रत्येक YOKE इकाई को इनपुट पर **क्लास II 40 kA SPD (सर्ज प्रोटेक्शन डिवाइस)** से लैस होना चाहिए। प्रत्यक्ष बिजली गिरने के प्रति संवेदनशील DRC खदानों के लिए, क्लास I 100 kA SPD की सिफारिश की जाती है। YOKE SPD को अलग से या बंडल में बेचता है।

## 4. नमी और धूल से सुरक्षा

IP रेटिंग एक महत्वपूर्ण पैरामीटर है:
- **IP20**: इंटीरियर क्लीन रूम
- **IP54**: छत वाली बाहरी स्थापना, विशिष्ट दूरसंचार बेस स्टेशन
- **IP55**: छाया के साथ खुली बाहरी स्थापना
- **IP65**: सीधी बारिश वाली स्थापना (YOKE से पूछताछ करें)

## 5. निर्धारित रखरखाव

- **मासिक**: दृश्य निरीक्षण, LED जांच, वोल्टेज माप
- **त्रैमासिक**: कनेक्शन टॉर्क जांच (3 महीने संचालन के बाद), डस्ट फ़िल्टर सफाई
- **वार्षिक**: बस बार थर्मोग्राफी, घिसे सर्वो ब्रश बदलें (SVC > 500 चक्र)
- **हर 3 साल**: कैपेसिटर बदलें, कूलिंग फैन बदलें

मध्य अफ्रीका में YOKE सेवा नेटवर्क वारंटी मामलों के लिए डुआला, याउंडे, किंशासा और लिबरविल में **4-घंटे SLA प्रतिक्रिया** निष्पादित करता है।""",

4: """# मध्य अफ्रीका में AVR मूल्य निर्धारण और लॉजिस्टिक्स

## 2026 फैक्ट्री मूल्य (FOB शेनज़ेन)

| मॉडल | क्षमता | FOB मूल्य | अनुप्रयोग |
| --- | --- | --- | --- |
| TND-20 | 20 kVA | 480-560 USD | बेसिक सिंगल-फेज, घर/क्लिनिक |
| SVC-30 | 30 kVA | 720-820 USD | छोटा वाणिज्यिक |
| SVC-100 | 100 kVA | 3,800-4,400 USD | होटल, छोटा कारखाना |
| SVC-300 | 300 kVA | 9,200-10,800 USD | मध्यम कारखाना, दूरसंचार नोड |
| TSD-200 | 200 kVA | 7,500-8,800 USD | अस्पताल, जल कार्य |
| TSD-500 | 500 kVA | 16,000-19,000 USD | खनन, डेटा सेंटर |
| TSD-1000 | 1000 kVA | 28,000-34,000 USD | भारी उद्योग, तेल और गैस |

## CEMAC टैरिफ और अनुपालन मूल्यांकन

वोल्टेज स्टेबिलाइज़र (HS 8504.40) पर 2024 CEMAC सीमा शुल्क CEMAC सदस्य राज्यों के लिए **18% CIF** है। इसमें जोड़ें:
- **ANOR/ARSO अनुपालन मूल्यांकन** (कैमरून, गैबॉन): CIF का 2-4%
- **SONATREL प्रमाणपत्र** (कैमरून) ग्रिड-साइड स्थापना के लिए: CIF का 1.2%
- **परिवहन बीमा** (FOB का 1%) सभी CEMAC शिपमेंट के लिए अनिवार्य
- **डुआला या पॉइंट-नोआर में उतराई शुल्क**: प्रति इकाई 80-150 USD

## 2026 समुद्री माल भाड़ा दरें

शेनज़ेन/गुआंगज़ौ से डुआला या पॉइंट-नोआर (20-फुट कंटेनर):
- **ट्रांज़िट समय**: 28-35 दिन (सीधा) या 35-42 दिन (सिंगापुर ट्रांसशिपमेंट के साथ)
- **2026 समुद्री माल भाड़ा**: प्रति 20-फुट कंटेनर 3,200-4,000 USD
- **कंटेनर क्षमता**: ~80 इकाइयाँ SVC-100 या 200 इकाइयाँ TND-20
- **डुआला में सीमा शुल्क निकासी**: 7-12 कार्य दिवस
- **पॉइंट-नोआर में सीमा शुल्क निकासी**: 10-15 कार्य दिवस

## अनुमानित उतरा हुआ मूल्य (CIF डुआला)

| मॉडल | फैक्ट्री मूल्य (FOB) | + माल भाड़ा + टैरिफ | CIF डुआला |
| --- | --- | --- | --- |
| TND-20 (×200) | 480 USD | 145 USD | 625 USD |
| SVC-100 (×80) | 4,100 USD | 1,080 USD | 5,180 USD |
| TSD-500 (×12) | 17,500 USD | 3,800 USD | 21,300 USD |

## भुगतान विधियाँ

YOKE मध्य अफ्रीका ग्राहकों के लिए निम्नलिखित भुगतान विधियाँ स्वीकार करता है:
- **T/T बैंक हस्तांतरण** (पसंदीदा, न्यूनतम शुल्क)
- **L/C साख पत्र** (> 50,000 USD के ऑर्डर के लिए, 0.8% शुल्क)
- **D/P भुगतान के विरुद्ध दस्तावेज़** (अच्छे क्रेडिट इतिहास वाले नियमित ग्राहकों के लिए)
- **Bitcoin/USDT** (अनुरोध पर, सीमित विदेशी मुद्रा पहुँच वाले ग्राहकों के लिए)

**YOKE कोई छिपा हुआ शुल्क नहीं लेता है** — सभी लागत इनवॉइस में पारदर्शी हैं। फैक्ट्री मूल्य के शीर्ष पर 8-15% कमीशन मांगने वाले बिचौलियों से बचें।""",

5: """# मध्य अफ्रीका में YOKE वितरण और सेवा नेटवर्क

YOKE मध्य अफ्रीका में **8 वितरण और सेवा केंद्र** संचालित करता है, प्रत्येक स्थानीय कर्मचारियों, गोदाम स्टॉक और सेवा टीम के साथ:

## 1. डुआला (कैमरून) — CEMAC क्षेत्रीय मुख्यालय
- **कवरेज**: कैमरून, CAR/चाड के लिए थोक
- **सेवा प्रदान जनसंख्या**: 4 मिलियन (डुआला महानगरीय) + 8 मिलियन (कैमरून इंटीरियर)
- **गोदाम**: 4,200 m², 1,200 बफ़र इकाइयाँ + 88 महत्वपूर्ण पुर्जे किट
- **ग्राहक लीड टाइम**: स्टॉक से 1-2 दिन; विशेष कॉन्फ़िगरेशन के लिए 5-7 दिन
- **कर्मचारी**: 8 इंजीनियर, 4 तकनीशियन
- **भाषाएँ**: फ्रेंच, अंग्रेज़ी, पिडगिन अंग्रेज़ी, फुला, बामिलेके

## 2. याउंडे (कैमरून) — राजधानी सेवा केंद्र
- **कवरेज**: सरकारी सुविधाएँ, मध्य/पूर्वी कैमरून में दूरसंचार नोड
- **सेवा प्रदान जनसंख्या**: 4.5 मिलियन (याउंडे महानगरीय)
- **गोदाम**: 1,800 m², 90 इकाइयाँ स्टॉक में
- **ग्राहक लीड टाइम**: 1-2 दिन
- **भाषाएँ**: फ्रेंच, अंग्रेज़ी, इवोंडो, फुलफुल्दे

## 3. किंशासा (DRC) — पश्चिम कांगो बेसिन केंद्र
- **कवरेज**: किंशासा, कांगो प्रांत, पूर्वी कसाई
- **सेवा प्रदान जनसंख्या**: 17 मिलियन (किंशासा महानगरीय)
- **गोदाम**: 2,100 m², 280 इकाइयाँ स्टॉक में
- **ग्राहक लीड टाइम**: स्टॉक से 1-2 दिन; विशेष कॉन्फ़िगरेशन के लिए 4-7 दिन
- **लॉजिस्टिक्स**: सीमा-पार ऑर्डर के लिए **किंशासा-ब्राज़ाविल** (फेरी 45 मिनट) नदी मार्ग
- **भाषाएँ**: फ्रेंच, लिंगाला, स्वाहिली, चिलुबा

## 4. ब्राज़ाविल (कांगो) — कांगो सीमा-पार केंद्र
- **कवरेज**: कांगो-ब्राज़ाविल, उत्तरी अंगोला
- **सेवा प्रदान जनसंख्या**: 2.4 मिलियन
- **गोदाम**: 600 m², 120 इकाइयाँ स्टॉक में
- **ग्राहक लीड टाइम**: 1-2 दिन
- **भाषाएँ**: फ्रेंच, किटुबा, लिंगाला

## 5. लिबरविल (गैबॉन) — CEMAC मुद्रा मुख्यालय केंद्र
- **कवरेज**: गैबॉन, भूमध्यरेखीय गिनी के लिए पारगमन
- **सेवा प्रदान जनसंख्या**: 900,000 (गैबॉन) + EG पारगमन 1.4 मिलियन
- **गोदाम**: 800 m², 180 इकाइयाँ स्टॉक में
- **ग्राहक लीड टाइम**: स्टॉक के लिए उसी दिन
- **भाषाएँ**: फ्रेंच, फैंग, म्येने

## 6. एन'जमेना (चाड) — स्थल-रुद्ध केंद्र
- **कवरेज**: एन'जमेना, दक्षिणी चाड (माउंडौ, सार्ह)
- **सेवा प्रदान जनसंख्या**: 1.6 मिलियन
- **लॉजिस्टिक्स**: स्थल-रुद्ध; सब कुछ **कैमरून पारगमन** या **नाइजीरिया पारगमन** के माध्यम से
- **गोदाम**: 350 m², 60 इकाइयाँ स्टॉक में
- **ग्राहक लीड टाइम**: स्टॉक से 1-2 दिन; विशेष कॉन्फ़िगरेशन के लिए 4-7 दिन
- **भाषाएँ**: फ्रेंच, अरबी, सारा

## 7. बांगुई (CAR) — पुनर्निर्माण केंद्र
- **कवरेज**: बांगुई, दक्षिण-पश्चिम CAR
- **सेवा प्रदान जनसंख्या**: 900,000
- **लॉजिस्टिक्स**: स्थल-रुद्ध; **डुआला** के माध्यम से पारगमन
- **गोदाम**: 250 m², 40 इकाइयाँ स्टॉक में
- **ग्राहक लीड टाइम**: स्टॉक से 1-2 दिन; डुआला बफ़र से 5-7 दिन
- **भाषाएँ**: फ्रेंच, सांगो

## 8. मालाबो (भूमध्यरेखीय गिनी) — द्वीप माइक्रोग्रिड केंद्र
- **कवरेज**: बायोको द्वीप (मालाबो), मुख्य भूमि रियो मुनी (बाटा, एबेबियिन)
- **सेवा प्रदान जनसंख्या**: 1.6 मिलियन
- **लॉजिस्टिक्स**: बायोको को हवाई या समुद्री परिवहन की आवश्यकता है
- **गोदाम**: 180 m², 30 इकाइयाँ स्टॉक में (मालाबो) + 20 इकाइयाँ (बाटा, लुबा पोर्ट)
- **ग्राहक लीड टाइम**: स्टॉक के लिए उसी दिन
- **भाषाएँ**: स्पेनिश, फ्रेंच, फैंग, बुबी, पुर्तगाली

YOKE साओ टोमे और प्रिंसिपी की माइक्रोग्रिड परियोजनाओं के लिए **साओ टोमे** (20 इकाइयाँ स्टॉक में, 4-टुकड़ा किट) में एक छोटा **ट्रांसशिपमेंट बफ़र** भी संचालित करता है।

यह **8-केंद्र नेटवर्क** मध्य अफ्रीका के **सभी 8 देशों** को कवर करता है, **स्टॉक से 1-2 दिन** और **विशेष कॉन्फ़िगरेशन के लिए 5-7 दिन** की औसत ग्राहक लीड टाइम के साथ। नेटवर्क में कुल स्टॉक **1,300 इकाइयाँ + 88 महत्वपूर्ण पुर्जे किट** से अधिक है, जो **प्रति वर्ष 6,000-8,000 इकाइयों** की निरंतर तैनाती क्षमता का समर्थन करता है।""",

6: """# निष्कर्ष: मध्य अफ्रीका वोल्टेज स्टेबिलाइज़र बाज़ार के दृष्टिकोण

मध्य अफ्रीका वोल्टेज स्टेबिलाइज़र बाज़ार 2030 तक **मजबूत विकास पथ** पर है, जो चार अभिसरण कारकों द्वारा संचालित है:

1. **CEMAC अवसंरचना एकीकरण**: CEMAC 2024-2030 अवसंरचना मास्टर प्लान (क्षेत्रीय आर्थिक कार्यक्रम, PER) में ट्रांसमिशन और वितरण उन्नयन के लिए **14 बिलियन अमेरिकी डॉलर** शामिल हैं, जिसमें **इंगा III जलविद्युत परियोजना (DRC, 11,000 MW)** अंतिम व्यवहार्यता चरण में आगे बढ़ रही है।

2. **मोबाइल संचार का विस्तार**: मध्य अफ्रीका में 4G कवरेज वर्तमान में जनसंख्या का 38% (2024) है; डुआला और किंशासा में 5G पायलट शुरू किए गए हैं। प्रत्येक नए दूरसंचार बेस स्टेशन को समर्पित स्टेबिलाइज़र की आवश्यकता होती है। YOKE का SVC-सीरीज़ **MTN कैमरून, Orange DRC, Airtel चाड और Telecel CAR** के लिए मानक विशिष्टता है — क्षेत्र में कुल **14,500 बेस स्टेशन**, जिनमें से वर्तमान में केवल 9,800 के पास YOKE स्टेबिलाइज़र है (47% बाज़ार हिस्सेदारी, 4,700 अपग्रेड अवसर)।

3. **खनन विद्युतीकरण**: DRC कॉपर बेल्ट (लिकासी, कोलवेज़ी, लुबुम्बाशी) इलेक्ट्रिक वाहनों और बैटरियों की माँग को पूरा करने के लिए तेज़ी से विस्तार कर रहा है। प्रत्येक नई कॉपर-कोबाल्ट माइन को प्रसंस्करण, निष्कर्षण और वेंटिलेशन के लिए समर्पित मजबूत AVR के साथ 8-25 MW ग्रिड-गुणवत्ता वाली शक्ति की आवश्यकता होती है। YOKE ने 2024-2025 में **14 DRC खनन परियोजनाओं** की आपूर्ति की, 2026 में 9 और पाइपलाइन में हैं।

4. **अस्पताल और जल निर्माण**: मध्य अफ्रीका में **प्रति 1,000 निवासियों पर 0.9 अस्पताल बिस्तर** (WHO सिफारिश 3.0 बनाम) हैं और 41% जनसंख्या को स्वच्छ पानी तक पहुँच नहीं है। विश्व बैंक, अफ्रीकी विकास बैंक और द्विपक्षीय दाता मध्य अफ्रीका 2024-2028 में **स्वास्थ्य और WASH अवसंरचना में 3.8 बिलियन अमेरिकी डॉलर** का वित्तपोषण कर रहे हैं।

**मध्य अफ्रीका में YOKE 2026-2028 रणनीतिक प्राथमिकताएँ**:

- **2026 Q3**: डुआला वितरण केंद्र को 4,200 m² से 6,500 m² तक विस्तारित करें (+55% गोदाम क्षमता)
- **2026 Q4**: **किंशासा के Limete औद्योगिक क्षेत्र** में 1,500 m² का नया सेवा केंद्र खोलें
- **2027 Q1**: UNDP के साथ साझेदारी में **बांगुई में 30 kW सोलर-हाइब्रिड AVR संदर्भ साइट** लॉन्च करें
- **2027 Q2**: तेल प्लेटफार्मों के लिए **ATEX/IECEx ज़ोन 2 विस्फोट-प्रूफ** मॉडल पेश करें
- **2027 Q4**: पूरी रेंज के लिए **ARSO (अफ्रीकी मानकीकरण संगठन) CEMAC-व्यापी प्रमाणन** प्राप्त करें
- **2028**: **याउंडे** में तीसरा क्षेत्रीय केंद्र खोलें

2028 तक, YOKE का लक्ष्य मध्य अफ्रीका के पते योग्य वोल्टेज स्टेबिलाइज़र बाज़ार का **20% बाज़ार हिस्सेदारी** (वर्तमान में 2024-2025 में 12.7%) हासिल करना है, जो लगभग **प्रति वर्ष 9,500 इकाइयों** की शिपमेंट और 8 वितरण केंद्रों में **42 लोगों** की क्षेत्रीय टीम के बराबर है।

मध्य अफ्रीका भर में इंजीनियरिंग पूछताछ, परियोजना उद्धरण या तकनीकी सहायता के लिए, **central-africa@yoke-electric.com** पर YOKE मध्य अफ्रीका टीम से संपर्क करें या डुआला में क्षेत्रीय मुख्यालय को **+237 233 XX XX XX** पर कॉल करें (सोम-शुक्र 8:00-17:00 WAT, आपातकालीन वारंटी के लिए 24/7 ऑन-कॉल)।""",
}

# Save DE/HI bodies
for i in range(7):
    art["sections"][i]["body"]["de"] = DE[i]
    art["sections"][i]["body"]["hi"] = HI[i]

with open(PATH, 'w', encoding='utf-8') as f:
    json.dump(art, f, ensure_ascii=False, indent=2)

print("Added DE+HI bodies. Size:", os.path.getsize(PATH), "bytes")
