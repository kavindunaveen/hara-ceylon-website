import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CreateProductForm } from "../_components/product-form";

export const metadata = { title: "New product · Admin" };

export default async function NewProductPage() {
  let categories: { id: string; name: string; slug: string }[] = [];
  try {
    categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      select: { id: true, name: true, slug: true },
    });
  } catch {
    /* handled below */
  }

  if (categories.length === 0) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          New product
        </h1>
        <div className="rounded-xl bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 text-sm space-y-2">
          <p className="font-bold">No categories found</p>
          <p>
            Connect your database (<code className="text-xs bg-white/50 px-1 rounded">DATABASE_URL</code>), then run:
          </p>
          <pre className="text-xs bg-white/60 p-2 rounded overflow-x-auto">
            npm run db:push && npm run db:seed
          </pre>
          <Link
            href="/admin/products"
            className="inline-block text-brand-green font-bold hover:underline"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="text-sm text-brand-green font-semibold hover:underline mb-2 inline-block"
        >
          ← Products
        </Link>
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          New product
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Add images as URLs (one per line). UploadThing file uploads ship in a
          later phase.
        </p>
      </div>
      <CreateProductForm categories={categories} />
    </div>
  );
}
