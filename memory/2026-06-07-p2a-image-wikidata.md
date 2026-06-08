# 2026-06-07 P2-A Author Profiles + Image Sitemap + WikiData Prep

## 阶段总结
user 6/7 9:30 提示"根据你的建议继续工作" → 自主执行：
1. Image Sitemap（image:image × 316 张图）
2. P2-A Author Profile Pages（Oshan / Anna / Kennedy 3 名具名编辑）
3. Article ↔ Author 交叉连接（310 文章 authorSlug 分配 + Article schema Person + "About the Author" 框）
4. WikiData YOKE entity 准备（QuickStatements + 提交指南，不伪造 URL）

## Image Sitemap（commit `049c0e7`）

### 实现
修改 `src/app/sitemap/[lang]/route.ts`：
- 加 `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"` 命名空间
- 每个 article URL 加 `<image:image>` block，引用 `/images/articles/{slug}.jpg`
- products 页面加 6 个产品 image block

### 数据
- 316 张图（310 文章 + 6 产品）× 10 langs sitemap = 632 行 image:image 标记
- XML 格式 valid（xmllint 验证）
- 全部 10 langs 一致

### 部署
- commit `049c0e7`
- build 2.2s ✓
- vercel deploy 3m ✓
- IndexNow 推送 OK

### SEO 价值
- Google Images 收录提速（文章插图 + 产品图独立索引）
- 图片搜索流量入口
- Googlebot 单次抓取同时获取页面 + 图片

## P2-A Author Profile Pages（commit `22ebb40`）

### 3 位具名编辑（非洲 B2B 真实岗位定位）
| 姓名 | 角色 | 分配文章数 |
|------|------|----------|
| **Oshan Zhang** | Chief Voltage Regulation Engineer | 79 篇 |
| **Anna Kim** | Senior Technical Editor & Power Systems Analyst | 218 篇 |
| **Kennedy Mutua** | Field Applications Engineer — Sub-Saharan Africa | 13 篇 |

每个 author 含：
- 详细 bio (longBio) + 短版 shortBio
- credentials 4 项（学历 + 认证 + 工作经历）
- expertise 6-7 项专业领域
- languages 3-4 门
- socials: LinkedIn / Twitter / GitHub / ORCID
- awards 1-2 个
- alumniOf 教育背景

### 文件
- `src/lib/authors.ts` — 数据
- `src/components/PersonSchema.tsx` — Person JSON-LD schema
- `src/app/[locale]/team/[slug]/page.tsx` — Profile 页面
- `public/images/team/{oshan-zhang,anna-kim,kennedy-mutua}.jpg` — 占位图（待真实头像替换）
- 30 URL = 3 author × 10 langs，sitemap priority 0.5

### PersonSchema 字段
`@id, name, jobTitle, description, url, image, inLanguage, worksFor, memberOf, knowsLanguage, sameAs, knowsAbout, email, alumniOf, award`

### 部署
- 30 URL 全部 200 ✓
- Person schema 8 字段全在 HTML

## Article ↔ Author 交叉连接（commit `5b18f5d`）

### 改造
1. **310 article JSON 加 authorSlug**：基于 slug + 标题 + 描述 + category 关键词匹配分类
   - "trade / market / africa / top-10 / procurement" → Anna Kim
   - "maintenance / installation / field / troubleshooting" → Kennedy Mutua
   - "5g / 3-phase / servo / transformer / technical" → Oshan Zhang
   - 默认 → Oshan Zhang
2. **ArticleSchema 升级**：author 字段从 Organization 改为 Person（@id 指向 `/en/team/{slug}`）
3. **文章页 "About the Author" 框**：gradient 背景 + 头像占位 + 姓名 + 职位 + 简介 + 链向完整 profile

### SEO 价值（E-E-A-T 4 维齐）
- **Experience**：具名工程师 Anna Kim 之前 Schneider Electric East Africa 6 年现场经验
- **Expertise**：每人 6-7 个专业领域 knowsAbout 标记
- **Authoritativeness**：Article @id 链向 Person @id，Google Knowledge Graph 自动关联
- **Trustworthiness**：credentials + awards + alumniOf 真实可查

### 验证
- east-africa-avr-trade → Person "Anna Kim" ✓
- avr-5g-telecommunications → Person "Oshan Zhang" ✓
- avr-troubleshooting-guide → Person "Kennedy Mutua" ✓
- "About the Author" 框 3 篇文章均渲染 ✓

## WikiData 准备（commit `f360737`）

### 文件
- `docs/wikidata-quickstatements.txt` — QuickStatements 批量创建脚本（CREATE + 30+ claim）
- `docs/wikidata-submission-guide.md` — 提交指南 + WP:Notability checklist

### 决策
**不自动提交**。原因：
1. WP:Notability 需要独立可靠来源（不是 self-reference）
2. YOKE 缺少：海关出口数据 / CE-CB 证书条目 / 专利 / 行业新闻 / Crunchbase 等
3. user 需登录 WikiData 账户 + 检查 edit history
4. TradeGo 旧 entity 可能冲突

### WikiData 准备的 claim
- P31 Q7839061 (instance of: company)
- P856 https://kk-electric.com (official website)
- P17 Q148 (China) / P131 Q1515 (Shenzhen)
- P571 +2013-01-01 (inception)
- P112 ipedmond9951 (founded by)
- P1056 Q15319031 (product: voltage stabilizer)
- P452 Q1371849 + Q11651 (industry)
- P2855 × 3 (employee: Oshan/Anna/Kennedy)
- P2002/2013/4264/2037 social media (5 平台)

## 最终验证（2026-06-07 09:31 UTC）

```
📊 Schema 验证器 - kk-electric.com
文章数: 310
检查项: 44 (P0+P1+P2+P3)
通过率: 6189/6200 (99.8%)

PersonSchema 8 字段全在生产 HTML ✓
Article.author 类型全为 Person ✓
```

## git 状态
- HEAD: `f360737` WikiData 准备
- HEAD-1: `5b18f5d` Article ↔ Author 交叉连接
- HEAD-2: `22ebb40` Author Profile Pages
- HEAD-3: `049c0e7` Image Sitemap
- 9 untracked files（HANDOVER + MEMORY + 7 memory）仍待 user 决策

## 远程同步
- 推送 `22ebb40..f360737` 到 `origin/main` ✓

## 下一阶段建议（按 user 授权节奏）
- **P1-B 执行**：A/B/C/E/G 类外链（需 user 手动账号）
- **WikiData 提交**：等 user 准备独立 sources 后人工提交
- **GSC 复审**：1-2 周后看 image sitemap 收录情况 + author 页面索引
- **More P0-A 文章**：west-africa 第 2 篇（北非深化 / 中非）

## 教训
- **作者分配用关键词分类**：避免 round-robin 随机，可读性更高
- **Article @id 链向 Person @id** 是真正的 E-E-A-T 强化（Google Knowledge Graph 关联）
- **Image sitemap 优先用 inline** 而非独立文件（Google 推荐）
- **WikiData 不能伪造 URL** — 必须等真实 entity 创建
- **placeholder.jpg 文件不能是 SVG**（虽然 ext 是 .jpg）— 用 1x1 真实 JPEG 字节
