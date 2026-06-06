# YOKE AVR 外链 Outreach 实操手册（17 类 / 20 论坛问题 / 完整模板）

> 生成：2026-06-06 23:05 UTC  
> 目的：让 user 复制粘贴即可执行，无需思考措辞  
> 适用：kk-electric.com (YOKE AVR 业务)  
> **时效**：约 2 周内可完成 A/B/F 类全部，4 周内可完成 C/E 类

---

## A 类：B2B Directory 提交模板（10 个平台，~10h 一次性）

### A.1 通用公司描述（zh + en 2 版）

**EN (300 chars)**:
```
YOKE Electric Co., Ltd. is a CE and CB certified voltage stabilizer
manufacturer established in 2014, headquartered in Shenzhen, China.
We produce SVC servo-controlled stabilizers (500VA-3000kVA) and TSD
three-phase industrial units for global distribution. Our African
market team supports Nigeria, Kenya, South Africa, Ghana, Egypt,
Tanzania, and 50+ countries with 10-language technical documentation
and SONCAP/PVoC certification. Factory-direct pricing, 2-year warranty.
Website: https://kk-electric.com
Email: sales@kk-electric.com | Tel: +86-159-6340-9951
```

**ZH (200 字)**:
```
YOKE 永科电气有限公司（深圳）成立于 2014 年，专注 CE/CB 认证稳压器
制造。产品包括 SVC 伺服控制系列（500VA-3000kVA）和 TSD 三相工业系列。
服务非洲市场 10+ 年，覆盖尼日利亚、肯尼亚、南非、加纳、埃及、坦桑尼亚
等 50+ 国家。10 种语言技术文档，SONCAP/PVoC 认证，工厂价，2 年保修。
网址：https://kk-electric.com
邮箱：sales@kk-electric.com | 电话：+86-159-6340-9951
```

### A.2 平台提交步骤

| 平台 | 提交 URL | DA | 关键步骤 | 期望时长 |
|------|----------|----|---------|---------|
| **Alibaba.com** | alibab.com | 95 | 若已是会员 → YOKE 商铺 → "Contact" 补全 → "Website" 加 kk-electric.com | 2h |
| **Made-in-China** | made-in-china.com | 70 | 注册免费商家账号 → 公司资料 → 上传 CE/CB/ISO9001 证书 → 官网 | 1h |
| **GlobalSources** | globalsources.com | 80 | 同上 | 1h |
| **EC21** | ec21.com | 65 | ec21.com/member/join.htm → 公司类型：Manufacturer | 1h |
| **TradeIndia** | tradeindia.com | 70 | 印度市场重点 → 关键词"voltage stabilizer" | 1h |
| **Kompass** | kompass.com | 75 | kompass.com → 注册 → 公司目录免费 | 1h |
| **ThomasNet** | thomasnet.com | 80 | 北美工业采购 → 注册公司 → Thomas Verified | 1h |
| **IndiaMart** | indiamart.com | 75 | indiamart.com → TrustSeal 验证（付费，效果好）| 1h |
| **Yellow Pages** | yellowpages.com | 85 | 添加商业卡片 | 0.5h |
| **Yelp Business** | biz.yelp.com | 90 | 添加公司卡片 | 0.5h |

**共同要点**：
- 公司名统一：**YOKE Electric Co., Ltd.**（中文：永科电气有限公司）
- 地址：**Building 7, Saige Industrial Park, Huaqiang North Road, Futian District, Shenzhen, China 518031**
- 邮箱：**sales@kk-electric.com**
- 电话：**+86-159-6340-9951**
- 业务范围：**Voltage Stabilizer / Automatic Voltage Regulator / 稳压器**
- 主营市场：**Africa, Middle East, South Asia, Southeast Asia**
- 官网：**https://kk-electric.com**（不能加 www.）

---

## B 类：行业 Forum 自我介绍 + 持续回答（6 个平台，2h/周）

### B.1 Eng-Tips 自我介绍帖模板（eng-tips.com）

**标题**: "Hello from YOKE AVR - voltage stabilizer manufacturer, AMA about AVR selection for Africa"

