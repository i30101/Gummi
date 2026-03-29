"use client";

import { useMemo } from "react";
import { Product, SortOption } from "@/types";
import { getMyGummis } from "@/lib/current-user-data";
import ProfileSortFilter from "./ProfileSortFilter";
import ProfileProductGrid from "./ProfileProductGrid";

type ProfileGummisGridProps = {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  onProductClick: (product: Product) => void;
};

export default function ProfileGummisGrid({
  sortOption,
  onSortChange,
  onProductClick,
}: ProfileGummisGridProps) {
  const allGummis = useMemo(() => getMyGummis(), []);

  const sortedProducts = useMemo(() => {
    const products = [...allGummis];
    switch (sortOption) {
      case "recent":
        return products; // default order
      case "category":
        return products.sort((a, b) => a.brand.localeCompare(b.brand));
      case "price-low":
        return products.sort((a, b) => a.price.min - b.price.min);
      case "price-high":
        return products.sort((a, b) => b.price.min - a.price.min);
      default:
        return products;
    }
  }, [allGummis, sortOption]);

  return (
    <div>
      <ProfileSortFilter
        sortOption={sortOption}
        onSortChange={onSortChange}
        productCount={sortedProducts.length}
      />
      <ProfileProductGrid
        products={sortedProducts}
        variant="gummi"
        emptyMessage="No purchases yet. Start discovering!"
        onProductClick={onProductClick}
      />
    </div>
  );
}
