"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatPriceRange, formatCount } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
};

export default function ProductCard({ product, index, onClick }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(product.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(product.likes);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: product.title, url: product.buyUrl });
    }
  };

  // Calculate a deterministic aspect ratio for the image placeholder
  const aspectRatio = product.aspectRatio || 1.2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 15) * 0.03 }}
      className="masonry-item group cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="rounded-xl overflow-hidden bg-[var(--card-bg)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        {/* Image container */}
        <div className="relative overflow-hidden" style={{ aspectRatio: `1 / ${aspectRatio}` }}>
          {!imageError ? (
            <Image
              src={product.primaryImage.url}
              alt={product.primaryImage.alt}
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1439px) 25vw, 20vw"
              className={`object-cover transition-all duration-300 group-hover:scale-[1.03] ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : null}

          {/* Placeholder while loading or on error */}
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
          )}

          {/* Heart button — fades in on hover */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 active:scale-95 z-10"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <motion.svg
              animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isLiked ? "#C45D3E" : "none"}
              stroke={isLiked ? "#C45D3E" : "#1A1A1A"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </motion.svg>
          </button>

          {/* Share button — fades in on hover */}
          <button
            onClick={handleShare}
            className="absolute top-3 right-14 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 active:scale-95 z-10"
            aria-label="Share"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>
        </div>

        {/* Card info */}
        <div className="p-3">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-medium mb-0.5">
            {product.brand}
          </p>
          <h3
            className="text-sm leading-snug text-[var(--text-primary)] line-clamp-2 mb-1"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
          >
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {formatPriceRange(product.price.min, product.price.max, product.price.currency)}
            </p>
            {product.rating && (
              <div className="flex items-center gap-1 text-[11px] text-[var(--text-tertiary)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#C45D3E" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {product.rating.average}
              </div>
            )}
          </div>

          {/* Social metrics */}
          <div className="flex items-center gap-3 mt-2 pt-2 border-t border-[var(--border)]">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-[11px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill={isLiked ? "var(--accent)" : "none"}
                stroke={isLiked ? "var(--accent)" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span style={{ color: isLiked ? "var(--accent)" : undefined }}>
                {formatCount(likeCount)}
              </span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              {formatCount(product.shares)}
            </button>
            {product.likedByFriends && product.likedByFriends.length > 0 && (
              <span className="text-[10px] text-[var(--text-tertiary)] ml-auto truncate max-w-[100px]">
                {product.likedByFriends[0]} {product.likedByFriends.length > 1 && `+${product.likedByFriends.length - 1}`} liked
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
