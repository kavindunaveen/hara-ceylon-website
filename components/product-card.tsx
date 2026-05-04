"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCurrency } from "@/components/providers/currency-provider";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/currency";
import type { StorefrontProduct } from "@/lib/products";

export function ProductCard({ product }: { product: StorefrontProduct }) {
  const { currency } = useCurrency();
  const add = useCartStore((s) => s.add);
  const price = product.prices[currency];
  const display = price.salePrice ?? price.amount;

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    add({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: product.images[0] ?? "/img/logo.webp",
      unitPrice: display,
      currency,
      quantity: 1,
      weightGrams: product.weightGrams,
    });
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 relative shadow-sm hover:shadow-2xl transition-all duration-500">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="h-64 md:h-72 overflow-hidden relative bg-white flex items-center justify-center p-6">
          <Image
            src={product.images[0] ?? "/img/logo.webp"}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-md"
          />
          <div className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wide shadow-sm">
            {product.category.name}
          </div>
          {product.stock <= 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wide shadow-sm">
              Sold Out
            </div>
          )}
        </div>
      </Link>

      <div className="p-6 bg-white border-t border-gray-50">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors leading-tight h-14 desc-clamp-2">
            {product.title}
          </h3>
        </Link>
        {product.shortDescription && (
          <p className="text-gray-500 text-xs md:text-sm mb-4 desc-clamp-3 leading-relaxed min-h-[3.75rem]">
            {product.shortDescription}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div>
            {price.salePrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-brand-green">
                  {formatPrice(price.salePrice, currency)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(price.amount, currency)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-brand-green">
                {formatPrice(price.amount, currency)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={quickAdd}
          disabled={product.stock <= 0}
          className="w-full bg-brand-dark text-white py-3.5 rounded-xl font-bold text-xs md:text-sm hover:bg-brand-gold transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{product.stock <= 0 ? "Sold Out" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
}
