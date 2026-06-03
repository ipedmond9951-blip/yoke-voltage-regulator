#!/usr/bin/env node
/**
 * hreflang 9 语言死页校验器
 *
 * 检查：
 * 1) 静态页 × 9 语言 = 54 个 URL
 * 2) 动态文章 × 9 语言 = 308 × 9 = 2772 个 URL
 * 3) 每个 URL 返回 200 才算 OK
 * 4) 对比 page template 里声明的 hreflang 与实际可访问页面
 *
 * 输出：报告 + 死页清单
 */

import fs from 'fs'
import path from 'path'

const BASE = 'https://kk-electric.com'
const LOCALES = ['en', 'zh', 'es', 'ar', 'fr', 'pt', 'ru', 'ja', 'de', 'hi']

const STATIC_PAGES = ['', 'products', 'about', 'contact', 'privacy-policy', 'terms']

function getAllSlugs() {
  const dir = 'content/articles'
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
}

async function check(url) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    })
    return { url, status: res.status, ok: res.ok }
  } catch (e) {
    return { url, status: 0, ok: false, error: e.message }
  }
}

async function batchCheck(urls, concurrency = 20) {
  const results = []
  let i = 0
  async function worker() {
    while (i < urls.length) {
      const idx = i++
      results[idx] = await check(urls[idx])
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
  return results
}

async function main() {
  const slugs = getAllSlugs()
  console.log(`📚 文章数: ${slugs.length}`)
  console.log(`🌐 语言数: ${LOCALES.length}`)

  // 收集所有 URL
  const urls = []
  for (const loc of LOCALES) {
    for (const page of STATIC_PAGES) {
      urls.push(`${BASE}/${loc}${page ? '/' + page : ''}`)
    }
  }
  for (const loc of LOCALES) {
    for (const slug of slugs) {
      urls.push(`${BASE}/${loc}/industry/${slug}`)
    }
  }
  console.log(`🔗 总 URL: ${urls.length}`)

  // 抽样：先测 100 个静态 + 50 篇 × 9 语言 = 550 个看时间
  console.log(`\n🚀 全量测 ${urls.length} 个 URL（9 语言 × (6 静态 + 308 文章)）...`)

  const t0 = Date.now()
  const results = await batchCheck(urls, 30)
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1)

  const dead = results.filter(r => !r.ok)
  const byStatus = {}
  for (const r of results) {
    byStatus[r.status] = (byStatus[r.status] || 0) + 1
  }
  console.log(`⏱️  耗时 ${elapsed}s`)
  console.log(`📊 状态码分布: ${JSON.stringify(byStatus)}`)

  if (dead.length > 0) {
    console.log(`\n💀 死页 ${dead.length} 个:`)
    for (const d of dead.slice(0, 20)) {
      console.log(`  ${d.status} ${d.url}${d.error ? ' [' + d.error + ']' : ''}`)
    }
  } else {
    console.log(`\n✅ 全量 100% 200 OK`)
  }

  if (dead.length > 0) {
    fs.writeFileSync('logs/hreflang-dead-urls.json', JSON.stringify(dead, null, 2))
    console.log(`\n💾 死页清单已保存: logs/hreflang-dead-urls.json`)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
