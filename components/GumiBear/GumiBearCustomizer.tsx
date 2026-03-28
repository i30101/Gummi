"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GumiBearItemCategory, GumiBearItem, GumiBearConfig } from "@/types/gumi-bear";
import { useGumiBear } from "@/lib/gumi-bear-context";
import { getItemsByCategory, GUMI_BEAR_ITEMS } from "@/lib/gumi-bear-items";
import { formatCount } from "@/lib/utils";
import GumiBear from "./GumiBear";
import TintedImage from "./TintedImage";

type GumiBearCustomizerProps = {
  onClose: () => void;
};

const CATEGORIES: { id: GumiBearItemCategory; label: string; emoji: string }[] = [
  { id: "color", label: "Colors", emoji: "🎨" },
  { id: "clothing", label: "Clothing", emoji: "👕" },
  { id: "accessory", label: "Accessories", emoji: "✨" },
  { id: "headwear", label: "Hats", emoji: "👒" },
];

const RARITY_BORDER = {
  common: "border-[var(--border)]",
  rare: "border-blue-300",
  legendary: "border-amber-400",
};

const ITEM_EMOJI: Record<string, string> = {
  "clothing-tshirt": "👕", "clothing-hoodie": "🧥", "clothing-dress": "👗",
  "clothing-blazer": "🤵", "clothing-overalls": "👖", "clothing-sweater": "🧶",
  "clothing-tuxedo": "🎩", "clothing-cape": "🦸",
  "acc-glasses": "👓", "acc-sunglasses": "🕶️", "acc-scarf": "🧣",
  "acc-bowtie": "🎀", "acc-headphones": "🎧", "acc-wings": "😇",
  "hat-beanie": "🧢", "hat-crown": "👑", "hat-flower": "🌸",
  "hat-beret": "🎨", "hat-tophat": "🎩", "hat-cap": "🧢", "hat-halo": "😇",
};

