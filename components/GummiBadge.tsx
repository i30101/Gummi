"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { formatCount } from "@/lib/utils";

type GummiBadgeProps = {
  count: number;
  isGummied: boolean;
  onToggle: (e: React.MouseEvent) => void;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  variant?: "light" | "dark"; // dark for on-image overlays
};

export default function GummiBadge({
  count,
  isGummied,
  onToggle,
  size = "md",
  showCount = true,
  variant = "light",
}: GummiBadgeProps) {
  const sizeMap = {
    sm: { iconW: 16, iconH: 27, container: "w-7 h-7", text: "text-[10px]" },
    md: { iconW: 20, iconH: 34, container: "w-9 h-9", text: "text-xs" },
    lg: { iconW: 28, iconH: 48, container: "w-12 h-12", text: "text-sm" },
  };

  const s = sizeMap[size];

  return (
    <button
      onClick={onToggle}
      className="flex flex-col items-center gap-0.5"
    >
      <motion.div
        animate={isGummied ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`${s.container} rounded-full flex items-center justify-center transition-all ${
          variant === "dark"
            ? "bg-white/15 backdrop-blur-sm hover:bg-white/25"
            : isGummied
              ? "bg-(--accent)/10"
              : "hover:bg-(--bg-secondary)"
        }`}
      >
        <Image
          src="/gummi-icon.png"
          alt="Gummi"
          width={s.iconW}
          height={s.iconH}
          className={`transition-all ${
            isGummied ? "opacity-100 drop-shadow-[0_0_4px_rgba(196,93,62,0.5)" : "opacity-50 grayscale"
          }`}
        />
      </motion.div>
      {showCount && (
        <span
          className={`${s.text} font-medium ${
            variant === "dark"
              ? "text-white"
              : isGummied
                ? "text-(--accent)"
                : "text-(--text-tertiary)"
          }`}
        >
          {formatCount(count)}
        </span>
      )}
    </button>
  );
}
