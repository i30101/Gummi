import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/shopify-catalog";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") || "";
  const cursor = searchParams.get("cursor") || undefined;
  const limit = parseInt(searchParams.get("limit") || "15", 10);

  if (!q.trim()) {
    return NextResponse.json({ products: [], nextCursor: null, hasMore: false });
  }

  const result = await searchProducts({ query: q, cursor, limit });
  return NextResponse.json(result);
}