export default function GumiBearCustomizer({ onClose }: GumiBearCustomizerProps) {
  const { state, equipItem, purchaseItem } = useGumiBear();
  const [activeCategory, setActiveCategory] = useState<GumiBearItemCategory>("color");
  const [previewConfig, setPreviewConfig] = useState<GumiBearConfig | null>(null);
  const [pendingItem, setPendingItem] = useState<GumiBearItem | null>(null);
  const [animateKey, setAnimateKey] = useState("init");
  const [toast, setToast] = useState<string | null>(null);

  const displayConfig = previewConfig || state.config;
  const items = getItemsByCategory(activeCategory);

  // Sort: owned first, then by price
  const sortedItems = [...items].sort((a, b) => {
    const aOwned = state.inventory.includes(a.id) || !!a.isDefault;
    const bOwned = state.inventory.includes(b.id) || !!b.isDefault;
    if (aOwned && !bOwned) return -1;
    if (!aOwned && bOwned) return 1;
    return a.price - b.price;
  });

  const handleSelectItem = useCallback((item: GumiBearItem) => {
    const isOwned = state.inventory.includes(item.id) || !!item.isDefault;

    if (isOwned) {
      const currentId = getCurrentEquipped(state.config, item.category);
      if (item.category === "color") {
        if (state.config.hue !== (item.hue ?? 0)) {
          equipItem("color", item.id);
          setAnimateKey(item.id);
        }
      } else if (currentId === item.id) {
        equipItem(item.category, null);
        setAnimateKey(`unequip-${item.id}`);
      } else {
        equipItem(item.category, item.id);
        setAnimateKey(item.id);
      }
      setPreviewConfig(null);
      setPendingItem(null);
    } else {
      setPreviewConfig(buildPreview(state.config, item));
      setPendingItem(item);
    }
  }, [state, equipItem]);

  const handlePurchase = useCallback(() => {
    if (!pendingItem) return;
    const success = purchaseItem(pendingItem.id);
    if (success) {
      setToast(`Unlocked ${pendingItem.name}!`);
      setAnimateKey(`buy-${pendingItem.id}`);
      setPreviewConfig(null);
      setPendingItem(null);
      setTimeout(() => setToast(null), 2500);
    }
  }, [pendingItem, purchaseItem]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[60] bg-[var(--bg-primary)] overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--border)] transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2
          className="text-lg text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
        >
          Customize Your Gumi
        </h2>

        <div className="flex items-center gap-1.5 bg-[var(--bg-secondary)] px-3 py-1.5 rounded-full">
          <Image src="/gumi-icon.png" alt="" width={14} height={24} />
          <span className="text-sm font-semibold text-[var(--accent)]">
            {formatCount(state.gumiBalance)}
          </span>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-shrink-0 flex items-center justify-center py-4">
        <motion.div
          key={animateKey}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1, y: [0, -4, 0] }}
          transition={{
            scale: { duration: 0.3, type: "spring", stiffness: 300, damping: 15 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <GumiBear config={displayConfig} size={180} />
        </motion.div>
      </div>

      {/* Purchase bar */}
      {pendingItem && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 px-4 pb-3 flex-shrink-0"
        >
          <button
            onClick={() => { setPreviewConfig(null); setPendingItem(null); }}
            className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded-full hover:bg-[var(--border)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePurchase}
            disabled={state.gumiBalance < pendingItem.price}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              state.gumiBalance >= pendingItem.price
                ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:scale-95"
                : "bg-[var(--bg-secondary)] text-[var(--text-tertiary)] cursor-not-allowed"
            }`}
          >
            {state.gumiBalance >= pendingItem.price ? (
              <>
                <span>Buy for</span>
                <Image src="/gumi-icon.png" alt="" width={12} height={20} className="brightness-0 invert" />
                <span>{pendingItem.price}</span>
              </>
            ) : (
              "Not enough Gumis"
            )}
          </button>
        </motion.div>
      )}

      {/* Category pills */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar flex-shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setPreviewConfig(null);
              setPendingItem(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeCategory === cat.id
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)]"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border)]"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Item grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {sortedItems.map((item) => {
            const isOwned = state.inventory.includes(item.id) || !!item.isDefault;
            const isEquipped = isItemEquipped(state.config, item);
            const canAfford = state.gumiBalance >= item.price;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:scale-[1.03] active:scale-[0.98] ${
                  isEquipped
                    ? "border-[var(--accent)] bg-[var(--accent)]/5"
                    : RARITY_BORDER[item.rarity]
                } ${!isOwned && !canAfford ? "opacity-50" : ""}`}
              >
                {/* Preview */}
                <div className="w-14 h-14 flex items-center justify-center">
                  {item.category === "color" ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <TintedImage
                        src="/gumi-icon.png"
                        hue={item.hue ?? 0}
                        fill
                        className="object-contain scale-150"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                      <span className="text-lg">{ITEM_EMOJI[item.id] || "🧸"}</span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <span className="text-xs font-medium text-[var(--text-primary)] text-center leading-tight line-clamp-2">
                  {item.name}
                </span>

                {/* Status */}
                {isOwned ? (
                  isEquipped ? (
                    <span className="text-[10px] font-semibold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">
                      Equipped
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded-full">
                      Owned
                    </span>
                  )
                ) : (
                  <span className="flex items-center gap-1">
                    <Image src="/gumi-icon.png" alt="" width={10} height={17} />
                    <span className={`text-[11px] font-semibold ${canAfford ? "text-[var(--text-secondary)]" : "text-[var(--text-tertiary)]"}`}>
                      {item.price}
                    </span>
                  </span>
                )}

                {/* Equipped check */}
                {isEquipped && (
                  <div className="absolute top-1 left-1 w-4 h-4 bg-[var(--accent)] rounded-full flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--text-primary)] text-[var(--bg-primary)] px-5 py-3 rounded-full text-sm font-medium shadow-lg flex items-center gap-2 z-[70]"
        >
          <Image src="/gumi-icon.png" alt="" width={14} height={24} />
          {toast}
        </motion.div>
      )}
    </motion.div>
  );
}

function getCurrentEquipped(config: GumiBearConfig, category: GumiBearItemCategory): string | null {
  switch (category) {
    case "clothing": return config.clothing;
    case "accessory": return config.accessory;
    case "headwear": return config.headwear;
    case "color": return null;
  }
}

function isItemEquipped(config: GumiBearConfig, item: GumiBearItem): boolean {
  switch (item.category) {
    case "color": return config.hue === (item.hue ?? 0);
    case "clothing": return config.clothing === item.id;
    case "accessory": return config.accessory === item.id;
    case "headwear": return config.headwear === item.id;
  }
}

function buildPreview(base: GumiBearConfig, item: GumiBearItem): GumiBearConfig {
  const preview = { ...base };
  switch (item.category) {
    case "color":
      preview.hue = item.hue ?? 0;
      break;
    case "clothing":
      preview.clothing = item.id;
      break;
    case "accessory":
      preview.accessory = item.id;
      break;
    case "headwear":
      preview.headwear = item.id;
      break;
  }
  return preview;
}
