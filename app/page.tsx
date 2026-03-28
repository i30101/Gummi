"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Product, FeedMode, FeedResponse } from "@/types";
import { CATEGORIES } from "@/lib/mock-data";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import TopNav from "@/components/TopNav";
import MasonryGrid from "@/components/MasonryGrid";
import ReelsView from "@/components/ReelsView";
import ProductModal from "@/components/ProductModal";

export default function Home() {
  // Feed state
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // UI state
  const [feedMode, setFeedMode] = useState<FeedMode>("gallery");
  const [activeCategory, setActiveCategory] = useState("for-you");
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const debouncedSearch = useDebounce(searchValue, 300);
  const isLoadingRef = useRef(false);

  // Fetch products from API
  const fetchProducts = useCallback(
    async (reset: boolean = false) => {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;
      setIsLoading(true);

      try {
        const currentCursor = reset ? null : cursor;
        let url: string;

        if (activeSearch) {
          url = `/api/search?q=${encodeURIComponent(activeSearch)}&limit=15${
            currentCursor ? `&cursor=${currentCursor}` : ""
          }`;
        } else {
          url = `/api/feed?category=${activeCategory}&limit=15${
            currentCursor ? `&cursor=${currentCursor}` : ""
          }`;
        }

        const res = await fetch(url);
        const data: FeedResponse = await res.json();

        if (reset) {
          setProducts(data.products);
        } else {
          setProducts((prev) => [...prev, ...data.products]);
        }
        setCursor(data.nextCursor);
        setHasMore(data.hasMore);
      } catch {
        setHasMore(false);
      } finally {
        setIsLoading(false);
        setInitialLoading(false);
        isLoadingRef.current = false;
      }
    },
    [cursor, activeCategory, activeSearch]
  );

  // Initial load
  useEffect(() => {
    setProducts([]);
    setCursor(null);
    setHasMore(true);
    setInitialLoading(true);
    isLoadingRef.current = false;

    // Use a microtask to avoid stale closure
    const timeout = setTimeout(() => {
      fetchProductsFresh();
    }, 0);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activeSearch]);

  // Fresh fetch (resets cursor)
  const fetchProductsFresh = async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      let url: string;
      if (activeSearch) {
        url = `/api/search?q=${encodeURIComponent(activeSearch)}&limit=15`;
      } else {
        url = `/api/feed?category=${activeCategory}&limit=15`;
      }

      const res = await fetch(url);
      const data: FeedResponse = await res.json();

      setProducts(data.products);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setInitialLoading(false);
      isLoadingRef.current = false;
    }
  };

  // Debounced search
  useEffect(() => {
    if (debouncedSearch !== activeSearch) {
      setActiveSearch(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Load more for infinite scroll
  const handleLoadMore = useCallback(() => {
    if (!isLoadingRef.current && hasMore) {
      fetchProducts(false);
    }
  }, [fetchProducts, hasMore]);

  // Infinite scroll sentinel
  const sentinelRef = useInfiniteScroll(handleLoadMore, {
    enabled: hasMore && !isLoading && feedMode === "gallery",
  });

  // Category change
  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchValue("");
    setActiveSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Search submit
  const handleSearchSubmit = (value: string) => {
    setActiveSearch(value);
  };

  // Product click
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Feed mode change
  const handleFeedModeChange = (mode: FeedMode) => {
    setFeedMode(mode);
    if (mode === "gallery") {
      // Restore scroll when switching back
      document.body.style.overflow = "";
    }
  };

  // Compute nav height for padding
  const navHeight = feedMode === "gallery" ? 120 : 0;

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Top Navigation — hide in reels mode */}
      {feedMode !== "reels" && (
        <TopNav
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearchSubmit={handleSearchSubmit}
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
          feedMode={feedMode}
          onFeedModeChange={handleFeedModeChange}
        />
      )}

      {/* Gallery Feed */}
      {feedMode === "gallery" && (
        <div style={{ paddingTop: `${navHeight}px` }}>
          {/* Search results header */}
          {activeSearch && (
            <div className="px-4 md:px-6 lg:px-8 py-4">
              <p className="text-sm text-[var(--text-secondary)]">
                {products.length > 0
                  ? `Results for "${activeSearch}"`
                  : initialLoading
                    ? `Searching for "${activeSearch}"...`
                    : `No results for "${activeSearch}"`}
              </p>
              {products.length === 0 && !initialLoading && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs text-[var(--text-tertiary)]">Try:</span>
                  {["fashion", "home decor", "skincare", "kitchen", "art"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSearchValue(s);
                        setActiveSearch(s);
                      }}
                      className="px-3 py-1 bg-[var(--bg-secondary)] rounded-full text-xs text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Masonry Grid */}
          <MasonryGrid
            products={products}
            isLoading={isLoading || initialLoading}
            onProductClick={handleProductClick}
          />

          {/* Infinite scroll sentinel */}
          {hasMore && <div ref={sentinelRef} className="h-4" />}
        </div>
      )}

      {/* Reels Feed */}
      {feedMode === "reels" && products.length > 0 && (
        <>
          <ReelsView
            products={products}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            onProductClick={handleProductClick}
          />
          {/* Floating back button */}
          <button
            onClick={() => handleFeedModeChange("gallery")}
            className="fixed top-6 left-4 z-50 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
            aria-label="Back to gallery"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          {/* Floating mode toggle */}
          <div className="fixed top-6 right-4 z-50 flex items-center bg-black/30 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => handleFeedModeChange("gallery")}
              className="p-2 rounded-full hover:bg-white/10 transition-all"
              aria-label="Gallery view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-white/20"
              aria-label="Reels view (active)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="6" y="3" width="12" height="18" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="3" />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
