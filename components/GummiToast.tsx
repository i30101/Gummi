"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type GummiToastProps = {
  visible: boolean;
  productTitle?: string;
};

export default function GummiToast({ visible, productTitle }: GummiToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-(--text-primary) text-white px-5 py-3.5 rounded-2xl shadow-2xl"
        >
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          >
            <Image src="/gummi-icon.png" alt="Gummi" width={28} height={48} className="drop-shadow-lg" />
          </motion.div>
          <div>
            <p className="text-sm font-semibold">Purchase posted!</p>
            <p className="text-xs text-white/60">
              {productTitle ? `You Gummied "${productTitle}"` : "Your friends can see this"}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
