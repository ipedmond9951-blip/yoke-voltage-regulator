const { chromium } = require('/Users/zhangming/workspace/open-design/node_modules/.pnpm/playwright@1.59.1/node_modules/playwright');

const wsUrl = process.argv[2];
const domain = process.argv[3] || 'kk-electric.com';

(async () => {
  console.log('Connecting via CDP WebSocket...');
  const browser = await chromium.connectOverCDP(wsUrl, { timeout: 15000 });
  console.log('Browser connected');

  const context = browser.contexts()[0];
  const page = context.pages()[0] || await context.newPage();

  // Go to GSC sitemap page
  const gscUrl = `https://search.google.com/search-console/sitemaps?resource_id=sc-domain:${domain}`;
  console.log('Navigating to:', gscUrl);
  await page.goto(gscUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(3000);

  console.log('URL after nav:', page.url());
  const text = await page.evaluate(() => document.body.innerText);
  console.log('Body text:', text.substring(0, 3000));

  await page.screenshot({ path: '/tmp/gsc-sitemap-status.png', fullPage: true });
  console.log('Screenshot: /tmp/gsc-sitemap-status.png');

  await browser.close();
  process.exit(0);
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });