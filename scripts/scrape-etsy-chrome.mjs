import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { writeFileSync } from "fs";

puppeteer.use(StealthPlugin());

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // use visible browser to bypass DataDome
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    userDataDir: "C:\\Users\\cevde\\AppData\\Local\\Google\\Chrome\\User Data",
    args: [
      "--no-sandbox",
      "--profile-directory=Default",
      "--window-size=1280,900",
    ],
  });

  const page = await browser.newPage();
  console.log("Opening Etsy with your Chrome profile...");

  await page.goto("https://www.etsy.com/shop/VowenOfficial", {
    waitUntil: "networkidle2",
    timeout: 45000,
  });

  await sleep(5000);

  const title = await page.title();
  console.log("Page title:", title);

  // Scroll to load all products
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1000);

  const products = await page.evaluate(() => {
    const items = [];
    const seen = new Set();

    // Try all listing card selectors Etsy uses
    const selectors = [
      '[data-listing-id]',
      '.v2-listing-card',
      '[class*="listing-card"]',
      'li[class*="wt-list"]',
    ];

    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((card) => {
        const link = card.querySelector('a[href*="/listing/"]') || card;
        const href = link?.href?.split('?')[0];
        if (!href || !href.includes('/listing/') || seen.has(href)) return;

        const img = card.querySelector('img');
        const imgUrl = img?.src || img?.getAttribute('data-src') || '';

        const titleEl = card.querySelector('h3, h2, [class*="title"], [class*="name"]');
        const title = titleEl?.innerText?.trim()
          || card.querySelector('a')?.getAttribute('aria-label')
          || '';

        const priceEl = card.querySelector('[class*="price"] .currency-value, [class*="price"]');
        const price = priceEl?.innerText?.trim() || '';

        if (title) {
          seen.add(href);
          items.push({ title, price, imgUrl, href });
        }
      });
      if (items.length > 0) break;
    }

    // Fallback: grab all listing links with aria-labels
    if (items.length === 0) {
      document.querySelectorAll('a[href*="/listing/"][aria-label]').forEach((a) => {
        const href = a.href.split('?')[0];
        if (seen.has(href)) return;
        const card = a.closest('li') || a.closest('div');
        const img = card?.querySelector('img');
        seen.add(href);
        items.push({
          title: a.getAttribute('aria-label'),
          price: card?.querySelector('[class*="price"]')?.innerText?.trim() || '',
          imgUrl: img?.src || '',
          href,
        });
      });
    }

    return items;
  });

  if (products.length > 0) {
    console.log(`\n✓ Found ${products.length} products:\n`);
    products.forEach((p, i) => console.log(`${i + 1}. ${p.title} | ${p.price}`));
    writeFileSync("scripts/etsy-products.json", JSON.stringify(products, null, 2));
    console.log("\nSaved to scripts/etsy-products.json");
  } else {
    console.log("No products found. Check the browser window.");
    await sleep(5000);
  }

  await browser.close();
})();
