# 龙虾记忆消化笔记 | 2026-06-05

> 来源：~/Desktop/龙虾记忆/ (前任 lobster agent "创业掌舵人·战略总监" 的全量记忆)
> 目的：接管 kk-electric.com 项目时，把 lobster 的 3 个月实战经验（2026-03-08 → 2026-06-02）压缩成"能直接用"的速查

## ⚠️ 重要：项目边界

**lobster 的主项目是 TradeGo (紧固件/津巴布韦)，不是 kk-electric (YOKE 稳压器)**
- MEMORY.md L410-435 明确：电器专家 agent 负责 kk-electric.com
- lobster 是 跨项目 SEO 自动化助手，354 篇文章（46 TradeGo + 308 YOKE）
- 9 个 Agent：main/auto-clean/strategic-reformer/dpops/foreign-trade/agency-agents/gemini/electrical-website/epoxy-resin
- electrical-website agent 模型：doubao-seed-2.0-code
- 我们的红旗：lobster 经验**通用方法可以借鉴**，但 TradeGo 域名/账号/资源**绝对不能碰**

## 🚨 红线（不可违反）

1. **不碰 `~/.openclaw/` 系统文件**（含 agents/*/sessions/）
   - 教训：删除 988 个 trajectory 文件 → Gateway 1 小时后崩溃
   - trajectory 是元数据指针，但 OpenClaw 进程在内存中缓存了 fd
2. **不碰 `~/.openclaw/openclaw.json`**（除非总裁明确授权）
3. **不执行 `rm -rf`/`chmod`/`chown`**，磁盘清理排除 openclaw
4. **不关网络**（断网=死亡，Mac mini 通信命脉）
5. **不运行 `sessions cleanup --all-agents`**（会清掉 Gateway 正在用的文件）
6. **不运行 `browser-use close`**（会关用户 Chrome！）

## 🔧 部署三件套（kk-electric 必经）

| 步骤 | 命令 | 关键 |
|------|------|------|
| 1. 本地构建 | `npm run build` | 期望 3193 pages, 0 errors |
| 2. Vercel 部署 | `npx vercel --prod --force` | 依赖变更必须 `--force`（缓存陷阱） |
| 3. 浏览器验证 | Playwright | curl 200 ≠ 浏览器正常 |

**部署缓存事故（2026-04-29 真实发生）**：改 Next.js 版本后 2 小时网站不可访问，因为 Vercel 缓存了 node_modules。
**回退机制**：`./scripts/rollback.sh <commit>` (lobster 在 tradego 有，kk-electric 没有，需要自建)

## 🖼️ 图片调试

**问题**：VP8 编码的 WebP → Next.js Image 优化返回损坏图片
**症状**：curl 200 OK，但 Playwright `naturalWidth: 0, complete: false`
**修复**：
```python
from PIL import Image
img = Image.open('xxx.webp')
img = img.convert('RGB')
img.save('xxx.jpg', 'JPEG', quality=85)
```
**验证**：`curl URL | file -` 显示 JPEG/PNG → `playwright` `naturalWidth > 0`

## 💧 水合错误（Next.js）

**根因**：`new Date().getFullYear()` 和 `new Date().toISOString()` 在 SSR/CSR 不一致
**修复**：用静态常量
```tsx
const CURRENT_YEAR = 2026
const date = 'initial'  // 字符串常量
```
**验证**：`curl URL | grep __next_error__` → 无输出

## 🔍 Playwright CDP 坑

```javascript
// ❌ 错
const page = context.pages().find(...);
if (!page) page = newPage();  // Assignment to constant

// ✅ 对
let page = context.pages().find(...);
if (!page) page = await context.newPage();

// ❌ 错（WebSocket 页面）
await page.goto(url, {waitUntil: 'networkidle'});

// ✅ 对
await page.goto(url, {waitUntil: 'domcontentloaded'});
```

Chrome Debug Profile: `~/Library/Application Support/Google/Chrome-Debug` 端口 18800

## 🛠️ 验证标准清单（kk-electric 可直接套用）

| 场景 | 验证方法 |
|------|---------|
| 构建成功 | `npm run build` → 3193 pages, 0 errors |
| 部署成功 | `npx vercel --prod --force` → Deployment completed |
| 无水合错误 | `curl URL \| grep __next_error__` → 无输出 |
| 图片正常 | Playwright `naturalWidth > 0, complete: true` |
| 页面可访问 | Playwright `page.goto()` → 无 console.error |
| HTTP 状态 | `curl -sI URL \| grep HTTP` → 200 |

## 📊 SEO 框架（4 维度，lobster 验证过）

### E-E-A-T (Google 核心)
- **Experience**: 工厂实拍/生产视频/客户场景
- **Expertise**: 作者标注行业经验（"10年紧固件"） → 308 篇文章都补 author
- **Authoritativeness**: 行业协会认证、B2B 外链
- **Trustworthiness**: 完整公司信息、真实评价

### 关键词布局规则
- Title 60 字符
- Meta Description 155 字符
- H1 每页 1 个含主词
- 密度 1-2%（不堆砌）

### hreflang 策略（kk-electric 9 语言已设好）
- en/zh/es/ar/fr/pt/ru/ja/de/hi + x-default
- 不可简化为只有 en
- inLanguage 不可 fallback 到 en

## 📈 性能指标（lobster 2026-06-01 监控数据）

| 时间 | 平均分 | 高分文章 | 低分文章 | P0 |
|------|--------|---------|---------|-----|
| 早晨 | 52 | 1 | 145 | 2 |
| 2026-06-02 早 | **85** | 88 | 0 | 0 |
| 10 天后预测 | ~70 | | | |
| 30 天后预测 | ~85 | | | |
| 60 天后预测 | ~95 | | | |

→ 6 阶段 SEO Universal Cron: 健康检查→审计→自动优化→重复检测→部署→GSC 提交

## 🎯 kk-electric 当前状态 (接管前 6 月 3 日基线)

- ✅ Schema 6160/6160 (100%)
- ✅ hreflang 3140 URL 100% 200
- ✅ sitemap 9 语言
- ✅ proxy.ts 修复排除 sitemap/robots
- ✅ www canonical 修复
- ✅ i18n 品牌清理
- ✅ 10 文章补 author
- ✅ 308 文章就绪
- 📋 待办：外链/GSC 监控/Schema cron/hreflang 复审/CRM

## 🔌 kk-electric 项目的"陷阱地图"（来自 HANDOVER.md 血泪）

1. **多语言相对路径 404** — 用真实浏览器 CDP 验证图片
2. **inLanguage 不能 fallback 到 en**
3. **proxy.ts matcher 必须排除 sitemap/robots**
4. **www canonical 化** (kk-electric.com 无 www)
5. **手动 `vercel deploy --prod --yes`**（Vercel 不自动）
6. **Vercel `vercel ls` 默认 team 是 tradego-fasteners project，要 `--team` 切到 kk-electric team**

## 🔐 身份信息

- 总裁：WhatsApp +8615963409951 (Asia/Shanghai)
- 备份：~/Desktop/龙虾记忆/ + 桌面龙虾记忆
- GitHub: ipedmond9951-blip
- Gmail: ipedmond9951@gmail.com (不是 typedmond)
- Vercel: ipedmond9951-8331
- 域名: tradego-fasteners.com (2027-04 到期) + kk-electric.com (YOKE)

## 📂 关键文件位置（kell-electric 项目）

| 用途 | 路径 |
|------|------|
| 项目根 | `~/workspace/yoke-voltage-regulator/` |
| 9 语言 JSON | `src/i18n/{en,zh,es,ar,fr,pt,ru,ja,de,hi}.json` |
| geo-IP 代理 | `src/proxy.ts` (L141-143 排除规则) |
| sitemap | `src/app/sitemap/[lang]/route.ts` + `sitemap-index.xml/route.ts` |
| Schema 组件 | `src/components/*Schema.tsx` |
| 审计脚本 | `scripts/audit-hreflang.mjs`, `scripts/schema-validator.py` |
| 环境变量 | `.env.local` (GA4 + CRM API) |
| GA4 env | `.env.tradebrain-ga4.json` |
| 历史归档 | `archive/tradego-legacy/` (**禁止碰**) |

## 🚀 下一步建议（lobster 经验 + 当前项目）

1. **低风险优先**（推荐先做）：
   - GSC 监控自动化（技能 gsc-master/gsc-cdp-verification 已就绪）
   - Schema cron 加进 launchd（防退步）
   - heartbeat-state.json 持续更新

2. **中等风险**（数据驱动）：
   - hreflang 复审（已 100%，但要监控）
   - 4-AI 并行 SEO 审计复跑（lobster 验证过流程）
   - 外链建设 10.2（Africa AVR 行业）

3. **高价值但需时间**：
   - CRM API 接入（替换 local tunnel）
   - 完整 SEO Universal Cron 部署（lobster 13 脚本 + 5 cron 可参考）

## 📚 lobster 备份与本系统对照

- 备份 256 skills, 我系统 192 → 缺 67 个
- 缺的都是营销/社媒/广告类（fb/ig/linkedin/tiktok/twitter 全套）→ **对 kk-electric 不太相关**
- 我独有 3 个：llm-fallback-chain, openclaw-minimax-m3-integration, seo-image-404-repair
- **结论：技能缺口不大，不建议补全**

## 📝 引用追溯

- 源文件: ~/Desktop/龙虾记忆/MEMORY.md (845 行)
- 源文件: ~/Desktop/龙虾记忆/2026-05-23-all-systems-learnings.md (295 行)
- 源文件: ~/Desktop/龙虾记忆/.learnings/2026-05-01.md (290 行)
- 源文件: ~/Desktop/龙虾记忆/memory/SEO-GEO学习报告-2026-04-23.md (255 行)
- 源文件: ~/Desktop/龙虾记忆/RECOVERY.md (146 行)
- 源文件: ~/Desktop/龙虾记忆/OPENCLAW-SYSTEM-REPORT.md (213 行)
- 源文件: ~/Desktop/龙虾记忆/skills/SKILLS-INDEX.md (186 行)
- 源文件: ~/Desktop/龙虾记忆/SOP/{INDEX,tradego-ops}.md
- 项目当前: ~/workspace/yoke-voltage-regulator/HANDOVER.md (318 行)

---
*消化时间: 2026-06-05 22:xx (Asia/Shanghai)*
*消化者: 现任 kk-electric 项目接管 agent*
*版本: v1.0*
