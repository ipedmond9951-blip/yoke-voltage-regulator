const wsUrl = process.argv[2];
if (!wsUrl) { console.error('Usage: node gsc-grab.js <ws-url>'); process.exit(1); }

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP(wsUrl, { timeout: 10000 });
  const context = browser.contexts()[0];
  const pages = context.pages();
  console.log('Tabs:', pages.length);
  for (const p of pages) {
    console.log('Tab URL:', p.url());
  }
  const page = pages[0] || await context.newPage();
  await page.waitForTimeout(2000);
  const text = await page.evaluate(() => document.body.innerText);
  console.log('Body:', text.substring(0, 4000));
  await browser.close();
  process.exit(0);
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });