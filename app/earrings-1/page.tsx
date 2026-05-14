import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopifyEarringsGrid from "@/components/pages/ShopifyEarringsGrid";
import { getProductsByCollection, getAllProducts } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Earrings — VOWEN Studio",
  description: "Shop our statement bridal earring collection.",
};

export default async function EarringsPage() {
  let products = await getProductsByCollection("earrings").catch(() => []);
  if (products.length === 0) products = await getAllProducts(24).catch(() => []);

  return (
    <main>
      <Navbar />
      <div className="pt-[64px]">
        <ShopifyEarringsGrid products={products} />
      </div>
      <Footer />
    </main>
  );
}
