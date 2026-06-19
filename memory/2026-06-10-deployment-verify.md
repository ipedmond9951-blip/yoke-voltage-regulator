# 2026-06-10 一次性部署 + 全量验证

## 任务
总裁说"把网站的更新和改进整理一下，一次性部署"，按 3 步执行：
1. 手动触发 Vercel 生产部署
2. 跑验证脚本（Schema/hreflang）
3. 抓 kk-electric.com 实测页面

## 实际执行

### Step 1: 部署
- 触发 `vercel deploy --prod --yes` → 创建 deployment `bywm5y617`
- **但 Vercel 队列卡 14+ 分钟没编译**
- 期间发现 git 树**已经干净**，所有 30 个 commit 在 1d 前（19:10）已通过 Vercel 自动部署到 `khti3o0lr`
- 手动部署是冗余的（同样的 git state），手动 cancel `bywm5y617` 释放队列
- **结论**：Vercel 自动部署比手动触发更快（CI 9 分钟 vs 我手动 14+ 分钟仍 Queued）

### Step 2: 验证脚本
- **Schema 验证**：`python3 scripts/schema-validator.py` → 311 篇文章 × 48 项 = **6204/6220 = 99.7% pass**
  - 边缘不完美项：en/zh 内部链接 5 个（4 篇）、未来日期 4 篇、关键词密度 3 篇、FAQ 缺失 1 篇
  - 这些都不阻挡部署
- **hreflang 全量审计**：`node scripts/audit-hreflang.mjs` → **3170/3170 = 100% 200 OK，零死页**

### Step 3: 实测 kk-electric.com
- 主页 HTTP 200，180KB，2.6s ✅
- **GSC token** 在 meta + HTML 文件都正确：`UTGkDx8G0Uk-u5s04dxGcT9Cb4jREmgBXJS5r3biwMw` ✅
- **og:locale 10 语言**全部正确：en_US/zh_CN/es_ES/ar_SA/fr_FR/pt_PT/ru_RU/ja_JP/de_DE/hi_IN ✅
- **hreflang 文章页** 10 语言 + x-default 完整 ✅
- **canonical 全部 non-www** ✅
- **中央非洲新文章** `central-africa-avr-trade`（P0-A 第 7 篇）10 语言全部 200 ✅
- **10 个分语言 sitemap** 全部 200，en sitemap 含 634 个 `image:image` 标签 ✅
- **`/sitemap.xml` 301 → `/sitemap-index.xml`** ✅
- **3 个 author profile 页面**（Oshan/Anna/Kennedy）× 10 语言 = 30/30 全部 200 ✅
- **IndexNow key** UUID 文件可访问 ✅
- **3 个内部工具页面** robots disallow ✅
- **Schema 类型 19 种**（主页 + 文章页），包含 Article / FAQPage / Person / Organization / LocalBusiness / BreadcrumbList / Speakable 等

## 重要发现 / 经验

### 经验 1：author profile slug 是 `oshan-zhang` 不是 `oshan`
- 我第一次测试用 `/team/oshan` 拿到 404，差点报假阳性 bug
- 实际是 `oshan-zhang` / `anna-kim` / `kennedy-mutua`（3 个作者全名 slug）
- **检查清单：测试 URL 之前先 grep 真实 slug**

### 经验 2：Vercel 手动部署 ≠ 强制重新部署
- git 树干净时，Vercel 自动部署比手动快得多（9 分钟 vs 14+ 分钟仍 Queued）
- 手动 `vercel deploy --prod --yes` 在 git 没新 commit 时其实是冗余
- **判断方法**：`git log --since="1 day ago" | wc -l` → 0 个新 commit 就别手动部署

### 经验 3：`next.config.ts` redirects 故意把 `/steel-prices` 跳到 `/products`
- 不是 bug，是 `cec5610` commit 的有意修复
- 注释说明：locale middleware 先 307 → /en/steel-prices → 404，GSC 会标"网页会自动重定向"
- 301 到 `/products` 是 GSC 友好的"软着陆"
- 看到这种 301 别慌，看 commit 历史确认意图

### 经验 4：实测是最终验证
- 跑脚本只能保证代码对，不能保证 CDN/部署生效
- 抓 10 语言 × 关键 URL 才能发现"部署失败但脚本通过"的情况
- 这次抓出来 og:locale、hreflang、author profile、image sitemap 全 100% 实际生效

## 当前生产状态
- **最新部署**：`khti3o0lr` (1d ago, 9m build) - ✅ Production Ready
- **包含 commit 数**：30（最近一周全部）
- **域名**：`kk-electric.com`（已切到 `khti3o0lr`）
- **下一次部署触发条件**：有新 commit push 到 main