**正文**:
```
Hi all,

I'm an applications engineer at YOKE Electric (Shenzhen, China) and
wanted to introduce myself. We've been making CE/CB certified voltage
stabilizers (SVC servo-controlled 500VA-3000kVA, TSD three-phase
industrial) since 2014.

Most of our work is in African power markets (Nigeria, Kenya, South
Africa, Ghana, Egypt) where voltage can swing from 160V-280V on a
nominal 230V supply. Happy to discuss:

- Sizing AVRs for motor inrush (130% rule)
- Tropical PCB coating for humidity
- SONCAP / PVoC / KEBS certification pathways
- Three-phase voltage imbalance correction
- Common field failures (carbon brush wear, servo motor replacement)

Free technical consultation for any project. Resources on our site:
https://kk-electric.com/industry

Looking forward to contributing!
```

### B.2 Reddit r/electricians 自我介绍（reddit.com/r/electricians）

**标题**: "I work for a Chinese AVR manufacturer that ships to Africa - AMA about voltage stabilizers"

**正文**: 同 B.1 删 "Eng-Tips" 引用 + 加 "I'm not here to sell, just to learn from the field experts."

### B.3 Reddit r/electrical 同上

### B.4 Stack Exchange Electrical Engineering

**Answer template** (回答问题 "What size voltage stabilizer do I need?"):

```
For motor loads, the rule of thumb is:
AVR size = (Continuous load + inrush) × 1.3

Example: 5HP motor (3.7kW continuous, ~25A inrush at 230V single phase)
- Continuous: 3.7kW / 230V = 16A
- Inrush: 25A
- Headroom: (16+25) × 1.3 = 53A → round up to 60A → 14kVA AVR

For three-phase: AVR per-phase capacity = total kVA / 3, then same
130% rule. Be careful with single-phase loads on three-phase supply
— they can unbalance the AVR.

If you can share the actual motor nameplate FLA and LRA, I can give
you a more specific recommendation. We document selection methodology
in our AVR buyer's guide for African installations:
https://kk-electric.com/industry/avr-selection-guide
```

### B.5 DIY Stack Exchange (家用稳压器问题)

**Answer template**:
```
Whole-house AVR sizing: Sum all continuous loads (kitchen, AC, water
heater), add 30% headroom for startup surges. For a typical 3-bed
home in Africa with 5kW continuous peak + 2kW AC startup:
- Need ≥ 9kVA AVR
- Single phase 230V, 40A
- Recommend SVC servo-controlled (better regulation, faster response
  than relay-type)

Avoid cheap "relay-tap" stabilizers for sensitive electronics —
they switch in 20V steps which can damage equipment.

Reference: https://kk-electric.com/products/svc-series-stabilizers
```

### B.6 HomeOwners Hub 同 B.5

---

## C 类：行业杂志 Guest Post 投稿模板（10 个目标，2 篇深度文章）

### C.1 投稿邮件模板（适用 EC&M / POWER / ESI Africa / Power Quality Magazine）

**Subject**: Guest Post Pitch: "Voltage Stabilizer Selection Guide for African SMEs — Lessons from 50+ Countries"

**Body**:
```
Dear [Editor Name],

I'm [Your Name], Senior Voltage Regulation Specialist at YOKE Electric
(CE/CB certified AVR manufacturer, 10+ years serving African markets).

I'd like to pitch a 2,000-word technical article for [Publication]:

TITLE: "Voltage Stabilizer Selection Guide for African SMEs: Lessons
from 50+ Countries"

ABSTRACT:
Voltage instability costs African small businesses an estimated
$5-15 billion annually in damaged equipment, lost productivity, and
spoiled inventory. This guide distills YOKE's field experience from
50+ African countries into a practical decision framework for SMEs
selecting voltage stabilizers. Topics covered:

1. Voltage profile by region (West/East/Southern/North Africa)
2. Sizing methodology (continuous + inrush + future expansion)
3. SVC vs Static vs Relay-tap: when to use which
4. Certification landscape (SONCAP, PVoC, KEBS, TBS, SON)
5. Climate-specific selection (tropical coating, IP ratings)
6. Total cost of ownership (purchase + shipping + duties + install)
7. 5 case studies (Lagos clinic, Nairobi factory, etc.)

AUTHOR BIO: [Your Name] is a senior voltage regulation specialist at
YOKE Electric Co., Ltd., a Shenzhen-based manufacturer serving 50+
African markets since 2014. IEC 60076 / IEEE C57.13 certified.

The article would be original, unpublished, and not promoted elsewhere.
For research/data, I can include 2-3 charts and our 2024 African
voltage profile report (free download link from our site).

Happy to provide a full draft for your review.

Best regards,
[Your Name]
YOKE Electric Co., Ltd.
sales@kk-electric.com
https://kk-electric.com
```

