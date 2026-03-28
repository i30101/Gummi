import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/shopify-catalog";
import { CATEGORIES } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") || "for-you";
  const cursor = searchParams.get("cursor") || undefined;
  const limit = parseInt(searchParams.get("limit") || "15", 10);

  const cat = CATEGORIES.find((c) => c.id === category);
  const query = cat?.query || "trending aesthetic lifestyle";

  const result = await searchProducts({ query, cursor, limit, categoryId: category });
  return NextResponse.json(result);
}
