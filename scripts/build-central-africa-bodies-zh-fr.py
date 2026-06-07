#!/usr/bin/env python3
"""Add 9-language body translations to central-africa-avr-trade.json (final step)."""
import json
import os
from collections import OrderedDict

PATH = 'content/articles/central-africa-avr-trade.json'
with open(PATH, 'r', encoding='utf-8') as f:
    art = json.load(f, object_pairs_hook=OrderedDict)

# =================== CHINESE ===================
ZH = {
0: """# 中非稳压器（AVR）市场概览

中非稳压器（AVR）市场在 2026 年达到 **1.85 亿美元** 年度规模，覆盖 **CEMAC**（中部非洲经济与货币共同体）经济货币区 **8 个国家**，总人口超过 **2.2 亿**：刚果民主共和国（DRC）、喀麦隆、刚果共和国、加蓬、乍得、中非共和国（CAR）、赤道几内亚、圣多美和普林西比。

中非市场的独特性体现在三大结构因素：

1. **水电依赖与季节性**：刚果河流域（DRC、刚果布）和萨纳加河（喀麦隆）贡献区域 **60-70%** 电力，但季节性水位变化（6-10 月南方支流低流量）造成 ±25% 电压波动。
2. **大西洋港口集中**：中非进口物流通过 **杜阿拉**（喀麦隆，服务乍得、CAR、北刚果金）和 **黑角**（刚果布，服务 DRC 西部省和刚果共和国）两个港口。
3. **后冲突重建需求**：CAR、DRC 东部、喀麦隆北部均需重型 3 相伺服 AVR 支援医院、水务、移动回程。

根据 IEA《2024 非洲能源展望》，中非是 **人均电力质量设备未满足需求最高** 的非洲次区域：首都以外仅 9% 商业机构拥有专用稳压器（西非 23%，南部非洲 38%）。

YOKE 自 2018 年积极服务中非。2024-Q4 至 2026-Q1 部署数据：**3,140 台发往中非（占非洲出货 14%）**，分国分布：
- 刚果金：1,180 台（37.6%）
- 喀麦隆：720 台（22.9%）
- 刚果布：410 台（13.1%）
- 加蓬：380 台（12.1%）
- 乍得：240 台（7.6%）
- 中非：90 台（2.9%）
- 赤道几内亚：90 台（2.9%）
- 圣多美和普林西比：30 台（1.0%）

本文涵盖电力质量挑战、AVR 选型标准、安装最佳实践及 YOKE 在该区域维持的 **8 个战略分销中心**。""",

1: """# 中非电力质量挑战与 AVR 选型

中非电力质量由三大宏观因素决定：发电组合、输电距离、负载多样性。

## 1. 水电季节性变化

刚果河流域和萨纳加河水电站提供稳定频率（50 Hz ±0.5 Hz）但可变电压。在 **金沙萨（DRC）**，Inga I 和 Inga II 水坝向西部电网供电，旱季容量降至铭牌 65%，导致 **棕相电压 175-195 V**。**雅温得（喀麦隆）** Sonatrel 电网调节更好，但在 30-50 km 33 kV 馈线末端仍波动 200-235 V。

推荐 YOKE 产品：
- **TND 系列单相稳压器**（1-30 kVA）：家庭、诊所、低压区零售（175-200 V 范围）
- **SVC 系列伺服稳压器**（10-500 kVA）：商业/轻工业场所，需在 150-260 V 宽输入范围 ±1% 输出精度
- **TSD 三相稳压器**（30-2000 kVA）：医院、电信、水处理、矿业

## 2. 长距离输电损耗

中非电网相对其领土**输电不足**。区域最长的 225 kV 线路是 DRC 境内 **1,100 km Inga-Kolwezi 高压走廊**，将 Inga 电力输送到铜带矿区。线路中段在负载下可能跌至 198 V（标称 225 V 的 88%）。对 DRC 铜带（Likasi、Kolwezi、Lubumbashi）矿业客户，YOKE 推荐 **SVC 系列 ±15% 输入窗口 + 5 秒穿越能力**。

## 3. 柴油发电机共存

主要城市外 60-70% 商业机构采用**柴油发电机 + 电网**混合配置。在班吉（CAR）、恩贾梅纳（乍得）、马拉博（赤道几内亚），柴油发电是主电源，AVR 用于清理波形。发电机产生 **8-15% THD** 和 **±2 Hz 频率漂移**，需：
- 宽输入频率窗口（45-65 Hz）
- 快速响应（< 20 ms）
- 5x 标称浪涌耐受以应对电机启动

**SVC 系列和 TSD 三相**均支持发电机运行，**总谐波失真（THD）> 20%** 站点可选输入隔离变压器。

## 4. 赤道几内亚和圣多美：岛屿微电网

赤道几内亚（Bioko 岛）和圣多美运行**孤岛微电网**（柴油 + 近期新增太阳能-混合）。YOKE **SVC 系列孤岛模式固件**是这些场所的默认推荐。

对赤道几内亚近海油气平台，YOKE 应要求另外提供 **ATEX/IECEx Zone 2 防爆外壳**。""",

2: """# 如何为中非应用选型稳压器

## 步骤 1：测量输入电压包络

使用**3 天记录式电压表**（Fluke 1730 或同等）于电表负载侧。中非典型观察值：
- 金沙萨、布拉柴维尔、利伯维尔、马拉博：195-240 V
- 雅温得、杜阿拉：200-235 V
- 恩贾梅纳、班吉：170-230 V
- DRC 铜带（Lubumbashi、Kolwezi）：198-225 V（电表处），频繁亚周期跌落至 175 V

输入窗口 > ±20% 标称值时需**伺服型稳压器**（SVC 或 TSD）。

## 步骤 2：确定负载特征

三种负载原型：
- **感性重载**（HVAC、水泵、电梯、工业电机）：需 3-5x 瞬时浪涌
- **敏感电子负载**（医疗成像、电信基站、服务器机房）：需 ±1% 输出精度、< 20 ms 响应
- **混合住宅-商业**：典型 5-30 kVA 单相

## 步骤 3：确认电源配置

中非运行在 **220 V / 50 Hz**（前法国殖民地）和 **220 V / 50 Hz**（赤道几内亚、圣多美）。3 相为 380-400 V 线间、50 Hz。YOKE 标配 220 V / 50 Hz / 380 V 3 相，预留 230 V / 240 V 选择抽头。60 Hz 旧设施（罕见，主要为加蓬老工业）需订单注明，交期 8 周。

## 步骤 4：规划安装环境

- 室内受控（医院、银行、数据中心）：标准 IP20
- 室外有遮蔽（电信基站、水泵房）：IP54 + 防凝露加热器
- 室外暴露（矿区变压器场、码头）：IP55 + 遮阳 + 防凝露 + 可选机柜空调

## 步骤 5：预算与总拥有成本（TCO）

100 kVA SVC 系列 2026 年出厂价至杜阿拉或黑角：**US$3,800-4,400**。加 18-22% CEMAC 关税和 ANOR/ARSO 合格评定。金沙萨或雅温得到岸成本约 **US$4,800-5,400**，5 年部件与人工保修。

相比之下，金沙萨当地分销商的低成本继电器型稳压器每 100 kVA 售价 US$2,200-2,800，但仅 1 年保修，在中非电网条件下 18 个月以上失效率有据可查。YOKE SVC 系列在中非应用中典型服务寿命 12-15 年，TCO 低 5-7 倍。

## 步骤 6：联系 YOKE 中非工程团队

项目特定工程支持（单线图、谐波研究、选型、现场调试监督）：engineering@yoke-electric.com。≥ 50 kVA 项目免费技术评审。**利伯维尔驻地现场工程师**（覆盖加蓬、赤道几内亚、圣多美）；**杜阿拉驻地现场工程师**（覆盖喀麦隆、乍得、CAR、刚果布、DRC 西部）。""",

3: """# 中非现场安装与最佳实践

正确安装是 AVR 长期可靠性的最大因素。

## 安装前现场勘察

交付任何 AVR 到中非现场前进行 4 步勘察：
1. 3 天记录式电压表验证电源电压窗口
2. AVR 连接点用 Hioki 或 AEMC 钳形表确认短路电流
3. 记录环境条件（温度、湿度、灰尘、阳光、海拔）
4. 确认电表→AVR、AVR→负载的电缆长度（> 50 m 需电压降补偿，可能上选一档）

## 机械安装

- **安装面**：水平、无振动、不燃表面。≥ 100 kVA SVC/TSD 推荐至少高出地面 100 mm 的混凝土地基以防雨季（3-5 月）洪水。
- **通风间隙**：四面 **300 mm** 自然对流冷却。封闭开关室机械通风（≥ 2 次/小时），环境温度 < 35 °C。
- **电缆入口**：**底部入口电缆格兰**配滴水环。IP55 室外另需 **电缆穿舱密封**（Roxtec 等）。
- **接地**：中非土壤电阻率变化大（沿海 50-500 Ω·m，内陆 200-2000 Ω·m）。≥ 30 kVA AVR **至少 4 根 1.8 m 深接地棒**，AVR 机箱接 25 mm² 铜导体至接地网。

## 电气安装

- **上游保护**：AVR 满载电流 **1.25-1.5x** 热磁断路器（不用熔断器——偏远中非现场难以更换）。100 kVA 3 相 380 V AVR 上游断路器 200 A。
- **旁路电路**：每台 YOKE SVC/TSD ≥ 30 kVA 标配**3 极旁路开关**，接上游母线以便维护时负载不中断。
- **输出配电**：AVR 下游**专用输出配电板**，主断路器 + 分支 MCB。不可菊花链多个配电板。
- **相序**：3 相 AVR 通电前用相序表验证 L1-L2-L3。相序反是矿区电机损坏的常见原因。

## 调试

每台 YOKE AVR ≥ 30 kVA 出厂带**工厂测试证书**和**现场调试清单**。调试工程师（YOKE 现场工程师或 YOKE 培训当地电工）必须：
1. 验证所有电气连接力矩符合规范（100 kVA 级典型 25-40 Nm）
2. **空载通电**，检查 3 相输出电压（应为 380 V ± 1%）
3. **阶跃负载**（25%、50%、75%、100% 铭牌），验证输出稳定性和响应时间
4. 满载运行**至少 4 小时**才签收
5. 培训客户运维团队基本 AVR 监控（前面板、报警代码、手动旁路操作）

YOKE 对发往杜阿拉、黑角、利伯维尔的 ≥ 200 kVA 订单**免费 2 天现场调试监督**。

## 预防性维护

- **每月**：目视检查、前面板指示灯、冷却风扇
- **每季度**：清洁空气过滤器（IP54/IP55）、电缆终端过热变色、旁路开关操作
- **每年**：完整电气测试（绝缘电阻、负载下输出精度、响应时间）、伺服电机碳刷（典型 7-10 年更换）
- **任何电网故障后**（雷击、倒线、变压器故障）：返回服务前完整电气测试

YOKE 在 **杜阿拉**（覆盖喀麦隆、乍得、CAR）和 **黑角**（覆盖刚果布、DRC、加蓬）维持**备件库存**。通用备件（控制板、伺服电机、碳刷、风扇、接触器）现货 2-3 天送达任何中非首都。""",

4: """# 中非稳压器常见问题（FAQ）

**Q1：中非 AVR 应指定何种典型输入电压范围？**

A1：主要中非首都（金沙萨、布拉柴维尔、雅温得、杜阿拉、利伯维尔、马拉博），指定 **150-260 V（单相）** 或 **260-460 V（3 相线间）** 输入窗口。恩贾梅纳、班吉、远程 DRC 矿区扩大到 **140-270 V**。YOKE SVC 和 TND 系列可按需提供扩展输入窗口，不另收费。

**Q2：进口 AVR 到中非需要 SONCAP 或其他合格评定吗？**

A2：SONCAP 仅**尼日利亚**强制。喀麦隆对一般电气设备运行 **ANOR**（Agence des Normes et de la Qualité）框架，但目前不要求工业 AVR 装运前合格评定。加蓬、刚果布、乍得、CAR、赤道几内亚、圣多美一般接受 **CE / IEC / ISO** 认证而无装运前测试。建议原产地商业检验（**Bureau Veritas、SGS、Intertek**）以利清关。YOKE 出货附 CE 合格证、工厂测试报告和符合 CEMAC 海关的商业发票。**尼日利亚目的地 SONCAP 流程增加 4-6 周，每集装箱约 US$1,200**。

**Q3：从中国到杜阿拉或黑角的 40 英尺集装箱 AVR 海运需多久？**

A3：上海或宁波至 **杜阿拉（喀麦隆）** **35-40 天**；至 **黑角（刚果布）** **40-45 天**；至 **马塔迪（DRC，经刚果河）** **45-55 天** 含驳船转运。紧急订单可安排空运，**7-10 天交期，每批最多 2,000 kg**。杜阿拉清关通常 5-10 工作日（文件齐全）；黑角 3-7 工作日。

**Q4：YOKE 对中非的保修和安装后支持？**

A4：标准保修 **SVC 和 TSD 系列 5 年部件与人工**；TND 系列 3 年。保修期任何故障部件免费更换，运费 YOKE 承担。杜阿拉、利伯维尔、黑角 200 km 内站点，YOKE 现场工程师 48 小时内现场服务。偏远站点（DRC 矿区、北乍得、班吉）通过**预先发运的更换组件 + 客户电工远程视频指导**提供保修，典型 5-7 天解决。

**Q5：YOKE 能否为喀麦隆提供双语法语/英语文档和标签的 AVR？**

A5：可以。YOKE 喀麦隆目的地的所有单元**标配双语**法语/英语安装手册、铭牌、警告标签。赤道几内亚（西语）和圣多美（葡语）也可应要求提供双语文档。其他中非目的地法语为标准，可应要求英语或阿拉伯语。铭牌为不锈钢蚀刻（非印刷），适应热带气候耐久性。""",

5: """# 8 个 YOKE 中非分销中心：战略布局

YOKE 在中非维持 **8 个战略分销与服务点**。

## 1. 金沙萨（DRC）— DRC 西部中心
- **覆盖**：金沙萨都会区，DRC 西部省（Kongo Central、Kwango、Kwilu、Mai-Ndombe）
- **服务人口**：1,700 万（都会区）
- **物流**：金沙萨 **Limete** 工业区内陆集装箱站；马塔迪港经铁路（1 天）或公路（1-2 天）接收
- **库存**：280 台（TND、SVC、TSD，5-100 kVA）；18 台关键备件包
- **客户交期**：现货 1-2 天；定制 7-10 天
- **语言**：法语、林加拉语、斯瓦希里语

## 2. 布拉柴维尔（刚果布）— 刚果河中心
- **覆盖**：刚果共和国（布拉柴维尔、黑角、Oyo、Owando）
- **服务人口**：600 万
- **物流**：河港 + 铁路连接黑角（大西洋港，500 km）
- **库存**：120 台；12 台备件包
- **客户交期**：现货 1-2 天
- **语言**：法语、林加拉语、Kituba

## 3. 雅温得（喀麦隆）— 政治首都中心
- **覆盖**：雅温得，喀麦隆中部和北部
- **服务人口**：450 万
- **物流**：距杜阿拉港 220 km 铺装公路
- **库存**：90 台；12 台备件包
- **客户交期**：1-2 天
- **语言**：法语、英语

## 4. 杜阿拉（喀麦隆）— CEMAC 门户中心
- **覆盖**：杜阿拉，喀麦隆西部，过境乍得、CAR、赤道几内亚
- **服务人口**：杜阿拉 400 万 + 过境 900 万（乍得 160 万、CAR 90 万、EG 140 万、北 DRC 500 万）
- **物流**：YOKE **最大 CEMAC 分销中心**位于杜阿拉港自由区，覆盖仓库 4,200 m²
- **库存**：450 台现货 + 1,200 台缓冲；全 SVC/TSD/TND 备件库存
- **客户交期**：现货当天；任何 CEMAC 目的地 1-2 天（成熟卡车路线）
- **语言**：法语、英语、 pidgin
- **特殊**：YOKE 杜阿拉办公室是 **中非 + 西非工程** 区域总部 — 8 现场工程师、12 经认证当地电工、3 项目经理

## 5. 利伯维尔（加蓬）— CEMAC 货币总部中心
- **覆盖**：加蓬，过境赤道几内亚（渡轮或空运）
- **服务人口**：加蓬 90 万 + 过境 EG 140 万
- **物流**：港口城市，国际海运直接到港
- **库存**：180 台；12 台备件包
- **客户交期**：现货当天
- **语言**：法语、芳语、Myene

## 6. 恩贾梅纳（乍得）— 内陆中心
- **覆盖**：恩贾梅纳，乍得南部（Moundou、Sarh）
- **服务人口**：160 万
- **物流**：内陆国；所有入站经 **喀麦隆过境**（杜阿拉→恩贾梅纳公路 1,500 km，4-5 天卡车）或 **尼日利亚过境**（拉各斯→恩贾梅纳公路 1,800 km，5-7 天）
- **库存**：60 台；8 台备件包
- **客户交期**：现货 1-2 天；定制 4-7 天（杜阿拉缓冲）
- **语言**：法语、阿拉伯语、Sara

## 7. 班吉（中非共和国）— 重建中心
- **覆盖**：班吉，CAR 西南部
- **服务人口**：90 万
- **物流**：内陆国；所有入站经 **杜阿拉过境**（喀麦隆→CAR 公路 1,500 km，4-5 天；需 CAR 侧报关协调）
- **库存**：40 台；6 台备件包
- **客户交期**：现货 1-2 天；杜阿拉缓冲 5-7 天
- **语言**：法语、Sango

## 8. 马拉博（赤道几内亚）— 岛屿微电网中心
- **覆盖**：Bioko 岛（马拉博）、Rio Muni 大陆（Bata、Ebebiyín）
- **服务人口**：160 万
- **物流**：Bioko 岛需空运或海运（无公路连接大陆）；YOKE 在 Bioko **Luba 港** 维持小集装箱以便转运大陆
- **库存**：马拉博 30 台 + Bata/Luba 港 20 台；6 台备件包
- **客户交期**：现货当天
- **语言**：西班牙语、法语、芳语、Bubi、葡萄牙语

此外 YOKE 在 **圣多美** 维持小转运缓冲（20 台库存，4 台备件包）服务圣多美和普林西比微电网项目。

8 中心网络覆盖**全部 8 个中非国家**，客户平均交期**现货 1-2 天**，**定制 5-7 天**。全网总库存超 **1,300 台 + 88 个关键备件包**，支持**每年 6,000-8,000 台**持续部署能力。""",

6: """# 结论：中非稳压器市场展望

中非稳压器市场**至 2030 年强劲增长**，由四大汇聚因素驱动：

1. **CEMAC 基础设施整合**：CEMAC 2024-2030 区域基础设施总体规划（PER）含 140 亿美元输配电升级，Inga III 水电项目（DRC 11,000 MW）进入最终可行性研究。新发电上线使电网更互联，但中期内电压质量挑战持续——维持工业、商业、机构客户 AVR 需求。

2. **移动电信扩展**：中非 4G 覆盖 38% 人口（2024）；5G 试点在杜阿拉和金沙萨启动。每新电信基站需专用稳压器。YOKE SVC 系列是 **MTN 喀麦隆、Orange DRC、Airtel 乍得、Telecel CAR** 的标准规格——区域共 14,500 个基站，其中仅 9,800 个当前有 YOKE 稳压器（47% 市占率，4,700 升级机会）。

3. **矿业电气化**：DRC 铜带（Likasi、Kolwezi、Lubumbashi）快速扩张以满足电动汽车和电池储能需求。每新铜钴矿需 8-25 MW 电网级电力，专用重型 AVR 用于加工、提升、通风。YOKE 已供应 14 个 DRC 矿业项目（2024-2025），2026 年管线还有 9 个。

4. **医院和水务建设**：中非每千人 0.9 床位（WHO 建议 3.0），41% 人口缺乏安全水。世界银行、非洲开发银行和双边捐助方为中非 2024-2028 医疗和 WASH 基础设施资助 **38 亿美元**。每新医院和水处理厂都需专用稳压器。

YOKE **2026-2028 中非战略优先**：

- **2026 Q3**：杜阿拉分销中心从 4,200 m² 扩至 6,500 m²（+55% 仓储）
- **2026 Q4**：在 **金沙萨 Limete 工业区** 新开 1,500 m² 服务中心支持 DRC 西部增长
- **2027 Q1**：与联合国开发计划署（UNDP）合作在 **班吉** 推出 30 kW 太阳能-混合 AVR 示范点
- **2027 Q2**：推出 **ATEX/IECEx Zone 2 防爆**型号用于赤道几内亚和刚果布近海油气平台
- **2027 Q4**：获得全产品范围 **CEMAC 范围 ARSO（非洲标准化组织）认证**
- **2028**：在 **雅温得** 开第三区域中心以减少北喀麦隆和乍得客户响应时间

到 2028 年，YOKE 目标**中非可寻址稳压器市场 20% 市占率**（2024-2025 当前 12.7%），即约**每年 9,500 台出货**，区域团队 **42 人**，分布 8 个中心。

中非项目咨询、报价、技术支持联系 **central-africa@yoke-electric.com** 或致电杜阿拉区域总部 **+237 233 XX XX XX**（周一至五 8:00-17:00 WAT，紧急保修 24/7 待命）。""",

7: None  # placeholder
}

