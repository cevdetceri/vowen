import { chromium } from "playwright-extra";
import StealthPlugin from "playwright-extra-plugin-stealth";
import { writeFileSync } from "fs";

chromium.use(StealthPlugin());

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    locale: "en-GB",
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-GB,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Connection": "keep-alive",
      "Upgrade-Insecure-Requests": "1",
    },
  });

  const page = await context.newPage();
  console.log("Opening Etsy shop with stealth...");

  await page.goto("https://www.etsy.com/shop/VowenOfficial", { waitUntil: "networkidle", timeout: 45000 });
  await sleep(5000);

  const title = await page.title();
  console.log("Page title:", title);

  // Check if we got past captcha
  const url = page.url();
  console.log("Current URL:", url);

  const content = await page.content();
  if (content.includes("captcha") || content.includes("DataDome")) {
    console.log("Still blocked by captcha :(");
    writeFileSync("scripts/etsy-debug2.html", content.substring(0, 5000));
    await browser.close();
    return;
  }

  // Scroll to load lazy images
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await sleep(2000);

  const products = await page.evaluate(() => {
    const items = [];
    const seen = new Set();

    document.querySelectorAll("a[href*='/listing/']").forEach((link) => {
      const href = link.href?.split("?")[0];
      if (!href || seen.has(href)) return;

      const card = link.closest("li") || link.parentElement;
      const img = card?.querySelector("img") || link.querySelector("img");
      const imgUrl = img?.src || img?.dataset?.src || "";

      const titleEl = card?.querySelector("h3, h2, [class*='title'], p");
      const title = titleEl?.textContent?.trim() || link.getAttribute("aria-label") || "";

      const priceEl = card?.querySelector("[class*='price'], .currency-value, .currency-symbol");
      const price = priceEl?.textContent?.trim() || "";

      if (title && href.includes("/listing/")) {
        seen.add(href);
        items.push({ title, price, imgUrl, href });
      }
    });

    return items;
  });

  console.log(`Found ${products.length} products`);
  if (products.length > 0) {
    products.forEach(p => console.log(`  - ${p.title} | ${p.price} | ${p.imgUrl.slice(0,80)}`));
    writeFileSync("scripts/etsy-products.json", JSON.stringify(products, null, 2));
    console.log("Saved to scripts/etsy-products.json");
  } else {
    const html = await page.content();
    writeFileSync("scripts/etsy-debug2.html", html.substring(0, 20000));
    console.log("No products found. Saved debug HTML.");
  }

  await browser.close();
})();
