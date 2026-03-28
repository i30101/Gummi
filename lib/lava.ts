/**
 * Lava AI integration — all Lava-related logic lives here.
 * To remove: delete this file + app/api/ai/ and revert the small
 * changes in search/route.ts, ProductCard, MasonryGrid, UserProfile, page.tsx.
 */

const LAVA_BASE = "https://api.lava.so";
const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

type Message = { role: "system" | "user" | "assistant"; content: string };

async function lavaChat(
  messages: Message[],
  maxTokens = 150
): Promise<string | null> {
  const key = process.env.LAVA_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(
      `${LAVA_BASE}/v1/forward?u=${encodeURIComponent(GROQ_CHAT_URL)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: MODEL, messages, max_tokens: maxTokens, stream: false }),
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() ?? null;
  } catch {
    return null;
  }
}

/** Expand a natural-language search query into product keywords. Falls back to original on failure. */
export async function expandSearchQuery(query: string): Promise<string> {
  const result = await lavaChat(
    [
      {
        role: "system",
        content:
          "Rewrite shopping search queries as clean product keywords for a social commerce app. Return only keywords, no punctuation or explanation. Maximum 6 words.",
      },
      { role: "user", content: query },
    ],
    30
  );
  return result || query;
}

export type ProductHint = {
  id: string;
  title: string;
  brand: string;
  friendNames: string[];
};

/**
 * Batch-generate "Why This?" micro-captions for a list of products.
 * Returns a map of productId → reason string.
 */
export async function getProductReasons(
  products: ProductHint[]
): Promise<Record<string, string>> {
  if (products.length === 0) return {};

  const capped = products.slice(0, 15);
  const list = capped
    .map((p, i) => {
      const friends = p.friendNames.slice(0, 2).join(" and ");
      return `${i + 1}. "${p.title}" by ${p.brand}${friends ? ` (${friends} bought it)` : ""}`;
    })
    .join("\n");

  const result = await lavaChat(
    [
      {
        role: "system",
        content:
          'You write short social commerce micro-captions. For each numbered product, write exactly 8 words max explaining why it fits the user\'s social circle taste. Sound human, not like an ad. Return ONLY valid JSON like: {"1":"reason here","2":"reason here"}',
      },
      { role: "user", content: list },
    ],
    600
  );

  if (!result) return {};

  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return {};
    const parsed = JSON.parse(jsonMatch[0]);
    const reasons: Record<string, string> = {};
    capped.forEach((p, i) => {
      const r = parsed[String(i + 1)];
      if (typeof r === "string") reasons[p.id] = r;
    });
    return reasons;
  } catch {
    return {};
  }
}

/** Generate a one-sentence taste profile for a user based on their Gumi history. */
export async function getProfileSummary(
  userName: string,
  productTitles: string[]
): Promise<string | null> {
  return lavaChat(
    [
      {
        role: "system",
        content:
          "Write a 1-sentence taste profile for a social commerce user. Be specific about their aesthetic and price range. Sound like a friend describing them, not marketing copy. Max 20 words.",
      },
      {
        role: "user",
        content: `${userName.split(" ")[0]} has bought: ${productTitles.slice(0, 8).join(", ")}`,
      },
    ],
    80
  );
}
