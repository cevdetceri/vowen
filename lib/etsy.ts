// Etsy Open API v3 integration
// API key: register free at https://www.etsy.com/developers/register
// Set ETSY_API_KEY in .env.local

const ETSY_API_BASE = "https://openapi.etsy.com/v3/application";
const SHOP_ID = 65843420; // VowenOfficial

export interface EtsyListing {
  listing_id: number;
  title: string;
  description: string;
  price: { amount: number; divisor: number; currency_code: string };
  state: string;
  url: string;
  tags: string[];
  taxonomy_path: string[];
  images?: EtsyImage[];
  videos?: EtsyVideo[];
}

export interface EtsyImage {
  listing_image_id: number;
  url_fullxfull: string;
  url_570xN: string;
  url_170x135: string;
  rank: number;
}

export interface EtsyVideo {
  video_id: number;
  video_width: number;
  video_height: number;
  video_url: string;
  video_state: string;
}

export interface EtsyProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  currency: string;
  url: string;
  tags: string[];
  images: string[];
  thumbnail: string;
  videos: string[];
  category: "earrings" | "veils" | "other";
}

function categorize(listing: EtsyListing): "earrings" | "veils" | "other" {
  const text = (listing.title + " " + listing.tags.join(" ")).toLowerCase();
  if (text.includes("veil") || text.includes("peçe") || text.includes("tül")) return "veils";
  if (text.includes("earring") || text.includes("küpe")) return "earrings";
  const path = listing.taxonomy_path?.join(" ").toLowerCase() ?? "";
  if (path.includes("earring")) return "earrings";
  if (path.includes("veil")) return "veils";
  return "other";
}

function formatPrice(price: EtsyListing["price"]): string {
  const amount = price.amount / price.divisor;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: price.currency_code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

async function etsyFetch(path: string, apiKey: string) {
  const res = await fetch(`${ETSY_API_BASE}${path}`, {
    headers: { "x-api-key": apiKey },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Etsy API error ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function fetchAllEtsyProducts(apiKey: string): Promise<EtsyProduct[]> {
  const allListings: EtsyListing[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const data = await etsyFetch(
      `/shops/${SHOP_ID}/listings/active?limit=${limit}&offset=${offset}&includes=Images,Videos`,
      apiKey
    );
    const results: EtsyListing[] = data.results ?? [];
    allListings.push(...results);
    if (results.length < limit) break;
    offset += limit;
  }

  return allListings
    .filter((l) => l.state === "active")
    .map((listing) => ({
      id: listing.listing_id,
      title: listing.title,
      description: listing.description?.slice(0, 300) ?? "",
      price: formatPrice(listing.price),
      currency: listing.price.currency_code,
      url: listing.url,
      tags: listing.tags,
      images: (listing.images ?? [])
        .sort((a, b) => a.rank - b.rank)
        .map((img) => img.url_fullxfull),
      thumbnail: listing.images?.[0]?.url_fullxfull ?? "",
      videos: (listing.videos ?? [])
        .filter((v) => v.video_state === "active")
        .map((v) => v.video_url),
      category: categorize(listing),
    }));
}

export async function fetchEtsyShopInfo(apiKey: string) {
  return etsyFetch(`/shops/${SHOP_ID}`, apiKey);
}
