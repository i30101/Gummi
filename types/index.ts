export type ProductImage = {
  url: string;
  alt: string;
};

// Re-export gummi bear types
export type {
  GummiBearConfig,
  GummiBearState,
  GummiBearItem,
  GummiBearItemCategory,
} from "./gummi-bear";

export type MockUser = {
  id: string;
  name: string;
  username: string;
  avatar: string; // Unsplash profile photo URL
  bio: string;
  gummiCount: number; // total products they've Gummied
  followers: number;
  following: number;
  hasStory: boolean; // whether they have an active story ring
  gummiHue: number; // 0-360 hue shift for their gummi bear color
  gummiOutfit?: {
    clothing?: string;
    accessory?: string;
    headwear?: string;
  };
};

export type Product = {
  id: string;
  title: string;
  brand: string;
  primaryImage: ProductImage;
  images: ProductImage[];
  price: {
    min: number;
    max: number;
    currency: string;
  };
  rating: {
    average: number;
    count: number;
  } | null;
  buyUrl: string;
  topFeatures: string[];
  description?: string;
  aspectRatio?: number;

  // Gummi social metrics
  gummis: number; // total Gummi count (replaces likes)
  shares: number;
  gummiedByFriends?: string[]; // user IDs of friends who Gummied this
  isGummied?: boolean; // current user Gummied this
};

export type Vendor = {
  name: string;
  url: string;
  price: number;
  currency: string;
  verified: boolean;
};

export type FeedResponse = {
  products: Product[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type Category = {
  id: string;
  label: string;
  query: string;
};

export type FeedMode = "gallery" | "reels";

// Profile section types
export type CurrentUserProfile = MockUser & {
  email: string;
  joinedDate: string;
  isPrivate: boolean;
  notificationsEnabled: boolean;
  savedProducts: string[];
  wishlistProducts: string[];
  collections: Collection[];
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  coverProductId: string;
  productIds: string[];
  createdAt: string;
  isDefault: boolean;
};

export type ProfileTab = "gummis" | "saved" | "collections" | "wishlist";

export type SortOption = "recent" | "category" | "price-low" | "price-high";

export type UserListType = "followers" | "following";

// Messaging types
export type Message = {
  id: string;
  sender: string; // user ID
  content: string;
  timestamp: Date;
  read: boolean;
};

export type Conversation = {
  id: string;
  participantId: string; // the other user in conversation
  messages: Message[];
  createdAt: Date;
  updatedAt: Date; // timestamp of last message
};
