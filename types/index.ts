export type ProductImage = {
  url: string;
  alt: string;
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
  aspectRatio?: number; // height / width ratio for masonry layout

  // Social metrics
  likes: number;
  shares: number;
  likedByFriends?: string[]; // friend names who liked this
  isLiked?: boolean; // current user liked
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
