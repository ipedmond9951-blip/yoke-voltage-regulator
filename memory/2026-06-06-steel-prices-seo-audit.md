# 2026-06-06: 钢价数据页 SEO 价值评估

HANDOVER §10.1 待办第 248 行：

> - [ ] **钢价数据页 SEO 价值评估**（`/steel-prices`，API 已就绪）

## 当前实现状态

| 维度 | 现状 | 评级 |
|------|------|------|
| **页面类型** | `'use client'` (Next.js 16 client component) | ❌ |
| **generateMetadata** | 无（client component 限制） | ❌ |
| **canonical** | Fallback 到 `[locale]/layout.tsx` 首页 canonical | ❌ |
| **hreflang** | 无（继承 layout，无 per-locale link） | ❌ |
| **sitemap 收录** | 否（sitemap 只收录 industry/[slug] 308 篇） | ❌ |
| **robots.txt 阻止** | 否（无 disallow） | ⚠️ |
| **数据真实性** | 1/8 真 (HRC from Yahoo Finance), 1/8 random, 6/8 fallback | ⚠️ |
| **内容独特性** | 仅价格表 + recharts 折线图 | ❌ |

## API 现状（`src/app/api/steel-prices/route.ts`）

- **HRC** (Hot Rolled Coil): 真实从 Yahoo Finance `HRC=F` futures 取，1h cache
- **Iron Ore (62% Fe)**: `fetchIronOre()` 用 `Math.random() ± 2.5` 模拟，**不是真实数据**
- **其他 6 项** (CRC, REBAR, GI, HMS, COKING, NI): `getFallbackData()` + `Math.random() ± 1%` 模拟
- **Currency** (USDCNY, USDZAR): 真实从 Frankfurter API 取，1h cache
- 整体 Cache-Control: `s-maxage=300, stale-while-revalidate=600` (5min / 10min)

实测：
```
HRC price: 1195 (from Yahoo Finance, current 真实)
2 次调用：1195 固定（cache 5min 生效）
```

## Google 索引角度

- ❌ 页面**未提交 sitemap**，Google 不会主动发现
- ❌ 即使被发现，client component 无 canonical → 折叠到首页 canonical
- ❌ Hreflang 缺失 → 即使被索引，10 语言版本互相不知

**结论：当前 `/steel-prices` 在 Google 搜索结果中几乎不会出现。**

## SEO 价值评估

### 选项 A：保持现状（最低成本）
- **目的**：内部参考 / 客户辅助工具
- **动作**：在 `src/app/robots.ts` 加 `disallow: ['/steel-prices']` 防止意外被 Google 索引
- **价值**：低成本；保护数据真实性不被作为公开承诺
- **风险**：如果未来要 SEO 营销，需要 re-enable + 改 server component

### 选项 B：全面 SEO 化（高成本/高价值）
- **重构 client → server component**：把 fetch 改在 server 端，每 1h 渲染
- **接 8 项真实数据源**：Yahoo Finance / TradingEconomics / Investing.com 覆盖所有 8 项
- **加 generateMetadata**：title/description/canonical/hreflang 10 语言
- **加 sitemap 收录**：sitemap 逻辑更新
- **加内容层**：每周行业分析、趋势预测、出口成本计算工具
- **加 OG image**：动态生成价格曲线图
- **价值**：可作"内容营销" 抓 backlinks 流量
- **成本**：1-2 周工作（前后端 + 内容）

### 选项 C：折中（中等成本）
- **保持 client component**（不改 fetch 模式）
- **加 robots.txt disallow + noindex**（Next.js 13+ 支持 client component `useEffect` 动态加 `<meta name="robots">`）
- **从 sitemap 移除**（已经不在）
- **价值**：明确内部参考定位，SEO 干净
- **成本**：1-2 小时

## 推荐

**短期（今天）**：选项 C 折中
- 加 robots.txt disallow `/steel-prices`, `/product-upload`, `/analytics`
- 显式声明这 3 个页面是内部工具，不参与 SEO

**长期（评估）**：选项 B 取决于业务方向
- 如果 YOKE AVR 不需要钢价 SEO → 选项 A 永久
- 如果想做"非洲工业品价格参考"品牌 → 选项 B 重构

## 关键发现

- **9 → 10 语言错位再次发现**：`schema-validator.py` LANG 数组缺 'hi'，已在
  commit `6c80bf0` 修。同样的认知错位（GSC 调查时发现）也影响了 schema
  验证器。
- **Hreflang HTML 大小写**：Next.js 16 输出 `hrefLang` (大写 L)，不是
  `hreflang`。grep 时注意。

## 行动

- [ ] 写 `src/app/robots.ts` 加 disallow 3 内部页（待 user 确认）
- [ ] 长期 SEO 化决策（待 user 评估）
- [ ] HANDOVER §10.1 标记完成（评估 + 报告）
