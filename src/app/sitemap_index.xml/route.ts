import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.redirect(
    new URL('/sitemap-index.xml', 'https://kk-electric.com'),
    { status: 301 }
  )
}
