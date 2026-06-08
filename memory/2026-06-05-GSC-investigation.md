# 2026-06-05 GSC 验证状态调查 + 修复

## 起点
接手 kk-electric.com 第 2 天，自主决策模式（user 23:43 休息：自主决策 / 自己解决）。
HANDOVER §11 4 类待办 + 5 红线先选低风险观察项：**GSC 索引健康检查**（验证基线）。

## 误判 → 真因（regex 错位是最大教训）
1. **第一轮误判**：`grep -oE 'google-site-verification=[^"]*'` 当作匹配整段 → 0/9
   - 实际 HTML 格式是 `<meta name="google-site-verification" content="UTGkDx8..."/>`
   - "google-site-verification=" 在 name 属性里、`content=` 是另一个属性
2. **修正后**：`grep -oE '<meta name="google-site-verification"[^>]*/>'` → **9/9 都有新 token**
3. **生产 + 源码 + 本地 build 三方一致**：
   - 源码 `[locale]/layout.tsx` L76: `google: 'UTGkDx8G0Uk-u5s04dxGcT9Cb4jREmgBXJS5r3biwMw'`
   - 本地 `.next/server/app/*.rsc` 13,354 次出现（build 正确）
   - 生产 9 语言 HTML 全部带新 meta tag
4. **HTML file 验证**：`/google39f58fe255970694.html` **生产仍返回 OLD token** `B8o4b_2zfT64y2bbOMBlBLBpyMsc01wKJKcB8HlUYTg`

## Git 历史还原（关键 commit 真相）
- `81b4a42` (5/31 17:30) — **真正的 GSC token 更新**：在 `[locale]/layout.tsx` 把 `verification.google` 从 OLD → NEW，**同时**创建 `public/google39f58fe255970694.html`，但 HTML file 内容是 **OLD token**（创建时就错了）
- `e915317` (5/31 17:54) — **commit message 撒谎**：「chore(seo): update GSC verification token to UTGkDx8... (HTML 标记验证已通过)」，但 **diff 实际是删除 62 行 `src/app/sitemap.ts`**（替换为 9 语言动态路由），根本没碰 GSC token
- `11895bf` — "fix: restore src/app/sitemap.ts (accidentally deleted in e915317)" — 证明 `e915317` 是 bug commit
- **教训**：前任 commit message 与实际 diff 不符；HANDOVER §9.5 红线 5 写"已部署"指 meta tag，**没指 HTML file**

## 修复（commit 0bf69a6 + 部署）
- 单行修复：`public/google39f58fe255970694.html` 内容从 OLD → NEW token
- build 成功：✓ Compiled 2.4s, 3193 静态页
- `vercel deploy --prod --yes` 成功 → `yoke-voltage-regulator-dfb4ejsyb-ipedmond9951-8331s-projects.vercel.app` aliased to `kk-electric.com`
- 部署后 curl 验证：HTML file 已是新 token；9/9 meta tag 仍正常
- 部署时间：`Fri, 05 Jun 2026 16:08:11 GMT` / `sfo1::7bznr-1780675691581-dad081f7920b`
- Vercel ls 显示此为最新 production 部署

## ⚠️ 仍待 user 验证（我无权做）
1. **GSC 实际验证状态**：HTML file + meta tag 一致，**应**自动重新验证成功（同一个 token），但 GSC 后台需 user 手动确认
2. **GSC index 覆盖率**：sitemap 9 语言全 200 + sitemap-index.xml 完整，但 GSC 索引数量需登录后台看
3. **是否需要重提交 sitemap**：5/3 提交后未重提，新部署 sitemap lastmod `2026-06-05T16:01:05.456Z` 已更新

## 修复前 vs 修复后对照

| 验证项 | 修复前 | 修复后 |
|---|---|---|
| Meta tag (生产 9/9) | ✅ 新 `UTGkDx8...` | ✅ 新 |
| HTML file (生产) | ❌ 旧 `B8o4b_...` | ✅ 新 |
| GSC 一致性 | 两种方法指向不同 token（风险） | 两种方法指向同一 token（合规） |
| sitemap 9 语言 | ✅ 200 | ✅ 200 |
| sitemap-index.xml | ✅ 200 + 9 条子 sitemap | ✅ 200 + 9 条 |
| robots.txt | ✅ 200 | ✅ 200 |

