import puppeteer from 'puppeteer-core';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3001/#projects', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1000));

  const el = await page.$('#projects');
  if (el) {
    await el.scrollIntoView();
    await new Promise((r) => setTimeout(r, 1000));
  }
  await page.screenshot({ path: 'screenshots/projects-fitora.png' });
  console.log('Saved screenshots/projects-fitora.png');
  await browser.close();
}

capture().catch(console.error);
