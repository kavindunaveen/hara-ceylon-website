"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  createProduct,
  updateProduct,
  type ActionState,
} from "@/app/admin/products/actions";
import type { Currency } from "@prisma/client";

export type CategoryOption = { id: string; name: string; slug: string };

type PriceRow = { currency: Currency; amount: number; salePrice: number | null };

export type ProductFormValues = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string | null;
  description: string;
  categoryId: string;
  images: string[];
  stock: number;
  lowStockAt: number;
  sku: string | null;
  weightGrams: number;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  prices: PriceRow[];
};

const initial: ActionState = null;

function priceFor(
  prices: PriceRow[],
  currency: Currency,
): { amount: number; sale: number | "" } {
  const p = prices.find((x) => x.currency === currency);
  return {
    amount: p?.amount ?? 0,
    sale: p?.salePrice ?? "",
  };
}

function ProductFormFields({
  formAction,
  state,
  mode,
  categories,
  product,
}: {
  formAction: (payload: FormData) => void;
  state: ActionState;
  mode: "create" | "edit";
  categories: CategoryOption[];
  product?: ProductFormValues;
}) {
  const prices = product?.prices ?? [];
  const lkr = priceFor(prices, "LKR");
  const usd = priceFor(prices, "USD");
  const gbp = priceFor(prices, "GBP");

  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state?.error || state?.success) {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state]);

  return (
    <div ref={topRef}>
      {state?.error && (
        <div
          className="mb-6 rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm"
          role="alert"
        >
          {state.error}
        </div>
      )}
      {state?.success && (
        <div
          className="mb-6 rounded-xl bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm"
          role="status"
        >
          {state.success}
        </div>
      )}

      <form action={formAction} className="space-y-8 max-w-3xl">
        <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 border-b border-gray-100 pb-2">
            Basics
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Title *
              </label>
              <input
                name="title"
                required
                defaultValue={product?.title}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                URL slug
              </label>
              <input
                name="slug"
                placeholder={mode === "create" ? "auto from title" : product?.slug}
                defaultValue={mode === "edit" ? product?.slug : undefined}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none font-mono text-sm"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Leave blank on create to generate from title. Changing slug
                updates the public URL.
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Category *
              </label>
              <select
                name="categoryId"
                required
                defaultValue={product?.categoryId}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Short description
              </label>
              <input
                name="shortDescription"
                defaultValue={product?.shortDescription ?? ""}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Full description *
              </label>
              <textarea
                name="description"
                required
                rows={6}
                defaultValue={product?.description}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none resize-y"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 border-b border-gray-100 pb-2">
            Images
          </h2>
          <p className="text-sm text-gray-500">
            One URL per line (e.g.{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">
              /img/PREMIUM-BLACK-TEA.png
            </code>{" "}
            or a full CDN URL).
          </p>
          <textarea
            name="images"
            required
            rows={4}
            defaultValue={product?.images.join("\n")}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 font-mono text-sm focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none"
          />
        </section>

        <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 border-b border-gray-100 pb-2">
            Pricing (all currencies)
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-brand-gold mb-1">
                LKR — price *
              </label>
              <input
                name="priceLKR"
                type="number"
                min={0}
                step={1}
                required
                defaultValue={lkr.amount}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 outline-none"
              />
              <label className="block text-[10px] text-gray-400 mt-2 mb-1">
                Sale (optional)
              </label>
              <input
                name="saleLKR"
                type="number"
                min={0}
                step={1}
                defaultValue={lkr.sale === "" ? "" : lkr.sale}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-gold mb-1">
                USD — price *
              </label>
              <input
                name="priceUSD"
                type="number"
                min={0}
                step={0.01}
                required
                defaultValue={usd.amount}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 outline-none"
              />
              <label className="block text-[10px] text-gray-400 mt-2 mb-1">
                Sale (optional)
              </label>
              <input
                name="saleUSD"
                type="number"
                min={0}
                step={0.01}
                defaultValue={usd.sale === "" ? "" : usd.sale}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-gold mb-1">
                GBP — price *
              </label>
              <input
                name="priceGBP"
                type="number"
                min={0}
                step={0.01}
                required
                defaultValue={gbp.amount}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 outline-none"
              />
              <label className="block text-[10px] text-gray-400 mt-2 mb-1">
                Sale (optional)
              </label>
              <input
                name="saleGBP"
                type="number"
                min={0}
                step={0.01}
                defaultValue={gbp.sale === "" ? "" : gbp.sale}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-brand-gold/30 outline-none"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 border-b border-gray-100 pb-2">
            Inventory &amp; shipping
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Stock *
              </label>
              <input
                name="stock"
                type="number"
                min={0}
                required
                defaultValue={product?.stock ?? 0}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-gold/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Low-stock alert at
              </label>
              <input
                name="lowStockAt"
                type="number"
                min={0}
                defaultValue={product?.lowStockAt ?? 5}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-gold/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Weight (grams) *
              </label>
              <input
                name="weightGrams"
                type="number"
                min={1}
                required
                defaultValue={product?.weightGrams ?? 100}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-gold/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                SKU
              </label>
              <input
                name="sku"
                defaultValue={product?.sku ?? ""}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-gold/30"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={product?.isActive ?? true}
                className="rounded border-gray-300 text-brand-green focus:ring-brand-gold"
              />
              <span className="text-sm font-medium">Active (visible in store)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={product?.isFeatured ?? false}
                className="rounded border-gray-300 text-brand-green focus:ring-brand-gold"
              />
              <span className="text-sm font-medium">Featured on home</span>
            </label>
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 border-b border-gray-100 pb-2">
            SEO (optional)
          </h2>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Meta title
            </label>
            <input
              name="metaTitle"
              defaultValue={product?.metaTitle ?? ""}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-gold/30"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Meta description
            </label>
            <textarea
              name="metaDescription"
              rows={2}
              defaultValue={product?.metaDescription ?? ""}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-gold/30"
            />
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-brand-green text-white font-bold hover:bg-green-800 transition-colors shadow-lg"
          >
            {mode === "create" ? "Create product" : "Save changes"}
          </button>
          <Link
            href="/admin/products"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export function CreateProductForm({
  categories,
}: {
  categories: CategoryOption[];
}) {
  const [state, formAction] = useFormState(createProduct, initial);
  return (
    <ProductFormFields
      formAction={formAction}
      state={state}
      mode="create"
      categories={categories}
    />
  );
}

export function EditProductForm({
  categories,
  product,
}: {
  categories: CategoryOption[];
  product: ProductFormValues;
}) {
  const [state, formAction] = useFormState(
    updateProduct.bind(null, product.id),
    initial,
  );
  return (
    <ProductFormFields
      formAction={formAction}
      state={state}
      mode="edit"
      categories={categories}
      product={product}
    />
  );
}
