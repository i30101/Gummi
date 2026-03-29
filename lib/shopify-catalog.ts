import { Product } from "@/types";

const USE_MOCK_DATA = !process.env.SHOPIFY_CATALOG_CLIENT_ID;
const CLIENT_ID = process.env.SHOPIFY_CATALOG_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.SHOPIFY_CATALOG_CLIENT_SECRET ?? "";

const BASE_URL = "https://discover.shopifyapps.com/global/v2";

// In-memory token cache
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await fetch("https://shopify.com/authentication/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token fetch failed: ${response.status}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  // Refresh 5 minutes before expiry
  tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
  return cachedToken!;
}

type ShopifySearchParams = {
  query?: string;
  cursor?: string;
  limit?: number;
  priceMin?: number;
  priceMax?: number;
  categoryIds?: string[];
  shipTo?: string;
  categoryId?: string; // internal: for mock data routing
};

type ShopifyProduct = {
  id: string;
  title: string;
  description?: string;
  media?: { url: string; alt?: string }[];
  priceRange?: {
    min?: { amount: number; currency: string };
    max?: { amount: number; currency: string };
  };
  rating?: { count: number; average: number };
  options?: { name: string; values: string[] }[];
  topFeatures?: string[];
  uniqueSellingPoint?: string;
  variants?: {
    id: string;
    media?: { url: string; alt?: string }[];
    price?: { amount: number; currency: string };
    shop?: { id: string; url: string; myshopifyDomain?: string; name?: string };
    onlineStoreUrl?: string;
  }[];
};

function transformProduct(sp: ShopifyProduct): Product {
  const primaryMedia = sp.media?.[0];
  const variant = sp.variants?.[0];
  const shopName = variant?.shop?.name || variant?.shop?.myshopifyDomain?.replace(".myshopify.com", "") || "Shop";

  const priceMin = sp.priceRange?.min?.amount ?? variant?.price?.amount ?? 0;
  const priceMax = sp.priceRange?.max?.amount ?? priceMin;
  const currency = sp.priceRange?.min?.currency ?? variant?.price?.currency ?? "USD";

  // Prices from Shopify may be in dollars or cents — normalize to cents
  const minCents = priceMin < 100 ? priceMin * 100 : priceMin;
  const maxCents = priceMax < 100 ? priceMax * 100 : priceMax;

  return {
    id: sp.id,
    title: sp.title,
    brand: shopName.charAt(0).toUpperCase() + shopName.slice(1),
    primaryImage: {
      url: primaryMedia?.url || "",
      alt: primaryMedia?.alt || sp.title,
    },
    images: (sp.media || []).map((m) => ({
      url: m.url,
      alt: m.alt || sp.title,
    })),
    price: {
      min: minCents,
      max: maxCents,
      currency,
    },
    rating: sp.rating?.count ? { average: sp.rating.average, count: sp.rating.count } : null,
    buyUrl: variant?.onlineStoreUrl || variant?.shop?.url || "#",
    topFeatures: sp.topFeatures || [],
    description: sp.description || sp.uniqueSellingPoint || undefined,
    // Random-ish social metrics seeded from ID
    gummis: Math.abs(hashCode(sp.id)) % 50000 + 100,
    shares: Math.abs(hashCode(sp.id + "s")) % 5000 + 10,
    gummiedByFriends: [],
  };
}

function hashCode(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  }
  return hash;
}

export async function searchProducts(params: ShopifySearchParams): Promise<{
  products: Product[];
  nextCursor: string | null;
  hasMore: boolean;
}> {
  if (USE_MOCK_DATA) {
    const { getMockProducts, searchMockProducts } = await import("./mock-data");
    // If this is a feed/category request (has categoryId), use getMockProducts
    if (params.categoryId) {
      return getMockProducts(params.cursor ?? null, params.limit ?? 15, params.categoryId);
    }
    // If this is a user search, do text matching
    if (params.query) {
      return searchMockProducts(params.query, params.cursor ?? null, params.limit ?? 15);
    }
    return getMockProducts(params.cursor ?? null, params.limit ?? 15);
  }

  const token = await getToken();
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.set("q", params.query);
  searchParams.set("available_for_sale", "1");
  if (params.priceMin) searchParams.set("price_min", String(params.priceMin));
  if (params.priceMax) searchParams.set("price_max", String(params.priceMax));
  if (params.shipTo) searchParams.set("ship_to", params.shipTo);
  if (params.categoryIds?.length) {
    searchParams.set("taxonomy_category_ids", params.categoryIds.join(","));
  }
  searchParams.set("limit", String(params.limit ?? 30));
  if (params.cursor) searchParams.set("cursor", params.cursor);

  const response = await fetch(`${BASE_URL}/search?${searchParams}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Shopify search failed: ${response.status}`);
  }

  const data = await response.json();
  const products = (data.products || data.results || []).map(transformProduct);
  const nextCursor = data.cursor || data.nextCursor || null;

  return {
    products,
    nextCursor,
    hasMore: !!nextCursor,
  };
}

export async function getProduct(upid: string): Promise<Product | null> {
  if (USE_MOCK_DATA) {
    const { MOCK_PRODUCTS } = await import("./mock-data");
    return MOCK_PRODUCTS.find((p) => p.id === upid) ?? null;
  }

  const token = await getToken();
  const response = await fetch(`${BASE_URL}/p/${encodeURIComponent(upid)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return null;

  const data = await response.json();
  return transformProduct(data);
}

export { USE_MOCK_DATA };
