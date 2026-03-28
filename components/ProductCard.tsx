"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product, MockUser } from "@/types";
import { formatPriceRange, formatCount } from "@/lib/utils";
import { getUserById } from "@/lib/mock-users";

type ProductCardProps = {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
  onFriendClick?: (user: MockUser) => void;
  onGumi?: (product: Product) => void;
};

export default function ProductCard({ product, index, onClick, onFriendClick, onGumi }: ProductCardProps) {
  const [isGumied, setIsGumied] = useState(product.isGumied ?? false);
  const [gumiCount, setGumiCount] = useState(product.gumis);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleGumi = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGumied) {
      setIsGumied(false);
      setGumiCount((prev) => prev - 1);
    } else {
      setIsGumied(true);
      setGumiCount((prev) => prev + 1);
      onGumi?.(product);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: product.title, url: product.buyUrl });
    }
  };

  const gumiFriends = (product.gumiedByFriends || [])
    .map((id) => getUserById(id))
    .filter(Boolean)
    .slice(0, 3);

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
        {/* Image */}
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

          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
          )}

          {/* Share button — hover */}
          <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95"
              aria-label="Share"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          </div>

          {/* Gumi count badge — bottom-left of image */}
          <div className="absolute bottom-3 left-3 z-10">
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full pl-1.5 pr-2.5 py-1">
              <Image src="/gumi-icon.png" alt="Gumi" width={18} height={31} />
              <span className="text-white text-xs font-medium">{formatCount(gumiCount)}</span>
              <span className="text-white/60 text-[10px]">bought</span>
            </div>
          </div>
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

          {/* Social row */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border)]">
            <div className="flex items-center gap-2">
              {/* Gumi toggle — "I bought this" */}
              <button
                onClick={handleGumi}
                className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-full transition-all ${
                  isGumied
                    ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "hover:bg-[var(--bg-secondary)] text-[var(--text-tertiary)]"
                }`}
              >
                <motion.div
                  animate={isGumied ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/gumi-icon.png"
                    alt="Gumi"
                    width={14}
                    height={24}
                    className={`transition-all ${isGumied ? "opacity-100" : "opacity-40 grayscale"}`}
                  />
                </motion.div>
                <span className="font-medium">
                  {isGumied ? "Bought" : "I bought this"}
                </span>
              </button>
            </div>

            {/* Friend avatars who Gumied — clickable */}
            {gumiFriends.length > 0 && (
              <div className="flex items-center">
                <div className="flex -space-x-1.5">
                  {gumiFriends.map((friend) => (
                    <button
                      key={friend!.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFriendClick?.(friend!);
                      }}
                      className="w-5 h-5 rounded-full overflow-hidden border-2 border-[var(--card-bg)] relative hover:scale-110 transition-transform"
                    >
                      <Image
                        src={friend!.avatar}
                        alt={friend!.name}
                        fill
                        className="object-cover"
                        sizes="20px"
                      />
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-[var(--text-tertiary)] ml-1.5">
                  bought
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
