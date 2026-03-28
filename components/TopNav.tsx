"use client";

import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import CategoryPills from "./CategoryPills";
import { Category, FeedMode } from "@/types";

type TopNavProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  categories: Category[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
  feedMode: FeedMode;
  onFeedModeChange: (mode: FeedMode) => void;
};

export default function TopNav({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  categories,
  activeCategory,
  onCategorySelect,
  feedMode,
  onFeedModeChange,
}: TopNavProps) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Show nav when scrolling up or near top
      if (currentY < 100 || currentY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentY > lastScrollY.current + 5) {
        setIsVisible(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 bg-[var(--bg-primary)]/80 backdrop-blur-lg border-b border-[var(--border)]/50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Main nav bar */}
      <div className="flex items-center gap-4 px-4 md:px-6 lg:px-8 py-3">
        {/* Logo */}
        <h1
          className="text-2xl tracking-tight text-[var(--text-primary)] flex-shrink-0 cursor-pointer"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700 }}
          onClick={() => {
            onCategorySelect("for-you");
            onSearchChange("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Gumi
        </h1>

        {/* Search */}
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />

        {/* Feed mode toggle */}
        <div className="flex items-center bg-[var(--bg-secondary)] rounded-full p-1 flex-shrink-0">
          <button
            onClick={() => onFeedModeChange("gallery")}
            className={`p-2 rounded-full transition-all ${
              feedMode === "gallery"
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
            }`}
            aria-label="Gallery view"
            title="Gallery view"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={feedMode === "gallery" ? "var(--text-primary)" : "var(--text-tertiary)"}
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => onFeedModeChange("reels")}
            className={`p-2 rounded-full transition-all ${
              feedMode === "reels"
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
            }`}
            aria-label="Reels view"
            title="Reels view"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={feedMode === "reels" ? "var(--text-primary)" : "var(--text-tertiary)"}
              strokeWidth="2"
            >
              <rect x="6" y="3" width="12" height="18" rx="2" />
              <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="3" />
            </svg>
          </button>
        </div>

        {/* Heart / Saved icon (decorative) */}
        <button
          className="flex-shrink-0 w-10 h-10 rounded-full hover:bg-[var(--bg-secondary)] flex items-center justify-center transition-colors"
          aria-label="Saved items"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Category pills — only show in gallery mode */}
      {feedMode === "gallery" && (
        <CategoryPills
          categories={categories}
          activeCategory={activeCategory}
          onSelect={onCategorySelect}
        />
      )}
    </nav>
  );
}
