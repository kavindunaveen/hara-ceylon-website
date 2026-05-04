import Link from "next/link";
import Image from "next/image";
import type { Prisma } from "@prisma/client";
import { Plus, Pencil, ExternalLink, RotateCcw } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/currency";
import { restoreProduct } from "./actions";
import { ArchiveProductButton } from "@/components/admin/archive-product-button";

export const metadata = { title: "Products · Admin" };

type ProductRow = Prisma.ProductGetPayload<{
  include: { category: true; prices: true };
}>;

export default async function AdminProductsPage() {
  let products: ProductRow[] = [];
  let dbError: string | null = null;

  try {
    products = await prisma.product.findMany({
      include: { category: true, prices: true },
      orderBy: [{ deletedAt: "asc" }, { updatedAt: "desc" }],
    });
  } catch (e) {
    dbError =
      (e as Error).message ||
      "Could not connect to the database. Set DATABASE_URL in .env and run npm run db:push.";
  }

  if (dbError) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Products
        </h1>
        <div className="rounded-xl bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 text-sm">
          <p className="font-bold mb-2">Database unavailable</p>
          <p>{dbError}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Products
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage catalog, prices, and visibility. Archived products are hidden
            from the storefront.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-green text-white font-bold hover:bg-green-800 transition-colors shadow-lg shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider font-bold border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 w-14" />
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">LKR</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center text-gray-500">
                  No products yet.{" "}
                  <Link
                    href="/admin/products/new"
                    className="text-brand-green font-bold hover:underline"
                  >
                    Create one
                  </Link>{" "}
                  or run{" "}
                  <code className="text-xs bg-gray-100 px-1 rounded">
                    npm run db:seed
                  </code>
                  .
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const lkr = p.prices.find((x) => x.currency === "LKR");
                const amount = lkr ? Number(lkr.amount) : 0;
                const sale = lkr?.salePrice ? Number(lkr.salePrice) : null;
                const archived = !!p.deletedAt;
                return (
                  <tr
                    key={p.id}
                    className={archived ? "bg-gray-50/80 opacity-80" : ""}
                  >
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-12 rounded-lg bg-gray-100 overflow-hidden">
                        <Image
                          src={p.images[0] ?? "/img/logo.webp"}
                          alt=""
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900 line-clamp-2">
                        {p.title}
                      </p>
                      <p className="text-[11px] text-gray-400 font-mono">
                        /{p.slug}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {p.category.name}
                    </td>
                    <td className="px-4 py-3">
                      {sale != null ? (
                        <span>
                          <span className="font-semibold text-brand-green">
                            {formatPrice(sale, "LKR")}
                          </span>
                          <span className="text-gray-400 line-through text-xs ml-1">
                            {formatPrice(amount, "LKR")}
                          </span>
                        </span>
                      ) : (
                        <span className="font-medium">
                          {formatPrice(amount, "LKR")}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{p.stock}</td>
                    <td className="px-4 py-3">
                      {archived ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gray-200 text-gray-700">
                          Archived
                        </span>
                      ) : p.isActive ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                          Draft
                        </span>
                      )}
                      {p.isFeatured && !archived && (
                        <span className="ml-1 inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-gold/20 text-brand-dark">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        {!archived && (
                          <>
                            <Link
                              href={`/products/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-green"
                              title="View live"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                            <Link
                              href={`/admin/products/${p.id}/edit`}
                              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-green"
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <ArchiveProductButton id={p.id} title={p.title} />
                          </>
                        )}
                        {archived && (
                          <form action={restoreProduct} className="inline">
                            <input type="hidden" name="id" value={p.id} />
                            <button
                              type="submit"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-green text-white hover:bg-green-800"
                            >
                              <RotateCcw className="h-3 w-3" />
                              Restore
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
