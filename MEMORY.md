# kk-electric.com / YOKE 接管与全链路 SEO 自动化

## 项目位置
- **代码**：`/Users/zhangming/workspace/yoke-voltage-regulator/`
- **远端**：`github.com/ipedmond9951-blip/yoke-voltage-regulator.git`
- **生产域名**：`https://kk-electric.com`（无 www）
- **Vercel 项目**：`yoke-voltage-regulator`，scope `ipedmond9951-8331s-projects`
- **代理平台**：`OpenClaw` 桌面 WebUI，token 模式 `token-plan`

## 关键身份
- **owner/站长**：ipedmond9951（YOKE Electric）
- **Oshan**：编辑团队主管
- **agent 角色**：OpenClaw 通用 Agent，全权负责 yoke 网站（scope 限定，不碰 tradebrain-v2 / TradeGo 紧固件）
- **user 语言**：中文回复

## 10 语言 locale
`['en', 'zh', 'es', 'ar', 'fr', 'pt', 'ru', 'ja', 'de', 'hi']`（含 `hi`）
- `src/proxy.ts` L4 locales 数组
- `src/i18n/*.json` 翻译
- `src/components/*Schema.tsx` Schema 组件 inLanguage

## Next.js 16 关键红线
- `'use client'` page.tsx **不能** export `metadata` / `generateMetadata`
- 含 `.` 的路径（`/sitemap.xml`）→ `export const dynamic = 'force-dynamic'`
- 写代码前必读 `node_modules/next/dist/docs/`

## Vercel 部署
- 手动 `vercel deploy --prod --yes`
- 不自动部署（git push 不触发）
- deploy 60-90s + build 2-3s = ~4-6min 总耗时

## GSC / IndexNow
- **GSC token**：`UTGkDx8G0Uk-u5s04dxGcT9Cb4jREmgBXJS5r3biwMw`
- **IndexNow key（当前 working）**：`2c0964b6-7925-45bd-a8b6-9cb1a66b56c2`
- **Key 文件**：`public/2c0964b6-7925-45bd-a8b6-9cb1a66b56c2.txt`
- **IndexNow 关键坑**：
  - 必须 UUID v4 格式
  - 部署后 5-10min 等待（"SiteVerificationNotCompleted" 正常）
  - `https://api.indexnow.org/indexnow` 端点，无认证

## 4 个 launchd cron
| 任务 | 频率 | plist |
|------|------|-------|
| gsc-monitor | StartInterval 21600s/6h | `com.kk-electric.gsc-monitor.plist` |
| schema-validator | Sun 3:00 AM | `com.kk-electric.schema-validator.plist` |
| hreflang-audit | Sun 4:00 AM | `com.kk-electric.hreflang-audit.plist` |
| indexnow-ping | Daily 5:30 AM | `com.kk-electric.indexnow-ping.plist` |

## 监控脚本
- `scripts/gsc-monitor.py` — 63 检查 × 6 类
- `scripts/audit-hreflang.mjs` — 3140 URL × 10 lang
- `scripts/schema-validator.py` — 308-310 × 20-22 = 6160-6200 检查
- `scripts/seo-ping-indexnow.py` — 4 模式 + log + chunked batches

## 数据现状（2026-06-07）
- **310 文章 × 10 langs = 3100 页面**（P0-A 续后 308→310）
- **Schema 通过率 99.8%**（6189/6200）
- **P0-A 6 篇** 覆盖非洲 46 城市
- **P1-A 软文** Top 10 China AVR Brands for Africa 2026（YOKE 排第 2）
- **P1-B 17 类外链** 模板 + 87.5h+ 估算（未执行）
- **P2-B Article schema 升级**：speakable + citation + hasPart + about + publisher.logo
- **P2-C CWV**：Next.js Image 自动完成（preload hero + lazy + WebP + async decoding）

## 红线（不可破坏）
- **绝对禁止** `tradego-fasteners*` 任何目录/域名
- **绝对禁止** 碰 `~/.openclaw/`、`~/.openclaw/service-env`、`archive/tradego-legacy/`
- **绝对禁止** 域名 `www.kk-electric.com`（统一无 www）
- **绝对禁止** `git add -A`（2026-06-06 教训：会误把 HANDOVER + memory 一并 stage）
- **绝对禁止** 跑 `sessions cleanup --all-agents`、不关网络、不删 trajectory
- **不擅自 commit** HANDOVER.md / memory/*.md（10 个 untracked 待 user 决策）
- **不擅自 push** 任何 untracked 文档类文件
- **不擅自删改** `public/2c0964b6-7925-45bd-a8b6-9cb1a66b56c2.txt`（working key）
- **破坏性命令**（rm -rf、git reset --hard、vercel rollback）**先警告 + 等 user 确认**

## 流程（user 6/6 23:58 授权）
1. user 描述需求 / 触发某个 skill
2. agent 自主决策 + 实施 + 验证
3. 关键节点给 1-3 行进度汇报（不刷屏）
4. 完成后 commit + deploy + 给最终结果

## 4 launchd plist 路径
```
~/Library/LaunchAgents/com.kk-electric.gsc-monitor.plist
~/Library/LaunchAgents/com.kk-electric.schema-validator.plist
~/Library/LaunchAgents/com.kk-electric.hreflang-audit.plist
~/Library/LaunchAgents/com.kk-electric.indexnow-ping.plist
```

## 关键环境
- node v22.22.2 `/opt/homebrew/bin/node`
- python3 `/opt/homebrew/bin/python3`
- npm 10.9.7
- node_modules 488M
- 3000 端口被 `tradebrain-v2` 占用（pid 36594，跑 2 天 20h+）— user 不让管