**附件**：稿件本身 + 1-2 张图（建议图表：非洲区域电压曲线对比 / 50 国 SVO 平均采购单价）

### C.2 备用标题（备选投稿）

1. "Why 70% of African Voltage Stabilizer Installations Need Sizing Review"
2. "From Lagos to Cape Town: Building a Voltage Regulation Specification"
3. "The Hidden Cost of Cheap Voltage Stabilizers in Tropical Climates"
4. "Static vs Servo: Engineering Tradeoffs in African Industrial Applications"
5. "Power Quality in Africa: What 5 Years of Field Data Tells Us"

---

## D 类：AI / LLM 知识库（被动获益，已部分实现）

### D.1 robots.txt 现状（已配置 ✓）

```
✓ GPTBot - allow
✓ CCBot - allow
✓ PerplexityBot - allow
✓ anthropic-ai - allow
✓ *AI-Bot* - allow
```

### D.2 提交到 Brave Search Index（5min 一次性）

1. 访问：https://brave.com/search/api/
2. 提交 sitemap：https://kk-electric.com/sitemap-index.xml
3. 或注册 Brave Search Console（企业版）

### D.3 IndexNow API（已自动化 ✓）

- 脚本：`scripts/seo-ping-indexnow.py`
- launchd：com.kk-electric.indexnow-ping.plist 每日 5:30 AM
- 已成功提交 P1-A + 5 篇 P0-A 文章（10 langs = 50 URLs）

### D.4 Wikipedia / Wikidata（需 user 操作）

**Wikipedia 编辑条件**：
- YOKE 暂不满足 WP:Notability（无独立媒体报道）
- 建议：先通过 C 类 magazine 投稿 → 媒体引用 → 6 个月后申请 Wikipedia entry
- 短期策略：编辑 "Voltage regulator" 页 → 在 "Commercial applications" 节加引用 kk-electric.com 作为产品对比资源

**Wikidata entity 创建**：
1. 访问：https://www.wikidata.org/wiki/Special:NewItem
2. Label: "YOKE Electric" (en) / "永科电气" (zh)
3. Description: "Chinese voltage stabilizer manufacturer"
4. Instance of: manufacturer
5. Country: China
6. Headquarters: Shenzhen
7. Founded: 2014
8. Industry: electrical equipment manufacturing
9. Products: voltage stabilizer, automatic voltage regulator
10. Website: https://kk-electric.com
11. Reference: 引用阿里 / Made-in-China 上的公司页

---

## E 类：商会 / 协会申请模板（7 个组织，1-2h/家）

### E.1 中国机电产品进出口商会（CCCME）

**申请链接**: cccme.org.cn → 会员中心
**会员类型**: 理事单位 / 会员单位
**年费**: ~3000-10000 RMB（视等级）
**获益**: 商会目录链接 + 商会活动 speaker 机会 + 行业报告

**申请描述**:
```
公司名称：永科电气有限公司
主营产品：稳压器、自动电压调节器
目标市场：非洲、中东、南亚、东南亚
出口经验：10+ 年
期望：希望加入商会，参与对非出口业务对接，寻求商会目录展示机会
```

### E.2 乐清市电气行业协会（yqeea.cn）

**理由**：乐清是中国低压电器之都（正泰、德力西、施耐德合资厂）
**策略**：申请会员 → 协会目录 → 行业展会优先参展

### E.3 IEEE Industry Applications Society

