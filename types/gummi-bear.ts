export type GummiBearItemCategory = "color" | "clothing" | "accessory" | "headwear";

export type GummiBearItem = {
  id: string;
  name: string;
  category: GummiBearItemCategory;
  price: number;
  rarity: "common" | "rare" | "legendary";
  hue?: number; // for color items — the target hue shift
  isDefault?: boolean;
};

export type GummiBearConfig = {
  hue: number; // 0-360 hue shift (0 = original cherry red)
  clothing: string | null;
  accessory: string | null;
  headwear: string | null;
};

export type GummiBearState = {
  config: GummiBearConfig;
  inventory: string[]; // owned item IDs
  gummiBalance: number;
};

export const DEFAULT_BEAR_CONFIG: GummiBearConfig = {
  hue: 0,
  clothing: null,
  accessory: null,
  headwear: null,
};

export const DEFAULT_BEAR_STATE: GummiBearState = {
  config: { ...DEFAULT_BEAR_CONFIG },
  inventory: ["color-default"],
  gummiBalance: 89,
};
