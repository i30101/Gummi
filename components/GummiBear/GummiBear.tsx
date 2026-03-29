"use client";

import { GummiBearConfig, DEFAULT_BEAR_CONFIG } from "@/types/gummi-bear";
import TintedImage from "./TintedImage";
import GummiBearClothing from "./GummiBearClothing";
import GummiBearAccessories from "./GummiBearAccessories";
import GummiBearHeadwear from "./GummiBearHeadwear";

type GummiBearProps = {
  config?: GummiBearConfig;
  size: number;
  className?: string;
};

export default function GummiBear({ config = DEFAULT_BEAR_CONFIG, size, className }: GummiBearProps) {
  const hasOverlays = config.clothing || config.accessory || config.headwear;
  const detailLevel = size < 32 ? "micro" as const : size <= 64 ? "compact" as const : "full" as const;

  return (
    <div
      className={`relative ${className || ""}`}
      style={{ width: size, height: size }}
    >
      {/* The real gummi-icon.png, hue-shifted */}
      <TintedImage
        src="/gummi-icon.png"
        hue={config.hue}
        fill
        alt="Gummi Bear"
        className="object-contain"
      />

      {/* SVG overlays for dress-up items */}
      {hasOverlays && detailLevel !== "micro" && (
        <svg
          viewBox="0 0 100 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {/* Accessories behind body (backpack, wings, cape) */}
          {(config.accessory === "acc-wings") && (
            <GummiBearAccessories itemId={config.accessory} detailLevel={detailLevel} />
          )}
          {config.clothing === "clothing-cape" && (
            <GummiBearClothing itemId={config.clothing} detailLevel={detailLevel} />
          )}

          {/* Clothing */}
          {config.clothing && config.clothing !== "clothing-cape" && (
            <GummiBearClothing itemId={config.clothing} detailLevel={detailLevel} />
          )}

          {/* Accessories (except wings which go behind) */}
          {config.accessory && config.accessory !== "acc-wings" && (
            <GummiBearAccessories itemId={config.accessory} detailLevel={detailLevel} />
          )}

          {/* Headwear */}
          <GummiBearHeadwear itemId={config.headwear} detailLevel={detailLevel} />
        </svg>
      )}
    </div>
  );
}