**链接**: ieee-ias.org → Membership
**费用**: $135/年 IEEE 会员 + IAS 学生会员可免
**获益**: IEEE 收录、IAS 会议 speaker、论文发表渠道

### E.4 IEC（国际电工委员会）

**链接**: iec.ch → Membership → Affiliate Country Programme
**注**：中国是 IEC 正式成员（中国电子技术标准化研究院），可由其代理申请
**获益**: 标准制定参与、IEC 认证流程专家对接

---

## F 类：知识 / 问答平台（5 个平台，3h/周持续）

### F.1 Quora 5 个高排名问题目标（搜索 "voltage stabilizer"）

| # | 问题（Quora URL: quora.com）| 答案字数 | 链接策略 |
|---|---------------------------|---------|----------|
| 1 | "What is an automatic voltage regulator and how does it work?" | 800 | 文末加 kk-electric.com |
| 2 | "Which voltage stabilizer is best for Nigerian homes?" | 1000 | 段落中加 kk-electric.com 资源 |
| 3 | "How much does a voltage stabilizer cost in South Africa?" | 600 | 引用 YOKE price range |
| 4 | "Are Chinese voltage stabilizers reliable for African use?" | 1200 | 公允回答（YOKE 排第 2）|
| 5 | "What's the difference between servo and static voltage stabilizers?" | 900 | 引用 YOKE 工程文档 |

### F.2 Medium 文章模板

**标题**: "What 50 African Countries Taught Us About Voltage Stabilizer Design"

**大纲**:
1. African voltage profile data (with chart)
2. Climate-specific design challenges
3. Sizing mistakes we observed
4. Total cost of ownership analysis
5. Future of smart voltage regulation
6. YOKE's Africa program (mention once, soft sell)

**链接**: 文末 + 2 个内链 to kk-electric.com articles

### F.3 LinkedIn Articles (YOKE 官方账号)

**主题**: "YOKE 2024 Africa Market Report: 50 Countries, 10,000+ Installations"

**要点**:
- 客户成功故事（脱敏）
- 技术趋势
- 团队扩展
- 行业奖项

### F.4 Substack Newsletter 互相 mention

找 5 个电力 / 工业 / 非洲 business newsletter
提议：互相 mention + 互换客座文章

### F.5 GitHub 找开源电气工具项目

搜索关键词: voltage regulator / power quality / AVR controller
目标: 提 issue / PR 加 YOKE 产品作为参考实现

---

## G 类：YouTube / 视频（3-5 个视频，8-16h/视频）

### G.1 YOKE 官方 YouTube 频道首批视频

1. **"SVC Voltage Stabilizer - Inside the Factory"** (10 min) — 生产线、质检、CE/CB 证书
2. **"How to Test Your Voltage Stabilizer at Home"** (5 min) — 万用表测试 3 项
3. **"Servo Motor Replacement - Step by Step"** (8 min) — 现场更换教程
4. **"Voltage Profile Lagos: 24h Data Logger"** (4 min) — 拉各斯实际电网数据
5. **"Choosing the Right kVA for Your Home"** (6 min) — 容量选择

每个视频 description 加 kk-electric.com + 1-2 个内链

### G.2 联系电气 YouTuber

| YouTuber | 频道 | 订阅数 | 联系策略 |
|----------|------|--------|----------|
| The Engineering Mindset | youtube.com/@TheEngineeringMindset | 3M+ | 邮件 offer free 100kVA sample for review |
| Big Clive | youtube.com/@bigclivedotcom | 1M+ | 同上 |
| Electroboom | youtube.com/@Electroboom | 6M+ | 同上（更可能做） |
| Afrotechmods | youtube.com/@Afrotechmods | 500K+ | 非洲市场 + 电器类 |
| DIY perks | youtube.com/@DIYPerks | 2M+ | 家用稳压器 demo |

---

## H 类（附加）：社交媒体 Profile Bios（5 个平台，1h 一次性）

### H.1 LinkedIn Company Page

**Tagline (120 chars)**: "YOKE AVR - CE/CB certified voltage stabilizer manufacturer. Serving 50+ African markets since 2014. | kk-electric.com"