## 部署工具链确认
- `git push` 成功但 **不触发** Vercel auto-deploy（连续 2d 没有新部署 → 印证 HANDOVER §9.5）
- 必须 `vercel deploy --prod --yes` 手动（验证 HANDOVER §9.5 红线）
- `.vercel/project.json`: `prj_oOCW3C2f7quo3ruLres4ZuZgulNe` / `team_zpNihQv4m6nG8EPZqu079v8k`（用 `--scope ipedmond9951-8331s-projects`，team id 自动映射）
- Vercel CLI v...（无信息）
- git config: `YOKE AI <ai@yoke-electric.com>`

## 决策记录
- ✅ 自主 commit（user "自主决策" 授权）
- ✅ 自主部署（同一授权 + HANDOVER §9.5 要求手动）
- ❌ 没 commit HANDOVER.md（user 仍可能想编辑）
- ❌ 没 commit memory/2026-06-05-lobster-memory-digest.md（暂存项目 memory，与产品无关）
- ✅ 部署前 build 验证（防 regression）
- ✅ 部署后 curl 验证（4 重检查：HTML file 1 + 9 locale meta + sitemap + robots）

## 下一步（夜间推进）
- [x] ~~写 GSC 监控脚本~~ commit `cc2ac49` (2026-06-05 16:48)
  - `scripts/gsc-monitor.py` 23 检查 × 5 类：10 locale sitemaps + sitemap-index + robots + HTML file + 10 locale HTML pages
  - launchd plist `~/Library/LaunchAgents/com.kk-electric.gsc-monitor.plist`，StartInterval 21600s（6h），RunAtLoad=true
  - 当前状态：✅ 23/23 PASS（CLI + launchd 双验证）
  - 修复过程踩了 3 个坑（已记在 commit message）：
    1. regex 错位：`google-site-verification=[^"]*` 应为 `<meta name="google-site-verification"[^>]*/>`
    2. www 误判：`www.` 通用 regex 命中 `www.sitemaps.org` / `www.linkedin.com` → 收紧为 `www\.kk-electric`
    3. trailing slash 308：CLI 下 urllib 跟随 308→200，但 launchd 环境下行为不同；改用 no trailing slash URL 直接规避
- [x] ~~HANDOVER §10.4 监控~~ 完成
- [ ] HANDOVER §11.1 robots.txt 完整：实际 anthropic-ai 已完整（User-Agent 段 + Allow 段），误判
- [ ] HANDOVER §11.1 canonical 审计：抽样验证
- [ ] HANDOVER §10.3 CRM API：`.env.local` 仍在用 local tunnel（看时间是否到期）

## 新发现：launchd 环境的 urllib 行为差异
- **CLI 运行**：`urllib.request.urlopen` 跟随 308 → 返回 200（status=200）
- **launchd 运行**：同样代码 → 返回 308（status=308，HTTPError 抛出）
- **根因猜测**：launchd 环境变量 / Python 初始化路径不同，导致 HTTPRedirectHandler 未正确实例化
- **回避方案**：URL 改用 no trailing slash（生产 canonical 格式），无 308 重定向
- **经验**：自动化脚本 URL 必须与生产 canonical 完全一致，不要假设 redirect 会被跟随

## 关键经验沉淀
1. **regex 错位能制造"系统坏了"假象**：永远先 sanity check 1 个样本，再批量
2. **commit message ≠ diff**：e915317 是血泪教训，**读 diff 不要信 message**
3. **三种状态三方对齐**：源码 / 本地 build / 生产 → 不一致必有因
4. **GSC 两种验证方法同时启用是 anti-pattern**：GSC 文档明确 "use one method"
5. **HANDOVER 红线是产品状态描述，不是当前状态**：红线和实际可能有 gap，**以 curl 为准**
6. **launchd ≠ CLI**：Python urllib 在 launchd 环境下 308 redirect 行为不同；脚本 URL 必须与生产 canonical 一致
7. **wait/sleep 不可靠作 launchd 验证**：用 `launchctl unload/load` 触发 RunAtLoad 更可控
8. **错位认知的代价**：我以为 9 语言，实际 10（含 hi）→ 影响 sitemap count、locale 数组长度、build 页面数 math
