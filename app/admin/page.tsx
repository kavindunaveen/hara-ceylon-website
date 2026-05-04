import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  let activeCount = 0;
  let deletedCount = 0;
  try {
    activeCount = await prisma.product.count({
      where: { deletedAt: null },
    });
    deletedCount = await prisma.product.count({
      where: { deletedAt: { not: null } },
    });
  } catch {
    /* DB not configured */
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
        Dashboard
      </h1>
      <p className="text-gray-600 mb-10">
        Manage your catalog, prices, and inventory. Phase 2 focuses on products;
        orders and analytics arrive in later phases.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/products"
          className="group flex flex-col rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:border-brand-gold/50 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-brand-light text-brand-green">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Products</h2>
              <p className="text-sm text-gray-500">
                {activeCount} active
                {deletedCount > 0 ? ` · ${deletedCount} archived` : ""}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4 flex-1">
            Add, edit, archive, and restore products. Set LKR / USD / GBP prices
            and image URLs.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-green group-hover:gap-3 transition-all">
            Open products <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