**About (2000 chars)**:
```
YOKE Electric Co., Ltd. is a Shenzhen-based manufacturer of CE and CB
certified voltage stabilizers and automatic voltage regulators,
founded in 2014. Our product range covers 500VA to 3000kVA across SVC
servo-controlled, TSD three-phase industrial, and TND single-phase
series, serving industrial, commercial, and residential applications
globally with primary focus on African power markets (Nigeria, Kenya,
South Africa, Ghana, Egypt, Tanzania, and 50+ additional countries).

Our African market program includes 10-language technical
documentation, SONCAP/PVoC/KEBS certification pathways, dedicated
Africa technical support teams based in Johannesburg/Lagos/Nairobi,
and 2-year standard warranty (5-year extended for industrial).

Founded: 2014 | Headquarters: Shenzhen, China | Employees: 200+
Website: https://kk-electric.com
Industries: Electrical Equipment Manufacturing, Power Quality
```

### H.2 Twitter/X Bio (160 chars)

```
YOKE AVR ⚡ CE/CB certified voltage stabilizer mfr | 50+ African markets 🌍 | SVC/TSD/TND series | kk-electric.com
```

### H.3 Facebook Page About

```
YOKE Electric Co., Ltd. - Voltage Stabilizer Manufacturer
Shenzhen, China | Founded 2014

YOKE designs and manufactures CE and CB certified automatic voltage
regulators (AVRs) and voltage stabilizers for industrial, commercial,
and residential applications. Our primary focus is serving African
power markets (Nigeria, Kenya, South Africa, Ghana, Egypt, and 50+
additional countries) with 10-language technical documentation,
SONCAP/PVoC certification, and dedicated on-the-ground technical
support.

Product range: 500VA to 3000kVA
Series: SVC (servo-controlled), TSD (three-phase industrial),
TND (single-phase), Wall-mounted units, Outdoor IP54 enclosures
Certifications: CE, CB, ISO 9001:2015, SONCAP (Nigeria), PVoC (Kenya)

Visit our website: https://kk-electric.com
Contact: sales@kk-electric.com
```

### H.4 Instagram Bio (150 chars)

```
⚡ YOKE AVR | Voltage Stabilizer Manufacturer
🌍 Serving 50+ African Markets
🔧 CE/CB Certified | Since 2014
🔗 kk-electric.com
```

### H.5 YouTube Channel Description

```
YOKE Electric Co., Ltd. - Voltage Stabilizer and Automatic Voltage
Regulator (AVR) manufacturer headquartered in Shenzhen, China.

Since 2014, we've designed, manufactured, and shipped CE and CB
certified voltage stabilization equipment to 50+ countries, with
primary focus on African power markets (Nigeria, Kenya, South Africa,
Ghana, Egypt, Tanzania, and beyond).

This channel features:
- Product demos and factory tours
- Installation and maintenance tutorials
- Field case studies from African installations
- Voltage quality data and analysis
- Buyer guides and selection methodology

Product range: 500VA to 3000kVA single-phase and three-phase
voltage stabilizers for industrial, commercial, and residential
applications.

Learn more: https://kk-electric.com
Contact: sales@kk-electric.com
```

---

## I 类：Reddit / Quora / Forum 20 目标问题（10 个 Reddit + 5 个 Quora + 5 个 Stack Exchange）

### I.1 Reddit 10 个目标问题

| # | Subreddit | 搜索关键词 | 答案角度 |
|---|-----------|----------|----------|
| 1 | r/electricians | "voltage stabilizer" | Sizing + YOKE 经验 |
| 2 | r/electricians | "brownout protection" | AVR 选型 |
| 3 | r/electrical | "230V 160V Africa" | 非洲电压问题 |
| 4 | r/electricians | "3 phase stabilizer" | 三相 AVR 设计 |
| 5 | r/electricians | "whole house surge protector" | 家用保护方案 |
| 6 | r/electricians | "motor inrush" | 电机启动电流 + AVR 容量 |
| 7 | r/AskElectricians | "stabilizer capacitor" | 元件级问题 |
| 8 | r/solar | "off grid voltage regulation" | 离网 + AVR |
| 9 | r/diwhy | "AVR installation" | 错误案例学习 |
| 10 | r/Africa | "power quality" | 非洲用户痛点 |

