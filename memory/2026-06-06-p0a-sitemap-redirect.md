# 2026-06-06: Sitemap 301 Redirect + P0-A/B GEO Deployment

## 一、旧 Sitemap Path 301 Redirect Fix

### Bug 发现
生产环境 `/sitemap.xml` 和 `/sitemap_index.xml` 返回 HTTP 200 但内容是 Next.js 渲染的 HTML 页面（`<html lang="sitemap.xml">`），原因是 `[locale]` 动态段接住所有未匹配路由，把 `sitemap.xml` 当 locale 名。

### 关键 Next.js 16 行为
1. **matcher `.*\..*` 排除含点路径**：proxy.ts 的 `pathname.startsWith('/sitemap')` 检查根本不执行（middleware 被跳过）
2. **route handler 默认静态化**：Next.js 16 把含 `.` 的路径（`sitemap.xml`）当静态资源 prerender
3. **GET 函数被无副作用执行**：`NextResponse.redirect` 在静态化时被丢弃，返回 200 + 空内容 + `content-type: application/xml`
4. **对比 `/sitemap_index.xml`（含下划线）**：被当真正的 route handler 处理（Dynamic），不需要 force-dynamic

### 修复（commits `728a98d` + `67e302f`）
- 创建 `src/app/sitemap.xml/route.ts` + `src/app/sitemap_index.xml/route.ts`
- 都加 `export const dynamic = 'force-dynamic'`（避免 Next.js 16 静态化）
- 返回 `NextResponse.redirect(new URL('/sitemap-index.xml', 'https://kk-electric.com'), { status: 301 })`
- Build 时 `sitemap.xml` 显示 `ƒ Dynamic`（不再是 `○ Static`）
- 部署后 curl 验证：两个旧路径 301 → 新 `/sitemap-index.xml` → 200

### 关键经验
- **Next.js 16 路径含 `.` 当静态资源**：必须 `force-dynamic` 让 GET 运行时执行
- **matcher 排除 + route handler 是两套机制**：matcher 排除的是 middleware 范围，路由层独立
- **build log 看 `○` vs `ƒ` 立刻判断**：Static prerender vs Dynamic server-rendered

## 二、GEO P0-A 续 - 3 篇文章加 Strategic Distribution Hubs

commit `b5378bd`：3 篇文章（每篇 6-12 城市 × 10 语言）加 `distribution-hubs` section。

### 覆盖城市（4 篇文章总计 26 城市 mentions 4-17 次）
1. **east-africa-avr-trade** (上阶段，6 城市): Nairobi 18, Mombasa 21, Dar es Salaam 8, Kampala 10, Johannesburg 15, Cape Town 10
2. **southern-africa-avr-trade** (新，8 城市): Johannesburg 25, Cape Town 16, Durban 15, Lusaka 8, Harare 9, Maputo 12, Gaborone 8, Windhoek 8
3. **avr-nigeria-market-opportunity** (新，6 城市): Lagos 31, Abuja 20, Port Harcourt 18, Kano 14, Ibadan 14, Kaduna 16
4. **african-avr-market-analysis** (新，12 城市): Algiers/Cairo/Addis Ababa/Accra/Dakar/Kinshasa/Luanda/Kigali + 4 重复

### 部署验证
- 3 篇生产 EN URL 测试，城市 mentions 显著提升
- commit hash: `b5378bd`
- Vercel URL: `yoke-voltage-regulator-pj62pbd98-ipedmond9951-8331s-projects.vercel.app`

### 经验
- **10 语言 body 长度比例**：EN 7867-8393 chars（长版），其他 9 langs 1079-4441 chars（短版）
- **section 插到 conclusion 之前**：`data['sections'].insert(-1, new_section)`
- **每篇文章 6-12 城市**比 3 城市信息密度高，符合 AI 引擎"城市级可寻址"评估

## 三、GEO P0-B FAQ Schema - 已完成（前任）

308/308 文章都已有 `faqItems` 字段（section 5 id=faq），文章模板 `src/app/[locale]/industry/[slug]/page.tsx` L149-164 自动生成 FAQPage JSON-LD。

### 生产验证（EN east-africa）
- 14 个 JSON-LD schema 块
- Schema #2: FAQPage (4 Q/A) — 来自 layout.tsx 的 FAQSchema.tsx（固定 FAQ）
- Schema #11: FAQPage (5 Q/A) — 来自 page.tsx（article.sections 自动生成）
- 两个 FAQPage 同时存在（小冗余但不致命）

### 10 语言都有 FAQPage ✓

## 四、下一步 P1-A

新写 "Top 10 China AVR Brands for Africa 2026" 软文（4h 投入，HANDOVER §10.2）。
