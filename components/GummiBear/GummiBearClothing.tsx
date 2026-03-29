type GummiBearClothingProps = {
  itemId: string | null;
  detailLevel: "micro" | "compact" | "full";
};

export default function GummiBearClothing({ itemId, detailLevel }: GummiBearClothingProps) {
  if (!itemId || detailLevel === "micro") return null;

  switch (itemId) {
    case "clothing-tshirt":
      return (
        <g>
          {/* Simple T-shirt */}
          <path
            d="M26 72 Q26 66 34 65 L42 63 Q50 62 58 63 L66 65 Q74 66 74 72 L74 95 Q50 98 26 95Z"
            fill="#4A90D9"
            opacity="0.85"
          />
          {/* Collar */}
          <path d="M42 63 Q50 67 58 63" stroke="#3A78C0" strokeWidth="1.5" fill="none" />
          {detailLevel === "full" && (
            <path d="M44 78 L56 78 L56 85 L44 85Z" fill="white" opacity="0.2" rx="1" />
          )}
        </g>
      );
    case "clothing-hoodie":
      return (
        <g>
          {/* Hoodie body */}
          <path
            d="M24 70 Q24 64 32 63 L42 62 Q50 61 58 62 L68 63 Q76 64 76 70 L76 98 Q50 101 24 98Z"
            fill="#7C8C8D"
            opacity="0.9"
          />
          {/* Hood */}
          <path d="M34 63 Q34 55 42 54 Q50 53 58 54 Q66 55 66 63" fill="#6D7B7C" stroke="#5D6B6C" strokeWidth="0.5" />
          {/* Front pocket */}
          {detailLevel === "full" && (
            <path d="M36 84 Q50 86 64 84 L64 94 Q50 96 36 94Z" fill="#6D7B7C" opacity="0.6" />
          )}
          {/* Drawstrings */}
          <line x1="46" y1="64" x2="46" y2="72" stroke="#A0A0A0" strokeWidth="0.8" />
          <line x1="54" y1="64" x2="54" y2="72" stroke="#A0A0A0" strokeWidth="0.8" />
        </g>
      );
    case "clothing-dress":
      return (
        <g>
          {/* Dress */}
          <path
            d="M34 64 Q50 60 66 64 L66 78 Q72 98 76 105 L24 105 Q28 98 34 78Z"
            fill="#E84393"
            opacity="0.85"
          />
          {/* Waist belt */}
          <path d="M30 80 Q50 78 70 80" stroke="#C73079" strokeWidth="2" fill="none" />
          {detailLevel === "full" && (
            <>
              <circle cx="50" cy="79" r="1.5" fill="#FFD700" />
            </>
          )}
        </g>
      );
    case "clothing-blazer":
      return (
        <g>
          {/* Blazer */}
          <path
            d="M24 70 Q24 64 34 63 L44 62 Q50 61 56 62 L66 63 Q76 64 76 70 L76 98 Q50 101 24 98Z"
            fill="#2C3E50"
            opacity="0.9"
          />
          {/* Lapels */}
          <path d="M44 62 L50 75 L42 75Z" fill="#34495E" />
          <path d="M56 62 L50 75 L58 75Z" fill="#34495E" />
          {/* Button */}
          {detailLevel === "full" && (
            <>
              <circle cx="50" cy="82" r="1.2" fill="#BDC3C7" />
              <circle cx="50" cy="89" r="1.2" fill="#BDC3C7" />
            </>
          )}
        </g>
      );
    case "clothing-overalls":
      return (
        <g>
          {/* Overall bib */}
          <path d="M36 66 L64 66 L64 100 Q50 103 36 100Z" fill="#5B7DB1" opacity="0.85" />
          {/* Straps */}
          <path d="M38 66 L34 56" stroke="#5B7DB1" strokeWidth="3" strokeLinecap="round" />
          <path d="M62 66 L66 56" stroke="#5B7DB1" strokeWidth="3" strokeLinecap="round" />
          {/* Pocket */}
          {detailLevel === "full" && (
            <rect x="44" y="78" width="12" height="10" rx="1" fill="#4A6CA0" opacity="0.6" />
          )}
        </g>
      );
    case "clothing-sweater":
      return (
        <g>
          {/* Knit sweater */}
          <path
            d="M26 70 Q26 64 34 63 L42 62 Q50 61 58 62 L66 63 Q74 64 74 70 L74 98 Q50 101 26 98Z"
            fill="#E17055"
            opacity="0.85"
          />
          {/* Turtleneck */}
          <path d="M38 62 Q50 60 62 62 Q62 58 50 57 Q38 58 38 62" fill="#D35E44" />
          {/* Knit pattern */}
          {detailLevel === "full" && (
            <>
              <path d="M32 78 L38 74 L44 78 L50 74 L56 78 L62 74 L68 78" stroke="white" strokeWidth="0.8" opacity="0.25" fill="none" />
              <path d="M32 84 L38 80 L44 84 L50 80 L56 84 L62 80 L68 84" stroke="white" strokeWidth="0.8" opacity="0.25" fill="none" />
            </>
          )}
        </g>
      );
    case "clothing-tank":
      return (
        <g>
          {/* Tank top */}
          <path
            d="M34 66 Q50 62 66 66 L68 98 Q50 101 32 98Z"
            fill="#2ECC71"
            opacity="0.85"
          />
          {/* Neckline */}
          <path d="M38 66 Q50 72 62 66" stroke="#27AE60" strokeWidth="1" fill="none" />
        </g>
      );
    case "clothing-hawaiian":
      return (
        <g>
          {/* Hawaiian shirt */}
          <path
            d="M24 72 Q24 66 34 65 L42 63 Q50 62 58 63 L66 65 Q76 66 76 72 L76 98 Q50 101 24 98Z"
            fill="#F39C12"
            opacity="0.85"
          />
          {/* Open collar */}
          <path d="M42 63 L48 75 L50 63" fill="#E67E22" />
          <path d="M58 63 L52 75 L50 63" fill="#E67E22" />
          {/* Flower pattern */}
          {detailLevel === "full" && (
            <>
              <circle cx="35" cy="82" r="2.5" fill="#E74C3C" opacity="0.5" />
              <circle cx="65" cy="78" r="2.5" fill="#E74C3C" opacity="0.5" />
              <circle cx="45" cy="92" r="2" fill="#E74C3C" opacity="0.5" />
              <circle cx="58" cy="90" r="2" fill="#E74C3C" opacity="0.5" />
            </>
          )}
        </g>
      );
    case "clothing-tuxedo":
      return (
        <g>
          {/* Tuxedo jacket */}
          <path
            d="M24 70 Q24 64 34 63 L44 62 Q50 61 56 62 L66 63 Q76 64 76 70 L76 98 Q50 101 24 98Z"
            fill="#1A1A2E"
            opacity="0.92"
          />
          {/* White shirt front */}
          <path d="M44 62 L44 98 Q50 99 56 98 L56 62 Q50 61 44 62Z" fill="white" opacity="0.9" />
          {/* Bow tie */}
          <path d="M46 65 L50 67 L54 65 L50 63Z" fill="#E74C3C" />
          {/* Buttons */}
          {detailLevel === "full" && (
            <>
              <circle cx="50" cy="76" r="0.8" fill="#2C2C2C" />
              <circle cx="50" cy="82" r="0.8" fill="#2C2C2C" />
              <circle cx="50" cy="88" r="0.8" fill="#2C2C2C" />
            </>
          )}
        </g>
      );
    case "clothing-kimono":
      return (
        <g>
          {/* Kimono body */}
          <path
            d="M22 68 Q22 62 34 62 L42 61 Q50 60 58 61 L66 62 Q78 62 78 68 L78 105 Q50 108 22 105Z"
            fill="#8E44AD"
            opacity="0.85"
          />
          {/* Obi (belt) */}
          <rect x="28" y="80" width="44" height="6" rx="1" fill="#F1C40F" opacity="0.9" />
          {/* Overlap collar */}
          <path d="M42 61 L50 80 L40 80" fill="#9B59B6" opacity="0.6" />
          <path d="M58 61 L50 80 L60 80" fill="#9B59B6" opacity="0.6" />
          {detailLevel === "full" && (
            <>
              <circle cx="35" cy="95" r="2" fill="#F1C40F" opacity="0.3" />
              <circle cx="65" cy="92" r="2" fill="#F1C40F" opacity="0.3" />
            </>
          )}
        </g>
      );
    case "clothing-cape":
      return (
        <g>
          {/* Royal cape flowing behind */}
          <path
            d="M20 60 Q18 62 16 105 Q50 115 84 105 Q82 62 80 60 Q50 56 20 60Z"
            fill="#9B59B6"
            opacity="0.75"
          />
          {/* Gold trim */}
          <path d="M20 60 Q50 56 80 60" stroke="#F1C40F" strokeWidth="2" fill="none" />
          {/* Clasp */}
          <circle cx="50" cy="60" r="3" fill="#F1C40F" stroke="#C6930A" strokeWidth="0.8" />
        </g>
      );
    case "clothing-spacesuit":
      return (
        <g>
          {/* Space suit body */}
          <path
            d="M24 68 Q24 62 34 61 L42 60 Q50 59 58 60 L66 61 Q76 62 76 68 L76 100 Q50 103 24 100Z"
            fill="#ECF0F1"
            opacity="0.92"
          />
          {/* Chest panel */}
          <rect x="40" y="70" width="20" height="16" rx="2" fill="#BDC3C7" opacity="0.6" />
          {detailLevel === "full" && (
            <>
              {/* Buttons/lights */}
              <circle cx="46" cy="76" r="1.5" fill="#E74C3C" />
              <circle cx="50" cy="76" r="1.5" fill="#2ECC71" />
              <circle cx="54" cy="76" r="1.5" fill="#3498DB" />
              {/* NASA-style logo area */}
              <circle cx="50" cy="82" r="2" fill="#2980B9" opacity="0.6" />
            </>
          )}
          {/* Suit seams */}
          <path d="M36 61 L36 100" stroke="#BDC3C7" strokeWidth="0.5" opacity="0.5" />
          <path d="M64 61 L64 100" stroke="#BDC3C7" strokeWidth="0.5" opacity="0.5" />
        </g>
      );
    default:
      return null;
  }
}
