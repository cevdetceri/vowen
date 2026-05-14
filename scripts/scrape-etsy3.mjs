import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { writeFileSync } from "fs";

puppeteer.use(StealthPlugin());

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1280,900"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36");

  console.log("Opening Etsy shop...");
  await page.goto("https://www.etsy.com/shop/VowenOfficial", { waitUntil: "networkidle2", timeout: 45000 });
  await sleep(4000);

  const title = await page.title();
  console.log("Page title:", title);

  const content = await page.content();
  if (content.includes("captcha") || content.includes("DataDome")) {
    console.log("Blocked by bot protection.");
    writeFileSync("scripts/etsy-debug3.html", content.substring(0, 8000));
    await browser.close();
    return;
  }

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
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
      const titleEl = card?.querySelector("h3, h2, p");
      const title = titleEl?.textContent?.trim() || link.getAttribute("aria-label") || "";
      const priceEl = card?.querySelector("[class*='price'], .currency-value");
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
    products.forEach(p => console.log(`  - ${p.title} | ${p.price} | ${p.imgUrl.slice(0, 80)}`));
    writeFileSync("scripts/etsy-products.json", JSON.stringify(products, null, 2));
  } else {
    const html = await page.content();
    writeFileSync("scripts/etsy-debug3.html", html.substring(0, 20000));
    console.log("Saved debug HTML.");
  }

  await browser.close();
})();
