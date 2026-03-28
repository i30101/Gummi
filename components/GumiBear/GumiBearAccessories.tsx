type GumiBearAccessoriesProps = {
  itemId: string | null;
  detailLevel: "micro" | "compact" | "full";
};

export default function GumiBearAccessories({ itemId, detailLevel }: GumiBearAccessoriesProps) {
  if (!itemId || detailLevel === "micro") return null;

  switch (itemId) {
    case "acc-glasses":
      return (
        <g>
          {/* Round glasses */}
          <circle cx="40" cy="38" r="6" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
          <circle cx="60" cy="38" r="6" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
          {/* Bridge */}
          <path d="M46 38 L54 38" stroke="#2C2C2C" strokeWidth="1.5" />
          {/* Temple arms */}
          <path d="M34 38 L26 36" stroke="#2C2C2C" strokeWidth="1.2" />
          <path d="M66 38 L74 36" stroke="#2C2C2C" strokeWidth="1.2" />
          {/* Lens reflection */}
          {detailLevel === "full" && (
            <>
              <path d="M37 35 L39 34" stroke="white" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
              <path d="M57 35 L59 34" stroke="white" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
            </>
          )}
        </g>
      );
    case "acc-sunglasses":
      return (
        <g>
          {/* Sunglasses lenses */}
          <path d="M33 34 Q33 32 40 32 Q47 32 47 34 L47 40 Q47 44 40 44 Q33 44 33 40Z" fill="#2C2C2C" opacity="0.85" />
          <path d="M53 34 Q53 32 60 32 Q67 32 67 34 L67 40 Q67 44 60 44 Q53 44 53 40Z" fill="#2C2C2C" opacity="0.85" />
          {/* Bridge */}
          <path d="M47 36 L53 36" stroke="#2C2C2C" strokeWidth="1.5" />
          {/* Temple arms */}
          <path d="M33 36 L26 34" stroke="#2C2C2C" strokeWidth="1.5" />
          <path d="M67 36 L74 34" stroke="#2C2C2C" strokeWidth="1.5" />
          {/* Lens reflection */}
          <path d="M36 35 L42 33" stroke="white" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
          <path d="M56 35 L62 33" stroke="white" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
        </g>
      );
    case "acc-necklace":
      return (
        <g>
          {/* Pearl necklace chain */}
          <path d="M34 60 Q50 68 66 60" fill="none" stroke="#F5E6CC" strokeWidth="1.5" />
          {/* Pearls */}
          <circle cx="38" cy="61" r="2" fill="#F5E6CC" stroke="#E8D5B8" strokeWidth="0.5" />
          <circle cx="44" cy="64" r="2" fill="#F5E6CC" stroke="#E8D5B8" strokeWidth="0.5" />
          <circle cx="50" cy="65.5" r="2.5" fill="#F5E6CC" stroke="#E8D5B8" strokeWidth="0.5" />
          <circle cx="56" cy="64" r="2" fill="#F5E6CC" stroke="#E8D5B8" strokeWidth="0.5" />
          <circle cx="62" cy="61" r="2" fill="#F5E6CC" stroke="#E8D5B8" strokeWidth="0.5" />
          {detailLevel === "full" && (
            <>
              <circle cx="50" cy="65.5" r="0.8" fill="white" opacity="0.5" />
            </>
          )}
        </g>
      );
    case "acc-scarf":
      return (
        <g>
          {/* Scarf wrapped around neck */}
          <path
            d="M30 58 Q50 64 70 58 Q72 62 70 66 Q50 72 30 66 Q28 62 30 58Z"
            fill="#E74C3C"
            opacity="0.85"
          />
          {/* Hanging end */}
          <path d="M36 66 L32 82 Q34 84 38 82 L42 66" fill="#E74C3C" opacity="0.75" />
          {detailLevel === "full" && (
            <>
              {/* Fringe */}
              <line x1="32" y1="82" x2="31" y2="86" stroke="#C0392B" strokeWidth="0.8" />
              <line x1="34" y1="83" x2="33" y2="87" stroke="#C0392B" strokeWidth="0.8" />
              <line x1="36" y1="83" x2="35" y2="87" stroke="#C0392B" strokeWidth="0.8" />
              <line x1="38" y1="82" x2="37" y2="86" stroke="#C0392B" strokeWidth="0.8" />
            </>
          )}
        </g>
      );
    case "acc-backpack":
      return (
        <g>
          {/* Backpack (behind body) */}
          <rect x="56" y="62" width="20" height="28" rx="6" fill="#E67E22" opacity="0.8" />
          {/* Strap */}
          <path d="M60 62 Q56 58 50 62" stroke="#D35400" strokeWidth="2" fill="none" />
          {/* Pocket */}
          {detailLevel === "full" && (
            <rect x="60" y="76" width="12" height="8" rx="2" fill="#D35400" opacity="0.5" />
          )}
        </g>
      );
    case "acc-bowtie":
      return (
        <g>
          {/* Bow tie */}
          <path d="M42 60 L50 64 L42 68Z" fill="#E74C3C" />
          <path d="M58 60 L50 64 L58 68Z" fill="#E74C3C" />
          <circle cx="50" cy="64" r="2" fill="#C0392B" />
        </g>
      );
    case "acc-headphones":
      return (
        <g>
          {/* Headphone band */}
          <path d="M26 32 Q26 14 50 14 Q74 14 74 32" fill="none" stroke="#2C3E50" strokeWidth="3" />
          {/* Left earpiece */}
          <rect x="22" y="28" width="8" height="12" rx="3" fill="#2C3E50" />
          <rect x="23" y="30" width="6" height="8" rx="2" fill="#7F8C8D" opacity="0.5" />
          {/* Right earpiece */}
          <rect x="70" y="28" width="8" height="12" rx="3" fill="#2C3E50" />
          <rect x="71" y="30" width="6" height="8" rx="2" fill="#7F8C8D" opacity="0.5" />
        </g>
      );
    case "acc-watch":
      return (
        <g>
          {/* Watch on left arm */}
          <rect x="11" y="76" width="8" height="6" rx="1" fill="#F1C40F" stroke="#C6930A" strokeWidth="0.8" />
          <rect x="13" y="77.5" width="4" height="3" rx="0.5" fill="#2C3E50" />
          {/* Watch band */}
          <path d="M13 76 L13 74" stroke="#C6930A" strokeWidth="1.5" />
          <path d="M17 76 L17 74" stroke="#C6930A" strokeWidth="1.5" />
          <path d="M13 82 L13 84" stroke="#C6930A" strokeWidth="1.5" />
          <path d="M17 82 L17 84" stroke="#C6930A" strokeWidth="1.5" />
        </g>
      );
    case "acc-wings":
      return (
        <g>
          {/* Angel wings - left */}
          <path
            d="M18 68 Q4 55 10 42 Q18 48 22 55 Q14 48 12 40 Q22 46 26 58 Q20 50 18 44 Q26 52 28 64Z"
            fill="white"
            opacity="0.75"
            stroke="white"
            strokeWidth="0.5"
          />
          {/* Angel wings - right */}
          <path
            d="M82 68 Q96 55 90 42 Q82 48 78 55 Q86 48 88 40 Q78 46 74 58 Q80 50 82 44 Q74 52 72 64Z"
            fill="white"
            opacity="0.75"
            stroke="white"
            strokeWidth="0.5"
          />
          {detailLevel === "full" && (
            <>
              {/* Feather detail */}
              <path d="M14 52 Q18 50 20 54" stroke="white" strokeWidth="0.5" opacity="0.4" fill="none" />
              <path d="M86 52 Q82 50 80 54" stroke="white" strokeWidth="0.5" opacity="0.4" fill="none" />
            </>
          )}
        </g>
      );
    default:
      return null;
  }
}
