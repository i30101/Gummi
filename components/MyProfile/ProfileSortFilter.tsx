"use client";

import { SortOption } from "@/types";

type ProfileSortFilterProps = {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  productCount: number;
};

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "recent", label: "Recent" },
  { id: "category", label: "Category" },
  { id: "price-low", label: "Price: Low" },
  { id: "price-high", label: "Price: High" },
];

export default function ProfileSortFilter({
  sortOption,
  onSortChange,
  productCount,
}: ProfileSortFilterProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-xs text-(--text-tertiary) font-medium">
        {productCount} {productCount === 1 ? "product" : "products"}
      </span>
      <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => onSortChange(option.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors shrink-0 ${
              sortOption === option.id
                ? "bg-(--text-primary) text-white"
                : "bg-(--bg-secondary) text-(--text-secondary) hover:bg-(--border)"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
