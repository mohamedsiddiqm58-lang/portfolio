import puppeteer from 'puppeteer-core';
import os from 'os';
import path from 'path';

async function capture() {
  const tempDir = path.join(os.tmpdir(), 'puppeteer-temp-' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    userDataDir: tempDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:3001/#projects', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight - 1600);
  });
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({ path: 'screenshots/card-4-algo-captured.png' });
  console.log('Saved screenshots/card-4-algo-captured.png');
  await browser.close();
}

capture().catch(console.error);
