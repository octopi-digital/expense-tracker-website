const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(100);
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(500);
  const cls = await page.$eval('header', (el) => el.className);
  console.log('className:', cls);
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log('scrollY:', scrollY);
})();
