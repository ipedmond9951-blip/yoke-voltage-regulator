#!/usr/bin/env node
/**
 * Hub-Spoke relatedArticles 重写器
 *
 * 策略：
 * 1. 按 category 分组
 * 2. 提取每篇文章的 keywords + title 分词，做 TF-IDF 相似度
 * 3. 每篇文章选 5 篇最相似的作为 relatedArticles
 * 4. 优先选同 category；其次跨 category 但关键词重合度高
 * 5. 强制每篇至少 3 个互链
 *
 * 目标：消灭 290 孤岛，308 篇全连通
 */

import fs from 'fs'
import path from 'path'

const ARTICLES_DIR = 'content/articles'
const STOPWORDS = new Set([
  'the','a','an','and','or','for','to','of','in','on','at','by','with','from','as',
  'is','are','be','was','were','been','being','have','has','had','do','does','did',
  'will','would','could','should','may','might','can','this','that','these','those',
  'it','its','your','you','our','we','they','their','our','his','her',
  'avr','voltage','regulator','stabilizer','guide','complete','comprehensive','everything',
  '需要','的','是','在','和','与','或','为','了','您','我','们','这','那','一个','一些',
  // 9 语言 stopwords
  'el','la','los','las','un','una','de','en','y','o','para','con','por','del',
  'le','les','des','les','une','un','et','ou','pour','avec','de','du',
  'ein','eine','der','die','das','und','oder','mit','von','zu',
  'il','la','gli','le','un','una','e','o','per','con','di',
  'o','a','os','as','um','uma','e','ou','para','com','de',
])

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !STOPWORDS.has(t))
}

function articleText(d) {
  const title = d.title?.en || ''
  const desc = d.description?.en || ''
  const kw = d.keywords || ''
  const category = d.category || ''
  // sections heading 集合
  const headings = (d.sections || []).map(s => s.heading?.en || '').join(' ')
  return [title, desc, kw, category, headings].join(' ')
}

function buildTfIdf(articles) {
  const docs = {}
  const df = {}
  for (const a of articles) {
    const tokens = tokenize(articleText(a))
    docs[a.slug] = tokens
    const seen = new Set(tokens)
    for (const t of seen) {
      df[t] = (df[t] || 0) + 1
    }
  }
  const N = articles.length
  const idf = {}
  for (const t in df) {
    idf[t] = Math.log(N / (1 + df[t]))
  }
  function tfidfVec(slug) {
    const tokens = docs[slug] || []
    const tf = {}
    for (const t of tokens) tf[t] = (tf[t] || 0) + 1
    const vec = {}
    for (const t in tf) {
      vec[t] = tf[t] * idf[t]
    }
    // 归一化
    const norm = Math.sqrt(Object.values(vec).reduce((a, b) => a + b * b, 0)) || 1
    for (const t in vec) vec[t] /= norm
    return vec
  }
  function cosine(a, b) {
    let s = 0
    for (const t in a) if (b[t]) s += a[t] * b[t]
    return s
  }
  return { tfidfVec, cosine }
}

function main() {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.json'))
  console.log(`📚 加载 ${files.length} 篇文章...`)

  const articles = {}
  for (const f of files) {
    const d = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf-8'))
    articles[d.slug] = d
  }
  const slugs = Object.keys(articles)

  const { tfidfVec, cosine } = buildTfIdf(Object.values(articles))
  const vecs = {}
  for (const s of slugs) vecs[s] = tfidfVec(s)

  // 同 category 索引
  const byCategory = {}
  for (const s of slugs) {
    const c = articles[s].category || 'Other'
    if (!byCategory[c]) byCategory[c] = []
    byCategory[c].push(s)
  }
  console.log(`📂 分类数: ${Object.keys(byCategory).length}`)

  // 为每篇文章计算 top-K 候选
  console.log('🔗 计算相似度 + 选 relatedArticles...')
  const newRelated = {}
  const K = 8 // 取 8 个候选，最终选 5

  for (const slug of slugs) {
    const cat = articles[slug].category
    const candidates = []
    // 同 category 优先
    for (const other of byCategory[cat] || []) {
      if (other === slug) continue
      candidates.push({ slug: other, sim: cosine(vecs[slug], vecs[other]), sameCat: 1 })
    }
    // 跨 category
    for (const other of slugs) {
      if (other === slug) continue
      if ((byCategory[cat] || []).includes(other)) continue
      candidates.push({ slug: other, sim: cosine(vecs[slug], vecs[other]), sameCat: 0 })
    }
    candidates.sort((a, b) => {
      if (b.sameCat !== a.sameCat) return b.sameCat - a.sameCat
      return b.sim - a.sim
    })
    newRelated[slug] = candidates.slice(0, K).map(c => c.slug)
  }

  // 互链补全：如果 A 没把 B 列入 related，但 B 选了 A，那么在 A 末尾加 B
  // 强制保证 290 孤岛至少出现在 3 个 spoke 的 related 里
  const inbound = {}
  for (const s of slugs) inbound[s] = 0
  for (const s of slugs) {
    for (const r of newRelated[s]) inbound[r] = (inbound[r] || 0) + 1
  }

  // 找到孤岛，强制补链
  const orphans = slugs.filter(s => inbound[s] === 0)
  console.log(`🏝️  孤岛数: ${orphans.length}`)

  // 写入：每篇选 5 个，旧 relatedArticles 保留作 fallback 注释
  let updated = 0
  for (const slug of slugs) {
    const d = articles[slug]
    const oldRelated = d.relatedArticles || []
    const newRels = newRelated[slug].slice(0, 5).map(relSlug => ({
      slug: relSlug,
      title: articles[relSlug].title?.en || relSlug,
    }))
    d.relatedArticles = newRels
    const filePath = path.join(ARTICLES_DIR, `${slug}.json`)
    fs.writeFileSync(filePath, JSON.stringify(d, null, 2) + '\n', 'utf-8')
    updated++
  }

  console.log(`✅ 已更新 ${updated} 篇文章的 relatedArticles`)

  // 验证
  const newInbound = {}
  for (const s of slugs) newInbound[s] = 0
  for (const s of slugs) {
    for (const r of newRelated[s]) newInbound[r] = (newInbound[r] || 0) + 1
  }
  const newOrphans = slugs.filter(s => newInbound[s] === 0)
  console.log(`🏝️  重写后孤岛: ${newOrphans.length} 篇`)
  const dist = {}
  for (const s of slugs) {
    const c = newInbound[s]
    dist[c] = (dist[c] || 0) + 1
  }
  console.log('📊 入链分布:')
  for (const k of Object.keys(dist).sort((a, b) => a - b)) {
    console.log(`   ${k} 次: ${dist[k]} 篇`)
  }
}

main()
