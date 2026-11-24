import puppeteer from 'puppeteer-core';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:3001/#projects', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1000));

  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + 900);
    }
  });
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({ path: 'screenshots/healix-card.png' });
  console.log('Saved screenshots/healix-card.png');
  await browser.close();
}

capture().catch(console.error);
