"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cartTotalQty, useCartStore } from "@/lib/cart-store";

export function CartIcon({ light = true }: { light?: boolean }) {
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const count = mounted ? cartTotalQty(items) : 0;

  return (
    <Link
      href="/cart"
      aria-label="Cart"
      className={`relative inline-flex items-center justify-center h-10 w-10 rounded-full transition-colors ${
        light
          ? "text-white hover:bg-white/10"
          : "text-gray-900 hover:bg-gray-100"
      }`}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-brand-gold text-white text-[11px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
