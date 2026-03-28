"use client";

import { useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll(
  onLoadMore: () => void,
  { enabled = true, rootMargin = "400px" }: { enabled?: boolean; rootMargin?: string } = {}
) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const setSentinelRef = useCallback((node: HTMLDivElement | null) => {
    sentinelRef.current = node;
  }, []);

  useEffect(() => {
    if (!enabled || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [enabled, onLoadMore, rootMargin]);

  return setSentinelRef;
}
