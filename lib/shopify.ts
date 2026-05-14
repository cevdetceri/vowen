import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: "2026-01",
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

// ── Types ──────────────────────────────────────────────────────────────────

export type ShopifyImage = { url: string; altText: string | null };

export type ShopifyProductVariant = {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyProductVariant }[] };
  collections: { edges: { node: { handle: string; title: string } }[] };
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string; handle: string };
    image: ShopifyImage | null;
    price: { amount: string; currencyCode: string };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { totalAmount: { amount: string; currencyCode: string } };
  lines: { edges: { node: ShopifyCartLine }[] };
};

// ── Queries ─────────────────────────────────────────────────────────────────

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 10) {
    edges {
      node {
        id title availableForSale
        price { amount currencyCode }
      }
    }
  }
  collections(first: 3) { edges { node { handle title } } }
`;

export async function getProductsByCollection(
  collectionHandle: string,
  first = 24
): Promise<ShopifyProduct[]> {
  const query = `
    query CollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first) {
          edges { node { ${PRODUCT_FIELDS} } }
        }
      }
    }
  `;
  const { data, errors } = await shopifyClient.request(query, {
    variables: { handle: collectionHandle, first },
  });
  if (errors) console.error("Shopify error:", errors);
  return (data?.collection?.products?.edges ?? []).map((e: { node: ShopifyProduct }) => e.node);
}

export async function getAllProducts(first = 48): Promise<ShopifyProduct[]> {
  const query = `
    query AllProducts($first: Int!) {
      products(first: $first) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }
  `;
  const { data, errors } = await shopifyClient.request(query, {
    variables: { first },
  });
  if (errors) console.error("Shopify error:", errors);
  return (data?.products?.edges ?? []).map((e: { node: ShopifyProduct }) => e.node);
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query Product($handle: String!) {
      product(handle: $handle) { ${PRODUCT_FIELDS} }
    }
  `;
  const { data } = await shopifyClient.request(query, { variables: { handle } });
  return data?.product ?? null;
}

// ── Cart mutations ───────────────────────────────────────────────────────────

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost { totalAmount { amount currencyCode } }
  lines(first: 30) {
    edges {
      node {
        id quantity
        merchandise {
          ... on ProductVariant {
            id title
            price { amount currencyCode }
            image { url altText }
            product { title handle }
          }
        }
      }
    }
  }
`;

export async function createCart(): Promise<ShopifyCart> {
  const { data } = await shopifyClient.request(`
    mutation { cartCreate { cart { ${CART_FIELDS} } } }
  `);
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<ShopifyCart> {
  const { data } = await shopifyClient.request(`
    mutation AddLine($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }
  `, { variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] } });
  return data.cartLinesAdd.cart;
}

export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<ShopifyCart> {
  const { data } = await shopifyClient.request(`
    mutation RemoveLine($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } }
    }
  `, { variables: { cartId, lineIds: [lineId] } });
  return data.cartLinesRemove.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const { data } = await shopifyClient.request(`
    mutation UpdateLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }
  `, { variables: { cartId, lines: [{ id: lineId, quantity }] } });
  return data.cartLinesUpdate.cart;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function formatPrice(amount: string, currencyCode = "GBP"): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: currencyCode }).format(
    parseFloat(amount)
  );
}

export function getFirstImage(product: ShopifyProduct): ShopifyImage | null {
  return product.images.edges[0]?.node ?? null;
}
