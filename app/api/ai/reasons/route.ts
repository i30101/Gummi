import { NextRequest, NextResponse } from "next/server";
import { getProductReasons, ProductHint } from "@/lib/lava";
import { getUserById } from "@/lib/mock-users";

export async function POST(request: NextRequest) {
  const { products } = await request.json() as { products: Array<{ id: string; title: string; brand: string; gumiedByFriends?: string[] }> };

  const hints: ProductHint[] = products.map((p) => ({
    id: p.id,
    title: p.title,
    brand: p.brand,
    friendNames: (p.gumiedByFriends ?? [])
      .map((id) => getUserById(id)?.name ?? "")
      .filter(Boolean),
  }));

  const reasons = await getProductReasons(hints);
  return NextResponse.json(reasons);
}
