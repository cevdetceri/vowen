import { NextResponse } from "next/server";
import { fetchAllEtsyProducts } from "@/lib/etsy";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST() {
  const apiKey = process.env.ETSY_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ETSY_API_KEY not configured. Add it to .env.local." },
      { status: 500 }
    );
  }

  try {
    const products = await fetchAllEtsyProducts(apiKey);

    const earrings = products.filter((p) => p.category === "earrings");
    const veils = products.filter((p) => p.category === "veils");
    const other = products.filter((p) => p.category === "other");

    const output = {
      synced_at: new Date().toISOString(),
      total: products.length,
      earrings,
      veils,
      other,
      all: products,
    };

    const outPath = join(process.cwd(), "public", "etsy-products.json");
    await writeFile(outPath, JSON.stringify(output, null, 2));

    return NextResponse.json({
      success: true,
      total: products.length,
      earrings: earrings.length,
      veils: veils.length,
      other: other.length,
      synced_at: output.synced_at,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
