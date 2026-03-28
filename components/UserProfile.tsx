"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MockUser } from "@/types";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { formatCount } from "@/lib/utils";

type UserProfileProps = {
  user: MockUser | null;
  onClose: () => void;
};

// Get deterministic "purchased" products for a user based on their ID
function getUserGumis(userId: string) {
  const seed = userId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffled = [...MOCK_PRODUCTS].sort((a, b) => {
    const hashA = (a.id.charCodeAt(a.id.length - 1) * seed) % 100;
    const hashB = (b.id.charCodeAt(b.id.length - 1) * seed) % 100;
    return hashA - hashB;
  });
  return shuffled.slice(0, Math.min(12, Math.floor(seed % 8) + 5));
}

export default function UserProfile({ user, onClose }: UserProfileProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (user) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    };
  }, [user]);

  const userGumis = user ? getUserGumis(user.id) : [];

  return (
    <AnimatePresence>
      {user && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--card-bg)] z-50 overflow-y-auto shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--border)] transition-colors z-20"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Profile header */}
            <div className="flex flex-col items-center pt-12 pb-6 px-6">
              {/* Avatar with story ring */}
              <div className="relative w-24 h-24 mb-4">
                {user.hasStory && (
                  <Image src="/story-ring.png" alt="" fill className="object-contain" sizes="96px" />
                )}
                <div className={`absolute inset-0 flex items-center justify-center ${user.hasStory ? "p-[7px]" : "p-0"}`}>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--bg-secondary)]">
                    <Image src={user.avatar} alt={user.name} fill className="object-cover" sizes="96px" />
                  </div>
                </div>
              </div>

              <h2
                className="text-xl text-[var(--text-primary)] mb-0.5"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                {user.name}
              </h2>
              <p className="text-sm text-[var(--text-tertiary)] mb-3">@{user.username}</p>
              <p className="text-sm text-[var(--text-secondary)] text-center max-w-xs mb-6">
                {user.bio}
              </p>

              {/* Stats — Gumi count is the star metric */}
              <div className="flex gap-8 mb-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5">
                    <Image src="/gumi-icon.png" alt="" width={18} height={18} />
                    <span className="text-xl font-bold text-[var(--accent)]">
                      {formatCount(user.gumiCount)}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)]">Gumis</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-[var(--text-primary)]">
                    {formatCount(user.followers)}
                  </span>
                  <span className="text-xs text-[var(--text-tertiary)]">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-[var(--text-primary)]">
                    {formatCount(user.following)}
                  </span>
                  <span className="text-xs text-[var(--text-tertiary)]">Following</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 w-full max-w-xs">
                <button className="flex-1 py-2.5 bg-[var(--accent)] text-white rounded-full text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors">
                  Follow
                </button>
                <button className="flex-1 py-2.5 border border-[var(--border)] text-[var(--text-secondary)] rounded-full text-sm font-medium hover:border-[var(--text-tertiary)] transition-colors">
                  Message
                </button>
              </div>
            </div>

            {/* Products they've Gumied (purchased and posted) */}
            <div className="px-6 pb-8">
              <h3 className="text-xs uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-medium mb-3">
                Products {user.name.split(" ")[0]} bought
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {userGumis.map((product) => (
                  <div
                    key={product.id}
                    className="relative aspect-square rounded-xl overflow-hidden bg-[var(--bg-secondary)] group cursor-pointer"
                  >
                    <Image
                      src={product.primaryImage.url}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="120px"
                    />
                    {/* Gumi badge overlay */}
                    <div className="absolute bottom-1 left-1 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                      <Image src="/gumi-icon.png" alt="" width={10} height={10} />
                      <span className="text-white text-[9px] font-medium">
                        {formatCount(product.gumis)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
