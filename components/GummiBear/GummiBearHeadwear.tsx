type GummiBearHeadwearProps = {
  itemId: string | null;
  detailLevel: "micro" | "compact" | "full";
};

export default function GummiBearHeadwear({ itemId, detailLevel }: GummiBearHeadwearProps) {
  if (!itemId || detailLevel === "micro") return null;

  switch (itemId) {
    case "hat-beanie":
      return (
        <g>
          {/* Beanie */}
          <path
            d="M24 28 Q24 8 50 6 Q76 8 76 28 Q76 32 50 32 Q24 32 24 28Z"
            fill="#E74C3C"
            opacity="0.9"
          />
          {/* Fold line */}
          <path d="M26 26 Q50 30 74 26" stroke="#C0392B" strokeWidth="1.5" fill="none" />
          {/* Pom pom */}
          <circle cx="50" cy="6" r="5" fill="#E74C3C" />
          {detailLevel === "full" && (
            <>
              {/* Knit texture */}
              <path d="M32 16 L36 14 L40 16 L44 14 L48 16 L52 14 L56 16 L60 14 L64 16 L68 14" stroke="#C0392B" strokeWidth="0.5" fill="none" opacity="0.4" />
            </>
          )}
        </g>
      );
    case "hat-crown":
      return (
        <g>
          {/* Crown base */}
          <path d="M28 28 L28 16 L36 22 L42 10 L50 20 L58 10 L64 22 L72 16 L72 28Z" fill="#F1C40F" stroke="#C6930A" strokeWidth="1" />
          {/* Jewels */}
          <circle cx="50" cy="24" r="2.5" fill="#E74C3C" />
          {detailLevel === "full" && (
            <>
              <circle cx="38" cy="24" r="1.5" fill="#3498DB" />
              <circle cx="62" cy="24" r="1.5" fill="#2ECC71" />
              {/* Gold band detail */}
              <path d="M28 28 L72 28" stroke="#C6930A" strokeWidth="2" />
            </>
          )}
        </g>
      );
    case "hat-flower":
      return (
        <g>
          {/* Flower crown vine */}
          <path d="M24 24 Q38 18 50 20 Q62 18 76 24" fill="none" stroke="#27AE60" strokeWidth="2" />
          {/* Flowers */}
          <circle cx="32" cy="20" r="4" fill="#FF9FF3" opacity="0.85" />
          <circle cx="42" cy="17" r="3.5" fill="#F9CA24" opacity="0.85" />
          <circle cx="52" cy="18" r="4" fill="#FF6B6B" opacity="0.85" />
          <circle cx="62" cy="17" r="3.5" fill="#48DBFB" opacity="0.85" />
          <circle cx="70" cy="21" r="3.5" fill="#FF9FF3" opacity="0.85" />
          {/* Flower centers */}
          {detailLevel === "full" && (
            <>
              <circle cx="32" cy="20" r="1.5" fill="#F9CA24" />
              <circle cx="42" cy="17" r="1.2" fill="white" opacity="0.5" />
              <circle cx="52" cy="18" r="1.5" fill="#F9CA24" />
              <circle cx="62" cy="17" r="1.2" fill="white" opacity="0.5" />
              <circle cx="70" cy="21" r="1.2" fill="#F9CA24" />
            </>
          )}
          {/* Leaves */}
          <ellipse cx="37" cy="22" rx="2" ry="1" fill="#27AE60" transform="rotate(-20, 37, 22)" />
          <ellipse cx="57" cy="21" rx="2" ry="1" fill="#27AE60" transform="rotate(15, 57, 21)" />
        </g>
      );
    case "hat-chef":
      return (
        <g>
          {/* Chef hat poofy top */}
          <ellipse cx="50" cy="8" rx="22" ry="12" fill="white" opacity="0.95" />
          <ellipse cx="40" cy="6" rx="10" ry="8" fill="white" opacity="0.9" />
          <ellipse cx="60" cy="6" rx="10" ry="8" fill="white" opacity="0.9" />
          <ellipse cx="50" cy="4" rx="12" ry="8" fill="white" opacity="0.95" />
          {/* Hat band */}
          <rect x="28" y="16" width="44" height="10" fill="white" opacity="0.95" />
          <path d="M28 26 L72 26" stroke="#E0E0E0" strokeWidth="1" />
        </g>
      );
    case "hat-beret":
      return (
        <g>
          {/* Beret */}
          <ellipse cx="50" cy="22" rx="26" ry="10" fill="#2C3E50" opacity="0.9" />
          <ellipse cx="46" cy="18" rx="20" ry="10" fill="#2C3E50" opacity="0.85" />
          {/* Nub on top */}
          <circle cx="42" cy="12" r="2.5" fill="#34495E" />
          {/* Band */}
          <path d="M26 26 Q50 30 74 26" stroke="#1A252F" strokeWidth="1.5" fill="none" />
        </g>
      );
    case "hat-headband":
      return (
        <g>
          {/* Headband */}
          <path
            d="M24 28 Q24 22 50 20 Q76 22 76 28"
            fill="none"
            stroke="#E84393"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Bow on side */}
          <path d="M70 24 L78 18 L76 26 L78 30 L70 24Z" fill="#E84393" />
        </g>
      );
    case "hat-tophat":
      return (
        <g>
          {/* Brim */}
          <ellipse cx="50" cy="24" rx="28" ry="6" fill="#1A1A2E" />
          {/* Cylinder */}
          <rect x="32" y="0" width="36" height="24" rx="2" fill="#1A1A2E" />
          <ellipse cx="50" cy="0" rx="18" ry="4" fill="#2C2C50" />
          {/* Band */}
          <rect x="32" y="18" width="36" height="4" fill="#C0392B" />
          {detailLevel === "full" && (
            <rect x="46" y="18" width="8" height="4" fill="#F1C40F" opacity="0.8" />
          )}
        </g>
      );
    case "hat-cap":
      return (
        <g>
          {/* Baseball cap dome */}
          <path d="M26 28 Q26 10 50 8 Q74 10 74 28Z" fill="#3498DB" opacity="0.9" />
          {/* Brim */}
          <path d="M24 28 Q20 28 18 32 Q30 36 50 36 Q56 36 58 32 L58 28Z" fill="#2980B9" />
          {/* Cap button */}
          <circle cx="50" cy="8" r="2" fill="#2471A3" />
          {detailLevel === "full" && (
            <>
              {/* Seam lines */}
              <path d="M50 8 L50 28" stroke="#2471A3" strokeWidth="0.5" opacity="0.3" />
              <path d="M38 12 L38 28" stroke="#2471A3" strokeWidth="0.5" opacity="0.3" />
              <path d="M62 12 L62 28" stroke="#2471A3" strokeWidth="0.5" opacity="0.3" />
            </>
          )}
        </g>
      );
    case "hat-halo":
      return (
        <g>
          {/* Glowing halo */}
          <ellipse cx="50" cy="6" rx="20" ry="5" fill="none" stroke="#F9CA24" strokeWidth="3" opacity="0.9" />
          <ellipse cx="50" cy="6" rx="20" ry="5" fill="none" stroke="#F9CA24" strokeWidth="6" opacity="0.2" />
          {detailLevel === "full" && (
            <ellipse cx="50" cy="6" rx="20" ry="5" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
          )}
        </g>
      );
    case "hat-astronaut":
      return (
        <g>
          {/* Helmet dome */}
          <path
            d="M22 46 Q22 6 50 4 Q78 6 78 46 Q78 50 50 50 Q22 50 22 46Z"
            fill="white"
            opacity="0.3"
            stroke="#BDC3C7"
            strokeWidth="2"
          />
          {/* Visor reflection */}
          <path
            d="M30 30 Q30 18 50 16 Q70 18 70 30 Q70 40 50 42 Q30 40 30 30Z"
            fill="#3498DB"
            opacity="0.25"
          />
          <path d="M34 24 Q44 20 52 24" stroke="white" strokeWidth="1" opacity="0.4" fill="none" />
          {/* Helmet seal */}
          <path d="M28 46 Q50 52 72 46" stroke="#BDC3C7" strokeWidth="2.5" fill="none" />
          {detailLevel === "full" && (
            <>
              {/* Antenna */}
              <line x1="72" y1="16" x2="80" y2="8" stroke="#BDC3C7" strokeWidth="1.5" />
              <circle cx="80" cy="8" r="2" fill="#E74C3C" />
            </>
          )}
        </g>
      );
    default:
      return null;
  }
}
