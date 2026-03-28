import { NextRequest, NextResponse } from "next/server";
import { getProfileSummary } from "@/lib/lava";

export async function POST(request: NextRequest) {
  const { userName, productTitles } = await request.json() as {
    userName: string;
    productTitles: string[];
  };

  const summary = await getProfileSummary(userName, productTitles);
  return NextResponse.json({ summary });
}
