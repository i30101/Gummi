"use client";

import { Product, MockUser } from "@/types";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

type MasonryGridProps = {
  products: Product[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
  onFriendClick?: (user: MockUser) => void;
  onGumi?: (product: Product) => void;
};

export default function MasonryGrid({
  products,
  isLoading,
  onProductClick,
  onFriendClick,
  onGumi,
}: MasonryGridProps) {
  return (
    <div className="masonry px-4 md:px-6 lg:px-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onClick={onProductClick}
          onFriendClick={onFriendClick}
          onGumi={onGumi}
        />
      ))}
      {isLoading &&
        Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} index={i} />
        ))}
    </div>
  );
}
