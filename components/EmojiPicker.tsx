"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GummiBearConfig } from "@/types/gummi-bear";
import { EMOTIONS, Emotion } from "@/lib/emoji-emotions";
import EmojiGummiBear from "./EmojiGummiBear";

type EmojiPickerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmoji: (emotion: Emotion) => void;
  userConfig: GummiBearConfig;
};

export default function EmojiPicker({
  isOpen,
  onClose,
  onSelectEmoji,
  userConfig,
}: EmojiPickerProps) {
  const [hoveredEmotion, setHoveredEmotion] = useState<Emotion | null>(null);

  const handleSelectEmoji = (emotion: Emotion) => {
    onSelectEmoji(emotion);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40"
          />

          {/* Picker */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-(--card-bg) rounded-2xl p-6 shadow-2xl"
          >
            <h3 className="text-lg font-bold text-(--text-primary) mb-4 text-center" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Choose an emoji
            </h3>

            {/* Emotions grid */}
            <div className="grid grid-cols-3 gap-4">
              {EMOTIONS.map((emotion) => (
                <motion.button
                  key={emotion.id}
                  onClick={() => handleSelectEmoji(emotion.id as Emotion)}
                  onMouseEnter={() => setHoveredEmotion(emotion.id as Emotion)}
                  onMouseLeave={() => setHoveredEmotion(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-(--bg-secondary) transition-colors"
                >
                  <div className="w-16 h-16 flex items-center justify-center">
                    <EmojiGummiBear
                      config={userConfig}
                      emotion={emotion.id as Emotion}
                      size={64}
                    />
                  </div>
                  <span className="text-xs font-semibold text-(--text-primary)">
                    {emotion.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center hover:bg-(--bg-secondary) rounded-full transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
