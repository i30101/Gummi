"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MockUser, Product } from "@/types";
import { getUserGumis } from "@/lib/user-products";
import { formatPriceRange, formatCount } from "@/lib/utils";

type StoryViewerProps = {
  users: MockUser[];
  initialUserIndex: number;
  onClose: (viewedUserIndex?: number) => void;
  onProductClick?: (product: Product) => void;
};

const STORY_DURATION = 5000;
const TICK_INTERVAL = 50;

export default function StoryViewer({
  users,
  initialUserIndex,
  onClose,
  onProductClick,
}: StoryViewerProps) {
  const [userIndex, setUserIndex] = useState(initialUserIndex);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(0);
  const [userDirection, setUserDirection] = useState(0);
  const isPaused = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const pointerTimer = useRef<NodeJS.Timeout | null>(null);
  const isHolding = useRef(false);

  const currentUser = users[userIndex];
  const userStories = currentUser ? getUserGumis(currentUser.id) : [];
  const currentStory = userStories[storyIndex];

  const isFirstStory = userIndex === 0 && storyIndex === 0;
  const isLastStory =
    userIndex === users.length - 1 && storyIndex === userStories.length - 1;

  // Lock body scroll
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Escape / arrow keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(userIndex);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIndex, storyIndex]);

  // Auto-advance timer
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      if (isPaused.current) return;
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL / STORY_DURATION) * 100;
        if (next >= 100) {
          goNext();
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIndex, storyIndex]);

  const goNext = useCallback(() => {
    if (storyIndex < userStories.length - 1) {
      setDirection(1);
      setStoryIndex((prev) => prev + 1);
      setProgress(0);
    } else if (userIndex < users.length - 1) {
      setUserDirection(1);
      setDirection(1);
      setUserIndex((prev) => prev + 1);
      setStoryIndex(0);
      setProgress(0);
    } else {
      onClose(userIndex);
    }
  }, [storyIndex, userStories.length, userIndex, users.length, onClose]);

  const goNextUser = useCallback(() => {
    if (userIndex < users.length - 1) {
      setUserDirection(1);
      setDirection(1);
      setUserIndex((prev) => prev + 1);
      setStoryIndex(0);
      setProgress(0);
    } else {
      onClose(userIndex);
    }
  }, [userIndex, users.length, onClose]);

  const goPrevUser = useCallback(() => {
    if (userIndex > 0) {
      setUserDirection(-1);
      setDirection(-1);
      setUserIndex((prev) => prev - 1);
      setStoryIndex(0);
      setProgress(0);
    }
  }, [userIndex]);

  const goPrev = useCallback(() => {
    if (storyIndex > 0) {
      setDirection(-1);
      setStoryIndex((prev) => prev - 1);
      setProgress(0);
    } else if (userIndex > 0) {
      setUserDirection(-1);
      setDirection(-1);
      const prevUserStories = getUserGumis(users[userIndex - 1].id);
      setUserIndex((prev) => prev - 1);
      setStoryIndex(prevUserStories.length - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  }, [storyIndex, userIndex, users]);

  // Pointer handlers — tap vs hold (on card)
  const handlePointerDown = (e: React.PointerEvent) => {
    isHolding.current = false;
    pointerTimer.current = setTimeout(() => {
      isHolding.current = true;
      isPaused.current = true;
    }, 200);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerTimer.current) clearTimeout(pointerTimer.current);
    if (isHolding.current) {
      isPaused.current = false;
      isHolding.current = false;
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const threshold = rect.width * 0.3;
    if (x < threshold) {
      goPrev();
    } else {
      goNext();
    }
  };

  // Touch swipe handlers (on card)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (dy > 100 && Math.abs(dx) < 50) {
      onClose(userIndex);
    }
  };

  const handleViewProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStory && onProductClick) {
      onClose(userIndex);
      setTimeout(() => onProductClick(currentStory), 100);
    }
  };

  if (!currentUser || !currentStory) return null;

  const hoursAgo = ((storyIndex + 1) * 3 + userIndex) % 23 + 1;

  // Within-card image animation (same user, different story)
  const storyVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  // Card-level animation (different user)
  const cardVariants = {
    enter: (d: number) => ({ x: d > 0 ? 240 : -240, scale: 0.85, opacity: 0.4 }),
    center: { x: 0, scale: 1, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -240 : 240, scale: 0.85, opacity: 0.4 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/75 z-60 overflow-hidden"
    >
      <div className="w-full h-full flex items-center justify-center">
        {/* Card-level AnimatePresence for user navigation */}
        <AnimatePresence initial={false} custom={userDirection} mode="popLayout">
          <motion.div
            key={userIndex}
            custom={userDirection}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-10 shrink-0 w-[calc(100vw-32px)] md:w-full md:max-w-105 h-[calc(100vh-80px)] rounded-2xl overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Story image with within-card animation */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={`${userIndex}-${storyIndex}`}
                custom={direction}
                variants={storyVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={currentStory.primaryImage.url.replace("w=600", "w=1200")}
                  alt={currentStory.title}
                  fill
                  className="object-cover"
                  sizes="420px"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />
              </motion.div>
            </AnimatePresence>

            {/* Progress bars */}
            <div className="absolute top-0 left-0 right-0 z-30 px-2 pt-3">
              <div className="flex gap-1">
                {userStories.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-0.75 bg-white/25 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-white rounded-full"
                      style={{
                        width:
                          i < storyIndex
                            ? "100%"
                            : i === storyIndex
                              ? `${progress}%`
                              : "0%",
                      }}
                      transition={{ duration: 0.05, ease: "linear" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* User info row */}
            <div className="absolute top-8 left-0 right-0 z-30 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/50">
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <span className="text-white text-sm font-medium drop-shadow-lg">
                  {currentUser.username}
                </span>
                <span className="text-white/50 text-xs">{hoursAgo}h</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(userIndex);
                }}
                className="w-8 h-8 flex items-center justify-center"
                aria-label="Close stories"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Bottom product info */}
            <div className="absolute bottom-0 left-0 right-0 z-30 p-5 pb-8">
              <div className="flex items-center gap-1.5 mb-3">
                <Image src="/gumi-icon.png" alt="" width={16} height={27} />
                <span className="text-white/70 text-xs">
                  {currentUser.name.split(" ")[0]} bought this
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/60 mb-1">
                {currentStory.brand}
              </p>
              <h2
                className="text-white text-2xl mb-1 drop-shadow-lg"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 600,
                }}
              >
                {currentStory.title}
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white text-lg font-semibold">
                  {formatPriceRange(currentStory.price.min, currentStory.price.max)}
                </span>
                <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <Image src="/gumi-icon.png" alt="" width={12} height={21} />
                  <span className="text-white text-xs">
                    {formatCount(currentStory.gumis)} bought
                  </span>
                </div>
              </div>
              <button
                onClick={handleViewProduct}
                className="w-full py-3 bg-white text-(--text-primary) rounded-full text-sm font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
              >
                View Product
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Left arrow */}
      {userIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrevUser();
          }}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
          aria-label="Previous person"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {userIndex < users.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNextUser();
          }}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
          aria-label="Next person"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}
