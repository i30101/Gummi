import { GummiBearItem } from "@/types/gummi-bear";

export const GUMI_BEAR_ITEMS: GummiBearItem[] = [
  // ─── COLORS (hue shift degrees) ───────────────────────
  { id: "color-default", name: "Cherry", category: "color", price: 0, rarity: "common", hue: 0, isDefault: true },
  { id: "color-coral", name: "Coral Sunset", category: "color", price: 0, rarity: "common", hue: 15, isDefault: true },
  { id: "color-tangerine", name: "Tangerine", category: "color", price: 8, rarity: "common", hue: 30 },
  { id: "color-golden", name: "Golden Honey", category: "color", price: 10, rarity: "common", hue: 50 },
  { id: "color-lime", name: "Lime", category: "color", price: 10, rarity: "common", hue: 90 },
  { id: "color-emerald", name: "Emerald", category: "color", price: 30, rarity: "legendary", hue: 140 },
  { id: "color-mint", name: "Mint", category: "color", price: 12, rarity: "common", hue: 160 },
  { id: "color-ocean", name: "Ocean", category: "color", price: 12, rarity: "common", hue: 200 },
  { id: "color-royal", name: "Royal Blue", category: "color", price: 15, rarity: "rare", hue: 230 },
  { id: "color-midnight", name: "Midnight", category: "color", price: 30, rarity: "legendary", hue: 245 },
  { id: "color-lavender", name: "Lavender", category: "color", price: 15, rarity: "rare", hue: 270 },
  { id: "color-purple", name: "Purple Haze", category: "color", price: 20, rarity: "rare", hue: 290 },
  { id: "color-bubblegum", name: "Bubblegum", category: "color", price: 20, rarity: "rare", hue: 320 },

  // ─── CLOTHING ──────────────────────────────────────────
  { id: "clothing-tshirt", name: "Classic Tee", category: "clothing", price: 8, rarity: "common" },
  { id: "clothing-hoodie", name: "Cozy Hoodie", category: "clothing", price: 12, rarity: "common" },
  { id: "clothing-dress", name: "Mini Dress", category: "clothing", price: 15, rarity: "common" },
  { id: "clothing-blazer", name: "Sharp Blazer", category: "clothing", price: 18, rarity: "rare" },
  { id: "clothing-overalls", name: "Overalls", category: "clothing", price: 12, rarity: "common" },
  { id: "clothing-sweater", name: "Knit Sweater", category: "clothing", price: 10, rarity: "common" },
  { id: "clothing-tuxedo", name: "Tuxedo", category: "clothing", price: 35, rarity: "rare" },
  { id: "clothing-cape", name: "Royal Cape", category: "clothing", price: 60, rarity: "legendary" },

  // ─── ACCESSORIES ───────────────────────────────────────
  { id: "acc-glasses", name: "Round Glasses", category: "accessory", price: 8, rarity: "common" },
  { id: "acc-sunglasses", name: "Sunglasses", category: "accessory", price: 10, rarity: "common" },
  { id: "acc-scarf", name: "Cozy Scarf", category: "accessory", price: 10, rarity: "common" },
  { id: "acc-bowtie", name: "Bow Tie", category: "accessory", price: 8, rarity: "common" },
  { id: "acc-headphones", name: "Headphones", category: "accessory", price: 18, rarity: "rare" },
  { id: "acc-wings", name: "Angel Wings", category: "accessory", price: 55, rarity: "legendary" },

  // ─── HEADWEAR ──────────────────────────────────────────
  { id: "hat-beanie", name: "Beanie", category: "headwear", price: 8, rarity: "common" },
  { id: "hat-crown", name: "Crown", category: "headwear", price: 35, rarity: "rare" },
  { id: "hat-flower", name: "Flower Crown", category: "headwear", price: 15, rarity: "rare" },
  { id: "hat-beret", name: "Beret", category: "headwear", price: 10, rarity: "common" },
  { id: "hat-tophat", name: "Top Hat", category: "headwear", price: 20, rarity: "rare" },
  { id: "hat-cap", name: "Baseball Cap", category: "headwear", price: 8, rarity: "common" },
  { id: "hat-halo", name: "Halo", category: "headwear", price: 50, rarity: "legendary" },
];

export function getItemsByCategory(category: GummiBearItem["category"]): GummiBearItem[] {
  return GUMI_BEAR_ITEMS.filter((item) => item.category === category);
}

export function getItemById(id: string): GummiBearItem | undefined {
  return GUMI_BEAR_ITEMS.find((item) => item.id === id);
}
