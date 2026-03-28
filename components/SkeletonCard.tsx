"use client";

type SkeletonCardProps = {
  index: number;
};

// Vary heights for masonry effect
const SKELETON_HEIGHTS = [220, 280, 240, 320, 260, 300, 250, 290];

export default function SkeletonCard({ index }: SkeletonCardProps) {
  const height = SKELETON_HEIGHTS[index % SKELETON_HEIGHTS.length];

  return (
    <div className="masonry-item">
      <div className="rounded-xl overflow-hidden bg-[var(--card-bg)]">
        {/* Image placeholder */}
        <div className="shimmer" style={{ height: `${height}px` }} />

        {/* Text placeholders */}
        <div className="p-3 space-y-2">
          <div className="shimmer h-2.5 w-16 rounded" />
          <div className="shimmer h-3.5 w-full rounded" />
          <div className="shimmer h-3.5 w-3/4 rounded" />
          <div className="flex justify-between items-center pt-1">
            <div className="shimmer h-3.5 w-14 rounded" />
            <div className="shimmer h-3 w-10 rounded" />
          </div>
          <div className="flex gap-3 pt-2 border-t border-[var(--border)]">
            <div className="shimmer h-3 w-12 rounded" />
            <div className="shimmer h-3 w-12 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
