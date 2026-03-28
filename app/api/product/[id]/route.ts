import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/shopify-catalog";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await getProduct(decodeURIComponent(id));

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
