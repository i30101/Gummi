"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { formatCount } from "@/lib/utils";

type GumiBadgeProps = {
  count: number;
  isGumied: boolean;
  onToggle: (e: React.MouseEvent) => void;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  variant?: "light" | "dark"; // dark for on-image overlays
};

export default function GumiBadge({
  count,
  isGumied,
  onToggle,
  size = "md",
  showCount = true,
  variant = "light",
}: GumiBadgeProps) {
  const sizeMap = {
    sm: { icon: 16, container: "w-7 h-7", text: "text-[10px]" },
    md: { icon: 20, container: "w-9 h-9", text: "text-xs" },
    lg: { icon: 28, container: "w-12 h-12", text: "text-sm" },
  };

  const s = sizeMap[size];

  return (
    <button
      onClick={onToggle}
      className="flex flex-col items-center gap-0.5"
    >
      <motion.div
        animate={isGumied ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`${s.container} rounded-full flex items-center justify-center transition-all ${
          variant === "dark"
            ? "bg-white/15 backdrop-blur-sm hover:bg-white/25"
            : isGumied
              ? "bg-[var(--accent)]/10"
              : "hover:bg-[var(--bg-secondary)]"
        }`}
      >
        <Image
          src="/gumi-icon.png"
          alt="Gumi"
          width={s.icon}
          height={s.icon}
          className={`transition-all ${
            isGumied ? "opacity-100 drop-shadow-[0_0_4px_rgba(196,93,62,0.5)]" : "opacity-50 grayscale"
          }`}
        />
      </motion.div>
      {showCount && (
        <span
          className={`${s.text} font-medium ${
            variant === "dark"
              ? "text-white"
              : isGumied
                ? "text-[var(--accent)]"
                : "text-[var(--text-tertiary)]"
          }`}
        >
          {formatCount(count)}
        </span>
      )}
    </button>
  );
}