# =================== FRENCH ===================
FR = {
0: """# Aperçu du marché des stabilisateurs de tension en Afrique Centrale

Le marché des stabilisateurs de tension (AVR) d'Afrique Centrale représente une **opportunité annuelle de 185 millions USD en 2026**, couvrant **8 pays** de la zone économique et monétaire **CEMAC** (Communauté Économique et Monétaire de l'Afrique Centrale). Population totale supérieure à **220 millions** en RDC, Cameroun, Congo Brazzaville, Gabon, Tchad, République centrafricaine (RCA), Guinée équatoriale et São Tomé-et-Príncipe.

L'Afrique Centrale se distingue par trois facteurs structurels créant une demande soutenue d'AVR :

1. **Dépendance hydroélectrique et saisonnalité** : le bassin du Congo (RDC, Congo Brazzaville) et la rivière Sanaga (Cameroun) produisent 60-70% de l'électricité, mais les variations saisonnières du niveau d'eau (juin-octobre, étiage des affluents sud) provoquent des fluctuations de tension de ±25%.

2. **Concentration portuaire atlantique** : la logistique d'importation transite par **Douala (Cameroun)** — desservant Tchad, RCA, nord RDC — et **Pointe-Noire (Congo Brazzaville)** — desservant provinces ouest RDC et Congo.

3. **Reconstruction post-conflit** : la RCA, l'est de la RDC et le nord du Cameroun nécessitent des AVR servo triphasés robustes pour hôpitaux, services d'eau et backhaul télécom mobile.

Selon l'IEA Africa Energy Outlook 2024, l'Afrique Centrale a la **plus forte demande non satisfaite par habitant d'équipements de qualité d'énergie** parmi toutes les sous-régions africaines : seuls 9% des établissements commerciaux hors capitales possèdent un stabilisateur dédié, contre 23% en Afrique de l'Ouest et 38% en Afrique Australe.

YOKE sert activement l'Afrique Centrale depuis 2018. Données de déploiement Q4 2024 à Q1 2026 : **3 140 unités expédiées vers l'Afrique Centrale (14% du total des expéditions africaines)**, ventilées par pays :
- **RDC** : 1 180 unités (37,6%)
- **Cameroun** : 720 unités (22,9%)
- **Congo Brazzaville** : 410 unités (13,1%)
- **Gabon** : 380 unités (12,1%)
- **Tchad** : 240 unités (7,6%)
- **RCA** : 90 unités (2,9%)
- **Guinée équatoriale** : 90 unités (2,9%)
- **São Tomé-et-Príncipe** : 30 unités (1,0%)

Cet article couvre les défis de qualité d'énergie, les critères de sélection AVR, les meilleures pratiques d'installation et les **8 centres de distribution stratégiques** que YOKE maintient dans la région.""",

1: """# Défis de qualité d'énergie en Afrique Centrale et sélection d'AVR

La qualité d'énergie en Afrique Centrale est définie par trois facteurs macro : mix de génération, distance de transmission et diversité des charges.

## 1. Variation saisonnière hydroélectrique

Bassin du Congo et Sanaga délivrent une fréquence stable (50 Hz ±0,5 Hz) mais une tension variable. À **Kinshasa (RDC)**, où les barrages Inga I et Inga II alimentent le réseau ouest, la capacité en saison sèche descend à 65% de la plaque, entraînant une **tension de brownout de 175-195 V**. À **Yaoundé (Cameroun)**, le réseau Sonatrel est mieux régulé mais oscille encore 200-235 V en bout de feeders 33 kV de 30-50 km.

Produits YOKE recommandés :
- **Stabilisateurs monophasés série TND** (1-30 kVA) : ménages, cliniques, commerce en zones basse tension
- **Stabilisateurs servo série SVC** (10-500 kVA) : sites commerciaux/industriels légers nécessitant ±1% sur 150-260 V
- **Stabilisateurs triphasés TSD** (30-2000 kVA) : hôpitaux, télécoms, eau, mines

## 2. Pertes de transmission longue distance

Le réseau d'Afrique Centrale est **sous-équipé** en transport d'énergie. La ligne 225 kV la plus longue de la région est le **corridor HT Inga-Kolwezi de 1 100 km en RDC**. La tension mi-ligne peut descendre à 198 V (88% du nominal 225 V) en charge. Pour les clients miniers de Likasi, Kolwezi, Lubumbashi (ceinture de cuivre RDC), YOKE spécifie **SVC ±15% avec tenue 5 secondes** pour absorber les chutes sub-cycle.

## 3. Coexistence avec groupes électrogènes diesel

Hors des grandes villes, 60-70% des établissements commerciaux fonctionnent en **groupe diesel + réseau**. À Bangui (RCA), N'Djamena (Tchad), Malabo (Guinée équatoriale), le diesel est l'alimentation principale, nécessitant un AVR pour nettoyer la forme d'onde. Les groupes produisent **THD 8-15%** et **dérive de fréquence ±2 Hz**, exigeant :
- Fenêtre fréquence large (45-65 Hz)
- Réponse rapide (< 20 ms)
- Tenue de surtension 5x pour démarrages moteurs

**SVC et TSD** supportent tous deux le fonctionnement groupe, avec transformateurs d'isolement en option pour sites à **THD > 20%**.

## 4. Guinée équatoriale et São Tomé : microréseaux insulaires

La Guinée équatoriale (île de Bioko) et São Tomé-et-Príncipe fonctionnent sur des **microréseaux insulaires isolés** diesel + solaire-hybride récemment ajouté. Le SVC-Series avec **firmware mode îlot** est la recommandation par défaut pour ces sites.

Pour les plates-formes pétrolières offshore Guinée équatoriale, YOKE fournit sur demande des **enceintes antidéflagrantes ATEX/IECEx Zone 2**.""",

2: """# Comment choisir les stabilisateurs de tension pour les applications d'Afrique Centrale

## Étape 1 : Mesurer l'enveloppe de tension d'entrée

Utilisez un **voltmètre à enregistrement 3 jours** (Fluke 1730 ou équivalent) côté charge du compteur. Observations typiques en Afrique Centrale :
- Kinshasa, Brazzaville, Libreville, Malabo : 195-240 V
- Yaoundé, Douala : 200-235 V
- N'Djamena, Bangui : 170-230 V
- Ceinture de cuivre RDC (Lubumbashi, Kolwezi) : 198-225 V au compteur, avec chutes sub-cycle fréquentes à 175 V

Si la fenêtre d'entrée dépasse ±20% du nominal, un **stabilisateur servo (SVC ou TSD)** est requis.

## Étape 2 : Déterminer le profil de charge

Trois archétypes de charge :
- **Inductive lourde** (HVAC, pompes à eau, ascenseurs, moteurs industriels) : capacité de surtension 3-5x
- **Électronique sensible** (imagerie médicale, stations de base télécom, salles serveurs) : précision ±1%, réponse < 20 ms
- **Mixte résidentiel-commercial** : typique 5-30 kVA monophasé

## Étape 3 : Confirmer la configuration d'alimentation

L'Afrique Centrale fonctionne en **220 V / 50 Hz** (anciennes colonies françaises) et **220 V / 50 Hz** (Guinée équatoriale, São Tomé). Triphasé : 380-400 V entre phases, 50 Hz. YOKE configure par défaut 220 V / 50 Hz / 380 V triphasé avec prises sélecteur 230 V / 240 V. Pour installations 60 Hz (rares, sites industriels anciens Gabon), délai 8 semaines.

## Étape 4 : Planifier l'environnement d'installation

- Intérieur climatisé (hôpital, banque, datacenter) : IP20 standard
- Extérieur abrité (station de base télécom, local pompe) : IP54 avec résistance anti-condensation
- Extérieur exposé (poste transformateur minier, quai port) : IP55 avec pare-soleil, anti-condensation, climatisation d'armoire en option

## Étape 5 : Budget et coût total de possession (TCO)

Prix sortie d'usine 2026 pour 100 kVA SVC vers Douala ou Pointe-Noire : **3 800-4 400 USD**. Ajouter 18-22% pour droits CEMAC et évaluation ANOR/ARSO. Coût rendu Kinshasa ou Yaoundé : **4 800-5 400 USD par unité 100 kVA**, garantie 5 ans pièces et main-d'œuvre.

Les stabilisateurs bas de gamme à relais vendus 2 200-2 800 USD par 100 kVA par les distributeurs locaux Kinshasa ont 1 an de garantie et des taux de défaillance documentés au-delà de 18 mois. Le SVC YOKE atteint typiquement 12-15 ans de service, TCO 5-7x inférieur.

## Étape 6 : Engager l'équipe ingénierie YOKE Afrique Centrale

Support ingénierie projet (schémas unifilaires, études harmoniques, dimensionnement, supervision de mise en service) : engineering@yoke-electric.com. Revue technique gratuite pour projets ≥ 50 kVA. **Ingénieur terrain basé à Libreville** (Gabon, Guinée équatoriale, São Tomé) et **ingénieur terrain basé à Douala** (Cameroun, Tchad, RCA, Congo Brazzaville, ouest RDC).""",

3: """# Installation et meilleures pratiques pour les sites d'Afrique Centrale

## Enquête de site avant installation

Avant toute livraison AVR sur un site d'Afrique Centrale, effectuez une enquête en 4 étapes :
1. Vérifier la fenêtre de tension avec voltmètre à enregistrement 3 jours
2. Confirmer le courant de court-circuit disponible au point de connexion AVR
3. Documenter les conditions environnementales (température, humidité, poussière, soleil, altitude)
4. Confirmer les longueurs de câble compteur→AVR et AVR→charge (> 50 m nécessite compensation de chute de tension)

## Installation mécanique

- **Surface de montage** : plane, sans vibration, non combustible. Pour SVC/TSD ≥ 100 kVA, plinthe béton 100 mm au-dessus du sol recommandée contre les inondations en saison des pluies (mars-mai).
- **Dégagement de ventilation** : **300 mm** sur les quatre côtés pour convection naturelle. Ventilation mécanique en local fermé (≥ 2 renouvellements/heure) pour maintenir < 35 °C.
- **Entrée de câble** : **presse-étoupes d'entrée inférieure** avec boucles d'égouttement. Pour IP55 extérieur, ajouter **joints de transit de câble** (Roxtec ou équivalent).
- **Mise à la terre** : résistivité du sol très variable (côtier 50-500 Ω·m, intérieur 200-2000 Ω·m). Pour AVR ≥ 30 kVA, **au moins 4 piquets de terre à 1,8 m de profondeur**, liaison châssis AVR par conducteur cuivre 25 mm² minimum.

## Installation électrique

- **Protection amont** : **1,25-1,5x** le courant pleine charge AVR, disjoncteur thermo-magnétique (pas de fusibles — difficiles à remplacer en sites reculés). 100 kVA triphasé 380 V → disjoncteur amont 200 A.
- **Circuit de bypass** : chaque SVC/TSD ≥ 30 kVA est fourni avec un **interrupteur de bypass 3 pôles** standard, câblé sur le jeu de barres amont.
- **Distribution de sortie** : **tableau de distribution de sortie dédié** en aval de l'AVR avec disjoncteur principal et MCB de branches.
- **Rotation des phases** : pour AVR triphasés, vérifier la rotation L1-L2-L3 avec un compteur de séquence avant mise sous tension. L'inversion de phase est une cause fréquente de dommages moteur en ceinture minière.

## Mise en service

Chaque AVR YOKE ≥ 30 kVA est livré avec **certificat d'essai d'usine** et **liste de contrôle de mise en service**. L'ingénieur de mise en service doit :
1. Vérifier les couples de serrage des connexions électriques (25-40 Nm typique pour 100 kVA)
2. **Mise sous tension à vide** et vérification de la tension de sortie sur les 3 phases (380 V ± 1%)
3. **Charge par paliers** (25%, 50%, 75%, 100%) et vérification de la stabilité et du temps de réponse
4. Fonctionnement **au moins 4 heures** en charge avant réception
5. Formation de l'équipe exploitation du client

YOKE offre **2 jours gratuits de supervision de mise en service sur site** pour toute commande ≥ 200 kVA expédiée à Douala, Pointe-Noire ou Libreville.

## Maintenance préventive

- **Mensuel** : inspection visuelle, indicateurs panneau avant, ventilateur de refroidissement
- **Trimestriel** : nettoyage filtres à air (IP54/IP55), vérification thermodiscoloration des bornes de câbles, opération bypass
- **Annuel** : essai électrique complet (résistance d'isolement, précision de sortie en charge, temps de réponse), remplacement des balais de servo moteur (intervalle typique 7-10 ans)
- **Après tout défaut réseau** (foudre, ligne tombée, défaut transformateur) : essai électrique complet avant remise en service

YOKE maintient un **inventaire de pièces de rechange à Douala** (Cameroun, Tchad, RCA) et **Pointe-Noire** (Congo Brazzaville, RDC, Gabon). Pièces courantes (cartes de contrôle, servo moteurs, balais, ventilateurs, contacteurs) disponibles en stock avec livraison 2-3 jours vers toute capitale d'Afrique Centrale.""",

4: """# Questions fréquemment posées sur les stabilisateurs de tension en Afrique Centrale

**Q1 : Quelle est la plage de tension d'entrée typique à spécifier pour un AVR en Afrique Centrale ?**

R1 : Pour les principales capitales d'Afrique Centrale (Kinshasa, Brazzaville, Yaoundé, Douala, Libreville, Malabo), spécifiez une fenêtre d'entrée de **150-260 V (monophasé)** ou **260-460 V (triphasé entre phases)**. Pour N'Djamena, Bangui et les sites miniers RDC éloignés, élargissez à **140-270 V** pour couvrir les conditions plus extrêmes. SVC et TND-Series YOKE sont disponibles en fenêtres étendues sur demande sans surcoût.

**Q2 : Ai-je besoin de SONCAP ou autre évaluation de conformité pour importer des AVR en Afrique Centrale ?**

R2 : SONCAP est **obligatoire uniquement pour le Nigeria** sous la loi SON. Le Cameroun opère le cadre **ANOR** (Agence des Normes et de la Qualité) pour les équipements électriques généraux mais n'exige pas actuellement d'évaluation pré-expédition pour les AVR industriels. Gabon, Congo Brazzaville, Tchad, RCA, Guinée équatoriale et São Tomé-et-Príncipe acceptent généralement la certification **CE / IEC / ISO** sans tests pré-expédition supplémentaires. Une inspection commerciale à l'origine (**Bureau Veritas, SGS, Intertek**) est recommandée pour le dédouanement. YOKE expédie avec certificat CE, rapport d'essai d'usine et facture commerciale conforme CEMAC. **Pour le Nigeria, SONCAP ajoute 4-6 semaines et environ 1 200 USD par conteneur**.

**Q3 : Combien de temps pour expédier un conteneur 40 pieds d'AVR de Chine à Douala ou Pointe-Noire ?**

R3 : Fret maritime standard Shanghai/Ningbo → **Douala (Cameroun)** : **35-40 jours** ; → **Pointe-Noire (Congo Brazzaville)** : **40-45 jours** ; → **Matadi (RDC, via fleuve Congo)** : **45-55 jours** avec transbordement par barge fluviale. Pour commandes urgentes, fret aérien 7-10 jours pour jusqu'à 2 000 kg par envoi. Dédouanement CEMAC à Douala : 5-10 jours ouvrés (dossier complet) ; à Pointe-Noire : 3-7 jours ouvrés.

**Q4 : Quelle garantie et support post-installation YOKE offre-t-il pour l'Afrique Centrale ?**

R4 : Garantie standard **5 ans pièces et main-d'œuvre** sur SVC et TSD, 3 ans sur TND. Comprend le remplacement gratuit de tout composant défaillant pendant la période de garantie, frais d'expédition à la charge de YOKE. Pour sites dans un rayon de 200 km autour de Douala, Libreville ou Pointe-Noire, service sur site sous 48 heures. Pour sites éloignés (ceinture minière RDC, nord Tchad, Bangui), service via **expédition anticipée de composants de remplacement + assistance vidéo à distance** pour l'électricien client, résolution typique 5-7 jours.

**Q5 : YOKE peut-il fournir des AVR avec documentation et étiquetage bilingues français/anglais pour le Cameroun ?**

R5 : Oui. YOKE fournit en standard **manuels d'installation, plaques signalétiques et étiquettes d'avertissement bilingues français/anglais** pour toutes les unités destinées au Cameroun. Pour Guinée équatoriale (espagnol) et São Tomé (portugais), documentation bilingue disponible sur demande. Pour les autres destinations d'Afrique Centrale, français standard, anglais ou arabe sur demande. Plaques signalétiques gravées dans l'acier inoxydable (non imprimées) pour la durabilité en climat tropical.""",

5: """# Centres de distribution stratégique : 8 points de distribution YOKE en Afrique Centrale

YOKE maintient **8 points de distribution et de service stratégiquement situés** en Afrique Centrale.

## 1. Kinshasa (RDC) — Centre Ouest RDC
- **Couverture** : zone métropolitaine de Kinshasa, provinces ouest RDC (Kongo Central, Kwango, Kwilu, Mai-Ndombe)
- **Population desservie** : 17 millions (métro)
- **Logistique** : dépôt conteneurs intérieur en zone industrielle **Limete** de Kinshasa ; reçoit conteneurs du port de Matadi par rail (1 jour) ou route (1-2 jours)
- **Inventaire** : 280 unités en stock (TND, SVC, TSD, 5-100 kVA) ; kit de pièces de rechange critiques 18 unités
- **Délai client** : 1-2 jours pour stock, 7-10 jours pour configurations spéciales
- **Langues** : français, lingala, swahili

## 2. Brazzaville (Congo Brazzaville) — Centre Fleuve Congo
- **Couverture** : Congo Brazzaville (Brazzaville, Pointe-Noire, Oyo, Owando)
- **Population desservie** : 6 millions
- **Logistique** : port fluvial et liaison ferroviaire vers Pointe-Noire (port atlantique, 500 km)
- **Inventaire** : 120 unités en stock ; kit pièces de rechange 12 unités
- **Délai client** : 1-2 jours pour stock
- **Langues** : français, lingala, kituba

## 3. Yaoundé (Cameroun) — Centre capitale politique
- **Couverture** : Yaoundé, centre et nord Cameroun
- **Population desservie** : 4,5 millions
- **Logistique** : 220 km à l'intérieur depuis Douala par route goudronnée
- **Inventaire** : 90 unités en stock ; kit pièces de rechange 12 unités
- **Délai client** : 1-2 jours
- **Langues** : français, anglais

## 4. Douala (Cameroun) — Centre passerelle CEMAC
- **Couverture** : Douala, ouest Cameroun, transit vers Tchad, RCA, Guinée équatoriale
- **Population desservie** : 4 millions Douala + transit 9 millions (Tchad 1,6M, RCA 0,9M, EG 1,4M, transit nord RDC 5M)
- **Logistique** : **plus grand centre de distribution YOKE en zone CEMAC** en zone franche portuaire de Douala, 4 200 m² d'entrepôt couvert
- **Inventaire** : 450 unités en stock + buffer 1 200 unités ; inventaire complet de pièces de rechange
- **Délai client** : jour même pour stock ; 1-2 jours pour toute destination CEMAC
- **Langues** : français, anglais, pidgin
- **Spécial** : bureau YOKE Douala = quartier général régional **ingénierie Afrique Centrale + Ouest** — 8 ingénieurs terrain, 12 électriciens locaux certifiés, 3 chefs de projet

## 5. Libreville (Gabon) — Centre QG monétaire CEMAC
- **Couverture** : Gabon, transit vers Guinée équatoriale (ferry ou air)
- **Population desservie** : 900 000 (Gabon) + transit EG 1,4 million
- **Logistique** : ville portuaire, conteneurs directs depuis le transport maritime international
- **Inventaire** : 180 unités en stock ; kit pièces de rechange 12 unités
- **Délai client** : jour même pour stock
- **Langues** : français, fang, myene

## 6. N'Djamena (Tchad) — Centre enclavé
- **Couverture** : N'Djamena, sud Tchad (Moundou, Sarh)
- **Population desservie** : 1,6 million
- **Logistique** : enclavé ; tout transite par le **Cameroun** (Douala → N'Djamena route, 1 500 km, 4-5 jours camion) ou le **Nigeria** (Lagos → N'Djamena, 1 800 km, 5-7 jours)
- **Inventaire** : 60 unités en stock ; kit pièces de rechange 8 unités
- **Délai client** : 1-2 jours pour stock ; 4-7 jours pour configurations spéciales depuis buffer Douala
- **Langues** : français, arabe, sara

## 7. Bangui (République centrafricaine) — Centre reconstruction
- **Couverture** : Bangui, sud-ouest RCA
- **Population desservie** : 900 000
- **Logistique** : enclavé ; transite par **Douala** (Cameroun → RCA route, 1 500 km, 4-5 jours ; coordination transitaire côté RCA requise)
- **Inventaire** : 40 unités en stock ; kit pièces de rechange 6 unités
- **Délai client** : 1-2 jours pour stock ; 5-7 jours depuis buffer Douala
- **Langues** : français, sango

## 8. Malabo (Guinée équatoriale) — Centre microréseau insulaire
- **Couverture** : île de Bioko (Malabo), continent Rio Muni (Bata, Ebebiyín)
- **Population desservie** : 1,6 million
- **Logistique** : Bioko nécessite air ou mer (pas de connexion routière au continent) ; YOKE maintient un petit conteneur au **port de Luba** (Bioko) pour le transit vers le continent
- **Inventaire** : 30 unités en stock (Malabo) + 20 unités (Bata, port Luba) ; kit pièces de rechange 6 unités
- **Délai client** : jour même pour stock
- **Langues** : espagnol, français, fang, bubi, portugais

YOKE opère en plus un petit **buffer de transbordement à São Tomé** (20 unités stock, kit 4 pièces) pour les projets microréseau São Tomé-et-Príncipe.

Ce réseau de 8 centres couvre **les 8 pays d'Afrique Centrale** avec délai client moyen de **1-2 jours pour stock** et **5-7 jours pour configurations spéciales**. L'inventaire total dépasse **1 300 unités + 88 kits de pièces critiques**, supportant une capacité de déploiement soutenue de **6 000-8 000 unités par an**.""",

6: """# Conclusion : perspectives du marché des stabilisateurs de tension en Afrique Centrale

Le marché des stabilisateurs de tension en Afrique Centrale est sur une **forte trajectoire de croissance** jusqu'en 2030, portée par quatre facteurs convergents :

1. **Intégration infrastructurelle CEMAC** : le plan directeur d'infrastructure 2024-2030 de la CEMAC (Programme Économique Régional, PER) inclut 14 milliards USD de mises à niveau de transport et distribution, avec le projet hydroélectrique Inga III (RDC, 11 000 MW) en phase de faisabilité finale.

2. **Expansion télécom mobile** : la couverture 4G en Afrique Centrale est actuellement de 38% de la population (2024) ; des pilotes 5G ont débuté à Douala et Kinshasa. Chaque nouvelle station de base télécom nécessite un stabilisateur dédié. Le SVC YOKE est la spécification standard pour **MTN Cameroun, Orange RDC, Airtel Tchad et Telecel RCA** — 14 500 stations de base combinées dans la région, dont seulement 9 800 ont actuellement un stabilisateur YOKE (47% de part de marché, 4 700 opportunités de mise à niveau).

3. **Électrification minière** : la ceinture de cuivre RDC (Likasi, Kolwezi, Lubumbashi) se développe rapidement pour répondre à la demande des véhicules électriques et du stockage batterie. Chaque nouvelle mine cuivre-cobalt nécessite 8-25 MW de puissance de qualité réseau, avec des AVR robustes dédiés pour traitement, extraction et ventilation. YOKE a fourni 14 projets miniers RDC en 2024-2025, avec 9 supplémentaires dans le pipeline 2026.

4. **Construction hospitalière et hydraulique** : l'Afrique Centrale a 0,9 lit d'hôpital pour 1 000 habitants (vs recommandation OMS 3,0) et 41% de la population n'a pas accès à l'eau potable. La Banque mondiale, la BAD et des bailleurs bilatéraux financent **3,8 milliards USD en infrastructure de santé et WASH** en Afrique Centrale 2024-2028.

**Priorités stratégiques YOKE 2026-2028 en Afrique Centrale** :

- **2026 T3** : étendre le centre de distribution Douala de 4 200 m² à 6 500 m² (+55% capacité stockage)
- **2026 T4** : ouvrir un nouveau centre de service de 1 500 m² en **zone industrielle Limete de Kinshasa** pour soutenir la croissance de l'ouest RDC
- **2027 T1** : lancer un site de référence AVR solaire-hybride 30 kW à **Bangui** en partenariat avec le PNUD
- **2027 T2** : introduire des modèles **antidéflagrants ATEX/IECEx Zone 2** pour les plates-formes pétrolières
- **2027 T4** : obtenir la **certification ARSO (Organisation Africaine de Normalisation) CEMAC** pour toute la gamme
- **2028** : ouvrir un troisième centre régional à **Yaoundé**

D'ici 2028, YOKE vise **20% de part de marché du marché adressable des stabilisateurs de tension en Afrique Centrale** (actuellement 12,7% en 2024-2025), soit environ **9 500 unités expédiées par an** et une équipe régionale de **42 personnes** réparties sur 8 centres de distribution.

Pour demandes d'ingénierie, devis ou support technique en Afrique Centrale : **central-africa@yoke-electric.com** ou appelez le quartier général régional Douala au **+237 233 XX XX XX** (lun-ven 8:00-17:00 WAT, garde 24/7 pour garantie urgente).""",

7: None
}

# Save state and write
print(f"Loaded ZH/FR dicts, {len(ZH)} sections each")
print(f"ZH section 0 length: {len(ZH[0])}")
print(f"FR section 0 length: {len(FR[0])}")
print(f"Will continue with ES/AR/PT/RU/JA/DE/HI in next run")

# Add to article
for i in range(7):
    art["sections"][i]["body"]["zh"] = ZH[i]
    art["sections"][i]["body"]["fr"] = FR[i]

with open(PATH, 'w', encoding='utf-8') as f:
    json.dump(art, f, ensure_ascii=False, indent=2)
print(f"Wrote 2 langs (zh+fr). Size: {os.path.getsize(PATH)} bytes")
