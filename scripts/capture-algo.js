import puppeteer from 'puppeteer-core';

async function captureAlgoCard() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:3001/#projects', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + 2800);
    }
  });

  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/card-4-algo-full.png' });
  console.log('Saved screenshots/card-4-algo-full.png');
  await browser.close();
}

captureAlgoCard().catch(console.error);
