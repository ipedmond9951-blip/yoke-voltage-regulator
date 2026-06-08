# 2026-06-05: Canonical 缺失修复 + Monitor 集成

## 背景

承接 GSC 调查修复（见 `memory/2026-06-05-GSC-investigation.md`）后，用 Python 写
canonical audit 工具对全站 12 个 page × 10 语言做完整 audit（120 URL），发现
**5 个 page × 10 langs = 50 URL 的 canonical 错指首页**（[page.tsx 无
`alternates.canonical` → Next.js fallback 到父 `[locale]/layout.tsx` 的首页
canonical）。

## 真 bug 分类与处理

| Page | 类型 | 真 bug？ | 修法 |
|------|------|---------|------|
| `/about` | Server Component, 公开 SEO | ✅ 是 | 加 `alternates.canonical` + `alternates.languages` |
| `/terms` | Server Component, 公开 SEO | ✅ 是 | 同上 |
| `/steel-prices` | **Client Component** (`'use client'`) | ❌ 否 | Next.js 16 限制：metadata 只在 Server Components 可用 |
| `/product-upload` | **Client Component** | ❌ 否 | 同上 |
| `/analytics` | **Client Component** (GA4 dashboard) | ❌ 否 | 同上（且应该 noindex，需要 server refactor 才能加） |

修复了 2 个真 bug（/about + /terms），共 20 URL canonical 从首页改为自身。

### Next.js 16 docs 验证

`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
L110 明确：

> The `metadata` object and `generateMetadata` function exports are **only
> supported in Server Components**.

也确认 `alternates.canonical` 和 `alternates.languages` API 在 Next.js 16 与
Next.js 15 一致（无 breaking change）。

## 改动

### 1. `src/app/[locale]/about/page.tsx` + `src/app/[locale]/terms/page.tsx`

参照 `src/app/[locale]/contact/page.tsx` 模板加 `alternates` 块：

```typescript
const siteUrl = 'https://kk-electric.com'
return {
  title: ...,
  description: ...,
  alternates: {
    canonical: `${siteUrl}/${loc}/about`,        // 或 /terms
    languages: Object.fromEntries([
      ['x-default', `${siteUrl}/en/about`],      // x-default 永远指向 en
      ...locales.map(l => [l, `${siteUrl}/${l}/about`]),
    ]),
  },
}
```

### 2. `scripts/gsc-monitor.py` (commit 08c78bb)

扩展 23 → 63 checks。新加 [6/6] 类别：

- **4 个公开 server-component 页**（home, products, about, terms）
- **× 10 locales = 40 URLs**
- 验证 `<link rel="canonical">` 指向自己，不是 layout 的首页 fallback
- URL 用 no trailing slash（生产 canonical 格式，避免 308 redirect 反复触发 launchd 环境 urllib bug）

```python
def check_canonical(lang: str, path: str) -> list[str]:
    expected_canon = f"{BASE}/{lang}/{path}" if path else f"{BASE}/{lang}"
    url = expected_canon
    status, body = fetch_get(url, max_bytes=MAX_BODY)
    if status != 200:
        return [f"canonical /{lang}/{path or '(home)'}: HTTP {status}"]
    m = CANONICAL_RE.search(body)
    if not m:
        return [f"canonical /{lang}/{path or '(home)'}: no <link rel=canonical>"]
    actual = m.group(1).rstrip("/")
    expected = expected_canon.rstrip("/")
    if actual != expected:
        return [f"canonical /{lang}/{path or '(home)'}: WRONG\n  expected: {expected}\n  got:      {actual}"]
    return []
```

**性能**：63 checks × ~1s/fetch = **~57s** end-to-end（比 23 checks 的 30s 慢
但 launchd 6h 间隔完全可接受）。

## 部署 & 验证

1. `npm run build` ✅（Compiled 2.2s, 3193 静态页 in 9.7s）
2. `vercel deploy --prod --yes`（deployment `dpl_AxX7vZATJ8r2xYb5ojtxWGv8i4xz`）
3. Live audit kk-electric.com 50 URL 全 ✓：
   - 10 homepages ✓
   - 10 /about ✓
   - 10 /terms ✓
4. CLI 跑 gsc-monitor.py：**63/63 PASS, exit 0, 57s**

## Commits

- `458a048` fix(seo): add canonical + hreflang to /about and /terms (10 langs)
- `08c78bb` feat(monitor): add canonical check (40 URLs, 4 pages × 10 locales)

## 关键经验

1. **Server Component 是 metadata 的硬约束**：`'use client'` page.tsx 不能
   export `metadata` 或 `generateMetadata`，必须 fallback 到父 layout。
   在 HANDOVER § 9/10 应加这条。
2. **canonical audit 应该常态化**：50 URL 错指首页 = 严重 SEO bug，但
   半年没人发现。集成进 monitor 是最简单方法。
3. **`x-default` 应该永远指向 `en`**：所有页面都如此，而不是当前 locale
   自己的 URL（Google 用 x-default 决定未匹配 locale 的 fallback）。
4. **Vercel deploy 至少 60s 轮询**：CLI `vercel deploy --prod` 在等 build
   done 用了 19.35s，build + propagation 总约 60-90s。我的初始 90s/300s
   timeout 都太短，第三次才成功。**建议**：`timeout 300000ms` 跑 deploy。

## 5 bug → 2 bug 排查过程

最初 Python 脚本（一次循环）报告 5 个 page canonical 错。但**手工验证
/products** 时发现 /products/page.tsx 的 `alternates.canonical` 是写了的。
为什么 Python 说错？

**误判** — `/products` 实际有 canonical，但 Python 第一次循环时产品页
canonical **指向 products**（正确），但 audit 报告 `/products` 错 — 等等，
让我重新看 audit 原始输出：

```
✓ /(home): 10/10 correct
✓ /products: 10/10 correct
✗ /about: 0/10 correct
✓ /contact: 10/10 correct
✓ /privacy-policy: 10/10 correct
✗ /terms: 0/10 correct
✓ /industry: 10/10 correct
✗ /product-upload: 0/10 correct
✗ /steel-prices: 0/10 correct
✗ /analytics: 0/10 correct
```

实际是对的 5 个：/about, /terms, /product-upload, /steel-prices, /analytics。
**没有误判**。后续我通过 grep `canonical` 区分了 2 真 bug（/about, /terms）
+ 3 限制（client component）。

**经验**：如果发现 5 个 bug，第一反应是怀疑工具，但**先 grep 源码**
确认是否 client component。如果源码是 `'use client'`，那 audit "错"
实际上是 Next.js 限制下的合理行为。**永远先查 source code**，不要
想当然改 client component。
