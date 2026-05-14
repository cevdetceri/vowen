import { chromium } from "playwright";
import { writeFileSync } from "fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    locale: "en-GB",
    viewport: { width: 1280, height: 900 },
  });

  const page = await context.newPage();
  console.log("Opening Etsy shop...");

  await page.goto("https://www.etsy.com/shop/VowenOfficial", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  await sleep(4000);

  // Extract products
  const products = await page.evaluate(() => {
    const items = [];
    // Etsy listing cards
    const cards = document.querySelectorAll("[data-listing-id], .js-merch-stash-check-listing, li[data-palette]");

    // Try various selectors
    const allCards = document.querySelectorAll("li.wt-list-unstyled, div[data-listing-id]");

    document.querySelectorAll("a[href*='/listing/']").forEach((link) => {
      const card = link.closest("li") || link.closest("div[data-listing-id]") || link;
      if (!card) return;

      // Get image
      const img = card.querySelector("img");
      const imgUrl = img?.src || img?.getAttribute("data-src") || "";

      // Get title
      const titleEl = card.querySelector("h3, h2, [class*='title'], [class*='listing-name']");
      const title = titleEl?.textContent?.trim() || link.getAttribute("aria-label") || "";

      // Get price
      const priceEl = card.querySelector("[class*='price'], .currency-value, .n-listing-card__price");
      const price = priceEl?.textContent?.trim() || "";

      const href = link.href;

      if (title && href.includes("/listing/") && !items.find((i) => i.href === href)) {
        items.push({ title, price, imgUrl, href });
      }
    });

    return items;
  });

  console.log(`Found ${products.length} products`);

  if (products.length === 0) {
    // Dump page HTML for debugging
    const html = await page.content();
    writeFileSync("scripts/etsy-debug.html", html.substring(0, 50000));
    console.log("Saved debug HTML to scripts/etsy-debug.html");
  } else {
    writeFileSync("scripts/etsy-products.json", JSON.stringify(products, null, 2));
    console.log("Saved to scripts/etsy-products.json");
    products.forEach((p) => console.log(`- ${p.title} | ${p.price} | ${p.imgUrl.substring(0, 60)}`));
  }

  await browser.close();
})();
