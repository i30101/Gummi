"use client";

import { GumiBearConfig, DEFAULT_BEAR_CONFIG } from "@/types/gumi-bear";
import TintedImage from "./TintedImage";
import GumiBearClothing from "./GumiBearClothing";
import GumiBearAccessories from "./GumiBearAccessories";
import GumiBearHeadwear from "./GumiBearHeadwear";

type GumiBearProps = {
  config?: GumiBearConfig;
  size: number;
  className?: string;
};

export default function GumiBear({ config = DEFAULT_BEAR_CONFIG, size, className }: GumiBearProps) {
  const hasOverlays = config.clothing || config.accessory || config.headwear;
  const detailLevel = size < 32 ? "micro" as const : size <= 64 ? "compact" as const : "full" as const;

  return (
    <div
      className={`relative ${className || ""}`}
      style={{ width: size, height: size }}
    >
      {/* The real gumi-icon.png, hue-shifted */}
      <TintedImage
        src="/gumi-icon.png"
        hue={config.hue}
        fill
        alt="Gumi Bear"
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
            <GumiBearAccessories itemId={config.accessory} detailLevel={detailLevel} />
          )}
          {config.clothing === "clothing-cape" && (
            <GumiBearClothing itemId={config.clothing} detailLevel={detailLevel} />
          )}

          {/* Clothing */}
          {config.clothing && config.clothing !== "clothing-cape" && (
            <GumiBearClothing itemId={config.clothing} detailLevel={detailLevel} />
          )}

          {/* Accessories (except wings which go behind) */}
          {config.accessory && config.accessory !== "acc-wings" && (
            <GumiBearAccessories itemId={config.accessory} detailLevel={detailLevel} />
          )}

          {/* Headwear */}
          <GumiBearHeadwear itemId={config.headwear} detailLevel={detailLevel} />
        </svg>
      )}
    </div>
  );
}
