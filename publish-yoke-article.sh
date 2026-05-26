#!/bin/bash
# YOKE AVR 文章发布脚本
# 用法: bash publish-yoke-article.sh [article-slug]

set -e
cd "$(dirname "$0")"

SLUG="${1:-}"
ARTICLES_DIR="content/articles"
WORKSPACE="$HOME/workspace/yoke-voltage-regulator"

cd "$WORKSPACE"

SLUG="${1:-}"
ARTICLES_DIR="content/articles"

if [ -n "$SLUG" ]; then
  if [ ! -f "$ARTICLES_DIR/${SLUG}.json" ]; then
    echo "❌ 文章不存在: $ARTICLES_DIR/${SLUG}.json"
    exit 1
  fi
  echo "📝 发布文章: $SLUG"
fi

# Git操作
echo "📦 提交到Git..."
git add "$ARTICLES_DIR/" src/lib/articles.ts "src/app/[locale]/industry/" public/images/
if git diff --cached --quiet; then
  echo "✅ 没有变更需要提交"
else
  MSG="content: add/update articles"
  [ -n "$SLUG" ] && MSG="content: publish article '$SLUG'"
  git commit -m "$MSG"
  echo "🚀 推送到GitHub..."
  git push origin main 2>/dev/null || git push origin master 2>/dev/null
  echo "✅ 推送成功！Vercel将自动部署"
fi

echo ""
echo "🌐 网站地址: https://kk-electric.com"