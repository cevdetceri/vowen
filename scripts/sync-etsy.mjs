/**
 * Etsy automatic product sync script
 * Usage: node scripts/sync-etsy.mjs
 *
 * Requires ETSY_API_KEY in .env.local
 * Register free at: https://www.etsy.com/developers/register
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

// Load .env.local manually (dotenv is not installed)
function loadEnv() {
  const envPath = join(rootDir, ".env.local");
  if (!existsSync(envPath)) {
    console.error(".env.local not found");
    return {};
  }
  const lines = readFileSync(envPath, "utf-8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    env[key] = value;
  }
  return env;
}

const ETSY_API_BASE = "https://openapi.etsy.com/v3/application";
const SHOP_ID = 65843420; // VowenOfficial

async function etsyFetch(path, apiKey) {
  const res = await fetch(`${ETSY_API_BASE}${path}`, {
    headers: { "x-api-key": apiKey },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Etsy API ${res.status}: ${body}`);
  }
  return res.json();
}

function categorize(listing) {
  const text = (listing.title + " " + listing.tags.join(" ")).toLowerCase();
  if (text.includes("veil") || text.includes("peçe") || text.includes("tül")) return "veils";
  if (text.includes("earring") || text.includes("küpe")) return "earrings";
  const path = (listing.taxonomy_path ?? []).join(" ").toLowerCase();
  if (path.includes("earring")) return "earrings";
  if (path.includes("veil")) return "veils";
  return "other";
}

function formatPrice(price) {
  const amount = price.amount / price.divisor;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: price.currency_code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

async function run() {
  const env = loadEnv();
  const apiKey = env.ETSY_API_KEY;

  if (!apiKey || apiKey === "your-etsy-api-key") {
    console.error(`
╔══════════════════════════════════════════════════════════════╗
║  ETSY_API_KEY not set                                        ║
║                                                              ║
║  1. Go to: https://www.etsy.com/developers/register         ║
║  2. Create an app (any name, use your site URL)              ║
║  3. Copy the "Keystring" (API key)                           ║
║  4. Add to .env.local:  ETSY_API_KEY=your-key-here          ║
║  5. Run this script again: node scripts/sync-etsy.mjs        ║
╚══════════════════════════════════════════════════════════════╝
`);
    process.exit(1);
  }

  console.log("Fetching products from Etsy shop VowenOfficial...\n");

  // Test API key first
  try {
    const shop = await etsyFetch(`/shops/${SHOP_ID}`, apiKey);
    console.log(`Shop: ${shop.shop_name} (${shop.listing_active_count} active listings)\n`);
  } catch (err) {
    console.error("API key error:", err.message);
    process.exit(1);
  }

  const allListings = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    process.stdout.write(`Fetching listings ${offset + 1}...`);
    const data = await etsyFetch(
      `/shops/${SHOP_ID}/listings/active?limit=${limit}&offset=${offset}&includes=Images,Videos`,
      apiKey
    );
    const results = data.results ?? [];
    allListings.push(...results);
    console.log(` got ${results.length}`);
    if (results.length < limit) break;
    offset += limit;
  }

  console.log(`\nTotal active listings: ${allListings.length}`);

  const products = allListings.map((listing) => ({
    id: listing.listing_id,
    title: listing.title,
    description: listing.description?.slice(0, 300) ?? "",
    price: formatPrice(listing.price),
    currency: listing.price.currency_code,
    url: listing.url,
    tags: listing.tags ?? [],
    images: (listing.images ?? [])
      .sort((a, b) => a.rank - b.rank)
      .map((img) => img.url_fullxfull),
    thumbnail: listing.images?.[0]?.url_fullxfull ?? "",
    videos: (listing.videos ?? [])
      .filter((v) => v.video_state === "active")
      .map((v) => v.video_url),
    category: categorize(listing),
  }));

  const earrings = products.filter((p) => p.category === "earrings");
  const veils = products.filter((p) => p.category === "veils");
  const other = products.filter((p) => p.category === "other");

  console.log(`  Earrings: ${earrings.length}`);
  console.log(`  Veils: ${veils.length}`);
  console.log(`  Other: ${other.length}`);

  const output = {
    synced_at: new Date().toISOString(),
    shop_id: SHOP_ID,
    total: products.length,
    earrings,
    veils,
    other,
    all: products,
  };

  const outPath = join(rootDir, "public", "etsy-products.json");
  writeFileSync(outPath, JSON.stringify(output, null, 2));

  console.log(`\n✓ Saved ${products.length} products to public/etsy-products.json`);
  console.log("  Deploy your site or restart the dev server to see updates.");

  // Print sample products
  if (earrings.length > 0) {
    console.log("\nSample earrings:");
    earrings.slice(0, 3).forEach((p) => console.log(`  - ${p.title} | ${p.price}`));
  }
  if (veils.length > 0) {
    console.log("\nSample veils:");
    veils.slice(0, 3).forEach((p) => console.log(`  - ${p.title} | ${p.price}`));
  }
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
