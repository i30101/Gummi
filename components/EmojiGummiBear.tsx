"use client";

import { GummiBearConfig } from "@/types/gummi-bear";
import GummiBear from "./GummiBear/GummiBear";
import { Emotion } from "@/lib/emoji-emotions";

type EmojiGummiBearProps = {
  config: GummiBearConfig;
  emotion: Emotion;
  size: number;
  className?: string;
};

export default function EmojiGummiBear({ config, emotion, size, className }: EmojiGummiBearProps) {
  return (
    <div className={`relative ${className || ""}`} style={{ width: size, height: size }}>
      <GummiBear config={config} size={size} className="relative z-0" />
      
      {/* Emotion expression overlay */}
      <svg
        viewBox="0 0 100 160"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Happy: big smile, closed happy eyes */}
        {emotion === "happy" && (
          <>
            <ellipse cx="30" cy="45" rx="6" ry="8" fill="white" />
            <ellipse cx="70" cy="45" rx="6" ry="8" fill="white" />
            <ellipse cx="30" cy="45" rx="3" ry="4" fill="black" />
            <ellipse cx="70" cy="45" rx="3" ry="4" fill="black" />
            <path d="M 35 75 Q 50 90 65 75" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* Sad: droopy eyes, sad mouth */}
        {emotion === "sad" && (
          <>
            <ellipse cx="30" cy="50" rx="5" ry="7" fill="white" transform="rotate(-15 30 50)" />
            <ellipse cx="70" cy="50" rx="5" ry="7" fill="white" transform="rotate(15 70 50)" />
            <ellipse cx="30" cy="50" rx="2" ry="3.5" fill="black" transform="rotate(-15 30 50)" />
            <ellipse cx="70" cy="50" rx="2" ry="3.5" fill="black" transform="rotate(15 70 50)" />
            <path d="M 40 85 Q 50 78 60 85" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Tears */}
            <circle cx="28" cy="62" r="1.5" fill="#6bcb77" />
            <circle cx="72" cy="62" r="1.5" fill="#6bcb77" />
          </>
        )}

        {/* Surprised: big round eyes, O mouth */}
        {emotion === "surprised" && (
          <>
            <ellipse cx="30" cy="45" rx="7" ry="10" fill="white" />
            <ellipse cx="70" cy="45" rx="7" ry="10" fill="white" />
            <ellipse cx="30" cy="45" rx="3" ry="5" fill="black" />
            <ellipse cx="70" cy="45" rx="3" ry="5" fill="black" />
            <circle cx="50" cy="82" r="6" fill="none" stroke="white" strokeWidth="2.5" />
          </>
        )}

        {/* Laughing: squinting eyes, big open mouth */}
        {emotion === "laughing" && (
          <>
            <path d="M 24 48 Q 30 52 36 48" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 64 48 Q 70 52 76 48" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 38 75 Q 50 92 62 75" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 40 75 L 45 82" stroke="white" strokeWidth="1.5" />
            <path d="M 60 75 L 55 82" stroke="white" strokeWidth="1.5" />
          </>
        )}

        {/* Love: heart eyes, happy mouth */}
        {emotion === "love" && (
          <>
            {/* Left heart eye */}
            <path d="M 28 38 Q 28 35 30 35 Q 32 35 32 38 Q 32 40 30 42 Q 28 40 28 38" fill="#ff6b9d" />
            <path d="M 32 38 Q 32 35 34 35 Q 36 35 36 38 Q 36 40 34 42 Q 32 40 32 38" fill="#ff6b9d" />
            {/* Right heart eye */}
            <path d="M 68 38 Q 68 35 70 35 Q 72 35 72 38 Q 72 40 70 42 Q 68 40 68 38" fill="#ff6b9d" />
            <path d="M 72 38 Q 72 35 74 35 Q 76 35 76 38 Q 76 40 74 42 Q 72 40 72 38" fill="#ff6b9d" />
            <path d="M 35 80 Q 50 88 65 80" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* Cool: cool shades, confident smile */}
        {emotion === "cool" && (
          <>
            {/* Left shade */}
            <rect x="20" y="42" width="14" height="10" rx="2" fill="none" stroke="#4d96ff" strokeWidth="2" />
            <line x1="24" y1="47" x2="28" y2="47" stroke="#4d96ff" strokeWidth="1.5" />
            {/* Right shade */}
            <rect x="66" y="42" width="14" height="10" rx="2" fill="none" stroke="#4d96ff" strokeWidth="2" />
            <line x1="70" y1="47" x2="74" y2="47" stroke="#4d96ff" strokeWidth="1.5" />
            {/* Bridge */}
            <line x1="34" y1="47" x2="66" y2="47" stroke="#4d96ff" strokeWidth="1.5" />
            {/* Confident smile */}
            <path d="M 40 80 Q 50 86 60 80" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
}
