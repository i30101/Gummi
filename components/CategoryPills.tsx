"use client";

import { useRef } from "react";
import { Category } from "@/types";

type CategoryPillsProps = {
  categories: Category[];
  activeCategory: string;
  onSelect: (categoryId: string) => void;
};

export default function CategoryPills({
  categories,
  activeCategory,
  onSelect,
}: CategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto hide-scrollbar px-4 md:px-6 lg:px-8 py-2"
    >
      {categories.map((category) => {
        const isActive = category.id === activeCategory;
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[var(--text-primary)] text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
