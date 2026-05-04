"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartLineItem = {
  productId: string;
  slug: string;
  title: string;
  image: string;
  unitPrice: number; // in active currency at time of add
  currency: "LKR" | "USD" | "GBP";
  quantity: number;
  weightGrams: number;
  variantId?: string;
  variantName?: string;
};

type CartState = {
  items: CartLineItem[];
  isOpen: boolean;
  add: (item: CartLineItem) => void;
  remove: (productId: string, variantId?: string) => void;
  setQty: (productId: string, qty: number, variantId?: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (item) => {
        const existing = get().items.find(
          (i) =>
            i.productId === item.productId && i.variantId === item.variantId,
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId && i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      remove: (productId, variantId) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId),
          ),
        });
      },
      setQty: (productId, qty, variantId) => {
        if (qty <= 0) {
          get().remove(productId, variantId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity: qty }
              : i,
          ),
        });
      },
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: "hc_cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const cartTotalQty = (items: CartLineItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);

export const cartSubtotal = (items: CartLineItem[]) =>
  items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
