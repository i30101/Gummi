"use client";

import { useState, useEffect } from "react";
import { shiftHue } from "@/lib/hue-shift";

type TintedImageProps = {
  src: string;
  hue: number; // 0-360 hue shift (0 = original)
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
};

export default function TintedImage({
  src,
  hue,
  width,
  height,
  fill = false,
  className = "",
  style,
  alt = "",
}: TintedImageProps) {
  const [tintedSrc, setTintedSrc] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const normalizedHue = ((hue % 360) + 360) % 360;
    if (normalizedHue === 0) {
      setTintedSrc(src);
      return;
    }

    let cancelled = false;
    shiftHue(src, normalizedHue).then((dataUrl) => {
      if (!cancelled) setTintedSrc(dataUrl);
    });

    return () => {
      cancelled = true;
    };
  }, [src, hue, mounted]);

  const displaySrc = tintedSrc || src;

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={displaySrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain ${className}`}
        style={style}
        draggable={false}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      draggable={false}
    />
  );
}
