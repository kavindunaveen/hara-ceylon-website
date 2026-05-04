"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = { slug: string; name: string };

export function ShopFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [, startTransition] = useTransition();

  const cat = sp.get("category") ?? "all";
  const sort = sp.get("sort") ?? "featured";
  const [q, setQ] = useState(sp.get("q") ?? "");

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(sp.toString());
      if (q) params.set("q", q);
      else params.delete("q");
      startTransition(() => {
        router.replace(`/shop?${params.toString()}`);
      });
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(sp.toString());
    if (value && value !== "all" && value !== "featured")
      params.set(key, value);
    else params.delete(key);
    startTransition(() => {
      router.replace(`/shop?${params.toString()}`);
    });
  }

  return (
    <div className="mb-12 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value)}
          className="px-5 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-gold/40 text-sm font-medium"
        >
          <option value="featured">Featured</option>
          <option value="name">Name (A&ndash;Z)</option>
          <option value="price-asc">Price (Low &rarr; High)</option>
          <option value="price-desc">Price (High &rarr; Low)</option>
        </select>
      </div>

      <div className="flex justify-center">
        <div className="bg-white p-1 rounded-full flex gap-1 shadow-md border border-gray-100 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setParam("category", "all")}
            className={cn(
              "px-6 md:px-8 py-3 rounded-full font-bold text-xs md:text-sm transition-all uppercase",
              cat === "all"
                ? "bg-brand-green text-white shadow-lg"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setParam("category", c.slug)}
              className={cn(
                "px-6 md:px-8 py-3 rounded-full font-bold text-xs md:text-sm transition-all uppercase",
                cat === c.slug
                  ? "bg-brand-green text-white shadow-lg"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
