"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  GumiBearConfig,
  GumiBearState,
  GumiBearItemCategory,
  DEFAULT_BEAR_STATE,
} from "@/types/gumi-bear";
import { GUMI_BEAR_ITEMS } from "./gumi-bear-items";

const STORAGE_KEY = "gumi-bear-state";

type GumiBearContextValue = {
  state: GumiBearState;
  equipItem: (category: GumiBearItemCategory, itemId: string | null) => void;
  purchaseItem: (itemId: string) => boolean;
  resetBear: () => void;
};

const GumiBearContext = createContext<GumiBearContextValue | null>(null);

function loadState(): GumiBearState {
  if (typeof window === "undefined") return DEFAULT_BEAR_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BEAR_STATE;
    const parsed = JSON.parse(raw) as GumiBearState;
    if (typeof parsed.config?.hue !== "number" || !Array.isArray(parsed.inventory)) {
      return DEFAULT_BEAR_STATE;
    }
    return parsed;
  } catch {
    return DEFAULT_BEAR_STATE;
  }
}

function saveState(state: GumiBearState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silently ignore
  }
}

export function GumiBearProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GumiBearState>(DEFAULT_BEAR_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const equipItem = useCallback((category: GumiBearItemCategory, itemId: string | null) => {
    setState((prev) => {
      const next = { ...prev, config: { ...prev.config } };
      switch (category) {
        case "color": {
          const item = GUMI_BEAR_ITEMS.find((i) => i.id === itemId);
          if (item?.hue !== undefined) {
            next.config.hue = item.hue;
          }
          break;
        }
        case "clothing":
          next.config.clothing = itemId;
          break;
        case "accessory":
          next.config.accessory = itemId;
          break;
        case "headwear":
          next.config.headwear = itemId;
          break;
      }
      return next;
    });
  }, []);

  const purchaseItem = useCallback((itemId: string): boolean => {
    const item = GUMI_BEAR_ITEMS.find((i) => i.id === itemId);
    if (!item) return false;

    let success = false;
    setState((prev) => {
      if (prev.inventory.includes(itemId)) return prev;
      if (prev.gumiBalance < item.price) return prev;

      success = true;
      const next = {
        ...prev,
        inventory: [...prev.inventory, itemId],
        gumiBalance: prev.gumiBalance - item.price,
        config: { ...prev.config },
      };

      // Auto-equip
      switch (item.category) {
        case "color":
          if (item.hue !== undefined) next.config.hue = item.hue;
          break;
        case "clothing":
          next.config.clothing = itemId;
          break;
        case "accessory":
          next.config.accessory = itemId;
          break;
        case "headwear":
          next.config.headwear = itemId;
          break;
      }

      return next;
    });

    return success;
  }, []);

  const resetBear = useCallback(() => {
    setState(DEFAULT_BEAR_STATE);
  }, []);

  return (
    <GumiBearContext.Provider value={{ state, equipItem, purchaseItem, resetBear }}>
      {children}
    </GumiBearContext.Provider>
  );
}

export function useGumiBear(): GumiBearContextValue {
  const ctx = useContext(GumiBearContext);
  if (!ctx) throw new Error("useGumiBear must be used within GumiBearProvider");
  return ctx;
}
