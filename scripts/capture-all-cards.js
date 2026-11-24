import puppeteer from 'puppeteer-core';

async function captureAllCards() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:3001/#projects', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1200));

  const scrollOffsets = [
    { name: 'card-1-fitora', offset: 200 },
    { name: 'card-2-healix', offset: 900 },
    { name: 'card-3-drone', offset: 1600 },
    { name: 'card-4-algo', offset: 2300 },
  ];

  for (const item of scrollOffsets) {
    await page.evaluate((yOffset) => {
      const el = document.getElementById('projects');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top + yOffset);
      }
    }, item.offset);

    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: `screenshots/${item.name}.png` });
    console.log(`Saved screenshots/${item.name}.png`);
  }

  await browser.close();
}

captureAllCards().catch(console.error);
