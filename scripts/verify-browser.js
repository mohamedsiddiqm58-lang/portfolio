import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://localhost:3001/';
const screenshotDir = path.resolve('screenshots');

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function runVerification() {
  console.log('🚀 Starting Automated Headless Chrome Responsive Verification...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  const viewports = [
    { name: 'Desktop', width: 1440, height: 900 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    console.log(`\n📱 Testing Viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Wait a brief moment for initial animations
    await new Promise((r) => setTimeout(r, 600));

    // Check title
    const title = await page.title();
    console.log(`   Page Title: "${title}"`);

    // Check horizontal overflow
    const overflow = await page.evaluate((expectedWidth) => {
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body.scrollWidth;
      return {
        expectedWidth,
        scrollWidth,
        bodyWidth,
        hasOverflow: scrollWidth > expectedWidth || bodyWidth > expectedWidth,
      };
    }, vp.width);

    console.log(`   Width check: ScrollWidth=${overflow.scrollWidth}px vs Viewport=${vp.width}px (Overflow: ${overflow.hasOverflow ? 'FAIL ❌' : 'PASS ✅'})`);

    // Check section existence
    const sections = await page.evaluate(() => {
      return {
        hasHeroHeading: document.querySelector('.hero-heading') !== null,
        heroText: document.querySelector('h1')?.innerText,
        hasAbout: document.getElementById('about') !== null,
        hasSkills: document.getElementById('skills') !== null,
        skillsBg: window.getComputedStyle(document.getElementById('skills')).backgroundColor,
        hasExperience: document.getElementById('experience') !== null,
        hasProjects: document.getElementById('projects') !== null,
        hasContact: document.getElementById('contact') !== null,
        navLinks: Array.from(document.querySelectorAll('nav a')).map(a => a.innerText),
        projectCardsCount: document.querySelectorAll('#projects .sticky').length,
        skillsItemCount: document.querySelectorAll('#skills .font-black').length,
      };
    });

    console.log(`   Hero heading: "${sections.heroText}" (Found: ${sections.hasHeroHeading ? '✅' : '❌'})`);
    console.log(`   Navigation links: [${sections.navLinks.join(', ')}]`);
    console.log(`   Skills section: Found ${sections.hasSkills ? '✅' : '❌'}, Background: ${sections.skillsBg}`);
    console.log(`   Projects sticky cards: Found ${sections.projectCardsCount} cards`);
    console.log(`   Sections present: About=${sections.hasAbout}, Skills=${sections.hasSkills}, Experience=${sections.hasExperience}, Projects=${sections.hasProjects}, Contact=${sections.hasContact}`);

    // Take screenshot
    const shotPath = path.join(screenshotDir, `${vp.name.toLowerCase()}-${vp.width}.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`   Screenshot saved: ${shotPath}`);

    // Scroll to bottom and take full-page screenshot
    const fullShotPath = path.join(screenshotDir, `${vp.name.toLowerCase()}-full.png`);
    await page.screenshot({ path: fullShotPath, fullPage: true });
    console.log(`   Full page screenshot saved: ${fullShotPath}`);
  }

  await browser.close();

  console.log('\n🔍 Console Error Check:');
  if (consoleErrors.length === 0) {
    console.log('   ✅ 0 JavaScript console errors detected!');
  } else {
    console.log(`   ❌ Found ${consoleErrors.length} console errors:`);
    consoleErrors.forEach((e) => console.log('   - ', e));
  }

  console.log('\n🎉 Responsive verification complete!');
}

runVerification().catch((err) => {
  console.error('Verification failed with error:', err);
  process.exit(1);
});