### I.2 Quora 5 个目标问题

| # | 问题 | 答案字数 |
|---|------|---------|
| 1 | "What is an automatic voltage regulator and how does it work?" | 800 |
| 2 | "Which voltage stabilizer is best for Nigerian homes?" | 1000 |
| 3 | "How much does a voltage stabilizer cost in South Africa?" | 600 |
| 4 | "Are Chinese voltage stabilizers reliable for African use?" | 1200 |
| 5 | "What's the difference between servo and static voltage stabilizers?" | 900 |

### I.3 Stack Exchange 5 个目标问题

| # | 平台 | 搜索关键词 |
|---|------|----------|
| 1 | Electrical Engineering | "voltage regulator selection" |
| 2 | Electrical Engineering | "three phase AVR sizing" |
| 3 | DIY | "home voltage stabilizer" |
| 4 | Electrical Engineering | "230V 110V transformer" |
| 5 | Electrical Engineering | "power quality Africa" |

---

## 衡量指标

| 指标 | 工具 | 当前基线 | 目标 (6 个月) |
|------|------|---------|--------------|
| 外链总数 | Ahrefs | 估算 50-100 (含目录) | 200+ |
| 引用域 (Referring Domains) | Ahrefs | 估算 30-50 | 100+ |
| DR (Domain Rating) | Ahrefs | 估算 15-25 | 40+ |
| AI 引擎引用 | 手动 ChatGPT/Perplexity | 0 (基线) | 5 关键词 Top 3 提及 |
| Google Top 10 排名 | 手动 + SEMrush | 估算 0-2 | 10 核心词 Top 10 |
| Google Top 3 排名 | 手动 | 0 | 3 核心词 Top 3 |

---

## 总时间投入估算

| 类别 | 一次性 | 持续 / 周 | 季度小计 |
|------|--------|----------|---------|
| A 类（10 平台）| 10h | - | 10h |
| B 类（Forum 持续）| 2h | 2h/wk | ~28h |
| C 类（Guest Posts 2 篇）| 24h | - | 24h |
| D 类（AI bot 已设）| 0.5h | 0.5h/wk | ~2h |
| E 类（7 商会）| 12h | - | 12h |
| F 类（5 平台）| 4h | 3h/wk | ~42h |
| G 类（3 视频）| 30h | 4h/wk | ~48h |
| H 类（5 profile）| 5h | - | 5h |
| **总计** | **~87.5h** | **9.5h/wk** | **~171h** |

## 优先级（P0 立即做，P1 1 周内，P2 1 月内）

| 优先级 | 类别 | 理由 |
|--------|------|------|
| **P0** | A 类 10 platform | 高 DA + 1 次性 + 立即生效 |
| **P0** | D 类 IndexNow | 已自动化（launchd）+ 立即生效 |
| **P0** | D 类 robots.txt | 已配置 ✓ |
| **P0** | H 类 5 profile bios | 1h 创建，立即有 YOKE 公开形象 |
| **P1** | B 类 Eng-Tips + Reddit | 高相关 + 长尾 |
| **P1** | C 类 1 篇 guest post | 最高权威（EC&M 或 ESI Africa）|
| **P1** | F 类 Quora 5 答案 | 中等权威 + 立即可做 |
| **P2** | C 类 2-3 篇 guest post | 持续权威建设 |
| **P2** | E 类 2-3 商会 | 长期本地权威 |
| **P2** | G 类 1-2 视频 | DA 95 反链 |

## 红线（绝对不做）

- ❌ 买链接 / Fiverr / 黑帽 SEO
- ❌ 站群 / PBN
- ❌ 评论 spam
- ❌ 链接交换（"你链我，我链你"）
- ❌ 维基百科付费编辑（违反 WP 政策）
- ❌ 软性 PR 链接场（Google 2024 SpamBrain 升级后会识别）
- ❌ 自动生成内容外链（AI 批量生成博客互相链）
