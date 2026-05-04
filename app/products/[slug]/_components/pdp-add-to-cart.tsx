"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCurrency } from "@/components/providers/currency-provider";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/currency";
import type { StorefrontProduct } from "@/lib/products";

export function PdpAddToCart({ product }: { product: StorefrontProduct }) {
  const { currency } = useCurrency();
  const add = useCartStore((s) => s.add);
  const open = useCartStore((s) => s.open);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const price = product.prices[currency];
  const display = price.salePrice ?? price.amount;
  const inStock = product.stock > 0;

  function handleAdd() {
    add({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: product.images[0] ?? "/img/logo.webp",
      unitPrice: display,
      currency,
      quantity: qty,
      weightGrams: product.weightGrams,
    });
    setAdded(true);
    open();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-3">
        {price.salePrice ? (
          <>
            <span className="text-3xl font-bold text-brand-green">
              {formatPrice(price.salePrice, currency)}
            </span>
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(price.amount, currency)}
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-brand-green">
            {formatPrice(price.amount, currency)}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className={`inline-block w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
        <span className="text-gray-600">
          {inStock ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="p-3 hover:bg-gray-50 disabled:opacity-50 transition"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            min={1}
            max={product.stock}
            value={qty}
            onChange={(e) =>
              setQty(
                Math.max(
                  1,
                  Math.min(product.stock, parseInt(e.target.value) || 1),
                ),
              )
            }
            className="w-14 text-center font-bold focus:outline-none"
          />
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            disabled={qty >= product.stock}
            aria-label="Increase quantity"
            className="p-3 hover:bg-gray-50 disabled:opacity-50 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={!inStock}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-dark text-white py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-brand-gold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="h-4 w-4" />
          {added ? "Added!" : inStock ? "Add to Cart" : "Sold Out"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-brand-gold font-bold">SKU</span>
          <span>{product.id.slice(-6).toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand-gold font-bold">Weight</span>
          <span>{product.weightGrams}g</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand-gold font-bold">Category</span>
          <span>{product.category.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand-gold font-bold">Origin</span>
          <span>Sri Lanka</span>
        </div>
      </div>
    </div>
  );
}
