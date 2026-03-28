"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

type MasonryGridProps = {
  products: Product[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
};

export default function MasonryGrid({
  products,
  isLoading,
  onProductClick,
}: MasonryGridProps) {
  return (
    <div className="masonry px-4 md:px-6 lg:px-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onClick={onProductClick}
        />
      ))}
      {isLoading &&
        Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} index={i} />
        ))}
    </div>
  );
}
