# 2026-06-06: hreflang audit cron 装好 + audit-hreflang.mjs 修

HANDOVER §10.4 待办：

> - [ ] **hreflang 审计 cron**：建议 `0 4 * * 0` 跑 `audit-hreflang.mjs`

## 完成清单

### 1. launchd plist 装好

- `~/Library/LaunchAgents/com.kk-electric.hreflang-audit.plist`
- **时间**：每周日 4:00 AM（在 schema cron 周日 3:00 AM 后 1 小时，留出余地）
- **程序**：`/opt/homebrew/bin/node /Users/zhangming/workspace/yoke-voltage-regulator/scripts/audit-hreflang.mjs`
- **WorkingDirectory**：项目根（脚本读 `content/articles/*.json` 用相对路径）
- **日志**：`logs/hreflang-audit.log` / `logs/hreflang-audit-error.log`
- **首次手动触发**：已验证 pid 64428 跑通 3140 URL ~150s

### 2. 修了 audit-hreflang.mjs 两个 bug（commit `7d09fed`）

#### Bug A: Transient fetch failures
- 3140 URL 高并发（concurrency 30）时，Node.js `fetch` 偶发丢连接（~0.8% 失败率）
- 失败 URL 实测全 200（curl 验证）
- **修**：在 `check()` 加 retry 3 次 + 线性 backoff（500ms, 1s）
- **效果**：跑了 2 次都 3140/3140 = 200，0 死页

#### Bug B: 死页文件不覆盖
- 脚本只在 `dead.length > 0` 时写 `logs/hreflang-dead-urls.json`
- 上次失败的旧文件会持续存在，掩盖"本轮跑 0 死页"的真相
- **修**：总是写（空时写 `[]`），加时间戳 trust

### 3. 验证

- **首次 cron 触发**：3140/3140 = 200，跑了 26 个假死页（transient）
- **commit 后重跑**：3140/3140 = 200，**0 死页**，dead-urls.json = `[]`
- **耗时**：~137s（带 retry 后 139s）
- **build**：✓ 无 error

## 三个 cron 完整时间表

| Cron | 时间 | 频率 | 跑啥 |
|------|------|------|------|
| com.kk-electric.gsc-monitor | 每 6h | 4 次/天 | GSC token + sitemap + meta tags + canonical |
| com.kk-electric.schema-validator | 周日 3:00 AM | 周 | Schema 标记 + 多语言一致性 |
| com.kk-electric.hreflang-audit | 周日 4:00 AM | 周 | 3140 URL × 10 语言 × 全覆盖 |

## 关键经验

- **launchd node 路径**：用 `/opt/homebrew/bin/node`（不是 `/usr/local/bin/node`，launchd 不用 `$PATH`）
- **plutil 验证 plist 语法**：`plutil -lint ~/Library/LaunchAgents/com.kk-electric.*.plist`
- **load 后立即触发**：`launchctl start <label>`（不等 Sunday 4:00 AM）
- **Node.js fetch 大量并发时**有 0.5-1% 假失败率，必须 retry 或换 curl 并行
- **dead-urls.json 写空数组**比"不写"更好（monitoring 友好）
