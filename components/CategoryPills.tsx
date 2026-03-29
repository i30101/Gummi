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
      className="flex gap-2 overflow-x-auto hide-scrollbar py-2"
    >
      {categories.map((category) => {
        const isActive = category.id === activeCategory;
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-(--text-primary) text-white"
                : "bg-(--bg-secondary) text-(--text-secondary) hover:bg-(--border) hover:text-(--text-primary)"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
