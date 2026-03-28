export type GumiBearItemCategory = "color" | "clothing" | "accessory" | "headwear";

export type GumiBearItem = {
  id: string;
  name: string;
  category: GumiBearItemCategory;
  price: number;
  rarity: "common" | "rare" | "legendary";
  hue?: number; // for color items — the target hue shift
  isDefault?: boolean;
};

export type GumiBearConfig = {
  hue: number; // 0-360 hue shift (0 = original cherry red)
  clothing: string | null;
  accessory: string | null;
  headwear: string | null;
};

export type GumiBearState = {
  config: GumiBearConfig;
  inventory: string[]; // owned item IDs
  gumiBalance: number;
};

export const DEFAULT_BEAR_CONFIG: GumiBearConfig = {
  hue: 0,
  clothing: null,
  accessory: null,
  headwear: null,
};

export const DEFAULT_BEAR_STATE: GumiBearState = {
  config: { ...DEFAULT_BEAR_CONFIG },
  inventory: ["color-default"],
  gumiBalance: 89,
};
